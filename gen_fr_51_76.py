#!/usr/bin/env python3
"""Generate French translations for indices 51-76 (Survival Trail choice feedback)."""
import json

missing = json.load(open('fr_missing_long.json'))
translations = {}

translations[missing[51]] = "Vous construisez un filtre avec du sable, du charbon de bois et du tissu. L'eau sort plus claire et a meilleur goût — mais la filtration ne retire que les sédiments, PAS les bactéries ou parasites. Vous la buvez et risquez les mêmes maladies hydriques qu'en buvant de l'eau brute. La filtration improvisée doit TOUJOURS être suivie d'une ébullition ou d'un traitement chimique. Vous avez eu de la chance cette fois, mais le risque était réel."

translations[missing[52]] = "Vous construisez l'abri sans tenir compte de la direction du vent. L'entrée fait face à l'ouest — directement dans le vent. Toute la nuit, des rafales froides traversent votre abri, volant votre chaleur corporelle. Un abri bien construit avec la mauvaise orientation reste froid et courant d'air. L'orientation de l'entrée est un facteur critique de sélection du site — faites toujours face sous le vent."

translations[missing[53]] = "Vous décidez de ne pas collecter d'eau, en rationnant vos dernières gorgées. Mais vous ne pouvez survivre que 3 jours sans eau, et le sauvetage peut prendre plus de temps. Quand vous avez une source d'eau disponible, collectez-la et purifiez-la — ne rationnez pas quand le réapprovisionnement est possible. En évitant le ruisseau, vous accélérez inutilement la déshydratation. Sécurisez toujours l'eau quand vous le pouvez."

translations[missing[54]] = "Vous buvez directement du ruisseau. L'eau est rafraîchissante — mais elle peut contenir de la Giardia, des Cryptosporidium ou d'autres pathogènes provenant de déchets animaux en amont. Vous ne pouvez ni voir, ni sentir, ni goûter ces contaminants. En quelques heures, vous développez des crampes d'estomac et de la diarrhée, ce qui accélère la déshydratation en situation de survie. Ne buvez JAMAIS d'eau non traitée, peu importe sa clarté. Faites toujours bouillir ou traitez chimiquement d'abord."

translations[missing[55]] = "Vous orientez l'entrée face au vent. Dès que la pluie commence, le vent et l'eau soufflent directement dans votre abri. Vous frissonnez toute la nuit, votre chaleur corporelle s'échappant à chaque rafale. Faire face au vent laisse entrer les éléments — faites toujours face sous le vent, à l'opposé du vent dominant. Vous survivez mais perdez une précieuse chaleur corporelle."

translations[missing[56]] = "Vous remplissez votre gourde du ruisseau, la portez à votre camp et la placez dans le feu pour la faire bouillir. Vous maintenez une ébullition à gros bouillons pendant une minute entière. L'ébullition est la méthode de purification la plus fiable — elle tue toutes les bactéries, tous les virus et parasites comme la Giardia. Même l'eau claire de montagne peut être contaminée, alors ne prenez jamais de risques. Vous avez maintenant de l'eau potable sûre. Votre corps et votre moral se rétablissent tous deux."

translations[missing[57]] = "Vous avez trouvé un bon site près d'un arbre tombé sur un terrain surélevé. Maintenant, vous devez construire votre abri de débris avant que la lumière ne baisse. Vous avez votre couteau et la forêt fournit les matériaux. Le vent se lève et vous sentez la pluie dans l'air. Comment orienterez-vous l'entrée de votre abri ?"

translations[missing[58]] = "Vous descendez la pente à la recherche d'eau, mais vous errez pendant 45 minutes sans en trouver. Pendant ce temps, votre lumière du jour s'épuise et vous n'avez pas d'abri. L'eau est importante (3 jours sans) mais avec la tombée de la nuit qui approche et les températures qui baissent, l'abri est la priorité la plus élevée maintenant. Vous devez revenir et construire un abri avant la nuit."

