import {getFormattedTime, TimeToken} from '../utils/common';
import Comment from './comment';
import AbstractSmartComponent from './abstract-smart-component';

const MAX_USER_RATING = 9;
const EMOGIS = [`smile`, `sleeping`, `puke`, `angry`];
// const Filter = {
//   watchlist: `isWatchlist`,
//   watched: `isWatched`,
//   favorite: `isFavorite`
// };
// префикс в константы
const EMOJI_SRC_PREFIX = `./images/emoji/`;

const Emoji = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`
};

const emojiImg = {
  [Emoji.SMILE]: `smile.png`,
  [Emoji.SLEEPING]: `sleeping.png`,
  [Emoji.PUKE]: `puke.png`,
  [Emoji.ANGRY]: `angry.png`,
};

const createfilmsGenre = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const createUserRatingScoreMarkup = (num) => {
  return (
    `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${num}" id="rating-${num}">
     <label class="film-details__user-rating-label" for="rating-${num}">${num}</label>`);
};

const createEmojiListMarkup = (emoji) => {
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
     <label class="film-details__emoji-label" for="emoji-${emoji}">
       <img src="${EMOJI_SRC_PREFIX}${emojiImg[emoji]}" width="30" height="30" alt="emoji">
     </label>`);
};

const createUserEmojiMarkup = (emoji) => {
  return `<img src="${EMOJI_SRC_PREFIX}${emojiImg[emoji]}" width="55" height="55" alt="emoji">`;
};

const createRatingMarkup = () => {
  return `<div class="form-details__middle-container">
    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <button class="film-details__watched-reset" type="button">Undo</button>
      </div>

      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="./images/posters/the-great-flamarion.jpg" alt="film-poster" class="film-details__user-rating-img">
        </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">The Great Flamarion</h3>

          <p class="film-details__user-rating-feelings">How you feel it?</p>

          <div class="film-details__user-rating-score">
            ${Array(MAX_USER_RATING).fill(``).map((elem, i) => createUserRatingScoreMarkup(i + 1)).join(``)}
          </div>
        </section>
      </div>
    </section>
  </div>
`;
};

const createFilmDetailsElement = (card) => {
  const {
    poster,
    title,
    rate,
    releaseDate,
    director,
    writers,
    actors,
    country,
    age,
    genre,
    description,
    duration,
    comments,
    isWatchlist,
    isWatched,
    isFavorite
  } = card;

  const titleGenre = (genre.length > 1) ? `Genres` : `Genre`;

  return (`<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}">
            <p class="film-details__age">${age}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rate}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${getFormattedTime(releaseDate, TimeToken.date)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getFormattedTime(duration, TimeToken.time)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${titleGenre}</td>
                <td class="film-details__cell">
                  ${genre.map(createfilmsGenre).join(` `)}
              </tr>
            </table>

            <p class="film-details__film-description">${description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      ${isWatched ? createRatingMarkup() : ``}

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${comments.map((comment) => new Comment(comment).getTemplate()).join(``)}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">

            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              ${EMOGIS.map(createEmojiListMarkup).join(``)}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`);
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;

    this._watchlistChangeHandler = null;
    this._watchedChangeHandler = null;
    this._favoriteChangeHandler = null;

    this._closeButtonClickHandler = null;
    this._escKeydownHandler = null;
    this._deleteCommentButtonHandler = null;
    this._formChangeHandler = null;
  }

  getTemplate() {
    return createFilmDetailsElement(this._card);
  }

  setCloseButtonClickHandler(handler) {
    this._closeButtonClickHandler = handler;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeButtonClickHandler);
  }

  setWatchlistChangeHandler(handler) {
    this._watchlistChangeHandler = handler;
    this.getElement().querySelector(`input[name=watchlist]`).addEventListener(`change`, this._watchlistChangeHandler);
  }

  setWatchedChangeHandler(handler) {
    this._watchedChangeHandler = handler;
    this.getElement().querySelector(`input[name=watched]`).addEventListener(`change`, this._watchedChangeHandler);
  }

  setFavoriteChangeHandler(handler) {
    this._favoriteChangeHandler = handler;
    this.getElement().querySelector(`input[name=favorite]`).addEventListener(`change`, this._favoriteChangeHandler);
  }

  setEmojiChangeHandler() {
    const container = this.getElement().querySelector(`.film-details__add-emoji-label`);
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      const value = evt.target.value;
      container.innerHTML = createUserEmojiMarkup(value);
    });
  }

  setDeleteCommentButtonHandler(handler) {
    this._deleteCommentButtonHandler = handler;
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((item) => {
      item.addEventListener(`click`, handler);
    });
  }

  setFormSubmitHandler(handler) {
    this._formChangeHandler = handler;
    this.getElement().querySelector(`.film-details__inner`).addEventListener(`keydown`, handler);
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);

    this.setWatchlistChangeHandler(this._watchlistChangeHandler);
    this.setWatchedChangeHandler(this._watchedChangeHandler);
    this.setFavoriteChangeHandler(this._favoriteChangeHandler);

    this.setEmojiChangeHandler();
    this.setDeleteCommentButtonHandler(this._deleteCommentButtonHandler);
    this.setFormSubmitHandler(this._formChangeHandler);
  }
}
