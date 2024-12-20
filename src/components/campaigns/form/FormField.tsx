import React from 'react';
import { formatCurrency } from '@/utils/format';

interface FormFieldProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (value: string) => void;
  helperText?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  isCurrency?: boolean;
}

export function FormField({ 
  label, 
  type, 
  value, 
  onChange, 
  helperText, 
  required,
  min,
  max,
  step,
  isCurrency
}: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (type === 'number') {
      // Ensure valid number input
      if (!newValue || Number.isNaN(Number(newValue))) return;
      if (min !== undefined && Number(newValue) < min) return;
      if (max !== undefined && Number(newValue) > max) return;
    }
    onChange(newValue);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {isCurrency && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
        )}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            isCurrency ? 'pl-8' : ''
          }`}
          required={required}
          min={min}
          max={max}
          step={step}
        />
      </div>
      {isCurrency && typeof value === 'number' && (
        <p className="mt-1 text-sm text-gray-500">
          {formatCurrency(value)}
        </p>
      )}
      {helperText && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}