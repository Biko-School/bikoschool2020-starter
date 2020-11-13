import React from 'react'
import styled from 'styled-components'
import { Meme } from '../../../Meme'
import { rem } from 'polished'
import { size } from '../../../ui/theme/theme'

const Image = styled.img`
  margin-bottom: ${rem(size.base)};
`

interface Props {
  meme: Meme
}

export const MemeCard: React.FC<Props> = ({ meme }) => {
  return (
    <Image
      src={meme.image.url}
      alt={meme.title}
      style={{
        width: `${meme.image.width}px`,
        height: `${meme.image.height}px`,
      }}
    />
  )
}
