'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Globe, MapPin, Briefcase, Edit2, Trash2, ChevronDown } from 'lucide-react';
import { User as UserType } from '@/types/user.types';

/**
 * کامپوننت UserCard - کامپوننت Presentational
 * کارت زیبا با انیمیشن و قابلیت باز/بسته شدن
 */
interface UserCardProps {
  user: UserType;
  onEdit: (user: UserType) => void;
  onDelete: (id: number) => void;
  index: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(user.id);
    }, 300);
  };

  // Generate avatar URL
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=100&bold=true`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isDeleting ? 0 : 1, 
        y: isDeleting ? -20 : 0,
        scale: isDeleting ? 0.9 : 1
      }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 100
      }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-primary-100 shadow-lg">
              <img 
                src={avatarUrl} 
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
          </motion.div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-800 truncate">
              {user.name}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <User size={14} />
              @{user.username}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(user)}
              className="p-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
              title="ویرایش کاربر"
            >
              <Edit2 size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              title="حذف کاربر"
            >
              <Trash2 size={18} />
            </motion.button>
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={16} className="text-primary-500" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={16} className="text-secondary-500" />
            <span>{user.phone}</span>
          </div>
        </div>

        {/* Expand Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          <span>{isExpanded ? 'نمایش کمتر' : 'نمایش بیشتر'}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.button>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-gray-100 space-y-3">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Globe size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <a 
                  href={`https://${user.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 transition-colors break-all"
                >
                  {user.website}
                </a>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                <span>
                  {user.address.suite}, {user.address.street}, {user.address.city} - {user.address.zipcode}
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Briefcase size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">{user.company.name}</p>
                  <p className="text-xs text-gray-500 italic">{user.company.catchPhrase}</p>
                  <p className="text-xs text-gray-400 mt-1">{user.company.bs}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"></div>
    </motion.div>
  );
};

export default UserCard;
