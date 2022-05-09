import { AppState } from 'react-native'
import { renderHook } from '@testing-library/react-hooks'

import { useAppState } from '@app/hooks/useAppState'

const appStateSpy = jest.spyOn(AppState, 'addEventListener')

describe('useAppState', () => {
  it('should call onChangeFromBackgroundToActive only when the app becomes active', () => {
    const mockedOnChangeFromBackgroundToActive = jest.fn()

    renderHook(() =>
      useAppState({
        onChangeFromBackgroundToActive: mockedOnChangeFromBackgroundToActive,
      }),
    )

    expect(appStateSpy).toHaveBeenCalledTimes(1)
    appStateSpy.mock.calls[0][1]('active')
    appStateSpy.mock.calls[0][1]('inactive')

    expect(mockedOnChangeFromBackgroundToActive).toHaveBeenCalledTimes(1)
  })
})
