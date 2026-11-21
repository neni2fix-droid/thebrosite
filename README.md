# The Brothers Foundation — One-Page Website

A premium, minimalist, mobile-first landing page for The Brothers Foundation, a Ghanaian humanitarian charity.

Plain HTML5, CSS3 and vanilla JavaScript. No frameworks, no build step, no npm, no external libraries (only Google Fonts).

---

## 1. Run it locally

The site is static — you can simply open `index.html` in a browser.

For the most accurate result (and so `fetch()` works the same way it will in production), serve it over HTTP:

```bash
# Python 3 (already installed on most machines)
python -m http.server 8080

# or with Node.js
npx serve .
```

Then visit <http://localhost:8080>.

> Some browsers restrict `file://` fetches. If the enquiry form misbehaves when opened directly from disk, use the local server above.

---

## 2. File structure

```
index.html              Page markup (structure only — content is rendered from data.js)
css/styles.css          All styles, brand tokens in :root, mobile-first
js/data.js              ALL editable content: events, news, donation, contact, impact
js/main.js              Menu, scroll reveal, rendering, form validation, dynamic year
images/logo-header.png  Header wordmark, recoloured fully violet
images/logo-white.png   Footer wordmark (white, for the violet background)
images/hero.webp        Hero photograph (real outreach photo)
images/campaign.jpg     "Save A Child" photograph (real outreach photo)
images/fieldwork-team.jpg  About-section photograph (real outreach photo)
images/icons/*.svg      Violet programme icons
images/favicon.svg      Favicon
robots.txt              Crawler rules
README.md               This file
```

There is **no build step, no framework and no npm dependency**. The site is static HTML, CSS and vanilla JS.

---

## 3. Edit content (no code knowledge needed)

Open `js/data.js`. Everything you might want to change is there:

- **`events`** — add, remove or edit events. Keep the newest first. Each event has `title`, `date` (ISO format, e.g. `"2025-04-18"`), `displayDate` (what visitors see), `location` and `label`.
- **`news`** — the four news items. Replace each `excerpt` placeholder with the real text when it is supplied.
- **`donation`** — mobile money number and bank details. If these change, update them here only.
- **`contact`** — phone, mobile, email and address.
- **`impact`** — the impact statement. **Do not add statistics** unless the foundation has verified them. If verified figures are supplied later, they must be added deliberately, with a source and date.
- **`site`** — foundation name, tagline and founding year.

Save the file and refresh the page. No build step is required.

Things that are **not** in `data.js` because they are structural copy: hero text, About text, the six programme cards, campaign copy, the form labels, and footer legal text. Edit those directly in `index.html`.

---

## 4. The enquiry form

