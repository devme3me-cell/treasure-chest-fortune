# Complete Flow Test Checklist

## 🎯 Testing the Complete User Flow

### Pre-Test Setup
- [ ] Dev server is running (`bun run dev`)
- [ ] Browser console is open (F12)
- [ ] Google Sheets URL configured (optional for flow test)

---

## 📋 STEP 1: Registration Verification

### Visual Elements
- [ ] Logo displays correctly (樹王團隊)
- [ ] Title "樹王團隊" shows with golden gradient
- [ ] Subtitle "開啟寶箱，贏取豐厚獎勵" displays
- [ ] Step indicator shows "1" highlighted in gold
- [ ] Steps 2 and 3 are gray/muted
- [ ] Form card has dark background with border

### Radio Button Selection
- [ ] "是，我已註冊" option is clickable
- [ ] "否，我需要註冊" option is clickable
- [ ] Only one option can be selected at a time
- [ ] Radio buttons have golden accent when selected

### Test Case 1A: Select "NO" (未註冊)
1. Select "否，我需要註冊"
2. Click "前往註冊" button
3. **Expected**: Alert appears (or redirects if URL configured)
4. **Expected**: User stays on Step 1 if alert shown

### Test Case 1B: Select "YES" without filling fields
1. Select "是，我已註冊"
2. **Expected**: Email and username fields appear with animation
3. **Expected**: "下一步" button is DISABLED (grayed out)
4. Try clicking disabled button
5. **Expected**: Nothing happens

### Test Case 1C: Fill only email
1. Select "是，我已註冊"
2. Enter email: `test@example.com`
3. Leave username empty
4. **Expected**: "下一步" button remains DISABLED

### Test Case 1D: Fill only username
1. Select "是，我已註冊"
2. Leave email empty
3. Enter username: `testuser`
4. **Expected**: "下一步" button remains DISABLED

### Test Case 1E: Complete Step 1 Successfully ✅
1. Select "是，我已註冊"
2. Enter email: `test@example.com`
3. Enter username: `testuser123`
4. **Expected**: "下一步" button becomes ENABLED (golden)
5. Click "下一步"
6. **Expected**: Progress to Step 2
7. **Expected**: Step indicator shows "2" highlighted in gold
8. **Expected**: Step 1 shows checkmark/completed state

---

## 📋 STEP 2: Upload Proof & Amount

### Visual Elements
- [ ] Step 2 card displays "上傳存款證明"
- [ ] Upload area shows with dashed border
- [ ] Plus icon visible in upload area
- [ ] "點擊上傳圖片" text displays
- [ ] Deposit amount input field displays
- [ ] "上一步" and "開始抽獎" buttons visible

### Test Case 2A: Click "上一步" (Back Button)
1. Click "上一步"
2. **Expected**: Return to Step 1
3. **Expected**: Previous data (email/username) still filled
4. **Expected**: Can navigate forward again to Step 2

### Test Case 2B: Try to proceed without upload
1. Enter amount: `1000`
2. **Expected**: "開始抽獎" button is DISABLED
3. Try clicking it
4. **Expected**: Nothing happens

### Test Case 2C: Try to proceed without amount
1. Upload an image
2. Leave amount empty
3. **Expected**: "開始抽獎" button is DISABLED

### Test Case 2D: Upload Image
1. Click on upload area
2. Select an image file (PNG, JPG, etc.)
3. **Expected**: Image appears in preview
4. **Expected**: Image displays at full dimensions (up to 600px height)
5. **Expected**: "移除" button appears on image
6. **Expected**: Image maintains aspect ratio

### Test Case 2E: Remove Uploaded Image
1. After uploading image, click "移除" button
2. **Expected**: Image preview disappears
3. **Expected**: Upload area returns to initial state
4. **Expected**: Can upload a different image

### Test Case 2F: Enter Deposit Amount
1. Click amount input field
2. Enter: `5000`
3. **Expected**: Number appears in field
4. Try entering letters: `abc`
5. **Expected**: Letters should not be accepted (number input)

### Test Case 2G: Complete Step 2 Successfully ✅
1. Upload an image
2. Enter amount: `1000`
3. **Expected**: "開始抽獎" button becomes ENABLED (golden)
4. Click "開始抽獎"
5. **Expected**: Progress to Step 3
6. **Expected**: Step indicator shows "3" highlighted in gold

---

## 📋 STEP 3: Treasure Chest Game

### Visual Elements
- [ ] Animated SVG treasure chest displays
- [ ] Golden glow effect around chest
- [ ] Sparkles animate around chest (4 sparkles)
- [ ] "點擊寶箱抽獎" text displays below chest
- [ ] Text pulses/animates
- [ ] Prize list displays at bottom
- [ ] All 6 prizes shown in grid (2 columns)

### Prize List Verification
- [ ] 首儲金5% - NO special label
- [ ] 首儲金7% - Shows "稀有" label
- [ ] 首儲金10% - Shows "超稀有" label
- [ ] 首儲金30% - Shows "展示獎項" label + reduced opacity
- [ ] 首儲金50% - Shows "展示獎項" label + reduced opacity
- [ ] 首儲金100% - Shows "展示獎項" label + reduced opacity

