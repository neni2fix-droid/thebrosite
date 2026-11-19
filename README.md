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
images/logo.svg         Logo (placeholder — replace with the official artwork)
images/placeholder-*.svg  Photo placeholders — replace with real photographs
images/favicon.svg      Favicon
robots.txt              Crawler rules
README.md               This file
```

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

## 4. Connect the enquiry form

The form uses `fetch()` to POST to a form endpoint.

1. Create a free form at <https://formspree.io> (or use any service that accepts a `POST` with `FormData` and returns a 2xx response).
2. Copy the endpoint URL, e.g. `https://formspree.io/f/abcdwxyz`.
3. Open `js/main.js` and replace the constant at the very top:

```js
const FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";
```

Until this is replaced, the form validates correctly but deliberately does **not** send — it tells visitors the form is not connected and gives them the phone number and email instead. It will never fake a successful submission.

The form includes a hidden honeypot field (`company`). If a bot fills it, the submission is dropped silently. No CAPTCHA is used.

The states implemented are: field validation (on blur and on submit), loading/spinner, success message, network/server error, and timeout after 15 seconds.

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
12. **Form endpoint** — set `FORM_ENDPOINT` in `js/main.js` and send a test enquiry.
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

## 9. Honest status

This code has **not been deployed**. It was written and statically reviewed locally; it has not been formally tested across every browser or device, and no live form submissions have been made. Please run the launch checklist above, test the form with the real endpoint, and check the site on a real phone before announcing it.
