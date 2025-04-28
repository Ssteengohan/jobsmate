import type { Metadata, Viewport } from 'next';
import { Lexend } from 'next/font/google';
import '@/themes/styles/globals.css';
import { SmoothScrollProvider } from '@/themes/lib/lenis';
import Script from 'next/script';

const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#202735' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Jobsmate - Find Your Dream Job | AI-Powered Job Matching Platform',
  description:
    'Jobsmate helps you find your dream job through AI-powered matching, smart resume analysis, and personalized job recommendations. Connect with top employers and advance your career with our cutting-edge job search platform.',
  keywords:
    'job search, career opportunities, AI job matching, employment, resume builder, job application, career advancement, remote jobs, tech jobs, professional networking, job board, career platform, hiring platform, recruitment software, job marketplace, AI recruitment, applicant tracking, talent acquisition, job recommendations, skill matching',
  applicationName: 'Jobsmate',
  authors: [{ name: 'Jobsmate Team', url: 'https://jobsmate.global' }],
  category: 'Career & Employment',
  classification: 'Job Search Platform',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  creator: 'Jobsmate',
  publisher: 'Jobsmate',
  metadataBase: new URL('https://jobsmate.global'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'en-GB': '/en-GB',
      'es-ES': '/es-ES',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jobsmate.global',
    title: 'Jobsmate - The Ultimate Job Search Platform',
    description:
      "Find your perfect career match with Jobsmate's AI-powered job search platform. Apply to opportunities with top companies and advance your career.",
    siteName: 'Jobsmate',
    images: [
      {
        url: 'https://jobsmate.global/jobsmate.svg',
        width: 1200,
        height: 630,
        alt: 'Jobsmate - Find Your Dream Job',
        type: 'image/svg+xml',
      },
      {
        url: 'https://jobsmate.global/jobsmate-mob.svg',
        width: 800,
        height: 600,
        alt: 'Jobsmate Mobile App',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobsmate - Find Your Dream Job',
    description: "Find your perfect career match with Jobsmate's AI-powered job search platform.",
    images: ['https://jobsmate.global/jobsmate.svg'],
    creator: '@jobsmate',
    site: '@jobsmate',
  },
  icons: {
    icon: '/jobsmate-mob.svg',
    shortcut: '/jobsmate-mob.svg',
    apple: '/jobsmate-mob.svg',
    other: {
      rel: 'apple-touch-icon',
      url: '/jobsmate-mob.svg',
    },
  },
  manifest: '/site.webmanifest',
  other: {
    'format-detection': 'telephone=no',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-jobsearch"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Jobsmate',
              applicationCategory: 'Job Search',
              description:
                'AI-powered job matching platform connecting professionals with their ideal career opportunities',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              author: {
                '@type': 'Organization',
                name: 'Jobsmate',
                url: 'https://jobsmate.global',
              },
            }),
          }}
        />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className={`${lexend.variable} bg-white antialiased dark:bg-[#202735]`}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
