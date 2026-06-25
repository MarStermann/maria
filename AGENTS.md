# Project Agent Guide

## Project

This repository is the website foundation for a German Heilpraktikerin practice. The product goal is a trustworthy, SEO-focused, conversion-aware marketing site backed by a headless CMS.

Primary stack:

- React via Next.js App Router for SEO, static generation, metadata, sitemap, robots, and structured data.
- CMS-neutral content model until the provider is chosen.
- German copy by default.

## Non-Negotiables

- Do not publish medical cure promises, guaranteed outcomes, diagnosis claims, or exaggerated before/after language.
- Prefer careful wording such as "begleiten", "unterstuetzen", "kann hilfreich sein" when medically appropriate.
- Keep legal pages, imprint, privacy copy, pricing, address, and practitioner credentials as launch blockers until verified by the client.
- Default `NEXT_PUBLIC_ALLOW_INDEXING=false` while placeholder content exists.
- Content and schema must not invent address, credentials, awards, reviews, opening hours, or treatment claims.

## Design Direction

- Calm, professional, warm, and premium; avoid wellness cliches and decorative overload.
- Build actual user journeys first: understand offer, build trust, choose a service, request an appointment.
- Keep components compact and scannable. Cards use max `8px` border radius.
- Avoid one-note palettes and generic hero gradients. Use real practice imagery later when available.
- Mobile layouts must be first-class, with no text overlap or cramped CTA rows.

## SEO Direction

- Every indexable page needs a unique H1, title, meta description, canonical path, Open Graph image, and internal links.
- Service pages should target one clear search intent each, with FAQ content only when it answers real patient questions.
- Use structured data conservatively: `LocalBusiness` for the practice and `Service` for individual services.
- Keep sitemap routes aligned with existing pages only.
- Prefer server-rendered/static content over client-only rendering for crawlable content.

## CMS Direction

- Keep the `packages/content-model` contract provider-neutral.
- CMS entries need workflow state: `draft`, `review`, `published`, or `archived`.
- Medical-sensitive pages and services require explicit review before publishing.
- Store SEO fields close to each content item; avoid deriving snippets from long body text at publish time.

## Commands

- Install dependencies after Node.js is available: `npm install`
- Start frontend: `npm run dev`
- Build frontend: `npm run build`
- Typecheck workspaces: `npm run typecheck`

## Local Skill

Use `.codex/skills/maria-healthcare-marketing` for work involving SEO strategy, service page copy, CMS content structure, local search, conversion copy, or healthcare-sensitive wording.
