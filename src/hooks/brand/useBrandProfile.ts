import { useState, useEffect } from 'react';
import { useAuth } from '../useAuth';
import { getBrand, updateBrand } from '@/services/firebase/brands/repository';
import type { BrandProfile, UpdateBrandInput } from '@/services/firebase/brands/types';

export function useBrandProfile() {
  const [profile, setProfile] = useState<BrandProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;
      
      try {
        const brandData = await getBrand(user.uid);
        setProfile(brandData);
      } catch (error) {
        console.error('Error fetching brand profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (data: UpdateBrandInput) => {
    if (!user?.uid || !profile) return;
    
    try {
      await updateBrand(user.uid, data);
      setProfile(prev => prev ? { ...prev, ...data } : null);
    } catch (error) {
      console.error('Error updating brand profile:', error);
      throw error;
    }
  };

  return { profile, loading, updateProfile };
}