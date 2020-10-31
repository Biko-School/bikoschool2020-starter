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

export const MemeCard: React.FC<{ meme: Meme }> = ({ meme }) => (
  <MemeCardWrapper data-testid="meme-item">
    <MemeLink>
      <img
        alt={meme.title}
        src={meme.url}
        style={{
          width: `${meme.width}px`,
          height: `${meme.height}px`,
        }}
      ></img>
    </MemeLink>

    <InfoWrapper>
      {meme.user && (
        <UserLink
          data-testid="meme-user"
          href={meme.user.profileUrl}
          target="_blank"
          title={`Ver el perfil de ${meme.user.displayName}`}
        >
          <UserAvatar src={meme.user.avatarUrl} alt={meme.user.displayName} />
          <UserName>{meme.user.displayName}</UserName>
        </UserLink>
      )}

      {!meme.user && (
        <TagsWrapper>
          {meme.tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsWrapper>
      )}
    </InfoWrapper>
  </MemeCardWrapper>
)
