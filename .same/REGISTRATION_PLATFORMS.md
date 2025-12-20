# 🏢 Registration Platform Icons

## Overview

When users select "否，我需要註冊" (No, I need to register) in Step 1, they will see three clickable platform icons to choose where to register.

---

## Platform Options

### Platform 1: MW1688
- **Icon:** https://i.postimg.cc/fRN3Q5HL/1.png
- **URL:** https://chitu5168.mw1688.tw/
- **Description:** Primary registration platform

### Platform 2: 3A1788
- **Icon:** https://i.postimg.cc/QdJF85Pd/2.png
- **URL:** https://chitu5168.3a1788.bet/
- **Description:** Alternative registration platform

### Platform 3: BM9981
- **Icon:** https://i.postimg.cc/K8D1GLVx/3.png
- **URL:** https://bm9981.com/ag/chitu1688
- **Description:** Third registration platform

---

## User Experience

### Flow

1. **User arrives at Step 1** (會員驗證)
2. **User selects** "否，我需要註冊"
3. **Three platform icons appear** with smooth animation
4. **Heading displays:** "選擇註冊平台"
5. **Subheading:** "請選擇以下任一平台進行註冊"
6. **User clicks** on preferred platform icon
7. **Browser redirects** to selected platform's registration page

### Visual Features

**Layout:**
- 3-column grid layout
- Equal spacing between icons
- Responsive on all screen sizes

**Animations:**
- Fade-in effect when icons appear
- Slide-up animation from bottom
- Duration: 500ms

**Hover Effects:**
- Golden border highlight
- Scale up (1.05x)
- Golden gradient overlay
- Shadow with golden glow
- Smooth 300ms transition

**Active State:**
- Scale down (0.98x) on click
- Immediate visual feedback

---

## Implementation Details

### Code Location

**File:** `src/app/page.tsx`

**Key Functions:**

```typescript
const handlePlatformClick = (url: string) => {
  window.location.href = url;
};
```

### Platform Button Structure

```tsx
<button
  onClick={() => handlePlatformClick('PLATFORM_URL')}
  className="group relative overflow-hidden rounded-xl border-2 border-gold/30 bg-background/50 p-4 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:scale-105 hover:shadow-lg hover:shadow-gold/20"
>
  <img
    src="ICON_URL"
    alt="平台名稱"
    className="w-full h-auto rounded-lg"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</button>
```

### Styling

**CSS Classes:**
- `group` - Tailwind group for hover effects
- `relative` - Position context for overlay
- `overflow-hidden` - Clip gradient overlay
- `rounded-xl` - Rounded corners
- `border-2 border-gold/30` - Golden border (30% opacity)
- `hover:border-gold` - Full golden border on hover
- `hover:scale-105` - Grow slightly on hover
- `hover:shadow-lg hover:shadow-gold/20` - Golden shadow on hover

**Custom CSS:** (in `globals.css`)
```css
.platform-icon {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.platform-icon:hover {
  transform: scale(1.05) translateY(-4px);
  filter: brightness(1.1);
}

.platform-icon:active {
  transform: scale(0.98);
}
```

---

## Configuration

### Image Configuration

**Next.js Config** (`next.config.js`):

```javascript
images: {
  unoptimized: true,
  domains: [
    // ... other domains
    "i.postimg.cc",
  ],
  remotePatterns: [
    // ... other patterns
    {
      protocol: "https",
      hostname: "i.postimg.cc",
      pathname: "/**",
    },
  ],
}
```

### Updating Platform URLs

To change platform URLs, edit `src/app/page.tsx`:

```typescript
// Find the platform buttons and update onClick handlers:
onClick={() => handlePlatformClick('NEW_URL_HERE')}
```

### Updating Platform Icons

To change icons, update image sources:

```tsx
<img
  src="NEW_ICON_URL"
  alt="平台名稱"
  className="w-full h-auto rounded-lg"
/>
```

---

## Responsive Design

### Desktop (≥768px)
- 3 columns in grid
- Comfortable spacing
- Full hover effects

