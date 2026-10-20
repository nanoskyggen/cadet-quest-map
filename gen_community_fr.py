#!/usr/bin/env python3
"""
Generate French translations for community_training.js and community_training.html
and append them to translations_fr.js

This script produces all community_ prefixed translation keys used by the
applyI18n() function in community_training.js, plus all data-i18n HTML strings.
"""

translations = {}

# ==========================================================
# HTML data-i18n strings (static text in community_training.html)
# ==========================================================
translations["Operation Civic Heart — Community Service Training"] = "Opération Civic Heart — Formation Service Communautaire"
translations["CIVIC HEART COMMAND"] = "COMMANDAMENT CIVIC HEART"
translations["Community Service Project"] = "Projet de Service Communautaire"
translations["Rank"] = "Grade"
translations["Badges"] = "Insignes"
translations["← Back to Red Star Map"] = "← Retour à la Carte Étoile Rouge"
translations["Service Recruit"] = "Recrue de Service"
translations["CALLSIGN: CIVIC-1"] = "INDICATIF: CIVIC-1"
translations["0 / 300 XP"] = "0 / 300 XP"
translations["Operations"] = "Opérations"
translations["Command"] = "Commandement"
translations["Training"] = "Formation"
translations["Missions"] = "Missions"
translations["Analysis"] = "Analyse"
translations["SITREP"] = "SITREP"
translations["Ranks"] = "Grades"
translations["Learn"] = "Bibliothèque"
translations["Project Command"] = "Commandement Projet"
translations["▸ Command Overview"] = "▸ Aperçu du Commandement"
translations["Civic Heart Mission Control"] = "Contrôle de Mission Civic Heart"
translations["Welcome to Operation Civic Heart. Your Community Service Project training covers the full cycle of planning and leading a cadet community engagement activity — from writing a project plan and conducting a risk assessment, to communicating with civilian organisations, executing the event, and leading a reflective debrief. You will master project planning fundamentals, risk management for off-base activities, professional communication protocols, and the leadership skills needed to guide a team through a real community service project. Complete training modules to earn XP, climb the rank ladder, and file your project SITREPs."] = "Bienvenue à l'Opération Civic Heart. Votre formation sur le Projet de Service Communautaire couvre tout le cycle de planification et de direction d'une activité d'engagement communautaire des cadets — de la rédaction d'un plan de projet et de la conduite d'une évaluation des risques, à la communication avec les organisations civiles, à l'exécution de l'événement et à la direction d'un debriefing réflexif. Vous maîtriserez les principes fondamentaux de la planification de projet, la gestion des risques pour les activités hors base, les protocoles de communication professionnelle et les compétences en leadership nécessaires pour guider une équipe dans un véritable projet de service communautaire. Complétez les modules de formation pour gagner des XP, gravir l'échelon des grades et déposer vos SITREP de projet."
translations["Missions Complete"] = "Missions Complétées"
translations["of 8"] = "sur 8"
translations["Total XP"] = "XP Total"
translations["+300 to next rank"] = "+300 au grade suivant"
translations["SITREPs Filed"] = "SITREP Déposés"
translations["Filing recommended"] = "Dépôt recommandé"
translations["Badges Earned"] = "Insignes Gagnés"
translations["OPERATION CIVIC HEART"] = "OPÉRATION CIVIC HEART"
translations["ACTIVE"] = "ACTIF"
translations["RED STAR COMMUNITY PHASE"] = "PHASE COMMUNAUTAIRE ÉTOILE ROUGE"
translations["Current Operation: Community Service Project"] = "Opération Actuelle: Projet de Service Communautaire"
translations["Your community service instructor has cleared you to begin the Community Service Project training rotation. Work through each performance objective in sequence. Each mission is a hands-on project simulation — you will write project plans, conduct risk assessments, draft professional communications, allocate resources, respond to unexpected events, and lead debriefs just like a real cadet planning and executing a community engagement activity."] = "Votre instructeur de service communautaire vous a autorisé à commencer la rotation de formation du Projet de Service Communautaire. Traversez chaque objectif de performance en séquence. Chaque mission est une simulation de projet pratique — vous rédigerez des plans de projet, mènerez des évaluations des risques, rédigerez des communications professionnelles, répartirez des ressources, réagirez à des événements imprévus et dirigerez des debriefings tout comme un vrai cadet planifiant et exécutant une activité d'engagement communautaire."
translations["Project Risk Assessment"] = "Évaluation des Risques du Projet"
translations["Community service project risks cadets must manage during planning and execution. Risk levels update as you progress."] = "Risques du projet de service communautaire que les cadets doivent gérer durant la planification et l'exécution. Les niveaux de risque se mettent à jour à mesure que vous progressez."
translations["SAFE"] = "SÉCURITAIRE"
translations["CAUTION"] = "PRUDENCE"
translations["HIGH"] = "ÉLEVÉ"
translations["Weather Cancellation"] = "Annulation Météo"
translations["Outdoor community events are vulnerable to weather. Always have a contingency plan and monitor forecasts."] = "Les événements communautaires en plein air sont vulnérables à la météo. Ayez toujours un plan de contingence et surveillez les prévisions."
translations["First Aid Coverage"] = "Couverture Premiers Soins"
translations["Off-base activities require a qualified first aid attendant and an emergency response plan."] = "Les activités hors base nécessitent un secouriste qualifié et un plan d'intervention d'urgence."
translations["Volunteer No-Shows"] = "Absences de Bénévoles"
translations["Cadet volunteers may cancel last-minute. Recruit backup volunteers and build flexibility into your task schedule."] = "Les bénévoles cadets peuvent annuler à la dernière minute. Recrutez des bénévoles de remplacement et intégrez de la flexibilité dans votre horaire de tâches."
translations["Communication Gaps"] = "Lacunes de Communication"
translations["Miscommunication with the civilian organisation can derail the project. Confirm all details in writing."] = "Une mauvaise communication avec l'organisation civile peut faire dérailler le projet. Confirmez tous les détails par écrit."
translations["Incomplete Risk Assessment"] = "Évaluation des Risques Incomplète"
translations["Failing to identify hazards before the activity puts the team at risk. Conduct a thorough risk assessment."] = "Ne pas identifier les dangers avant l'activité met l'équipe en danger. Menez une évaluation des risques approfondie."
translations["MED"] = "MOY"
translations["LOW"] = "FAIBLE"
translations["▸ Training Modules"] = "▸ Modules de Formation"
translations["Community Service Training Pathway"] = "Parcours de Formation Service Communautaire"
translations["The Community Service Project training pathway is built in sequence following the Red Star community service syllabus (PO X02). Each module teaches core project planning and leadership knowledge and then tests it with a hands-on simulation. Complete modules in order to unlock the next."] = "Le parcours de formation du Projet de Service Communautaire est conçu en séquence selon le programme de service communautaire de l'Étoile Rouge (PO X02). Chaque module enseigne les connaissances fondamentales de planification de projet et de leadership, puis les met à l'épreuve avec une simulation pratique. Complétez les modules dans l'ordre pour débloquer le suivant."
translations["▸ Mission Simulator"] = "▸ Simulateur de Mission"
translations["Select a Mission"] = "Sélectionner une Mission"
translations["Choose a training module from the Training tab, or pick a mission below to enter the simulator."] = "Choisissez un module de formation dans l'onglet Formation, ou sélectionnez une mission ci-dessous pour entrer dans le simulateur."
translations["▸ Performance Analysis"] = "▸ Analyse de Performance"
translations["Community Service Performance Dashboard"] = "Tableau de Bord Performance Service Communautaire"
translations["Track your progress across community service training modules. XP is awarded for completing mission tasks correctly. Wrong attempts reduce your mission score but you can retry."] = "Suivez votre progression à travers les modules de formation de service communautaire. Les XP sont attribués pour avoir complété correctement les tâches de mission. Les mauvaises tentatives réduisent votre score de mission, mais vous pouvez réessayer."
translations["Module Progress"] = "Progression des Modules"
translations["Rank Progress"] = "Progression du Grade"
translations["Next Rank"] = "Grade Suivant"
translations["XP to Next"] = "XP au Suivant"
translations["Overall Statistics"] = "Statistiques Globales"
translations["Tasks Completed"] = "Tâches Complétées"
translations["Total Attempts"] = "Tentatives Totales"
translations["Wrong Attempts"] = "Mauvaises Tentatives"
translations["Accuracy"] = "Précision"
translations["Current Streak"] = "Séquence Actuelle"
translations["Best Streak"] = "Meilleure Séquence"
translations["Mission XP Chart"] = "Graphique XP des Missions"
translations["▸ Project Reports"] = "▸ Rapports de Projet"
translations["SITREP Filing"] = "Dépôt de SITREP"
translations["A Situation Report (SITREP) is how cadets communicate project status to their instructor. File a SITREP after each mission to log what you learned and any project risks you identified during planning and execution."] = "Un rapport de situation (SITREP) est la manière dont les cadets communiquent le statut du projet à leur instructeur. Déposez un SITREP après chaque mission pour enregistrer ce que vous avez appris et tout risque de projet que vous avez identifié durant la planification et l'exécution."
translations["Mission Reference"] = "Référence de Mission"
translations["Select a completed mission…"] = "Sélectionner une mission complétée…"
translations["Overall Status"] = "Statut Global"
translations["Choose status…"] = "Choisir un statut…"
translations["NOMINAL — All objectives met"] = "NOMINAL — Tous les objectifs atteints"
translations["MINOR HAZARD — Completed with project issues"] = "RISQUE MINEUR — Complété avec des problèmes de projet"
translations["ABORTED — Mission not completed"] = "ABANDONNÉE — Mission non complétée"
translations["Summary of Events"] = "Résumé des Événements"
translations["No SITREPs filed yet. Complete a mission and file your first report."] = "Aucun SITREP déposé pour l'instant. Complétez une mission et déposez votre premier rapport."
translations["▸ Rank Progression"] = "▸ Progression des Grades"
translations["Community Service Rank Ladder"] = "Échelle des Grades Service Communautaire"
translations["As you complete community service training modules and earn XP, you advance through the service ranks. Each rank unlocks new leadership responsibilities and recognition in the community."] = "À mesure que vous complétez les modules de formation de service communautaire et gagnez des XP, vous avancez dans les grades de service. Chaque grade débloque de nouvelles responsabilités de leadership et une reconnaissance dans la communauté."
translations["▸ Learning Library"] = "▸ Bibliothèque d'Apprentissage"
translations["Community Service Knowledge Base"] = "Base de Connaissances Service Communautaire"
translations["Reference materials covering the theory behind each community service training module from the Red Star community service syllabus (PO X02). Read these before or after missions to deepen your understanding of project planning, risk assessment, civilian communication, and debrief leadership. Reading articles also earns a small XP bonus."] = "Matériel de référence couvrant la théorie derrière chaque module de formation de service communautaire du programme de service communautaire de l'Étoile Rouge (PO X02). Lisez-les avant ou après les missions pour approfondir votre compréhension de la planification de projet, de l'évaluation des risques, de la communication civile et du leadership de debriefing. La lecture d'articles rapporte aussi un petit bonus d'XP."
translations["▸ Project Command Center"] = "▸ Centre de Commandement Projet"
translations["Project Command Center — Community Service Simulator"] = "Centre de Commandement Projet — Simulateur de Service Communautaire"
translations["You are the cadet project leader for a community clean-up event. The Project Command Center is a multi-stage interactive simulator that tests everything you have learned about planning and leading a community service project. Make the right decisions at each stage — define the project scope, write the plan, conduct a risk assessment, communicate with the civilian partner, allocate resources, respond to events on event day, and lead the debrief. Every choice affects your project success meters. Complete all stages successfully to earn the Project Command badge. Toggle on the community spirit music for an inspiring atmosphere."] = "Vous êtes le chef de projet cadet pour un événement de nettoyage communautaire. Le Centre de Commandement Projet est un simulateur interactif multi-étapes qui met à l'épreuve tout ce que vous avez appris sur la planification et la direction d'un projet de service communautaire. Prenez les bonnes décisions à chaque étape — définissez la portée du projet, rédigez le plan, menez une évaluation des risques, communiquez avec le partenaire civil, répartissez les ressources, réagissez aux événements le jour J et dirigez le debriefing. Chaque choix affecte vos indicateurs de réussite du projet. Complétez toutes les étapes avec succès pour gagner l'insigne du Commandement Projet. Activez la musique d'esprit communautaire pour une atmosphère inspirante."
translations["Community Spirit Music"] = "Musique d'Esprit Communautaire"
translations["Click to toggle uplifting community service atmosphere"] = "Cliquez pour activer l'atmosphère inspirante du service communautaire"

# Placeholder translation
translations["Summarise what happened during the community service mission. Include any risks identified and lessons learned. (Min 20 characters)"] = "Résumez ce qui s'est passé durant la mission de service communautaire. Incluez tout risque identifié et les leçons apprises. (Min 20 caractères)"

# ==========================================================
# RANKS — community_rank_{id}_name and community_rank_{id}_callsign
# ==========================================================
rank_data = [
    (0, "Service Recruit", "CIVIC-1"),
    (1, "Service Cadet", "HEART-2"),
    (2, "Senior Service Cadet", "SENIOR-3"),
    (3, "Project Leader Cadet", "LEAD-4"),
    (4, "Community Commander Cadet", "CMDR-5"),
    (5, "Civic Heart Master", "MASTER-6"),
]
rank_fr = [
    (0, "Recrue de Service", "CIVIC-1"),
    (1, "Cadet de Service", "HEART-2"),
    (2, "Cadet de Service Senior", "SENIOR-3"),
    (3, "Cadet Chef de Projet", "LEAD-4"),
    (4, "Cadet Commandant Communautaire", "CMDR-5"),
    (5, "Maître Civic Heart", "MASTER-6"),
]
for i, (rid, name, callsign) in enumerate(rank_data):
    translations[f"community_rank_{rid}_name"] = rank_fr[i][1]
    translations[f"community_rank_{rid}_callsign"] = rank_fr[i][2]

# ==========================================================
# TOOLS — community_tool_{id}
# ==========================================================
tool_fr = {
    "projectplan": "Plan de Projet",
    "riskassess": "Formulaire d'Évaluation des Risques",
    "contactsheet": "Fiche de Contacts",
    "emaildraft": "Brouillon de Courriel",
    "timeline": "Calendrier de Projet",
    "resourceplan": "Plan de Ressources",
    "volunteerlist": "Liste des Bénévoles",
    "budgetsheet": "Feuille de Budget",
    "firstaidkit": "Trousse de Premiers Soins",
    "commsplan": "Plan de Communication",
    "contingency": "Plan de Contingence",
    "debriefform": "Formulaire de Debriefing",
    "feedbackform": "Formulaire de Rétroaction",
    "sitrepform": "Formulaire SITREP",
}
tool_en = {
    "projectplan": "Project Plan",
    "riskassess": "Risk Assessment Form",
    "contactsheet": "Contact Sheet",
    "emaildraft": "Email Draft",
    "timeline": "Project Timeline",
    "resourceplan": "Resource Plan",
    "volunteerlist": "Volunteer Roster",
    "budgetsheet": "Budget Sheet",
    "firstaidkit": "First Aid Kit",
    "commsplan": "Communications Plan",
    "contingency": "Contingency Plan",
    "debriefform": "Debrief Form",
    "feedbackform": "Feedback Form",
    "sitrepform": "SITREP Form",
}
for tid in tool_en:
    translations[f"community_tool_{tid}"] = tool_fr[tid]

