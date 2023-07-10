'use client'

import { ThemeProvider as NextThemeProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props}: ThemeProviderProps) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" storageKey='theme' {...props}>
      {children}
    </NextThemeProvider>
  )
}