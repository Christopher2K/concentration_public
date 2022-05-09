import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'

import { StorageService } from '@app/services'

import type { AppState } from './appState'
import {
  pauseTimer,
  startTimer,
  stopTimer,
  resetCurrentTimer,
  initializeTimer,
  _INTERNALS,
} from './timerState'
import { resetSession, nextRound } from './sessionState'

const listener = createListenerMiddleware<AppState>()

listener.startListening({
  matcher: isAnyOf(
    initializeTimer,
    nextRound,
    startTimer,
    pauseTimer,
    resetCurrentTimer,
    _INTERNALS.completeTimer,
  ),
  effect: async (_, listenerApi) => {
    const { session, timer } = listenerApi.getState()

    // Backup state
    await Promise.all([
      StorageService.persist({ key: 'timer', data: timer }),
      StorageService.persist({ key: 'session', data: session }),
    ])
  },
})

listener.startListening({
  actionCreator: stopTimer,
  effect: async () => {
    await StorageService.purge({ key: 'timer' })
  },
})

listener.startListening({
  actionCreator: resetSession,
  effect: async () => {
    await StorageService.purge({ key: 'session' })
    await StorageService.purge({ key: 'timer' })
  },
})

export { listener }
