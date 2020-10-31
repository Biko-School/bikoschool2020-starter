import React from 'react'
import { grid } from '../../../ui/theme'
import { rem } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  width: ${rem(grid.contentMaxWidth)};
  max-width: 92%;
  margin-left: auto;
  margin-right: auto;
`
