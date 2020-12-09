import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { size, font, fontWeight, colors, breakpoints } from './../../ui/theme'
import { MemeDetails } from '../../models/MemeDetails'
import { rem, rgba } from 'polished'
import { Avatar } from './../_components/Avatar/Avatar'
import { getMeme } from "./../../services"

export const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [meme, setMeme] = useState<MemeDetails>()

  useEffect(() => {
    getMeme(id).then(setMeme)
  }, [id])

  if (!meme) return null
  return (
    <Main>
      <Title>
        {meme.title}
        {meme.author && <TextLight> by {meme.author.displayName}</TextLight>}
      </Title>
      <Wrapper>
        <Image src={meme.url} alt={meme.title} />
        <Info>
          {meme.author && (
            <Author>
              <Avatar
                size="large"
                src={meme.author.avatarUrl}
                alt={meme.author.displayName}
              />
              {meme.author.displayName}
            </Author>
          )}
          <Tags>
            {meme.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </Tags>
        </Info>
      </Wrapper>
    </Main>
  )
}

const Title = styled.h1`
  ${font.h1}
  margin-bottom: ${rem(size.medium)};
  font-weight: ${fontWeight.bold};
`
const TextLight = styled.span`
  font-weight: ${fontWeight.light};
`
const Image = styled.img`
  width: 100%;
  max-width: ${rem(500)};
  height: auto;
  object-fit: cover;
`

const Wrapper = styled.div`
  display: grid;
  gap: ${rem(size.medium)};
  @media (min-width: ${rem(breakpoints.mobile)}) {
    grid-template-columns: auto 1fr;
  }
`

const Info = styled.div`
  > *:not(:last-child) {
    margin-bottom: ${rem(size.medium)};
  }
`

const Author = styled.span`
  ${font.h3};
  display: flex;
  align-items: center;
  column-gap: ${rem(size.small)};
  font-weight: ${fontWeight.bold};
`

const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${rem(size.small)};
`
const Tag = styled.li`
  padding: ${rem(size.small)};
  color: ${colors.white};
  background-color: ${rgba(colors.black, 0.6)};
  border-radius: 50em;
`
const Main = styled.main`
  margin-bottom: ${rem(size.huge)};
`
