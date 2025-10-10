/*
  # Update Blog Posts RLS Policies - Add Anonymous CRUD

  1. Purpose
    - Adds CRUD permissions for anonymous users on blog_posts table
    - WARNING: This is NOT recommended for production as it allows anyone to modify blog content
    
  2. Changes
    - Add INSERT policy for anonymous users
    - Add UPDATE policy for anonymous users
    - Add DELETE policy for anonymous users
    
  3. Security Note
    - These policies allow ANY unauthenticated user to create, modify, or delete blog posts
    - This should only be used for development/testing purposes
    - For production, only authenticated admin users should have CRUD access
*/

-- Drop existing policies if needed and recreate with anon role

-- INSERT policy for anon users
DROP POLICY IF EXISTS "Anonymous users can insert blog posts" ON blog_posts;
CREATE POLICY "Anonymous users can insert blog posts"
  ON blog_posts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- UPDATE policy for anon users
DROP POLICY IF EXISTS "Anonymous users can update blog posts" ON blog_posts;
CREATE POLICY "Anonymous users can update blog posts"
  ON blog_posts
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- DELETE policy for anon users
DROP POLICY IF EXISTS "Anonymous users can delete blog posts" ON blog_posts;
CREATE POLICY "Anonymous users can delete blog posts"
  ON blog_posts
  FOR DELETE
  TO anon
  USING (true);
