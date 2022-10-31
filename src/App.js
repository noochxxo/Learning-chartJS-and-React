import BarChart from "./components/BarChart"

import {MigraineProvider} from './context/MigraineContext'


function App() {
  return (
    <MigraineProvider>
      <div className="App">
        <BarChart />
      </div>
    </MigraineProvider>
  )
}

export default App
