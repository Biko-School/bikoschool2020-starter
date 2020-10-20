import React from 'react';
import './App.css';
import { useState, useEffect } from 'react'

const MEMES_URL = 'http://127.0.0.1/memes'

function App() {

  const [memes, setMemes] = useState<any>([])

  const getMemes = async () => {
    const response = await fetch(MEMES_URL);
    const json = await response.json();
    return json
  }

  useEffect(() => {
    getMemes()
      .then(setMemes)
      .catch()
  }, []);


  return (
    <>
      <div>Listado de memes</div>
      {
        memes.map((element: any) => {
          return <img key={element.id} src={element.images.original.url} alt={element.title} />
        })
      }
    </>
  );
}

export default App;
