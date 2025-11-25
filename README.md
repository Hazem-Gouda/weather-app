# Weather Next (converted from CRA)

This repository contains a Next.js (App Router) port of the original Create React App weather project. The original CRA project remains untouched in your other folder.

Quick start (development)

1. Install dependencies:

   npm install

2. Add an OpenWeather API key to `.env.local` (example below) and DO NOT commit it.

   Create `.env.local` with:

   OPENWEATHER_API_KEY=your_real_openweather_api_key_here

3. Run the dev server:

   npx next dev

4. Open the app in the browser (the terminal will show the local URL):

   http://localhost:3000 (or the port shown by Next)

Notes about this migration

- Global CSS and Bootstrap are loaded from `app/layout.jsx`. App-specific styles were copied from the CRA `App.css` into `src/components/App.css` so components keep their original look.
- Server-side API proxy routes are implemented under `app/api/weather/route.js` and `app/api/forecast/route.js`. They require the server env var `OPENWEATHER_API_KEY`.
- Interactive components were marked as client components (`'use client'`) so they behave the same as in CRA.

If you do not want to use a real API key for development, ask me to enable a demo fallback that returns canned data.

Files of interest

- `app/layout.jsx` — Next.js layout: imports global CSS, bootstrap, providers.
- `app/page.jsx` — mounts `src/components/App`.
- `src/context/WeatherContext.js` — app context (calls our server API routes).
- `src/components/*` — UI components from the original CRA app.
- `app/api/*` — server proxy routes for OpenWeather.

Development checklist

- Install dependencies: `npm install`
- Add `.env.local` with `OPENWEATHER_API_KEY`
- Run `npx next dev` and open the URL shown in the terminal

If you want, I can (optional): copy public images from the CRA project into `public/`, add a demo mode, or prepare a branch with these changes.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
