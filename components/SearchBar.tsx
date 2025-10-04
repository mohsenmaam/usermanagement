'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

/**
 * کامپوننت SearchBar - کامپوننت Presentational
 * نوار جستجوی زیبا با انیمیشن و قابلیت پاک کردن
 */
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'جستجوی کاربران بر اساس نام یا ایمیل...', 
  className = '' 
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    onSearch(value);
  }, [onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');
  }, [onSearch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative ${className}`}
    >
      <div className={`
        relative flex items-center bg-white rounded-xl shadow-lg
        transition-all duration-300 overflow-hidden
        ${isFocused ? 'ring-2 ring-primary-500 shadow-xl' : 'shadow-md'}
      `}>
        {/* Search Icon */}
        <motion.div
          animate={{ scale: isFocused ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute left-4 text-gray-400"
        >
          <Search size={20} />
        </motion.div>

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            w-full py-4 pl-12 pr-12 text-gray-700 bg-transparent
            placeholder-gray-400 outline-none text-base
          "
        />

        {/* Clear Button */}
        {query && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClear}
            className="
              absolute right-4 p-1 rounded-full
              bg-gray-200 hover:bg-gray-300
              transition-colors duration-200
            "
          >
            <X size={16} className="text-gray-600" />
          </motion.button>
        )}
      </div>

      {/* Animated Search Indicator */}
      {query && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          style={{ originX: 0 }}
        />
      )}
    </motion.div>
  );
};

export default SearchBar;
