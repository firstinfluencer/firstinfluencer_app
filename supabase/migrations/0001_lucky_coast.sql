/*
  # Create creator_details table

  1. New Tables
    - `creator_details`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `bio` (text)
      - `followers` (integer)
      - `engagement_rate` (numeric)
      - `categories` (text array)
      - `location` (text)
      - `is_verified` (boolean)
      - `instagram_handle` (text)
      - `tiktok_handle` (text)
      - `youtube_handle` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS creator_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  full_name text NOT NULL,
  avatar_url text,
  bio text,
  followers integer NOT NULL DEFAULT 0,
  engagement_rate numeric(5,2) NOT NULL DEFAULT 0,
  categories text[] NOT NULL DEFAULT '{}',
  location text,
  is_verified boolean NOT NULL DEFAULT false,
  instagram_handle text,
  tiktok_handle text,
  youtube_handle text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE creator_details ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow authenticated users to read creator_details"
  ON creator_details
  FOR SELECT
  TO authenticated
  USING (true);