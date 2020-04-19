import {generateCards} from './mock/card';
import PageController from './controllers/page-controller';
import FilterController from './controllers/filter-controller';
import SortController from './controllers/sort-controller';
import StatisticController from './controllers/statistic-controller';
import Movies from './models/movies';

const siteMainElement = document.querySelector(`main`);
const cards = generateCards(15);

const moviesModel = new Movies();
moviesModel.setCards(cards);

const pageController = new PageController(siteMainElement, moviesModel);
const filterController = new FilterController(siteMainElement, moviesModel);
const sortController = new SortController(siteMainElement, moviesModel);
const statisticController = new StatisticController(siteMainElement, moviesModel);

filterController.render();
sortController.render();
pageController.render();
statisticController.render();

const filterComponent = filterController.getFilterComponent();

filterComponent.setFilterChangeHandler((filter) => {
  if (!filter) {
    pageController.hide();
    sortController.hide();
    statisticController.show();
  } else {
    pageController.show();
    sortController.show();
    statisticController.hide();
  }
});
