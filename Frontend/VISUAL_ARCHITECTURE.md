# 📊 Visual Architecture of Responsive Hamburger Menu

## Complete Page Flow Diagram

### Desktop View (≥ 768px)

```
┌──────────────────────────────────────────────────────────────┐
│                        HEADER (z-50)                         │
├────────────┬──────────────────────────────────┬──────────────┤
│ ❤️ CardioML│ How it Works | Health Insights│ 🌙 [Assess] │
│ (Logo)     │ Model                          │ (Theme) (Btn) │
└────────────┴──────────────────────────────────┴──────────────┘
              ↑                                  ↑
         Desktop Menu                    Desktop Controls
         Hidden: md:hidden               Always Visible
         Show at: md (768px+)

┌──────────────────────────────────────────────────────────────┐
│                   MAIN CONTENT                               │
│                                                              │
│  Hero Section                                               │
│  [Content...]                                               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Mobile View - Closed (< 768px)

```
┌────────────────────────────────┐
│ ❤️ CardioML  🌙    ☰ (Active)  │  ← Header (z-50)
├────────────────────────────────┤     Click to open ⬇️
│ Hero Section                   │
│ [Content...]                   │
│ [Content...]                   │
│                                │
│ [Footer]                       │
└────────────────────────────────┘
     ↑
Hamburger Button (md:hidden)
```

### Mobile View - Open (< 768px)

```
┌────────────────────────────────┐
│ ❤️ CardioML  🌙    ✕  (Active) │  ← Header (z-50)
├────────────────────────────────┤
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ ← Overlay (z-30)
│░░░░░░░░░░░░┌─────────────────┐│    Semi-transparent
│░░░░░░░░░░░░│ MENU (z-40)      ││    Click to close
│░░░░░░░░░░░░├─────────────────┤│
│░░░░░░░░░░░░│ How it Works     ││
│░░░░░░░░░░░░│ Health Insights  ││  ← Menu Links
│░░░░░░░░░░░░│ Model            ││
│░░░░░░░░░░░░├─────────────────┤│
│░░░░░░░░░░░░│ Assess Your Risk ││  ← Action Button
│░░░░░░░░░░░░├─────────────────┤│
│░░░░░░░░░░░░│ Theme: 🌙        ││  ← Theme Toggle
│░░░░░░░░░░░░└─────────────────┘│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
└────────────────────────────────┘
     ↑
Body scroll is DISABLED
```

---

## Responsive Breakpoint System

```
Screen Width Timeline
│
├─ 0px - 640px (sm)
│  └─ Mobile Phones (iPhone SE, iPhone 12 Mini)
│     ✓ Hamburger visible
│     ✓ Full width content (px-4 = 16px padding)
│     ✗ Desktop menu hidden
│     ✗ Desktop button hidden (too small)
│     
├─ 640px - 768px (md threshold)
│  └─ Large Phones & Tablets (iPad Mini, Galaxy Tab)
│     ✓ Hamburger still visible
│     ✓ Button appears (sm:block)
│     ✓ Wider spacing (px-6 = 24px padding)
│     ✗ Desktop menu still hidden
│     
└─ 768px+ (md and above)
   └─ Tablets & Desktop (iPad Air, MacBook, Monitor)
      ✓ Hamburger HIDDEN (md:hidden takes effect)
      ✓ Full desktop menu visible
      ✓ Large spacing (px-8 = 32px padding)
      ✓ Button fully visible
      ✓ Large text (text-lg, text-xl)
```

### Tailwind Responsive Class Mapping

```javascript
// Responsive Text Sizes
text-sm           // Mobile:   14px (xs phones)
sm:text-base      // Tablet:   16px (640px+)
md:text-lg        // Desktop:  18px (768px+)

// Responsive Padding
px-4              // Mobile:   16px (left + right)
sm:px-6           // Tablet:   24px (640px+)
lg:px-8           // Desktop:  32px (1024px+)

// Responsive Buttons
py-2 px-4         // Mobile:   Small button
sm:py-3 sm:px-6   // Tablet:   Medium button
md:py-4 md:px-8   // Desktop:  Large button

