import styled from "styled-components";
import React from "react";
import SearchImage from '../../../ui/Images/Search.jpg';
import { rem } from "polished";
import { size } from "../../../ui/theme";

const BuscadorStyle = styled.nav`
    width: 100%;
    display: flex;
    margin-bottom: ${rem(size.medium)}
`

const Input = styled.input`
    border: solid 0;
    width: 100%;
    padding: 1rem;
`
const Imagen = styled.img`
    width:3rem;
`

export const Buscador: React.FC = () =>{
    return(
        <>
            <BuscadorStyle>
                <Input type ="text" name="buscador" placeholder="ENCUENTRA TU MEME" />
                <Imagen src={SearchImage} alt = 'Buscador logo'/>
            </BuscadorStyle>
        </>   
    )
}