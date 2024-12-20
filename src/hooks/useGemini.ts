import { useState } from 'react';
import { generateCampaignSuggestions } from '@/services/api/gemini';
import { toast } from 'react-hot-toast';
import { useAuth } from './useAuth';

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const generateSuggestions = async (prompt: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const suggestions = await generateCampaignSuggestions(prompt, user?.uid);
      return suggestions;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to generate suggestions');
      setError(error);
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generateSuggestions,
  };
}