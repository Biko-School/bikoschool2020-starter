import { rem } from 'polished'
import styled from 'styled-components'
import { grid } from '../../ui/theme/theme'

export const Container = styled.div`
  max-width: ${rem(grid.contentMaxWidth)};

  margin-left: auto;
  margin-right: auto;
`
