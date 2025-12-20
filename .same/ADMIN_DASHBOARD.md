# 🎛️ Admin Dashboard Guide

## Overview

The admin dashboard allows you to view and manage all treasure chest game entries stored in Supabase.

**Language:** The admin dashboard interface is in Chinese (Traditional Chinese) to match the main game interface.

## 🔗 Access URL

**Local Development:**
```
http://localhost:3000/admin
```

**Production:**
```
https://your-site.netlify.app/admin
```

---

## 🔐 Login Credentials

### Default Password
```
admin123
```

**⚠️ IMPORTANT: Change this password before deploying to production!**

### How to Change Password

**Edit:** `src/app/admin/page.tsx`

**Line 26:**
```typescript
const ADMIN_PASSWORD = 'admin123'; // Change this!
```

**Change to:**
```typescript
const ADMIN_PASSWORD = 'your-secure-password-here';
```

**For Production:** Consider using environment variables:
```typescript
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
```

Then add to `.env.local`:
```env
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
```

And to Netlify environment variables.

---

## 📊 Dashboard Features

### 1. Statistics Overview

**Top Cards Display:**
- 📈 **Total Entries** - Number of game plays
- 💰 **Total Deposits** - Sum of all deposit amounts
- 📊 **Avg Deposit** - Average deposit per entry

### 2. Prize Distribution

**Shows:**
- Each prize type (5%, 7%, 10%, etc.)
- Count of winners for each prize
- Percentage breakdown
- Validates distribution matches expected rates

### 3. Entries Table

**Displays:**
- ⏰ **Date/Time** - When entry was created
- 📧 **Email** - User's email
- 👤 **Username** - User's username
- 💵 **Amount** - Deposit amount
- 🎁 **Prize** - Prize won
- 🖼️ **Image** - Link to view uploaded image

### 4. Filter & Search

- Filter by email, username, or prize
- Real-time search results
- Shows count of filtered results

### 5. Image Viewer

**Click "View Image" to:**
- See full-size uploaded image
- Open image in new tab
- Copy image URL to clipboard

---

## 🔄 How to Use

### Step 1: Login
1. Go to `/admin` page
2. Enter admin password
3. Click **Login**

### Step 2: View Statistics
- Automatically loads when you login
- See total entries, deposits, and averages
- View prize distribution breakdown

### Step 3: Browse Entries
- Scroll through the entries table
- Click column headers to sort (if implemented)
- See all user data and prizes

### Step 4: Filter Results
- Use search box to filter entries
- Search by email, username, or prize
- Results update in real-time

### Step 5: View Images
- Click **"View Image"** link
- Modal opens with full-size image
- Options to open in new tab or copy URL

### Step 6: Refresh Data
- Click **Refresh** button to reload latest entries
- Useful when new entries are added

---

## 📱 Responsive Design

The dashboard is fully responsive:
- **Desktop**: Full table view with all columns
- **Tablet**: Horizontal scroll for table
- **Mobile**: Optimized layout, scroll as needed

---

## 🔒 Security Features

### Current Implementation

✅ **Password Protection** - Simple password required to access
✅ **Client-side Auth** - No public access without password
✅ **Supabase RLS** - Database protected by row-level security

### Security Limitations

⚠️ **Note:** Current authentication is basic client-side only

**For Production, Consider:**
1. Server-side authentication
2. Multiple admin accounts
3. Password hashing
4. Session management
5. IP whitelisting
6. Two-factor authentication

### Recommended: Use Supabase Auth

For production, integrate Supabase Authentication:

```typescript
// Example with Supabase Auth
const { data: { user } } = await supabase.auth.getUser();
if (!user || user.role !== 'admin') {
  // Redirect to login
}
```

See: https://supabase.com/docs/guides/auth

---

## 📊 Prize Statistics View

The dashboard uses the `prize_statistics` view created in your SQL schema.

**What it shows:**
- Prize type
- Count of winners
- Percentage of total
- Average deposit for that prize
- Min/Max deposit amounts

**If stats don't load:**
1. Make sure you ran the complete SQL schema
2. Check Supabase → Table Editor → Views
3. Verify `prize_statistics` view exists

---

## 🐛 Troubleshooting

### Issue: "Supabase not configured"

**Solution:**
1. Check `.env.local` has correct credentials
2. Verify `NEXT_PUBLIC_SUPABASE_URL` is set
3. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
4. Restart dev server

