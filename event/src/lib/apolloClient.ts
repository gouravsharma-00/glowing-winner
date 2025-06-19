import { ApolloClient, InMemoryCache, HttpLink, concat, ApolloLink } from '@apollo/client'
import { useAuthStore } from '../state/authStore'

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = useAuthStore.getState().token
  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  }
  return forward(operation)
})

const httpLink = new HttpLink({ uri: 'http://192.168.45.209:4000/graphql' })

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})
