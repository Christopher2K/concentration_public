import { type TextStyle } from 'react-native'

/**
 * TOKENS
 */
const spacingTokens = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
  xxxl: 60,
}

const colorTokens = {
  frechBistre: '#8c7051',
  navajoWhite: '#f7dba7',
}

const grayTokens = {
  gray95: '#f2f2f2',
  gray90: '#E3E3E3',
  gray70: '#B3B3B3',
  gray50: '#808080',
  gray30: '#4D4D4D',
  gray10: '#1A1A1A',
}

const fontsTokens = {
  LatoRegular: 'LatoRegular',
  LatoBold: 'LatoBold',
  LatoBlack: 'LatoBlack',
}

const fontSizeToken = {
  body: 18,
  body2: 20,
}

/**
 * USAGE ORIENTED THEME
 */
export const theme = {
  color: {
    // Contextual
    primary: colorTokens.frechBistre,
    secondary: colorTokens.navajoWhite,
    background: grayTokens.gray90,
    dark: grayTokens.gray10,

    // Gray
    ...grayTokens,
  },

  spacing: spacingTokens,

  radius: {
    s: 4,
    m: 8,
    l: 12,
  },

  typography: {
    button: {
      fontFamily: fontsTokens.LatoBold,
      fontSize: fontSizeToken.body2,
    } as TextStyle,
    body: {
      fontFamily: fontsTokens.LatoRegular,
      fontSize: fontSizeToken.body,
      color: grayTokens.gray10,
    } as TextStyle,
  },
}

export type AppTheme = typeof theme

export type AppColors = keyof typeof theme.color

export type AppTypography = keyof typeof theme.typography

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
