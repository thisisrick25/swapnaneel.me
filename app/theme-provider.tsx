'use client'

import { ThemeProvider as NextThemeProvider } from "next-themes"

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemeProvider>) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      storageKey='theme'
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemeProvider>
  )
}