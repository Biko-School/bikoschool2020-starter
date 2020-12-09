import React from 'react'
import styled from "styled-components";
import { size } from "../../../ui/theme";
import { rem } from 'polished'


interface Props {
    id: string,
    url: string,
    tags: string[],
    title: string
}

export const MemeDetail: React.FC<Props> = ({ id, url, title, tags }) => (
    <MemeDetailWraper>
        <MemeDetailImage src={url} alt={title} />
    </MemeDetailWraper>
)

export const MemeDetailWraper = styled.div`


`

const MemeDetailImage = styled.img`
    width: 100%;
    display: block;
`