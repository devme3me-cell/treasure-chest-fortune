# 🔍 Debugging Guide - Entries Not Showing

## Quick Diagnosis

Follow these steps to find out why entries aren't showing up.

---

## Step 1: Check Supabase Configuration

### Open Browser Console (F12)

1. **Start dev server:**
   ```bash
   bun run dev
   ```

2. **Open Console (F12)** in browser

3. **Go through the game** (all 3 steps)

4. **Look for these messages:**

### ✅ If Working Correctly:
```
💾 Saving to Supabase...
📤 Uploading image to Supabase Storage...
✅ Image uploaded successfully: https://...
📤 Saving entry to database...
✅ Entry saved successfully to Supabase: [{...}]
```

### ❌ If Not Configured:
```
⚠️ Supabase not configured. Entry: {...}
📝 To configure: See .same/SUPABASE_SETUP.md
```
**Fix:** Add credentials to `.env.local`

### ❌ If Error Saving:
```
❌ Error saving to Supabase: [error message]
```
**Fix:** See error message for specific issue

---

## Step 2: Verify Supabase Project Setup

### A. Check Database Table Exists

1. **Go to Supabase Dashboard**
2. **Click:** Table Editor (left sidebar)
3. **Look for:** `treasure_entries` table

**If table doesn't exist:**
- Run SQL from `.same/supabase-schema-simple.sql`
- Make sure no errors appeared

### B. Check Storage Bucket Exists

1. **Go to Supabase Dashboard**
2. **Click:** Storage (left sidebar)
3. **Look for:** `treasure-images` bucket

**If bucket doesn't exist:**
- Run SQL again (it creates the bucket)
- Or create manually (see guide)

### C. Check RLS Policies

1. **Go to:** Authentication → Policies
2. **Find:** `treasure_entries` table
3. **Should have 2 policies:**
   - ✅ "Allow public insert" (INSERT to anon)
   - ✅ "Allow public read" (SELECT to anon)

**If policies missing:**
```sql
-- Run this in SQL Editor:
DROP POLICY IF EXISTS "Allow public read" ON treasure_entries;
CREATE POLICY "Allow public read" ON treasure_entries
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow public insert" ON treasure_entries;
CREATE POLICY "Allow public insert" ON treasure_entries
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

---

## Step 3: Test Manual Insert

### Try Inserting Directly in Supabase

1. **Go to:** Table Editor → treasure_entries
2. **Click:** "Insert row"
3. **Fill in:**
   - email: `test@test.com`
   - username: `testuser`
   - deposit_amount: `1000`
   - prize: `首儲金5%`
   - image_url: (leave empty or add test URL)
4. **Click:** Save

**If this works:**
- Problem is in the app code
- Check console for errors

**If this fails:**
- Problem is with table structure
- Re-run SQL schema

---

## Step 4: Check Admin Dashboard Access

### Open Admin Dashboard

1. **Go to:** `http://localhost:3000/admin`
2. **Login with:** `admin123`
3. **Click:** Refresh button
4. **Open Console (F12)**

### Look for Console Messages:

**✅ If working:**
```
(No error messages)
```

**❌ If error:**
```
Error fetching data: [error message]
```

### Common Error Messages:

#### "relation treasure_entries does not exist"
**Fix:** Run SQL schema to create table

#### "permission denied for table treasure_entries"
**Fix:** Update RLS policies (see Step 2C)

#### "Failed to fetch"
**Fix:** Check Supabase URL is correct

---

## Step 5: Verify Environment Variables

### Check .env.local File

```bash
cat treasure-chest-fortune/.env.local
```

**Should show:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

**If wrong:**
1. Copy correct values from Supabase → Settings → API
2. Update `.env.local`
3. **RESTART dev server** (important!)

---

## Step 6: Test Complete Flow with Logging

### 1. Clear Browser Cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### 2. Open Console BEFORE starting
- F12 → Console tab
- Clear console

### 3. Go Through Game
**Step 1:**
- Select "是，我已註冊"
- Email: `debug@test.com`
- Username: `debuguser`
- Click "下一步"

**Step 2:**
- Upload any image
- Amount: `999`
- Click "開始抽獎"

**Step 3:**
- Click treasure chest
- Wait for prize reveal
- **Check console immediately**

### 4. What to Look For

**Saving Phase:**
```javascript
💾 Saving to Supabase...
📤 Uploading image to Supabase Storage...
```

