import { EventForm } from '@/components/events/event-form'
import { NavBar } from '@/components/layout/nav-bar'

export default function CreateEventPage() {
  return (
    <div>
      <NavBar />
      <main className="container mx-auto py-8">
        <EventForm />
      </main>
    </div>
  )
}

