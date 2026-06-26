# Deploy to GitHub + Vercel (with password)

This folder (`calathletics-site/`) is a ready static site — just `index.html` (+ optional `middleware.js` password gate).

> I can't push to your GitHub or Vercel accounts for you (those need your login), so here's the exact runbook. ~4 commands + a few clicks.

## 1) Push to GitHub (repo: `viliopoulos/calathletics`)
Create an empty repo at https://github.com/new named **calathletics** (no README), then from this folder:

```bash
cd "calathletics-site"            # this folder
rm -rf .git                       # remove the leftover .git from setup (if present)
git init && git branch -M main
git add -A && git commit -m "Cal football TV viewership dashboard"
git remote add origin https://github.com/viliopoulos/calathletics.git
git push -u origin main
```
(If you already have a `calathletics` repo with content, either push these into a subfolder or use a new repo name and import that on Vercel.)

## 2) Deploy on Vercel
1. https://vercel.com → **Add New… → Project** → Import `viliopoulos/calathletics`.
2. Framework Preset: **Other**. Build command: *none*. Output dir: *leave default (root)*.
3. **Deploy**. You'll get a `https://calathletics-….vercel.app` URL.

## 3) Password-protect it (`gobears1`)
Pick whichever fits your plan:

**Option A — Vercel native (simplest; Pro plan):**
Project → **Settings → Deployment Protection → Password Protection** → enable → set password `gobears1` → Save.

**Option B — Free/Hobby tier (uses the included `middleware.js`):**
Project → **Settings → Environment Variables** → add
`SITE_PASSWORD = gobears1` (all environments) → **Redeploy**.
The site will then prompt for a login box; enter any username + password `gobears1`.
(Leave the env var unset and the gate stays off.)

> Note on security: Option A and Option B (env-var Basic Auth) keep the password server-side. Avoid hard-coding the password into client HTML — anyone could read it in “view source.” For an internal alignment doc, Option B on the free tier is plenty.

## Updating later
Edit `index.html`, then:
```bash
git add -A && git commit -m "update" && git push
```
Vercel auto-redeploys on push.
