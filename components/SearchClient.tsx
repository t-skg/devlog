'use client'

import { Suspense } from 'react'
import { SearchField, SearchFieldFallback } from './SearchField'

export function SearchClient() {
  return (
    <Suspense fallback={<SearchFieldFallback />}>
      <SearchField />
    </Suspense>
  )
}
