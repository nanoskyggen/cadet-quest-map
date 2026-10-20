#!/usr/bin/env python3
"""Build French translations for all bushcraft strings using JSON output to avoid
Python string-literal escaping issues with French apostrophes."""

import json

# Load existing translations (494 short strings from gen_fr_final.py)
with open('fr_bushcraft_dict.json', 'r', encoding='utf-8') as f:
    T = json.load(f)

# Load all strings that need translation
with open('bushcraft_strings.json', 'r', encoding='utf-8') as f:
    all_strings = json.load(f)

# We'll build translations as a list of [english, french] pairs
# and merge into T dict at the end.
# Using a separate list to avoid escaping issues with Python string literals.

translations = []

# === 7 MISSING SHORT STRINGS ===
translations.append(("Call out loudly \u2014 maybe someone can hear you.", "Appeler \u00e0 voix haute \u2014 peut-\u00eatre que quelqu'un peut vous entendre."))
translations.append(("Food is the lowest priority. Once shelter, fire, and water are secured, signalling is the next critical step to getting rescued.", "La nourriture est la priorit\u00e9 la plus basse. Une fois l'abri, le feu et l'eau assur\u00e9s, la signalisation est la prochaine \u00e9tape critique pour \u00eatre secouru."))
translations.append(("HIGH</div>\n            </div>\n            <div class=", "\u00c9LEV\u00c9</div>\n            </div>\n            <div class="))
translations.append(("Just hold the lighter to the wood and let it catch.", "Tenez simplement le briquet contre le bois et laissez-le prendre."))
translations.append(("Shelter is priority \u2014 you can survive 3 hours without it in extreme cold.", "L'abri est la priorit\u00e9 \u2014 vous pouvez survivre 3 heures sans abri dans le froid extr\u00eame."))
translations.append(("The entrance should face away from where the wind is coming from.", "L'entr\u00e9e devrait faire face \u00e0 l'oppos\u00e9 d'o\u00f9 vient le vent."))
translations.append(("\U0001f4dd File SITREP", "\U0001f4dd D\u00e9poser SITREP"))

# Add to T
for en, fr in translations:
    T[en] = fr

# Save intermediate
with open('fr_bushcraft_final.json', 'w', encoding='utf-8') as f:
    json.dump(T, f, ensure_ascii=True, indent=2)

# Report
missing = [s for s in all_strings if s not in T]
print(f"Short strings added: {len(translations)}")
print(f"Total translated so far: {len(all_strings) - len(missing)}")
print(f"Still missing: {len(missing)}")
# Save the missing long strings to a file for the next step
with open('fr_missing_long.json', 'w', encoding='utf-8') as f:
    json.dump(missing, f, ensure_ascii=True, indent=2)
print("\nMissing strings saved to fr_missing_long.json")
print(f"Of which are long (>=200 chars or contain '<'): {len([s for s in missing if len(s)>=200 or '<' in s])}")
print(f"Of which are short: {len([s for s in missing if len(s)<200 and '<' not in s])}")
