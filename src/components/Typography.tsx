import { Text, TextProps } from 'react-native'

import type { AppColors, AppTypography } from '@app/style/theme'
import { useTheme } from '@emotion/react'

type AppSpecificTypographyProps = {
  color?: AppColors
  type?: AppTypography
  children: string | number | JSX.Element
}

type TypographyProps = TextProps & AppSpecificTypographyProps

export const Typography = ({
  color = 'dark',
  type = 'body',
  ...baseTextProps
}: TypographyProps) => {
  const theme = useTheme()
  const typographyStyle = theme.typography[type]
  const typographyColor = theme.color[color]

  return (
    <Text
      {...baseTextProps}
      style={[{ ...typographyStyle, color: typographyColor }]}
    />
  )
}
