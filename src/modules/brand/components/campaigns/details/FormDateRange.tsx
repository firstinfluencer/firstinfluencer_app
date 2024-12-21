import React from 'react';
import { formatDateForInput } from '@/utils/format/date';

interface FormDateRangeProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

export function FormDateRange({ startDate, endDate, onStartDateChange, onEndDateChange }: FormDateRangeProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Duration</label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Start Date</label>
          <input
            type="date"
            value={formatDateForInput(startDate)}
            onChange={(e) => onStartDateChange(e.target.value)}
            min={formatDateForInput(new Date())}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">End Date</label>
          <input
            type="date"
            value={formatDateForInput(endDate)}
            onChange={(e) => onEndDateChange(e.target.value)}
            min={formatDateForInput(startDate)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
      </div>
    </div>
  );
}