'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { NavBar } from '@/components/layout/nav-bar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Event } from '@/lib/types'

export default function EventDetailsPage() {
  const params = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventDoc = await getDoc(doc(db, 'events', params.id as string))
        if (eventDoc.exists()) {
          setEvent({ id: eventDoc.id, ...eventDoc.data() } as Event)
        }
      } catch (error) {
        console.error('Error fetching event:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [params.id])

  if (loading) {
    return (
      <div>
        <NavBar />
        <main className="container mx-auto py-8">
          <div>Loading...</div>
        </main>
      </div>
    )
  }

  if (!event) {
    return (
      <div>
        <NavBar />
        <main className="container mx-auto py-8">
          <div>Event not found</div>
        </main>
      </div>
    )
  }

  return (
    <div>
      <NavBar />
      <main className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl mb-2">{event.title}</CardTitle>
                <Badge>{event.category}</Badge>
              </div>
              <Badge variant={event.isPrivate ? "secondary" : "default"}>
                {event.isPrivate ? 'Private' : 'Public'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Date & Time</h3>
                <p className="text-muted-foreground">
                  {new Date(event.date).toLocaleString()}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-muted-foreground">{event.location}</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium">Attendees</h3>
              <p className="text-muted-foreground">
                {event.attendees.length} people attending
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

