import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Config:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing env variables:', { supabaseUrl, hasKey: !!supabaseAnonKey });
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('Supabase client created successfully');

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  image_url: string;
  bio: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  description: string;
  full_description: string | null;
  image_url: string;
  category: 'web' | 'mobile' | 'bot' | 'design' | 'other';
  technologies: string[];
  live_url: string | null;
  github_url: string | null;
  client_name: string | null;
  completion_date: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[];
  og_image: string | null;
  created_at: string;
  updated_at: string;
}
