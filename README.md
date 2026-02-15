A professional `README.md` is essential for this project, especially if you plan to hand this off to a bartender or another developer. It needs to explain how to toggle "Karaoke Mode" and how to link the Google Sheet.

Here is a structured README designed for a GitHub repository.

---

# 📺 Bar-TV Signage Controller

**Dynamic YouTube Playback with Automated Ad Overlay**

This project is a lightweight, web-based digital signage solution designed for bars and venues. It allows for continuous YouTube playback while periodically sliding in a promotional sidebar (Picture-in-Picture style) to display drink specials, upcoming parties, and QR codes.

## 🌐 Live Demo

**Public URL:** [https://spataray.github.io/The-Bar-Signage/](https://spataray.github.io/The-Bar-Signage/)

The application is automatically deployed to GitHub Pages whenever changes are pushed to the main branch.

> **Note:** If this is your first time setting up the repository, you'll need to enable GitHub Pages in the repository settings. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## ✨ Key Features

* **Seamless Transitions:** Uses CSS Grid to resize the video without reloading or buffering.
* **Google Sheets Integration:** Update party names and drink prices remotely via a spreadsheet—no code changes required.
* **Karaoke Lock:** A manual override button to prevent ads from appearing during live performances or big games.
* **Responsive Sidebar:** Automatically slides out at set intervals (default: 60 seconds).

---

## 🚀 Getting Started

### 1. Prerequisites

* A modern web browser (Chrome or Edge recommended for TV hardware).
* A YouTube Video ID or Playlist ID.

### 2. Google Sheets Setup (The Data Source)

To update your ads remotely:

1. Create a [Google Sheet](https://sheets.new).
2. **Row 1:** Enter the "Party Name".
3. **Row 2:** Enter the "Drink Special".
4. Go to `File > Share > Publish to web`.
5. Select **Link**, change "Entire Document" to **Comma-separated values (.csv)**.
6. Copy the generated URL and paste it into the `sheetURL` variable in `index.html`.

### 3. Installation

**Option A: Use the Live Version**

Simply navigate to [https://spataray.github.io/The-Bar-Signage/](https://spataray.github.io/The-Bar-Signage/) in your browser. This is the easiest way to get started.

**Option B: Local Development**

1. Clone the repository:
```bash
git clone https://github.com/spataray/The-Bar-Signage.git
```

2. Open `index.html` in your text editor.
3. Replace the `videoId` with your desired YouTube content.
4. Open `index.html` in your browser.

---

## 🛠 Controls

| Feature | Description |
| --- | --- |
| **Karaoke Lock** | Prevents the ad sidebar from triggering. Toggle this **ON** during live events. |
| **Toggle Ad Now** | Manually triggers the sidebar for testing or immediate announcements. |
| **Auto-Timer** | Defaults to showing an ad for 15 seconds every 1 minute. |

---

## 🏗 Architecture

* **Frontend:** HTML5, CSS3 (Grid & Transitions), Vanilla JavaScript.
* **API:** [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference).
* **Data:** Fetch API (CSV Parsing from Google Sheets).

---

## 📝 Customization

To change the timing of the ads, locate the `setInterval` at the bottom of the script:

* `60000` = Frequency (in milliseconds).
* `15000` = Duration the ad stays on screen.

---

## ⚖️ License

This project is open-source and available under the MIT License.

---

**Would you like me to add a section to this README on how to auto-launch this in "Kiosk Mode" so the browser headers and address bar are hidden on the TV?**
