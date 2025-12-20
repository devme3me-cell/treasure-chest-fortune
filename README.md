# 🎰 Treasure Chest Fortune Game (樹王團隊)

A beautiful three-step fortune game with animated treasure chest, weighted prize distribution, and full Chinese interface.

[![Deploy to Zeabur](https://zeabur.com/button.svg)](https://zeabur.com)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

---

## ✨ Features

- 🎮 **Three-Step Game Flow**
  - Step 1: Registration verification with email/username
  - Step 2: Deposit proof upload with amount entry
  - Step 3: Interactive treasure chest with prize reveal

- 🎨 **Beautiful Animations**
  - Animated SVG treasure chest with opening animation
  - Shake effects and golden glow
  - Smooth transitions and sparkle effects

- 🎲 **Weighted Prize Distribution**
  - 首儲金5%: 95% chance (most common)
  - 首儲金7%: 4.75% chance (rare)
  - 首儲金10%: 0.24% chance (super rare)
  - Display-only prizes: 30%, 50%, 100% (never awarded)

- 🗄️ **Supabase Integration**
  - Image storage in Supabase Storage
  - PostgreSQL database for entries
  - Row-level security policies

- 🎛️ **Admin Dashboard (管理後台)**
  - View all entries and statistics
  - Prize distribution analytics
  - Image viewer and search/filter
  - **Full Chinese interface**

- 🌏 **Complete Chinese Localization**
  - Traditional Chinese UI
  - Professional translations
  - Consistent terminology

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/devme3me-cell/treasure-chest-fortune.git
cd treasure-chest-fortune
```

### 2. Install Dependencies

```bash
bun install
# or
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
NEXT_PUBLIC_ADMIN_PASSWORD=your-admin-password
```

### 4. Set Up Supabase

1. Create a Supabase project at https://supabase.com
2. Run the SQL schema from `.same/supabase-schema-simple.sql`
3. Copy your API credentials

**Full guide:** [`.same/SUPABASE_SETUP.md`](.same/SUPABASE_SETUP.md)

### 5. Run Development Server

```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📦 Deployment

### Deploy to Zeabur (Recommended)

1. Push your code to GitHub
2. Go to [Zeabur Dashboard](https://zeabur.com)
3. Deploy from GitHub repository
4. Add environment variables
5. Done!

**Full guide:** [`.same/ZEABUR_DEPLOYMENT.md`](.same/ZEABUR_DEPLOYMENT.md)

**Quick checklist:** [`.same/ZEABUR_CHECKLIST.md`](.same/ZEABUR_CHECKLIST.md)

### Other Platforms

The app can also be deployed to:
- Vercel
- Railway
- Render
- AWS Amplify

---

## 🎯 How to Play

### User Flow

1. **Step 1: Registration Verification**
   - Select "是，我已註冊" (Yes, I'm registered)
   - Enter email and username
   - Click "下一步" (Next)

2. **Step 2: Upload Deposit Proof**
   - Upload deposit screenshot
   - Enter deposit amount
   - Click "開始抽獎" (Start Game)

3. **Step 3: Win a Prize**
   - Click the treasure chest
   - Watch opening animation
   - See your prize revealed
   - Prize is saved to database

### Admin Access

- URL: `/admin`
- Default password: `admin123` (change this!)
- View all entries, statistics, and uploaded images

---

## 🧪 Testing

### Test Prize Distribution

```bash
# Command-line test (10,000 draws)
node test-distribution.js 10000
```

Or open `.same/test-prize-distribution.html` in browser for visual testing.

**Expected results:**
- 首儲金5%: ~95%
- 首儲金7%: ~5%
- 首儲金10%: ~0.2%
- Display-only: 0%

**Test results:** [`.same/TEST_RESULTS.md`](.same/TEST_RESULTS.md)

### Manual Testing

Follow the complete test checklist: [`.same/FLOW_TEST_CHECKLIST.md`](.same/FLOW_TEST_CHECKLIST.md)

---

## 📁 Project Structure

```
treasure-chest-fortune/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main game (3 steps)
│   │   ├── admin/page.tsx        # Admin dashboard
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── TreasureChest.tsx     # Animated chest component
│   │   └── ui/                   # shadcn/ui components
│   └── lib/
│       ├── supabase.ts           # Supabase client
│       └── utils.ts              # Utilities
├── .same/                        # Documentation
│   ├── ZEABUR_DEPLOYMENT.md      # Zeabur guide
│   ├── SUPABASE_SETUP.md         # Supabase guide
│   ├── ADMIN_DASHBOARD.md        # Admin guide
│   ├── DEBUG_GUIDE.md            # Troubleshooting
│   └── ...                       # More guides
├── next.config.js                # Next.js config
├── tailwind.config.ts            # Tailwind config
└── package.json                  # Dependencies
```

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Backend:** [Supabase](https://supabase.com/) (PostgreSQL + Storage)
- **Package Manager:** [Bun](https://bun.sh/)
- **Deployment:** [Zeabur](https://zeabur.com)

---

## 📚 Documentation

### Setup & Deployment

- [Quick Start](.same/QUICK_START.md) - Get started quickly
- [Zeabur Deployment](.same/ZEABUR_DEPLOYMENT.md) - Deploy to Zeabur
- [Zeabur Checklist](.same/ZEABUR_CHECKLIST.md) - Quick deployment checklist
- [Supabase Setup](.same/SUPABASE_SETUP.md) - Database & storage setup
- [Supabase Storage Guide](.same/SUPABASE_STORAGE_GUIDE.md) - Storage details

### Features & Testing

- [Admin Dashboard](.same/ADMIN_DASHBOARD.md) - Admin interface guide
- [Test Summary](.same/TEST_SUMMARY.md) - Testing overview
- [Test Results](.same/TEST_RESULTS.md) - Verified results
- [Flow Test Checklist](.same/FLOW_TEST_CHECKLIST.md) - Complete test cases
- [Chinese Translations](.same/CHINESE_TRANSLATIONS.md) - Translation reference

### Troubleshooting

- [Debug Guide](.same/DEBUG_GUIDE.md) - Common issues & solutions
- [Fix RLS Policies](.same/fix-rls-policies.sql) - Fix database access

---

## 🎨 Customization

### Change Admin Password

Edit `src/app/admin/page.tsx` line 38:

```typescript
const ADMIN_PASSWORD = 'your-secure-password';
```

Or use environment variable:

```env
NEXT_PUBLIC_ADMIN_PASSWORD=your-password
```

### Modify Prize Weights

Edit `src/app/page.tsx`:

```typescript
const PRIZE_WEIGHTS = {
  '首儲金5%': 400,   // Adjust weights
  '首儲金7%': 20,
  '首儲金10%': 1,
  // ...
};
```

### Change Theme Colors

Edit `src/app/globals.css` CSS variables:

```css
:root {
  --background: 222 47% 11%;    /* Dark navy */
  --primary: 45 93% 58%;        /* Gold */
  --accent: 45 93% 58%;         /* Gold accent */
}
```

---

## 🔒 Security

### Before Production

- [ ] Change admin password from `admin123`
- [ ] Review Supabase RLS policies
- [ ] Use strong passwords
- [ ] Enable HTTPS (automatic on Zeabur)
- [ ] Keep `.env.local` out of git

### Environment Variables

✅ Safe for client-side:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_ADMIN_PASSWORD`

❌ Never expose:
- Supabase `service_role` key
- Database passwords
- API secrets

---

## 📊 Prize Distribution Logic

```javascript
Total weight pool: 421

首儲金5%:  400/421 = 95.01%  ← Most players
首儲金7%:  20/421  = 4.75%   ← 1 in 20 players
首儲金10%: 1/421   = 0.24%   ← 1 in 400 players
首儲金30%:  0/421  = 0%      ← Never awarded (display only)
首儲金50%:  0/421  = 0%      ← Never awarded (display only)
首儲金100%: 0/421  = 0%      ← Never awarded (display only)
```

Verified with 61,000+ automated tests. See [test results](.same/TEST_RESULTS.md).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 🆘 Support

### Documentation

All guides are in the [`.same/`](.same/) directory.

### Common Issues

See [Debug Guide](.same/DEBUG_GUIDE.md) for solutions to common problems.

### Need Help?

1. Check the documentation in `.same/`
2. Review test results and examples
3. Check Zeabur/Supabase docs
4. Open an issue on GitHub

---

## 🎉 Acknowledgments

- Animated treasure chest SVG inspired by CodePen designs
- Built with [Same](https://same.new)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Deployed on [Zeabur](https://zeabur.com)

---

## 📞 Links

- **GitHub:** https://github.com/devme3me-cell/treasure-chest-fortune
- **Zeabur:** https://zeabur.com
- **Supabase:** https://supabase.com
- **Documentation:** [.same/](.same/)

---

**Built with ❤️ using Next.js, TypeScript, and Supabase**

**Ready to deploy? Follow [Zeabur Deployment Guide](.same/ZEABUR_DEPLOYMENT.md)** 🚀
