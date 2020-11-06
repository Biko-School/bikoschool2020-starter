import React from 'react'
import { Meme } from '../../Meme'
import styled from 'styled-components'

interface Props {
  memes: Meme[]
}

const MemeCardWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  justify-content: space-between;
  padding: 0;
`
const Card = styled.li`
  position: relative;
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  max-width: 20rem;
  flex-direction: column;
  overflow: hidden;
  &:hover {
    .card__image {
      filter: contrast(100%);
    }
  }
`
const TitleCard = styled.span`
  z-index: 99;
  position: absolute;
  bottom: 0;
  color: white;
  filter: alpha(opacity=100);
  opacity: 1;
`

const MemeCard: React.FC<Props> = ({ memes }) => {
  return (
    <MemeCardWrapper>
      {memes?.map((meme) => (
        <Card key={meme.id}>
          <img src={meme.image.url} alt={meme.title} />
          <TitleCard>{meme.title.toUpperCase()}</TitleCard>
        </Card>
      ))}
    </MemeCardWrapper>
  )
}

export default MemeCard
