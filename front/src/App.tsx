import React from 'react'

import { GlobalStyles } from './ui/theme/GlobalStyles'

// import {
//   AppName,
//   Header,
//   HeaderLogo,
//   LogoWrapper,
// } from './views/_components/Header/Header'

import { getMemes, Meme } from './services/getMemes'

const App: React.FC = () => {
  const [memes, setMemes] = React.useState<Meme[]>()
  const [error, setError] = React.useState<Error>()
  React.useEffect(() => {
    getMemes().then(setMemes).catch(setError)
  }, [])

  return (
    <>
      <GlobalStyles />
      <label htmlFor="searchInput">Busqueda</label>
      <input type="text" id="searchInput" />
      <button type="submit">Buscar</button>
      {memes?.map((meme: Meme) => (
        <img alt={meme.title} src={meme.url} key={meme.id} />
      ))}
      {error?.message}
    </>
  )
}

export default App
