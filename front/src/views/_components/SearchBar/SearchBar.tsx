import { rem } from "polished";
import styled from "styled-components";
import { size, font, colors, fontWeight , iconSize} from "../../../ui/theme";



export const SearchBar = styled.input`

    padding-left: ${rem(size.base)};
    padding-top: ${rem(size.mini)};
    padding-bottom: ${rem(size.mini)};

    width:100%;
    height: 100%;

    border-radius: 0;
    border: 0;
    box-shadow: 0;

    display: flex;
    align-items: center;
`;

export const SearchContainer = styled.div`
    margin-top: ${rem(size.large)};
    margin-bottom: ${rem(size.xlarge)};

    width:100%;
    height: ${rem(size.large)};

    border-radius: 0;
    border: 0;
    box-shadow: 0;

    display: flex;
    align-items: center;
`;