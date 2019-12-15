import Menu from './components/menu';
import Sort from './components/sort';
import Profile from './components/profile';
import FilmList from './components/film-list';
// import FilmDetails from './components/film-details';
import Statistics from './components/footer-statistics';

import {generateCards} from './mock/card';
import {getProfileRating, getPropertyCount, RenderPosition, render} from './utils';

const tempData = generateCards(15);

const countWatched = getPropertyCount(tempData, `isWatched`);

// const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`header`);
const siteMainElement = document.querySelector(`main`);
const siteFooterElement = document.querySelector(`footer`);

render(siteMainElement, new Menu(tempData).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new Sort().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmList(tempData).getElement(), RenderPosition.BEFOREEND);


// render(siteBodyElement, new FilmDetails(tempData[0]).getElement(), RenderPosition.BEFOREEND);
// document.querySelector(`.film-details`).classList.add(`visually-hidden`);

// const loadMoreButtonElement = document.querySelector(`.films-list__show-more`);

// const renderMainCard = () => {
//   renderCards.splice(0, CardCount.MAIN_FILM).forEach((card) => render(siteFilmListContainer, new Card(card).getElement(), RenderPosition.BEFOREEND));
//
//   if (renderCards.length === 0) {
//     loadMoreButtonElement.classList.add(`visually-hidden`);
//   }
// };

// const loadMoreButtonClickHandler = () => {
//   renderMainCard();
// };

// loadMoreButtonElement.addEventListener(`click`, loadMoreButtonClickHandler);

render(siteHeaderElement, new Profile(getProfileRating(countWatched)).getElement(), RenderPosition.BEFOREEND);
render(siteFooterElement, new Statistics(tempData).getElement(), RenderPosition.BEFOREEND);
