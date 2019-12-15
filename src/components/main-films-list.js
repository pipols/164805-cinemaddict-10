import Card from './film-card';
import {CardCount} from '../const';
import {createElement} from '../utils';
import LoadMoreButton from './load-more-button';

const MESSAGE_NO_FILMS = `There are no movies in our database`;

const createMainFilmsElement = (cards) => {
  let cardsTemplate;

  if (cards.length === 0) {
    cardsTemplate = MESSAGE_NO_FILMS;
  } else {
    cardsTemplate = cards.slice(0, CardCount.MAIN_FILM).map((card) => new Card(card).getTemplate()).join(``);
  }

  return `<section class="films-list">
            <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
            <div class="films-list__container">${cardsTemplate}</div>
            ${new LoadMoreButton().getTemplate()}
          </section>`;
};

export default class MainFilms {
  constructor(cards) {
    this._cards = cards;
    this._element = null;
  }

  getTemplate() {
    return createMainFilmsElement(this._cards);
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
