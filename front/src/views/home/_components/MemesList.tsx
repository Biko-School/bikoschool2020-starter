import styled from "styled-components"
import React from "react"
import { MemeImage } from "../../../ui/Components/MemeImage"
import { Meme } from "../../../core/domain/Meme/Meme"
import { rem } from "polished";
import { size } from "../../../ui/theme";

interface Props{
    memes : Meme[]
}

const MemeContainer = styled.div`
    width:100%;
    //display: inline-block;
    column-count: 5;
    column-gap: ${rem(size.medium)};
`

const MemeWrapper = styled.div`
    margin-bottom: ${rem(size.medium)};
`

export const MemesList: React.FC<Props>=(props) =>{
    return(
        <>
            <MemeContainer>
                {props.memes.map((meme) =>
                    <MemeWrapper>
                        <MemeImage key={meme.url} src={meme.url} alt={meme.title}/>
                    </MemeWrapper>
                )}
            </MemeContainer>
        </>
    )
}