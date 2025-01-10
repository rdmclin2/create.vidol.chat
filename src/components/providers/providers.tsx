'use client'

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "./auth-provider"

export function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </AuthProvider>
  )
}
