import React from 'react'
import { Meme } from './../../../models/Meme'
import { Grid } from './../Grid/Grid'
import { Card } from './../Card/Card'

interface Props {
  memes: Meme[]
  searchTerm: string
}
export const Results: React.FC<Props> = ({ memes, searchTerm }) => {
  if (searchTerm && memes.length === 0) {
    return <div> Memes no encontrados para la búsqueda {searchTerm}</div>
  }
  return (
    <Grid>
      {memes?.map((meme) => (
        <Card key={meme.id} image={{ src: meme.url, alt: meme.title }} />
      ))}
    </Grid>
  )
}
