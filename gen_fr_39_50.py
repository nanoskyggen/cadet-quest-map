#!/usr/bin/env python3
"""Generate French translations for indices 39-50 (narratives, welcome texts)."""
import json

missing = json.load(open('fr_missing_long.json'))
translations = {}

translations[missing[39]] = "C'est le matin. Votre feu vous a gardé au chaud pendant la nuit et votre abri a résisté à la pluie. Votre gourde est presque vide et vous commencez à avoir soif. Vous entendez de l'eau courante au loin — un ruisseau à environ 100 mètres en contrebas. Vous suivez le son et trouvez un ruisseau clair et rapide. Que faites-vous ?"

translations[missing[40]] = "C'est votre deuxième jour. Vous avez un abri, du feu et de l'eau — vos bases de survie sont sécurisées. Maintenant, vous entendez quelque chose au loin : un moteur d'aéronef. Cela pourrait être un avion de recherche qui vous cherche. Vous avez votre sifflet, votre miroir de signal et trois emplacements de feu potentiels. Vous avez environ 30 secondes avant que le son ne s'estompe. Que faites-vous ?"

translations[missing[41]] = "Maintenant que vous êtes calme, vous devez observer votre environnement et établir un plan. Le ciel se couvre et la température baisse. Vous estimez qu'il vous reste environ 2 heures de lumière du jour. Vous avez un petit sac à dos avec une gourde, un couteau, un sifflet et un briquet. Qu'observez-vous et que priorisez-vous ?"

translations[missing[42]] = "Matériel de référence couvrant la théorie derrière chaque module de formation en techniques de brousse et survie du programme de survie en pleine nature Étoile Rouge (PO 224). Lisez-les avant ou après les missions pour approfondir votre compréhension de la psychologie de survie, des abris, du feu, de l'eau, de la cueillette et de la signalisation. Lire des articles rapporte aussi un petit bonus d'XP."

translations[missing[43]] = "Le parcours de formation Techniques de Brousse & Survie est construit en séquence selon le programme de survie en pleine nature Étoile Rouge (PO 224). Chaque module enseigne des connaissances de survie fondamentales puis les teste avec une simulation pratique. Complétez les modules dans l'ordre pour débloquer le suivant."

translations[missing[44]] = "L'ordre correct du filtre (de bas en haut) est : tissu/herbe (retient les fines particules) → sable fin → charbon de bois concassé (élimine les produits chimiques et les odeurs) → sable fin → verser l'eau à travers. N'oubliez pas : cela filtre uniquement les sédiments — vous devez toujours faire bouillir ou traiter chimiquement l'eau pour tuer les pathogènes."

translations[missing[45]] = "L'ordre correct du combustible est : Amadou (attrape l'étincelle) → Petit bois (s'enflamme depuis l'amadou) → Combustible de bois (maintient la flamme) → Gros bois de chauffage (chaleur durable). Chaque étape doit être bien enflammée avant d'ajouter la suivante, sinon vous étoufferez le feu."

translations[missing[46]] = "L'ordre correct pour construire un abri de débris est : 1) Trouver une faîtière, 2) Soutenir une extrémité surélevée, 3) Appuyer des branches en côtes pour former le cadre en A, 4) Empiler des débris isolants sur le cadre. La couche de débris doit faire au moins 30 cm d'épaisseur pour une isolation adéquate."

translations[missing[47]] = "Les cinq éléments de survie par ordre de priorité sont : Attitude, Abri, Eau, Feu, Nourriture. Votre attitude mentale est la plus critique — sans la volonté de survivre, rien d'autre n'a d'importance. L'abri et l'eau viennent avant le feu et la nourriture car l'exposition et la déshydratation tuent plus vite que la faim."

translations[missing[48]] = "Bienvenue à l'Opération Wildwood. Votre formation Techniques de Brousse & Survie couvre la psychologie de survie, les sept ennemis de la survie, la construction d'abris d'urgence, l'allumage et l'entretien du feu, la recherche et la purification de l'eau, la sensibilisation à la cueillette et la signalisation de sauvetage. Vous maîtriserez la procédure S.T.O.P., la règle de trois des priorités de survie, le triangle du feu, la sélection du site d'abri et les signaux de détresse universels. Complétez les modules de formation pour gagner de l'XP, gravir l'échelon des grades et déposer vos SITREPs de survie."

translations[missing[49]] = "Vous êtes perdu seul en pleine nature avec la tombée de la nuit qui approche. Le Sentier de Survie est un scénario interactif multi-étapes qui teste tout ce que vous avez appris. Prenez les bonnes décisions à chaque étape — S.T.O.P., construisez un abri, allumez un feu, purifiez l'eau et signalez pour le sauvetage. Chaque choix affecte vos jauges d'état de survie. Complétez toutes les étapes avec succès pour obtenir le badge Sentier de Survie. Activez la musique du feu de camp pour une atmosphère de pleine nature immersive."

translations[missing[50]] = "Vous soufflez trois coups de sifflet brefs, faites une pause et répétez. Vous flasher votre miroir de signal trois fois vers l'aéronef. Vous allumez vos trois emplacements de feu pré-préparés disposés en triangle à 35 mètres d'intervalle. Le signal de détresse universel est TROIS de n'importe quoi — trois sifflets, trois éclairs, trois feux en triangle. Vos multiples méthodes de signal attirent l'attention de l'équipage de recherche. L'aéronef tourne, balance ses ailes — ils vous ont vu ! Le sauvetage est en route. Vous avez tout fait correctement."

with open('fr_long_39_50.json', 'w', encoding='utf-8') as f:
    json.dump(translations, f, ensure_ascii=False, indent=2)

print(f"Generated {len(translations)} translations (indices 39-50)")
loaded = json.load(open('fr_long_39_50.json'))
print(f"Verified: {len(loaded)} entries loaded successfully")
