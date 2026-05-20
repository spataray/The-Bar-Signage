import anthropic
import re
import json
import sys
import os

# Check if API key is set
api_key = os.environ.get("ANTHROPIC_API_KEY")
if not api_key:
    print("========================================= ERROR =========================================")
    print("CRITICAL: The ANTHROPIC_API_KEY environment variable is not set!")
    print("Please make sure you have added the 'ANTHROPIC_API_KEY' secret under Repository Secrets")
    print("in your GitHub repository: Settings -> Secrets and variables -> Actions -> Repository secrets")
    print("=========================================================================================")
    sys.exit(1)

try:
    client = anthropic.Anthropic(api_key=api_key)
except Exception as e:
    print(f"CRITICAL: Failed to initialize Anthropic client: {e}")
    sys.exit(1)

# List of models to try in order of preference
models_to_try = [
    "claude-haiku-4-5-20251001",
    "claude-3-5-haiku-20241022",
    "claude-3-haiku-20240307"
]

message = None
facts_prompt = (
    "Generate exactly 20 fun, silly, and entertaining facts about various countries and famous cities worldwide (Japan, France, Italy, USA, Thailand, Hawaii, etc.). "
    "Make them playful, surprising, and bar-appropriate. Keep each fact under 120 characters. "
    "Include interesting trivia about local drinks, food, or quirks. "
    "Start each fact with an appropriate emoji and the text '🌍 Fun Fact:'. "
    "Return ONLY a valid JSON array of exactly 20 strings. No markdown, no extra text."
)

print("Generating new fun facts...")

for model_name in models_to_try:
    print(f"Attempting facts generation using model: {model_name}...")
    try:
        response = client.messages.create(
            model=model_name,
            max_tokens=2048,
            messages=[{"role": "user", "content": facts_prompt}]
        )
        message = response
        print(f"Successfully generated facts using model: {model_name}")
        break
    except anthropic.APIStatusError as e:
        # Check for specific API errors
        if e.status_code == 401:
            print("========================================= ERROR =========================================")
            print("CRITICAL: Authentication failed (HTTP 401). Your ANTHROPIC_API_KEY is invalid or expired.")
            print("Please verify and update the secret in your GitHub Repository settings.")
            print("=========================================================================================")
            sys.exit(1)
        elif e.status_code == 404 or e.status_code == 403 or "model" in str(e).lower():
            # Model not found or permission denied for this model - try next fallback!
            print(f"WARNING: Model {model_name} is unavailable or access was denied (HTTP {e.status_code}).")
            print("Detail:", e.message)
            print("Trying fallback model...")
            continue
        else:
            print(f"ERROR: Anthropic API returned status code {e.status_code}: {e.message}")
            sys.exit(1)
    except anthropic.APIConnectionError as e:
        print(f"ERROR: Network connectivity issue when connecting to Anthropic API: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"ERROR: An unexpected error occurred: {e}")
        sys.exit(1)

if not message:
    print("========================================= ERROR =========================================")
    print("CRITICAL: All attempted models failed or were unavailable.")
    print("Please check your Anthropic account status, credits balance, or API key permissions.")
    print("========================================= ERROR =========================================")
    sys.exit(1)

try:
    raw = message.content[0].text.strip()
except (IndexError, AttributeError) as e:
    print(f"ERROR: Failed to extract text from response content: {e}")
    sys.exit(1)

# Extract JSON array in case model wraps it in markdown
match = re.search(r'\[.*\]', raw, re.DOTALL)
if not match:
    print("ERROR: Could not find JSON array in response")
    print("Response was:", raw)
    sys.exit(1)

try:
    facts = json.loads(match.group(0))
except json.JSONDecodeError as e:
    print(f"ERROR: Failed to parse JSON from model response: {e}")
    print("Match was:", match.group(0))
    sys.exit(1)

if len(facts) != 20:
    print(f"WARNING: Expected 20 facts, got {len(facts)}")

# Build JS lines
js_lines = ',\n            '.join(json.dumps(f, ensure_ascii=False) for f in facts)

# Read index.html
try:
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
except FileNotFoundError:
    print("ERROR: index.html not found! Make sure you run this script from the project root directory.")
    sys.exit(1)

# Replace content between markers (keeping the markers)
pattern = r'(// AUTO-GENERATED-FACTS-START\n).*?(\n            // AUTO-GENERATED-FACTS-END)'
replacement = r'\g<1>            ' + js_lines + r'\2'
new_html, count = re.subn(pattern, replacement, html, flags=re.DOTALL)

if count == 0:
    print("ERROR: Could not find AUTO-GENERATED-FACTS markers in index.html")
    sys.exit(1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print(f"Successfully updated {len(facts)} fun facts in index.html")
