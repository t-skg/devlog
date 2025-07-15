import Image from 'next/image'
import Link from 'next/link'
import { getApp } from '@/lib/microcms'
import styles from '@/styles/Footer.module.css'

export async function Footer() {
  const app = await getApp()

  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer_Inner}>
        <Link className={styles.SiteName} href="/">
          {app.icon?.src && (
            <Image
              src={app.icon.src}
              alt={app.name}
              width={239} // アイコン画像のサイズに調整
              height={23} // レイアウトを維持するための高さ
            />
          )}
        </Link>

        <nav className={styles.Nav}>
          <Link href="/profile">プロフィール</Link>
          <Link href="/contact">お問い合わせ</Link>
        </nav>
      </div>

      <div className={styles.Copy}>© {new Date().getFullYear()} Walkbit</div>
    </footer>
  )
}
