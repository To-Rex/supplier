/*
  # Create Contact Information Table

  1. New Table
    - `contact_info`
      - `id` (uuid, primary key) - Single row identifier
      - `phone` (text) - Contact phone number
      - `email` (text) - Contact email address
      - `location` (text) - Office location/address
      - `work_hours` (text) - Working hours
      - `facebook_url` (text) - Facebook profile URL
      - `instagram_url` (text) - Instagram profile URL
      - `twitter_url` (text) - Twitter/X profile URL
      - `linkedin_url` (text) - LinkedIn profile URL
      - `github_url` (text) - GitHub profile URL
      - `updated_at` (timestamptz) - Last update timestamp
      - `updated_by` (uuid) - Admin user who last updated

  2. Security
    - Enable RLS on contact_info table
    - Allow PUBLIC SELECT for anyone to view contact info
    - Allow only AUTHENTICATED users to UPDATE (admin access only)
    - Only one row allowed in this table (singleton pattern)

  3. Initial Data
    - Insert default contact information
*/

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text DEFAULT '+998 99 534 03 13',
  email text DEFAULT 'dev.dilshodjon@gmail.com',
  location text DEFAULT 'Toshkent, O''zbekiston',
  work_hours text DEFAULT 'Dush-Jum 9:00 dan 18:00 gacha',
  facebook_url text DEFAULT '',
  instagram_url text DEFAULT '',
  twitter_url text DEFAULT '',
  linkedin_url text DEFAULT '',
  github_url text DEFAULT '',
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Allow anyone to view contact information
CREATE POLICY "Anyone can view contact info"
  ON contact_info
  FOR SELECT
  USING (true);

-- Only authenticated users (admins) can update contact info
CREATE POLICY "Authenticated users can update contact info"
  ON contact_info
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default contact information (only one row)
INSERT INTO contact_info (phone, email, location, work_hours)
VALUES (
  '+998 99 534 03 13',
  'dev.dilshodjon@gmail.com',
  'Toshkent, O''zbekiston',
  'Dush-Jum 9:00 dan 18:00 gacha'
)
ON CONFLICT (id) DO NOTHING;

-- Create a function to ensure only one row exists
CREATE OR REPLACE FUNCTION enforce_single_contact_info()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM contact_info) >= 1 AND TG_OP = 'INSERT' THEN
    RAISE EXCEPTION 'Only one contact_info row is allowed. Use UPDATE instead.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to enforce single row
DROP TRIGGER IF EXISTS ensure_single_contact_info ON contact_info;
CREATE TRIGGER ensure_single_contact_info
  BEFORE INSERT ON contact_info
  FOR EACH ROW
  EXECUTE FUNCTION enforce_single_contact_info();
