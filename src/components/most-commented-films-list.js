import {createElement} from '../utils';
import Card from './film-card';
import {CardCount} from '../const';


const createMostCommentedFilmsElement = (cards) => {
  const sortMostCommentedFilms = cards.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, CardCount.MOST_COMMENTED_FILM); //

  if (sortMostCommentedFilms.some((card) => card.comments.length > 0)) {
    const cardsTemplate = sortMostCommentedFilms.map((card) => new Card(card).getTemplate()).join(``);

    return `<section class="films-list--extra">
            <h2 class="films-list__title">Most commented</h2>
            <div class="films-list__container">${cardsTemplate}</div>
            </section>`;
  }
  return undefined;
};

export default class MostCommentedFilms {
  constructor(cards) {
    this._cards = cards;
    this._element = null;
  }

  getTemplate() {
    return createMostCommentedFilmsElement(this._cards);
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
