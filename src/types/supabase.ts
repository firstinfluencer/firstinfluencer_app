export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      creator_details: {
        Row: {
          id: string
          username: string
          full_name: string
          avatar_url: string | null
          bio: string | null
          followers: number
          engagement_rate: number
          categories: string[]
          location: string | null
          is_verified: boolean
          instagram_handle: string | null
          tiktok_handle: string | null
          youtube_handle: string | null
          created_at: string
        }
        Insert: {
          id?: string
          username: string
          full_name: string
          avatar_url?: string | null
          bio?: string | null
          followers?: number
          engagement_rate?: number
          categories?: string[]
          location?: string | null
          is_verified?: boolean
          instagram_handle?: string | null
          tiktok_handle?: string | null
          youtube_handle?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string
          avatar_url?: string | null
          bio?: string | null
          followers?: number
          engagement_rate?: number
          categories?: string[]
          location?: string | null
          is_verified?: boolean
          instagram_handle?: string | null
          tiktok_handle?: string | null
          youtube_handle?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}