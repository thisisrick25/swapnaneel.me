import { Space_Grotesk, DM_Sans, JetBrains_Mono, Fira_Code, Inter } from 'next/font/google'

// Headline font
const space_grotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-space-grotesk',
})

// Body font
const dm_sans = DM_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-dm-sans',
})

// Code font (heavier)
const jetbrains_mono = JetBrains_Mono({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-jetbrains-mono',
})

// Tag font (lighter mono)
const fira_code = Fira_Code({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-fira-code',
})

// Blog typography (Clean Tech Look)
const inter_blog = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-inter-blog',
})

export {
  space_grotesk,
  dm_sans,
  jetbrains_mono,
  fira_code,
  inter_blog,
}