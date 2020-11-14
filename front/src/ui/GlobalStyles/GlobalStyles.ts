import { createGlobalStyle } from "styled-components";
import { reboot } from "./reboot";
import { reset } from "./reset";
import { colors, fonts } from "../theme";

export const GlobalStyles = createGlobalStyle`

${reset};
${reboot};

    body{
        font-family: 'Open Sans', sans-serif;
        ${fonts.Base()}
        background-image: linear-gradient(
            150deg,
            ${colors.blue} 0%,
            ${colors.pink} 46%,
            ${colors.yellow} 100%
        );
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

        color: ${colors.white};
        

    }
`;
