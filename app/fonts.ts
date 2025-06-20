import { Roboto_Mono, Raleway, Montserrat, Inter, IBM_Plex_Mono, Poppins, Space_Grotesk } from 'next/font/google'

// Headline fonts
const raleway = Raleway({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-raleway',
})

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-montserrat',
})

// Body fonts
const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-inter',
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-poppins',
})

// Code fonts
const roboto_mono = Roboto_Mono({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-roboto-mono',
})

const ibm_plex_mono = IBM_Plex_Mono({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-ibm-plex-mono',
})

// Accent fonts
const space_grotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-space-grotesk',
})

export {
  roboto_mono,
  raleway,
  montserrat,
  inter,
  ibm_plex_mono,
  poppins,
  space_grotesk
}