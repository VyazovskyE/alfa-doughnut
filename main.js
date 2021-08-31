import './style.css'

import {
  Chart,
  DoughnutController,
  ArcElement,
  Filler,
  SubTitle,
} from 'chart.js'

Chart.register(DoughnutController, ArcElement, Filler, SubTitle)

const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('mySecondChart');
const wrapper = document.querySelector('.js-wrapper');

const data = {
  labels: ['Красный', 'Желтый', 'Синий', 'Зеленый'],
  datasets: [{
    label: 'My First Dataset',
    data: [50, 100, 125, 300],
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    //hoverOffset: 100,
    borderWidth: 0,
    offset: 2
  }],
  padding: 100,
};

const color = 'rgba(255, 255, 255, 0.3)'

const myChart = new Chart(ctx, {
  type: 'doughnut',
  data: data,
  options: {
    layout: {
      padding: 100
    },
    elements: {
      arc: {
        hoverBackgroundColor: color
      }
    },
    onHover(e, elements) {
      if (elements.length) ctx.style.cursor = 'pointer';
      else ctx.style.cursor = 'default';
    },
    onClick(e, elements, chart) {
      const idx = elements[0].index
      clickHandler(idx, chart)
    }
  }
})

const hideButton = document.getElementById('hide-button')

hideButton.addEventListener('click', () => {
  myChart.hide(0, 2);
})

const showButton = document.getElementById('show-button')

showButton.addEventListener('click', () => {
  myChart.show(0, 2);
})

const myChart2 = new Chart(ctx2, {
  type: 'doughnut',
  data: {
    labels: ['Красный', 'Желтый', 'Синий', 'Зеленый'],
    padding: 100,
  },
  options: {
    layout: {
      padding: 80
    },
    cutout: '40%'
  }
})

const colors = [
  'rgb(255, 0, 0)',
  'rgb(255, 255, 0)',
  'rgb(0, 0, 255)',
  'rgb(0, 255, 0)'
]

const gradientColors = [
  'rgba(255, 0, 0, .2)',
  'rgba(255, 255, 0, .2)',
  'rgba(0, 0, 255, .2)',
  'rgba(0, 255, 0, .2)'
]

function clickHandler(targetIdx, chart) {
  const data = chart.config.data.datasets[0].data

  const values = data.reduce((acc, value, index) => {
    if (index < targetIdx) {
      acc[0] += value
    } else if (index === targetIdx) {
      acc[1] += value
    } else if (index > targetIdx) {
      acc[2] += value
    }
    return acc
  }, [0, 0, 0])

  if (!myChart2.data.datasets[0]) {
    const dataSet = [
      {
        data: values,
        backgroundColor: [
          'transparent',
          colors[targetIdx],
          'transparent',
        ],
        borderWidth: 0,
        offset: 2
      }
    ]
    myChart2.data.datasets = dataSet
  } else {
    myChart2.data.datasets[0].data = values
    myChart2.data.datasets[0].backgroundColor[1] = colors[targetIdx]
  }

  wrapper.style.setProperty('--gradient-color-primary', gradientColors[targetIdx])
  myChart2.update();
}