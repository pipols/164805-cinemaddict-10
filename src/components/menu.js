import {getPropertyCount, createElement} from '../utils';

const createMenuElement = (cards) => {
  const watchlistCount = getPropertyCount(cards, `isWatchlist`);
  const historyCount = getPropertyCount(cards, `isWatched`);
  const favoritesCount = getPropertyCount(cards, `isFavorite`);

  return (
    `<nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
        <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`);
};

export default class Menu {
  constructor(cards) {
    this._element = null;
    this._cards = cards;
  }

  getTemplate() {
    return createMenuElement(this._cards);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}
