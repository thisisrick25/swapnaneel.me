import { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from './theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Analytics } from '@vercel/analytics/react';
import { siteMetadata } from '@/utils/siteMetadata'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { roboto_mono, montserrat } from '@/fonts'

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
      noimageindex: false,
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
    <html lang="en" suppressHydrationWarning>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-HVS1V1YG5Z"></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-HVS1V1YG5Z');`}
      </Script>
      <body className={`${roboto_mono.variable} ${montserrat.variable} antialiased tracking-tight bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white  selection:bg-yellow-500 selection:text-white dark:selection:text-black sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto px-4 sm:px-6 xl:px-0 gap-10 sm:gap-14`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col max-w-2xl mx-auto px-4">
            <Header />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </div>
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
