import {getPropertyCount} from '../utils/common';
import AbstractComponent from './abstract-component';

const ACTIVE_CLASS = `main-navigation__item--active`;

const MainNavigationId = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATISTIC: `statistic`
};

const createMenuElement = (cards) => {
  const watchlistCount = getPropertyCount(cards, `isWatchlist`);
  const historyCount = getPropertyCount(cards, `isWatched`);
  const favoritesCount = getPropertyCount(cards, `isFavorite`);

  return (
    `<nav class="main-navigation">
        <a href="#all" id=${MainNavigationId.ALL} class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" id=${MainNavigationId.WATCHLIST} class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
        <a href="#history" id=${MainNavigationId.HISTORY} class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
        <a href="#favorites" id=${MainNavigationId.FAVORITES} class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
        <a href="#stats" id=${MainNavigationId.STATISTIC} class="main-navigation__item main-navigation__item--additional">Stats</a>
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
      evt.preventDefault();
      const activeLink = this.getElement().querySelector(`.${ACTIVE_CLASS}`);
      const id = evt.target.id;

      activeLink.classList.remove(ACTIVE_CLASS);
      evt.target.classList.add(ACTIVE_CLASS);

      return id === MainNavigationId.STATISTIC ? handler(null) : handler(id);
    });
  }

  setActiveLink(filter) {
    const activeLink = this.getElement().querySelector(`.${ACTIVE_CLASS}`);
    activeLink.classList.remove(ACTIVE_CLASS);

    const newActiveLink = this.getElement().querySelector(`#${filter}`);
    newActiveLink.classList.add(ACTIVE_CLASS);
  }

}
