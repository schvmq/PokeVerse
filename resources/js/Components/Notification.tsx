import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Notification = ({ message, type, onClose }: NotificationProps) => {
  useEffect(() => {
    // Auto-dismiss after 4 seconds
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200',
    error: 'bg-red-950/90 border-red-500/50 text-red-200',
    info: 'bg-blue-950/90 border-blue-500/50 text-blue-200',
  };

  const iconColors = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <motion.div
      // Slide down from top-right
      initial={{ opacity: 0, y: -20, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, x: 10, scale: 0.95 }}
      className={`fixed top-6 right-6 z-[100] flex items-center gap-4 px-6 py-4 rounded-xl border backdrop-blur-md shadow-2xl ${bgColors[type]} min-w-[280px] max-w-md`}
    >
      {/* Status Dot */}
      <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${iconColors[type]}`} />
      
      <div className="flex-1">
        <p className="font-medium text-sm tracking-wide">{message}</p>
      </div>

      <button 
        onClick={onClose}
        className="opacity-50 hover:opacity-100 transition-opacity"
      >
        ×
      </button>
    </motion.div>
  );
};