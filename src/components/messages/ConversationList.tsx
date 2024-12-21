import React from 'react';
import { motion } from 'framer-motion';
import { formatRelativeTime } from '@/utils/format';
import type { Conversation } from '@/types/messages';

interface ConversationListProps {
  conversations: Conversation[];
  onSelect: (conversation: Conversation) => void;
  selectedId?: string;
}

export function ConversationList({ conversations, onSelect, selectedId }: ConversationListProps) {
  return (
    <div className="divide-y">
      {conversations.map((conversation) => (
        <motion.button
          key={conversation.id}
          onClick={() => onSelect(conversation)}
          className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
            selectedId === conversation.id ? 'bg-indigo-50' : ''
          }`}
          whileHover={{ x: 4 }}
        >
          <div className="flex justify-between items-start">
            <div>
              {/* <h4 className="font-medium text-gray-900">Campaign: {conversation.campaignId}</h4> */}
              {conversation.lastMessage && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                  {conversation.lastMessage.content}
                </p>
              )}
            </div>
            {conversation.lastMessage && (
              <span className="text-xs text-gray-500">
                {formatRelativeTime(conversation.lastMessage.createdAt)}
              </span>
            )}
          </div>
        </motion.button>
      ))}
    </div>
  );
}