import { useState, useEffect } from 'react';
import { useFirestore } from '@/hooks/useFirestore';
import { Brand } from '@/types';
import { useAuth } from '@/hooks/useAuth';

export function useBrandProfile() {
  const [profile, setProfile] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { getDocument, updateDocument } = useFirestore('brands');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;
      try {
        const brandData = await getDocument(user.uid);
        setProfile(brandData as Brand);
      } catch (error) {
        console.error('Error fetching brand profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (data: Partial<Brand>) => {
    if (!user?.uid || !profile) return;
    try {
      await updateDocument(user.uid, data);
      setProfile({ ...profile, ...data });
    } catch (error) {
      console.error('Error updating brand profile:', error);
      throw error;
    }
  };

  return { profile, loading, updateProfile };
}