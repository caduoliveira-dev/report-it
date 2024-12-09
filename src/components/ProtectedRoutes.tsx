'use client'

import { useAuth } from '@/contexts/Authentication'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/')
    }
  }, [session, router])

  if (!session) {
    return null
  }

  return <>{children}</>
}

