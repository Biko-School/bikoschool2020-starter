import styled from 'styled-components'
import { rem } from 'polished'
import { size, colors, font } from '../../../ui/theme/theme'

export const MemeDetailTag = styled.span`
  margin-right: ${rem(size.tiny)};
  background-color: ${colors.black};
  opacity: 0.62;

  color: ${colors.white};
  padding-right: ${rem(size.base)};
  padding-left: ${rem(size.base)};
  height: ${rem(40)}
  font-size: ${font.base()};
  border-radius: ${rem(109)};
`
