import React from 'react'
import styled from 'styled-components'
import { Meme } from '../../../../../domain/models/Meme'
import { rem } from 'polished'
import { size } from '../../../../theme/theme'
import { Link } from 'react-router-dom'

const Image = styled.img`
  margin-bottom: ${rem(size.base)};
`

interface Props {
  meme: Meme
}

export const MemeCard: React.FC<Props> = ({ meme }) => {
  return (
    <Link to={`memes/${meme.id}`}>
      <Image
        src={meme.image.url}
        alt={meme.title}
        style={{
          width: `${meme.image.width}px`,
          height: `${meme.image.height}px`,
        }}
      />
    </Link>
  )
}
