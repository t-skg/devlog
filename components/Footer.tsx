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
          {/* ヘッダーと同様に、正しい比率で画像を表示する */}
          {app.icon?.src && (
            <Image
              src={app.icon.src}
              alt={app.name} // alt属性にサイト名を設定
              width={239} // 正しい比率に調整した横幅
              height={23} // 元のレイアウトを維持するための高さ
            />
          )}
        </Link>

        <nav className={styles.Nav}>
          <Link href="/profile">プロフィール</Link>
          <Link href="/contact">お問い合わせ</Link>
        </nav>
      </div>

      <div className={styles.Copy}>
        © {new Date().getFullYear()} PractiX Code Lab
      </div>
    </footer>
  )
}
