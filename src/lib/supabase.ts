import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
