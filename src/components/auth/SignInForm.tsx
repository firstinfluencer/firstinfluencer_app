import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { AuthFormLayout } from './AuthFormLayout';

interface SignInFormProps {
  type: 'brand' | 'creator';
  onBack: () => void;
  onToggleMode: () => void;
}

export function SignInForm({ type, onBack, onToggleMode }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast.success('Welcome back!');
      navigate(type === 'brand' ? '/brand-dashboard' : '/creator-dashboard');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <AuthFormLayout
      title="Welcome back"
      subtitle={type === 'brand' 
        ? 'Sign in to manage your brand campaigns' 
        : 'Sign in to connect with amazing brands'
      }
      onBack={onBack}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {type === 'brand' ? 'Work Email' : 'Email address'}
          </label>
          <div className="mt-1 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={type === 'brand' ? 'you@company.com' : 'you@example.com'}
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </button>
          </div>
          <div className="mt-1 relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
            type === 'brand'
              ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800'
              : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
          }`}
        >
          Sign in
        </motion.button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onToggleMode}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </button>
        </p>
      </form>
    </AuthFormLayout>
  );
}