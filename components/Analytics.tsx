'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { pageview } from '@/lib/gtag'

export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    pageview(pathname)
  }, [pathname])
  // console.log('GA送信:', pathname)
  return null
}
