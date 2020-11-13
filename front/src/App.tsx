import React from 'react';
import { GlobalStyles } from './ui/GlobalStyles/GlobalStyles'
import { Home } from './views/home/home';
import { Header } from './views/_components/Header'

const App: React.FC=() => {
  return (
    <>
        <GlobalStyles />
        <Header/>
        <Home/>
    </>
  );
}

export default App;
