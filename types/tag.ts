//extends Content をやめ、必要なプロパティを直接書く
export interface Tag {
  _id: string // Contentから継承していたプロパティ
  _sys?: {
    // 必須でなければ ? をつける
    createdAt: string
    updatedAt: string
  }
  name: string
  slug: string
}

export interface TagWithCount extends Tag {
  count: number
}
