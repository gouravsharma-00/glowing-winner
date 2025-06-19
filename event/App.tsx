import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from './src/lib/apolloClient'
import RootNavigator from './src/navigation/RootNavigator'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <RootNavigator />
    </ApolloProvider>
  )
}
