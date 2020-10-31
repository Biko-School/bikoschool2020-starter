import { css } from 'styled-components';
import { rem } from 'polished';

export const grid = {
  maxWidth: rem(1132),
};

export const size = {
  xtiny: rem(4),
  tiny: rem(8),
  small: rem(12),
  mini: rem(24),
  medium: rem(32),
  large: rem(48),
  xlarge: rem(64),
  huge: rem(96),
};

const fontWeight = {
  light: 300,
  regular: 400,
  bold: 700,
  extraBold: 800,
};

export const font = {
  weight: fontWeight,

  small(weight = fontWeight.regular) {
    return css`
      font-family: 'Open Sans';
      font-size: ${rem(12.64)};
      line-height: ${rem(17)};
      font-weight: ${weight};
    `;
  },

  base(weight = fontWeight.regular) {
    return css`
      font-family: 'Open Sans';
      font-size: ${rem(16)};
      line-height: ${rem(22)};
      font-weight: ${weight};
    `;
  },

  h4(weight = fontWeight.regular) {
    return css`
      font-family: 'Open Sans';
      font-size: ${rem(18)};
      line-height: ${rem(25)};
      font-weight: ${weight};
    `;
  },

  h3(weight = fontWeight.regular) {
    return css`
      font-family: 'Open Sans';
      font-size: ${rem(25.63)};
      line-height: ${rem(35)};
      font-weight: ${weight};
    `;
  },

  h2(weight = fontWeight.regular) {
    return css`
      font-family: 'Open Sans';
      font-size: ${rem(36.41)};
      line-height: ${rem(50)};
      font-weight: ${weight};
    `;
  },

  h1(weight = fontWeight.regular) {
    return css`
      font-family: 'Open Sans';
      font-size: ${rem(41.83)};
      line-height: ${rem(50)};
      font-weight: ${weight};
    `;
  },
};

export const color = {
  purple: '#9933FF',
  lightRed: '#FF6666',
  lightBlue: '#00CCFF',
  lightGreen: '#00FF99',
  lightYellow: '#FFF9AA',
  blue: '#4158D0',
  pink: '#C850C0',
  yellow: '#FFCC70',
  black: '#000000',
  grey: '#999999',
  white: '#FFFFFF',
};
