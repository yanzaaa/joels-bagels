# Joel's Bagels — Build Research
Generated: Tue Jun 10 2026
For: Opus to read before the build session

---

## PHOTO STATUS

### Instagram Photos
All 5 photos confirmed healthy:
```
post1.jpg  63K  — Chicken BLT   → VIDEO/REEL (isVideo: true)
post2.jpg  55K  — The Brunson   → VIDEO/REEL (isVideo: true)
post3.jpg  52K  — Game 1 Fuel   → VIDEO/REEL (isVideo: true)
post4.jpg  77K  — Knicks Bagel  → VIDEO/REEL (isVideo: true)
post5.jpg 158K  — Welcome post  → IMAGE      (isVideo: false)
```

Hero photo recommendation: `public/instagram/post4.jpg`
(Knicks Everything Bagel — most colorful, most seasonal hook)

Hero crop fix needed in CSS/Tailwind:
```css
object-position: center 80%;
```
(pushes frame down to show food not caption overlay)

### Google / Yelp Photos
restaurantji CDN blocked direct download. Two food photos saved from prior session:
```
food1.jpg  52K
food2.jpg  55K
```
Located at: `public/photos/`

---

## COMPETITOR ANALYSIS

### Black Seed Bagels (blackseedbagels.com)
**Design approach:** Premium, editorial, dark/cream palette  
**Animation stack detected:** Framer Motion (`motion` in source)  
**Meta description:** "NYC's most unique bagel, hand baked daily. Stop by for breakfast, coffee, + sandwiches. Locally owned + operated. Ingredients carefully sourced, ensuring the best quality in every bite!"  
**Nav structure:** Store Finder, [location names], Menu, Catering  
**Trust signals found:** hand baked, locally owned, sourced, tradition, James-Beard

UX patterns to steal:
- "Order Online" as a separate nav item, not buried in menu
- Location finder prominently in nav (we have 1 — use "Find Us")
- Email signup in footer (build the list)
- Lowercase punchy copy style

Copy style: short punchy lowercase phrases  
"modern-day bagel shop steeped in old-world tradition"

---

### Just Bagels (justbagels.com)
**Design approach:** Clean white, product-forward, e-commerce  
**Meta description:** "Shop authentic NYC bagels shipped nationwide. Just Bagels brings you kettle-boiled, hearth-baked bagels made with premium ingredients for that classic crunchy outside and chewy inside."  
**Key differentiators:** kettle-boiled + hearth-baked, five-step process, clean ingredients, nationwide shipping since 1992

UX patterns to steal:
- "Build Your Box" as primary CTA → adapt as "Build Your Order"
- Process steps section (5 steps) → our version: "From Our Kitchen"
- Press logos strip (even local press = credibility)
- "Authentic" and "Since [year]" copy as trust anchors

Copy style: clean, confident, process-focused  
"Crispy outside, soft inside, delivered right to your doorstep"

---

### New Yorker Bagels (newyorkerbagels.com)
**Design approach:** E-commerce focused, product photography heavy, lots of offers  
**Hero H1:** `NEW YORK. BAKED IN.` (white text, letter-spacing: 2px, text-shadow)  
**Key differentiators:** free 2-day shipping, 22 flavors, Bagel of the Month subscription, kosher, Hand-Roll process, Build A Box interactive

UX patterns to steal:
- Video in hero (autoplay, muted) — loop one of the Instagram reels
- Review count displayed prominently (they show 20,000+ reviews)
- "Build a Box" interactive feature → our cart system
- Trust badges strip: kosher / vegan / no preservatives
- 2-day / overnight shipping as urgency driver (not applicable but urgency IS)

Copy style: enthusiastic, exclamation-heavy  
→ Our tone should be warmer and more personal (family angle)

---

## TOP 5 PATTERNS TO IMPLEMENT

### 1. PROCESS SECTION (from Just Bagels)
Add a "From Our Kitchen" 3-step section between hero and menu:
- Step 1: Mixed and shaped every morning before the sun comes up
- Step 2: Your way — any bagel, any spread, any topping
- Step 3: Hot, fresh, ready at the counter

