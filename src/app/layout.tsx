import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from "@/components/providers/providers"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '角色梦工厂',
  description: '创建和管理你的 AI 角色',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
