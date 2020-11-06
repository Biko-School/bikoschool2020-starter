import React, { useEffect, useState } from 'react'
import { GlobalStyles } from './ui/GlobalStyles/GlobalStyles'

import { Container } from './views/_components/Container/Container'
import { Header } from './views/_components/Header/Header'
import { SearchBox } from './views/_components/SearchBox/SearchBox'
import { Grid } from './views/_components/Grid/Grid'
import { Card } from './views/_components/Card/Card'

interface Meme {
  title: string
  id: string
  url: string
}

async function getMemes(): Promise<Meme[]> {
  const response = await fetch('http://localhost:5000/api/memes')
  const { memes } = await response.json()
  return memes
}

async function searchMemes(term: string): Promise<Meme[]> {
  const response = await fetch(
    'http://localhost:5000/api/memes/?search=' + term,
  )
  const { memes } = await response.json()
  return memes
}

const App: React.FC = () => {
  const [memes, setMemes] = useState<Meme[]>([])
  const [error, setError] = useState<string | null>()

  useEffect(() => {
    getMemes()
      .then(setMemes)
      .catch(() => {
        setError('Oops!')
      })
  }, [])

  const handleSearch = (value: string) => {
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
      <GlobalStyles />
      <Container>
        <Header />
        <SearchBox onSearch={handleSearch} />
        <Grid>
          {memes?.map((meme) => (
            <Card key={meme.id} image={{ src: meme.url, alt: meme.title }} />
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default App
