import styled from "styled-components"
import React from "react"
import { Logo } from "./Logo"
import { iconSize, fonts ,fontWeight, size } from "../../ui/theme"
import { rem } from "polished";

const HeaderContainer = styled.header`  
    width: 100%;
    display: flex;
    justify-content: space-between;
`

export const HeaderLogo = styled(Logo)`
    position: relative;
    width: ${rem(iconSize.large)};
    height: ${rem(iconSize.large)};
    top: 0.2rem;
    transform: rotate(45deg);
`

export const TituloWeb = styled.h1` 
    font-size: ${fonts.H1};
    font-weight: ${fontWeight.bold};
`

export const LogoContainer = styled.div` 
    display:flex;
    align-items: center;
    margin: ${rem(size.medium)} 0;
`

export const Header: React.FC=() =>{
 return(
    <>
        <HeaderContainer>
            <LogoContainer>
                <HeaderLogo/>
                <TituloWeb>GUIFAFFINITY</TituloWeb>
            </LogoContainer>
        </HeaderContainer>
    </>
 )
}

