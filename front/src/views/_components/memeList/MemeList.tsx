import React from 'react'
import styled from "styled-components";
import { size, font, colors, fontWeight , iconSize} from "../../../ui/theme";

import { rem } from 'polished'



export const MemeListWraper = styled.div`
  width:100%;
  column-count: 5;
  /* column-gap: ${rem(size.medium)}; */
  grid-auto-columns: true;
`

export const MemeWrapper = styled.div`
    width: 100%;
`

export const MemeImage = styled.img`
    width: 100%;
    /* margin-bottom: ${rem(size.medium)}; */
`