### 2. TRUST BADGES STRIP (from New Yorker Bagels)
After hero stats bar, add a horizontal badges strip:
```
🥯 Baked Fresh Daily
🇪🇨 Ecuadorian Family Recipe  
🧀 20+ Cream Cheeses
🏅 4.5★ Google Rated
📍 Medford, NY Since Day One
```

### 3. VIDEO / REEL HERO (from New Yorker Bagels)
If any Instagram post is a video/reel, use as a looping muted background
in the Instagram section header. Posts 1–4 are reels — ideal candidate.

### 4. EMAIL CAPTURE (from Black Seed)
Add email signup to footer:
> "Get daily specials + the Knicks bagel drop before anyone else"
Wire to Klaviyo list `YsSdUw`  
Welcome discount code: `WELCOME15`

### 5. PRESS LOGOS STRIP (from Just Bagels)
Add social proof section:
> "As seen on" → Yelp / Google / DoorDash logos + star ratings
Or use a real customer quote pulled from Google Reviews.

---

## COPY FIXES NEEDED

Every instance of these must be fixed before launch:
| Old | Replace with |
|-----|--------------|
| "Open Since 6AM" | "Open Daily at 6 AM" |
| "Est. Daily 6AM" | "Open Every Day · 6 AM" |
| Any "passionate" | delete |
| Any "we are dedicated" | delete |

"Fresh bagels daily" is fine — keep.

**Hero subtext (exact copy):**
> "A family recipe. Two generations.
> The best bagel on Long Island —
> and the Knicks Everything Bagel is back for the season."

---

## CART SYSTEM NOTES

The Order tab currently goes to a DoorDash button. This needs to become:
- Menu items have working `+` buttons
- Cart drawer slides in from the right
- Cart shows items + quantity + total
- "Checkout" button opens DoorDash:
  `https://www.doordash.com/store/1144158`

**State management:** use `zustand`  
Install if missing: `npm install zustand`

---

## SEO TARGETS

**Primary keyword:** `bagels Medford NY`  
**Secondary keywords:**
- `breakfast Medford New York`
- `best bagels Long Island`
- `bagel shop Suffolk County`
- `bacon egg cheese bagel near me`

**Title tag:**
```
Joel's Bagels | Fresh Bagels & Breakfast · Medford, NY
```

**Meta description:**
```
Long Island's favorite bagel shop. Fresh bagels, BECs, and the Knicks
Everything Bagel in Medford, NY. Open daily at 6 AM.
```

---

## FRAMER MOTION ANIMATION PLAN

Check first: `npm list framer-motion`  
Install if missing: `npm install framer-motion`

Animations to add in priority order:
1. **Hero headline** — word-by-word blur-in on load
2. **Section reveals** — fade + slide up on scroll (IntersectionObserver via `whileInView`)
3. **Signature cards** — lift on hover (`whileHover: { y: -4 }`)
4. **Review cards** — stagger in (`staggerChildren: 0.1`)
5. **Menu tab switch** — fade between tabs (`AnimatePresence`)
6. **Cart drawer** — spring slide from right (`type: "spring", damping: 25`)
7. **Knicks banner** — slide down on load
8. **Cart count badge** — scale bounce on add (`keyframes: [1, 1.3, 0.9, 1.1, 1]`)

Black Seed uses Framer Motion confirmed — this is the industry standard for bagel shop UX.

---

## PACKAGES TO VERIFY INSTALLED

```bash
npm list framer-motion lenis zustand next
```

Install all missing at once:
```bash
npm install framer-motion lenis zustand
```

---

## NEXT.JS NOTES (from AGENTS.md)

This project uses a version of Next.js with breaking API changes.
Always read `node_modules/next/dist/docs/` before writing any Next.js code.
Do not assume App Router or Pages Router conventions from training data.

---
END OF RESEARCH
