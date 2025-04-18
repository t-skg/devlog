import { Footer } from '@/components/Footer'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { Header } from '@/components/Header'
import '@/styles/globals.css'
import styles from '@/styles/Layout.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PractiX Code Lab',
  description:
    ' アイデアをコードへと落とし込むプロセスと学びを記録・発信する個人ブログ',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <script src="https://www.google.com/recaptcha/api.js" async defer />
      </head>
      <body>
        <div className={styles.Wrapper}>
          <Header />
          {children}
          <Footer />
        </div>
        <GoogleAnalytics />
      </body>
    </html>
  )
}
