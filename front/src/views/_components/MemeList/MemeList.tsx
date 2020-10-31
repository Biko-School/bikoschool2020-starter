import React from 'react'

import { FiTrendingUp } from 'react-icons/fi'
import { MemesListWrapper, Text, MemesListTitle } from './MemeList.styles'
import { colors } from '../../../ui/theme/theme'
import { Meme } from '../../../services/getMemes'
import { MemeCard } from '../MemeCard/MemeCard'

export const MemeList: React.FC<{ memes: Meme[] }> = ({ memes }) => {
  return (
    <>
      <MemesListTitle>
        <FiTrendingUp color={colors.lightBlue} />
        <Text>Los Guifs más trending del momento</Text>
      </MemesListTitle>

      <MemesListWrapper>
        {memes.map((meme) => {
          return <MemeCard key={meme.id} meme={meme} />
        })}
      </MemesListWrapper>
    </>
  )
}
