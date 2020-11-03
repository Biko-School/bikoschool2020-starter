import { createGlobalStyle } from 'styled-components'
import { colors, font } from '../theme'

import { reboot } from './reboot'
import { reset } from './reset'

export const GlobalStyles = createGlobalStyle`
${reset};
${reboot};

  body {
    font-family: 'Open Sans', sans-serif;
    ${font.base()};

    background-image: linear-gradient(
    150deg,
    ${colors.blue} 0%,
    ${colors.pink} 46%,
    ${colors.yellow} 100%
    );
    background-position: center; 
    background-repeat: no-repeat; 
    background-size: cover;
    background-attachment: fixed;

    color: ${colors.white};
  }

`