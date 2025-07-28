import type { Metadata } from 'next';
import './globals.css';
import type { ReactNode } from 'react';
import { QueryProvider } from '@/components/QueryProvider';

export const metadata: Metadata = {
  title: 'ChatGPT Reviews Explorer',
  description: 'Explore and filter user reviews for the ChatGPT iOS app',
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
    shortcut: '/favicon.svg',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F59E0B',
};

/**
 * Root layout component that wraps the entire application
 */
export default function RootLayout({
  children,
}: {
  /** The page content to render */
  children: ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <QueryProvider>
          <div className='min-h-screen bg-gray-50'>
            <header className='bg-white border-b border-gray-200'>
              <div className='container py-6'>
                <h1 className='text-3xl font-bold text-gray-900'>ChatGPT Reviews Explorer</h1>
                <p className='mt-2 text-gray-600'>Explore user reviews for the ChatGPT iOS app</p>
              </div>
            </header>
            <main className='container py-8'>{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
