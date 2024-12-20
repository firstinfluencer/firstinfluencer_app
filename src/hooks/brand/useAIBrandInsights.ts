import { useState, useEffect } from 'react';
import { useAuth } from '../useAuth';
import { getBrandInsights } from '@/services/api/brand';
import { getCompanyFromEmail } from '@/utils/format';

export function useAIBrandInsights() {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchInsights = async () => {
      if (!user?.email) return;

      try {
        setLoading(true);
        const brandName = getCompanyFromEmail(user.email);
        const brandInsights = await getBrandInsights(brandName);
        setInsights(brandInsights);
      } catch (error) {
        console.error('Error fetching brand insights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [user]);

  return { insights, loading };
}