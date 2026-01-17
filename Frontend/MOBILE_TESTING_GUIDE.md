# Mobile Menu Testing Guide

## Dev Server Status
✅ **Server Running on**: http://localhost:3001
✅ **Framework**: Next.js 14.2.35
✅ **Build Status**: Compiled successfully

## Testing Instructions

### 1. **Desktop View (MD: 768px and above)**
- Open http://localhost:3001 in full desktop width
- **Expected**: 
  - ❌ Hamburger button should NOT be visible
  - ✅ Desktop navigation menu should show (How it Works, Health Insights, Model)
  - ✅ "Assess Your Risk" button should be visible
  - ✅ Theme toggle visible

### 2. **Mobile Responsive View (< 768px)**
- Press **F12** or **Cmd+Option+I** to open DevTools
- Click the **Device Toggle** button (phone icon) in DevTools toolbar
- Select **iPhone 12** or any mobile device preset
- **Expected**:
  - ✅ Hamburger menu button (≡) should be visible in top-right corner
  - ✅ Desktop navigation links should be HIDDEN
  - ✅ "Assess Your Risk" button should be hidden (shows only on tablet/desktop)
  - ✅ Theme toggle should still be visible

### 3. **Test Hamburger Menu Interaction**
- Click the hamburger button (≡) in mobile view
- **Expected**:
  - ✅ Hamburger icon rotates 180°
  - ✅ Dark overlay (50% black) appears covering the page
  - ✅ Sliding drawer appears from the right side
  - ✅ Menu shows all navigation links: "How it Works", "Health Insights", "Model"
  - ✅ Theme toggle appears in the menu footer
  - ✅ Body scroll is prevented while menu is open

### 4. **Close Menu Testing**
Try each method:
- **a) Click X button**: Button changes from ≡ to ✕, drawer slides out
- **b) Click overlay**: Semi-transparent dark area, menu closes
- **c) Click menu link**: Navigate to page, menu auto-closes
- **d) Press Escape key**: Menu closes (if enabled)

All should result in:
- ✅ Drawer slides back to the right
- ✅ Overlay disappears
- ✅ Hamburger icon returns to ≡
- ✅ Body scroll restored

## Responsive Breakpoints Tested

### Mobile (sm: < 640px)
```css
.btn-primary, .btn-secondary {
  padding: py-2 px-4;          /* Mobile size */
  font-size: text-sm;
}
.input-field {
  padding: px-3 py-2;          /* Mobile padding */
}
```

### Tablet (md: 640px - 768px)
```css
/* sm: prefix utilities activate */
.btn-primary, .btn-secondary {
  padding: py-3 px-6;          /* Tablet size */
  font-size: text-base;
}
```

### Desktop (md: 768px and above)
```css
/* md: hidden classes activate */
.hamburger-button {
  display: none;               /* Hidden on desktop */
}
.desktop-nav {
  display: flex;               /* Visible on desktop */
}
```

## Debugging Checklist

If hamburger button doesn't appear:

1. **Check Device Width**
   - DevTools shows width < 768px?
   - Try exact widths: 320px, 375px, 425px

2. **Check CSS Classes Applied**
   - Open DevTools → Elements tab
   - Find button element with class `md:hidden`
   - Verify `md:hidden` is in the CSS (should not show at md and above)

3. **Check Tailwind Compilation**
   - Go to DevTools → Network tab
   - Check `styles/globals.css` loads (look for Tailwind output)
   - File should be ~50-100KB compressed

4. **Clear Cache**
   ```bash
   rm -rf .next
   npm run dev
   ```

5. **Check Console Errors**
   - DevTools → Console tab
   - Look for red error messages
   - Check for React/Next.js warnings

## Visual Indicators

### Hamburger Button (When Visible)
```
Position: Top-right corner of header
Color: Foreground color (text color)
Size: 24px × 24px icon, 40px × 40px clickable area
Hover State: Slight background color change
Active State: Scale down slightly (active:scale-95)
```

### Menu Drawer (When Open)
```
Position: Slides from right side
Width: Max 448px (sm) on large screens
Height: Full screen
Background: Card background color
Overlay: Semi-transparent black (bg-black/50)
Shadow: Dark shadow (shadow-2xl)
```

### Z-Index Stacking (Correct Order)
```
Header:              z-50  (Top)
Mobile Menu Drawer:  z-40  (Middle - slides over content)
Overlay:             z-30  (Below drawer)
Body Content:        z-0   (Bottom)
```

## Expected Responsive Text

### Mobile (default)
- Header spacing: `px-4` (16px padding)
- Font sizes use `text-sm`, `text-base`
- Button text: "Assess" (mobile version)

### Tablet+ (sm/md)
- Header spacing: `sm:px-6` (24px padding)
- Font sizes increase to `sm:text-base`, `sm:text-lg`
- Button text: "Assess Your Risk" (full version)

## Files to Check

1. **components/Header.js** ← Main component (228 lines)
   - Button with `md:hidden` class
   - AnimatePresence wrapper around drawer
   - Mobile menu state management

2. **styles/globals.css** ← Responsive utilities
   - `.btn-primary` and `.btn-secondary` responsive classes
   - Container responsive padding

3. **tailwind.config.js** ← Breakpoint configuration
   - Should have sm: 640px, md: 768px, lg: 1024px

4. **.env.development** and **.env.local**
   - Should have `NEXT_PUBLIC_API_URL=http://localhost:5000`

## Success Criteria

✅ All tests pass when:
- [ ] Hamburger button visible only on screens < 768px
- [ ] Desktop menu visible only on screens >= 768px
- [ ] Drawer opens/closes smoothly with animation
- [ ] Overlay appears when drawer is open
- [ ] Menu links clickable and navigate correctly
- [ ] Theme toggle works in mobile menu
- [ ] Body scroll prevented when menu open
- [ ] Menu closes on route change
- [ ] No console errors
- [ ] No CSS issues in DevTools

## Quick Commands

```bash
# Start dev server
cd Frontend && npm run dev

# Clear build cache and rebuild
rm -rf .next && npm run dev

# Check for TypeScript/Next.js errors
npm run build

# Open in browser
# For mobile testing: Press F12, toggle responsive device toolbar
```

## Notes

- **Tailwind CSS** uses `md:` prefix for "medium" breakpoint at **768px**
- **Smaller than md** (< 768px) shows hamburger button with `md:hidden`
- **Larger than md** (≥ 768px) hides hamburger button and shows full nav
- **Framer Motion** animates the button rotation and drawer slide
- **z-index** ensures proper layering: drawer > overlay > content

## Browser DevTools Path

1. Open http://localhost:3001
2. Press **F12** (Windows/Linux) or **Cmd+Option+I** (Mac)
3. Click **Toggle device toolbar** (phone icon)
4. Select mobile device or set custom dimensions (< 768px)
5. Reload page with **Cmd+R** (Mac) or **Ctrl+R** (Windows)
6. Look for hamburger button in top-right corner of header
