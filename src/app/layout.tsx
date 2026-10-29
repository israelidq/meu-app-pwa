import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { BottomNav } from '@/components/BottomNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hábitos PWA',
  description: 'Rastreador de hábitos moderno e performático para iOS',
  manifest: '/manifest.json', // Caso decida adicionar o manifesto PWA depois
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Hábitos PWA',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-blue-500 selection:text-white`}>
        <div className="min-h-screen pb-16">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}