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
              className={styles.logoImage} // ← 新しいクラスをここに適用
              src={app.icon.src}
              alt={app.name} // サイト名を設定
              width={app.icon.width} // アイコン比率に調整した横幅
              height={app.icon.height} // レイアウトを維持するための高さ
              priority={true}
            />
          )}
        </Link>
      </div>
    </header>
  )
}