translations[missing[59]] = "Vous présentez le briquet à un tas de bois humide. La flamme lèche l'écorce mouillée mais ne peut pas prendre — l'humidité empêche l'allumage, et le bois épais étouffe la petite flamme. Vous gaspillez du carburant de briquet et n'obtenez aucun feu. N'oubliez pas l'ordre du combustible : amadou d'abord, puis petit bois, puis bois plus gros. Et en conditions humides, fendez le bois pour trouver l'intérieur sec et faites des bâtons à plumes."

translations[missing[60]] = "Vous allumez un seul grand feu. Mais depuis les airs, un seul feu pourrait être un feu de camp, un feu de forêt naturel ou un brûlage forestier — ce n'est pas clairement un signal de détresse. L'aéronef ne le reconnaît pas comme un appel à l'aide et continue son chemin. Le signal de détresse aérien international est TROIS feux en triangle, à 35 mètres d'intervalle — ce modèle est indéniable. Un seul feu n'est pas le signal de détresse universel."

translations[missing[61]] = "Vous observez la zone : un arbre tombé sur un terrain surélevé, loin des sentiers d'animaux, avec beaucoup de débris à proximité. Vous décidez de construire un abri de débris. Avec 2 heures de lumière, vous avez le temps de le terminer. L'abri est votre priorité physique la plus élevée — la règle de trois dit 3 heures sans abri dans des conditions extrêmes. Les nuages et la température qui baisse confirment que c'est la bonne décision."

translations[missing[62]] = "Vous observez la direction du vent (les arbres se balancent d'ouest) et orientez l'entrée de votre abri vers l'est — sous le vent, à l'opposé du vent dominant. Cela empêche le vent, la pluie et l'air froid de souffler directement dans votre abri. Vous construisez votre abri de débris : faîtière sur l'arbre tombé, branches en côtes pour le cadre en A et épais débris pour l'isolation. Votre abri est terminé juste au moment où l'obscurité tombe."

translations[missing[63]] = "Vous orientez l'entrée au sud pour la lumière du soleil, mais ce soir est nuageux et pluvieux — il n'y aura pas de soleil. Plus important encore, le vent vient de l'ouest, et votre entrée face au sud capte le vent en angle, canalisant l'air froid à l'intérieur. Bien que la lumière du soleil soit agréable, la protection contre le vent est la considération principale. Faites toujours face sous le vent."

translations[missing[64]] = "Vous versez de l'eau sur le bois, le rendant encore plus mouillé. Le bois doit être SEC pour brûler — l'eau retire la chaleur du triangle du feu. Vous avez rendu votre feu impossible à allumer. Trouvez toujours les matériaux les plus secs possibles, et en conditions humides, fendez le bois pour exposer l'intérieur sec. N'ajoutez jamais d'eau au combustible que vous voulez brûler."

translations[missing[65]] = "Vous criez et agitez les bras, mais l'aéronef est haut et loin. Votre voix ne porte pas au-dessus du bruit du moteur, et l'agitation des bras est invisible depuis cette altitude. L'aéronef passe sans vous remarquer. Crier et agiter sont insuffisants pour la signalisation aux aéronefs. Utilisez le signal de détresse universel : trois coups de sifflet, trois éclairs de miroir ou trois feux en triangle. Ceux-ci sont conçus pour être vus et entendus depuis les airs."

translations[missing[66]] = "Vous criez dans la forêt. Votre voix résonne et s'estompe. Personne ne répond. Crier gaspille une précieuse énergie et humidité, et le son ne porte pas loin à travers les arbres. Vous vous sentez plus seul qu'avant. S.T.O.P. — asseyez-vous et réfléchissez avant d'agir."

translations[missing[67]] = "Vous vous asseyez sur une bûche et vous forcez à respirer lentement. Votre rythme cardiaque se calme. La panique est le premier ennemi de la survie, et vous venez de la vaincre. Le « S » de S.T.O.P. signifie ASSEOIR (SIT) — arrêtez de bouger, asseyez-vous et calmez-vous avant de faire quoi que ce soit d'autre. Maintenant vous pouvez penser clairement."

translations[missing[68]] = "Vous passez du temps à examiner les plantes, mais vous ne pouvez pas en identifier la plupart avec certitude. N'oubliez pas la règle d'or : si vous ne pouvez pas l'identifier à 100 %, ne le mangez pas. La nourriture est la priorité de survie la plus basse — vous pouvez survivre 3 semaines sans. Vous avez gaspillé une précieuse lumière du jour. L'abri aurait dû passer en premier."

