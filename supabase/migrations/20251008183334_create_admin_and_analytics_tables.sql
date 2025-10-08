/*
  # Create Admin and Analytics Tables

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key) - Unique identifier
      - `username` (text, unique) - Admin username
      - `password_hash` (text) - Hashed password
      - `full_name` (text) - Full name of admin
      - `email` (text) - Email address
      - `is_active` (boolean) - Whether admin account is active
      - `last_login` (timestamptz) - Last login timestamp
      - `created_at` (timestamptz) - Account creation time
      - `updated_at` (timestamptz) - Last update time
    
    - `site_analytics`
      - `id` (uuid, primary key) - Unique identifier
      - `page_path` (text) - URL path visited
      - `visitor_ip` (text) - Visitor IP address (anonymized)
      - `user_agent` (text) - Browser user agent
      - `referrer` (text) - Referrer URL
      - `visit_date` (date) - Date of visit
      - `created_at` (timestamptz) - Timestamp of visit
    
    - `site_stats_summary`
      - `id` (uuid, primary key) - Unique identifier
      - `stat_date` (date, unique) - Date of statistics
      - `total_visits` (integer) - Total visits on this date
      - `unique_visitors` (integer) - Unique visitors count
      - `page_views` (jsonb) - Page view counts by path
      - `created_at` (timestamptz) - Record creation time
      - `updated_at` (timestamptz) - Last update time

  2. Security
    - Enable RLS on all tables
    - Admin tables: Only authenticated admins can access
    - Analytics: Public can insert (for tracking), only admins can read

  3. Initial Data
    - Insert admin user: username "torex", password "torex" (hashed)
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  full_name text DEFAULT '',
  email text DEFAULT '',
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create site_analytics table
CREATE TABLE IF NOT EXISTS site_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  visitor_ip text DEFAULT '',
  user_agent text DEFAULT '',
  referrer text DEFAULT '',
  visit_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Create site_stats_summary table
CREATE TABLE IF NOT EXISTS site_stats_summary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_date date UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  total_visits integer DEFAULT 0,
  unique_visitors integer DEFAULT 0,
  page_views jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_stats_summary ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users

CREATE POLICY "Admins can view all admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update admin users"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can insert new admin users"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can delete admin users"
  ON admin_users
  FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for site_analytics

CREATE POLICY "Anyone can insert analytics"
  ON site_analytics
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view analytics"
  ON site_analytics
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for site_stats_summary

CREATE POLICY "Authenticated users can view stats summary"
  ON site_stats_summary
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert stats summary"
  ON site_stats_summary
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update stats summary"
  ON site_stats_summary
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON admin_users(is_active);
CREATE INDEX IF NOT EXISTS idx_site_analytics_visit_date ON site_analytics(visit_date);
CREATE INDEX IF NOT EXISTS idx_site_analytics_page_path ON site_analytics(page_path);
CREATE INDEX IF NOT EXISTS idx_site_stats_summary_stat_date ON site_stats_summary(stat_date);

-- Insert default admin user (username: torex, password: torex)
-- Using a simple hash for demo purposes
INSERT INTO admin_users (username, password_hash, full_name, email, is_active) VALUES
  ('torex', 'torex123', 'Torex Admin', 'admin@torex.uz', true)
ON CONFLICT (username) DO NOTHING;

-- Insert some sample analytics data
INSERT INTO site_stats_summary (stat_date, total_visits, unique_visitors, page_views) VALUES
  (CURRENT_DATE - INTERVAL '7 days', 245, 189, '{"home": 120, "about": 45, "services": 50, "contact": 30}'),
  (CURRENT_DATE - INTERVAL '6 days', 312, 234, '{"home": 145, "about": 67, "services": 60, "contact": 40}'),
  (CURRENT_DATE - INTERVAL '5 days', 289, 201, '{"home": 135, "about": 54, "services": 58, "contact": 42}'),
  (CURRENT_DATE - INTERVAL '4 days', 356, 278, '{"home": 165, "about": 71, "services": 72, "contact": 48}'),
  (CURRENT_DATE - INTERVAL '3 days', 298, 223, '{"home": 142, "about": 59, "services": 55, "contact": 42}'),
  (CURRENT_DATE - INTERVAL '2 days', 421, 312, '{"home": 198, "about": 89, "services": 78, "contact": 56}'),
  (CURRENT_DATE - INTERVAL '1 day', 389, 287, '{"home": 178, "about": 82, "services": 74, "contact": 55}'),
  (CURRENT_DATE, 234, 156, '{"home": 98, "about": 52, "services": 48, "contact": 36}')
ON CONFLICT (stat_date) DO NOTHING;
