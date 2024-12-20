import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function PlanCreator() {
  const [planName, setPlanName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [searchMethod, setSearchMethod] = useState<'manual' | 'qoruz'>('manual');

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Create Plan</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name of the plan
          </label>
          <input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand Name
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add to the list by
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                checked={searchMethod === 'manual'}
                onChange={() => setSearchMethod('manual')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Manual addition</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={searchMethod === 'qoruz'}
                onChange={() => setSearchMethod('qoruz')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Search on Qoruz</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}