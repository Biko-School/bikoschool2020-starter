import React from 'react';
import { GlobalStyles } from './ui/GlobalStyles/GlobalStyles'
import { Header } from './ui/Components/Header'
import { Buscador } from './ui/Components/Buscador'
import { ArticleMemes } from './ui/Components/AticleMemes'
import { Meme } from './core/domain/Meme/Meme'

const App: React.FC=() => {
  const [memes,setMemes] = React.useState<Meme[]>([])

  React.useEffect(() => {
    getMemes().then(setMemes)
  },[])

  return (
    <>
        <GlobalStyles />
        <Header/>
        <Buscador/>
        <ArticleMemes memes={memes} />
    </>
  );
}

async function getMemes(): Promise<Meme[]>{
  const response = await fetch("/api/memes")
  const {memes} = await response.json()
  return memes
}

export default App;
