import { Server } from 'socket.io'

const eventRooms = new Map<string, Set<string>>()

export function setupSocket(io: Server) {
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`)

    socket.on('join-event', ({ eventId, userId }) => {
      socket.join(eventId)

      if (!eventRooms.has(eventId)) eventRooms.set(eventId, new Set())
      eventRooms.get(eventId)?.add(userId)

      io.to(eventId).emit('attendee-update', {
        eventId,
        attendees: Array.from(eventRooms.get(eventId) || []),
      })
    })

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`)
    })
  })
}
