import React from 'react'
import { Meme } from './Meme'
import { GlobalStyles } from './ui/theme/GlobalStyles/GlobalStyles'
import { getMemesData } from './services/getMemesData'
import MemeCard from './views/componets/MemeCard'
import InputSearch from './views/componets/InputSearch'
import Header from './views/componets/Header/Header'
import styled from 'styled-components'
import Description from './views/componets/Header/Description'

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
      <GeneralWrapper>
        <Header />
        <InputSearch queryString={filter} />
        <Description />
        <MemeCard memes={memesData} />
      </GeneralWrapper>
    </>
  )
}

const GeneralWrapper = styled.div`
  max-width: 1132px;
  margin: 0 auto;
`

export default App
