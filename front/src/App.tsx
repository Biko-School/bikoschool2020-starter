import React from 'react'
import { getMemes, Meme } from './services/getMemes'

const App: React.FC = () => {
  const [memes, setMemes] = React.useState<Meme[]>()
  const [error, setError] = React.useState<Error>()
  React.useEffect(() => {
    getMemes().then(setMemes).catch(setError)
  }, [])

  return (
    <>
      {memes?.map((meme: Meme) => (
        <img alt={meme.title} src={meme.url} key={meme.id} />
      ))}
      {error?.message}
    </>
  )
}

export default App
