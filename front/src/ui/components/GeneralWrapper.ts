import { rem } from 'polished'
import styled from 'styled-components'
import { grid } from '../theme/theme'

export const GeneralWrapper = styled.div`
  max-width: ${grid.contentMaxWidth};
  margin: 0 auto;
  padding: ${rem(48)};
`
