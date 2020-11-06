import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`
interface Props {
  image: {
    src: string
    alt: string
  }
}

export const Card: React.FC<Props> = ({ image }) => (
  <Image src={image.src} alt={image.alt} />
)
