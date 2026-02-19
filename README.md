Your site is live at https://spataray.github.io/The-Bar-Signage/
Your maintenance site lives at https://spataray.github.io/The-Bar-Signage/maintenance.html

### T.A. Station - Digital Signage System

A digital signage system for T.A. Station (Honolulu, HI). Plays YouTube music/videos on a bar TV with ads, menus, and a scrolling ticker — all controlled from a staff phone.

### Project Files

* **`index.html`**: The main TV display. Open this on the TV browser.
* **`style.css`**: Visual branding, layout, idle slideshow, and party mode styles.
* **`maintenance.html`**: Staff remote control (iPad/phone).
* **`images/`**: Bar photos used in the ad sidebar and idle slideshow.

---

### Music & Video Control

Open `maintenance.html` on your iPad or phone:

* **Search**: Search YouTube directly from the remote. Tap play or add to queue.
* **Queue**: Songs play automatically one after another. View, reorder, or remove upcoming songs.
* **Playlists**: Paste a YouTube playlist URL to load all songs into the queue.
* **Paste URL**: Switch to the "Paste URL" tab to play or queue a specific video link.
* **Playback**: Play/pause, skip, previous, and volume controls sync to the TV in real time.
* **Idle Screen**: When the queue is empty, the TV shows a photo slideshow with the bar logo.

---

### Ads & Karaoke

* **Auto-Ads**: Ads (flyer + menu) slide in every 3 minutes for 25 seconds.
* **Show Flyer Now**: Forces the ad sidebar to appear immediately.
* **Karaoke Lock**: Hides all ads while customers are singing. Shows a red "KARAOKE LOCKED" indicator.
* **Unlock**: Resumes automatic ad rotation.
* **Party Mode**: Switches to a neon pink/blue theme with flickering effects.

---

### Content Management

Ads, menu, and ticker are managed via [Google Sheets](https://docs.google.com/spreadsheets/d/1SCT9dV1cGovk2o3Dd7y1fE3CUY2CR58GQvxgKLITeU4/edit):

* **Ads Tab**: Party name, description, and flyer image URL.
* **Menu Tab**: Drink/food items and prices.
* **Ticker Tab**: Scrolling messages at the bottom of the screen.

Content syncs automatically every 60 seconds.

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
