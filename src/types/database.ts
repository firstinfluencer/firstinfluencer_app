export interface Creator {
  id: string;
  full_name: string;
  email: string;
  bio: string | null;
  categories: string[];
  instagram_handle: string | null;
  tiktok_handle: string | null;
  youtube_handle: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  company_name: string;
  email: string;
  industry: string | null;
  website: string | null;
  description: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}