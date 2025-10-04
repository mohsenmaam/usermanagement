# 🛠️ Development Guide

راهنمای کامل توسعه پروژه User Management System

## 📋 فهرست مطالب

- [شروع کار](#شروع-کار)
- [ساختار پروژه](#ساختار-پروژه)
- [معماری](#معماری)
- [اصول کدنویسی](#اصول-کدنویسی)
- [افزودن ویژگی جدید](#افزودن-ویژگی-جدید)
- [استایل‌دهی](#استایل‌دهی)
- [تست](#تست)
- [Deploy](#deploy)

---

## 🚀 شروع کار

### پیش‌نیازها

```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### نصب

```bash
# Clone repository
git clone [repository-url]

# Navigate to project
cd user-management-system

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📁 ساختار پروژه

### دایرکتوری‌های اصلی

```
user-management-system/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage (Container)
│   ├── loading.tsx        # Loading state
│   ├── error.tsx          # Error boundary
│   ├── not-found.tsx      # 404 page
│   └── globals.css        # Global styles
│
├── components/            # React Components
│   ├── SearchBar.tsx      # Search component
│   ├── UserCard.tsx       # User card display
│   ├── UserForm.tsx       # Create/Edit form
│   ├── UserList.tsx       # Users grid
│   ├── LoadingSpinner.tsx # Loading animation
│   ├── EmptyState.tsx     # No data state
│   ├── StatsCard.tsx      # Statistics card
│   └── ToastProvider.tsx  # Toast notifications
│
├── hooks/                 # Custom Hooks
│   ├── useUsers.ts        # User management logic
│   └── useUserForm.ts     # Form management logic
│
├── services/              # API Services
│   ├── api.service.ts     # Base API class
│   └── user.service.ts    # User API operations
│
├── types/                 # TypeScript Types
│   └── user.types.ts      # User type definitions
│
├── lib/                   # Utilities
│   ├── constants.ts       # App constants
│   └── utils.ts           # Helper functions
│
└── public/                # Static files
```

---

## 🏗️ معماری

### اصول طراحی

#### 1. Container/Presentational Pattern

**Container Components** (منطق)
- `app/page.tsx` - مدیریت state و business logic
- دریافت و پردازش داده
- مدیریت side effects

**Presentational Components** (نمایش)
- `UserCard`, `UserForm`, `SearchBar` - فقط UI
- دریافت props
- بدون business logic

#### 2. Service Layer

```typescript
// Base Service
class ApiService {
  protected axiosInstance: AxiosInstance;
  
  async get<T>(url: string): Promise<T> { }
  async post<T>(url: string, data: any): Promise<T> { }
  // ...
}

// Specific Service
class UserService extends ApiService {
  async getAllUsers(): Promise<User[]> { }
  async createUser(data: CreateUserDTO): Promise<User> { }
  // ...
}
```

#### 3. Custom Hooks

```typescript
// Business Logic Hook
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  
  const fetchUsers = async () => { /* ... */ };
  const deleteUser = async (id: number) => { /* ... */ };
  
  return { users, loading, fetchUsers, deleteUser };
};
```

---

## 💻 اصول کدنویسی

### 1. SOLID Principles

#### Single Responsibility
```typescript
// ✅ Good - هر کامپوننت یک مسئولیت
const SearchBar = ({ onSearch }) => { /* فقط UI جستجو */ };
const useUsers = () => { /* فقط منطق کاربران */ };

// ❌ Bad - چند مسئولیت
const UserComponent = () => { 
  // UI + API + State + Validation 
};
```

#### Open/Closed
```typescript
// ✅ Good - قابل توسعه بدون تغییر
class ApiService {
  protected baseURL: string;
  async get<T>(url: string): Promise<T> { }
}

class UserService extends ApiService {
  async getAllUsers(): Promise<User[]> { }
}
```

### 2. TypeScript Best Practices

```typescript
// همیشه type مشخص کنید
interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  index: number;
}

// از Generic استفاده کنید
async function fetchData<T>(url: string): Promise<T> { }

// از Union Types استفاده کنید
type Status = 'idle' | 'loading' | 'success' | 'error';
```

### 3. Component Guidelines

```typescript
// Structure
'use client'; // اگر client component است

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Component Documentation
 * توضیحات کامپوننت
 */
interface ComponentProps {
  // Props definition
}

const Component: React.FC<ComponentProps> = ({ props }) => {
  // 1. State
  const [state, setState] = useState();
  
  // 2. Hooks
  const { data } = useCustomHook();
  
  // 3. Handlers
  const handleClick = () => { };
  
  // 4. Effects
  useEffect(() => { }, []);
  
  // 5. Render
  return <div>...</div>;
};

export default Component;
```

---

## ➕ افزودن ویژگی جدید

### مثال: افزودن قابلیت Pagination

#### 1. Update Types
```typescript
// types/pagination.types.ts
export interface PaginationConfig {
  page: number;
  limit: number;
  total: number;
}
```

#### 2. Update Service
```typescript
// services/user.service.ts
async getUsersPaginated(page: number, limit: number): Promise<{
  users: User[];
  total: number;
}> {
  const users = await this.get<User[]>(`/users?_page=${page}&_limit=${limit}`);
  return { users, total: users.length };
}
```

#### 3. Create Hook
```typescript
// hooks/usePagination.ts
export const usePagination = (initialPage = 1, limit = 12) => {
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);
  
  const nextPage = () => setPage(p => p + 1);
  const prevPage = () => setPage(p => Math.max(1, p - 1));
  
  return { page, total, nextPage, prevPage };
};
```

#### 4. Create Component
```typescript
// components/Pagination.tsx
'use client';

export const Pagination = ({ page, total, onNext, onPrev }) => {
  return (
    <div className="flex gap-2">
      <button onClick={onPrev}>Previous</button>
      <span>Page {page}</span>
      <button onClick={onNext}>Next</button>
    </div>
  );
};
```

#### 5. Update Container
```typescript
// app/page.tsx
const { page, nextPage, prevPage } = usePagination();
const { users } = useUsers(page);

return (
  <>
    <UserList users={users} />
    <Pagination page={page} onNext={nextPage} onPrev={prevPage} />
  </>
);
```

---

## 🎨 استایل‌دهی

### Tailwind CSS Classes

```tsx
// Color System
className="text-primary-500 bg-secondary-100"

// Spacing
className="p-4 m-2 gap-3"

// Layout
className="flex items-center justify-between"

// Responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Hover States
className="hover:bg-gray-100 hover:scale-105"

// Custom Classes (globals.css)
className="btn-primary card glass-effect"
```

### Framer Motion Animations

```tsx
// Basic Animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

// Hover Effect
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>

// List Animation
<AnimatePresence>
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.1 }}
    />
  ))}
</AnimatePresence>
```

---

## 🧪 تست

### Unit Tests (آینده)

```typescript
// __tests__/services/user.service.test.ts
describe('UserService', () => {
  it('should fetch all users', async () => {
    const users = await userService.getAllUsers();
    expect(users).toHaveLength(10);
  });
});

// __tests__/hooks/useUsers.test.ts
describe('useUsers', () => {
  it('should load users on mount', () => {
    const { result } = renderHook(() => useUsers());
    expect(result.current.loading).toBe(true);
  });
});
```

---

## 🚀 Deploy

### Vercel (توصیه شده)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Manual Build

```bash
# Build
npm run build

# Test production build locally
npm start

# Deploy /out directory to your hosting
```

---

## 📝 Best Practices Checklist

قبل از commit:

- [ ] تمام TypeScript errors برطرف شده
- [ ] کد format شده (Prettier)
- [ ] No console.log در production
- [ ] Comments برای logic پیچیده
- [ ] Component documented
- [ ] Responsive design چک شده
- [ ] Accessibility (a11y) رعایت شده
- [ ] Performance optimized

---

## 🔧 Troubleshooting

### خطاهای رایج

#### 1. Module not found
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
```

#### 2. Type errors
```bash
# Regenerate types
npx tsc --noEmit
```

#### 3. Style not applied
```bash
# Rebuild Tailwind
npm run dev
```

---

## 📞 Support

برای سوالات و مشکلات:
- بررسی README.md
- مطالعه کد موجود
- جستجوی مستندات Next.js و React

---

**Happy Coding! 🚀**