# ==========================================================
# MISSIONS — community_mission_{id}_{field} and tasks
# ==========================================================
# Each mission: title, desc, brief, then per-task: prompt, options text+fb, items, task fb
missions_fr = {
    "cs_scope": {
        "title": "Définir la Portée du Projet",
        "desc": "Apprendre à identifier un besoin communautaire, sélectionner une activité de service appropriée et définir des objectifs de projet clairs.",
        "brief": "Votre instructeur de service communautaire présente la première étape de tout projet de service communautaire: définir la portée. Avant de planifier quoi que ce soit, vous devez identifier un véritable besoin communautaire, choisir une activité qui correspond aux capacités de votre corps de cadets et rédiger des objectifs clairs utilisant les critères SMART — Spécifique, Mesurable, Atteignable, Pertinent et Temporellement défini. Une portée bien définie prévient la dérive de la portée et garantit que votre projet apporte une véritable valeur à la communauté.",
        "tasks": [
            {
                "prompt": "Votre corps de cadets veut réaliser un projet de service communautaire. Quelle est la PREMIÈRE étape que vous devriez franchir pour définir la portée du projet?",
                "options": [
                    "Identifier un véritable besoin communautaire en faisant des recherches et en parlant aux membres de la communauté",
                    "Établir un budget et déterminer combien d'argent vous pouvez dépenser",
                    "Recruter des bénévoles et leur assigner des tâches",
                    "Choisir une date et établir le calendrier du projet",
                ],
                "options_fb": [
                    "Correct! Avant de planifier quoi que ce soit, vous devez identifier ce dont la communauté a réellement besoin. Cela signifie rechercher les problèmes locaux, parler aux organisations communautaires et comprendre où votre corps de cadets peut avoir un véritable impact. Commencer par un besoin véritable garantit que votre projet apporte de la valeur.",
                    "Le budget est important mais il vient plus tard. Vous devez savoir ce qu'est le projet AVANT de pouvoir en établir le budget. Commencez par identifier le besoin communautaire.",
                    "Le recrutement de bénévoles vient après avoir défini ce qu'est le projet. Si vous recrutez avant de définir la portée, vous risquez d'avoir les mauvaises personnes pour le mauvais projet. Commencez par le besoin communautaire.",
                    "Fixer une date fait partie de la planification, mais vous devez d'abord savoir ce qu'est le projet. La portée détermine le calendrier, non l'inverse. Commencez par identifier le besoin communautaire.",
                ],
                "items": [
                    "Rechercher les besoins communautaires et parler aux organisations locales",
                    "Sélectionner une activité qui correspond aux capacités de votre corps",
                    "Rédiger des objectifs SMART pour le projet",
                    "Définir les critères de réussite pour mesurer les résultats",
                ],
                "fb": "",
            },
            {
                "prompt": "Vous avez identifié que le parc local a un problème de déchets. Lequel des énoncés suivants est un objectif SMART pour un projet de nettoyage communautaire?",
                "options": [
                    "Nettoyer le Parc Riverside le samedi 15 mai, avec 12 cadets, en collectant un minimum de 20 sacs de déchets sur le sentier et les aires de pique-nique",
                    "Améliorer l'apparence du parc",
                    "Nettoyer tous les parcs de la ville",
                    "Ramasser des déchets quand nous aurons le temps",
                ],
                "options_fb": [
                    "Correct! Cet objectif est Spécifique (Parc Riverside, sentier et aires de pique-nique), Mesurable (20 sacs de déchets, 12 cadets), Atteignable (12 cadets peuvent le faire), Pertinent (adresse le problème de déchets) et Temporellement défini (samedi 15 mai). C'est un objectif SMART modèle.",
                    "Ceci est trop vague. «Améliorer» n'est pas mesurable — comment saurez-vous quand ce sera atteint? Un objectif SMART nécessite des critères spécifiques et mesurables.",
                    "Ceci n'est pas atteignable pour un seul corps de cadets. Les objectifs SMART doivent être Atteignables — cette portée est beaucoup trop vaste pour votre équipe.",
                    "Ceci n'est ni temporellement défini ni spécifique. «Quand nous aurons le temps» n'a pas d'échéance, et «des déchets» n'est pas mesurable. Les objectifs SMART nécessitent des critères concrets.",
                ],
                "items": [],
                "fb": "",
            },
            {
                "prompt": "",  # order task - prompt translated separately
                "options": [],
                "options_fb": [],
                "items": [
                    "Rechercher les besoins communautaires et parler aux organisations locales",
                    "Sélectionner une activité qui correspond aux capacités de votre corps",
                    "Rédiger des objectifs SMART pour le projet",
                    "Définir les critères de réussite pour mesurer les résultats",
                ],
                "fb": "",
            },
            {
                "prompt": "Votre corps de cadets a 15 membres et 4 heures disponibles un samedi. Quelle portée de projet est la plus appropriée?",
                "options": [
                    "Nettoyer un tronçon de sentier riverain de 2 km avec 12 cadets en 3 heures, laissant 1 heure pour l'installation et le debriefing",
                    "Rénover tout l'édifice du centre communautaire en un après-midi",
                    "Planter 500 arbres dans 3 parcs différents de la ville",
                    "Résoudre le problème d'itinérance de la ville",
                ],
                "options_fb": [
                    "Correct! Cette portée est atteignable pour 15 cadets en 4 heures. Elle tient compte du temps d'installation et de debriefing, utilise la majeure partie de l'équipe et a une zone définie. C'est un projet réaliste et bien délimité.",
                    "Ceci n'est pas atteignable pour 15 cadets en 4 heures. La rénovation d'un bâtiment nécessite des compétences professionnelles, de l'équipement et des semaines de travail. La portée dépasse de loin les capacités de votre corps.",
                    "Ceci est trop ambitieux pour 15 cadets en 4 heures. Des endroits multiples dispersent votre équipe et 500 arbres est un très grand nombre. La portée dépasse vos ressources.",
                    "Ceci est un enjeu sociétal bien au-delà d'un seul projet de corps de cadets. Les objectifs SMART doivent être Atteignables — cette portée est complètement irréaliste pour votre équipe.",
                ],
                "items": [],
                "fb": "",
            },
        ],
    },
    "cs_plan": {
        "title": "Rédiger le Plan de Projet",
        "desc": "Décomposer le projet en tâches, assigner les responsabilités, créer un calendrier et élaborer un plan de ressources.",
        "brief": "Avec la portée définie, votre instructeur vous guide à travers la rédaction d'un plan de projet détaillé. Un bon plan de projet décompose l'activité en tâches spécifiques, assigne chaque tâche à un membre de l'équipe ou à un sous-groupe, crée un calendrier avec des jalons et identifie toutes les ressources requises — matériel, équipement, transport et personnel. Le plan est votre feuille de route: sans lui, des tâches sont oubliées, les délais glissent et les ressources manquent. Vous apprendrez la décomposition des tâches, l'assignation des responsabilités avec une approche RACI simple et la construction de calendrier.",
        "tasks": [
            {
                "prompt": "Vous planifiez le nettoyage du Parc Riverside. Quelle est la meilleure approche pour décomposer le projet en tâches?",
                "options": [
                    "Décomposer le projet en phases (installation, exécution, nettoyage, debriefing) puis lister les tâches spécifiques sous chaque phase",
                    "Écrire une seule tâche: «Nettoyer le parc» et laisser le reste à l'équipe le jour même",
                    "Lister 50 micro-tâches sans regroupement ni structure",
                    "Sauter la liste de tâches et improviser au fur et à mesure",
                ],
                "options_fb": [
                    "Correct! Décomposer le projet en phases d'abord, puis lister les tâches spécifiques sous chaque phase, crée une liste de tâches organisée et complète. Cela garantit que rien n'est oublié et que le flux de travail est logique. Par exemple: la phase d'installation inclut la collecte du matériel et le brevetage de sécurité; l'exécution inclut la collecte et le tri des déchets.",
                    "Une seule tâche vague n'est pas un plan. Sans sous-tâches spécifiques, les membres de l'équipe ne sauront pas quoi faire, des choses seront oubliées et le projet sera désorganisé. Décomposez-le en phases et tâches spécifiques.",
                    "Bien que détaillée, 50 micro-tâches non regroupées sont écrasantes et difficiles à gérer. Le regroupement des tâches en phases rend le plan lisible et exploitable. La structure importe autant que le détail.",
                    "Improviser mène à des tâches oubliées, des bénévoles confus et un échec du projet. Un plan de projet avec des tâches structurées est essentiel pour une activité de service communautaire réussie.",
                ],
                "items": [],
                "fb": "",
            },
            {
                "prompt": "",  # order task
                "options": [],
                "options_fb": [],
                "items": [
                    "Planification et Préparation (semaines avant)",
                    "Brevetage des Bénévoles et Installation (matin de l'événement)",
                    "Exécution — Collecte des Déchets (jour de l'événement)",
                    "Nettoyage, Debriefing et Documentation (fin de l'événement)",
                ],
                "fb": "",
            },
            {
                "prompt": "Lequel des énoncés suivants est la liste de ressources la plus complète pour le nettoyage du Parc Riverside?",
                "options": [
                    "Sacs poubelle, gants, pinces à déchets, trousse de premiers soins, désinfectant pour les mains, eau pour les bénévoles, transport, feuille de présence, gilets haute-visibilité",
                    "Sacs poubelle",
                    "Argent pour la pizza afterward",
                    "Sacs poubelle et gants",
                ],
                "options_fb": [
                    "Correct! Ceci est une liste de ressources complète couvrant le matériel (sacs, gants, pinces), la sécurité (trousse de premiers soins, désinfectant, gilets), le soutien du personnel (eau), la logistique (transport) et l'administration (feuille de présence). Un plan de ressources approfondi anticipe chaque besoin.",
                    "Ceci est beaucoup trop incomplet. Vous avez besoin de gants pour la sécurité, d'une trousse de premiers soins pour les urgences, d'eau pour les bénévoles et de bien d'autres articles. Une liste d'une seule ressource vous laissera non préparé le jour de l'événement.",
                    "La nourriture post-événement est un avantage secondaire mais ce n'est pas la liste de ressources principale. Vous avez besoin de fournitures opérationnelles, d'équipement de sécurité et de soutien logistique. Planifiez d'abord les besoins du projet.",
                    "Ceci est mieux qu'un seul article mais encore incomplet. Il manque une trousse de premiers soins (exigence de sécurité), de l'eau (bien-être des bénévoles), des pinces à déchets (efficacité), des gilets haute-visibilité (visibilité) et une feuille de présence (administration).",
                ],
                "items": [],
                "fb": "",
            },
            {
                "prompt": "Vous avez 12 bénévoles pour le nettoyage. Comment devriez-vous assigner les responsabilités?",
                "options": [
                    "Assigner des rôles spécifiques: 2 chefs d'équipe, 8 collecteurs en 2 équipes de 4, 1 secouriste, 1 coordonnateur logistique",
                    "Dire à tout le monde de prendre un sac et de commencer à ramasser les déchets",
                    "Assigner les 12 personnes comme chefs d'équipe",
                    "Rendre une seule personne responsable de tout",
                ],
                "options_fb": [
                    "Correct! Ceci assigne des rôles clairs avec une chaîne de commandement (chefs d'équipe), divise les travailleurs en équipes gérables (2 équipes de 4), assure la couverture de sécurité (secouriste) et gère la logistique (coordonnateur). Chaque bénévole connaît son rôle et sa responsabilité.",
                    "Sans rôles assignés, il n'y a pas d'organisation, pas de couverture de sécurité, personne pour suivre les progrès et personne pour gérer la logistique. Les bénévoles seront confus et le projet sera inefficace.",
                    "Si tout le monde est chef, personne ne fait le travail. Vous avez besoin d'un mélange de chefs et de travailleurs. 2 chefs d'équipe guidant 8 collecteurs est une bien meilleure structure.",
                    "Une seule personne ne peut pas gérer la sécurité, la logistique et la collecte de déchets simultanément. La répartition des responsabilités dans l'équipe garantit que tous les domaines sont couverts et que personne n'est débordé.",
                ],
                "items": [],
                "fb": "",
            },
        ],
    },
    "cs_risk": {
        "title": "Mener une Évaluation des Risques",
        "desc": "Identifier les dangers, évaluer les niveaux de risque et mettre en œuvre des mesures de contrôle pour une activité communautaire hors base.",
        "brief": "La sécurité est la priorité absolue de toute activité de cadets hors base. Votre instructeur vous enseigne comment mener une évaluation formelle des risques avant l'événement de service communautaire. Le processus comporte quatre étapes: identifier les dangers (qu'est-ce qui pourrait mal tourner?), évaluer le niveau de risque (quelle probabilité et quelle gravité?), mettre en œuvre des mesures de contrôle (comment réduire le risque?) et documenter le plan. Les dangers pour un nettoyage de parc incluent les objets tranchants, la météo, la circulation, le terrain inégal et les conditions médicales des bénévoles. Une évaluation des risques approfondie est obligatoire avant toute activité hors base.",
        "tasks": [
            {
                "prompt": "Vous menez une évaluation des risques pour le nettoyage du Parc Riverside. Quelle est la PREMIÈRE étape?",
                "options": [
                    "Identifier tous les dangers potentiels associés à l'activité et au lieu",
                    "Acheter de l'équipement de sécurité et le distribuer aux bénévoles",
                    "Remplir le formulaire d'évaluation des risques avec du texte générique standard",
                    "Faire en sorte qu'une ambulance soit en attente",
                ],
                "options_fb": [
                    "Correct! La première étape de toute évaluation des risques est l'identification des dangers. Parcourez le site, considérez l'activité et listez tout ce qui pourrait causer du tort: objets tranchants dans les déchets, terrain inégal, circulation près du parc, conditions météorologiques et conditions médicales des bénévoles. Vous ne pouvez pas contrôler des risques que vous n'avez pas identifiés.",
                    "L'équipement de sécurité est une mesure de contrôle, mais vous ne pouvez pas sélectionner le bon équipement avant d'avoir identifié les dangers. L'identification des dangers vient toujours en premier.",
                    "Une évaluation des risques générique est inutile. Chaque activité et chaque lieu a des dangers uniques. Vous devez réellement identifier les dangers spécifiques de votre événement à votre emplacement.",
                    "Une ambulance est une mesure d'intervention d'urgence, pas une première étape. Vous devez d'abord identifier les dangers, puis mettre en œuvre des contrôles préventifs, et seulement ensuite planifier l'intervention d'urgence. Commencez par l'identification des dangers.",
                ],
                "items": [],
                "fb": "",
            },
            {
                "prompt": "Vous identifiez que les bénévoles ramasseront des déchets pouvant contenir du verre brisé et du métal tranchant. En utilisant la matrice des risques (probabilité × gravité), quel est le niveau de risque et le contrôle appropriés?",
                "options": [
                    "Risque élevé — contrôler avec des gants robustes, des pinces à déchets, aucun contact manuel avec les objets tranchants et un contenant pour objets pointus",
                    "Risque faible — dire simplement aux bénévoles d'être prudents",
                    "Risque moyen — annuler la collecte de déchets et faire de l'aménagement paysager à la place",
                    "Aucun risque — les bénévoles sauront éviter les objets tranchants",
                ],
                "options_fb": [
                    "Correct! Les objets tranchants dans les déchets sont un risque élevé (probable de se produire, blessure modérée à grave). La hiérarchie des contrôles dit: éliminer quand possible (utiliser des pinces pour que les mains ne touchent pas), protéger avec des EPI (gants robustes) et fournir une élimination adéquate (contenant pour objets pointus). C'est une stratégie de contrôle complète.",
                    "Dire aux gens d'«être prudents» n'est pas une mesure de contrôle. Les objets tranchants dans les déchets sont un risque élevé. Vous avez besoin de contrôles physiques: gants, pinces à déchets et procédures d'élimination appropriées. Les avertissements verbaux seuls ne réduisent pas adéquatement le risque.",
                    "Bien que l'élimination soit le sommet de la hiérarchie, vous n'avez pas besoin d'annuler toute l'activité. Le risque est gérable avec des contrôles appropriés (gants, pinces, contenant pour objets pointus). L'annulation n'est nécessaire que lorsque les risques ne peuvent pas être adéquatement contrôlés.",
                    "Ceci sous-estime complètement le danger. Les objets tranchants dans les déchets sont un risque réel et significatif. Supposer que les bénévoles vont simplement les éviter n'est pas une mesure de contrôle. Vous devez mettre en œuvre des contrôles physiques.",
                ],
                "items": [],
                "fb": "",
            },
            {
                "prompt": "",  # order task
                "options": [],
                "options_fb": [],
                "items": [
                    "Identifier les dangers associés à l'activité et au lieu",
                    "Évaluer le niveau de risque avec la matrice probabilité × gravité",
                    "Mettre en œuvre des mesures de contrôle pour réduire chaque risque",
                    "Documenter l'évaluation et breveter l'équipe avant l'événement",
                ],
                "fb": "",
            },
            {
                "prompt": "Les prévisions météorologiques indiquent une possibilité de pluie le jour de votre événement de nettoyage en plein air. Quelle est la meilleure approche pour gérer ce risque?",
                "options": [
                    "Surveiller les prévisions, préparer un plan de contingence pluie (alternative intérieure ou replanification), breveter les bénévoles sur l'équipement météo et fixer une heure de décision aller/non",
                    "L'ignorer — un peu de pluie n'a jamais fait de mal à personne",
                    "Annuler l'événement immédiatement puisque la pluie est possible",
                    "Espérer qu'il ne pleuve pas et gérer si ça arrive",
                ],
                "options_fb": [
                    "Correct! La météo est un risque commun pour les événements en plein air. La meilleure approche est multi-niveaux: surveiller les prévisions, préparer un plan de contingence, breveter les bénévoles sur ce qu'il faut apporter et fixer une heure de décision claire. Ceci montre une gestion des risques approfondie sans surréagir.",
                    "Ignorer le risque météo est dangereux et irresponsable. La pluie peut créer des conditions glissantes, réduire la visibilité et causer aux bénévoles de devenir froids et démoralisés. En tant que chef, vous devez planifier des contingences météo.",
                    "Annuler basé sur une possibilité de pluie est une surréaction. Les prévisions météo changent. L'approche correcte est de surveiller, préparer une contingence et prendre une décision aller/non plus près de la date de l'événement.",
                    "Espérer du beau temps n'est pas une stratégie de gestion des risques. Vous avez besoin d'un plan de contingence et d'un cadre de décision. En tant que chef de projet, vous devez être proactif, non réactif.",
                ],
                "items": [],
                "fb": "",
            },
        ],
    },
    "cs_comm": {
        "title": "Communiquer avec les Organisations Civiles",
        "desc": "Rédiger des courriels professionnels, faire des appels téléphoniques et confirmer les arrangements avec les organisations partenaires civiles.",
        "brief": "Les projets de service communautaire impliquent de travailler avec des organisations civiles — gouvernement local, groupes communautaires ou organismes de bienfaisance. Votre instructeur vous enseigne comment communiquer professionnellement avec ces partenaires. Cela signifie rédiger des courriels clairs et respectueux qui présentent votre corps, énoncent votre but et demandent un soutien spécifique. Cela signifie faire un suivi avec des appels téléphoniques, confirmer tous les arrangements par écrit et tenir un registre des contacts. La communication professionnelle instaure la confiance et garantit que le partenariat se déroule sans heurts.",
        "tasks": [
            {
                "prompt": "Vous devez envoyer un courriel au gestionnaire du Parc Riverside pour demander la permission de votre événement de nettoyage. Quelle ligne d'objet est la plus professionnelle?",
                "options": [
                    "Demande de Permission — Nettoyage Communautaire du Corps de Cadets au Parc Riverside, 15 mai",
                    "Hé! Est-ce qu'on peut faire un truc au parc?",
                    "URGENT!!!! BESOIN RÉPONSE ASAP!!!!",
                    "Courriel",
                ],
                "options_fb": [
                    "Correct! Cette ligne d'objet est claire, spécifique et professionnelle. Elle énonce le but (demande de permission), identifie le groupe (Corps de Cadets), décrit l'activité (nettoyage communautaire), nomme le lieu (Parc Riverside) et inclut la date (15 mai). Le destinataire sait immédiatement de quoi parle le courriel.",
                    "Ceci est beaucoup trop familier et vague pour une communication professionnelle. Un gestionnaire de parc doit savoir qui vous êtes, ce que vous voulez faire, où et quand. Utilisez une ligne d'objet claire et formelle.",
                    "Les majuscules et les points d'exclamation excessifs sont non professionnels. Ceci semble exigeant et ne donne aucune information sur la demande réelle. La communication professionnelle est calme, claire et respectueuse.",
                    "Cette ligne d'objet ne dit rien. Le destinataire ne peut pas prioriser ou catégoriser le courriel. Écrivez toujours une ligne d'objet descriptive qui résume le contenu.",
                ],
                "items": [],
                "fb": "",
            },
            {
                "prompt": "Vous avez un appel téléphonique avec le gestionnaire du parc qui accepte de fournir des sacs poubelle et d'organiser la collecte des déchets ramassés. Que devriez-vous faire immédiatement après l'appel?",
                "options": [
                    "Envoyer un courriel de suivi confirmant ce qui a été convenu: les sacs poubelle, l'arrangement de collecte, la date et tout autre détail discuté",
                    "Rien — ils ont dit oui au téléphone donc c'est réglé",
                    "Dire à vos bénévoles l'arrangement et passer à autre chose",
                    "Attendre au jour de l'événement pour voir s'ils s'en souviennent",
                ],
                "options_fb": [
                    "Correct! Après tout accord verbal, confirmez toujours par écrit. Ceci prévient les malentendus, crée un registre de ce qui a été convenu et donne aux deux parties une référence. Un courriel de suivi disant «Merci pour notre appel. Pour confirmer, vous fournirez...» est professionnel et essentiel.",
                    "Les accords verbaux sont facilement oubliés ou mal interprétés. Sans confirmation écrite, le gestionnaire du parc peut oublier les détails ou une mauvaise communication peut passer inaperçue. Confirmez toujours par écrit.",
                    "Bien que vous devriez informer vos bénévoles, vous devez aussi confirmer l'arrangement avec le gestionnaire du parc par écrit. Sans confirmation, l'accord peut ne pas être honoré le jour J. Documentez toujours les accords verbaux.",
                    "Espérer que le partenaire se souvienne n'est pas une stratégie. S'ils oublient les sacs poubelle ou la collecte des déchets, votre événement est en difficulté. Confirmez tout par écrit immédiatement après l'appel.",
                ],
                "items": [],
                "fb": "",
            },
            {
                "prompt": "",  # order task
                "options": [],
                "options_fb": [],
                "items": [
                    "Ligne d'objet — claire et descriptive",
                    "Salutation — formelle et respectueuse (Cher M./Mme Nom)",
                    "Corps — introduction, but, demande spécifique",
                    "Clôture — remerciement, signature avec coordonnées",
                ],
                "fb": "",
            },
            {
                "prompt": "Pourquoi est-il important de tenir un registre des contacts pour toutes les communications avec votre partenaire civil?",
                "options": [
                    "Il crée un registre de qui a dit quoi et quand, prévient la mauvaise communication et garantit que les suivis ne sont pas oubliés",
                    "Ce n'est pas important — vous pouvez tout mémoriser",
                    "C'est seulement nécessaire pour des raisons légales si quelque chose va mal",
                    "C'est seulement nécessaire si vous avez plus d'un partenaire",
                ],
                "options_fb": [
                    "Correct! Un registre des contacts suit chaque communication — courriels, appels, réunions — avec dates, sujets et résultats. Ceci prévient la mauvaise communication («nous n'avons jamais convenu de cela»), garantit que les suivis sont tracés et fournit une référence en cas de litige. C'est un outil fondamental de gestion de projet.",
                    "La mémoire humaine est peu fiable, surtout pour des projets de plusieurs semaines avec de multiples communications. Un registre des contacts garantit que rien n'est oublié et fournit une documentation objective. C'est un outil de projet essentiel.",
                    "Un registre des contacts n'est pas seulement pour la protection légale. C'est un outil actif de gestion de projet qui vous aide à suivre les progrès, faire le suivi des articles et prévenir la mauvaise communication tout au long du projet, pas seulement après les problèmes.",
                    "Même avec un seul partenaire, un registre des contacts est essentiel. De multiples courriels, appels et réunions se produisent au cours d'un projet, et les tracer prévient la mauvaise communication et les articles oubliés peu importe le nombre de partenaires.",
                ],
                "items": [],
                "fb": "",
            },
        ],
    },
    "cs_resources": {
        "title": "Répartir les Ressources et le Budget",
        "desc": "Gérer le budget du projet, répartir le matériel et l'équipement et coordonner le transport et la logistique.",
        "brief": "Chaque projet de service communautaire nécessite des ressources — matériel, équipement, transport et parfois un budget. Votre instructeur vous enseigne comment créer un plan de ressources qui tient compte de tout ce qui est nécessaire, estimer les coûts, répartir le matériel aux équipes et coordonner la logistique comme le transport vers et depuis le site de l'événement. Une bonne gestion des ressources signifie que votre équipe a ce dont elle a besoin, quand elle en a besoin, sans gaspillage ni pénurie. Vous apprendrez les bases de la budgétisation, de l'approvisionnement et de la coordination logistique.",
        "tasks": [
            {
                "prompt": "Vous créez un budget pour le nettoyage du Parc Riverside. Quelle approche est la plus responsable?",
                "options": [
                    "Lister tous les articles requis, estimer les coûts de chacun, totaliser le budget et identifier ce qui peut être donné versus acheté",
                    "Ne pas se soucier du budget — tout va s'arranger",
                    "Acheter l'équipement le plus cher pour être sûr",
                    "Demander à chaque bénévole d'apporter ses propres fournitures et ne rien dépenser",
                ],
                "options_fb": [
                    "Correct! Un budget responsable liste chaque article requis avec les coûts estimés, totalise le budget et identifie où vous pouvez économiser grâce aux dons. Plusieurs entreprises locales donneront des sacs poubelle, des gants ou de l'eau à un projet de service communautaire de cadets. Cette approche est approfondie et soucieuse des coûts.",
                    "Ignorer le budget mène à des coûts surprises, des fournitures manquantes et des problèmes financiers. Un chef de projet responsable estime les coûts et planifie le budget avant l'événement.",
                    "Acheter l'équipement le plus cher est du gaspillage. Les projets de service communautaire devraient être soucieux des coûts. Cherchez des dons, achetez ce qui est nécessaire à des prix raisonnables et évitez les dépenses inutiles.",
                    "Bien que les bénévoles puissent apporter certains articles personnels, compter entièrement sur eux est peu fiable. Certains oublieront ou apporteront des fournitures inadéquates. Le corps devrait fournir l'équipement de sécurité principal (gants, premiers soins) et le matériel clé.",
                ],
                "items": [],
                "fb": "",
            },
            {
                "prompt": "Vous avez besoin de 50 sacs poubelle, 15 paires de gants et de l'eau pour 12 bénévoles. Comment devriez-vous acquérir ces ressources?",
                "options": [
                    "Demander aux entreprises locales des dons de sacs poubelle et d'eau, acheter des gants avec les fonds du corps et confirmer que le gestionnaire du parc fournit les pinces à déchets",
                    "Tout acheter au prix de détail complet dans un quincaillerie",
                    "Demander à chaque bénévole d'acheter ses propres gants et sacs",
                    "Se présenter le jour J et espérer que quelqu'un apporte des fournitures",
                ],
                "options_fb": [
                    "Correct! Une approche mixte est intelligente: chercher des dons d'entreprises locales (plusieurs soutiendront un projet communautaire de cadets), acheter ce qui ne peut pas être donné et confirmer ce que l'organisation partenaire fournit. Ceci minimise les coûts tout en garantissant que toutes les ressources sont sécurisées.",
                    "Bien que ceci fonctionne, ce n'est pas l'approche la plus soucieuse des coûts. Plusieurs entreprises locales donneront des fournitures à un projet de service communautaire de cadets. Chercher des dons d'abord économise les fonds du corps et bâtit des relations communautaires.",
                    "Demander aux bénévoles d'acheter leurs propres fournitures crée un fardeau injuste et réduit la participation. Le corps devrait fournir les fournitures principales. Cherchez des dons ou utilisez les fonds du corps pour le matériel essentiel.",
                    "Ceci n'est pas de la planification de ressources — c'est espérer le mieux. Sans ressources sécurisées, votre événement peut ne pas se faire du tout. Acquérez toutes les fournitures avant le jour de l'événement.",
                ],
                "items": [],
                "fb": "",
            },
            {
                "prompt": "",  # order task
                "options": [],
                "options_fb": [],
                "items": [
                    "Lister toutes les ressources requises avec les quantités",
                    "Estimer les coûts et identifier les opportunités de dons",
                    "Acquérir les ressources par achat ou don",
                    "Distribuer les ressources aux équipes le jour de l'événement",
                ],
                "fb": "",
            },
            {
                "prompt": "Vous devez transporter 12 cadets et des fournitures au Parc Riverside. Quel est le plan de transport le plus sûr?",
                "options": [
                    "Organiser le transport du corps avec un conducteur qualifié, confirmer les ceintures de sécurité pour tous les passagers, planifier l'itinéraire et breveter le conducteur sur l'heure d'arrivée et le point de chargement",
                    "Faire conduire les cadets dans leurs véhicules personnels",
                    "Faire marcher tout le monde au parc en portant toutes les fournitures",
                    "Dire à tout le monde de trouver leur propre chemin",
                ],
                "options_fb": [
                    "Correct! Le transport sécuritaire nécessite un conducteur qualifié, des ceintures pour tout le monde, un itinéraire planifié et des instructions claires. Pour les activités de cadets, le transport doit suivre les politiques du corps incluant des conducteurs qualifiés et des véhicules appropriés. Planifier l'itinéraire et le calendrier prévient les retards.",
                    "Les cadets conduisant eux-mêmes n'est généralement pas permis pour les activités officielles de cadets et crée des problèmes de responsabilité. Le transport devrait être organisé par le corps avec des conducteurs qualifiés et des véhicules appropriés.",
                    "Marcher peut être faisable si le parc est très proche, mais porter toutes les fournitures (50 sacs poubelle, eau, équipement) à pied est impraticable. Organisez un transport approprié pour les bénévoles et les fournitures.",
                    "Le transport non coordonné mène à des arrivées tardives, des bénévoles perdus et des problèmes de sécurité. En tant que chef de projet, vous devriez organiser ou coordonner le transport pour garantir que tout le monde arrive sûrement et à l'heure.",
                ],
                "items": [],
                "fb": "",
            },
        ],
    },
    "cs_eventday": {
        "title": "Exécution le Jour de l'Événement",
        "desc": "Diriger le brevetage de sécurité, gérer les bénévoles, surveiller les progrès et réagir aux situations imprévues le jour de l'événement.",
        "brief": "Le jour de l'événement est arrivé. Votre instructeur vous guide à travers le leadership du jour J: mener un brevetage de sécurité avant le début du travail, gérer vos équipes de bénévoles, surveiller les progrès par rapport au plan et réagir aux situations imprévues. Le jour de l'événement est là où toute votre planification porte fruit — mais c'est aussi là où les choses tournent mal. Un bon chef reste calme, s'adapte aux changements, communique clairement et garde la sécurité comme priorité absolue tout au long de l'activité.",
        "tasks": [
            {
                "prompt": "Les bénévoles sont arrivés au Parc Riverside. Quelle est la PREMIÈRE chose que vous devriez faire avant le début du travail?",
                "options": [
                    "Mener un brevetage de sécurité couvrant les dangers, les mesures de contrôle, les procédures d'urgence, l'emplacement des premiers soins et le plan de communication",
                    "Distribuer les sacs poubelle et dire à tout le monde de commencer",
                    "Prendre une photo de groupe pour les réseaux sociaux",
                    "Prendre un café et discuter en attendant que tout le monde arrive",
                ],
                "options_fb": [
                    "Correct! Un brevetage de sécurité avant le début du travail est obligatoire. Couvrez les dangers identifiés (objets tranchants, terrain, circulation), les mesures de contrôle (gants, pinces, restez en équipes), les procédures d'urgence (qui appeler, où aller), l'emplacement du secouriste et le plan de communication (heures de vérification, contacts radio/téléphone). Aucun travail ne commence avant que la sécurité soit brevetée.",
                    "Commencer le travail sans brevetage de sécurité est dangereux et irresponsable. Les bénévoles ont besoin de connaître les dangers, les contrôles et les procédures d'urgence avant de commencer. Le brevetage de sécurité vient toujours en premier.",
                    "Une photo de groupe est sympa mais ce n'est pas la première priorité. La sécurité vient avant les photos. Menez le brevetage de sécurité d'abord, puis vous pourrez prendre des photos durant ou après l'événement.",
                    "Bien qu'attendre les retardataires soit parfois nécessaire, une fois votre équipe assemblée, la première action est le brevetage de sécurité. Ne retardez pas la sécurité pour le temps social.",
                ],
                "items": [],
                "fb": "",
            },
            {
                "prompt": "Durant le nettoyage, un de vos chefs d'équipe signale qu'un bénévole a trouvé une aiguille dans les déchets. Que devriez-vous faire?",
                "options": [
                    "Arrêter la collecte dans cette zone, faire utiliser le contenant pour objets pointants par le bénévole formé et rappeler à toutes les équipes d'utiliser des pinces à déchets et de ne pas toucher les objets tranchants à mains nues",
                    "Paniquer et évacuer tout le parc immédiatement",
                    "Dire au bénévole de simplement la jeter dans le sac poubelle avec le reste",
                    "L'ignorer — le bénévole peut s'en occuper lui-même",
                ],
                "options_fb": [
                    "Correct! Trouver une aiguille est exactement le genre de danger que votre évaluation des risques avait anticipé. Arrêtez le travail dans la zone, utilisez le contenant pour objets pointants pour une élimination sécuritaire et renforcez les mesures de contrôle (pinces à déchets, aucun contact manuel). C'est une réponse d'incident calme et efficace qui priorise la sécurité.",
                    "Paniquer et évacuer est une surréaction. Une seule aiguille est un danger gérable pour lequel votre évaluation des risques et vos contrôles ont été conçus. Utilisez le contenant pour objets pointants et renforcez les procédures. Restez calme en tant que chef.",
                    "Ceci est extrêmement dangereux. Une aiguille dans un sac poubelle peut perforer le sac et blesser quelqu'un plus tard. Les aiguilles doivent aller dans un contenant pour objets pointants. Ne jetez jamais d'objets pointants dans les ordures régulières.",
                    "En tant que chef de projet, vous êtes responsable de la sécurité des bénévoles. Ignorer une aiguille dangereuse est de la négligence. Arrêtez le travail, assurez une élimination sécuritaire et renforcez les mesures de contrôle.",
                ],
                "items": [],
                "fb": "",
            },
            {
                "prompt": "",  # order task
                "options": [],
                "options_fb": [],
                "items": [
                    "Mener le brevetage de sécurité et faire signer tous les bénévoles",
                    "Distribuer l'équipement et assigner les équipes aux zones",
                    "Surveiller les progrès et faire des vérifications périodiques",
                    "Collecter l'équipement, faire le nettoyage final et debriefer",
                ],
                "fb": "",
            },
            {
                "prompt": "Cela fait 90 minutes que le nettoyage a commencé et l'Équipe B est nettement en retard sur l'Équipe A. Quelle est la meilleure réponse de leadership?",
                "options": [
                    "Vérifier avec le chef de l'Équipe B, découvrir ce qui les ralentit et réaffecter des bénévoles de l'Équipe A au besoin pour équilibrer la charge de travail",
                    "Dire à l'Équipe B qu'ils doivent travailler plus vite et arrêter d'être paresseux",
                    "Ne rien faire — ils finiront bien par rattraper leur retard",
                    "Annuler la zone de l'Équipe B et leur dire de rentrer chez eux",
                ],
                "options_fb": [
                    "Correct! Un bon chef surveille les progrès et s'ajuste. Vérifiez avec le chef d'équipe pour comprendre le problème (peut-être que leur zone a plus de déchets ou un danger). Puis réaffectez les ressources — envoyez un ou deux bénévoles de l'Équipe A en avance pour aider. C'est du leadership adaptatif.",
                    "Réprimander les bénévoles est un terrible leadership. Il peut y avoir des raisons valables pour lesquelles l'Équipe B est en retard — plus de déchets, terrain difficile ou un danger. Un bon chef enquête et soutient, ne critique pas.",
                    "Ignorer un problème de progrès signifie que l'événement peut dépasser l'horaire ou l'Équipe B peut ne pas finir sa zone. Un chef surveille activement et s'ajuste pour garder le projet sur les rails.",
                    "Annuler une partie du projet à cause d'un retard mineur est une surréaction. Réaffectez simplement les ressources pour aider l'Équipe B à rattraper son retard. La résolution adaptive de problèmes est la clé du leadership du jour J.",
                ],
                "items": [],
                "fb": "",
            },
        ],
    },
    "cs_debrief": {
        "title": "Diriger le Debriefing",
        "desc": "Mener une revue après action structurée, recueillir la rétroaction, documenter les leçons apprises et réfléchir à l'impact communautaire.",
        "brief": "L'événement est terminé, mais le projet n'est pas complet. Votre instructeur vous enseigne comment diriger un debriefing — une revue après action où l'équipe réfléchit à ce qui a bien fonctionné, ce qui n'a pas fonctionné et ce qu'il faut améliorer la prochaine fois. Un bon debriefing est structuré, inclusif et honnête. Il célèbre les succès, identifie les leçons apprises et documente les recommandations pour les projets futurs. Le debriefing est aussi où vous réfléchissez à l'impact communautaire — avez-vous atteint vos objectifs? Comment la communauté a-t-elle bénéficié? Cette réflexion est ce qui transforme un événement unique en apprentissage durable.",
        "tasks": [
            {
                "prompt": "L'événement de nettoyage est terminé. Quand devriez-vous mener le debriefing?",
                "options": [
                    "Immédiatement après l'événement pendant que tout le monde est encore ensemble et que les souvenirs sont frais",
                    "Au prochain soir d'instruction des cadets une semaine plus tard",
                    "Un mois plus tard quand vous aurez le temps d'y réfléchir",
                    "Les debriefings sont optionnels — sautez-le si tout le monde est fatigué",
                ],
                "options_fb": [
                    "Correct! Le debriefing devrait se faire immédiatement après l'événement, pendant que les bénévoles sont encore ensemble et que leurs expériences sont fraîches dans leur esprit. Attendre des jours ou des semaines signifie que les détails sont oubliés et que l'équipe s'est dispersée. Un debriefing sur place capture la rétroaction la plus précise et utile.",
                    "Attendre une semaine signifie que les souvenirs s'estompent, les détails sont oubliés et certains bénévoles peuvent ne pas assister à la soirée d'instruction. Le debriefing devrait se faire immédiatement après l'événement pendant que les expériences sont fraîches.",
                    "Un mois plus tard c'est beaucoup trop long. D'ici là, la plupart des détails seront oubliés et la valeur d'apprentissage est grandement diminuée. Debriefez pendant que les souvenirs sont frais — immédiatement après l'événement.",
                    "Les debriefings sont essentiels, non optionnels. C'est là que l'équipe apprend de l'expérience et s'améliore pour la prochaine fois. Même un bref debriefing de 15 minutes est précieux. Ne le sautez pas.",
                ],
                "items": [],
                "fb": "",
            },
            {
                "prompt": "Quelle est la meilleure structure pour mener la discussion de debriefing?",
                "options": [
                    "Poser trois questions: Qu'est-ce qui a bien fonctionné? Qu'est-ce qui n'a pas bien fonctionné? Que devrions-nous faire différemment la prochaine fois? Donner à chacun une chance de parler",
                    "Lister tout ce qui a mal tourné et qui est à blâmer",
                    "Parler seulement de ce qui a bien fonctionné et sauter les problèmes",
                    "Laisser l'instructeur faire toute la conversation pendant que les bénévoles écoutent",
                ],
                "options_fb": [
                    "Correct! Cette structure à trois questions est un format classique de revue après action. Elle est simple, positive et constructive. «Qu'est-ce qui a bien fonctionné» célèbre les succès. «Qu'est-ce qui n'a pas bien fonctionné» identifie les problèmes sans blâme. «Que devrions-nous faire différemment» génère des améliorations exploitables. Donner à chacun une chance de parler garantit que toutes les perspectives sont entendues.",
                    "Un debriefing axé sur le blâme est contre-productif. Il rend les bénévoles sur la défensive, nuit au moral et décourage la participation future. Concentrez-vous sur ce qu'il faut améliorer, pas sur qui blâmer. Le debriefing devrait être constructif.",
                    "Discuter seulement des positifs signifie que vous manquez l'opportunité d'apprendre des erreurs. Un bon debriefing couvre à la fois les succès et les domaines à améliorer. La réflexion honnête est la clé de la croissance.",
                    "Une conférence unidirectionnelle n'est pas un debriefing. La valeur vient de l'écoute de toutes les perspectives — les bénévoles sur le terrain ont vu des choses que le chef n'a pas vues. Tout le monde devrait avoir une chance de parler.",
                ],
                "items": [],
                "fb": "",
            },
            {
                "prompt": "",  # order task
                "options": [],
                "options_fb": [],
                "items": [
                    "Rassembler l'équipe et expliquer le but du debriefing",
                    "Discuter de ce qui a bien fonctionné, ce qui n'a pas fonctionné et ce qu'il faut améliorer",
                    "Documenter les leçons apprises et les recommandations",
                    "Remercier l'équipe et réfléchir à l'impact communautaire",
                ],
                "fb": "",
            },
            {
                "prompt": "Pourquoi est-il important de réfléchir à l'impact communautaire durant le debriefing?",
                "options": [
                    "Cela relie l'équipe au but de leur service, renforce la valeur de l'engagement communautaire et motive la participation future",
                    "Ce n'est pas important — l'événement est terminé donc ça n'a pas d'importance",
                    "C'est seulement nécessaire pour faire rapport à l'organisme de financement",
                    "C'est seulement pour gagner des insignes et des récompenses",
                ],
                "options_fb": [
                    "Correct! Réfléchir à l'impact communautaire — combien de sacs de déchets ont été collectés, comment le parc a l'air maintenant, ce que la communauté a dit — relie les bénévoles au sens de leur travail. Ceci renforce la valeur de la citoyenneté et du service, bâtit la fierté du corps et motive les cadets à participer aux futurs projets communautaires. C'est la clé de voûte du cycle d'apprentissage.",
                    "Réfléchir à l'impact est l'une des parties les plus importantes du debriefing. C'est ce qui transforme une tâche en une expérience d'apprentissage. Comprendre le bénéfice communautaire renforce la valeur du service et motive la participation future.",
                    "Bien que le rapport d'impact puisse être nécessaire pour les financeurs, la valeur principale de réfléchir à l'impact est pour les cadets eux-mêmes — pour comprendre le sens de leur service et grandir en tant que citoyens. Ce n'est pas juste un exercice administratif.",
                    "Les insignes et les récompenses sont une reconnaissance, non le but de la réflexion. Le but est d'aider les cadets à comprendre la valeur du service communautaire, à se développer en tant que citoyens et à se sentir motivés à continuer de servir. L'apprentissage est la vraie récompense.",
                ],
                "items": [],
                "fb": "",
            },
        ],
    },
    "cs_citizenship": {
        "title": "Citoyenneté et Engagement Communautaire Actif",
        "desc": "Comprendre le rôle du service communautaire dans la citoyenneté, les avantages de l'engagement civique et comment maintenir les partenariats communautaires.",
        "brief": "Le module final relie le service communautaire au concept plus large de citoyenneté. Votre instructeur discute pourquoi le service communautaire est une partie essentielle du programme des cadets — il bâtit des citoyens actifs, renforce les communautés et développe des compétences de leadership qui se transfèrent à tous les domaines de la vie. Vous apprendrez les avantages de l'engagement communautaire soutenu, comment bâtir des partenariats durables avec les organisations civiles et comment le service communautaire relie les compétences de leadership, de communication et de citoyenneté de la formation Étoile Verte et Étoile Rouge. C'est la clé de voûte de la phase de service communautaire de l'Étoile Rouge.",
        "tasks": [
            {
                "prompt": "Pourquoi le service communautaire est-il une partie obligatoire du programme des cadets?",
                "options": [
                    "Il encourage les cadets à être des citoyens actifs, bâtit des compétences de leadership et de travail d'équipe et renforce le lien entre le corps de cadets et la communauté",
                    "C'est juste du travail d'occupation pour remplir le temps entre les fins de semaine d'instruction",
                    "C'est seulement pour ramasser de l'argent pour le corps de cadets",
                    "C'est seulement pour le bénéfice des relations publiques",
                ],
                "options_fb": [
                    "Correct! Le PO X02 énonce que le but est «d'encourager les cadets à être des citoyens actifs par la participation à une activité de service communautaire en tant que membre d'une équipe.» Le service communautaire bâtit la citoyenneté, développe le leadership et le travail d'équipe et crée une relation positive entre le corps de cadets et la communauté civile. C'est une partie essentielle du développement des cadets.",
                    "Le service communautaire est loin d'être du travail d'occupation. C'est un objectif de performance essentiel du programme des cadets conçu pour bâtir la citoyenneté, le leadership et les liens communautaires. C'est une partie significative du développement des cadets.",
                    "Le service communautaire n'est pas about le financement du corps. Il s'agit de servir la communauté et de développer les cadets en tant que citoyens actifs. Bien que certains projets puissent sensibiliser, le but est le service, non le profit.",
                    "Bien que le service communautaire crée une visibilité positive pour le corps, c'est un avantage secondaire. Le but premier est de développer les cadets en tant que citoyens actifs et de servir la communauté. Les RP sont un sous-produit, non le but.",
                ],
                "items": [],
                "fb": "",
            },
            {
                "prompt": "Votre projet de nettoyage a été un succès. Comment pouvez-vous maintenir la relation avec le gestionnaire du parc pour les projets futurs?",
                "options": [
                    "Envoyer un courriel de remerciement avec des photos et des résultats, demander de la rétroaction sur le partenariat et discuter des opportunités de collaboration future",
                    "Ne rien faire — le projet est terminé donc la relation est finie",
                    "Les contacter seulement quand vous avez besoin de quelque chose l'an prochain",
                    "Les ajouter à une liste d'envoi et envoyer des nouvelles génériques",
                ],
                "options_fb": [
                    "Correct! Maintenir un partenariat communautaire nécessite un suivi: un remerciement avec des photos et des résultats montre de l'appréciation et de la reddition de comptes, demander de la rétroaction montre du respect pour la perspective du partenaire et discuter des opportunités futures plante la graine d'une collaboration continue. Ceci transforme un événement unique en un partenariat durable.",
                    "Traiter le partenaire comme un contact unique gaspille la relation que vous avez bâtie. Un remerciement et une discussion des opportunités futures peuvent transformer un seul projet en un partenariat continu qui bénéficie au corps et à la communauté pendant des années.",
                    "Contacter le partenaire seulement quand vous avez besoin de quelque chose est transactionnel, non relationnel. Un remerciement après l'événement et une communication régulière bâtit un véritable partenariat. Les gens se souviennent de la façon dont ils sont traités.",
                    "Un courriel de remerciement personnel est beaucoup plus significatif qu'une liste d'envoi générique. Les partenariats communautaires se bâtissent sur des relations personnelles, non sur des communications de masse. Prenez le temps d'un suivi véritable et personnalisé.",
                ],
                "items": [],
                "fb": "",
            },
            {
                "prompt": "",  # order task
                "options": [],
                "options_fb": [],
                "items": [
                    "Définir la portée et rédiger le plan de projet",
                    "Mener l'évaluation des risques et communiquer avec les partenaires",
                    "Exécuter l'événement avec sécurité et leadership",
                    "Debriefer, documenter les leçons et maintenir le partenariat",
                ],
                "fb": "",
            },
            {
                "prompt": "Comment le module Projet de Service Communautaire relie-t-il les compétences du programme Étoile Rouge?",
                "options": [
                    "Il intègre le leadership (diriger une équipe), la communication (partenariat avec des civils) et la citoyenneté (servir la communauté) en une expérience clé de voûte",
                    "Il ne se connecte pas aux autres modules — il est autonome",
                    "Il utilise seulement les compétences de leadership et ignore la communication",
                    "Il utilise seulement les compétences de tir et d'exercice",
                ],
                "options_fb": [
                    "Correct! Le Projet de Service Communautaire est la clé de voûte de l'Étoile Rouge parce qu'il intègre trois domaines de compétences essentiels: le leadership (planifier et diriger une équipe), la communication (interaction professionnelle avec les organisations civiles) et la citoyenneté (service actif à la communauté). C'est là que toutes les compétences de l'Étoile Verte et de l'Étoile Rouge se rejoignent dans une application du monde réel.",
                    "Le Projet de Service Communautaire est explicitement conçu comme une clé de voûte qui intègre les compétences de leadership, de communication et de citoyenneté. C'est le contraire d'autonome — il s'appuie sur tout ce que les cadets ont appris tout au long du programme.",
                    "La communication est centrale au projet de service communautaire — vous devez communiquer professionnellement avec les organisations civiles, breveter votre équipe et diriger un debriefing. Il utilise à la fois les compétences de leadership et de communication, plus la citoyenneté.",
                    "Le tir et l'exercice ne sont pas directement liés à la planification de service communautaire. Le projet de service communautaire intègre le leadership, la communication et la citoyenneté — les compétences civiques essentielles du programme des cadets.",
                ],
                "items": [],
                "fb": "",
            },
        ],
    },
}

