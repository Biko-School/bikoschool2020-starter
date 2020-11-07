import { createGlobalStyle } from 'styled-components'
import { reset } from './reset'
import { reboot } from './reboot'
import { font } from '../theme'

export const GlobalStyles = createGlobalStyle`
${reset};
${reboot};

    body{
        font-family: 'Open Sans', sans-serif;
        background: linear-gradient(157.9deg, #4158D0 1.21%, rgba(200, 80, 192, 0.46) 49.58%, rgba(255, 204, 112, 0.58) 96.91%);
        ${font.base()};
    }

    .gradientBackground{
        background: linear-gradient(157.12deg, rgba(65, 88, 208, 0.6) 1.53%, rgba(200, 80, 192, 0.276) 49.74%, rgba(255, 204, 112, 0.348) 94.87%), #FFFFFF;
    }

    

`;