/*
  # Create Contact Messages Table

  1. New Table
    - `contact_messages`
      - `id` (uuid, primary key) - Unique identifier for each message
      - `name` (text) - Full name of the sender
      - `email` (text) - Email address of the sender
      - `phone` (text) - Phone number (optional)
      - `subject` (text) - Subject/category of the message
      - `message` (text) - The message content
      - `status` (text) - Status of the message (new, read, replied, archived)
      - `admin_notes` (text) - Internal notes from admin
      - `created_at` (timestamptz) - When message was received
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on contact_messages table
    - Allow PUBLIC INSERT for anyone to submit contact forms (no authentication required)
    - Allow only AUTHENTICATED users to SELECT/UPDATE/DELETE (admin access only)

  3. Indexes
    - Index on status for filtering
    - Index on created_at for sorting
    - Index on email for searching
*/

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  admin_notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Allow anyone (including unauthenticated users) to submit contact forms
CREATE POLICY "Public can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users (admins) can view messages
CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users (admins) can update messages
CREATE POLICY "Authenticated users can update contact messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users (admins) can delete messages
CREATE POLICY "Authenticated users can delete contact messages"
  ON contact_messages
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
