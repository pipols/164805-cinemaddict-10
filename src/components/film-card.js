import {getLimitString, getTimeFromMins, createElement} from '../utils';

const MAX_LENGTH_DESCRIPTION = 140;

const createFilmCardElement = (card) => {
  const {title, poster, description, comments, genre, releaseDate, rate, duration} = card;
  const getLimitDescription = getLimitString(description, MAX_LENGTH_DESCRIPTION);
  const formatedTime = getTimeFromMins(duration);

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rate}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseDate.getFullYear()}</span>
          <span class="film-card__duration">${formatedTime}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
        <p class="film-card__description">${getLimitDescription}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>`);
};

export default class Card {
  constructor(card) {
    this._element = null;
    this._card = card;
  }

  getTemplate() {
    return createFilmCardElement(this._card);
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

  setCardPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }

  setCardTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
  }

  setCardCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }
}
