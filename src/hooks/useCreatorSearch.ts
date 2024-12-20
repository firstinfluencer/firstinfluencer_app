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

  useEffect(() => {
    // Use mock data since the real API is having issues
    const mockCreators = generateMockCreators(10);
    
    let filtered = mockCreators;

    if (category) {
      filtered = filtered.filter(creator => 
        creator.categories.includes(category)
      );
    }

    if (minFollowers) {
      filtered = filtered.filter(creator => 
        creator.followers.instagram >= minFollowers
      );
    }

    if (maxFollowers) {
      filtered = filtered.filter(creator => 
        creator.followers.instagram <= maxFollowers
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(creator => 
        creator.displayName.toLowerCase().includes(term) ||
        creator.platforms.instagram?.toLowerCase().includes(term)
      );
    }

    setCreators(filtered);
    setLoading(false);
  }, [category, minFollowers, maxFollowers, searchTerm]);

  return { creators, loading };
}