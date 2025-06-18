export interface Tag {
  _id: string
  _sys?: {
    createdAt: string
    updatedAt: string
  }
  name: string
  slug: string
}

export interface TagWithCount extends Tag {
  count: number
}
