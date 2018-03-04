const moment = require('moment');

const valueMap = {
  'Very postively': 1,
  'Somewhat positively': 0.75,
  'Neither positively or negatively': 0.5,
  'Somewhat negatively': 0.25,
  'Very negatively': 0,
};

const unitMap = {
  'Pint of Beer': 2.3,
  'Glass of Wine': 2.5,
  'Glass of Champagne': 1.5,
  'Gin and Tonic': 3,
  Cocktail: 3,
};

function getDate(dateString) {
  return moment(dateString).format('YYYY-MM-DD');
}

function formatDaily(days) {
  const data = {};

  days.forEach(({ timestamp, items }) => {
    let date = getDate(timestamp);

    const yesterdayData = {
      sexualActivityCount: 0,
      units: 0,
    };

    const dayData = {};

    items.forEach(item => {
      const { question, answer, columns, rows } = item;

      switch (question) {
        case 'How do you feel about yesterday':
          yesterdayData.dayMood = valueMap[answer];
          break;

        case 'How do you feel about life':
          dayData.lifeOverview = valueMap[answer];
          break;

        case 'How many times did you engage in sexual activity': {
          const number = parseInt(answer, 10);

          if (number && !isNaN(number) && typeof number === 'number') {
            yesterdayData.sexualActivityCount = number;
          }

          break;
        }

        case 'What did you drink':
          answer.forEach((quantity, rowIndex) => {
            if (!quantity) return;

            const units = unitMap[rows[rowIndex]] * parseInt(quantity, 10);

            yesterdayData.units = yesterdayData.units + units;
          });

          break;
        case 'Additional units': {
          const number = parseFloat(answer);

          if (number && number % 1 === 0) {
            yesterdayData.units = yesterdayData.units + number;
          }

          break;
        }

        case 'Date':
          if (answer && answer !== '') {
            date = getDate(answer);
          }

          break;
        default:
          dayData.unknown = dayData.unknown || [];
          dayData.unknown.push(item);
          break;
      }
    });

    data[date] = Object.assign(data[date] || {}, dayData);

    const yesterday = moment(date)
      .subtract(1, 'day')
      .format('YYYY-MM-DD');

    data[yesterday] = Object.assign(data[yesterday] || {}, yesterdayData);
  });

  return Promise.resolve(data);
}

module.exports = formatDaily;
