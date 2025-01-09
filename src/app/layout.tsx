import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

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
      <body className={`${inter.className} overflow-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex h-screen">
            <Sidebar />
            <main className="flex-1">
              <div className="h-full lg:pl-16 lg:has-[:is(.w-64)]:pl-0">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
