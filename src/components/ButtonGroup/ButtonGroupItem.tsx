import styled, { css } from '@emotion/native'

import { Typography } from '../Typography'

export type ButtonGroupItemProps<T> = {
  onPress: () => unknown
  selected: boolean
  value: T
}

const Root = styled.Pressable<Pick<ButtonGroupItemProps<unknown>, 'selected'>>`
  ${({ theme, selected }) => css`
    flex: 1;
    justify-content: center;
    align-items: center;

    border-radius: ${theme.radius.m.toString()}px;
    background-color: ${selected ? theme.color.primary : undefined};

    margin: 0 ${theme.spacing.xs.toString()}px;
    padding: ${theme.spacing.xxs.toString()}px 0;
  `}
`

export const ButtonGroupItem = <T extends string | number>({
  onPress,
  selected,
  value,
}: ButtonGroupItemProps<T>) => {
  return (
    <Root onPress={onPress} selected={selected}>
      <Typography type="body" color={selected ? 'gray95' : 'dark'}>
        {value}
      </Typography>
    </Root>
  )
}
