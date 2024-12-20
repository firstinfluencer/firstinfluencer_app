import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Rocket, Bot, Edit } from 'lucide-react';

interface CampaignPreviewProps {
  suggestions: string;
  onBack: () => void;
  onLaunch: () => void;
  onEdit?: () => void;
}

export function CampaignPreview({ suggestions, onBack, onLaunch, onEdit }: CampaignPreviewProps) {
  const formatContent = (text: string) => {
    const sections = text.split('\n\n').filter(Boolean);
    
    return sections.map((section, index) => {
      const lines = section.split('\n');
      const title = lines[0];
      const content = lines.slice(1);

      return (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {formatBoldText(title)}
          </h3>
          <div className="space-y-2">
            {content.map((line, lineIndex) => (
              <p key={lineIndex} className="text-gray-600">
                {formatBoldText(line.replace(/^[•-]\s*/, '• '))}
              </p>
            ))}
          </div>
        </div>
      );
    });
  };

  const formatBoldText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <motion.button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to prompt</span>
        </motion.button>

        <div className="flex items-center space-x-4">
          {onEdit && (
            <motion.button
              onClick={onEdit}
              className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Edit className="w-5 h-5" />
              <span>Edit</span>
            </motion.button>
          )}

          <motion.button
            onClick={onLaunch}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Rocket className="w-5 h-5" />
            <span>Launch Campaign</span>
          </motion.button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-8 py-4 bg-gradient-to-r from-indigo-50 to-indigo-100 border-b border-indigo-100 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-white">
            <Bot className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="font-medium text-indigo-600">AI-Generated Campaign</span>
        </div>

        <div className="p-8 space-y-8">
          {formatContent(suggestions)}
        </div>
      </div>
    </div>
  );
}