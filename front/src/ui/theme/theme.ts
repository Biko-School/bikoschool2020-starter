import rem from 'polished/lib/helpers/rem'
import { css } from 'styled-components'

export const grid = {
  contentMaxWidth: 1132,
  gap: {
    mobile: 24,
    desktop: 48,
  },
}
export const color = {
  red: 'red',
  green: 'green',
  purple: '#9933FF',
  blue: 'blue',
}

export const fonts = {
  mainTitle: css`
    font-family: Open Sans;
    font-style: normal;
    font-weight: 800;
    font-size: 31.83px;
    line-height: 57px;
    @media (min-width: 389px) {
      font-weight: 800;
      font-size: 41.83px;
    }
  `,
  textDescription: css`
    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    color: white;
    font-size: 15.63px;
    line-height: 35px;
    display: flex;
    align-items: flex-end;
    letter-spacing: -0.015em;
    @media (min-width: 389px) {
      font-size: 25.63px;
    }
  `,
}
