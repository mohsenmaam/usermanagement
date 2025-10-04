'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Error Component for App Router
 * Displayed when an error occurs
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Error Icon */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="inline-block mb-6"
          >
            <div className="p-6 bg-red-50 rounded-full">
              <AlertCircle size={64} className="text-red-500" />
            </div>
          </motion.div>

          {/* Error Message */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            We encountered an unexpected error. Don't worry, you can try again.
          </p>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-red-50 rounded-xl text-left">
              <p className="text-sm text-red-800 font-mono break-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Reset Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <RefreshCw size={20} />
            Try Again
          </motion.button>

          {/* Back to Home */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to Home
          </motion.a>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
