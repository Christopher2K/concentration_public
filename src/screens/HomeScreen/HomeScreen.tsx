import { useRef } from 'react'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import styled from '@emotion/native'
import { useSelector } from 'react-redux'

import { Button } from '@app/components'
import { type AppState } from '@app/state/appState'

import { TimerConfigBottomSheet } from './TimerConfigBottomSheet'
import { TimerDashoard } from './TimerDasboard'

const Root = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const HomeScreen = () => {
  const isSessionInitialized = useSelector(
    ({ session }: AppState) => session.initialized,
  )
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const openBottomSheet = () => bottomSheetRef.current?.present()
  const closeBottomSheet = () => bottomSheetRef.current?.dismiss()

  return (
    <BottomSheetModalProvider>
      <Root>
        <TimerConfigBottomSheet
          closeSheet={closeBottomSheet}
          ref={bottomSheetRef}
        />
        {isSessionInitialized ? (
          <TimerDashoard />
        ) : (
          <Button label={'Start new pomodoro'} onPress={openBottomSheet} />
        )}
      </Root>
    </BottomSheetModalProvider>
  )
}
