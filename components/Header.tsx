import Image from 'next/image'
import Link from 'next/link'
import { getApp } from '@/lib/microcms'
import styles from '@/styles/Header.module.css'

export const revalidate = 60 * 60 * 24

export async function Header() {
  const app = await getApp()

  return (
    <header className={styles.Header}>
      <div className={styles.Header_Inner}>
        <Link className={styles.Title} href="/">
          {app.icon?.src && (
            <Image
              className={styles.logoImage}
              src="/default-OGP.png"
              alt={app.name}
              width={app.icon.width}
              height={app.icon.height}
              priority={true}
            />
          )}
        </Link>
      </div>
    </header>
  )
}
