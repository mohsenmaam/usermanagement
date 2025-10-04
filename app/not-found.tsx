'use client';

import { motion } from 'framer-motion';
import { Search, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * Not Found Component (404 Page)
 * Displayed when a page is not found
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        {/* 404 Number */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="mb-8"
        >
          <h1 className="text-[150px] md:text-[200px] font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent leading-none">
            404
          </h1>
        </motion.div>

        {/* Icon */}
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
          className="inline-block mb-6"
        >
          <div className="p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-full">
            <Search size={64} className="text-primary-500" />
          </div>
        </motion.div>

        {/* Message */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Home size={20} />
              Back to Home
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="px-8 py-4 rounded-xl border-2 border-primary-500 text-primary-600 font-medium flex items-center gap-2 hover:bg-primary-50 transition-all duration-200"
          >
            <ArrowLeft size={20} />
            Go Back
          </motion.button>
        </div>

        {/* Decorative Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0.05, 0.15, 0.05],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-2xl"
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + i * 15}%`
              }}
            />
          ))}
        </div>

        {/* Floating Numbers */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {['4', '0', '4'].map((num, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
              className="absolute text-9xl font-bold text-primary-200"
              style={{
                left: `${15 + i * 35}%`,
                top: `${10 + i * 20}%`
              }}
            >
              {num}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
