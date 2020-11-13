import React from 'react'
import styled from "styled-components";
import { size, font, colors, fontWeight , iconSize} from "../../../ui/theme";

import { rem } from 'polished'

const Lupa: React.FC<{ className?: string }> = ( { className }) => (
    <svg className={className} viewBox="0 0 42 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 14.7059C40 21.6107 34.0158 27.4118 26.375 27.4118C18.7342 27.4118 12.75 21.6107 12.75 14.7059C12.75 7.80111 18.7342 2 26.375 2C34.0158 2 40 7.80111 40 14.7059Z" stroke="white" stroke-width="4"/>
    <line y1="-2" x2="24.8674" y2="-2" transform="matrix(-0.653466 0.756956 -0.794358 -0.60745 16.25 23)" stroke="white" stroke-width="4"/>
    </svg>
)

export const StyledLupa = styled(Lupa)`

    
`
export const LupaWraper = styled.button`
    height: ${rem(size.large)};
    width: ${rem(size.large)};
    padding: ${rem(size.tiny)};
    cursor:pointer;
    background: linear-gradient(135deg, rgba(255, 243, 92, 0.77) 0%, rgba(0, 204, 255, 0.46) 51.04%, rgba(0, 255, 153, 0.37) 100%),
    linear-gradient(0deg, #C4C4C4, #C4C4C4);

    border-radius: 0;
    border: 0;
    box-shadow: 0;
`
