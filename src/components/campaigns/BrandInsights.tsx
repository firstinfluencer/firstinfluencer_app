import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Target } from 'lucide-react';

interface BrandInsightsProps {
  insights: string;
  onUseInsights: (section: string) => void;
}

export function BrandInsights({ insights, onUseInsights }: BrandInsightsProps) {
  const sections = insights.split('\n\n').filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Bot className="w-5 h-5 text-indigo-600" />
        </div>
        <h3 className="text-lg font-semibold">AI Brand Analysis</h3>
      </div>

      <div className="space-y-8">
        {sections.map((section, index) => {
          const [title, ...content] = section.split('\n');
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-medium">{title}</h4>
                <motion.button
                  onClick={() => onUseInsights(section)}
                  className="flex items-center space-x-2 text-sm text-indigo-600"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Use these insights</span>
                </motion.button>
              </div>

              <div className="space-y-2">
                {content.map((line, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <Target className="w-4 h-4 text-gray-400 mt-1" />
                    <p className="text-gray-600">{line.trim()}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}