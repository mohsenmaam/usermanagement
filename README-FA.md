# 🎯 سیستم مدیریت کاربران

یک سیستم مدیریت کاربران زیبا و مدرن ساخته شده با **Next.js 14**، **React**، **TypeScript** و **TailwindCSS**.

![نسخه](https://img.shields.io/badge/version-1.0.0-blue.svg)
![لایسنس](https://img.shields.io/badge/license-MIT-green.svg)

---

## ✨ ویژگی‌های کلیدی

### 🎨 رابط کاربری مدرن و زیبا
- ✅ طراحی **RTL** برای زبان فارسی
- ✅ استفاده از **فونت وزیر**
- ✅ انیمیشن‌های روان با **Framer Motion**
- ✅ **Responsive Design** برای تمام دستگاه‌ها
- ✅ رنگ‌بندی **Gradient** زیبا (آبی + بنفش)
- ✅ افکت **Glass Morphism**

### 🔧 عملکرد کامل CRUD
- ✅ **مشاهده** لیست کاربران با Grid Layout
- ✅ **ایجاد** کاربر جدید با فرم کامل
- ✅ **ویرایش** اطلاعات کاربران
- ✅ **حذف** کاربران با انیمیشن
- ✅ **جستجو** بر اساس نام و ایمیل

### 🏗️ معماری حرفه‌ای
- ✅ اصول **SOLID** در تمام کد
- ✅ الگوی **Container/Presentational**
- ✅ الگوی **Service Layer**
- ✅ **Custom Hooks** برای Reusability
- ✅ **Type Safe** با TypeScript 100%

---

## 🚀 شروع سریع

### پیش‌نیازها

```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### نصب

```bash
# کلون کردن پروژه
git clone [آدرس ریپازیتوری]

# ورود به پوشه پروژه
cd user-management-system

# نصب وابستگی‌ها
npm install

# اجرای سرور Development
npm run dev

# باز کردن مرورگر
# http://localhost:3000
```

### Build برای Production

```bash
# ساخت نسخه نهایی
npm run build

# اجرای نسخه Production
npm start
```

---

## 📁 ساختار پروژه

```
user-management-system/
│
├── 📱 app/                        # Next.js App Router
│   ├── page.tsx                  # صفحه اصلی (Dashboard)
│   ├── layout.tsx                # Layout اصلی با RTL
│   ├── globals.css               # استایل‌های Global
│   ├── loading.tsx               # صفحه Loading
│   ├── error.tsx                 # صفحه Error
│   └── not-found.tsx             # صفحه 404
│
├── 🎨 components/                 # کامپوننت‌های React
│   ├── SearchBar.tsx             # نوار جستجو
│   ├── UserCard.tsx              # کارت کاربر
│   ├── UserForm.tsx              # فرم ایجاد/ویرایش
│   ├── UserList.tsx              # لیست کاربران
│   ├── LoadingSpinner.tsx        # انیمیشن Loading
│   ├── EmptyState.tsx            # حالت خالی
│   ├── StatsCard.tsx             # کارت آمار
│   └── ToastProvider.tsx         # نوتیفیکیشن‌ها
│
├── 🔧 hooks/                      # Custom Hooks
│   ├── useUsers.ts               # مدیریت کاربران
│   └── useUserForm.ts            # مدیریت فرم
│
├── 🌐 services/                   # لایه Service
│   ├── api.service.ts            # کلاس پایه API
│   └── user.service.ts           # عملیات کاربر
│
├── 📦 types/                      # تایپ‌های TypeScript
│   └── user.types.ts             # تایپ‌های کاربر
│
└── 🛠️ lib/                        # ابزارهای کمکی
    ├── constants.ts              # مقادیر ثابت
    └── utils.ts                  # توابع Helper
```

---

## 🎨 تکنولوژی‌های استفاده شده

| تکنولوژی | نسخه | کاربرد |
|---------|------|--------|
| **Next.js** | 14.0 | فریمورک React |
| **React** | 18.2 | کتابخانه UI |
| **TypeScript** | 5.2 | Type Safety |
| **Tailwind CSS** | 3.3 | استایل‌دهی |
| **Framer Motion** | 10.16 | انیمیشن |
| **Axios** | 1.6 | HTTP Client |
| **Lucide React** | 0.294 | آیکون‌ها |
| **React Hot Toast** | 2.4 | نوتیفیکیشن |

---

## 💡 ویژگی‌های منحصر به فرد

### 1. **فارسی‌سازی کامل**
- RTL Layout
- فونت وزیر
- تمام متن‌ها به فارسی
- Placeholder های فارسی

### 2. **انیمیشن‌های پیشرفته**
```tsx
// انیمیشن ورودی کارت‌ها
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
>
```

### 3. **معماری تمیز**
```typescript
// جدا کردن Logic از UI
const { users, loading, fetchUsers } = useUsers();
const { createUser, updateUser } = useUserForm();
```

### 4. **Form Validation قوی**
```typescript
// اعتبارسنجی Real-time
if (!data.name || data.name.trim().length < 3) {
  errors.name = 'نام باید حداقل 3 کاراکتر باشد';
}
```

---

## 🎯 نمونه استفاده

### ایجاد کاربر جدید

```typescript
// در کامپوننت
const handleCreateUser = async (formData: FormData) => {
  const success = await createUser(formData);
  if (success) {
    toast.success('کاربر با موفقیت ایجاد شد!');
  }
};
```

### جستجوی کاربران

```typescript
// جستجوی Real-time
const handleSearch = (query: string) => {
  searchUsers(query);
};
```

---

## 🔥 ویژگی‌های UI/UX

### 🎨 رنگ‌بندی
```css
/* Primary: آبی */
--primary-500: #0ea5e9;

/* Secondary: بنفش */
--secondary-500: #a855f7;

/* Gradient Background */
background: linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%);
```

### ✨ انیمیشن‌ها
- ✅ Page Transitions
- ✅ Hover Effects
- ✅ Loading States
- ✅ Stagger Animations
- ✅ Smooth Scrolling

---

## 📊 عملکرد

- ✅ **Performance**: Optimized با Next.js 14
- ✅ **SEO Ready**: Meta tags کامل
- ✅ **Accessibility**: ARIA labels
- ✅ **Mobile First**: Responsive Design
- ✅ **Fast Load**: Code Splitting

---

## 🛠️ دستورات مفید

```bash
# اجرای Development Server
npm run dev

# Build برای Production
npm run build

# اجرای Production Server
npm start

# بررسی Lint
npm run lint

# Format کردن کد
npm run format
```

---

## 📚 مستندات توسعه

برای اطلاعات بیشتر در مورد توسعه پروژه، فایل [DEVELOPMENT.md](./DEVELOPMENT.md) را مطالعه کنید.

### مباحث مهم:
- 📖 معماری پروژه
- 🔧 افزودن ویژگی جدید
- 🎨 استایل‌دهی
- ✅ تست
- 🚀 Deploy

---

## 🌟 Screenshots

### صفحه اصلی
```
┌─────────────────────────────────┐
│  مدیریت کاربران                │
│  سیستم داشبورد مدرن             │
├─────────────────────────────────┤
│  🔍 جستجو...                   │
├─────────────────────────────────┤
│  📊 تعداد کاربران: 10          │
├─────────────────────────────────┤
│  [کارت کاربر 1] [کارت کاربر 2] │
│  [کارت کاربر 3] [کارت کاربر 4] │
└─────────────────────────────────┘
```

---

## 🤝 مشارکت

مشارکت شما استقبال می‌شود! لطفاً:

1. Fork کنید
2. Branch جدید بسازید (`git checkout -b feature/amazing-feature`)
3. Commit کنید (`git commit -m 'Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request باز کنید

---

## 📝 License

این پروژه تحت لایسنس MIT منتشر شده است - فایل [LICENSE](./LICENSE) را ببینید.

---

## 👨‍💻 سازنده

ساخته شده با ❤️ برای جامعه توسعه‌دهندگان ایرانی

---

## 📞 پشتیبانی

اگر سوالی دارید:
- 📧 ایمیل: your-email@example.com
- 💬 Issue: [GitHub Issues](لینک به Issues)
- 📖 مستندات: [Wiki](لینک به Wiki)

---

## 🎉 تشکر ویژه

از تمام توسعه‌دهندگانی که در ساخت این ابزارها مشارکت داشتند:
- Next.js Team
- Vercel
- Tailwind CSS
- Framer Motion
- و همه کتابخانه‌های Open Source

---

**⭐ اگر این پروژه را دوست داشتید، لطفاً یک Star بدهید!**
