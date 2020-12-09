import React, { useEffect, useState } from 'react'
import { SearchBox } from '../_components/SearchBox/SearchBox'
import { Results } from '../_components/Results/Results'
import { Meme } from '../../models/Meme'
import styled from 'styled-components'
import { rem } from 'polished'
import { size } from './../../ui/theme'
import { useHistory } from 'react-router-dom'
import { getMemes } from "./../../services"

export const Home: React.FC = () => {
  const [memes, setMemes] = useState<Meme[]>([])
  const [error, setError] = useState<string | null>()
  const history = useHistory();

  useEffect(() => {
    getMemes()
      .then(setMemes)
      .catch(() => {
        setError('Oops!')
      })
  }, [])

  const handleSearch = (value: string) => {
    history.push(`/search/${value}`)
  }

  if (error) {
    return <div role="alert">{error}</div>
  }
  return (
    <Main>
      <SearchBox value={""} onSearch={handleSearch} />
      <Results memes={memes} searchTerm={""} />
    </Main>
  )
}

const Main = styled.main`
  margin-bottom: ${rem(size.huge)};
`
