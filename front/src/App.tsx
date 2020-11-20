import React from 'react'
import { Meme } from './Meme'
import { GlobalStyles } from './ui/theme/GlobalStyles/GlobalStyles'
import { getMemesData, searchMemeByText } from './services/getMemesData'
import MemeList from './views/componets/MemeCard'
import InputSearch from './views/componets/InputSearch'
import Header from './views/componets/Header/Header'
import Description from './views/componets/Header/Description'
import { GeneralWrapper } from './ui/components/GeneralWrapper'

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
        setError(error.message)
      })
  }

  React.useEffect(() => {
    getMemesData()
      .then((data) => {
        setMemesData(data)
      })
      .catch((error) => {
        setError(error.message)
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
