import {createElement} from '../utils';

const renderFooterStatistics = (cardsData) => {
  return (
    `<section class="footer__statistics">
      <p>${cardsData.length} movies inside</p>
    </section>`);
};

export default class Statistics {
  constructor(cardsData) {
    this._element = null;
    this._cardsData = cardsData;
  }

  getTemplate() {
    return renderFooterStatistics(this._cardsData);
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
