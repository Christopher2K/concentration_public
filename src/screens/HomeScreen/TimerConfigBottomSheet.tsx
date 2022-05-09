import { useRef, forwardRef } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import { BottomSheetBody } from '@app/components'

import { TimerForm } from './TimerForm'

const bottomSheetSnapPoints = ['80%']

type TimerConfigBottomSheetProps = {
  closeSheet: () => unknown
}

export const TimerConfigBottomSheet = forwardRef<
  BottomSheetModal,
  TimerConfigBottomSheetProps
>(({ closeSheet }, ref) => (
  <BottomSheetModal
    ref={ref}
    snapPoints={bottomSheetSnapPoints}
    detached
    enablePanDownToClose={false}
    index={0}
    bottomInset={100}
    style={{
      marginHorizontal: 20,
    }}
    handleComponent={null}
  >
    <BottomSheetBody title="Start a new session" onClose={closeSheet}>
      <TimerForm onTimerSaved={closeSheet} />
    </BottomSheetBody>
  </BottomSheetModal>
))
