import './App.css';
import React from 'react';
import { useState, useEffect } from 'react'
import { Header } from './views/_components/Header/Header';

// const MEMES_URL = 'http://127.0.0.1/memes'
const MEMES_URL = 'http://localhost:3333/api/memes'


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
      <Header>Hola holita</Header>
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
