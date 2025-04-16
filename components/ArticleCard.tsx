import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/date'
import styles from '@/styles/ArticleCard.module.css'
import type { Article } from '@/types/article'

export function ArticleCard({ article }: { article: Article }) {
  return (
    // 記事詳細ページへのリンク
    <Link className={styles.Article} href={`/articles/${article.slug}`}>
      {/* アイキャッチ画像エリア */}
      <div className={styles.Article_Eyecatch}>
        {article.coverImage ? (
          <Image
            src={article.coverImage.src}
            alt=""
            width="1000"
            height="667"
          />
        ) : (
          // アイキャッチがない場合のプレースホルダー
          <div className={styles.Article_EyecatchEmpty}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="#CCCCCC"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
            </svg>
          </div>
        )}
      </div>

      {/* タイトル・カテゴリなどの情報エリア */}
      <div className={styles.Article_Data}>
        {/* 記事タイトル */}
        <h3 className={styles.Article_Title}>{article.title}</h3>

        {/* タグ（カテゴリ）リスト */}
        <ul className={styles.Article_Tags}>
          {(article.tags || []).map((tag) => (
            <li key={tag._id}>#{tag.name}</li>
          ))}
        </ul>
      </div>
    </Link>
  )
}
