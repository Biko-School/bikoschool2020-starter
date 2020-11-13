import styled from "styled-components"
import React from "react"
import SearchImage from "../Images/Search.jpg"

const BuscadorStyle = styled.nav`
    width: 100%;
    display: flex;
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