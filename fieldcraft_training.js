/* ============================================================
   ADVANCED FIELDCRAFT & CAMOUFLAGE TRAINING COMMAND — fieldcraft_training.js
   Operation Ghost Walker: hands-on Red Star fieldcraft & camouflage simulator
   Maple Defender-style dashboard engine (IIFE architecture)
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "fieldcraftTrainingProgress",
    sitreps: "fieldcraftTrainingSitreps",
    wrongAttempts: "fieldcraftTrainingWrongAttempts",
    streak: "fieldcraftTrainingStreak",
    bestStreak: "fieldcraftTrainingBestStreak",
    readArticles: "fieldcraftTrainingReadArticles"
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const FIELDCRAFT_BADGE_ID = 14;

  // ==========================================================
  // RANK LADDER (Fieldcraft progression ranks)
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Field Recruit",          icon: "🌱",  xp: 0,    callsign: "GHOST-1" },
    { id: 1, name: "Field Cadet",            icon: "🌿",  xp: 300,  callsign: "STALK-2" },
    { id: 2, name: "Senior Field Cadet",     icon: "⭐",  xp: 700,  callsign: "SENIOR-3" },
    { id: 3, name: "Fieldcraft Instructor Cadet", icon: "🏅",  xp: 1200, callsign: "INSTR-4" },
    { id: 4, name: "Concealment Commander Cadet",  icon: "👑",  xp: 1800, callsign: "CMDR-5" },
    { id: 5, name: "Master Ghost Walker",    icon: "🏆",  xp: 2500, callsign: "MASTER-6" }
  ];

  // ==========================================================
  // TOOLS (fieldcraft & camouflage tools cadets must "open")
  // ==========================================================
  const TOOLS = [
    { id: "camokit",        icon: "🎨", label: "Camouflage Kit" },
    { id: "netting",        icon: "🥅", label: "Cam Netting" },
    { id: "bivouac",        icon: "⛺", label: "Bivouac Gear" },
    { id: "facepaint",      icon: "🖌️", label: "Face Paint" },
    { id: "binos",          icon: "🔭", label: "Binoculars" },
    { id: "opcard",         icon: "📋", label: "OP Log Card" },
    { id: "signalcard",     icon: "🤟", label: "Field Signal Card" },
    { id: "compass",        icon: "🧭", label: "Compass" },
    { id: "knife",          icon: "🔪", label: "Field Knife" },
    { id: "tape",           icon: "🔌", label: "Gear Tape" },
    { id: "naturalmat",     icon: "🍃", label: "Natural Materials" },
    { id: "rangepac",       icon: "📏", label: "Range Card" },
    { id: "sitrepform",     icon: "📝", label: "SITREP Form" },
    { id: "fieldprep",      icon: "🛠️", label: "Field Prep Checklist" }
  ];

  // ==========================================================
  // TRAINING MISSIONS — Advanced Fieldcraft & Camouflage
  // Based on Red Star fieldcraft syllabus + 7 S's concealment doctrine
  // Each mission has 4 hands-on tasks. Tool enforcement required.
  // ==========================================================
  const MISSIONS = [
    {
      id: "fc_camouflage",
      order: 1,
      tag: "FIELDCRAFT 01",
      icon: "🎨",
      title: "Personal Camouflage & Concealment",
      desc: "Master the 7 S's of tactical concealment and apply personal camouflage using natural materials.",
      xp: 100,
      brief: "Your fieldcraft instructor is running a practical on personal camouflage and the 7 S's of tactical concealment. The 7 S's — Shape, Shine, Shadow, Silhouette, Sound, Speed (sudden movement), and Spacing — are the principles that explain why things are seen and how to avoid detection. You will apply face paint, break up your outline with natural materials, dull shine on equipment, manage your shadow, and avoid skyline silhouettes. Every cadet must understand that concealment is not just about camouflage clothing — it is about defeating the seven ways the human eye detects a target.",
      scene: "camouflage",
      chapters: [
        { title: "The 7 S's Overview", desc: "Shape, Shine, Shadow, Silhouette, Sound, Speed, Spacing." },
        { title: "Shape & Outline", desc: "Break up predictable human geometry with natural materials." },
        { title: "Shine & Shadow", desc: "Matte all surfaces; align your shadow with natural features." },
        { title: "Silhouette & Sound", desc: "Avoid skylines; tape down loose gear to prevent noise." }
      ],
      tasks: [
        {
          type: "select", tool: "camokit",
          title: "Identify the 7 S's",
          prompt: "Before applying camouflage, you must know the 7 S's of why things are seen. Select the complete list of the 7 S's of tactical concealment from the options below.",
          options: [
            "Size, Shape, Shine, Shadow, Silhouette, Sound, Speed",
            "Shape, Shine, Shadow, Silhouette, Sound, Speed (Sudden Movement), Spacing",
            "Shape, Shine, Shadow, Silhouette, Sound, Smell, Spacing",
            "Shape, Shine, Shadow, Size, Sound, Speed, Surface"
          ],
          expected: "Shape, Shine, Shadow, Silhouette, Sound, Speed (Sudden Movement), Spacing",
          hint: "The 7 S's include sudden movement and spacing between team members.",
          proof: "The 7 S's are Shape, Shine, Shadow, Silhouette, Sound, Speed (Sudden Movement), and Spacing. These are the seven factors that cause an object to be seen."
        },
        {
          type: "toggle", tool: "facepaint",
          title: "Apply Face Paint",
          prompt: "Open the Face Paint tool and apply camo paint to your face. Toggle the indicator to confirm you have applied face paint covering all exposed skin — forehead, cheeks, nose, ears, and hands.",
          expected: true,
          hint: "Click the toggle row to switch it to the ON (green) position.",
          proof: "Face paint applied. All exposed skin is covered with disruptive patterns. Shine from skin oils is eliminated."
        },
        {
          type: "note", tool: "naturalmat",
          title: "Break Up Your Outline",
          prompt: "Open the Natural Materials tool and write a log entry describing how you break up your human outline (Shape). Include the keywords: outline, vegetation, and irregular.",
          keywords: ["outline", "vegetation", "irregular"],
          altKeywords: ["shape", "natural", "break"],
          hint: "Your note must include: outline, vegetation, irregular (or shape, natural, break).",
          proof: "Outline broken using irregular vegetation attached to the body. The predictable human shape is now disguised with natural materials."
        },
        {
          type: "select", tool: "tape",
          title: "Eliminate Shine and Sound",
          prompt: "Select the correct procedure for eliminating both Shine and Sound from your equipment before a stalk.",
          options: [
            "Polish metal items and shake your pack to test for noise",
            "Apply matte tape or mud to shiny surfaces and secure all loose gear to prevent rattling",
            "Remove all metal items and walk without your pack",
            "Wear bright clothing so teammates can see you"
          ],
          expected: "Apply matte tape or mud to shiny surfaces and secure all loose gear to prevent rattling",
          hint: "Shine is defeated by matte finishes; Sound is defeated by securing loose items.",
          proof: "Shine eliminated with matte tape/mud on reflective surfaces. Sound eliminated by taping down all loose gear. Both S's are now managed."
        }
      ]
    },
    {
      id: "fc_stalking",
      order: 2,
      tag: "FIELDCRAFT 02",
      icon: "🦎",
      title: "Stalking & Movement Techniques",
      desc: "Execute the leopard crawl, high crawl, and stalking techniques to close distance undetected.",
      xp: 100,
      brief: "Your fieldcraft instructor has set up a stalking lane. Stalking is the art of closing distance to an observation position or target without being detected. You will learn the leopard crawl (belly flat, push with toes, pull with forearms), the high crawl (on forearms and knees, faster but less concealed), and the walking stalk (slow, deliberate steps, pause frequently). The key principles are: move slowly, pause often, use available cover, keep your head lower than the surrounding vegetation, and freeze instantly if you detect movement. The challenge is to stalk to within 20 metres of an OP without being detected.",
      scene: "stalking",
      chapters: [
        { title: "Leopard Crawl", desc: "Belly flat on ground, push with toes, pull with forearms." },
        { title: "High Crawl", desc: "On forearms and knees — faster but less concealed." },
        { title: "Movement Timing", desc: "Move when the wind rustles vegetation; pause frequently." },
        { title: "Freeze Protocol", desc: "If detected, freeze and blend with surroundings." }
      ],
      tasks: [
        {
          type: "select", tool: "fieldprep",
          title: "Select the Leopard Crawl Technique",
          prompt: "Before entering the stalking lane, identify the correct technique for the leopard crawl.",
          options: [
            "Belly flat on the ground, push with toes, pull with forearms, head down",
            "Standing upright, crouch-walking in long strides",
            "On hands and knees, moving quickly between cover",
            "Rolling sideways along the ground in short bursts"
          ],
          expected: "Belly flat on the ground, push with toes, pull with forearms, head down",
          hint: "The leopard crawl keeps your entire body flat against the ground.",
          proof: "Leopard crawl technique confirmed: belly flat, push with toes, pull with forearms. This is the most concealed individual movement technique."
        },
        {
          type: "slider", tool: "fieldprep",
          title: "Set Your Movement Pace",
          prompt: "When stalking, your movement must be extremely slow to avoid detection. Set the slider to the recommended maximum movement speed (in metres per minute) for an effective leopard crawl stalk.",
          max: 20,
          expected: 3,
          tolerance: 2,
          unit: "m/min",
          hint: "An effective stalk moves at only a few metres per minute — extremely slow.",
          proof: "Movement pace set to 3 m/min. Slow, deliberate movement is essential to avoid detection by the human eye's sensitivity to motion."
        },
        {
          type: "select", tool: "compass",
          title: "Choose the Right Cover",
          prompt: "You are approaching the OP and must choose your route. Which cover option provides the best concealment for your stalk?",
          options: [
            "Cross the open field directly — shortest distance",
            "Move along the skyline ridge for the best view",
            "Use the treeline and dense undergrowth, staying below the surrounding vegetation",
            "Follow the dry creek bed in the open valley"
          ],
          expected: "Use the treeline and dense undergrowth, staying below the surrounding vegetation",
          hint: "Avoid skylines and open ground. Use natural cover and stay low.",
          proof: "Route selected through treeline and undergrowth, below the vegetation line. Natural cover provides concealment and avoids skyline silhouetting."
        },
        {
          type: "note", tool: "fieldprep",
          title: "Log Your Stalk",
          prompt: "Write a log entry describing how you executed the stalk to within 20 metres of the OP. Include the keywords: leopard, cover, and freeze.",
          keywords: ["leopard", "cover", "freeze"],
          altKeywords: ["crawl", "slow", "pause"],
          hint: "Your note must include: leopard, cover, freeze (or crawl, slow, pause).",
          proof: "Stalk log recorded. Used leopard crawl through natural cover, paused frequently, and froze when movement was detected. Closed to within 20 metres undetected."
        }
      ]
    },
    {
      id: "fc_observation",
      order: 3,
      tag: "FIELDCRAFT 03",
      icon: "🔭",
      title: "Observation Post (OP) Operations",
      desc: "Set up and operate a two-person observation post for surveillance and reporting.",
      xp: 100,
      brief: "Your section has been tasked to establish an observation post. An OP is a concealed position from which a cadet observes and reports enemy activity. In a two-person OP, one cadet observes while the other records. The OP must be located in a position with good fields of observation, natural concealment, and a covered approach route. You will select the OP site, construct the position using natural materials, establish a range card for reference points, and maintain the OP discipline of silent observation and accurate reporting. The observer uses binoculars and the naked eye alternately — the naked eye is better for detecting movement, while binoculars are used for detailed identification.",
      scene: "observation",
      chapters: [
        { title: "OP Site Selection", desc: "Good observation, natural cover, covered approach." },
        { title: "Position Construction", desc: "Use natural terrain; avoid digging that creates contrast." },
        { title: "Range Card", desc: "Sketch reference points, distances, and sectors." },
        { title: "Observer/Recorder Roles", desc: "One observes, one records — rotate regularly." }
      ],
      tasks: [
        {
          type: "select", tool: "binos",
          title: "Select the OP Site",
          prompt: "Choose the best location for your two-person observation post from the options below.",
          options: [
            "On top of the highest hill for maximum visibility",
            "On the military crest of a hill, just below the skyline, with natural vegetation and a covered approach",
            "In the bottom of a valley for maximum concealment",
            "Next to a prominent lone tree on a ridge"
          ],
          expected: "On the military crest of a hill, just below the skyline, with natural vegetation and a covered approach",
          hint: "The military crest is just below the hilltop — it provides observation without silhouetting.",
          proof: "OP site selected on the military crest. Below the skyline for silhouette management, with natural vegetation for concealment and a covered approach route."
        },
        {
          type: "toggle", tool: "netting",
          title: "Conceal the OP Position",
          prompt: "Open the Cam Netting tool. Toggle to confirm you have covered the OP position with cam netting augmented with natural vegetation from the immediate area.",
          expected: true,
          hint: "Click the toggle row to switch it to the ON (green) position.",
          proof: "OP position concealed with cam netting and natural vegetation. The position blends with the surrounding terrain and shows no artificial outline."
        },
        {
          type: "note", tool: "rangepac",
          title: "Complete the Range Card",
          prompt: "Open the Range Card tool and write a log entry describing the key elements you recorded on your range card. Include the keywords: reference, distance, and sector.",
          keywords: ["reference", "distance", "sector"],
          altKeywords: ["landmark", "range", "azimuth"],
          hint: "Your note must include: reference, distance, sector (or landmark, range, azimuth).",
          proof: "Range card completed. Reference points, distances, and sectors of observation are recorded for quick target identification."
        },
        {
          type: "select", tool: "opcard",
          title: "Observer/Recorder Discipline",
          prompt: "In a two-person OP, how should the observer and recorder roles be managed?",
          options: [
            "Both observe simultaneously for maximum coverage",
            "One observes through binoculars continuously, the other records; rotate every 15-20 minutes to prevent eye fatigue",
            "The recorder observes while the observer rests",
            "Both take turns sleeping to maintain endurance"
          ],
          expected: "One observes through binoculars continuously, the other records; rotate every 15-20 minutes to prevent eye fatigue",
          hint: "Roles rotate regularly to prevent fatigue. One observes, one records.",
          proof: "OP discipline established. Observer and recorder rotate every 15-20 minutes to prevent eye fatigue and maintain observation effectiveness."
        }
      ]
    },
    {
      id: "fc_signals",
      order: 4,
      tag: "FIELDCRAFT 04",
      icon: "🤟",
      title: "Silent Field Signals",
      desc: "Communicate section movements using hand-and-arm signals for silent coordination.",
      xp: 100,
      brief: "Your section is operating in a noise-discipline environment where voice communication would compromise your position. Silent field signals — hand-and-arm signals — are the primary method of section-level communication in the field. You will learn the standard signals for enemy contact, halt, advance, change direction, take cover, and rally. Each signal must be deliberate, visible to all members, and acknowledged. The section commander initiates signals and each member passes them down the line so the entire section receives the message. Silent signals require that all cadets maintain visual contact with the person ahead of them in the formation.",
      scene: "signals",
      chapters: [
        { title: "Standard Hand Signals", desc: "Halt, advance, enemy, take cover, rally." },
        { title: "Signal Relay", desc: "Each member passes signals down the line." },
        { title: "Visual Contact", desc: "Maintain sight of the cadet ahead at all times." },
        { title: "Acknowledgment", desc: "Repeat the signal to confirm receipt." }
      ],
      tasks: [
        {
          type: "select", tool: "signalcard",
          title: "Identify the Enemy Contact Signal",
          prompt: "Select the correct hand-and-arm signal for enemy contact (enemy in sight).",
          options: [
            "Wave both arms in a wide circle above the head",
            "Point in the direction of the enemy with a closed fist",
            "Raise the arm with fist clenched, pointing in the direction of the enemy",
            "Place both hands on top of the head"
          ],
          expected: "Raise the arm with fist clenched, pointing in the direction of the enemy",
          hint: "The enemy contact signal uses a clenched fist raised in the direction of the threat.",
          proof: "Enemy contact signal confirmed: clenched fist raised, pointing toward the enemy. This is the standard military hand signal for enemy in sight."
        },
        {
          type: "select", tool: "signalcard",
          title: "Identify the Halt Signal",
          prompt: "Select the correct hand-and-arm signal to halt the section.",
          options: [
            "Raise the open hand straight up, palm facing forward",
            "Cross both arms in front of the chest",
            "Place one finger vertically over the lips",
            "Tap the helmet twice with an open palm"
          ],
          expected: "Raise the open hand straight up, palm facing forward",
          hint: "The halt signal is a simple raised open hand.",
          proof: "Halt signal confirmed: open hand raised straight up, palm forward. The entire section stops and takes a knee."
        },
        {
          type: "toggle", tool: "signalcard",
          title: "Confirm Signal Relay Protocol",
          prompt: "Toggle to confirm that you understand each section member must relay received signals down the line so the entire section receives the message, and acknowledge by repeating the signal.",
          expected: true,
          hint: "Click the toggle row to switch it to the ON (green) position.",
          proof: "Signal relay protocol confirmed. Each member passes signals down the line and acknowledges by repeating. The entire section receives every command."
        },
        {
          type: "note", tool: "signalcard",
          title: "Log the Signal Drill",
          prompt: "Write a log entry describing how your section communicated a direction change using silent signals. Include the keywords: signal, visual, and acknowledge.",
          keywords: ["signal", "visual", "acknowledge"],
          altKeywords: ["hand", "arm", "relay"],
          hint: "Your note must include: signal, visual, acknowledge (or hand, arm, relay).",
          proof: "Signal drill logged. Section communicated direction change using hand-and-arm signals, maintained visual contact, and acknowledged each signal down the line."
        }
      ]
    },
    {
      id: "fc_shine_shadow",
      order: 5,
      tag: "FIELDCRAFT 05",
      icon: "🔦",
      title: "Shine, Shadow & Silhouette Management",
      desc: "Master the concealment principles of defeating shine, managing shadows, and avoiding skylines.",
      xp: 100,
      brief: "Your fieldcraft instructor is running an advanced concealment workshop focused on three of the 7 S's: Shine, Shadow, and Silhouette. Shine is any reflection that catches the eye — from metal, skin oils, glass, or water. Shadow is both your ally and enemy: a shadow cast in the wrong direction reveals your position, while aligning your shadow with natural features conceals you. Silhouette is the dark outline of your body against a lighter background — the most common way cadets are detected is by crossing a skyline. You will learn to matte all equipment, use shadows to your advantage, and always stay below the skyline using the military crest.",
      scene: "shine_shadow",
      chapters: [
        { title: "Shine Elimination", desc: "Matte metal, cover skin, remove reflective items." },
        { title: "Shadow Management", desc: "Align shadow with natural features; avoid lone shadows." },
        { title: "Skyline Avoidance", desc: "Never cross a ridge line; use the military crest." },
        { title: "Background Contrast", desc: "Choose backgrounds that match your camouflage tone." }
      ],
      tasks: [
        {
          type: "select", tool: "tape",
          title: "Identify Shine Sources",
          prompt: "Which of the following is NOT a common source of shine that must be eliminated for effective concealment?",
          options: [
            "Skin oils on the face and hands",
            "Metal buckles, canteen cups, and weapon parts",
            "Matte camo fabric on the uniform",
            "Glass lenses on binoculars and watches"
          ],
          expected: "Matte camo fabric on the uniform",
          hint: "Matte fabric is designed to prevent shine — it is the solution, not the problem.",
          proof: "Correct. Matte camo fabric is the solution to shine, not a source. Skin oils, metal, and glass are the primary shine sources that must be eliminated."
        },
        {
          type: "select", tool: "compass",
          title: "Shadow Management Principle",
          prompt: "How should you manage your shadow when moving in the field?",
          options: [
            "Ignore it — shadows are not visible from a distance",
            "Align your shadow with natural shadow lines and features to avoid casting a lone shadow",
            "Always walk so your shadow points toward the enemy",
            "Move only at noon when shadows are shortest"
          ],
          expected: "Align your shadow with natural shadow lines and features to avoid casting a lone shadow",
          hint: "A lone shadow on open ground is a giveaway. Blend your shadow with natural ones.",
          proof: "Shadow management confirmed: align your shadow with natural shadow lines. A lone human shadow on open ground is a clear detection indicator."
        },
        {
          type: "select", tool: "compass",
          title: "Skyline Avoidance",
          prompt: "What is the military crest and why is it used instead of the topographical crest?",
          options: [
            "The highest point of the hill — provides the best view",
            "The point just below the hilltop where you can observe without being silhouetted against the sky",
            "The bottom of the hill where cover is thickest",
            "The midpoint of the slope where the terrain is flattest"
          ],
          expected: "The point just below the hilltop where you can observe without being silhouetted against the sky",
          hint: "The military crest is below the skyline — you can see without being seen.",
          proof: "Military crest identified: the point just below the hilltop. It allows observation of the terrain ahead without creating a skyline silhouette."
        },
        {
          type: "note", tool: "naturalmat",
          title: "Concealment Assessment Log",
          prompt: "Write a log entry describing how you managed shine, shadow, and silhouette during your approach. Include the keywords: matte, skyline, and crest.",
          keywords: ["matte", "skyline", "crest"],
          altKeywords: ["shine", "shadow", "below"],
          hint: "Your note must include: matte, skyline, crest (or shine, shadow, below).",
          proof: "Concealment log recorded. Equipment matted to eliminate shine, shadow aligned with natural features, and approach made below the skyline using the military crest."
        }
      ]
    },
    {
      id: "fc_bivouac",
      order: 6,
      tag: "FIELDCRAFT 06",
      icon: "⛺",
      title: "Bivouac Site Selection & Field Living",
      desc: "Select a safe bivouac site and maintain field hygiene and equipment care.",
      xp: 100,
      brief: "Your section is establishing an overnight bivouac in the field. Bivouac site selection is critical for safety and concealment. The site must avoid environmental hazards: dead trees that may fall (widowmakers), poisonous plants, and dangerous insect nesting areas. Animal risks include proximity to watering holes — camps should be at least 60 metres from water sources. Shelters should be spaced 2 metres apart to prevent fire spread. Individual hygiene includes changing clothes regularly, disposing of waste water 60 metres from water sources, and digging cat holes 16-20 cm deep and 60 metres from water. Equipment must be signed out from the quartermaster, kept clean and secured, and any loss or damage reported immediately.",
      scene: "bivouac",
      chapters: [
        { title: "Site Safety", desc: "Avoid dead trees, poisonous plants, insect nests." },
        { title: "Water Distance", desc: "Camp 60 metres from water sources." },
        { title: "Field Hygiene", desc: "Cat holes 16-20 cm deep, 60 m from water." },
        { title: "Equipment Care", desc: "Sign out, clean, secure, report loss or damage." }
      ],
      tasks: [
        {
          type: "slider", tool: "bivouac",
          title: "Set Camp Distance from Water",
          prompt: "Bivouac sites must be a safe distance from water sources to avoid contamination and animal traffic. Set the slider to the minimum required distance (in metres) from any water source.",
          max: 100,
          expected: 60,
          tolerance: 5,
          unit: "m",
          hint: "The minimum distance from water is a round number between 50 and 70 metres.",
          proof: "Camp distance set to 60 metres from the water source. This prevents water contamination and avoids animal traffic near watering holes."
        },
        {
          type: "select", tool: "bivouac",
          title: "Identify Bivouac Hazards",
          prompt: "Which of the following is NOT a primary environmental hazard to check for when selecting a bivouac site?",
          options: [
            "Dead trees or hanging branches (widowmakers) that may fall",
            "Poisonous plants such as poison ivy, oak, or sumac",
            "Insect nesting areas — beehives, hornet nests, ant hills",
            "Flat, well-drained ground with natural wind protection"
          ],
          expected: "Flat, well-drained ground with natural wind protection",
          hint: "Flat, well-drained, wind-protected ground is a GOOD site feature, not a hazard.",
          proof: "Correct. Flat, well-drained ground with wind protection is a desirable site feature. Dead trees, poisonous plants, and insect nests are the hazards to avoid."
        },
        {
          type: "slider", tool: "bivouac",
          title: "Cat Hole Depth",
          prompt: "When digging a cat hole for waste disposal in the field, set the slider to the required depth (in centimetres).",
          max: 40,
          expected: 18,
          tolerance: 4,
          unit: "cm",
          hint: "The standard cat hole depth is between 16 and 20 centimetres.",
          proof: "Cat hole depth set to 18 cm (within the 16-20 cm standard). Waste is properly buried at a safe distance from water sources."
        },
        {
          type: "note", tool: "fieldprep",
          title: "Equipment Care Log",
          prompt: "Write a log entry describing how you managed your section equipment during the bivouac. Include the keywords: quartermaster, clean, and report.",
          keywords: ["quartermaster", "clean", "report"],
          altKeywords: ["sign", "secure", "damage"],
          hint: "Your note must include: quartermaster, clean, report (or sign, secure, damage).",
          proof: "Equipment care log recorded. All gear signed out from the quartermaster, kept clean and secured, and any loss or damage will be reported immediately."
        }
      ]
    },
    {
      id: "fc_sound_speed",
      order: 7,
      tag: "FIELDCRAFT 07",
      icon: "🔇",
      title: "Sound & Movement Discipline",
      desc: "Master the Sound and Speed (sudden movement) principles of concealment.",
      xp: 100,
      brief: "Your fieldcraft instructor is running a practical on the Sound and Speed (sudden movement) principles — two of the 7 S's that cadets most commonly fail. Sound discipline means securing all loose equipment before movement: tape canteens, pad metal-on-metal contacts, and test your pack by shaking it before a stalk. The human ear can detect footsteps on dry leaves, breaking twigs, and clothing rustle from significant distances. Speed discipline means moving slowly and deliberately — the human eye is far more sensitive to sudden movement than to slow motion. When moving, pause frequently, move when the wind rustles vegetation to mask your sound, and freeze instantly if you sense detection.",
      scene: "sound_speed",
      chapters: [
        { title: "Gear Silence Check", desc: "Shake-test your pack; tape all loose items." },
        { title: "Footstep Discipline", desc: "Test the ground before committing weight." },
        { title: "Wind Masking", desc: "Time movement with natural wind gusts." },
        { title: "Freeze on Detection", desc: "Stop instantly and blend with surroundings." }
      ],
      tasks: [
        {
          type: "toggle", tool: "tape",
          title: "Secure Loose Equipment",
          prompt: "Open the Gear Tape tool. Toggle to confirm you have taped down all loose equipment — canteens, metal buckles, ammunition pouches — and performed a shake test on your pack to verify silence.",
          expected: true,
          hint: "Click the toggle row to switch it to the ON (green) position.",
          proof: "Loose equipment secured with tape. Shake test performed and passed. No rattling or clanking detected. Sound discipline established."
        },
        {
          type: "select", tool: "fieldprep",
          title: "Movement Timing Principle",
          prompt: "When is the best time to move during a stalk to mask your sound?",
          options: [
            "When the air is completely still for maximum silence",
            "When the wind rustles vegetation, masking the sound of your movement",
            "Only at night when sound does not travel",
            "When it is raining heavily to cover all noise"
          ],
          expected: "When the wind rustles vegetation, masking the sound of your movement",
          hint: "Natural ambient noise from wind can mask your movement sounds.",
          proof: "Movement timing confirmed: move when the wind rustles vegetation. Natural ambient noise masks footsteps and gear sound, reducing detection risk."
        },
        {
          type: "select", tool: "fieldprep",
          title: "Sudden Movement Detection",
          prompt: "Why is sudden movement the most common cause of detection during a stalk?",
          options: [
            "It makes more noise than slow movement",
            "The human eye is highly sensitive to rapid motion and movement against a static background",
            "It disturbs more vegetation",
            "It creates body heat that is detectable"
          ],
          expected: "The human eye is highly sensitive to rapid motion and movement against a static background",
          hint: "The human visual system is specifically tuned to detect motion.",
          proof: "Correct. The human eye is evolutionarily tuned to detect sudden movement against a static background. Slow, deliberate movement avoids triggering this detection response."
        },
        {
          type: "note", tool: "fieldprep",
          title: "Sound & Speed Discipline Log",
          prompt: "Write a log entry describing how you managed sound and movement discipline during your approach. Include the keywords: secure, slow, and freeze.",
          keywords: ["secure", "slow", "freeze"],
          altKeywords: ["tape", "pause", "deliberate"],
          hint: "Your note must include: secure, slow, freeze (or tape, pause, deliberate).",
          proof: "Sound and speed discipline log recorded. Equipment secured, movement slow and deliberate with frequent pauses, and freeze protocol executed when movement was detected."
        }
      ]
    },
    {
      id: "fc_challenge",
      order: 8,
      tag: "FIELDCRAFT 08",
      icon: "🏆",
      title: "Ghost Walker Final Challenge",
      desc: "Integrate all fieldcraft skills in the capstone stalk-to-OP exercise.",
      xp: 150,
      brief: "This is the capstone fieldcraft challenge. You will integrate all skills learned in the previous modules — the 7 S's of concealment, personal camouflage, leopard crawl stalking, OP operations, silent field signals, bivouac discipline, and sound/movement management. Your mission is to stalk to within 20 metres of an observation post without being detected, using cover, shadow, and slow movement. You must apply personal camouflage, manage all 7 S's throughout the approach, execute the leopard crawl through natural cover, and freeze when the OP observer sweeps your sector. This is the final test of your Advanced Fieldcraft & Camouflage training.",
      scene: "challenge",
      chapters: [
        { title: "Camouflage Up", desc: "Apply face paint and natural materials." },
        { title: "7 S's Check", desc: "Verify all concealment principles are managed." },
        { title: "Execute the Stalk", desc: "Leopard crawl through cover to 20 metres." },
        { title: "Report & Debrief", desc: "File the final mission SITREP." }
      ],
      tasks: [
        {
          type: "select", tool: "camokit",
          title: "Final Camouflage Check",
          prompt: "Before beginning the stalk, perform your final camouflage check. Which of the 7 S's must you verify before moving?",
          options: [
            "Only Shape and Shine — the others matter less",
            "All 7 S's: Shape, Shine, Shadow, Silhouette, Sound, Speed, and Spacing",
            "Only Sound and Speed — movement is the key",
            "Only Silhouette — skyline is the biggest risk"
          ],
          expected: "All 7 S's: Shape, Shine, Shadow, Silhouette, Sound, Speed, and Spacing",
          hint: "Every S must be managed. Skipping any one creates a detection risk.",
          proof: "Final camouflage check complete. All 7 S's verified: Shape (outline broken), Shine (matted), Shadow (aligned), Silhouette (below skyline), Sound (gear taped), Speed (slow), Spacing (staggered)."
        },
        {
          type: "slider", tool: "fieldprep",
          title: "Close to Final Distance",
          prompt: "Your challenge is to stalk to within 20 metres of the OP. Set the slider to your final closing distance (in metres).",
          max: 50,
          expected: 20,
          tolerance: 3,
          unit: "m",
          hint: "The challenge target is exactly 20 metres.",
          proof: "Final distance achieved: 20 metres from the OP. You have closed to within the required distance without being detected."
        },
        {
          type: "select", tool: "fieldprep",
          title: "Freeze Protocol Execution",
          prompt: "During your stalk, the OP observer sweeps your sector. What is the correct action?",
          options: [
            "Speed up to clear the sector before the observer sees you",
            "Freeze completely and blend with the surrounding ground cover until the observer's gaze passes",
            "Roll sideways out of the sector",
            "Back up slowly to increase your distance"
          ],
          expected: "Freeze completely and blend with the surrounding ground cover until the observer's gaze passes",
          hint: "When detected risk is high, the answer is to freeze and rely on your camouflage.",
          proof: "Freeze protocol executed correctly. You froze and blended with the ground cover. The observer's gaze passed without detection. Camouflage and stillness combined for effective concealment."
        },
        {
          type: "note", tool: "sitrepform",
          title: "File the Challenge SITREP",
          prompt: "Write your final challenge SITREP summarising the Ghost Walker capstone exercise. Include the keywords: stalk, undetected, and 7 S's.",
          keywords: ["stalk", "undetected", "7 s's"],
          altKeywords: ["crawl", "concealed", "camouflage"],
          hint: "Your note must include: stalk, undetected, 7 S's (or crawl, concealed, camouflage).",
          proof: "Challenge SITREP filed. Ghost Walker capstone exercise complete. Stalked to within 20 metres of the OP, remained undetected, and applied all 7 S's of concealment throughout the approach."
        }
      ]
    }
  ];

  // ==========================================================
  // FIELDCRAFT BADGES (auto-generated from MISSIONS)
  // ==========================================================
  const FIELDCRAFT_BADGES = MISSIONS.map(m => ({
    id: "b_" + m.id,
    icon: m.icon,
    name: m.title,
    xp: m.xp,
    mission: m.id
  }));

  // ==========================================================
  // LEARN ARTICLES (Fieldcraft Knowledge Base)
  // ==========================================================
  const LEARN_ARTICLES = [
    { id: "l_7s_overview",    cat: "Concealment",     icon: "👁️", title: "The 7 S's Overview",                 desc: "Shape, Shine, Shadow, Silhouette, Sound, Speed (Sudden Movement), and Spacing — the seven reasons things are seen.", xp: 15 },
    { id: "l_shape",          cat: "Concealment",     icon: "📐", title: "Shape — Breaking the Outline",       desc: "The human form is instantly recognisable. Break it up with natural materials and irregular patterns.", xp: 15 },
    { id: "l_shine",          cat: "Concealment",     icon: "✨", title: "Shine — Defeating Reflection",       desc: "Skin oils, metal, glass, and water all reflect light. Matte everything and cover exposed skin.", xp: 15 },
    { id: "l_shadow",         cat: "Concealment",     icon: "🌑", title: "Shadow — Your Ally and Enemy",       desc: "Align your shadow with natural features. A lone shadow on open ground is a dead giveaway.", xp: 15 },
    { id: "l_silhouette",     cat: "Concealment",     icon: "⛰️", title: "Silhouette — Below the Skyline",     desc: "Never cross a ridge line. Use the military crest — just below the hilltop — to observe without being seen.", xp: 15 },
    { id: "l_sound",          cat: "Concealment",     icon: "🔇", title: "Sound — Silence Your Gear",          desc: "Tape down loose equipment, test your pack, and move when the wind masks your footsteps.", xp: 15 },
    { id: "l_speed",          cat: "Concealment",     icon: "🏃", title: "Speed — Slow is Smooth",             desc: "The human eye detects sudden movement. Move slowly, pause frequently, and freeze if detected.", xp: 15 },
    { id: "l_spacing",        cat: "Concealment",     icon: "👥", title: "Spacing — Avoid Patterns",           desc: "Randomize distances between team members. Even spacing creates a detectable geometric pattern.", xp: 15 },
    { id: "l_leopard_crawl",  cat: "Movement",        icon: "🦎", title: "The Leopard Crawl",                  desc: "Belly flat on the ground, push with toes, pull with forearms. The most concealed movement technique.", xp: 15 },
    { id: "l_high_crawl",     cat: "Movement",        icon: "🧗", title: "The High Crawl",                     desc: "On forearms and knees. Faster than the leopard crawl but less concealed. Use when cover is adequate.", xp: 15 },
    { id: "l_walking_stalk",  cat: "Movement",        icon: "🚶", title: "The Walking Stalk",                  desc: "Slow, deliberate steps. Test the ground before committing weight. Pause frequently between steps.", xp: 15 },
    { id: "l_freeze",         cat: "Movement",        icon: "🧊", title: "The Freeze Protocol",                desc: "If you sense detection, freeze completely. Rely on your camouflage and stillness to blend with the terrain.", xp: 15 },
    { id: "l_op_site",        cat: "Observation",     icon: "🔭", title: "OP Site Selection",                  desc: "Choose the military crest with natural vegetation and a covered approach. Avoid skylines and lone features.", xp: 15 },
    { id: "l_op_construction",cat: "Observation",     icon: "🛠️", title: "OP Construction",                    desc: "Use natural terrain features. Avoid digging that creates contrast. Augment cam netting with local vegetation.", xp: 15 },
    { id: "l_range_card",     cat: "Observation",     icon: "📏", title: "The Range Card",                     desc: "Sketch reference points, distances, and sectors of observation for quick target identification.", xp: 15 },
    { id: "l_observer_roles", cat: "Observation",     icon: "👥", title: "Observer & Recorder Roles",          desc: "One observes, one records. Rotate every 15-20 minutes to prevent eye fatigue.", xp: 15 },
    { id: "l_hand_signals",   cat: "Field Signals",   icon: "🤟", title: "Standard Hand Signals",              desc: "Halt (open hand up), enemy contact (clenched fist pointing), advance (arm sweep), take cover (flat hand down).", xp: 15 },
    { id: "l_signal_relay",   cat: "Field Signals",   icon: "🔗", title: "Signal Relay Protocol",              desc: "Each member passes signals down the line. Acknowledge by repeating. Maintain visual contact with the cadet ahead.", xp: 15 },
    { id: "l_bivouac_site",   cat: "Field Living",    icon: "⛺", title: "Bivouac Site Selection",             desc: "Avoid dead trees, poisonous plants, and insect nests. Camp 60 metres from water sources.", xp: 15 },
    { id: "l_field_hygiene",  cat: "Field Living",    icon: "🧼", title: "Field Hygiene",                      desc: "Cat holes 16-20 cm deep, 60 m from water. Change clothes regularly. Dispose of waste water 60 m from water.", xp: 15 },
    { id: "l_equip_care",     cat: "Field Living",    icon: "📦", title: "Equipment Care in the Field",        desc: "Sign out from quartermaster, keep clean and secured, report any loss or damage immediately.", xp: 15 }
  ];

  // ==========================================================
  // ARENA QUESTIONS — Advanced Fieldcraft & Camouflage
  // Drawn from all 8 training modules: 7 S's, camouflage,
  // stalking, OP operations, field signals, shine/shadow/silhouette,
  // bivouac, sound & movement discipline, capstone challenge.
  // ==========================================================
  const ARENA_QUESTIONS = [
    // ── The 7 S's of Concealment ──
    { eo: "7 S's", q: "What are the 7 S's of tactical concealment?", options: ["Size, Shape, Shine, Shadow, Silhouette, Sound, Speed", "Shape, Shine, Shadow, Silhouette, Sound, Speed (Sudden Movement), Spacing", "Shape, Shine, Shadow, Silhouette, Sound, Smell, Spacing", "Shape, Shine, Shadow, Size, Sound, Speed, Surface"], correct: 1 },
    { eo: "7 S's", q: "Which of the 7 S's refers to the predictable human outline?", options: ["Shine", "Shape", "Shadow", "Spacing"], correct: 1 },
    { eo: "7 S's", q: "Which of the 7 S's is defeated by taping down loose equipment?", options: ["Shape", "Shine", "Sound", "Shadow"], correct: 2 },
    { eo: "7 S's", q: "Which of the 7 S's is about moving slowly and avoiding rapid motion?", options: ["Speed (Sudden Movement)", "Sound", "Spacing", "Shadow"], correct: 0 },
    { eo: "7 S's", q: "Which of the 7 S's is managed by randomizing distances between team members?", options: ["Shape", "Spacing", "Shine", "Silhouette"], correct: 1 },
    { eo: "7 S's", q: "Which of the 7 S's is eliminated by matte finishes and covering exposed skin?", options: ["Shape", "Shine", "Sound", "Speed"], correct: 1 },
    { eo: "7 S's", q: "Which of the 7 S's is avoided by staying below the skyline?", options: ["Shine", "Silhouette", "Shadow", "Sound"], correct: 1 },
    { eo: "7 S's", q: "Which of the 7 S's is managed by aligning your shadow with natural features?", options: ["Shadow", "Shape", "Shine", "Spacing"], correct: 0 },

    // ── Personal Camouflage ──
    { eo: "CAMO", q: "What is the primary purpose of face paint in personal camouflage?", options: ["To look intimidating", "To eliminate shine from skin oils and break up the facial shape", "To protect against sunburn", "To keep insects away"], correct: 1 },
    { eo: "CAMO", q: "How should natural materials be used for camouflage?", options: ["Worn in neat, even rows", "Attached irregularly to break up the body outline and match the surroundings", "Only on the helmet", "Replaced every 5 minutes"], correct: 1 },
    { eo: "CAMO", q: "Why must you matte all shiny equipment before a stalk?", options: ["To make it look new", "Because shine from metal or glass catches the eye and reveals your position", "To reduce weight", "To prevent rust"], correct: 1 },
    { eo: "CAMO", q: "What is the correct procedure for eliminating shine and sound from equipment?", options: ["Polish metal items and shake your pack to test for noise", "Apply matte tape or mud to shiny surfaces and secure all loose gear to prevent rattling", "Remove all metal items and walk without your pack", "Wear bright clothing so teammates can see you"], correct: 1 },
    { eo: "CAMO", q: "What parts of the body must be covered with face paint?", options: ["Only the cheeks", "All exposed skin — forehead, cheeks, nose, ears, and hands", "Only the forehead and nose", "Only the hands"], correct: 1 },

    // ── Stalking & Movement ──
    { eo: "STALK", q: "What is the leopard crawl technique?", options: ["Standing upright, crouch-walking in long strides", "Belly flat on the ground, push with toes, pull with forearms, head down", "On hands and knees, moving quickly between cover", "Rolling sideways along the ground in short bursts"], correct: 1 },
    { eo: "STALK", q: "How does the high crawl differ from the leopard crawl?", options: ["It is slower and more concealed", "It is done on forearms and knees — faster but less concealed", "It is done standing upright", "It is done by rolling on the ground"], correct: 1 },
    { eo: "STALK", q: "When stalking, how often should you pause?", options: ["Never — keep moving steadily", "Frequently — pause every few metres and observe before continuing", "Only when you hear a noise", "Only at the start and end"], correct: 1 },
    { eo: "STALK", q: "What should you do if you detect movement from the observer during a stalk?", options: ["Speed up to clear the area", "Freeze completely and blend with the surroundings", "Roll sideways out of view", "Retreat immediately"], correct: 1 },
    { eo: "STALK", q: "When is the best time to move during a stalk to mask your sound?", options: ["When the air is completely still", "When the wind rustles vegetation, masking your movement sound", "Only at night", "When it is raining heavily"], correct: 1 },
    { eo: "STALK", q: "What cover should you use when approaching an OP?", options: ["Cross the open field directly — shortest distance", "Move along the skyline ridge for the best view", "Use the treeline and dense undergrowth, staying below the surrounding vegetation", "Follow the dry creek bed in the open valley"], correct: 2 },
    { eo: "STALK", q: "What is the recommended movement speed for an effective leopard crawl stalk?", options: ["20+ metres per minute", "About 3 metres per minute — extremely slow", "10 metres per minute", "As fast as possible while staying low"], correct: 1 },

    // ── Observation Post Operations ──
    { eo: "OP", q: "Where is the best location for a two-person observation post?", options: ["On top of the highest hill for maximum visibility", "On the military crest of a hill, just below the skyline, with natural vegetation and a covered approach", "In the bottom of a valley for maximum concealment", "Next to a prominent lone tree on a ridge"], correct: 1 },
    { eo: "OP", q: "What is the military crest?", options: ["The highest point of the hill", "The point just below the hilltop where you can observe without being silhouetted against the sky", "The bottom of the hill where cover is thickest", "The midpoint of the slope"], correct: 1 },
    { eo: "OP", q: "How should the observer and recorder roles be managed in a two-person OP?", options: ["Both observe simultaneously for maximum coverage", "One observes through binoculars continuously, the other records; rotate every 15-20 minutes to prevent eye fatigue", "The recorder observes while the observer rests", "Both take turns sleeping"], correct: 1 },
    { eo: "OP", q: "What is a range card used for in an OP?", options: ["To measure the range of radio signals", "To sketch reference points, distances, and sectors of observation for quick target identification", "To record the temperature and weather", "To track the observer's working hours"], correct: 1 },
    { eo: "OP", q: "Why should the OP position be augmented with natural vegetation from the immediate area?", options: ["To provide food for the observers", "To blend the cam netting with the local terrain so it does not show an artificial outline", "To create a windbreak", "To mark the position for friendly forces"], correct: 1 },
    { eo: "OP", q: "When observing, when should you use the naked eye versus binoculars?", options: ["Always use binoculars for better detail", "The naked eye is better for detecting movement; binoculars are used for detailed identification", "Never use binoculars — they reflect light", "Alternate randomly with no particular reason"], correct: 1 },

    // ── Silent Field Signals ──
    { eo: "SIGNALS", q: "What is the hand-and-arm signal for enemy contact (enemy in sight)?", options: ["Wave both arms in a wide circle above the head", "Point in the direction of the enemy with a closed fist", "Raise the arm with fist clenched, pointing in the direction of the enemy", "Place both hands on top of the head"], correct: 2 },
    { eo: "SIGNALS", q: "What is the hand-and-arm signal to halt the section?", options: ["Raise the open hand straight up, palm facing forward", "Cross both arms in front of the chest", "Place one finger vertically over the lips", "Tap the helmet twice with an open palm"], correct: 0 },
    { eo: "SIGNALS", q: "How are silent field signals relayed through a section?", options: ["Only the section commander needs to see the signal", "Each member passes received signals down the line so the entire section receives the message", "Signals are only given to the nearest cadet", "All cadets watch the commander directly at all times"], correct: 1 },
    { eo: "SIGNALS", q: "How should a cadet acknowledge receiving a silent field signal?", options: ["Verbally confirm receipt", "Repeat the signal to confirm receipt", "Nod their head only", "No acknowledgment is needed"], correct: 1 },
    { eo: "SIGNALS", q: "Why must all section members maintain visual contact with the cadet ahead of them?", options: ["To prevent getting lost", "To receive and relay silent field signals effectively", "To provide moral support", "It is not necessary in the field"], correct: 1 },

    // ── Shine, Shadow & Silhouette ──
    { eo: "SHINE", q: "Which of the following is NOT a common source of shine?", options: ["Skin oils on the face and hands", "Metal buckles, canteen cups, and weapon parts", "Matte camo fabric on the uniform", "Glass lenses on binoculars and watches"], correct: 2 },
    { eo: "SHINE", q: "How should you manage your shadow when moving in the field?", options: ["Ignore it — shadows are not visible from a distance", "Align your shadow with natural shadow lines and features to avoid casting a lone shadow", "Always walk so your shadow points toward the enemy", "Move only at noon when shadows are shortest"], correct: 1 },
    { eo: "SHINE", q: "Why must you never cross a ridge line or skyline?", options: ["It is physically dangerous", "Your body creates a dark silhouette against the lighter sky, making you instantly visible", "It violates radio discipline", "The wind is too strong on ridges"], correct: 1 },
    { eo: "SHINE", q: "What is background contrast in concealment?", options: ["The difference in temperature between you and the background", "Choosing a background that matches your camouflage tone so you do not stand out", "The contrast between day and night", "The difference in elevation between you and the target"], correct: 1 },
    { eo: "SHINE", q: "What makes the military crest superior to the topographical crest for observation?", options: ["It is higher and provides a better view", "It allows observation without creating a skyline silhouette", "It is closer to water sources", "It has more vegetation"], correct: 1 },

    // ── Bivouac & Field Living ──
    { eo: "BIVOUAC", q: "What is the minimum distance a bivouac site should be from a water source?", options: ["10 metres", "30 metres", "60 metres", "100 metres"], correct: 2 },
    { eo: "BIVOUAC", q: "What environmental hazard must be checked for when selecting a bivouac site?", options: ["Flat, well-drained ground", "Dead trees or hanging branches (widowmakers) that may fall", "Natural wind protection", "Good drainage"], correct: 1 },
    { eo: "BIVOUAC", q: "How deep should a cat hole be dug for waste disposal in the field?", options: ["5-10 cm", "16-20 cm", "30-40 cm", "50+ cm"], correct: 1 },
    { eo: "BIVOUAC", q: "How far should waste water disposal be from a water source?", options: ["10 metres", "30 metres", "60 metres", "Does not matter"], correct: 2 },
    { eo: "BIVOUAC", q: "How far apart should individual shelters be spaced in a bivouac?", options: ["0.5 metres", "2 metres", "10 metres", "20 metres"], correct: 1 },
    { eo: "BIVOUAC", q: "What should be done if equipment is lost or damaged in the field?", options: ["Nothing — it happens in the field", "Report it immediately to the quartermaster or instructor", "Hide the loss until after the exercise", "Replace it with found items"], correct: 1 },
    { eo: "BIVOUAC", q: "Which of the following is a dangerous insect nesting area to avoid?", options: ["Open grassland", "Beehives, hornet nests, and ant hills", "Rocky outcrops", "Dense forest"], correct: 1 },
    { eo: "BIVOUAC", q: "Which poisonous plants must be identified and avoided at a bivouac site?", options: ["Dandelions and clover", "Poison ivy, poison oak, and poison sumac", "Moss and lichen", "Ferns and wildflowers"], correct: 1 },

    // ── Sound & Movement Discipline ──
    { eo: "DISCIPLINE", q: "What is a shake test in the context of sound discipline?", options: ["Testing your navigation skills", "Shaking your packed gear to check for rattling or clanking sounds before a stalk", "Testing the ground for stability", "Shaking hands with team members"], correct: 1 },
    { eo: "DISCIPLINE", q: "Why is sudden movement the most common cause of detection during a stalk?", options: ["It makes more noise than slow movement", "The human eye is highly sensitive to rapid motion and movement against a static background", "It disturbs more vegetation", "It creates body heat"], correct: 1 },
    { eo: "DISCIPLINE", q: "What should you do with loose equipment before beginning a stalk?", options: ["Remove it entirely", "Tape it down and perform a shake test to verify silence", "Nothing — it will be fine", "Distribute it to other team members"], correct: 1 },
    { eo: "DISCIPLINE", q: "How should you test the ground before committing your weight during a stalk?", options: ["Step firmly to check stability", "Gently feel the ground with your hand or foot before transferring weight to avoid breaking twigs", "Jump to test the surface", "Walk normally and adjust if you hear noise"], correct: 1 },
    { eo: "DISCIPLINE", q: "What is the freeze protocol?", options: ["Running away from danger at top speed", "Stopping completely and blending with the surrounding terrain when detection is sensed", "Dropping to the ground and crawling", "Calling for support"], correct: 1 },

    // ── Capstone Challenge ──
    { eo: "CHALLENGE", q: "In the Ghost Walker capstone challenge, what distance must you stalk to within?", options: ["10 metres of the OP", "20 metres of the OP", "50 metres of the OP", "100 metres of the OP"], correct: 1 },
    { eo: "CHALLENGE", q: "Before beginning the capstone stalk, which S's must be verified?", options: ["Only Shape and Shine", "All 7 S's: Shape, Shine, Shadow, Silhouette, Sound, Speed, and Spacing", "Only Sound and Speed", "Only Silhouette"], correct: 1 },
    { eo: "CHALLENGE", q: "During the capstone stalk, the OP observer sweeps your sector. What is the correct action?", options: ["Speed up to clear the sector", "Freeze completely and blend with the surrounding ground cover", "Roll sideways out of the sector", "Back up slowly"], correct: 1 },
    { eo: "CHALLENGE", q: "What must be filed at the end of the Ghost Walker capstone exercise?", options: ["A signal fire", "A final challenge SITREP summarising the exercise", "A range card", "A phonetic alphabet chart"], correct: 1 },

    // ── Additional Concealment Questions ──
    { eo: "7 S's", q: "What does the 'Shape' principle of concealment refer to?", options: ["The physical size of the soldier", "The recognizable geometric outline of the human body and equipment that must be broken up", "The shape of the terrain", "The shape of the camo pattern"], correct: 1 },
    { eo: "CAMO", q: "Why is it important to use vegetation from the immediate area for camouflage?", options: ["It is lighter to carry", "It matches the local terrain colour and texture, avoiding contrast with the surroundings", "It grows back quickly", "It smells better than synthetic materials"], correct: 1 },
    { eo: "STALK", q: "What is the walking stalk technique?", options: ["Running between cover positions", "Slow, deliberate steps, testing the ground before committing weight, pausing frequently", "Normal walking pace with occasional stops", "Crouch-walking at moderate speed"], correct: 1 },
    { eo: "OP", q: "Why must the OP have a covered approach route?", options: ["To provide shade for the observers", "So the team can enter and exit the OP without being observed by the enemy", "To protect against rain", "To make the approach shorter"], correct: 1 },
    { eo: "SIGNALS", q: "Why are silent field signals used instead of voice communication?", options: ["Because radios are not available", "Because voice communication would compromise the section's position through sound discipline", "Because hand signals are faster than speech", "Because it is a training requirement only"], correct: 1 },
    { eo: "SHINE", q: "What is a widowmaker in the context of bivouac site selection?", options: ["A type of poisonous snake", "A dead tree or hanging branch that may fall on the camp", "A dangerous water crossing", "A steep cliff edge"], correct: 1 },
    { eo: "DISCIPLINE", q: "What is the relationship between the Speed (sudden movement) and Sound principles?", options: ["They are unrelated", "Fast movement creates both visual detection (Speed) and noise detection (Sound) — both must be managed together", "Speed only affects visual detection, not sound", "Sound only matters when stationary"], correct: 1 },
    { eo: "BIVOUAC", q: "Why should individual hygiene be maintained in the field?", options: ["For appearance during inspections", "To prevent disease, skin infections, and maintain operational effectiveness", "To impress the instructor", "It is optional in the field"], correct: 1 },
    { eo: "7 S's", q: "If you can only manage one of the 7 S's perfectly, which is generally the most critical for avoiding visual detection?", options: ["Shine", "Silhouette (skyline avoidance)", "Spacing", "Sound"], correct: 1 },
    { eo: "CAMO", q: "How often should natural camouflage materials be refreshed during a long observation?", options: ["Never — apply once and leave it", "When they wilt, dry out, or no longer match the surroundings", "Every 5 minutes", "Only at night"], correct: 1 },
    { eo: "STALK", q: "What is the most common mistake cadets make during their first stalk?", options: ["Moving too slowly", "Moving too fast and creating sudden movement that triggers detection", "Using too much camouflage", "Pausing too frequently"], correct: 1 }
  ];

  // ==========================================================
  // STATE
  // ==========================================================
  let state = loadState();
  let activeMissionId = null;
  let activeTaskIndex = 0;
  let activeTool = "";
  let toggleState = {};
  let sliderValue = {};

  function defaultState() {
    return {
      xp: 0,
      completedMissions: [],
      missionProgress: {},
      badges: [],
      sitreps: [],
      wrongAttempts: 0,
      totalAttempts: 0,
      streak: 0,
      bestStreak: 0,
      readArticles: [],
      currentMissionTask: {},
      arenaBadgeEarned: false
    };
  }
  function loadState() {
    try {
      const raw = localStorage.getItem(SK.progress);
      if (raw) return Object.assign(defaultState(), JSON.parse(raw));
    } catch (e) {}
    return defaultState();
  }
  function saveState() {
    try { localStorage.setItem(SK.progress, JSON.stringify(state)); } catch (e) {}
    syncMapProgress();
  }

  // ==========================================================
  // MAP PROGRESS SYNC -- badge 14 on the quest map
  // ==========================================================
  function syncMapProgress() {
    try {
      const allDone = MISSIONS.every(m => state.completedMissions.includes(m.id));
      let mapProgress = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || "[]");
      if (allDone && !mapProgress.includes(FIELDCRAFT_BADGE_ID)) {
        mapProgress.push(FIELDCRAFT_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      } else if (!allDone && mapProgress.includes(FIELDCRAFT_BADGE_ID)) {
        mapProgress = mapProgress.filter(id => id !== FIELDCRAFT_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      }
    } catch (e) {}
  }

  // ==========================================================
  // SCENE SVG GENERATORS -- Fieldcraft & camouflage themes
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
    const end = `</svg>`;
    const grad = (id, c1, c2) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;

    if (scene === "camouflage") {
      return base + grad("g", "#0a0d08", "#040603") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M 0 140 Q 150 100 300 120 Q 450 90 600 130 L 600 180 L 0 180 Z" fill="#1a2a14" opacity="0.8"/>
        <path d="M 0 150 Q 100 130 200 140 Q 300 125 400 145 Q 500 130 600 150 L 600 180 L 0 180 Z" fill="#2a3a1e" opacity="0.6"/>
        <circle cx="100" cy="80" r="25" fill="#4a7c2e" opacity="0.5"/>
        <circle cx="100" cy="80" r="15" fill="#6b8a3a" opacity="0.4"/>
        <ellipse cx="200" cy="90" rx="20" ry="30" fill="#3a5a2a" opacity="0.6"/>
        <ellipse cx="320" cy="75" rx="18" ry="25" fill="#4a6a3a" opacity="0.5"/>
        <circle cx="440" cy="85" r="22" fill="#3a5a2a" opacity="0.6"/>
        <ellipse cx="520" cy="80" rx="16" ry="22" fill="#4a7c2e" opacity="0.4"/>
        <text x="150" y="100" fill="#7bbd3e" font-size="9" font-family="monospace">FACE PAINT</text>
        <text x="150" y="113" fill="#9bd450" font-size="7" font-family="monospace">BREAK OUTLINE</text>
        <line x1="250" y1="50" x2="270" y2="70" stroke="#c89b5e" stroke-width="2"/>
        <line x1="260" y1="55" x2="280" y2="75" stroke="#c89b5e" stroke-width="2"/>
        <text x="265" y="95" fill="#c89b5e" font-size="7" font-family="monospace" text-anchor="middle">NATURAL</text>
        <text x="265" y="107" fill="#c89b5e" font-size="7" font-family="monospace" text-anchor="middle">MATERIALS</text>
        <rect x="380" y="55" width="50" height="30" rx="3" fill="#121a0e" stroke="#7bbd3e" stroke-width="1"/>
        <text x="405" y="73" fill="#7bbd3e" font-size="8" font-family="monospace" text-anchor="middle">7 S'S</text>
        <text x="405" y="100" fill="#9bd450" font-size="6" font-family="monospace" text-anchor="middle">CONCEALMENT</text>
        <text x="300" y="172" fill="#7bbd3e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">PERSONAL CAMOUFLAGE &amp; CONCEALMENT</text>
      ` + end;
    }
    if (scene === "stalking") {
      return base + grad("g", "#0a0d08", "#040603") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M 0 130 L 100 100 L 200 120 L 300 80 L 400 110 L 500 90 L 600 120 L 600 180 L 0 180 Z" fill="#1a2a14" opacity="0.8"/>
        <path d="M 0 145 L 120 130 L 240 140 L 360 120 L 480 135 L 600 125 L 600 180 L 0 180 Z" fill="#2a3a1e" opacity="0.5"/>
        <circle cx="80" cy="60" r="3" fill="#7bbd3e"/>
        <text x="80" y="50" fill="#7bbd3e" font-size="8" font-family="monospace" text-anchor="middle">START</text>
        <line x1="80" y1="63" x2="160" y2="100" stroke="#7bbd3e" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.5"/>
        <line x1="160" y1="103" x2="280" y2="125" stroke="#7bbd3e" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.4"/>
        <line x1="280" y1="128" x2="400" y2="115" stroke="#7bbd3e" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.3"/>
        <line x1="400" y1="118" x2="500" y2="130" stroke="#7bbd3e" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.2"/>
        <circle cx="500" cy="130" r="4" fill="#9bd450"/>
        <text x="500" y="120" fill="#9bd450" font-size="7" font-family="monospace" text-anchor="middle">20m OP</text>
        <rect x="190" y="85" width="40" height="20" rx="2" fill="#0d120a" stroke="#c89b5e" stroke-width="1"/>
        <text x="210" y="98" fill="#c89b5e" font-size="6" font-family="monospace" text-anchor="middle">LEOPARD</text>
        <text x="210" y="117" fill="#c89b5e" font-size="6" font-family="monospace" text-anchor="middle">CRAWL</text>
        <circle cx="340" cy="100" r="8" fill="none" stroke="#ff5a6e" stroke-width="1" opacity="0.4"/>
        <circle cx="340" cy="100" r="14" fill="none" stroke="#ff5a6e" stroke-width="1" opacity="0.2"/>
        <text x="340" y="90" fill="#ff5a6e" font-size="7" font-family="monospace" text-anchor="middle">FREEZE</text>
        <text x="300" y="172" fill="#7bbd3e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">STALKING &amp; MOVEMENT TECHNIQUES</text>
      ` + end;
    }
    if (scene === "observation") {
      return base + grad("g", "#0a0d08", "#040603") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M 0 140 Q 200 110 400 130 Q 500 115 600 140 L 600 180 L 0 180 Z" fill="#1a2a14" opacity="0.7"/>
        <line x1="100" y1="50" x2="100" y2="140" stroke="#4a7c2e" stroke-width="3"/>
        <line x1="120" y1="45" x2="120" y2="140" stroke="#4a7c2e" stroke-width="2" opacity="0.7"/>
        <line x1="140" y1="52" x2="140" y2="140" stroke="#4a7c2e" stroke-width="2" opacity="0.5"/>
        <ellipse cx="120" cy="50" rx="30" ry="15" fill="#3a5a2a" opacity="0.6"/>
        <text x="120" y="38" fill="#7bbd3e" font-size="7" font-family="monospace" text-anchor="middle">OP POSITION</text>
        <circle cx="120" cy="95" r="20" fill="none" stroke="#c89b5e" stroke-width="1.5"/>
        <circle cx="120" cy="95" r="12" fill="none" stroke="#c89b5e" stroke-width="1" opacity="0.6"/>
        <line x1="120" y1="88" x2="120" y2="102" stroke="#c89b5e" stroke-width="1.5"/>
        <line x1="113" y1="95" x2="127" y2="95" stroke="#c89b5e" stroke-width="1.5"/>
        <text x="120" y="125" fill="#c89b5e" font-size="6" font-family="monospace" text-anchor="middle">BINOS</text>
        <rect x="220" y="60" width="90" height="50" rx="3" fill="#0d120a" stroke="#7bbd3e" stroke-width="1"/>
        <text x="265" y="75" fill="#7bbd3e" font-size="7" font-family="monospace" text-anchor="middle">RANGE CARD</text>
        <line x1="230" y1="82" x2="300" y2="82" stroke="#4a7c2e" opacity="0.4"/>
        <text x="230" y="93" fill="#9bd450" font-size="6" font-family="monospace">100m - TREE</text>
        <text x="230" y="103" fill="#9bd450" font-size="6" font-family="monospace">200m - HILL</text>
        <circle cx="420" cy="70" r="8" fill="#4a7c2e" opacity="0.5"/>
        <text x="420" y="58" fill="#4a7c2e" font-size="6" font-family="monospace" text-anchor="middle">OBSERVER</text>
        <circle cx="480" cy="80" r="8" fill="#c89b5e" opacity="0.5"/>
        <text x="480" y="68" fill="#c89b5e" font-size="6" font-family="monospace" text-anchor="middle">RECORDER</text>
        <text x="300" y="172" fill="#7bbd3e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">OBSERVATION POST OPERATIONS</text>
      ` + end;
    }
    if (scene === "signals") {
      return base + grad("g", "#0a0d08", "#040603") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="150" cy="90" r="20" fill="none" stroke="#7bbd3e" stroke-width="2"/>
        <text x="150" y="95" fill="#7bbd3e" font-size="16" text-anchor="middle">&#9995;</text>
        <text x="150" y="122" fill="#7bbd3e" font-size="7" font-family="monospace" text-anchor="middle">FIST RAISE</text>
        <text x="150" y="133" fill="#9bd450" font-size="6" font-family="monospace" text-anchor="middle">HALT</text>
        <path d="M 200 80 L 240 80 L 235 75 M 240 80 L 235 85" fill="none" stroke="#c89b5e" stroke-width="2"/>
        <path d="M 260 80 L 300 80 L 295 75 M 300 80 L 295 85" fill="none" stroke="#c89b5e" stroke-width="2" opacity="0.6"/>
        <text x="250" y="100" fill="#c89b5e" font-size="6" font-family="monospace" text-anchor="middle">RELAY</text>
        <circle cx="380" cy="90" r="18" fill="none" stroke="#ff5a6e" stroke-width="2"/>
        <text x="380" y="95" fill="#ff5a6e" font-size="14" text-anchor="middle">&#128064;</text>
        <text x="380" y="122" fill="#ff5a6e" font-size="7" font-family="monospace" text-anchor="middle">ENEMY</text>
        <text x="380" y="133" fill="#ff5a6e" font-size="6" font-family="monospace" text-anchor="middle">CONTACT</text>
        <rect x="450" y="60" width="80" height="55" rx="3" fill="#0d120a" stroke="#7bbd3e" stroke-width="1"/>
        <text x="490" y="75" fill="#7bbd3e" font-size="7" font-family="monospace" text-anchor="middle">SIGNAL CARD</text>
        <line x1="460" y1="82" x2="520" y2="82" stroke="#4a7c2e" opacity="0.4"/>
        <text x="460" y="92" fill="#9bd450" font-size="6" font-family="monospace">HALT: FIST</text>
        <text x="460" y="102" fill="#9bd450" font-size="6" font-family="monospace">ENEMY: EYES</text>
        <text x="300" y="172" fill="#7bbd3e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">SILENT FIELD SIGNALS</text>
      ` + end;
    }
    if (scene === "shine_shadow") {
      return base + grad("g", "#0a0d08", "#040603") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="100" cy="50" r="12" fill="#f5c84c" opacity="0.8"/>
        <text x="100" y="38" fill="#f5c84c" font-size="7" font-family="monospace" text-anchor="middle">SUN</text>
        <line x1="100" y1="58" x2="130" y2="120" stroke="#f5c84c" stroke-width="1" opacity="0.3"/>
        <ellipse cx="130" cy="125" rx="20" ry="5" fill="#000000" opacity="0.6"/>
        <text x="130" y="140" fill="#f5c84c" font-size="6" font-family="monospace" text-anchor="middle">SHADOW</text>
        <rect x="180" y="55" width="30" height="20" rx="2" fill="#c89b5e" opacity="0.3"/>
        <line x1="195" y1="40" x2="195" y2="55" stroke="#fff" stroke-width="3" opacity="0.7"/>
        <circle cx="195" cy="38" r="5" fill="#fff" opacity="0.8"/>
        <text x="195" y="90" fill="#fff" font-size="6" font-family="monospace" text-anchor="middle">SHINE</text>
        <line x1="280" y1="35" x2="560" y2="35" stroke="#5b9eff" stroke-width="1" stroke-dasharray="4 4" opacity="0.3"/>
        <text x="420" y="28" fill="#5b9eff" font-size="7" font-family="monospace" text-anchor="middle">SKYLINE - AVOID</text>
        <circle cx="350" cy="80" r="10" fill="#3a5a2a" opacity="0.6"/>
        <text x="350" y="85" fill="#7bbd3e" font-size="8" text-anchor="middle">&#127811;</text>
        <text x="350" y="100" fill="#7bbd3e" font-size="6" font-family="monospace" text-anchor="middle">BELOW SKYLINE</text>
        <rect x="460" y="60" width="80" height="50" rx="3" fill="#0d120a" stroke="#c89b5e" stroke-width="1"/>
        <text x="500" y="75" fill="#c89b5e" font-size="6" font-family="monospace" text-anchor="middle">ASSESSMENT</text>
        <text x="470" y="88" fill="#9bd450" font-size="6" font-family="monospace">SHAPE: OK</text>
        <text x="470" y="98" fill="#ff5a6e" font-size="6" font-family="monospace">SHINE: FIX</text>
        <text x="300" y="172" fill="#c89b5e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">SHINE, SHADOW &amp; SILHOUETTE MGMT</text>
      ` + end;
    }
    if (scene === "bivouac") {
      return base + grad("g", "#0a0d08", "#040603") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M 0 140 Q 200 110 400 125 Q 500 115 600 135 L 600 180 L 0 180 Z" fill="#1a2a14" opacity="0.7"/>
        <polygon points="120,120 170,80 220,120" fill="#3a5a2a" stroke="#7bbd3e" stroke-width="1"/>
        <line x1="170" y1="80" x2="170" y2="120" stroke="#4a7c2e" stroke-width="1" opacity="0.5"/>
        <text x="170" y="135" fill="#7bbd3e" font-size="7" font-family="monospace" text-anchor="middle">SHELTER</text>
        <circle cx="330" cy="110" r="12" fill="#5b9eff" opacity="0.4"/>
        <text x="330" y="115" fill="#5b9eff" font-size="10" text-anchor="middle">&#128167;</text>
        <line x1="330" y1="122" x2="330" y2="140" stroke="#5b9eff" stroke-width="1" stroke-dasharray="3 3"/>
        <text x="330" y="152" fill="#5b9eff" font-size="6" font-family="monospace" text-anchor="middle">WATER</text>
        <text x="370" y="112" fill="#5b9eff" font-size="7" font-family="monospace">60m</text>
        <text x="370" y="122" fill="#5b9eff" font-size="6" font-family="monospace">DISTANCE</text>
        <rect x="430" y="85" width="30" height="20" rx="2" fill="#0d120a" stroke="#c89b5e" stroke-width="1"/>
        <line x1="445" y1="85" x2="445" y2="105" stroke="#c89b5e" stroke-width="1" stroke-dasharray="2 2"/>
        <text x="445" y="117" fill="#c89b5e" font-size="6" font-family="monospace" text-anchor="middle">CAT HOLE</text>
        <text x="445" y="127" fill="#9bd450" font-size="6" font-family="monospace" text-anchor="middle">18cm DEEP</text>
        <path d="M 80 60 L 90 55 L 85 65 Z" fill="#ff5a6e" opacity="0.6"/>
        <text x="85" y="75" fill="#ff5a6e" font-size="6" font-family="monospace" text-anchor="middle">WIDOWMAKER</text>
        <text x="520" y="80" fill="#ff5a6e" font-size="7" font-family="monospace" text-anchor="middle">HAZARD</text>
        <text x="520" y="92" fill="#ff5a6e" font-size="6" font-family="monospace" text-anchor="middle">CHECK</text>
        <text x="300" y="172" fill="#7bbd3e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">BIVOUAC SITE SELECTION &amp; FIELD LIVING</text>
      ` + end;
    }
    if (scene === "sound_speed") {
      return base + grad("g", "#0a0d08", "#040603") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M 0 130 Q 150 110 300 120 Q 450 100 600 125 L 600 180 L 0 180 Z" fill="#1a2a14" opacity="0.7"/>
        <rect x="80" y="50" width="60" height="50" rx="3" fill="#0d120a" stroke="#7bbd3e" stroke-width="1"/>
        <text x="110" y="65" fill="#7bbd3e" font-size="7" font-family="monospace" text-anchor="middle">GEAR CHECK</text>
        <text x="88" y="78" fill="#9bd450" font-size="6" font-family="monospace">TAPE LOOSE</text>
        <text x="88" y="88" fill="#ff5a6e" font-size="6" font-family="monospace">BUCKLES!</text>
        <text x="110" y="112" fill="#7bbd3e" font-size="6" font-family="monospace" text-anchor="middle">SILENCE</text>
        <path d="M 200 70 q 8 -5 16 0 q 8 -5 16 0" fill="none" stroke="#c89b5e" stroke-width="2"/>
        <path d="M 200 85 q 12 -5 24 0 q 12 -5 24 0" fill="none" stroke="#c89b5e" stroke-width="2" opacity="0.6"/>
        <text x="224" y="105" fill="#c89b5e" font-size="6" font-family="monospace" text-anchor="middle">SOUND WAVE</text>
        <text x="224" y="115" fill="#ff5a6e" font-size="6" font-family="monospace" text-anchor="middle">DETECT!</text>
        <path d="M 320 50 L 360 120" stroke="#7bbd3e" stroke-width="2.5" stroke-dasharray="6 4"/>
        <text x="345" y="45" fill="#7bbd3e" font-size="6" font-family="monospace" text-anchor="middle">SLOW</text>
        <text x="345" y="132" fill="#7bbd3e" font-size="6" font-family="monospace" text-anchor="middle">DELIBERATE</text>
        <rect x="440" y="55" width="70" height="50" rx="3" fill="#0d120a" stroke="#c89b5e" stroke-width="1"/>
        <text x="475" y="70" fill="#c89b5e" font-size="6" font-family="monospace" text-anchor="middle">DISCIPLINE</text>
        <line x1="450" y1="77" x2="500" y2="77" stroke="#4a7c2e" opacity="0.4"/>
        <text x="450" y="88" fill="#9bd450" font-size="6" font-family="monospace">SOUND: LOW</text>
        <text x="450" y="98" fill="#9bd450" font-size="6" font-family="monospace">SPEED: LOW</text>
        <text x="300" y="172" fill="#7bbd3e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">SOUND &amp; MOVEMENT DISCIPLINE</text>
      ` + end;
    }
    if (scene === "challenge") {
      return base + grad("g", "#0a0d08", "#040603") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M 0 130 Q 100 100 200 115 Q 300 95 400 110 Q 500 90 600 120 L 600 180 L 0 180 Z" fill="#1a2a14" opacity="0.8"/>
        <path d="M 0 145 L 100 135 L 200 140 L 300 125 L 400 138 L 500 130 L 600 142 L 600 180 L 0 180 Z" fill="#2a3a1e" opacity="0.5"/>
        <circle cx="60" cy="65" r="4" fill="#7bbd3e"/>
        <text x="60" y="55" fill="#7bbd3e" font-size="7" font-family="monospace" text-anchor="middle">START</text>
        <line x1="60" y1="68" x2="180" y2="100" stroke="#7bbd3e" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.4"/>
        <line x1="180" y1="103" x2="320" y2="120" stroke="#7bbd3e" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.3"/>
        <line x1="320" y1="123" x2="450" y2="115" stroke="#7bbd3e" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.2"/>
        <line x1="450" y1="118" x2="540" y2="130" stroke="#7bbd3e" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.15"/>
        <circle cx="540" cy="130" r="5" fill="#9bd450"/>
        <text x="540" y="120" fill="#9bd450" font-size="7" font-family="monospace" text-anchor="middle">OP</text>
        <text x="540" y="148" fill="#f5c84c" font-size="7" font-family="monospace" text-anchor="middle" font-weight="bold">20m</text>
        <rect x="250" y="45" width="100" height="25" rx="3" fill="#0d120a" stroke="#f5c84c" stroke-width="1"/>
        <text x="300" y="60" fill="#f5c84c" font-size="7" font-family="monospace" text-anchor="middle">GHOST WALKER</text>
        <circle cx="430" cy="70" r="12" fill="none" stroke="#ff5a6e" stroke-width="1.5"/>
        <circle cx="430" cy="70" r="20" fill="none" stroke="#ff5a6e" stroke-width="1" opacity="0.3"/>
        <text x="430" y="75" fill="#ff5a6e" font-size="8" text-anchor="middle">&#128065;</text>
        <text x="430" y="95" fill="#ff5a6e" font-size="6" font-family="monospace" text-anchor="middle">OBSERVER SWEEP</text>
        <text x="300" y="172" fill="#f5c84c" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">GHOST WALKER FINAL CHALLENGE</text>
      ` + end;
    }
    return base + `<rect width="${W}" height="${H}" fill="#0a0d08"/><text x="${W/2}" y="${H/2}" fill="#7bbd3e" font-size="12" text-anchor="middle">GHOST WALKER</text>` + end;
  }

  // ==========================================================
  // RANK HELPERS
  // ==========================================================
  function currentRank() {
    let r = RANKS[0];
    for (const rank of RANKS) {
      if (state.xp >= rank.xp) r = rank;
    }
    return r;
  }
  function nextRank() {
    const cur = currentRank();
    const idx = RANKS.indexOf(cur);
    return RANKS[idx + 1] || null;
  }
  function rankProgressPct() {
    const cur = currentRank();
    const nxt = nextRank();
    if (!nxt) return 100;
    const span = nxt.xp - cur.xp;
    const into = state.xp - cur.xp;
    return Math.max(0, Math.min(100, Math.round((into / span) * 100)));
  }

  // ==========================================================
  // BADGES
  // ==========================================================
  function refreshBadges() {
    state.badges = [];
    FIELDCRAFT_BADGES.forEach(b => {
      if (state.completedMissions.includes(b.mission)) state.badges.push(b.id);
    });
  }

  // ==========================================================
  // MISSION PROGRESS HELPERS
  // ==========================================================
  function missionProgress(missionId) {
    return state.missionProgress[missionId] || { tasksDone: [], wrongAttempts: 0 };
  }
  function missionDone(m) {
    return state.completedMissions.includes(m.id);
  }
  function missionUnlocked(m) {
    if (m.order === 1) return true;
    const prev = MISSIONS.find(x => x.order === m.order - 1);
    return prev ? missionDone(prev) : true;
  }
  function missionXP(m) {
    const mp = missionProgress(m.id);
    const penalty = mp.wrongAttempts * 10;
    return Math.max(40, m.xp - penalty);
  }
  function tasksDoneCount(m) {
    return missionProgress(m.id).tasksDone.length;
  }

  // ==========================================================
  // RENDER: SIDEBAR + TOP STATS
  // ==========================================================
  function renderSidebar() {
    const rank = currentRank();
    const nxt = nextRank();
    document.getElementById("pilotRank").textContent = rank.name;
    document.getElementById("pilotCallsign").textContent = "CALLSIGN: " + rank.callsign;
    const pct = rankProgressPct();
    document.getElementById("xpFill").style.width = pct + "%";
    const span = nxt ? (nxt.xp - rank.xp) : 100;
    const into = nxt ? (state.xp - rank.xp) : span;
    document.getElementById("xpText").textContent = into + " / " + span + " XP";
  }

  function renderTopStats() {
    const rank = currentRank();
    refreshBadges();
    document.getElementById("topRank").textContent = rank.name.replace("Field Recruit", "Recruit").replace("Field Cadet", "Cadet").replace("Field ", "").replace("Concealment ", "");
    document.getElementById("topXP").textContent = state.xp;
    document.getElementById("topBadges").textContent = state.badges.length;
  }

  // ==========================================================
  // RENDER: COMMAND (DASHBOARD)
  // ==========================================================
  function renderCommand() {
    refreshBadges();
    document.getElementById("cmdMissionsDone").textContent = state.completedMissions.length;
    document.getElementById("cmdMissionsTotal").textContent = "of " + MISSIONS.length;
    document.getElementById("cmdXP").textContent = state.xp;
    const nxt = nextRank();
    document.getElementById("cmdXPNext").textContent = nxt ? "+" + (nxt.xp - state.xp) + " to " + nxt.name : "MAX RANK";
    document.getElementById("cmdSitreps").textContent = state.sitreps.length;
    document.getElementById("cmdBadges").textContent = state.badges.length;
    document.getElementById("cmdBadgeTotal").textContent = "of " + FIELDCRAFT_BADGES.length;

    const threatPct = Math.min(80, 20 + state.wrongAttempts * 5);
    const tf = document.getElementById("threatFill");
    if (tf) tf.style.width = threatPct + "%";

    const cl = document.getElementById("chapterList");
    cl.innerHTML = MISSIONS.map(m => {
      const done = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total = m.tasks.length;
      const isActive = activeMissionId === m.id && !done;
      let cls = "chapter-row";
      let progText = "";
      if (done) { cls += " done"; progText = prog + "/" + total + " " + String.fromCharCode(10003); }
      else if (isActive) { cls += " active"; progText = prog + "/" + total + " " + String.fromCharCode(9656); }
      else if (unlocked) { progText = prog + "/" + total; }
      else { cls += " locked"; progText = "LOCKED"; }
      const num = done ? String.fromCharCode(10003) : m.order;
      return '<div class="' + cls + '" data-mission="' + m.id + '">' +
        '<span class="n">' + num + '</span>' +
        '<div class="cr-body" style="flex:1;">' +
          '<div class="cr-title">' + m.title + '</div>' +
          '<div class="cr-desc">' + m.desc + '</div>' +
        '</div>' +
        '<span class="cr-prog">' + progText + '</span>' +
      '</div>';
    }).join("");
    cl.querySelectorAll(".chapter-row:not(.locked)").forEach(el => {
      el.addEventListener("click", () => {
        const mid = el.dataset.mission;
        openMission(mid);
      });
    });
  }

  // ==========================================================
  // RENDER: TRAINING GRID
  // ==========================================================
  function renderTraining() {
    const grid = document.getElementById("trainingGrid");
    grid.innerHTML = MISSIONS.map(m => {
      const done = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total = m.tasks.length;
      const pct = Math.round((prog / total) * 100);
      let cls = "mission-card";
      let statusCls = "mc-status";
      let statusText = "";
      if (done) { cls += " done"; statusCls += " done"; statusText = "COMPLETE"; }
      else if (!unlocked) { cls += " locked"; statusCls += " locked"; statusText = "LOCKED"; }
      else { statusCls += " active"; statusText = "READY"; }
      return '<div class="' + cls + '" data-mission="' + m.id + '">' +
        '<div class="mc-top">' +
          '<div class="mc-ico">' + m.icon + '</div>' +
          '<div>' +
            '<div class="mc-tag">' + m.tag + '</div>' +
            '<div class="mc-title">' + m.title + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="mc-desc">' + m.desc + '</div>' +
        '<div class="mc-prog-bar"><div class="mc-prog-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="mc-foot">' +
          '<span class="mc-xp">' + String.fromCharCode(9889) + ' ' + missionXP(m) + ' XP</span>' +
          '<span class="' + statusCls + '">' + statusText + ' ' + String.fromCharCode(183) + ' ' + prog + '/' + total + '</span>' +
        '</div>' +
      '</div>';
    }).join("");
    grid.querySelectorAll(".mission-card:not(.locked)").forEach(el => {
      el.addEventListener("click", () => openMission(el.dataset.mission));
    });
  }

  // ==========================================================
  // RENDER: MISSION SELECTOR
  // ==========================================================
  function renderMissionSelector() {
    const sel = document.getElementById("missionSelector");
    sel.innerHTML = MISSIONS.map(m => {
      const done = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total = m.tasks.length;
      const pct = Math.round((prog / total) * 100);
      let cls = "mission-card";
      let statusCls = "mc-status";
      let statusText = "";
      if (done) { cls += " done"; statusCls += " done"; statusText = "COMPLETE"; }
      else if (activeMissionId === m.id) { cls += " active"; statusCls += " active"; statusText = "IN PROGRESS"; }
      else if (!unlocked) { cls += " locked"; statusCls += " locked"; statusText = "LOCKED"; }
      else { statusCls += " active"; statusText = "READY"; }
      return '<div class="' + cls + '" data-mission="' + m.id + '">' +
        '<div class="mc-top">' +
          '<div class="mc-ico">' + m.icon + '</div>' +
          '<div>' +
            '<div class="mc-tag">' + m.tag + '</div>' +
            '<div class="mc-title">' + m.title + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="mc-desc">' + m.desc + '</div>' +
        '<div class="mc-prog-bar"><div class="mc-prog-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="mc-foot">' +
          '<span class="mc-xp">' + String.fromCharCode(9889) + ' ' + missionXP(m) + ' XP</span>' +
          '<span class="' + statusCls + '">' + statusText + ' ' + String.fromCharCode(183) + ' ' + prog + '/' + total + '</span>' +
        '</div>' +
      '</div>';
    }).join("");
    sel.querySelectorAll(".mission-card:not(.locked)").forEach(el => {
      el.addEventListener("click", () => openMission(el.dataset.mission));
    });
  }

  // ==========================================================
  // MISSION CONSOLE
  // ==========================================================
  function openMission(missionId) {
    const m = MISSIONS.find(x => x.id === missionId);
    if (!m) return;
    if (!missionUnlocked(m)) {
      toast("warn", String.fromCharCode(128274) + " Module " + m.order + " is locked. Complete the previous module first.");
      return;
    }
    activeMissionId = missionId;
    activeTool = "";
    toggleState = {};
    sliderValue = {};

    const mp = missionProgress(missionId);
    activeTaskIndex = mp.tasksDone.length;
    if (activeTaskIndex >= m.tasks.length) activeTaskIndex = m.tasks.length - 1;

    switchSection("missions");
    document.getElementById("missionSelector").style.display = "none";
    document.getElementById("missionConsole").style.display = "block";
    document.getElementById("missionHeaderTitle").textContent = m.title;
    document.getElementById("missionHeaderSub").textContent = m.tag + " " + String.fromCharCode(8212) + " " + m.desc;

    renderMissionConsole();
    renderMissionSelector();
    renderCommand();
  }

  function renderMissionConsole() {
    const m = MISSIONS.find(x => x.id === activeMissionId);
    if (!m) return;
    const mp = missionProgress(m.id);
    const consoleEl = document.getElementById("missionConsole");

    if (missionDone(m)) {
      consoleEl.innerHTML = completedMissionHTML(m);
      const fb = document.getElementById("fileSitrepQuickBtn");
      if (fb) fb.addEventListener("click", () => { exitMission(); switchSection("sitrep"); });
      const bl = document.getElementById("backToListBtn");
      if (bl) bl.addEventListener("click", exitMission);
      return;
    }

    const task = m.tasks[activeTaskIndex];
    const total = m.tasks.length;
    toggleState[activeTaskIndex] = toggleState[activeTaskIndex] || false;

    consoleEl.innerHTML =
      '<div class="task-console">' +
        '<div class="task-header">' +
          '<div class="th-left">' +
            '<div class="th-ico">' + m.icon + '</div>' +
            '<div>' +
              '<div class="th-title">' + m.title + '</div>' +
              '<div class="th-sub">' + m.tag + ' ' + String.fromCharCode(8226) + ' ' + mp.tasksDone.length + '/' + total + ' tasks complete</div>' +
            '</div>' +
          '</div>' +
          '<div class="th-right">' +
            '<span class="task-stage-pill">TASK ' + (activeTaskIndex + 1) + ' / ' + total + '</span>' +
            '<button class="btn btn-ghost" id="exitMissionBtn" type="button">' + String.fromCharCode(8592) + ' Back to list</button>' +
          '</div>' +
        '</div>' +
        '<div class="task-body">' +
          '<div class="scene-visual">' + sceneSVG(m.scene) + '<div class="scene-overlay">' + m.brief.split(".")[0] + '.</div></div>' +
          '<div class="task-brief">' + m.brief + '</div>' +

          '<div class="tool-dock" id="toolDock">' +
            TOOLS.map(t => '<button class="tool-btn ' + (activeTool === t.id ? "active" : "") + '" data-tool="' + t.id + '" type="button"><span class="tb-ico">' + t.icon + '</span>' + t.label + '</button>').join("") +
          '</div>' +

          '<div class="tool-req" id="toolReq">' +
            '<span class="tr-ico">' + String.fromCharCode(9888) + String.fromCharCode(65039) + '</span>' +
            '<span class="tr-text">This task requires the <strong>' + toolLabel(task.tool) + '</strong> to be open. Current tool: <span class="tr-now" id="trNow">' + (activeTool ? toolLabel(activeTool) : "NONE") + '</span></span>' +
          '</div>' +

          '<div class="task-step-label">' +
            '<span class="step-num">STEP ' + (activeTaskIndex + 1) + '</span>' +
            '<span class="step-title">' + task.title + '</span>' +
          '</div>' +
          '<div class="task-instructions">' + task.prompt + '</div>' +

          '<div class="task-control" id="taskControl">' +
            renderTaskControl(task, activeTaskIndex) +
          '</div>' +

          '<div class="task-actions">' +
            '<button class="btn btn-primary" id="submitTaskBtn" type="button">' + String.fromCharCode(10003) + ' Submit &amp; Confirm</button>' +
            '<button class="btn btn-ghost" id="hintBtn" type="button">' + String.fromCharCode(128161) + ' Hint</button>' +
          '</div>' +

          '<div class="terminal" id="terminal"><div class="ln ln-dim">// awaiting input' + String.fromCharCode(8230) + '</div></div>' +
          '<div class="task-feedback" id="taskFeedback"></div>' +

          '<hr class="divider"/>' +
          '<h3 style="margin-bottom:10px;">Mission Checklist</h3>' +
          '<div class="checklist" id="checklist">' +
            m.tasks.map((t, i) => {
              const done = mp.tasksDone.includes(i);
              return '<div class="check-item ' + (done ? "done" : "") + '"><div class="ci-box"></div><div>' + t.title + '</div></div>';
            }).join("") +
          '</div>' +
        '</div>' +
      '</div>';

    bindConsoleEvents(task);
    if (activeTool !== task.tool) {
      activeTool = task.tool;
      const btn = document.querySelector('#toolDock .tool-btn[data-tool="' + task.tool + '"]');
      if (btn) btn.classList.add('active');
      document.querySelectorAll('#toolDock .tool-btn').forEach(b => { if (b.dataset.tool !== task.tool) b.classList.remove('active'); });
    }
    updateToolReq(task);
  }

  function renderTaskControl(task, idx) {
    if (task.type === "toggle") {
      const on = toggleState[idx];
      return '<div class="toggle-row ' + (on ? "on" : "") + '" id="toggleRow" data-idx="' + idx + '">' +
        '<div class="toggle-switch"></div>' +
        '<div class="toggle-label">' + task.title + '</div>' +
        '<div class="toggle-icon">' + (on ? String.fromCharCode(10003) : String.fromCharCode(9675)) + '</div>' +
      '</div>';
    }
    if (task.type === "select") {
      const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
      return '<select class="task-select" id="taskSelect" data-idx="' + idx + '">' +
        '<option value="">' + String.fromCharCode(8212) + ' Select your answer ' + String.fromCharCode(8212) + '</option>' +
        task.options.map(o => '<option value="' + esc(o) + '">' + esc(o) + '</option>').join("") +
      '</select>';
    }
    if (task.type === "type") {
      return '<input class="task-input" id="taskInput" type="text" placeholder="Type your answer' + String.fromCharCode(8230) + '" autocomplete="off" />';
    }
    if (task.type === "note") {
      return '<textarea class="task-note" id="taskNote" placeholder="Write your log entry here' + String.fromCharCode(8230) + '"></textarea>';
    }
    if (task.type === "slider") {
      sliderValue[idx] = sliderValue[idx] !== undefined ? sliderValue[idx] : 0;
      const unit = task.unit || "m";
      return '<input class="task-slider" id="taskSlider" type="range" min="0" max="' + (task.max || 100) + '" value="' + sliderValue[idx] + '" data-idx="' + idx + '" />' +
        '<div class="slider-readout" id="sliderReadout">' + sliderValue[idx] + ' ' + unit + '</div>';
    }
    return "";
  }

  function bindConsoleEvents(task) {
    document.querySelectorAll("#toolDock .tool-btn").forEach(b => {
      b.addEventListener("click", () => {
        activeTool = b.dataset.tool;
        document.querySelectorAll("#toolDock .tool-btn").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        updateToolReq(task);
        termPush("info", String.fromCharCode(9656) + " Opened " + toolLabel(activeTool));
      });
    });

    const toggleRow = document.getElementById("toggleRow");
    if (toggleRow) {
      toggleRow.addEventListener("click", () => {
        const idx = parseInt(toggleRow.dataset.idx, 10);
        toggleState[idx] = !toggleState[idx];
        const on = toggleState[idx];
        toggleRow.classList.toggle("on", on);
        toggleRow.querySelector(".toggle-icon").textContent = on ? String.fromCharCode(10003) : String.fromCharCode(9675);
      });
    }

    const slider = document.getElementById("taskSlider");
    if (slider) {
      slider.addEventListener("input", () => {
        const idx = parseInt(slider.dataset.idx, 10);
        sliderValue[idx] = parseInt(slider.value, 10);
        const unit = task.unit || "m";
        document.getElementById("sliderReadout").textContent = sliderValue[idx] + " " + unit;
      });
    }

    const submitBtn = document.getElementById("submitTaskBtn");
    if (submitBtn) submitBtn.addEventListener("click", () => submitTask(task));
    const hintBtn = document.getElementById("hintBtn");
    if (hintBtn) hintBtn.addEventListener("click", () => showHint(task));
    const exitBtn = document.getElementById("exitMissionBtn");
    if (exitBtn) exitBtn.addEventListener("click", exitMission);
  }

  function updateToolReq(task) {
    const req = document.getElementById("toolReq");
    const now = document.getElementById("trNow");
    if (!req) return;
    const satisfied = activeTool === task.tool;
    req.classList.toggle("satisfied", satisfied);
    const ico = req.querySelector(".tr-ico");
    if (satisfied) {
      ico.textContent = String.fromCharCode(9989);
      now.textContent = toolLabel(activeTool);
    } else {
      ico.textContent = String.fromCharCode(9888) + String.fromCharCode(65039);
      now.textContent = activeTool ? toolLabel(activeTool) : "NONE";
    }
  }

  function toolLabel(id) {
    const t = TOOLS.find(x => x.id === id);
    return t ? t.label : id;
  }

  // ==========================================================
  // TERMINAL
  // ==========================================================
  function termPush(kind, text) {
    const term = document.getElementById("terminal");
    if (!term) return;
    const ln = document.createElement("div");
    ln.className = "ln ln-" + kind;
    ln.textContent = text;
    term.appendChild(ln);
    term.scrollTop = term.scrollHeight;
  }

  // ==========================================================
  // VALIDATE + SUBMIT TASK
  // ==========================================================
  function submitTask(task) {
    const m = MISSIONS.find(x => x.id === activeMissionId);
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback";

    if (activeTool !== task.tool) {
      state.totalAttempts++;
      state.wrongAttempts++;
      state.streak = 0;
      saveState();
      fb.classList.add("show", "err");
      fb.innerHTML = String.fromCharCode(10060) + " Wrong tool! This task requires <strong>" + toolLabel(task.tool) + "</strong>. You currently have <strong>" + (activeTool ? toolLabel(activeTool) : "no tool") + "</strong> open. Open the correct tool from the dock above.";
      termPush("err", String.fromCharCode(10007) + " FAILED " + String.fromCharCode(8212) + " wrong tool. Required: " + toolLabel(task.tool));
      updateAnalysis();
      return;
    }

    const valid = validateTask(task);
    state.totalAttempts++;

    if (!valid.ok) {
      state.wrongAttempts++;
      state.streak = 0;
      const mp = missionProgress(m.id);
      mp.wrongAttempts = (mp.wrongAttempts || 0) + 1;
      state.missionProgress[m.id] = mp;
      saveState();
      fb.classList.add("show", "err");
      fb.innerHTML = String.fromCharCode(10060) + " " + valid.msg;
      termPush("err", String.fromCharCode(10007) + " " + valid.msg);
      updateAnalysis();
      return;
    }

    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    const mp = missionProgress(m.id);
    if (!mp.tasksDone.includes(activeTaskIndex)) mp.tasksDone.push(activeTaskIndex);
    state.missionProgress[m.id] = mp;
    saveState();

    fb.classList.add("show", "ok");
    fb.innerHTML = String.fromCharCode(9989) + " Correct! " + task.proof;
    termPush("ok", String.fromCharCode(10003) + " " + task.proof);

    activeTaskIndex++;
    if (activeTaskIndex >= m.tasks.length) {
      completeMission(m);
    } else {
      setTimeout(() => renderMissionConsole(), 1100);
    }
    updateAnalysis();
  }

  function validateTask(task) {
    if (task.type === "toggle") {
      const on = toggleState[activeTaskIndex];
      return on === task.expected ? { ok: true } : { ok: false, msg: "Toggle the indicator to the ON position first." };
    }
    if (task.type === "select") {
      const sel = document.getElementById("taskSelect");
      const val = sel ? sel.value : "";
      if (!val) return { ok: false, msg: "Select an answer from the dropdown." };
      return val === task.expected ? { ok: true } : { ok: false, msg: "Incorrect. The correct answer is not \"" + val + "\". Review the options and try again." };
    }
    if (task.type === "type") {
      const inp = document.getElementById("taskInput");
      const val = (inp ? inp.value : "").trim().toUpperCase();
      if (!val) return { ok: false, msg: "Type your answer in the input field." };
      const exp = String(task.expected).toUpperCase();
      return val === exp ? { ok: true } : { ok: false, msg: "\"" + val + "\" is not correct. Hint: " + task.expected.length + " characters." };
    }
    if (task.type === "note") {
      const ta = document.getElementById("taskNote");
      const val = (ta ? ta.value : "").trim();
      if (val.length < 10) return { ok: false, msg: "Your log entry is too short. Write a complete sentence." };
      const lower = val.toLowerCase();
      const checkKw = (kws) => kws.every(k => lower.includes(k.toLowerCase()));
      const mainOk = task.keywords ? checkKw(task.keywords) : true;
      const altOk = task.altKeywords ? checkKw(task.altKeywords) : false;
      if (mainOk || altOk) return { ok: true };
      const missing = task.keywords.filter(k => !lower.includes(k.toLowerCase()));
      return { ok: false, msg: "Your note is missing required keywords: " + missing.join(", ") + ". Make sure to include them." };
    }
    if (task.type === "slider") {
      const v = sliderValue[activeTaskIndex] || 0;
      const tol = task.tolerance || 1;
      if (Math.abs(v - task.expected) <= tol) return { ok: true };
      const unit = task.unit || "m";
      return { ok: false, msg: "The reading is set to " + v + " " + unit + ". Adjust the dial to match the target." };
    }
    return { ok: false, msg: "Unknown task type." };
  }

  function showHint(task) {
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback show info";
    let hint = "";
    if (task.type === "select") hint = "The correct answer relates to: " + task.expected.slice(0, 40) + String.fromCharCode(8230);
    else if (task.type === "type") hint = "The answer has " + task.expected.length + " characters and starts with \"" + task.expected.charAt(0) + "\".";
    else if (task.type === "note") hint = "Your note must include: " + task.keywords.join(", ") + (task.altKeywords ? " (or " + task.altKeywords.join(", ") + ")" : "") + ".";
    else if (task.type === "toggle") hint = "Click the toggle row to switch it to the ON (green) position.";
    else if (task.type === "slider") hint = "The target reading is close to " + task.expected + " " + (task.unit || "m") + ".";
    fb.textContent = String.fromCharCode(128161) + " " + hint;
  }

  // ==========================================================
  // COMPLETE MISSION
  // ==========================================================
  function completeMission(m) {
    if (!state.completedMissions.includes(m.id)) {
      state.completedMissions.push(m.id);
      const earned = missionXP(m);
      state.xp += earned;
      saveState();
      refreshBadges();
      syncMapProgress();
      const badge = FIELDCRAFT_BADGES.find(b => b.mission === m.id);
      toast("ok", String.fromCharCode(127942) + " Mission complete! +" + earned + " XP earned. Badge unlocked: " + (badge ? badge.name : m.title) + ".");
    }
    renderMissionConsole();
    renderMissionSelector();
    renderCommand();
    renderSidebar();
    renderTopStats();
    renderAnalysis();
    renderRanks();
  }

  function completedMissionHTML(m) {
    const earned = missionXP(m);
    const badge = FIELDCRAFT_BADGES.find(b => b.mission === m.id);
    const mp = missionProgress(m.id);
    return '<div class="task-console">' +
      '<div class="task-body">' +
        '<div class="complete-card">' +
          '<div class="cc-ico">' + String.fromCharCode(127942) + '</div>' +
          '<div class="cc-title">Mission Complete: ' + m.title + '</div>' +
          '<div class="cc-sub">' + m.desc + ' You have successfully completed all ' + m.tasks.length + ' tasks and earned the <strong>' + (badge ? badge.name : "Field Cadet") + '</strong> badge.</div>' +
          '<div class="cc-stats">' +
            '<div class="cc-stat"><div class="v">+' + earned + '</div><div class="l">XP Earned</div></div>' +
            '<div class="cc-stat"><div class="v">' + mp.tasksDone.length + '/' + m.tasks.length + '</div><div class="l">Tasks Done</div></div>' +
            '<div class="cc-stat"><div class="v">' + (mp.wrongAttempts || 0) + '</div><div class="l">Wrong Attempts</div></div>' +
          '</div>' +
          '<div class="task-actions" style="justify-content:center;">' +
            '<button class="btn btn-primary" id="fileSitrepQuickBtn" type="button">' + String.fromCharCode(128221) + ' File SITREP for this mission</button>' +
            '<button class="btn btn-ghost" id="backToListBtn" type="button">' + String.fromCharCode(8592) + ' Back to mission list</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function exitMission() {
    activeMissionId = null;
    document.getElementById("missionConsole").style.display = "none";
    document.getElementById("missionSelector").style.display = "grid";
    document.getElementById("missionHeaderTitle").textContent = "Select a Mission";
    document.getElementById("missionHeaderSub").textContent = "Choose a training module from the Training tab, or pick a mission below to enter the simulator.";
    renderMissionSelector();
    renderCommand();
  }

  // ==========================================================
  // ANALYSIS
  // ==========================================================
  function renderAnalysis() {
    refreshBadges();
    const rank = currentRank();
    const nxt = nextRank();
    document.getElementById("ringXP").textContent = state.xp;
    document.getElementById("ringRankLabel").textContent = rank.name.replace("Field ", "").replace("Concealment ", "");
    document.getElementById("nextRankName").textContent = nxt ? nxt.name : "MAX RANK";
    const pct = rankProgressPct();
    const circ = 314;
    document.getElementById("xpRingFg").style.strokeDashoffset = circ - (circ * pct / 100);
    document.getElementById("ringXPToNext").textContent = nxt ? (state.xp - rank.xp) + " / " + (nxt.xp - rank.xp) + " XP to next rank" : "MAX RANK ACHIEVED";

    const chart = document.getElementById("xpBarChart");
    chart.innerHTML = MISSIONS.map(m => {
      const done = missionDone(m);
      const xp = done ? missionXP(m) : 0;
      const h = Math.max(4, (xp / 150) * 140);
      return '<div class="bar" style="height:' + h + 'px;" title="' + m.title + ': ' + xp + ' XP"><div class="bar-val">' + xp + '</div><div class="bar-label">M' + m.order + '</div></div>';
    }).join("");

    const correct = state.totalAttempts - state.wrongAttempts;
    const acc = state.totalAttempts > 0 ? Math.round((correct / state.totalAttempts) * 100) : 100;
    document.getElementById("accuracyPct").textContent = acc + "%";
    document.getElementById("totalAttempts").textContent = state.totalAttempts;
    document.getElementById("bestStreak").textContent = state.bestStreak;
  }

  function updateAnalysis() {
    renderAnalysis();
    renderSidebar();
    renderTopStats();
  }

  // ==========================================================
  // RANKS
  // ==========================================================
  function renderRanks() {
    const list = document.getElementById("rankList");
    const cur = currentRank();
    list.innerHTML = RANKS.map(r => {
      let cls = "rank-row";
      let tag = "";
      if (r.id === cur.id) { cls += " current"; tag = '<span class="r-tag current">CURRENT</span>'; }
      else if (state.xp >= r.xp) { cls += " achieved"; tag = '<span class="r-tag achieved">ACHIEVED</span>'; }
      else { tag = '<span class="r-tag locked">LOCKED</span>'; }
      return '<div class="' + cls + '">' +
        '<div class="r-ico">' + r.icon + '</div>' +
        '<div class="r-body">' +
          '<div class="r-name">' + r.name + '</div>' +
          '<div class="r-xp">' + r.xp + ' XP ' + String.fromCharCode(8226) + ' CALLSIGN ' + r.callsign + '</div>' +
        '</div>' +
        tag +
      '</div>';
    }).join("");
  }

  // ==========================================================
  // SITREP
  // ==========================================================
  function renderSitrep() {
    const sel = document.getElementById("sitrepMission");
    const completed = MISSIONS.filter(m => missionDone(m));
    sel.innerHTML = '<option value="">Select a completed mission' + String.fromCharCode(8230) + '</option>' +
      completed.map(m => '<option value="' + m.id + '">' + m.tag + ' ' + String.fromCharCode(8212) + ' ' + m.title + '</option>').join("");

    const log = document.getElementById("sitrepLog");
    if (state.sitreps.length === 0) {
      log.innerHTML = '<p class="muted center" style="padding:20px;">No SITREPs filed yet. Complete a mission and file your first report.</p>';
    } else {
      log.innerHTML = state.sitreps.slice().reverse().map(s => {
        const statusMap = {
          NOMINAL: { cls: "low", text: "NOMINAL" },
          MINOR_HAZARD: { cls: "med", text: "MINOR HAZARD" },
          ABORTED: { cls: "high", text: "ABORTED" }
        };
        const st = statusMap[s.status] || statusMap.NOMINAL;
        const m = MISSIONS.find(x => x.id === s.mission);
        return '<div class="sitrep-entry">' +
          '<div class="se-head">' +
            '<span class="se-time">' + s.time + '</span>' +
            '<span class="se-status ti-level ' + st.cls + '">' + st.text + '</span>' +
          '</div>' +
          '<div class="se-body"><strong>' + (m ? m.tag + " " + String.fromCharCode(8212) + " " + m.title : s.mission) + '</strong><br/>' + escapeHTML(s.summary) + '</div>' +
        '</div>';
      }).join("");
    }
  }

  function fileSitrep() {
    const mission = document.getElementById("sitrepMission").value;
    const status = document.getElementById("sitrepStatus").value;
    const summary = document.getElementById("sitrepSummary").value.trim();
    const fb = document.getElementById("sitrepFeedback");

    if (!mission) { showFeedback(fb, "err", "Please select a completed mission."); return; }
    if (!status) { showFeedback(fb, "err", "Please choose an overall status."); return; }
    if (summary.length < 20) { showFeedback(fb, "err", "Your summary must be at least 20 characters long."); return; }

    const entry = {
      mission, status, summary,
      time: new Date().toLocaleString("en-GB", { hour12: false })
    };
    state.sitreps.push(entry);
    state.xp += 20;
    saveState();
    document.getElementById("sitrepSummary").value = "";
    document.getElementById("sitrepStatus").value = "";
    document.getElementById("sitrepMission").value = "";
    showFeedback(fb, "ok", "SITREP filed successfully! +20 XP. Your fieldcraft instructor has received your report.");
    toast("ok", String.fromCharCode(128231) + " SITREP filed! +20 XP");
    renderSitrep();
    renderSidebar();
    renderTopStats();
    renderCommand();
    renderAnalysis();
  }

  function showFeedback(el, kind, msg) {
    el.className = "task-feedback show " + kind;
    el.textContent = (kind === "ok" ? String.fromCharCode(9989) + " " : kind === "err" ? String.fromCharCode(10060) + " " : String.fromCharCode(128161) + " ") + msg;
  }

  // ==========================================================
  // LEARN LIBRARY
  // ==========================================================
  function renderLearn() {
    const grid = document.getElementById("learnGrid");
    grid.innerHTML = LEARN_ARTICLES.map(a => {
      const read = state.readArticles.includes(a.id);
      return '<div class="lib-card ' + (read ? "read" : "") + '" data-article="' + a.id + '">' +
        '<div class="lc-ico">' + a.icon + '</div>' +
        '<div class="lc-cat">' + a.cat + '</div>' +
        '<div class="lc-title">' + a.title + '</div>' +
        '<div class="lc-desc">' + a.desc + '</div>' +
        '<div class="lc-foot"><span>' + (read ? String.fromCharCode(10003) + " Read" : "Tap to read") + '</span><span>+' + a.xp + ' XP</span></div>' +
      '</div>';
    }).join("");
    grid.querySelectorAll(".lib-card").forEach(el => {
      el.addEventListener("click", () => openArticle(el.dataset.article));
    });
  }

  function openArticle(articleId) {
    const a = LEARN_ARTICLES.find(x => x.id === articleId);
    if (!a) return;
    if (!state.readArticles.includes(articleId)) {
      state.readArticles.push(articleId);
      state.xp += a.xp;
      saveState();
      toast("ok", String.fromCharCode(128214) + ' Article read: "' + a.title + '" ' + String.fromCharCode(8212) + " +" + a.xp + " XP");
      renderLearn();
      renderSidebar();
      renderTopStats();
      renderAnalysis();
    } else {
      toast("info", String.fromCharCode(128214) + ' Already read: "' + a.title + '"');
    }
  }

  // ==========================================================
  // SWITCH SECTION
  // ==========================================================
  function switchSection(name) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    const target = document.getElementById("section-" + name);
    if (target) target.classList.add("active");
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.section === name));
    if (name === "command") renderCommand();
    if (name === "training") renderTraining();
    if (name === "missions") { renderMissionSelector(); if (activeMissionId) openMissionRender(); }
    if (name === "analysis") renderAnalysis();
    if (name === "sitrep") renderSitrep();
    if (name === "ranks") renderRanks();
    if (name === "learn") renderLearn();
    if (name === "arena") renderArenaGame();
    document.querySelector(".main").scrollTop = 0;
  }

  function openMissionRender() {
    document.getElementById("missionSelector").style.display = "none";
    document.getElementById("missionConsole").style.display = "block";
    renderMissionConsole();
  }

  // ==========================================================
  // TOAST
  // ==========================================================
  let toastTimer = null;
  function toast(kind, text) {
    const t = document.getElementById("toast");
    const ico = document.getElementById("toastIco");
    const txt = document.getElementById("toastText");
    t.className = "toast " + kind;
    ico.textContent = kind === "ok" ? String.fromCharCode(9989) : kind === "warn" ? String.fromCharCode(9888) + String.fromCharCode(65039) : kind === "err" ? String.fromCharCode(10060) : String.fromCharCode(8505) + String.fromCharCode(65039);
    txt.textContent = text;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3500);
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // ==========================================================
  // ARENA GAME ENGINE -- Fieldcraft & Camouflage confirmation game
  // Draws from all MISSIONS modules: personal camouflage & concealment,
  // stalking & movement, observation post ops, silent field signals,
  // shine/shadow/silhouette management, bivouac site selection,
  // sound & movement discipline, Ghost Walker capstone challenge.
  // 10 questions per round, 8+ correct to pass, badge + 100 XP on first pass.
  // ==========================================================
  const fieldcraftArena = {
    active: false,
    examMode: false,
    pool: [],
    poolIndex: 0,
    currentQ: null,
    score: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    bestStreak: 0,
    round: 0,
    totalRounds: 10,
    answered: false
  };

  function shuffleArenaArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function arenaRenderStartScreen() {
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    stage.innerHTML =
      '<div class="arena-idle">' +
        '<div class="arena-idle-ico">' + String.fromCharCode(127807) + '</div>' +
        '<h2>Advanced Fieldcraft &amp; Camouflage Arena</h2>' +
        '<p class="muted" style="font-size:13px; line-height:1.6; max-width:480px; margin:0 auto;">Test your mastery of all Red Star Fieldcraft &amp; Camouflage training modules. The Arena presents randomized questions drawn from every module ' + String.fromCharCode(8212) + " the 7 S" + String.fromCharCode(39) + "s of concealment, personal camouflage, stalking &amp; movement, observation post operations, silent field signals, shine/shadow/silhouette management, bivouac site selection, sound &amp; movement discipline, and the Ghost Walker capstone challenge. Answer correctly to build your streak and confirm your advanced fieldcraft fundamentals.</p>" +
        '<div class="arena-mode-buttons" style="margin-top:20px;">' +
          '<button class="btn btn-primary" id="fieldcraftArenaStartBtn" type="button">' + String.fromCharCode(127918) + ' Start 10-Question Round</button>' +
          '<button class="btn btn-ghost" id="fieldcraftArenaExamBtn" type="button" style="margin-left:10px;">' + String.fromCharCode(128203) + ' Exam Mode (8 to pass)</button>' +
        '</div>' +
        (state.arenaBadgeEarned ?
          '<p class="muted" style="margin-top:14px; font-size:12px;">' + String.fromCharCode(9989) + ' Fieldcraft Arena badge earned! Keep practising to improve your streak.</p>' :
          '<p class="muted" style="margin-top:14px; font-size:12px;">Complete a 10-question round with 8+ correct to earn the Fieldcraft Arena badge.</p>') +
      '</div>';
    arenaUpdateSide();

    const startBtn = document.getElementById("fieldcraftArenaStartBtn");
    const examBtn = document.getElementById("fieldcraftArenaExamBtn");
    if (startBtn) startBtn.addEventListener("click", function () { arenaStartRound(false); });
    if (examBtn) examBtn.addEventListener("click", function () { arenaStartRound(true); });
  }

  function arenaStartRound(examMode) {
    fieldcraftArena.active = true;
    fieldcraftArena.examMode = !!examMode;
    fieldcraftArena.pool = shuffleArenaArray(ARENA_QUESTIONS.slice());
    fieldcraftArena.poolIndex = 0;
    fieldcraftArena.score = 0;
    fieldcraftArena.correct = 0;
    fieldcraftArena.wrong = 0;
    fieldcraftArena.streak = 0;
    fieldcraftArena.round = 0;
    fieldcraftArena.totalRounds = 10;
    fieldcraftArena.answered = false;
    arenaRenderQuestion();
  }

  function arenaRenderQuestion() {
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    if (fieldcraftArena.poolIndex >= fieldcraftArena.pool.length || fieldcraftArena.round >= fieldcraftArena.totalRounds) {
      arenaFinishRound();
      return;
    }
    fieldcraftArena.currentQ = fieldcraftArena.pool[fieldcraftArena.poolIndex];
    fieldcraftArena.answered = false;
    const q = fieldcraftArena.currentQ;
    const progressPct = Math.round((fieldcraftArena.round / fieldcraftArena.totalRounds) * 100);

    stage.innerHTML =
      '<div class="arena-active">' +
        '<div class="arena-progress-bar"><div class="arena-progress-fill" style="width:' + progressPct + '%"></div></div>' +
        '<div class="arena-q-meta">' +
          '<span class="arena-eo-tag">' + escapeHTML(q.eo) + "</span>" +
          '<span class="arena-round">Question ' + (fieldcraftArena.round + 1) + " of " + fieldcraftArena.totalRounds + "</span>" +
        "</div>" +
        '<div class="arena-prompt">' + escapeHTML(q.q) + "</div>" +
        '<div class="arena-choices" id="arenaChoices">' +
          q.options.map(function (opt, i) {
            return '<button class="arena-choice" data-idx="' + i + '" type="button"><span class="ac-letter">' + String.fromCharCode(65 + i) + "</span><span>" + escapeHTML(opt) + "</span></button>";
          }).join("") +
        "</div>" +
        '<div class="arena-feedback" id="arenaFeedback"></div>' +
      "</div>";

    arenaUpdateSide();

    document.querySelectorAll("#arenaChoices .arena-choice").forEach(function (btn) {
      btn.addEventListener("click", function () { arenaAnswerQuestion(parseInt(btn.dataset.idx, 10)); });
    });
  }

  function arenaAnswerQuestion(idx) {
    if (fieldcraftArena.answered) return;
    fieldcraftArena.answered = true;
    const q = fieldcraftArena.currentQ;
    const isCorrect = idx === q.correct;
    const fb = document.getElementById("arenaFeedback");
    fieldcraftArena.round++;

    document.querySelectorAll("#arenaChoices .arena-choice").forEach(function (btn) {
      const i = parseInt(btn.dataset.idx, 10);
      btn.disabled = true;
      if (i === q.correct) {
        btn.classList.add("correct");
      } else if (i === idx && !isCorrect) {
        btn.classList.add("wrong");
      }
    });

    if (isCorrect) {
      fieldcraftArena.correct++;
      fieldcraftArena.streak++;
      if (fieldcraftArena.streak > fieldcraftArena.bestStreak) fieldcraftArena.bestStreak = fieldcraftArena.streak;
      fieldcraftArena.score += 10 + (fieldcraftArena.streak > 1 ? fieldcraftArena.streak * 2 : 0);
      if (fb) { fb.className = "arena-feedback ok"; fb.innerHTML = String.fromCharCode(9989) + " Correct! " + escapeHTML(q.options[q.correct]) + (fieldcraftArena.streak > 1 ? " " + String.fromCharCode(8212) + " " + String.fromCharCode(128293) + " " + fieldcraftArena.streak + " streak!" : ""); }
    } else {
      fieldcraftArena.wrong++;
      fieldcraftArena.streak = 0;
      if (fb) { fb.className = "arena-feedback err"; fb.innerHTML = String.fromCharCode(10060) + " Incorrect. The correct answer is: <strong>" + escapeHTML(q.options[q.correct]) + "</strong>"; }
    }

    state.totalAttempts++;
    if (!isCorrect) {
      state.wrongAttempts++;
      state.streak = 0;
    } else {
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    }
    saveState();

    arenaUpdateSide();
    if (typeof renderAnalysis === "function") renderAnalysis();

    setTimeout(function () {
      fieldcraftArena.poolIndex++;
      arenaRenderQuestion();
    }, 1800);
  }

  function arenaFinishRound() {
    fieldcraftArena.active = false;
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    const total = fieldcraftArena.correct + fieldcraftArena.wrong;
    const pct = total > 0 ? Math.round((fieldcraftArena.correct / total) * 100) : 0;
    const passed = fieldcraftArena.correct >= 8;

    if (passed && !state.arenaBadgeEarned) {
      state.arenaBadgeEarned = true;
      state.xp += 100;
      saveState();
      syncMapProgress();
      refreshBadges();
      renderSidebar();
      renderTopStats();
      renderCommand();
      renderAnalysis();
      renderRanks();
    }

    let msg = "";
    let badgeText = "";
    if (fieldcraftArena.examMode) {
      if (passed) {
        msg = "QUALIFIED! You passed the Advanced Fieldcraft &amp; Camouflage exam with " + fieldcraftArena.correct + "/" + total + " correct. Score: " + fieldcraftArena.score + ".";
        badgeText = "Fieldcraft Arena badge unlocked " + String.fromCharCode(8212) + " you have confirmed your advanced fieldcraft fundamentals!";
      } else {
        msg = "NOT YET QUALIFIED. You scored " + fieldcraftArena.correct + "/" + total + ". You need 8/10 to pass. Review the Learn library and try again.";
      }
    } else {
      if (pct >= 80) {
        msg = "OUTSTANDING! " + fieldcraftArena.correct + "/" + total + " correct (" + pct + "%). Score: " + fieldcraftArena.score + ". Your advanced fieldcraft fundamentals are confirmed.";
        if (passed && state.arenaBadgeEarned) badgeText = "Fieldcraft Arena badge earned!";
      } else if (pct >= 50) {
        msg = "SOLID EFFORT. " + fieldcraftArena.correct + "/" + total + " correct (" + pct + "%). Score: " + fieldcraftArena.score + ". Review the Learn library and try again.";
      } else {
        msg = "KEEP TRAINING. " + fieldcraftArena.correct + "/" + total + " correct (" + pct + "%). Study the Learn library and practise each module.";
      }
    }

    stage.innerHTML =
      '<div class="arena-complete">' +
        '<div class="arena-complete-ico">' + (passed ? String.fromCharCode(127942) : String.fromCharCode(128202)) + "</div>" +
        '<h2>' + (passed ? "Round Complete!" : "Round Complete") + "</h2>" +
        '<div class="arena-score-display">' +
          '<div class="arena-score-item"><div class="as-val">' + fieldcraftArena.correct + "/" + total + '</div><div class="as-lbl">Correct</div></div>' +
          '<div class="arena-score-item"><div class="as-val">' + fieldcraftArena.score + '</div><div class="as-lbl">Score</div></div>' +
          '<div class="arena-score-item"><div class="as-val">' + fieldcraftArena.bestStreak + '</div><div class="as-lbl">Best Streak</div></div>' +
        "</div>" +
        '<p style="color:var(--ink-2); font-size:13px; line-height:1.6; max-width:440px; margin:12px auto;">' + msg + "</p>" +
        (badgeText ? '<p style="color:var(--gold-bright); font-size:13px; font-weight:600; margin:10px 0;">' + String.fromCharCode(127941) + " " + escapeHTML(badgeText) + "</p>" : "") +
        '<div class="arena-mode-buttons" style="margin-top:16px;">' +
          '<button class="btn btn-primary" id="fieldcraftArenaRetryBtn" type="button">' + String.fromCharCode(127918) + ' Play Again</button>' +
          '<button class="btn btn-ghost" id="fieldcraftArenaExamBtn2" type="button" style="margin-left:10px;">' + String.fromCharCode(128203) + ' Exam Mode</button>' +
        "</div>" +
      "</div>";

    arenaUpdateSide();
    if (passed) toast("ok", String.fromCharCode(127942) + " Fieldcraft Arena round passed! " + fieldcraftArena.correct + "/" + total + " correct.");

    const retryBtn = document.getElementById("fieldcraftArenaRetryBtn");
    const examBtn2 = document.getElementById("fieldcraftArenaExamBtn2");
    if (retryBtn) retryBtn.addEventListener("click", function () { arenaStartRound(false); });
    if (examBtn2) examBtn2.addEventListener("click", function () { arenaStartRound(true); });
  }

  function arenaUpdateSide() {
    const side = document.getElementById("arenaSide");
    if (!side) return;
    const total = fieldcraftArena.correct + fieldcraftArena.wrong;
    const pct = total > 0 ? Math.round((fieldcraftArena.correct / total) * 100) : 0;
    side.innerHTML =
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">' + String.fromCharCode(128202) + '</span> Arena Stats</h3>' +
        '<div class="arena-stat-row"><span>Score</span><strong>' + fieldcraftArena.score + "</strong></div>" +
        '<div class="arena-stat-row"><span>Correct</span><strong>' + fieldcraftArena.correct + "/" + total + "</strong></div>" +
        '<div class="arena-stat-row"><span>Accuracy</span><strong>' + pct + "%</strong></div>" +
        '<div class="arena-stat-row"><span>Current Streak</span><strong>' + fieldcraftArena.streak + "</strong></div>" +
        '<div class="arena-stat-row"><span>Best Streak</span><strong>' + fieldcraftArena.bestStreak + "</strong></div>" +
      "</div>" +
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">' + String.fromCharCode(127942) + '</span> Arena Badge</h3>' +
        '<div class="arena-badge-status ' + (state.arenaBadgeEarned ? "earned" : "locked") + '">' +
          (state.arenaBadgeEarned ?
            '<div class="ab-ico">' + String.fromCharCode(127941) + '</div><div class="ab-text"><strong>Fieldcraft Arena</strong><br/>Badge Earned!</div>' :
            '<div class="ab-ico">' + String.fromCharCode(128274) + '</div><div class="ab-text"><strong>Locked</strong><br/>Score 8/10 to unlock</div>') +
        "</div>" +
      "</div>" +
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">' + String.fromCharCode(128218) + '</span> Question Pool</h3>' +
        '<div class="arena-stat-row"><span>Total Questions</span><strong>' + ARENA_QUESTIONS.length + "</strong></div>" +
        '<div class="arena-stat-row"><span>Modules Covered</span><strong>8</strong></div>' +
        '<div class="arena-stat-row"><span>Rounds Played</span><strong>' + (state.totalAttempts > 0 ? Math.floor(state.totalAttempts / 10) : 0) + "</strong></div>" +
      "</div>";
  }

  function renderArenaGame() {
    if (!fieldcraftArena.active) {
      arenaRenderStartScreen();
    } else {
      arenaRenderQuestion();
    }
  }

  /* -- i18n: translate data arrays in-place -- */
  if (typeof trMutate === "function") {
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(ARENA_QUESTIONS); } catch(e) {}
  }

  // ==========================================================
  // INIT
  // ==========================================================
  function init() {
    document.querySelectorAll(".nav-btn").forEach(b => {
      b.addEventListener("click", () => switchSection(b.dataset.section));
    });

    const mb = document.getElementById("mobileMenuBtn");
    if (mb) mb.addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));

    const fsb = document.getElementById("fileSitrepBtn");
    if (fsb) fsb.addEventListener("click", fileSitrep);

    const params = new URLSearchParams(window.location.search);
    const deepMission = params.get("mission");

    refreshBadges();
    renderSidebar();
    renderTopStats();
    renderCommand();
    renderTraining();
    renderMissionSelector();
    renderAnalysis();
    renderRanks();
    renderSitrep();
    renderLearn();
    renderArenaGame();

    if (deepMission) {
      const m = MISSIONS.find(x => x.id === deepMission);
      if (m) setTimeout(() => openMission(m.id), 200);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
