#!/usr/bin/env python3
"""Generate French translations for indices 19-38 (SITREP + Correct! feedback)."""
import json

missing = json.load(open('fr_missing_long.json'))
translations = {}

translations[missing[19]] = "Un rapport de situation (SITREP) est la façon dont les cadets communiquent leur statut de survie à leur instructeur. Déposez un SITREP après chaque mission pour consigner ce que vous avez appris et toute erreur de survie identifiée sur le terrain."

translations[missing[20]] = "Correct ! Un abri adossé (lean-to) est un abri IMPROVISÉ — vous le construisez en appuyant des branches et des matériaux contre une faîtière ou entre des arbres. Les autres abris improvisés incluent les abris de branches, les abris sous tronc tombé, les igloos de neige et les tipis."

translations[missing[21]] = "Correct ! Toute eau de sources naturelles doit être purifiée avant d'être bue, peu importe sa clarté. L'ébullition pendant au moins 1 minute (3+ en altitude) ou l'utilisation de comprimés de purification tue les bactéries, virus et parasites nuisibles comme la Giardia."

translations[missing[22]] = "Correct ! Les cirrus (nuages élevés, fins, filamenteux, en forme de crin de cheval) indiquent souvent un temps clair actuellement, mais lorsqu'ils augmentent et s'étendent dans le ciel, un changement de temps — souvent de la pluie ou un front — est probable dans les 12 à 24 heures."

translations[missing[23]] = "Correct ! Les cumulonimbus — nuages grands et tourmentés avec un sommet en forme d'enclume — indiquent que des orages approchent. Préparez votre abri, sécurisez votre zone de feu et soyez prêt pour de fortes pluies, de la foudre et des vents violents."

translations[missing[24]] = "Correct ! L'élévation et le drainage sont critiques. L'air froid s'accumule dans les zones basses et les vallées la nuit, et l'eau s'accumule dans les dépressions. Un site élevé et bien drainé prévient l'hypothermie due au froid du sol et à l'humidité."

translations[missing[25]] = "Correct ! La peur n'est pas l'un des sept ennemis. Les sept ennemis sont : Douleur, Froid, Soif, Faim, Fatigue, Ennui et Solitude. La peur est liée mais relève de la psychologie de survie, pas de la liste des sept ennemis."

translations[missing[26]] = "Correct ! La nourriture est la priorité de survie la plus basse. La règle de trois dit que vous pouvez survivre 3 semaines sans nourriture, contre 3 jours sans eau et 3 heures sans abri dans des conditions extrêmes. Concentrez-vous d'abord sur l'abri et l'eau."

translations[missing[27]] = "Correct ! Les signes d'avertissement généraux des plantes toxiques incluent : la sève laiteuse, le goût amer ou savonneux, l'odeur d'amande (cyanure), les épines ou les dards, et les plantes aux grappes de fleurs en forme de parapluie. Ce ne sont pas des règles absolues mais de forts signaux de prudence."

translations[missing[28]] = "Correct ! Les symboles de signal sol-air doivent mesurer 1 mètre de large et 8 mètres de long, avec les symboles individuels espacés de 3 mètres. Cette taille assure la visibilité depuis les aéronefs de recherche. Les symboles incluent V (assistance requise), X (assistance médicale requise) et des flèches pour la direction."

translations[missing[29]] = "Correct ! La filtration improvisée élimine les sédiments et particules visibles mais ne tue pas les microorganismes. Vous devez TOUJOURS faire suivre la filtration par une ébullition ou des comprimés de purification chimique pour rendre l'eau vraiment sûre à boire."

translations[missing[30]] = "Correct ! Les nimbostratus — couches gris foncé, plates et sans relief couvrant le ciel — apportent une pluie continue et régulière qui peut durer des heures. Cela diffère des fortes averses brèves des orages. Préparez-vous à des conditions humides prolongées."

translations[missing[31]] = "Correct ! Une fois vos bases de survie sécurisées, concentrez-vous sur la signalisation. Restez à votre abri (il fournit une protection et est un repère), préparez trois feux pour la détresse aérienne, disposez des symboles de signal sol-air et gardez un miroir de signal et un sifflet prêts. Plusieurs méthodes de signal augmentent vos chances d'être repéré par les sauveteurs."

translations[missing[32]] = "Correct ! La meilleure façon de contrer l'ennui et la solitude est de rester occupé — construisez des abris, améliorez votre camp, entretenez le feu, gardez une routine et maintenez l'espoir. Un esprit et un corps actifs résistent à l'effondrement psychologique."

translations[missing[33]] = "Correct ! La règle d'or de la cueillette est absolue : si vous ne pouvez pas identifier une plante avec 100 % de certitude, ne la mangez pas. La nourriture est la priorité de survie la plus basse (vous pouvez survivre des semaines sans), donc le risque d'empoisonnement n'en vaut jamais la peine."

translations[missing[34]] = "Correct ! La procédure d'extinction correcte est : 1) Arroser abondamment avec de l'eau, 2) Remuer les cendres pour exposer tous les points chauds, 3) Chercher la chaleur résiduelle avec votre main, 4) Remplir le foyer de terre. Ce n'est que lorsqu'il est froid au toucher qu'il est sûr de partir."

translations[missing[35]] = "Correct ! Le signal de détresse universel est TROIS de n'importe quoi : trois coups de sifflet, trois éclairs de miroir, trois coups de feu ou trois feux. Ce modèle est internationalement reconnu comme un appel de détresse. Trois feux régulièrement espacés en triangle est un signal de détresse aérien standard."

translations[missing[36]] = "Correct ! Le test universel de comestibilité commence par séparer la plante en parties (feuilles, tiges, racines, fleurs), puis sentir chaque partie pour des odeurs d'amande ou acides qui peuvent indiquer du cyanure ou de l'acide. Si ça sent l'amande, ne le mangez pas. Les étapes suivantes incluent le test sur la peau, puis les lèvres, la langue, et enfin avaler une petite quantité avec une attente de 8 heures."

translations[missing[37]] = "Correct ! Trois feux disposés en triangle, espacés de 35 mètres, est le signal de détresse aérien internationalement reconnu. Ce modèle est clairement visible depuis les aéronefs et distingue un signal de détresse d'un feu de camp ou d'un feu naturel."

translations[missing[38]] = "Correct ! Lorsque les oiseaux volent bas et que les insectes deviennent moins actifs, cela signale souvent une chute de pression atmosphérique et l'approche de mauvaises conditions météorologiques. De nombreux animaux sentent les changements de pression avant les tempêtes et modifient leur comportement en conséquence."

with open('fr_long_19_38.json', 'w', encoding='utf-8') as f:
    json.dump(translations, f, ensure_ascii=False, indent=2)

print(f"Generated {len(translations)} translations (indices 19-38)")
loaded = json.load(open('fr_long_19_38.json'))
print(f"Verified: {len(loaded)} entries loaded successfully")
