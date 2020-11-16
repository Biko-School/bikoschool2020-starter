import styled from 'styled-components'
import { font } from '../../../ui/theme'

import { rem } from 'polished'

export const GlobalContainer = styled.div`
  font-family: 'Open Sans', sans-serif;
  ${font.base()};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SecondaryContainer = styled.div`
  width: 75%;
  max-width: ${rem(1132)};
`
