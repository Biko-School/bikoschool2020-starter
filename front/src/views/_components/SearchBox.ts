import styled from 'styled-components/macro'
import { rem } from 'polished'
import { colors, font, iconSize, size } from '../../ui/theme/theme'

export const SearchBox = styled.div`
  display: flex;
  margin-bottom: ${rem(size.medium)};
`

export const SearchInput = styled.input.attrs({
  type: 'text',
  'aria-label': 'qué quieres buscar',
  placeholder: '¿Que quieres buscar? ¡Encuentralo!',
})`
  height: ${rem(70)};
  flex-grow: 1;
  padding: ${rem(size.mini)} ${rem(size.mini)};

  border: 0;
  outline: 0;

  &::placeholder {
    color: ${colors.grey};
    ${font.h4()}
  }
`

export const SearchButton = styled.button.attrs({
  'aria-label': 'comenzar búsqueda',
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${rem(70)};
  height: ${rem(70)};

  /* tamaño del icono */
  font-size: ${rem(iconSize.medium)};

  border: 0;
  background-image: linear-gradient(
    43deg,
    ${colors.ligthYellow} 0%,
    ${colors.lightBlue} 46%,
    ${colors.lightGreen} 100%
  );

  cursor: pointer;
`
