import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import {
  type TimerFormData,
  SessionStep,
  defaultTimerFormData,
} from '@app/models'

export type SessionState = {
  initialized: boolean
  configuration: TimerFormData

  // Available once the timer has been configured (when `state.initialized` === true)
  currentStep?: SessionStep
  currentRound?: number
}

export const initialSessionState: SessionState = {
  initialized: false,
  configuration: defaultTimerFormData,
}

const sessionSlice = createSlice({
  name: 'session',
  initialState: initialSessionState,
  reducers: {
    configureSession: (
      state: SessionState,
      action: PayloadAction<TimerFormData>,
    ) => {
      state.initialized = true
      state.configuration = action.payload
      state.currentRound = 1
      state.currentStep = SessionStep.focus
    },
    nextRound: (state: SessionState) => {
      const { currentRound, currentStep } = state
      const maxRound = state.configuration.rounds
      const isLastRound = currentRound === maxRound

      if (currentRound == null || currentStep == null)
        throw new Error('currentRound value is missing')

      switch (state.currentStep) {
        case SessionStep.focus:
          state.currentStep = isLastRound
            ? SessionStep.longBreak
            : SessionStep.shortBreak
          break
        case SessionStep.shortBreak:
          if (isLastRound) throw new Error('Unexpected short break state')
          state.currentStep = SessionStep.focus
          state.currentRound = currentRound + 1
          break
        case SessionStep.longBreak:
          state.currentStep = undefined
          break
      }
    },
    restore(_, { payload: restoredState }: PayloadAction<SessionState>) {
      return restoredState
    },
    resetSession() {
      return initialSessionState
    },
  },
})

export const { configureSession, restore, resetSession, nextRound } =
  sessionSlice.actions

export const { reducer: sessionReducer } = sessionSlice
