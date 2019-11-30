import {createFilmCardElement} from './components/film-card.js';
import {createFilmDetailsElement} from './components/film-details';
import {createMenuElement} from './components/menu.js';
import {createLoadMoreButtonElement} from './components/load-more-button.js';
import {createFilmListElement} from './components/film-list.js';
import {createProfileElement} from './components/profile.js';


const CardCount = {
  SORT_FILM: 5,
  RATED_FILM: 2,
  MOST_COMMENTED_FILM: 2
};

const siteMainElement = document.querySelector(`main`);
const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`header`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteMainElement, createMenuElement(), `beforeend`);
render(siteMainElement, createFilmListElement(), `beforeend`);
render(siteBodyElement, createFilmDetailsElement(), `beforeend`);
document.querySelector(`.film-details`).classList.add(`visually-hidden`); //

const siteFilmListElement = document.querySelector(`.films-list`);
render(siteFilmListElement, createLoadMoreButtonElement(), `beforeend`);

const siteFilmListContainer = siteFilmListElement.querySelector(`.films-list__container`);

render(siteFilmListContainer, Array(CardCount.SORT_FILM).fill(``).map(() => createFilmCardElement()).join(``), `beforeend`);
const siteFilmsElement = document.querySelector(`.films`);
const siteTopRatedFilmElement = siteFilmsElement.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);
const siteMostCommentedfilmElement = siteFilmsElement.querySelector(`.films-list--extra:nth-child(3) .films-list__container`);

render(siteTopRatedFilmElement, Array(CardCount.RATED_FILM).fill(``).map(() => createFilmCardElement()).join(``), `beforeend`);
render(siteMostCommentedfilmElement, Array(CardCount.MOST_COMMENTED_FILM).fill(``).map(() => createFilmCardElement()).join(``), `beforeend`);
render(siteHeaderElement, createProfileElement(), `beforeend`);
