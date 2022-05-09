import { AppState, AppStateStatus } from 'react-native'
import { useEffect, useState } from 'react'

type UseAppStateArgs = {
  onChangeFromBackgroundToActive?: () => void
}

type UseAppState = AppStateStatus

export function useAppState({
  onChangeFromBackgroundToActive,
}: UseAppStateArgs): UseAppState {
  const [state, setState] = useState<AppStateStatus>('active')

  useEffect(() => {
    const updateAppState = (nextAppState: AppStateStatus) => {
      setState(nextAppState)
      if (nextAppState === 'active') {
        onChangeFromBackgroundToActive?.()
      }
    }

    AppState.addEventListener('change', updateAppState)
    return () => AppState.removeEventListener('change', updateAppState)
  }, [])

  return state
}
