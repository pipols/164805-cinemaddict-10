import {createElement} from '../utils';

const createCommentElement = (comment) => {
  const {emojiSrc, text, author} = comment;
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emojiSrc}" width="55" height="55" alt="emoji">
      </span>
      <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">Today</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
      </div>
    </li>`);
};

export default class Comment {
  constructor(comment) {
    this._element = null;
    this._comment = comment;
  }

  getTemplate() {
    return createCommentElement(this._comment);
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
}
