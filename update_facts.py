import anthropic
import re
import json
import sys

client = anthropic.Anthropic()

print("Generating new fun facts...")

message = client.messages.create(
    model="claude-haiku-4-5-20251001",
    max_tokens=2048,
    messages=[{
        "role": "user",
        "content": (
            "Generate exactly 20 fun, silly, and entertaining facts about Thailand and Hawaii (10 each). "
            "These scroll on a digital signage screen at T.A. Station, a Thai hostess bar in Honolulu, Hawaii. "
            "Make them playful, surprising, and bar-appropriate. Keep each fact under 120 characters. "
            "Start Thailand facts with '\\u1f1f9\\u1f1ed Fun Fact:' and Hawaii facts with '\\U0001F33A Fun Fact:'. "
            "Return ONLY a valid JSON array of exactly 20 strings. No markdown, no extra text."
        )
    }]
)

raw = message.content[0].text.strip()

# Extract JSON array in case model wraps it in markdown
match = re.search(r'\[.*\]', raw, re.DOTALL)
if not match:
    print("ERROR: Could not find JSON array in response")
    print("Response was:", raw)
    sys.exit(1)

facts = json.loads(match.group(0))
if len(facts) != 20:
    print(f"WARNING: Expected 20 facts, got {len(facts)}")

# Build JS lines
js_lines = ',\n            '.join(json.dumps(f, ensure_ascii=False) for f in facts)

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

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
