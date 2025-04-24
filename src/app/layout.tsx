import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import '@/themes/styles/globals.css';
import { SmoothScrollProvider } from '@/themes/lib/lenis';

const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Jobsmate - Find Your Dream Job',
  description: 'Find your dream job with Jobsmate, the ultimate job search platform.',
  icons: {
    icon: '/jobsmate-mob.svg',
    shortcut: '/jobsmate-mob.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} antialiased`}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
