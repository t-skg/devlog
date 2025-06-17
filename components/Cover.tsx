import { getApp } from '@/lib/microcms'
import styles from '@/styles/Cover.module.css'

export async function Cover() {
  const app = await getApp()

  return (
    <div
      className={styles.Cover}
      style={{ backgroundImage: `url(${app.cover?.src})` }}
    >
      &nbsp;
    </div>
  )
}
