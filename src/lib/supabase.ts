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
