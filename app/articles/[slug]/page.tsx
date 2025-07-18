import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { FacebookShareButton } from '@/components/FacebookShareButton'
import { TwitterShareButton } from '@/components/TwitterShareButton'
import {
  getArticle,
  getPreviousArticle,
  getNextArticle,
  getArticles,
} from '@/lib/microcms'

// CSS Modules
import styles from '@/styles/Article.module.css'
import bodyStyles from '@/styles/ArticleBody.module.css'

type Props = {
  params: {
    slug: string
  }
}

export const revalidate = 60 * 60 * 24
export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const { articles } = await getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}
export const dynamicParams = true

export async function generateMetadata({ params }: Props) {
  const { slug } = params
  const article = await getArticle(slug)

  const title = article?.meta?.title || article?.title

  // descriptionは本文から先頭200文字を抽出する（Markdown/HTMLタグ除去）
  const bodyDescription =
    article?.body
      .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '') // HTMLタグを除去
      .replace(/(#|\*|_|`|>|\||-|~|\[|\]|\(|\))/g, '') // Markdown記法を除去
      .replace(/\n/g, ' ') // 改行をスペースに
      .slice(0, 200) || ''

  const description = article?.meta?.description || bodyDescription
  const ogImage = article?.meta?.ogImage?.src

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: article?.title || '',
            },
          ]
        : [
            {
              url: '/default-OGP.png',
              width: 1200,
              height: 630,
              alt: 'Walkbit',
            },
          ],
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = params
  const article = await getArticle(slug)
  if (!article) {
    notFound()
  }

  const prevArticle = await getPreviousArticle(article)
  const nextArticle = await getNextArticle(article)

  return (
    <main className={styles.Container}>
      <article className={styles.Article}>
        <div className={styles.Article_Cover}>
          {article.coverImage?.src && (
            <Image
              src={article.coverImage.src}
              alt=""
              width={1000}
              height={667}
            />
          )}
        </div>
        <div className={styles.Article_Header}>
          <h1 className={styles.Article_Title}>{article.title}</h1>
          <ul className={styles.Article_Tags}>
            {(article.tags || []).map((tag) => (
              <li key={tag._id}>
                <Link href={`/tags/${tag.slug}`}>#{tag.name}</Link>
              </li>
            ))}
          </ul>
          <div className={styles.Article_Row}>
            <div className={styles.Article_Share}>
              <p className={styles.Article_ShareLabel}>Share this post</p>
              <ul className={styles.Article_ShareList}>
                <li>
                  <TwitterShareButton title={article.title} />
                </li>
                <li>
                  <FacebookShareButton />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ★ 2. 本文の表示をReactMarkdownに置き換え */}
        <div className={`${styles.Article_Body} ${bodyStyles.content}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]} // テーブルなどのGFMを有効化
            rehypePlugins={[rehypeRaw]} // Markdown内のHTMLを有効化
          >
            {article.body || ''}
          </ReactMarkdown>
        </div>

        <div className={styles.SnsShare}>
          <p className={styles.SnsShare_Label}>Share this post</p>
          <ul className={styles.SnsShare_List}>
            <li>
              <TwitterShareButton title={article.title} />
            </li>
            <li>
              <FacebookShareButton />
            </li>
          </ul>
        </div>

        <aside className={styles.Author}>
          <a
            href={`/profile`}
            className={styles.Author_Avatar}
            aria-label={article.author.fullName}
          >
            {article.author.profileImage?.src ? (
              <Image
                src={article.author.profileImage.src}
                alt=""
                width="48"
                height="48"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                fill="#CCCCCC"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </a>
          <div className={styles.Author_Text}>
            <Link className={styles.Article_AuthorName} href={`/profile`}>
              {article.author.fullName}
            </Link>
            <div className={styles.Author_Description}>
              {/* ★ 3. 著者紹介文も同様にReactMarkdownで表示 */}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {article.author.biography || ''}
              </ReactMarkdown>
            </div>
          </div>
        </aside>
        <nav className={styles.Links}>
          {prevArticle && (
            <Link
              className={styles.Links_Previous}
              href={`/articles/${prevArticle.slug}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="#333333"
              >
                <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
                <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
              </svg>
              Previous post
            </Link>
          )}
          {nextArticle && (
            <Link
              className={styles.Links_Next}
              href={`/articles/${nextArticle.slug}`}
            >
              Next post
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="#333333"
              >
                <g>
                  <path d="M0,0h24v24H0V0z" fill="none" />
                </g>
                <g>
                  <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
                </g>
              </svg>
            </Link>
          )}
        </nav>
      </article>
    </main>
  )
}
