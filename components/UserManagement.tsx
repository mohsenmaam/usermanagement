'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, RefreshCw, Sparkles } from 'lucide-react';
import { useUserForm } from '@/hooks/useUserForm';
import { User } from '@/types/user.types';
import SearchBar from '@/components/SearchBar';
import UserList from '@/components/UserList';
import UserForm from '@/components/UserForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast, { Toaster } from 'react-hot-toast';
import userService from '@/services/user.service';

/**
 * کامپوننت Client برای مدیریت کاربران
 * این کامپوننت تمام تعاملات client-side را مدیریت می‌کند
 */

interface UserManagementProps {
  initialUsers: User[];
}

export default function UserManagement({ initialUsers }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [isSearching, setIsSearching] = useState(false);

  // مقداردهی اولیه hook فرم کاربر
  const { 
    loading: formLoading, 
    error: formError, 
    validationErrors,
    createUser, 
    updateUser,
    clearErrors
  } = useUserForm({
    onSuccess: (user: User) => {
      if (selectedUser) {
        // به‌روزرسانی کاربر موجود
        setUsers(prev => prev.map(u => u.id === user.id ? user : u));
        setFilteredUsers(prev => prev.map(u => u.id === user.id ? user : u));
        toast.success('کاربر با موفقیت به‌روزرسانی شد!');
      } else {
        // افزودن کاربر جدید
        setUsers(prev => [user, ...prev]);
        setFilteredUsers(prev => [user, ...prev]);
        toast.success('کاربر با موفقیت ایجاد شد!');
      }
      handleCloseForm();
    }
  });

  // به‌روزرسانی filteredUsers هنگام تغییر users
  useEffect(() => {
    if (!isSearching) {
      setFilteredUsers(users);
    }
  }, [users, isSearching]);

  // دریافت مجدد کاربران از API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
      setFilteredUsers(data);
      toast.success('لیست کاربران به‌روزرسانی شد!');
    } catch (error) {
      toast.error('خطا در بارگذاری کاربران');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // حذف کاربر
  const deleteUser = async (id: number) => {
    try {
      await userService.deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      setFilteredUsers(prev => prev.filter(u => u.id !== id));
      toast.success('کاربر با موفقیت حذف شد!');
    } catch (error) {
      toast.error('خطا در حذف کاربر');
      console.error('Error deleting user:', error);
    }
  };

  // جستجوی کاربران
  const searchUsers = (query: string) => {
    if (!query.trim()) {
      setFilteredUsers(users);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const lowercaseQuery = query.toLowerCase();
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredUsers(filtered);
  };

  // باز کردن فرم برای ایجاد/ویرایش
  const handleOpenForm = (user?: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  // بستن فرم
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedUser(undefined);
    clearErrors();
  };

  // ارسال فرم
  const handleFormSubmit = async (formData: FormData) => {
    if (selectedUser) {
      await updateUser(selectedUser.id, formData);
    } else {
      await createUser(formData);
    }
  };

  // به‌روزرسانی لیست
  const handleRefresh = () => {
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo & Title */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur-md opacity-50"
                />
                <div className="relative p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl shadow-lg">
                  <Users className="text-white" size={32} />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  مدیریت کاربران
                </h1>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Sparkles size={14} className="text-yellow-500" />
                  سیستم داشبورد مدرن با SSR
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <RefreshCw size={18} />
                <span className="hidden sm:inline">به‌روزرسانی</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpenForm()}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus size={18} />
                <span>کاربر جدید</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SearchBar onSearch={searchUsers} />
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">تعداد کاربران</p>
                <motion.p
                  key={users.length}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
                >
                  {users.length}
                </motion.p>
              </div>
              <div className="p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl">
                <Users size={40} className="text-primary-500" />
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((users.length / 10) * 100, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {users.length < 10 ? `${10 - users.length} کاربر دیگر تا رسیدن به 10 کاربر` : 'عالی است! 🎉'}
            </p>
          </div>
        </motion.div>

        {/* User List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <UserList
              users={filteredUsers}
              onEdit={handleOpenForm}
              onDelete={deleteUser}
              isSearching={isSearching}
            />
          )}
        </motion.div>
      </main>

      {/* User Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <UserForm
            user={selectedUser}
            onSubmit={handleFormSubmit}
            onClose={handleCloseForm}
            loading={formLoading}
            validationErrors={validationErrors}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 py-8 text-center"
      >
        <div className="container mx-auto px-4">
          <p className="text-gray-600 text-sm">
            ساخته شده با ❤️ با استفاده از{' '}
            <span className="font-semibold text-primary-600">Next.js</span>،{' '}
            <span className="font-semibold text-secondary-600">React</span> و{' '}
            <span className="font-semibold text-primary-600">TailwindCSS</span>
          </p>
          <p className="text-gray-400 text-xs mt-2">
            © 1403 سیستم مدیریت کاربران. تمامی حقوق محفوظ است.
          </p>
        </div>
      </motion.footer>

      {/* Toast Notifications */}
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
            fontFamily: 'Vazir',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
    </div>
  );
}
