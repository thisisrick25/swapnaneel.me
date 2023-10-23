import { Metadata } from 'next'
import Script from 'next/script'
import { Roboto } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './theme-provider'
import Header from '@/components/header'
import { Analytics } from '@vercel/analytics/react';
import { siteMetadata } from '@/utils/siteMetadata'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // suppressHydrationWarning
    <html lang="en" className={roboto.className} suppressHydrationWarning>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-HVS1V1YG5Z"></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-HVS1V1YG5Z');`}
      </Script>
      <body className='bg-white text-black dark:bg-black dark:text-white text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl selection:bg-yellow-500 selection:text-white dark:selection:text-black sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto px-4 sm:px-6 xl:px-0 gap-10 sm:gap-14' suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
