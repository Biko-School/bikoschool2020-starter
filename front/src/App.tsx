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

import { getMemes, Meme } from './services/getMemes'
import { Container } from './views/_components/Container'
import { colors } from './ui/theme/theme'
import { MemeList } from './views/_components/MemeList/MemeList'

const App: React.FC = () => {
  const [memes, setMemes] = React.useState<Meme[]>()
  const [error, setError] = React.useState<Error>()
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
      </Header>

      <SearchBox>
        <SearchInput />
        <SearchButton>
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
