-- Treasure Chest Fortune - Simple Supabase Setup
-- Copy and paste this entire file into Supabase SQL Editor and click RUN

-- ============================================
-- 1. CREATE DATABASE TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS treasure_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL,
  username TEXT NOT NULL,
  deposit_amount NUMERIC NOT NULL,
  prize TEXT NOT NULL,
  image_url TEXT
);

-- ============================================
-- 2. CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_created_at ON treasure_entries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email ON treasure_entries(email);
CREATE INDEX IF NOT EXISTS idx_prize ON treasure_entries(prize);

-- ============================================
-- 3. ENABLE SECURITY
-- ============================================

ALTER TABLE treasure_entries ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. CREATE SECURITY POLICIES
-- ============================================

-- Allow anyone to insert entries (for the game)
DROP POLICY IF EXISTS "Allow public insert" ON treasure_entries;
CREATE POLICY "Allow public insert" ON treasure_entries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anyone to read all entries (for admin dashboard)
DROP POLICY IF EXISTS "Allow authenticated read" ON treasure_entries;
DROP POLICY IF EXISTS "Allow public read" ON treasure_entries;
CREATE POLICY "Allow public read" ON treasure_entries
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ============================================
-- 5. CREATE STORAGE BUCKET
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('treasure-images', 'treasure-images', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 6. CREATE STORAGE POLICIES
-- ============================================

-- Allow public to upload images
DROP POLICY IF EXISTS "Allow public upload" ON storage.objects;
CREATE POLICY "Allow public upload" ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'treasure-images');

-- Allow public to view images
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'treasure-images');

-- ============================================
-- 7. CREATE ANALYTICS VIEW
-- ============================================

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

-- ============================================
-- SUCCESS!
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '==============================================';
  RAISE NOTICE '✅ SUCCESS! Your database is ready!';
  RAISE NOTICE '==============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Created:';
  RAISE NOTICE '  ✓ Table: treasure_entries';
  RAISE NOTICE '  ✓ Storage bucket: treasure-images';
  RAISE NOTICE '  ✓ View: prize_statistics';
  RAISE NOTICE '  ✓ Security policies: Enabled';
  RAISE NOTICE '';
  RAISE NOTICE 'Next Steps:';
  RAISE NOTICE '  1. Go to Settings → API';
  RAISE NOTICE '  2. Copy your Project URL';
  RAISE NOTICE '  3. Copy your anon public key';
  RAISE NOTICE '  4. Add them to your .env.local file';
  RAISE NOTICE '';
  RAISE NOTICE 'Happy treasure hunting! 🎰✨';
  RAISE NOTICE '==============================================';
END $$;
