import React from 'react'
import { Meme } from './Meme'
import { getMemesData, getFilteredMemesData } from './services/getMemesData'
import { GlobalStyles } from './ui/theme/GlobalStyles/GlobalStyles'
import { Container } from './views/_components/Container'
import {
  Header,
  LogoWrapper,
  HeaderLogo,
  AppName,
} from './views/_components/Header'
import { MemeList } from './views/_components/MemeList/MemeList'
import {
  SearchBox,
  SearchInput,
  SearchButton,
} from './views/_components/SearchBox'

const App: React.FC = () => {
  const [memesData, setMemesData] = React.useState<Meme[]>([])
  const [filter, setFilter] = React.useState<string>('')
  const [error, setError] = React.useState<string>()

  React.useEffect(() => {
    getMemesData()
      .then((data) => {
        setMemesData(data)
      })
      .catch((error) => {
        setError('Se ha producido un error')
      })
  }, [])

  const searchMemes = () => {
    getFilteredMemesData(filter)
      .then((data) => {
        setMemesData(data)
      })
      .catch((error) => {
        setError('ERROR:')
      })
  }

  //TODO manejar errores correctamente
  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          <LogoWrapper>
            <HeaderLogo />
            <AppName>Guifaffinity</AppName>
          </LogoWrapper>
        </Header>

        <SearchBox>
          <SearchInput
            type="text"
            name="inputMeme"
            aria-label="inputMeme"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          ></SearchInput>
          <SearchButton
            aria-label="searchMeme"
            disabled={filter.length < 3}
            onClick={() => searchMemes()}
          >
            Buscar
          </SearchButton>
        </SearchBox>

        <MemeList memes={memesData} />
      </Container>
    </>
  )
}

export default App
