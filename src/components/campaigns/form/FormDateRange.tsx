import React from 'react';
import { formatDateForInput } from '@/utils/format/date';

interface FormDateRangeProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

export function FormDateRange({ startDate, endDate, onStartDateChange, onEndDateChange }: FormDateRangeProps) {
  // Ensure valid dates and format them correctly
  const formattedStartDate = startDate instanceof Date && !isNaN(startDate.getTime())
    ? formatDateForInput(startDate)
    : formatDateForInput(new Date()); // Default to today if invalid
    
  const formattedEndDate = endDate instanceof Date && !isNaN(endDate.getTime())
    ? formatDateForInput(endDate)
    : formatDateForInput(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)); // Default to 30 days from today

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <input
          type="date"
          value={formattedStartDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          min={formatDateForInput(new Date())} // Can't select past dates
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <input
          type="date"
          value={formattedEndDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          min={formattedStartDate} // Can't end before start date
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
    </div>
  );
}