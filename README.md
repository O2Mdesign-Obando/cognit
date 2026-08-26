# Cognit

This repository is the independent web and product home for Cognit. Its current implemented surface is the **Cognit Learning Hub Demo**, with room for the future Cognit website, services, and products.

## Cognit Learning Hub Demo

The canonical demo route is:

`/learninghub/demo`

The synthetic demo presents five coordinated perspectives:

- Center
- Coach
- Student
- Family
- HQ

The perspectives share one synthetic learning world while expressing the information and actions appropriate to each role. Demo state is browser-local and resettable. The project has no production operational integrations: no Supabase, authentication service, payment processing, email/support delivery, external AI, migration API, or real media-upload backend.

All demo routes carry a `noindex, nofollow` posture.

## Local development

The intended runtime is Node.js 22.

```sh
npm install
npm run dev
```

Build and validate the static route graph:

```sh
npm run validate
```

## Deployment posture

The project uses Astro with the Vercel adapter and is ready for import into a new Vercel project. Importing or deploying this repository must not be treated as authorization to bind a production domain or connect production services.

The root (`/`) and Learning Hub product route (`/learninghub`) are intentionally neutral placeholders for future Cognit work.
