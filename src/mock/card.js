import {getRandomItem, getRandomIntegerNumber, shuffleArray, getRandomBoolean} from './utils';
import {createComment} from './comments';

const MIN_COUNT_DESCRIPTION = 1;
const MAX_COUNT_DESCRIPTION = 3;

const FILMS_NAME = [
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

const DESCRIPTION = [
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

const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

export const generateCard = () => {
  const countDescription = getRandomIntegerNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION);
  const getComments = () => {
    const count = getRandomIntegerNumber(0, 10);
    return new Array(count).fill(``).map(createComment);
  };

  return {
    title: getRandomItem(FILMS_NAME),
    rate: getRandomIntegerNumber(0, 100) / 10,
    poster: getRandomItem(POSTERS),
    description: shuffleArray(DESCRIPTION).slice(0, countDescription).join(` `),
    comments: getComments(),
    genre: [`Action`, `Adventure`],
    isWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
    director: [`Anthony Mann`],
    writers: [`Anne Wigton`, `Heinz Herald`, `Richard Weil`],
    actors: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`],
    releaseDate: new Date(`1980-01-17`),
    country: [`USA`],
    duration: getRandomIntegerNumber(30, 180),
    age: [`18+`],
  };
};

export const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};
