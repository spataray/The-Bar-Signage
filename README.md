Based on the recent architectural changes we've made to include **Firebase** and your specific **Google Sheet** configuration, the previous README needs an update to be accurate.

Since you are now using the system as a real-time remote control for **T.A. Station** in Honolulu, the documentation should reflect how the "Remote" and the "Display" work together.

---

## Updated README.md

### 📺 T.A. Station - Digital Signage System

This system is a custom-built digital signage solution for T.A. Station. It allows a bar TV to play YouTube videos while periodically displaying ads, flyers, and menus controlled via a smartphone.

### 🛠 Project Files

* **`index.html`**: The main TV display. Open this on the TV browser.
* **`style.css`**: The visual branding and layout for the bar.
* **`maintenance.html`**: The remote control for staff to use on their phones.

---

### 📱 How to Manage Content

All text and images are managed via your [Google Sheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vSY_76oR-biNXkDm9_MUA-RjKm-DBkeaAX903MPQJHMd2Ku_HFj2Z8w8xDIA-mxl7-Bf474N7MlKdYY/pubhtml):

* **Ads Tab**: Update the Party Name, Description, and link to the **Flyer GIF**.
* **Menu Tab**: Add new drink or food items and their prices.
* **Ticker Tab**: Update the scrolling social media messages at the bottom of the screen.

---

### 🔒 Remote Control Instructions

Open `maintenance.html` on your phone to access these live commands:

1. **Karaoke Lock**: Tap **"Lock Karaoke"** to stop ads immediately. This is essential for when customers are singing so the lyrics aren't blocked.
2. **Unlock**: Resumes the automatic ad rotation (every 3 minutes).
3. **Show Ad Now**: Forces the current flyer and menu to pop up immediately for 25 seconds.

---

### 🇹🇭 คำแนะนำสำหรับพนักงาน (Thai Instructions)

* **การอัปเดตข้อมูล**: แก้ไขราคาหรือชื่อปาร์ตี้ผ่านแอป Google Sheets ในมือถือ.
* **การล็อคคาราโอเกะ**: กดปุ่ม **"Lock Karaoke"** ในหน้า `maintenance.html` เมื่อมีคนเริ่มร้องเพลง เพื่อไม่ให้โฆษณาขึ้นมาบังหน้าจอ.
* **การแสดงโฆษณา**: กดปุ่ม **"Show Ad Now"** เพื่อแสดงใบปลิวทันที.

---

### 🚀 Technical Setup

* **Hosting**: Hosted via GitHub Pages at `spataray.github.io/The-Bar-Signage/`.
* **Real-time Sync**: Uses **Firebase Realtime Database** to sync the phone and TV instantly.
* **Images**: All flyers must be **direct links** ending in `.gif`, `.png`, or `.jpg`.

Would you like me to help you format a specific "Drink Specials" table for your Google Sheets Menu tab?
