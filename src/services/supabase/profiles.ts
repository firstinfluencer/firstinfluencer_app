import { supabase } from '@/lib/supabase';
import type { Creator, Brand } from '@/types/database';

export async function getCreatorProfile(id: string) {
  const { data, error } = await supabase
    .from('creators')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Creator;
}

export async function updateCreatorProfile(id: string, profile: Partial<Creator>) {
  const { data, error } = await supabase
    .from('creators')
    .update(profile)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Creator;
}

export async function getBrandProfile(id: string) {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Brand;
}

export async function updateBrandProfile(id: string, profile: Partial<Brand>) {
  const { data, error } = await supabase
    .from('brands')
    .update(profile)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Brand;
}