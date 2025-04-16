import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return new Response('Invalid token', { status: 401 })
  }

  try {
    const body = await req.json()
    const slug = body?.slug || body?.content?.slug

    revalidatePath('/')
    revalidatePath('/profile')
    if (slug) {
      revalidatePath(`/articles/${slug}`)
    }

    return new Response('Revalidation triggered', { status: 200 })
  } catch (error) {
    console.error('[Revalidate Error]', error)
    return new Response('Revalidation failed', { status: 500 })
  }
}
