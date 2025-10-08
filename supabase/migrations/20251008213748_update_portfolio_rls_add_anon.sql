/*
  # Update Portfolio RLS Policies - Add Anon Role

  Update existing RLS policies to include anon role for public access.

  ## Changes
    - Update SELECT policy to explicitly include anon role
    - Ensures public users can view active portfolio items
*/

-- Drop existing public select policy
DROP POLICY IF EXISTS "Anyone can view active portfolio items" ON portfolio;

-- Create new policy with explicit anon role support
CREATE POLICY "Public can view active portfolio items"
  ON portfolio
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);
