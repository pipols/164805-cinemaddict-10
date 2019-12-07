import {propertyCount} from '../utils.js';

export const createMenuElement = (cards) => {
  const watchlistCount = propertyCount(cards, `isWatchlist`);
  const historyCount = propertyCount(cards, `isWatched`);
  const favoritesCount = propertyCount(cards, `isFavorite`);

  return (`<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`);
};
