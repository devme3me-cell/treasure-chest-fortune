-- Treasure Chest Fortune - Supabase Database Schema
-- Run this in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Create the treasure_entries table
CREATE TABLE IF NOT EXISTS treasure_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL,
  username TEXT NOT NULL,
  deposit_amount NUMERIC NOT NULL,
  prize TEXT NOT NULL,
  image_url TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_created_at ON treasure_entries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email ON treasure_entries(email);
CREATE INDEX IF NOT EXISTS idx_prize ON treasure_entries(prize);

-- Enable Row Level Security (RLS)
ALTER TABLE treasure_entries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for the game)
DROP POLICY IF EXISTS "Allow public insert" ON treasure_entries;
CREATE POLICY "Allow public insert" ON treasure_entries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow anyone to read all entries (for admin dashboard)
DROP POLICY IF EXISTS "Allow authenticated read" ON treasure_entries;
DROP POLICY IF EXISTS "Allow public read" ON treasure_entries;
CREATE POLICY "Allow public read" ON treasure_entries
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policy to allow service role to do everything (for admin)
DROP POLICY IF EXISTS "Allow service role all" ON treasure_entries;
CREATE POLICY "Allow service role all" ON treasure_entries
  FOR ALL
  TO service_role
  USING (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('treasure-images', 'treasure-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for the bucket
DROP POLICY IF EXISTS "Allow public upload" ON storage.objects;
CREATE POLICY "Allow public upload" ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'treasure-images');

DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'treasure-images');

-- Optional: Create a view for analytics
CREATE OR REPLACE VIEW prize_statistics AS
SELECT
  prize,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage,
  AVG(deposit_amount) as avg_deposit,
  MIN(deposit_amount) as min_deposit,
  MAX(deposit_amount) as max_deposit
FROM treasure_entries
GROUP BY prize
ORDER BY count DESC;

-- Grant access to the view
GRANT SELECT ON prize_statistics TO anon, authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Treasure Chest Fortune database schema created successfully!';
  RAISE NOTICE 'Table: treasure_entries';
  RAISE NOTICE 'Storage bucket: treasure-images';
  RAISE NOTICE 'View: prize_statistics';
END $$;
