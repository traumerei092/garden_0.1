'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/layout/Header/index'
import { useSession } from 'next-auth/react'

const HeaderController: React.FC = () => {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const showHeader = !['/login', '/signup'].includes(pathname)

  if (!showHeader) return null

  return <Header userEmail={session?.user?.email} />
}

export default HeaderController