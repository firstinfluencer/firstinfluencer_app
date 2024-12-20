import React from 'react';

export const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <span className="text-white font-bold text-lg">ff</span>
      </div>
      
      <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        FirstInfluencer
      </span>
    </div>
  );
};