import { createGlobalStyle } from 'styled-components';
import { reset } from './reset';
import { reboot } from './reboot';
import { font, color } from './theme';

export const GlobalStyles = createGlobalStyle`
    ${reset}
    ${reboot}

    body {
        min-height: 100vh;

        font-family: 'Open Sans', sans-serif;
        ${font.base()};

        background-image: linear-gradient(
        150deg,
        ${color.blue} 0%,
        ${color.pink} 46%,
        ${color.yellow} 100%
        );
        background-position: center; 
        background-repeat: no-repeat; 
        background-size: cover;

        color: ${color.white};
    }
`;
