# 🧪 Complete Flow & Prize Distribution Test Summary

## ✅ What I've Set Up For Testing

### 1. **Automated Prize Distribution Test Tool**
📁 File: `.same/test-prize-distribution.html`

**How to Use:**
1. Open the file in any web browser
2. Click "Test 10,000 draws" button
3. Review the results

**What It Tests:**
- ✅ Verifies prize distribution matches expected probabilities
- ✅ Confirms display-only prizes (30%, 50%, 100%) are NEVER awarded
- ✅ Shows actual vs expected percentages
- ✅ Visual bar charts for easy analysis

**Expected Results:**
```
首儲金5%:   ~9,500/10,000 (95.0%)   - Most common ✅
首儲金7%:   ~475/10,000   (4.75%)  - Rare (稀有) ✅
首儲金10%:  ~24/10,000    (0.24%)  - Super Rare (超稀有) ✅
首儲金30%:  0/10,000      (0%)     - Display Only ✅
首儲金50%:  0/10,000      (0%)     - Display Only ✅
首儲金100%: 0/10,000      (0%)     - Display Only ✅
```

### 2. **Complete Flow Test Checklist**
📁 File: `.same/FLOW_TEST_CHECKLIST.md`

**Comprehensive test cases for:**
- ✅ Step 1: Registration verification (14 test cases)
- ✅ Step 2: Upload & amount entry (7 test cases)
- ✅ Step 3: Treasure chest game (5 test cases)
- ✅ Prize distribution validation
- ✅ Responsive design testing
- ✅ Error handling & edge cases

---

## 🎯 Manual Testing Guide

### Quick Flow Test (5 minutes)

**Step 1: Registration** ✓
1. Go to `http://localhost:3000`
2. Select "是，我已註冊"
3. Enter email: `test@example.com`
4. Enter username: `testuser`
5. Click "下一步"
6. ✅ Should progress to Step 2

**Step 2: Upload & Amount** ✓
1. Click upload area
2. Select any image
3. ✅ Image should display at full size (up to 600px height)
4. Enter amount: `1000`
5. Click "開始抽獎"
6. ✅ Should progress to Step 3

**Step 3: Play Game** ✓
1. Click the treasure chest
2. ✅ Chest should shake
3. ✅ After ~1.5s, chest lid opens (rotates back)
4. ✅ Prize reveals (will be 5%, 7%, or 10% only)
5. ✅ Prize card shows deposit amount
6. ✅ Won prize is highlighted in prize list

### Prize Distribution Test (10-20 plays)

1. Refresh browser (F5)
2. Go through Steps 1-3 again
3. Record the prize
4. Repeat 10-20 times

**Expected Distribution:**
- ~90-95% should be 首儲金5%
- ~5% should be 首儲金7%
- ~0-1% should be 首儲金10%
- **NONE** should be 30%, 50%, or 100%

---

## 🔍 What to Check in Console (F12)

### When Google Sheets NOT Configured:
```
⚠️ Google Sheets not configured. Entry: {...}
📝 To configure: See .same/GOOGLE_SHEETS_SETUP.md
```

### When Google Sheets IS Configured:
```
💾 Saving to Google Sheets... https://script.google.com/...
📤 Sending data: {email: "...", username: "...", ...}
✅ Entry saved to Google Sheets successfully
```

### Should NOT See:
- ❌ No red errors
- ❌ No "undefined" or "null" errors
- ❌ No CORS errors (expected if using Google Sheets)

---

## 📊 Prize Distribution Verification

### Method 1: Automated Test
```bash
# Open in browser:
treasure-chest-fortune/.same/test-prize-distribution.html

# Run multiple tests:
- 100 draws
- 1,000 draws
- 10,000 draws
- 50,000 draws
```

### Method 2: Code Verification
The prize weights in the code:
```javascript
PRIZE_WEIGHTS = {
  '首儲金5%': 400,   // 400/421 = 95.01%
  '首儲金7%': 20,    // 20/421  = 4.75%
  '首儲金10%': 1,    // 1/421   = 0.24%
  '首儲金30%': 0,    // Never
  '首儲金50%': 0,    // Never
  '首儲金100%': 0    // Never
}
Total weight: 421
```

---

## ✅ Success Checklist

### Flow Completion
- [ ] Can complete entire flow from Step 1 → Step 2 → Step 3
- [ ] All form validation works
- [ ] Can navigate back and return forward
- [ ] Data persists when going back

