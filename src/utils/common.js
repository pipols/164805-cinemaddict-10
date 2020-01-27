import moment from 'moment';

const TIME_TOKENS = `H[h] m[m]`;
const DATE_TOKENS = `DD MMMM YYYY`;

export const formatTime = (date) => {
  return moment(date).format(TIME_TOKENS);
};

export const formatDate = (date) => {
  return moment(date).format(DATE_TOKENS);
};

// 0 — звание не отображается;
// от 1 до 10 — novice;
// от 11 до 20 — fan;
// от 21 и выше — movie buff;
const NumberMoviesWatched = {
  NOVICE: 10,
  FAN: 20
};

const ProfileRank = {
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BUFF: `movie buff`
};

export const getProfileRating = (countWatched) => {
  if (countWatched <= NumberMoviesWatched.NOVICE) {
    return ProfileRank.NOVICE;
  } else if (countWatched <= NumberMoviesWatched.FAN) {
    return ProfileRank.FAN;
  } else if (countWatched > NumberMoviesWatched.FAN) {
    return ProfileRank.MOVIE_BUFF;
  }
  return ``;
};

// количество обьектов в массиве, у которого значение переданого свойства true
export const getPropertyCount = (arr, property) => arr.filter((elem) => elem[property]).length;

export const getLimitString = (string, maxLength, lastSymbol = `...`) => {
  return string.length > maxLength ? string.substr(0, maxLength - lastSymbol.length) + lastSymbol : string;
};

export const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

export const shuffleArray = ([...array]) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = getRandomIntegerNumber(0, currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const isSameValues = (array, key) => array.every((it) => it[key] === array[0][key]);

export const isSameCountComments = (cards) => cards.every((card) => card.comments.length === cards[0].comments.length);