### Issue: "Incorrect password"

**Solution:**
1. Check you're using correct password
2. Default is `admin123`
3. If changed, verify in `src/app/admin/page.tsx`

### Issue: No entries showing

**Possible causes:**
1. No one has played the game yet
2. Database table is empty
3. RLS policies preventing read access

**Solution:**
1. Test game flow and create an entry
2. Check Supabase → Table Editor → treasure_entries
3. Verify data exists
4. Check console for errors (F12)

### Issue: Images not loading

**Solution:**
1. Verify storage bucket is public
2. Check image URL in database
3. Test URL directly in browser
4. Verify storage policies allow public read

### Issue: Statistics not showing

**Solution:**
1. Make sure `prize_statistics` view was created
2. Run complete SQL schema again
3. Check Supabase SQL Editor for view creation errors

---

## 🎨 Customization

### Change Password (Basic)

**File:** `src/app/admin/page.tsx`
**Line:** 26

```typescript
const ADMIN_PASSWORD = 'your-password-here';
```

### Change Colors/Styling

The dashboard uses the same styling as the main app:
- Dark background
- Golden accents
- Glassmorphism cards

**Edit:** `src/app/globals.css` to change theme

### Add Export Feature

To add CSV export:

```typescript
const exportToCSV = () => {
  const csv = [
    ['Date', 'Email', 'Username', 'Amount', 'Prize', 'Image URL'],
    ...entries.map(e => [
      e.created_at,
      e.email,
      e.username,
      e.deposit_amount,
      e.prize,
      e.image_url || ''
    ])
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'entries.csv';
  a.click();
};
```

### Add Sorting

To add column sorting:

```typescript
const [sortBy, setSortBy] = useState<keyof Entry>('created_at');
const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

const sortedEntries = [...filteredEntries].sort((a, b) => {
  const aVal = a[sortBy];
  const bVal = b[sortBy];
  return sortOrder === 'asc'
    ? aVal > bVal ? 1 : -1
    : aVal < bVal ? 1 : -1;
});
```

---

## 📈 Analytics Ideas

### Additional Metrics to Track

1. **Daily/Weekly Trends**
   - Entries per day
   - Peak playing times
   - Growth rate

2. **User Behavior**
   - Average deposit by prize
   - Repeat players (same email)
   - Completion rate (started vs finished)

3. **Prize Distribution Validation**
   - Compare actual vs expected rates
   - Identify anomalies
   - Verify randomness

4. **Image Analytics**
   - Upload success rate
   - Image sizes
   - Storage usage

### Example Query (Add to dashboard)

```typescript
// Get entries per day
const { data } = await supabase
  .from('treasure_entries')
  .select('created_at')
  .order('created_at', { ascending: true });

const entriesPerDay = data.reduce((acc, entry) => {
  const date = new Date(entry.created_at).toLocaleDateString();
  acc[date] = (acc[date] || 0) + 1;
  return acc;
}, {});
```

---

## 🚀 Production Deployment

### Before Deploying

- [ ] Change admin password
- [ ] Test login functionality
- [ ] Verify all entries display correctly
- [ ] Test image viewing
- [ ] Check responsive design
- [ ] Review security settings

### Environment Variables for Production

**Netlify:**
```
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

---

## 📝 Quick Reference

### Access Dashboard
```
Local: http://localhost:3000/admin
Production: https://your-site/admin
```

### Default Password
```
admin123
```

### Change Password
```typescript
// src/app/admin/page.tsx line 26
const ADMIN_PASSWORD = 'new-password';
```

### Key Features
- 📊 View all entries
- 🖼️ View uploaded images
- 📈 Prize statistics
- 🔍 Search/filter
- 🔄 Refresh data

---

## 🎯 Next Steps

1. **Change Password** - Update from default
2. **Test Locally** - Go through admin flow
3. **Add Features** - Export, sorting, etc.
4. **Secure for Production** - Consider server-side auth
5. **Monitor Usage** - Check entries regularly

---

## 🔗 Related Documentation

- Supabase Setup: `.same/SUPABASE_SETUP.md`
- Storage Guide: `.same/SUPABASE_STORAGE_GUIDE.md`
- Main App Guide: `.same/QUICK_START.md`

**Your admin dashboard is ready! Access it at `/admin`** 🎉
