import styled from "styled-components"
import React from "react"
import ImagenBuscador from "../Images/Buscar.jpg"

const BuscadorStyle = styled.div`
 width: 100%;
    display: flex;
    padding: 0.5rem 6rem;
`

const Input = styled.input`
    border: solid 0;
    width: 100%;
`
const Imagen = styled.img`
    width:4rem;
`

export const Buscador: React.FC = () =>{
    return(
        <>
            <BuscadorStyle>
                <Input type ="text" name="buscador"/>
                <Imagen src={ImagenBuscador} alt = 'Buscador logo'/>
            </BuscadorStyle>
        </>   
    )
}