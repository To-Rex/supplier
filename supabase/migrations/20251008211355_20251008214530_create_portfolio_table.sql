/*
  # Create Portfolio Table

  1. New Tables
    - `portfolio`
      - `id` (uuid, primary key)
      - `title` (text) - Portfolio loyiha nomi
      - `slug` (text, unique) - SEO-friendly URL slug
      - `description` (text) - Qisqa tavsif
      - `full_description` (text) - To'liq tavsif
      - `image_url` (text) - Asosiy rasm
      - `category` (text) - Kategoriya (web, mobile, bot)
      - `technologies` (text[]) - Ishlatilgan texnologiyalar
      - `live_url` (text) - Jonli loyiha havolasi
      - `github_url` (text) - GitHub havola
      - `client_name` (text) - Mijoz nomi
      - `completion_date` (date) - Tugallangan sana
      - `is_featured` (boolean) - Asosiy loyihami
      - `is_active` (boolean) - Faolmi
      - `display_order` (integer) - Ko'rsatish tartibi
      - `meta_title` (text) - SEO meta title
      - `meta_description` (text) - SEO meta description
      - `meta_keywords` (text[]) - SEO keywords
      - `og_image` (text) - Open Graph rasm
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `portfolio` table
    - Add policy for public read access
    - Add policy for authenticated admin insert/update/delete
*/

-- Create portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  full_description text,
  image_url text NOT NULL,
  category text NOT NULL CHECK (category IN ('web', 'mobile', 'bot', 'design', 'other')),
  technologies text[] DEFAULT '{}',
  live_url text,
  github_url text,
  client_name text,
  completion_date date,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  meta_title text,
  meta_description text,
  meta_keywords text[] DEFAULT '{}',
  og_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_is_active ON portfolio(is_active);
CREATE INDEX IF NOT EXISTS idx_portfolio_display_order ON portfolio(display_order);

-- Enable Row Level Security
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active portfolio items
CREATE POLICY "Anyone can view active portfolio items"
  ON portfolio
  FOR SELECT
  USING (is_active = true);

-- Policy: Authenticated users can view all portfolio items
CREATE POLICY "Authenticated users can view all portfolio items"
  ON portfolio
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert portfolio items
CREATE POLICY "Authenticated users can insert portfolio items"
  ON portfolio
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update portfolio items
CREATE POLICY "Authenticated users can update portfolio items"
  ON portfolio
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete portfolio items
CREATE POLICY "Authenticated users can delete portfolio items"
  ON portfolio
  FOR DELETE
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_portfolio_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS portfolio_updated_at ON portfolio;
CREATE TRIGGER portfolio_updated_at
  BEFORE UPDATE ON portfolio
  FOR EACH ROW
  EXECUTE FUNCTION update_portfolio_updated_at();
