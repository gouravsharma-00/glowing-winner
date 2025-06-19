import { createServer } from 'http'
import { createYoga, createSchema } from 'graphql-yoga'
import { Server as SocketIOServer } from 'socket.io'
import { typeDefs, resolvers } from './schema'
import { getUserIdFromAuthHeader } from './auth'
import { prisma } from './context'
import { setupSocket } from './socket'
import { Context } from './context'

const PORT = 4000

const schema = createSchema<{
  req: Request
  prisma: typeof prisma
  userId: string | null
}>({
  typeDefs,
  resolvers,
})

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/graphql',
  context: ({ request }): Context => {
    const authHeader = request.headers.get('authorization') || undefined
    const userId = getUserIdFromAuthHeader(authHeader)
    return { prisma, userId }
  },
  // Disable Yoga's default response handling (fixes header conflict)
  fetchAPI: { Response },
})

const server = createServer((req, res) => {
  // Let Yoga handle GraphQL requests
  yoga(req, res)
})

// Attach Socket.IO
const io = new SocketIOServer(server, {
  cors: { origin: '*' },
})
setupSocket(io)

server.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
})
