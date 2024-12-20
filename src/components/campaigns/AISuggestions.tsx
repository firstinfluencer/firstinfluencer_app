import React from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle } from 'lucide-react';

interface AISuggestionsProps {
  suggestions: string;
}

export function AISuggestions({ suggestions }: AISuggestionsProps) {
  // Parse and format the response
  const formatResponse = (text: string) => {
    // Split by newlines and filter empty lines
    const lines = text.split('\n').filter(line => line.trim());
    
    // Group content
    const sections: { title?: string; content: string[] }[] = [];
    let currentSection: { title?: string; content: string[] } = { content: [] };

    lines.forEach(line => {
      // Check if line is a heading (starts with # or is all caps)
      if (line.startsWith('#') || /^[A-Z\s]{3,}$/.test(line.trim())) {
        if (currentSection.content.length > 0) {
          sections.push(currentSection);
        }
        currentSection = {
          title: line.replace('#', '').trim(),
          content: []
        };
      } else {
        // Check if line is a bullet point
        if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
          currentSection.content.push(line.trim().replace(/^[•-]\s*/, ''));
        } else {
          currentSection.content.push(line.trim());
        }
      }
    });

    // Add the last section
    if (currentSection.content.length > 0) {
      sections.push(currentSection);
    }

    return sections;
  };

  // Format text with bold sections
  const formatBoldText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove asterisks and wrap in bold tag
        return (
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const formattedSections = formatResponse(suggestions);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-lg bg-indigo-100">
          <Bot className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-lg font-semibold">AI Suggestions</h2>
      </div>

      <div className="space-y-6">
        {formattedSections.map((section, index) => (
          <div key={index} className="space-y-3">
            {section.title && (
              <h3 className="text-lg font-semibold text-gray-900">
                {formatBoldText(section.title)}
              </h3>
            )}
            <div className="space-y-2">
              {section.content.map((line, lineIndex) => (
                <div key={lineIndex} className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600">{formatBoldText(line)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}