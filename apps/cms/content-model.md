# Content Model

## Singletons

### Site Settings

- Practice name.
- Practitioner name and credentials.
- Address, phone, email, opening hours.
- Appointment CTA label and target.
- Default SEO title template and default Open Graph image.
- Social profiles, only if real and maintained.

### Legal

- Impressum.
- Datenschutz.
- Cookie/consent copy if tracking is used.

## Collections

### Page

- Title.
- Slug.
- SEO title.
- Meta description.
- Open Graph image.
- Noindex flag.
- Hero copy.
- Modular content sections.
- Internal links.
- Review status.

### Service

- Title.
- Slug.
- Short summary.
- SEO title.
- Meta description.
- Patient questions.
- Process.
- Preparation notes.
- FAQ.
- Medical review required flag.
- Review status.

### Article

- Title.
- Slug.
- Teaser.
- Featured image, alt text, source and usage permission.
- Markdown body (converted from WordPress HTML during import).
- Original publication date and categories.
- Topic references (`topicSlugs`, multiple) and an independent news flag (`isNews`).
- Assigned services, complaint pages and related articles.
- Dedicated SEO title, description, optional Open Graph image and noindex flag.
- Author/reviewer.
- Sources/notes if medical context is discussed.
- Review status and medical approval fields.
- Optional WordPress ID and original URL for import matching and redirect planning.

### Article section

- Enabled flag, heading and description.
- Source: latest articles, news, one topic or an explicit ordered selection.
- Topic slug or article slug references, depending on the selected source.
- Maximum article count.
- Cards, compact list or a featured article followed by a list.
- Optional service/complaint filters; hidden when no visible articles match.

### Article topic

- Stable slug, title, short description and sort order.
- SEO title, description, optional Open Graph image and noindex flag.
- Review status and optional medical approval fields.
- Published topics automatically create an overview card, filter option and archive route.

See `docs/blog-wordpress-import.md` for the implemented contract and editorial workflow.

### FAQ

- Question.
- Answer.
- Related service/page.
- Review status.

### Media Asset

- File.
- Alt text.
- Caption.
- Copyright/source.
- Usage permission.
- Focal point.
- Review status.

## Workflow

1. Draft content.
2. SEO review.
3. Fachliche/rechtliche Prüfung.
4. Publish.
5. Scheduled re-review.