### Test Case 3A: Click Treasure Chest
1. Click on the treasure chest
2. **Expected**: Chest shakes/vibrates
3. **Expected**: "正在保存記錄..." may appear briefly
4. **Expected**: After ~1.5 seconds, chest lid opens (rotates back)
5. **Expected**: Prize result card appears below chest
6. **Expected**: Congratulations message displays
7. **Expected**: Prize won is highlighted in the prize list (golden border)
8. **Expected**: Shows deposit amount: "$1000"
9. **Expected**: "您已完成抽獎，感謝參與！" message displays

### Test Case 3B: Prize Result Display
- [ ] Prize won displays in large golden gradient text
- [ ] Prize is one of: 首儲金5%, 首儲金7%, or 首儲金10%
- [ ] Prize is NEVER: 首儲金30%, 50%, or 100%
- [ ] Matched prize in list has golden border and highlighted background

### Test Case 3C: Google Sheets Integration (if configured)
1. Open browser console (F12)
2. **Expected**: See log: "💾 Saving to Google Sheets..."
3. **Expected**: See log: "📤 Sending data: {...}"
4. **Expected**: See log: "✅ Entry saved to Google Sheets successfully"
5. Check Google Sheet
6. **Expected**: New row with timestamp, email, username, amount, prize

### Test Case 3D: Try Clicking Again
1. After prize is revealed, click chest again
2. **Expected**: Nothing happens (cursor: not-allowed)
3. **Expected**: Same prize remains displayed
4. **Expected**: No new row added to Google Sheets

### Test Case 3E: Refresh to Play Again
1. Refresh the browser (F5)
2. **Expected**: Return to Step 1
3. **Expected**: All fields are cleared
4. **Expected**: Can go through entire flow again
5. **Expected**: Different prize may be awarded

---

## 🎲 Prize Distribution Testing

### Manual Testing (10-20 Plays)
1. Play the game 10-20 times (refresh between plays)
2. Record which prizes you get
3. **Expected Results**:
   - Majority should be 首儲金5% (~95%)
   - Few should be 首儲金7% (~5%)
   - Very rare to see 首儲金10% (~0.2%)
   - NEVER see 首儲金30%, 50%, or 100%

### Automated Testing
1. Open `.same/test-prize-distribution.html` in browser
2. Click "Test 10,000 draws"
3. **Expected Results**:
   - 首儲金5%: ~9,500 (95%)
   - 首儲金7%: ~475 (4.75%)
   - 首儲金10%: ~24 (0.24%)
   - 首儲金30%: 0 (0%)
   - 首儲金50%: 0 (0%)
   - 首儲金100%: 0 (0%)

---

## 🎨 Responsive Design Testing

### Desktop (1920x1080)
- [ ] All elements centered
- [ ] Form cards max-width respected
- [ ] Logo and title properly sized
- [ ] Treasure chest not too large

### Tablet (768px)
- [ ] Layout adjusts appropriately
- [ ] Text remains readable
- [ ] Buttons accessible
- [ ] Chest scales down

### Mobile (375px)
- [ ] Single column layout
- [ ] Buttons stack vertically if needed
- [ ] Text doesn't overflow
- [ ] Images scale properly
- [ ] Touch targets large enough

---

## 🐛 Error Handling

### Edge Cases
- [ ] Upload extremely large image (5MB+) - should still work
- [ ] Upload very small image (1KB) - should display
- [ ] Enter very large amount (999999999) - should accept
- [ ] Enter amount with decimals (100.50) - should accept
- [ ] Special characters in email - should validate
- [ ] Very long username (50+ chars) - should accept

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## ✅ Success Criteria

### Flow Completion
- [x] User can complete entire flow from Step 1 to Step 3
- [x] All validation works correctly
- [x] Can navigate back and forth between steps
- [x] Data persists when navigating back

### Prize Distribution
- [x] Display-only prizes (30%, 50%, 100%) NEVER awarded
- [x] 首儲金5% is most common (~95%)
- [x] 首儲金7% is rare (~5%)
- [x] 首儲金10% is very rare (~0.2%)

### Visual/UX
- [x] Animations smooth and performant
- [x] Treasure chest opens correctly
- [x] All text displays correctly in Chinese
- [x] Colors match theme (dark navy + gold)
- [x] Responsive on all screen sizes

### Data Handling
- [x] Google Sheets integration works (if configured)
- [x] Console logs helpful debugging info
- [x] No errors in browser console
- [x] User can only play once per session

---

## 📊 Test Results Template

```
Test Date: _______________
Tester: _______________
Browser: _______________

STEP 1: [ PASS / FAIL ]
Notes: _______________

STEP 2: [ PASS / FAIL ]
Notes: _______________

STEP 3: [ PASS / FAIL ]
Notes: _______________

Prize Distribution (20 plays):
- 首儲金5%: ___ times
- 首儲金7%: ___ times
- 首儲金10%: ___ times
- Display-only prizes: ___ times (should be 0)

Issues Found:
1. _______________
2. _______________

Overall: [ PASS / FAIL ]
```
