import React from 'react'
import { Meme } from '../../Meme'
import styled from 'styled-components'

interface Props {
  memes: Meme[]
}

const MemeCardWrapper = styled.div`
  display: block;
  column-count: 5;
`
const CardWrapper = styled.div`
  display: inline-block;
  margin-bottom: 2rem;
`

const Card = styled.div`
  position: relative;
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
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
        <CardWrapper key={meme.id}>
          <Card key={meme.id}>
            <img
              style={{
                width: meme.image.width + 'px',
                height: meme.image.height + 'px',
              }}
              src={meme.image.url}
              alt={meme.title}
            />
            <TitleCard>{meme.title.toUpperCase()}</TitleCard>
          </Card>
        </CardWrapper>
      ))}
    </MemeCardWrapper>
  )
}

export default MemeCard
