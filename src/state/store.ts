import { configureStore } from '@reduxjs/toolkit'
import createDebugger from 'redux-flipper'

import { listener } from './listener'
import { sessionReducer } from './sessionState'
import { timerReducer } from './timerState'
import { notificationsReducer } from './notificationsState'

import './sessionState/listeners'
import './timerState/listeners'
import './notificationsState/listeners'

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    timer: timerReducer,
    notifications: notificationsReducer,
  },
  devTools: __DEV__,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listener.middleware)
      .concat(createDebugger()),
})
