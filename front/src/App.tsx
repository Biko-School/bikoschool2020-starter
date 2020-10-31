import React from 'react';
import {GlobalStyles} from './ui/GlobalStyles/GlobalStyles'

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
        {memes.map((meme) => 
          <img key={meme.url} src={meme.url} alt={meme.title}></img>
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
