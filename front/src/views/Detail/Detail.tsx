import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MemeDetail } from '../../MemeDetail'
import { getMemeDetail } from '../../services/getMemeDetail'

interface Params {
  id: string
}

export const Detail: React.FC = () => {
  const { id } = useParams<Params>()
  const [meme, setMeme] = useState<MemeDetail | null>(null)

  useEffect(() => {
    getMemeDetail(id).then((meme) => {
      setMeme(meme)
    })
  }, [id])

  if (!meme) return null

  return (
    <>
      <h1>{meme.title}</h1>
      <img src={meme.image.url} alt={meme.title} />
    </>
  )
}
