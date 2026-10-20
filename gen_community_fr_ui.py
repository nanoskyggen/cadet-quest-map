#!/usr/bin/env python3
"""Generate additional French translations for community_training.js UI strings."""

entries = {}

# === UI status and label strings ===
ui_strings = {
    "LOCKED": "VERROUILLÉ",
    "READY": "PRÊT",
    "COMPLETE": "TERMINÉ",
    "IN PROGRESS": "EN COURS",
    "CURRENT": "ACTUEL",
    "ACHIEVED": "ATEINT",
    "MAX RANK": "GRADE MAX",
    "MAX RANK ACHIEVED": "GRADE MAXIMAL ATTEINT",
    "CALLSIGN:": "INDICATIF:",
    "NONE": "AUCUN",
    "of": "de",
    "to": "à",
    "Correct": "Correct",
    "Pass": "Réussite",
    "Stages": "Étapes",
    "Reward": "Récompense",
    "Badge + 100 XP": "Insigne + 100 XP",
    "Read": "Lu",
    "Tap to read": "Toucher pour lire",
    "STEP": "ÉTAPE",
    "TASK": "TÂCHE",
    "Module": "Module",
    "Select a Mission": "Sélectionner une Mission",
    "Select a completed mission": "Sélectionner une mission terminée",
    "Select a completed mission…": "Sélectionner une mission terminée…",
    "Choose a training module from the Training tab, or pick a mission below to enter the simulator.": "Choisissez un module de formation dans l'onglet Formation, ou sélectionnez une mission ci-dessous pour entrer dans le simulateur.",
    "Back to list": "Retour à la liste",
    "Back to mission list": "Retour à la liste des missions",
    "Back to Start": "Retour au Départ",
    "Submit & Confirm": "Soumettre & Confirmer",
    "tasks complete": "tâches terminées",
    "This task requires the": "Cette tâche nécessite le",
    "to be open.": "soit ouvert.",
    "Current tool:": "Outil actuel:",
    "Wrong tool! This task requires": "Mauvais outil! Cette tâche nécessite",
    "You currently have": "Vous avez actuellement",
    "no tool": "aucun outil",
    "open. Open the correct tool from the dock above.": "ouvert. Ouvrez le bon outil depuis la barre ci-dessus.",
    "Incorrect.": "Incorrect.",
    "Correct answer:": "Bonne réponse:",
    "Select an answer by tapping one of the options above.": "Sélectionnez une réponse en touchant l'une des options ci-dessus.",
    "Correct!": "Correct!",
    "Correct! Items are in the right order.": "Correct! Les éléments sont dans le bon ordre.",
    "Correct! Task completed.": "Correct! Tâche terminée.",
    "The order is not correct yet. Rearrange the items using the up/down arrows and try again.": "L'ordre n'est pas encore correct. Réorganisez les éléments avec les flèches haut/bas et réessayez.",
    "Unknown task type.": "Type de tâche inconnu.",
    "The correct answer is:": "La bonne réponse est:",
    "look for the most community-service-sound option": "cherchez l'option la plus adaptée au service communautaire",
    "The correct order starts with item": "Le bon ordre commence par l'élément",
    "Use the up/down arrows to arrange all items.": "Utilisez les flèches haut/bas pour organiser tous les éléments.",
    "Mission Complete:": "Mission Terminée:",
    "Mission complete!": "Mission terminée!",
    "XP earned.": "XP gagnés.",
    "Badge unlocked:": "Insigne débloqué:",
    "Community Service Cadet": "Cadet de Service Communautaire",
    "You have successfully completed all": "Vous avez terminé avec succès toutes les",
    "tasks and earned the": "tâches et gagné l'insigne",
    "badge.": "insigne.",
    "XP Earned": "XP Gagnés",
    "Tasks Done": "Tâches Terminées",
    "Wrong Attempts": "Tentatives Erronées",
    "File SITREP for this mission": "Déposer SITREP pour cette mission",
    "No SITREPs filed yet. Complete a mission and file your first report.": "Aucun SITREP déposé pour l'instant. Terminez une mission et déposez votre premier rapport.",
    "Please select a completed mission.": "Veuillez sélectionner une mission terminée.",
    "Please choose an overall status.": "Veuillez choisir un statut global.",
    "Your summary must be at least 20 characters long.": "Votre résumé doit contenir au moins 20 caractères.",
    "SITREP filed successfully! +20 XP. Your community service instructor has received your report.": "SITREP déposé avec succès! +20 XP. Votre instructeur de service communautaire a reçu votre rapport.",
    "SITREP filed! +20 XP": "SITREP déposé! +20 XP",
    "Article read:": "Article lu:",
    "Already read:": "Déjà lu:",
    "is locked. Complete the previous module first.": "est verrouillé. Terminez d'abord le module précédent.",
    "XP to next rank": "XP au grade suivant",
    "Project Command Center": "Centre de Commandement Projet",
    "You are the cadet project leader for a community clean-up event. The Project Command Center puts you through eight critical stages of planning and leading a community service project. At each stage, you must choose the right course of action. Every choice affects your project success meters: Planning, Safety, Impact, Teamwork, and Budget. Make the correct decision in at least 6 of 8 stages to earn the Project Command badge and +100 XP.": "Vous êtes le chef de projet cadet pour un événement de nettoyage communautaire. Le Centre de Commandement Projet vous fait passer par huit étapes critiques de planification et de direction d'un projet de service communautaire. À chaque étape, vous devez choisir la bonne ligne de conduite. Chaque choix affecte vos indicateurs de réussite du projet: Planification, Sécurité, Impact, Travail d'Équipe et Budget. Prenez la bonne décision dans au moins 6 des 8 étapes pour gagner l'insigne du Commandement Projet et +100 XP.",
    "Begin Project Command": "Commencer le Commandement Projet",
    "Complete 6 of 8 stages correctly to earn the Project Command badge.": "Complétez 6 des 8 étapes correctement pour gagner l'insigne du Commandement Projet.",
    "Project Command badge earned! Best score:": "Insigne du Commandement Projet gagné! Meilleur score:",
    "Play again to improve.": "Jouez à nouveau pour vous améliorer.",
    "Stage": "Étape",
    "See Results": "Voir les Résultats",
    "Next Stage": "Étape Suivante",
    "Project Status": "Statut du Projet",
    "Badge earned!": "Insigne gagné!",
    "Best:": "Meilleur:",
    "Project Command badge earned! +100 XP": "Insigne du Commandement Projet gagné! +100 XP",
    "Project Command completed again!": "Commandement Projet terminé à nouveau!",
    "You succeeded in": "Vous avez réussi",
    "stages.": "étapes.",
    "needed to pass. Try again!": "nécessaires pour réussir. Réessayez!",
    "Project Success!": "Succès du Projet!",
    "Project Needs Improvement": "Le Projet Nécessite des Améliorations",
    "You made the right decisions in": "Vous avez pris les bonnes décisions dans",
    "of": "sur",
    "project stages. Your community service project was a success! The Project Command badge is yours.": "étapes du projet. Votre projet de service communautaire a été un succès! L'insigne du Commandement Projet est à vous.",
    "stages. You needed": "étapes. Il vous fallait",
    "to pass. Review the training modules and try the command center again.": "pour réussir. Révisez les modules de formation et réessayez le centre de commandement.",
    "Stages Correct": "Étapes Correctes",
    "Project Command Badge": "Insigne du Commandement Projet",
    "Try Again": "Réessayer",
    "Playing: uplifting community spirit atmosphere": "Lecture: atmosphère d'esprit communautaire inspirante",
    "Community music on": "Musique communautaire activée",
    "Click to toggle uplifting community service atmosphere": "Cliquez pour activer l'atmosphère inspirante du service communautaire",
    "Community music off": "Musique communautaire désactivée",
}

