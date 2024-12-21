import React from 'react';
import { motion } from 'framer-motion';
import { formatRelativeTime } from '@/utils/format/date';
import { useAuth } from '@/hooks/useAuth';
import { Message } from '@/types/messages';

interface BrandMessageProps {
  message: Message;
  isApplication?: boolean;
}

export function BrandMessage({ message, isApplication }: BrandMessageProps) {
  const { user } = useAuth();
  const isOwnMessage = message.senderId === user?.uid;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[70%] rounded-xl p-3 ${
          isOwnMessage
            ? 'bg-indigo-600 text-white'
            : isApplication
            ? 'bg-gradient-to-r from-pink-50 to-indigo-50 border border-indigo-100'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        {isApplication && (
          <div className="text-xs text-indigo-600 font-medium mb-2">
            Campaign Application
          </div>
        )}
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className={`text-xs mt-1 ${
          isOwnMessage ? 'text-indigo-200' : 'text-gray-500'
        }`}>
          {formatRelativeTime(message.createdAt)}
        </p>
      </div>
    </motion.div>
  );
}