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
          {/* ロゴ画像が存在する場合にのみ、正しい比率で画像を表示する */}
          {app.icon?.src && (
            <Image
              src={app.icon.src}
              alt={app.name} // alt属性にサイト名を設定
              width={270} // 正しい比率に調整した横幅
              height={26} // 元のレイアウトを維持するための高さ
              priority={true} // ヘッダーのロゴは優先的に読み込む
            />
          )}
        </Link>
      </div>
    </header>
  )
}
