import styled, { css } from '@emotion/native'

import { ButtonGroupItem } from './ButtonGroupItem'

// Styled Base
const Root = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.color.gray95};
    border-radius: ${theme.radius.m.toString()}px;

    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    padding: ${theme.spacing.xs.toString()}px 0;
  `}
`

export type ButtonGroupProps<T> = {
  choices: T[]
  onChange: (value: T) => unknown
  value?: T
}

export const ButtonGroup = <T extends string | number>({
  choices,
  onChange,
  value,
}: ButtonGroupProps<T>) => {
  return (
    <Root>
      {choices.map((c) => (
        <ButtonGroupItem
          key={c}
          onPress={() => onChange(c)}
          selected={value === c}
          value={c}
        />
      ))}
    </Root>
  )
}
