import { useState, useEffect } from 'react';
import { Creator } from '@/types';
import { generateMockCreators } from '@/utils/mock/creators';

interface UseCreatorSearchProps {
  category?: string;
  minFollowers?: number;
  maxFollowers?: number;
  searchTerm?: string;
}

export function useCreatorSearch({
  category,
  minFollowers,
  maxFollowers,
  searchTerm
}: UseCreatorSearchProps = {}) {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use mock data since the real API is having issues
        let mockCreators = generateMockCreators(10);
        
        // Apply filters
        if (category) {
          mockCreators = mockCreators.filter(creator => 
            creator.categories.includes(category)
          );
        }

        if (minFollowers) {
          mockCreators = mockCreators.filter(creator => 
            creator.followers.instagram >= minFollowers
          );
        }

        if (maxFollowers) {
          mockCreators = mockCreators.filter(creator => 
            creator.followers.instagram <= maxFollowers
          );
        }

        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          mockCreators = mockCreators.filter(creator => 
            creator.displayName.toLowerCase().includes(term) ||
            creator.platforms.instagram?.toLowerCase().includes(term)
          );
        }

        setCreators(mockCreators);
      } catch (err) {
        console.error('Error fetching creators:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch creators'));
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, [category, minFollowers, maxFollowers, searchTerm]);

  return { creators, loading, error };
}