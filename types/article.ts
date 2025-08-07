import type { Author } from '@/types/author'
import type { Tag } from '@/types/tag'

export interface Media {
  _id?: string
  src: string | null
  fileName?: string
  fileType?: string
  fileSize?: number
  width?: number
  height?: number
  title?: string
  altText?: string
}

export interface Article {
  _id: string
  _sys: {
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
  richeditor: string
  coverImage: Media
  author: Author
  tags: Tag[]
}

export interface Archive {
  year: number
  count: number
}
