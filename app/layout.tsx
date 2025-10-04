import type { Metadata } from 'next';
import './globals.css';
import ToastProvider from '@/components/ToastProvider';

export const metadata: Metadata = {
  title: 'سیستم مدیریت کاربران - داشبورد مدرن',
  description: 'یک سیستم مدیریت کاربران زیبا و مدرن ساخته شده با Next.js، React و TailwindCSS',
  keywords: ['مدیریت کاربران', 'داشبورد', 'react', 'nextjs', 'tailwindcss'],
  authors: [{ name: 'نام شما' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className="font-vazir">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
