# ROKinc Website — Google Sheets & Drive Setup Guide

This is the complete, step-by-step guide for connecting the website to Google, so that ROKinc can update the site (projects, photos, events, donation details, contact info) **without touching any code**. Set it up with your personal Gmail first; switching to the CEO's account later is covered at the end.

How it works, in one sentence: **the website re-reads one Google Spreadsheet and one Google Drive folder every 5 minutes** — whatever is there becomes the website.

---

## Part 1 — Create the Google Sheet (the website's database)

1. Go to [sheets.google.com](https://sheets.google.com) while signed in to your Gmail.
2. Click **Blank spreadsheet**. Name it `ROKinc Website Data` (click "Untitled spreadsheet" top-left to rename).
3. At the bottom you'll see one tab called `Sheet1`. You need **4 tabs with these exact names** (double-click a tab to rename it; click `+` to add more):
   - `Projects`
   - `Events`
   - `Settings`
   - `Donations`

### Tab 1: `Projects` (past projects shown on "Our Work")

In **row 1**, type these headers, one per column (exact spelling, lowercase):

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| slug | title | description | date | location | cover_image | folder_name | featured |

Then each project is one row. Example row 2:

| slug | title | description | date | location | cover_image | folder_name | featured |
|------|-------|-------------|------|----------|-------------|-------------|----------|
| widows-orphans-2025 | Widows & Orphans Outreach 2025 | An annual mission bringing clothing, food and medical support… | 2025-08-14 | Kumasi, Ghana | *(leave empty)* | widows-orphans-2025 | TRUE |

Column meanings:
- **slug** — the web address for the project (`/projects/widows-orphans-2025`). Lowercase, hyphens instead of spaces, no special characters. Must be unique.
- **title** — shown on the card and page.
- **description** — 1–3 sentences shown under the title.
- **date** — `YYYY-MM-DD` format (e.g. `2025-08-14`).
- **location** — e.g. `Kumasi, Ghana`.
- **cover_image** — leave empty (the cover comes from Drive — see Part 2). Only used as a fallback URL.
- **folder_name** — the name of this project's photo folder in Google Drive. Easiest rule: **make it identical to the slug**.
- **featured** — `TRUE` to show it on the home page, `FALSE` (or empty) otherwise. Up to 3 featured projects are shown.

### Tab 2: `Events` (the "Upcoming" page)

Row 1 headers:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| id | title | description | date | location | banner | registration_link | needs_support |

- **id** — just number them 1, 2, 3…
- **banner** — a full image URL for the event banner (optional). Tip: you can upload the image to Drive, right-click → Share → Anyone with link, copy its FILE_ID from the link, and use `https://lh3.googleusercontent.com/d/FILE_ID=w1600`.
- **registration_link** — optional URL; shows a "Register / Join" button.
- **needs_support** — `TRUE` shows a "Support this outreach" button linking to the Donate page.

Events are shown in the order they appear in the sheet.

### Tab 3: `Settings` (contact info & socials)

Row 1 headers: just two columns —

| A | B |
|---|---|
| key | value |

Then one setting per row:

| key | value |
|-----|-------|
| ceo_name | Rosemary Ohenewaa Kwaning |
| contact_email | hello@rokinc.org |
| phone | +233 XX XXX XXXX |
| whatsapp | +233XXXXXXXXX |
| instagram | https://instagram.com/... |
| facebook | https://facebook.com/... |
| youtube | *(empty if none)* |

These feed the footer and the Donate page contact links. `whatsapp` should be the full number with country code, digits only preferred.

### Tab 4: `Donations` (giving methods on the Donate page)

Row 1 headers:

| A | B | C | D | E |
|---|---|---|---|---|
| method | account_name | account_number | extra | note |

Current ROKinc rows (fill in the real numbers when the CEO sends them):

| method | account_name | account_number | extra | note |
|--------|--------------|----------------|-------|------|
| Mobile Money (Ghana) | Rosemary Ohenewaa Kwaning Inc. | 0XX XXX XXXX | MTN MoMo | Use "ROKinc + your name" as the reference. |
| Bank Transfer (USA) | Rosemary Ohenewaa Kwaning Inc. | Account: XXXX · Routing: XXXX | American bank account | Works for US transfers and international wires. |

### Share the sheet

1. Click **Share** (top-right).
2. Under "General access", change **Restricted** → **Anyone with the link**, role **Viewer**.
3. Click **Copy link**, then **Done**.

### Get the Spreadsheet ID

Look at the sheet's URL in your browser:

```
https://docs.google.com/spreadsheets/d/1AbC9xYz_THIS_LONG_STRING_IS_THE_ID/edit#gid=0
                                       └──────────── copy this part ────────────┘
```

The ID is the long string between `/d/` and `/edit`. Save it — you'll need it in Part 3.

---

## Part 2 — Create the Google Drive photo folders

1. Go to [drive.google.com](https://drive.google.com) with the same Gmail.
2. Click **+ New → New folder**, name it `ROKinc Website`.
3. Open it, and inside create a folder named `Projects`.
4. Inside `Projects`, create **one folder per project**. Each folder's name must match the `folder_name` column in the sheet. Example:

```
ROKinc Website/
└── Projects/
    ├── widows-orphans-2025/
    │   ├── cover.jpg        ← name one photo "cover..." to make it the cover
    │   ├── IMG_2041.jpg
    │   └── IMG_2077.jpg
    └── visiting-jesus-accra/
        └── ...
```

Rules:
- A photo whose filename starts with `cover` (e.g. `cover.jpg`, `cover-01.png`) is used as the project's cover image. If there's none, the first photo alphabetically is used.
- All other photos appear in the project's gallery, sorted by filename. Any mix of portrait/landscape is fine — the gallery flows around them.
- **To add photos later: just drag them into the folder.** They appear on the site within ~5 minutes. Nothing else to do.
- To add a whole new project: create the folder here **and** add its row in the `Projects` tab.

### Share the Projects folder

1. Right-click the `Projects` folder → **Share → Share**.
2. General access: **Anyone with the link → Viewer** → **Done**.
   (Subfolders inherit this automatically.)

### Get the folder ID

Open the `Projects` folder (double-click it) and look at the URL:

```
https://drive.google.com/drive/folders/1XyZ_THIS_STRING_IS_THE_FOLDER_ID
                                        └────────── copy this ─────────┘
```

Save it for Part 3.

---

## Part 3 — Create the Google API key (lets the site list Drive photos)

The Sheet needs no key, but listing files in Drive folders does. It's free.

1. Go to [console.cloud.google.com](https://console.cloud.google.com) (same Gmail). Accept the terms if it's your first visit.
2. Top bar → click the project dropdown → **New project**. Name: `rokinc-website` → **Create**. Make sure it's selected afterwards (top bar shows the name).
3. Left menu → **APIs & Services → Library**. Search **Google Drive API** → click it → **Enable**.
4. Left menu → **APIs & Services → Credentials** → **+ Create credentials → API key**. Copy the key that appears.
5. Recommended — lock the key down: click the key name → under **API restrictions** choose **Restrict key** → tick **Google Drive API** → Save. (Under Application restrictions you can also add your Vercel domain as an allowed referrer later, but since the key is only used server-side, API restriction is the important one.)

> This key can only *read public Drive metadata* — it cannot touch private files or edit anything, so it's low-risk. Still, don't commit it to GitHub.

---

## Part 4 — Connect the website

You now have three values:

| Env variable | Value |
|---|---|
| `ROKINC_SHEET_ID` | Spreadsheet ID (Part 1) |
| `ROKINC_DRIVE_PROJECTS_FOLDER` | Projects folder ID (Part 2) |
| `GOOGLE_API_KEY` | API key (Part 3) |

**Locally** — create a file named `.env.local` in the repo root (it's gitignored):

```
ROKINC_SHEET_ID=your_sheet_id
ROKINC_DRIVE_PROJECTS_FOLDER=your_folder_id
GOOGLE_API_KEY=your_api_key
```

then restart `npm run dev` and check that real content appears.

**On Vercel** — Project → **Settings → Environment Variables** → add all three (Production + Preview) → **Redeploy** once. After that, no redeploys are ever needed for content changes.

If any variable is missing or a fetch fails, the site quietly falls back to the built-in sample content — it never crashes.

---

## Part 5 — Daily use (what to tell the ROKinc team)

- **New photos for a project** → drag them into that project's Drive folder. Done.
- **New project** → create a Drive folder under `Projects` + add a row in the `Projects` tab with matching `folder_name`.
- **New upcoming event** → add a row in `Events`.
- **Event happened?** → delete its `Events` row; optionally turn it into a project (folder + `Projects` row).
- **Change phone/socials/donation numbers** → edit `Settings` / `Donations`.
- Changes appear on the live site **within 5 minutes**. Hard-refresh the page (Cmd+Shift+R) if you don't see them.

---

## Part 6 — Moving to the CEO's Google account later

Nothing on the website is tied to *whose* account it is — only to the two IDs and the key. Two options:

**Option A (cleanest): share, don't move.** Keep everything where it is and click Share → add the CEO's Gmail as **Editor** on both the spreadsheet and the `ROKinc Website` folder. She can edit everything; no website changes needed.

**Option B (full handover):** she recreates or you transfer ownership of the Sheet + Drive folder to her account (Share → ⚙ → transfer ownership, or download/re-upload), she repeats the sharing steps, and you swap the two ID env vars on Vercel to her new IDs. The API key can stay yours or she repeats Part 3 in 5 minutes.
