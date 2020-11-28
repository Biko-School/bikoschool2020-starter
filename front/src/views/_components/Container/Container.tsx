import styled from "styled-components";
import { size } from "../../../ui/theme";
import { rem } from 'polished'

export const GlobalContainer = styled.div`
    padding: 0 ${rem(size.base)};
    margin: 0 auto;
    max-width:${rem(1132)};
    width: 100%;
`