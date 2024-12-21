import { supabase, handleSupabaseError } from './client';
import type { Database } from '@/types/supabase';

type CreatorDetails = Database['public']['Tables']['creator_details']['Row'];

export async function getCreatorDetails(id: string) {
  return handleSupabaseError(
    supabase
      .from('creator_details')
      .select('*')
  );
}

export async function searchCreators(params: {
  category?: string;
  minFollowers?: number;
  maxFollowers?: number;
}) {
  let query = supabase
    .from('creator_details')
    .select('*')
    .order('followers', { ascending: false });
  console.log(query);

  if (params.category) {
    query = query.contains('categories', [params.category]);
  }

  if (params.minFollowers) {
    query = query.gte('followers', params.minFollowers);
  }

  if (params.maxFollowers) {
    query = query.lte('followers', params.maxFollowers);
  }

  return handleSupabaseError(query);
}

export async function updateCreatorDetails(id: string, data: Partial<CreatorDetails>) {
  return handleSupabaseError(
    supabase
      .from('creator_details')
      .update(data)
      .eq('id', id)
      .select()
      .single()
  );
}