# Now populate the translations dict with mission keys
for mid, data in missions_fr.items():
    translations[f"community_mission_{mid}_title"] = data["title"]
    translations[f"community_mission_{mid}_desc"] = data["desc"]
    translations[f"community_mission_{mid}_brief"] = data["brief"]
    for ti, task in enumerate(data["tasks"]):
        translations[f"community_mission_{mid}_task{ti}_prompt"] = task["prompt"]
        for oi, opt_text in enumerate(task["options"]):
            translations[f"community_mission_{mid}_task{ti}_opt{oi}"] = opt_text
        for oi, opt_fb in enumerate(task["options_fb"]):
            translations[f"community_mission_{mid}_task{ti}_opt{oi}_fb"] = opt_fb
        for ii, item in enumerate(task["items"]):
            translations[f"community_mission_{mid}_task{ti}_item{ii}"] = item
        translations[f"community_mission_{mid}_task{ti}_fb"] = task["fb"]

# ==========================================================
# LEARN ARTICLES — community_article_{id}_{field}
# ==========================================================
articles_fr = {
    "la_smart": {
        "title": "Objectifs SMART pour les Projets Communautaires",
        "desc": "Comment rédiger des objectifs Spécifiques, Mesurables, Atteignables, Pertinents et Temporellement définis.",
        "body": "<p>Les <strong>critères SMART</strong> sont un cadre pour rédiger des objectifs de projet clairs et exploitables. Chaque projet de service communautaire devrait avoir au moins un objectif SMART qui définit à quoi ressemble le succès.</p><p><strong>Spécifique:</strong> L'objectif nomme exactement ce qui sera fait, où et par qui. «Nettoyer le Parc Riverside» est spécifique; «faire quelque chose de bien» ne l'est pas.</p><p><strong>Mesurable:</strong> L'objectif inclut des critères quantifiables. «Collecter 20 sacs de déchets» est mesurable; «nettoyer beaucoup» ne l'est pas.</p><p><strong>Atteignable:</strong> L'objectif est réaliste compte tenu de la taille de votre équipe, du temps et des ressources. Nettoyer un parc avec 12 cadets est atteignable; nettoyer tous les parcs de la ville ne l'est pas.</p><p><strong>Pertinent:</strong> L'objectif adresse un véritable besoin communautaire que votre corps peut impacter de manière significative.</p><p><strong>Temporellement défini:</strong> L'objectif a une échéance claire. «Le samedi 15 mai» est temporellement défini; «un jour» ne l'est pas.</p><p>Un objectif SMART bien rédigé: <em>«Nettoyer le Parc Riverside le samedi 15 mai, avec 12 cadets, en collectant un minimum de 20 sacs de déchets du sentier et des aires de pique-nique.»</em></p>",
    },
    "la_riskmatrix": {
        "title": "La Matrice d'Évaluation des Risques",
        "desc": "Comment utiliser la matrice probabilité × gravité pour évaluer et prioriser les risques.",
        "body": "<p>Une <strong>matrice d'évaluation des risques</strong> vous aide à évaluer chaque danger identifié en combinant deux facteurs: la <strong>probabilité</strong> (quelle est sa probabilité?) et la <strong>gravité</strong> (quelle serait la gravité?). Le résultat est un niveau de risque qui vous indique quels dangers nécessitent le plus d'attention.</p><p><strong>Niveaux de probabilité:</strong> Rare, Improbable, Possible, Probable, Presque Certain.</p><p><strong>Niveaux de gravité:</strong> Négligeable, Mineur, Modéré, Majeur, Catastrophique.</p><p>Combiner ceux-ci sur une matrice donne des niveaux de risque: Faible, Moyen, Élevé, Extrême. Un danger Probable et Majeur est un risque Élevé. Un danger Rare et Mineur est un risque Faible.</p><p>Pour chaque risque, mettez en œuvre des <strong>mesures de contrôle</strong> utilisant la hiérarchie des contrôles: Éliminer (retirer le danger entièrement), Substituer (remplacer par quelque chose de plus sûr), Contrôles techniques (barrières physiques), Contrôles administratifs (procédures et formation), Équipement de protection individuelle (gants, gilets, lunettes).</p><p>Documentez chaque danger, son niveau de risque et ses mesures de contrôle sur le formulaire d'évaluation des risques. Revoyez l'évaluation avec votre équipe avant l'événement.</p>",
    },
    "la_hoc": {
        "title": "La Hiérarchie des Contrôles",
        "desc": "Le système à cinq niveaux pour réduire le risque du plus au moins efficace.",
        "body": "<p>La <strong>hiérarchie des contrôles</strong> est un système utilisé en gestion des risques pour réduire l'exposition aux dangers. Elle classe les méthodes de contrôle de la plus efficace à la moins efficace:</p><p><strong>1. Élimination:</strong> Retirer le danger entièrement. Si une section du parc a des déchets dangereux, n'assignez pas de bénévoles à cette zone. C'est le contrôle le plus efficace.</p><p><strong>2. Substitution:</strong> Remplacer le danger par quelque chose de plus sûr. Si le levage manuel est un risque, utilisez un chariot ou une brouette à la place.</p><p><strong>3. Contrôles Techniques:</strong> Isoler les personnes du danger. Utilisez des pinces à déchets pour que les mains ne touchent pas les objets tranchants. Érigez des barrières près des zones de circulation.</p><p><strong>4. Contrôles Administratifs:</strong> Changer la façon dont les gens travaillent. Implantez un système de binôme, faites tourner les tâches pour prévenir la fatigue, établissez des horaires de travail-repos.</p><p><strong>5. Équipement de Protection Individuelle (EPI):</strong> Équipez les bénévoles de gants, de gilets haute-visibilité et de chaussures fermées. C'est la dernière ligne de défense, non la première.</p><p>Commencez toujours au sommet de la hiérarchie. Les EPI seuls ne sont jamais suffisants — ils devraient compléter les autres contrôles, non les remplacer.</p>",
    },
    "la_email": {
        "title": "Structure de Courriel Professionnel",
        "desc": "Le format standard pour communiquer avec les organisations civiles par courriel.",
        "body": "<p>Quando vous communiquez avec des organisations civiles, vos courriels représentent votre corps de cadets. Un courriel professionnel a cinq éléments clés:</p><p><strong>Ligne d'Objet:</strong> Claire, descriptive et spécifique. «Demande de Permission — Nettoyage Communautaire du Corps de Cadets au Parc Riverside, 15 mai» indique au destinataire exactement de quoi parle le courriel.</p><p><strong>Salutation:</strong> Formelle et respectueuse. Utilisez «Cher M./Mme [Nom de famille]» si vous connaissez le nom, ou «Chère Équipe [Organisation]» si vous ne le connaissez pas. Évitez les salutations familières comme «Hé» ou «Salut».</p><p><strong>Corps:</strong> Présentez-vous et votre corps, énoncez votre but clairement, faites une demande spécifique et fournissez les détails pertinents (date, heure, lieu, nombre de bénévoles). Soyez concis — un ou deux courts paragraphes.</p><p><strong>Clôture:</strong> Remerciez le destinataire pour son temps et sa considération. Utilisez «Sincèrement» ou «Respectueusement» suivi de votre nom, grade, corps et coordonnées.</p><p><strong>Signature:</strong> Incluez votre nom complet, grade de cadet, nom du corps et un numéro de téléphone ou courriel où vous pouvez être rejoint.</p>",
    },
    "la_contactlog": {
        "title": "Le Registre des Contacts",
        "desc": "Pourquoi et comment tracer chaque communication avec votre partenaire civil.",
        "body": "<p>Un <strong>registre des contacts</strong> est un registre continu de chaque communication avec votre organisation partenaire civile. Il trace les courriels, les appels téléphoniques, les réunions et toute autre interaction. Chaque entrée inclut la date, la personne avec qui vous avez parlé, le sujet et le résultat ou les actions convenues.</p><p><strong>Pourquoi c'est important:</strong></p><p>1. <strong>Prévient la mauvaise communication:</strong> S'il y a jamais un désaccord sur ce qui a été convenu, le registre des contacts fournit un registre objectif.</p><p>2. <strong>Suit les suivis:</strong> Si le partenaire a promis de fournir des sacs poubelle, le registre vous rappelle de confirmer la livraison avant l'événement.</p><p>3. <strong>Fournit la continuité:</strong> Si un autre cadet prend en charge le projet, le registre lui dit exactement où en sont les choses.</p><p>4. <strong>Démontre le professionnalisme:</strong> Un registre des contacts bien tenu montre au partenaire que votre corps est organisé et fiable.</p><p>Gardez le registre des contacts dans un document partagé auquel tous les chefs de projet peuvent accéder. Mettez-le à jour immédiatement après chaque communication — ne comptez pas sur la mémoire.</p>",
    },
    "la_raci": {
        "title": "Assignation de Responsabilités RACI",
        "desc": "Un cadre simple pour clarifier qui est Responsable, Imputable, Consulté et Informé.",
        "body": "<p><strong>RACI</strong> est un cadre d'assignation de responsabilités qui clarifie les rôles pour chaque tâche dans un projet. Chaque tâche se voit assigner quatre types de rôles:</p><p><strong>R — Responsable:</strong> La personne qui fait le travail. Pour une tâche de collecte de déchets, la personne responsable est le bénévole qui ramasse les déchets. Il peut y avoir de multiples personnes responsables pour une tâche.</p><p><strong>A — Imputable:</strong> La personne qui possède la tâche et est responsable de son achèvement. C'est habituellement le chef d'équipe ou le chef de projet. Il ne devrait y avoir qu'une seule personne imputable par tâche pour éviter la confusion.</p><p><strong>C — Consulté:</strong> Les personnes qui fournissent des commentaires ou de l'expertise avant que la tâche soit faite. Pour une évaluation des risques, l'officier de sécurité du corps pourrait être consulté. La communication va dans les deux sens.</p><p><strong>I — Informé:</strong> Les personnes qui doivent être tenues au courant des progrès ou des résultats. Le commandant du corps pourrait être informé de l'horaire de l'événement. La communication va dans un sens.</p><p>Utiliser RACI pour votre plan de projet garantit que chaque tâche a un propriétaire clair et que tout le monde connaît son rôle. Ceci prévient le problème «je pensais que c'était toi qui le faisais».</p>",
    },
    "la_contingency": {
        "title": "Planification de Contingence",
        "desc": "Comment préparer des plans de secours pour quand les choses ne se passent pas comme prévu.",
        "body": "<p>Un <strong>plan de contingence</strong> est un plan de secours pour quand votre plan principal est perturbé. Chaque projet de service communautaire devrait avoir des plans de contingence pour les perturbations les plus probables.</p><p><strong>Contingence météo:</strong> Si de la pluie est prévue, ayez une alternative intérieure (un nettoyage de centre communautaire) ou une date de replanification prête. Fixez une heure de décision aller/non — par exemple, décidez par 18h la veille.</p><p><strong>Contingence d'absence de bénévoles:</strong> Si moins de bénévoles se présentent que prévu, ayez un plan pour réduire la portée (couvrir une plus petite zone) ou réaffecter les rôles (combiner les équipes). Recrutez toujours 10-15% plus de bénévoles que nécessaire.</p><p><strong>Contingence de pénurie d'équipement:</strong> Si les fournitures données n'arrivent pas, ayez un fournisseur de secours identifié et un petit budget d'urgence pour acheter des remplacements.</p><p><strong>Contingence d'urgence médicale:</strong> Connaissez l'hôpital le plus proche, ayez un secouriste qualifié sur place et ayez un plan d'évacuation. Assurez-vous que quelqu'un a un téléphone chargé et les numéros de contact d'urgence.</p><p>La planification de contingence n'est pas du pessimisme — c'est de la préparation. Un chef qui a des plans de secours peut rester calme et s'adapter quand les choses changent.</p>",
    },
    "la_debrief": {
        "title": "La Revue Après Action",
        "desc": "Format de debriefing structuré pour apprendre de chaque projet.",
        "body": "<p>Une <strong>revue après action (RAA)</strong> est un debriefing structuré qui aide une équipe à apprendre de chaque projet. Elle a été développée par les militaires et est maintenant utilisée dans les organisations du monde entier. Le format est simple et puissant.</p><p><strong>Les Trois Questions:</strong></p><p>1. <strong>Qu'est-ce qui a bien fonctionné?</strong> Commencez par les positifs. Ceci bâtit le moral et identifie les forces à répéter. «Le brevetage de sécurité était approfondi et tout le monde a compris les dangers.»</p><p>2. <strong>Qu'est-ce qui n'a pas bien fonctionné?</strong> Soyez honnête mais sans blâme. Concentrez-vous sur les processus, pas les personnes. «L'Équipe B a manqué de sacs poubelle et a dû attendre 20 minutes pour un réapprovisionnement.»</p><p>3. <strong>Que devrions-nous faire différemment la prochaine fois?</strong> Générez des améliorations spécifiques et exploitables. «La prochaine fois, assignez un messager logistique à chaque équipe avec des fournitures supplémentaires.»</p><p><strong>Meilleures pratiques pour une bonne RAA:</strong></p><p>• Tenez-la immédiatement après l'événement pendant que les souvenirs sont frais.</p><p>• Donnez à chacun une chance de parler — les bénévoles sur le terrain voient des choses que le chef ne voit pas.</p><p>• Gardez-la positive et constructive — c'est de l'apprentissage, pas du blâme.</p><p>• Documentez les leçons apprises pour les futurs chefs de projet.</p>",
    },
    "la_citizenship": {
        "title": "Service Communautaire et Citoyenneté Active",
        "desc": "Comment le service communautaire développe les cadets en tant que citoyens engagés et responsables.",
        "body": "<p>Le but du <strong>PO X02 — Effectuer un Service Communautaire</strong> est «d'encourager les cadets à être des citoyens actifs par la participation à une activité de service communautaire en tant que membre d'une équipe.» C'est un objectif de performance essentiel du programme des cadets, non un ajout optionnel.</p><p><strong>Qu'est-ce que la citoyenneté active?</strong> La citoyenneté active signifie prendre la responsabilité de votre communauté et y contribuer activement à son bien-être. C'est la différence entre être un résident et être un citoyen — un résident vit dans une communauté, mais un citoyen la sert.</p><p><strong>Comment le service communautaire bâtit la citoyenneté:</strong></p><p>1. <strong>Sensibilisation:</strong> Les cadets apprennent les besoins communautaires qu'ils ne connaissaient peut-être pas.</p><p>2. <strong>Empathie:</strong> Travailler directement avec les membres de la communauté bâtit la compréhension et la compassion.</p><p>3. <strong>Capacité d'agir:</strong> Les cadets voient qu'ils peuvent faire une différence tangible, ce qui bâtit la confiance civique.</p><p>4. <strong>Habitude:</strong> Le service communautaire régulier crée une habitude à vie d'engagement civique.</p><p>5. <strong>Leadership:</strong> Planifier et diriger des projets de service développe des compétences de leadership transférables.</p><p>L'accent du programme des cadets sur le service communautaire garantit que les cadets ne se forment pas seulement en tant qu'individus mais se développent en tant que citoyens qui contribuent à leurs communautés pour la vie.</p>",
    },
    "la_partnership": {
        "title": "Bâtir des Partenariats Communautaires Soutenus",
        "desc": "Comment transformer un événement unique en une relation communautaire durable.",
        "body": "<p>Un seul événement de service communautaire est précieux, mais un <strong>partenariat soutenu</strong> avec une organisation communautaire crée un impact continu pour le corps et la communauté. Voici comment bâtir des partenariats durables:</p><p><strong>1. Tenez vos promesses:</strong> La chose la plus importante est de faire ce que vous avez dit que vous feriez. Arrivez à l'heure, complétez le travail et atteignez vos objectifs. La fiabilité est le fondement de la confiance.</p><p><strong>2. Faites un suivi après chaque événement:</strong> Envoyez un remerciement avec des photos et des résultats. Demandez de la rétroaction sur le partenariat de leur perspective. Ceci montre que vous valorisez la relation, pas juste l'activité.</p><p><strong>3. Discutez des opportunités futures:</strong> Après un événement réussi, parlez de ce que vous pourriez faire d'autre ensemble. «Nous avons adoré nettoyer le parc — y a-t-il d'autres zones où vous pourriez utiliser l'aide de cadets?» Ceci plante la graine d'une collaboration continue.</p><p><strong>4. Maintenez un contact régulier:</strong> Ne laissez pas la relation se refroidir entre les événements. Vérifiez périodiquement, partagez les nouvelles du corps et invitez le partenaire aux événements du corps le cas échéant.</p><p><strong>5. Soyez professionnel en tout temps:</strong> Chaque interaction reflète sur votre corps. Une communication professionnelle et respectueuse bâtit une réputation qui donne aux partenaires envie de travailler avec vous à nouveau.</p>",
    },
    "la_safetybrief": {
        "title": "Mener un Brevetage de Sécurité Efficace",
        "desc": "Ce qu'il faut couvrir avant que toute activité de service communautaire ne commence.",
        "body": "<p>Un <strong>brevetage de sécurité</strong> est une partie obligatoire de chaque activité de cadets hors base. Il garantit que tous les bénévoles comprennent les dangers, les contrôles et les procédures d'urgence avant le début du travail. Aucun travail ne commence avant que le brevetage de sécurité soit terminé.</p><p><strong>Quoi couvrir dans un brevetage de sécurité:</strong></p><p>1. <strong>Aperçu de l'activité:</strong> Rappelez brièvement à tout le monde ce que nous faisons, où et pendant combien de temps.</p><p>2. <strong>Dangers identifiés:</strong> Revoyez les dangers de l'évaluation des risques — objets tranchants, terrain inégal, circulation, météo.</p><p>3. <strong>Mesures de contrôle:</strong> Expliquez ce qui est en place pour gérer chaque danger — gants et pinces pour les objets tranchants, système de binôme pour le terrain, gilets haute-visibilité près des routes.</p><p>4. <strong>Procédures d'urgence:</strong> Qui est le secouriste et où est-il? Quel est le signal d'urgence? Où est le point d'évacuation? Quels sont les numéros de contact d'urgence?</p><p>5. <strong>Plan de communication:</strong> Comment les équipes feront-elles leurs vérifications? Quel canal radio ou numéro de téléphone? Quelles sont les heures de vérification?</p><p>6. <strong>Inscription et reddition de comptes:</strong> Tout le monde s'inscrit. Le chef d'équipe sait qui est dans son équipe et fait un compte de têtes.</p><p>Gardez le brevetage clair et concis — 10 à 15 minutes. Demandez si quelqu'un a des questions. Confirmez que tout le monde comprend avant de libérer vers les tâches.</p>",
    },
    "la_volunteers": {
        "title": "Gérer les Équipes de Bénévoles",
        "desc": "Comment garder les bénévoles motivés, organisés et en sécurité durant l'événement.",
        "body": "<p>Gérer les bénévoles le jour de l'événement est une compétence de leadership essentielle. Contrairement aux travailleurs rémunérés, les bénévoles donnent leur temps librement — ils ont besoin de directions claires, de motivation et d'appréciation pour rester engagés.</p><p><strong>Directions claires:</strong> Chaque bénévole devrait connaître son rôle, son équipe, sa zone et son chef d'équipe. Des instructions vagues mènent à la confusion et au désengagement. Utilisez le plan de projet et les assignations de rôles pour donner à chacun un travail spécifique.</p><p><strong>Motivation:</strong> Gardez l'énergie positive. Rappelez aux bénévoles pourquoi ils sont là — l'impact communautaire qu'ils auront. Vérifiez avec les équipes durant l'événement, pas seulement à la fin. Un simple «excellent travail, Équipe A — vous faites une vraie différence» fait beaucoup.</p><p><strong>Sécurité:</strong> Surveillez les bénévoles pour la fatigue, l'inconfort ou les signes de détresse. Imposer des cycles de travail-repos par temps chaud ou froid. Ne laissez personne se dépasser au-delà de ses limites — la sécurité vient toujours en premier.</p><p><strong>Appréciation:</strong> Remerciez les bénévoles durant et après l'événement. Reconnaissez les contributions individuelles dans le debriefing. Considérez de petits gestes d'appréciation — certificats, photos ou un repas post-événement. Les bénévoles qui se sentent valorisés reviendront pour les projets futurs.</p><p><strong>Résolution de problèmes:</strong> Quand des problèmes surviennent, adressez-les calmement et rapidement. Réaffectez les ressources, ajustez les plans et tenez l'équipe informée. Un chef qui reste composé sous pression garde toute l'équipe stable.</p>",
    },
    "la_pox02": {
        "title": "PO X02 — Effectuer un Service Communautaire",
        "desc": "L'objectif de performance de l'Étoile Rouge qui régit la formation de service communautaire.",
        "body": "<p><strong>PO X02 — Effectuer un Service Communautaire</strong> est l'objectif de performance qui régit la formation de service communautaire dans le programme des Cadets Royaux de l'Armée Canadienne. Le but de ce PO est <em>«d'encourager les cadets à être des citoyens actifs par la participation à une activité de service communautaire en tant que membre d'une équipe.»</em></p><p><strong>Objectifs Habilitants:</strong></p><p>• <strong>MX02.01 — Effectuer un Service Communautaire</strong> (9 périodes, obligatoire): Les cadets participent à une activité de service communautaire en tant que membre d'une équipe. Ceci inclut la planification, l'exécution et le debriefing de l'activité.</p><p>• <strong>CX02.01 — Effectuer un Service Communautaire</strong> (18 périodes, complémentaire): Activités de service communautaire étendues qui approfondissent la planification de projet, le leadership et l'engagement communautaire.</p><p><strong>Compétences clés développées:</strong></p><p>1. Planification de projet — rédiger des plans, des calendriers et des listes de ressources.</p><p>2. Évaluation des risques — identifier les dangers et implanter des contrôles.</p><p>3. Communication professionnelle — interagir avec les organisations civiles.</p><p>4. Leadership — diriger une équipe à travers un projet du monde réel.</p><p>5. Citoyenneté — comprendre la valeur du service communautaire et de l'engagement civique actif.</p><p><strong>Évaluation:</strong> Les cadets sont évalués sur leur participation, leur contribution à la planification et leur leadership durant l'activité de service communautaire. Le projet de service communautaire est une expérience clé de voûte qui relie les compétences de leadership, de communication et de citoyenneté de la formation Étoile Verte et Étoile Rouge.</p>",
    },
    "la_scopecreep": {
        "title": "Prévenir la Dérive de la Portée",
        "desc": "Comment garder votre projet concentré et éviter l'expansion au-delà de votre plan.",
        "body": "<p>La <strong>dérive de la portée</strong> est l'expansion graduelle d'un projet au-delà de ses objectifs originaux. C'est l'une des raisons les plus communes pour lesquelles les projets de service communautaire échouent ou dépassent le budget et le temps.</p><p><strong>Comment la dérive de la portée se produit:</strong> Durant la planification, vous délimitez un nettoyage de parc pour couvrir le sentier et l'aire de pique-nique. Le jour de l'événement, un bénévole suggère aussi de nettoyer le stationnement. Puis quelqu'un mentionne la berge du ruisseau. Puis le terrain de jeu voisin. Soudainement votre projet de 3 heures est un marathon de 6 heures avec des bénévoles épuisés.</p><p><strong>Comment prévenir la dérive de la portée:</strong></p><p>1. <strong>Rédigez des objectifs clairs:</strong> Vos objectifs SMART définissent exactement ce qui est dans la portée. Tout ce qui n'est pas dans les objectifs est hors portée.</p><p>2. <strong>Tenez-vous-en au plan:</strong> Si quelqu'un suggère d'ajouter du travail, demandez: «Est-ce dans nos objectifs? Avons-nous le temps, les bénévoles et les ressources pour cela?» Si non, notez-le comme projet futur.</p><p>3. <strong>Communiquez la portée aux bénévoles:</strong> Durant le brevetage de sécurité, énoncez clairement quelles zones vous couvrez et lesquelles vous ne couvrez pas. Ceci prévient les bénévoles d'errer dans des zones non planifiées.</p><p>4. <strong>Documentez les ajouts pour la prochaine fois:</strong> Si vous identifiez des besoins supplémentaires durant l'événement, écrivez-les comme recommandations pour un projet futur. Ceci reconnaît le besoin sans expandre la portée actuelle.</p><p>5. <strong>Soyez prêt à dire non:</strong> En tant que chef, vous devez protéger votre équipe de l'engagement excessif. «C'est une excellente idée — planifions-la comme projet séparé» est une réponse professionnelle qui respecte à la fois l'idée et les limites de votre équipe.</p>",
    },
    "la_impact": {
        "title": "Mesurer l'Impact Communautaire",
        "desc": "Comment évaluer et documenter les résultats du monde réel de votre projet de service.",
        "body": "<p>Mesurer l'<strong>impact communautaire</strong> de votre projet de service est essentiel pour démontrer la valeur, apprendre de l'expérience et planifier les projets futurs. La mesure de l'impact transforme «nous avons fait une bonne chose» en «nous avons collecté 23 sacs de déchets d'un sentier de 2 km, améliorant le parc pour un estimé de 500 visiteurs hebdomadaires.»</p><p><strong>Mesures quantitatives:</strong></p><p>• Nombre de bénévoles qui ont participé.</p><p>• Volume de travail complété (sacs de déchets, mètres de sentier dégagés, articles triés).</p><p>• Heures de service contribuées.</p><p>• Zone couverte (mètres carrés, kilomètres de sentier).</p><p>• Personnes rejointes ou servies.</p><p><strong>Mesures qualitatives:</strong></p><p>• Rétroaction du partenaire civil (qu'ont-ils pensé du travail?).</p><p>• Rétroaction des membres de la communauté (les visiteurs du parc ont-ils remarqué et apprécié l'amélioration?).</p><p>• Réflexions des bénévoles du debriefing (qu'ont les cadets appris et ressenti?).</p><p>• Photos avant et après montrant la différence faite.</p><p><strong>Documenter l'impact:</strong> Après l'événement, compilez les données quantitatives et qualitatives dans un bref rapport d'impact. Partagez-le avec votre corps, le partenaire civil et la communauté. Ceci démontre la reddition de comptes, célèbre l'accomplissement de l'équipe et bâtit le cas pour les futurs projets de service communautaire.</p>",
    },
}

