/*
  # Add Anon Role to All Admin Tables

  1. Changes
    - Update contact_messages policies to include anon role
    - Update team_members policies to include anon role (if needed)
    - This ensures admin panel works correctly with anon key

  2. Security
    - Anon role gets same permissions as authenticated for admin operations
    - Public role permissions remain read-only where appropriate
*/

-- Contact Messages: Update policies
DROP POLICY IF EXISTS "Authenticated users can delete contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can view contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update contact messages" ON contact_messages;

CREATE POLICY "Authenticated and anon can view contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated and anon can update contact messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated and anon can delete contact messages"
  ON contact_messages
  FOR DELETE
  TO authenticated, anon
  USING (true);
