import React from 'react';
import {GlobalStyles} from './ui/GlobalStyles/GlobalStyles'
import {MemeImage} from './ui/Components/MemeImage'
import { Header } from './ui/Components/Header'
import { Buscador } from './ui/Components/Buscador'

interface Meme{
  title: string,
  url: string
}

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
        {memes.map((meme) => 
          <MemeImage key={meme.url} src={meme.url} alt={meme.title}/>
        )}
    </>
  );
}

async function getMemes(): Promise<Meme[]>{
  const response = await fetch("/api/memes")
  const {memes} = await response.json()
  return memes
}

export default App;
