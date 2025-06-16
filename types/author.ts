import type { Media } from '@/types/article' // 先ほど定義したMediaを再利用

//extends Content をやめ、必要なプロパティを直接書く
export interface Author {
  _id: string // Contentから継承していたプロパティ
  _sys?: {
    // 必須でなければ ? をつける
    createdAt: string
    updatedAt: string
  }
  fullName: string
  slug: string
  jobTitle?: string
  biography?: string
  profileImage?: Media // Media型を使う
  x?: string
  github?: string
  portfolio?: string
  // x_twitter, github, portfolioなどのフィールドもここに追加
}
