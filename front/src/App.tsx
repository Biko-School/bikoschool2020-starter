import React from 'react';
import { GlobalStyles } from './styles/globalStyles';
import { AppContainer } from './views/components/AppContainer';
import * as Header from './views/components/Header';
import { MemesList } from './views/MemesList';
import { SearchBar } from './views/SearchBar';

function App() {
  const [searchTerm, setSearchTerm] = React.useState<string>();

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
        <SearchBar onSearchRequested={setSearchTerm}></SearchBar>
        <main>
          <MemesList searchTerm={searchTerm} />
        </main>
      </AppContainer>
    </>
  );
}

export default App;
