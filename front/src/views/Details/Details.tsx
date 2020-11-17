import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Meme } from '../../models/Meme'

async function getMeme(id: string): Promise<Meme> {
  const response = await fetch(`http://localhost:5000/api/meme/${id}`)
  return response.json()
}

export const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [meme, setMeme] = useState<Meme>()

  useEffect(() => {
    getMeme(id).then(setMeme)
  }, [])

  if (!meme) return null
  return <h1>{meme.title}</h1>
}
