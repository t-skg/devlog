import { ArticleCard } from '@/components/ArticleCard'
import { Pagination } from '@/components/Pagination'
import { Side } from '@/components/Side'
import { getApp, getArticles } from '@/lib/microcms'
import styles from '@/styles/ArticleList.module.css'

export const revalidate = 60 * 60 * 24

export async function generateMetadata() {
  return {
    title: 'Walkbit｜実践で学ぶ技術検証メディア',
    description:
      '机上の空論より、動くコードを。様々な技術の検証ログや、リアルな利用シーンを想定した評価レポートを発信。あなたの「この技術、実際どうなの？」に答えます。',
    openGraph: {
      type: 'website',
      title: 'Walkbit｜実践で学ぶ技術検証メディア',
      description:
        '机上の空論より、動くコードを。様々な技術の検証ログや、リアルな利用シーンを想定した評価レポートを発信。あなたの「この技術、実際どうなの？」に答えます。',
      images: [
        {
          url: 'https://www.walkbit.jp/default-OGP.png',
          width: 1200,
          height: 630,
          alt: 'Walkbit',
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
