# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Digital signage system for T.A. Station bar (Honolulu, HI). A TV displays YouTube music/videos with rotating ads, a drinks menu, and a scrolling ticker. Staff control everything from their phone via a separate remote page.

Live at: https://spataray.github.io/The-Bar-Signage/

## Architecture

This is a static HTML/CSS/JS project with no build system, no bundler, and no package manager. Just open the HTML files directly or serve them via GitHub Pages.

**Multi-page system connected via Firebase Realtime Database:**

- **`index.html`** — TV display. Runs fullscreen on the bar TV browser. Embeds a YouTube IFrame player, shows an ad sidebar (flyer + menu), idle photo slideshow, and a scrolling ticker. Listens to Firebase for commands from the remote.
- **`maintenance.html`** — Staff remote control. Opened on phone/iPad. Sends commands to Firebase: play/pause/skip, YouTube search, queue management, karaoke lock, party mode, force ads, remote refresh. Contains all its own CSS inline (no shared stylesheet).
- **`customer.html`** — Customer-facing PWA for song requests. Customers can search YouTube, view the current queue, and add songs. Uses Firebase (same DB) and SortableJS from CDN.
- **`project-hub/index.html`** — Internal PWA dashboard linking to all pages.
- **`style.css`** — Styles for `index.html` only (TV display layout, sidebar, idle screen, ticker, party mode).
- **`config.js`** — Shared Firebase config, `YT_API_KEY`, and `FEATURED_PLAYLISTS`. Loaded by all pages via `<script src="config.js">`.

**Venue isolation:** All pages use a `?v=XXXX` URL param as a 4-character venue code. This scopes all Firebase reads/writes to `venues/{venueId}/`. The TV display generates a random code on first load and shows it on-screen; staff enter this code when opening the remote or customer page.

**Data flow:**
- Remote (`maintenance.html`) writes to Firebase → TV (`index.html`) listens and reacts
- TV writes back `nowPlaying` and `playerState` so the remote can show current status
- Content (ads, menu, ticker) is stored directly in Firebase under the venue's `settings/` node

**Key Firebase paths under `venues/{venueId}/settings/`:**
- `currentVideoId` — triggers video playback on TV
- `queue` — array of `{id, title, author, thumb}` objects
- `playerCommand` — `{action, value, ts}` consumed and cleared by TV (write-then-null pattern)
- `nowPlaying`, `playerState` — written by TV for remote display
- `karaokeLock`, `partyMode`, `forceAd`, `remoteRefresh` — toggle flags
- `adConfig`, `menu`, `ticker` — content blobs managed via the remote
- `showRequestQR`, `lastCallEnabled`, `captionsEnabled`, `venueName` — feature flags

**Additional Firebase paths (top-level, shared across all venues):**
- `SEARCH_CACHE/{safeQuery}` — cached YouTube search results (`{items, timestamp}`) shared across venues to conserve API quota. Both `maintenance.html` and `customer.html` read/write this cache before hitting the YouTube API.

**External dependencies (CDN only):**
- Firebase JS SDK 8.10.0 — legacy namespaced SDK (`firebase.database()`), not modular v9+
- YouTube IFrame API (`index.html` only)
- YouTube Data API v3 for search (reuses the Firebase `apiKey` as `YT_API_KEY`)
- SortableJS 1.15.0 (`customer.html` and `maintenance.html`) — drag-to-reorder queue
- QR code API via `api.qrserver.com` (TV display, for the song request QR code)
- Open-Meteo API (TV display, free weather — no API key needed)

## Key Timing Constants

- Auto-ad rotation: every **3 minutes** (`180000ms`), shown for **25 seconds** (`25000ms`)
- Content sync from Google Sheets: every **60 seconds** (`60000ms`)
- Idle slideshow photo cycle: every **8 seconds** (`8000ms`) with 1.5s fade transition
- Volume slider debounce: **200ms**

## Code Conventions

- Uses `var` throughout (not `const`/`let`) — maintain this style for consistency
- No module system; all JS is inline `<script>` blocks
- Party mode is a CSS class (`body.party-mode`) toggled via Firebase listener
- The ad sidebar uses a CSS grid transition on `--sidebar-width` (0% ↔ 30%)
- `images/` directory photos are used in both the idle slideshow and sidebar background
- Fun facts in `index.html` are auto-generated between `// AUTO-GENERATED-FACTS-START` and `// AUTO-GENERATED-FACTS-END` markers — do not hand-edit that block

## Service Worker & PWA

`service-worker.js` caches the main HTML/CSS/JS files. The cache name is versioned (`ta-station-v1.5.0`). **When making changes to cached assets, bump the `CACHE_NAME` version** in `service-worker.js` so returning users get fresh content. The project-hub has its own separate service worker (`project-hub/sw.js`).

## Automation

- **`update_facts.py`** — Called by the GitHub Actions workflow (`.github/workflows/update-facts.yml`) every Tuesday. Uses the Anthropic SDK (`claude-haiku-4-5-20251001`) to generate 20 new fun facts and splices them into `index.html` between the marker comments. Requires `ANTHROPIC_API_KEY` secret in GitHub.
- **`seed_cache.py`** — One-off utility to pre-populate `SEARCH_CACHE` in Firebase from a `SONG_SEED_LIST.md` file. Run manually: `python3 seed_cache.py`.

## Development

No build or install step. Edit HTML/CSS/JS directly. To test locally, open `index.html` or `maintenance.html` in a browser (Firebase and YouTube APIs require an internet connection). Append `?v=XXXX` to any page URL to connect to a specific venue's data.

Deployment is via `git push` to `main` — GitHub Pages serves the site automatically.
