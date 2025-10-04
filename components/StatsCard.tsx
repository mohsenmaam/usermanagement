'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

/**
 * StatsCard Component
 * Displays statistics with beautiful animations
 */
interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: 'primary' | 'secondary' | 'success' | 'warning';
  index?: number;
}

const colorClasses = {
  primary: {
    bg: 'from-blue-50 to-blue-100',
    icon: 'text-blue-500',
    text: 'text-blue-600',
  },
  secondary: {
    bg: 'from-purple-50 to-purple-100',
    icon: 'text-purple-500',
    text: 'text-purple-600',
  },
  success: {
    bg: 'from-green-50 to-green-100',
    icon: 'text-green-500',
    text: 'text-green-600',
  },
  warning: {
    bg: 'from-orange-50 to-orange-100',
    icon: 'text-orange-500',
    text: 'text-orange-600',
  },
};

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color,
  index = 0 
}) => {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium mb-2">{title}</p>
          <motion.p
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-4xl font-bold ${colors.text}`}
          >
            {value}
          </motion.p>
        </div>
        
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className={`p-4 bg-gradient-to-br ${colors.bg} rounded-2xl`}
        >
          <Icon size={32} className={colors.icon} />
        </motion.div>
      </div>

      {/* Progress Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
        className="mt-4 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
        style={{ originX: 0 }}
      />
    </motion.div>
  );
};

export default StatsCard;
