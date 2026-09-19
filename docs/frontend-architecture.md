# Frontend Architecture

## Static Marketing Site

The first implementation phase focuses on stable, SEO-optimized pages that rarely change:

- Home
- Leistungen overview
- Static service landing pages
- Über mich
- Kontakt
- Impressum
- Datenschutz

These pages use React/Vite and static prerendering. They own core positioning, navigation, structured data, metadata, and conversion paths.

## Blog and CMS Area

The local Decap CMS now manages blog articles at `/blog` and `/blog/<slug>`. Approved articles are prerendered with metadata and sitemap entries. Drafts remain in the local editor and preview. Reusable article cards and sections allow other pages to reference articles by slug. The WordPress import is a later step; see `docs/blog-wordpress-import.md`.

The content model can later be extended with:

- FAQ expansions
- Seasonal updates
- Education content

Future CMS routes should be separated from the static shell, for example:

- `/wissen`
- `/wissen/[slug]`
- `/blog`
- `/blog/[slug]`

CMS entries need workflow state, SEO fields, preview support, and medical/legal review flags before publication.

## Implementation Rule

Do not let CMS flexibility drive the first static site structure. The static pages should define brand, trust, local SEO, and conversion. CMS content should extend that foundation later.
