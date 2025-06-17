// 値（変数）のインポートと型のインポートを分離
import { createClient } from 'microcms-js-sdk'
import { cache } from 'react'
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
  MicroCMSContentId,
} from 'microcms-js-sdk'

// 外部の型定義ファイルを想定
import type { Archive, Article as FormattedArticle } from '@/types/article'
import type { Author } from '@/types/author'
import type { Tag, TagWithCount } from '@/types/tag'

// --- microCMSから返ってくるAPIの型定義 ---

type AuthorApiResponse = {
  fullName: string
  slug: string
  jobTitle?: string
  biography?: string
  profileImage?: MicroCMSImage
  x?: string
  github?: string
  portfolio?: string
} & MicroCMSContentId &
  MicroCMSDate

type TagApiResponse = {
  name: string
  slug: string
} & MicroCMSContentId &
  MicroCMSDate

type ArticleApiResponse = {
  title: string
  slug: string
  body: string
  coverImage: MicroCMSImage
  meta: {
    fieldId: 'meta'
    meta_title?: string
    meta_description?: string
    ogImage?: MicroCMSImage
  }
  author: AuthorApiResponse
  tags: TagApiResponse[]
} & MicroCMSContentId &
  MicroCMSDate

type SettingsApiResponse = {
  siteName: string
  siteIcon?: MicroCMSImage
  siteCover?: MicroCMSImage
} & MicroCMSDate

// --- フロントエンドが期待する型定義 ---
// あなたの /types/*.ts ファイルで定義されている型
// App型はここで定義
type App = {
  name: string
  icon?: { src: string | null; width?: number; height?: number }
  cover?: { src: string | null; width?: number; height?: number }
}

// --- microCMSクライアントの初期化 ---

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
})

// --- データ変換（アダプター）関数 ---

const formatArticle = (rawArticle: ArticleApiResponse): FormattedArticle => {
  return {
    _id: rawArticle.id,
    _sys: {
      createdAt: rawArticle.createdAt,
      updatedAt: rawArticle.updatedAt,
    },
    title: rawArticle.title,
    slug: rawArticle.slug,
    body: rawArticle.body,
    coverImage: {
      _id: '',
      src: rawArticle.coverImage?.url || null,
      width: rawArticle.coverImage?.width,
      height: rawArticle.coverImage?.height,
    },
    meta: {
      title: rawArticle.meta?.meta_title,
      description: rawArticle.meta?.meta_description,
      ogImage: {
        _id: '',
        src: rawArticle.meta?.ogImage?.url || null,
        width: rawArticle.meta?.ogImage?.width,
        height: rawArticle.meta?.ogImage?.height,
      },
    },
    author: {
      ...rawArticle.author,
      _id: rawArticle.author.id,
      profileImage: {
        _id: '',
        src: rawArticle.author.profileImage?.url || null,
        width: rawArticle.author.profileImage?.width,
        height: rawArticle.author.profileImage?.height,
      },
    },
    tags: (rawArticle.tags || []).map((tag) => ({ ...tag, _id: tag.id })),
  }
}

// --- 全件取得用のヘルパー関数 ---
/**
 * 指定されたエンドポイントの全コンテンツをページネーションを使って取得する
 * @param endpoint 取得するAPIのエンドポイント名
 * @param queries クエリパラメータ
 * @returns 全コンテンツの配列
 */
const getAllContents = async <T>(
  endpoint: string,
  queries?: MicroCMSQueries,
): Promise<T[]> => {
  const allContents: T[] = []
  let offset = 0
  const limit = 100 // APIの上限値

  while (true) {
    const response = await client.get<{ contents: T[]; totalCount: number }>({
      endpoint,
      queries: {
        ...queries,
        limit,
        offset,
      },
    })

    if (response.contents.length === 0) {
      break
    }

    allContents.push(...response.contents)
    offset += response.contents.length

    if (allContents.length >= response.totalCount) {
      break
    }
  }
  return allContents
}

// --- API関数 ---

export const getArticles = cache(
  async (
    query?: MicroCMSQueries,
  ): Promise<{ articles: FormattedArticle[]; total: number }> => {
    const { contents, totalCount } = await client.get<{
      contents: ArticleApiResponse[]
      totalCount: number
    }>({
      endpoint: 'articles',
      queries: {
        depth: 2,
        ...query,
      },
    })
    const articles = contents.map(formatArticle)
    return {
      articles,
      total: totalCount,
    }
  },
)

export const getArticle = cache(
  async (slug: string): Promise<FormattedArticle | null> => {
    if (!slug) return null
    const { contents } = await client.get<{ contents: ArticleApiResponse[] }>({
      endpoint: 'articles',
      queries: {
        filters: `slug[equals]${slug}`,
        depth: 2,
      },
    })
    if (contents.length === 0) return null
    const article = formatArticle(contents[0])
    return article
  },
)

