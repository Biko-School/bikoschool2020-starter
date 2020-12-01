import React from 'react'
import styled from 'styled-components'
import { Meme } from '../../../../domain/models/Meme'
import { rem } from 'polished'
import { size } from '../../../theme/theme'
import { Link } from 'react-router-dom'

const Image = styled.img`
  margin-bottom: ${rem(size.base)};
  width: 100%;
  height: auto;
`

interface Props {
  meme: Meme
}

export const MemeCard: React.FC<Props> = ({ meme }) => {
  return (
    <Link to={`/memes/${meme.id}`}>
      <Image src={meme.imageUrl} alt={meme.title} />
    </Link>
  )
}
