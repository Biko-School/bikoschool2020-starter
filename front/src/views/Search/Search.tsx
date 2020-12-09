import React, { useEffect, useState } from 'react'
import { SearchBox } from '../_components/SearchBox/SearchBox'
import { Results } from '../_components/Results/Results'
import { Meme } from '../../models/Meme'
import styled from 'styled-components'
import { rem } from 'polished'
import { size } from './../../ui/theme'
import { useHistory, useParams } from 'react-router-dom'
import { searchMemes } from "./../../services"

export const Search: React.FC = () => {
  const [memes, setMemes] = useState<Meme[]>([])
  const [error, setError] = useState<string | null>()
  const { searchTerm } = useParams<{searchTerm: string}>();
  // const [searchTerm, setSearchTerm] = useState<string>(searchTermParams)
  const history = useHistory();

  useEffect(() => {
    searchMemes(searchTerm)
        .then(setMemes)
        .catch(() => {
          setError('Oops!')
        })
  }, [searchTerm])

  const handleSearch = (value: string) => {
    if(value) {
      history.push(`/search/${value}`)
    } else {
      history.push(`/`)
    }
  }

  if (error) {
    return <div role="alert">{error}</div>
  }
  return (
    <Main>
      <SearchBox value={searchTerm} onSearch={handleSearch} />
      <Results memes={memes} searchTerm={searchTerm} />
    </Main>
  )
}

const Main = styled.main`
  margin-bottom: ${rem(size.huge)};
`