// Hidden/Visible
md:hidden          // Show on mobile, HIDE on desktop (≥768px)
hidden md:flex     // HIDE on mobile, Show on desktop (≥768px)
```

---

## Component Hierarchy

```
<Header>
│
├─ <motion.header> (z-50 - Always on top)
│  │
│  └─ <nav>
│     │
│     ├─ <Logo Link>
│     │
│     ├─ <Desktop Navigation (hidden md:flex)>
│     │  ├─ How it Works Link
│     │  ├─ Health Insights Link
│     │  └─ Model Link
│     │
│     └─ <Right Side Container (flex-1)>
│        │
│        ├─ <ThemeToggle>
│        │
│        ├─ <Desktop Button (hidden sm:block)>
│        │  └─ "Assess Your Risk"
│        │
│        └─ <Hamburger Button (md:hidden)> ← MOBILE ONLY
│           ├─ Menu Icon (☰) or X (✕)
│           └─ onClick → toggleMobileMenuOpen()
│
├─ {mobileMenuOpen && <Overlay> (z-30)}
│  │
│  └─ onClick → closeMobileMenu()
│
└─ {mobileMenuOpen && <Drawer> (z-40)}
   │
   ├─ <Menu Header>
   │  └─ "Menu" text + Close button
   │
   ├─ <Navigation Links>
   │  ├─ How it Works (with icon)
   │  ├─ Health Insights (with icon)
   │  └─ Model (with icon)
   │
   ├─ <Action Button>
   │  └─ "Assess Your Risk"
   │
   └─ <Theme Toggle>
      └─ Light/Dark mode switch
```

---

## State Management Flow

```
User Interaction → React State Change → Re-render → Update UI

┌─────────────────────────────────────────────────────────────┐
│ Click Hamburger Button (☰)                                  │
└────────────────┬────────────────────────────────────────────┘
                 ↓
    setMobileMenuOpen(!mobileMenuOpen)
    true ← (was false)
                 ↓
    ┌─────────────────────────────────┐
    │ React Re-renders Header          │
    ├─────────────────────────────────┤
    │ Hamburger icon: ☰ → ✕ (rotate)  │
    │ Overlay: visible (opacity: 1)    │
    │ Drawer: slides in (x: 0)         │
    └─────────────────────────────────┘
                 ↓
            Display Menu
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ User clicks:                                                │
│ • X button  → setMobileMenuOpen(false)                      │
│ • Overlay   → closeMobileMenu() → setMobileMenuOpen(false)  │
│ • Menu link → closeMobileMenu() (useEffect) + navigate      │
└────────────────┬────────────────────────────────────────────┘
                 ↓
    ┌─────────────────────────────────┐
    │ React Re-renders Header          │
    ├─────────────────────────────────┤
    │ Hamburger icon: ✕ → ☰ (rotate)  │
    │ Overlay: hidden (opacity: 0)     │
    │ Drawer: slides out (x: 100%)     │
    └─────────────────────────────────┘
                 ↓
            Hide Menu
```

---

## Animation Timeline

### Button Rotation (300ms)

```
Time: 0ms → Closed (☰)
     ↓
Time: 150ms → Rotating (partially rotated)
     ↓
Time: 300ms → Open (✕)

Duration: 0.3 seconds (smooth)
Easing: Linear rotation
```

### Drawer Slide (Spring Animation)

```
Time: 0ms → Position: 100% right (off-screen)
     ↓
Time: ~150ms → Position: 50% right (sliding)
     ↓
Time: ~300ms → Position: 0% (fully visible)

Type: Spring Physics
Stiffness: 300 (snappy)
Damping: 30 (bouncy)
```

### Overlay Fade (200ms)

```
Time: 0ms → Opacity: 0% (transparent)
     ↓
Time: 100ms → Opacity: 50% (fading)
     ↓
Time: 200ms → Opacity: 100% (fully visible)

Duration: 0.2 seconds (quick)
```

---

## Z-Index Stacking (Layer Order)

```
(Top)     ↑
          │
    50    │  ┌─────────────┐
          │  │   HEADER    │  ← Sticky, always visible
          │  └─────────────┘
          │
    40    │  ┌──────────────────┐
          │  │  MOBILE DRAWER   │  ← Slides over content
          │  │  (Menu Items)    │
          │  └──────────────────┘
          │
    30    │  ┌──────────────────────────────────────┐
          │  │        OVERLAY (Dark)               │  ← Behind drawer
          │  │     (Click to close)                │
          │  └──────────────────────────────────────┘
          │
     0    │  ┌──────────────────────────────────────┐
