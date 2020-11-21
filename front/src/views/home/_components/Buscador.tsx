import styled from "styled-components";
import React from "react";
import SearchImage from '../../../ui/Images/Search.jpg';
import { rem } from "polished";
import { size } from "../../../ui/theme";

const BuscadorStyle = styled.nav`
    width: 100%;
    display: flex;
    margin-bottom: ${rem(size.medium)};
`
const Input = styled.input`
    border: solid 0;
    width: 100%;
    padding: 1rem;
`
const Imagen = styled.img`
    width:3rem;
`

const Button = styled.button`
    display:contents;
    border: 0;
    padding: 0;
`

export const Buscador: React.FC = () =>{
    const [hasErrors, setHasErrors] = React.useState<Boolean>(false)
    const [searchText, setSearchText] = React.useState<string>("")

    function changeOpacity(e:any) {
        if (e.target.style.opacity != 0.8){
            e.target.style.cursor = 'pointer';
            e.target.style.opacity = 0.8;
        }else{
            e.target.style.opacity = 1;
        }
    }

    return(
        <>
            <BuscadorStyle>
                <Input onChange={e => setSearchText(e.target.value)} type ="text" name="buscador" aria-label='search' placeholder="ENCUENTRA TU MEME" />
                <Button aria-label='search'>
                    <Imagen src={SearchImage} alt = 'Buscador logo' onMouseOver={changeOpacity} onMouseLeave={changeOpacity}/>
                </Button>
            </BuscadorStyle>
        {hasErrors && <span>El texto de búsqueda necesita ser mayor que dos caracteres</span>}
        </>   
    )
}