### Tablet (480px - 767px)
- 3 columns maintained
- Smaller padding
- Touch-friendly sizing

### Mobile (<480px)
- 3 columns (may be tight)
- Reduced padding
- Optimized for touch

**To improve mobile:**
- Consider 1-2 column layout on very small screens
- Increase touch target size
- Add more vertical spacing

---

## Testing

### Manual Test Checklist

- [ ] Go to Step 1
- [ ] Select "否，我需要註冊"
- [ ] Verify 3 icons appear with animation
- [ ] Hover over each icon - check golden glow
- [ ] Click Icon 1 - redirects to MW1688
- [ ] Go back, click Icon 2 - redirects to 3A1788
- [ ] Go back, click Icon 3 - redirects to BM9981
- [ ] Test on mobile devices
- [ ] Check animation smoothness

### Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Customization

### Change Number of Platforms

**To add more platforms:**

1. Add new button in `src/app/page.tsx`:
```tsx
<button
  onClick={() => handlePlatformClick('NEW_PLATFORM_URL')}
  className="group relative overflow-hidden rounded-xl border-2 border-gold/30 bg-background/50 p-4 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:scale-105 hover:shadow-lg hover:shadow-gold/20"
>
  <img
    src="NEW_ICON_URL"
    alt="平台 4"
    className="w-full h-auto rounded-lg"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</button>
```

2. Update grid columns class:
```tsx
<div className="grid grid-cols-4 gap-4"> {/* Changed from grid-cols-3 */}
```

### Change Layout to Vertical

Replace grid layout with flex column:

```tsx
<div className="flex flex-col gap-4">
  {/* Platform buttons */}
</div>
```

### Add Platform Names Below Icons

Add text below each image:

```tsx
<button ...>
  <img ... />
  <p className="mt-2 text-center text-gold text-sm font-display">
    平台名稱
  </p>
  <div className="absolute ..."></div>
</button>
```

---

## Troubleshooting

### Icons Not Loading

**Issue:** Images show broken/missing

**Solutions:**
1. Check `next.config.js` includes `i.postimg.cc` in domains
2. Verify image URLs are correct
3. Check network tab (F12) for CORS errors
4. Try opening image URL directly in browser

### Icons Not Clickable

**Issue:** Clicking does nothing

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify `handlePlatformClick` function exists
3. Check button onClick handlers
4. Test with `console.log` in click handler

### Redirect Not Working

**Issue:** Click doesn't redirect to platform

**Solutions:**
1. Verify URLs are correct (https://)
2. Check for popup blockers
3. Test URL directly in browser
4. Check for JavaScript errors in console

### Animation Not Smooth

**Issue:** Icons appear abruptly or lag

**Solutions:**
1. Check CSS transitions are applied
2. Verify `animate-in` classes are present
3. Test on different browser/device
4. Reduce animation complexity if needed

---

## Future Enhancements

### Possible Improvements

1. **Platform Status Indicators**
   - Show "推薦" (Recommended) badge
   - Display online/offline status
   - Show current promotions

2. **Analytics Tracking**
   - Track which platform users choose
   - Monitor click-through rates
   - A/B test different layouts

3. **Dynamic Platform Loading**
   - Load platforms from API/database
   - Allow admin to add/remove platforms
   - Show/hide based on availability

4. **Better Mobile UX**
   - Stack vertically on small screens
   - Larger touch targets
   - Swipeable carousel on mobile

5. **Preview Modal**
   - Show platform preview before redirect
   - Display features/benefits
   - Allow user to confirm choice

---

## Version History

- **Version 28** (Current) - Registration platform icons implemented
  - 3 clickable platform icons
  - Smooth animations and hover effects
  - Redirects to respective registration pages
  - Responsive grid layout

---

## Related Files

- **Main Code:** `src/app/page.tsx`
- **Styling:** `src/app/globals.css`
- **Config:** `next.config.js`
- **Documentation:** `.same/REGISTRATION_PLATFORMS.md` (this file)

---

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review main app code in `src/app/page.tsx`
3. Test in different browsers
4. Check browser console for errors

**Platform URLs are live - test carefully before deploying!**
