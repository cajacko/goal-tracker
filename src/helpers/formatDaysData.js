import moment from "moment";

// const tempdata = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: 'rgba(75,192,192,0.4)',
//       borderColor: 'rgba(75,192,192,1)',
//       borderCapStyle: 'butt',
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: 'miter',
//       pointBorderColor: 'rgba(75,192,192,1)',
//       pointBackgroundColor: '#fff',
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//       pointHoverBorderColor: 'rgba(220,220,220,1)',
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [65, 59, 80, 81, 56, 55, 40],
//     },
//   ],
// };

function temp(endDate, currentDay, format) {
  return endDate.format(format) >= currentDay.format(format);
}

function formatDaysData(days) {
  const data = { labels: [], datasets: [] };
  const datasets = {};
  const minMax = {};
  const orderedDays = Object.keys(days).sort();

  const startDate = moment(orderedDays[0]);
  let currentDay = startDate.clone();
  const endDate = moment();
  let count = 0;

  while (
    temp(endDate, currentDay, "YYYY") &&
    temp(endDate, currentDay, "D") &&
    temp(endDate, currentDay, "M")
  ) {
    const dayString = currentDay.format("YYYY-MM-DD");
    const day = days[dayString];

    if (day) {
      Object.keys(day).forEach(key => {
        datasets[key] = datasets[key] || {
          label: key,
          data: []
        };

        datasets[key].data[count] = day[key];

        minMax[key] = minMax[key] || { min: day[key], max: day[key] };

        if (minMax[key].min > day[key]) minMax[key].min = day[key];
        if (minMax[key].max < day[key]) minMax[key].max = day[key];
      });
    }

    data.labels.push(dayString);

    currentDay.add(1, "day");
    count += 1;
  }

  Object.keys(datasets).forEach(key => {
    data.datasets.push(datasets[key]);
  });

  data.datasets.forEach((dataset, i) => {
    data.datasets[i].data = dataset.data.map(value => {
      if (!value) return value;

      const { label } = dataset;

      let newValue = value - minMax[label].min;
      let range = minMax[label].max - minMax[label].min;

      return newValue / range * 100;
    });
  });

  return data;
}

export default formatDaysData;
