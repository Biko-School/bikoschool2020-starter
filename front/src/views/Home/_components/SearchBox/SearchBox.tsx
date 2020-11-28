import React, { useState } from 'react'
import { rem } from 'polished'
import styled from 'styled-components'
import { colors, size, iconSize } from '../../../../ui/theme'
import { Search } from '../../../../ui/icons'

interface Props {
  onSearch(s: string): void
}

const Form = styled.form`
  display: flex;
  flex-direction: row;
  margin-bottom: ${rem(32)};
`

const SearchInput = styled.input`
  width: 100%;
  height: ${rem(70)};
  border: none;
  padding-top: ${rem(16)};
  padding-bottom: ${rem(16)};
  padding-left: ${rem(24)};

  ::-webkit-search-cancel-button {
    display: none;
  }

  ::placeholder {
    font-size: ${rem(size.small)};
    color: ${colors.grey};
  }
`

const SearchButton = styled.button`
  width: ${rem(70)};
  background-image: linear-gradient(
    150deg,
    ${colors.yellow} 1.21%,
    ${colors.lightBlue} 45%,
    ${colors.lightGreen} 96%
  );
  border: none;
`
const MIN_LENGTH_SEARCH_TERM = 2
export const SearchBox: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearchInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(ev.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(searchTerm)
  }
  return (
    <Form onSubmit={onSubmit}>
      <SearchInput
        value={searchTerm}
        type="search"
        placeholder="¿Qué quieres buscar? ¡Encuéntralo!"
        onChange={handleSearchInput}
      />
      <SearchButton
        disabled={
          searchTerm.length > 0 && searchTerm.length <= MIN_LENGTH_SEARCH_TERM
        }
        aria-label="Search"
      >
        <Search size={rem(iconSize.medium)} color={colors.white} />
      </SearchButton>
    </Form>
  )
}
