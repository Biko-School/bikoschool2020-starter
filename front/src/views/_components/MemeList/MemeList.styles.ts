import styled from 'styled-components'
import { rem } from 'polished'
import { font, fontWeight, size } from '../../../ui/theme/theme'

export const MemesListWrapper = styled.div`
  column-count: 5;
  column-gap: ${rem(size.base)};

  margin-bottom: ${rem(size.large)};
`

export const MemesListTitle = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: ${rem(size.base)};
`

export const Text = styled.div`
  ${font.h3()};
  font-weight: ${fontWeight.bold};
  margin-left: ${rem(size.tiny)};
`
