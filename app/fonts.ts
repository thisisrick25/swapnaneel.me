import { Inter, Poppins, JetBrains_Mono, IBM_Plex_Mono } from 'next/font/google'

// Headline font
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-poppins',
})

// Body font
const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-inter',
})

// Code font (heavier)
const jetbrains_mono = JetBrains_Mono({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-jetbrains-mono',
})

// Tag font (lighter mono)
const ibm_plex_mono = IBM_Plex_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-ibm-plex-mono',
})

export {
  poppins,
  inter,
  jetbrains_mono,
  ibm_plex_mono,
}