import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { size, font, fontWeight, colors } from './../../ui/theme'
import { MemeDetails } from '../../models/MemeDetails'
import { rem } from 'polished'
import { Avatar } from './../_components/Avatar/Avatar'

async function getMeme(id: string): Promise<MemeDetails> {
  const response = await fetch(`http://localhost:5000/api/meme/${id}`)
  return response.json()
}

export const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [meme, setMeme] = useState<MemeDetails>()

  useEffect(() => {
    getMeme(id).then(setMeme)
  }, [])

  if (!meme) return null
  return (
    <div>
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
    </div>
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
  width: ${rem(500)};
  height: ${rem(500)};
  object-fit: cover;
`

const Wrapper = styled.div`
  display: flex;
  column-gap: ${rem(size.medium)};
`

const Info = styled.div`
  margin-left: ${rem(size.medium)};
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
  background-color: ${colors.grey};
  border-radius: 50em;
`
