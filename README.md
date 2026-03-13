Your site is live at https://spataray.github.io/The-Bar-Signage/
Your maintenance site lives at https://spataray.github.io/The-Bar-Signage/maintenance.html

### T.A. Station - Digital Signage System v1.1.0

A professional digital signage system for T.A. Station (Honolulu, HI). Features real-time YouTube playback, automated ad rotation, and staff remote control.

### 📱 "App Mode" & Installation

This project is now a **Progressive Web App (PWA)**. You can install it on your device for an app-like experience without a browser bar:

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

* **`index.html`**: The main TV display. v1.1.0 includes D-Pad support and PWA features.
* **`maintenance.html`**: Staff remote. v1.1.0 includes drag-and-drop queue reordering (SortableJS).
* **`style.css`**: Visual branding and "Party Mode" styles.
* **`manifest.json`**: PWA configuration.
* **`config.xml`**: Samsung Tizen Web App configuration.

---

### Music & Video Control

Open `maintenance.html` on your iPad or phone:

* **Search**: Search YouTube directly from the remote. Tap play or add to queue.
* **Queue (New!)**: Drag and drop the thumbnail of any song to reorder it in the queue.
* **Playlists**: Paste a YouTube playlist URL to load all songs into the queue.
* **Playback**: Play/pause, skip, and volume controls sync to the TV in real time.
* **Connection Monitoring**: Both the TV and Remote show a warning if the internet connection is lost.

---

### Ads & Karaoke

* **Auto-Ads**: Ads rotate every 3 minutes. v1.1.0 includes **offline caching**—if the internet drops, the last fetched ads will still display.
* **Karaoke Lock**: Hides all ads while customers are singing. Shows a red "KARAOKE LOCKED" indicator.
* **Party Mode**: Switches to a neon pink/blue theme with flickering effects.

---

### Content Management

Ads, menu, and ticker are managed via [Google Sheets](https://docs.google.com/spreadsheets/d/1SCT9dV1cGovk2o3Dd7y1fE3CUY2CR58GQvxgKLITeU4/edit).
Content syncs automatically every 60 seconds using `PapaParse` for reliability.

---

### Setup

* **Hosting**: GitHub Pages at `spataray.github.io/The-Bar-Signage/`.
* **Real-time Sync**: Firebase Realtime Database syncs remote and TV instantly.
* **YouTube Search**: Requires **YouTube Data API v3** enabled in [Google Cloud Console](https://console.cloud.google.com/apis/library/youtube.googleapis.com) on the same project as Firebase. The API key is shared.

---

### Staff Instructions (Thai)

* **ค้นหาเพลง**: ค้นหาจากหน้า remote แล้วกดเล่นหรือเพิ่มในคิว
* **คิวเพลง**: เพลงจะเล่นต่อเนื่องอัตโนมัติ
* **การล็อคคาราโอเกะ**: กดปุ่ม "Lock Karaoke" เมื่อมีคนเริ่มร้องเพลง เพื่อไม่ให้โฆษณาขึ้นมาบังหน้าจอ
* **การแสดงโฆษณา**: กดปุ่ม "Show Flyer Now" เพื่อแสดงใบปลิวทันที
* **Party Mode**: เปลี่ยนธีมเป็นไฟนีออน
