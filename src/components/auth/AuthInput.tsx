import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AuthInputProps {
  icon: LucideIcon;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

export function AuthInput({
  icon: Icon,
  label,
  type,
  value,
  onChange,
  placeholder,
  required = true,
}: AuthInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative group">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-hover:text-indigo-500" />
        <motion.input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-12 pl-10 block w-full rounded-xl border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white"
          required={required}
          whileFocus={{ scale: 1.01 }}
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity -z-10" />
      </div>
    </div>
  );
}