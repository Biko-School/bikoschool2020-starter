import { rem } from 'polished'
import styled from 'styled-components'
import { size } from '../../ui/theme/theme'

export const SearchBox = styled.div`
  display: flex;
  margin-bottom: ${rem(size.medium)};
`
export const SearchInput = styled.input`
  height: ${rem(70)};
  flex-grow: 1;
  padding: ${rem(size.mini)} ${rem(size.mini)};
`

export const SearchButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${rem(70)};
  height: ${rem(70)};
`
