# erhanyaylali.com.tr

Personal site of Erhan Yaylalı — Next.js 16 (App Router), TypeScript 7, Tailwind CSS v4, Motion.

Requires Node.js 26 LTS (`nvm use` picks it up from `.nvmrc`) and npm 12.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` if the domain changes.

## Editing content

All copy lives in typed files under `content/` — no component changes needed:

| File | What |
| --- | --- |
| `content/profile.ts` | Name, headline, about text, skills, socials, email |
| `content/experience.ts` | Jobs (`end: null` marks the current role) |
| `content/education.ts` | Education |
| `content/projects.ts` | Projects: copy, stack, links, cover framing |
| `content/project-images.ts` | Screenshot imports + alt text (from `assets/projects/<slug>/`) |
| `content/project-slugs.ts` | Valid slugs — add new projects here too (used by `proxy.ts` for real 404s) |

The CV is served from `public/Erhan_Yaylali_CV.pdf`.

## SEO

- **Metadata API:** title template, descriptions clamped to ≤160 chars, canonical URLs, Open Graph (`profile` / `article`), Twitter cards
- **Generated OG images:** `app/opengraph-image.tsx`, `app/projects/[slug]/opengraph-image.tsx`
- **JSON-LD** (`lib/jsonld.tsx`), one linked `@graph` per page:
  - home: `ProfilePage`, `Person`, `WebSite`, `ItemList` of projects
  - `/projects`: `CollectionPage`, `ItemList`, `BreadcrumbList`
  - each project: `WebPage`, `SoftwareApplication` or `CreativeWork`, `BreadcrumbList`
- **Crawling:** `sitemap.xml` (with image entries), `robots.txt`, `llms.txt` for AI assistants (generated from `content/`)
- **Icons:** favicons at 48/96/192/512 (Google Search needs multiples of 48), apple-touch-icon, web manifest
- **Indexing:** fully prerendered; unknown routes return a real HTTP 404 (`proxy.ts`)
- **Google Search Console:** verification file `public/google9f8c4893f7b3be0b.html` — keep it
- **Security headers** in `next.config.ts`. No CSP: it would need per-request nonces and make pages dynamic.

## Analytics & cookie consent

- Google Tag Manager (`gtmId` in `content/profile.ts`, overridable with `NEXT_PUBLIC_GTM_ID`) loads **only in production and only after the visitor accepts** the cookie banner.
- Google Consent Mode v2 defaults to `denied` in an inline `<head>` script before any Google tag can load (`lib/consent.ts`).
- Visitors can change their choice any time via "Cookie settings" in the footer; declining removes `_ga` cookies.
- The privacy policy lives at `/privacy` — update it if you add other tracking.

## Tooling notes

- **TypeScript 7 + typescript-eslint:** TS 7 ships no compiler API yet, so `typescript` is aliased to
  `@typescript/typescript6` (used by typescript-eslint) and `@typescript/native` provides TS 7's `tsc`,
  which Next.js uses for type checking. This follows the TypeScript team's recommended side-by-side setup;
  drop the alias once typescript-eslint supports TS 7.1+.
- **`overrides.minimatch`:** forces the patched minimatch 11.0.4 (GHSA-g3hv-75wg-m249) in lint tooling.
