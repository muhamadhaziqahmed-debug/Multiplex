# Refactor Changelog

The page looks and behaves exactly the same as before. Everything below is a
code-quality change only — no visual, layout, or functional change.

---

## ROOT VARIABLES ADDED

**Colors**
- `--white` (#fff) — used for button text and a few backgrounds. 5 repeats.
- `--primary-color` (#95c53d) — the main green: top bar, buttons, right-side close bar. 5 repeats.
- `--primary-hover` (#89b73d) — border/hover shade of the primary green. 3 repeats.
- `--primary-dark` (#78a62c) — darkest green, used for hover states and a couple of accent links. 5 repeats.
- `--accent-green` (#95c93d) — **kept separate from `--primary-color` on purpose.** It's one digit different (`c9` vs `c5`) and is only used in the testimonials/tab-widget area (active dot, active tab border, quote author name). It looked like it might be a typo of the main green, but since your instructions were "don't change appearance," I left the two greens exactly as they were rather than guessing which one was the "mistake." Worth double-checking with your design file if you ever revisit this.
- `--text-dark` (#404042) — main headings (hero heading, intro heading). 3 repeats.
- `--text-gray` (#707070) — nav links, blog post text. 2 repeats.
- `--text-muted` (#727981) — paragraph text in the intro/services area. 3 repeats.
- `--text-body` (#777) — paragraph text in testimonials/tabs area. 3 repeats.
- `--text-heading-alt` (#46474b) — hero "Want it badly?" text and the blog heading. 2 repeats.
- `--text-heading-secondary` (#444) — testimonials heading and lower-intro heading. 2 repeats.
- `--border-light` (#eee) — the `<hr>` divider.
- `--border-medium` (#ddd) — tab widget and panel borders. 2 repeats.
- `--bg-quote` (#f5f5f5) — the quote bubble background and its little pointer triangle. 2 repeats.

**Spacing** (only values that repeated 2+ times became variables — one-off numbers like `14px` or `50px` were left as plain numbers, per your instructions)
- `--space-2xs` (8px), `--space-xs` (10px), `--space-sm` (15px), `--space-md` (20px), `--space-lg` (25px), `--space-xl` (40px), `--space-2xl` (60px), `--space-3xl` (70px)

**Effects**
- `--radius-sm` (3px) — button corner rounding.
- `--shadow-btn` (0px 2px 2px rgba(0,0,0,0.4)) — the shadow under the three main call-to-action buttons.

**Removed:** the original `:root` had `--space-xs` through `--space-xl` defined in `rem` units, but they were never actually used anywhere in the file. I replaced them with the pixel-based scale above, which *is* wired into the actual spacing values that repeat.

---

## HTML CHANGES

- Added `class="btn-primary"` to the **"Get a Free Qoute"** button. It was visually identical to "Get it now!" and "Purchase Now" (same green, same shadow, same border) but had every property re-typed by hand in CSS instead of reusing the class the other two buttons already had. This was the one HTML change needed to support removing that CSS duplication — everything else about the HTML is untouched.
- No other structural changes. Content, text, links, and images are all exactly as you had them.

---

## CSS CHANGES

- **Merged the "Get a Free Qoute" button style into `.btn-primary`.** Its rule now only contains `padding: 5px`, which is the one property it needs on top of the shared style.
- **Merged the two separate `.client img { ... }` rule blocks into one.** They were two different rules with the exact same selector — one had the sizing, one had the transition. Combining them doesn't change anything, it just means you're not hunting through two places for one selector's styles.
- **Removed `font-family: 'Segoe UI', sans-serif;` from `.blogs h3 span`.** Your global reset (`* { font-family: 'Segoe UI', sans-serif; }`) already applies this to every element, so this line had zero effect — it was setting something to the value it already was.
- **Removed `size: cover;` from `.client img`.** `size` isn't a real CSS property, so this line did nothing. (You were probably thinking of `background-size` or `object-fit` — happy to add `object-fit: cover` if you ever want the client logos to crop instead of stretch, but I didn't add it here since that would change how the images render.)
- Swapped repeated literal colors/spacing values for the variables listed above.
- Reorganized the file into the same section comments it already had, kept them, and added a "Design Tokens" section up top plus a short comment explaining the shared button class.
- Left every value that only appears once as a plain number/color — no unnecessary variables.

---

## JAVASCRIPT CHANGES

- Renamed a few variables for clarity: `tabs` → `tabButtons`, `current` → `currentIndex`, `quote`/`author` → `quoteEl`/`authorEl` (so it's clear they're DOM elements, not the data itself).
- Split the testimonial-rendering logic into three small named functions — `showTestimonial()`, `goToNextTestimonial()`, `goToPreviousTestimonial()` — instead of writing the increment/wrap-around logic separately inside the "next" button handler, the "prev" button handler, and the `setInterval` call. All three used to repeat the same "add or subtract 1, then check if we went past the end" logic; now that logic lives in one place.
- The wrap-around math itself was simplified using the remainder operator (`%`) instead of an `if` statement that resets to 0 or the last index. This produces the exact same result for every click and for the auto-advance timer — it's just fewer lines expressing the same rule ("loop back around to the start/end").
- Added a comment explaining *why* `.trim()` is called on the tab's text (so it matches the `tabContent` keys exactly, even with extra whitespace from the HTML indentation).
- No behavior changed: same tabs, same testimonials, same 5-second auto-advance, same dot/prev/next behavior.

---

## DUPLICATE CODE REMOVED

- Three buttons ("Get it now!", "Purchase Now", "Get a Free Qoute") had identical `color`, `height`, `font-size`, `background-color`, `border`, `border-radius`, and `box-shadow` — two of them already used a `.btn-primary` class for this, the third had it copy-pasted. Now all three use the class.
- Two separate CSS rule blocks both selected `.client img` — merged into one.
- One redundant `font-family` declaration that repeated the global default.
- One invalid CSS property (`size: cover`) that had no effect and was safe to delete.

---

## BEGINNER TIPS

**Why this is better:**
- If you ever want to change "the green" across the whole site, you now edit `--primary-color` once instead of hunting through the file for every `#95c53d`. Same for spacing — if you decide every section should have a bit more breathing room, you change `--space-3xl` once.
- Repeated logic living in one function (like `showTestimonial`) means a bug fix or tweak only has to happen in one place, not three.

**What I'd flag as worth learning from this project specifically:**
- **You already had the right instinct with `.btn-primary`** — you just didn't finish applying it everywhere. When you notice yourself typing the same six CSS properties on a new button, that's the signal to reach for a shared class *before* you finish the copy-paste, not after.
- **Two nearly-identical colors (`#95c53d` vs `#95c93d`) living in the same file for months without you noticing is an easy trap.** It's why picking your palette from named variables *before* you start styling (rather than eyeballing a color picker each time) tends to save you from this. I left both in place since I can't tell which one was the mistake without your design reference, but it's worth checking.
- **The `size: cover` typo is a good reminder that invalid CSS properties fail silently** — the browser just ignores what it doesn't recognize, so a typo like this won't throw an error or show up in your rendered page, it just quietly does nothing. Keeping your browser dev tools' "Elements → Styles" panel open while you work will grey out (and cross out) any property the browser is ignoring, which is the fastest way to catch this kind of thing yourself next time.
