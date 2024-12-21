import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import { useMessages } from '@/hooks/useMessages';
import { useApplications } from '@/hooks/useApplications';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { ApplicationActions } from './ApplicationActions';
import { useAuth } from '@/hooks/useAuth';

interface ChatWindowProps {
  conversationId: string;
  campaignId: string;
  receiverId: string;
  receiverName: string;
  onClose: () => void;
  onBack?: () => void;
}

export function ChatWindow({ 
  conversationId,
  campaignId,
  receiverId,
  receiverName,
  onClose,
  onBack
}: ChatWindowProps) {
  const { messages, loading, sendMessage } = useMessages(conversationId);
  const { applications } = useApplications();
  const { user } = useAuth();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const findApplication = async () => {
      const app = applications.find(a => 
        a.campaignId === campaignId && 
        a.creatorId === receiverId &&
        a.status === 'pending'
      );
      if (app) {
        setApplicationId(app.id);
        // Only show actions for pending applications
        setShowActions(true);
      }
    };

    findApplication();
  }, [applications, campaignId, receiverId]);

  const handleSend = async (content: string) => {
    try {
      await sendMessage(content, receiverId, campaignId);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleActionComplete = () => {
    setShowActions(false);
    onClose();
  };

  const isBrand = user?.uid && applications.some(app => app.brandId === user.uid);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed inset-0 z-50 md:inset-auto md:right-4 md:bottom-4 md:w-96 md:h-[600px] bg-white rounded-xl shadow-xl flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center">
          {onBack && (
            <button onClick={onBack} className="mr-3">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
          )}
          <div className="flex-1">
            <h3 className="font-medium">{receiverName}</h3>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Messages */}
        <MessageList messages={messages} />

        {/* Application Actions for Brand isBrand && applicationId && showActions &&*/}
        { (
          <div className="px-4 py-2 border-t">
            <ApplicationActions 
              applicationId={applicationId}
              onActionComplete={handleActionComplete}
            />
          </div>
        )}

        {/* Input */}
        <MessageInput onSend={handleSend} disabled={loading} />
      </motion.div>
    </AnimatePresence>
  );
}