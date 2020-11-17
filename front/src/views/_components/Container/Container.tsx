import styled from "styled-components";
import { size, font, colors, fontWeight , iconSize} from "../../../ui/theme";

import { rem } from 'polished'

export const GlobalContainer = styled.div`
    font-family: 'Open Sans', sans-serif;
    ${font.base()};
    padding:3rem;
    max-width:${rem(1132)};
`