# Branding Extraction

Source image: `apps/web/public/Brand Image Neu.png`

## Extracted Text

- Name: Maria Alscher-Scheunemann
- Role: Heilpraktikerin
- Artwork-only service signals: Ganzheitliche Frauenheilkunde, Naturheilkunde, Regulationsmedizin, Diagnostik, Therapie, Beratung
- Quote: "Weil Gesundheit mehr ist als die Abwesenheit von Krankheit."
- Domain shown in artwork: `www.alscher-scheunemann.de`

These details come from the supplied branding image. Legal, professional, address, contact, pricing, and health-claim details still need client/legal review before launch.

## Visual Direction

- Calm, premium, natural, and feminine without becoming decorative-heavy.
- Use the poster as brand reference, not as a full website layout. The homepage should stay streamlined, conversion-focused, and easy to scan.
- Keep the first screen grounded in a clear local H1, short trust signals, primary appointment CTA, and restrained visual support.
- Left image depth: eucalyptus-like leaves, delicate white blossoms, natural mortar texture, and the acupuncture-ear cue as a subtle brand signal.
- Avoid rebuilding the complete poster with large wave zones, multiple decorative image layers, or strong right-side motifs.
- Layout language: generous negative space, thin dividers, warm paper tones, clear section rhythm, and compact repeated elements.

## Color Palette

The new image is dominated by warm cream, soft linen, muted sage, dark olive, and narrow gold accents.

| Role | Hex | Usage |
| --- | --- | --- |
| Canvas | `#fbf7ee` | Page background |
| Linen | `#f1eadf` | Soft bands and quiet surfaces |
| Cream | `#f7f1e6` | Hero/image-adjacent panels |
| Mist | `#e8e5d8` | Wave zones and subtle depth |
| Taupe | `#d6c6ae` | Borders and muted natural textures |
| Sage | `#7f8764` | Secondary natural accent |
| Soft sage | `#c8cdb8` | Botanical backgrounds |
| Olive | `#344a2f` | Primary brand text and primary actions |
| Deep olive | `#263820` | Footer and high-contrast text |
| Gold | `#b8871f` | Thin lines, role text, secondary accents |
| Soft gold | `#d9b86f` | Highlights and selection |
| Charcoal olive | `#2e352b` | Body text |
| Muted grey-green | `#6e7164` | Supporting text |
| Blush | `#efe2dc` | Caution/review panels |

## Typography

- The name uses an elegant old-style serif: refined, personal, and high-trust.
- Role and service labels use spaced uppercase sans serif with gold dividers.
- The quote uses a handwritten/script mood in the source artwork; on the website use an italic serif until a licensed script font is approved.
- Body copy should stay clean, readable, and calm.

## UI Translation

- Use MUI theme colors from `apps/web/src/theme/brand.ts`.
- Use `apps/web/public/Brand Image Neu.png` as the primary design reference.
- Use the generated derivatives for responsive composition:
  - `brand-neu-emblem.png`
  - `brand-hero-background-desktop-v2.png`
  - `brand-hero-background-mobile-v2.png`
  - `brand-left-still-life.png`
  - `brand-neu-botanical-cutout.png`
  - `brand-generated-acupuncture-ear.png`
  - `brand-neu-soft-motif.png`
- The current homepage uses `brand-hero-background-desktop-v2.png` and `brand-hero-background-mobile-v2.png` as responsive hero backgrounds.
- Keep the homepage hero as real HTML text for H1, trust facts, body copy, and CTAs.
- Do not use the full PNG as a single flat website hero background and do not return to an overloaded poster hero.
- Keep cards and controls at `8px` border radius.
- Prefer thin gold dividers, warm surfaces, and real image texture over generic gradients.
- Use real practice photography later when available.

## Content Guardrails

- The brand can communicate holistic care, time, listening, and individual guidance.
- The artwork service wording is branding copy. Do not create new SEO pages or medical claims for "Regulationsmedizin" or "Therapie" until the terms are professionally reviewed.
- Avoid cure promises, guaranteed outcomes, diagnosis claims, before/after claims, and disease-treatment promises.
- Treat "Diagnostik", "Therapie", "Beratung", and "Frauenheilkunde" content as review-sensitive before publication.
