import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MemeDetail } from '../../../domain/models/MemeDetail'
import { getMemeDetail } from '../../../domain/services/getMemeDetail'

interface Params {
  id: string
}

export const Detail: React.FC = () => {
  const { id } = useParams<Params>()
  const [meme, setMeme] = useState<MemeDetail | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getMemeDetail(id)
      .then((meme) => {
        setMeme(meme)
      })
      .catch((error) => {
        setError('Se ha producido un error al obtener el detalle del meme')
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
      <ul>
        {meme.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      {meme.user && (
        <>
          <span>{meme.user.name}</span>
          <img alt={meme.user.name} src={meme.user.avatar_url} />
        </>
      )}
    </>
  )
}
