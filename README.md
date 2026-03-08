# YB Portfolio

A personal portfolio website built with Next.js and TypeScript to showcase projects, skills, certifications, and contact information.

## Overview

This project is a modern single-page portfolio with animated sections and a clean component-based structure. It highlights:

- Hero introduction
- Featured projects
- Skills by category
- Certifications gallery with lightbox
- About section
- Contact form and social links

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Lucide React icons
- Vercel Analytics

## Project Structure

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  header.tsx
  hero.tsx
  projects.tsx
  skills.tsx
  certifications.tsx
  about.tsx
  contact.tsx
  footer.tsx
hooks/
  use-in-view.ts
public/
  images/
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm run start` - start production server
- `npm run lint` - run ESLint



- Name, role, and text content in `components/*`
- Project and certification data in `components/projects.tsx` and `components/certifications.tsx`
- Contact links in `components/contact.tsx` and `components/footer.tsx`
- Theme variables in `app/globals.css`
