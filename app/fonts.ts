import { Roboto_Mono, Raleway, Montserrat, Inter, IBM_Plex_Mono, Poppins, Space_Grotesk } from 'next/font/google'

const roboto_mono = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

const raleway = Raleway({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

const montserrat = Montserrat({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

const ibm_plex_mono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

const poppins = Poppins({
  weight: ['300'],
  style: ['italic', 'normal'],
  subsets: ['latin'],
})

const space_grotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
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