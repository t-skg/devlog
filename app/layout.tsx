import { Footer } from '@/components/Footer'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { Header } from '@/components/Header'
import '@/styles/globals.css'
import styles from '@/styles/Layout.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'walkbit',
  description:
    '『walkbit』は、プログラミング初学者から中級者を対象に、便利なツールの使い方やチュートリアルを分かりやすく解説するメディアです。個人開発やスモールビジネス立ち上げのヒントも記録しています。',
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
