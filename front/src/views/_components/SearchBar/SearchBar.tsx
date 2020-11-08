import { rem } from "polished";
import styled from "styled-components";
import { size, font, colors, fontWeight , iconSize} from "../../../ui/theme";



export const SearchBar = styled.input`
    margin-top: ${rem(size.large)};
    margin-bottom: ${rem(size.xlarge)};

    padding-left: ${rem(size.base)};
    padding-top: ${rem(size.mini)};
    padding-bottom: ${rem(size.mini)};

    width: ${rem(1132)}; 
    height: ${rem(size.large)};

    border-radius: 0;
    border: 0;
    box-shadow: 0;

    display: flex;
    align-items: center;


`;
