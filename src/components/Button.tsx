import styled from '@emotion/native'

import { Typography } from './Typography'

const Root = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  padding: ${({ theme: { spacing } }) => `${spacing.m}px ${spacing.xl}px`};
  border-radius: ${({ theme }) => theme.radius.m.toString()}px;

  border-width: 1px;
  border-color: ${({ theme }) => theme.color.primary};

  background-color: ${({ theme }) => theme.color.primary};
`

type ButtonProps = {
  label?: string | string[]
  onPress?: () => void
}

export const Button = ({ label, onPress }: ButtonProps) => {
  const isComposedLabel = label && typeof label !== 'string'
  const isInlineLabel = label && typeof label === 'string'

  return (
    <Root onPress={() => onPress?.()}>
      {isComposedLabel &&
        label.map((chunk) => (
          <Typography key={chunk} color="background" type="button">
            {chunk}
          </Typography>
        ))}
      {isInlineLabel && (
        <Typography color="background" type="button">
          {label}
        </Typography>
      )}
    </Root>
  )
}
