'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User as UserType } from '@/types/user.types';
import UserCard from './UserCard';
import EmptyState from './EmptyState';

/**
 * کامپوننت UserList - کامپوننت Container
 * مدیریت لیست کاربران با چیدمان Grid
 */
interface UserListProps {
  users: UserType[];
  onEdit: (user: UserType) => void;
  onDelete: (id: number) => void;
  isSearching?: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete, isSearching = false }) => {
  if (users.length === 0) {
    return <EmptyState isSearching={isSearching} message={isSearching ? "هیچ کاربری با جستجوی شما مطابقت ندارد" : "کاربری یافت نشد"} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {users.map((user, index) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
            index={index}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserList;
