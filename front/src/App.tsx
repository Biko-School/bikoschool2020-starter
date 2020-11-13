import React from 'react';
import { GlobalStyles } from './ui/GlobalStyles/GlobalStyles'
import { Header } from './views/_components/Header'
import { Buscador } from './ui/Components/Buscador'
import { MemesList } from './ui/Components/MemesList'
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
        <MemesList memes={memes} />
    </>
  );
}

async function getMemes(): Promise<Meme[]>{
  const response = await fetch("/api/memes")
  const {memes} = await response.json()
  return memes
}

export default App;
