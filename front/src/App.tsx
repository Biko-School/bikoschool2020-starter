import React, { useEffect, useState } from 'react'
import { Container } from './views/_components/Container/Container'
import { Header } from './views/_components/Header/Header'
import { SearchBox } from './views/_components/SearchBox/SearchBox'
import { Results } from './views/_components/Results/Results'
import { Meme } from './models/Meme'

async function getMemes(): Promise<Meme[]> {
  const response = await fetch('http://localhost:5000/api/memes')
  const { memes } = await response.json()
  return memes
};

async function searchMemes(term: string): Promise<Meme[]> {
  const response = await fetch(
    'http://localhost:5000/api/memes/search?q=' + term,
  )
  const { memes } = await response.json()
  return memes
};

const App: React.FC = () => {
  const [memes, setMemes] = useState<Meme[]>([])
  const [error, setError] = useState<string | null>()
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    getMemes()
      .then(setMemes)
      .catch(() => {
        setError('Oops!')
      })
  }, [])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    searchMemes(value)
      .then(setMemes)
      .catch(() => {
        setError('Oops!')
      })
  }

  if (error) {
    return <div role="alert">{error}</div>
  }
  return (
    <>
      <Container>
        <Header />
        <SearchBox onSearch={handleSearch} />
        <Results memes={memes} searchTerm={searchTerm} />
      </Container>
    </>
  )
}

export default App
