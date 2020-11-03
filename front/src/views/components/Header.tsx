import styled from 'styled-components';
import { size, font, color } from '../../styles/theme';
import { Logo } from './Logo';

export const HeaderCont = styled.header`
  display: flex;
  margin-top: ${size.large};
  margin-bottom: ${size.xlarge};
`;

export const LogoContAndLink = styled.a`
  display: inline-block;
  text-decoration: none;
`;

export const LogoIcon = styled(Logo)`
  width: ${size.large};
  height: ${size.large};
  transform: rotate(45deg);
`;

export const LogoText = styled.span`
  ${font.h1(font.weight.extraBold)};
  text-transform: uppercase;
  color: ${color.white};
`;
