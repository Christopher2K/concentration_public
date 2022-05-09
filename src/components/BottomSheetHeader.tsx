import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import DeleteIcon from '@app/svg/delete-2.svg'
import { Typography } from './Typography'

const Root = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-bottom-width: 1px;
  padding: 0 8px;
`

const IconContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
`

const Title = styled(Typography)`
  flex: 1;
  text-align: center;
`

export type BottomSheetHeaderProps = {
  title: string
  rightIcon?: JSX.Element
  leftIcon?: JSX.Element
  onClose?: () => unknown
}

const CloseIcon = ({ onClose }: Pick<BottomSheetHeaderProps, 'onClose'>) => (
  <TouchableOpacity onPress={onClose}>
    <DeleteIcon width={24} height={24} stroke="#000" color="#000" />
  </TouchableOpacity>
)

export const BottomSheetHeader = ({
  title,
  onClose,
  leftIcon,
  rightIcon,
}: BottomSheetHeaderProps) => {
  return (
    <Root>
      <IconContainer>
        {onClose ? <CloseIcon onClose={onClose} /> : leftIcon ?? null}
      </IconContainer>
      <Title>{title}</Title>
      <IconContainer>{Boolean(rightIcon) && rightIcon}</IconContainer>
    </Root>
  )
}
