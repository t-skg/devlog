'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from '@/styles/Pagination.module.css'

export function Pagination({
  total,
  current,
  basePath,
}: {
  total: number
  current: number
  basePath: string
}) {
  const router = useRouter()

  const pageSize = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10
  const maxPage = Math.ceil(total / pageSize)
  const pages = Array.from({ length: maxPage }).map((_, index) => index + 1)

  if (pages.length <= 1) {
    return null
  }

  const firstPagePath = basePath.endsWith('/page')
    ? basePath.slice(0, -5) || '/'
    : basePath

  return (
    <nav className={styles.Pagination}>
      <ul className={styles.Pagination_Items}>
        {pages.map((page) => {
          const path = page === 1 ? firstPagePath : `${basePath}/${page}`
          return (
            <li key={page} className={styles.Pagination_Item}>
              <Link
                href={path}
                className={`${styles.Pagination_Button} ${
                  page === current ? styles._current : ''
                }`}
              >
                {page}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
