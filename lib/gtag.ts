declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

export const pageview = (url: string) => {
  if (!GA_ID) return
  window.gtag('config', GA_ID, {
    page_path: url,
  })
}
