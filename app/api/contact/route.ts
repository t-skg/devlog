import { NextRequest } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  // console.log('▶️ POSTリクエスト受信')

  const body = await req.json()

  // console.log('📦 body:', body)

  const token = body.token

  if (!token) {
    console.log('❌ tokenがありません')
    return new Response('トークンが送信されていません', { status: 400 })
  }
  // console.log('✅ token取得:', token)

  const secret = process.env.RECAPTCHA_SECRET_KEY
  const res = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`,
  })

  const result = await res.json()

  // v2利用のためscoreは意味ない
  if (!result.success || result.score < 0.5) {
    console.error('reCAPTCHA検証失敗:', result)
    return new Response('reCAPTCHA 認証失敗', { status: 400 })
  }

  // ✅ Resend メール送信
  const resend = new Resend(process.env.RESEND_API_KEY)
  // console.log('✅ メール送信を開始します')
  const { name, email, message } = body

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM || '',
      to: 'lenac000@gmail.com',
      subject: `お問い合わせ: ${name} さんより`,
      text: `お名前: ${name}\nメールアドレス: ${email}\n\n${message}`,
    })
    // console.log('✅ メール送信が完了しました')

    return new Response('送信成功', { status: 200 })
  } catch (error) {
    console.error('メール送信エラー:', error)
    return new Response('送信失敗', { status: 500 })
  }
}
