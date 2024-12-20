import { useState, useEffect } from 'react';
import { useFirestore } from '@/hooks/useFirestore';
import { Creator } from '@/types';
import { useAuth } from '@/hooks/useAuth';

export function useCreatorProfile() {
  const [profile, setProfile] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { getDocument, updateDocument } = useFirestore('creators');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;
      try {
        const creatorData = await getDocument(user.uid);
        setProfile(creatorData as Creator);
      } catch (error) {
        console.error('Error fetching creator profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (data: Partial<Creator>) => {
    if (!user?.uid || !profile) return;
    try {
      await updateDocument(user.uid, data);
      setProfile({ ...profile, ...data });
    } catch (error) {
      console.error('Error updating creator profile:', error);
      throw error;
    }
  };

  return { profile, loading, updateProfile };
}