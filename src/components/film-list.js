import {createElement} from '../utils.js';

const createFilmListElement = () => {
  return (`<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
    </section>

    <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>
  </section>`);
};

export default class FilmList {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    return createFilmListElement();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate);
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
