import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI 角色创建平台",
  description: "创建和管理你的 AI 角色",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="text-xl font-bold">AI 角色创建平台</Link>
              <div className="flex space-x-4">
                <Link href="/create" className="text-gray-700 hover:text-gray-900">创建角色</Link>
                <Link href="/characters" className="text-gray-700 hover:text-gray-900">角色列表</Link>
                <Link href="/settings" className="text-gray-700 hover:text-gray-900">设置</Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
