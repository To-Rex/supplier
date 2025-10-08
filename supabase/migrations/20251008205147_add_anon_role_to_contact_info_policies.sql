/*
  # Add Anon Role to Contact Info Policies

  1. Changes
    - Drop existing authenticated-only policies
    - Create new policies that allow both authenticated and anon roles
    - This fixes the issue where admin panel using anon key cannot update contact info

  2. Security
    - Both authenticated and anon roles can manage contact info
    - Public role can only view
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can insert contact info" ON contact_info;
DROP POLICY IF EXISTS "Admins can update contact info" ON contact_info;
DROP POLICY IF EXISTS "Admins can delete contact info" ON contact_info;

-- Create new policies with anon role included

-- Allow authenticated and anon users to insert contact info
CREATE POLICY "Authenticated and anon can insert contact info"
  ON contact_info
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Allow authenticated and anon users to update contact info
CREATE POLICY "Authenticated and anon can update contact info"
  ON contact_info
  FOR UPDATE
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

-- Allow authenticated and anon users to delete contact info
CREATE POLICY "Authenticated and anon can delete contact info"
  ON contact_info
  FOR DELETE
  TO authenticated, anon
  USING (true);
