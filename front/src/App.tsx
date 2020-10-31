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
          <img src={meme.url} alt={meme.title}></img>
        )}
    </>
  );
}

async function getMemes(): Promise<Meme[]>{
  const response = await fetch("/api/memes")
  const result = await response.json()
  return result
}

export default App;
