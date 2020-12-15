import React from 'react'
import styled from 'styled-components'
import { Meme } from '../../../../domain/models/Meme'
import { rem } from 'polished'
import { colors, font, fontWeight, size } from '../../../theme/theme'
import { Link } from 'react-router-dom'

interface Props {
  meme: Meme
}

export const MemeCard: React.FC<Props> = ({ meme }) => {
  return (
    <MemeCardWrapper>
      <Link to={`/memes/${meme.id}`}>
        <Image src={meme.imageUrl} alt={meme.title} />
      </Link>

      <InfoWrapper>
        {meme.user && (
          <UserWrapper>
            <UserAvatar src={meme.user?.url} alt={meme.user?.name} />
            <p>{meme.user?.name}</p>
          </UserWrapper>
        )}

        {!meme.user && <TagList tags={meme.tags} />}
      </InfoWrapper>
    </MemeCardWrapper>
  )
}

const MemeCardWrapper = styled.div`
  position: relative;

  margin-bottom: ${rem(size.base)};
`

const Image = styled.img`
  width: 100%;
  height: auto;
`

const InfoWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${rem(size.tiny)};

  padding-bottom: ${rem(size.tiny)};
  padding-left: ${rem(size.tiny)};
  padding-right: ${rem(size.tiny)};

  ${font.small()};
  font-weight: ${fontWeight.bold};
`

const UserAvatar = styled.img`
  width: ${rem(size.base)};
  height: ${rem(size.base)};
`

interface TagListProps {
  tags: string[]
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <TagListWrapper>
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </TagListWrapper>
  )
}

const TagListWrapper = styled.div`
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;

  ${font.small()};
  font-weight: ${fontWeight.light};
  color: ${colors.white};

  padding-bottom: ${rem(size.tiny)};
  padding-left: ${rem(size.tiny)};
  padding-right: ${rem(size.tiny)};
`

const Tag = styled.span`
  margin-right: ${rem(size.tiny)};
`
