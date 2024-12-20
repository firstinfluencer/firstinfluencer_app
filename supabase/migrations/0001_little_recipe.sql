/*
  # Create Creators and Brands Tables

  1. New Tables
    - `creators`
      - `id` (uuid, primary key) - Maps to auth.users id
      - `full_name` (text)
      - `email` (text, unique)
      - `bio` (text)
      - `categories` (text[])
      - `instagram_handle` (text)
      - `tiktok_handle` (text)
      - `youtube_handle` (text)
      - `location` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `brands`
      - `id` (uuid, primary key) - Maps to auth.users id
      - `company_name` (text)
      - `email` (text, unique)
      - `industry` (text)
      - `website` (text)
      - `description` (text)
      - `location` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create creators table
CREATE TABLE IF NOT EXISTS creators (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  bio text,
  categories text[],
  instagram_handle text,
  tiktok_handle text,
  youtube_handle text,
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  company_name text NOT NULL,
  email text UNIQUE NOT NULL,
  industry text,
  website text,
  description text,
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Creators policies
CREATE POLICY "Creators can view their own profile"
  ON creators
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Creators can update their own profile"
  ON creators
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Brands can view creator profiles"
  ON creators
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM brands WHERE id = auth.uid()
  ));

-- Brands policies
CREATE POLICY "Brands can view their own profile"
  ON brands
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Brands can update their own profile"
  ON brands
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Creators can view brand profiles"
  ON brands
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM creators WHERE id = auth.uid()
  ));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers
CREATE TRIGGER update_creators_updated_at
  BEFORE UPDATE ON creators
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_brands_updated_at
  BEFORE UPDATE ON brands
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();