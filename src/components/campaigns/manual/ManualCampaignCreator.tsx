import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CampaignStepper } from './CampaignStepper';
import { CampaignInfoStep } from './CampaignInfoStep';
import { ProductStep } from './steps/ProductStep';
import { CreatorsStep } from './steps/CreatorsStep';
import { DeliverablesStep } from './steps/DeliverablesStep';
import { useCampaigns } from '@/hooks/useCampaigns';

interface ManualCampaignCreatorProps {
  onBack: () => void;
}

export function ManualCampaignCreator({ onBack }: ManualCampaignCreatorProps) {
  const navigate = useNavigate();
  const { launchCampaign } = useCampaigns();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Campaign Info
    name: '',
    goal: 'awareness' as const,
    minPrice: 0,
    maxPrice: 0,
    
    // Product
    productName: '',
    productDescription: '',
    productUrl: '',
    productImages: [] as string[],
    
    // Creators
    creatorType: 'micro' as const,
    categories: [] as string[],
    locations: [] as string[],
    
    // Deliverables
    platforms: {
      instagram: false,
      youtube: false,
      tiktok: false
    },
    contentTypes: {
      photos: false,
      videos: false,
      reels: false
    },
    requirements: [] as string[]
  });

  const steps = ['Campaign Info', 'Product', 'Creators', 'Deliverables'];

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      onBack();
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await launchCampaign({
        title: formData.name,
        description: formData.productDescription,
        budget: formData.maxPrice,
        category: formData.categories[0] || 'General',
        requirements: formData.requirements,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });
      
      toast.success('Campaign created successfully!');
      navigate('/brand/campaigns');
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CampaignInfoStep
            formData={formData}
            onChange={handleChange}
          />
        );
      case 1:
        return (
          <ProductStep
            formData={formData}
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <CreatorsStep
            formData={formData}
            onChange={handleChange}
          />
        );
      case 3:
        return (
          <DeliverablesStep
            formData={formData}
            onChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-24">
      <CampaignStepper
        steps={steps}
        currentStep={currentStep}
      />

      <div className="bg-white rounded-xl p-8 shadow-sm">
        {renderStep()}

        <div className="flex justify-between mt-8">
          <motion.button
            onClick={handleBack}
            className="px-6 py-2 text-gray-600 hover:text-gray-900"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentStep === 0 ? 'Cancel' : 'Back'}
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentStep === steps.length - 1 ? 'Create Campaign' : 'Next'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}