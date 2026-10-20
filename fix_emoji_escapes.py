#!/usr/bin/env python3
# Fix Python-style Unicode escapes in bushcraft_training.js
# Replaces backslash-U-8-hex-digit sequences with actual emoji characters

import re

with open('bushcraft_training.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern: backslash U followed by 8 hex digits
pat = re.compile(r'\\U([0-9A-Fa-f]{8})')

def repl(m):
    return chr(int(m.group(1), 16))

count = len(pat.findall(content))
fixed = pat.sub(repl, content)

print(f"Found and replaced {count} escape sequences")

with open('bushcraft_training.js', 'w', encoding='utf-8') as f:
    f.write(fixed)

remaining = re.findall(r'\\U[0-9A-Fa-f]{8}', fixed)
print(f"Remaining patterns: {len(remaining)}")
