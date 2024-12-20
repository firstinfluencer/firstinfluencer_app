import { useState, useEffect } from 'react';
import { useFirestore } from '@/hooks/useFirestore';
import { Creator } from '@/types';
import { where } from 'firebase/firestore';
import { fetchCreatorDetails } from '@/services/hypeauditor';

interface UseCreatorSearchProps {
  category?: string;
  minFollowers?: number;
  maxFollowers?: number;
  platform?: 'instagram' | 'tiktok' | 'youtube';
  searchTerm?: string;
}

export function useCreatorSearch({
  category,
  minFollowers,
  maxFollowers,
  platform = 'instagram',
  searchTerm
}: UseCreatorSearchProps = {}) {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const { queryDocuments } = useFirestore('creators');

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const constraints = [];
        
        if (category) {
          constraints.push(where('categories', 'array-contains', category));
        }
        
        if (platform && minFollowers) {
          constraints.push(where(`followers.${platform}`, '>=', minFollowers));
        }
        
        if (platform && maxFollowers) {
          constraints.push(where(`followers.${platform}`, '<=', maxFollowers));
        }

        let results = await queryDocuments(...constraints);

        // Filter by search term if provided
        if (searchTerm) {
          results = results.filter(creator => 
            creator.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            creator.platforms.instagram?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Fetch additional metrics from HypeAuditor for each creator
        const enrichedResults = await Promise.all(
          results.map(async (creator) => {
            if (creator.platforms.instagram) {
              try {
                const hypeData = await fetchCreatorDetails(creator.platforms.instagram);
                return {
                  ...creator,
                  metrics: hypeData
                };
              } catch (error) {
                console.error(`Error fetching HypeAuditor data for ${creator.displayName}:`, error);
                return creator;
              }
            }
            return creator;
          })
        );

        setCreators(enrichedResults as Creator[]);
      } catch (error) {
        console.error('Error fetching creators:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, [category, minFollowers, maxFollowers, platform, searchTerm]);

  return { creators, loading };
}