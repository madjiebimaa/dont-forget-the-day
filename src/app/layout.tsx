import QueryProvider from '@/providers/QueryProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster as Sonner } from '@/components/ui/sonner';

import './globals.css';
import '/node_modules/flag-icons/css/flag-icons.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Don't Forget The Day",
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <QueryProvider>{children}</QueryProvider>
        <Sonner />
      </body>
    </html>
  );
}
