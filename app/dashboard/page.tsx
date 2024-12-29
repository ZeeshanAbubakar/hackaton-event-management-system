import { EventDashboard } from '@/components/events/event-dashboard'
import { NavBar } from '@/components/layout/nav-bar'

export default function DashboardPage() {
  return (
    <div>
      <NavBar />
      <main className="container mx-auto py-8">
        <EventDashboard />
      </main>
    </div>
  )
}

