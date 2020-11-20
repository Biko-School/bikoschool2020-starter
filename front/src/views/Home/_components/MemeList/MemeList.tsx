import React from 'react'
import { MemeCard } from '../MemeCard/MemeCard'
import { Meme } from '../../../../domain/models/Meme'
import styled from 'styled-components'
import { rem } from 'polished'
import { size } from '../../../../ui/theme/theme'

const MemeListWrapper = styled.div`
  column-count: 5;
  column-gap: ${rem(size.base)};
  margin-bottom: ${rem(size.base)};
`

interface Props {
  memes: Meme[]
}

export const MemeList: React.FC<Props> = ({ memes }) => {
  return (
    <MemeListWrapper>
      {memes?.map((meme) => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
    </MemeListWrapper>
  )
}
