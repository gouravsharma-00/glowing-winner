import React from 'react'
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native'
import { gql, useQuery, useMutation } from '@apollo/client'

const GET_EVENTS = gql`
  query {
    events {
      id
      name
      location
      startTime
      attendees {
        id
        name
      }
    }
  }
`

const JOIN_EVENT = gql`
  mutation JoinEvent($eventId: ID!) {
    joinEvent(eventId: $eventId) {
      id
    }
  }
`

const ME_QUERY = gql`
  query {
    me {
      id
    }
  }
`

export default function EventList() {
  const [joinEvent] = useMutation(JOIN_EVENT)
  const { data: eventsData, loading, error, refetch } = useQuery(GET_EVENTS)
  const { data: meData } = useQuery(ME_QUERY)
  const myId = meData?.me?.id

  if (loading || !eventsData) return <ActivityIndicator size="large" style={styles.center} />
  if (error) return <Text style={styles.center}>Error: {error.message}</Text>

  return (
    <FlatList
      data={eventsData.events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const joined = item.attendees.some((a: any) => a.id === myId)

        return (
          <View style={{ margin: 16, padding: 16, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text>📍 {item.location}</Text>
            <Text>🕒 {new Date(item.startTime).toLocaleString()}</Text>
            <Text style={{ marginTop: 8, fontWeight: 'bold' }}>Attendees:</Text>
            {item.attendees.length === 0 ? (
              <Text>No attendees yet</Text>
            ) : (
              item.attendees.map((attendee: any) => (
                <Text key={attendee.id}>• {attendee.name}</Text>
              ))
            )}

            {!joined && (
              <Button
                title="Join"
                onPress={async () => {
                  await joinEvent({ variables: { eventId: item.id } })
                  refetch() // refresh list
                }}
              />
            )}
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
