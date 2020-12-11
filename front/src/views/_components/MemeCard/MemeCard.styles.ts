import { rem } from 'polished'
import styled from 'styled-components'
import { colors, font, fontWeight, size } from '../../../ui/theme/theme'

export const InfoWrapper = styled.div`
  position: absolute;

  bottom: 0;
  left: 0;
  right: 0;

  opacity: 0;
  transition: opacity 0.3s;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 212, 255, 0) 100%
  );
`

export const MemeCardWrapper = styled.div`
  display: block;
  position: relative;
  margin-bottom: ${rem(size.base)};

  &:hover {
    cursor: pointer;
    ${InfoWrapper} {
      opacity: 1;
    }
  }
`

export const Link = styled.a`
  display: block;
`

export const UserLink = styled.a`
  display: inline-flex;
  align-items: center;

  padding-bottom: ${rem(size.tiny)};
  padding-left: ${rem(size.tiny)};
  padding-top: ${rem(size.tiny)};

  text-decoration: none;
`

export const UserAvatar = styled.img`
  display: inline-block;

  width: ${rem(size.base)};
  height: ${rem(size.base)};
`

export const UserName = styled.span`
  margin-left: ${rem(size.mini)};

  ${font.small()};
  font-weight: ${fontWeight.bold};

  text-shadow: 1px 1px ${colors.grey}; ;
`

export const TagsWrapper = styled.div`
  padding: ${rem(size.xtiny)};

  white-space: pre;
  text-overflow: ellipsis;
  overflow: hidden;

  color: ${colors.white};
  ${font.small()};
`

export const Tag = styled.span`
  margin-right: ${rem(size.tiny)};
`
