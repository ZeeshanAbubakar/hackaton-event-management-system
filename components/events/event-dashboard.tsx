'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { showError, showSuccess, showConfirm } from '@/lib/alerts'
import type { Event } from '@/lib/types'

const categories = ['Tech', 'Music', 'Sports', 'Art', 'Other']

export function EventDashboard() {
  const { user } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  const fetchEvents = async () => {
    try {
      const eventsRef = collection(db, 'events')
      const q = query(
        eventsRef,
        where('isPrivate', '==', false)
      )
      const querySnapshot = await getDocs(q)
      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[]
      setEvents(eventsData)
    } catch (error) {
      showError('Error', 'Failed to fetch events')
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleRSVP = async (eventId: string) => {
    if (!user) {
      showError('Authentication Required', 'Please login to RSVP')
      return
    }

    const event = events.find((e) => e.id === eventId)
    if (!event) return

    const isAttending = event.attendees.includes(user.uid)
    
    if (isAttending) {
      const result = await showConfirm(
        'Cancel RSVP?',
        'Are you sure you want to cancel your RSVP?'
      )
      if (!result.isConfirmed) return
    }

    setIsLoading(true)
    try {
      const eventRef = doc(db, 'events', eventId)
      const newAttendees = isAttending
        ? event.attendees.filter((id) => id !== user.uid)
        : [...event.attendees, user.uid]
      
      await updateDoc(eventRef, { attendees: newAttendees })
      await fetchEvents()
      
      await showSuccess(
        isAttending ? 'RSVP Cancelled' : 'RSVP Confirmed',
        isAttending ? 'You have cancelled your RSVP' : 'You are now registered for this event'
      )
    } catch (error) {
      showError('RSVP Failed', 'Failed to update RSVP status')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredEvents = events.filter((event) => {
    if (filter === 'all') return true
    return event.category === filter
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <p className="text-muted-foreground mt-1">
            Discover and join amazing events
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>
                    <Link href={`/events/${event.id}`} className="hover:underline">
                      {event.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {new Date(event.date).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardDescription>
                </div>
                <Badge>{event.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 line-clamp-2 text-muted-foreground">
                {event.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {event.attendees.length} attending
                </span>
                {user && (
                  <Button
                    variant={event.attendees.includes(user.uid) ? "secondary" : "default"}
                    onClick={() => handleRSVP(event.id)}
                    disabled={isLoading}
                  >
                    {event.attendees.includes(user.uid) ? 'Cancel RSVP' : 'RSVP'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events found</p>
        </div>
      )}
    </div>
  )
}

