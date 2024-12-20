import React from 'react';

export function PromptTips() {
  return (
    <div className="text-sm text-gray-500">
      <p>Tips for better results:</p>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Include your target audience demographics</li>
        <li>Specify preferred content types (photos, videos, reels)</li>
        <li>Mention any specific requirements or restrictions</li>
        <li>Include your budget range if you have one in mind</li>
      </ul>
    </div>
  );
}