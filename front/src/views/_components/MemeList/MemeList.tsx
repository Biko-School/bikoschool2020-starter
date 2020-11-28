import React from 'react'

import { FiTrendingUp } from 'react-icons/fi'
import { MemesListWrapper, Text, MemesListTitle } from './MemeList.styles'
import { colors } from '../../../ui/theme/theme'
import { Meme } from '../../../services/getMemes'
import { MemeCard } from '../MemeCard/MemeCard'
import { Link } from 'react-router-dom'

interface Props {
  memes: Meme[]
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
            <Link to={`/detail/${meme.id}`} key={meme.id}>
              <MemeCard meme={meme} />
            </Link>
          )
        })}
      </MemesListWrapper>
    </>
  )
}
