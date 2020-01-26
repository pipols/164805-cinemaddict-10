import ProfileComponent from '../components/profile';
import FilmListComponent from '../components/film-list';
import MainFilmsComponent from '../components/main-films';
import ExtraFilmsComponent from '../components/extra-films';
import StatisticsComponent from '../components/statistics';
import LoadMoreButtonComponent from '../components/load-more-button';
import MovieController from './movie-controller';

import {CardCount, FilmsListTitle} from '../const';
import {shuffleArray} from '../utils/common';
import {render, remove} from '../utils/render';

const siteHeaderElement = document.querySelector(`header`);
const siteFooterElement = document.querySelector(`footer`);

const sortRatedCards = (cards) => [...cards].sort((a, b) => b.rate - a.rate); // сделать метод у модели
const sortMostCommentedCards = (cards) => [...cards].sort((a, b) => b.comments.length - a.comments.length); // сделать метод у модели
const isSameValues = (array, key) => array.every((it) => it[key] === array[0][key]); //
const isSameCountComments = (cards) => cards.every((card) => card.comments.length === cards[0].comments.length); //

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._profileComponent = null;
    this._filmListComponent = null;
    this._topRatedFilmsComponent = null;
    this._mostCommentedFilms = null;
    this._statisticsComponent = null;
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._mainFilmsComponent = new MainFilmsComponent();

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
    this._loadMoreClickHandler = this._loadMoreClickHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._sortChangeHandler = this._sortChangeHandler.bind(this);

    this._showedCardControllers = [];
    this._showedExtraCardControllers = [];
    this._prevCardsCount = 0;

    this._showingMainFilmsCount = CardCount.MAIN_FILM;
    this._oldDetailsComponent = null;

    this._moviesModel.setFilterChangeHandler(this._filterChangeHandler);
    this._moviesModel.setSortChangeHandler(this._sortChangeHandler);
    this._loadMoreButtonComponent.setClickHandler(this._loadMoreClickHandler);
  }

  render() {
    const cards = this._moviesModel.getCards();

    this._profileComponent = new ProfileComponent(cards);
    this._filmListComponent = new FilmListComponent();
    this._statisticsComponent = new StatisticsComponent(cards);

    render(siteHeaderElement, this._profileComponent);
    render(this._container, this._filmListComponent);
    render(siteFooterElement, this._statisticsComponent);
    render(this._filmListComponent.getElement(), this._mainFilmsComponent);

    this._renderFilmsListTitle();
    this._renderMainCards();
    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
    this._renderLoadMoreButton();
  }

  _loadMoreClickHandler() {
    this._showingMainFilmsCount = this._showingMainFilmsCount + CardCount.BY_BUTTON;
    this._renderMainCards();

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    const cards = this._moviesModel.getCards();
    remove(this._loadMoreButtonComponent);

    if (this._showingMainFilmsCount >= cards.length) {
      return;
    } else {
      render(this._mainFilmsComponent.getElement(), this._loadMoreButtonComponent);
      this._loadMoreButtonComponent.setClickHandler(this._loadMoreClickHandler);
    }
  }

  _renderExtraCards(cards, title, component) {
    const container = component.getElement().querySelector(`.films-list__container`);
    const newCards = this._renderCards(container, cards);
    component.setTitle(title);

    this._showedExtraCardControllers = this._showedExtraCardControllers.concat(newCards);
    render(this._filmListComponent.getElement(), component);
  }

  _renderMainCards() {
    const cards = this._moviesModel.getCards().slice(this._prevCardsCount, this._showingMainFilmsCount);
    const container = this._mainFilmsComponent.getElement().querySelector(`.films-list__container`);
    const newCards = this._renderCards(container, cards);

    this._prevCardsCount += CardCount.MAIN_FILM;
    this._showedCardControllers = this._showedCardControllers.concat(newCards);
    this._showingMainFilmsCount = this._showedCardControllers.length;
  }

  _renderCards(container, cards) {
    return cards.map((card) => {
      const movieController = new MovieController(container, this._dataChangeHandler, this._viewChangeHandler);
      movieController.render(card);

      return movieController;
    });
  }

  _removeCards() {
    this._showedCardControllers.forEach((movieController) => movieController.destroy());
    this._showedCardControllers = [];

    this._showedExtraCardControllers.forEach((movieController) => movieController.destroy());
    this._showedExtraCardControllers = [];
  }

  // rename _dataChangeHandler
  _dataChangeHandler(movieController, oldData, newData) {
    this._moviesModel.updateCard(oldData, newData);
    movieController.render(newData);
  }
  // rename _viewChangeHandler
  _viewChangeHandler(filmDetailsComponent) {
    if (!this._oldDetailsComponent) {
      this._oldDetailsComponent = filmDetailsComponent.getElement();
    } else {
      this._oldDetailsComponent.remove();
      this._oldDetailsComponent = filmDetailsComponent.getElement();
    }
  }

  _filterChangeHandler() {
    // удалить все карточки
    // и занова нарисовать
    this._removeCards();
    this._prevCardsCount = 0;
    this._showingMainFilmsCount = CardCount.MAIN_FILM;

    this._renderFilmsListTitle();
    this._renderMainCards();
    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
    this._renderLoadMoreButton();
  }

  _sortChangeHandler() {
    this._showedCardControllers.forEach((movieController) => movieController.destroy());
    this._showedCardControllers = [];
    this._showingMainFilmsCount = CardCount.MAIN_FILM;
    this._prevCardsCount = 0;

    this._renderMainCards();
    this._renderLoadMoreButton();
  }
  // выкинуть наружу или в модель
  _renderTopRatedFilms() {
    if (this._topRatedFilmsComponent) {
      remove(this._topRatedFilmsComponent);
    }

    this._topRatedFilmsComponent = new ExtraFilmsComponent();
    const cards = this._moviesModel.getCards();
    let topRatedCards = [];
    // логику в модель
    if (cards.every((card) => card.rate === 0)) {
      return;
    } else if (isSameValues(cards, `rate`)) {
      topRatedCards = shuffleArray(cards).slice(0, CardCount.RATED_FILM);
    } else {
      topRatedCards = sortRatedCards(cards).slice(0, CardCount.RATED_FILM); // to model
    }

    this._renderExtraCards(topRatedCards, FilmsListTitle.TOP_RATED, this._topRatedFilmsComponent);
  }

  _renderMostCommentedFilms() {
    if (this._mostCommentedFilms) {
      remove(this._mostCommentedFilms);
    }

    this._mostCommentedFilms = new ExtraFilmsComponent();
    const cards = this._moviesModel.getCards(); //
    let mostCommentsCards = [];

    if (cards.every((card) => card.comments.length === 0)) {
      return;
    } else if (isSameCountComments(cards)) {
      mostCommentsCards = shuffleArray(cards).slice(0, CardCount.MOST_COMMENTED_FILM);
    } else {
      mostCommentsCards = sortMostCommentedCards(cards).slice(0, CardCount.MOST_COMMENTED_FILM);
    }

    this._renderExtraCards(mostCommentsCards, FilmsListTitle.MOST_COMMENTED, this._mostCommentedFilms);
  }

  _renderFilmsListTitle() {
    const cards = this._moviesModel.getCards();

    if (cards.length === 0) {
      this._mainFilmsComponent.setTitle(FilmsListTitle.MESSAGE_NO_FILMS);
      this._mainFilmsComponent.getElement().querySelector(`.films-list__title`).classList.remove(`visually-hidden`);
    } else {
      this._mainFilmsComponent.setTitle(FilmsListTitle.MAIN_FILM);
    }
  }

  // _setDefaultView() {
  //   this._filmListComponent.rerender();
  //
  //   this._renderFilmsListTitle();
  //   this._renderMainCards();
  //   this._renderTopRatedFilms();
  //   this._renderMostCommentedFilms();
  //   this._renderLoadMoreButton();
  // }
  // cards get in this !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}
