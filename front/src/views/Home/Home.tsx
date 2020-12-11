import React, { useEffect, useState } from 'react'
import { SearchBox } from '../_components/SearchBox/SearchBox'
import { Results } from '../_components/Results/Results'
import { Meme } from '../../models/Meme'
import styled from 'styled-components'
import { rem } from 'polished'
import { size } from './../../ui/theme'
import { getMemes } from "./../../services"

export const Home: React.FC = () => {
  const [memes, setMemes] = useState<Meme[]>([])
  const [error, setError] = useState<string | null>()

  useEffect(() => {
    let mounted = true;
    getMemes()
      .then(memes => {
        if(mounted) setMemes(memes)
      })
      .catch(() => {
        if(mounted) setError('Oops!')
      })

    return () => { 
      mounted = false
    }
  }, [])

  if (error) {
    return <div role="alert">{error}</div>
  }
  return (
    <Main>
      <SearchBox />
      <Results memes={memes} />
    </Main>
  )
}

const Main = styled.main`
  margin-bottom: ${rem(size.huge)};
`
