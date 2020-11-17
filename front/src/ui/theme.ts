import { rem } from "polished";
import { css } from "styled-components";

export const size = {
  none: 0,
  xtint: 4,
  tiny: 8,
  small: 12,
  mini: 16,
  base: 24,
  medium: 32,
  large: 48,
  xlarge: 64,
  huge: 96,
};

export const iconSize = {
  mini: 16,
  base: 24,
  medium: 32,
  large: 48,
  xlarge: 64,
};

export const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1132,
};

export const fonts = {
  small() {
    return css`
      font-size: ${rem(12.64)};
      line-height: ${rem(17)};
    `;
  },
  Base() {
    return css`
      font-size: ${rem(16)};
      line-height: ${rem(22)};
    `;
  },
  H4() {
    return css`
      font-size: ${rem(18)};
      line-height: ${rem(25)};
    `;
  },
  H3() {
    return css`
      font-size: ${rem(25.63)};
      line-height: ${rem(35)};
    `;
  },
  H2() {
    return css`
      font-size: ${rem(36.41)};
      line-height: ${rem(50)};
    `;
  },
  H1() {
    return css`
      font-size: ${rem(41.83)};
      line-height: ${rem(57)};
    `;
  },
};
export const fontWeight = {
  ligtht: 300,
  bold: 700,
  extraBold: 800,
};

export const colors = {
  white: "#FFFFFF",
  black: "#000000",
  grey: "#999999",
  blue: "#4158D0",
  pink: "#C850C0",
  yellow: "#FFCC70",
  purple: "#9933FF",
  lightRed: "#FF6666",
  lightBlue: "#00CCFF",
  lightGreen: "#00FF99",
  lightYellow: "#FFF9AA",
};

export const grid = {
  contentMaxWidth: 1132,
  gapLateral: {
    mobile: 24,
    desktop: 48,
  },
};
//prettier
