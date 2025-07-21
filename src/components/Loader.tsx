import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', text }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizeClasses[size]} relative`}
      >
        <div className="w-full h-full border-2 border-transparent border-t-[#9945FF] border-r-[#14F195] rounded-full animate-spin">
          <div className="absolute inset-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-full flex items-center justify-center">
            <Zap className="w-1/2 h-1/2 text-white" />
          </div>
        </div>
      </motion.div>
      
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-300 text-sm font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;