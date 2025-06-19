import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { typeDefs, resolvers } from './schema'
import { getUserIdFromAuthHeader } from './auth'
import { prisma } from './context'
import { setupSocket } from './socket'
import { createYoga, createSchema } from 'graphql-yoga'

const PORT = 4000

// Create HTTP server
const httpServer = createServer()

// Setup Socket.io
const io = new SocketIOServer(httpServer, {
  cors: { origin: '*' },
})
setupSocket(io)

// Create GraphQL schema
const schema = createSchema({
  typeDefs,
  resolvers,
})

// Create Yoga server
const yoga = createYoga({
  schema,
  context: ({ request }) => {
    const authHeader = request.headers.get('authorization') || undefined
    const userId = getUserIdFromAuthHeader(authHeader)
    return { prisma, userId }
  },
  graphqlEndpoint: '/graphql',
})

// Bind Yoga to HTTP server
httpServer.on('request', yoga)

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
})
