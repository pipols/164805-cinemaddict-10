import {createElement} from '../utils';

const createLoadMoreButtonElement = () => {
  return (`<button class="films-list__show-more">Show more</button>`);
};

export default class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createLoadMoreButtonElement();
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

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
