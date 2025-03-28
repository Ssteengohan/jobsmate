import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import '@/themes/styles/globals.css';

const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Add or adjust weights as needed
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
      <body className={`${lexend.variable} antialiased`}>{children}</body>
    </html>
  );
}
