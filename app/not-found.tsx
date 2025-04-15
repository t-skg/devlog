'use client'

import Link from 'next/link'
import styles from '@/styles/Error.module.css'

export default function NotFound() {
  return (
    <div className={styles.FullPage}>
      <div className={styles.Inner}>
        <h1 className={styles.Title}>404 Not Found</h1>
        <p className={styles.SubText}>お探しのページは見つかりませんでした</p>
        <p className={styles.Description}>
          アクセスしようとしたページは削除、変更された可能性があります。
        </p>
        <Link href="/contact" className={styles.Button}>
          お問い合わせはこちら
        </Link>
      </div>
    </div>
  )
}
