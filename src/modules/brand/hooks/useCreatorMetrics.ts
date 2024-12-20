import { useState, useEffect, useCallback } from 'react';
import { fetchCreatorMetrics } from '@/services/api/hypeauditor';
import { HypeAuditorMetrics } from '@/types/api';

export function useCreatorMetrics(username: string) {
  const [metrics, setMetrics] = useState<HypeAuditorMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchCreatorMetrics(username);
      setMetrics(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch metrics'));
      console.error('Error fetching metrics:', err);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { metrics, loading, error, refetch: fetchData };
}