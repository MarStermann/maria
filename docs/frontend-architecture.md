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

These pages should stay in the Next.js App Router and be statically generated whenever possible. They own core positioning, navigation, structured data, metadata, and conversion paths.

## Future CMS Area

Customer-authored content should be added later through the headless CMS:

- Articles
- Blog posts
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
