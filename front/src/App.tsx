import React from 'react'

import { GlobalStyles } from './ui/theme/GlobalStyles'
import { GoSearch } from 'react-icons/go'
import { BiUserCircle } from 'react-icons/bi'
import {
  AppName,
  Header,
  HeaderLogo,
  LoginWrapper,
  LogoWrapper,
} from './views/_components/Header/Header'

import {
  SearchBox,
  SearchButton,
  SearchInput,
} from './views/_components/SearchBox'

import { getMemes, HttpStatus, Meme, searchMemes } from './services/getMemes'
import { Container } from './views/_components/Container'
import { colors } from './ui/theme/theme'
import { MemeList } from './views/_components/MemeList/MemeList'

const App: React.FC = () => {
  const [memes, setMemes] = React.useState<Meme[]>()
  const [error, setError] = React.useState<Error>()
  const [search, setSearch] = React.useState<string>('')
  const [username, setUsername] = React.useState<string>('')

  React.useEffect(() => {
    getMemes().then(setMemes).catch(setError)
  }, [])

  async function onClickSearchButton() {
    if (searchIsEmpty()) {
      getMemes().then(setMemes).catch(setError)
    } else {
      try {
        const memes = await searchMemes(search)
        setMemes(memes)
      } catch (err) {
        setError(err)
      }
    }
  }

  function searchIsEmpty() {
    return search.length === 0
  }

  async function userLogIn() {
    const apiResponse = await fetch(
      process.env.REACT_APP_API_BASE_URL + '/login?user=' + username,
    )
    if (apiResponse.status !== HttpStatus.OK) throw new Error('Error')
    const result = await apiResponse.json()
    return result
  }

  return (
    <Container>
      <GlobalStyles />
      <Header>
        <LogoWrapper>
          <HeaderLogo />
          <AppName>GUIFAFFINITY</AppName>
        </LogoWrapper>
        <LoginWrapper>
          <BiUserCircle />
          <input
            id="username"
            type="text"
            aria-label="usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => userLogIn()}>entrar</button>
        </LoginWrapper>
      </Header>

      <SearchBox>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchButton onClick={() => onClickSearchButton()}>
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
