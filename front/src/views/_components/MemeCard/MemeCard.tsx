import React from 'react'
import styled from 'styled-components'
import { Meme } from '../../../Meme'
import { rem } from 'polished'
import { size } from '../../../ui/theme/theme'
import { Link } from 'react-router-dom'

const Image = styled.img`
  margin-bottom: ${rem(size.base)};
`

interface Props {
  meme: Meme
}

export const MemeCard: React.FC<Props> = ({ meme }) => {
  return (
    <Link to="memes/1234">
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
