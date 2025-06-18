import type { Media } from '@/types/article'

export interface Author {
  _id: string
  _sys?: {
    createdAt: string
    updatedAt: string
  }
  fullName: string
  slug: string
  jobTitle?: string
  biography?: string
  profileImage?: Media
  x?: string
  github?: string
  portfolio?: string
}
