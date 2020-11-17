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
import { SearchBox } from './views/_components/SearchBox'
import { MemeList } from './views/_components/MemeList/MemeList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App: React.FC = () => {
  const [memesData, setMemesData] = React.useState<Meme[]>([])
  const [filter, setFilter] = React.useState<string>('')
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    getMemesData()
      .then((data) => {
        setMemesData(data)
      })
      .catch((error) => {
        setError('Se ha producido un error al obtener los memes mas recientes')
      })
  }, [])

  const handleSearch = () => {
    setError(null)
    const trimmedFilter = filter.trim().replace(/\s+/g, ' ')

    if (trimmedFilter.length < 3) {
      setError(
        'La longitud del termino de busqueda debe ser mayor de 2 caracteres',
      )
    }

    getFilteredMemesData(trimmedFilter)
      .then((data) => {
        setMemesData(data)
      })
      .catch((error) => {
        setError(
          'Se ha producido un error al realizar la búsqueda de los memes',
        )
      })
  }

  return (
    <>
      <Router>
        <GlobalStyles />
        <Container>
          <Header>
            <LogoWrapper>
              <HeaderLogo />
              <AppName>Guifaffinity</AppName>
            </LogoWrapper>
          </Header>

          <Switch>
            <Route exact path="/">
              <SearchBox
                filter={filter}
                onFilterChanged={setFilter}
                onSearch={() => handleSearch()}
              />
              {error ? <p>{error}</p> : <MemeList memes={memesData} />}
            </Route>
            <Route path="/memes/:id">
              <MemeDetail />
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  )
}

const MemeDetail: React.FC = () => {
  return (
    <>
      <p>Movie Brazil GIF by MOODMAN</p>
    </>
  )
}

export default App
