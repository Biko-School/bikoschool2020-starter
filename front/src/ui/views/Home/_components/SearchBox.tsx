import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'
import { size } from '../../../theme/theme'

const SearchWrapper = styled.div`
  display: flex;
  margin-bottom: ${rem(size.medium)};
`
const SearchInput = styled.input.attrs({
  type: 'text',
  'aria-label': 'qué quieres buscar',
  placeholder: '¿Que quieres buscar? ¡Encuentralo!',
})`
  height: ${rem(70)};
  flex-grow: 1;
  padding: ${rem(size.mini)} ${rem(size.mini)};
`

const SearchButton = styled.button.attrs({
  'aria-label': 'comenzar búsqueda',
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${rem(70)};
  height: ${rem(70)};
`

interface SearchBoxProps {
  filter: string
  onFilterChanged(newFilter: string): void
  onSearch(): void
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  filter,
  onFilterChanged,
  onSearch,
}) => {
  const changeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChanged(event.target.value)
  }
  return (
    <SearchWrapper>
      <SearchInput value={filter} onChange={changeFilter}></SearchInput>
      <SearchButton disabled={filter.length < 3} onClick={() => onSearch()}>
        Buscar
      </SearchButton>
    </SearchWrapper>
  )
}
