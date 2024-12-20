import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { AccountTypeSelector } from './AccountTypeSelector';
import { AuthForm } from './AuthForm';

type AccountType = 'brand' | 'creator' | null;
type AuthMode = 'signin' | 'signup';

export function UnifiedAuthForm() {
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signIn, signUp } = useAuth();

  const handleBack = () => {
    if (accountType) {
      setAccountType(null);
      setEmail('');
      setPassword('');
      setName('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountType) return;

    try {
      if (authMode === 'signup') {
        if (accountType === 'brand') {
          const domain = email.split('@')[1];
          const freeEmailProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
          if (freeEmailProviders.includes(domain)) {
            toast.error('Please use your work email address');
            return;
          }
        }
        await signUp(email, password);
        toast.success('Account created successfully! 🎉');
      } else {
        await signIn(email, password);
        toast.success('Welcome back! 👋');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center p-4">
      <motion.div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <AnimatePresence mode="wait">
              {!accountType ? (
                <AccountTypeSelector onSelect={setAccountType} />
              ) : (
                <AuthForm
                  type={accountType}
                  mode={authMode}
                  onBack={handleBack}
                  onSubmit={handleSubmit}
                  onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                  formData={{
                    email,
                    setEmail,
                    password,
                    setPassword,
                    name,
                    setName
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}