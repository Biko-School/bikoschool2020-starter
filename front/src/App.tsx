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
import {
  SearchWrapper,
  SearchInput,
  SearchButton,
} from './views/_components/SearchBox'
import { MemeList } from './views/_components/MemeList/MemeList'

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

  const handleSearch = () => {
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

        <SearchBox
          filter={filter}
          onFilterChanged={setFilter}
          onSearch={() => handleSearch()}
        />

        <MemeList memes={memesData} />
      </Container>
    </>
  )
}

interface SearchBoxProps {
  filter: string
  onFilterChanged(newFilter: string): void
  onSearch(): void
}

const SearchBox: React.FC<SearchBoxProps> = ({
  filter,
  onFilterChanged,
  onSearch,
}) => {
  const changeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChanged(event.target.value)
  }
  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        name="inputMeme"
        aria-label="inputMeme"
        value={filter}
        onChange={changeFilter}
      ></SearchInput>
      <SearchButton
        aria-label="searchMeme"
        disabled={filter.length < 3}
        onClick={() => onSearch()}
      >
        Buscar
      </SearchButton>
    </SearchWrapper>
  )
}

export default App
