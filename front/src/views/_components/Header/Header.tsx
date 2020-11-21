import React from 'react'
import { Logo } from './Logo'
import { size, fontWeight, font, iconSize } from '../../../ui/theme'
import { rem } from 'polished'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LogoStyled = styled(Logo)`
  width: ${rem(iconSize.large)};
  height: ${rem(iconSize.xlarge)};

  transform: rotate(45deg) translateY(-2%);
`

const Container = styled.header`
  padding-top: ${rem(size.large)};
  padding-bottom: ${rem(size.xlarge)};
`
const Wrapper = styled(Link)`
  display: inline-flex;
  align-items: center;
  column-gap: ${rem(size.tiny)};
`
const LogoText = styled.h1`
  font-weight: ${fontWeight.extraBold};
  ${font.h1};
  text-transform: uppercase;
`

export const Header = () => (
  <Container>
    <Wrapper to="/">
      <LogoStyled />
      <LogoText>Guifaffinity</LogoText>
    </Wrapper>
  </Container>
)
