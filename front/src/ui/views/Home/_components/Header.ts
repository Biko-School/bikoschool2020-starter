import styled from 'styled-components'
import { rem } from 'polished'
import { size, font, fontWeight, iconSize } from '../../../theme/theme'
import { Logo } from './Logo'

export const Header = styled.header`
  margin-top: ${rem(size.large)};
  margin-bottom: ${rem(size.xlarge)};
`

export const LogoWrapper = styled.div`
  display: flex;
  //align-items: center;
`

// Extiende de Logo
export const HeaderLogo = styled(Logo)`
  //position: relative;

  width: ${rem(iconSize.large)};
  height: ${rem(iconSize.xlarge)};

  transform: rotate(45deg);
  //top: 0.2rem;
`

export const AppName = styled.span`
  font-weight: ${fontWeight.extraBold};
  ${font.h1};
  text-transform: uppercase;
`
