import React from 'react';
import { GlobalStyles } from './styles/globalStyles';
import { AppContainer } from './views/components/AppContainer';
import * as Header from './views/components/Header';
import { RecentMemesList } from './views/MemesList';
import { SearchBar } from './views/SearchBar';

function App() {
  let prueba = {
    jelou: 1,
    baibai:
      '233333333333333333333aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaallllaaaaaaa3333333333333333333333333',
  };
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header.HeaderCont>
          <Header.LogoContAndLink href="/">
            <Header.LogoIcon />
            <Header.LogoText>MEMEAFFINITY</Header.LogoText>
          </Header.LogoContAndLink>
        </Header.HeaderCont>
        <SearchBar></SearchBar>
        <main>
          <RecentMemesList />
        </main>
      </AppContainer>
    </>
  );
}

export default App;
