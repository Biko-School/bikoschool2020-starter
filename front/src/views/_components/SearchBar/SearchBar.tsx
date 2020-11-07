import { rem } from "polished";
import styled from "styled-components";
import { size, font, colors, fontWeight , iconSize} from "../../../ui/theme";



export const SearchBar = styled.input`
    margin-top: ${rem(size.large)};
    margin-bottom: ${rem(size.xlarge)};
    margin-left: ${rem(size.xlarge)};
    display: flex;
    align-items: flex-end;

`;
