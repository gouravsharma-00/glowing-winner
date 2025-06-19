import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuthStore } from '../state/authStore'

import Login from '../screens/Login'
import EventList from '../screens/EventList'

export type RootStackParamList = {
  Login: undefined
  Events: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {
  const token = useAuthStore((state) => state.token)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <Stack.Screen name="Events" component={EventList} />
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
