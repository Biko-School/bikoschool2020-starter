import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import { reset } from './reset'
import { reboot } from './reboot'
import { font } from '../theme'
import { rem } from 'polished'

export const GlobalStyles = createGlobalStyle`
${reset};
${reboot};

    body{
        display:flex;
        align-items:center;
        justify-content:center;
        background: linear-gradient(157.9deg, #4158D0 1.21%, rgba(200, 80, 192, 0.46) 49.58%, rgba(255, 204, 112, 0.58) 96.91%);

    }    

`;
