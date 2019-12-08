export const getProfileRating = (countWatched) => {
  if (countWatched === 0) {
    return 0;
  } else if (countWatched >= 1 && countWatched <= 10) {
    return `novice`;
  } else if (countWatched >= 11 && countWatched <= 20) {
    return `fan`;
  } else {
    return `movie buff`;
  }
};

// количество обьектов в массиве, у которого значение переданого свойства true
export const propertyCount = (arr, property) => arr.filter((elem) => elem[property]).length; // naming?

// ограничение длины строки
export const getLimitString = (string, maxLength, lastSymbol = `...`) => {
  return string.substr(0, maxLength - lastSymbol.length) + lastSymbol;
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

  return newElement.firstChild;
};
