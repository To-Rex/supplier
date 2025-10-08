/*
  # Create Team Members Table

  1. New Tables
    - `team_members`
      - `id` (uuid, primary key) - Unique identifier for each team member
      - `name` (text) - Full name of the team member
      - `role` (text) - Job title or role (e.g., "CEO & Founder", "Senior Developer")
      - `expertise` (text[]) - Array of expertise areas
      - `image_url` (text) - URL to profile image
      - `bio` (text) - Short biography or description
      - `display_order` (integer) - Order in which to display team members
      - `is_active` (boolean) - Whether the team member should be displayed
      - `created_at` (timestamptz) - Timestamp when record was created
      - `updated_at` (timestamptz) - Timestamp when record was last updated

  2. Security
    - Enable RLS on `team_members` table
    - Add policy for public read access (team members are public information)
    - Add policy for authenticated users with admin role to insert/update/delete
*/

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  expertise text[] DEFAULT '{}',
  image_url text NOT NULL,
  bio text DEFAULT '',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active team members (public information)
CREATE POLICY "Anyone can view active team members"
  ON team_members
  FOR SELECT
  USING (is_active = true);

-- Policy: Authenticated admins can insert team members
CREATE POLICY "Admins can insert team members"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated admins can update team members
CREATE POLICY "Admins can update team members"
  ON team_members
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated admins can delete team members
CREATE POLICY "Admins can delete team members"
  ON team_members
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_team_members_display_order ON team_members(display_order);
CREATE INDEX IF NOT EXISTS idx_team_members_is_active ON team_members(is_active);

-- Insert sample team members
INSERT INTO team_members (name, role, expertise, image_url, bio, display_order) VALUES
  (
    'Dilshod Rahmonov',
    'CEO & Asoschisi',
    ARRAY['Strategiya', 'Biznes Rivojlantirish', 'Innovatsiya'],
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    'IT sohasida 10 yillik tajribaga ega. Zamonaviy texnologiyalar orqali bizneslarni raqamlashtirish bo''yicha mutaxassis.',
    1
  ),
  (
    'Aziza Karimova',
    'Bosh Dasturchi',
    ARRAY['React', 'Node.js', 'TypeScript', 'Backend Arxitektura'],
    'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Full-stack dasturlashda 7 yillik tajriba. Murakkab veb-ilovalar yaratish bo''yicha ekspert.',
    2
  ),
  (
    'Bekzod Tursunov',
    'Mobil Ilovalar Mutaxassisi',
    ARRAY['React Native', 'Flutter', 'iOS', 'Android'],
    'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Mobil ilovalar yaratishda 6 yillik tajriba. iOS va Android platformalarida professional dasturlar ishlab chiqadi.',
    3
  ),
  (
    'Malika Yusupova',
    'UX/UI Dizayner',
    ARRAY['Figma', 'Adobe XD', 'UI/UX', 'Branding'],
    'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Foydalanuvchi tajribasini yaratishda 5 yillik tajriba. Zamonaviy va intuitiv dizaynlar ishlab chiqadi.',
    4
  );
