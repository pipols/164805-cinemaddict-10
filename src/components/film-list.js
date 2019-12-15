import {createElement} from '../utils';
import MainFilms from './main-films-list';
import RatedFilms from './rated-films-list';
import MostCommentedFilms from './most-commented-films-list';

const createFilmListElement = (cards) => {
  return (
    `<section class="films">
      ${new MainFilms(cards).getTemplate()}
      ${new RatedFilms(cards).getTemplate()}
      ${new MostCommentedFilms(cards).getTemplate()}
    </section>`);
};

export default class FilmList {
  constructor(cards) {
    this._element = null;
    this._cards = cards;
  }

  getTemplate() {
    return createFilmListElement(this._cards);
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
