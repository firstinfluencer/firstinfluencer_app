import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BrandDashboardLayout } from '@/modules/brand/components/dashboard/BrandDashboardLayout';
import { CampaignTypeSelector } from '@/components/campaigns/CampaignTypeSelector';
import { PromptStep } from '@/components/campaigns/ai/PromptStep';
import { ManualCampaignCreator } from '@/components/campaigns/manual/ManualCampaignCreator';
import { CampaignPreview } from '@/components/campaigns/CampaignPreview';
import { CampaignLoadingScreen } from '@/components/campaigns/CampaignLoadingScreen';
import { useGemini } from '@/hooks/useGemini';
import { useCampaigns } from '@/hooks/useCampaigns';
import { parseCampaignFromAI } from '@/utils/campaign';

type Step = 'select' | 'ai-prompt' | 'ai-preview' | 'manual';

export function CreateCampaignPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('select');
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState<string | null>(null);
  
  const { loading: aiLoading, generateSuggestions } = useGemini();
  const { launchCampaign } = useCampaigns();

  const handleTypeSelect = (type: 'ai' | 'manual') => {
    setStep(type === 'ai' ? 'ai-prompt' : 'manual');
  };

  const handleBack = () => {
    if (step === 'ai-preview') {
      setStep('ai-prompt');
    } else {
      setStep('select');
      setPrompt('');
      setSuggestions(null);
    }
  };

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) return;
    
    try {
      const response = await generateSuggestions(prompt);
      setSuggestions(response);
      setStep('ai-preview');
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast.error('Failed to generate campaign suggestions');
    }
  };

  const handleLaunch = async () => {
    if (!suggestions) return;

    try {
      const parsedData = parseCampaignFromAI(suggestions);
      await launchCampaign(parsedData);
      toast.success('Campaign launched successfully!');
      navigate('/brand/campaigns');
    } catch (error) {
      console.error('Error launching campaign:', error);
      toast.error('Failed to launch campaign');
    }
  };

  return (
    <BrandDashboardLayout>
      {aiLoading && <CampaignLoadingScreen />}

      <div className="max-w-6xl mx-auto mt-24 px-6">
        {step === 'select' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CampaignTypeSelector onSelect={handleTypeSelect} />
          </motion.div>
        )}

        {step === 'ai-prompt' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PromptStep
              value={prompt}
              onChange={setPrompt}
              onSubmit={handlePromptSubmit}
              onBack={handleBack}
              loading={aiLoading}
            />
          </motion.div>
        )}

        {step === 'ai-preview' && suggestions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CampaignPreview
              suggestions={suggestions}
              onBack={handleBack}
              onLaunch={handleLaunch}
            />
          </motion.div>
        )}

        {step === 'manual' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ManualCampaignCreator onBack={handleBack} />
          </motion.div>
        )}
      </div>
    </BrandDashboardLayout>
  );
}