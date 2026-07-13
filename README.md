# Royal English Medium School — Website

A production-ready school website built with Next.js 15 (App Router), React, Tailwind CSS v4, and Framer Motion. 100% free and open-source tooling — no paid templates, plugins, or subscriptions required.

## Getting Started

1. Install [Node.js](https://nodejs.org) (LTS version).
2. Open this folder in VS Code / your terminal.
3. Install dependencies:
   ```
   npm install
   ```
4. Run the development server:
   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

To build for production:
```
npm run build
npm run start
```

## Admin Panel

This site includes a full admin dashboard at `/admin` for managing content without touching
code — leads, news, events, gallery photos, faculty, and fee structure.

**It needs a one-time, 10-minute setup before you can sign in.** Follow **`ADMIN_SETUP.md`**
in this project's root for the full walkthrough (create a free Supabase project, run the
included schema, add your API keys, create your login).

Until that's done, `/admin/login` will show setup instructions instead of a login form, and
every public page falls back to the placeholder content in `src/data/school.js` — so the site
works perfectly well before you connect the backend, you just can't manage content from a
dashboard yet.

## Editing Content

Almost all school-specific content lives in one file:

```
src/data/school.js
```

Edit this file to update:
- School name, address, phone, email, hours
- Navigation links
- Stats, testimonials, class list, admission process, documents required

**News, events, gallery, faculty and fee structure** are managed from `/admin` once connected
(see above) — editing `school.js` only changes the fallback shown before you connect Supabase.

**Before publishing**, replace the placeholder values in `school.js` (phone number, email,
social links) with your real information.

## Project Structure

```
src/
  app/                    Next.js App Router pages
    page.js               Homepage
    about/page.js         About Us page
    academics/page.js     Academics page
    admissions/page.js    Admissions page
    gallery/page.js       Gallery page
    contact/page.js       Contact page
    privacy-policy/       Privacy policy
    terms/                Terms & conditions
    not-found.js          Custom 404 page
    sitemap.js            Auto-generated sitemap.xml
    robots.js             Auto-generated robots.txt
    layout.js             Root layout, fonts, global SEO metadata
    globals.css           Design tokens (colors, fonts) and global styles

  components/
    layout/               Navbar, Footer, Announcement bar
    home/                 Homepage sections (Hero, Stats, Facilities, etc.)
    admissions/           Admission enquiry form
    contact/              Contact form
    gallery/              Gallery grid with lightbox
    shared/                PageHero, Breadcrumb, MapSection (reused across pages)
    ui/                    Reusable primitives: Button, Container, SectionHeading, Reveal, Crest, SocialIcons

  data/
    school.js              Single source of truth for all school content
```

## Design System

- **Colors**: Royal Blue / Navy (`--color-navy`, `--color-royal`), Gold accent (`--color-gold`), Ivory background (`--color-ivory`). Defined in `src/app/globals.css`.
- **Fonts**: Fraunces (display/headings) + Inter (body), self-hosted via `@fontsource` — no external network calls needed at build time.
- **Crest**: The circular emblem (`src/components/ui/Crest.jsx`) is the site's recurring brand mark — used in the navbar, footer, hero, and page headers.

## Replacing Placeholder Images

Every visual "image" in this build is currently a styled gradient placeholder (to keep the project dependency-free and instantly runnable). To add real photos:
1. Add image files to the `public/` folder.
2. Replace the gradient `<div>` placeholders in components like `Hero.jsx`, `PrincipalMessage.jsx`, `GalleryPreview.jsx`, and `GalleryGrid.jsx` with Next.js `<Image />` components pointing at your files.

## Forms & Leads

The Admission and Contact forms (`react-hook-form` + `zod`) already save submissions to
Supabase as **leads**, visible and manageable at `/admin/leads`, once you've completed the
setup in `ADMIN_SETUP.md`. Until then, they simulate submission (log to the browser console)
so the forms still work while you're getting the backend connected.

## SEO Checklist Already Included

- Per-page metadata (title, description, canonical, Open Graph, Twitter cards)
- JSON-LD structured data (School schema + Breadcrumbs)
- Auto-generated `sitemap.xml` and `robots.txt`
- Semantic HTML, ARIA labels, keyboard-accessible navigation
- Mobile-first, fully responsive layouts

## Next Steps

- Swap placeholder gradients for real campus/student photos
- Update `metadataBase`/`siteUrl` in `layout.js`, `sitemap.js`, and `robots.js` once you have a real domain
- Connect a form backend (Supabase/Firebase) for admissions and contact submissions
- Add a real Google Maps API key if you want an interactive (not just embed) map
