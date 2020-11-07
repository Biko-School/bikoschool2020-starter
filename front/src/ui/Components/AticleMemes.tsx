import styled from "styled-components"
import React from "react"
import { MemeImage } from "./MemeImage"
import { Meme } from "../../core/domain/Meme/Meme"

interface Props{
    memes : Meme[]
}

const ArticleMemeStyle = styled.article`
    margin-left: 6rem;
    margin-right: 6rem;
`

const SectionMemeStyle = styled.section`
    width:100%;
    display: inline-block;
    column-count: 5;
`

const MemesDiv = styled.div`
    margin-bottom: 0.5rem;
`

export const ArticleMemes: React.FC<Props>=(props) =>{
    return(
        <>
            <ArticleMemeStyle>
                <SectionMemeStyle>
                    {props.memes.map((meme) =>
                        <MemesDiv>
                            <MemeImage key={meme.url} src={meme.url} alt={meme.title}/>
                        </MemesDiv>
                    )}
                </SectionMemeStyle>
            </ArticleMemeStyle>
        </>
    )
}