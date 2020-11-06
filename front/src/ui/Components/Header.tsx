import styled from "styled-components"
import React from "react"
import {Login} from "./Login"
import { Logo } from "./Logo"

const HeaderStyle = styled.header`  
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 3rem 6rem;

`
export const Header: React.FC=() =>{
 return(
    <>
        <HeaderStyle>
            <Logo/>
            <Login/>
        </HeaderStyle>
    </>
 )
}

