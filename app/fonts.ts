import { Roboto_Mono, Raleway, Montserrat, Inter, IBM_Plex_Mono, Poppins, Space_Grotesk } from 'next/font/google'

const roboto_mono = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-roboto-mono',
})

const raleway = Raleway({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-raleway',
})

const montserrat = Montserrat({
  weight: '500',
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-montserrat',
})

const inter = Inter({
  weight: '400',
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-inter',
})

const ibm_plex_mono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-ibm-plex-mono',
})

const poppins = Poppins({
  weight: ['300'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-poppins',
})

const space_grotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
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