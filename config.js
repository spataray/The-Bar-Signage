// Centralized Configuration for T.A. Station Signage
var firebaseConfig = {
    apiKey: "AIzaSyAJ6XE866VF-8VKn7iMtVQjMZTS_LPB9l4",
    authDomain: "ta-station-remote.firebaseapp.com",
    databaseURL: "https://ta-station-remote-default-rtdb.firebaseio.com",
    projectId: "ta-station-remote",
    storageBucket: "ta-station-remote.firebasestorage.app",
    messagingSenderId: "805160829750",
    appId: "1:805160829750:web:9a2a9e1cbf639562aba997"
};

// Global YouTube API Key (shared with Firebase)
var YT_API_KEY = firebaseConfig.apiKey;

// Featured Playlists for the 'Featured' tab
var FEATURED_PLAYLISTS = [
    { id: "PLlYKDqBVDxX2C_6Q3BipPnTmg3fRjTF8N", title: "Thai Pop Hits" },
    { id: "PLhH-_rO2_KPTRqfei69bfR4M-iiQnFhtx", title: "80s Karaoke" },
    { id: "PLILCJF6YwPP-Uk6R539eCrqIUKaJOCyZ-", title: "90s Party Hits" },
    { id: "PLgzTt0k8mXzEk586ze4BjvDXR7c-TUSnx", title: "Top 50 Today" }
];
