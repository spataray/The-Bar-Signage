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
    { id: "PL64G6j8eG1_Z_haIdIn_8Z_vxhXInX8Z_", title: "Thai Pop Hits" },
    { id: "PLh_mFeSn_6YPfX_v_xhXInX8Z_8Z_vxhX", title: "80s Karaoke" },
    { id: "PLmcZ_8Z_vxhXInX8Z_v_xhXInX8Z_8Z_", title: "90s Party Hits" },
    { id: "PLFgquLnL59alCl_j-bZ_vxhXInX8Z_8Z_", title: "Top 50 Today" }
];
