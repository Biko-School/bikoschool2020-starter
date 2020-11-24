import React from 'react'
import { Meme } from '../../core/domain/meme/Meme'
import { BusinessLogicError } from '../../core/infrastructure/Error'
import {
  getMemesData,
  searchMemeByText,
} from '../../core/services/meme/getMemesService'
import Description from '../components/Header/Description'
import Header from '../components/Header/Header'
import InputSearch from '../components/InputSearch'
import MemeList from '../components/MemeList'

const Home: React.FC = () => {
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
      <Header />
      <InputSearch
        queryString={filter}
        onSearch={(text) => handleSearch(text)}
      />
      {error && <p>{error}</p>}
      <Description />
      <MemeList memes={memesData} />
    </>
  )
}

export default Home
