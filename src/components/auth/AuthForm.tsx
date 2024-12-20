import React from 'react';
import { motion } from 'framer-motion';
import { Building2, UserCircle } from 'lucide-react';
import { AuthInput } from './AuthInput';
import { AuthButton } from './AuthButton';

interface AuthFormProps {
  type: 'brand' | 'creator';
  mode: 'signin' | 'signup';
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onToggleMode: () => void;
  formData: {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    name: string;
    setName: (value: string) => void;
  };
}

export function AuthForm({ type, mode, onBack, onSubmit, onToggleMode, formData }: AuthFormProps) {
  const { email, setEmail, password, setPassword, name, setName } = formData;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center">
        <motion.div 
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-indigo-50 to-pink-50 flex items-center justify-center"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {type === 'brand' ? (
            <Building2 className="w-10 h-10 text-indigo-600" />
          ) : (
            <UserCircle className="w-10 h-10 text-pink-600" />
          )}
        </motion.div>

        <motion.h2 
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {mode === 'signup' ? 'Create your account' : 'Welcome back'}
        </motion.h2>
        <motion.p 
          className="text-gray-600 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {type === 'brand'
            ? 'Connect with amazing creators for your brand'
            : 'Share your creativity with amazing brands'}
        </motion.p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {mode === 'signup' && (
          <AuthInput
            icon={type === 'brand' ? Building2 : UserCircle}
            label={type === 'brand' ? 'Company Name' : 'Full Name'}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={type === 'brand' ? 'Your company name' : 'Your full name'}
          />
        )}

        <AuthInput
          icon={Building2}
          label={type === 'brand' ? 'Work Email' : 'Email address'}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={type === 'brand' ? 'you@company.com' : 'you@example.com'}
        />

        <AuthInput
          icon={Building2}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <AuthButton
          type="submit"
          variant={type}
        >
          {mode === 'signup' ? 'Create account' : 'Sign in'}
        </AuthButton>

        <p className="text-center text-sm text-gray-600">
          {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={onToggleMode}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {mode === 'signup' ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </form>
    </motion.div>
  );
}