/*
  # Create Portfolio Images Storage Bucket

  Creates a storage bucket for portfolio images and sets up proper access policies.

  ## Changes
    1. Create portfolio-images bucket
    2. Set bucket to public
    3. Add RLS policies for upload, update, and delete operations

  ## Security
    - Public read access for all images
    - Authenticated and anon users can upload images
    - Users can update and delete their uploaded images
*/

-- Create portfolio-images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-images',
  'portfolio-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete images" ON storage.objects;

-- Allow anyone to read images (public bucket)
CREATE POLICY "Public read access portfolio"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'portfolio-images');

-- Allow authenticated and anon users to upload images
CREATE POLICY "Users can upload portfolio images"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'portfolio-images');

-- Allow authenticated and anon users to update their images
CREATE POLICY "Users can update portfolio images"
  ON storage.objects
  FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'portfolio-images')
  WITH CHECK (bucket_id = 'portfolio-images');

-- Allow authenticated and anon users to delete their images
CREATE POLICY "Users can delete portfolio images"
  ON storage.objects
  FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'portfolio-images');
