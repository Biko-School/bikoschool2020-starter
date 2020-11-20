import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MemeDetails } from '../../models/MemeDetails'

async function getMeme(id: string): Promise<MemeDetails> {
  const response = await fetch(`http://localhost:5000/api/meme/${id}`)
  return response.json()
}

export const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [meme, setMeme] = useState<MemeDetails>()

  useEffect(() => {
    getMeme(id).then(setMeme)
  }, [])

  if (!meme) return null
  return (
    <div>
      <h1>{meme.title}</h1>
      <img src={meme.url} alt={meme.title} />
      {meme.author && (
        <div>
          <img src={meme.author.avatarUrl} alt={meme.author.displayName} />
          {meme.author.displayName}
        </div>
      )}
      <ul>
        {meme.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  )
}
