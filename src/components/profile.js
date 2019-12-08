import {createElement} from '../utils.js';

const createProfileElement = (rating) => {
  return `<section class="header__profile profile">
           <p class="profile__rating">${rating}</p>
           <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
         </section>`;
};

export default class Profile {
  constructor(rating) {
    this.element = null;
    this.rating = rating;
  }

  getTemplate() {
    return createProfileElement(this.rating);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate);
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
