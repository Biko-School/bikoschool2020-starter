import React from 'react';
import { useState, useEffect } from 'react'
import { Header, LogoWrapper } from './views/_components/Header/Header';
import { SearchBar, SearchContainer } from './views/_components/SearchBar/SearchBar';
import { GlobalContainer } from './views/_components/Container/Container';
import { LupaWraper, StyledLupa } from './views/_components/SearchBar/Lupa';
import { MemeImage, MemeListWraper } from './views/_components/memeList/MemeList';

const MEMES_URL = 'http://localhost:3333/api/memes'

function App() {

  const [memes, setMemes] = useState<any>([])
  const [query, setQuery] = useState<string>("")

  const getMemes = async () => {
    const response = await fetch(MEMES_URL);
    const json = await response.json(); 
    return json
  }

  const getMemesWithQuery = async (q:string) => {
    const response = await fetch(MEMES_URL + '?search=' + q);
    debugger
    const json = await response.json();
    return json
  }

  useEffect(() => {
    if(query.length > 2){
      getMemesWithQuery(query)
      .then(setMemes)
    }
  }, [query]); //te pide array siempre


  useEffect(() => {
    getMemes()
    .then(setMemes)
    .catch()
  }, []); //si no le pones nada al array, se ejecuta una vez se monta el componente


  return (
    <>
    <GlobalContainer>
        <Header>
          <LogoWrapper/>GUIFAFFINITY
        </Header>
        <SearchContainer>  
          <SearchBar value={query} onChange={e => setQuery(e.target.value)} placeholder="¿Qué quieres buscar? ¡Encuéntralo!" aria-label="Qué quieres buscar"/>
          <LupaWraper>
            <StyledLupa/>
          </LupaWraper>
        </SearchContainer>
        <MemeListWraper>
        {
          memes.map((element: any, idx: number) => {
            return (

                <MemeImage
                key={element.id}
                src={element.images.original.url}
                alt={element.title + '-' + idx}
              />
            )
          })
        }
        </MemeListWraper>
    </GlobalContainer>
    </>
  );
}

export default App;
