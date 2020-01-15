import AbstractComponent from './abstract-component';

const renderFooterStatistics = (cards) => {
  return (
    `<section class="footer__statistics">
      <p>${cards.length} movies inside</p>
    </section>`);
};

export default class Statistics extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return renderFooterStatistics(this._cards);
  }
}
