import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Meme } from '../../../domain/models/Meme'
import { MemeDetail } from '../../../domain/models/MemeDetail'
import { getMemeDetail } from '../../../domain/services/getMemeDetail'
import { getRelatedMemes } from '../../../domain/services/getRelatedMemes'
import { colors, font, fontWeight, iconSize, size } from '../../theme/theme'
import { MemeList } from '../_components/MemeList/MemeList'
import { FaRegThumbsUp } from 'react-icons/fa'
import { Icon } from '../../_components/Icon'
import { rem } from 'polished'
import { useAuth } from '../../../domain/AuthContext'

interface Params {
  id: string
}

export const Detail: React.FC = () => {
  const { id } = useParams<Params>()
  const [meme, setMeme] = useState<MemeDetail | null>(null)
  const [relatedMemes, setRelatedMemes] = useState<Meme[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { isUserLogged, user } = useAuth()

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
      <Title>{meme.title}</Title>
      <MemeDetailWrapper>
        <img src={meme.image.url} alt={meme.title} />

        <UserTagWrapper>
          {meme.user && (
            <UserInfo>
              <UserAvatar alt={meme.user.name} src={meme.user.avatar_url} />
              <span>{meme.user.name}</span>
            </UserInfo>
          )}

          <TagList tags={meme.tags} />
        </UserTagWrapper>
      </MemeDetailWrapper>

      {isUserLogged && (
        <>
          <img src={user!.avatar_url} alt={user!.display_name} />
          <textarea
            aria-label="¿Algo que comentar?"
            placeholder="¿Algo que comentar?"
          />
          <button aria-label="Comentar">Comentar</button>
        </>
      )}

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

const Title = styled.h1`
  ${font.h1}
  font-weight: ${fontWeight.bold};
  margin-bottom: ${rem(size.medium)};
`

const MemeDetailWrapper = styled.div`
  display: flex;
  column-gap: ${rem(size.medium)};
  margin-bottom: ${rem(size.xlarge)};
`

const UserTagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${rem(size.base)};
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${rem(size.small)};

  ${font.h3()};
  font-weight: ${fontWeight.bold};
`

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const IconoDetalle = styled(Icon)`
  color: ${colors.purple};
  width: ${rem(iconSize.large)};
  height: ${rem(iconSize.xlarge)};
`

const RelatedMemesHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${rem(size.small)};
  margin-bottom: ${rem(size.base)};
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
