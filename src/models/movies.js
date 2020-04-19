import {getCardsByFilter} from '../utils/filter';
import {getCardsBySortType, sortRatedCards, sortMostCommentedCards} from '../utils/sort';
import {SortType, FilterType, CardCount} from '../const';
import {isSameValues, shuffleArray, isSameCountComments} from '../utils/common';

export default class Movies {
  constructor() {
    this._cards = [];
    this._activeFilterType = FilterType.ALL;
    this._activeSortType = SortType.DEFAULT;

    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
    this._sortChangeHandlers = [];
  }

  setCards(cards) {
    this._cards = Array.from(cards);
  }

  getCards() {
    const filteredCards = getCardsByFilter(this._cards, this._activeFilterType);
    return getCardsBySortType(filteredCards, this._activeSortType);
  }

  getCardsAll() {
    return this._cards;
  }

  getTopRatedCards() {
    const cards = this._cards;

    if (cards.every((card) => card.rate === 0)) {
      return [];
    } else if (isSameValues(cards, `rate`)) {
      return shuffleArray(cards).slice(0, CardCount.RATED_FILM);
    } else {
      return sortRatedCards(cards).slice(0, CardCount.RATED_FILM);
    }
  }

  getMostCommentedCards() {
    const cards = this._cards;

    if (cards.every((card) => card.comments.length === 0)) {
      return [];
    } else if (isSameCountComments(cards)) {
      return shuffleArray(cards).slice(0, CardCount.MOST_COMMENTED_FILM);
    } else {
      return sortMostCommentedCards(cards).slice(0, CardCount.MOST_COMMENTED_FILM);
    }
  }

  updateCard(id, card) {
    const index = this._cards.findIndex((it) => it.id === id);

    if (index === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, index), card, this._cards.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  getFilter() {
    return this._activeFilterType;
  }

  setSort(sortType) {
    this._activeSortType = sortType;
    this._callHandlers(this._sortChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setSortChangeHandler(handler) {
    this._sortChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

}
