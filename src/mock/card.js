import {getRandomArrayItem, getRandomIntegerNumber, shuffleArray} from './utils.js';
const MIN_COUNT_DESCRIPTION = 1;
const MAX_COUNT_DESCRIPTION = 3;

const FilmsName = [
  `The Godfather`,
  `Star Wars: Episode V — The Empire Strikes Back`,
  `The Dark Knight`,
  `The Shawshank Redemption`,
  `Pulp Fiction`,
  `GoodFellas`,
  `Raiders Of The Lost Ark`,
  `Jaws`,
  `Star Wars: Episode IV — A New Hope`,
  `The Lord Of The Rings: The Fellowship Of The Ring`,
  `Back To The Future`,
  `The Godfather Part II`,
  `Blade Runner`,
  `Alien`,
  `Aliens`,
  `The Lord Of The Rings: The Return Of The King`,
  `Fight Club`,
  `Inception`,
  `Jurassic Park`
];

const Description = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const Posters = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`
];

export const generateCard = () => {
  const countDescription = getRandomIntegerNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION);

  return {
    title: getRandomArrayItem(FilmsName),
    rate: getRandomIntegerNumber(0, 100) / 10,
    poster: getRandomArrayItem(Posters),
    description: shuffleArray(Description).slice(0, countDescription).join(` `),
    comments: Math.floor(Math.random() * 10),
    genre: [`Action`, `Adventure`],
    isWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    director: [`Anthony Mann`],
    writers: [`Anne Wigton`, `Heinz Herald`, `Richard Weil`],
    actors: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`],
    releaseDate: new Date(), // (2019, 11, 5)
    country: [`USA`],
    // duration: ,
    age: [`18+`],
    // runtime:
  };
};

// Постер (картинка);
// Название фильма;
// Рейтинг;
// Год производства;
// Продолжительность (в формате «1h 36m»);
// Жанр;
// Краткое описание (не более 140 символов);
// Количество комментариев.

export const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};