The form uses `fetch()` to POST to **FormSubmit** (<https://formsubmit.co>), which forwards each enquiry as an email. No account, key or dashboard is involved.

Deliveries currently go to **godwintext@gmail.com**. The endpoint is set in `js/main.js`:

```js
const FORM_ENDPOINT = "https://formsubmit.co/ajax/godwintext@gmail.com";
```

**One-time activation — required.** FormSubmit emails an "Activate Form" link to that inbox the first time the endpoint is used. An activation email has already been triggered. Until somebody opens it and clicks the link, submissions are accepted by the browser but **not delivered**. Once clicked, delivery is permanent.

To send enquiries somewhere else, change only `FORM_ENDPOINT` — the handler posts the same `FormData` to whatever URL is there. Any service accepting a `POST` of `FormData` and returning 2xx works.

The handler also sends `_subject`, `_template=table` and `_captcha=false` so emails arrive formatted and without a CAPTCHA step. The honeypot field (`company`) is stripped from the payload before sending.

Guard rails, so the form never lies to a visitor:

- If `FORM_ENDPOINT` is empty, the form refuses to send and shows the phone number and email instead.
- FormSubmit answers HTTP 200 with `{"success":"false"}` when it rejects a submission (for example, before activation). The handler reads that body and shows the error state rather than claiming success.
- A hidden honeypot field silently drops bot submissions.
- 15-second timeout, then a clear failure message with the phone number and email.

States implemented: field validation on blur and on submit, loading spinner, success message, server/network error, and timeout.

---

## 5. Replace the placeholders

### Logo
No logo file was supplied. `images/logo.svg` is a **placeholder emblem**. Replace it with the foundation's official logo, recoloured fully to violet `#7402A0` (or white on violet backgrounds). Do not redesign or distort it. Keep the filename or update the `<img src>` references in `index.html` (header and footer).

### Photographs
`images/placeholder-hero.svg` and `images/placeholder-about.svg` are clearly labelled placeholders. Replace them with authentic photographs of real outings and people, then update the `src` and `alt` text in `index.html`.

Recommended: export photos as WebP or optimised JPEG, roughly 1600px wide for the hero and 1200px for the About image. The images already use `loading="lazy"` (the hero uses `fetchpriority="high"` since it is above the fold).

### Open Graph image
`og:image` currently points at `images/placeholder-hero.svg`. Most social platforms do not render SVG previews — replace it with a 1200×630 JPG/PNG and use an **absolute URL** after deployment.

---

## 6. Deploy

The site is fully static, so any static host works. The folder root is the publish directory.

### Netlify
1. Push this folder to a Git repository (GitHub, GitLab, Bitbucket).
2. In Netlify: **Add new site → Import an existing project**.
3. Build command: leave blank. Publish directory: `/` (repository root).
4. Deploy.

Or drag-and-drop the folder onto <https://app.netlify.com/drop>.

### Vercel
1. Push to Git and import the repository at <https://vercel.com/new>.
2. Framework preset: **Other**. Build command: none. Output directory: `.`
3. Deploy.

Or run `npx vercel` from this folder and accept the defaults.

### Cloudflare Pages
1. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
2. Framework preset: **None**. Build command: none. Build output directory: `/`.
3. Deploy.

### GitHub Pages
1. Push the folder to a GitHub repository.
2. **Settings → Pages → Build and deployment**.
3. Source: **Deploy from a branch**; branch `main`, folder `/ (root)`.
4. Save. The site publishes at `https://<user>.github.io/<repo>/`.

> If deploying to a subpath (GitHub Pages project sites), all asset paths are relative (`css/…`, `js/…`, `images/…`), so they will work without changes. Links that start with `#` also work.

### After any deployment
- Set the absolute `og:image` URL.
- Add your real domain to `robots.txt` as a sitemap comment, or add a `sitemap.xml`.
- Consider adding a `<link rel="canonical">` with the final URL.

---

## 7. Verify before launch

These items were **not** supplied or could **not** be verified during this build. The foundation must confirm them before the site goes live.

1. **Donation details** — mobile money `0530445561` and Ecobank account `1441004769184` (account name THE BROTHERS FOUNDATION). Confirm they are current, correct and belong to the foundation. The site explicitly states that online payment is not live and that details must be verified.
2. **Email spelling** — `info@thebrotherfoundation.org` was provided as "thebrotherfoundation.org" (singular "brother"), while the organisation is "The Brothers Foundation". Confirm which domain is correct.
3. **Phone numbers** — `024 418 85 41` and `024 007 03 30`. Confirm both are reachable and correct.
4. **Address** — "Hudson Road, Mckeown Asokwa, Ghana". Confirm the exact spelling and postal details.
5. **News dates** — the four supplied news items are dated **2020**, but the foundation's stated founding year is **2021**. Confirm the dates or the founding year.
6. **News excerpts** — all four are `[excerpt to be supplied]`. Supply the real text; add links if full articles exist.
7. **Event descriptions** — only titles, dates and locations were supplied. No descriptions were invented. Add real descriptions if wanted.
8. **Impact figures** — none were supplied, so no numbers appear. Supply verified figures (with a report or source) before publishing any.
9. **Logo** — replace the placeholder with the official artwork (fully violet, white on violet).
10. **Photographs** — replace both placeholders with authentic, permission-cleared images. Confirm consent for any identifiable children or adults shown.
11. **Charity registration** — confirm the registration wording/number in the footer ("Registered charity in Ghana") and add the number if one exists.
12. **Form activation** — the endpoint is wired to FormSubmit and delivering to `godwintext@gmail.com`, but the "Activate Form" email must be clicked once, then a real test enquiry sent from the live site to confirm it arrives.
13. **Open Graph image** — provide a 1200×630 image and absolute URL.
14. **Verification note in the Donate section** — remove or update "Details to be verified by the foundation before launch." once verification is complete.

---

## 8. Accessibility, performance and SEO notes

- Semantic landmarks (`header`, `main`, `footer`, `nav`, `section`, headings in order).
- Skip link to `#main`.
- Mobile menu is a real `<button>` with `aria-expanded` and `aria-controls`; closes on link click, `Escape`, outside click, and when resizing to desktop.
- Visible focus states on all interactive elements; yellow focus rings on violet backgrounds.
- Form fields have real `<label>`s, `aria-describedby` error text, `aria-invalid`, and a `role="status"` live region.
- Images have `alt` text; decorative SVGs are `aria-hidden`.
- `prefers-reduced-motion` disables reveal animations, smooth scrolling and hover transforms.
- No black, charcoal or near-black colours are used. Secondary text uses the brand muted grey.
- Fonts load with `display=swap`; there are no JavaScript libraries and no build step.
- JSON-LD `NGO` schema in the head.

---

## 9. Analytics (Cloudflare Web Analytics)

Visitor analytics uses **Cloudflare Web Analytics** — free, cookie-free, and privacy-first. There is no Google Analytics, no custom analytics backend, no database, and no third-party tracking.

The beacon is **not** in the source. Cloudflare injects its Web Analytics script automatically at the edge for the proxied production domain, and the served HTML contains exactly one beacon:

```html
<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js/..." data-cf-beacon='{"version":"2024.11.0","token":"f0dc92c09fee4ae8a192c018e8b99838",...}'>
```

- **Do not add a manual snippet to `index.html`.** Doing so produced two beacons (verified during this migration) and double-counts every page view. That is why the source contains only a comment explaining the omission.
- Automatic injection only happens on the proxied domain. The `pages.dev`, Netlify and Hostinger copies have no beacon — they are mirrors, not the production site, so this is intentional.
- Web Analytics sites registered in the account: `thebrothersfoundation.org` (site token `b17e6faebc1e4149b0eeb55477607bd0`) and the legacy `thebrosite.pages.dev` (token `9fed42…7d90`). These were used for the manual snippet before automatic injection took over.

**If a Content-Security-Policy is ever added,** it must allow the beacon or analytics will be silently blocked:

```
script-src  ... https://static.cloudflareinsights.com;
connect-src ... https://cloudflareinsights.com;
```

There is currently **no CSP** on this site (no `_headers` file, no meta tag), so nothing needed changing.

**Enabling / viewing the data in Cloudflare:**

1. Sign in to <https://dash.cloudflare.com>.
2. Go to **Analytics & Logs → Web Analytics** (or open the account → *Web Analytics*).
3. Under **Manage** you should see `thebrothersfoundation.org` listed with token `b17e6f…7bd0`.
4. Open it to see visitors, page views, top pages, referrers, countries and Core Web Vitals.

To register a different host later: **Web Analytics → Add a site →** enter the hostname → **Manual setup** shows the same style of snippet with that site's token.

**Verifying real data is arriving:**

1. Visit <https://thebrothersfoundation.org> in a browser with tracking protection **off** for that domain (ad blockers and some privacy modes block the beacon).
2. Open DevTools → **Network**, filter for `beacon`, and confirm a request to `https://cloudflareinsights.com/cdn-cgi/rum` returns **200/204**.
3. In the dashboard the visit appears within a few minutes; aggregate charts can take longer to populate.
4. Confirm the browser console shows **no** errors from the beacon — a blocked or mis-tokened beacon shows as a failed `rum` request, not a JS error.

The beacon does **not** collect passwords or form contents, and this site sends nothing from the enquiry form to analytics.

---

## 10. Domains and deployment

**Production domain: https://thebrothersfoundation.org** (Cloudflare Pages project `thebrosite`).

| Host | URL | Notes |
|---|---|---|
| **Cloudflare Pages (primary)** | **https://thebrothersfoundation.org** | Custom domain, verified live |
| Cloudflare Pages (www) | https://www.thebrothersfoundation.org | 301 redirects to the apex |
| Cloudflare Pages (default) | https://thebrosite.pages.dev | Still serves the same build |
| Netlify | https://thebrosite.netlify.app | Same files |
| Hostinger | https://thebro.nenifix.com | Same files |
| GitHub | https://github.com/neni2fix-droid/thebrosite | Source |

Canonical, Open Graph, Twitter and JSON-LD URLs all point at `https://thebrothersfoundation.org`. `sitemap.xml` and `robots.txt` reference the same domain.

**DNS:** the apex has a proxied `CNAME` to `thebrosite.pages.dev` (Cloudflare flattens it at the apex), and `www` is a proxied `CNAME` to the same target. A zone-level redirect rule sends `www` to the apex with a 301, and Cloudflare's "Always Use HTTPS" sends `http` to `https`. **Mail records (MX, SPF, DMARC, DKIM, autodiscover) were left untouched.**

**First `www` redirect on Pages** is also declared in `_redirects`; the zone rule is what actually enforces it because the zone proxy handles requests before they reach Pages.

Cloudflare redeploy, from the project directory:

```bash
npx wrangler pages deploy . --project-name=thebrosite --branch=main
```

---

## 11. Honest status

The site **is live at https://thebrothersfoundation.org**, and the custom-domain attachment is confirmed `status=active` for both the apex and `www`. Verified by direct request: page 200, correct title, canonical and OG tags on the production domain, all 16 assets 200, exactly one analytics beacon with the production token, `http → https` 301, and `www → apex` 301.

What has **not** been done: no formal cross-browser or multi-device test pass, no analytics data reviewed yet, and the enquiry form still needs its one-time FormSubmit activation click plus one real end-to-end enquiry sent from the live site. Please work through the launch checklist in section 7 before announcing the site.

**Important — the old site was replaced.** `thebrothersfoundation.org` previously served the WordPress site hosted on Hostinger. Pointing the domain at Cloudflare Pages superseded it; that WordPress installation still exists at Hostinger and can be restored by reverting the DNS records if needed. The old apex A/AAAA records and the old `www` CNAME target were: `212.1.212.231`, `195.35.60.253`, `2a02:4780:1d:c477:4032:af8b:529c:979d`, `2a02:4780:22:621f:420b:3903:bf52:710c`, and `www.thebrothersfoundation.org.cdn.hstgr.net`.

**Important:** the foundation's real photographs are now in use. Confirm written consent for any identifiable children or adults pictured before the site is promoted publicly.
