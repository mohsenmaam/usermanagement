'use client';

import { Toaster } from 'react-hot-toast';

/**
 * Toast Provider Component
 * Client component wrapper for react-hot-toast
 */
export default function ToastProvider() {
  return (
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#fff',
          color: '#374151',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}
