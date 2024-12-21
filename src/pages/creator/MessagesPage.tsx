import React, { useState } from 'react';
import { CreatorDashboardLayout } from '@/modules/creator/components/layout/CreatorDashboardLayout';
import { useMessages } from '@/hooks/useMessages';
import { ConversationList } from '@/components/messages/ConversationList';
import { ChatWindow } from '@/components/messages/ChatWindow';
import type { Conversation } from '@/types/messages';

export function CreatorMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const { conversations } = useMessages();

  return (
    <CreatorDashboardLayout>
      <div className="max-w-7xl mx-auto py-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-3">
            {/* Conversations List */}
            <div className="border-r">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Messages</h2>
              </div>
              <ConversationList
                conversations={conversations}
                onSelect={setSelectedConversation}
                selectedId={selectedConversation?.id}
              />
            </div>

            {/* Chat Area */}
            <div className="col-span-2">
              {selectedConversation ? (
                <ChatWindow
                  conversationId={selectedConversation.id}
                  campaignId={selectedConversation.campaignId}
                  receiverId={selectedConversation.brandId}
                  receiverName="Brand" // This should come from brand profile
                  onClose={() => setSelectedConversation(null)}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select a conversation to start messaging
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CreatorDashboardLayout>
  );
}