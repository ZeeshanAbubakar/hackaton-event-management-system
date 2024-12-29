'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { UserCircle, Plus, LogOut } from 'lucide-react'
import { showConfirm, showSuccess } from '@/lib/alerts'

export function NavBar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    const result = await showConfirm(
      'Logout',
      'Are you sure you want to logout?'
    )

    if (result.isConfirmed) {
      try {
        await logout()
        await showSuccess('Logged Out', 'You have been successfully logged out')
        router.push('/')
      } catch (error) {
        console.error('Failed to logout:', error)
      }
    }
  }

  return (
    <nav className="border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="font-semibold text-xl hover:text-primary transition-colors">
          Event Platform
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/create-event">
            <Button variant="outline" size="sm" className="font-medium">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="font-medium">
              <UserCircle className="h-5 w-5 mr-2" />
              {user?.email?.split('@')[0]}
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="font-medium">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}

