import CardComponent from '../components/film-card';
import FilmDetailsComponent from '../components/film-details';
import {render} from '../utils/render';
import {KeyCode} from '../const';

const siteBodyElement = document.querySelector(`body`);
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
    this._cardComponent = null;
    this._filmDetailsComponent = null;
    this._card = [];
  }

  render(card) {
    this._card = card;
    this._cardComponent = new CardComponent(card);
    this._filmDetailsComponent = new FilmDetailsComponent(card);

    const closePopup = () => {
      this._filmDetailsComponent.getElement().remove();
      this._filmDetailsComponent.removeElement();
      document.removeEventListener(`keydown`, cardDetailsEscHandler);
    };

    const cardDetailsClickHandler = () => {
      closePopup();
    };

    const cardClickHandler = () => {
      this._onViewChange(this._filmDetailsComponent);
      render(siteBodyElement, this._filmDetailsComponent);
      document.addEventListener(`keydown`, cardDetailsEscHandler);
      this._filmDetailsComponent.setCloseButtonClickHandler(cardDetailsClickHandler);
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
      this._onDataChange(this, this._card, Object.assign({}, this._card, {isWatchlist: !this._card.isWatchlist}));
    });

    this._cardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._card, Object.assign({}, this._card, {isWatched: !this._card.isWatched}));
    });

    this._cardComponent.setFavoriteButtonClick((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._card, Object.assign({}, this._card, {isFavorite: !this._card.isFavorite}));
    });

    this._filmDetailsComponent.setWatchedClickHandler();

    render(this._container, this._cardComponent);
  }

}
