import React from 'react'
import { Meme } from './Meme'
import { GlobalStyles } from './ui/theme/GlobalStyles/GlobalStyles'
import { getMemesData } from './services/getMemesData'

const App: React.FC = () => {
  const [memesData, setMemesData] = React.useState<Meme[]>([])
  const [filter, setFilter] = React.useState<String>('')
  const [error, setError] = React.useState<String>()

  React.useEffect(() => {
    getMemesData()
      .then((data) => {
        setMemesData(data)
      })
      .catch((error) => {
        setError('Se ha producido un error')
      })
  }, [])

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <GlobalStyles />
      <input
        name="searchmeme"
        aria-label="searchmeme"
        onChange={(event) => setFilter(event.target.value)}
      ></input>
      {/* 
      {filter.length < 3 ? (
        <p>{'La longitud mínima de búsqueda debe de ser 3 carácteres'}</p>
      ) : null}

      */}
      <button></button>
      <ul>
        {memesData?.map((meme) => (
          <li key={meme.id}>
            <img src={meme.image.url} alt={meme.title} /> {meme.title}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
