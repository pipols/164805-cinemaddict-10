import {createUserRankElement} from './user-rank.js';

export const createProfileElement = () => {
  return `<section class="header__profile profile">
           ${createUserRankElement()}
           <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
         </section>`;
};
