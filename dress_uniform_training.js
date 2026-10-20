/* ============================================================
   DRESS & UNIFORM STANDARDS TRAINING COMMAND -- dress_uniform_training.js
   Inspection Day: first-year cadet dress & uniform simulator
   Maple Defender-style dashboard engine (IIFE architecture)
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "dressUniformTrainingProgress",
    sitreps: "dressUniformTrainingSitreps",
    wrongAttempts: "dressUniformTrainingWrongAttempts",
    streak: "dressUniformTrainingStreak",
    bestStreak: "dressUniformTrainingBestStreak",
    readArticles: "dressUniformTrainingReadArticles",
    inspectionGame: "dressUniformTrainingInspectionGame",
    builderGame: "dressUniformTrainingBuilderGame"
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const DRESS_BADGE_ID = 3;

  // ==========================================================
  // RANK LADDER (Dress & Uniform progression ranks)
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Standards Recruit",       icon: "\u{1F396}\u{FE0F}",  xp: 0,    callsign: "STANDARDS-1" },
    { id: 1, name: "Standards Cadet",         icon: "\u{1FA96}",  xp: 300,  callsign: "DRESS-2" },
    { id: 2, name: "Senior Standards Cadet",  icon: "\u2B50",  xp: 700,  callsign: "SENIOR-3" },
    { id: 3, name: "Inspection Cadet",        icon: "\u{1F3C5}", xp: 1200, callsign: "INSPECT-4" },
    { id: 4, name: "Standards Officer Cadet", icon: "\u{1F451}", xp: 1800, callsign: "OFFICER-5" },
    { id: 5, name: "Standards Master Cadet",  icon: "\u{1F3C6}",  xp: 2500, callsign: "MASTER-6" }
  ];

  // ==========================================================
  // TOOLS (dress & uniform tools cadets must "open")
  // ==========================================================
  const TOOLS = [
    { id: "headdress",   icon: "\u{1FAE2}",  label: "Headdress Guide" },
    { id: "badgechart",  icon: "\u{1F396}\u{FE0F}",  label: "Badge Placement Chart" },
    { id: "brassard",    icon: "\u{1F9BA}",  label: "Brassard Layout" },
    { id: "irondiagram", icon: "\u2696\u{FE0F}",  label: "Ironing Diagram" },
    { id: "bootbull",    icon: "\u{1F9BE}",  label: "Boot-Bulling Tool" },
    { id: "brasskit",    icon: "\u2728",  label: "Brass Care Kit" },
    { id: "grooming",    icon: "\u{1F487}",  label: "Grooming Checklist" },
    { id: "fulldress",   icon: "\u{1F454}",  label: "Full-Dress Layout" },
    { id: "combatdress", icon: "\u{1F9BA}",  label: "Combat Dress Guide" },
    { id: "inspection",  icon: "\u{1F50D}",  label: "Inspection Checklist" },
    { id: "uniformref",  icon: "\u{1F4CB}",  label: "Uniform Reference Card" },
    { id: "creasediag",  icon: "\u{1F4D0}",  label: "Crease Diagram" },
    { id: "insignia",    icon: "\u{1F39F}\u{FE0F}",  label: "Insignia Reference" }
  ];

  // ==========================================================
  // TRAINING MISSIONS -- First-Year Dress & Uniform across 3 Elements
  // Each mission has 4 hands-on tasks. Tool enforcement required.
  // ==========================================================
  const MISSIONS = [
    {
      id: "headdress",
      order: 1,
      tag: "DRESS 01",
      icon: "\u{1FAE2}",
      title: "Headdress Fitting & Wearing",
      desc: "Master the correct fitting, positioning, and wearing of cadet headdress across all three elements.",
      xp: 100,
      brief: "Your inspecting officer begins with headdress \u2014 the first thing checked on the inspection line. A cap worn too high, too low, tilted, or with the badge off-centre is an instant fault. You must learn the correct position: one inch above the right eyebrow, level from side to side, badge centred, and the chinstrap properly adjusted. Each element has its own headdress \u2014 the Sea Cadet wedge cap, the Army Cadet beret or field cap, and the Air Cadet wedge \u2014 but the principles of fit and pride are universal.",
      scene: "headdress",
      chapters: [
        { title: "Position", desc: "One inch above the right eyebrow, level side to side." },
        { title: "Badge", desc: "Centred over the left eye or as specified by element." },
        { title: "Chinstrap", desc: "Adjusted and stowed correctly, not loose." },
        { title: "Element Types", desc: "Sea wedge, Army beret, Air wedge \u2014 each worn with pride." }
      ],
      tasks: [
        {
          type: "select", tool: "headdress",
          title: "Set the Cap Height",
          prompt: "Open the Headdress Guide and select the correct vertical position for the headdress.",
          options: [
            "One inch above the right eyebrow, level side to side",
            "Resting directly on top of the eyebrows",
            "Pushed back to expose the forehead fully",
            "Two inches above the eyebrows for comfort"
          ],
          expected: "One inch above the right eyebrow, level side to side",
          proof: "One inch above the right eyebrow and level \u2014 the correct headdress position across all elements."
        },
        {
          type: "select", tool: "headdress",
          title: "Centre the Badge",
          prompt: "Where should the cap badge be positioned on the headdress?",
          options: [
            "Centred on the front of the cap, directly over the nose or as specified",
            "On the left side of the cap only",
            "On the right side near the chinstrap",
            "Wherever it looks best to the wearer"
          ],
          expected: "Centred on the front of the cap, directly over the nose or as specified",
          proof: "Badge centred on the front \u2014 the standard position for cap badges and insignia."
        },
        {
          type: "toggle", tool: "headdress",
          title: "Check the Chinstrap",
          prompt: "Inspect the chinstrap. Toggle the indicator to confirm it is properly adjusted and stowed.",
          expected: true,
          proof: "Chinstrap adjusted and stowed correctly \u2014 not loose, not dangling, ready for inspection."
        },
        {
          type: "note", tool: "headdress",
          title: "Identify Element Headdress",
          prompt: "Write a note naming the headdress worn by each element. Include the keywords 'Sea Cadet wedge', 'Army Cadet beret', and 'Air Cadet wedge'.",
          keywords: ["sea cadet wedge", "army cadet beret", "air cadet wedge"],
          proof: "Sea Cadet wedge cap, Army Cadet beret, Air Cadet wedge \u2014 each element's headdress identified. Mission complete."
        }
      ]
    },
    {
      id: "badges",
      order: 2,
      tag: "DRESS 02",
      icon: "\u{1F396}\u{FE0F}",
      title: "Badges & Insignia Placement",
      desc: "Learn where every badge, rank slide, and insignia belongs on the cadet uniform.",
      xp: 100,
      brief: "Badges and insignia tell the inspecting officer who you are and what you have achieved. A badge in the wrong place, a rank slide on the wrong shoulder, or a missing qualification badge are all inspection faults. You must learn the placement chart: rank slides on the shoulders, unit badges on the sleeve, qualification badges above the right pocket, and proficiency badges in their designated positions. Precision matters \u2014 a centimetre off is still wrong.",
      scene: "badges",
      chapters: [
        { title: "Rank Slides", desc: "Worn on both shoulders, centred and straight." },
        { title: "Unit Badges", desc: "Worn on the upper sleeve as specified." },
        { title: "Qualification Badges", desc: "Above the right chest pocket." },
        { title: "Proficiency Badges", desc: "In designated positions on the sleeve or brassard." }
      ],
      tasks: [
        {
          type: "select", tool: "badgechart",
          title: "Place the Rank Slides",
          prompt: "Open the Badge Placement Chart. Where are rank slides worn on the uniform?",
          options: [
            "On both shoulders, centred and straight",
            "On the left shoulder only",
            "On the collar points",
            "On the chest above the pockets"
          ],
          expected: "On both shoulders, centred and straight",
          proof: "Rank slides on both shoulders, centred and straight \u2014 the standard position for rank identification."
        },
        {
          type: "select", tool: "badgechart",
          title: "Position Qualification Badges",
          prompt: "Where should qualification badges be placed on the tunic?",
          options: [
            "Above the right chest pocket",
            "On the left sleeve cuff",
            "Below the belt line",
            "On the back of the tunic"
          ],
          expected: "Above the right chest pocket",
          proof: "Qualification badges above the right chest pocket \u2014 visible and correctly positioned for inspection."
        },
        {
          type: "select", tool: "badgechart",
          title: "Unit Badge Location",
          prompt: "On which part of the uniform is the unit badge worn?",
          options: [
            "Upper sleeve, as specified by the unit",
            "Centre of the chest",
            "On the headdress band",
            "On the belt buckle"
          ],
          expected: "Upper sleeve, as specified by the unit",
          proof: "Unit badge on the upper sleeve \u2014 identifying the cadet's corps or squadron."
        },
        {
          type: "note", tool: "badgechart",
          title: "Sew the Proficiency Badge",
          prompt: "Write a note describing how to position a proficiency badge on the brassard. Include the keywords 'centred', 'straight', and 'securely sewn'.",
          keywords: ["centred", "straight", "securely sewn"],
          proof: "Proficiency badge centred, straight, and securely sewn \u2014 the correct method for all badge placement. Mission complete."
        }
      ]
    },
    {
      id: "brassard",
      order: 3,
      tag: "DRESS 03",
      icon: "\u{1F9BA}",
      title: "Brassard & Badge Order",
      desc: "Master the brassard \u2014 the cloth badge panel worn on the right shoulder \u2014 and the correct order of badges on it.",
      xp: 100,
      brief: "The brassard is a cloth panel worn on the right shoulder that carries proficiency badges, qualification badges, and insignia. The order of badges on the brassard follows a strict hierarchy \u2014 proficiency stars or badges first, then specialist qualifications, then other awards. Badges must be evenly spaced, centred, and securely sewn. A brassard with badges out of order, crooked, or loose is a clear inspection failure. You must learn the layout and apply it precisely.",
      scene: "brassard",
      chapters: [
        { title: "Shoulder Position", desc: "Brassard worn on the right shoulder, secured to the epaulette." },
        { title: "Badge Hierarchy", desc: "Proficiency first, then specialist, then other awards." },
        { title: "Spacing", desc: "Badges evenly spaced and centred on the panel." },
        { title: "Securing", desc: "All badges securely sewn, no loose threads or gaps." }
      ],
      tasks: [
        {
          type: "select", tool: "brassard",
          title: "Select the Shoulder",
          prompt: "Open the Brassard Layout tool. On which shoulder is the brassard worn?",
          options: [
            "Right shoulder, secured to the epaulette",
            "Left shoulder, hanging loose",
            "Both shoulders simultaneously",
            "Worn on the chest like a sash"
          ],
          expected: "Right shoulder, secured to the epaulette",
          proof: "Brassard on the right shoulder, secured to the epaulette \u2014 the standard position."
        },
        {
          type: "select", tool: "brassard",
          title: "Determine Badge Order",
          prompt: "What is the correct order of badges from top to bottom on the brassard?",
          options: [
            "Proficiency badges first, then specialist qualifications, then other awards",
            "Other awards first, then proficiency, then specialist",
            "Random order based on when earned",
            "Specialist first, then other awards, then proficiency"
          ],
          expected: "Proficiency badges first, then specialist qualifications, then other awards",
          proof: "Proficiency first, then specialist, then other awards \u2014 the correct badge hierarchy on the brassard."
        },
        {
          type: "toggle", tool: "brassard",
          title: "Check Badge Security",
          prompt: "Inspect each badge on the brassard. Toggle to confirm all badges are securely sewn with no loose threads.",
          expected: true,
          proof: "All badges securely sewn \u2014 no loose threads, no gaps, ready for inspection."
        },
        {
          type: "note", tool: "brassard",
          title: "Describe the Layout",
          prompt: "Write a note describing the brassard badge layout. Include the keywords 'right shoulder', 'evenly spaced', and 'centred'.",
          keywords: ["right shoulder", "evenly spaced", "centred"],
          proof: "Right shoulder, evenly spaced, and centred \u2014 the brassard layout confirmed. Mission complete."
        }
      ]
    },
    {
      id: "boots",
      order: 4,
      tag: "DRESS 04",
      icon: "\u{1F9BE}",
      title: "Footwear & Bulled Boots",
      desc: "Learn the art of bulling boots to a mirror shine \u2014 a cornerstone of cadet inspection standards.",
      xp: 100,
      brief: "Bulled boots are the hallmark of a sharp cadet. The inspecting officer will look at your boots before anything else. Bulling is the process of building up layers of polish to create a mirror-like shine on the toe and heel of the boot. It requires patience, the right polish, a soft cloth, and small circular motions. Start with a base layer, build up with water and polish, and finish with a spit-shine. Scuffed, dull, or unpolished boots are a major inspection failure across all three elements.",
      scene: "boots",
      chapters: [
        { title: "Base Layer", desc: "Apply base polish evenly across the leather." },
        { title: "Bulling", desc: "Small circular motions with polish and water." },
        { title: "Toe & Heel", desc: "Focus bulling on the toe cap and heel for mirror finish." },
        { title: "Final Shine", desc: "Finish with a spit-shine for maximum reflection." }
      ],
      tasks: [
        {
          type: "select", tool: "bootbull",
          title: "Choose the Polish",
          prompt: "Open the Boot-Bulling Tool. What type of polish is used for bulling boots?",
          options: [
            "Kiwi or similar wax-based polish applied in thin layers",
            "Liquid shoe polish in a sponge applicator",
            "Silicone spray for a quick shine",
            "Any household furniture polish"
          ],
          expected: "Kiwi or similar wax-based polish applied in thin layers",
          proof: "Wax-based polish like Kiwi, applied in thin layers \u2014 the foundation of a proper bull."
        },
        {
          type: "select", tool: "bootbull",
          title: "Apply the Technique",
          prompt: "What motion is used when bulling boots to a mirror shine?",
          options: [
            "Small circular motions with a soft cloth, using polish and a little water",
            "Large back-and-forth strokes with a stiff brush",
            "Pressing hard with a dry sponge",
            "Rubbing vigorously with a paper towel"
          ],
          expected: "Small circular motions with a soft cloth, using polish and a little water",
          proof: "Small circular motions with polish and water \u2014 the technique that builds a mirror shine."
        },
        {
          type: "select", tool: "bootbull",
          title: "Focus Areas",
          prompt: "Which parts of the boot require the most bulling attention for inspection?",
          options: [
            "The toe cap and heel \u2014 the visible, polished areas",
            "The laces and eyelets only",
            "The sole and tread pattern",
            "The ankle padding inside the boot"
          ],
          expected: "The toe cap and heel \u2014 the visible, polished areas",
          proof: "Toe cap and heel \u2014 the areas the inspecting officer checks for a mirror finish."
        },
        {
          type: "note", tool: "bootbull",
          title: "Describe the Process",
          prompt: "Write a note describing the full bulling process. Include the keywords 'base layer', 'circular motions', and 'mirror shine'.",
          keywords: ["base layer", "circular motions", "mirror shine"],
          proof: "Base layer, circular motions, and mirror shine \u2014 the complete bulling process. Mission complete."
        }
      ]
    },
    {
      id: "ironing",
      order: 5,
      tag: "DRESS 05",
      icon: "\u2696\u{FE0F}",
      title: "Ironing, Pressing & Creases",
      desc: "Master the ironing and pressing of cadet uniforms, including the precise placement of creases.",
      xp: 100,
      brief: "A well-ironed uniform with sharp creases is essential for inspection. The shirt must be smooth with no wrinkles, the trousers must have sharp front and back creases running the full length of the leg, and the tunic must be pressed flat with no shiny marks from the iron. Creases should be sharp and straight \u2014 never crooked, doubled, or faint. Too much heat or steam can leave shine marks or burn the fabric. You must learn the correct ironing technique for each garment and where the creases belong.",
      scene: "ironing",
      chapters: [
        { title: "Shirt", desc: "Smooth, no wrinkles, collar pressed flat." },
        { title: "Trousers", desc: "Sharp front and back creases, full leg length." },
        { title: "Tunic", desc: "Pressed flat, no shiny iron marks." },
        { title: "Heat Control", desc: "Correct temperature to avoid shine marks and burns." }
      ],
      tasks: [
        {
          type: "select", tool: "irondiagram",
          title: "Iron the Shirt",
          prompt: "Open the Ironing Diagram. How should the dress shirt be ironed for inspection?",
          options: [
            "Smooth with no wrinkles, collar pressed flat and square",
            "Left slightly damp for a natural look",
            "Pressed with heavy starch causing stiffness",
            "Ironed only on the visible front panel"
          ],
          expected: "Smooth with no wrinkles, collar pressed flat and square",
          proof: "Shirt smooth, collar pressed flat and square \u2014 the standard for a sharp inspection shirt."
        },
        {
          type: "select", tool: "irondiagram",
          title: "Set the Trouser Creases",
          prompt: "Where should the creases be on cadet trousers?",
          options: [
            "Sharp front and back creases running the full length of each leg",
            "Only a front crease, no back crease",
            "Creases on the sides of the legs only",
            "No creases \u2014 trousers left flat"
          ],
          expected: "Sharp front and back creases running the full length of each leg",
          proof: "Sharp front and back creases, full leg length \u2014 the standard for cadet trousers."
        },
        {
          type: "select", tool: "irondiagram",
          title: "Avoid Shine Marks",
          prompt: "What causes shiny iron marks on the uniform, and how do you avoid them?",
          options: [
            "Too much heat and pressure \u2014 use a pressing cloth and correct temperature",
            "Not enough steam \u2014 add more water to the iron",
            "Using starch \u2014 switch to a spray bottle",
            "Ironing too quickly \u2014 slow down the passes"
          ],
          expected: "Too much heat and pressure \u2014 use a pressing cloth and correct temperature",
          proof: "Shine marks come from excess heat and pressure \u2014 use a pressing cloth and the right temperature."
        },
        {
          type: "note", tool: "creasediag",
          title: "Document the Crease Standard",
          prompt: "Write a note describing the crease standard for cadet trousers. Include the keywords 'sharp', 'straight', and 'full length'.",
          keywords: ["sharp", "straight", "full length"],
          proof: "Sharp, straight, and full length \u2014 the crease standard confirmed. Mission complete."
        }
      ]
    },
    {
      id: "brass",
      order: 6,
      tag: "DRESS 06",
      icon: "\u2728",
      title: "Brass & Metal Care",
      desc: "Learn to clean and polish all brass and metal fittings on the cadet uniform to inspection standard.",
      xp: 100,
      brief: "Brass fittings \u2014 belt buckles, cap badges, buttons, and insignia \u2014 must gleam for inspection. Tarnished brass is an instant fault. Cleaning brass requires the right polish, a soft cloth, and patience. Apply polish in small amounts, work it in with circular motions, and buff to a bright shine. Never use abrasive cleaners that can scratch the surface. Metal fittings should be free of fingerprints, smudges, and tarnish. The inspecting officer will check every button and buckle.",
      scene: "brass",
      chapters: [
        { title: "Belt Buckle", desc: "Polished to a mirror shine, free of fingerprints." },
        { title: "Cap Badge", desc: "Cleaned and bright, no tarnish on the metal." },
        { title: "Buttons", desc: "All buttons polished, matching in appearance." },
        { title: "Insignia", desc: "Metal insignia cleaned and free of smudges." }
      ],
      tasks: [
        {
          type: "select", tool: "brasskit",
          title: "Choose the Polish",
          prompt: "Open the Brass Care Kit. What is the correct approach to cleaning brass fittings?",
          options: [
            "Apply brass polish in small amounts with a soft cloth, buff to a shine",
            "Use steel wool and scouring powder for maximum abrasion",
            "Soak the fittings in vinegar overnight",
            "Spray with silicone furniture polish and wipe"
          ],
          expected: "Apply brass polish in small amounts with a soft cloth, buff to a shine",
          proof: "Brass polish in small amounts, buffed with a soft cloth \u2014 the correct method for all brass fittings."
        },
        {
          type: "select", tool: "brasskit",
          title: "Avoid the Damage",
          prompt: "What must you avoid when cleaning brass and metal fittings?",
          options: [
            "Abrasive cleaners and steel wool that can scratch the surface",
            "Wearing gloves while polishing",
            "Buffing too many times",
            "Using a microfibre cloth"
          ],
          expected: "Abrasive cleaners and steel wool that can scratch the surface",
          proof: "Never use abrasive cleaners or steel wool \u2014 they scratch brass and ruin the finish."
        },
        {
          type: "toggle", tool: "brasskit",
          title: "Inspect the Buckle",
          prompt: "Examine the belt buckle under light. Toggle to confirm it is free of fingerprints and tarnish.",
          expected: true,
          proof: "Belt buckle free of fingerprints and tarnish \u2014 mirror shine confirmed for inspection."
        },
        {
          type: "note", tool: "brasskit",
          title: "Document the Method",
          prompt: "Write a note describing the brass cleaning method. Include the keywords 'small amounts', 'soft cloth', and 'buff to a shine'.",
          keywords: ["small amounts", "soft cloth", "buff to a shine"],
          proof: "Small amounts, soft cloth, and buff to a shine \u2014 the brass care method confirmed. Mission complete."
        }
      ]
    },
    {
      id: "grooming",
      order: 7,
      tag: "DRESS 07",
      icon: "\u{1F487}",
      title: "Hair, Grooming & Personal Presentation",
      desc: "Master the grooming standards for cadets \u2014 hair, nails, jewellery, and overall personal presentation.",
      xp: 100,
      brief: "Personal grooming is part of the uniform. The inspecting officer checks hair length and style, nail cleanliness, jewellery, and overall neatness. Hair must be neat and off the collar for male cadets, and neatly styled for female cadets. No extreme styles or unnatural colours. Nails must be clean and trimmed. Jewellery is limited to a watch and plain rings. No visible body piercings beyond earrings for female cadets. Facial hair must be clean-shaven unless authorised. A cadet with poor grooming fails inspection regardless of how sharp the uniform is.",
      scene: "grooming",
      chapters: [
        { title: "Hair", desc: "Neat, off the collar, no extreme styles or colours." },
        { title: "Nails", desc: "Clean, trimmed, and tidy." },
        { title: "Jewellery", desc: "Watch and plain rings only, minimal earrings." },
        { title: "Facial Hair", desc: "Clean-shaven unless authorised by regulations." }
      ],
      tasks: [
        {
          type: "select", tool: "grooming",
          title: "Check Hair Standard",
          prompt: "Open the Grooming Checklist. What is the hair standard for male cadets on inspection?",
          options: [
            "Neat, tapered, and off the collar and ears",
            "Any length as long as it is combed",
            "Long hair tied in a ponytail",
            "Shaved completely bald"
          ],
          expected: "Neat, tapered, and off the collar and ears",
          proof: "Neat, tapered, off the collar and ears \u2014 the standard for male cadet hair on inspection."
        },
        {
          type: "select", tool: "grooming",
          title: "Jewellery Policy",
          prompt: "What jewellery is permitted for cadets during inspection?",
          options: [
            "A watch and plain rings only, minimal earrings for female cadets",
            "Any jewellery the cadet prefers",
            "Necklaces and bracelets are fine if hidden",
            "No jewellery of any kind whatsoever"
          ],
          expected: "A watch and plain rings only, minimal earrings for female cadets",
          proof: "Watch and plain rings, minimal earrings \u2014 the permitted jewellery for cadets on inspection."
        },
        {
          type: "select", tool: "grooming",
          title: "Facial Hair Rule",
          prompt: "What is the facial hair standard for cadets unless otherwise authorised?",
          options: [
            "Clean-shaven, no stubble or beard unless authorised by regulations",
            "A neatly trimmed moustache is always acceptable",
            "Short beards are permitted if tidy",
            "No rules on facial hair for cadets"
          ],
          expected: "Clean-shaven, no stubble or beard unless authorised by regulations",
          proof: "Clean-shaven unless authorised \u2014 the facial hair standard for cadets."
        },
        {
          type: "note", tool: "grooming",
          title: "Document Nail Standard",
          prompt: "Write a note describing the nail standard for inspection. Include the keywords 'clean', 'trimmed', and 'tidy'.",
          keywords: ["clean", "trimmed", "tidy"],
          proof: "Clean, trimmed, and tidy \u2014 the nail standard confirmed. Mission complete."
        }
      ]
    },
    {
      id: "ceremonial",
      order: 8,
      tag: "DRESS 08",
      icon: "\u{1F454}",
      title: "Ceremonial & Number 1 Dress",
      desc: "Learn the full ceremonial dress \u2014 the most formal uniform worn for parades, remembrance, and official occasions.",
      xp: 100,
      brief: "Ceremonial dress, or Number 1 Dress, is the most formal uniform a cadet wears. It is used for remembrance parades, annual ceremonial reviews, and official occasions. It includes the formal tunic, pressed trousers or skirt, white shirt and black tie, polished belt, bulled boots or shoes, headdress, and all badges and medals correctly positioned. Every detail matters \u2014 from the alignment of buttons to the drape of the belt. This is the uniform that represents the cadet organisation to the public, so it must be flawless.",
      scene: "ceremonial",
      chapters: [
        { title: "Tunic", desc: "Formal tunic pressed, buttons aligned, badges correct." },
        { title: "Shirt & Tie", desc: "White shirt, black tie, collar straight." },
        { title: "Belt & Boots", desc: "Polished belt, bulled boots or shoes." },
        { title: "Medals", desc: "All medals and badges in correct order of precedence." }
      ],
      tasks: [
        {
          type: "select", tool: "fulldress",
          title: "Identify the Occasion",
          prompt: "Open the Full-Dress Layout tool. When is ceremonial Number 1 dress worn?",
          options: [
            "Remembrance parades, annual reviews, and official formal occasions",
            "Regular weekly training nights only",
            "Field exercises and weekend camps",
          "Physical training and sports sessions"
          ],
          expected: "Remembrance parades, annual reviews, and official formal occasions",
          proof: "Remembrance parades, annual reviews, and official occasions \u2014 the events requiring Number 1 dress."
        },
        {
          type: "select", tool: "fulldress",
          title: "Assemble the Components",
          prompt: "Which components make up ceremonial Number 1 dress?",
          options: [
            "Formal tunic, pressed trousers or skirt, white shirt, black tie, polished belt, bulled footwear, headdress",
            "Combat jacket, cargo trousers, and boots",
            "Polo shirt, tracksuit, and trainers",
            "Field jacket, woollen jumper, and combat trousers"
          ],
          expected: "Formal tunic, pressed trousers or skirt, white shirt, black tie, polished belt, bulled footwear, headdress",
          proof: "Tunic, pressed trousers, white shirt, black tie, polished belt, bulled footwear, headdress \u2014 the full ceremonial kit."
        },
        {
          type: "toggle", tool: "fulldress",
          title: "Verify Button Alignment",
          prompt: "Check the tunic buttons. Toggle to confirm they are all present, aligned, and polished.",
          expected: true,
          proof: "All tunic buttons present, aligned, and polished \u2014 ceremonial tunic verified."
        },
        {
          type: "note", tool: "fulldress",
          title: "Document Medal Order",
          prompt: "Write a note about medal placement on ceremonial dress. Include the keywords 'order of precedence', 'left chest', and 'correctly aligned'.",
          keywords: ["order of precedence", "left chest", "correctly aligned"],
          proof: "Order of precedence, left chest, and correctly aligned \u2014 medal placement confirmed. Mission complete."
        }
      ]
    },
    {
      id: "combat",
      order: 9,
      tag: "DRESS 09",
      icon: "\u{1F9BA}",
      title: "Combat & Working Dress",
      desc: "Master the combat and working dress worn for field training, exercises, and practical activities.",
      xp: 100,
      brief: "Combat and working dress is the practical uniform worn for field training, exercises, and hands-on activities. It includes the combat jacket or smock, cargo trousers, boots, and appropriate layers. While less formal than ceremonial dress, it still has standards \u2014 it must be clean, serviceable, correctly sized, and worn properly. Sleeves rolled or down as ordered, trousers bloused or worn over boots as specified, and all items in good repair. Even in the field, a cadet represents the organisation, so working dress must meet standard.",
      scene: "combat",
      chapters: [
        { title: "Jacket", desc: "Combat jacket clean, serviceable, correctly sized." },
        { title: "Trousers", desc: "Cargo trousers worn properly, bloused or over boots as ordered." },
        { title: "Boots", desc: "Serviceable boots, cleaned, laced correctly." },
        { title: "Layers", desc: "Base layers and mid-layers worn as conditions require." }
      ],
      tasks: [
        {
          type: "select", tool: "combatdress",
          title: "Identify the Uniform",
          prompt: "Open the Combat Dress Guide. What occasions require combat and working dress?",
          options: [
            "Field training, exercises, and practical hands-on activities",
            "Formal parades and remembrance ceremonies",
            "Public relations events and visits",
            "Swimming and water sports activities"
          ],
          expected: "Field training, exercises, and practical hands-on activities",
          proof: "Field training, exercises, and practical activities \u2014 the occasions for combat and working dress."
        },
        {
          type: "select", tool: "combatdress",
          title: "Wear the Trousers",
          prompt: "How should cargo trousers be worn with combat dress?",
          options: [
            "Bloused into the boots or worn over the boots as specified by orders",
            "Tucked into socks only",
            "Cut off at the knee for comfort",
            "Worn loose and dragging on the ground"
          ],
          expected: "Bloused into the boots or worn over the boots as specified by orders",
          proof: "Bloused into boots or over boots as ordered \u2014 the correct way to wear combat trousers."
        },
        {
          type: "select", tool: "combatdress",
          title: "Sleeve Standard",
          prompt: "How should the sleeves of the combat jacket be worn?",
          options: [
            "Rolled or down as ordered by the commanding officer or staff",
            "Always rolled up regardless of orders",
            "Always buttoned at the cuffs no matter what",
            "Cut off for summer wear"
          ],
          expected: "Rolled or down as ordered by the commanding officer or staff",
          proof: "Rolled or down as ordered \u2014 sleeves follow the commanding officer's instructions."
        },
        {
          type: "note", tool: "combatdress",
          title: "Document Condition Standard",
          prompt: "Write a note about the condition standard for combat dress. Include the keywords 'clean', 'serviceable', and 'good repair'.",
          keywords: ["clean", "serviceable", "good repair"],
          proof: "Clean, serviceable, and good repair \u2014 the condition standard for combat dress. Mission complete."
        }
      ]
    },
    {
      id: "fullkit",
      order: 10,
      tag: "DRESS 10",
      icon: "\u{1F50D}",
      title: "Full Kit Inspection",
      desc: "Put it all together \u2014 the complete head-to-toe inspection covering every standard learned in this module.",
      xp: 100,
      brief: "The full kit inspection is the culmination of your dress and uniform training. The inspecting officer will check every aspect of your appearance from head to toe: headdress position and badge, hair and grooming, shirt and collar, badges and insignia placement, brassard badge order, tunic fit and press, belt and buckle polish, trouser creases, and bulled boots. Every fault is noted. This is where all your training comes together. You must walk onto the inspection line knowing every standard and meeting every one. A single fault can mean the difference between pass and fail.",
      scene: "fullkit",
      chapters: [
        { title: "Head", desc: "Headdress, badge, hair, grooming \u2014 top to bottom." },
        { title: "Torso", desc: "Shirt, collar, badges, brassard, tunic \u2014 all correct." },
        { title: "Waist", desc: "Belt, buckle, and waistband \u2014 polished and positioned." },
        { title: "Legs & Feet", desc: "Trousers creased, boots bulled \u2014 sharp to the toe." }
      ],
      tasks: [
        {
          type: "select", tool: "inspection",
          title: "Begin the Inspection",
          prompt: "Open the Inspection Checklist. In what order does the inspecting officer check a cadet?",
          options: [
            "Head to toe \u2014 headdress, hair, shirt, badges, belt, trousers, boots",
            "Random order based on what catches the eye",
            "Boots first, then working upward",
            "Only the most visible items are checked"
          ],
          expected: "Head to toe \u2014 headdress, hair, shirt, badges, belt, trousers, boots",
          proof: "Head to toe \u2014 the systematic inspection order used by every inspecting officer."
        },
        {
          type: "select", tool: "inspection",
          title: "Identify a Major Fault",
          prompt: "Which of the following is considered a major inspection fault?",
          options: [
            "Boots not bulled \u2014 dull, scuffed, or unpolished footwear",
            "A single crease slightly less than perfectly sharp",
            "Laces tied in a double knot instead of a single",
            "Socks that are navy instead of black"
          ],
          expected: "Boots not bulled \u2014 dull, scuffed, or unpolished footwear",
          proof: "Boots not bulled is a major fault \u2014 dull, scuffed footwear fails inspection immediately."
        },
        {
          type: "select", tool: "inspection",
          title: "Confirm the Standard",
          prompt: "What is the overall standard a cadet must meet on the inspection line?",
          options: [
            "Every item of dress and personal presentation meets the published standard \u2014 no faults",
            "Most items are correct with only minor issues tolerated",
            "As long as the boots are polished, other faults are overlooked",
            "The standard depends on the individual inspecting officer's mood"
          ],
          expected: "Every item of dress and personal presentation meets the published standard \u2014 no faults",
          proof: "Every item meets the published standard \u2014 no faults tolerated on the inspection line."
        },
        {
          type: "note", tool: "inspection",
          title: "File the Final Report",
          prompt: "Write a summary note of the full kit inspection. Include the keywords 'head to toe', 'no faults', and 'inspection standard'.",
          keywords: ["head to toe", "no faults", "inspection standard"],
          proof: "Head to toe, no faults, inspection standard met \u2014 full kit inspection passed. Mission complete. All modules done!"
        }
      ]
    }
  ];

  // ==========================================================
  // LEARN LIBRARY ARTICLES
  // ==========================================================
  const LEARN_ARTICLES = [
    { id: "art_headdress_fit", cat: "Headdress", icon: "\u{1FAE2}", title: "Headdress Fitting Fundamentals", desc: "How to fit and position cadet headdress correctly across all three elements.", xp: 15 },
    { id: "art_wedge_cap", cat: "Headdress", icon: "\u{1FAE2}", title: "The Wedge Cap: Sea & Air Cadets", desc: "Positioning the wedge cap \u2014 one inch above the brow, badge centred, band level.", xp: 15 },
    { id: "art_beret", cat: "Headdress", icon: "\u{1F9E2}", title: "The Beret: Army Cadets", desc: "How to shape, wear, and position the Army Cadet beret with the badge over the left eye.", xp: 15 },
    { id: "art_cap_badge", cat: "Badges", icon: "\u{1F396}\u{FE0F}", title: "Cap Badge Positioning", desc: "Where the cap badge goes and why centring matters for inspection.", xp: 15 },
    { id: "art_rank_slides", cat: "Badges", icon: "\u{1F39F}\u{FE0F}", title: "Rank Slides & Shoulder Insignia", desc: "Rank slides on both shoulders \u2014 centred, straight, and correctly sized.", xp: 15 },
    { id: "art_qual_badges", cat: "Badges", icon: "\u{1F3C5}", title: "Qualification Badge Placement", desc: "Where qualification badges sit on the tunic and the order of precedence.", xp: 15 },
    { id: "art_brassard_use", cat: "Brassard", icon: "\u{1F9BA}", title: "The Brassard: Purpose & Wear", desc: "What the brassard is, why it is worn on the right shoulder, and how it is secured.", xp: 15 },
    { id: "art_brassard_order", cat: "Brassard", icon: "\u{1F9BA}", title: "Brassard Badge Order", desc: "The hierarchy of badges on the brassard \u2014 proficiency, specialist, then awards.", xp: 15 },
    { id: "art_boot_bulling", cat: "Footwear", icon: "\u{1F9BE}", title: "Bulling Boots to a Mirror Shine", desc: "The step-by-step process of building up polish layers for a glass-like finish.", xp: 15 },
    { id: "art_boot_care", cat: "Footwear", icon: "\u{1F9BE}", title: "Daily Boot Care & Maintenance", desc: "Keeping boots serviceable: cleaning, polishing, and storing between parades.", xp: 15 },
    { id: "art_ironing_shirt", cat: "Ironing", icon: "\u2696\u{FE0F}", title: "Ironing the Dress Shirt", desc: "Temperature, technique, and collar pressing for a wrinkle-free shirt.", xp: 15 },
    { id: "art_trouser_creases", cat: "Ironing", icon: "\u{1F4D0}", title: "Trouser Creases: Front & Back", desc: "How to create sharp, straight creases running the full length of each leg.", xp: 15 },
    { id: "art_avoid_shine", cat: "Ironing", icon: "\u2696\u{FE0F}", title: "Avoiding Iron Shine Marks", desc: "Using a pressing cloth and correct heat to prevent shiny patches on fabric.", xp: 15 },
    { id: "art_brass_polish", cat: "Brass Care", icon: "\u2728", title: "Polishing Brass Fittings", desc: "Belt buckles, buttons, and cap badges \u2014 the polish, cloth, and technique.", xp: 15 },
    { id: "art_brass_tarnish", cat: "Brass Care", icon: "\u2728", title: "Preventing Tarnish on Metal", desc: "Why brass tarnishes and how to keep fittings bright between inspections.", xp: 15 },
    { id: "art_hair_standard", cat: "Grooming", icon: "\u{1F487}", title: "Hair Standards for Cadets", desc: "Length, style, and colour rules for male and female cadets on inspection.", xp: 15 },
    { id: "art_jewellery_rules", cat: "Grooming", icon: "\u{1F48D}", title: "Jewellery & Accessories Policy", desc: "What may and may not be worn \u2014 watches, rings, earrings, and body piercings.", xp: 15 },
    { id: "art_ceremonial_dress", cat: "Ceremonial", icon: "\u{1F454}", title: "Number 1 Dress: The Full Ceremonial", desc: "Components, occasions, and standards for the most formal cadet uniform.", xp: 15 },
    { id: "art_medal_order", cat: "Ceremonial", icon: "\u{1F396}\u{FE0F}", title: "Medal Order of Precedence", desc: "How to arrange medals and awards on the left chest in correct order.", xp: 15 },
    { id: "art_combat_dress", cat: "Combat", icon: "\u{1F9BA}", title: "Combat & Working Dress Standards", desc: "When it is worn, how it is assembled, and the condition requirements.", xp: 15 },
    { id: "art_combat_repair", cat: "Combat", icon: "\u{1F9BA}", title: "Maintaining Combat Dress", desc: "Repairs, cleaning, and keeping field uniform items serviceable and in good order.", xp: 15 },
    { id: "art_inspection_order", cat: "Inspection", icon: "\u{1F50D}", title: "The Head-to-Toe Inspection", desc: "The order an inspecting officer follows and what is checked at each stage.", xp: 15 },
    { id: "art_fault_types", cat: "Inspection", icon: "\u26A0\u{FE0F}", title: "Common Inspection Faults", desc: "Major, minor, and low-severity faults and how they affect your inspection result.", xp: 15 },
    { id: "art_passing_inspection", cat: "Inspection", icon: "\u{1F3C6}", title: "How to Pass the Inspection Line", desc: "Preparation checklist, common mistakes, and the mindset for a fault-free inspection.", xp: 15 }
  ];

  // ==========================================================
  // BADGES (auto-generated from missions)
  // ==========================================================
  const DRESS_BADGES = MISSIONS.map(m => ({
    id: "b_" + m.id,
    icon: m.icon,
    name: m.title,
    xp: m.xp,
    mission: m.id
  }));

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
      inspectionGame: { score: 0, correct: 0, wrong: 0, bestStreak: 0, rounds: 0 }
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
  // MAP PROGRESS SYNC -- badge 3 on the quest map
  // ==========================================================
  function syncMapProgress() {
    try {
      const allDone = MISSIONS.every(m => state.completedMissions.includes(m.id));
      let mapProgress = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || "[]");
      if (allDone && !mapProgress.includes(DRESS_BADGE_ID)) {
        mapProgress.push(DRESS_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      } else if (!allDone && mapProgress.includes(DRESS_BADGE_ID)) {
        mapProgress = mapProgress.filter(id => id !== DRESS_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      }
    } catch (e) {}
  }

  // ==========================================================
  // SCENE SVG GENERATORS -- Dress & uniform themes (navy/brass)
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
    const end = `</svg>`;
    const grad = (id, c1, c2) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;

    if (scene === "headdress") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <line x1="100" y1="120" x2="500" y2="120" stroke="#d4a84b" stroke-width="2" opacity="0.4"/>
        <ellipse cx="300" cy="100" rx="70" ry="30" fill="#2a3a55" stroke="#d4a84b" stroke-width="2"/>
        <path d="M230,100 Q300,70 370,100 L370,110 L230,110 Z" fill="#1a2a40" stroke="#d4a84b" stroke-width="1.5"/>
        <circle cx="300" cy="90" r="10" fill="#d4a84b" stroke="#a67e2e" stroke-width="1.5"/>
        <text x="300" y="94" text-anchor="middle" font-size="7" fill="#0f1a2e" font-family="monospace" font-weight="bold">BADGE</text>
        <line x1="300" y1="40" x2="300" y2="70" stroke="#d4a84b" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/>
        <text x="300" y="35" text-anchor="middle" font-size="9" fill="#d4a84b" font-family="monospace">1 INCH ABOVE BROW</text>
        <text x="300" y="150" text-anchor="middle" font-size="10" fill="rgba(212,168,75,0.7)" font-family="monospace">HEADDRESS FITTING</text>
      ` + end;
    }
    if (scene === "badges") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="200" y="50" width="200" height="110" rx="8" fill="#1a2a40" stroke="#3a5680" stroke-width="1.5"/>
        <rect x="220" y="60" width="30" height="40" rx="4" fill="#2a3a55" stroke="#d4a84b" stroke-width="1"/>
        <rect x="350" y="60" width="30" height="40" rx="4" fill="#2a3a55" stroke="#d4a84b" stroke-width="1"/>
        <text x="235" y="83" text-anchor="middle" font-size="6" fill="#d4a84b" font-family="monospace">RANK</text>
        <text x="365" y="83" text-anchor="middle" font-size="6" fill="#d4a84b" font-family="monospace">RANK</text>
        <circle cx="300" cy="75" r="8" fill="#d4a84b" stroke="#a67e2e" stroke-width="1"/>
        <text x="300" y="78" text-anchor="middle" font-size="5" fill="#0f1a2e" font-family="monospace">QUAL</text>
        <rect x="250" y="100" width="100" height="25" rx="3" fill="#2a3a55" stroke="#d4a84b" stroke-width="1" opacity="0.7"/>
        <text x="300" y="115" text-anchor="middle" font-size="6" fill="#d4a84b" font-family="monospace">UNIT BADGE</text>
        <line x1="180" y1="120" x2="200" y2="120" stroke="#d4a84b" stroke-width="1" opacity="0.5"/>
        <text x="180" y="124" text-anchor="end" font-size="7" fill="rgba(212,168,75,0.6)" font-family="monospace">SLEEVE</text>
        <text x="300" y="170" text-anchor="middle" font-size="10" fill="rgba(212,168,75,0.7)" font-family="monospace">BADGE & INSIGNIA PLACEMENT</text>
      ` + end;
    }
    if (scene === "brassard") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M260,40 L340,40 L335,150 L265,150 Z" fill="#1a2a40" stroke="#d4a84b" stroke-width="2"/>
        <text x="300" y="36" text-anchor="middle" font-size="8" fill="#d4a84b" font-family="monospace">EPAULETTE</text>
        <rect x="270" y="55" width="60" height="18" rx="3" fill="#2a3a55" stroke="#d4a84b" stroke-width="1"/>
        <text x="300" y="67" text-anchor="middle" font-size="5" fill="#d4a84b" font-family="monospace">PROFICIENCY</text>
        <rect x="270" y="80" width="60" height="18" rx="3" fill="#2a3a55" stroke="#d4a84b" stroke-width="1" opacity="0.85"/>
        <text x="300" y="92" text-anchor="middle" font-size="5" fill="#d4a84b" font-family="monospace">SPECIALIST</text>
        <rect x="270" y="105" width="60" height="18" rx="3" fill="#2a3a55" stroke="#d4a84b" stroke-width="1" opacity="0.7"/>
        <text x="300" y="117" text-anchor="middle" font-size="5" fill="#d4a84b" font-family="monospace">AWARDS</text>
        <text x="300" y="140" text-anchor="middle" font-size="7" fill="rgba(212,168,75,0.6)" font-family="monospace">RIGHT SHOULDER</text>
        <text x="300" y="170" text-anchor="middle" font-size="10" fill="rgba(212,168,75,0.7)" font-family="monospace">BRASSARD & BADGE ORDER</text>
      ` + end;
    }
    if (scene === "boots") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <ellipse cx="300" cy="120" rx="80" ry="15" fill="rgba(0,0,0,0.3)"/>
        <path d="M240,70 L340,70 L360,100 L360,115 L240,115 Z" fill="#1a1a2e" stroke="#d4a84b" stroke-width="2"/>
        <ellipse cx="300" cy="80" rx="50" ry="10" fill="rgba(240,196,99,0.3)" stroke="#d4a84b" stroke-width="1.5"/>
        <path d="M255,76 Q300,72 345,76" fill="none" stroke="#f0c463" stroke-width="1" opacity="0.6"/>
        <line x1="240" y1="115" x2="360" y2="115" stroke="#a67e2e" stroke-width="2"/>
        <line x1="250" y1="100" x2="340" y2="100" stroke="#3a5680" stroke-width="1" opacity="0.4"/>
        <circle cx="320" cy="78" r="3" fill="#fff" opacity="0.4"/>
        <text x="300" y="150" text-anchor="middle" font-size="9" fill="rgba(212,168,75,0.7)" font-family="monospace">MIRROR SHINE</text>
        <text x="300" y="170" text-anchor="middle" font-size="10" fill="rgba(212,168,75,0.7)" font-family="monospace">BULLED BOOTS</text>
      ` + end;
    }
    if (scene === "ironing") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="180" y="60" width="240" height="80" rx="4" fill="#1a2a40" stroke="#3a5680" stroke-width="1.5"/>
        <line x1="300" y1="60" x2="300" y2="140" stroke="#d4a84b" stroke-width="2" opacity="0.7"/>
        <line x1="296" y1="60" x2="296" y2="140" stroke="#d4a84b" stroke-width="1" opacity="0.4"/>
        <line x1="304" y1="60" x2="304" y2="140" stroke="#d4a84b" stroke-width="1" opacity="0.4"/>
        <path d="M220,70 L250,50 L280,70 L250,90 Z" fill="#2a3a55" stroke="#d4a84b" stroke-width="1.5"/>
        <line x1="220" y1="70" x2="250" y2="90" stroke="#d4a84b" stroke-width="1" opacity="0.5"/>
        <line x1="250" y1="50" x2="280" y2="70" stroke="#d4a84b" stroke-width="1" opacity="0.5"/>
        <text x="250" y="100" text-anchor="middle" font-size="7" fill="#d4a84b" font-family="monospace">CREASE</text>
        <text x="380" y="100" text-anchor="middle" font-size="7" fill="#d4a84b" font-family="monospace">CREASE</text>
        <line x1="320" y1="70" x2="350" y2="50" stroke="#d4a84b" stroke-width="1" opacity="0.5"/>
        <line x1="320" y1="70" x2="350" y2="90" stroke="#d4a84b" stroke-width="1" opacity="0.5"/>
        <text x="300" y="160" text-anchor="middle" font-size="9" fill="rgba(212,168,75,0.6)" font-family="monospace">SHARP FRONT & BACK CREASES</text>
      ` + end;
    }
    if (scene === "brass") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="240" y="55" width="120" height="80" rx="6" fill="#1a2a40" stroke="#d4a84b" stroke-width="2"/>
        <circle cx="300" cy="80" r="18" fill="url(#brassGrad)" stroke="#a67e2e" stroke-width="2"/>
        <defs><radialGradient id="brassGrad"><stop offset="0" stop-color="#f0c463"/><stop offset="1" stop-color="#a67e2e"/></radialGradient></defs>
        <circle cx="295" cy="76" r="5" fill="#fff" opacity="0.3"/>
        <rect x="270" y="105" width="60" height="20" rx="3" fill="url(#brassGrad)" stroke="#a67e2e" stroke-width="1"/>
        <circle cx="285" cy="115" r="4" fill="#f0c463" stroke="#a67e2e" stroke-width="0.5"/>
        <circle cx="300" cy="115" r="4" fill="#f0c463" stroke="#a67e2e" stroke-width="0.5"/>
        <circle cx="315" cy="115" r="4" fill="#f0c463" stroke="#a67e2e" stroke-width="0.5"/>
        <text x="300" y="150" text-anchor="middle" font-size="9" fill="rgba(212,168,75,0.6)" font-family="monospace">POLISHED BUCKLE & BUTTONS</text>
        <text x="300" y="168" text-anchor="middle" font-size="10" fill="rgba(212,168,75,0.7)" font-family="monospace">BRASS & METAL CARE</text>
      ` + end;
    }
    if (scene === "grooming") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="300" cy="75" r="28" fill="#2a3a55" stroke="#d4a84b" stroke-width="2"/>
        <path d="M278,68 Q300,55 322,68 L322,62 Q300,50 278,62 Z" fill="#1a1a2e"/>
        <circle cx="292" cy="75" r="2" fill="#d4a84b"/>
        <circle cx="308" cy="75" r="2" fill="#d4a84b"/>
        <path d="M292,85 Q300,90 308,85" fill="none" stroke="#d4a84b" stroke-width="1"/>
        <rect x="288" y="100" width="24" height="40" rx="6" fill="#1a2a40" stroke="#d4a84b" stroke-width="1.5"/>
        <rect x="280" y="105" width="40" height="8" rx="2" fill="#2a3a55" stroke="#d4a84b" stroke-width="0.5"/>
        <text x="300" y="155" text-anchor="middle" font-size="9" fill="rgba(212,168,75,0.6)" font-family="monospace">NEAT HAIR \u2022 CLEAN NAILS \u2022 MINIMAL JEWELLERY</text>
        <text x="300" y="170" text-anchor="middle" font-size="10" fill="rgba(212,168,75,0.7)" font-family="monospace">GROOMING & PRESENTATION</text>
      ` + end;
    }
    if (scene === "ceremonial") {
      return base + grad("g", "#0a1530", "#050a18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="230" y="40" width="140" height="120" rx="8" fill="#0d1a30" stroke="#d4a84b" stroke-width="2.5"/>
        <rect x="250" y="55" width="100" height="20" rx="3" fill="#fff" stroke="#d4a84b" stroke-width="0.5" opacity="0.9"/>
        <line x1="300" y1="75" x2="300" y2="95" stroke="#1a1a2e" stroke-width="4"/>
        <circle cx="300" cy="105" r="6" fill="#d4a84b" stroke="#a67e2e" stroke-width="1"/>
        <circle cx="285" cy="120" r="3" fill="#d4a84b" stroke="#a67e2e" stroke-width="0.5"/>
        <circle cx="300" cy="120" r="3" fill="#d4a84b" stroke="#a67e2e" stroke-width="0.5"/>
        <circle cx="315" cy="120" r="3" fill="#d4a84b" stroke="#a67e2e" stroke-width="0.5"/>
        <rect x="270" y="130" width="60" height="8" rx="2" fill="#d4a84b" stroke="#a67e2e" stroke-width="0.5"/>
        <text x="300" y="33" text-anchor="middle" font-size="9" fill="#d4a84b" font-family="monospace" font-weight="bold">NO. 1 DRESS</text>
        <text x="300" y="172" text-anchor="middle" font-size="10" fill="rgba(212,168,75,0.7)" font-family="monospace">CEREMONIAL DRESS</text>
      ` + end;
    }
    if (scene === "combat") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <pattern id="camo" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#2a3a30"/>
          <circle cx="5" cy="5" r="4" fill="#1a2a20" opacity="0.6"/>
          <circle cx="15" cy="12" r="3" fill="#3a4a40" opacity="0.5"/>
          <circle cx="8" cy="16" r="2" fill="#1a2a20" opacity="0.4"/>
        </pattern>
        <rect x="200" y="50" width="200" height="110" rx="6" fill="url(#camo)" stroke="#d4a84b" stroke-width="1.5" opacity="0.8"/>
        <rect x="220" y="65" width="160" height="30" rx="4" fill="#1a2a20" opacity="0.7"/>
        <line x1="250" y1="65" x2="250" y2="95" stroke="#d4a84b" stroke-width="1" opacity="0.4"/>
        <line x1="290" y1="65" x2="290" y2="95" stroke="#d4a84b" stroke-width="1" opacity="0.4"/>
        <line x1="330" y1="65" x2="330" y2="95" stroke="#d4a84b" stroke-width="1" opacity="0.4"/>
        <rect x="230" y="110" width="140" height="35" rx="3" fill="#1a2a20" opacity="0.6"/>
        <text x="300" y="42" text-anchor="middle" font-size="9" fill="#d4a84b" font-family="monospace">COMBAT JACKET</text>
        <text x="300" y="170" text-anchor="middle" font-size="10" fill="rgba(212,168,75,0.7)" font-family="monospace">COMBAT & WORKING DRESS</text>
      ` + end;
    }
    if (scene === "fullkit") {
      return base + grad("g", "#0a1530", "#050a18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="300" cy="90" r="60" fill="none" stroke="#d4a84b" stroke-width="1.5" opacity="0.3"/>
        <circle cx="300" cy="90" r="40" fill="none" stroke="#d4a84b" stroke-width="1" opacity="0.2"/>
        <circle cx="300" cy="55" r="14" fill="#2a3a55" stroke="#d4a84b" stroke-width="1.5"/>
        <path d="M288,48 Q300,40 312,48 L312,45 Q300,38 288,45 Z" fill="#1a1a2e"/>
        <rect x="286" y="68" width="28" height="50" rx="6" fill="#0d1a30" stroke="#d4a84b" stroke-width="1.5"/>
        <rect x="278" y="73" width="44" height="6" rx="2" fill="#2a3a55" stroke="#d4a84b" stroke-width="0.5"/>
        <rect x="278" y="100" width="44" height="6" rx="2" fill="#d4a84b" stroke="#a67e2e" stroke-width="0.5" opacity="0.8"/>
        <rect x="280" y="118" width="40" height="30" rx="4" fill="#1a2a40" stroke="#d4a84b" stroke-width="1"/>
        <line x1="300" y1="118" x2="300" y2="148" stroke="#d4a84b" stroke-width="1.5"/>
        <rect x="280" y="148" width="16" height="14" rx="2" fill="#1a1a2e" stroke="#d4a84b" stroke-width="1"/>
        <rect x="304" y="148" width="16" height="14" rx="2" fill="#1a1a2e" stroke="#d4a84b" stroke-width="1"/>
        <ellipse cx="288" cy="155" rx="8" ry="3" fill="rgba(240,196,99,0.2)" stroke="#d4a84b" stroke-width="0.5"/>
        <ellipse cx="312" cy="155" rx="8" ry="3" fill="rgba(240,196,99,0.2)" stroke="#d4a84b" stroke-width="0.5"/>
        <text x="300" y="30" text-anchor="middle" font-size="9" fill="#d4a84b" font-family="monospace" font-weight="bold">HEAD TO TOE</text>
        <text x="300" y="175" text-anchor="middle" font-size="10" fill="rgba(212,168,75,0.7)" font-family="monospace">FULL KIT INSPECTION</text>
      ` + end;
    }
    return base + grad("g", "#0f1a2e", "#070d18") + `<rect width="${W}" height="${H}" fill="url(#g)"/><text x="300" y="90" text-anchor="middle" font-size="14" fill="#d4a84b" font-family="monospace">DRESS & UNIFORM</text>` + end;
  }

  // ==========================================================
  // RANK LOGIC
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
    DRESS_BADGES.forEach(b => {
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
    document.getElementById("xpText").textContent = `${into} / ${span} XP`;
  }

  function renderTopStats() {
    const rank = currentRank();
    refreshBadges();
    document.getElementById("topRank").textContent = rank.name.replace("Standards Recruit", "Recruit").replace("Standards Cadet", "Cadet").replace("Standards ", "");
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
    document.getElementById("cmdXPNext").textContent = nxt ? `+${nxt.xp - state.xp} to ${nxt.name}` : "MAX RANK";
    document.getElementById("cmdSitreps").textContent = state.sitreps.length;
    document.getElementById("cmdBadges").textContent = state.badges.length;
    document.getElementById("cmdBadgeTotal").textContent = "of " + DRESS_BADGES.length;

    // Chapter list
    const cl = document.getElementById("chapterList");
    cl.innerHTML = MISSIONS.map(m => {
      const done = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total = m.tasks.length;
      const isActive = activeMissionId === m.id && !done;
      let cls = "chapter-row";
      let progText = "";
      if (done) { cls += " done"; progText = `${prog}/${total} \u2713`; }
      else if (isActive) { cls += " active"; progText = `${prog}/${total} \u25b8`; }
      else if (unlocked) { progText = `${prog}/${total}`; }
      else { cls += " locked"; progText = "LOCKED"; }
      const num = done ? "\u2713" : m.order;
      return `<div class="${cls}" data-mission="${m.id}">
        <span class="n">${num}</span>
        <div class="cr-body" style="flex:1;">
          <div class="cr-title">${m.title}</div>
          <div class="cr-desc">${m.desc}</div>
        </div>
        <span class="cr-prog">${progText}</span>
      </div>`;
    }).join("");
    cl.querySelectorAll(".chapter-row:not(.locked)").forEach(el => {
      el.addEventListener("click", () => {
        const mid = el.dataset.mission;
        openMission(mid);
      });
    });

    // Threat meter based on wrong attempts
    const threatPct = Math.min(100, 20 + (state.wrongAttempts * 5));
    const tf = document.getElementById("threatFill");
    if (tf) tf.style.width = threatPct + "%";
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
      return `<div class="${cls}" data-mission="${m.id}">
        <div class="mc-top">
          <div class="mc-ico">${m.icon}</div>
          <div>
            <div class="mc-tag">${m.tag}</div>
            <div class="mc-title">${m.title}</div>
          </div>
        </div>
        <div class="mc-desc">${m.desc}</div>
        <div class="mc-prog-bar"><div class="mc-prog-fill" style="width:${pct}%"></div></div>
        <div class="mc-foot">
          <span class="mc-xp">\u26a1 ${missionXP(m)} XP</span>
          <span class="${statusCls}">${statusText} \u00b7 ${prog}/${total}</span>
        </div>
      </div>`;
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
      return `<div class="${cls}" data-mission="${m.id}">
        <div class="mc-top">
          <div class="mc-ico">${m.icon}</div>
          <div>
            <div class="mc-tag">${m.tag}</div>
            <div class="mc-title">${m.title}</div>
          </div>
        </div>
        <div class="mc-desc">${m.desc}</div>
        <div class="mc-prog-bar"><div class="mc-prog-fill" style="width:${pct}%"></div></div>
        <div class="mc-foot">
          <span class="mc-xp">\u26a1 ${missionXP(m)} XP</span>
          <span class="${statusCls}">${statusText} \u00b7 ${prog}/${total}</span>
        </div>
      </div>`;
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
      toast("warn", "\u{1F512} Module " + m.order + " is locked. Complete the previous module first.");
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
    document.getElementById("missionHeaderSub").textContent = m.tag + " \u2014 " + m.desc;

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

    consoleEl.innerHTML = `
      <div class="task-console">
        <div class="task-header">
          <div class="th-left">
            <div class="th-ico">${m.icon}</div>
            <div>
              <div class="th-title">${m.title}</div>
              <div class="th-sub">${m.tag} \u2022 ${mp.tasksDone.length}/${total} tasks complete</div>
            </div>
          </div>
          <div class="th-right">
            <span class="task-stage-pill">TASK ${activeTaskIndex + 1} / ${total}</span>
            <button class="btn btn-ghost" id="exitMissionBtn" type="button">\u2190 Back to list</button>
          </div>
        </div>
        <div class="task-body">
          <div class="scene-visual">${sceneSVG(m.scene)}<div class="scene-overlay">${m.brief.split(".")[0]}.</div></div>
          <div class="task-brief">${m.brief}</div>

          <div class="tool-dock" id="toolDock">
            ${TOOLS.map(t => `<button class="tool-btn ${activeTool === t.id ? "active" : ""}" data-tool="${t.id}" type="button"><span class="tb-ico">${t.icon}</span>${t.label}</button>`).join("")}
          </div>

          <div class="tool-req" id="toolReq">
            <span class="tr-ico">\u26a0\ufe0f</span>
            <span class="tr-text">This task requires the <strong>${toolLabel(task.tool)}</strong> to be open. Current tool: <span class="tr-now" id="trNow">${activeTool ? toolLabel(activeTool) : "NONE"}</span></span>
          </div>

          <div class="task-step-label">
            <span class="step-num">STEP ${activeTaskIndex + 1}</span>
            <span class="step-title">${task.title}</span>
          </div>
          <div class="task-instructions">${task.prompt}</div>

          <div class="task-control" id="taskControl">
            ${renderTaskControl(task, activeTaskIndex)}
          </div>

          <div class="task-actions">
            <button class="btn btn-primary" id="submitTaskBtn" type="button">\u2713 Submit & Confirm</button>
            <button class="btn btn-ghost" id="hintBtn" type="button">\u{1F4A1} Hint</button>
          </div>

          <div class="terminal" id="terminal"><div class="ln ln-dim">// awaiting input\u2026</div></div>
          <div class="task-feedback" id="taskFeedback"></div>

          <hr class="divider"/>
          <h3 style="margin-bottom:10px;">Mission Checklist</h3>
          <div class="checklist" id="checklist">
            ${m.tasks.map((t, i) => {
              const done = mp.tasksDone.includes(i);
              return `<div class="check-item ${done ? "done" : ""}"><div class="ci-box"></div><div>${t.title}</div></div>`;
            }).join("")}
          </div>
        </div>
      </div>
    `;

    bindConsoleEvents(task);
    // Auto-open the required tool if the current tool doesn't match
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
      return `<div class="toggle-row ${on ? "on" : ""}" id="toggleRow" data-idx="${idx}">
        <div class="toggle-switch"></div>
        <div class="toggle-label">${task.title}</div>
        <div class="toggle-icon">${on ? "\u2713" : "\u25cb"}</div>
      </div>`;
    }
    if (task.type === "select") {
      const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
      return `<select class="task-select" id="taskSelect" data-idx="${idx}">
        <option value="">\u2014 Select your answer \u2014</option>
        ${task.options.map(o => `<option value="${esc(o)}">${esc(o)}</option>`).join("")}
      </select>`;
    }
    if (task.type === "note") {
      return `<textarea class="task-note" id="taskNote" placeholder="Write your log entry here\u2026"></textarea>`;
    }
    if (task.type === "slider") {
      sliderValue[idx] = sliderValue[idx] !== undefined ? sliderValue[idx] : 0;
      const unit = task.unit || "m";
      return `<input class="task-slider" id="taskSlider" type="range" min="0" max="${task.max || 100}" value="${sliderValue[idx]}" data-idx="${idx}" />
        <div class="slider-readout" id="sliderReadout">${sliderValue[idx]} ${unit}</div>`;
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
        termPush("info", `\u25b8 Opened ${toolLabel(activeTool)}`);
      });
    });

    const toggleRow = document.getElementById("toggleRow");
    if (toggleRow) {
      toggleRow.addEventListener("click", () => {
        const idx = parseInt(toggleRow.dataset.idx, 10);
        toggleState[idx] = !toggleState[idx];
        const on = toggleState[idx];
        toggleRow.classList.toggle("on", on);
        toggleRow.querySelector(".toggle-icon").textContent = on ? "\u2713" : "\u25cb";
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
      ico.textContent = "\u2705";
      now.textContent = toolLabel(activeTool);
    } else {
      ico.textContent = "\u26a0\ufe0f";
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
      fb.innerHTML = `\u274c Wrong tool! This task requires <strong>${toolLabel(task.tool)}</strong>. You currently have <strong>${activeTool ? toolLabel(activeTool) : "no tool"}</strong> open. Open the correct tool from the dock above.`;
      termPush("err", `\u2717 FAILED \u2014 wrong tool. Required: ${toolLabel(task.tool)}`);
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
      fb.innerHTML = `\u274c ${valid.msg}`;
      termPush("err", `\u2717 ${valid.msg}`);
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
    fb.innerHTML = `\u2705 Correct! ${task.proof}`;
    termPush("ok", `\u2713 ${task.proof}`);

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
      return val === task.expected ? { ok: true } : { ok: false, msg: `Incorrect. The correct answer is not "${val}". Review the options and try again.` };
    }
    if (task.type === "note") {
      const ta = document.getElementById("taskNote");
      const val = (ta ? ta.value : "").trim();
      if (val.length < 10) return { ok: false, msg: "Your log entry is too short. Write a complete sentence." };
      const lower = val.toLowerCase();
      const checkKw = (kws) => kws.every(k => lower.includes(k.toLowerCase()));
      const mainOk = task.keywords ? checkKw(task.keywords) : true;
      if (mainOk) return { ok: true };
      const missing = task.keywords.filter(k => !lower.includes(k.toLowerCase()));
      return { ok: false, msg: `Your note is missing required keywords: ${missing.join(", ")}. Make sure to include them.` };
    }
    if (task.type === "slider") {
      const v = sliderValue[activeTaskIndex] || 0;
      const tol = task.tolerance || 1;
      if (Math.abs(v - task.expected) <= tol) return { ok: true };
      const unit = task.unit || "m";
      return { ok: false, msg: `The reading is set to ${v} ${unit}. Adjust the dial to match the target.` };
    }
    return { ok: false, msg: "Unknown task type." };
  }

  function showHint(task) {
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback show info";
    let hint = "";
    if (task.type === "select") hint = `The correct answer relates to: ${task.expected.slice(0, 40)}\u2026`;
    else if (task.type === "note") hint = `Your note must include: ${task.keywords.join(", ")}.`;
    else if (task.type === "toggle") hint = "Click the toggle row to switch it to the ON (green) position.";
    else if (task.type === "slider") hint = `The target reading is close to ${task.expected} ${task.unit || "m"}.`;
    fb.textContent = "\u{1F4A1} " + hint;
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
      const badge = DRESS_BADGES.find(b => b.mission === m.id);
      toast("ok", `\u{1F3C6} Mission complete! +${earned} XP earned. Badge unlocked: ${badge ? badge.name : m.title}.`);
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
    const badge = DRESS_BADGES.find(b => b.mission === m.id);
    const mp = missionProgress(m.id);
    return `<div class="task-console">
      <div class="task-body">
        <div class="complete-card">
          <div class="cc-ico">\u{1F3C6}</div>
          <div class="cc-title">Mission Complete: ${m.title}</div>
          <div class="cc-sub">${m.desc} You have successfully completed all ${m.tasks.length} tasks and earned the <strong>${badge ? badge.name : "Standards Cadet"}</strong> badge.</div>
          <div class="cc-stats">
            <div class="cc-stat"><div class="v">+${earned}</div><div class="l">XP Earned</div></div>
            <div class="cc-stat"><div class="v">${mp.tasksDone.length}/${m.tasks.length}</div><div class="l">Tasks Done</div></div>
            <div class="cc-stat"><div class="v">${mp.wrongAttempts || 0}</div><div class="l">Wrong Attempts</div></div>
          </div>
          <div class="task-actions" style="justify-content:center;">
            <button class="btn btn-primary" id="fileSitrepQuickBtn" type="button">\u{1F4DD} File SITREP for this mission</button>
            <button class="btn btn-ghost" id="backToListBtn" type="button">\u2190 Back to mission list</button>
          </div>
        </div>
      </div>
    </div>`;
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
    document.getElementById("ringRankLabel").textContent = rank.name.replace("Standards ", "");
    document.getElementById("nextRankName").textContent = nxt ? nxt.name : "MAX RANK";
    const pct = rankProgressPct();
    const circ = 314;
    document.getElementById("xpRingFg").style.strokeDashoffset = circ - (circ * pct / 100);
    document.getElementById("ringXPToNext").textContent = nxt ? `${state.xp - rank.xp} / ${nxt.xp - rank.xp} XP to next rank` : "MAX RANK ACHIEVED";

    // XP bar chart
    const chart = document.getElementById("xpBarChart");
    chart.innerHTML = MISSIONS.map(m => {
      const done = missionDone(m);
      const xp = done ? missionXP(m) : 0;
      const h = Math.max(4, (xp / 100) * 140);
      return `<div class="bar" style="height:${h}px;" title="${m.title}: ${xp} XP"><div class="bar-val">${xp}</div><div class="bar-label">M${m.order}</div></div>`;
    }).join("");

    // Stats
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
      else { cls += ""; tag = '<span class="r-tag locked">LOCKED</span>'; }
      return `<div class="${cls}">
        <div class="r-ico">${r.icon}</div>
        <div class="r-body">
          <div class="r-name">${r.name}</div>
          <div class="r-xp">${r.xp} XP \u2022 CALLSIGN ${r.callsign}</div>
        </div>
        ${tag}
      </div>`;
    }).join("");
  }

  // ==========================================================
  // SITREP
  // ==========================================================
  function renderSitrep() {
    const sel = document.getElementById("sitrepMission");
    const completed = MISSIONS.filter(m => missionDone(m));
    sel.innerHTML = `<option value="">Select a completed mission\u2026</option>` +
      completed.map(m => `<option value="${m.id}">${m.tag} \u2014 ${m.title}</option>`).join("");

    const log = document.getElementById("sitrepLog");
    if (state.sitreps.length === 0) {
      log.innerHTML = `<p class="muted center" style="padding:20px;">No SITREPs filed yet. Complete a mission and file your first report.</p>`;
    } else {
      log.innerHTML = state.sitreps.slice().reverse().map(s => {
        const statusMap = {
          NOMINAL: { cls: "low", text: "NOMINAL", color: "var(--green)" },
          MINOR_HAZARD: { cls: "med", text: "MINOR HAZARD", color: "var(--amber)" },
          ABORTED: { cls: "high", text: "ABORTED", color: "var(--red)" }
        };
        const st = statusMap[s.status] || statusMap.NOMINAL;
        const m = MISSIONS.find(x => x.id === s.mission);
        return `<div class="sitrep-entry">
          <div class="se-head">
            <span class="se-time">${s.time}</span>
            <span class="se-status ti-level ${st.cls}">${st.text}</span>
          </div>
          <div class="se-body"><strong>${m ? m.tag + " \u2014 " + m.title : s.mission}</strong><br/>${escapeHTML(s.summary)}</div>
        </div>`;
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
    showFeedback(fb, "ok", `SITREP filed successfully! +20 XP. Your inspecting officer has received your report.`);
    toast("ok", "\u{1F4E8} SITREP filed! +20 XP");
    renderSitrep();
    renderSidebar();
    renderTopStats();
    renderCommand();
    renderAnalysis();
  }

  function showFeedback(el, kind, msg) {
    el.className = "task-feedback show " + kind;
    el.textContent = (kind === "ok" ? "\u2705 " : kind === "err" ? "\u274c " : "\u{1F4A1} ") + msg;
  }

  // ==========================================================
  // LEARN LIBRARY
  // ==========================================================
  function renderLearn() {
    const grid = document.getElementById("learnGrid");
    grid.innerHTML = LEARN_ARTICLES.map(a => {
      const read = state.readArticles.includes(a.id);
      return `<div class="lib-card ${read ? "read" : ""}" data-article="${a.id}">
        <div class="lc-ico">${a.icon}</div>
        <div class="lc-cat">${a.cat}</div>
        <div class="lc-title">${a.title}</div>
        <div class="lc-desc">${a.desc}</div>
        <div class="lc-foot"><span>${read ? "\u2713 Read" : "Tap to read"}</span><span>+${a.xp} XP</span></div>
      </div>`;
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
      toast("ok", `\u{1F4D6} Article read: "${a.title}" \u2014 +${a.xp} XP`);
      renderLearn();
      renderSidebar();
      renderTopStats();
      renderAnalysis();
    } else {
      toast("info", `\u{1F4D6} Already read: "${a.title}"`);
    }
  }


  // ==========================================================
  // INSPECTION DAY -- MULTI-MODE INTERACTIVE INSPECTION GAME
  // Five challenge types: Quiz, Spot the Fault, Polish Boots,
  // Correct Sequence, Badge Placement
  // ==========================================================

  // ---- CHALLENGE BANK ----
  // Each challenge has a type that determines how it is rendered and solved.
  // type: "quiz" | "spotfault" | "polish" | "sequence" | "badgeplace"

  const CHALLENGE_BANK = [

    // ============ QUIZ (knowledge questions) ============
    { id: "qz_h1", type: "quiz", cat: "Headdress", q: "At what height should the headdress be worn?",
      options: ["One inch above the right eyebrow, level side to side", "Directly on top of the eyebrows", "Pushed back to expose the forehead", "Two inches above the eyebrows"],
      answer: 0, xp: 10 },
    { id: "qz_b1", type: "quiz", cat: "Badges", q: "Where are rank slides worn on the uniform?",
      options: ["On both shoulders, centred and straight", "On the left shoulder only", "On the collar points", "Above the chest pockets"],
      answer: 0, xp: 10 },
    { id: "qz_br1", type: "quiz", cat: "Brassard", q: "On which shoulder is the brassard worn?",
      options: ["Right shoulder, secured to the epaulette", "Left shoulder, hanging loose", "Both shoulders", "Worn on the chest like a sash"],
      answer: 0, xp: 10 },
    { id: "qz_bo1", type: "quiz", cat: "Boots", q: "What type of polish is used for bulling boots?",
      options: ["Kiwi or similar wax-based polish in thin layers", "Liquid sponge-applicator polish", "Silicone spray", "Furniture polish"],
      answer: 0, xp: 10 },
    { id: "qz_ir1", type: "quiz", cat: "Ironing", q: "What temperature should you use for ironing a cotton uniform shirt?",
      options: ["Medium-hot with steam, following the garment label", "Maximum heat for fastest results", "Cold iron only", "No heat, just press flat by hand"],
      answer: 0, xp: 10 },
    { id: "qz_br_c1", type: "quiz", cat: "Brass Care", q: "What must you avoid when cleaning brass and metal fittings?",
      options: ["Abrasive cleaners and steel wool that can scratch", "Wearing gloves while polishing", "Buffing too many times", "Using a microfibre cloth"],
      answer: 0, xp: 10 },
    { id: "qz_g1", type: "quiz", cat: "Grooming", q: "What is the standard for male cadet hair on parade?",
      options: ["Neat, tapered, off the collar and above the ears", "Long enough to touch the collar", "Any style as long as it is clean", "Shaved completely bald only"],
      answer: 0, xp: 10 },
    { id: "qz_c1", type: "quiz", cat: "Ceremonial", q: "When is Number 1 ceremonial dress worn?",
      options: ["Parades, remembrance services, and official occasions", "Field training and exercises", "Everyday classroom wear", "Only during summer camp"],
      answer: 0, xp: 10 },
    { id: "qz_cd1", type: "quiz", cat: "Combat Dress", q: "What is the correct wear for the combat jacket?",
      options: ["Zipped at least halfway, sleeves as ordered", "Fully unzipped and open at all times", "Sleeves cut off in hot weather", "Worn inside-out for camouflage"],
      answer: 0, xp: 10 },
    { id: "qz_fk1", type: "quiz", cat: "Inspection", q: "In what order does the inspecting officer check a cadet?",
      options: ["Head to toe \u2014 headdress, hair, shirt, badges, belt, trousers, boots", "Random order", "Boots first then upward", "Only visible items"],
      answer: 0, xp: 15 },

    // ============ SPOT THE FAULT (click faults on a cadet figure) ============
    { id: "sf1", type: "spotfault", cat: "Full Kit", q: "Spot all the uniform faults on this cadet. Click each fault area to mark it.",
      faults: [
        { id: "f_headdress", label: "Headdress tilted", cx: 300, cy: 62, rx: 32, ry: 16, hint: "Cap is tilted to one side" },
        { id: "f_badge", label: "Badge off-centre", cx: 300, cy: 130, rx: 18, ry: 14, hint: "Cap badge is not centred" },
        { id: "f_buttons", label: "Missing button", cx: 300, cy: 185, rx: 12, ry: 10, hint: "A tunic button is missing" },
        { id: "f_boots", label: "Boots not bulled", cx: 300, cy: 298, rx: 55, ry: 12, hint: "Boots are dull and unpolished" }
      ],
      xp: 20 },
    { id: "sf2", type: "spotfault", cat: "Dress Inspection", q: "Find the three faults the inspecting officer would catch. Click each one.",
      faults: [
        { id: "f_crease", label: "Broken trouser crease", cx: 278, cy: 270, rx: 12, ry: 18, hint: "Left trouser crease is not sharp" },
        { id: "f_brass", label: "Tarnished belt buckle", cx: 300, cy: 205, rx: 22, ry: 12, hint: "Belt buckle is tarnished" },
        { id: "f_grooming", label: "Hair below collar", cx: 300, cy: 85, rx: 20, ry: 14, hint: "Hair is too long at the back" }
      ],
      xp: 20 },
    { id: "sf3", type: "spotfault", cat: "Brassard", q: "Click the fault on this cadet's brassard.",
      faults: [
        { id: "f_brassard", label: "Badges not spaced evenly", cx: 345, cy: 140, rx: 16, ry: 22, hint: "Brassard badges are clustered and crooked" }
      ],
      xp: 15 },
    { id: "sf4", type: "spotfault", cat: "Grooming", q: "Spot the two grooming faults on this cadet. Click each one.",
      faults: [
        { id: "f_hair", label: "Hair too long", cx: 300, cy: 85, rx: 22, ry: 16, hint: "Hair extends below the collar" },
        { id: "f_shave", label: "Unshaven", cx: 300, cy: 80, rx: 14, ry: 10, hint: "Face is not cleanly shaven" }
      ],
      xp: 18 },
    { id: "sf5", type: "spotfault", cat: "Headdress", q: "Find the headdress fault. Click the problem area.",
      faults: [
        { id: "f_captilt", label: "Cap tilted", cx: 300, cy: 55, rx: 28, ry: 14, hint: "The headdress is not level" }
      ],
      xp: 15 },

    // ============ POLISH BOOTS (rub/click to build shine) ============
    { id: "pb1", type: "polish", cat: "Boots", q: "Bull these boots to inspection standard! Click and rub the boot to build up the shine. Reach 100% before time runs out.",
      target: 100, xp: 20 },
    { id: "pb2", type: "polish", cat: "Boots", q: "Polish the boot to a mirror shine. Keep rubbing \u2014 each rub adds a thin polish layer. Reach 100%!",
      target: 100, xp: 20 },
    { id: "pb3", type: "polish", cat: "Boots", q: "Final inspection polish! Bull this boot until it gleams. Click and rub to build the shine to 100%.",
      target: 100, xp: 25 },

    // ============ SEQUENCE (click steps in correct order) ============
    { id: "seq1", type: "sequence", cat: "Boots", q: "Put the boot-bulling steps in the correct order. Click each step in sequence.",
      steps: [
        "Apply base layers of polish with a brush",
        "Switch to a soft cloth wrapped around the fingers",
        "Add a tiny dab of water and polish, rub in small circles",
        "Repeat layers until a mirror shine appears"
      ],
      xp: 20 },
    { id: "seq2", type: "sequence", cat: "Ironing", q: "Arrange the ironing steps in the correct order. Click each step in sequence.",
      steps: [
        "Check the garment label for the correct temperature",
        "Set the iron to the right heat and wait for it to warm up",
        "Iron the collar first, then cuffs and sleeves",
        "Press the body of the shirt, finishing with the back"
      ],
      xp: 20 },
    { id: "seq3", type: "sequence", cat: "Inspection", q: "Put the head-to-toe inspection order in sequence. Click each step in the correct order.",
      steps: [
        "Check headdress position and badge",
        "Inspect hair and grooming",
        "Examine shirt, badges, and brassard",
        "Check belt buckle and trouser creases",
        "Inspect boots for bull and lacing"
      ],
      xp: 25 },
    { id: "seq4", type: "sequence", cat: "Brass Care", q: "Order the brass-cleaning steps correctly. Click each step in sequence.",
      steps: [
        "Inspect brass fittings for tarnish and fingerprints",
        "Apply a small amount of brass polish to a soft cloth",
        "Work the polish in with small circular motions",
        "Buff to a bright shine with a clean section of cloth"
      ],
      xp: 20 },

    // ============ BADGE PLACEMENT (click correct slot on uniform) ============
    { id: "bp1", type: "badgeplace", cat: "Badges", q: "Place each badge on the correct part of the uniform. Click the right spot for each badge shown.",
      badges: [
        { id: "bdg_cap", icon: "\u{1F396}", name: "Cap Badge", slotId: "slot_headdress", hint: "Worn centred on the front of the headdress" },
        { id: "bdg_qual", icon: "\u{1F3C5}", name: "Qualification Badge", slotId: "slot_tunic", hint: "Worn above the right chest pocket on the tunic" },
        { id: "bdg_brassard", icon: "\u{1F9BA}", name: "Proficiency Badge", slotId: "slot_brassard", hint: "Worn on the brassard on the right shoulder" }
      ],
      xp: 25 },
    { id: "bp2", type: "badgeplace", cat: "Badges", q: "Place each item on the correct part of the uniform. Click the right spot for each item.",
      badges: [
        { id: "bdg_rank1", icon: "\u2B50", name: "Rank Slide", slotId: "slot_shoulder", hint: "Worn on both shoulder epaulettes, centred and straight" },
        { id: "bdg_unit", icon: "\u{1F39F}", name: "Unit Badge", slotId: "slot_sleeve", hint: "Worn on the upper sleeve as specified by the unit" },
        { id: "bdg_button", icon: "\u{1FAA9}", name: "Brass Button", slotId: "slot_button", hint: "Worn down the centre front of the tunic" }
      ],
      xp: 25 }
  ];

  // Game state (in-memory, synced to localStorage)
  let ig = {
    active: false,
    examMode: false,
    currentChallenge: null,
    challengePool: [],
    poolIndex: 0,
    selectedAnswer: null,
    answered: false,
    timer: null,
    timerStart: 0,
    timerWindow: 15000,
    score: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    bestStreak: 0,
    round: 0,
    inspecteeState: "ready",
    // sub-state for interactive challenges
    spotFound: [],
    spotMisses: 0,
    polishLevel: 0,
    seqOrder: [],
    seqNext: 0,
    badgeIdx: 0,
    badgeCorrect: 0
  };

  function loadInspectionStats() {
    try {
      const raw = localStorage.getItem(SK.inspectionGame);
      if (raw) {
        const p = JSON.parse(raw);
        ig.score = p.score || 0;
        ig.correct = p.correct || 0;
        ig.wrong = p.wrong || 0;
        ig.bestStreak = p.bestStreak || 0;
        ig.round = p.rounds || 0;
      }
    } catch (e) {}
  }

  function saveInspectionStats() {
    try {
      localStorage.setItem(SK.inspectionGame, JSON.stringify({
        score: ig.score,
        correct: ig.correct,
        wrong: ig.wrong,
        bestStreak: ig.bestStreak,
        rounds: ig.round
      }));
    } catch (e) {}
  }


  // ---- Cadet figure SVG used by spot-fault and badge-placement challenges ----
  // Renders a full-body cadet figure at viewBox 0 0 600 340
  // If interactiveZones is provided, overlays clickable <ellipse>/<rect>/<circle> hotspots
  // slotDefs: optional array of slot definitions for badge placement mode
  function renderCadetFigure(opts) {
    opts = opts || {};
    const showFaults = opts.showFaults || false;
    const foundIds = opts.foundIds || [];
    const slotDefs = opts.slotDefs || null;
    const highlightSlot = opts.highlightSlot || null;

    const bodyColor = "#0d1a30";
    const strokeColor = "#d4a84b";
    const headColor = "#2a3a55";
    const badgeColor = "#d4a84b";

    // Interactive fault zones (for spotfault mode)
    let faultOverlays = "";
    if (showFaults && opts.faults) {
      faultOverlays = opts.faults.map(function(ft) {
        const found = foundIds.indexOf(ft.id) >= 0;
        const cls = found ? "spotfault-zone found" : "spotfault-zone";
        return '<ellipse class="' + cls + '" data-fault="' + ft.id + '" cx="' + ft.cx + '" cy="' + ft.cy + '" rx="' + ft.rx + '" ry="' + ft.ry + '" fill="rgba(255,90,110,0.25)" stroke="#ff5a6e" stroke-width="2" stroke-dasharray="4 3"/>';
      }).join("");
    }

    // Badge placement slots (for badgeplace mode)
    let slotOverlays = "";
    if (slotDefs) {
      slotOverlays = slotDefs.map(function(sl) {
        let shape = "";
        const isHi = highlightSlot === sl.id;
        const hiColor = isHi ? "var(--brass-bright)" : "rgba(212,168,75,0.3)";
        if (sl.shape === "rect") {
          shape = '<rect class="bp-slot" data-slot="' + sl.id + '" x="' + sl.x + '" y="' + sl.y + '" width="' + sl.w + '" height="' + sl.h + '" rx="3" fill="rgba(212,168,75,0.08)" stroke="' + hiColor + '" stroke-width="2" stroke-dasharray="4 3"/>';
        } else {
          shape = '<circle class="bp-slot" data-slot="' + sl.id + '" cx="' + sl.cx + '" cy="' + sl.cy + '" r="' + sl.r + '" fill="rgba(212,168,75,0.08)" stroke="' + hiColor + '" stroke-width="2" stroke-dasharray="4 3"/>';
        }
        return shape;
      }).join("");
    }

    // The cadet figure itself (same proportions as the inspectee but centered at 300,160)
    const svg = '<svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%;">' +
      '<defs><linearGradient id="cadetBg" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#0f1a2e"/><stop offset="100%" stop-color="#070d18"/>' +
      '</linearGradient></defs>' +
      '<rect x="0" y="0" width="600" height="340" fill="url(#cadetBg)"/>' +
      '<line x1="80" y1="290" x2="520" y2="290" stroke="rgba(212,168,75,0.2)" stroke-width="1.5" stroke-dasharray="8 4"/>' +
      '<text x="300" y="285" text-anchor="middle" font-size="8" fill="rgba(212,168,75,0.4)" font-family="monospace">INSPECTION LINE</text>' +
      // Figure
      '<g transform="translate(300,160)">' +
      // Headdress
      '<ellipse cx="0" cy="-105" rx="22" ry="10" fill="' + headColor + '" stroke="' + strokeColor + '" stroke-width="2"/>' +
      '<path d="M-20,-105 Q0,-118 20,-105 L20,-100 L-20,-100 Z" fill="#1a2a40" stroke="' + strokeColor + '" stroke-width="1.5"/>' +
      '<circle cx="0" cy="-110" r="5" fill="' + badgeColor + '" stroke="#a67e2e" stroke-width="1"/>' +
      // Head
      '<circle cx="0" cy="-85" r="18" fill="#2a3a55" stroke="' + strokeColor + '" stroke-width="1.5"/>' +
      '<circle cx="-6" cy="-87" r="1.5" fill="' + strokeColor + '"/>' +
      '<circle cx="6" cy="-87" r="1.5" fill="' + strokeColor + '"/>' +
      '<path d="M-5,-78 Q0,-75 5,-78" fill="none" stroke="' + strokeColor + '" stroke-width="1"/>' +
      // Neck
      '<rect x="-6" y="-70" width="12" height="10" fill="#2a3a55"/>' +
      // Tunic
      '<path d="M-40,-60 L40,-60 L45,80 L-45,80 Z" fill="' + bodyColor + '" stroke="' + strokeColor + '" stroke-width="2"/>' +
      // Collar
      '<path d="M-14,-60 L0,-48 L14,-60 L8,-60 L0,-52 L-8,-60 Z" fill="#1a2a40" stroke="' + strokeColor + '" stroke-width="1"/>' +
      // Buttons
      '<circle cx="0" cy="-40" r="3" fill="' + badgeColor + '" stroke="#a67e2e" stroke-width="0.5"/>' +
      '<circle cx="0" cy="-15" r="3" fill="' + badgeColor + '" stroke="#a67e2e" stroke-width="0.5"/>' +
      '<circle cx="0" cy="10" r="3" fill="' + badgeColor + '" stroke="#a67e2e" stroke-width="0.5"/>' +
      '<circle cx="0" cy="35" r="3" fill="' + badgeColor + '" stroke="#a67e2e" stroke-width="0.5"/>' +
      // Qual badge area
      '<rect x="-18" y="-40" width="14" height="10" rx="2" fill="' + badgeColor + '" opacity="0.7" stroke="#a67e2e" stroke-width="0.5"/>' +
      // Belt
      '<rect x="-45" y="45" width="90" height="10" fill="' + badgeColor + '" stroke="#a67e2e" stroke-width="1"/>' +
      '<rect x="-8" y="45" width="16" height="10" fill="#a67e2e" stroke="#1a1a2e" stroke-width="0.5"/>' +
      // Brassard
      '<path d="M25,-58 L42,-55 L40,-25 L28,-28 Z" fill="#1a2a40" stroke="' + strokeColor + '" stroke-width="1"/>' +
      '<rect x="30" y="-50" width="10" height="6" rx="1" fill="' + badgeColor + '" opacity="0.6"/>' +
      '<rect x="30" y="-40" width="10" height="6" rx="1" fill="' + badgeColor + '" opacity="0.5"/>' +
      // Shoulders (epaulettes)
      '<rect x="-40" y="-60" width="18" height="6" rx="2" fill="' + badgeColor + '" opacity="0.4" stroke="' + strokeColor + '" stroke-width="0.5"/>' +
      '<rect x="22" y="-60" width="18" height="6" rx="2" fill="' + badgeColor + '" opacity="0.4" stroke="' + strokeColor + '" stroke-width="0.5"/>' +
      // Trousers
      '<rect x="-45" y="80" width="42" height="60" rx="3" fill="' + bodyColor + '" stroke="' + strokeColor + '" stroke-width="1.5"/>' +
      '<rect x="3" y="80" width="42" height="60" rx="3" fill="' + bodyColor + '" stroke="' + strokeColor + '" stroke-width="1.5"/>' +
      // Creases
      '<line x1="-24" y1="80" x2="-24" y2="140" stroke="' + strokeColor + '" stroke-width="1" opacity="0.6"/>' +
      '<line x1="24" y1="80" x2="24" y2="140" stroke="' + strokeColor + '" stroke-width="1" opacity="0.6"/>' +
      // Boots
      '<ellipse cx="-24" cy="145" rx="18" ry="6" fill="#0a0a1a" stroke="' + strokeColor + '" stroke-width="1.5"/>' +
      '<ellipse cx="24" cy="145" rx="18" ry="6" fill="#0a0a1a" stroke="' + strokeColor + '" stroke-width="1.5"/>' +
      '<ellipse cx="-24" cy="143" rx="14" ry="3" fill="rgba(240,196,99,0.15)"/>' +
      '<ellipse cx="24" cy="143" rx="14" ry="3" fill="rgba(240,196,99,0.15)"/>' +
      '</g>' +
      faultOverlays +
      slotOverlays +
      '</svg>';

    return svg;
  }

  // Badge placement slot definitions (coordinates relative to viewBox 0 0 600 340)
  // These overlay the cadet figure at the correct uniform locations
  const BP_SLOTS = [
    { id: "slot_headdress", shape: "circle", cx: 300, cy: 50, r: 18, label: "Headdress" },
    { id: "slot_tunic", shape: "rect", x: 260, y: 108, w: 30, h: 20, label: "Right chest" },
    { id: "slot_brassard", shape: "rect", x: 328, y: 105, w: 22, h: 38, label: "Brassard" },
    { id: "slot_shoulder", shape: "rect", x: 284, y: 96, w: 32, h: 8, label: "Shoulder" },
    { id: "slot_sleeve", shape: "rect", x: 255, y: 130, w: 18, h: 26, label: "Upper sleeve" },
    { id: "slot_button", shape: "circle", cx: 300, cy: 130, r: 10, label: "Tunic front" }
  ];

  // ---- Side panel inspectee (compact status figure) ----
  function renderInspectee(inspecteeState) {
    const st = inspecteeState || ig.inspecteeState;
    const wrap = document.getElementById("inspectionCanvasWrap");
    if (!wrap) return;

    let bodyColor = "#0d1a30";
    let strokeColor = "#d4a84b";
    let glow = "";
    let label = "READY FOR INSPECTION";

    if (st === "correct") { glow = '<circle cx="300" cy="160" r="80" fill="none" stroke="#4caf50" stroke-width="2" opacity="0.4"/>'; label = "INSPECTION PASSED"; }
    else if (st === "wrong") { glow = '<circle cx="300" cy="160" r="80" fill="none" stroke="#f44336" stroke-width="2" opacity="0.4"/>'; label = "FAULT DETECTED"; bodyColor = "#2a1015"; }
    else if (st === "salute") { glow = '<circle cx="300" cy="160" r="80" fill="none" stroke="#f0c463" stroke-width="2" opacity="0.4"/>'; label = "ON PARADE"; }

    const svg = renderCadetFigure({ showFaults: false }) ;
    // We need the glow + label on the side panel version, so build it inline
    const sideSvg = '<svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%;">' +
      '<defs><linearGradient id="inspectBg" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#0f1a2e"/><stop offset="100%" stop-color="#070d18"/>' +
      '</linearGradient></defs>' +
      '<rect x="0" y="0" width="600" height="340" fill="url(#inspectBg)"/>' +
      glow +
      '<line x1="80" y1="290" x2="520" y2="290" stroke="rgba(212,168,75,0.3)" stroke-width="2" stroke-dasharray="10 5"/>' +
      '<text x="300" y="285" text-anchor="middle" font-size="9" fill="rgba(212,168,75,0.5)" font-family="monospace">INSPECTION LINE</text>' +
      '<g transform="translate(300,160)">' +
      '<ellipse cx="0" cy="-105" rx="22" ry="10" fill="#2a3a55" stroke="' + strokeColor + '" stroke-width="2"/>' +
      '<path d="M-20,-105 Q0,-118 20,-105 L20,-100 L-20,-100 Z" fill="#1a2a40" stroke="' + strokeColor + '" stroke-width="1.5"/>' +
      '<circle cx="0" cy="-110" r="5" fill="#d4a84b" stroke="#a67e2e" stroke-width="1"/>' +
      '<circle cx="0" cy="-85" r="18" fill="#2a3a55" stroke="' + strokeColor + '" stroke-width="1.5"/>' +
      '<circle cx="-6" cy="-87" r="1.5" fill="' + strokeColor + '"/>' +
      '<circle cx="6" cy="-87" r="1.5" fill="' + strokeColor + '"/>' +
      '<path d="M-5,-78 Q0,-75 5,-78" fill="none" stroke="' + strokeColor + '" stroke-width="1"/>' +
      '<rect x="-6" y="-70" width="12" height="10" fill="#2a3a55"/>' +
      '<path d="M-40,-60 L40,-60 L45,80 L-45,80 Z" fill="' + bodyColor + '" stroke="' + strokeColor + '" stroke-width="2"/>' +
      '<path d="M-14,-60 L0,-48 L14,-60 L8,-60 L0,-52 L-8,-60 Z" fill="#1a2a40" stroke="' + strokeColor + '" stroke-width="1"/>' +
      '<circle cx="0" cy="-40" r="3" fill="#d4a84b" stroke="#a67e2e" stroke-width="0.5"/>' +
      '<circle cx="0" cy="-15" r="3" fill="#d4a84b" stroke="#a67e2e" stroke-width="0.5"/>' +
      '<circle cx="0" cy="10" r="3" fill="#d4a84b" stroke="#a67e2e" stroke-width="0.5"/>' +
      '<circle cx="0" cy="35" r="3" fill="#d4a84b" stroke="#a67e2e" stroke-width="0.5"/>' +
      '<rect x="-18" y="-40" width="14" height="10" rx="2" fill="#d4a84b" opacity="0.7" stroke="#a67e2e" stroke-width="0.5"/>' +
      '<rect x="-45" y="45" width="90" height="10" fill="#d4a84b" stroke="#a67e2e" stroke-width="1"/>' +
      '<rect x="-8" y="45" width="16" height="10" fill="#a67e2e" stroke="#1a1a2e" stroke-width="0.5"/>' +
      '<path d="M25,-58 L42,-55 L40,-25 L28,-28 Z" fill="#1a2a40" stroke="' + strokeColor + '" stroke-width="1"/>' +
      '<rect x="30" y="-50" width="10" height="6" rx="1" fill="#d4a84b" opacity="0.6"/>' +
      '<rect x="30" y="-40" width="10" height="6" rx="1" fill="#d4a84b" opacity="0.5"/>' +
      '<rect x="-45" y="80" width="42" height="60" rx="3" fill="' + bodyColor + '" stroke="' + strokeColor + '" stroke-width="1.5"/>' +
      '<rect x="3" y="80" width="42" height="60" rx="3" fill="' + bodyColor + '" stroke="' + strokeColor + '" stroke-width="1.5"/>' +
      '<line x1="-24" y1="80" x2="-24" y2="140" stroke="' + strokeColor + '" stroke-width="1" opacity="0.6"/>' +
      '<line x1="24" y1="80" x2="24" y2="140" stroke="' + strokeColor + '" stroke-width="1" opacity="0.6"/>' +
      '<ellipse cx="-24" cy="145" rx="18" ry="6" fill="#0a0a1a" stroke="' + strokeColor + '" stroke-width="1.5"/>' +
      '<ellipse cx="24" cy="145" rx="18" ry="6" fill="#0a0a1a" stroke="' + strokeColor + '" stroke-width="1.5"/>' +
      '<ellipse cx="-24" cy="143" rx="14" ry="3" fill="rgba(240,196,99,0.15)"/>' +
      '<ellipse cx="24" cy="143" rx="14" ry="3" fill="rgba(240,196,99,0.15)"/>' +
      '</g>' +
      '<text x="300" y="320" text-anchor="middle" font-size="11" fill="rgba(212,168,75,0.6)" font-family="monospace" font-weight="bold">' + label + '</text>' +
      '</svg>';
    wrap.innerHTML = sideSvg;
  }

  // ---- Timer ----
  function startInspectionTimer() {
    stopInspectionTimer();
    ig.timerStart = Date.now();
    const fill = document.getElementById("iqTimerFill");
    if (fill) {
      fill.style.transition = "none";
      fill.style.width = "100%";
      void fill.offsetWidth;
      fill.style.transition = "width " + ig.timerWindow + "ms linear";
      fill.style.width = "0%";
    }
    const label = document.getElementById("iqTimerLabel");
    if (label) label.textContent = "Active...";

    ig.timer = setTimeout(function() {
      if (ig.currentChallenge && !ig.answered) {
        handleChallengeWrong("Time\u2019s up! The inspection timed out.");
      }
    }, ig.timerWindow);
  }

  function stopInspectionTimer() {
    if (ig.timer) { clearTimeout(ig.timer); ig.timer = null; }
    const fill = document.getElementById("iqTimerFill");
    if (fill) { fill.style.transition = "none"; fill.style.width = "0%"; }
  }

  function inspectionTimingBonus() {
    const elapsed = Date.now() - ig.timerStart;
    const remaining = Math.max(0, ig.timerWindow - elapsed);
    const pct = remaining / ig.timerWindow;
    if (pct > 0.75) return 1.5;
    if (pct > 0.5) return 1.25;
    if (pct > 0.25) return 1.0;
    return 0.75;
  }

  // ---- Type metadata ----
  const TYPE_META = {
    quiz:       { label: "Quiz",            icon: "\u{1F4DD}", badgeClass: "quiz" },
    spotfault:  { label: "Spot the Fault",  icon: "\u{1F50D}", badgeClass: "spotfault" },
    polish:     { label: "Polish Boots",    icon: "\u2728",    badgeClass: "polish" },
    sequence:   { label: "Sequence",        icon: "\u{1F522}", badgeClass: "sequence" },
    badgeplace: { label: "Badge Placement", icon: "\u{1F4CC}", badgeClass: "badgeplace" }
  };

  // ---- Challenge dispatcher: picks a challenge and renders it ----
  function askChallenge() {
    if (!ig.active) return;
    if (ig.examMode && ig.poolIndex >= ig.challengePool.length) {
      finishExam();
      return;
    }

    let challenge;
    if (ig.examMode) {
      challenge = ig.challengePool[ig.poolIndex];
      ig.poolIndex++;
    } else {
      // Pick a random challenge, not the same as last
      do {
        challenge = CHALLENGE_BANK[Math.floor(Math.random() * CHALLENGE_BANK.length)];
      } while (ig.currentChallenge && challenge.id === ig.currentChallenge.id && CHALLENGE_BANK.length > 1);
    }

    ig.currentChallenge = challenge;
    ig.selectedAnswer = null;
    ig.answered = false;
    // Reset sub-state
    ig.spotFound = [];
    ig.spotMisses = 0;
    ig.polishLevel = 0;
    ig.seqOrder = [];
    ig.seqNext = 0;
    ig.badgeIdx = 0;
    ig.badgeCorrect = 0;

    // Set timer window based on challenge type
    if (challenge.type === "polish") ig.timerWindow = 25000;
    else if (challenge.type === "sequence") ig.timerWindow = 30000;
    else if (challenge.type === "badgeplace") ig.timerWindow = 35000;
    else if (challenge.type === "spotfault") ig.timerWindow = 30000;
    else ig.timerWindow = 20000;

    // Update header
    const meta = TYPE_META[challenge.type] || TYPE_META.quiz;
    const tb = document.getElementById("iqTypeBadge");
    if (tb) { tb.className = "iq-type-badge " + meta.badgeClass; tb.textContent = meta.icon + " " + meta.label; }
    document.getElementById("iqCategory").textContent = challenge.cat;
    document.getElementById("iqQuestion").textContent = challenge.q;
    document.getElementById("iqRoundVal").textContent = ig.round + 1;

    // Feedback
    const fb = document.getElementById("inspectionFeedback");
    if (fb) {
      fb.className = "inspection-feedback info";
      fb.innerHTML = "<strong>" + challenge.cat + " \u2014 " + meta.label + "</strong> \u2014 Complete the challenge below!";
    }

    const nextBtn = document.getElementById("iqNextBtn");
    if (nextBtn) nextBtn.disabled = true;

    // Render the appropriate challenge type
    if (challenge.type === "quiz") renderQuizChallenge(challenge);
    else if (challenge.type === "spotfault") renderSpotFaultChallenge(challenge);
    else if (challenge.type === "polish") renderPolishChallenge(challenge);
    else if (challenge.type === "sequence") renderSequenceChallenge(challenge);
    else if (challenge.type === "badgeplace") renderBadgePlaceChallenge(challenge);

    startInspectionTimer();
  }

  // ---- QUIZ challenge renderer ----
  function renderQuizChallenge(challenge) {
    const area = document.getElementById("iqChallengeArea");
    if (!area) return;
    const letters = ["A", "B", "C", "D"];
    area.innerHTML = '<div class="inspection-answer-grid" id="inspectionAnswerGrid">' +
      challenge.options.map(function(opt, i) {
        return '<button class="inspection-answer-btn" data-idx="' + i + '" type="button">' +
          '<span class="ia-letter">' + letters[i] + '</span>' +
          '<span class="ia-text">' + escapeHTML(opt) + '</span></button>';
      }).join("") + '</div>';

    area.querySelectorAll(".inspection-answer-btn").forEach(function(btn) {
      btn.addEventListener("click", function() { selectQuizAnswer(parseInt(btn.dataset.idx, 10)); });
    });
  }

  function selectQuizAnswer(idx) {
    if (!ig.currentChallenge || ig.answered) return;
    ig.selectedAnswer = idx;
    ig.answered = true;
    stopInspectionTimer();
    document.querySelectorAll(".inspection-answer-btn").forEach(function(btn) { btn.disabled = true; });

    if (idx === ig.currentChallenge.answer) {
      handleChallengeCorrect();
    } else {
      // Show correct answer
      var btns = document.querySelectorAll(".inspection-answer-btn");
      if (btns[idx]) btns[idx].classList.add("wrong");
      if (btns[ig.currentChallenge.answer]) btns[ig.currentChallenge.answer].classList.add("reveal");
      handleChallengeWrong("Incorrect! The correct answer was \u201C" + ig.currentChallenge.options[ig.currentChallenge.answer] + "\u201D.");
    }
  }


  // ============================================================
  // SPOT THE FAULT challenge
  // ============================================================
  function renderSpotFaultChallenge(challenge) {
    const area = document.getElementById("iqChallengeArea");
    if (!area) return;
    const total = challenge.faults.length;
    area.innerHTML =
      '<div class="spotfault-wrap">' +
        '<div class="spotfault-instruct">' +
          '<span class="spotfault-icon">\u{1F50D}</span> ' +
          '<span>Click each fault on the cadet. Found: <span class="found-count" id="spotFoundCount">0</span> / ' + total + '</span>' +
        '</div>' +
        '<div class="spotfault-svg-wrap" id="spotFaultSvgWrap">' +
          renderCadetFigure({ showFaults: true, faults: challenge.faults, foundIds: [] }) +
        '</div>' +
      '</div>';

    const wrap = document.getElementById("spotFaultSvgWrap");
    if (wrap) {
      wrap.querySelectorAll(".spotfault-zone").forEach(function(zone) {
        zone.addEventListener("click", function(e) {
          handleSpotFaultClick(e, challenge, zone);
        });
      });
      // Click on the SVG background (miss)
      wrap.addEventListener("click", function(e) {
        if (e.target.classList && e.target.classList.contains("spotfault-zone")) return;
        if (ig.answered) return;
        ig.spotMisses++;
        wrap.classList.add("spotfault-miss");
        setTimeout(function() { wrap.classList.remove("spotfault-miss"); }, 300);
      });
    }
  }

  function handleSpotFaultClick(e, challenge, zone) {
    e.stopPropagation();
    if (ig.answered) return;
    const faultId = zone.dataset.fault;
    if (ig.spotFound.indexOf(faultId) >= 0) return;
    ig.spotFound.push(faultId);
    zone.classList.add("found");

    const fc = document.getElementById("spotFoundCount");
    if (fc) fc.textContent = ig.spotFound.length;

    if (ig.spotFound.length === challenge.faults.length) {
      // All found!
      ig.answered = true;
      stopInspectionTimer();
      handleChallengeCorrect();
    }
  }

  // ============================================================
  // POLISH BOOTS challenge
  // ============================================================
  function renderPolishChallenge(challenge) {
    const area = document.getElementById("iqChallengeArea");
    if (!area) return;
    area.innerHTML =
      '<div class="polish-wrap">' +
        '<div class="polish-instruct">' +
          '<span class="polish-icon">\u2728</span> ' +
          'Rub the boot to build shine. Each rub adds polish!' +
        '</div>' +
        '<div class="polish-boot-area" id="polishBootArea">' +
          renderPolishBootSVG(0) +
        '</div>' +
        '<div class="polish-shine-meter">' +
          '<div class="polish-shine-label">Shine: <span class="shine-val" id="polishShineVal">0%</span></div>' +
          '<div class="polish-shine-track">' +
            '<div class="polish-shine-fill" id="polishShineFill" style="width:0%"></div>' +
          '</div>' +
        '</div>' +
        '<div class="polish-rub-hint">Click and drag across the boot to polish!</div>' +
      '</div>';

    const bootArea = document.getElementById("polishBootArea");
    if (bootArea) {
      let isRubbing = false;
      let lastRubX = null;

      function doRub(e) {
        if (ig.answered) return;
        e.preventDefault();
        const rect = bootArea.getBoundingClientRect();
        const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
        if (lastRubX !== null && Math.abs(x - lastRubX) < 5) return;
        lastRubX = x;

        ig.polishLevel = Math.min(challenge.target, ig.polishLevel + 4);
        updatePolishDisplay();

        if (ig.polishLevel >= challenge.target) {
          ig.answered = true;
          stopInspectionTimer();
          handleChallengeCorrect();
        }
      }

      bootArea.addEventListener("mousedown", function(e) { isRubbing = true; doRub(e); });
      bootArea.addEventListener("mousemove", function(e) { if (isRubbing) doRub(e); });
      document.addEventListener("mouseup", function() { isRubbing = false; lastRubX = null; });

      bootArea.addEventListener("touchstart", function(e) { isRubbing = true; doRub(e); });
      bootArea.addEventListener("touchmove", function(e) { if (isRubbing) doRub(e); });
      document.addEventListener("touchend", function() { isRubbing = false; lastRubX = null; });
    }
  }

  function updatePolishDisplay() {
    const fill = document.getElementById("polishShineFill");
    const val = document.getElementById("polishShineVal");
    if (fill) fill.style.width = ig.polishLevel + "%";
    if (val) val.textContent = ig.polishLevel + "%";

    // Update boot SVG shine overlay
    const bootArea = document.getElementById("polishBootArea");
    if (bootArea) {
      bootArea.innerHTML = renderPolishBootSVG(ig.polishLevel);
    }
  }

  function renderPolishBootSVG(level) {
    // Boot SVG with shine that grows with level
    const shineOpacity = level / 100;
    const shineWidth = 60 + (level / 100) * 80; // grows from 60 to 140
    return '<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%;">' +
      '<defs>' +
        '<radialGradient id="shineGrad" cx="0.5" cy="0.35" r="0.6">' +
          '<stop offset="0%" stop-color="#f0c463" stop-opacity="' + shineOpacity + '"/>' +
          '<stop offset="60%" stop-color="#d4a84b" stop-opacity="' + (shineOpacity * 0.5) + '"/>' +
          '<stop offset="100%" stop-color="#d4a84b" stop-opacity="0"/>' +
        '</radialGradient>' +
      '</defs>' +
      '<rect x="0" y="0" width="300" height="200" fill="#070d18"/>' +
      '<line x1="40" y1="170" x2="260" y2="170" stroke="rgba(212,168,75,0.2)" stroke-width="1.5" stroke-dasharray="6 3"/>' +
      '<text x="150" y="165" text-anchor="middle" font-size="7" fill="rgba(212,168,75,0.3)" font-family="monospace">PARADE BOOT</text>' +
      // Boot body
      '<path d="M80,170 L80,90 Q80,60 110,55 L170,55 Q200,55 210,75 L210,170 Z" fill="#0a0a1a" stroke="#d4a84b" stroke-width="2"/>' +
      // Sole
      '<rect x="75" y="168" width="140" height="8" rx="2" fill="#1a1a2e" stroke="#d4a84b" stroke-width="1.5"/>' +
      // Laces
      '<line x1="100" y1="65" x2="190" y2="65" stroke="#d4a84b" stroke-width="2" opacity="0.6"/>' +
      '<line x1="105" y1="80" x2="185" y2="80" stroke="#d4a84b" stroke-width="2" opacity="0.6"/>' +
      '<line x1="110" y1="95" x2="180" y2="95" stroke="#d4a84b" stroke-width="2" opacity="0.6"/>' +
      '<line x1="115" y1="110" x2="175" y2="110" stroke="#d4a84b" stroke-width="2" opacity="0.6"/>' +
      // Toe cap area
      '<ellipse cx="190" cy="145" rx="30" ry="25" fill="#0a0a1a" stroke="#d4a84b" stroke-width="1" opacity="0.5"/>' +
      // Shine overlay (grows with level)
      '<ellipse cx="145" cy="115" rx="' + shineWidth + '" ry="60" fill="url(#shineGrad)"/>' +
      // Highlight streaks when shine is high
      (level > 50 ? '<ellipse cx="120" cy="100" rx="15" ry="8" fill="#fff8e0" opacity="' + ((level - 50) / 100) + '"/>' : '') +
      (level > 75 ? '<ellipse cx="170" cy="125" rx="12" ry="6" fill="#fff8e0" opacity="' + ((level - 75) / 80) + '"/>' : '') +
      '</svg>';
  }

  // ============================================================
  // SEQUENCE challenge
  // ============================================================
  function renderSequenceChallenge(challenge) {
    const area = document.getElementById("iqChallengeArea");
    if (!area) return;
    // Shuffle the steps for display, keep track of original index
    const shuffled = challenge.steps.map(function(s, i) { return { text: s, origIdx: i }; });
    shuffleArray(shuffled);

    area.innerHTML =
      '<div class="sequence-wrap">' +
        '<div class="seq-instruct">' +
          '<span class="seq-icon">\u{1F522}</span> ' +
          'Click each step in the correct order (top to bottom).' +
        '</div>' +
        '<div class="seq-list" id="seqList">' +
          shuffled.map(function(item, displayIdx) {
            return '<button class="seq-item" data-orig="' + item.origIdx + '" data-display="' + displayIdx + '" type="button">' +
              '<span class="seq-num">?</span>' +
              '<span class="seq-text">' + escapeHTML(item.text) + '</span>' +
            '</button>';
          }).join("") +
        '</div>' +
      '</div>';

    area.querySelectorAll(".seq-item").forEach(function(btn) {
      btn.addEventListener("click", function() { handleSeqClick(btn, challenge); });
    });
  }

  function handleSeqClick(btn, challenge) {
    if (ig.answered) return;
    if (btn.classList.contains("placed")) return;

    const origIdx = parseInt(btn.dataset.orig, 10);
    const expected = ig.seqNext;

    if (origIdx === expected) {
      // Correct step!
      btn.classList.add("placed", "correct");
      const num = btn.querySelector(".seq-num");
      if (num) num.textContent = (ig.seqNext + 1);
      ig.seqNext++;
      ig.seqOrder.push(origIdx);

      if (ig.seqNext === challenge.steps.length) {
        // All steps placed correctly!
        ig.answered = true;
        stopInspectionTimer();
        handleChallengeCorrect();
      }
    } else {
      // Wrong step
      btn.classList.add("wrong");
      ig.answered = true;
      stopInspectionTimer();
      // Mark correct next step
      const correctBtn = document.querySelector('.seq-item[data-orig="' + expected + '"]');
      if (correctBtn) correctBtn.classList.add("correct");
      const correctStep = challenge.steps[expected];
      handleChallengeWrong("Wrong order! The next step should have been: \u201C" + correctStep + "\u201D.");
    }
  }

  // ============================================================
  // BADGE PLACEMENT challenge
  // ============================================================
  function renderBadgePlaceChallenge(challenge) {
    const area = document.getElementById("iqChallengeArea");
    if (!area) return;
    const currentBadge = challenge.badges[ig.badgeIdx];
    const remaining = challenge.badges.length - ig.badgeIdx;

    area.innerHTML =
      '<div class="badgeplace-wrap">' +
        '<div class="badgeplace-instruct">' +
          '<span class="bp-instruct-icon">\u{1F4CC}</span> ' +
          'Place: <span class="bp-badge-name" id="bpCurrentName">' + escapeHTML(currentBadge.name) + '</span> ' +
          '\u2014 ' + escapeHTML(currentBadge.hint) +
        '</div>' +
        '<div class="badgeplace-stage">' +
          '<div class="badgeplace-fig" id="bpFigWrap">' +
            renderCadetFigure({ slotDefs: BP_SLOTS, highlightSlot: currentBadge.slotId }) +
          '</div>' +
          '<div class="badgeplace-items">' +
            '<div class="bp-current-badge">' +
              '<span class="bp-icon">' + currentBadge.icon + '</span>' +
              '<span class="bp-name">' + escapeHTML(currentBadge.name) + '</span>' +
            '</div>' +
            '<div class="bp-queue-label">REMAINING (' + (remaining - 1) + ')</div>' +
            '<div class="bp-queue">' +
              challenge.badges.slice(ig.badgeIdx + 1).map(function(b) {
                return '<span class="bp-queue-item">' + b.icon + '</span>';
              }).join("") +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    // Wire up slot clicks
    const figWrap = document.getElementById("bpFigWrap");
    if (figWrap) {
      figWrap.querySelectorAll(".bp-slot").forEach(function(slot) {
        slot.addEventListener("click", function(e) {
          e.stopPropagation();
          handleBadgeSlotClick(e, challenge, slot);
        });
      });
    }
  }

  function handleBadgeSlotClick(e, challenge, slot) {
    if (ig.answered) return;
    const slotId = slot.dataset.slot;
    const currentBadge = challenge.badges[ig.badgeIdx];

    if (slotId === currentBadge.slotId) {
      // Correct slot!
      slot.classList.add("correct");
      ig.badgeCorrect++;
      ig.badgeIdx++;

      if (ig.badgeIdx >= challenge.badges.length) {
        // All badges placed!
        ig.answered = true;
        stopInspectionTimer();
        handleChallengeCorrect();
      } else {
        // Next badge
        setTimeout(function() {
          if (!ig.answered) renderBadgePlaceChallenge(challenge);
        }, 600);
      }
    } else {
      // Wrong slot
      slot.classList.add("wrong");
      ig.answered = true;
      stopInspectionTimer();
      // Show correct slot
      const correctSlot = document.querySelector('.bp-slot[data-slot="' + currentBadge.slotId + '"]');
      if (correctSlot) correctSlot.classList.add("correct");
      handleChallengeWrong("Wrong placement! The " + currentBadge.name + " goes on the " + getSlotLabel(currentBadge.slotId) + ".");
    }
  }

  function getSlotLabel(slotId) {
    const slot = BP_SLOTS.find(function(s) { return s.id === slotId; });
    return slot ? slot.label.toLowerCase() : "correct location";
  }

  // ============================================================
  // SHARED correct / wrong handlers
  // ============================================================
  function handleChallengeCorrect() {
    const challenge = ig.currentChallenge;
    const bonus = inspectionTimingBonus();
    const earnedXp = Math.round(challenge.xp * bonus);
    ig.score += earnedXp;
    ig.correct++;
    ig.streak++;
    if (ig.streak > ig.bestStreak) ig.bestStreak = ig.streak;
    ig.round++;

    state.xp += earnedXp;
    state.totalAttempts = (state.totalAttempts || 0) + 1;
    state.streak = ig.streak;
    if (ig.streak > state.bestStreak) state.bestStreak = ig.streak;
    saveState();
    saveInspectionStats();

    ig.inspecteeState = "correct";
    renderInspectee("correct");

    const fb = document.getElementById("inspectionFeedback");
    if (fb) {
      const bonusText = bonus > 1 ? ' <span style="color:var(--gold-bright)">\u26a1 ' + Math.round((bonus - 1) * 100) + '% speed bonus!</span>' : bonus < 1 ? ' <span style="color:var(--amber)">Slow response</span>' : "";
      fb.className = "inspection-feedback ok";
      fb.innerHTML = '\u2705 Challenge complete! +' + earnedXp + ' XP' + bonusText + '. Streak: ' + ig.streak;
    }

    updateInspectionStats();
    updateInspectionStatsSync();
    addInspectionLog(true, challenge);
    toast("ok", '\u2705 Challenge complete! +' + earnedXp + ' XP');

    const nextBtn = document.getElementById("iqNextBtn");
    if (nextBtn) nextBtn.disabled = false;
  }

  function handleChallengeWrong(msg) {
    const challenge = ig.currentChallenge;
    ig.wrong++;
    ig.streak = 0;
    ig.round++;
    state.totalAttempts = (state.totalAttempts || 0) + 1;
    state.wrongAttempts = (state.wrongAttempts || 0) + 1;
    state.streak = 0;
    saveState();
    saveInspectionStats();

    ig.inspecteeState = "wrong";
    renderInspectee("wrong");
    setTimeout(function() { renderInspectee("ready"); }, 1500);

    const fb = document.getElementById("inspectionFeedback");
    if (fb) {
      fb.className = "inspection-feedback err";
      fb.innerHTML = '\u274c ' + msg + ' Streak reset.';
    }

    updateInspectionStats();
    updateInspectionStatsSync();
    addInspectionLog(false, challenge);
    toast("err", '\u274c Challenge failed! Streak reset.');

    const nextBtn = document.getElementById("iqNextBtn");
    if (nextBtn) nextBtn.disabled = false;
  }

  // Add entry to the inspection log
  function addInspectionLog(correct, challenge) {
    const log = document.getElementById("iqLogList");
    if (!log) return;
    const cls = correct ? "ok" : "err";
    const ico = correct ? "\u2705" : "\u274c";
    const meta = TYPE_META[challenge.type] || TYPE_META.quiz;
    const entry = '<div class="il-entry ' + cls + '">' +
      '<span class="il-ico">' + ico + '</span>' +
      '<span class="il-text"><strong>' + escapeHTML(challenge.cat) + '</strong> [' + meta.label + ']: ' + escapeHTML(challenge.q.slice(0, 45)) + '\u2026</span>' +
      '<span class="il-xp">' + (correct ? "+" + Math.round(challenge.xp * inspectionTimingBonus()) : "0") + '</span>' +
    '</div>';
    if (log.querySelector("p.muted")) log.innerHTML = "";
    log.insertAdjacentHTML("afterbegin", entry);
    const entries = log.querySelectorAll(".il-entry");
    if (entries.length > 12) {
      entries[entries.length - 1].remove();
    }
  }

  // Update stats display
  function updateInspectionStats() {
    const s = document.getElementById("iqScore"); if (s) s.textContent = ig.score;
    const c = document.getElementById("iqCorrect"); if (c) c.textContent = ig.correct;
    const w = document.getElementById("iqWrong"); if (w) w.textContent = ig.wrong;
    const st = document.getElementById("iqStreak"); if (st) st.textContent = ig.streak;
    const bs = document.getElementById("iqBestStreak"); if (bs) bs.textContent = ig.bestStreak;
  }

  function updateInspectionStatsSync() {
    renderSidebar();
    renderTopStats();
    renderAnalysis();
  }

  // Start a standard inspection session
  function startInspection() {
    ig.active = true;
    ig.examMode = false;
    ig.streak = 0;
    ig.round = 0;
    ig.inspecteeState = "salute";
    renderInspectee("salute");

    const fb = document.getElementById("inspectionFeedback");
    if (fb) {
      fb.className = "inspection-feedback info";
      fb.textContent = "Inspection session started! Five challenge types ahead. Complete each quickly for bonus XP.";
    }

    const startBtn = document.getElementById("iqStartBtn");
    if (startBtn) startBtn.disabled = true;

    setTimeout(function() { askChallenge(); }, 1000);
  }

  // Start the full inspection exam (all challenges in sequence)
  function startExamMode() {
    ig.active = true;
    ig.examMode = true;
    ig.streak = 0;
    ig.round = 0;
    ig.challengePool = shuffleArray(CHALLENGE_BANK.slice());
    ig.poolIndex = 0;
    ig.inspecteeState = "salute";
    renderInspectee("salute");

    const fb = document.getElementById("inspectionFeedback");
    if (fb) {
      fb.className = "inspection-feedback info";
      fb.innerHTML = '<strong>\u{1F4CB} FULL INSPECTION EXAM:</strong> All ' + CHALLENGE_BANK.length + ' challenges will be presented in sequence. Score every one to prove you are ready for the real inspection line!';
    }

    const startBtn = document.getElementById("iqStartBtn");
    if (startBtn) startBtn.disabled = true;
    const examBtn = document.getElementById("iqExamBtn");
    if (examBtn) examBtn.disabled = true;

    setTimeout(function() { askChallenge(); }, 1500);
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  // Finish the exam
  function finishExam() {
    ig.active = false;
    ig.examMode = false;
    const total = ig.challengePool.length;
    const fb = document.getElementById("inspectionFeedback");
    if (fb) {
      const pct = total > 0 ? Math.round((ig.correct / total) * 100) : 0;
      let grade = "FAIL";
      let gradeColor = "var(--red)";
      if (pct >= 90) { grade = "DISTINCTION"; gradeColor = "var(--gold-bright)"; }
      else if (pct >= 75) { grade = "PASS"; gradeColor = "var(--green)"; }
      else if (pct >= 60) { grade = "MARGINAL"; gradeColor = "var(--amber)"; }
      fb.className = "inspection-feedback ok";
      fb.innerHTML = '\u{1F3C6} <strong>EXAM COMPLETE!</strong> You scored ' + ig.correct + '/' + total + ' (' + pct + '%). Grade: <strong style="color:' + gradeColor + '">' + grade + '</strong>. ' + (pct >= 75 ? "You are ready for the inspection line!" : "Keep studying and try again.");
    }
    const startBtn = document.getElementById("iqStartBtn");
    if (startBtn) startBtn.disabled = false;
    const examBtn = document.getElementById("iqExamBtn");
    if (examBtn) examBtn.disabled = false;
    const nextBtn = document.getElementById("iqNextBtn");
    if (nextBtn) nextBtn.disabled = true;

    // Reset challenge area
    const area = document.getElementById("iqChallengeArea");
    if (area) {
      area.innerHTML = '<div class="iq-idle-prompt"><p>Exam complete. Press <strong>Start Inspection</strong> for a new session or <strong>Full Inspection Exam</strong> to try again.</p></div>';
    }

    if (ig.correct === total) {
      state.xp += 100;
      saveState();
      toast("ok", '\u{1F3C6} PERFECT SCORE! +100 XP bonus!');
      updateInspectionStatsSync();
    }
  }

  // Next challenge button handler
  function nextChallenge() {
    askChallenge();
  }

  // Reset the inspection game
  function resetInspectionGame() {
    ig.active = false;
    ig.examMode = false;
    ig.currentChallenge = null;
    ig.selectedAnswer = null;
    ig.answered = false;
    ig.streak = 0;
    ig.score = 0;
    ig.correct = 0;
    ig.wrong = 0;
    ig.round = 0;
    ig.bestStreak = 0;
    ig.spotFound = [];
    ig.spotMisses = 0;
    ig.polishLevel = 0;
    ig.seqOrder = [];
    ig.seqNext = 0;
    ig.badgeIdx = 0;
    ig.badgeCorrect = 0;
    stopInspectionTimer();

    const tb = document.getElementById("iqTypeBadge");
    if (tb) { tb.className = "iq-type-badge"; tb.textContent = "\u2014"; }
    document.getElementById("iqCategory").textContent = "\u2014";
    document.getElementById("iqQuestion").textContent = "Press Start Inspection to begin\u2026";
    document.getElementById("iqRoundVal").textContent = "0";

    const fb = document.getElementById("inspectionFeedback");
    if (fb) {
      fb.className = "inspection-feedback info";
      fb.innerHTML = 'Press <strong>Start Inspection</strong> to begin. The officer will test your uniform knowledge with five challenge types. Complete each quickly for a timing bonus!';
    }

    const startBtn = document.getElementById("iqStartBtn");
    if (startBtn) startBtn.disabled = false;
    const examBtn = document.getElementById("iqExamBtn");
    if (examBtn) examBtn.disabled = false;
    const nextBtn = document.getElementById("iqNextBtn");
    if (nextBtn) nextBtn.disabled = true;

    const area = document.getElementById("iqChallengeArea");
    if (area) {
      area.innerHTML = '<div class="iq-idle-prompt">' +
        '<p>Press <strong>Start Inspection</strong> to begin.</p>' +
        '<p class="iq-idle-modes">Challenge modes: \u{1F4DD} Quiz \u00b7 \u{1F50D} Spot the Fault \u00b7 \u2728 Polish Boots \u00b7 \u{1F522} Correct Sequence \u00b7 \u{1F4CC} Badge Placement</p>' +
      '</div>';
    }

    const log = document.getElementById("iqLogList");
    if (log) log.innerHTML = '<p class="muted" style="font-size:11px; padding:8px;">No challenges completed yet.</p>';

    renderInspectee("ready");
    updateInspectionStats();
    saveInspectionStats();
    toast("info", "Inspection Day reset.");
  }

  // Main render function for the Inspection Day section
  function renderInspectionGame() {
    loadInspectionStats();
    renderInspectee(ig.inspecteeState);
    updateInspectionStats();

    const startBtn = document.getElementById("iqStartBtn");
    if (startBtn && !startBtn.dataset.bound) {
      startBtn.addEventListener("click", startInspection);
      startBtn.dataset.bound = "1";
    }
    const nextBtn = document.getElementById("iqNextBtn");
    if (nextBtn && !nextBtn.dataset.bound) {
      nextBtn.addEventListener("click", nextChallenge);
      nextBtn.dataset.bound = "1";
    }
    const examBtn = document.getElementById("iqExamBtn");
    if (examBtn && !examBtn.dataset.bound) {
      examBtn.addEventListener("click", startExamMode);
      examBtn.dataset.bound = "1";
    }
    const resetBtn = document.getElementById("iqResetBtn");
    if (resetBtn && !resetBtn.dataset.bound) {
      resetBtn.addEventListener("click", resetInspectionGame);
      resetBtn.dataset.bound = "1";
    }
  }

  // ==========================================================
  // UNIFORM BUILDER — animated interactive uniform assembly game
  // Click items from the rack to equip them onto an animated SVG
  // cadet figure. Correct items for the target uniform type, in the
  // correct order, earn points + XP. Visual feedback with pop-in,
  // sparkle, shake and breathing animations.
  // ==========================================================

  // ---- Game constants ----

  // Uniform build targets — each defines a set of required items in order.
  // Each target maps to an element: Sea, Army, Air cadet service dress.
  const UB_TARGETS = [
    {
      id: "sea_sd",
      name: "Sea Cadet Service Dress",
      icon: "\u2693",
      blurb: "Assemble the No.1 ceremonial uniform for a Sea Cadet.",
      items: [
        { key: "cap_navy",   label: "Naval Cap",        icon: "\u{1F392}", correct: true,  xp: 15 },
        { key: "shirt_white",label: "White No.1 Shirt", icon: "\u{1F454}", correct: true,  xp: 15 },
        { key: "trouser_navy",label:"Navy Trousers",    icon: "\u{1F456}", correct: true,  xp: 10 },
        { key: "boots_polished",label:"Bulled Boots",   icon: "\u{1F462}", correct: true,  xp: 15 },
        { key: "belt_white", label: "White Belt",       icon: "\u{1F45F}", correct: true,  xp: 10 },
        { key: "rank_slides",label: "Rank Slides",      icon: "\u2B50",    correct: true,  xp: 10 }
      ]
    },
    {
      id: "army_cs",
      name: "Army Cadet Combat Soldier 95",
      icon: "\u{1F3D9}",
      blurb: "Build the combat Soldier 95 uniform for an Army Cadet.",
      items: [
        { key: "cap_field",   label: "Field Cap",        icon: "\u{1F9E2}", correct: true,  xp: 15 },
        { key: "shirt_combat",label: "Combat Smock",     icon: "\u{1F9E5}", correct: true,  xp: 15 },
        { key: "trouser_combat",label:"Combat Trousers", icon: "\u{1F456}", correct: true,  xp: 10 },
        { key: "boots_combat",label: "Combat Boots",     icon: "\u{1F462}", correct: true,  xp: 15 },
        { key: "webbing",     label: "Webbing Set",      icon: "\u{1F392}", correct: true,  xp: 10 },
        { key: "rank_slides", label: "Rank Slides",      icon: "\u2B50",    correct: true,  xp: 10 }
      ]
    },
    {
      id: "air_sd",
      name: "Air Cadet Service Dress",
      icon: "\u2708",
      blurb: "Assemble the light-blue service dress for an Air Cadet.",
      items: [
        { key: "cap_blue",    label: "Air Cadet Cap",    icon: "\u{1F392}", correct: true,  xp: 15 },
        { key: "shirt_blue",  label: "Blue No.2 Shirt",  icon: "\u{1F454}", correct: true,  xp: 15 },
        { key: "trouser_blue",label: "Blue Trousers",    icon: "\u{1F456}", correct: true,  xp: 10 },
        { key: "boots_polished",label:"Bulled Boots",    icon: "\u{1F462}", correct: true,  xp: 15 },
        { key: "jumper_blue", label: "Blue Jumper",      icon: "\u{1F9E3}", correct: true,  xp: 10 },
        { key: "rank_slides", label: "Rank Slides",      icon: "\u2B50",    correct: true,  xp: 10 }
      ]
    }
  ];

  // Distractor items that appear in the rack but are wrong for some builds.
  const UB_DISTRACTORS = [
    { key: "cap_beret",    label: "Beret",         icon: "\u{1F9E2}", correct: false, xp: 0 },
    { key: "shirt_civvy",  label: "Civvy T-Shirt", icon: "\u{1F455}", correct: false, xp: 0 },
    { key: "jeans",        label: "Jeans",         icon: "\u{1F456}", correct: false, xp: 0 },
    { key: "trainers",     label: "Trainers",      icon: "\u{1F45F}", correct: false, xp: 0 },
    { key: "scarf",        label: "Scarf",         icon: "\u{1F9E3}", correct: false, xp: 0 }
  ];

  // Game state
  let ub = {
    active: false,
    targetIdx: 0,
    equipped: [],        // keys of items equipped in order
    step: 0,
    score: 0,
    correct: 0,
    mistakes: 0,
    built: 0,
    bestScore: 0,
    finished: false,
    initDone: false
  };

  function ubLoadStats() {
    try {
      const raw = localStorage.getItem(SK.builderGame);
      if (raw) {
        const p = JSON.parse(raw);
        ub.score = 0;        // session score resets
        ub.correct = 0;
        ub.mistakes = 0;
        ub.built = p.built || 0;
        ub.bestScore = p.bestScore || 0;
      }
    } catch (e) {}
  }

  function ubSaveStats() {
    try {
      localStorage.setItem(SK.builderGame, JSON.stringify({
        built: ub.built,
        bestScore: ub.bestScore
      }));
    } catch (e) {}
  }

  // Get the current target object
  function ubCurrentTarget() {
    return UB_TARGETS[ub.targetIdx % UB_TARGETS.length];
  }

  // ---- Animated SVG cadet figure ----
  // viewBox 0 0 600 380. The figure is drawn as a base mannequin.
  // Equipped items are rendered as overlay <g> elements keyed by item key.
  function ubBaseFigure() {
    return '' +
      '<defs>' +
        '<linearGradient id="ubBg" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#10243a"/>' +
          '<stop offset="100%" stop-color="#070d18"/>' +
        '</linearGradient>' +
        '<radialGradient id="ubFloor" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="rgba(212,168,75,0.10)"/>' +
          '<stop offset="100%" stop-color="rgba(212,168,75,0)"/>' +
        '</radialGradient>' +
      '</defs>' +
      '<rect x="0" y="0" width="600" height="380" fill="url(#ubBg)"/>' +
      '<ellipse cx="300" cy="345" rx="120" ry="18" fill="url(#ubFloor)"/>' +
      '<line x1="80" y1="330" x2="520" y2="330" stroke="rgba(212,168,75,0.18)" stroke-width="1.5" stroke-dasharray="8 4"/>' +
      '<text x="300" y="324" text-anchor="middle" font-size="9" fill="rgba(212,168,75,0.35)" font-family="monospace">INSPECTION LINE</text>';
  }

  // The bare mannequin — head, neck, hands, legs (the body that stays constant)
  function ubMannequin() {
    return '' +
      '<g class="ub-figure-group">' +
        // Headdress area placeholder
        // Head
        '<circle cx="300" cy="70" r="22" fill="#2a3a55" stroke="#d4a84b" stroke-width="1.5"/>' +
        '<circle cx="293" cy="68" r="2" fill="#d4a84b"/>' +
        '<circle cx="307" cy="68" r="2" fill="#d4a84b"/>' +
        '<path d="M293,78 Q300,82 307,78" fill="none" stroke="#d4a84b" stroke-width="1"/>' +
        // Neck
        '<rect x="293" y="90" width="14" height="12" fill="#2a3a55"/>' +
        // Bare torso outline (faint, shown when no shirt equipped)
        '<path d="M250,102 L350,102 L358,215 L242,215 Z" fill="#1a2a40" stroke="rgba(212,168,75,0.3)" stroke-width="1.5" stroke-dasharray="3 3"/>' +
        // Arms (bare)
        '<path d="M250,106 L235,150 L232,200" fill="none" stroke="rgba(212,168,75,0.3)" stroke-width="10" stroke-linecap="round"/>' +
        '<path d="M350,106 L365,150 L368,200" fill="none" stroke="rgba(212,168,75,0.3)" stroke-width="10" stroke-linecap="round"/>' +
        // Hands
        '<circle cx="232" cy="202" r="7" fill="#2a3a55" stroke="#d4a84b" stroke-width="1"/>' +
        '<circle cx="368" cy="202" r="7" fill="#2a3a55" stroke="#d4a84b" stroke-width="1"/>' +
        // Bare legs outline
        '<rect x="250" y="215" width="46" height="100" rx="4" fill="#1a2a40" stroke="rgba(212,168,75,0.3)" stroke-width="1.5" stroke-dasharray="3 3"/>' +
        '<rect x="304" y="215" width="46" height="100" rx="4" fill="#1a2a40" stroke="rgba(212,168,75,0.3)" stroke-width="1.5" stroke-dasharray="3 3"/>' +
        // Feet placeholders
        '<ellipse cx="273" cy="322" rx="22" ry="7" fill="#1a2a40" stroke="rgba(212,168,75,0.3)" stroke-width="1.5"/>' +
        '<ellipse cx="327" cy="322" rx="22" ry="7" fill="#1a2a40" stroke="rgba(212,168,75,0.3)" stroke-width="1.5"/>' +
      '</g>';
  }

  // Render an equipped item as an SVG overlay, keyed by item key.
  // Each draws the garment at the correct body location.
  function ubItemOverlay(key) {
    const brass = "#d4a84b";
    const bb = "#f0c463";
    switch (key) {
      // ---- Headwear ----
      case "cap_navy":
        return '<g class="ub-equipped-item">' +
          '<path d="M278,58 Q300,42 322,58 L322,66 L278,66 Z" fill="#0d1a30" stroke="' + brass + '" stroke-width="2"/>' +
          '<ellipse cx="300" cy="62" rx="24" ry="9" fill="#0d1a30" stroke="' + brass + '" stroke-width="2"/>' +
          '<circle cx="300" cy="50" r="6" fill="' + bb + '" stroke="#a67e2e" stroke-width="1"/>' +
          '</g>';
      case "cap_field":
        return '<g class="ub-equipped-item">' +
          '<path d="M272,68 Q272,48 300,46 Q328,48 328,68 L322,70 L278,70 Z" fill="#3d4f2a" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<path d="M272,68 L260,64 L268,72 Z" fill="#3d4f2a" stroke="' + brass + '" stroke-width="1"/>' +
          '</g>';
      case "cap_blue":
        return '<g class="ub-equipped-item">' +
          '<path d="M278,58 Q300,44 322,58 L322,66 L278,66 Z" fill="#5b7fa8" stroke="' + brass + '" stroke-width="2"/>' +
          '<ellipse cx="300" cy="62" rx="24" ry="9" fill="#5b7fa8" stroke="' + brass + '" stroke-width="2"/>' +
          '<circle cx="300" cy="52" r="5" fill="' + bb + '" stroke="#a67e2e" stroke-width="1"/>' +
          '</g>';
      case "cap_beret":
        return '<g class="ub-equipped-item">' +
          '<ellipse cx="300" cy="56" rx="30" ry="14" fill="#2a2a2a" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<path d="M270,56 Q300,40 330,56" fill="#2a2a2a" stroke="' + brass + '" stroke-width="1"/>' +
          '<circle cx="288" cy="50" r="4" fill="' + bb + '"/>' +
          '</g>';
      // ---- Shirts / tunics ----
      case "shirt_white":
        return '<g class="ub-equipped-item">' +
          '<path d="M250,102 L350,102 L358,215 L242,215 Z" fill="#e8edf2" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<path d="M293,102 L300,112 L307,102" fill="none" stroke="' + brass + '" stroke-width="1"/>' +
          '<circle cx="300" cy="130" r="3" fill="' + brass + '"/>' +
          '<circle cx="300" cy="155" r="3" fill="' + brass + '"/>' +
          '<circle cx="300" cy="180" r="3" fill="' + brass + '"/>' +
          '</g>';
      case "shirt_blue":
        return '<g class="ub-equipped-item">' +
          '<path d="M250,102 L350,102 L358,215 L242,215 Z" fill="#5b7fa8" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<path d="M293,102 L300,112 L307,102" fill="none" stroke="' + brass + '" stroke-width="1"/>' +
          '<circle cx="300" cy="130" r="3" fill="' + brass + '"/>' +
          '<circle cx="300" cy="155" r="3" fill="' + brass + '"/>' +
          '<circle cx="300" cy="180" r="3" fill="' + brass + '"/>' +
          '</g>';
      case "shirt_combat":
        return '<g class="ub-equipped-item">' +
          '<path d="M246,100 L354,100 L362,218 L238,218 Z" fill="#4a5a36" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<rect x="255" y="110" width="30" height="14" fill="#3d4f2a"/>' +
          '<rect x="315" y="110" width="30" height="14" fill="#3d4f2a"/>' +
          '<circle cx="300" cy="145" r="3" fill="#2a2a2a"/>' +
          '<circle cx="300" cy="170" r="3" fill="#2a2a2a"/>' +
          '<circle cx="300" cy="195" r="3" fill="#2a2a2a"/>' +
          '</g>';
      case "jumper_blue":
        return '<g class="ub-equipped-item">' +
          '<path d="M248,104 L352,104 L360,216 L240,216 Z" fill="#3a5a82" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<path d="M280,108 Q300,120 320,108" fill="none" stroke="' + bb + '" stroke-width="2"/>' +
          '</g>';
      case "shirt_civvy":
        return '<g class="ub-equipped-item">' +
          '<path d="M250,102 L350,102 L356,200 L244,200 Z" fill="#c0392b" stroke="' + brass + '" stroke-width="1"/>' +
          '<circle cx="300" cy="135" r="3" fill="#fff"/>' +
          '</g>';
      // ---- Trousers ----
      case "trouser_navy":
        return '<g class="ub-equipped-item">' +
          '<rect x="250" y="215" width="46" height="100" rx="4" fill="#0d1a30" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<rect x="304" y="215" width="46" height="100" rx="4" fill="#0d1a30" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<line x1="273" y1="215" x2="273" y2="315" stroke="' + brass + '" stroke-width="1" opacity="0.5"/>' +
          '<line x1="327" y1="215" x2="327" y2="315" stroke="' + brass + '" stroke-width="1" opacity="0.5"/>' +
          '</g>';
      case "trouser_blue":
        return '<g class="ub-equipped-item">' +
          '<rect x="250" y="215" width="46" height="100" rx="4" fill="#5b7fa8" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<rect x="304" y="215" width="46" height="100" rx="4" fill="#5b7fa8" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<line x1="273" y1="215" x2="273" y2="315" stroke="' + brass + '" stroke-width="1" opacity="0.5"/>' +
          '<line x1="327" y1="215" x2="327" y2="315" stroke="' + brass + '" stroke-width="1" opacity="0.5"/>' +
          '</g>';
      case "trouser_combat":
        return '<g class="ub-equipped-item">' +
          '<rect x="248" y="215" width="48" height="102" rx="4" fill="#4a5a36" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<rect x="304" y="215" width="48" height="102" rx="4" fill="#4a5a36" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<rect x="252" y="235" width="40" height="8" fill="#3d4f2a"/>' +
          '<rect x="308" y="235" width="40" height="8" fill="#3d4f2a"/>' +
          '</g>';
      case "jeans":
        return '<g class="ub-equipped-item">' +
          '<rect x="250" y="215" width="46" height="100" rx="4" fill="#2c3e6a" stroke="' + brass + '" stroke-width="1"/>' +
          '<rect x="304" y="215" width="46" height="100" rx="4" fill="#2c3e6a" stroke="' + brass + '" stroke-width="1"/>' +
          '</g>';
      // ---- Footwear ----
      case "boots_polished":
        return '<g class="ub-equipped-item">' +
          '<ellipse cx="273" cy="322" rx="24" ry="8" fill="#0a0a14" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<ellipse cx="327" cy="322" rx="24" ry="8" fill="#0a0a14" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<ellipse cx="273" cy="319" rx="18" ry="4" fill="rgba(240,196,99,0.35)"/>' +
          '<ellipse cx="327" cy="319" rx="18" ry="4" fill="rgba(240,196,99,0.35)"/>' +
          '</g>';
      case "boots_combat":
        return '<g class="ub-equipped-item">' +
          '<path d="M252,310 L294,310 L294,328 L252,328 Z" fill="#2a2a2a" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<path d="M306,310 L348,310 L348,328 L306,328 Z" fill="#2a2a2a" stroke="' + brass + '" stroke-width="1.5"/>' +
          '<line x1="252" y1="316" x2="294" y2="316" stroke="' + brass + '" stroke-width="1"/>' +
          '<line x1="306" y1="316" x2="348" y2="316" stroke="' + brass + '" stroke-width="1"/>' +
          '</g>';
      case "trainers":
        return '<g class="ub-equipped-item">' +
          '<path d="M252,315 Q252,326 274,328 L294,328 L294,315 Z" fill="#e74c3c" stroke="' + brass + '" stroke-width="1"/>' +
          '<path d="M306,315 Q306,326 328,328 L348,328 L348,315 Z" fill="#e74c3c" stroke="' + brass + '" stroke-width="1"/>' +
          '</g>';
      // ---- Accessories ----
      case "belt_white":
        return '<g class="ub-equipped-item">' +
          '<rect x="242" y="210" width="116" height="9" fill="#e8edf2" stroke="' + brass + '" stroke-width="1"/>' +
          '<rect x="292" y="210" width="16" height="9" fill="' + brass + '" stroke="#a67e2e" stroke-width="0.5"/>' +
          '</g>';
      case "webbing":
        return '<g class="ub-equipped-item">' +
          '<rect x="242" y="208" width="116" height="8" fill="#3d4f2a" stroke="' + brass + '" stroke-width="1"/>' +
          '<rect x="255" y="216" width="20" height="24" rx="2" fill="#3d4f2a" stroke="' + brass + '" stroke-width="1"/>' +
          '<rect x="325" y="216" width="20" height="24" rx="2" fill="#3d4f2a" stroke="' + brass + '" stroke-width="1"/>' +
          '<rect x="290" y="216" width="20" height="20" rx="2" fill="#3d4f2a" stroke="' + brass + '" stroke-width="1"/>' +
          '</g>';
      case "scarf":
        return '<g class="ub-equipped-item">' +
          '<path d="M288,100 Q300,118 312,100 L318,108 Q300,128 282,108 Z" fill="#c0392b" stroke="' + brass + '" stroke-width="1"/>' +
          '</g>';
      case "rank_slides":
        return '<g class="ub-equipped-item">' +
          '<rect x="250" y="102" width="20" height="7" rx="2" fill="' + brass + '" stroke="#a67e2e" stroke-width="0.5"/>' +
          '<rect x="330" y="102" width="20" height="7" rx="2" fill="' + brass + '" stroke="#a67e2e" stroke-width="0.5"/>' +
          '<text x="260" y="108" text-anchor="middle" font-size="5" fill="' + '#0a0e16' + '" font-family="monospace" font-weight="700">CDT</text>' +
          '<text x="340" y="108" text-anchor="middle" font-size="5" fill="' + '#0a0e16' + '" font-family="monospace" font-weight="700">CDT</text>' +
          '</g>';
      default:
        return '';
    }
  }

  // Render the full figure SVG with currently-equipped items
  function ubRenderFigure() {
    const wrap = document.getElementById("ubFigureSvg");
    if (!wrap) return;
    let overlays = "";
    ub.equipped.forEach(function(key) {
      overlays += ubItemOverlay(key);
    });
    wrap.innerHTML =
      '<svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto;">' +
      ubBaseFigure() +
      // Mannequin is drawn first (under items)
      ubMannequin() +
      overlays +
      '</svg>';
  }

  // ---- Build the item rack ----
  // Combines the current target's items with distractors, shuffled.
  function ubRackItems() {
    const target = ubCurrentTarget();
    const pool = target.items.map(function(it) {
      return { key: it.key, label: it.label, icon: it.icon, correct: true, xp: it.xp };
    });
    // Add a few distractors that aren't already in the target
    UB_DISTRACTORS.forEach(function(d) {
      if (!pool.some(function(p) { return p.key === d.key; })) {
        pool.push({ key: d.key, label: d.label, icon: d.icon, correct: false, xp: 0 });
      }
    });
    // Shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    return pool;
  }

  function ubRenderRack() {
    const grid = document.getElementById("ubRackGrid");
    if (!grid) return;
    const items = ubRackItems();
    grid.innerHTML = items.map(function(it) {
      const equipped = ub.equipped.indexOf(it.key) >= 0;
      const cls = "ub-item-btn" + (equipped ? " equipped" : "") + (ub.finished ? " disabled" : "");
      return '<button class="' + cls + '" data-item="' + it.key + '" type="button">' +
        '<span class="ub-item-ico">' + it.icon + '</span>' +
        '<span>' + it.label + '</span>' +
        '<span class="ub-item-check">\u2714 equipped</span>' +
        '</button>';
    }).join("");
    // Bind clicks
    grid.querySelectorAll(".ub-item-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        ubEquipItem(btn.dataset.item);
      });
    });
  }

  // ---- Equip an item ----
  function ubEquipItem(key) {
    if (!ub.active || ub.finished) return;
    if (ub.equipped.indexOf(key) >= 0) return; // already equipped

    const target = ubCurrentTarget();
    const expected = target.items[ub.step];
    const isCorrect = (key === expected.key);

    if (isCorrect) {
      ub.equipped.push(key);
      ub.step++;
      ub.correct++;
      const earned = expected.xp;
      ub.score += earned;
      // Award XP to main state
      state.xp += earned;
      saveState();
      ubRenderFigure();
      // Animate the latest overlay
      ubFlashLatest("correct");
      ubSparkleAt(300, 200);
      ubFloatText("+" + earned + " XP", "#38d97b");
      ubFeedback("ok", "\u2705 Correct! " + expected.label + " equipped. +" + earned + " XP.");
      toast("ok", "Correct item! +" + earned + " XP");
      ubUpdateStats();
      ubUpdateChecklist();
      ubUpdateProgress();
      ubRenderRack();
      // Check completion
      if (ub.step >= target.items.length) {
        ubCompleteBuild();
      }
    } else {
      ub.mistakes++;
      // Shake the figure
      const frame = document.getElementById("ubFigureFrame");
      if (frame) {
        frame.classList.remove("ub-shake");
        void frame.offsetWidth;
        frame.classList.add("ub-shake");
      }
      ubFloatText("\u2716 Wrong", "#ff5a6e");
      ubFeedback("err", "\u274c That item doesn\u2019t belong at this step. The inspecting officer expects " + expected.label + " next.");
      toast("warn", "Wrong item \u2014 the officer expects " + expected.label + " next.");
      ubUpdateStats();
    }
    ubSaveStats();
  }

  // Flash the last equipped overlay
  function ubFlashLatest(kind) {
    const wrap = document.getElementById("ubFigureSvg");
    if (!wrap) return;
    const groups = wrap.querySelectorAll(".ub-equipped-item");
    if (groups.length === 0) return;
    const last = groups[groups.length - 1];
    if (kind === "correct") {
      last.classList.remove("ub-flash-correct");
      void last.offsetWidth;
      last.classList.add("ub-flash-correct");
    }
  }

  // Spawn sparkle particles at SVG coordinates (converted to pixel)
  function ubSparkleAt(svgX, svgY) {
    const frame = document.getElementById("ubFigureFrame");
    const wrap = document.getElementById("ubFigureSvg");
    if (!frame || !wrap) return;
    const svg = wrap.querySelector("svg");
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const frameRect = frame.getBoundingClientRect();
    // Map viewBox 600x380 to actual size
    const px = (svgX / 600) * rect.width + (rect.left - frameRect.left);
    const py = (svgY / 380) * rect.height + (rect.top - frameRect.top);
    const sparkles = ["\u2728", "\u2B50", "\u2727", "\u2726"];
    for (let i = 0; i < 5; i++) {
      const s = document.createElement("div");
      s.className = "ub-float-text ub-sparkle";
      s.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      s.style.left = (px + (Math.random() * 60 - 30)) + "px";
      s.style.top = (py + (Math.random() * 40 - 20)) + "px";
      s.style.fontSize = (14 + Math.random() * 10) + "px";
      s.style.animationDelay = (i * 0.06) + "s";
      frame.appendChild(s);
      (function(el) {
        setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 900);
      })(s);
    }
  }

  // Float-up score text
  function ubFloatText(txt, color) {
    const frame = document.getElementById("ubFigureFrame");
    if (!frame) return;
    const el = document.createElement("div");
    el.className = "ub-float-text";
    el.textContent = txt;
    el.style.color = color;
    el.style.left = "50%";
    el.style.top = "40%";
    el.style.transform = "translateX(-50%)";
    frame.appendChild(el);
    setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 1200);
  }

  // ---- Completion ----
  function ubCompleteBuild() {
    ub.finished = true;
    ub.built++;
    // Bonus for zero mistakes
    let bonus = 0;
    if (ub.mistakes === 0) {
      bonus = 30;
      ub.score += bonus;
      state.xp += bonus;
      saveState();
    }
    // Update best score
    if (ub.score > ub.bestScore) ub.bestScore = ub.score;
    ubSaveStats();
    ubUpdateStats();
    ubRenderRack();
    // Show banner
    const banner = document.getElementById("ubCompleteBanner");
    if (banner) {
      banner.classList.add("show");
      const titleEl = document.getElementById("ubCbTitle");
      const txtEl = document.getElementById("ubCbText");
      const scoreEl = document.getElementById("ubCbScore");
      if (titleEl) titleEl.textContent = ub.mistakes === 0 ? "Flawless Inspection Ready!" : "Uniform Complete!";
      if (txtEl) txtEl.textContent = ub.mistakes === 0
        ? "Perfect build with zero faults. +" + bonus + " XP inspection bonus."
        : "Uniform assembled. Review your faults and try again for a perfect score.";
      if (scoreEl) scoreEl.textContent = ub.score + " XP";
    }
    ubConfetti();
    ubFeedback("ok", "\u{1F3C6} Build complete! You earned " + ub.score + " XP this build." + (bonus ? " Flawless bonus +" + bonus + "!" : ""));
    toast("ok", "\u{1F3C6} Uniform complete! +" + ub.score + " XP");
    // Enable next button
    const nextBtn = document.getElementById("ubNextBtn");
    if (nextBtn) nextBtn.disabled = false;
    renderTopStats();
    renderSidebar();
  }

  // Confetti effect
  function ubConfetti() {
    const frame = document.getElementById("ubFigureFrame");
    if (!frame) return;
    const colors = ["#d4a84b", "#38d97b", "#6b94d4", "#ffb454", "#f0c463"];
    for (let i = 0; i < 24; i++) {
      const c = document.createElement("div");
      c.className = "ub-confetti";
      c.style.left = (Math.random() * 100) + "%";
      c.style.top = "-10px";
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDelay = (Math.random() * 0.5) + "s";
      c.style.width = (5 + Math.random() * 6) + "px";
      c.style.height = (5 + Math.random() * 8) + "px";
      frame.appendChild(c);
      (function(el) {
        setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 2400);
      })(c);
    }
  }

  // ---- UI updates ----
  function ubUpdateStats() {
    const set = function(id, val) {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    set("ubScore", ub.score);
    set("ubCorrect", ub.correct);
    set("ubMistakes", ub.mistakes);
    set("ubBuilt", ub.built);
    set("ubBest", ub.bestScore);
  }

  function ubUpdateProgress() {
    const target = ubCurrentTarget();
    const strip = document.getElementById("ubProgressStrip");
    if (!strip) return;
    let html = "";
    for (let i = 0; i < target.items.length; i++) {
      let cls = "ub-progress-dot";
      if (i < ub.step) cls += " done";
      else if (i === ub.step && !ub.finished) cls += " current";
      html += '<div class="' + cls + '">' + (i < ub.step ? "\u2713" : (i + 1)) + '</div>';
    }
    strip.innerHTML = html;
    const stepEl = document.getElementById("ubStepVal");
    const totalEl = document.getElementById("ubStepTotal");
    if (stepEl) stepEl.textContent = Math.min(ub.step, target.items.length);
    if (totalEl) totalEl.textContent = target.items.length;
  }

  function ubUpdateChecklist() {
    const target = ubCurrentTarget();
    const list = document.getElementById("ubChecklist");
    if (!list) return;
    let html = "";
    target.items.forEach(function(it, i) {
      const done = i < ub.step;
      const cls = "ub-check-item" + (done ? " done" : "");
      const ico = done ? "\u2705" : "\u23F3";
      html += '<div class="' + cls + '"><span class="ub-check-ico">' + ico + '</span><span>' + it.label + '</span></div>';
    });
    list.innerHTML = html;
  }

  function ubFeedback(kind, text) {
    const fb = document.getElementById("ubFeedback");
    if (!fb) return;
    fb.className = "ub-feedback " + kind;
    fb.textContent = text;
  }

  function ubUpdateGoal() {
    const target = ubCurrentTarget();
    const icoEl = document.getElementById("ubGoalIcon");
    const titleEl = document.getElementById("ubGoalTitle");
    if (icoEl) icoEl.textContent = target.icon;
    if (titleEl) titleEl.textContent = target.name;
  }

  // ---- Start / next / reset ----
  function ubStartBuild() {
    ub.active = true;
    ub.equipped = [];
    ub.step = 0;
    ub.score = 0;
    ub.correct = 0;
    ub.mistakes = 0;
    ub.finished = false;
    ubUpdateGoal();
    ubRenderFigure();
    ubRenderRack();
    ubUpdateStats();
    ubUpdateChecklist();
    ubUpdateProgress();
    const banner = document.getElementById("ubCompleteBanner");
    if (banner) banner.classList.remove("show");
    ubFeedback("info", "Build the " + ubCurrentTarget().name + ". Click items from the rack in the correct order.");
    const startBtn = document.getElementById("ubStartBtn");
    if (startBtn) startBtn.disabled = true;
    const nextBtn = document.getElementById("ubNextBtn");
    if (nextBtn) nextBtn.disabled = true;
    toast("info", "Build started \u2014 " + ubCurrentTarget().name);
  }

  function ubNextBuild() {
    ub.targetIdx = (ub.targetIdx + 1) % UB_TARGETS.length;
    ubStartBuild();
    toast("info", "Next uniform: " + ubCurrentTarget().name);
  }

  function ubResetBuilder() {
    ub.active = false;
    ub.equipped = [];
    ub.step = 0;
    ub.score = 0;
    ub.correct = 0;
    ub.mistakes = 0;
    ub.finished = false;
    ubRenderFigure();
    ubRenderRack();
    ubUpdateStats();
    const list = document.getElementById("ubChecklist");
    if (list) list.innerHTML = '<div class="ub-check-item"><span class="ub-check-ico">\u23F3</span><span>Press Start Build to begin</span></div>';
    const strip = document.getElementById("ubProgressStrip");
    if (strip) strip.innerHTML = "";
    const stepEl = document.getElementById("ubStepVal");
    const totalEl = document.getElementById("ubStepTotal");
    if (stepEl) stepEl.textContent = "0";
    if (totalEl) totalEl.textContent = "0";
    const banner = document.getElementById("ubCompleteBanner");
    if (banner) banner.classList.remove("show");
    ubFeedback("info", "Choose a uniform type below to start building.");
    const startBtn = document.getElementById("ubStartBtn");
    if (startBtn) startBtn.disabled = false;
    const nextBtn = document.getElementById("ubNextBtn");
    if (nextBtn) nextBtn.disabled = true;
    toast("info", "Uniform Builder reset.");
  }

  // How-to-play modal (reuses toast-style alert via a simple inline prompt)
  function ubHowToPlay() {
    const lines = [
      "\u{1F3AF} OBJECTIVE",
      "Build a complete inspection-ready uniform by equipping items in the correct order.",
      "",
      "\u{1F449} HOW TO PLAY",
      "1. Press Start Build to receive your target uniform (Sea, Army, or Air cadet).",
      "2. The goal bar shows the uniform type and current step.",
      "3. Click items from the Uniform Rack to equip them onto your cadet.",
      "4. Correct items pop onto the figure with a sparkle and earn XP.",
      "5. Wrong items shake the figure \u2014 the officer tells you what's expected next.",
      "6. Complete all steps to finish the build. Zero mistakes earns a flawless bonus!",
      "",
      "\u{1F4AF} SCORING",
      "Each correct item: 10\u201315 XP. Flawless build (no mistakes): +30 XP bonus.",
      "Your best score and uniforms built are saved between sessions."
    ];
    ubFeedback("info", lines.join("  "));
    const fb = document.getElementById("ubFeedback");
    if (fb) { fb.style.whiteSpace = "pre-line"; }
    toast("info", "How to Play \u2014 see the feedback panel for full instructions.");
  }

  // Main render function — called when switching to the builder section
  function renderUniformBuilder() {
    ubLoadStats();
    ubUpdateGoal();
    ubRenderFigure();
    ubRenderRack();
    ubUpdateStats();
    if (ub.active && !ub.finished) {
      ubUpdateChecklist();
      ubUpdateProgress();
    }
    // Bind controls (once)
    const startBtn = document.getElementById("ubStartBtn");
    if (startBtn && !startBtn.dataset.bound) {
      startBtn.addEventListener("click", ubStartBuild);
      startBtn.dataset.bound = "1";
    }
    const nextBtn = document.getElementById("ubNextBtn");
    if (nextBtn && !nextBtn.dataset.bound) {
      nextBtn.addEventListener("click", ubNextBuild);
      nextBtn.dataset.bound = "1";
    }
    const howBtn = document.getElementById("ubHowBtn");
    if (howBtn && !howBtn.dataset.bound) {
      howBtn.addEventListener("click", ubHowToPlay);
      howBtn.dataset.bound = "1";
    }
    const resetBtn = document.getElementById("ubResetBtn");
    if (resetBtn && !resetBtn.dataset.bound) {
      resetBtn.addEventListener("click", ubResetBuilder);
      resetBtn.dataset.bound = "1";
    }
  }


  // ==========================================================
  // NAVIGATION
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
    if (name === "inspection") renderInspectionGame();
    if (name === "builder") renderUniformBuilder();
    const main = document.querySelector(".main");
    if (main) main.scrollTop = 0;
  }

  function openMissionRender() {
    const sel = document.getElementById("missionSelector");
    const con = document.getElementById("missionConsole");
    if (sel) sel.style.display = "none";
    if (con) con.style.display = "block";
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
    if (!t || !ico || !txt) return;
    t.className = "toast " + kind;
    ico.textContent = kind === "ok" ? "\u2705" : kind === "warn" ? "\u26a0\ufe0f" : kind === "err" ? "\u274c" : "\u2139\ufe0f";
    txt.textContent = text;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3500);
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(BP_SLOTS); } catch(e) {}
    try { trMutate(CHALLENGE_BANK); } catch(e) {}
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(TYPE_META); } catch(e) {}
    try { trMutate(UB_DISTRACTORS); } catch(e) {}
    try { trMutate(UB_TARGETS); } catch(e) {}
    try { trMutate(colors); } catch(e) {}
    try { trMutate(letters); } catch(e) {}
    try { trMutate(lines); } catch(e) {}
    try { trMutate(sliderValue); } catch(e) {}
    try { trMutate(sparkles); } catch(e) {}
    try { trMutate(statusMap); } catch(e) {}
    try { trMutate(toggleState); } catch(e) {}
  }



  // ==========================================================
  // INIT
  // ==========================================================
  function init() {
    // Nav buttons
    document.querySelectorAll(".nav-btn").forEach(b => {
      b.addEventListener("click", () => switchSection(b.dataset.section));
    });

    // Mobile menu
    const mb = document.getElementById("mobileMenuBtn");
    if (mb) mb.addEventListener("click", () => {
      const sb = document.getElementById("sidebar");
      if (sb) sb.classList.toggle("open");
    });

    // SITREP file button
    const fsb = document.getElementById("fileSitrepBtn");
    if (fsb) fsb.addEventListener("click", fileSitrep);

    // Check for deep-link: ?mission=id
    const params = new URLSearchParams(window.location.search);
    const deepMission = params.get("mission");

    loadInspectionStats();
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
    renderInspectionGame();
    renderUniformBuilder();

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