entries.update(ui_strings)

# === Project stage tags ===
stage_tags = {
    "PROJECT SCOPE": "PORTÉE DU PROJET",
    "OBJECTIVES": "OBJECTIFS",
    "RISK MANAGEMENT": "GESTION DES RISQUES",
    "CIVILIAN COMMUNICATION": "COMMUNICATION CIVILE",
    "RESOURCES & LOGISTICS": "RESSOURCES & LOGISTIQUE",
    "EXECUTION": "EXÉCUTION",
    "INCIDENT MANAGEMENT": "GESTION DES INCIDENCES",
    "REFLECTION & DEBRIEF": "RÉFLEXION & DEBRIEFING",
}
entries.update(stage_tags)

# Also add the applyI18n key versions for stage tags
for i, tag in enumerate(["PROJECT SCOPE", "OBJECTIVES", "RISK MANAGEMENT", "CIVILIAN COMMUNICATION", "RESOURCES & LOGISTICS", "EXECUTION", "INCIDENT MANAGEMENT", "REFLECTION & DEBRIEF"]):
    entries[f"community_project_stage{i}_tag"] = stage_tags[tag]

# === Learn article tags ===
article_tags = {
    "Planning": "Planification",
    "Risk Management": "Gestion des Risques",
    "Communication": "Communication",
    "Citizenship": "Citoyenneté",
    "Leadership": "Leadership",
    "Project Management": "Gestion de Projet",
}
entries.update(article_tags)

# Article tag keys
article_tag_keys = [
    ("la_smart", "Planning"),
    ("la_riskmatrix", "Risk Management"),
    ("la_hoc", "Risk Management"),
    ("la_email", "Communication"),
    ("la_contactlog", "Communication"),
    ("la_raci", "Planning"),
    ("la_contingency", "Planning"),
    ("la_debrief", "Leadership"),
    ("la_citizenship", "Citizenship"),
    ("la_partnership", "Citizenship"),
    ("la_safetybrief", "Risk Management"),
    ("la_volunteers", "Leadership"),
    ("la_pox02", "Citizenship"),
    ("la_scopecreep", "Project Management"),
    ("la_impact", "Project Management"),
]
for aid, tag in article_tag_keys:
    entries[f"community_article_{aid}_tag"] = article_tags.get(tag, tag)

# === Meter labels (used via tr() for "Planning", "Safety", etc.) ===
# These are already in the entries from the gen_community_fr.py script
# but let's make sure they're here too
meter_labels = {
    "Planning": "Planification",
    "Safety": "Sécurité",
    "Impact": "Impact",
    "Teamwork": "Travail d'Équipe",
    "Budget": "Budget",
}
# Don't override if already present with different value
for k, v in meter_labels.items():
    if k not in entries:
        entries[k] = v

# Write entries
with open("community_fr_ui_entries.txt", "w", encoding="utf-8") as f:
    f.write("  // ===== Community Service Training (lesson 112) UI strings =====\n")
    for key, val in entries.items():
        # Escape any embedded quotes
        ek = key.replace('"', '\\"')
        ev = val.replace('"', '\\"')
        f.write(f'  "{ek}": "{ev}",\n')

print(f"Generated {len(entries)} UI translation entries")
print(f"Written to community_fr_ui_entries.txt")
