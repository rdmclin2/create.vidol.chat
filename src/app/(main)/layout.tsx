import Sidebar from '@/components/Sidebar'
import { Toaster } from "@/components/ui/toaster"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="relative flex h-screen">
        <Sidebar />
        <main className="flex-1">
          <div className="h-full lg:pl-16 lg:has-[:is(.w-64)]:pl-0">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </>
  )
}
