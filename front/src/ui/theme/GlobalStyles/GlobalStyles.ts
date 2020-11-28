import { rem } from 'polished'
import { createGlobalStyle, css } from 'styled-components'
import { colors, font, size } from '../theme'

import { reboot } from './reboot'
import { reset } from './reset'

const scrollStyles = css`
  scroll-behavior: smooth;

  @supports (-webkit-overflow-scrolling: touch) {
    * {
      -webkit-overflow-scrolling: touch;
    }
  }
  @supports not (-webkit-overflow-scrolling: touch) {
    overflow: auto;

    ::-webkit-scrollbar {
      width: ${rem(size.xtiny)};
      border: 0;
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${colors.blue};
      border-radius: 0;
    }
  }
`

export const GlobalStyles = createGlobalStyle`
${reset};
${reboot};

${scrollStyles};
  html{
    min-height:100%;
    background-image: linear-gradient(
      150deg,
      ${colors.blue} 0%,
      ${colors.pink} 46%,
      ${colors.yellow} 100%
    );
    background-position: center; 
    background-repeat: no-repeat; 
    background-size: cover;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    ${font.base()};
    color: ${colors.white};
  }

`
