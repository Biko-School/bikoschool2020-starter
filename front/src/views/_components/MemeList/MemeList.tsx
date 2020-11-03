import React from 'react'
import { MemeCard } from '../MemeCard/MemeCard'
import { Meme } from '../../../Meme'

interface Props {
  memes: Meme[]
}

export const MemeList: React.FC<Props> = ({ memes }) => {
  return (
    <ul>
      {memes?.map((meme) => (
        <MemeCard meme={meme} />
      ))}
    </ul>
  )
}
