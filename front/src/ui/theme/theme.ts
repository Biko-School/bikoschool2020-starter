import rem from 'polished/lib/helpers/rem'
import { css } from 'styled-components'

export const color = {
  red: 'red',
  green: 'green',
  purple: '#9933FF',
  blue: 'blue',
}

export const font = {
  small() {
    return css`
      font-size: ${rem(4)};
    `
  },
}
