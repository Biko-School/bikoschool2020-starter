import styled from "styled-components"
import React from "react"
import IconoPersona from "../Images/IconoPersona.jpg"


const LoginContainer = styled.picture`
    display: flex;
    justify-content: flex-end;
    padding: 2rem 0;
`

const Button = styled.button`
    width: 9rem;
    background-color: rgba(0,0,0, 0.7);
    border: solid 0;
    color: white;
`
export const Login: React.FC=() =>{

    return (
        <>
            <LoginContainer>
                <img src={IconoPersona} alt="Imagen LogIN"/>
                <Button type="button">Logueate</Button>
            </LoginContainer>
        </>
    )
}