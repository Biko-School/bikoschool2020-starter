import React from 'react'
import { Meme } from '../../../services/getMemes'

import {
  InfoWrapper,
  MemeLink,
  Tag,
  TagsWrapper,
  UserAvatar,
  UserLink,
  UserName,
  MemeCardWrapper,
} from './MemeCard.styles'

interface Props {
  meme: Meme
  onMemeClicked: (memeId: string) => void
}

export const MemeCard: React.FC<Props> = (props: Props) => {
  const openMeme = () => {
    props.onMemeClicked(props.meme.id)
  }

  return (
    <MemeCardWrapper data-testid="meme-item">
      <MemeLink onClick={openMeme}>
        <img
          alt={props.meme.title}
          src={props.meme.url}
          style={{
            width: `${props.meme.width}px`,
            height: `${props.meme.height}px`,
          }}
        ></img>
      </MemeLink>

      <InfoWrapper>
        {props.meme.user && (
          <UserLink
            data-testid="meme-user"
            href={props.meme.user.profileUrl}
            target="_blank"
            title={`Ver el perfil de ${props.meme.user.displayName}`}
          >
            <UserAvatar
              src={props.meme.user.avatarUrl}
              alt={props.meme.user.displayName}
            />
            <UserName>{props.meme.user.displayName}</UserName>
          </UserLink>
        )}

        {!props.meme.user && (
          <TagsWrapper>
            {props.meme.tags?.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagsWrapper>
        )}
      </InfoWrapper>
    </MemeCardWrapper>
  )
}
