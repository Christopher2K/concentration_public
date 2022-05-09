import type { AppListenerApi } from '@app/state/appState'

import { _INTERNALS } from './timerState'

export function startTimerInterval(listenerApi: AppListenerApi) {
  const callback = () => {
    const { timeLeft } = listenerApi.getState().timer
    if (!timeLeft) {
      listenerApi.dispatch(_INTERNALS.completeTimer())
    } else {
      listenerApi.dispatch(_INTERNALS.updateTimer())
    }
  }

  callback()
  const intervalId = setInterval(callback, 1000)

  listenerApi.dispatch(_INTERNALS.timerStarted(+intervalId))
}
