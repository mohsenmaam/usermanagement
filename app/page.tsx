import UserManagement from '@/components/UserManagement';
import { User } from '@/types/user.types';

/**
 * صفحه اصلی - Server Component با SSR
 * دریافت داده‌های اولیه کاربران از سرور برای بهبود SEO و Performance
 * 
 * این صفحه از Server Side Rendering استفاده می‌کند:
 * 1. داده‌ها در سرور fetch می‌شوند
 * 2. HTML کامل با داده‌ها به کاربر ارسال می‌شود
 * 3. سپس React hydration انجام می‌شود
 * 4. تمام تعاملات client-side در UserManagement component هستند
 */

// تابع دریافت کاربران از API (Server-side)
async function getInitialUsers(): Promise<User[]> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      cache: 'no-store', // SSR: همیشه داده جدید در هر request
      // یا برای ISR می‌توانید از revalidate استفاده کنید:
      // next: { revalidate: 60 } // هر 60 ثانیه یکبار بازسازی
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching initial users:', error);
    // در صورت خطا، آرایه خالی برمی‌گردانیم
    return [];
  }
}

// Server Component (بدون 'use client')
export default async function HomePage() {
  // دریافت کاربران در سرور (SSR)
  // این بخش در سرور اجرا می‌شود و نتیجه به HTML تبدیل می‌شود
  const initialUsers = await getInitialUsers();

  // ارسال داده‌های اولیه به Client Component
  return <UserManagement initialUsers={initialUsers} />;
}

// Metadata برای SEO (فقط در Server Components کار می‌کند)
export const metadata = {
  title: 'مدیریت کاربران - سیستم داشبورد مدرن',
  description: 'سیستم مدیریت کاربران با React، Next.js و Server Side Rendering برای بهبود SEO و Performance',
  keywords: 'مدیریت کاربران, React, Next.js, SSR, فارسی',
};
