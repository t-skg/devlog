import type { Content, Media } from 'newt-client-js'

export interface Author extends Content {
  fullName: string
  slug: string
  jobTitle?: string
  biography?: string
  profileImage?: Media
  x?: string
  github?: string
  portfolio?: string
}
