import React from 'react'
import styled from "styled-components";
import { size } from "../../../ui/theme";
import { rem } from 'polished'


export const MemeListWraper = styled.div`
  column-count: 5;
  column-width: 10rem;
  column-gap: ${rem(size.mini)};
  > * {
    margin-bottom:  ${rem(size.mini)}
  }
`
