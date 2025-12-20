# 🖼️ Supabase Storage Setup Guide

## Quick Setup for Image Storage

### Step 1: Create Supabase Project (if not done)

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"New project"**
3. Fill in:
   - **Name**: Treasure Chest Fortune
   - **Database Password**: (generate and save it)
   - **Region**: Choose closest to your users
4. Click **"Create new project"**
5. Wait 1-2 minutes for setup

---

### Step 2: Create Storage Bucket

#### Option A: Using SQL (Recommended - Creates Everything)

1. Go to **SQL Editor** in sidebar
2. Click **"New query"**
3. Copy and paste this SQL:

```sql
-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('treasure-images', 'treasure-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for uploads
CREATE POLICY "Allow public upload" ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'treasure-images');

-- Set up storage policies for viewing
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'treasure-images');

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Storage bucket "treasure-images" created successfully!';
  RAISE NOTICE 'Public uploads: Enabled';
  RAISE NOTICE 'Public access: Enabled';
END $$;
```

4. Click **"Run"** or press **Cmd/Ctrl + Enter**
5. ✅ Should see success message

#### Option B: Using Dashboard (Manual)

1. Go to **Storage** in sidebar
2. Click **"Create a new bucket"**
3. Fill in:
   - **Name**: `treasure-images`
   - **Public bucket**: ✅ **Enabled** (important!)
4. Click **"Create bucket"**

**Then add policies:**

1. Click on **"treasure-images"** bucket
2. Go to **"Policies"** tab
3. Click **"New policy"**

**Policy 1: Allow Upload**
- **Policy name**: Allow public upload
- **Operation**: INSERT
- **Target roles**: anon
- **WITH CHECK expression**: `bucket_id = 'treasure-images'`
- Click **"Save policy"**

**Policy 2: Allow Read**
- **Policy name**: Allow public read
- **Operation**: SELECT
- **Target roles**: anon
- **USING expression**: `bucket_id = 'treasure-images'`
- Click **"Save policy"**

---

### Step 3: Verify Storage Bucket

1. Go to **Storage** → **treasure-images**
2. You should see an empty bucket
3. Try uploading a test image manually
4. If successful, you see the image with a public URL

**Example URL format:**
```
https://your-project-id.supabase.co/storage/v1/object/public/treasure-images/filename.png
```

---

### Step 4: Get API Credentials

1. Go to **Settings** (⚙️ gear icon in sidebar)
2. Click **API** section
3. Copy these two values:

**Project URL:**
```
https://your-project-id.supabase.co
```

**anon public key:** (long string starting with `eyJ...`)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Step 5: Add to Your App

#### Local Development:

1. **Edit** `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. **Restart** dev server:
```bash
bun run dev
```

#### Production (Netlify):

1. Go to Netlify site → **Site configuration** → **Environment variables**
2. Add **two variables**:

**Variable 1:**
- Key: `NEXT_PUBLIC_SUPABASE_URL`
- Value: `https://your-project-id.supabase.co`

**Variable 2:**
- Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

3. **Redeploy** site (or it will auto-deploy)

---

### Step 6: Test Image Upload

1. **Run** your app (locally or visit deployed site)
2. **Complete the flow:**
   - Step 1: Enter email + username
   - Step 2: Upload any image
   - Step 3: Click chest

3. **Check Console** (F12):
```
💾 Saving to Supabase...
📤 Uploading image to Supabase Storage...
✅ Image uploaded successfully: https://your-project-id.supabase.co/storage/v1/object/public/treasure-images/test_email_1234567890.png
✅ Entry saved successfully to Supabase
```

4. **Check Supabase Dashboard:**
   - Go to **Storage** → **treasure-images**
   - You should see your uploaded image
   - Click on it to view

---

## 🎯 Storage Bucket Configuration

### Current Settings:

| Setting | Value | Why |
|---------|-------|-----|
| **Bucket ID** | `treasure-images` | Fixed name in code |
| **Public** | ✅ Yes | Users can view uploaded images |
| **File Size Limit** | Default (50MB) | More than enough for photos |
| **Allowed MIME types** | All | Accepts any image format |

### Upload Process:

1. User uploads image in browser (Step 2)
2. Image converts to Blob (PNG format)
3. Filename generated: `{email}_{timestamp}.png`
4. Upload to Supabase Storage
5. Get public URL
6. Save URL to database

---

## 📊 Storage Limits (Free Tier)

