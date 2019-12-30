import {createElement} from '../utils';

const createMostCommentedFilmsElement = () => {
  return `<section class="films-list--extra">
            <h2 class="films-list__title">Most commented</h2>
            <div class="films-list__container"></div>
            </section>`;
};

export default class MostCommentedFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMostCommentedFilmsElement();
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
