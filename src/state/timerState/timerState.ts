import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import addSeconds from 'date-fns/addSeconds'

import { TimerStatus } from '@app/models'

export type TimerState = {
  status: TimerStatus
  initialDuration: number // Seconds
  timeLeft?: number // Seconds
  completionTimestamp?: number // Milliseconds
  timerIntervalId?: number
}

export const initialTimerState: TimerState = {
  status: TimerStatus.Stopped,
  initialDuration: 0,
}

const timerSlice = createSlice({
  name: 'timer',
  initialState: initialTimerState,
  reducers: {
    // *
    // USER FACING ACTIONS
    // *
    initializeTimer: (
      state: TimerState,
      { payload: duration }: PayloadAction<number>,
    ) => {
      state.timeLeft = duration
      state.initialDuration = duration
      state.status = TimerStatus.Stopped
    },
    startTimer: (state: TimerState) => {
      if (!state.timeLeft) return

      state.status = TimerStatus.Running
      state.completionTimestamp = addSeconds(
        Date.now(),
        state.timeLeft,
      ).getTime()
    },
    pauseTimer: (state: TimerState) => {
      state.status = TimerStatus.Paused
      clearInterval(state.timerIntervalId)
      state.completionTimestamp = undefined
      state.timerIntervalId = undefined
    },
    stopTimer: (state: TimerState) => {
      if (state.timerIntervalId) {
        clearInterval(state.timerIntervalId)
      }

      return initialTimerState
    },
    resetCurrentTimer: (state: TimerState) => {
      state.status = TimerStatus.Stopped
      state.completionTimestamp = undefined
      state.timeLeft = state.initialDuration

      if (state.timerIntervalId) {
        clearInterval(state.timerIntervalId)
        state.timerIntervalId = undefined
      }
    },

    // *
    // INTERNAL ACTIONS
    // *
    completeTimer: (state: TimerState) => {
      state.status = TimerStatus.Completed
      clearInterval(state.timerIntervalId)
      state.timerIntervalId = undefined
      state.completionTimestamp = undefined
    },
    updateTimer: (state: TimerState) => {
      if (!state.timeLeft || !state.completionTimestamp) return
      const diffInSeconds = differenceInSeconds(
        state.completionTimestamp,
        Date.now(),
      )

      if (diffInSeconds >= 0) {
        state.timeLeft = diffInSeconds
      } else {
        state.timeLeft = 0
      }
    },
    timerStarted: (
      state: TimerState,
      { payload: intervalId }: PayloadAction<number>,
    ) => {
      state.timerIntervalId = intervalId
    },
    restore(_, { payload: restoredState }: PayloadAction<TimerState>) {
      return restoredState
    },
  },
})

export const {
  initializeTimer,
  startTimer,
  stopTimer,
  pauseTimer,
  restore,
  resetCurrentTimer,
} = timerSlice.actions

export const { reducer: timerReducer } = timerSlice

const { completeTimer, timerStarted, updateTimer } = timerSlice.actions
export const _INTERNALS = {
  completeTimer,
  timerStarted,
  updateTimer,
}
