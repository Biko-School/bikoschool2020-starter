import React from 'react'
import styled from "styled-components";
import { size } from "../../../ui/theme";
import { rem } from 'polished'

interface Props{
  id: string,
  url: string,
  tags: string[],
  title: string
}

export const MemeCard: React.FC<Props> = ({ id, url, title, tags }) => (
  <div >
    <MemeImage src={url} alt={title} />
  </div>
)
const MemeImage = styled.img`
    width: 100%;
    display: block;
`

