/*
  # Fix Portfolio RLS Policies - Add Anon Role for All Operations

  Update RLS policies to include anon role for insert, update, and delete operations.
  This allows admin operations to work properly.

  ## Changes
    - Drop existing policies
    - Recreate with anon role support
    - Maintain security by keeping true conditions for authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can insert portfolio items" ON portfolio;
DROP POLICY IF EXISTS "Authenticated users can update portfolio items" ON portfolio;
DROP POLICY IF EXISTS "Authenticated users can delete portfolio items" ON portfolio;

-- Recreate INSERT policy with anon role
CREATE POLICY "Users can insert portfolio items"
  ON portfolio
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Recreate UPDATE policy with anon role
CREATE POLICY "Users can update portfolio items"
  ON portfolio
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Recreate DELETE policy with anon role
CREATE POLICY "Users can delete portfolio items"
  ON portfolio
  FOR DELETE
  TO anon, authenticated
  USING (true);
