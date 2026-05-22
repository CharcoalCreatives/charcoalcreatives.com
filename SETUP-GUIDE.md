# CHARCOAL CREATIVES — Complete Setup & Customisation Guide

---

## PART 1 — SETTING UP VS CODE & GITHUB PAGES

### Step 1 — Install the tools
1. Download and install **VS Code**: https://code.visualstudio.com
2. Download and install **Git**: https://git-scm.com
3. Create a free account at **GitHub**: https://github.com

### Step 2 — Open the project in VS Code
1. Open VS Code
2. Click **File → Open Folder**
3. Select the `charcoal-creatives` folder you received
4. You should see: `index.html`, `style.css`, `script.js`, `Code.gs`, and the `assets/` folder

### Step 3 — Add your logo image
1. Place your CC logo PNG file inside: `assets/images/`
2. Name it exactly: `cc-logo.png`
   - If you want a different filename, open `index.html` and find:
     `src="assets/images/cc-logo.png"` and update it

### Step 4 — Publish to GitHub
1. Open VS Code's built-in terminal: **Terminal → New Terminal**
2. Run these commands one by one (press Enter after each):

```
git init
git add .
git commit -m "Initial site launch"
```

3. Go to **github.com → New Repository**
4. Name it exactly: `charcoalcreatives.com` (or any name)
5. Set it to **Public**, click **Create repository**
6. GitHub will show you commands — copy and run them in VS Code's terminal. They look like:

```
git remote add origin https://github.com/YOUR_USERNAME/charcoalcreatives.com.git
git branch -M main
git push -u origin main
```

7. On GitHub, go to your repo → **Settings → Pages**
8. Under "Source", select **Deploy from a branch**
9. Choose branch: **main**, folder: **/ (root)**, click Save
10. Your site will be live at: `https://YOUR_USERNAME.github.io/charcoalcreatives.com`

### Step 5 — Connect your custom domain (charcoalcreatives.com)
1. In GitHub Pages settings, type `charcoalcreatives.com` under "Custom domain" and Save
2. Log into your domain registrar (e.g. GoDaddy, Namecheap)
3. Add these DNS records:
   - Type A → 185.199.108.153
   - Type A → 185.199.109.153
   - Type A → 185.199.110.153
   - Type A → 185.199.111.153
   - Type CNAME → www → YOUR_USERNAME.github.io
4. Wait 10–30 minutes. Tick "Enforce HTTPS" in GitHub Pages settings.

---

## PART 2 — GOOGLE APPS SCRIPT (EMAIL FROM FORM)

### Step 1 — Create the Script
1. Go to https://script.google.com
2. Click **New Project**
3. Name it "CC Contact Form"
4. Delete all existing code in the editor
5. Open `Code.gs` from your project folder and paste the entire contents

### Step 2 — Set your email
- Find this line: `const RECIPIENT_EMAIL = 'admin@charcoalcreatives.com';`
- This is already set correctly — no change needed unless your email differs

### Step 3 — Deploy as Web App
1. Click **Deploy → New Deployment**
2. Click the gear icon next to "Type" → Select **Web App**
3. Set:
   - Description: `CC Contact Form v1`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Authorise permissions when prompted (click "Allow")
6. **Copy the Web App URL** — it looks like:
   `https://script.google.com/macros/s/LONG_ID/exec`

### Step 4 — Add URL to script.js
1. Open `script.js` in VS Code
2. Find this line:
   `const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';`
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with the URL you copied
4. Save the file

---

## PART 3 — RECAPTCHA SETUP

### Step 1 — Get your keys
1. Go to https://www.google.com/recaptcha/admin/create
2. Label: "Charcoal Creatives"
3. Type: **reCAPTCHA v2 → "I'm not a robot" Checkbox**
4. Domains: add `charcoalcreatives.com` and `localhost`
5. Click Submit
6. You get two keys:
   - **Site Key** (public — goes in HTML)
   - **Secret Key** (private — goes in Apps Script)

