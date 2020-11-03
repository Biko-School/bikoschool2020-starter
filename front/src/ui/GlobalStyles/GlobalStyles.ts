import { createGlobalStyle } from 'styled-components'
import { reset } from './reset'
import { reboot } from './reboot'
import { font } from '../theme'

export const GlobalStyles = createGlobalStyle`
${reset};
${reboot};

    body{
        font-family: 'Open Sans', sans-serif;
        ${font.base()};
    }

    

`;