import React from 'react'

import { FiTrendingUp } from 'react-icons/fi'
import { MemesListWrapper, Text, MemesListTitle } from './MemeList.styles'
import { colors } from '../../../ui/theme/theme'
import { Meme } from '../../../services/getMemes'
import { MemeCard } from '../MemeCard/MemeCard'

interface Props {
  memes: Meme[]
  onMemeClicked: (memeId: string) => void
}

export const MemeList: React.FC<Props> = (props: Props) => {
  return (
    <>
      <MemesListTitle>
        <FiTrendingUp color={colors.lightBlue} />
        <Text>Los Guifs más trending del momento</Text>
      </MemesListTitle>

      <MemesListWrapper>
        {props.memes.map((meme) => {
          return (
            <MemeCard
              key={meme.id}
              meme={meme}
              onMemeClicked={props.onMemeClicked}
            />
          )
        })}
      </MemesListWrapper>
    </>
  )
}
