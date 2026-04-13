import type { Metadata, Viewport } from 'next'
import { Work_Sans } from 'next/font/google'
import './globals.css'

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-work-sans',
})

export const metadata: Metadata = {
  title: 'Go Home',
  description: '長者極簡導航',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Go Home',
  },
  twitter: {
    card: 'summary',
  },
}

export const viewport: Viewport = {
  themeColor: '#4CAF50',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-HK">
      <body className={`${workSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
