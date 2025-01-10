import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers/providers'

const inter = Inter({ subsets: ['latin'] })

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
