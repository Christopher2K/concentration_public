import type {
  ListenerEffectAPI,
  ThunkDispatch,
  AnyAction,
} from '@reduxjs/toolkit'

import { type SessionState, initialSessionState } from './sessionState'
import { type TimerState, initialTimerState } from './timerState'
import {
  type NotificationsState,
  initialNotificationsState,
} from './notificationsState'

export type AppState = {
  session: SessionState
  timer: TimerState
  notifications: NotificationsState
}

export type AppListenerApi = ListenerEffectAPI<
  AppState,
  ThunkDispatch<AppState, unknown, AnyAction>,
  unknown
>

export const initialAppState: AppState = {
  session: initialSessionState,
  timer: initialTimerState,
  notifications: initialNotificationsState,
}
