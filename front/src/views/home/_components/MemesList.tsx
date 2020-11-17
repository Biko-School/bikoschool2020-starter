import styled from "styled-components"
import React from "react"
import { MemeImage } from "./MemeImage"
import { Meme } from "../../../core/domain/Meme/Meme"
import { rem } from "polished";
import { size } from "../../../ui/theme";

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
                    <MemeImage key={meme.url} src={meme.url} alt={meme.title}/>
                )}
            </MemeContainer>
        </>
    )
}