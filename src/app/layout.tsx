import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI 角色',
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
        <div className="relative flex min-h-screen">
          <Sidebar />
          <main className="flex-1 transition-[margin] duration-300 lg:ml-[64px] lg:has-[:is(.w-64)]:ml-64">
            <div className="container py-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
