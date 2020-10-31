import React from 'react'
import { Meme } from './Meme'
import { GlobalStyles } from './ui/theme/GlobalStyles/GlobalStyles'
import { getMemesData } from './services/getMemesData'
import MemeCard from './views/componets/MemeCard'
import InputSearch from './views/componets/InputSearch'
import Header from './views/componets/Header/Header'

const App: React.FC = () => {
  const [memesData, setMemesData] = React.useState<Meme[]>([])
  const [filter, setFilter] = React.useState<String>('')
  const [error, setError] = React.useState<String>()

  React.useEffect(() => {
    getMemesData()
      .then((data) => {
        setMemesData(data)
      })
      .catch((error) => {
        setError('Se ha producido un error')
      })
  }, [])

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <GlobalStyles />
      <Header />
      <InputSearch queryString={filter} />
      <MemeCard memes={memesData} />
    </>
  )
}

export default App
