# 🇨🇳 Chinese Translations Reference

## Admin Dashboard Translations (Version 25)

This document lists all the Chinese translations used in the admin dashboard interface.

---

## Login Page

| English | Chinese | Notes |
|---------|---------|-------|
| Admin Dashboard | 管理後台 | Page title |
| Enter Admin Password | 輸入管理員密碼 | Input label |
| Password | 密碼 | Placeholder text |
| Login | 登入 | Button text |
| Incorrect password | 密碼錯誤 | Error message |

---

## Main Dashboard Header

| English | Chinese | Notes |
|---------|---------|-------|
| Admin Dashboard | 管理後台 | Page title |
| Logout | 登出 | Button text |

---

## Statistics Cards

| English | Chinese | Notes |
|---------|---------|-------|
| Total Entries | 總記錄數 | First stat card |
| Total Deposits | 總存款金額 | Second stat card |
| Avg Deposit | 平均存款 | Third stat card |

---

## Prize Distribution Section

| English | Chinese | Notes |
|---------|---------|-------|
| Prize Distribution | 獎品分佈 | Section title |

---

## Controls & Filters

| English | Chinese | Notes |
|---------|---------|-------|
| Filter by email, username, or prize... | 按電子郵件、用戶名或獎品篩選... | Search placeholder |
| Refresh | 刷新 | Button text |
| Loading... | 載入中... | Loading state |

---

## Table Headers

| English | Chinese | Notes |
|---------|---------|-------|
| Date | 日期 | First column |
| Email | 電子郵件 | Second column |
| Username | 用戶名 | Third column |
| Amount | 金額 | Fourth column |
| Prize | 獎品 | Fifth column |
| Image | 圖片 | Sixth column |

---

## Table Content

| English | Chinese | Notes |
|---------|---------|-------|
| Loading entries... | 載入記錄中... | Loading state |
| No entries found | 沒有找到記錄 | Empty state header |
| Possible reasons: | 可能原因： | Empty state subheader |
| No one has played the game yet | 還沒有人玩過遊戲 | Reason 1 |
| RLS policies blocking reads | RLS 政策阻止讀取 | Reason 2 |
| Database table not created | 數據庫表未創建 | Reason 3 |
| Open browser console (F12) and click Refresh to see logs | 打開瀏覽器控制台 (F12) 並點擊刷新查看日誌 | Help text |
| See .same/DEBUG_GUIDE.md for help | 查看 .same/DEBUG_GUIDE.md 獲取幫助 | Help text |
| View Image | 查看圖片 | Link text |
| No image | 無圖片 | No image indicator |

---

## Footer

| English | Chinese | Notes |
|---------|---------|-------|
| Showing {filteredEntries.length} of {totalEntries} entries | 顯示 {totalEntries} 條記錄中的 {filteredEntries.length} 條 | Results counter |

---

## Image Modal

| English | Chinese | Notes |
|---------|---------|-------|
| Uploaded Image | 上傳的圖片 | Modal title |
| Close | 關閉 | Close button |
| Deposit proof | 存款證明 | Image alt text |
| Open in New Tab | 在新標籤頁打開 | Button text |
| Copy URL | 複製網址 | Button text |
| URL copied to clipboard! | 網址已複製到剪貼板！ | Alert message |

---

## Error Messages

| English | Chinese | Notes |
|---------|---------|-------|
| Supabase not configured. Please add credentials to .env.local | Supabase 未配置。請將憑證添加到 .env.local | Configuration error |
| Database error: {message}. Check RLS policies! | 數據庫錯誤：{message}。請檢查 RLS 政策！ | Database error |
| Failed to fetch data | 獲取數據失敗 | Generic error |

---

## Translation Notes

### Key Terms

- **管理後台** (guǎn lǐ hòu tái) - Admin Dashboard/Backend Management
- **記錄** (jì lù) - Entry/Record
- **存款** (cún kuǎn) - Deposit
- **獎品** (jiǎng pǐn) - Prize
- **篩選** (shāi xuǎn) - Filter
- **刷新** (shuā xīn) - Refresh
- **載入** (zài rù) - Loading
- **剪貼板** (jiǎn tiē bǎn) - Clipboard

### Consistency Guidelines

1. **Use Traditional Chinese** - Matches the main game interface
2. **Formal tone** - Professional administrative interface
3. **Concise** - Keep translations brief for UI elements
4. **Technical terms** - Use standard translations (e.g., RLS 政策)

### Testing

All translations have been tested in Version 25 of the application. To verify:

```bash
# Start the dev server
bun run dev

# Navigate to admin page
http://localhost:3000/admin

# Login with password: admin123
```

---

## Main Game Interface (Already Translated)

The main game interface is also in Chinese:

- **樹王團隊** - Team name
- **開啟寶箱，贏取豐厚獎勵** - "Open treasure chest, win generous rewards"
- **會員驗證** - "Member verification"
- **上傳存款證明** - "Upload deposit proof"
- **點擊寶箱抽獎** - "Click treasure chest to draw"

All UI text is now consistently in Traditional Chinese across the entire application.

---

## Future Translations

If adding new features, follow these guidelines:

### Button Text
- Use verbs: 登入, 登出, 刷新, 上傳
- Keep 2-3 characters when possible

### Form Labels
- Be descriptive: 電子郵件, 用戶名, 存款金額
- Use traditional terms for technical concepts

### Error Messages
- Start with context: "數據庫錯誤：...", "配置錯誤：..."
- Provide actionable guidance: "請檢查...", "請添加..."

### Status Messages
- Use clear states: 載入中..., 處理中..., 完成
- Include progress indicators when relevant

---

## Version History

- **Version 25** (Current) - Complete admin dashboard translation to Chinese
- **Version 1-24** - Main game interface in Chinese

---

## Contact & Support

For translation questions or improvements, see:
- `.same/ADMIN_DASHBOARD.md` - Admin dashboard guide
- `.same/QUICK_START.md` - Quick start guide
- Main game: All UI already in Chinese

**All interfaces now support Chinese users! 🇨🇳**
