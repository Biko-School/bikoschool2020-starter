import React from 'react'
import { Meme } from '../../../Meme'

interface Props {
  meme: Meme
}

export const MemeCard: React.FC<Props> = ({ meme }) => {
  return (
    <li>
      <img src={meme.image.url} alt={meme.title} /> {meme.title}
    </li>
  )
}
