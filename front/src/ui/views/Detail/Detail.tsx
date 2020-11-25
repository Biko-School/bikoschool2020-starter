import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Meme } from '../../../domain/models/Meme'
import { MemeDetail } from '../../../domain/models/MemeDetail'
import { getMemeDetail } from '../../../domain/services/getMemeDetail'
import { getRelatedMemes } from '../../../domain/services/getRelatedMemes'
import { MemeList } from '../_components/MemeList/MemeList'

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

      {relatedMemes && <MemeList memes={relatedMemes} />}
    </>
  )
}

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
