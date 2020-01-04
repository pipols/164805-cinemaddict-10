import {generateCards} from './mock/card';
import PageController from './controllers/page-controller';

const siteMainElement = document.querySelector(`main`);
const cards = generateCards(15);

const pageController = new PageController(siteMainElement);
pageController.render(cards);
