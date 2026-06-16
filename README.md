# Oussama Brahimi — Freelance Web Developer Portfolio

A modern, premium, conversion-focused one-page website built with Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion, and Lucide Icons.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
oussama-site/
├── app/
│   ├── layout.tsx       # Root layout, fonts (incl. Arabic), SEO metadata, theme init script
│   ├── page.tsx         # Full one-page site (all sections)
│   ├── providers.tsx    # Dark mode + language (en/ar) context providers
│   ├── translations.ts  # English & Arabic text content
│   └── globals.css      # Tailwind directives + base styles + RTL fonts
├── package.json
├── tailwind.config.ts   # Includes dark mode (class) + custom rtl:/ltr: variants
├── postcss.config.js
└── tsconfig.json
```

## Dark Mode & Arabic Language

- A sun/moon button in the navbar toggles dark mode. The choice is saved in
  `localStorage` and respected on return visits (falls back to system
  preference on first visit).
- A language button toggles between English and Arabic. Arabic switches the
  whole layout to RTL (right-to-left) and uses Arabic fonts (Cairo for
  headings, Tajawal for body text). The choice is also saved in
  `localStorage`.
- All text lives in `app/translations.ts` — edit that file to change wording
  in either language.

## What to Customize

- **Contact info**: replace `your@email.com` and the WhatsApp number in the
  Contact section (`app/page.tsx`, search for "Get In Touch").
- **Form submission**: the contact form currently shows a success message on
  submit. Connect it to an email service (e.g. Resend, Formspree, or your own
  API route) by replacing the `handleSubmit` function in `app/page.tsx`.
- **Testimonials**: swap the sample testimonials for real client feedback.
- **Colors**: defined in `tailwind.config.ts` as `primary` (#2563EB),
  `secondary` (#1E293B), and `accent` (#06B6D4).
- **Fonts**: Space Grotesk (headings) and Inter (body), loaded via
  `next/font/google` in `app/layout.tsx`.

## Notes

- Fully responsive (mobile-first), accessible (keyboard focus states,
  `prefers-reduced-motion` support), and structured for SEO with metadata in
  `app/layout.tsx`.
- All animations use Framer Motion with scroll-triggered reveals.
