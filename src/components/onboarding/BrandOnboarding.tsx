import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CompanyTypeStep } from './steps/CompanyTypeStep';
import { IndustryStep } from './steps/IndustryStep';
import { RevenueStep } from './steps/RevenueStep';
import { ReferralStep } from './steps/ReferralStep';
import { OnboardingProgress } from './OnboardingProgress';
import { useBrandProfile } from '@/hooks/useBrandProfile';
import { toast } from 'react-hot-toast';

export function BrandOnboarding() {
  const navigate = useNavigate();
  const { updateProfile } = useBrandProfile();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyType: '',
    industry: '',
    annualRevenue: '',
    referralSource: ''
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      await updateProfile({
        companyType: formData.companyType,
        industry: formData.industry,
        annualRevenue: formData.annualRevenue,
        referralSource: formData.referralSource
      });
      
      toast.success('Profile updated successfully!');
      navigate('/brand/welcome');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const steps = [
    {
      title: 'Company Type',
      component: (
        <CompanyTypeStep
          value={formData.companyType}
          onChange={(value) => setFormData(prev => ({ ...prev, companyType: value }))}
          onNext={handleNext}
        />
      )
    },
    {
      title: 'Industry',
      component: (
        <IndustryStep
          value={formData.industry}
          onChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}
          onNext={handleNext}
        />
      )
    },
    {
      title: 'Revenue',
      component: (
        <RevenueStep
          value={formData.annualRevenue}
          onChange={(value) => setFormData(prev => ({ ...prev, annualRevenue: value }))}
          onNext={handleNext}
        />
      )
    },
    {
      title: 'Referral',
      component: (
        <ReferralStep
          value={formData.referralSource}
          onChange={(value) => setFormData(prev => ({ ...prev, referralSource: value }))}
          onNext={handleNext}
        />
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <div className="max-w-2xl mx-auto pt-24 px-4">
        <OnboardingProgress currentStep={currentStep} totalSteps={steps.length} />
        
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mt-12"
        >
          {steps[currentStep - 1].component}
        </motion.div>
      </div>
    </div>
  );
}