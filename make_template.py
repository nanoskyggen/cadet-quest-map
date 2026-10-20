#!/usr/bin/env python3
"""Output bushcraft_strings.json as JS template with empty FR values for manual filling"""
import json

with open('bushcraft_strings.json', 'r', encoding='utf-8') as f:
    strings = json.load(f)

# Output short strings (non-HTML) as JS entries
lines = []
lines.append('  /* ── Bushcraft & Survival Training Page ── */')

for s in strings:
    if '<p>' in s or len(s) >= 200:
        continue
    # Escape for JS string
    escaped = s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    lines.append(f'  "{escaped}": "",')

with open('bushcraft_fr_template.js', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines) + '\n')

print(f"Generated {len(lines)-1} template entries")
