import styled from "styled-components"
import React from "react"
import { MemeImage } from "./MemeImage"
import { Meme } from "../../../core/domain/Meme/Meme"
import { rem } from "polished";
import { size } from "../../../ui/theme";
import {
    Link
  } from "react-router-dom";
interface Props{
    memes : Meme[]
}

const MemeContainer = styled.div`
    width:100%;
    column-count: 5;
    column-gap: ${rem(size.medium)};
    line-height: 0;
`

export const MemesList: React.FC<Props>=(props) =>{
    return(
        <>
            <MemeContainer>
                {props.memes.map((meme) =>
                    <Link to={"/meme-detail/"+meme.id}><MemeImage key={meme.id} src={meme.url} alt={meme.title}/></Link>
                )}
            </MemeContainer>
        </>
    )
}