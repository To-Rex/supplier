/*
  # Add SEO fields to team_members table

  ## Changes Made
  1. New Columns
    - `slug` (text, unique) - URL-friendly identifier for team member profiles
    - `meta_title` (text) - SEO meta title for search engines
    - `meta_description` (text) - SEO meta description for search engines
    - `keywords` (text array) - SEO keywords for better search visibility

  ## Notes
  - Slug is unique and used for creating individual profile URLs
  - Meta title and description help with search engine optimization
  - Keywords array allows multiple search terms per team member
  - Existing records will need slugs generated from their names
*/

-- Add SEO fields to team_members table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'team_members' AND column_name = 'slug'
  ) THEN
    ALTER TABLE team_members ADD COLUMN slug text UNIQUE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'team_members' AND column_name = 'meta_title'
  ) THEN
    ALTER TABLE team_members ADD COLUMN meta_title text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'team_members' AND column_name = 'meta_description'
  ) THEN
    ALTER TABLE team_members ADD COLUMN meta_description text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'team_members' AND column_name = 'keywords'
  ) THEN
    ALTER TABLE team_members ADD COLUMN keywords text[] DEFAULT '{}';
  END IF;
END $$;

-- Generate slugs for existing records (convert name to lowercase, replace spaces with hyphens)
UPDATE team_members
SET slug = lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;

-- Generate meta titles from name and role
UPDATE team_members
SET meta_title = name || ' - ' || role || ' | Torex'
WHERE meta_title = '' OR meta_title IS NULL;

-- Generate meta descriptions
UPDATE team_members
SET meta_description = bio
WHERE (meta_description = '' OR meta_description IS NULL) AND bio IS NOT NULL AND bio != '';

-- Create index on slug for better query performance
CREATE INDEX IF NOT EXISTS idx_team_members_slug ON team_members(slug);