(Bottom)  │  │      MAIN CONTENT                   │  ← Base layer
          │  │      (Hero, Cards, etc.)            │
          │  └──────────────────────────────────────┘
          │
```

---

## Responsive Width Indicators

```
Device Category     Width Range    Tailwind   Hamburger?   Desktop Menu?
───────────────────────────────────────────────────────────────────────
Tiny Phone          280 - 320px    (none)     ✓ YES        ✗ NO
Small Phone         320 - 375px    (none)     ✓ YES        ✗ NO
Regular Phone       375 - 425px    (none)     ✓ YES        ✗ NO
Large Phone         425 - 640px    (none)     ✓ YES        ✗ NO
───────────────────────────────────────────────────────────────────────
Small Tablet        640 - 768px    sm:        ✓ YES        ✗ NO
    ↑ BREAKPOINT AT 640px
Medium Tablet       768 - 1024px   md:        ✗ NO         ✓ YES
    ↑ BREAKPOINT AT 768px
Large Tablet        1024px+        lg:        ✗ NO         ✓ YES
Desktop             1440px+        2xl:       ✗ NO         ✓ YES
─────────────────────────────────────────────────────────────────────
                              ↓
          md:hidden = Show when < 768px, Hide when ≥ 768px
          hidden md:flex = Hide when < 768px, Show when ≥ 768px
```

---

## Responsive Text & Button Sizes

```
Mobile (320-640px)     Tablet (640-768px)    Desktop (768px+)
──────────────────     ──────────────────    ─────────────────
Heading: 24px          Heading: 28px         Heading: 32px
Body: 14px             Body: 15px            Body: 16px
Button: 40px tall      Button: 44px tall     Button: 48px tall
Padding: 16px (px-4)   Padding: 24px (px-6)  Padding: 32px (px-8)
Gap: 12px (gap-3)      Gap: 16px (gap-4)     Gap: 24px (gap-6)
```

---

## CSS Class Application by Screen Size

### Mobile (< 640px)

```html
<Header className="bg-card border-b md:... z-50 ...">
  <!-- Hamburger Button SHOWS (md:hidden activates) -->
  <button className="md:hidden inline-flex ...">☰</button>
  
  <!-- Desktop Nav HIDDEN (hidden md:flex activates "hidden" part) -->
  <nav className="hidden md:flex ...">
    <!-- Links not shown -->
  </nav>
  
  <!-- Button HIDDEN (hidden sm:block - "hidden" part active) -->
  <div className="hidden sm:block">Assess Risk</div>
</Header>
```

### Tablet (640-768px)

```html
<Header className="bg-card border-b md:... z-50 ...">
  <!-- Hamburger Button SHOWS (md:hidden still active) -->
  <button className="md:hidden inline-flex ...">☰</button>
  
  <!-- Desktop Nav HIDDEN (md:flex not active yet) -->
  <nav className="hidden md:flex ...">
    <!-- Links not shown -->
  </nav>
  
  <!-- Button SHOWS (sm:block activates, still < 768px) -->
  <div className="hidden sm:block">Assess Risk</div>
</Header>
```

### Desktop (768px+)

```html
<Header className="bg-card border-b md:... z-50 ...">
  <!-- Hamburger Button HIDDEN (md:hidden deactivates) -->
  <button className="md:hidden inline-flex ...">
    <!-- Button not shown, but code still there -->
  </button>
  
  <!-- Desktop Nav SHOWS (md:flex activates) -->
  <nav className="hidden md:flex ...">
    How it Works | Health Insights | Model
  </nav>
  
  <!-- Button SHOWS (sm:block active, and >= 768px) -->
  <div className="hidden sm:block">Assess Risk</div>
</Header>
```

---

## Summary

```
┌────────────────────────────────────────────────────┐
│  RESPONSIVE HAMBURGER MENU ARCHITECTURE            │
├────────────────────────────────────────────────────┤
│                                                    │
│  Mobile (<768px)       →  Hamburger Button ☰      │
│  Tablet (640-768px)    →  Button + Hamburger      │
│  Desktop (≥768px)      →  Full Menu               │
│                                                    │
│  Click ☰  →  Menu Drawer Slides  →  Overlay      │
│  Click X or Overlay  →  Menu Closes  →  Restore   │
│                                                    │
│  All animations smooth via Framer Motion          │
│  All layouts responsive via Tailwind CSS          │
│                                                    │
└────────────────────────────────────────────────────┘
```

