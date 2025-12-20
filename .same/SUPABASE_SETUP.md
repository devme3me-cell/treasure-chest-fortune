# Supabase Setup Guide - Treasure Chest Fortune

This guide will help you set up Supabase to store uploaded images and entry data.

## 🎯 What You'll Get

- ✅ **Image Storage** - Uploaded deposit proof images stored in Supabase Storage
- ✅ **Database Storage** - All entry data (email, username, amount, prize) in PostgreSQL
- ✅ **Public URLs** - Each image gets a public URL for easy access
- ✅ **Analytics** - Built-in view to see prize distribution statistics
- ✅ **Scalable** - Handles thousands of entries efficiently
- ✅ **Free Tier** - 500MB storage + 2GB bandwidth per month (free)

---

## 📋 Step 1: Create Supabase Project

1. **Go to** [https://supabase.com](https://supabase.com)
2. **Sign up** or **Log in** with GitHub
3. **Click** "New project"
4. **Fill in**:
   - **Name**: Treasure Chest Fortune
   - **Database Password**: (generate a strong password and save it)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free (sufficient for most use cases)
5. **Click** "Create new project"
6. **Wait** 1-2 minutes for project to be ready

---

## 📋 Step 2: Get API Credentials

1. In your Supabase project dashboard, click **Settings** (gear icon in sidebar)
2. Click **API** in the settings menu
3. **Copy** the following:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

**Example:**
```
Project URL: https://abcdefghijk.supabase.co
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📋 Step 3: Run Database Schema

1. In Supabase dashboard, click **SQL Editor** in sidebar
2. Click **New query**
3. **Copy ALL** the SQL from `.same/supabase-schema.sql`
4. **Paste** into the SQL editor
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. **Verify** success message appears

**What this creates:**
- ✅ `treasure_entries` table (stores all game entries)
- ✅ `treasure-images` storage bucket (stores uploaded images)
- ✅ `prize_statistics` view (analytics)
- ✅ Row-level security policies (protects data)

---

## 📋 Step 4: Configure Your App

### Option A: Local Development

1. **Copy** `.env.local.example` to `.env.local`:
   ```bash
   cd treasure-chest-fortune
   cp .env.local.example .env.local
   ```

2. **Edit** `.env.local` and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Restart** your dev server:
   ```bash
   bun run dev
   ```

### Option B: Production (Netlify)

1. Go to your Netlify site dashboard
2. Click **Site configuration** → **Environment variables**
3. **Add** two new variables:
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Your Supabase project URL

   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Your Supabase anon key

4. **Redeploy** your site (Netlify will use new env vars)

---

## 📋 Step 5: Test the Integration

1. **Start** your app (locally or visit deployed site)
2. **Go through** the complete flow:
   - Step 1: Enter email and username
   - Step 2: Upload an image and enter amount
   - Step 3: Click treasure chest and get prize

3. **Check browser console** (F12):
   ```
   💾 Saving to Supabase...
   📤 Uploading image to Supabase Storage...
   ✅ Image uploaded successfully: https://...
   📤 Saving entry to database...
   ✅ Entry saved successfully to Supabase
   ```

4. **Verify in Supabase**:

   **Check Storage:**
   - Go to **Storage** → **treasure-images**
   - You should see your uploaded image

   **Check Database:**
   - Go to **Table Editor** → **treasure_entries**
   - You should see a new row with your data

---

## 📊 View Analytics

### Method 1: Supabase Dashboard

1. Go to **Table Editor** → **prize_statistics** (view)
2. See real-time statistics:
   - Prize distribution
   - Count per prize
   - Percentage breakdown
   - Average/min/max deposit amounts

### Method 2: SQL Query

In SQL Editor, run:
```sql
SELECT * FROM prize_statistics;
```

**Example output:**
```
prize       | count | percentage | avg_deposit | min_deposit | max_deposit
------------|-------|------------|-------------|-------------|-------------
首儲金5%    | 95    | 95.00      | 1234.56     | 100         | 50000
首儲金7%    | 4     | 4.00       | 2345.67     | 500         | 10000
首儲金10%   | 1     | 1.00       | 5000.00     | 5000        | 5000
```

---

## 🔍 Database Structure

### `treasure_entries` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique entry ID (auto-generated) |
| `created_at` | TIMESTAMP | When entry was created |
| `email` | TEXT | User's email |
| `username` | TEXT | User's username |
| `deposit_amount` | NUMERIC | Deposit amount entered |
| `prize` | TEXT | Prize won (5%, 7%, 10%, etc.) |
| `image_url` | TEXT | Public URL to uploaded image |

### Storage Bucket: `treasure-images`

- **Public access**: Yes (images are publicly viewable)
- **File naming**: `{sanitized_email}_{timestamp}.png`
- **Automatic cleanup**: No (you can set up lifecycle policies)

---

## 🔒 Security & Privacy

### Row Level Security (RLS)

✅ **Enabled** - Protects your data

**Policies in place:**
1. **Insert**: Anyone (anon) can insert new entries (for the game)
2. **Select**: Only authenticated users can view all entries
3. **Service role**: Full access (for admin tasks)

**What this means:**
- ✅ Game players can submit entries
- ✅ Only you (authenticated) can view all entries
- ✅ Players cannot see other players' data
- ✅ Data is protected from unauthorized access

### API Keys

- **anon key**: Safe to expose in client-side code (limited permissions)
- **service_role key**: ⚠️ NEVER expose (full admin access)

---

## 💰 Pricing & Limits (Free Tier)

| Resource | Free Tier | Notes |
|----------|-----------|-------|
| Database | 500 MB | Enough for ~50,000 entries |
| Storage | 1 GB | ~1,000-5,000 images depending on size |
| Bandwidth | 2 GB/month | ~2,000-10,000 image views |
| API Requests | Unlimited | No rate limits on free tier |

**Upgrade when:**
- You exceed storage limits
- You need more bandwidth
- You want custom domain for storage

---

## 🛠️ Advanced Features

### 1. Set Up Storage Lifecycle Policies

Delete old images after 90 days:

```sql
-- Run in SQL Editor
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Delete images older than 90 days (optional)
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

### 2. Export Data

**Method 1: Supabase Dashboard**
1. Go to **Table Editor** → **treasure_entries**
2. Click **Export** → **CSV**

**Method 2: SQL Query**
```sql
COPY (SELECT * FROM treasure_entries)
TO '/tmp/entries.csv'
WITH CSV HEADER;
```

### 3. Create API Endpoint for Stats

```typescript
// pages/api/stats.ts
import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('prize_statistics')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}
```

---

## 🐛 Troubleshooting

### Issue: "Invalid API key"

**Solution:**
1. Double-check your `.env.local` file
2. Make sure you copied the **anon** key (not service_role)
3. Restart your dev server after changing .env.local

### Issue: "Row Level Security policy violation"

**Solution:**
1. Make sure you ran the schema SQL completely
2. Check policies in **Authentication** → **Policies**
3. Verify policies exist for `treasure_entries` table

### Issue: Images not uploading

**Solution:**
1. Check **Storage** → **Buckets** → **treasure-images** exists
2. Verify bucket is **public**
3. Check storage policies in **Storage** → **Policies**

### Issue: No data in database

**Solution:**
1. Open browser console (F12)
2. Look for red errors
3. Check if Supabase URL and key are correct
4. Verify schema was created successfully

### Issue: "Bucket not found"

**Solution:**
Run this in SQL Editor:
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('treasure-images', 'treasure-images', true)
ON CONFLICT (id) DO NOTHING;
```

---

## 📝 Quick Reference

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

### Important URLs
- Supabase Dashboard: https://app.supabase.com
- Your Project: https://app.supabase.com/project/YOUR_PROJECT_ID
- Storage Browser: https://app.supabase.com/project/YOUR_PROJECT_ID/storage/buckets
- Table Editor: https://app.supabase.com/project/YOUR_PROJECT_ID/editor
- SQL Editor: https://app.supabase.com/project/YOUR_PROJECT_ID/sql

### Useful SQL Queries

**View all entries:**
```sql
SELECT * FROM treasure_entries ORDER BY created_at DESC;
```

**Count entries:**
```sql
SELECT COUNT(*) FROM treasure_entries;
```

**Prize distribution:**
```sql
SELECT * FROM prize_statistics;
```

**Recent entries:**
```sql
SELECT * FROM treasure_entries
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

**Average deposit by prize:**
```sql
SELECT prize, AVG(deposit_amount) as avg_amount
FROM treasure_entries
GROUP BY prize;
```

---

## ✅ Success Checklist

- [ ] Created Supabase project
- [ ] Copied API credentials
- [ ] Ran database schema SQL
- [ ] Added environment variables
- [ ] Tested image upload
- [ ] Verified data in database
- [ ] Checked prize_statistics view
- [ ] Deployed to production (if applicable)

---

## 🚀 Next Steps

1. **Monitor** your data in Supabase dashboard
2. **Set up** email notifications (optional)
3. **Create** analytics dashboard (optional)
4. **Export** data regularly for backup
5. **Scale** to paid plan when needed

**Your treasure chest game now has enterprise-grade data storage! 🎉**