for aid, data in articles_fr.items():
    translations[f"community_article_{aid}_title"] = data["title"]
    translations[f"community_article_{aid}_desc"] = data["desc"]
    translations[f"community_article_{aid}_body"] = data["body"]

# ==========================================================
# PROJECT COMMAND — community_project_stage{si}_{field} and choices
# ==========================================================
project_stages_fr = [
    {  # stage 0
        "title": "Étape 1: Définir le Projet",
        "narrative": "Votre corps de cadets a été invité à planifier une activité de service communautaire. Le directeur du centre communautaire local a mentionné que le parc du quartier a besoin d'attention. Vous êtes le chef de projet désigné. C'est ici que votre formation commence — comment allez-vous définir la portée du projet?",
        "prompt": "Quelle est votre première action en tant que chef de projet?",
        "choices": [
            {"title": "Rechercher le besoin communautaire", "desc": "Visiter le parc, parler au directeur du centre communautaire et identifier le problème spécifique.", "fbTitle": "Excellent — définir le besoin d'abord!", "fbDetail": "Vous visitez le Parc Riverside et parlez au directeur du centre communautaire. Vous apprenez que des déchets se sont accumulés le long du sentier riverain et des aires de pique-nique, rendant le parc désagréable pour les familles. Le directeur aimerait voir un événement de nettoyage. En recherchant d'abord, vous avez identifié un véritable besoin communautaire et une activité spécifique et atteignable. C'est le fondement d'un projet réussi."},
            {"title": "Choisir une date et l'annoncer", "desc": "Choisir un samedi le mois prochain et commencer à recruter des bénévoles immédiatement.", "fbTitle": "Mettre la charrue avant les bœufs!", "fbDetail": "Vous annoncez une date de nettoyage avant de savoir ce qui a besoin d'être nettoyé, combien de bénévoles vous avez besoin ou quelles ressources sont requises. Le directeur du centre communautaire est confus — vous n'avez même pas discuté de la portée avec lui. Commencer par une date avant de définir le projet mène à un événement mal planifié. Identifiez toujours le besoin d'abord."},
            {"title": "Établir un budget de 500$", "desc": "Allouer l'argent d'abord, puis déterminer quoi en dépenser.", "fbTitle": "Budget avant portée est à l'envers!", "fbDetail": "Vous établissez un budget de 500$ sans savoir ce que le projet implique. Vous pourriez avoir besoin de plus, ou beaucoup moins — beaucoup de fournitures peuvent être données. Établir un budget avant de délimiter la portée mène à de l'argent gaspillé ou des fonds insuffisants. Définissez la portée du projet d'abord, puis estimez ce que cela coûtera."},
            {"title": "Publier sur les réseaux sociaux pour des idées", "desc": "Laisser la communauté suggérer ce que vous devriez faire.", "fbTitle": "Éviter la responsabilité de leadership!", "fbDetail": "En tant que chef de projet, c'est votre travail de rechercher et de définir la portée, non de la crowdsourcer sur les réseaux sociaux. Bien que l'avis de la communauté soit précieux, vous devriez le recueillir par un engagement direct avec le directeur du centre communautaire et le personnel du parc, non par un vague message sur les réseaux sociaux. Prenez en charge la définition du projet."},
        ],
    },
    {  # stage 1
        "title": "Étape 2: Rédiger des Objectifs SMART",
        "narrative": "Vous avez identifié le besoin: des déchets le long du sentier riverain et des aires de pique-nique au Parc Riverside. Maintenant vous devez rédiger des objectifs clairs pour le projet. Votre instructeur vous a enseigné les critères SMART — Spécifique, Mesurable, Atteignable, Pertinent, Temporellement défini. Comment allez-vous définir le succès?",
        "prompt": "Quel objectif allez-vous rédiger pour le plan de projet?",
        "choices": [
            {"title": "Objectif SMART de nettoyage", "desc": "Nettoyer le sentier et les aires de pique-nique du Parc Riverside le samedi 15 mai, avec 12 cadets, en collectant minimum 20 sacs de déchets.", "fbTitle": "Un objectif SMART modèle!", "fbDetail": "Votre objectif est Spécifique (sentier et aires de pique-nique du Parc Riverside), Mesurable (20 sacs de déchets, 12 cadets), Atteignable (12 cadets peuvent le faire en quelques heures), Pertinent (adresse le problème de déchets identifié) et Temporellement défini (samedi 15 mai). Cet objectif donne à votre équipe une cible claire et une façon de mesurer le succès. Excellente planification de projet."},
            {"title": "«Améliorer l'apparence du parc»", "desc": "Un but général d'améliorer l'apparence du parc.", "fbTitle": "Trop vague pour être utile!", "fbDetail": "Votre objectif «améliorer l'apparence du parc» n'a pas de critères mesurables. Comment saurez-vous quand il est atteint? Combien de sacs? Quelles zones? Quelle date? Sans critères mesurables, vous ne pouvez pas suivre les progrès ou démontrer le succès. Réécrivez-le en utilisant les critères SMART."},
            {"title": "Nettoyer tous les parcs de la ville", "desc": "Un but audacieux et ambitieux de nettoyer tous les parcs de la ville.", "fbTitle": "Pas atteignable pour votre équipe!", "fbDetail": "Nettoyer tous les parcs de la ville dépasse de loin ce que 12 cadets peuvent accomplir en une journée. Le «A» de SMART signifie Atteignable. Cette portée est irréaliste et mènera à l'échec et des bénévoles démoralisés. Adaptez l'objectif à ce que votre équipe peut réellement accomplir."},
            {"title": "Améliorer les relations communautaires", "desc": "Un but général de bâtir de la bonne volonté avec la communauté.", "fbTitle": "Un résultat, non un objectif!", "fbDetail": "Améliorer les relations communautaires est un résultat précieux du projet, mais ce n'est pas un objectif SMART. Il n'est pas spécifique ou mesurable de la façon dont un but de nettoyage l'est. Utilisez-le comme but plus large, mais rédigez un objectif spécifique et mesurable pour ce que l'équipe fera réellement."},
        ],
    },
    {  # stage 2
        "title": "Étape 3: Mener l'Évaluation des Risques",
        "narrative": "Avec le plan rédigé, vous devez mener une évaluation des risques avant l'événement. Vous parcourez le site du parc et identifiez plusieurs dangers: des objets tranchants dans les déchets, un sol inégal le long du sentier, une route longeant le parc et une possibilité de pluie à la date de l'événement. Comment allez-vous gérer ces risques?",
        "prompt": "Quelle est votre approche à l'évaluation des risques?",
        "choices": [
            {"title": "Évaluation complète des risques avec contrôles", "desc": "Documenter chaque danger, l'évaluer sur la matrice et implanter des contrôles: gants, pinces, contenant pour objets pointus, gilets haute-visibilité, système de binôme, contingence météo.", "fbTitle": "Approfondi et professionnel!", "fbDetail": "Vous documentez chaque danger sur le formulaire d'évaluation des risques, évaluez chacun par probabilité et gravité, et implantez des contrôles appropriés utilisant la hiérarchie des contrôles. Les objets tranchants reçoivent des gants, des pinces à déchets et un contenant pour objets pointus. La circulation reçoit des gilets haute-visibilité et un système de binôme. La météo reçoit un plan de contingence et une heure de décision aller/non. C'est de la gestion des risques modèle — votre équipe sera en sécurité."},
            {"title": "Dire aux bénévoles d'être prudents", "desc": "Un avertissement verbal sur les dangers devrait suffire.", "fbTitle": "Les avertissements verbaux ne sont pas des contrôles!", "fbDetail": "Dire aux bénévoles d'«être prudents» n'est pas une mesure de contrôle. Les objets tranchants, la circulation et la météo nécessitent des contrôles physiques: gants, pinces, gilets haute-visibilité et un plan de contingence météo. Les avertissements verbaux seuls ne réduisent pas adéquatement le risque. En tant que chef, vous devez implanter de vrais contrôles."},
            {"title": "Annuler l'événement en plein air", "desc": "Les risques sont trop élevés — annuler et faire une activité intérieure à la place.", "fbTitle": "Une surréaction inutile!", "fbDetail": "Les dangers que vous avez identifiés sont tous gérables avec des contrôles appropriés. Annuler un événement en plein air à cause de risques gérables est une surréaction qui refuse à la communauté un service précieux. L'évaluation des risques existe pour vous aider à gérer les risques, non pour éviter toutes les activités. Implantez les contrôles et procédez."},
            {"title": "Sauter l'évaluation des risques", "desc": "C'est juste un nettoyage de parc — qu'est-ce qui pourrait mal tourner?", "fbTitle": "Dangereusement négligent!", "fbDetail": "Sauter l'évaluation des risques est le choix le plus dangereux qu'un chef puisse faire. Les objets tranchants peuvent causer des coupures et des infections, la circulation peut causer des blessures graves et la météo peut créer des conditions dangereuses. Sans évaluation des risques, aucun de ceux-ci n'est contrôlé. Ceci est une grave défaillance de sécurité qui pourrait résulter en des blessures et de la responsabilité. Menez toujours une évaluation des risques pour les activités hors base."},
        ],
    },
    {  # stage 3
        "title": "Étape 4: Communiquer avec le Partenaire",
        "narrative": "Vous devez confirmer les arrangements avec le directeur du centre communautaire et le gestionnaire du parc. Vous rédigez un courriel demandant la permission, l'arrangement pour la fourniture de sacs poubelle et la coordination de la collecte des déchets après l'événement. Le gestionnaire du parc répond par téléphone et accepte tout. Que faites-vous ensuite?",
        "prompt": "Comment gérez-vous la communication après l'appel téléphonique?",
        "choices": [
            {"title": "Tout confirmer par écrit", "desc": "Envoyer un courriel de suivi résumant ce qui a été convenu: sacs, collecte, date et tous les détails discutés.", "fbTitle": "Professionnel et approfondi!", "fbDetail": "Vous envoyez un courriel de suivi confirmant chaque détail discuté au téléphone: le gestionnaire du parc fournira 50 sacs poubelle, organisera la collecte des déchets à 15h le 15 mai et accorde la permission pour 12 cadets de nettoyer le sentier et les aires de pique-nique. Ceci crée un registre écrit, prévient les malentendus et montre du professionnalisme. Le gestionnaire du parc apprécie votre approfondissement."},
            {"title": "Faire confiance à l'accord verbal", "desc": "Ils ont dit oui au téléphone — pas besoin de faire un suivi par écrit.", "fbTitle": "Les accords verbaux sont oubliés!", "fbDetail": "Vous décidez de ne pas faire de suivi par écrit. Deux semaines plus tard, le jour de l'événement, le gestionnaire du parc a oublié les sacs poubelle et l'arrangement de collecte des déchets. Votre équipe arrive sans sacs et sans façon de disposer des déchets collectés. Les accords verbaux sont trop facilement oubliés ou mal rappelés. Confirmez toujours par écrit."},
            {"title": "Dire à vos bénévoles à ce sujet", "desc": "Transmettre l'information à l'équipe et passer à autre planification.", "fbTitle": "Oublié de confirmer avec le partenaire!", "fbDetail": "Vous dites à vos bénévoles les arrangements mais ne les confirmez jamais avec le gestionnaire du parc par écrit. Vous avez communiqué à l'interne mais non à l'externe. Le partenaire peut oublier ou mal comprendre les détails. Vous devez confirmer avec le partenaire civil par écrit, pas juste avec votre équipe."},
            {"title": "Texter le gestionnaire du parc informellement", "desc": "Envoyer un texto rapide disant «merci pour l'appel, à samedi.»", "fbTitle": "Trop informel pour une relation professionnelle!", "fbDetail": "Un texto familier ne documente pas les arrangements spécifiques — sacs, collecte, permission. S'il y a un litige plus tard, un texto disant «à samedi» ne prouve pas ce qui a été convenu. La communication professionnelle avec les partenaires civils devrait prendre la forme d'un courriel approprié qui documente tous les détails."},
        ],
    },
    {  # stage 4
        "title": "Étape 5: Répartir les Ressources",
        "narrative": "Une semaine avant l'événement, vous devez finaliser vos ressources. Vous avez besoin de sacs poubelle (fournis par le gestionnaire du parc), de gants, de pinces à déchets, d'eau pour les bénévoles, d'une trousse de premiers soins, de gilets haute-visibilité et d'une feuille de présence. Vous avez 12 bénévoles et un petit budget du corps. Comment allez-vous acquérir les ressources restantes?",
        "prompt": "Quelle est votre stratégie d'acquisition de ressources?",
        "choices": [
            {"title": "Chercher des dons, puis acheter", "desc": "Demander aux entreprises locales de donner des gants, de l'eau et des gilets. Acheter des pinces à déchets et des fournitures de premiers soins avec les fonds du corps.", "fbTitle": "Intelligent et soucieux des coûts!", "fbDetail": "Vous visitez un quincaillerie locale et ils donnent 15 paires de gants de travail. Une épicerie voisine donne 3 caisses d'eau. Le budget du corps couvre 12 pinces à déchets et un réapprovisionnement de trousse de premiers soins. Vous avez tout ce dont vous avez besoin à coût minimal, et vous avez bâti des relations avec des entreprises locales qui pourraient soutenir les projets futurs. Ceci est une excellente gestion des ressources."},
            {"title": "Tout acheter au prix de détail", "desc": "Acheter toutes les fournitures dans un quincaillerie en utilisant le budget complet du corps.", "fbTitle": "Ça marche mais c'est du gaspillage!", "fbDetail": "Vous achetez tout au prix de détail complet, utilisant la majeure partie du budget du corps. Le projet est entièrement fourni, mais vous avez dépensé de l'argent qui aurait pu être économisé grâce aux dons. Plusieurs entreprises locales auraient donné des fournitures à un projet de service communautaire de cadets. Cherchez des dons d'abord pour conserver les fonds du corps et bâtir des relations communautaires."},
            {"title": "Demander aux bénévoles d'apporter les leurs", "desc": "Dire à chaque bénévole d'apporter des gants, de l'eau et ce qu'ils peuvent.", "fbTitle": "Peu fiable et injuste!", "fbDetail": "Certains bénévoles apportent des fournitures adéquates, mais d'autres oublient ou apportent des articles inadéquats. Un cadet n'a pas de gants et ramasse des déchets à mains nues, risquant des coupures. Un autre n'a pas d'eau et se déshydrate. Compter sur les bénévoles pour l'équipement de sécurité principal est peu fiable et crée des risques de sécurité. Le corps devrait fournir l'équipement de sécurité essentiel."},
            {"title": "Espérer le mieux le jour de l'événement", "desc": "Ne pas se soucier des ressources maintenant — régler ça en arrivant.", "fbTitle": "Une recette pour le désastre!", "fbDetail": "Le jour de l'événement, vous réalisez que vous n'avez pas de gants, pas de pinces à déchets, pas d'eau et pas de trousse de premiers soins. Les bénévoles se tiennent autour sans rien à faire et sans façon de collecter les déchets sûrement. L'événement est un échec avant même de commencer. La planification des ressources doit se faire avant l'événement, non le jour même. Ceci est une grave défaillance de planification."},
        ],
    },
    {  # stage 5
        "title": "Étape 6: Leadership le Jour de l'Événement",
        "narrative": "C'est le samedi 15 mai. La météo est nuageuse mais sèche. Vos 12 bénévoles sont arrivés au Parc Riverside. Le gestionnaire du parc a déposé les sacs poubelle. Tout ce que vous avez planifié se concrétise. Maintenant vous devez diriger l'événement. Quelle est votre première action?",
        "prompt": "Que faites-vous d'abord avec votre équipe assemblée?",
        "choices": [
            {"title": "Mener un brevetage de sécurité", "desc": "Breveter les bénévoles sur les dangers, les contrôles, les procédures d'urgence, les premiers soins et le plan de communication.", "fbTitle": "Sécurité d'abord — excellent leadership!", "fbDetail": "Vous rassemblez l'équipe et menez un brevetage de sécurité approfondi. Vous couvrez les dangers (objets tranchants, terrain inégal, circulation routière), les contrôles (gants, pinces, système de binôme, gilets haute-visibilité), les procédures d'urgence (emplacement du secouriste, contacts d'urgence, point d'évacuation) et le plan de communication (heures de vérification, rôles des chefs d'équipe). Chaque bénévole s'inscrit. Ce n'est qu'après que la sécurité est brevetée que vous distribuez l'équipement et commencez le travail. C'est ainsi qu'un chef dirige un événement."},
            {"title": "Distribuer les sacs et commencer à travailler", "desc": "Mettre tout le monde au travail tout de suite pour maximiser le temps de nettoyage.", "fbTitle": "Brevetage de sécurité sauté!", "fbDetail": "Vous distribuez les sacs poubelle et dites à tout le monde de commencer. Les bénévoles se dispersent sans connaître les dangers, les contrôles ou les procédures d'urgence. Un cadet ramasse du verre brisé à mains nues parce que personne ne lui a dit d'utiliser les pinces à déchets. Une autre équipe erre près de la route sans gilets haute-visibilité. Commencer le travail sans brevetage de sécurité est une grave défaillance de leadership."},
            {"title": "Prendre une photo de groupe d'abord", "desc": "Capturer le moment pour les réseaux sociaux avant de commencer le travail.", "fbTitle": "Les priorités sont mauvaises!", "fbDetail": "Vous passez 15 minutes à prendre des photos de groupe et à publier sur les réseaux sociaux. Pendant ce temps, les bénévoles se tiennent autour en ayant froid et en étant impatients. Le brevetage de sécurité n'a toujours pas eu lieu. Les photos sont sympas, mais la sécurité et le fait de commencer le travail sont les priorités. Menez le brevetage de sécurité d'abord, puis prenez des photos durant l'événement."},
            {"title": "Attendre les retardataires", "desc": "Retarder le début jusqu'à ce que tout le monde qui a dit qu'il pourrait venir soit arrivé.", "fbTitle": "Leadership indécis!", "fbDetail": "Vous attendez 30 minutes pour des bénévoles qui ont dit qu'ils pourraient venir mais n'ont pas confirmé. L'équipe présente s'ennuie et a froid. Éventuellement vous commencez avec 9 bénévoles au lieu de 12, ayant gaspillé 30 minutes de temps d'événement. Fixez une heure de début claire, menez le brevetage de sécurité avec ceux présents et intégrez les retardataires à leur arrivée. Ne pénalisez pas les ponctuels pour les retardataires."},
        ],
    },
    {  # stage 6
        "title": "Étape 7: Réagir à un Incident",
        "narrative": "Quatre-vingt-dix minutes dans le nettoyage, le chef de l'Équipe B signale qu'un bénévole a trouvé une aiguille usagée parmi les déchets. Plusieurs bénévoles sont nerveux. La météo commence aussi à tourner — des nuages sombres arrivent. Deux défis à la fois. En tant que chef de projet, comment réagissez-vous?",
        "prompt": "Comment gérez-vous l'aiguille et la météo changeante?",
        "choices": [
            {"title": "Réponse calme et contrôlée", "desc": "Arrêter le travail près de l'aiguille, la disposer dans le contenant pour objets pointants, renforcer les contrôles, puis évaluer la météo et prendre une décision aller/non.", "fbTitle": "Leadership de crise à son meilleur!", "fbDetail": "Vous restez calme et prenez en charge. D'abord, vous arrêtez la collecte dans la zone où l'aiguille a été trouvée et faites disposer un bénévole formé dans le contenant pour objets pointants que vous avez apporté. Vous radio à toutes les équipes de renforcer la règle: utilisez les pinces à déchets, aucun contact manuel avec les objets tranchants. Puis vous évaluez la météo — les nuages sombres paraissent sérieux. Vous vérifiez les prévisions, voyez la pluie imminente, et prenez la décision de terminer la collecte dans 20 minutes et passer au debriefing. Votre équipe voit un chef composé, décisif et axé sur la sécurité. C'est à quoi sert la formation."},
            {"title": "Évacuer le parc immédiatement", "desc": "Une aiguille est un biorisque — sortir tout le monde et abandonner l'événement.", "fbTitle": "Une surréaction qui abandonne le projet!", "fbDetail": "Vous paniquez et ordonnez une évacuation immédiate. Les bénévoles sont confus et déçus — l'événement n'est qu'à moitié fait. L'aiguille est un danger gérable que votre évaluation des risques avait anticipé. Vous avez un contenant pour objets pointants et des protocoles pour exactement cette situation. Évacuer pour un seul danger gérable montre un manque de confiance dans votre propre planification. Restez calme, gérez l'incident et continuez l'événement."},
            {"title": "Leur dire de la jeter dans le sac", "desc": "C'est juste une aiguille — la mettre avec le reste des déchets.", "fbTitle": "Extrêmement dangereux!", "fbDetail": "Vous dites au bénévole de jeter l'aiguille dans le sac poubelle. Plus tard, quand le sac est manipulé pour l'élimination, l'aiguille perce le sac et transperce la main d'un travailleur du parc. Ceci est une grave exposition à un biorisque qui aurait pu être prévenue avec le contenant pour objets pointants que vous avez apporté. Ne jetez jamais d'aiguilles dans les ordures régulières. Ceci est une défaillance critique de sécurité."},
            {"title": "Ignorer les deux problèmes", "desc": "Les bénévoles peuvent s'occuper de l'aiguille, et un peu de pluie c'est correct.", "fbTitle": "Leadership négligent!", "fbDetail": "Vous ignorez à la fois l'aiguille et la météo. Un bénévole manipule l'aiguille à mains nues, risquant une blessure par piqûre. Puis la pluie frappe — les bénévoles sont non préparés, trempés et froids, et les déchets qu'ils ont collectés commencent à s'envoler. L'événement s'enfonce dans le chaos. Ignorer les incidents est la marque d'un chef défaillant. Vous devez adressez les deux problèmes immédiatement."},
        ],
    },
    {  # stage 7
        "title": "Étape 8: Diriger le Debriefing",
        "narrative": "Le nettoyage est terminé. Vos 12 bénévoles ont collecté 27 sacs de déchets — dépassant votre objectif de 20! Le parc a l'air transformé. Le gestionnaire du parc est passé pour remercier l'équipe. Maintenant, avec tout le monde encore réuni, c'est le temps du debriefing. C'est là que l'apprentissage se fait. Comment allez-vous le mener?",
        "prompt": "Comment structurez-vous la discussion de debriefing?",
        "choices": [
            {"title": "Revue après action structurée", "desc": "Demander: Qu'est-ce qui a bien fonctionné? Qu'est-ce qui n'a pas bien fonctionné? Que devrions-nous faire différemment la prochaine fois? Laisser tout le monde parler.", "fbTitle": "Un debriefing modèle!", "fbDetail": "Vous rassemblez l'équipe et menez une revue après action structurée. «Qu'est-ce qui a bien fonctionné?» — les bénévoles soulignent le brevetage de sécurité approfondi, l'organisation de l'équipe et le dépassement de l'objectif de collecte de déchets. «Qu'est-ce qui n'a pas bien fonctionné?» — l'Équipe B a manqué de sacs en milieu d'événement et a dû attendre un réapprovisionnement. «Que devrions-nous faire différemment?» — assigner un messager logistique à chaque équipe avec des fournitures supplémentaires la prochaine fois. Vous documentez les leçons apprises, remerciez tout le monde pour leur service et réfléchissez à l'impact communautaire: 27 sacs de déchets retirés, un parc plus propre pour 500 visiteurs hebdomadaires et un partenariat renforcé avec le centre communautaire. Les cadets partent fiers, valorisés et motivés pour le service futur. C'est ce qu'est le service communautaire."},
            {"title": "Discuter seulement des positifs", "desc": "L'événement a été un succès — juste célébrer et ne pas soulever de problèmes.", "fbTitle": "Raté l'opportunité d'apprentissage!", "fbDetail": "Vous parlez seulement de ce qui a bien fonctionné. L'équipe célèbre, mais le problème de pénurie de sacs n'est jamais discuté ou résolu. La prochaine fois, le même problème se reproduira. Un debriefing qui ne couvre que les positifs manque la moitié de son but. Vous devez aussi discuter de ce qui n'a pas bien fonctionné et de ce qu'il faut améliorer — c'est là que l'apprentissage se fait."},
            {"title": "Se concentrer sur ce qui a mal tourné", "desc": "Faire la leçon à l'équipe sur la pénurie de sacs et autres erreurs.", "fbTitle": "Démoralisant et contre-productif!", "fbDetail": "Vous passez le debriefing à critiquer l'équipe pour la pénurie de sacs et d'autres problèmes. Les bénévoles se sentent démoralisés et sur la défensive. Plusieurs cadets vous disent qu'ils ne sont pas sûrs de vouloir bénévoler à nouveau. Un debriefing axé sur le blâme détruit le moral et décourage la participation future. Concentrez-vous sur l'amélioration constructive, non le blâme."},
            {"title": "Sauter le debriefing", "desc": "Tout le monde est fatigué — juste les remercier et les laisser rentrer.", "fbTitle": "Gaspillé un moment d'apprentissage critique!", "fbDetail": "Vous sautez le debriefing et renvoyez tout le monde chez eux. Les leçons de cet événement — ce qui a fonctionné, ce qui n'a pas fonctionné, ce qu'il faut améliorer — sont perdues à mesure que les souvenirs s'estompent. La prochaine fois, les mêmes erreurs seront répétées. Le debriefing est là où un événement unique devient un apprentissage durable. Il est essentiel, non optionnel. Même un bref debriefing de 15 minutes est inestimable."},
        ],
    },
]

