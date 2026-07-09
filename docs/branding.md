# Branding Extraction

Source image: `apps/web/public/Elegante Akupunktur- und Naturheilkunde Branding.png`

## Extracted Text

- Name: Maria Alscher-Scheunemann
- Role: Heilpraktikerin
- Service signals: Akupunktur, Klassische Naturheilkunde, Ganzheitliche Frauenheilkunde, Diagnostik, Behandlung, Beratung
- Quote: "Weil Gesundheit mehr ist als die Abwesenheit von Krankheit."
- Domain shown in artwork: `www.alscher-scheunemann.de`

These details come from the supplied branding image. Legal, professional, address, contact, and health-claim details still need client/legal review before launch.

## Visual Direction

- Calm, premium, natural, and feminine without becoming decorative-heavy.
- Botanical imagery: yarrow-like line illustration, eucalyptus leaves, delicate white blossoms.
- Treatment cue: ear/acupuncture visual and acupuncture needles.
- Layout language: centered, symmetrical, generous negative space, thin divider lines, soft wave separator.
- Brand mood: careful, elegant, personal, quiet, holistic.

## Color Palette

The image is dominated by warm cream and linen tones. Technical sampling of the PNG showed frequent clusters around `#F0F0E0`, `#F0E0E0`, `#E0D0C0`, `#808050`, and `#C0A070`.

| Role | Hex | Usage |
| --- | --- | --- |
| Canvas | `#fbf7ee` | Page background |
| Linen | `#f1eadf` | Soft bands and quiet surfaces |
| Cream | `#f7f1e6` | Hero/image-adjacent panels |
| Mist | `#e8e5d8` | Subtle depth and separators |
| Taupe | `#d6c6ae` | Borders, muted botanical details |
| Sage | `#7f8764` | Secondary natural accent |
| Soft sage | `#c8cdb8` | Botanical backgrounds |
| Olive | `#344a2f` | Primary brand text and primary actions |
| Deep olive | `#263820` | Footer, high-contrast text |
| Gold | `#b8871f` | Thin lines, eyebrow text, secondary accents |
| Soft gold | `#d9b86f` | Highlights and selection |
| Charcoal olive | `#2e352b` | Body text |
| Muted grey-green | `#6e7164` | Supporting text |
| Blush | `#efe2dc` | Caution/review panels |

## Typography

- Primary name style resembles an elegant old-style serif: refined, high-trust, not clinical.
- Service labels use spaced uppercase sans serif with thin gold dividers.
- Quote uses a handwritten/script style. Use sparingly; do not use script for body copy or important accessibility-critical text.
- Website implementation should use a serif stack for headings and a clean system sans stack for body text until final licensed fonts are chosen.

## UI Translation

- Use MUI theme colors from `apps/web/src/theme/brand.ts`.
- Keep cards and controls at `8px` border radius.
- Prefer thin gold dividers, botanical restraint, and warm surfaces over gradients.
- Reuse the animated yarrow SVG from `apps/web/src/components/yarrow-illustration.tsx` for botanical brand moments.
- Use the supplied branding image as a design reference, not as an embedded website element.
- Use real practice photography later when available.
- Keep static SEO pages server-rendered and stable; reserve future CMS routes for articles/blog content.

## Content Guardrails

- The brand can communicate holistic care, time, listening, and individual guidance.
- Avoid cure promises, guaranteed outcomes, or disease-treatment claims.
- Treat "Diagnostik", "Behandlung", and "Frauenheilkunde" pages as review-sensitive before publication.
