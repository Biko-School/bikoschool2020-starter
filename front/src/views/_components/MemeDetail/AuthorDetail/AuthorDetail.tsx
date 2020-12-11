import React from 'react'
import styled from "styled-components";
import { size,colors,fontWeight, font } from "../../../..//ui/theme";
import { rem } from 'polished'


interface Props {
    logo: string,
    name: string,
}

export const AuthorDetail: React.FC<Props> = ({logo,name}) => (
    <AuthorLogo src={logo} alt={'author name:'+name}></AuthorLogo>
)

const AuthorLogo = styled.img`

`