import {getPropertyCount} from '../utils/common';
import AbstractComponent from './abstract-component';

const ACTIVE_CLASS = `main-navigation__item--active`;
const FILTERS = [`all`, `watchlist`, `history`, `favorites`];
const PREFIX_ID = `filter-`;

const createMenuElement = (cards) => {
  const watchlistCount = getPropertyCount(cards, `isWatchlist`);
  const historyCount = getPropertyCount(cards, `isWatched`);
  const favoritesCount = getPropertyCount(cards, `isFavorite`);

  return (
    `<nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item--active" id="filter-all">All movies</a>
        <a href="#watchlist" class="main-navigation__item" id="filter-watchlist">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
        <a href="#history" class="main-navigation__item" id="filter-history">History <span class="main-navigation__item-count">${historyCount}</span></a>
        <a href="#favorites" class="main-navigation__item" id="filter-favorites">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
        <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`);
};

export default class Menu extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createMenuElement(this._cards);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const id = evt.target.id;
      const filter = id.substr(PREFIX_ID.length);

      const activeLink = this.getElement().querySelector(`.${ACTIVE_CLASS}`);

      if (FILTERS.some((it) => it === filter)) {
        activeLink.classList.remove(ACTIVE_CLASS);
        evt.target.classList.add(ACTIVE_CLASS);
      }

      handler(filter);
    });
  }

  setActiveLink(filter) {
    const activeLink = this.getElement().querySelector(`.${ACTIVE_CLASS}`);
    activeLink.classList.remove(ACTIVE_CLASS);

    const newActiveLink = this.getElement().querySelector(`#${PREFIX_ID}${filter}`);
    newActiveLink.classList.add(ACTIVE_CLASS);
  }

}
