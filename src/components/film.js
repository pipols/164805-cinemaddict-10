// import Card from './film-card';
// import FilmDetails from './film-details';
// import {render, RenderPosition} from '../utils';
//
// export default class film {
//   constructor(cardData) {
//     this._cardData = cardData;
//     this._filmCardComponent = new Card(this._cardData);
//     this._filmDetailsComponent = new FilmDetails(this._cardData);
//   }
//
//   setCardPosterClickHandler(handler) {
//     this._filmCardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
//   }
//
//   setCardTitleClickHandler(handler) {
//     this._filmCardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
//   }
//
//   setCardCommentsClickHandler(handler) {
//     this._filmCardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
//   }
//
//   removeElement() {
//     this._element.remove();
//     this._element = null;
//   }
//
// }
// //
// film.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
//   render(mainElement, this._filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
// }