### Step 2 — Add Site Key to index.html
1. Open `index.html`
2. Find: `data-sitekey="YOUR_SITE_KEY"`
3. Replace `YOUR_SITE_KEY` with your actual site key

### Step 3 — Add Secret Key to Code.gs
1. Open `Code.gs`
2. Find: `const RECAPTCHA_SECRET = 'YOUR_RECAPTCHA_SECRET_KEY';`
3. Replace `YOUR_RECAPTCHA_SECRET_KEY` with your secret key
4. Re-deploy the Apps Script (Deploy → Manage Deployments → Edit → New Version → Deploy)

---

## PART 4 — UPDATING YOUR CONTENT

### Changing text on the website
All editable text is marked with `<!-- CUSTOMISE: ... -->` comments in `index.html`.
1. Open `index.html` in VS Code
2. Press **Ctrl+F** (or Cmd+F on Mac) to search
3. Type `CUSTOMISE` to jump between all editable sections
4. Edit the text between the HTML tags
5. Save the file, then push to GitHub (see "Push changes" below)

### Changing colours or fonts (site-wide)
1. Open `style.css`
2. At the top, find the `:root { ... }` block
3. Edit the values — comments explain each variable
4. Save and push

---

## PART 5 — CHANGING VIDEOS

### Replacing embedded videos
The site supports **YouTube** or **Instagram** embeds.

**YouTube:**
1. Go to your YouTube video
2. Click Share → Embed → copy the `src` URL (e.g. `https://www.youtube.com/embed/abc123`)
3. Open `index.html` and find `id="video1"` or `id="video2"`
4. Replace the `src="..."` value with your URL
5. Save and push

**Instagram Reel:**
1. Go to the reel on Instagram
2. Click the three dots → Embed → copy the embed code
3. Replace the entire `<iframe>` block in `index.html` with Instagram's iframe

---

## PART 6 — CHANGING BRAND LOGOS

1. Add your brand logo image to `assets/images/`
   - Recommended: PNG with transparent background, ~200px wide
   - Name it clearly, e.g. `brand-logo-fitlife.png`
2. Open `index.html` and find the `<!-- CUSTOMISE: Add brand logos below -->` comment
3. For each brand, there is a `<div class="brand-item">` block
4. Add or edit the `<img src="...">` tag to point to your logo file
5. Add a matching `<div class="review-item">` block in the reviews section below it
6. Save and push

---

## PART 7 — CHANGING THE T&C PDF

1. Name your PDF: `terms-and-conditions.pdf`
2. Place it in: `assets/pdfs/`
3. The T&C button will automatically download it when clicked
4. **To update it later:** Simply replace the file with the same name — no code changes needed
5. Push to GitHub

---

## PART 8 — PUSHING CHANGES TO LIVE SITE

Every time you make changes, run these 3 commands in VS Code's terminal:

```
git add .
git commit -m "Short description of what you changed"
git push
```

GitHub Pages will update your live site within 1–2 minutes.

---

## QUICK REFERENCE — File Map

```
charcoal-creatives/
├── index.html          ← All website content & structure
├── style.css           ← All colours, fonts, spacing, layout
├── script.js           ← Brand carousel + form submission logic
├── Code.gs             ← Google Apps Script (email handler)
├── SETUP-GUIDE.md      ← This file
└── assets/
    ├── images/
    │   ├── cc-logo.png         ← Your CC logo (add this)
    │   ├── brand-logo-1.png    ← Brand logos (add these)
    │   └── brand-logo-2.png
    └── pdfs/
        └── terms-and-conditions.pdf  ← Your T&C PDF (add this)
```

---

## NEED HELP?

- GitHub Pages docs: https://docs.github.com/en/pages
- Google Apps Script docs: https://developers.google.com/apps-script
- reCAPTCHA docs: https://developers.google.com/recaptcha
