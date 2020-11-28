import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Meme } from '../../../domain/models/Meme'
import { MemeDetail } from '../../../domain/models/MemeDetail'
import { getMemeDetail } from '../../../domain/services/getMemeDetail'
import { getRelatedMemes } from '../../../domain/services/getRelatedMemes'
import { colors, font, iconSize, size } from '../../theme/theme'
import { MemeList } from '../_components/MemeList/MemeList'
import { FaRegThumbsUp } from 'react-icons/fa'
import { Icon } from '../../_components/Icon'
import { rem } from 'polished'

interface Params {
  id: string
}

export const Detail: React.FC = () => {
  const { id } = useParams<Params>()
  const [meme, setMeme] = useState<MemeDetail | null>(null)
  const [relatedMemes, setRelatedMemes] = useState<Meme[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getMemeDetail(id)
      .then((meme) => {
        setMeme(meme)
      })
      .catch((error) => {
        setError('Se ha producido un error al obtener el detalle del meme')
      })

    getRelatedMemes(id).then((relatedMemes) => {
      setRelatedMemes(relatedMemes)
    })
  }, [id])

  if (error) {
    return <p>{error}</p>
  }
  if (!meme) {
    return <p>Se ha producido un error al obtener el detalle del meme</p>
  }

  return (
    <>
      <h1>{meme.title}</h1>
      <img src={meme.image.url} alt={meme.title} />

      {meme.user && (
        <UserInfo>
          <UserAvatar alt={meme.user.name} src={meme.user.avatar_url} />
          <span>{meme.user.name}</span>
        </UserInfo>
      )}

      <TagList tags={meme.tags} />

      {relatedMemes && (
        <>
          <RelatedMemesHeaderWrapper>
            <IconoDetalle>
              <FaRegThumbsUp />
            </IconoDetalle>
            <RelatedMemesTitle>
              Si te gustó este guif te gustarán...
            </RelatedMemesTitle>
          </RelatedMemesHeaderWrapper>
          <MemeList memes={relatedMemes} />
        </>
      )}
    </>
  )
}

const IconoDetalle = styled(Icon)`
  color: ${colors.purple};
  width: ${rem(iconSize.large)};
  height: ${rem(iconSize.xlarge)};
`

const RelatedMemesHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${rem(size.small)};
`
const RelatedMemesTitle = styled.h2`
  ${font.h3}
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

const TagListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${rem(size.small)};
`

const Tag = styled.li`
  background: rgba(0, 0, 0, 0.62);
  border-radius: 109px;
  padding: ${rem(size.tiny)} ${rem(size.base)};
  color: ${colors.white};
`

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${rem(size.small)};
  ${font.base()};
`
