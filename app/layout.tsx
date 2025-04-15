import { Analytics } from '@/components/Analytics'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import '@/styles/globals.css'
import styles from '@/styles/Layout.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PractiX Code Lab',
  description: 'NewtとNext.jsを利用したブログです',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        {' '}
        <script src="https://www.google.com/recaptcha/api.js" async defer />
      </head>
      <body>
        <div className={styles.Wrapper}>
          <Header />
          {children}
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
