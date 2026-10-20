#!/usr/bin/env python3
"""Convert the complete French translation dictionary to JS format
and insert into translations_fr.js before the closing };"""

import json

# Load the complete dictionary
complete = json.load(open('fr_bushcraft_complete.json'))
print(f"Loaded {len(complete)} translation entries")

# Read the current translations_fr.js
with open('translations_fr.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the insertion point: before the closing "};\n})(window);"
marker = '};\n})(window);'
idx = content.rfind(marker)
if idx == -1:
    print("ERROR: Could not find insertion marker!")
    exit(1)

print(f"Insertion point found at character {idx}")

# Build the JS string for the new entries
# Format: "English": "French",
js_lines = []
for eng, fr in sorted(complete.items()):
    # Use json.dumps for proper escaping of both key and value
    key_escaped = json.dumps(eng, ensure_ascii=False)
    val_escaped = json.dumps(fr, ensure_ascii=False)
    js_lines.append(f"  {key_escaped}: {val_escaped},")

js_block = '\n'.join(js_lines) + '\n'

# Insert before the closing marker
new_content = content[:idx] + js_block + content[idx:]

# Write back
with open('translations_fr.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Inserted {len(complete)} translation entries into translations_fr.js")
print(f"New file size: {len(new_content)} bytes")

# Verify the file is valid JS by checking structure
with open('translations_fr.js', 'r', encoding='utf-8') as f:
    verify = f.read()

if verify.endswith('})(window);') and 'global.I18N_DICT.fr' in verify:
    print("✅ File structure verified - contains I18N_DICT.fr and ends with (window);")
else:
    print("⚠️ Warning: file structure may be incorrect")
