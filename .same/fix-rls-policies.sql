-- ⚠️ RUN THIS IF ENTRIES DON'T SHOW IN ADMIN DASHBOARD ⚠️
-- Copy and paste this entire file into Supabase SQL Editor and click RUN

-- ============================================
-- FIX RLS POLICIES FOR ADMIN DASHBOARD
-- ============================================

-- Drop old policies that might be blocking reads
DROP POLICY IF EXISTS "Allow authenticated read" ON treasure_entries;
DROP POLICY IF EXISTS "Allow public read" ON treasure_entries;
DROP POLICY IF EXISTS "Allow public insert" ON treasure_entries;

-- Create new policy to allow ANYONE to read entries
-- This is needed for the admin dashboard to work
CREATE POLICY "Allow public read" ON treasure_entries
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policy to allow anyone to insert entries
-- This is needed for the game to save entries
CREATE POLICY "Allow public insert" ON treasure_entries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ============================================
-- VERIFY POLICIES WERE CREATED
-- ============================================

-- This should show 2 policies
SELECT 
  tablename,
  policyname,
  array_to_string(roles, ', ') as roles,
  cmd as operation
FROM pg_policies 
WHERE tablename = 'treasure_entries'
ORDER BY policyname;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '==============================================';
  RAISE NOTICE '✅ RLS POLICIES UPDATED!';
  RAISE NOTICE '==============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Policies created:';
  RAISE NOTICE '  ✓ Allow public read (SELECT)';
  RAISE NOTICE '  ✓ Allow public insert (INSERT)';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '  1. Check the query results above';
  RAISE NOTICE '  2. You should see 2 policies listed';
  RAISE NOTICE '  3. Refresh your admin dashboard';
  RAISE NOTICE '  4. Entries should now appear!';
  RAISE NOTICE '';
  RAISE NOTICE '==============================================';
END $$;
