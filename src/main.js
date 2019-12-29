import Menu from './components/menu';
import Sort from './components/sort';
import Card from './components/film-card';
import Profile from './components/profile';
import FilmList from './components/film-list';
import FilmDetails from './components/film-details';
import MainFilms from './components/main-films-list';
import RatedFilms from './components/rated-films-list';
import Statistics from './components/footer-statistics';
import LoadMoreButton from './components/load-more-button';
import MostCommentedFilms from './components/most-commented-films-list';

import {generateCards} from './mock/card';

import {KeyCode, CardCount} from './const';
import {getProfileRating, getPropertyCount, RenderPosition, render, createElement, shuffleArray} from './utils';

const MESSAGE_NO_FILMS = `There are no movies in our database`;

const tempData = generateCards(15);

const countWatched = getPropertyCount(tempData, `isWatched`);

const renderFilm = (filmMock, renderContainer) => {
  const card = new Card(filmMock);
  const filmDetails = new FilmDetails(filmMock);

  const cardDetailsClickHandler = () => {
    filmDetails.removeElement();
    document.removeEventListener(`keydown`, cardDetailsEscHandler);
  };

  const cardClickHandler = () => {
    render(siteBodyElement, filmDetails.getElement(), RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, cardDetailsEscHandler);
    filmDetails.setCloseButtonClickHandler(cardDetailsClickHandler);
  };

  const cardDetailsEscHandler = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      document.removeEventListener(`keydown`, cardDetailsEscHandler);
      filmDetails.removeElement();
    }
  };

  card.setCardPosterClickHandler(cardClickHandler);
  card.setCardTitleClickHandler(cardClickHandler);
  card.setCardCommentsClickHandler(cardClickHandler);
  render(renderContainer, card.getElement(), RenderPosition.BEFOREEND);
};

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`header`);
const siteMainElement = document.querySelector(`main`);
const siteFooterElement = document.querySelector(`footer`);

render(siteHeaderElement, new Profile(getProfileRating(countWatched)).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new Menu(tempData).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new Sort().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmList(tempData).getElement(), RenderPosition.BEFOREEND);
render(siteFooterElement, new Statistics(tempData).getElement(), RenderPosition.BEFOREEND);

const filmsElement = document.querySelector(`.films`);

const mainFilmsComponent = new MainFilms();
const ratedFilmsComponent = new RatedFilms();
const mostCommentedFilmsComponent = new MostCommentedFilms();
const loadMoreButtonComponent = new LoadMoreButton();

render(filmsElement, mainFilmsComponent.getElement(), RenderPosition.BEFOREEND);
render(filmsElement, ratedFilmsComponent.getElement(), RenderPosition.BEFOREEND);
render(filmsElement, mostCommentedFilmsComponent.getElement(), RenderPosition.BEFOREEND);

const mainFilmsContainer = mainFilmsComponent.getElement().querySelector(`.films-list__container`);
const ratedFilmsContainer = ratedFilmsComponent.getElement().querySelector(`.films-list__container`);
const mostCommentedFilmsContainer = mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`);
const mainCardsData = [...tempData];

const renderMainCards = () => {
  mainCardsData.splice(0, CardCount.MAIN_FILM).forEach((film) => renderFilm(film, mainFilmsContainer));
};

const loadMoreButtonClickHandler = () => {
  renderMainCards();
  if (mainCardsData.length === 0) {
    loadMoreButtonComponent.removeElement();
  }
};

if (mainCardsData.length === 0) {
  render(mainFilmsContainer, createElement(MESSAGE_NO_FILMS), RenderPosition.BEFOREEND);
} else {
  renderMainCards();
  render(mainFilmsComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
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
