import { rem } from "polished";
import styled from "styled-components";
import { size, font, colors, fontWeight , iconSize} from "../../../ui/theme";
import { Logo } from "./Logo";



export const Header = styled.header`
    margin-top: ${rem(size.large)};
    margin-bottom: ${rem(size.xlarge)};
    margin-left: ${rem(size.xlarge)};
    ${font.h1()}
    font-weight: ${fontWeight.extraBold};
    color: ${colors.white};
    display: flex;
    align-items: flex-end;
`;


export const LogoWrapper = styled(Logo)`
    width: ${rem(iconSize.xlarge)};
    height: ${rem(iconSize.xlarge)};
    margin-right: ${rem(size.small)};
`

export const Title = styled.text`

`