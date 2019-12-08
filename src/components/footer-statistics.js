import {createElement} from '../utils.js';

const renderFooterStatistics = (cardsData) => {
  return `<section class="footer__statistics">
    <p>${cardsData.length} movies inside</p>
  </section>`;
};

export default class Statistics {
  constructor(cardsData) {
    this.element = null;
    this.cardsData = cardsData;
  }

  getTemplate() {
    return renderFooterStatistics(this.cardsData);
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
