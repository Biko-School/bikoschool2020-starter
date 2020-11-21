import styled from 'styled-components/macro'
import { Logo } from './Logo'
import { rem } from 'polished'
import { font, fontWeight, iconSize, size } from '../../../ui/theme/theme'

export const Header = styled.header`
  margin-top: ${rem(size.large)};
  margin-bottom: ${rem(size.xlarge)};
  display: flex;
  flex-direction: row;
`

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const HeaderLogo = styled(Logo)`
  position: relative;

  width: ${rem(iconSize.large)};
  height: ${rem(iconSize.xlarge)};

  top: 0.2rem; /* Al estar rotado, lo ajusta para que visualmente esté bien posicionado */
  transform: rotate(45deg);
`

export const AppName = styled.span`
  font-weight: ${fontWeight.extraBold};
  ${font.h1};
  text-transform: uppercase;
`

export const HeaderLink = styled.a`
  text-decoration: none;
`

export const LoginWrapper = styled.div`
  margin-left: auto;
`
