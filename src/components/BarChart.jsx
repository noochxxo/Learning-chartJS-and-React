import { useContext } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

import MigraineContext from '../context/MigraineContext'

// import {faker} from '@faker-js/faker'

function BarChart() {

  const {migrainesData} = useContext(MigraineContext)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      title: {
          display: true,
          text: 'Migraine Data',
      },
    },
  }

  const labels = ['June', 'July', 'August', 'September',]
  

  const data = {
    labels,
    datasets: [
      {
        label: 'Migraines',
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 31 })), // migraine count
        data: labels.map((label) => migrainesData[label.toLocaleLowerCase()].filter((day) => day.migraine ).length),
        backgroundColor: 'rgba(100, 50, 235, 0.5)',
      },
      {
        label: 'Medication',
        data: labels.map((label) => migrainesData[label.toLocaleLowerCase()].filter((day) => day.medication ).length),
        backgroundColor: 'rgba(100, 162, 100, 0.5)',
      },
      {
        label: 'Severe',
        data: labels.map((label) => migrainesData[label.toLocaleLowerCase()].filter((day) => day.severity === 3 ).length),
        backgroundColor: 'rgba(255, 99, 99, 0.5)',
      },
      {
        label: 'Moderate',
        data: labels.map((label) => migrainesData[label.toLocaleLowerCase()].filter((day) => day.severity === 2 ).length),
        backgroundColor: 'rgba(255, 255, 55, 0.5)',
      },
      {
        label: 'Mild',
        data: labels.map((label) => migrainesData[label.toLocaleLowerCase()].filter((day) => day.severity === 1 ).length),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
  // labels.map((label, index) => {
  //   // Month
  //   // migraines[label.toLowerCase()]
  //   // Each day
  //   // if (migraines[label.toLowerCase()]) {
  //   //   migraines[label.toLowerCase()].map((day) => {
  //   //   console.log(day)
  //   // })
  //   if (migraines[label.toLowerCase()]) {
  //     console.log(migraines[label.toLowerCase()].map((item) => item.migraine === true))
  //   }
  // })
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  )
}

export default BarChart