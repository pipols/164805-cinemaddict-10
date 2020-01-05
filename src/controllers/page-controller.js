import MenuComponent from '../components/menu';
import SortComponent, {SortType} from '../components/sort';
import CardComponent from '../components/film-card';
import ProfileComponent from '../components/profile';
import FilmListComponent from '../components/film-list';
import FilmDetailsComponent from '../components/film-details';
import MainFilmsComponent from '../components/main-films';
import ExtraFilmsComponent from '../components/extra-films';
import StatisticsComponent from '../components/statistics';
import LoadMoreButtonComponent from '../components/load-more-button';

import {KeyCode, CardCount, FilmsListTitle} from '../const';
import {shuffleArray} from '../utils/common';
import {render} from '../utils/render';

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`header`);
const siteFooterElement = document.querySelector(`footer`);

const renderFilm = (filmMock, renderContainer) => {
  const cardComponent = new CardComponent(filmMock);
  const filmDetailsComponent = new FilmDetailsComponent(filmMock);

  const closePopup = () => {
    filmDetailsComponent.removeElement();
    document.removeEventListener(`keydown`, cardDetailsEscHandler);
  };

  const cardDetailsClickHandler = () => {
    closePopup();
  };

  const cardClickHandler = () => {
    render(siteBodyElement, filmDetailsComponent);
    document.addEventListener(`keydown`, cardDetailsEscHandler);
    filmDetailsComponent.setCloseButtonClickHandler(cardDetailsClickHandler);
  };

  const cardDetailsEscHandler = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      closePopup();
    }
  };

  cardComponent.setCardPosterClickHandler(cardClickHandler);
  cardComponent.setCardTitleClickHandler(cardClickHandler);
  cardComponent.setCardCommentsClickHandler(cardClickHandler);
  render(renderContainer, cardComponent);
};

const sortRatedCards = (cards) => [...cards].sort((a, b) => b.rate - a.rate);
const sortMostCommentedCards = (cards) => [...cards].sort((a, b) => b.comments.length - a.comments.length);
const isSameValues = (array, key) => array.every((it) => it[key] === array[0][key]);
const isSameCountComments = (cards) => cards.every((card) => card.comments.length === cards[0].comments.length);

export default class PageController {
  constructor(container) {
    this._container = container;
    this._cards = [];
    this._sortedCards = [];
    this._sortComponent = new SortComponent();
    this._menuComponent = null;
    this._profileComponent = null;
    this._filmListComponent = null;
    this._statisticsComponent = null;
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._mainFilmsComponent = new MainFilmsComponent();
    // this._ratedFilmsComponent = new ExtraFilmsComponent();
    // this._mostCommentedFilmsComponent = new ExtraFilmsComponent();

    this._renderCards = []; //
    this._showingMainFilmsCount = CardCount.MAIN_FILM;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  render(cards) {
    this._cards = cards;
    this._sortedCards = cards;
    this._menuComponent = new MenuComponent(this._cards);
    this._profileComponent = new ProfileComponent(this._cards);
    this._filmListComponent = new FilmListComponent(this._cards);
    this._statisticsComponent = new StatisticsComponent(this._cards);

    render(siteHeaderElement, this._profileComponent);
    render(this._container, this._menuComponent);
    render(this._container, this._sortComponent);
    render(this._container, this._filmListComponent);
    render(siteFooterElement, this._statisticsComponent);

    // render main cards
    if (this._sortedCards.length === 0) {
      render(this._filmListComponent.getElement(), this._mainFilmsComponent);
      this._mainFilmsComponent.setTitle(FilmsListTitle.MESSAGE_NO_FILMS);
      this._mainFilmsComponent.getElement().querySelector(`.films-list__title`).classList.remove(`visually-hidden`); //
    } else {
      render(this._filmListComponent.getElement(), this._mainFilmsComponent);
      this._renderMainCards(this._sortedCards.slice(0, this._showingMainFilmsCount), FilmsListTitle.MAIN_FILM);
    }

    // render top rated films
    if (this._cards.every((card) => card.rate === 0)) {
      return;
    } else if (isSameValues(this._cards, `rate`)) {
      this._renderCards = shuffleArray(this._cards).slice(0, CardCount.RATED_FILM);
      this._renderExtraCards(this._renderCards, FilmsListTitle.TOP_RATED);
    } else {
      this._renderCards = sortRatedCards(this._cards).slice(0, CardCount.RATED_FILM);
      this._renderExtraCards(this._renderCards, FilmsListTitle.TOP_RATED);
    }

    // render most comments films
    if (this._cards.every((card) => card.comments.length === 0)) {
      return;
    } else if (isSameCountComments(this._cards)) {
      this._renderCards = shuffleArray(this._cards).slice(0, CardCount.MOST_COMMENTED_FILM); //
      this._renderExtraCards(this._renderCards, FilmsListTitle.MOST_COMMENTED);
    } else {
      this._renderCards = sortMostCommentedCards(this._cards).slice(0, CardCount.MOST_COMMENTED_FILM); //
      this._renderExtraCards(this._renderCards, FilmsListTitle.MOST_COMMENTED);
    }

  }

  _renderLoadMoreButton() {
    render(this._mainFilmsComponent.getElement(), this._loadMoreButtonComponent);
    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingMainFilmsCount;
      this._showingMainFilmsCount = this._showingMainFilmsCount + CardCount.BY_BUTTON;
      this._renderCards = this._sortedCards.slice(prevFilmsCount, this._showingMainFilmsCount); //
      this._renderMainCards(this._renderCards, FilmsListTitle.MAIN_FILM); //

      if (this._showingMainFilmsCount >= this._sortedCards.length) {
        this._loadMoreButtonComponent.removeElement();
      }
    });
  }

  _renderExtraCards(cards, title) {
    const extraFilmsComponent = new ExtraFilmsComponent(); //
    const container = extraFilmsComponent.getElement().querySelector(`.films-list__container`);
    extraFilmsComponent.setTitle(title);
    cards.forEach((card) => renderFilm(card, container));
    render(this._filmListComponent.getElement(), extraFilmsComponent);
  }

  _renderMainCards(cards, title) {
    const container = this._mainFilmsComponent.getElement().querySelector(`.films-list__container`);
    this._mainFilmsComponent.setTitle(title);
    cards.forEach((card) => renderFilm(card, container));
    this._renderLoadMoreButton();
  }

  _sortTypeChangeHandler(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._sortedCards = [...this._cards].sort((a, b) => b.releaseDate - a.releaseDate);
        break;
      case SortType.RATING:
        this._sortedCards = [...this._cards].sort((a, b) => b.rate - a.rate);
        break;
      case SortType.DEFAULT:
        this._sortedCards = [...this._cards];
        break;
    }
    const container = this._mainFilmsComponent.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;
    this._loadMoreButtonComponent.removeElement();
    this._showingMainFilmsCount = CardCount.MAIN_FILM;
    this._renderMainCards(this._sortedCards.slice(0, this._showingMainFilmsCount), FilmsListTitle.MAIN_FILM);
  }
}