**Success Messages:**
```javascript
✅ Image uploaded successfully: https://...
✅ Entry saved successfully to Supabase
```

**UI Feedback:**
```
正在保存記錄...  → ✓ 記錄已保存
```

### 5. Check Supabase Immediately

**Storage:**
- Go to Storage → treasure-images
- Look for newest file
- Should see: `debug_test_com_[timestamp].png`

**Database:**
- Go to Table Editor → treasure_entries
- Look for newest row
- Should see: `debug@test.com` entry

---

## Step 7: Common Issues & Solutions

### Issue: "Entry saves but doesn't show in admin"

**Cause:** RLS policy blocks reading

**Fix:**
```sql
-- Run in Supabase SQL Editor:
DROP POLICY IF EXISTS "Allow public read" ON treasure_entries;
CREATE POLICY "Allow public read" ON treasure_entries
  FOR SELECT
  TO anon, authenticated
  USING (true);
```

### Issue: "Image uploads but URL is null"

**Cause:** Storage policy blocks reading URLs

**Fix:**
```sql
-- Run in Supabase SQL Editor:
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'treasure-images');
```

### Issue: "Nothing saves at all"

**Checklist:**
- [ ] Supabase credentials in `.env.local`
- [ ] Dev server restarted after adding credentials
- [ ] SQL schema ran successfully
- [ ] Table and bucket exist
- [ ] RLS policies created

### Issue: "CORS errors in console"

**This is normal!** Using `mode: 'no-cors'` means:
- Can't read response
- But data IS being sent
- Check Supabase to verify

---

## Step 8: Run SQL Update to Fix Policies

Copy and run this in **Supabase SQL Editor:**

```sql
-- Fix RLS policies for admin dashboard access
-- This allows the admin dashboard to read entries

-- Drop old policies
DROP POLICY IF EXISTS "Allow authenticated read" ON treasure_entries;
DROP POLICY IF EXISTS "Allow public read" ON treasure_entries;
DROP POLICY IF EXISTS "Allow public insert" ON treasure_entries;

-- Create new policies
CREATE POLICY "Allow public read" ON treasure_entries
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public insert" ON treasure_entries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Verify policies were created
SELECT schemaname, tablename, policyname, roles, cmd
FROM pg_policies
WHERE tablename = 'treasure_entries';
```

**Expected output:**
```
treasure_entries | Allow public read   | {anon, authenticated} | SELECT
treasure_entries | Allow public insert | {anon}                | INSERT
```

---

## Step 9: Still Not Working?

### Collect This Information:

1. **Console logs** (F12 → Console)
   - Screenshot after playing game

2. **Supabase check:**
   - Does `treasure_entries` table exist?
   - How many rows in table?
   - Does `treasure-images` bucket exist?
   - How many files in bucket?

3. **Environment:**
   ```bash
   # Check credentials are set (don't share the actual values!)
   cd treasure-chest-fortune
   grep "NEXT_PUBLIC_SUPABASE" .env.local
   ```

4. **Server logs:**
   - Any errors when running `bun run dev`?

---

## Quick Fix Checklist

Run through this list:

- [ ] `.env.local` has correct Supabase URL and key
- [ ] Dev server restarted after adding credentials
- [ ] SQL schema ran without errors
- [ ] Table `treasure_entries` exists in Supabase
- [ ] Bucket `treasure-images` exists in Supabase
- [ ] RLS policy "Allow public read" exists
- [ ] RLS policy "Allow public insert" exists
- [ ] Browser console shows "✅ Entry saved successfully"
- [ ] Can manually insert row in Supabase Table Editor
- [ ] Admin dashboard can login (password works)
- [ ] Clicked "Refresh" in admin dashboard

---

## Success Indicators

You'll know it's working when:

✅ **After playing game:**
- Console: "✅ Entry saved successfully to Supabase"
- UI: "✓ 記錄已保存"

✅ **In Supabase:**
- New row in treasure_entries table
- New image in treasure-images bucket

✅ **In Admin Dashboard:**
- Entry appears in table
- "View Image" link works
- Statistics update

---

## Need More Help?

1. **Run the update SQL** from Step 8
2. **Restart everything:**
   ```bash
   # Kill dev server
   # Clear browser cache
   bun run dev
   # Test again
   ```

3. **Check files:**
   - `.same/supabase-schema-simple.sql` (updated)
   - `.same/SUPABASE_SETUP.md` (full guide)

**Most common fix:** Run the SQL from Step 8 to update RLS policies! 🎯
