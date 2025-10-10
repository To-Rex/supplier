/*
  # Blog Post View Counter Function

  1. Purpose
    - Creates a PostgreSQL function to safely increment blog post view counts
    - Ensures atomic updates to prevent race conditions
    
  2. Function Details
    - Name: increment_blog_views
    - Parameter: blog_id (uuid)
    - Returns: void
    - Updates the views_count column in blog_posts table
    
  3. Security
    - Function is accessible to all users (public)
    - Uses safe SQL to prevent injection attacks
*/

CREATE OR REPLACE FUNCTION increment_blog_views(blog_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE blog_posts
  SET views_count = views_count + 1
  WHERE id = blog_id AND is_published = true;
END;
$$;

GRANT EXECUTE ON FUNCTION increment_blog_views(uuid) TO anon;
GRANT EXECUTE ON FUNCTION increment_blog_views(uuid) TO authenticated;
