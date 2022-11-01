import { useContext, useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

import MigraineContext from '../context/MigraineContext'

// import {faker} from '@faker-js/faker'

function BarChart() {

  const {migrainesData} = useContext(MigraineContext)
  // check if object is empty
  // Object.keys(empty).length === 0 && empty.constructor === Object
  // if (Object.keys(migrainesData).length === 0 && Object.constructor === Object) {
  //   console.log(migrainesData)
  // } else {
  //   console.log('Shitsempty bruh')
  // }

  // Migraines per day
  const [mpd, setMPD] = useState(0)
  // How much medication was taken per month?
  const [meds,setMeds] = useState(false)
  // How many severe headaches per month?
  const [severePM, setSeverePM] = useState()
  // How many moderate headaches per month?
  const [moderatePM, setModeratePM] = useState()
  // How many mild headaches per month?
  const [mildPM, setMildPM] = useState()

  
  
  useEffect(()=> {
    const labels = ['June', 'July', 'August', 'September',]
    if (Object.keys(migrainesData).length !== 0) {
      setMPD(labels.map((label) =>migrainesData[label.toLocaleLowerCase()].filter((day) => day.migraine ).length))
      setMeds(labels.map((label) => migrainesData[label.toLocaleLowerCase()].filter((day) => day.medication ).length))
      setSeverePM(labels.map((label) => migrainesData[label.toLocaleLowerCase()].filter((day) => day.severity === 3 ).length))
      setModeratePM(labels.map((label) => migrainesData[label.toLocaleLowerCase()].filter((day) => day.severity === 2 ).length))
      setMildPM(labels.map((label) => migrainesData[label.toLocaleLowerCase()].filter((day) => day.severity === 1 ).length) )
    }
  }, [migrainesData])

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
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
        data: mpd,
        backgroundColor: 'rgba(100, 50, 235, 0.5)',
      },
      {
        label: 'Medication',
        data: meds,
        backgroundColor: 'rgba(100, 162, 100, 0.5)',
      },
      {
        type: 'line',
        label: 'Severe',
        data: severePM,
        borderColor: 'rgba(255, 99, 99, 0.6)',
        backgroundColor: 'rgba(255, 99, 99, 0.8)',
      },
      {
        type: 'line',
        label: 'Moderate',
        data: moderatePM,
        borderColor: 'rgba(255, 255, 55, 0.6)',
        backgroundColor: 'rgba(255, 255, 55, 0.8)',
      },
      {
        type: 'line',
        label: 'Mild',
        data: mildPM,
        borderColor: 'rgba(53, 162, 235, 0.6)',
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
      },
    ],
  }
  
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  )
}

export default BarChart