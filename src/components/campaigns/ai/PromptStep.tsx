import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { getCompanyFromEmail } from '@/utils/format';
import { PromptForm } from './PromptForm';
import { PromptTips } from './PromptTips';

interface PromptStepProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading?: boolean;
}

export function PromptStep(props: PromptStepProps) {
  const { user } = useAuth();
  const brandName = user?.email ? getCompanyFromEmail(user.email) : 'your brand';

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Create a campaign for {brandName}</h2>
        <p className="text-gray-600">
          Tell us about your campaign goals, target audience, and requirements. Our AI will help create the perfect campaign brief.
        </p>
      </div>

      <PromptForm {...props} />
      <PromptTips />
    </div>
  );
}