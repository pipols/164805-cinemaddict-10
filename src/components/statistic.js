import AbstractComponent from './abstract-component';
import {getPropertyCount} from '../utils/common';
import Chart from 'chart.js';
import chartDataLabels from 'chartjs-plugin-datalabels';

const getAllGenres = (cards) => cards.reduce((acc, card) => acc.concat(card.genre), []);

const getTopGenre = (cards) => {
  const uniqueGenres = getUniqueGenres(cards); // уникальные жанры
  const genresCount = getCountElements(cards); // количество каждого жанра
  const maxCount = Math.max(...genresCount);
  const index = genresCount.findIndex((num) => maxCount === num);

  return uniqueGenres[index];
};

const getTimeAddition = (cards) => {
  return cards.reduce((acc, card) => acc + card.duration, 0);
};

const getHours = (cards) => {
  const time = getTimeAddition(cards);
  return Math.trunc(time / 60);
};

const getMinutes = (cards) => {
  const time = getTimeAddition(cards);
  return time % 60;
};

const getUniqueGenres = (cards) => {
  const set = new Set();
  const genres = getAllGenres(cards);
  genres.forEach((genre) => set.add(genre));
  return [...set];
};

const getCountElements = (cards) => {
  const uniqCards = getUniqueGenres(cards);
  const getConcatCard = cards.reduce((acc, card) => acc.concat(card.genre), []);

  return uniqCards.map((genre) => {
    return getConcatCard.filter((elem) => elem === genre).length;
  });
};

const createStatisticElement = (cards) => {
  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Fighter</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${getPropertyCount(cards, `isWatched`)} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${getHours(cards)} <span class="statistic__item-description">h</span> ${getMinutes(cards)} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${getTopGenre(cards)}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class Statistic extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createStatisticElement(this._cards);
  }

  renderChart() {
    const ctx = this.getElement().querySelector(`.statistic__chart`);

    return new Chart(ctx, {
      plugins: [chartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: getUniqueGenres(this._cards),
        datasets: [
          {
            data: getCountElements(this._cards),
            backgroundColor: `#ffe800`,
            borderWidth: 0,
            barThickness: 30,
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 16
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            padding: 30
          }
        },
        tooltips: {
          enabled: false
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              beginAtZero: true,
            }
          }],
          yAxes: [{
            ticks: {
              fontSize: 18,
              fontColor: `#ffffff`,
              padding: 60,
            }
          }]
        }
      }
    });
  }

}
