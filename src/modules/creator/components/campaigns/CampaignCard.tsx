import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Tag } from 'lucide-react';
import { Campaign } from '@/types';
import { formatCurrency, formatDate } from '@/utils/format';
import { ApplyModal } from '@/components/campaigns/ApplyModal';
import { ChatWindow } from '@/components/messages/ChatWindow';
import { CampaignDetailsView } from './CampaignDetailsView';
import { useMessages } from '@/hooks/useMessages';
import { toast } from 'react-hot-toast';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [conversationId, setConversationId] = useState<string>();
  const { sendMessage } = useMessages();

  const handleApply = async (proposal: string, rate: number) => {
    try {
      const newConversationId = await sendMessage(
        `Application for "${campaign.title}"\n\nProposal: ${proposal}\nRate: ${formatCurrency(rate)}`,
        campaign.brandId,
        campaign.id
      );
      
      setShowApplyModal(false);
      setConversationId(newConversationId);
      setShowChat(true);
      toast.success('Application sent successfully!');
    } catch (error) {
      console.error('Error applying to campaign:', error);
      toast.error('Failed to send application');
    }
  };

  if (showDetails) {
    return <CampaignDetailsView campaign={campaign} onBack={() => setShowDetails(false)} />;
  }

  return (
    <>
      <motion.div
        className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setShowDetails(true)}
        whileHover={{ y: -2 }}
      >
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{campaign.title}</h3>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-3 bg-gray-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-gray-500 mb-1" />
              <p className="text-sm font-medium">{formatCurrency(campaign.budget)}</p>
              <p className="text-xs text-gray-500">Budget</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-500 mb-1" />
              <p className="text-sm font-medium">{formatDate(campaign.startDate)}</p>
              <p className="text-xs text-gray-500">Start Date</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <Tag className="w-5 h-5 text-gray-500 mb-1" />
              <p className="text-sm font-medium">{campaign.category}</p>
              <p className="text-xs text-gray-500">Category</p>
            </div>
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setShowApplyModal(true);
            }}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Apply Now
          </motion.button>
        </div>
      </motion.div>

      {showApplyModal && (
        <ApplyModal
          campaign={campaign}
          onClose={() => setShowApplyModal(false)}
          onApply={handleApply}
        />
      )}

      {showChat && conversationId && (
        <ChatWindow
          conversationId={conversationId}
          campaignId={campaign.id}
          receiverId={campaign.brandId}
          receiverName="Brand"
          onClose={() => setShowChat(false)}
        />
      )}
    </>
  );
}