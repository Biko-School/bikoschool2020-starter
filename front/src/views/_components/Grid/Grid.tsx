import { rem } from 'polished'
import styled from 'styled-components'
import { size, breakpoints } from './../../../ui/theme'

export const Grid = styled.div`
  column-count: 2;
  column-gap: ${rem(size.mini)};
  > * {
    margin-bottom: ${rem(size.mini)};
  }
  @media (min-width: ${rem(breakpoints.tablet)}) {
    column-count: 3;
  }
  @media (min-width: ${rem(breakpoints.desktop)}) {
    column-count: 5;
  }
`
