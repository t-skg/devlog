import Image from 'next/image'
import { FaXTwitter, FaGithub, FaGlobe } from 'react-icons/fa6'
import { getAuthors } from '@/lib/microcms'
import styles from '@/styles/ProfilePage.module.css'

export const revalidate = 60 * 60 * 24

export default async function ProfilePage() {
  const authors = await getAuthors()
  const author = authors[0]

  return (
    <div className={styles.ProfileContainer}>
      <section className={styles.Section}>
        <h1 className={styles.Title}>Walkbitについて</h1>
        <p className={styles.Description}>
          プログラミング初学者から中級者を対象に、 <br />
          便利なツールの使い方やチュートリアルを分かりやすく解説するメディアです。
        </p>
        <h2 className={styles.subTitle}>主な発信カテゴリ</h2>
        <ul className={styles.List}>
          <li>開発ツールの使い方・チュートリアル</li>
          <li>プログラミング学習のヒント</li>
          <li>個人開発と事業立ち上げの記録</li>
        </ul>
        <p className={styles.Description}>
          事業企画から実装までの様々な視点から、役立つ情報を発信しています。
        </p>
      </section>

      <section className={styles.Section}>
        <h1 className={styles.Title}>管理人プロフィール</h1>
        <div className={styles.ProfileCard}>
          {author.profileImage?.src && (
            <Image
              src={author.profileImage.src}
              alt={author.fullName}
              width={100}
              height={100}
              className={styles.Avatar}
            />
          )}
          <h2 className={styles.Name}>{author.fullName}</h2>
          <p className={styles.Job}>{author.jobTitle}</p>
          <p className={styles.Bio}>
            これまで事業立ち上げコンサルタントとして様々な企業の新規事業や業務改善を支援してきました。
            <br />
            現在は「アイデアを形にする」プロセスを実践しながら、
            事業企画からサービス実装までに必要な知見を発信しています。
          </p>
          <div className={styles.ProfileLinks}>
            {author.x && (
              <a
                href={author.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <FaXTwitter size={26} />
              </a>
            )}
            {author.github && (
              <a
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub size={26} />
              </a>
            )}
            {author.portfolio && (
              <a
                href={author.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Portfolio"
              >
                <FaGlobe size={26} />
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
