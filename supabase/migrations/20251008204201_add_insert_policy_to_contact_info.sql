/*
  # Add INSERT Policy to Contact Info Table

  1. Changes
    - Add INSERT policy for authenticated users
    - This allows admins to create the initial contact info record if it doesn't exist

  2. Security
    - Only authenticated users can insert (admin access)
    - Existing single-row enforcement trigger remains in place
*/

-- Add INSERT policy for authenticated users
CREATE POLICY "Authenticated users can insert contact info"
  ON contact_info
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
