import {createElement} from '../utils.js';

const createLoadMoreButtonElement = () => {
  return (`<button class="films-list__show-more">Show more</button>`);
};

export default class LoadMoreButton {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    return createLoadMoreButtonElement();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
