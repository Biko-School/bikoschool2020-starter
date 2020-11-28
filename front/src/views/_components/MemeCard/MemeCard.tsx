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

export const MemeCard: React.FC<Props> = ({ id, url, title, tags }) => (
    <Wrapper>
        <MemeImage src={url} alt={title} />
        <TagList>
            {tags.join(', ')}
        </TagList>
    </Wrapper>
)

const Wrapper = styled.div`
    break-inside: avoid;
    position: relative;
    overflow: hidden;
`

const TagList = styled.div`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    color: #fff;
    background-image:linear-gradient(0deg, rgba(0,0,0,.7) 20%, rgba(0,0,0,0) 100%);
    padding: 1rem .4rem .2rem;
    transform: translateY(100%);
    opacity: 0;
    transition: all .3s;

    ${Wrapper}:hover & {
        transform: translateY(0);
        opacity: 1;
    }
`   

const MemeImage = styled.img`
    width: 100%;
    display: block;
`

