import SortComponent from '../components/sort';
import {render, replace} from '../utils/render';
import {SortType} from '../const';

export default class sortController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeSortType = SortType.DEFAULT;
    this._sortComponent = null;

    this._sortChangeHandler = this._sortChangeHandler.bind(this);
  }

  render() {
    const container = this._container;
    const oldComponent = this._SortComponent;

    this._sortComponent = new SortComponent();
    this._sortComponent.setSortChangeHandler(this._sortChangeHandler);

    if (oldComponent) {
      replace(this._sortComponent, oldComponent);
    } else {
      render(container, this._sortComponent);
    }
  }

  _sortChangeHandler(sortType) {
    this._moviesModel.setSort(sortType);
    this._activeSortType = sortType;
  }

}
