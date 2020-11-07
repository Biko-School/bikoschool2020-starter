import React from 'react'
import { Meme } from '../../Meme'
import styled from 'styled-components/macro'

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
const TagsWrapper = styled.div`
  position: absolute;
  height: 15px;
  margin: 10px;
  bottom: 0;
  color: white;
  opacity: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  bottom: 0;
  right: 0;
  left: 0;
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
    ${TagsWrapper} {
      opacity: 1;
    }
  }
`

const Tag = styled.span`
  align-items: center;
  align-self: flex-end;
  margin-right: 5px;
  height: 15px;
  text-shadow: 1px 1px 2px black;
`

const MemeList: React.FC<Props> = ({ memes }) => {
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
            <TagsWrapper>
              {meme.tags?.map((tag, key) => (
                <Tag key={'ptag' + key}>{tag}</Tag>
              ))}
            </TagsWrapper>
          </Card>
        </CardWrapper>
      ))}
    </MemeCardWrapper>
  )
}

export default MemeList
