export interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  category: string
  createdBy: string
  isPrivate: boolean
  attendees: string[]
}

export type EventFormData = Omit<Event, 'id' | 'attendees'>

