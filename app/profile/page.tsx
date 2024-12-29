'use client'

import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NavBar } from '@/components/layout/nav-bar'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div>
      <NavBar />
      <main className="container mx-auto py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <p className="text-lg">{user?.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">User ID</h3>
              <p className="text-lg">{user?.uid}</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

