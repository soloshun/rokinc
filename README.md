# ROKinc Website

Website for **Rosemary Ohenewaa Kwaning Inc. (ROKinc)** — a Christian nonprofit creating change in humanity through the love of Christ.

Built with Next.js 16, TailwindCSS 4, and Framer Motion. Deployed on Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Without any environment variables the site runs entirely on **sample content** (`src/lib/sample-data.ts`) with placeholder images — perfect for local dev and the first deploy.

## Content management (no code needed)

Content lives in **one Google Spreadsheet** and **one Google Drive folder**. The site re-reads them every 5 minutes (ISR), so edits appear on the live site automatically.

> **📖 Full step-by-step setup guide: [`docs/google-setup.md`](docs/google-setup.md)** — the summary below is just a quick reference.

### 1. The Google Sheet

Create a spreadsheet named **ROKinc Website Data** with 4 tabs (exact names + header rows):

**Projects**
| slug | title | description | date | location | cover_image | folder_name | featured |
|------|-------|-------------|------|----------|-------------|-------------|----------|
| visiting-jesus-accra | The Visiting Jesus Project — Accra | ... | 2025-12-20 | Accra, Ghana | (optional URL) | visiting-jesus-accra | TRUE |

**Events**
| id | title | description | date | location | banner | registration_link | needs_support |
|----|-------|-------------|------|----------|--------|-------------------|---------------|

**Settings** (key/value pairs)
| key | value |
|-----|-------|
| ceo_name | Rosemary Ohenewaa Kwaning |
| contact_email | ... |
| phone | ... |
| whatsapp | ... |
| instagram | ... |
| facebook | ... |
| youtube | ... |

**Donations**
| method | account_name | account_number | extra | note |
|--------|--------------|----------------|-------|------|

Then: **Share → Anyone with the link → Viewer.** Copy the spreadsheet ID from its URL (`docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`).

### 2. The Google Drive folder

```
ROKinc Website/
└── Projects/
    ├── visiting-jesus-accra/     ← folder name = folder_name column in the sheet
    │   ├── cover.jpg             ← used as the cover (sorted first)
    │   ├── photo-01.jpg
    │   └── photo-02.jpg
    └── outreach-2026/
        └── ...
```

Share the **Projects** folder as **Anyone with the link → Viewer**, and copy its folder ID from the URL.

Uploading a new photo into a project folder = it appears in that project's gallery on the site within ~5 minutes. Adding a new row in the sheet + a matching folder = a whole new project page.

### 3. Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | What |
|----------|------|
| `ROKINC_SHEET_ID` | spreadsheet ID from step 1 |
| `ROKINC_DRIVE_PROJECTS_FOLDER` | Drive folder ID from step 2 |
| `GOOGLE_API_KEY` | API key from [Google Cloud Console](https://console.cloud.google.com/) with the **Google Drive API** enabled (free) |

If a variable is missing, the site quietly falls back to sample content — it never breaks.

## Where things live

- `src/lib/copy.ts` — mission statement & program descriptions (**CEO's exact words — don't edit casually**)
- `src/lib/sample-data.ts` — fallback/sample content
- `src/lib/google.ts` + `src/lib/content.ts` — Sheets/Drive readers
- `src/components/` — UI (Framer Motion animations in `motion.tsx`)
- `docs/` — original planning notes and the CEO's raw message
