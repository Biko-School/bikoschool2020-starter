import React from 'react'
import { Meme } from '../../Meme'

interface Props {
  memes: Meme[]
}

const MemeCard: React.FC<Props> = ({ memes }) => {
  return (
    <ul>
      {memes?.map((meme) => (
        <li key={meme.id}>
          <img src={meme.image.url} alt={meme.title} /> {meme.title}
        </li>
      ))}
    </ul>
  )
}

export default MemeCard
