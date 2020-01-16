import CardComponent from '../components/film-card';
import FilmDetailsComponent from '../components/film-details';
import {render, replace} from '../utils/render';
import {KeyCode} from '../const';

const siteBodyElement = document.querySelector(`body`);
const ACTIVE_BUTTON = `film-card__controls-item--active`;

//
// const Filter = {
//   watchlist: `isWatchlist`,
//   watched: `isWatched`,
//   favorite: `isFavorite`
// };

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._card = [];

    this._cardComponent = null;
    this._filmDetailsComponent = null;
  }

  render(card) {
    const oldCardComponent = this._cardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._card = card;
    this._cardComponent = new CardComponent(card);
    this._filmDetailsComponent = new FilmDetailsComponent(card);

    const closePopup = () => {
      this._filmDetailsComponent.getElement().remove();
      this._filmDetailsComponent.removeElement();
    };

    const cardDetailsClickHandler = () => {
      closePopup();
    };

    const cardClickHandler = () => {
      this._onViewChange(this._filmDetailsComponent);
      render(siteBodyElement, this._filmDetailsComponent);
    };

    const cardDetailsEscHandler = (evt) => {
      if (evt.keyCode === KeyCode.ESC) {
        closePopup();
      }
    };

    this._cardComponent.setCardPosterClickHandler(cardClickHandler);
    this._cardComponent.setCardTitleClickHandler(cardClickHandler);
    this._cardComponent.setCardCommentsClickHandler(cardClickHandler);

    this._cardComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      evt.target.classList.toggle(ACTIVE_BUTTON);
      this._onDataChange(this, this._card, Object.assign({}, this._card, {isWatchlist: !this._card.isWatchlist}));
    });

    this._cardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      evt.target.classList.toggle(ACTIVE_BUTTON);
      this._onDataChange(this, this._card, Object.assign({}, this._card, {isWatched: !this._card.isWatched}));
    });

    this._cardComponent.setFavoriteButtonClick((evt) => {
      evt.preventDefault();
      evt.target.classList.toggle(ACTIVE_BUTTON);
      this._onDataChange(this, this._card, Object.assign({}, this._card, {isFavorite: !this._card.isFavorite}));
    });

    this._filmDetailsComponent.setWatchlistChangeHandler(() => {
      this._onDataChange(this, this._card, Object.assign({}, this._card, {isWatchlist: !this._card.isWatchlist}));
    });

    this._filmDetailsComponent.setWatchedChangeHandler(() => {
      this._onDataChange(this, this._card, Object.assign({}, this._card, {isWatched: !this._card.isWatched}));
    });

    this._filmDetailsComponent.setFavoriteChangeHandler(() => {
      this._onDataChange(this, this._card, Object.assign({}, this._card, {isFavorite: !this._card.isFavorite}));
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(cardDetailsClickHandler);
    this._filmDetailsComponent.setEscKeydownHandler(cardDetailsEscHandler);

    this._filmDetailsComponent.setEmojiChangeHandler();

    if (oldFilmDetailsComponent && oldCardComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._cardComponent);
    }

  }

}
