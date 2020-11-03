import { rem } from "polished";
import styled from "styled-components";
import { size } from "../../../ui/theme";
import { Logo } from "./Logo";



export const Header = styled.header`
margin-top: ${rem(size.large)};
margin-bottom: ${rem(size.xlarge)};
`;


export const LogoWrapper = styled(Logo)`

`