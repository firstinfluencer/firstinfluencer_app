import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthFormLayout } from './AuthFormLayout';
import { signUpBrand, signUpCreator } from '@/services/firebase/auth';

interface SignUpFormProps {
  type: 'brand' | 'creator';
  onBack: () => void;
  onToggleMode: () => void;
}

export function SignUpForm({ type, onBack, onToggleMode }: SignUpFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (type === 'brand') {
        const domain = email.split('@')[1];
        const freeEmailProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
        if (freeEmailProviders.includes(domain)) {
          toast.error('Please use your work email address');
          return;
        }

        await signUpBrand(email, password, {
          industry: '',
          website: '',
          description: '',
          location: ''
        });
        toast.success('Brand account created successfully!');
        navigate('/brand-dashboard');
      } else {
        await signUpCreator(email, password, {
          fullName: '',
          email,
          bio: '',
          categories: [],
          platforms: {},
          location: ''
        });
        toast.success('Creator account created successfully!');
        navigate('/creator-dashboard');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <AuthFormLayout
      title="Create your account"
      subtitle={type === 'brand' 
        ? 'Connect with amazing creators for your brand' 
        : 'Share your creativity with amazing brands'
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
              className="pl-10 block w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1 relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 block w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
          Create account
        </motion.button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onToggleMode}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </button>
        </p>
      </form>
    </AuthFormLayout>
  );
}