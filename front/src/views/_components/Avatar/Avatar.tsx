import React from 'react'
import styled, { StyledFunction } from 'styled-components'
import { rem } from 'polished'
import { size, colors } from './../../../ui/theme'

interface Props {
  size?: 'large' | 'medium'
}

export const Avatar = styled.img<Props>`
  width: ${(props) => rem(size[props.size || 'medium'])};
  height: ${(props) => rem(size[props.size || 'medium'])};
  object-fit: cover;
`
