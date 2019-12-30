import {createElement} from '../utils';

const createRatedFilmsElement = () => {
  return `<section class="films-list--extra">
            <h2 class="films-list__title">Top rated</h2>
            <div class="films-list__container"></div>
          </section>`;
};

export default class RatedFilms {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    return createRatedFilmsElement();
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
