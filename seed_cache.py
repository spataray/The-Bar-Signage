import json
import requests
import time
import re
import os

# --- CONFIGURATION ---
# We'll pull these from your config.js to keep things simple
def get_config():
    with open('config.js', 'r') as f:
        content = f.read()
        api_key = re.search(r'apiKey:\s*"([^"]+)"', content).group(1)
        db_url = re.search(r'databaseURL:\s*"([^"]+)"', content).group(1)
        return api_key, db_url

API_KEY, DB_URL = get_config()
SEARCH_LIMIT = 90  # Stay under 100 searches per day (10,000 units)

def firebase_safe(q):
    return re.sub(r'[.#$[\]]', '_', q.lower().strip())

def search_youtube(query):
    print(f"Searching YouTube for: {query}")
    url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={query}&type=video&videoEmbeddable=true&maxResults=15&key={API_KEY}"
    res = requests.get(url)
    data = res.json()
    if 'error' in data:
        print(f"Error: {data['error']['message']}")
        return None
    return data.get('items', [])

def save_to_firebase(safe_query, items):
    url = f"{DB_URL}/SEARCH_CACHE/{safe_query}.json"
    data = {
        "items": items,
        "timestamp": int(time.time() * 1000)
    }
    res = requests.put(url, json=data)
    return res.status_code == 200

def process_seed_list():
    with open('SONG_SEED_LIST.md', 'r') as f:
        lines = f.readlines()

    updated_lines = []
    count = 0
    
    for line in lines:
        match = re.search(r'- \[ \] (.+)', line)
        if match and count < SEARCH_LIMIT:
            song_query = match.group(1)
            safe_q = firebase_safe(song_query)
            
            # 1. Check if already in Firebase (don't waste quota)
            check_url = f"{DB_URL}/SEARCH_CACHE/{safe_q}.json"
            check_res = requests.get(check_url).json()
            
            if check_res:
                print(f"Already cached: {song_query}")
                updated_lines.append(line.replace('[ ]', '[x]'))
                continue

            # 2. Search and Cache
            items = search_youtube(song_query)
            if items:
                if save_to_firebase(safe_q, items):
                    print(f"Success! Cached: {song_query}")
                    updated_lines.append(line.replace('[ ]', '[x]'))
                    count += 1
                else:
                    print(f"Failed to save to Firebase: {song_query}")
                    updated_lines.append(line)
            else:
                updated_lines.append(line)
            
            time.sleep(0.5) # Be nice to the API
        else:
            updated_lines.append(line)

    # Write progress back to the file
    with open('SONG_SEED_LIST.md', 'w') as f:
        f.writelines(updated_lines)

    print(f"\nFinished. Seeded {count} new songs today.")
    if count >= SEARCH_LIMIT:
        print("Reached daily seeding limit. Run again tomorrow!")

if __name__ == "__main__":
    process_seed_list()
