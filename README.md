Your site is live at https://spataray.github.io/The-Bar-Signage/
Your maintenance site lives at https://spataray.github.io/The-Bar-Signage/maintenance.html

### T.A. Station - Digital Signage System v1.5.3

A professional digital signage system for T.A. Station (Honolulu, HI). Features real-time YouTube playback, automated ad rotation, and staff remote control.

### 🔑 Staff Credentials

To access the staff remote (`maintenance.html`), you will need:
- **Connect Code:** A 4-character code shown on the top-left of the TV screen.
- **Staff PIN:** **1218** (or the administrative override **9999**).

*Note: Once entered, these credentials are saved in your browser's local storage.*

---

### 🌟 New in v1.5.3 (Initialization Fix)
- **Hoisting & Startup Fix**: Resolved a critical issue where the app crashed on startup due to improper function ordering. Clock, weather, and video playback are now restored.
- **Improved Script Reliability**: Wrapped all core startup logic in `window.onload` to ensure the app only starts when all resources and functions are fully available.

---

### 🌟 New in v1.5.2 (Resilience Update)

- **LocalStorage Mirroring**: The TV and Remote now remember the last known state (menu, ticker, ads, and queue) locally. This ensures an **instant boot** and allows the app to continue functioning even if the internet is unstable.
- **Subtle LED Status Indicator**: Removed the intrusive "Connection Lost" overlay. It has been replaced by a tiny, professional LED dot in the corner:
  - **🟢 Green**: Connected and Synced.
  - **🔴 Red**: Offline (Running from local memory).
- **Stale-While-Revalidate Caching**: The Service Worker now updates in the background. New versions (like this one) will automatically activate without requiring a manual hard refresh.
- **Extended Connectivity Grace Period**: Increased the connection timeout to 15 seconds and removed aggressive auto-reloads to prevent screen flickering during minor network blips.

---

### 🌟 New in v1.2.0

- **PIP Ad Layout**: When ads appear, the YouTube video now smoothly transitions into a "Picture-in-Picture" (PIP) inset window with a gold border.
- **Enhanced Authentication**: A two-step login process (Connect Code then Staff PIN).
- **Improved Mobile Compatibility**: Fully updated meta tags for a better "App Mode" experience.

---

### 📱 "App Mode" & Installation

This project is a **Progressive Web App (PWA)**. You can install it on your device for an app-like experience without a browser bar:

- **Staff Phone/iPad:** Open `maintenance.html` in Safari (iOS) or Chrome (Android) and select **"Add to Home Screen"**.
- **Samsung Smart TV:** 
  - Open the URL in the TV browser once.
  - If the TV supports it, select "Add to Home Screen" from the browser menu.
  - The project also includes a `config.xml` for packaging as a native Tizen Web App.

---

### 🎮 TV Remote Control Shortcuts

When the `index.html` page is open on your TV, you can use the physical remote buttons:

- **🔴 Red Button:** Toggle Karaoke Lock (Hides ads)
- **🟢 Green Button:** Show Flyer/Ad Now
- **🟡 Yellow Button:** Toggle Party Mode (Neon theme)
- **🔵 Blue Button:** Force Refresh/Reload Page
- **OK/Enter:** Dismiss any active overlays

---

### Project Files

* **`index.html`**: The main TV display. v1.5.2 includes LocalStorage mirroring and LED status.
* **`maintenance.html`**: Staff remote. v1.5.2 includes offline memory for queue and venue settings.
* **`customer.html`**: Customer request portal. v1.5.2 includes updated versioning.
* **`style.css`**: Visual branding and "Party Mode" styles.
* **`manifest.json`**: PWA configuration.
* **`config.xml`**: Samsung Tizen Web App configuration.

---

### Music & Video Control

Open `maintenance.html` on your iPad or phone:

* **Search**: Search YouTube directly from the remote. Tap play or add to queue.
* **Queue**: Drag and drop the thumbnail of any song to reorder it in the queue.
* **Playlists**: Paste a YouTube playlist URL to load all songs into the queue.
* **Playback**: Play/pause, skip, and volume controls sync to the TV in real time.

---

### Ads & Karaoke

* **Auto-Ads**: Ads rotate every 3 minutes. v1.5.2 includes full **localStorage mirroring**—if the internet drops, the last fetched ads will still display.
* **Karaoke Lock**: Hides all ads while customers are singing. Shows a red "KARAOKE LOCKED" indicator.
* **Party Mode**: Switches to a neon pink/blue theme with flickering effects.

---

### Setup

* **Hosting**: GitHub Pages at `spataray.github.io/The-Bar-Signage/`.
* **Real-time Sync**: Firebase Realtime Database syncs remote and TV instantly.
* **YouTube Search**: Requires **YouTube Data API v3** enabled in Google Cloud Console.

---

### Staff Instructions (Thai)

* **ค้นหาเพลง**: ค้นหาจากหน้า remote แล้วกดเล่นหรือเพิ่มในคิว
* **คิวเพลง**: เพลงจะเล่นต่อเนื่องอัตโนมัติ
* **การล็อคคาราโอเกะ**: กดปุ่ม "Lock Karaoke" เมื่อมีคนเริ่มร้องเพลง เพื่อไม่ให้โฆษณาขึ้นมาบังหน้าจอ
* **การแสดงโฆษณา**: กดปุ่ม "Show Flyer Now" เพื่อแสดงใบปลิวทันที
* **Party Mode**: เปลี่ยนธีมเป็นไฟนีออน
