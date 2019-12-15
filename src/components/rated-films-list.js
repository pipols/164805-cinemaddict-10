import {createElement} from '../utils';
import Card from './film-card';
import {CardCount} from '../const';

const createRatedFilmsElement = (cards) => {
  const sortRatedFilms = cards.slice().sort((a, b) => b.rate - a.rate).slice(0, CardCount.RATED_FILM);

  if (sortRatedFilms.some((card) => card.rate > 0)) {
    const cardsTemplate = sortRatedFilms.map((card) => new Card(card).getTemplate()).join(``);

    return `<section class="films-list--extra">
            <h2 class="films-list__title">Top rated</h2>
            <div class="films-list__container">${cardsTemplate}</div>
          </section>`;
  }
  return null;
};

export default class RatedFilms {
  constructor(cards) {
    this._cards = cards;
    this.element = null;
  }

  getTemplate() {
    return createRatedFilmsElement(this._cards);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
