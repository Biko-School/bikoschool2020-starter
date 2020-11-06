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
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  margin: 0.5rem !important;
  flex-direction: column;
  overflow: hidden;
  &:hover {
    .card__image {
      filter: contrast(100%);
    }
  }
`

const MemeCard: React.FC<Props> = ({ memes }) => {
  return (
    <MemeCardWrapper>
      {memes?.map((meme) => (
        <Card key={meme.id}>
          <img src={meme.image.url} alt={meme.title} /> {meme.title}
        </Card>
      ))}
    </MemeCardWrapper>
  )
}

export default MemeCard