translations[missing[69]] = "Vous fendez une branche morte debout pour trouver du bois sec à l'intérieur, puis vous sculptez soigneusement des bâtons à plumes avec votre couteau — de fins copeaux qui attraperont une étincelle facilement même en conditions humides. Vous rassemblez de l'amadou sec (aiguilles de pin, écorce) sous l'arbre, construisez un foyer en tipi avec du petit bois et l'allumez. Les bâtons à plumes prennent, le petit bois suit, et bientôt vous avez un feu chaud et crépitant. Le triangle du feu est satisfait : l'air circule à travers le tipi, la chaleur se construit depuis l'amadou, et votre combustible est prêt."

translations[missing[70]] = "Vous empilez de grandes bûches et essayez de les allumer directement. Mais les bûches sont la DERNIÈRE étape de combustible — elles ne prendront pas depuis une petite flamme. Vous avez d'abord besoin d'amadou et de petit bois pour construire assez de chaleur. Le triangle du feu a besoin des trois éléments dans la bonne proportion. Commencer avec du gros bois de chauffage viole l'ordre du combustible et votre feu ne prend jamais. Commencez petit : amadou, puis petit bois, puis combustible de bois."

translations[missing[71]] = "Vous commencez à ramasser du bois de chauffage en panique, mais sans réfléchir d'abord à votre situation, vous choisissez un mauvais emplacement et peinez à l'allumer dans les conditions humides. Agir avant de réfléchir conduit à des erreurs. S.T.O.P. — Asseoir, Réfléchir, Observer, PUIS Planifier. Le feu viendra plus tard."

translations[missing[72]] = "Vous commencez à courir à travers la forêt, mais sans une direction claire, vous ne faites que vous désorienter davantage. Courir quand on est perdu conduit à l'épuisement, aux blessures et plus profondément dans un terrain inconnu. Vous vous arrêtez, essoufflé et plus perdu qu'avant. N'oubliez pas : le S de S.T.O.P. signifie S'ASSEOIR d'abord."

translations[missing[73]] = "Vous restez dans votre abri, espérant que l'aéronef repérera votre camp. Mais depuis les airs, un petit abri dans la forêt est presque invisible. L'aéronef passe sans rien voir. Vous avez manqué une opportunité de sauvetage critique. Quand vous entendez ou voyez des sauveteurs potentiels, vous devez SIGNALER ACTIVEMENT — le signal de détresse universel est trois de n'importe quoi. L'attente passive ne vous fait pas secourir."

translations[missing[74]] = "Vous marchez en cercles de plus en plus grands, mais la forêt se ressemble partout et vous risquez de vous perdre encore plus. Au moment où vous abandonnez, la majeure partie de votre lumière du jour est partie et vous n'avez pas d'abri. La procédure S.T.O.P. dit de rester sur place une fois que vous réalisez que vous êtes perdu. Les sauveteurs fouillent votre dernière zone connue."

translations[missing[75]] = "Vous randonniez avec votre groupe de cadets lorsque vous avez pris un mauvais virage à une jonction de sentier. Maintenant le sentier a disparu, la forêt se ressemble dans toutes les directions, et le soleil se couche. Votre cœur bat fort. C'est le moment qui détermine si vous survivez — que faites-vous EN PREMIER ?"

translations[missing[76]] = "Votre abri est construit et vous êtes à l'abri du vent, mais la température baisse vite. Vous avez besoin d'un feu pour la chaleur, le moral et comme signal potentiel. Vous avez votre briquet et trouvé des matériaux secs sous un pin. Le bois est humide à l'extérieur à cause de la pluie qui approche. Comment allez-vous construire votre feu ?"

with open('fr_long_51_76.json', 'w', encoding='utf-8') as f:
    json.dump(translations, f, ensure_ascii=False, indent=2)

print(f"Generated {len(translations)} translations (indices 51-76)")
loaded = json.load(open('fr_long_51_76.json'))
print(f"Verified: {len(loaded)} entries loaded successfully")
