# ROKinc Website Architecture Plan

## Overview

This website is for **Rosemary Ohenewaa Kwaning Inc. (ROKinc)**, a Christian nonprofit organization.

The goal is to build a website that is:

- Fast
- Easy to maintain
- Free to host
- Easy for the organization to update without needing a developer
- Scalable as more projects are added over time

---

# Technology Stack

Frontend
- Next.js 15
- React
- TypeScript
- TailwindCSS

Hosting
- Vercel (Free Tier)

Source Control
- GitHub

AI Development
- Codex / Claude Code

---

# Content Management Strategy

Instead of paying for a CMS, we'll use Google Workspace as the content management system.

Google Drive will store:

- Images
- Documents (optional)
- Google Sheets

Google Sheets will act as the website database.

The website simply reads from Google Sheets and Google Drive.

Whenever content changes, the website automatically reflects the updates.

---

# Google Drive Structure

ROKinc/
│
├── Website/
│
├── projects/
│   ├── visiting-jesus/
│   │   ├── cover.jpg
│   │   ├── image-01.jpg
│   │   ├── image-02.jpg
│   │   └── image-03.jpg
│   │
│   ├── outreach-2026/
│   │   ├── cover.jpg
│   │   ├── image-01.jpg
│   │   └── image-02.jpg
│   │
│   └── leadership-summit/
│       ├── cover.jpg
│       └── ...
│
├── sheets/
│   ├── projects.xlsx
│   ├── events.xlsx
│   └── settings.xlsx
│
└── assets/
    ├── logo.png
    ├── hero.jpg
    └── ...

---

# Website Pages

## Home

Contains

- Hero section
- CEO welcome message
- Vision
- Mission
- Donation CTA
- Featured Project
- Upcoming Event Preview

Navigation

- Home
- Projects
- Upcoming Projects
- Donate

---

## Projects Page

Displays previous completed projects.

Each project includes

- Cover image
- Project title
- Description
- Image gallery
- Date
- Location

Clicking a project opens a detailed page.

Example

/projects/visiting-jesus

---

## Upcoming Projects

Displays

- Upcoming mission trips
- Outreach programs
- Conferences
- Prison ministry
- Hospital visits

Each card contains

- Date
- Title
- Description
- Banner image
- Donation button (optional)

---

## Donate

Contains

Donation information

Bank details

Mobile Money

International donations

Contact information

---

# Google Sheets Design

## Sheet 1

Projects

| id | slug | title | description | date | location | cover_image | folder_name | featured |

Example

| 1 | visiting-jesus | Visiting Jesus Project | ... | 2026-08-01 | Kumasi | cover.jpg | visiting-jesus | TRUE |

---

## Sheet 2

Upcoming Events

| id | title | description | date | location | banner | registration_link | donation_link |

---

## Sheet 3

Website Settings

Contains

- CEO name
- Mission statement
- Vision statement
- Hero title
- Hero subtitle
- Contact email
- Phone
- Facebook
- Instagram
- YouTube

This allows changing website text without editing code.

---

# Image Strategy

Each project has its own folder.

Example

projects/
    visiting-jesus/
        cover.jpg
        image-01.jpg
        image-02.jpg
        image-03.jpg

The website generates image URLs dynamically.

Images can be added at any time without modifying the website.

---

# Google Drive Permissions

The Website folder should be:

Shared as
"Anyone with the link can View"

No editing access for the public.

Only organization admins should have edit permissions.

---

# Accessing Google Sheets

Google Sheets can be published as JSON using the Google Sheets API.

The website fetches:

Projects

Upcoming Events

Website Settings

during build time or with revalidation.

Recommended ISR:

revalidate = 300 seconds

(Updates every 5 minutes.)

---

# Accessing Images

Possible approaches

Option A (Recommended)

Use Google Drive direct image URLs.

Option B

Use Google Drive API.

Option C

Mirror images into Vercel Blob in the future if traffic grows.

---

# Suggested Libraries

Google Sheets

- googleapis
- google-spreadsheet

Google Drive

- googleapis

Image Optimization

- next/image

Validation

- zod

HTTP

- fetch()

---

# Deployment Workflow

Developer

↓

GitHub

↓

Vercel

↓

Production Website

Content Editors

↓

Google Sheets

↓

Website Updates

Content Editors

↓

Google Drive Images

↓

Website Updates

---

# Future Improvements

Possible future additions

- Admin Dashboard
- Newsletter
- Prayer Requests
- Blog
- Sermons
- Livestreams
- Authentication
- Donations via Stripe
- Mobile Money integration
- Search
- CMS migration if required

---

# Initial Website Content

Mission Statement

Rosemary Ohenewaa Kwaning Inc. (ROKinc) is a Christian nonprofit organization committed to creating change in humanity through the love of Christ. We fulfill this mission by proclaiming the gospel, providing compassionate assistance to vulnerable populations, and equipping young people with the spiritual, educational, and leadership resources needed to thrive.

---

First Project

The Visiting Jesus Project

Inspired by Matthew 25:42–43, this ministry reaches people in correctional facilities, hospitals, rehabilitation centers, and communities with the love of Christ through practical support, prayer, and the Gospel.

---

Initial Navigation

- Home
- Projects
- Upcoming Projects
- Donate
- Contact




-----
ANOTHER RANDOM STUFF THOUGHTS

One improvement I'd make

Instead of storing Excel (.xlsx) files in Google Drive, I'd use native Google Sheets. That gives you:

Easy editing in the browser.
Automatic version history.
API access without downloading files.
Multiple people can collaborate at once.

I'd also slightly tweak the Google Drive layout:

ROKinc/
│
├── Website Assets/
│   ├── hero/
│   ├── logo/
│   └── icons/
│
├── Projects/
│   ├── visiting-jesus/
│   │   ├── cover.jpg
│   │   ├── gallery-01.jpg
│   │   ├── gallery-02.jpg
│   │   └── metadata.json (optional)
│   │
│   ├── prison-outreach/
│   └── ...
│
├── Events/
│   ├── upcoming-event-1/
│   └── upcoming-event-2/
│
└── Data/
    ├── Projects (Google Sheet)
    ├── Events (Google Sheet)
    └── Site Settings (Google Sheet)

One other thing I'd change is how images are accessed. I would avoid using public Google Drive URLs directly for production. They're not designed to be a CDN and can be slow or occasionally hit access limits.

A better approach is:

Google Drive remains the source where the NGO uploads images.
A small synchronization script (or GitHub Action) copies new images into your repository or cloud storage (such as Vercel Blob or Cloudinary's free tier).
The Next.js app serves optimized images from there using next/image.