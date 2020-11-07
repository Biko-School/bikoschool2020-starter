import styled from "styled-components"
import React from "react"
import ImagenBuscador from "../Images/Buscar.jpg"

const BuscadorStyle = styled.nav`
 width: 100%;
    display: flex;
    padding: 0.5rem 6rem;
    margin-bottom: 0.5rem;
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
                <Imagen src={ImagenBuscador} alt = 'Buscador logo'/>
            </BuscadorStyle>
        </>   
    )
}