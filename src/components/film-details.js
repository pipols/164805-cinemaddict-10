import {MONTH_NAMES} from '../const';
import {getTimeFromMins} from '../utils/common';
import Comment from './comment';
import AbstractSmartComponent from './abstract-smart-component';

const MAX_USER_RATING = 9;
const EMOJI_LIST = [`smile`, `sleeping`, `puke`, `angry`];
// const Filter = {
//   watchlist: `isWatchlist`,
//   watched: `isWatched`,
//   favorite: `isFavorite`
// };

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
       <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
     </label>`);
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

  const parseReleaseDate = `${releaseDate.getDate()} ${MONTH_NAMES[releaseDate.getMonth()]} ${releaseDate.getFullYear()}`;
  const formatedTime = getTimeFromMins(duration);
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
                <td class="film-details__cell">${parseReleaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formatedTime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${titleGenre}</td>
                <td class="film-details__cell">
                  ${genre.map((it) => createfilmsGenre(it)).join(` `)}
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
              ${Array(EMOJI_LIST.length).fill(``).map((elem, i) => createEmojiListMarkup(EMOJI_LIST[i])).join(``)}
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
    this._comments = card.comments;
    this._watchedClickHandler = null;
    this._closeButtonClickHandler = null;
  }

  getTemplate() {
    return createFilmDetailsElement(this._card, this._comments);
  }

  setCloseButtonClickHandler(handler) {
    this._closeButtonClickHandler = handler;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeButtonClickHandler);
  }

  setWatchedClickHandler(handler) {
    this._watchedClickHandler = handler;
    this.getElement().querySelector(`input[name=watched]`).addEventListener(`change`, this._watchedClickHandler);
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this.setWatchedClickHandler(this._watchedClickHandler);
  }
}
