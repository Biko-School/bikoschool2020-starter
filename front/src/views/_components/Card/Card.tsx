import React from 'react'
import styled from 'styled-components'
import { size, colors } from './../../../ui/theme'
import { rem } from 'polished'
import { Link } from 'react-router-dom'

interface Props {
  id: string
  image: {
    src: string
    alt: string
  }
  author?: {
    displayName: string
    avatarUrl: string
  }
}

export const Card: React.FC<Props> = ({ author, id, image }) => (
  <LinkStyled to={`meme/${id}`}>
    <Image src={image.src} alt={image.alt} />
    {author && (
      <Author>
        <Avatar src={author.avatarUrl} alt={author.displayName} />
        {author.displayName}
      </Author>
    )}
  </LinkStyled>
)
const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`
const LinkStyled = styled(Link)`
  position: relative;
`
const Author = styled.div`
  position: absolute;
  bottom: ${rem(size.tiny)};
  left: ${rem(size.tiny)};
  color: ${colors.white};
  display: flex;
  align-items: center;
  column-gap: ${rem(size.tiny)};
`
const Avatar = styled.img`
  width: ${rem(size.medium)};
  height: ${rem(size.medium)};
  object-fit: cover;
`
