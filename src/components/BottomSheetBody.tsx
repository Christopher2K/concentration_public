import styled from '@emotion/native'

import {
  BottomSheetHeader,
  type BottomSheetHeaderProps,
} from './BottomSheetHeader'

const Root = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

type BottomSheetBodyProps = BottomSheetHeaderProps & {
  children?: JSX.Element
}

export const BottomSheetBody = ({
  children,
  ...bottomSheetHeaderProps
}: BottomSheetBodyProps) => {
  return (
    <Root>
      <BottomSheetHeader {...bottomSheetHeaderProps} />
      {children}
    </Root>
  )
}
