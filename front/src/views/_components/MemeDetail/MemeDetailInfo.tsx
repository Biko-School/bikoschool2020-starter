import React from 'react'
import styled from "styled-components";
import { size,colors,fontWeight, font } from "../../../ui/theme";
import { rem } from 'polished'

interface Props {
    tags: string[],
    authorName?: string,
    authorLogo?: string,
}


export const MemeDetailInfo: React.FC<Props> = ({tags}) => (
    <TagList>
    {tags.map((element: string) => {
        return (
            <TagWrapper>
                <Tag>{element}</Tag>
            </TagWrapper>
        )
      })}
    </TagList>
)

const TagWrapper = styled.div`
    height: ${rem(40)};
    width: auto;
`

const TagList = styled.div`

`

const Tag = styled.text`
    color: ${colors.white};
    ${font.h4()};

    background: rgba(0, 0, 0, 0.62);
    border-radius: ${rem(109)};
    height: ${rem(40)};
   
    display: flex;
    align-items: center;
    text-align: center;

`