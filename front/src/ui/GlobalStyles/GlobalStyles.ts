import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import { reset } from './reset'
import { reboot } from './reboot'
import { font, colors, fontFamily } from '../theme'
import { rem } from 'polished'

export const GlobalStyles = createGlobalStyle`
    ${reset};
    ${reboot};
    body{
        ${font.base()};
        font-family: ${fontFamily};
        background-image: linear-gradient(157.9deg, ${colors.blue} 0%, ${colors.pink} 50%, ${colors.yellow} 100%);
        min-height: 100vh;
    }    

`;
