import React, { useEffect, useState } from 'react'
import { SearchBox } from '../_components/SearchBox/SearchBox'
import { Results } from '../_components/Results/Results'
import { Meme } from '../../models/Meme'

async function getMemes(): Promise<Meme[]> {
  const response = await fetch('http://localhost:5000/api/memes')
  const { memes } = await response.json()
  return memes
}

async function searchMemes(term: string): Promise<Meme[]> {
  const response = await fetch(
    'http://localhost:5000/api/memes/search?q=' + term,
  )
  const { memes } = await response.json()
  return memes
}

export const Home: React.FC = () => {
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
      <SearchBox onSearch={handleSearch} />
      <Results memes={memes} searchTerm={searchTerm} />
    </>
  )
}
