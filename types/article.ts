import type { Author } from '@/types/author'
import type { Tag } from '@/types/tag'

//アプリケーションで使う「画像」の型を独自に定義
export interface Media {
  _id?: string // 必須でなければ ? をつける
  src: string | null
  fileName?: string
  fileType?: string
  fileSize?: number
  width?: number
  height?: number
  title?: string
  altText?: string
}

//extends Content をやめ、必要なプロパティを直接書く
export interface Article {
  _id: string // Contentから継承していたプロパティ
  _sys: {
    // Contentから継承していたプロパティ
    createdAt: string
    updatedAt: string
  }
  title: string
  slug: string
  meta?: {
    title?: string
    description?: string
    ogImage?: Media
  }
  body: string
  coverImage: Media
  author: Author
  tags: Tag[]
}

export interface Archive {
  year: number
  count: number
}
