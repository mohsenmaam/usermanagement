import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ToastProvider from '@/components/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'User Management System - Modern Dashboard',
  description: 'A beautiful and modern user management system built with Next.js, React, and TailwindCSS',
  keywords: ['user management', 'dashboard', 'react', 'nextjs', 'tailwindcss'],
  authors: [{ name: 'Your Name' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