for si, stage in enumerate(project_stages_fr):
    translations[f"community_project_stage{si}_title"] = stage["title"]
    translations[f"community_project_stage{si}_narrative"] = stage["narrative"]
    translations[f"community_project_stage{si}_prompt"] = stage["prompt"]
    for ci, choice in enumerate(stage["choices"]):
        translations[f"community_project_stage{si}_choice{ci}_title"] = choice["title"]
        translations[f"community_project_stage{si}_choice{ci}_desc"] = choice["desc"]
        translations[f"community_project_stage{si}_choice{ci}_fbtitle"] = choice["fbTitle"]
        translations[f"community_project_stage{si}_choice{ci}_fbdetail"] = choice["fbDetail"]

# Project game meters labels
translations["Planning"] = "Planification"
translations["Safety"] = "Sécurité"
translations["Impact"] = "Impact"
translations["Teamwork"] = "Travail d'Équipe"
translations["Budget"] = "Budget"

# ==========================================================
# Generate the JS entries
# ==========================================================
lines = []
lines.append("  // ===== Community Service Training (lesson 112) French translations =====")
for en, fr in translations.items():
    # Escape any double quotes in the values
    en_escaped = en.replace('\\', '\\\\').replace('"', '\\"')
    fr_escaped = fr.replace('\\', '\\\\').replace('"', '\\"')
    lines.append(f'  "{en_escaped}": "{fr_escaped}",')

output = "\n".join(lines)
print(f"Generated {len(translations)} translation entries")

# Write to a temp file
with open("community_fr_entries.txt", "w", encoding="utf-8") as f:
    f.write(output)

print(f"Written to community_fr_entries.txt ({len(output)} chars)")
