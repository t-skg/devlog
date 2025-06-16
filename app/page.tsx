import { ArticleCard } from '@/components/ArticleCard'
// import { Cover } from '@/components/Cover'
import { Pagination } from '@/components/Pagination'
import { Side } from '@/components/Side'
import { getApp, getArticles } from '@/lib/microcms'
import styles from '@/styles/ArticleList.module.css'

export const revalidate = 60 * 60 * 24

export async function generateMetadata() {
  return {
    title: 'PractiX Code Lab｜次の実践へつなぐ技術メディア',
    description:
      'Next.jsとヘッドレスCMSを活用した開発事例やノウハウを発信するブログサイトです。',
    openGraph: {
      type: 'website',
      title: 'PractiX Code Lab｜次の実践へつなぐ技術メディア',
      description:
        'Next.jsとヘッドレスCMSを活用した開発事例やノウハウを発信するブログサイトです。',
      images: [
        {
          url: 'https://devlog-amber.vercel.app/default-OGP.png',
          width: 1200,
          height: 630,
          alt: 'PractiX Code Lab',
        },
      ],
    },
  }
}

export default async function Page() {
  const app = await getApp()
  const { articles, total } = await getArticles({
    limit: Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10,
  })
  const headingText = '新着記事'

  return (
    <>
      {/* {app.cover?.value && <Cover />} */}
      <div className={styles.Container}>
        <div className={styles.Container_Inner}>
          <main className={styles.Articles}>
            <div className={styles.Articles_Inner}>
              <h2 className={styles.Articles_Heading}>{headingText}</h2>
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
            <Pagination total={total} current={1} basePath={'/page'} />
          </main>
          <Side />
        </div>
      </div>
    </>
  )
}
