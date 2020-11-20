import React from 'react'
import { Text } from 'ui/components/Text'
import { Input } from 'ui/components/Input'
import { Select } from 'ui/components/Select'
import styled from 'styled-components'
import { sizes } from 'ui/theme'
import { Button } from 'ui/components/Button'
import {api} from 'api'

const emptyCharacter = {id: "", name: ""}

export const ComicsList = () => {
  const [filter, setFilter] = React.useState([emptyCharacter, emptyCharacter])
  const [comics, setComics] = React.useState([])
  const [characters, setCharacters] = React.useState([])

  const getCharacter = characterId => characters.find(character => parseInt(characterId) === character.id)

  const firstCharacterComics = comics.filter(comic => comic.characters.some(character => character === filter[0].name))
  const secondCharacterComics = comics.filter(comic => comic.characters.some(character => character === filter[1].name))
  const filteredComics = firstCharacterComics.filter(comic1 =>
    secondCharacterComics.some(comic2 => comic1.id === comic2.id)
  )

  console.log(filter)
  console.log(comics)
  console.log(firstCharacterComics)
  console.log(secondCharacterComics)
  console.log(filteredComics)

  React.useEffect(() => {
    api.allComics().then(
      setComics,
      error => {setComics([]); console.log(`Error al obtener la lista de comics: ${error}`)}
    )
    api.characters().then(
      setCharacters,
      error => {setCharacters([]); console.log(`Error al obtener la lista de personajes: ${error}`)}
    )
  }, [])

  return (
    <Layout>
      <Text as="h1" weight="black" size="h1" marginBottom="small">
        Buscador de cómics de Marvel
      </Text>
      <Text as="p" size="large" marginBottom="large">
        Este buscador encontrará los cómics en los que aparezcan los dos personajes que selecciones en el formulario
      </Text>
      <Text as="p" size="medium" marginBottom="base">
        Selecciona una pareja de personajes
      </Text>
      <Header charactersList={characters} firstCharacter={filter[0].id} secondCharacter={filter[1].id}
        onFirstCharacterChanged={firstCharacterId => {setFilter([getCharacter(firstCharacterId), filter[1]])}}
        onSecondCharacterChanged={secondCharacterId => {setFilter([filter[0], getCharacter(secondCharacterId)])}}
        onClear={() => {setFilter([emptyCharacter, emptyCharacter])}} />
      <List comics={filteredComics} />
      <Footer comicCount={filteredComics.length} />
    </Layout>
  )
}

const Header = ({ charactersList, firstCharacter, onFirstCharacterChanged, secondCharacter, onSecondCharacterChanged, onClear }) => {
  const options = charactersList.map(character => ({value: character.id, label: character.name}))
  return (
    <>
      <Select options={options} value={firstCharacter} onSelect={ev => {onFirstCharacterChanged(ev.target.value)}}></Select>
      <Select options={options} value={secondCharacter} onSelect={ev => {onSecondCharacterChanged(ev.target.value)}}></Select>
      <Button marginLeft="base" onClick={onClear}>
        Limpiar búsqueda
      </Button>
    </>
  )
}

const List = ({ comics }) =>
  comics.map(comic => (
    <Comic key={comic.id}>
      <Text as="p" weight="bold">
        {comic.title}
      </Text>
      <Text as="p">{comic.characters.join(', ')}</Text>
    </Comic>
  ))

const Footer = ({ comicCount }) => (
  <div>
    <Text>Elementos en la lista: {comicCount}</Text>
  </div>
)

const Layout = styled.div`
  max-width: 1140px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
`

const ComicInput = styled(Input)`
  margin-bottom: ${sizes.base};
`

const Comic = styled.div`
  margin-bottom: ${sizes.base};
`
