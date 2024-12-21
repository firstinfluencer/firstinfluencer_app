import { supabase } from '@/lib/supabase';

// Helper function to handle Supabase errors
export async function handleSupabaseError<T>(promise: Promise<{ data: T | null; error: any }>) {
  const { data, error } = await promise;
  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
  return data;
}

// Export initialized client and helper
export { supabase, handleSupabaseError };