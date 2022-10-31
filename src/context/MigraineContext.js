import { createContext, useState, useEffect } from "react"

const MigraineContext = createContext()

export const MigraineProvider = ({children}) => {
  
  const [migrainesData, setMigrainesData] = useState({})

  useEffect(() => {
    fetchMigraines()
  }, [])

  const fetchMigraines = async () => {
    const response = await fetch('https://gist.githubusercontent.com/Eric-JT/3c916bf4f9fe8c6f85f6599634040625/raw/015499319fbfd6184f281c637c3bfe884aade099/data.json')
    const data = await response.json()
    setMigrainesData(data)
  }

  return <MigraineContext.Provider value={{
    migrainesData,
  }}>
    {children}
  </MigraineContext.Provider>
}

export default MigraineContext