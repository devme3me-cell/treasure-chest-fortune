# ✅ Zeabur Deployment Checklist

Quick reference checklist for deploying to Zeabur.

---

## 🚀 Pre-Deployment (5 minutes)

- [ ] **Code pushed to GitHub**
  - Repository: https://github.com/devme3me-cell/treasure-chest-fortune
  - Branch: `master`
  - Status: All changes committed

- [ ] **Supabase project created** (optional, can do later)
  - URL: https://supabase.com
  - Project ID: `_______________`
  - Database schema run: `.same/supabase-schema-simple.sql`

- [ ] **Admin password changed** (recommended)
  - File: `src/app/admin/page.tsx` line 38
  - Or use environment variable: `NEXT_PUBLIC_ADMIN_PASSWORD`

---

## 📦 Deploy to Zeabur (2 minutes)

### Option 1: Via Dashboard (Easiest)

1. - [ ] Go to https://zeabur.com
2. - [ ] Sign in with GitHub
3. - [ ] Click "Create New Project"
4. - [ ] Select "Deploy from GitHub"
5. - [ ] Choose repository: `treasure-chest-fortune`
6. - [ ] Click "Deploy"
7. - [ ] Wait for build (2-5 minutes)

### Option 2: Via CLI

```bash
# Install CLI
npm install -g @zeabur/cli

# Login
zeabur auth login

# Deploy
cd treasure-chest-fortune
zeabur deploy
```

---

## ⚙️ Configure Environment (3 minutes)

In Zeabur dashboard → Your project → **Variables** tab:

### Add These Variables:

- [ ] **NEXT_PUBLIC_SUPABASE_URL**
  - Value: `https://your-project-id.supabase.co`
  - Get from: Supabase → Settings → API → Project URL

- [ ] **NEXT_PUBLIC_SUPABASE_ANON_KEY**
  - Value: `eyJhbGci...` (long string)
  - Get from: Supabase → Settings → API → anon public key

- [ ] **NEXT_PUBLIC_ADMIN_PASSWORD** (optional)
  - Value: Your secure password
  - Default is `admin123` if not set

### After Adding Variables:

- [ ] Click "Redeploy" to apply changes

---

## 🗄️ Set Up Supabase (5-10 minutes)

### If Not Done Yet:

1. - [ ] Create Supabase project at https://supabase.com
2. - [ ] Copy SQL from `.same/supabase-schema-simple.sql`
3. - [ ] Paste in Supabase → SQL Editor
4. - [ ] Click "Run"
5. - [ ] Verify table and bucket created

### Verify Setup:

- [ ] Table `treasure_entries` exists
- [ ] Storage bucket `treasure-images` exists
- [ ] RLS policies created
- [ ] Got API credentials (URL + anon key)

**Full guide:** `.same/SUPABASE_SETUP.md`

---

## ✅ Test Deployment (5 minutes)

### Get Your URL:

- [ ] Copy Zeabur URL: `https://________.zeabur.app`

### Test Main App:

1. - [ ] Visit your Zeabur URL
2. - [ ] Step 1: Select "是，我已註冊" → Enter email + username → Next
3. - [ ] Step 2: Upload test image → Enter amount → Start game
4. - [ ] Step 3: Click treasure chest → Get prize
5. - [ ] Check console (F12) for "✅ Entry saved successfully"

### Test Admin Dashboard:

1. - [ ] Go to: `https://________.zeabur.app/admin`
2. - [ ] Login with admin password
3. - [ ] Click "刷新" (Refresh)
4. - [ ] Verify entry appears in table
5. - [ ] Click "查看圖片" to see uploaded image

---

## 🎯 Post-Deployment (Optional)

### Custom Domain:

- [ ] Go to Zeabur → Domains
- [ ] Add your domain
- [ ] Configure DNS
- [ ] Wait for propagation

### Auto-Deploy:

- [ ] Enable "Auto Deploy on Push" in Zeabur settings
- [ ] Now `git push` will auto-deploy

### Security:

- [ ] Changed admin password from default
- [ ] Reviewed Supabase RLS policies
- [ ] Tested on mobile devices

---

## 📊 Monitor & Maintain

### Regular Checks:

- [ ] Check Zeabur logs for errors
- [ ] Monitor entries in admin dashboard
- [ ] Review prize distribution stats
- [ ] Check Supabase storage usage

### If Issues Occur:

1. Check `.same/DEBUG_GUIDE.md`
2. Review Zeabur logs
3. Verify environment variables
4. Test locally first

---

## 🆘 Quick Troubleshooting

### Build Failed?
→ Check Zeabur logs for specific error

### "Supabase not configured"?
→ Add environment variables in Zeabur

### No entries showing in admin?
→ Run `.same/fix-rls-policies.sql` in Supabase

### Images not uploading?
→ Check storage bucket exists and is public

**Full guide:** `.same/ZEABUR_DEPLOYMENT.md`

---

## ✅ Done!

When all checkboxes are checked, your app is:
- ✅ Deployed to Zeabur
- ✅ Connected to Supabase
- ✅ Fully functional
- ✅ Ready for users

**Your live URL:** `https://________.zeabur.app`

**Admin dashboard:** `https://________.zeabur.app/admin`

---

## 📚 Documentation Reference

- **Full deployment guide:** `.same/ZEABUR_DEPLOYMENT.md`
- **Supabase setup:** `.same/SUPABASE_SETUP.md`
- **Troubleshooting:** `.same/DEBUG_GUIDE.md`
- **Admin guide:** `.same/ADMIN_DASHBOARD.md`
- **Quick start:** `.same/QUICK_START.md`

**Happy deploying! 🚀**
