import AbstractComponent from './abstract-component';

const renderFooterStatistics = (cardsData) => {
  return (
    `<section class="footer__statistics">
      <p>${cardsData.length} movies inside</p>
    </section>`);
};

export default class Statistics extends AbstractComponent {
  constructor(cardsData) {
    super();
    this._cardsData = cardsData;
  }

  getTemplate() {
    return renderFooterStatistics(this._cardsData);
  }
}
