import * as ExpoNotifications from 'expo-notifications'

export async function requestPermisions() {
  return await ExpoNotifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: false,
      allowSound: false,
      allowAnnouncements: true,
    },
  })
}

export async function areNotificationAllowed(): Promise<boolean> {
  const settings = await ExpoNotifications.getPermissionsAsync()

  const authorizedOnIos =
    settings.ios?.status !== undefined &&
    [
      ExpoNotifications.IosAuthorizationStatus.AUTHORIZED,
      ExpoNotifications.IosAuthorizationStatus.PROVISIONAL,
    ].includes(settings.ios?.status)

  return settings.granted || authorizedOnIos
}

type InitializeArgs = {
  handleNotification: () => Promise<ExpoNotifications.NotificationBehavior>
}
export function initialize(
  { handleNotification }: InitializeArgs = {
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  },
) {
  // App foreground handler
  ExpoNotifications.setNotificationHandler({
    handleError: console.error,
    handleNotification,
  })

  ExpoNotifications.addNotificationReceivedListener((event) => {})
}

export type ScheduleArgs = {
  title: string
  body: string
  date: number // timestamp
}
export async function schedule({ title, body, date }: ScheduleArgs) {
  const notificationId = ExpoNotifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: {
      date,
    },
  })

  return notificationId
}

export const cancel = ExpoNotifications.cancelScheduledNotificationAsync

export const addNotificationReceivedListener =
  ExpoNotifications.addNotificationReceivedListener
