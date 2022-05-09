import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ScheduleArgs } from '@app/services/notifications'

export type NotificationsState = {
  scheduledNotification?: string
}

export const initialNotificationsState: NotificationsState = {
  scheduledNotification: undefined,
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initialNotificationsState,
  reducers: {
    scheduleNotificationAsync: (
      _: NotificationsState,
      __: PayloadAction<ScheduleArgs>,
    ) => _,
    scheduleNotificationSuccess: (
      state,
      { payload: notificationId }: PayloadAction<string>,
    ) => {
      state.scheduledNotification = notificationId
    },

    cancelNotificationAsync: (_: NotificationsState) => _,
    cancelNotificationSuccess: (state) => {
      state.scheduledNotification = undefined
    },
  },
})

export const { reducer: notificationsReducer } = notificationsSlice
export const {
  cancelNotificationAsync,
  cancelNotificationSuccess,
  scheduleNotificationAsync,
  scheduleNotificationSuccess,
} = notificationsSlice.actions
