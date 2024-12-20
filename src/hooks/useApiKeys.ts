import { useState, useEffect } from 'react';
import { getApiKeys, updateApiKeys } from '@/services/firebase/collections/apiKeys';
import { toast } from 'react-hot-toast';

export function useApiKeys() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initKeys = async () => {
      try {
        await getApiKeys();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize API keys');
        setError(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    initKeys();
  }, []);

  const updateKeys = async (keys: Parameters<typeof updateApiKeys>[0]) => {
    try {
      await updateApiKeys(keys);
      toast.success('API keys updated successfully');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update API keys');
      setError(error);
      toast.error(error.message);
      throw error;
    }
  };

  return { loading, error, updateKeys };
}