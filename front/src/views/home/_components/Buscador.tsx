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

export const Buscador: React.FC = () =>{
    const [hasError, setHasError] = React.useState<boolean>(false)
    const [searchText, setSearchText] = React.useState<string>("")

    function startSearch(){
        if (searchText.length < 3){
            setHasError(true)
        }
        
    }

    return(
        <>
            <BuscadorStyle>
                <Input onChange={e => setSearchText(e.target.value)} type ="text" name="buscador" aria-label='search' placeholder="ENCUENTRA TU MEME" />
                <button aria-label='search' onClick={startSearch}>
                    <Imagen src={SearchImage} alt = 'Buscador logo'/>
                </button>
            </BuscadorStyle>
        {hasError && <span>El texto de búsqueda necesita ser mayor que dos caracteres</span>}
        </>   
    )
}