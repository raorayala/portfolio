# Murali Rayala — Portfolio

Senior Backend & Platform Engineer site. Built with React and Vite.

## Local

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Contact form (Formspree)

1. Create a form at [formspree.io](https://formspree.io).
2. Copy the form id from `https://formspree.io/f/<id>`.
3. Copy `.env.example` to `.env` and set `VITE_FORMSPREE_ID`.
4. On Cloudflare Pages, add the same variable in project Settings → Environment variables.

## Deploy on Cloudflare Pages (free)

1. Push this repo to GitHub.
2. Open [Cloudflare Pages](https://pages.cloudflare.com) and import the repository.
3. Build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `20` or newer
4. Add `VITE_FORMSPREE_ID` as an environment variable, then redeploy.

After deploy, check the live site: resume download, project modals, mobile nav, and a test contact message.
