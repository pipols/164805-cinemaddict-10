import {createElement} from '../utils';

const createProfileElement = (rating) => {
  return (
    `<section class="header__profile profile">
       <p class="profile__rating">${rating}</p>
       <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
     </section>`);
};

export default class Profile {
  constructor(rating) {
    this._element = null;
    this._rating = rating;
  }

  getTemplate() {
    return createProfileElement(this._rating);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
