import {FilterType} from '../const';

export const getCardsByFilter = (cards, filter) => {
  switch (filter) {
    case FilterType.ALL:
      return cards;
    case FilterType.WATCHLIST:
      return cards.filter((card) => card.isWatchlist);
    case FilterType.HISTORY:
      return cards.filter((card) => card.isWatched);
    case FilterType.FAVORITES:
      return cards.filter((card) => card.isFavorite);
  }

  return cards;
};
