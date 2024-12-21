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
import { CampaignEditForm } from '@/modules/brand/components/campaigns/details/CampaignEditForm';
import { useGemini } from '@/hooks/useGemini';
import { useCampaigns } from '@/hooks/useCampaigns';
import { parseCampaignFromAI } from '@/utils/campaign';

type Step = 'select' | 'ai-prompt' | 'ai-preview' | 'manual' | 'edit';

export function CreateCampaignPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('select');
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [campaignData, setCampaignData] = useState<any>(null);
  
  const { loading: aiLoading, generateSuggestions } = useGemini();
  const { launchCampaign } = useCampaigns();

  const handleTypeSelect = (type: 'ai' | 'manual') => {
    setStep(type === 'ai' ? 'ai-prompt' : 'manual');
  };

  const handleBack = () => {
    if (step === 'ai-preview') {
      setStep('ai-prompt');
    } else if (step === 'edit') {
      setStep('ai-preview');
    } else {
      setStep('select');
      setPrompt('');
      setSuggestions(null);
      setCampaignData(null);
    }
  };

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) return;
    
    try {
      const response = await generateSuggestions(prompt);
      setSuggestions(response);
      const parsed = parseCampaignFromAI(response);
      setCampaignData(parsed);
      setStep('ai-preview');
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast.error('Failed to generate campaign suggestions');
    }
  };

  const handleEdit = () => {
    setStep('edit');
  };

  const handleSave = async (data: any) => {
    setCampaignData(data);
    setStep('ai-preview');
  };

  const handleLaunch = async () => {
    if (!campaignData) return;

    try {
      await launchCampaign(campaignData);
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
          <CampaignTypeSelector onSelect={handleTypeSelect} />
        )}

        {step === 'ai-prompt' && (
          <PromptStep
            value={prompt}
            onChange={setPrompt}
            onSubmit={handlePromptSubmit}
            onBack={handleBack}
            loading={aiLoading}
          />
        )}

        {step === 'ai-preview' && suggestions && campaignData && (
          <CampaignPreview
            suggestions={suggestions}
            onBack={handleBack}
            onLaunch={handleLaunch}
            onEdit={handleEdit}
          />
        )}

        {step === 'edit' && campaignData && (
          <CampaignEditForm
            campaign={campaignData}
            onSave={handleSave}
            onCancel={handleBack}
          />
        )}

        {step === 'manual' && (
          <ManualCampaignCreator onBack={handleBack} />
        )}
      </div>
    </BrandDashboardLayout>
  );
}