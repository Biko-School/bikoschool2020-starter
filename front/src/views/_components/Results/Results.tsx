import React from 'react'
import { Meme } from '../../../models/Meme'
import { Grid } from './../Grid/Grid'
import { Card } from './../Card/Card'
import { rem } from 'polished'
import { Trending } from '../../../ui/icons'
import {
  size,
  fontWeight,
  font,
  iconSize,
  colors,
} from '../../../ui/theme'
import styled from 'styled-components'

interface Props {
  memes: Meme[]
  searchTerm: string
}
export const Results: React.FC<Props> = ({ memes, searchTerm }) => {
  if (searchTerm && memes.length === 0) {
    return <div> Memes no encontrados para la búsqueda {searchTerm}</div>
  }

  return (
    <>
      <Tagline>
        <TagLineIcon size={rem(iconSize.medium)} color={colors.lightBlue} />
        <TagLineTitle>Los guif mas trending del momento</TagLineTitle>
      </Tagline>
      <Grid>
        {memes?.map((meme) => (
          <Card
            key={meme.id}
            id={meme.id}
            image={{ src: meme.url, alt: meme.title }}
            author={meme.author}
          />
        ))}
      </Grid>
    </>
  )
}

const Tagline = styled.div`
  margin-bottom: ${rem(size.medium)};
  display: flex;
  align-items: center;
`
const TagLineIcon = styled(Trending)`
  margin-right: ${rem(size.medium)};
`
const TagLineTitle = styled.h2`
  font-weight: ${fontWeight.bold};
  ${font.h3()};
`
