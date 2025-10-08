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
    - Allow public INSERT for form submissions
    - Allow anon and authenticated SELECT/UPDATE for admin panel

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

CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view contact messages"
  ON contact_messages
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update contact messages"
  ON contact_messages
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete contact messages"
  ON contact_messages
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
