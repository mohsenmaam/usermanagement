'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, User, Mail, Phone, Globe, MapPin, Briefcase, Loader2 } from 'lucide-react';
import { User as UserType } from '@/types/user.types';

/**
 * کامپوننت UserForm - کامپوننت Presentational
 * فرم زیبا با انیمیشن و اعتبارسنجی
 */
interface UserFormProps {
  user?: UserType;
  onSubmit: (formData: FormData) => Promise<boolean>;
  onClose: () => void;
  loading?: boolean;
  validationErrors?: Record<string, string>;
}

const UserForm: React.FC<UserFormProps> = ({ 
  user, 
  onSubmit, 
  onClose, 
  loading = false,
  validationErrors = {}
}) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    website: user?.website || '',
    city: user?.address?.city || '',
    companyName: user?.company?.name || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataObj = new FormData(e.currentTarget);
    const success = await onSubmit(formDataObj);
    if (success) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary-500 to-secondary-500 p-6">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X size={20} className="text-white" />
          </motion.button>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <User size={28} />
            {user ? 'ویرایش کاربر' : 'ایجاد کاربر جدید'}
          </h2>
          <p className="text-white/80 mt-1">
            {user ? 'به‌روزرسانی اطلاعات کاربر' : 'جزئیات را برای ایجاد کاربر جدید پر کنید'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <User size={16} className="text-primary-500" />
                نام کامل *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="علی احمدی"
                className={`
                  w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-primary-500/50
                  ${validationErrors.name 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-primary-500'
                  }
                `}
              />
              <AnimatePresence>
                {validationErrors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {validationErrors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <User size={16} className="text-secondary-500" />
                نام کاربری *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="ali_ahmadi"
                className={`
                  w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-primary-500/50
                  ${validationErrors.username 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-primary-500'
                  }
                `}
              />
              <AnimatePresence>
                {validationErrors.username && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {validationErrors.username}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail size={16} className="text-primary-500" />
                آدرس ایمیل *
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ali@example.com"
                className={`
                  w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-primary-500/50
                  ${validationErrors.email 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-primary-500'
                  }
                `}
              />
              <AnimatePresence>
                {validationErrors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {validationErrors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Phone size={16} className="text-green-500" />
                شماره تلفن *
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="09123456789"
                className={`
                  w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-primary-500/50
                  ${validationErrors.phone 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 focus:border-primary-500'
                  }
                `}
              />
              <AnimatePresence>
                {validationErrors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {validationErrors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Website Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Globe size={16} className="text-blue-500" />
                وبسایت
              </label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="example.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200"
              />
            </div>

            {/* City Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin size={16} className="text-red-500" />
                شهر
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="تهران"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200"
              />
            </div>

            {/* Company Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Briefcase size={16} className="text-orange-500" />
                نام شرکت
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="شرکت نمونه"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              انصراف
            </motion.button>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  در حال ذخیره...
                </>
              ) : (
                <>
                  <Save size={20} />
                  {user ? 'به‌روزرسانی' : 'ایجاد کاربر'}
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UserForm;
