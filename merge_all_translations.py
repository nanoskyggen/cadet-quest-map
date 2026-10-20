#!/usr/bin/env python3
"""Merge all translation JSON files and verify 100% coverage."""
import json

# Load all translation sources
all_strings = json.load(open('bushcraft_strings.json'))  # 587 total
short_translations = json.load(open('fr_bushcraft_final.json'))  # 501 short
missing_long = json.load(open('fr_missing_long.json'))  # 86 long

# Load all long string translation files
long_files = [
    'fr_long_1.json',
    'fr_long_2.json', 
    'fr_long_3.json',
    'fr_long_articles.json',
    'fr_long_19_38.json',
    'fr_long_39_50.json',
    'fr_long_51_76.json',
    'fr_long_77_85.json',
]

long_translations = {}
for f in long_files:
    data = json.load(open(f))
    long_translations.update(data)
    print(f"Loaded {len(data)} entries from {f}")

print(f"\nTotal long translations: {len(long_translations)}")
print(f"Total short translations: {len(short_translations)}")

# Merge everything
merged = {}
merged.update(short_translations)
merged.update(long_translations)

print(f"Total merged translations: {len(merged)}")
print(f"Total strings needed: {len(all_strings)}")

# Verify coverage
covered = 0
missing = []
for s in all_strings:
    if s in merged:
        covered += 1
    else:
        missing.append(s)

print(f"\nCovered: {covered} / {len(all_strings)}")
print(f"Missing: {len(missing)}")

if missing:
    print("\nMissing strings:")
    for m in missing[:20]:
        print(f"  - {m[:100]}...")
    if len(missing) > 20:
        print(f"  ... and {len(missing)-20} more")

# Save the complete merged dictionary
with open('fr_bushcraft_complete.json', 'w', encoding='utf-8') as f:
    json.dump(merged, f, ensure_ascii=False, indent=2)

print(f"\nSaved complete dictionary to fr_bushcraft_complete.json ({len(merged)} entries)")

if len(missing) == 0:
    print("\n✅ 100% COVERAGE ACHIEVED!")
else:
    print(f"\n⚠️ {len(missing)} strings still missing translation")
