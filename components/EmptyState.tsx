'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserX, Search } from 'lucide-react';

/**
 * کامپوننت EmptyState
 * نمایش داده می‌شود وقتی کاربری پیدا نشود
 */
interface EmptyStateProps {
  message?: string;
  isSearching?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "کاربری یافت نشد", 
  isSearching = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="mb-6"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-xl"></div>
          <div className="relative p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-full">
            {isSearching ? (
              <Search size={64} className="text-primary-500" />
            ) : (
              <UserX size={64} className="text-primary-500" />
            )}
          </div>
        </div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-bold text-gray-800 mb-2"
      >
        {message}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 text-center max-w-md"
      >
        {isSearching 
          ? "معیارهای جستجوی خود را تنظیم کنید یا جستجو را پاک کنید تا تمام کاربران را ببینید."
          : "هنوز کاربری در سیستم وجود ندارد. برای شروع یک کاربر ایجاد کنید!"
        }
      </motion.p>

      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default EmptyState;
