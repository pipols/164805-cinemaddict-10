import StatisticComponent from '../components/statistic';
import {render, replace} from '../utils/render';

export default class Statistic {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._statisticComponent = null;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._moviesModel.setDataChangeHandler(this._dataChangeHandler);
  }

  render() {
    const container = this._container;
    const allCards = this._moviesModel.getCardsAll();

    const oldComponent = this._statisticComponent;

    this._statisticComponent = new StatisticComponent(allCards);
    this._statisticComponent.renderChart();

    if (oldComponent) {
      replace(this._statisticComponent, oldComponent);
    } else {
      render(container, this._statisticComponent);
    }
  }

  _dataChangeHandler() {
    this.render();
  }

  hide() {
    this._statisticComponent.hide();
  }

  show() {
    this._statisticComponent.show();
  }

}
