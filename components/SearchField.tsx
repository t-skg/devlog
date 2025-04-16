'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from '@/styles/SearchField.module.css'

export function SearchField() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')
  const [searchText, setSearchText] = useState(q || '')

  useEffect(() => {
    if (q) setSearchText(q)
  }, [q])

  return (
    <form className={styles.Search} action="/search">
      <input
        type="search"
        name="q"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder=""
        className={styles.SearchInput}
      />
      <button type="submit" className={styles.SearchButton} aria-label="検索">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#999"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </form>
  )
}

export function SearchFieldFallback() {
  return (
    <div className={styles.Search}>
      <button
        type="button"
        className={styles.SearchButton}
        aria-label="検索（読み込み中）"
        disabled
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ccc"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  )
}
