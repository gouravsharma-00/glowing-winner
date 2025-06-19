import { buildSchema } from 'graphql'
import { Context } from './context'
import jwt from 'jsonwebtoken'
import { emitAttendeeUpdate } from './socket'

export const typeDefs = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Event {
    id: ID!
    name: String!
    location: String!
    startTime: String!
    attendees: [User!]!
  }

  type Query {
  events: [Event!]!
  me: User
  }

  type Mutation {
    joinEvent(eventId: ID!): Event
    login(email: String!): AuthPayload
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`)

const JWT_SECRET = 'mysecret'

export const resolvers = {
  Query: {
    events: async (_: any, __: any, ctx: Context) => {
      return ctx.prisma.event.findMany({ include: { attendees: true } })
    },
    me: async (_: any, __: any, ctx: Context) => {
      if (!ctx.userId) return null
      return ctx.prisma.user.findUnique({ where: { id: ctx.userId } })
    },
  },

  Mutation: {
    joinEvent: async (_: any, { eventId }: { eventId: string }, ctx: Context) => {
      if (!ctx.userId) throw new Error('Not authenticated')

      const event = await ctx.prisma.event.update({
        where: { id: eventId },
        data: {
          attendees: {
            connect: { id: ctx.userId },
          },
        },
        include: { attendees: true },
      })

      emitAttendeeUpdate(eventId) // 👈 notify all clients
      return event
    },

    login: async (_: any, { email }: { email: string }, ctx: Context) => {
      const user = await ctx.prisma.user.findUnique({ where: { email } })
      if (!user) throw new Error('User not found')

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

      return { token, user }
    },
  },
}