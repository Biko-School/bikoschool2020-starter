import styled from "styled-components";
import React from "react";
import SearchImage from '../../../ui/Images/Search.jpg';
import { rem } from "polished";
import { size } from "../../../ui/theme";

interface Props{
    onSearch : any
}

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

export const Buscador: React.FC<Props> = (props) =>{
    const [query, setQuery] = React.useState<string>("")
    const [isOverSearch, setIsOverSearch] = React.useState<Boolean>(false)

    function changeOpacity(e:any) {
        if (!isOverSearch){
            e.target.style.cursor = 'pointer';
            e.target.style.opacity = 0.8;
            setIsOverSearch(true)
        }else{
            e.target.style.opacity = 1;
            setIsOverSearch(false)
        }
    }

    function startSearch(){
        props.onSearch(query)
    }

    return(
        <>
            <BuscadorStyle>
                <Input onChange={e => setQuery(e.target.value)} type ="text" name="buscador" aria-label='search' placeholder="ENCUENTRA TU MEME" />
                <Button aria-label='search' onClick={startSearch}>
                    <Imagen src={SearchImage} alt = 'Buscador logo' onMouseOver={changeOpacity} onMouseLeave={changeOpacity}/>
                </Button>
            </BuscadorStyle>
        </>   
    )
}