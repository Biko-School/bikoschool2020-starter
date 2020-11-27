import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Meme } from '../../../domain/models/Meme'
import { MemeDetail } from '../../../domain/models/MemeDetail'
import { getMemeDetail } from '../../../domain/services/getMemeDetail'
import { getRelatedMemes } from '../../../domain/services/getRelatedMemes'
import { colors, font, iconSize } from '../../theme/theme'
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

      {meme.user && <UserInfo user={meme.user} />}

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
  color: red;
  size: ${rem(iconSize.xlarge)};
`

const RelatedMemesHeaderWrapper = styled.div``
const RelatedMemesTitle = styled.h2`
  ${font.h3}
`

interface TagListProps {
  tags: string[]
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <ul>
      {tags.map((tag) => (
        <Tag tag={tag} />
      ))}
    </ul>
  )
}

interface TagProps {
  tag: string
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  return <li key={tag}>{tag}</li>
}

interface UserProps {
  user: {
    name: string
    avatar_url: string
  }
}

const UserInfo: React.FC<UserProps> = ({ user }) => {
  return (
    <>
      <span>{user.name}</span>
      <img alt={user.name} src={user.avatar_url} />
    </>
  )
}