export const getPreviousArticle = cache(
  async (
    currentArticle: FormattedArticle,
  ): Promise<{ slug: string } | null> => {
    const { createdAt } = currentArticle._sys
    const { contents } = await client.get<{ contents: { slug: string }[] }>({
      endpoint: 'articles',
      queries: {
        fields: 'slug',
        filters: `publishedAt[greater_than]${createdAt}`,
        orders: 'publishedAt',
        limit: 1,
      },
    })
    return contents[0] || null
  },
)

export const getNextArticle = cache(
  async (
    currentArticle: FormattedArticle,
  ): Promise<{ slug: string } | null> => {
    const { createdAt } = currentArticle._sys
    const { contents } = await client.get<{ contents: { slug: string }[] }>({
      endpoint: 'articles',
      queries: {
        fields: 'slug',
        filters: `publishedAt[less_than]${createdAt}`,
        orders: '-publishedAt',
        limit: 1,
      },
    })
    return contents[0] || null
  },
)

export const getTags = cache(async (): Promise<TagWithCount[]> => {
  const tags = await getAllContents<TagApiResponse>('tags')
  const articles = await getAllContents<{ id: string; tags: { id: string }[] }>(
    'articles',
    { fields: 'id,tags', depth: 1 },
  )

  const tagCounts = new Map<string, number>()
  for (const article of articles) {
    for (const tag of article.tags || []) {
      tagCounts.set(tag.id, (tagCounts.get(tag.id) || 0) + 1)
    }
  }

  const popularTags: TagWithCount[] = tags
    .map((tag) => ({
      ...tag,
      _id: tag.id,
      count: tagCounts.get(tag.id) || 0,
    }))
    .filter((tag) => tag.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  return popularTags
})

export const getTag = cache(async (slug: string): Promise<Tag | null> => {
  if (!slug) return null
  const { contents } = await client.get<{ contents: TagApiResponse[] }>({
    endpoint: 'tags',
    queries: { filters: `slug[equals]${slug}` },
  })
  if (contents.length === 0) return null
  return { ...contents[0], _id: contents[0].id }
})

export const getAuthors = cache(async (): Promise<Author[]> => {
  const authors = await getAllContents<AuthorApiResponse>('authors')
  const articles = await getAllContents<{ id: string; author: { id: string } }>(
    'articles',
    { fields: 'id,author', depth: 1 },
  )

  const authorCounts = new Map<string, number>()
  for (const article of articles) {
    if (article.author) {
      authorCounts.set(
        article.author.id,
        (authorCounts.get(article.author.id) || 0) + 1,
      )
    }
  }

  const validAuthors: Author[] = authors
    .map((author) => ({
      ...author,
      _id: author.id,
      profileImage: {
        _id: '',
        src: author.profileImage?.url || null,
        width: author.profileImage?.width,
        height: author.profileImage?.height,
      },
    }))
    .filter((author) => (authorCounts.get(author.id) || 0) > 0)

  return validAuthors
})

export const getAuthor = cache(async (slug: string): Promise<Author | null> => {
  if (!slug) return null
  const { contents } = await client.get<{ contents: AuthorApiResponse[] }>({
    endpoint: 'authors',
    queries: { filters: `slug[equals]${slug}` },
  })
  if (contents.length === 0) return null
  // 著者情報もフロントの型に合わせる
  const author = contents[0]
  return {
    ...author,
    _id: author.id,
    profileImage: {
      _id: '',
      src: author.profileImage?.url || null,
      width: author.profileImage?.width,
      height: author.profileImage?.height,
    },
  }
})

// getArchivesの実装例
export const getArchives = cache(async (): Promise<Archive[]> => {
  // 1. microCMSのシステムフィールドは `publishedAt` または `createdAt` を直接指定
  // 2. 返ってくるオブジェクトの型も修正
  const articles = await getAllContents<{ createdAt: string }>('articles', {
    fields: 'createdAt',
  })

  if (articles.length === 0) return []

  const yearCounts = new Map<number, number>()
  articles.forEach((article) => {
    // 3. `_sys` を経由せず、直接 `createdAt` を参照
    const year = new Date(article.createdAt).getFullYear()
    yearCounts.set(year, (yearCounts.get(year) || 0) + 1)
  })

  const archives = Array.from(yearCounts.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => b.year - a.year)

  return archives
})

export const getApp = cache(async (): Promise<App> => {
  try {
    const settingsData = await client.get<SettingsApiResponse>({
      endpoint: 'settings',
    })
    const formattedApp: App = {
      name: settingsData.siteName,
      icon: {
        src: settingsData.siteIcon?.url || null,
        width: settingsData.siteIcon?.width,
        height: settingsData.siteIcon?.height,
      },
      cover: {
        src: settingsData.siteCover?.url || null,
        width: settingsData.siteCover?.width,
        height: settingsData.siteCover?.height,
      },
    }
    return formattedApp
  } catch (error) {
    console.error('サイト設定情報の取得に失敗しました。', error)
    return { name: 'ブログ' }
  }
})
