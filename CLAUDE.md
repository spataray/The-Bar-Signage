# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Digital signage system for T.A. Station bar (Honolulu, HI). A TV displays YouTube music/videos with rotating ads, a drinks menu, and a scrolling ticker. Staff control everything from their phone via a separate remote page.

Live at: https://spataray.github.io/The-Bar-Signage/

## Architecture

This is a static HTML/CSS/JS project with no build system, no bundler, and no package manager. Just open the HTML files directly or serve them via GitHub Pages.

**Two-page system connected via Firebase Realtime Database:**

- **`index.html`** — TV display. Runs fullscreen on the bar TV browser. Embeds a YouTube IFrame player, shows an ad sidebar (flyer + menu), idle photo slideshow, and a scrolling ticker. Listens to Firebase for commands from the remote.
- **`maintenance.html`** — Staff remote control. Opened on phone/iPad. Sends commands to Firebase: play/pause/skip, YouTube search, queue management, karaoke lock, party mode, force ads, remote refresh. Contains all its own CSS inline (no shared stylesheet).
- **`style.css`** — Styles for `index.html` only (TV display layout, sidebar, idle screen, ticker, party mode).

**Data flow:**
- Remote (`maintenance.html`) writes to Firebase → TV (`index.html`) listens and reacts
- TV writes back `nowPlaying` and `playerState` so the remote can show current status
- Content (ads, menu, ticker) is fetched as CSV from published Google Sheets tabs, parsed with simple `.split(',')` (no CSV library)

**Key Firebase paths under `settings/`:**
- `currentVideoId` — triggers video playback on TV
- `queue` — array of `{id, title, author, thumb}` objects
- `playerCommand` — `{action, value, ts}` consumed and cleared by TV (write-then-null pattern)
- `nowPlaying`, `playerState` — written by TV for remote display
- `karaokeLock`, `partyMode`, `forceAd`, `remoteRefresh` — toggle flags

**External dependencies (CDN only):**
- Firebase JS SDK 8.10.0 — legacy namespaced SDK (`firebase.database()`), not modular v9+
- YouTube IFrame API (TV only)
- YouTube Data API v3 for search (remote only, reuses the Firebase API key as `YT_API_KEY`)

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

## Development

No build or install step. Edit HTML/CSS/JS directly. To test locally, open `index.html` or `maintenance.html` in a browser (Firebase and YouTube APIs require an internet connection).

Deployment is via `git push` to `main` — GitHub Pages serves the site automatically.
