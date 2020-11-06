import React from 'react'

import { GlobalStyles } from './ui/theme/GlobalStyles'
import { GoSearch } from 'react-icons/go'
import {
  AppName,
  Header,
  HeaderLogo,
  LogoWrapper,
} from './views/_components/Header/Header'

import {
  SearchBox,
  SearchButton,
  SearchInput,
} from './views/_components/SearchBox'

import { getMemes, Meme, searchMemes } from './services/getMemes'
import { Container } from './views/_components/Container'
import { colors } from './ui/theme/theme'
import { MemeList } from './views/_components/MemeList/MemeList'
// import { LoginWrapper } from './views/_components/Header/Login'

const App: React.FC = () => {
  const [memes, setMemes] = React.useState<Meme[]>()
  const [error, setError] = React.useState<Error>()
  const [search, setSearch] = React.useState<string>('')
  React.useEffect(() => {
    getMemes().then(setMemes).catch(setError)
  }, [])

  return (
    <Container>
      <GlobalStyles />
      <Header>
        <LogoWrapper>
          <HeaderLogo />
          <AppName>GUIFAFFINITY</AppName>
        </LogoWrapper>
        {/* <LoginWrapper>
          <userIcon />
        </LoginWrapper> */}
      </Header>

      <SearchBox>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchButton onClick={(e) => searchMemes(search)}>
          <GoSearch color={colors.white} />
        </SearchButton>
      </SearchBox>
      <MemeList memes={memes ? memes : []} />
      {error?.message}
      {/* {memes?.map((meme: Meme) => (
        <img alt={meme.title} src={meme.url} key={meme.id} />
      ))}
      {error?.message} */}
    </Container>
  )
}

export default App