| Resource | Limit | Notes |
|----------|-------|-------|
| **Storage** | 1 GB | ~1,000-5,000 images |
| **Bandwidth** | 2 GB/month | ~2,000-10,000 views |
| **File Size** | 50 MB max | Default limit |

**Upgrade when:**
- You exceed 1GB storage
- Need more than 2GB bandwidth/month
- Need custom domain for images

---

## 🔒 Security Policies Explained

### Policy 1: Allow Public Upload
```sql
CREATE POLICY "Allow public upload" ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'treasure-images');
```

**What it does:** Allows anyone to upload images to the `treasure-images` bucket

**Why:** Game players need to upload deposit proof without authentication

### Policy 2: Allow Public Read
```sql
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'treasure-images');
```

**What it does:** Allows anyone to view/download images from the bucket

**Why:** Images need to be viewable (proof of deposit)

---

## 🛠️ Advanced Configuration (Optional)

### Limit File Size

```sql
-- Add file size limit (5MB example)
ALTER TABLE storage.objects
ADD CONSTRAINT max_file_size
CHECK (char_length(metadata->>'size') < 5242880);
```

### Restrict File Types

In your app code (`src/lib/supabase.ts`), you can add:

```typescript
// Only allow images
const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
if (!allowedTypes.includes(file.type)) {
  throw new Error('Only image files are allowed');
}
```

### Auto-Delete Old Files (90 days)

```sql
-- Requires pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule cleanup
SELECT cron.schedule(
  'delete-old-images',
  '0 0 * * *', -- Daily at midnight
  $$
  DELETE FROM storage.objects
  WHERE bucket_id = 'treasure-images'
  AND created_at < NOW() - INTERVAL '90 days';
  $$
);
```

---

## 🐛 Troubleshooting

### Error: "Bucket not found"

**Solution:**
1. Go to **Storage** in Supabase dashboard
2. Verify `treasure-images` bucket exists
3. If not, run the SQL from Step 2 again

### Error: "new row violates row-level security policy"

**Solution:**
1. Go to **Storage** → **Policies**
2. Make sure you have both policies:
   - "Allow public upload" (INSERT)
   - "Allow public read" (SELECT)
3. If missing, add them using Step 2

### Error: "Unauthorized"

**Solution:**
1. Check your API keys in `.env.local`
2. Make sure using **anon** key (not service_role)
3. Verify bucket is set to **public**

### Images uploading but not visible

**Solution:**
1. Check bucket is **public** (not private)
2. Verify "Allow public read" policy exists
3. Try accessing URL directly in browser

### Upload fails with no error

**Solution:**
1. Open browser console (F12)
2. Look for CORS errors
3. Check file size isn't too large (>50MB)
4. Verify you have storage space left

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] `treasure-images` bucket created
- [ ] Bucket is set to **public**
- [ ] Upload policy added (INSERT)
- [ ] Read policy added (SELECT)
- [ ] API URL copied
- [ ] Anon key copied
- [ ] Environment variables set (local or Netlify)
- [ ] Dev server restarted
- [ ] Test upload successful
- [ ] Image visible in Supabase Storage
- [ ] Public URL accessible

---

## 📝 Quick Reference

### View Uploaded Images

**Dashboard:**
```
Supabase → Storage → treasure-images
```

**SQL Query:**
```sql
SELECT * FROM storage.objects
WHERE bucket_id = 'treasure-images'
ORDER BY created_at DESC;
```

### Get Public URL

**In Dashboard:**
1. Click on image
2. Copy "Public URL"

**Programmatically:**
```typescript
const { data: { publicUrl } } = supabase.storage
  .from('treasure-images')
  .getPublicUrl('filename.png');
```

### Delete Image

**Dashboard:**
1. Go to Storage → treasure-images
2. Click ⋮ menu on image
3. Click "Delete"

**SQL:**
```sql
DELETE FROM storage.objects
WHERE bucket_id = 'treasure-images'
AND name = 'filename.png';
```

---

## 🎉 You're Done!

Your storage is configured when:
- ✅ `treasure-images` bucket exists
- ✅ Bucket is public
- ✅ Upload and read policies active
- ✅ Environment variables set
- ✅ Test upload works

**Next:** Test the complete flow and verify images appear in Supabase!

---

## 🔗 Useful Links

- Storage Dashboard: `https://app.supabase.com/project/YOUR_PROJECT_ID/storage/buckets`
- Storage Docs: https://supabase.com/docs/guides/storage
- Policy Examples: https://supabase.com/docs/guides/storage/security
- API Reference: https://supabase.com/docs/reference/javascript/storage
