const ProfileRank = {
  NOVICE: 10,
  FAN: 20
};

export const getProfileRating = (countWatched) => { //
  if (countWatched === 0) {
    return 0;
  } else if (countWatched <= ProfileRank.NOVICE) {
    return `novice`;
  } else if (countWatched <= ProfileRank.FAN) {
    return `fan`;
  } else {
    return `movie buff`;
  }
};

// количество обьектов в массиве, у которого значение переданого свойства true
export const getPropertyCount = (arr, property) => arr.filter((elem) => elem[property]).length;

// ограничение длины строки
const MAXIMUM_DESCRIPTION_LENGTH = 140;

export const getLimitString = (string, maxLength, lastSymbol = `...`) => {
  if (string.length > MAXIMUM_DESCRIPTION_LENGTH) {
    return string.substr(0, maxLength - lastSymbol.length) + lastSymbol;
  }
  return string;
};

export const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
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
