import CardComponent from '../components/film-card';
import FilmDetailsComponent from '../components/film-details';
import {render, replace, remove} from '../utils/render';
import {extend} from '../utils/common';
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

    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._escKeydownHandler = this._escKeydownHandler.bind(this);
    this._cardClickHandler = this._cardClickHandler.bind(this);
    this._deleteCommentButtonHandler = this._deleteCommentButtonHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  render(card) {
    const oldCardComponent = this._cardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._card = card;
    this._cardComponent = new CardComponent(card);
    this._filmDetailsComponent = new FilmDetailsComponent(card);

    this._cardComponent.setCardPosterClickHandler(this._cardClickHandler);
    this._cardComponent.setCardTitleClickHandler(this._cardClickHandler);
    this._cardComponent.setCardCommentsClickHandler(this._cardClickHandler);

    this._cardComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      evt.target.classList.toggle(ACTIVE_BUTTON);
      this._onDataChange(this, this._card, extend(this._card, {
        isWatchlist: !this._card.isWatchlist}));
    });

    this._cardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      evt.target.classList.toggle(ACTIVE_BUTTON);
      this._onDataChange(this, this._card, extend(this._card, {
        isWatched: !this._card.isWatched}));
    });

    this._cardComponent.setFavoriteButtonClick((evt) => {
      evt.preventDefault();
      evt.target.classList.toggle(ACTIVE_BUTTON);
      this._onDataChange(this, this._card, extend(this._card, {
        isFavorite: !this._card.isFavorite}));
    });

    this._filmDetailsComponent.setWatchlistChangeHandler(() => {
      this._onDataChange(this, this._card, extend(this._card, {
        isWatchlist: !this._card.isWatchlist}));
    });

    this._filmDetailsComponent.setWatchedChangeHandler(() => {
      this._onDataChange(this, this._card, extend(this._card, {
        isWatched: !this._card.isWatched}));
    });

    this._filmDetailsComponent.setFavoriteChangeHandler(() => {
      this._onDataChange(this, this._card, extend(this._card, {
        isFavorite: !this._card.isFavorite
      }));
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this._filmDetailsComponent.setEmojiChangeHandler();

    this._filmDetailsComponent.setDeleteCommentButtonHandler(this._deleteCommentButtonHandler);
    this._filmDetailsComponent.setFormSubmitHandler(this._formSubmitHandler);

    if (oldFilmDetailsComponent && oldCardComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._cardComponent);
    }

  }

  destroy() {
    remove(this._cardComponent);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._escKeydownHandler);
  }

  _closePopup() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._escKeydownHandler);
  }

  _closeButtonClickHandler() {
    this._closePopup();
  }

  _escKeydownHandler(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._closePopup();
    }
  }

  _cardClickHandler() {
    this._onViewChange(this._filmDetailsComponent);
    render(siteBodyElement, this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._escKeydownHandler);
    this._filmDetailsComponent.recoveryListeners();
  }

  _deleteCommentButtonHandler(evt) {
    evt.preventDefault();

    const comment = evt.target.closest(`.film-details__comment`); //
    if (!comment) {
      return;
    }

    const index = Array
      .from(this._filmDetailsComponent.getElement().querySelectorAll(`.film-details__comment`))
      .findIndex((item) => item === comment);

    const newCard = extend(this._card, this._card.comments.splice(index, 1));
    this._onDataChange(this, this._card, newCard);

    comment.remove();
  }

  _formSubmitHandler(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.key === KeyCode.ENTER) {
      const data = new FormData(evt.target.form);

      const comment = data.get(`comment`);
      const emoji = data.get(`comment-emoji`);

      const newComment = {
        emotion: emoji,
        commentText: comment,
        author: `John Doe`,
        date: new Date()
      };

      this._onDataChange(this, this._card, extend(this._card, this._card.comments.unshift(newComment)));
    }
  }

}
