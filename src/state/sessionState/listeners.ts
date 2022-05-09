import minutesToSeconds from 'date-fns/minutesToSeconds'

import { listener } from '@app/state/listener'

import { configureSession, nextRound } from './sessionState'
import { initializeTimer, _INTERNALS } from '../timerState'
import { SessionStep } from '@app/models'

listener.startListening({
  actionCreator: configureSession,
  effect: async (action, listenerApi) => {
    // TODO: SET A CONFIG VARIABLE FOR THIS
    // const seconds = minutesToSeconds(action.payload.focusTimer)
    const seconds = action.payload.focusTimer
    listenerApi.dispatch(initializeTimer(seconds))
  },
})

listener.startListening({
  actionCreator: nextRound,
  effect: async (_, listenerApi) => {
    const { session } = listenerApi.getState()
    let seconds = 0
    switch (session.currentStep) {
      case SessionStep.focus:
        seconds = session.configuration.focusTimer
        break
      case SessionStep.shortBreak:
        seconds = session.configuration.shortBreakTimer
        break
      case SessionStep.longBreak:
        seconds = session.configuration.longBreakTimer
        break
      default:
        return
    }

    // TODO: SET A CONFIG VARIABLE FOR THIS
    // const convertedValue = minutesToSeconds(seconds)
    const convertedValue = seconds
    listenerApi.dispatch(initializeTimer(convertedValue))
  },
})

listener.startListening({
  actionCreator: _INTERNALS.completeTimer,
  effect: async (_, listenerApi) => {
    listenerApi.dispatch(nextRound())
  },
})
