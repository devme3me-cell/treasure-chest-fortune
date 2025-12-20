import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '' &&
         supabaseUrl !== 'your_supabase_project_url_here';
};

// Database types
export interface TreasureEntry {
  id?: string;
  created_at?: string;
  email: string;
  username: string;
  deposit_amount: number;
  prize: string;
  image_url: string | null;
}
