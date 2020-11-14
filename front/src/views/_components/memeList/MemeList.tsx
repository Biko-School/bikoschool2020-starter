import React from 'react'
import styled from 'styled-components'
import { size, font, colors, fontWeight, iconSize } from '../../../ui/theme'

import { rem } from 'polished'

export const MemeListWraper = styled.div`
  column-count: 5;
  column-gap: ${rem(size.medium)};
`
