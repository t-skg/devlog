import Image from 'next/image'
import Link from 'next/link'

import { Suspense } from 'react'
import { SearchField, SearchFieldFallback } from '@/components/SearchField'
import { getApp } from '@/lib/newt'
import styles from '@/styles/Header.module.css'

/* Googleタグの埋め込み */
{
  process.env.NEXT_PUBLIC_GA_ID && (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
    </>
  )
}

export const revalidate = 60 * 60 * 24

export async function Header() {
  const app = await getApp()

  return (
    <header className={styles.Header}>
      <div className={styles.Header_Inner}>
        <Link className={styles.Title} href="/">
          {app.icon?.type === 'emoji' && (
            <span className={styles.Title_Icon}>{app.icon.value}</span>
          )}
          {app.icon?.type === 'image' && (
            <span className={styles.Title_Icon}>
              <Image src={app.icon.value} alt="" width="26" height="26" />
            </span>
          )}
          <div className={styles.Title_Text}>{app.name || app.uid}</div>
        </Link>
        {/* 
        <Suspense fallback={<SearchFieldFallback />}>
          <SearchField />
        </Suspense>
      */}
      </div>
    </header>
  )
}
