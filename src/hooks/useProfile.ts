import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getCreator, getBrand } from '@/services/firebase/collections';
import type { Creator } from '@/types/models/creator';
import type { Brand } from '@/types/models/brand';

export function useProfile() {
  const [profile, setProfile] = useState<Creator | Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchProfile() {
      if (!user?.uid) return;

      try {
        // Try to fetch creator profile first
        const creatorProfile = await getCreator(user.uid);
        if (creatorProfile) {
          setProfile(creatorProfile);
          return;
        }

        // If no creator profile, try brand profile
        const brandProfile = await getBrand(user.uid);
        if (brandProfile) {
          setProfile(brandProfile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  return { profile, loading };
}