import { Header } from '@/components';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { ReactQueryProviders } from '@/providers/ReactQueryProviders';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Github Repositories Explorer',
  description: 'Built Github Repositories Explorer for fulfill Atask task. ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${openSans.variable} antialiased`}>
        <ReactQueryProviders>
          <ReactQueryDevtools initialIsOpen={false} />
          <Header />
          {children}
        </ReactQueryProviders>
      </body>
    </html>
  );
}
