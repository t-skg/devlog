import Link from 'next/link'
import { AuthorProfile } from '@/components/AuthorProfile'
import { SearchClient } from '@/components/SearchClient'
import { getArchives, getAuthors, getAuthor, getTags } from '@/lib/newt'
import styles from '@/styles/Side.module.css'

export const revalidate = 60 * 60 * 24

export async function Side() {
  const tags = await getTags()
  const archives = await getArchives()
  const authors = await getAuthors()

  return (
    <aside className={styles.Side}>
      {/* クライアントコンポーネントとして安全に描画 */}
      <SearchClient />

      <div className={styles.Side_Row}>
        <h3 className={styles.Side_Heading}>カテゴリー</h3>
        <ul className={styles.PopularTags}>
          {tags.map((tag) => (
            <li key={tag._id}>
              <Link href={`/tags/${tag.slug}`}>
                {tag.name}({tag.count})
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.Side_Row}>
        <h3 className={styles.Side_Heading}>
          <Link href="/profile">プロフィール</Link>
        </h3>
        {authors.length > 0 && <AuthorProfile author={authors[0]} />}
      </div>
    </aside>
  )
}
