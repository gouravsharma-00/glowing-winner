import React, { useState } from 'react'
import { View, TextInput, Button, Alert } from 'react-native'
import { gql, useMutation } from '@apollo/client'
import { useAuthStore } from '../state/authStore'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/RootNavigator'

const LOGIN = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      token
    }
  }
`

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

export default function Login() {
  const [email, setEmail] = useState('bob@example.com')
  const [loginMutation] = useMutation(LOGIN)
  const setToken = useAuthStore((s) => s.login)
  const navigation = useNavigation<LoginScreenNavigationProp>()

  const handleLogin = async () => {
    try {
      const { data } = await loginMutation({ variables: { email } })
      setToken(data.login.token)
    } catch (err) {
      Alert.alert('Login Failed')
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  )
}
