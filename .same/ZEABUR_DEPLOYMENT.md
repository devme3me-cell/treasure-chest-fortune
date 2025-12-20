# 🚀 Zeabur Deployment Guide

## Quick Deployment to Zeabur

This guide will help you deploy your Treasure Chest Fortune game to Zeabur.

---

## ✅ Pre-Deployment Checklist

Before deploying, make sure:

- [x] Code pushed to GitHub: https://github.com/devme3me-cell/treasure-chest-fortune
- [ ] Supabase project created (for image storage & database)
- [ ] Environment variables ready
- [ ] Admin password changed from default

---

## 🚀 Step 1: Deploy to Zeabur

### Option A: Deploy from GitHub (Recommended)

1. **Go to** [Zeabur Dashboard](https://zeabur.com)
2. **Sign in** with GitHub
3. **Click** "Create New Project"
4. **Select** "Deploy from GitHub"
5. **Choose** your repository: `treasure-chest-fortune`
6. **Wait** for auto-detection (Zeabur will detect Next.js)
7. **Click** "Deploy"

### Option B: Deploy via Zeabur CLI

```bash
# Install Zeabur CLI
npm install -g @zeabur/cli

# Login to Zeabur
zeabur auth login

# Deploy from project directory
cd treasure-chest-fortune
zeabur deploy
```

---

## 🔧 Step 2: Configure Environment Variables

### Required Environment Variables

After deployment starts, add these environment variables in Zeabur dashboard:

1. **Go to** your project → **Variables** tab
2. **Add** the following variables:

#### Supabase Configuration

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...your-key-here
```

#### Admin Password (Optional but Recommended)

```env
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password-here
```

### How to Get Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com)
2. Select your project (or create one)
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📊 Step 3: Set Up Supabase Database

If you haven't already, set up your Supabase database:

1. **Go to** Supabase → **SQL Editor**
2. **Copy** all SQL from `.same/supabase-schema-simple.sql`
3. **Paste** and **Run** in SQL Editor
4. **Verify** table `treasure_entries` and bucket `treasure-images` were created

**Full guide:** See `.same/SUPABASE_SETUP.md`

---

## ✅ Step 4: Verify Deployment

### Check Deployment Status

1. **Wait** for build to complete (2-5 minutes)
2. **Check** build logs in Zeabur dashboard
3. **Look for** "Build successful" message

### Get Your Live URL

Zeabur will provide a URL like:
```
https://your-project.zeabur.app
```

### Test Your Application

1. **Visit** your Zeabur URL
2. **Test** the complete flow:
   - Step 1: Registration verification
   - Step 2: Image upload
   - Step 3: Treasure chest game
3. **Check** browser console (F12) for any errors

### Test Admin Dashboard

1. **Go to** `https://your-project.zeabur.app/admin`
2. **Login** with your admin password
3. **Verify** entries are saved and displayed

---

## 🎨 Step 5: Custom Domain (Optional)

### Add Your Own Domain

1. **Go to** Zeabur project → **Domains** tab
2. **Click** "Add Domain"
3. **Enter** your domain name
4. **Follow** DNS configuration instructions
5. **Wait** for DNS propagation (5-60 minutes)

### Example DNS Settings

**For root domain (example.com):**
```
Type: A
Name: @
Value: [Zeabur IP provided]
```

**For subdomain (game.example.com):**
```
Type: CNAME
Name: game
Value: your-project.zeabur.app
```

---

## 🔍 Troubleshooting

### Build Fails

**Error: "Build failed"**

**Solution:**
1. Check build logs in Zeabur dashboard
2. Verify `package.json` has correct scripts:
   ```json
   {
     "scripts": {
       "build": "next build",
       "start": "next start"
     }
   }
   ```
3. Make sure all dependencies are in `package.json`

### Environment Variables Not Working

**Error: "Supabase not configured"**

**Solution:**
1. Go to Zeabur → **Variables** tab
2. Verify variables are set correctly
3. Click "Redeploy" to apply changes
4. Check variable names match exactly:
   - `NEXT_PUBLIC_SUPABASE_URL` (not SUPABASE_URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not SUPABASE_KEY)

### Images Not Uploading

**Error: Images fail to save**

**Solution:**
1. Verify Supabase storage bucket exists
2. Check RLS policies are correct
3. Run `.same/fix-rls-policies.sql` in Supabase
4. See `.same/DEBUG_GUIDE.md` for detailed troubleshooting

### Admin Dashboard Shows No Entries

**Error: "沒有找到記錄" (No entries found)**

**Solution:**
1. Play the game once to create an entry
2. Check browser console for errors
3. Verify RLS policies in Supabase
4. Run `.same/fix-rls-policies.sql`
5. See `.same/DEBUG_GUIDE.md`

---

## 📈 Monitoring & Analytics

### View Build Logs

1. **Go to** Zeabur project
2. **Click** on your service
3. **View** "Logs" tab
4. **Check** for errors or warnings

### Monitor Performance

Zeabur provides built-in monitoring:
- **CPU usage**
- **Memory usage**
- **Request count**
- **Response times**

Access in: **Project → Monitoring** tab

---

## 🔄 Updating Your Deployment

### Method 1: Automatic (Recommended)

Enable auto-deploy from GitHub:
1. **Go to** Zeabur project → **Settings**
2. **Enable** "Auto Deploy on Push"
3. **Now** every push to `master` auto-deploys

### Method 2: Manual Redeploy

1. **Push** changes to GitHub:
   ```bash
   git add .
   git commit -m "Update: description"
   git push origin master
   ```
2. **Go to** Zeabur dashboard
3. **Click** "Redeploy"

### Method 3: Via CLI

```bash
cd treasure-chest-fortune
zeabur deploy
```

---

## 💰 Pricing & Resources

### Zeabur Free Tier

**What you get:**
- ✅ Unlimited projects
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ GitHub integration
- ✅ Environment variables
- ✅ Build logs

**Resource limits:**
- CPU: Shared
- Memory: 512MB
- Bandwidth: Fair use

**Sufficient for:**
- Testing and development
- Small to medium traffic
- Personal projects

### When to Upgrade

Consider paid plan when:
- High traffic (>10k visits/month)
- Need dedicated resources
- Require more memory
- Want priority support

---

## 🔐 Security Best Practices

### Before Going Live

- [ ] Change admin password from `admin123`
- [ ] Use strong Supabase password
- [ ] Review RLS policies in Supabase
- [ ] Enable HTTPS (automatic on Zeabur)
- [ ] Set up custom domain (optional)

### Environment Variables

✅ **Do:**
- Store sensitive data in Zeabur variables
- Use `NEXT_PUBLIC_` prefix for client-side vars
- Keep `.env.local` out of git (already in `.gitignore`)

❌ **Don't:**
- Commit `.env.local` to GitHub
- Share Supabase service_role key
- Use default passwords in production

---

## 📊 Performance Optimization

### Recommended Settings

**In `next.config.js`:**
```javascript
module.exports = {
  // Already configured in your project
  reactStrictMode: true,
  swcMinify: true,

  // Optional: Enable image optimization
  images: {
    domains: [
      'ext.same-assets.com',
      'ugc.same-assets.com',
      'your-supabase-project-id.supabase.co'
    ],
  },
}
```

### Caching Strategy

Zeabur automatically handles:
- Static asset caching
- Edge caching for global performance
- Gzip compression

---

## 🎯 Post-Deployment Checklist

After successful deployment:

- [ ] Test complete user flow (3 steps)
- [ ] Verify prize distribution works
- [ ] Test image upload to Supabase
- [ ] Check admin dashboard access
- [ ] Verify data saves to database
- [ ] Test on mobile devices
- [ ] Check all Chinese translations display correctly
- [ ] Monitor first few entries

---

## 📝 Quick Reference

### Your URLs

**Main App:**
```
https://your-project.zeabur.app
```

**Admin Dashboard:**
```
https://your-project.zeabur.app/admin
```

**GitHub Repo:**
```
https://github.com/devme3me-cell/treasure-chest-fortune
```

### Key Commands

```bash
# Redeploy manually
zeabur deploy

# View logs
zeabur logs

# Set environment variable
zeabur env set NEXT_PUBLIC_SUPABASE_URL=https://...
```

### Important Files

- **`.same/SUPABASE_SETUP.md`** - Supabase configuration
- **`.same/DEBUG_GUIDE.md`** - Troubleshooting
- **`.same/ADMIN_DASHBOARD.md`** - Admin guide
- **`next.config.js`** - Next.js configuration
- **`package.json`** - Dependencies

---

## 🆘 Need Help?

### Documentation

1. **Zeabur Docs:** https://zeabur.com/docs
2. **Next.js Docs:** https://nextjs.org/docs
3. **Supabase Docs:** https://supabase.com/docs

### Project Documentation

- **Quick Start:** `.same/QUICK_START.md`
- **Supabase Setup:** `.same/SUPABASE_SETUP.md`
- **Troubleshooting:** `.same/DEBUG_GUIDE.md`
- **Testing:** `.same/TEST_SUMMARY.md`

### Support Channels

- **Zeabur Discord:** https://discord.gg/zeabur
- **Supabase Discord:** https://discord.supabase.com

---

## ✅ Success Criteria

Your deployment is successful when:

✅ **Build completes** without errors
✅ **App loads** at Zeabur URL
✅ **Game flow works** (all 3 steps)
✅ **Images upload** to Supabase
✅ **Data saves** to database
✅ **Admin dashboard** displays entries
✅ **Prize distribution** works correctly
✅ **Chinese text** displays properly

---

## 🎉 You're All Set!

Your Treasure Chest Fortune game is now live on Zeabur!

**Next Steps:**
1. Share your URL with users
2. Monitor entries in admin dashboard
3. Set up Supabase if not done yet
4. Consider custom domain
5. Monitor performance in Zeabur dashboard

**Happy deploying! 🚀**
