import React, { useEffect, useState } from 'react'
import { SearchBox } from '../_components/SearchBox/SearchBox'
import { Results } from '../_components/Results/Results'
import { Meme } from '../../models/Meme'
import styled from 'styled-components'
import { rem } from 'polished'
import { size } from './../../ui/theme'
import { useParams } from 'react-router-dom'
import { searchMemes } from "./../../services"

export const Search: React.FC = () => {
  const [memes, setMemes] = useState<Meme[]>([])
  const [error, setError] = useState<string | null>()
  const { searchTerm } = useParams<{searchTerm: string}>();

  useEffect(() => {
    searchMemes(searchTerm)
        .then(setMemes)
        .catch(() => {
          setError('Oops!')
        })
  }, [searchTerm])

  if (error) {
    return <div role="alert">{error}</div>
  }
  return (
    <Main>
      <SearchBox value={searchTerm}  />
      <Results memes={memes} searchTerm={searchTerm} />
    </Main>
  )
}

const Main = styled.main`
  margin-bottom: ${rem(size.huge)};
`
