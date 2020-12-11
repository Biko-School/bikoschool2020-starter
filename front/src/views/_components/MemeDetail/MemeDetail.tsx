import React from 'react'
import styled from "styled-components";
import { size,colors,fontWeight, font } from "../../../ui/theme";
import { rem } from 'polished'
import { MemeDetailInfo } from './MemeDetailInfo';


interface Props {
    id: string,
    url: string,
    tags: string[],
    title: string,
    authorLogo?: string | "Unknown",
    authorName?: string,
}

export const MemeDetailSchema: React.FC<Props> = ({ id, url, title, tags,authorLogo,authorName }) => (
    <MemeDetailWraper>
        <MemeDetailTitle>{title}</MemeDetailTitle>
        <MemeDetailImage src={url} alt={title} />
        <MemeDetailInfo tags={tags} authorName={authorName} authorLogo={authorLogo}></MemeDetailInfo>
    </MemeDetailWraper>
)

export const MemeDetailWraper = styled.div`
`

export const MemeDetailTitle = styled.h2`
    color: ${colors.white};
    ${font.h2()};
    font-weight: ${fontWeight.bold};
`

const MemeDetailImageWraper = styled.div`


`

const MemeDetailImage = styled.img`
    width: 100%;
    display: block;
`