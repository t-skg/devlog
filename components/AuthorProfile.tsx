import Image from 'next/image'
import { FaGithub, FaGlobe } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import styles from '@/styles/AuthorProfile.module.css'
import type { Author } from '@/types/author'

export function AuthorProfile({ author }: { author: Author }) {
  return (
    <div className={styles.ProfileWrapper}>
      {/* プロフィール画像 */}
      {author.profileImage?.src && (
        <div className={styles.ProfileImage}>
          <Image
            src={author.profileImage.src}
            alt={author.profileImage.altText || author.fullName}
            width={96}
            height={96}
          />
        </div>
      )}

      {/* 名前・肩書き */}
      <div className={styles.ProfileName}>{author.fullName}</div>
      <div className={styles.ProfileJob}>{author.jobTitle}</div>

      {/* ソーシャルリンク */}
      <div className={styles.ProfileLinks}>
        {author.x && (
          <a
            href={author.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <FaXTwitter size={20} />
          </a>
        )}
        {author.github && (
          <a
            href={author.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
        )}
        {author.portfolio && (
          <a
            href={author.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
          >
            <FaGlobe size={20} />
          </a>
        )}
      </div>
    </div>
  )
}
