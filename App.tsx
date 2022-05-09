import { useCallback, useEffect } from 'react'
import { ThemeProvider } from '@emotion/react'
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { connectToDevTools } from 'react-devtools-core'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
} from '@expo-google-fonts/lato'

import { HomeScreen } from '@app/screens/HomeScreen'
import { StorageService, NotificationsService } from '@app/services'
import { theme } from '@app/style/theme'
import { store } from '@app/state/store'
import { useAppState } from '@app/hooks/useAppState'

const Stack = createNativeStackNavigator()

const App = () => {
  const [fontsLoaded] = useFonts({
    LatoRegular: Lato_400Regular,
    LatoBold: Lato_700Bold,
    LatoBlack: Lato_900Black,
  })

  const appState = useAppState({})

  const appIsReady = fontsLoaded

  const setupNotifications = async () => {
    NotificationsService.initialize({
      handleNotification: async () => ({
        shouldSetBadge: false,
        shouldPlaySound: appState !== 'active',
        shouldShowAlert: appState !== 'active',
      }),
    })
    if (appIsReady) {
      const allowed = await NotificationsService.areNotificationAllowed()
      if (!allowed) {
        NotificationsService.requestPermisions()
      }
    }
  }

  useEffect(() => {
    setupNotifications()
  }, [])

  if (!appIsReady) {
    return <AppLoading />
  }

  return (
    <Provider store={store}>
      <StorageService.RestoreState />
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>

        <FlipperAsyncStorage />
      </ThemeProvider>
    </Provider>
  )
}
if (__DEV__) {
  connectToDevTools({
    host: 'localhost',
    port: 8097,
  })
}

export default App
