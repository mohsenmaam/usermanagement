# 🎯 سیستم مدیریت کاربران

یک سیستم مدیریت کاربران مدرن، زیبا و کاملاً ویژگی‌دار ساخته شده با **Next.js 14**، **React**، **TypeScript** و **TailwindCSS**. این پروژه بهترین شیوه‌های توسعه فرانت‌اند را نشان می‌دهد، از جمله اصول SOLID، معماری پاک و رابط کاربری/رابط کاربری شگفت‌انگیز.

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ ویژگی‌ها

### 🎨 رابط کاربری/رابط کاربری زیبا
- **طراحی مدرن**: رابط کاربری تمیز و حرفه‌ای با جلوه‌های گرادیانی
- **انیمیشن‌های صاف**: انیمیشن‌های Framer Motion در سراسر پروژه
- **طراحی واکنش‌گرا**: رابط کاربری عالی در موبایل، تبلت و دسکتاپ
- **جلوه‌های شیشه‌ای**: جلوه‌های مدرن شیشه‌ای
- **حالت تاریک**: پشتیبانی آسان از حالت تاریک
- **Modern Design**: Clean, professional interface with gradient effects
- **Smooth Animations**: Framer Motion powered animations throughout
- **Responsive Layout**: Perfect on mobile, tablet, and desktop
- **Glass Morphism**: Modern glassmorphism effects
- **Dark Mode Ready**: Easy to implement dark mode support

### 🏗️ Architecture & Code Quality
- **SOLID Principles**: Clean, maintainable, and scalable code
- **Container/Presentational Pattern**: Separation of concerns
- **Service Layer**: Isolated API logic
- **Custom Hooks**: Reusable business logic
- **TypeScript**: Full type safety
- **SSR/SSG Support**: Next.js 14 App Router

### 🔥 Functionality
- ✅ View all users with beautiful card layout
- ✅ Create new users with validation
- ✅ Edit existing users
- ✅ Delete users with confirmation
- ✅ Search users by name or email
- ✅ Real-time form validation
- ✅ Toast notifications
- ✅ Loading states and animations
- ✅ Error handling

## 📁 Project Structure

```
user-management-system/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page (Container Component)
│   └── globals.css         # Global styles and animations
├── components/
│   ├── SearchBar.tsx       # Search functionality
│   ├── UserCard.tsx        # Individual user card
│   ├── UserForm.tsx        # Create/Edit user form
│   ├── UserList.tsx        # Users grid layout
│   ├── LoadingSpinner.tsx  # Loading animation
│   └── EmptyState.tsx      # Empty state display
├── hooks/
│   ├── useUsers.ts         # Users management hook
│   └── useUserForm.ts      # Form management hook
├── services/
│   ├── api.service.ts      # Base API service
│   └── user.service.ts     # User-specific API calls
├── types/
│   └── user.types.ts       # TypeScript type definitions
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to project directory:**
```bash
cd user-management-system
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Run development server:**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Concepts Demonstrated

### 1. SOLID Principles

#### Single Responsibility Principle (SRP)
- Each component has one clear purpose
- Services handle only API communication
- Hooks manage specific business logic

#### Open/Closed Principle (OCP)
- `ApiService` can be extended without modification
- `UserService` extends base API functionality

#### Dependency Inversion Principle (DIP)
- Components depend on abstractions (hooks) not implementations
- Services use interfaces for type safety

### 2. Design Patterns

#### Container/Presentational Pattern
- **Container Components** (`page.tsx`): Manage state and business logic
- **Presentational Components** (`UserCard`, `UserForm`): Focus on UI rendering

#### Service Layer Pattern
- All API calls isolated in service classes
- Easy to test and mock
- Centralized error handling

#### Custom Hooks Pattern
- `useUsers`: Manages user data and operations
- `useUserForm`: Handles form state and validation
- Reusable across components

### 3. Modern React Practices

- **Server Components**: Next.js 14 App Router
- **Client Components**: Interactive UI with 'use client'
- **TypeScript**: Full type safety
- **Async/Await**: Modern async handling
- **Error Boundaries**: Graceful error handling

## 🎨 UI/UX Highlights

### Animations
- Page transitions with Framer Motion
- Card hover effects
- Form slide-in animations
- Loading spinners
- Success/Error toasts

### Color Scheme
- **Primary**: Blue tones (#0ea5e9)
- **Secondary**: Purple tones (#a855f7)
- **Gradients**: Smooth color transitions
- **Shadows**: Layered depth effects

### Responsive Design
- Mobile-first approach
- Grid layout adapts to screen size
- Touch-friendly buttons
- Optimized spacing

## 🔧 Technologies Used

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with SSR/SSG |
| **React 18** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animation library |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |
| **React Hot Toast** | Toast notifications |

## 📚 API Integration

This project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a fake REST API for demonstration purposes.

### Available Endpoints:
- `GET /users` - Fetch all users
- `GET /users/:id` - Fetch single user
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## 🎓 Learning Outcomes

By studying this project, you'll learn:

1. ✅ How to structure a scalable React/Next.js application
2. ✅ Implementing SOLID principles in frontend development
3. ✅ Creating reusable components and custom hooks
4. ✅ Working with TypeScript for type safety
5. ✅ Building beautiful, animated UIs with Tailwind and Framer Motion
6. ✅ Handling forms with validation
7. ✅ Managing async operations and loading states
8. ✅ Implementing search functionality
9. ✅ Using service layers for API communication
10. ✅ Best practices for code organization

## 🌟 Future Enhancements

- [ ] Add authentication
- [ ] Implement pagination
- [ ] Add user roles and permissions
- [ ] Dark mode toggle
- [ ] Export users to CSV
- [ ] Advanced filtering options
- [ ] User profile pages
- [ ] Activity logs
- [ ] Unit and integration tests
- [ ] Storybook for component documentation

## 📝 Code Examples

### Creating a Custom Hook
```typescript
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  
  const fetchUsers = async () => {
    setLoading(true);
    const data = await userService.getAllUsers();
    setUsers(data);
    setLoading(false);
  };
  
  return { users, loading, fetchUsers };
};
```

### Service Layer Pattern
```typescript
class UserService extends ApiService {
  async getAllUsers(): Promise<User[]> {
    return await this.get<User[]>('/users');
  }
}
```

## 🤝 Contributing

This is a portfolio project, but suggestions and improvements are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ as a portfolio project to demonstrate modern frontend development skills.

---

**Star ⭐ this repository if you find it helpful!**
