import {createFilmCardElement} from './components/film-card.js';
import {createFilmDetailsElement} from './components/film-details';
import {createMenuElement} from './components/menu.js';
import {createLoadMoreButtonElement} from './components/load-more-button.js';
import {createFilmListElement} from './components/film-list.js';
import {createProfileElement} from './components/profile.js';
import {createSortElement} from './components/sort.js';
import {generateCards} from './mock/card.js';
import {createComment} from './mock/comments.js';
import {renderFooterStatistics} from './components/footer-statistics.js';
import {getProfileRating, propertyCount} from './utils.js';
// константы заглавными
const tempData = generateCards(15);
const tempComments = [createComment(), createComment()]; // мега-лень
const renderCards = tempData.slice();

const countWatched = propertyCount(tempData, `isWatched`);

const sortRatedFilms = tempData.slice().sort((a, b) => b.rate - a.rate);
const sortMostCommentedFilms = tempData.slice().sort((a, b) => b.comments - a.comments);

const CardCount = {
  MAIN_FILM: 5,
  RATED_FILM: 2,
  MOST_COMMENTED_FILM: 2
};

const siteMainElement = document.querySelector(`main`);
const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`header`);
const siteFooterElement = document.querySelector(`footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteMainElement, createMenuElement(tempData), `beforeend`);
render(siteMainElement, createSortElement(), `beforeend`);
render(siteMainElement, createFilmListElement(), `beforeend`);
render(siteBodyElement, createFilmDetailsElement(tempData[0], tempComments), `beforeend`);
document.querySelector(`.film-details`).classList.add(`visually-hidden`);

const siteFilmListElement = document.querySelector(`.films-list`);
render(siteFilmListElement, createLoadMoreButtonElement(), `beforeend`);

const siteFilmListContainer = siteFilmListElement.querySelector(`.films-list__container`);
const loadMoreButtonElement = document.querySelector(`.films-list__show-more`);

const renderMainCard = () => {
  renderCards.splice(0, CardCount.MAIN_FILM).forEach((card) => render(siteFilmListContainer, createFilmCardElement(card), `beforeend`));

  if (renderCards.length === 0) {
    loadMoreButtonElement.classList.add(`visually-hidden`);
  }
};

renderMainCard();

loadMoreButtonElement.addEventListener(`click`, renderMainCard);

const siteFilmsElement = document.querySelector(`.films`);

if (tempData.some((card) => card.rate > 0)) {
  const siteTopRatedFilmElement = siteFilmsElement.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);
  sortRatedFilms.slice(0, CardCount.RATED_FILM).forEach((card) => render(siteTopRatedFilmElement, createFilmCardElement(card), `beforeend`));
}

if (tempData.some((card) => card.comments > 0)) {
  const siteMostCommentedfilmElement = siteFilmsElement.querySelector(`.films-list--extra:nth-child(3) .films-list__container`);
  sortMostCommentedFilms.slice(0, CardCount.MOST_COMMENTED_FILM).forEach((card) => render(siteMostCommentedfilmElement, createFilmCardElement(card), `beforeend`));
}

render(siteHeaderElement, createProfileElement(getProfileRating(countWatched)), `beforeend`);
render(siteFooterElement, renderFooterStatistics(tempData), `beforeend`);
