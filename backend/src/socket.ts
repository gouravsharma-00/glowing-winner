import { Server } from 'socket.io'

const eventRooms = new Map<string, Set<string>>()

let _io: Server | null = null

export function setupSocket(io: Server) {
  _io = io

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

export const emitAttendeeUpdate = (eventId: string) => {
  if (_io) {
    _io.emit('attendeeUpdate', { eventId })
  } else {
    console.warn('Socket.IO server not initialized yet')
  }
}
