import { useState, useEffect } from 'react';
import { getInfluencerListings } from '../services/firebase/influencers';
import { InfluencerListing } from '../types/influencer';

interface UseInfluencerListingsProps {
  category?: string;
  minFollowers?: number;
  maxFollowers?: number;
}

export function useInfluencerListings({
  category,
  minFollowers,
  maxFollowers
}: UseInfluencerListingsProps = {}) {
  const [listings, setListings] = useState<InfluencerListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const data = await getInfluencerListings({
          category,
          minFollowers,
          maxFollowers
        });
        setListings(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch listings'));
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [category, minFollowers, maxFollowers]);

  return { listings, loading, error };
}