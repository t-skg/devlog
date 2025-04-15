'use client'
import Link from 'next/link'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import styles from '@/styles/Contact.module.css'

type FormData = {
  name: string
  email: string
  message: string
}

export default function ContactPage() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleRecaptchaChange = (token: string | null) => {
    setCaptchaToken(token)
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, token: captchaToken }),
    })

    if (response.ok) {
      setIsSubmitted(true)
    } else {
      alert('送信に失敗しました。時間をおいて再度お試しください。')
    }
  }

  return (
    <div className={styles.ContactContainer}>
      <h1 className={styles.Title}>お問い合わせ</h1>

      {isSubmitted ? (
        <div className={styles.SuccessArea}>
          <p className={styles.Success}>お問い合わせありがとうございました！</p>
          <Link href="/" className={styles.BackButton}>
            トップページへ戻る
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.Form}>
          <div className={styles.FormGroup}>
            <label htmlFor="name">お名前</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'お名前は必須です' })}
            />
            {errors.name && (
              <p className={styles.Error}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.FormGroup}>
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'メールアドレスは必須です',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '正しいメールアドレスを入力してください',
                },
              })}
            />
            {errors.email && (
              <p className={styles.Error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.FormGroup}>
            <label htmlFor="message">お問い合わせ内容</label>
            <textarea
              id="message"
              rows={5}
              {...register('message', {
                required: 'お問い合わせ内容は必須です',
              })}
            />
            {errors.message && (
              <p className={styles.Error}>{errors.message.message}</p>
            )}
          </div>
          <div className={styles.ReCAPTCHAWrapper}>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
              onChange={handleRecaptchaChange}
            />
          </div>
          <button type="submit" className={styles.SubmitButton}>
            送信する
          </button>
        </form>
      )}
    </div>
  )
}
