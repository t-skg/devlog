import { NextRequest } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const token = body.token

  if (!token) {
    return new Response('トークンが送信されていません', { status: 400 })
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY
  const res = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`,
  })

  const result = await res.json()

  //Resend メール送信
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { name, email, message } = body

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM || '',
      to: 'lenac000@gmail.com',
      subject: `お問い合わせ: ${name} さんより`,
      text: `お名前: ${name}\nメールアドレス: ${email}\n\n${message}`,
    })

    return new Response('送信成功', { status: 200 })
  } catch (error) {
    console.error('メール送信エラー:', error)
    return new Response('送信失敗', { status: 500 })
  }
}