### Visual & Animations
- [ ] Treasure chest displays correctly
- [ ] Chest shakes when clicked
- [ ] Chest lid opens smoothly (rotates back)
- [ ] Sparkles animate around chest
- [ ] Prize result card appears
- [ ] Won prize highlights in prize list

### Prize Distribution (Test with `.same/test-prize-distribution.html`)
- [ ] 首儲金5% awarded ~95% of the time
- [ ] 首儲金7% awarded ~4.75% of the time
- [ ] 首儲金10% awarded ~0.24% of the time
- [ ] 首儲金30% NEVER awarded (0 times)
- [ ] 首儲金50% NEVER awarded (0 times)
- [ ] 首儲金100% NEVER awarded (0 times)

### Prize List Display
- [ ] 首儲金5% - no special label
- [ ] 首儲金7% - shows "稀有"
- [ ] 首儲金10% - shows "超稀有"
- [ ] 首儲金30% - shows "展示獎項" + dimmed
- [ ] 首儲金50% - shows "展示獎項" + dimmed
- [ ] 首儲金100% - shows "展示獎項" + dimmed

### Google Sheets (if configured)
- [ ] Console shows save logs
- [ ] Data appears in Google Sheet
- [ ] All fields populated correctly
- [ ] Each play creates ONE new row

### Edge Cases
- [ ] Can only play once per session
- [ ] Clicking chest again after win does nothing
- [ ] Can play again after refreshing
- [ ] Works on mobile/tablet
- [ ] Works in different browsers

---

## 🐛 Known Limitations

1. **Images not saved to Google Sheets**
   - Images stored as base64 in browser only
   - Google Sheet shows "Image uploaded (base64 stored in browser)"
   - This is intentional to save space

2. **CORS with Google Sheets**
   - Using `mode: 'no-cors'` is normal
   - Cannot read response but data IS sent
   - Check Google Sheet to verify

3. **One play per session**
   - Refresh browser (F5) to play again
   - This is intentional game design

---

## 📝 Test Report Template

```
===========================================
TREASURE CHEST FORTUNE - FLOW TEST REPORT
===========================================

Date: _______________
Tester: _______________
Browser: _______________
Device: _______________

--- STEP 1 VERIFICATION ---
[  ] Logo displays
[  ] Radio buttons work
[  ] Email/username fields appear when "Yes" selected
[  ] Button disabled until all fields filled
[  ] Progresses to Step 2 successfully

--- STEP 2 VERIFICATION ---
[  ] Image upload works
[  ] Image displays at full size
[  ] Can remove uploaded image
[  ] Amount input accepts numbers only
[  ] "Back" button returns to Step 1
[  ] Progresses to Step 3 successfully

--- STEP 3 VERIFICATION ---
[  ] Treasure chest displays
[  ] Sparkles animate
[  ] Chest shakes on click
[  ] Chest lid opens after click
[  ] Prize reveals (5%, 7%, or 10%)
[  ] Prize list shows correct labels
[  ] Cannot play again without refresh

--- PRIZE DISTRIBUTION (20 plays) ---
首儲金5%:  ___ / 20 (___%)
首儲金7%:  ___ / 20 (___%)
首儲金10%: ___ / 20 (___%)
Display-only prizes: ___ (MUST BE 0)

--- GOOGLE SHEETS (if configured) ---
[  ] Console shows save logs
[  ] Data appears in sheet
[  ] All fields correct

--- OVERALL ASSESSMENT ---
Issues Found:
1. _______________
2. _______________

Status: [ PASS / FAIL / NEEDS FIXES ]

Tester Signature: _______________
```

---

## 🚀 Next Steps

1. **Run Automated Test**
   - Open `.same/test-prize-distribution.html`
   - Run 10,000+ draws
   - Verify distribution matches expectations

2. **Manual Flow Test**
   - Follow checklist in `.same/FLOW_TEST_CHECKLIST.md`
   - Test all 3 steps thoroughly
   - Try edge cases

3. **Prize Distribution Validation**
   - Play 20-50 times manually
   - Record results
   - Confirm no display-only prizes awarded

4. **Report Results**
   - Document any issues found
   - Note any unexpected behavior
   - Suggest improvements

---

## 📁 Testing Files Reference

- `.same/TEST_SUMMARY.md` (this file) - Overview
- `.same/FLOW_TEST_CHECKLIST.md` - Detailed test cases
- `.same/test-prize-distribution.html` - Automated distribution tester
- `.same/GOOGLE_SHEETS_SETUP.md` - Google Sheets setup
- `.same/TROUBLESHOOTING.md` - Troubleshooting guide
