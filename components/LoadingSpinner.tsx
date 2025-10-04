'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

/**
 * LoadingSpinner Component
 * Beautiful loading animation
 */
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 1, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity }
        }}
      >
        <Loader2 size={48} className="text-primary-500" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-gray-600 font-medium"
      >
        Loading users...
      </motion.p>
      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 0.6, 
              repeat: Infinity,
              delay: i * 0.1
            }}
            className="w-2 h-2 rounded-full bg-primary-500"
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
