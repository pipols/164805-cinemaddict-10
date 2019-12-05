// const parseCommentDay = (day) => {
//
// };

export const createCommentElement = (comment) => {
  const {emojiSrc, text, author} = comment;
  return `<li class="film-details__comment">
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
  </li>`;
};
