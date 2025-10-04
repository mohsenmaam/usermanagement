'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, RefreshCw, Sparkles } from 'lucide-react';
import { useUsers } from '@/hooks/useUsers';
import { useUserForm } from '@/hooks/useUserForm';
import { User } from '@/types/user.types';
import SearchBar from '@/components/SearchBar';
import UserList from '@/components/UserList';
import UserForm from '@/components/UserForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';

/**
 * کامپوننت صفحه اصلی - کامپوننت Container
 * مدیریت تمام عملیات کاربران و state با پشتیبانی SSR
 */
export default function HomePage() {
  const { users, loading, error, fetchUsers, deleteUser, searchUsers } = useUsers();
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
    onSuccess: (user) => {
      toast.success(selectedUser ? 'کاربر با موفقیت به‌روزرسانی شد!' : 'کاربر با موفقیت ایجاد شد!');
      fetchUsers();
      handleCloseForm();
    }
  });

  const handleOpenForm = (user?: User) => {
    setSelectedUser(user);
    clearErrors();
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedUser(undefined);
    clearErrors();
  };

  const handleSubmit = async (formData: FormData) => {
    if (selectedUser) {
      return await updateUser(selectedUser.id, formData);
    } else {
      return await createUser(formData);
    }
  };

  const handleDelete = async (id: number) => {
    const success = await deleteUser(id);
    if (success) {
      toast.success('کاربر با موفقیت حذف شد!');
    } else {
      toast.error('خطا در حذف کاربر');
    }
  };

  const handleSearch = (query: string) => {
    setIsSearching(!!query);
    searchUsers(query);
  };

  const handleRefresh = () => {
    fetchUsers();
    toast.success('لیست کاربران به‌روزرسانی شد!');
  };

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
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
                  سیستم داشبورد مدرن
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
          className="mb-8"
        >
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
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

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg"
          >
            <p className="text-red-700 font-medium">{error}</p>
          </motion.div>
        )}

        {/* User List */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <UserList
              users={users}
              onEdit={handleOpenForm}
              onDelete={handleDelete}
              isSearching={isSearching}
            />
          </motion.div>
        )}
      </main>

      {/* User Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <UserForm
            user={selectedUser}
            onSubmit={handleSubmit}
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
    </div>
  );
}
