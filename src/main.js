import Menu from './components/menu';
import Sort from './components/sort';
import Card from './components/film-card';
import Profile from './components/profile';
import FilmList from './components/film-list';
import FilmDetails from './components/film-details';
import MainFilms from './components/main-films-list';
import ExtraFilms from './components/extra-films';
import Statistics from './components/statistics';
import LoadMoreButton from './components/load-more-button';

import {generateCards} from './mock/card';

import {KeyCode, CardCount, FilmsListTitle} from './const';
import {getProfileRating, getPropertyCount, RenderPosition, render, shuffleArray} from './utils';

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`header`);
const siteMainElement = document.querySelector(`main`);
const siteFooterElement = document.querySelector(`footer`);

const cards = generateCards(15);
const mainCardsData = [...cards];

const countWatched = getPropertyCount(cards, `isWatched`);

const renderFilm = (filmMock, renderContainer) => {
  const card = new Card(filmMock);
  const filmDetails = new FilmDetails(filmMock);

  const closePopup = () => {
    filmDetails.removeElement();
    document.removeEventListener(`keydown`, cardDetailsEscHandler);
  };

  const cardDetailsClickHandler = () => {
    closePopup();
  };

  const cardClickHandler = () => {
    render(siteBodyElement, filmDetails.getElement(), RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, cardDetailsEscHandler);
    filmDetails.setCloseButtonClickHandler(cardDetailsClickHandler);
  };

  const cardDetailsEscHandler = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      closePopup();
    }
  };

  card.setCardPosterClickHandler(cardClickHandler);
  card.setCardTitleClickHandler(cardClickHandler);
  card.setCardCommentsClickHandler(cardClickHandler);
  render(renderContainer, card.getElement(), RenderPosition.BEFOREEND);
};

render(siteHeaderElement, new Profile(getProfileRating(countWatched)).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new Menu(cards).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new Sort().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmList(cards).getElement(), RenderPosition.BEFOREEND);
render(siteFooterElement, new Statistics(cards).getElement(), RenderPosition.BEFOREEND);

const filmsElement = document.querySelector(`.films`);

const mainFilmsComponent = new MainFilms();
const ratedFilmsComponent = new ExtraFilms();
const mostCommentedFilmsComponent = new ExtraFilms();
const loadMoreButtonComponent = new LoadMoreButton();

render(filmsElement, mainFilmsComponent.getElement(), RenderPosition.BEFOREEND);

const mainFilmsContainer = mainFilmsComponent.getElement().querySelector(`.films-list__container`);
const ratedFilmsContainer = ratedFilmsComponent.getElement().querySelector(`.films-list__container`);
const mostCommentedFilmsContainer = mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`);

ratedFilmsComponent.getElement().querySelector(`.films-list__title`).textContent = FilmsListTitle.TOP_RATED;
mostCommentedFilmsComponent.getElement().querySelector(`.films-list__title`).textContent = FilmsListTitle.MOST_COMMENTED;

const renderMainCards = () => {
  mainCardsData.splice(0, CardCount.MAIN_FILM).forEach((film) => renderFilm(film, mainFilmsContainer));
};

const loadMoreButtonClickHandler = () => {
  renderMainCards();
  if (mainCardsData.length === 0) {
    loadMoreButtonComponent.removeElement();
  }
};

const title = mainFilmsComponent.getElement().querySelector(`.films-list__title`);

if (mainCardsData.length === 0) {
  title.textContent = FilmsListTitle.MESSAGE_NO_FILMS;
  title.classList.remove(`visually-hidden`);
} else {
  renderMainCards();
  render(mainFilmsComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
  render(filmsElement, ratedFilmsComponent.getElement(), RenderPosition.BEFOREEND);
  render(filmsElement, mostCommentedFilmsComponent.getElement(), RenderPosition.BEFOREEND);
  loadMoreButtonComponent.setClickHandler(loadMoreButtonClickHandler);
}

const sortRatedFilms = [...mainCardsData].sort((a, b) => b.rate - a.rate);

if (sortRatedFilms.every((film) => film.rate === sortRatedFilms[0].rate)) {
  shuffleArray(sortRatedFilms)
    .slice(0, CardCount.RATED_FILM)
    .forEach((film) => renderFilm(film, ratedFilmsContainer));
} else if (sortRatedFilms.some((card) => card.rate > 0)) {
  sortRatedFilms
    .slice(0, CardCount.RATED_FILM)
    .forEach((film) => renderFilm(film, ratedFilmsContainer));
}

const sortMostCommentedFilms = [...mainCardsData].sort((a, b) => b.comments.length - a.comments.length);

if (sortMostCommentedFilms.every((film) => film.comments.length === sortMostCommentedFilms[0].comments.length)) {
  shuffleArray(sortMostCommentedFilms)
    .slice(0, CardCount.MOST_COMMENTED_FILM)
    .forEach((film) => renderFilm(film, mostCommentedFilmsContainer));
} else if (sortMostCommentedFilms.some((card) => card.comments.length > 0)) {
  sortMostCommentedFilms
    .slice(0, CardCount.MOST_COMMENTED_FILM)
    .forEach((film) => renderFilm(film, mostCommentedFilmsContainer));
}
