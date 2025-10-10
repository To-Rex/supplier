/*
  # Enable RLS for contact_messages table

  1. Changes
    - Enable Row Level Security on contact_messages table
    
  2. Security
    - RLS policies already exist, just enabling RLS enforcement
*/

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
