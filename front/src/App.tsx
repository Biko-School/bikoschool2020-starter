import React from 'react'
import { Meme } from './core/domain/meme/Meme'
import { GlobalStyles } from './ui/theme/GlobalStyles/GlobalStyles'
import {
  getMemesData,
  searchMemeByText,
} from './core/services/meme/getMemesService'
import MemeList from './ui/views/componets/MemeCard'
import InputSearch from './ui/views/componets/InputSearch'
import Header from './ui/views/componets/Header/Header'
import Description from './ui/views/componets/Header/Description'
import { GeneralWrapper } from './ui/components/GeneralWrapper'
import { BusinessLogicError } from './core/infrastructure/Error'

const App: React.FC = () => {
  const [memesData, setMemesData] = React.useState<Meme[]>([])
  const [filter] = React.useState<string>('')
  const [error, setError] = React.useState<string>('')

  const handleSearch = async (text: string) => {
    return searchMemeByText(text)
      .then((data) => {
        setMemesData(data)
      })
      .catch((error) => {
        if (error instanceof BusinessLogicError) {
          setError(error.message)
        } else {
          throw error
        }
      })
  }

  React.useEffect(() => {
    getMemesData()
      .then((data) => {
        setMemesData(data)
      })
      .catch((error) => {
        if (error instanceof BusinessLogicError) {
          setError(error.message)
        } else {
          throw error
        }
      })
  }, [])

  return (
    <>
      <GlobalStyles />
      <GeneralWrapper>
        <Header />
        <InputSearch
          queryString={filter}
          onSearch={(text) => handleSearch(text)}
        />
        {error && <p>{error}</p>}
        <Description />
        <MemeList memes={memesData} />
      </GeneralWrapper>
    </>
  )
}

export default App
