import { useContext, useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController
} from 'chart.js'
import { Chart, PolarArea, Radar } from 'react-chartjs-2'

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
  // How much me  dication was taken per month?
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
    LineController,
    BarController,
    RadialLinearScale,
    ArcElement,
    Filler,
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

  const optionsPolar = {
    responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      title: {
          display: true,
          text: '# of Migraines in 4 months',
      },
    },
  }

  const labels = ['June', 'July', 'August', 'September',]
  const data = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'Migraines',
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 31 })), // migraine count
        data: mpd,
        backgroundColor: 'rgba(100, 50, 235, 0.2)',
      },
      {
        type: 'line',
        label: 'Medication',
        data: meds,
        borderColor: 'rgba(100, 162, 100, 0.6)',
        backgroundColor: 'rgba(100, 162, 100, 0.8)',
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

  const arcdata = {
  labels: ['Migraines', 'Medication', 'Severe', 'Moderate', 'Mild'],
  datasets: [
    {
      label: '# of Migraines in 4 months',
      // data: [mpd, meds, severePM, moderatePM, mildPM],
      data: [
        mpd.reduce((prev, curr) => prev + curr , 0),
        meds.reduce((prev, curr) => prev + curr , 0),
        severePM.reduce((prev, curr) => prev + curr , 0),
        moderatePM.reduce((prev, curr) => prev + curr , 0),
        mildPM.reduce((prev, curr) => prev + curr , 0),
      ],
      backgroundColor: [
        'rgba(100, 50, 235, 0.5)',
        'rgba(100, 162, 100, 0.5)',
        'rgba(255, 99, 99, 0.8)',
        'rgba(255, 255, 55, 0.8)',
        'rgba(53, 162, 235, 0.8)'
      ],
      borderWidth: 1,
    },
  ],
}

const radardata = {
  labels: ['Migraines', 'Medication', 'Severe', 'Moderate', 'Mild'],
  datasets: [
    {
      label: '# of migrainnes',
      data: [
        mpd.reduce((prev, curr) => prev + curr , 0),
        meds.reduce((prev, curr) => prev + curr , 0),
        severePM.reduce((prev, curr) => prev + curr , 0),
        moderatePM.reduce((prev, curr) => prev + curr , 0),
        mildPM.reduce((prev, curr) => prev + curr , 0),
      ],
      // backgroundColor: 'rgba(255, 99, 132, 0.2)',
      backgroundColor: [
        'rgba(100, 50, 235, 0.5)',
        // 'rgba(100, 162, 100, 0.5)',
        // 'rgba(255, 99, 99, 0.8)',
        // 'rgba(255, 255, 55, 0.8)',
        // 'rgba(53, 162, 235, 0.8)'
      ],
      // borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
    },
  ],
}
  
  return (
    <div>
      <Chart type='bar' options={options} data={data} />
      <PolarArea options={optionsPolar} data={arcdata} />
      <Radar data={radardata} />
    </div>
  )
}

export default BarChart