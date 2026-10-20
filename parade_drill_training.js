/* ============================================================
   PARADE DRILL TRAINING COMMAND — parade_drill_training.js
   Operation Cerberus: ceremonial arms & colour drill simulator
   Built on the Maple Defender-style dashboard engine (IIFE)
   Covers the 201 manual (A-DH-201-000/PT-000) ceremonial syllabus.
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "paradeDrillTrainingProgress",
    sitreps: "paradeDrillTrainingSitreps",
    wrongAttempts: "paradeDrillTrainingWrongAttempts",
    streak: "paradeDrillTrainingStreak",
    bestStreak: "paradeDrillTrainingBestStreak",
    readArticles: "paradeDrillTrainingReadArticles",
    paradeGame: "paradeDrillGameStats"
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const PARADE_BADGE_ID = 5;

  // ==========================================================
  // RANK LADDER (Ceremonial Drill ranks)
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Parade Drill Recruit",     icon: "🎖️", xp: 0,    callsign: "CEREMONY-1" },
    { id: 1, name: "Parade Drill Cadet",       icon: "🪖", xp: 300,  callsign: "DRILL-1" },
    { id: 2, name: "Drill Lance Corporal",     icon: "⬇️", xp: 700,  callsign: "LED-1" },
    { id: 3, name: "Drill Corporal",           icon: "⬇️⬇️", xp: 1200, callsign: "CORP-1" },
    { id: 4, name: "Drill Master Corporal",    icon: "⭐", xp: 1800, callsign: "MCPL-1" },
    { id: 5, name: "Drill Sergeant",           icon: "👑", xp: 2500, callsign: "SGT-1" }
  ];

  // ==========================================================
  // TOOLS (ceremonial drill tools cadets must "open")
  // ==========================================================
  const TOOLS = [
    { id: "orders",       icon: "📋", label: "Parade Orders" },
    { id: "riflechart",   icon: "🔫", label: "Rifle Position Chart" },
    { id: "colourguide",  icon: "🚩", label: "Colour Party Diagram" },
    { id: "compliments",  icon: "🎖️", label: "Compliment Tracker" },
    { id: "pacecounter",  icon: "⏱️", label: "Pace & Cadence Counter" },
    { id: "drillbook",    icon: "📖", label: "201 Drill Manual" },
    { id: "sequencer",    icon: "🔢", label: "Parade Sequencer" },
    { id: "rankchart",    icon: "🎖️", label: "Rank Chart" },
    { id: "uniform",      icon: "👕", label: "Ceremonial Dress Guide" },
    { id: "flagcare",     icon: "🧵", label: "Colour Care Kit" },
    { id: "alignment",    icon: "📐", label: "Squad Alignment Guide" },
    { id: "bugle",        icon: "📯", label: "Bugle Calls Reference" },
    { id: "wordscommand", icon: "🗣️", label: "Words of Command" }
  ];

  // ==========================================================
  // TRAINING MISSIONS — 201 Manual Ceremonial Drill
  // Each mission has hands-on tasks. Tool enforcement required.
  // ==========================================================
  const MISSIONS = [
    {
      id: "shoulder_arms",
      order: 1,
      tag: "PO 201.01",
      icon: "🔫",
      title: "Shoulder Arms — The Carrying Position",
      desc: "Master the shoulder arms position, the fundamental carrying position for the drill rifle on parade.",
      xp: 100,
      brief: "You are stepping onto the parade ground for the first time in the ceremonial phase. Your drill instructor introduces the shoulder arms position — the fundamental carrying position for the drill rifle. The rifle butt rests on the shoulder with the barrel vertical. Every arms drill movement begins and ends at shoulder arms, so getting this right is essential.",
      scene: "shoulder",
      chapters: [
        { title: "Review Orders", desc: "Open the parade orders and confirm the arms drill rotation." },
        { title: "Rifle Position", desc: "Identify the correct shoulder arms position from the chart." },
        { title: "Grip Check", desc: "Confirm the correct hand grip for shoulder arms." },
        { title: "Execute", desc: "Demonstrate the shoulder arms position to the instructor." }
      ],
      tasks: [
        {
          type: "select", tool: "orders",
          title: "Confirm the Arms Drill Rotation",
          prompt: "Open the Parade Orders and select the correct rotation for today's ceremonial drill phase.",
          options: [
            "Shoulder arms, present arms, port arms, salute at the shoulder, recover arms, reverse arms, colour party drill",
            "Quick march, halt, about turn, and dismiss only",
            "Map reading and navigation exercises",
            "Range firing and marksmanship practice"
          ],
          expected: "Shoulder arms, present arms, port arms, salute at the shoulder, recover arms, reverse arms, colour party drill",
          proof: "Arms drill rotation confirmed — the full ceremonial phase sequence from the 201 manual."
        },
        {
          type: "select", tool: "riflechart",
          title: "Identify the Shoulder Arms Position",
          prompt: "Open the Rifle Position Chart and select the correct description of the shoulder arms position.",
          options: [
            "Rifle butt on the shoulder, barrel vertical, the carrying position",
            "Rifle held diagonally across the body in a ready position",
            "Rifle brought to the vertical in front of the body as a salute",
            "Rifle reversed (inverted) as a mark of respect"
          ],
          expected: "Rifle butt on the shoulder, barrel vertical, the carrying position",
          proof: "Shoulder arms identified — rifle butt on the shoulder, barrel vertical. The fundamental carrying position."
        },
        {
          type: "toggle", tool: "riflechart",
          title: "Confirm the Hand Grip",
          prompt: "Open the Rifle Position Chart and toggle to confirm the correct grip — the right hand grasps the small of the butt with the rifle vertical.",
          expected: true,
          proof: "Grip confirmed — right hand on the small of the butt, rifle vertical at the shoulder."
        },
        {
          type: "note", tool: "riflechart",
          title: "Demonstrate the Shoulder Arms Position",
          prompt: "Write a short note describing how you adopt the shoulder arms position and why it is the fundamental carrying position. Include the keywords 'shoulder', 'vertical', and 'carrying'.",
          keywords: ["shoulder", "vertical", "carrying"],
          proof: "Shoulder arms position demonstrated correctly — the fundamental carrying position. Mission complete."
        }
      ]
    },
    {
      id: "present_arms",
      order: 2,
      tag: "PO 201.02",
      icon: "🫡",
      title: "Present Arms — The Ceremonial Salute",
      desc: "Execute the present arms movement — the ceremonial salute with the drill rifle, the highest compliment with arms.",
      xp: 100,
      brief: "The reviewing officer is approaching the parade ground. Your squad must execute the present arms — the ceremonial salute with the drill rifle. The rifle is brought to the vertical in front of the body. This is the highest compliment paid with arms and is used for the general salute, royal salutes, and when paying respects. Precision is everything.",
      scene: "present",
      chapters: [
        { title: "Movement Theory", desc: "Understand the present arms movement from the manual." },
        { title: "Timing", desc: "Execute the movement in the correct timing." },
        { title: "Compliment", desc: "Identify when present arms is used as a compliment." },
        { title: "Execute", desc: "Demonstrate the present arms to the instructor." }
      ],
      tasks: [
        {
          type: "select", tool: "riflechart",
          title: "Describe the Present Arms Movement",
          prompt: "Open the Rifle Position Chart and select the correct description of the present arms movement.",
          options: [
            "Rifle brought to the vertical in front of the body — the ceremonial salute with arms",
            "Rifle held diagonally across the body for tactical carry",
            "Rifle butt on the shoulder, the carrying position",
            "Rifle reversed (inverted) as a mark of respect"
          ],
          expected: "Rifle brought to the vertical in front of the body — the ceremonial salute with arms",
          proof: "Present arms described correctly — rifle vertical in front of the body, the ceremonial salute."
        },
        {
          type: "select", tool: "drillbook",
          title: "Execute the Correct Timing",
          prompt: "On the command 'Present Arms', how many movements is the rifle brought to the present executed in?",
          options: [
            "Two movements — bring the rifle to the centre, then to the vertical",
            "One single sharp movement",
            "Three movements — up, across, then vertical",
            "Four movements with a pause between each"
          ],
          expected: "Two movements — bring the rifle to the centre, then to the vertical",
          proof: "Timing confirmed — present arms executed in two movements per the 201 manual."
        },
        {
          type: "select", tool: "compliments",
          title: "Identify When Present Arms Is Used",
          prompt: "Open the Compliment Tracker and select the occasions when present arms is the correct compliment.",
          options: [
            "General salute, royal salute, when paying respects to entitled dignitaries",
            "Only when dismissing the squad at the end of parade",
            "When marching off the parade ground in quick time",
            "Never — present arms is only used in field training"
          ],
          expected: "General salute, royal salute, when paying respects to entitled dignitaries",
          proof: "Compliment occasions confirmed — present arms for general salute, royal salute, and paying respects."
        },
        {
          type: "note", tool: "riflechart",
          title: "Demonstrate the Present Arms",
          prompt: "Write a note describing how you execute present arms and why it is the highest compliment with arms. Include the keywords 'vertical', 'salute', and 'compliment'.",
          keywords: ["vertical", "salute", "compliment"],
          proof: "Present arms executed correctly — the highest compliment paid with arms. Mission complete."
        }
      ]
    },
    {
      id: "port_arms",
      order: 3,
      tag: "PO 201.03",
      icon: "📐",
      title: "Port Arms — The Position of Readiness",
      desc: "Master the port arms position — the rifle held diagonally across the body as a tactical carry and position of readiness.",
      xp: 100,
      brief: "The instructor introduces the port arms position — the rifle held diagonally across the body. Port arms is both a tactical carry and a position of readiness. It is used when moving with the rifle, during inspections, and as a transition between other arms positions. Understanding when to use port arms versus shoulder arms is key to fluid drill.",
      scene: "port",
      chapters: [
        { title: "Position Theory", desc: "Understand the port arms position from the manual." },
        { title: "Diagonal Angle", desc: "Confirm the correct angle and grip for port arms." },
        { title: "Usage", desc: "Identify when port arms is used on parade." },
        { title: "Execute", desc: "Demonstrate the port arms to the instructor." }
      ],
      tasks: [
        {
          type: "select", tool: "riflechart",
          title: "Describe the Port Arms Position",
          prompt: "Open the Rifle Position Chart and select the correct description of the port arms position.",
          options: [
            "Rifle held diagonally across the body — a tactical carry and position of readiness",
            "Rifle brought to the vertical in front of the body as a salute",
            "Rifle butt on the shoulder, the carrying position",
            "Rifle reversed (inverted) as a mark of respect"
          ],
          expected: "Rifle held diagonally across the body — a tactical carry and position of readiness",
          proof: "Port arms described correctly — rifle diagonal across the body, the position of readiness."
        },
        {
          type: "select", tool: "riflechart",
          title: "Confirm the Correct Grip",
          prompt: "In the port arms position, where are the hands placed on the rifle?",
          options: [
            "Left hand at the point of balance, right hand at the small of the butt",
            "Both hands on the barrel at the muzzle end",
            "Right hand only on the pistol grip",
            "Left hand on the butt plate, right hand on the barrel"
          ],
          expected: "Left hand at the point of balance, right hand at the small of the butt",
          proof: "Grip confirmed — left hand at the balance, right hand at the small of the butt for port arms."
        },
        {
          type: "select", tool: "drillbook",
          title: "Identify When Port Arms Is Used",
          prompt: "Open the 201 Drill Manual and select the occasions when port arms is the correct position.",
          options: [
            "When moving with the rifle, during inspections, and as a transition between positions",
            "Only for the general salute compliment",
            "Only when standing easy at the side of the parade ground",
            "Never — port arms is not a 201 manual position"
          ],
          expected: "When moving with the rifle, during inspections, and as a transition between positions",
          proof: "Port arms usage confirmed — used for movement, inspections, and transitions between positions."
        },
        {
          type: "note", tool: "riflechart",
          title: "Demonstrate the Port Arms",
          prompt: "Write a note describing how you adopt port arms and why it is a position of readiness. Include the keywords 'diagonal', 'readiness', and 'balance'.",
          keywords: ["diagonal", "readiness", "balance"],
          proof: "Port arms demonstrated correctly — the position of readiness. Mission complete."
        }
      ]
    },
    {
      id: "salute_shoulder",
      order: 4,
      tag: "PO 201.04",
      icon: "👋",
      title: "Salute at the Shoulder",
      desc: "Execute the salute at the shoulder — paying a compliment while the rifle remains at the shoulder position.",
      xp: 100,
      brief: "An officer is passing your position on the parade ground. The rifle is at the shoulder and there is no time to present arms. You must execute the salute at the shoulder — paying a compliment with the hand while the rifle remains at the shoulder. This is a quick and respectful compliment used when presenting arms is not required or practical.",
      scene: "salute",
      chapters: [
        { title: "When to Use", desc: "Identify when the salute at the shoulder is appropriate." },
        { title: "Hand Position", desc: "Confirm the correct hand position for the salute." },
        { title: "Execution", desc: "Execute the salute at the shoulder correctly." },
        { title: "Recover", desc: "Return to the shoulder arms position after the salute." }
      ],
      tasks: [
        {
          type: "select", tool: "compliments",
          title: "Identify When to Salute at the Shoulder",
          prompt: "Open the Compliment Tracker and select when the salute at the shoulder is the correct compliment.",
          options: [
            "When the rifle is at the shoulder and presenting arms is not required or practical",
            "Only during a royal salute to the sovereign",
            "When the squad is marching in quick time and cannot halt",
            "Never — all compliments require present arms"
          ],
          expected: "When the rifle is at the shoulder and presenting arms is not required or practical",
          proof: "Salute at the shoulder — used when the rifle is at the shoulder and present arms is not required."
        },
        {
          type: "select", tool: "riflechart",
          title: "Confirm the Hand Position",
          prompt: "In the salute at the shoulder, which hand is used and where is it placed?",
          options: [
            "Right hand, fingers and thumb extended, palm facing left, tips touching the brow just above the right eye",
            "Left hand raised above the head with palm forward",
            "Right hand placed on the rifle barrel",
            "Both hands brought to the chest in a prayer position"
          ],
          expected: "Right hand, fingers and thumb extended, palm facing left, tips touching the brow just above the right eye",
          proof: "Hand position confirmed — right hand, palm left, tips at the brow above the right eye."
        },
        {
          type: "toggle", tool: "riflechart",
          title: "Execute the Salute",
          prompt: "Enable execution of the salute at the shoulder — right hand to the brow, held briefly, then returned smartly to the side.",
          expected: true,
          proof: "Salute at the shoulder executed — hand to the brow, held, returned smartly to the side."
        },
        {
          type: "note", tool: "riflechart",
          title: "Recover to Shoulder Arms",
          prompt: "Write a note describing how you return to the shoulder arms position after the salute and why timing matters. Include the keywords 'shoulder', 'smartly', and 'timing'.",
          keywords: ["shoulder", "smartly", "timing"],
          proof: "Recovery to shoulder arms demonstrated — returned smartly with correct timing. Mission complete."
        }
      ]
    },
    {
      id: "recover_arms",
      order: 5,
      tag: "PO 201.05",
      icon: "🔄",
      title: "Recover Arms — The Ceremonial Recovery",
      desc: "Master the recover arms position — the rifle brought vertical in front of the body, a ceremonial position used in formal drill.",
      xp: 100,
      brief: "The instructor introduces the recover arms position — the rifle brought to the vertical in front of the body with both hands. Recover arms is a ceremonial position used in formal drill sequences, particularly during inspections and certain compliments. It differs from present arms in the grip and the context of use. Understanding the distinction is important for ceremonial accuracy.",
      scene: "recover",
      chapters: [
        { title: "Position Theory", desc: "Understand the recover arms position from the manual." },
        { title: "Distinction", desc: "Distinguish recover arms from present arms." },
        { title: "Grip", desc: "Confirm the correct two-hand grip for recover arms." },
        { title: "Execute", desc: "Demonstrate the recover arms to the instructor." }
      ],
      tasks: [
        {
          type: "select", tool: "riflechart",
          title: "Describe the Recover Arms Position",
          prompt: "Open the Rifle Position Chart and select the correct description of the recover arms position.",
          options: [
            "Rifle brought vertical in front of the body with both hands — a ceremonial position",
            "Rifle held diagonally across the body for tactical carry",
            "Rifle butt on the shoulder, the carrying position",
            "Rifle reversed (inverted) as a mark of respect"
          ],
          expected: "Rifle brought vertical in front of the body with both hands — a ceremonial position",
          proof: "Recover arms described correctly — rifle vertical in front, both hands, a ceremonial position."
        },
        {
          type: "select", tool: "drillbook",
          title: "Distinguish Recover Arms from Present Arms",
          prompt: "Open the 201 Drill Manual and select the key difference between recover arms and present arms.",
          options: [
            "Recover arms uses a two-hand grip for ceremonial purposes; present arms is the salute with a different grip",
            "Recover arms is identical to present arms in every way",
            "Recover arms is only used in field training, present arms only on parade",
            "Present arms is carried on the shoulder, recover arms is diagonal"
          ],
          expected: "Recover arms uses a two-hand grip for ceremonial purposes; present arms is the salute with a different grip",
          proof: "Distinction confirmed — recover arms (two-hand ceremonial) versus present arms (salute with different grip)."
        },
        {
          type: "select", tool: "riflechart",
          title: "Confirm the Two-Hand Grip",
          prompt: "In the recover arms position, where are both hands placed on the rifle?",
          options: [
            "Both hands at the point of balance with the rifle vertical in front of the body",
            "Left hand at the muzzle, right hand at the butt",
            "Right hand only on the pistol grip",
            "Both hands clasped behind the back"
          ],
          expected: "Both hands at the point of balance with the rifle vertical in front of the body",
          proof: "Two-hand grip confirmed — both hands at the balance, rifle vertical in front."
        },
        {
          type: "note", tool: "riflechart",
          title: "Demonstrate the Recover Arms",
          prompt: "Write a note describing how you adopt recover arms and the ceremonial context in which it is used. Include the keywords 'vertical', 'ceremonial', and 'both hands'.",
          keywords: ["vertical", "ceremonial", "both hands"],
          proof: "Recover arms demonstrated correctly — the ceremonial recovery position. Mission complete."
        }
      ]
    },
    {
      id: "reverse_arms",
      order: 6,
      tag: "PO 201.06",
      icon: "🕊️",
      title: "Reverse Arms — The Mark of Respect",
      desc: "Execute the reverse arms position — the rifle reversed (inverted) as a mark of respect, used in funeral and memorial drill.",
      xp: 100,
      brief: "The squad is preparing for a memorial parade. The instructor introduces the reverse arms position — the rifle reversed (inverted) and carried as a mark of respect. Reverse arms is used in funeral drill, memorial services, and when paying solemn respects. It is one of the most meaningful ceremonial movements a cadet can learn and requires precise execution.",
      scene: "reverse",
      chapters: [
        { title: "Position Theory", desc: "Understand the reverse arms position from the manual." },
        { title: "When Used", desc: "Identify when reverse arms is the correct position." },
        { title: "Execution", desc: "Confirm the correct method for reversing the rifle." },
        { title: "Solemnity", desc: "Demonstrate understanding of the solemn context." }
      ],
      tasks: [
        {
          type: "select", tool: "riflechart",
          title: "Describe the Reverse Arms Position",
          prompt: "Open the Rifle Position Chart and select the correct description of the reverse arms position.",
          options: [
            "Rifle reversed (inverted) and carried as a mark of respect",
            "Rifle brought to the vertical in front of the body as a salute",
            "Rifle held diagonally across the body for tactical carry",
            "Rifle butt on the shoulder, the carrying position"
          ],
          expected: "Rifle reversed (inverted) and carried as a mark of respect",
          proof: "Reverse arms described correctly — rifle inverted as a mark of respect."
        },
        {
          type: "select", tool: "drillbook",
          title: "Identify When Reverse Arms Is Used",
          prompt: "Open the 201 Drill Manual and select the occasions when reverse arms is the correct position.",
          options: [
            "Funeral drill, memorial services, and when paying solemn respects",
            "During the general salute to a reviewing officer",
            "When marching in quick time during a normal parade",
            "Only during range firing practice"
          ],
          expected: "Funeral drill, memorial services, and when paying solemn respects",
          proof: "Reverse arms usage confirmed — funeral drill, memorial services, and solemn respects."
        },
        {
          type: "select", tool: "riflechart",
          title: "Confirm the Reversal Method",
          prompt: "How is the rifle reversed in the reverse arms movement?",
          options: [
            "The rifle is turned so the muzzle points downward and the butt is uppermost, carried in front of the body",
            "The rifle is simply moved from shoulder to port without changing orientation",
            "The rifle is placed on the ground muzzle down",
            "The rifle is swung overhead in a full circle"
          ],
          expected: "The rifle is turned so the muzzle points downward and the butt is uppermost, carried in front of the body",
          proof: "Reversal method confirmed — muzzle down, butt uppermost, carried in front of the body."
        },
        {
          type: "note", tool: "drillbook",
          title: "Demonstrate Understanding of Solemnity",
          prompt: "Write a note describing why reverse arms is a mark of respect and the solemn context in which it is used. Include the keywords 'respect', 'funeral', and 'solemn'.",
          keywords: ["respect", "funeral", "solemn"],
          proof: "Solemnity demonstrated — reverse arms understood as a mark of respect for funeral and memorial drill. Mission complete."
        }
      ]
    },
    {
      id: "colour_carry",
      order: 7,
      tag: "PO 201.07",
      icon: "🚩",
      title: "Colour Party — The Carry Position",
      desc: "Learn the colour party carry position — the colour held upright at the carry, the fundamental colour party position.",
      xp: 100,
      brief: "You have been selected for the colour party. The colour bearer introduces the carry position — the colour (flag) held upright on the pike at the carry. The carry is the fundamental and normal position for the colour party on parade. The colour is held vertically with the pike resting in the colour belt. Every colour party movement begins and ends at the carry.",
      scene: "colour",
      chapters: [
        { title: "Composition", desc: "Understand colour party composition from the diagram." },
        { title: "Carry Position", desc: "Identify the correct carry position for the colour." },
        { title: "Pike Grip", desc: "Confirm the correct grip on the colour pike." },
        { title: "Execute", desc: "Demonstrate the carry position to the colour bearer." }
      ],
      tasks: [
        {
          type: "select", tool: "colourguide",
          title: "Identify Colour Party Composition",
          prompt: "Open the Colour Party Diagram and select the correct composition of a standard colour party.",
          options: [
            "A colour bearer carrying the colour, flanked by two escorts armed with rifles",
            "A single cadet carrying the colour with no escorts",
            "Four cadets all carrying different colours simultaneously",
            "The entire squad carrying colours in every file"
          ],
          expected: "A colour bearer carrying the colour, flanked by two escorts armed with rifles",
          proof: "Colour party composition confirmed — colour bearer with two armed escorts."
        },
        {
          type: "select", tool: "colourguide",
          title: "Identify the Carry Position",
          prompt: "Open the Colour Party Diagram and select the correct description of the carry position.",
          options: [
            "Colour held upright on the pike at the carry, the normal and fundamental position",
            "Colour pike sloped over the shoulder at an angle",
            "Colour allowed to fly free from the pike",
            "Colour lowered toward the ground in salute"
          ],
          expected: "Colour held upright on the pike at the carry, the normal and fundamental position",
          proof: "Carry position identified — colour upright on the pike, the fundamental colour party position."
        },
        {
          type: "toggle", tool: "colourguide",
          title: "Confirm the Pike Grip",
          prompt: "Enable confirmation of the correct pike grip — the right hand grasps the pike at the carry, with the pike resting in the colour belt.",
          expected: true,
          proof: "Pike grip confirmed — right hand on the pike, resting in the colour belt at the carry."
        },
        {
          type: "note", tool: "colourguide",
          title: "Demonstrate the Carry Position",
          prompt: "Write a note describing how you hold the colour at the carry and why it is the fundamental colour party position. Include the keywords 'upright', 'pike', and 'carry'.",
          keywords: ["upright", "pike", "carry"],
          proof: "Carry position demonstrated correctly — the fundamental colour party position. Mission complete."
        }
      ]
    },
    {
      id: "colour_slope_letfly",
      order: 8,
      tag: "PO 201.08",
      icon: "🚩",
      title: "Slope, Let Fly & Catch — Colour Movements",
      desc: "Master the slope, let fly, and catch colour movements used during the general salute compliment.",
      xp: 100,
      brief: "The colour bearer teaches the slope, let fly, and catch movements. The slope is the colour pike angled over the shoulder. The let fly is the colour allowed to fly free from the pike — done on the first movement of the present arms during a salute. The catch is the colour gathered back onto the pike — done on the command to shoulder arms. These three movements are the heart of the colour party compliment.",
      scene: "colour_fly",
      chapters: [
        { title: "Slope", desc: "Learn the slope position — pike over the shoulder." },
        { title: "Let Fly", desc: "Execute the let fly — colour flying free during the salute." },
        { title: "Catch", desc: "Execute the catch — gathering the colour back onto the pike." },
        { title: "Sequence", desc: "Demonstrate the slope → let fly → catch sequence." }
      ],
      tasks: [
        {
          type: "select", tool: "colourguide",
          title: "Describe the Slope Position",
          prompt: "Open the Colour Party Diagram and select the correct description of the slope position.",
          options: [
            "Colour pike sloped over the shoulder at an angle",
            "Colour held upright at the carry",
            "Colour allowed to fly free from the pike",
            "Colour lowered toward the ground in salute"
          ],
          expected: "Colour pike sloped over the shoulder at an angle",
          proof: "Slope position identified — colour pike angled over the shoulder."
        },
        {
          type: "select", tool: "colourguide",
          title: "Describe the Let Fly Movement",
          prompt: "Open the Colour Party Diagram and select the correct description of the let fly movement.",
          options: [
            "The colour is allowed to fly free from the pike, done on the first movement of the present arms during a salute",
            "The colour is rolled up and stored in its case",
            "The colour is lowered to the ground",
            "The colour is swapped between the escorts"
          ],
          expected: "The colour is allowed to fly free from the pike, done on the first movement of the present arms during a salute",
          proof: "Let fly described correctly — colour flying free on the first movement of present arms."
        },
        {
          type: "select", tool: "colourguide",
          title: "Describe the Catch Movement",
          prompt: "Open the Colour Party Diagram and select the correct description of the catch movement.",
          options: [
            "The colour is caught and gathered back onto the pike, done on the command to shoulder arms",
            "The colour is thrown into the air and caught",
            "The colour is folded into a triangle",
            "The colour is handed to the reviewing officer"
          ],
          expected: "The colour is caught and gathered back onto the pike, done on the command to shoulder arms",
          proof: "Catch described correctly — colour gathered back onto the pike on shoulder arms."
        },
        {
          type: "note", tool: "colourguide",
          title: "Demonstrate the Slope → Let Fly → Catch Sequence",
          prompt: "Write a note describing the correct sequence of slope, let fly, and catch during a salute, and when each movement occurs. Include the keywords 'let fly', 'catch', and 'shoulder arms'.",
          keywords: ["let fly", "catch", "shoulder arms"],
          proof: "Colour movement sequence demonstrated — slope, let fly, catch in correct order. Mission complete."
        }
      ]
    },
    {
      id: "colour_dip",
      order: 9,
      tag: "PO 201.09",
      icon: "👑",
      title: "Dip — The Royal Salute",
      desc: "Execute the dip — the colour lowered in salute for a Royal Salute to entitled dignitaries.",
      xp: 100,
      brief: "A member of the Royal Family is attending the parade. The colour bearer teaches the dip — the colour lowered in a sweeping salute. The dip is used for a Royal Salute to entitled dignitaries and is the highest compliment the colour party can pay. The colour is lowered to a horizontal position and then raised back to the carry. This movement requires grace, precision, and perfect timing.",
      scene: "dip",
      chapters: [
        { title: "When Used", desc: "Identify when the dip is the correct compliment." },
        { title: "Movement", desc: "Understand the dip movement from the diagram." },
        { title: "Timing", desc: "Confirm the correct timing for the dip." },
        { title: "Execute", desc: "Demonstrate the dip to the colour bearer." }
      ],
      tasks: [
        {
          type: "select", tool: "compliments",
          title: "Identify When the Dip Is Used",
          prompt: "Open the Compliment Tracker and select when the dip is the correct compliment for the colour party.",
          options: [
            "For a Royal Salute to entitled dignitaries — the highest colour party compliment",
            "Only when marching off the parade ground",
            "When the squad is standing at ease",
            "During range firing practice"
          ],
          expected: "For a Royal Salute to entitled dignitaries — the highest colour party compliment",
          proof: "Dip usage confirmed — Royal Salute to entitled dignitaries, the highest colour party compliment."
        },
        {
          type: "select", tool: "colourguide",
          title: "Describe the Dip Movement",
          prompt: "Open the Colour Party Diagram and select the correct description of the dip movement.",
          options: [
            "The colour is lowered to a horizontal position in a sweeping salute, then raised back to the carry",
            "The colour is thrown over the pike and caught",
            "The colour is folded and placed on the ground",
            "The colour is swapped to the left hand"
          ],
          expected: "The colour is lowered to a horizontal position in a sweeping salute, then raised back to the carry",
          proof: "Dip movement described correctly — lowered to horizontal, then raised back to the carry."
        },
        {
          type: "select", tool: "pacecounter",
          title: "Confirm the Correct Timing",
          prompt: "Open the Pace & Cadence Counter and select the correct timing for the dip movement.",
          options: [
            "A slow, deliberate sweep timed with the Royal Salute — lower on the first note, raise on the last",
            "As fast as possible to get it over with quickly",
            "Three quick bobs of the colour",
            "No specific timing — done at the bearer's discretion"
          ],
          expected: "A slow, deliberate sweep timed with the Royal Salute — lower on the first note, raise on the last",
          proof: "Timing confirmed — slow deliberate sweep, lower on the first note, raise on the last."
        },
        {
          type: "note", tool: "colourguide",
          title: "Demonstrate the Dip",
          prompt: "Write a note describing how you execute the dip and why it is the highest colour party compliment. Include the keywords 'lower', 'horizontal', and 'royal'.",
          keywords: ["lower", "horizontal", "royal"],
          proof: "Dip demonstrated correctly — the Royal Salute, highest colour party compliment. Mission complete."
        }
      ]
    },
    {
      id: "parade_compliment",
      order: 10,
      tag: "PO 201.10",
      icon: "🎖️",
      title: "Sequencing the Parade Compliment",
      desc: "Sequence a full general salute compliment — the complete 201 manual arms and colour party drill sequence.",
      xp: 100,
      brief: "Final mission (PO 201.10). The reviewing officer has arrived and the general salute is ordered. You must sequence the complete parade compliment per the 201 manual: the squad presents arms while the colour party lets fly the colour, then on the command to shoulder arms the colour is caught and the squad returns to shoulder arms. Every movement must be in the correct order with correct timing. This is the culmination of your ceremonial drill training.",
      scene: "compliment",
      chapters: [
        { title: "Sequence Order", desc: "Confirm the correct order of the general salute compliment." },
        { title: "Arms Movement", desc: "Identify the arms drill movement in the compliment." },
        { title: "Colour Movement", desc: "Identify the colour party movement in the compliment." },
        { title: "Full Sequence", desc: "Demonstrate the complete compliment sequence." }
      ],
      tasks: [
        {
          type: "select", tool: "sequencer",
          title: "Confirm the Compliment Sequence Order",
          prompt: "Open the Parade Sequencer and select the correct order of the general salute compliment.",
          options: [
            "Present Arms → Let Fly the Colour → Catch the Colour → Shoulder Arms",
            "Shoulder Arms → Port Arms → Recover Arms → Reverse Arms",
            "Let Fly → Dip → Slope → Carry",
            "Halt → About Turn → Quick March → Dismiss"
          ],
          expected: "Present Arms → Let Fly the Colour → Catch the Colour → Shoulder Arms",
          proof: "Compliment sequence confirmed — Present Arms, Let Fly, Catch, Shoulder Arms."
        },
        {
          type: "select", tool: "riflechart",
          title: "Identify the Arms Movement in the Compliment",
          prompt: "What arms drill movement is executed at the start of the general salute compliment?",
          options: [
            "Present Arms — the rifle brought to the vertical in front of the body",
            "Reverse Arms — the rifle inverted as a mark of respect",
            "Port Arms — the rifle held diagonally across the body",
            "Recover Arms — the rifle vertical with both hands"
          ],
          expected: "Present Arms — the rifle brought to the vertical in front of the body",
          proof: "Arms movement identified — Present Arms at the start of the general salute compliment."
        },
        {
          type: "select", tool: "colourguide",
          title: "Identify the Colour Movement in the Compliment",
          prompt: "What colour party movement is executed during the present arms in the general salute?",
          options: [
            "Let Fly — the colour allowed to fly free from the pike on the first movement of present arms",
            "Dip — the colour lowered to the horizontal",
            "Slope — the colour pike angled over the shoulder",
            "Carry — the colour held upright at the carry"
          ],
          expected: "Let Fly — the colour allowed to fly free from the pike on the first movement of present arms",
          proof: "Colour movement identified — Let Fly on the first movement of present arms."
        },
        {
          type: "note", tool: "sequencer",
          title: "Demonstrate the Complete Compliment Sequence",
          prompt: "Write a note describing the complete general salute compliment sequence in order, including both the arms and colour party movements. Include the keywords 'present arms', 'let fly', 'catch', and 'shoulder arms'.",
          keywords: ["present arms", "let fly", "catch", "shoulder arms"],
          proof: "Complete compliment sequence demonstrated — Present Arms, Let Fly, Catch, Shoulder Arms. All 10 ceremonial drill missions complete. Outstanding work, Drill Cadet. You are ready for the parade ground."
        }
      ]
    }
  ];

  // ==========================================================
  // LEARN LIBRARY ARTICLES
  // ==========================================================
  const LEARN_ARTICLES = [
    { id: "l_shoulder_arms",  cat: "Arms Drill",     icon: "🔫", title: "Shoulder Arms — The Carrying Position",       desc: "Rifle butt on the shoulder, barrel vertical — every arms movement begins and ends here.", xp: 15 },
    { id: "l_present_arms",   cat: "Arms Drill",     icon: "🫡", title: "Present Arms — The Ceremonial Salute",       desc: "Rifle to the vertical in front of the body — the highest compliment paid with arms.", xp: 15 },
    { id: "l_port_arms",      cat: "Arms Drill",     icon: "📐", title: "Port Arms — Position of Readiness",           desc: "Rifle held diagonally across the body — the tactical carry and transition position.", xp: 15 },
    { id: "l_salute_shoulder",cat: "Arms Drill",     icon: "👋", title: "Salute at the Shoulder",                     desc: "Paying a compliment with the hand while the rifle remains at the shoulder.", xp: 15 },
    { id: "l_recover_arms",   cat: "Arms Drill",     icon: "🔄", title: "Recover Arms — Ceremonial Recovery",         desc: "Rifle vertical in front with both hands — a ceremonial position for formal drill.", xp: 15 },
    { id: "l_reverse_arms",   cat: "Arms Drill",     icon: "🕊️", title: "Reverse Arms — Mark of Respect",             desc: "Rifle reversed (inverted) — used in funeral drill and memorial services.", xp: 15 },
    { id: "l_rifle_positions",cat: "Arms Drill",     icon: "📖", title: "201 Manual Rifle Positions Overview",        desc: "A complete guide to all six ceremonial rifle positions from the 201 manual.", xp: 15 },
    { id: "l_colour_party",   cat: "Colour Drill",   icon: "🚩", title: "Colour Party Composition",                   desc: "Colour bearer with two armed escorts — the structure of a standard colour party.", xp: 15 },
    { id: "l_carry",          cat: "Colour Drill",   icon: "🚩", title: "The Carry Position",                         desc: "Colour upright on the pike — the fundamental and normal colour party position.", xp: 15 },
    { id: "l_slope",          cat: "Colour Drill",   icon: "📐", title: "The Slope Position",                         desc: "Colour pike angled over the shoulder — a resting and transition position.", xp: 15 },
    { id: "l_let_fly",        cat: "Colour Drill",   icon: "🚩", title: "Let Fly — Colour in the Salute",             desc: "Colour flying free on the first movement of present arms — the heart of the compliment.", xp: 15 },
    { id: "l_catch",          cat: "Colour Drill",   icon: "🧵", title: "Catch — Gathering the Colour",               desc: "Colour gathered back onto the pike on the command to shoulder arms.", xp: 15 },
    { id: "l_dip",            cat: "Colour Drill",   icon: "👑", title: "The Dip — Royal Salute",                     desc: "Colour lowered to horizontal — the highest compliment for a Royal Salute.", xp: 15 },
    { id: "l_colour_care",    cat: "Colour Drill",   icon: "🧵", title: "Colour Care & Maintenance",                  desc: "How to care for, store, and maintain ceremonial colours and pikes.", xp: 15 },
    { id: "l_general_salute", cat: "Compliments",    icon: "🎖️", title: "The General Salute Compliment",              desc: "The full sequence: Present Arms, Let Fly, Catch, Shoulder Arms.", xp: 15 },
    { id: "l_royal_salute",   cat: "Compliments",    icon: "👑", title: "The Royal Salute",                           desc: "The highest compliment — when and how to execute the Royal Salute with the dip.", xp: 15 },
    { id: "l_compliment_types",cat: "Compliments",   icon: "🎖️", title: "Types of Compliments",                       desc: "When to salute, present arms, or stand at attention — matching the compliment to the occasion.", xp: 15 },
    { id: "l_cadence",        cat: "Drill Theory",   icon: "⏱️", title: "Cadence & Pace",                             desc: "The 116 BPM marching cadence and how timing governs all ceremonial drill.", xp: 15 },
    { id: "l_words_command",  cat: "Drill Theory",   icon: "🗣️", title: "Words of Command",                           desc: "Cautionary and executive parts — how commands are called and why timing matters.", xp: 15 },
    { id: "l_squad_alignment",cat: "Drill Theory",   icon: "📐", title: "Squad Alignment & Dressing",                 desc: "Keeping the squad straight, aligned, and dressed — the foundation of ceremonial appearance.", xp: 15 },
    { id: "l_ceremonial_dress",cat: "Dress",         icon: "👕", title: "Ceremonial Dress Standards",                 desc: "Polished brass, pressed uniform, proper headdress — ceremonial dress requirements.", xp: 15 },
    { id: "l_bugle_calls",    cat: "Drill Theory",   icon: "📯", title: "Bugle Calls on Parade",                      desc: "The bugle calls that govern ceremonial parade movements and compliments.", xp: 15 },
    { id: "l_parade_format",  cat: "Drill Theory",   icon: "📋", title: "Parade Format & Compliment",                 desc: "How a ceremonial parade is structured and where compliments fit in the sequence.", xp: 15 },
    { id: "l_201_manual",     cat: "Reference",      icon: "📖", title: "The 201 Manual — An Overview",               desc: "A-DH-201-000/PT-000 — the Canadian Armed Forces Manual of Drill and Ceremonial.", xp: 15 }
  ];

  // ==========================================================
  // PARADE DRILL BADGES (auto-generated from MISSIONS)
  // ==========================================================
  const PARADE_BADGES = MISSIONS.map(m => ({
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
      currentMissionTask: {}
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
  // MAP PROGRESS SYNC — badge 5 on the quest map
  // ==========================================================
  function syncMapProgress() {
    try {
      const allDone = MISSIONS.every(m => state.completedMissions.includes(m.id));
      let mapProgress = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || "[]");
      if (allDone && !mapProgress.includes(PARADE_BADGE_ID)) {
        mapProgress.push(PARADE_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      } else if (!allDone && mapProgress.includes(PARADE_BADGE_ID)) {
        mapProgress = mapProgress.filter(id => id !== PARADE_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      }
    } catch (e) {}
  }

  // ==========================================================
  // SCENE SVG GENERATORS — Ceremonial parade themes
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
    const end = `</svg>`;
    const grad = (id, c1, c2) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;

    if (scene === "shoulder") {
      return base + grad("g", "#0f1c2e", "#08111c") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="40" y="40" width="520" height="110" rx="4" fill="rgba(71,107,159,0.1)" stroke="rgba(245,200,76,0.3)" stroke-dasharray="8 4"/>
        <text x="300" y="30" fill="#f5c84c" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">SHOULDER ARMS — THE CARRYING POSITION</text>
        <g transform="translate(160,55)">
          <rect x="-5" y="0" width="10" height="60" rx="2" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
          <circle cx="0" cy="-8" r="7" fill="#f5c84c" stroke="#c79a2e"/>
          <rect x="-2" y="-5" width="4" height="55" fill="#2a3a55"/>
          <rect x="-3" y="20" width="6" height="4" fill="#f5c84c"/>
          <text x="0" y="80" fill="#6b94d4" font-size="9" font-family="monospace" text-anchor="middle">BUTT ON SHOULDER</text>
        </g>
        <g transform="translate(300,55)">
          <rect x="-5" y="0" width="10" height="60" rx="2" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
          <circle cx="0" cy="-8" r="7" fill="#f5c84c" stroke="#c79a2e"/>
          <rect x="-2" y="-5" width="4" height="55" fill="#2a3a55"/>
          <rect x="-3" y="20" width="6" height="4" fill="#f5c84c"/>
          <text x="0" y="80" fill="#6b94d4" font-size="9" font-family="monospace" text-anchor="middle">BARREL VERTICAL</text>
        </g>
        <g transform="translate(440,55)">
          <rect x="-5" y="0" width="10" height="60" rx="2" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
          <circle cx="0" cy="-8" r="7" fill="#f5c84c" stroke="#c79a2e"/>
          <rect x="-2" y="-5" width="4" height="55" fill="#2a3a55"/>
          <rect x="-3" y="20" width="6" height="4" fill="#f5c84c"/>
          <text x="0" y="80" fill="#6b94d4" font-size="9" font-family="monospace" text-anchor="middle">CARRYING POSITION</text>
        </g>
        <text x="300" y="165" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle">201 MANUAL — ARMS DRILL FUNDAMENTALS</text>
      ` + end;
    }
    if (scene === "present") {
      return base + grad("g", "#0f1c2e", "#08111c") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="30" fill="#f5c84c" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">PRESENT ARMS — THE CEREMONIAL SALUTE</text>
        <g transform="translate(300,100)">
          <rect x="-5" y="-50" width="10" height="60" rx="2" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
          <circle cx="0" cy="-58" r="7" fill="#f5c84c" stroke="#c79a2e"/>
          <rect x="-2" y="-55" width="4" height="55" fill="#2a3a55"/>
          <circle cx="0" cy="0" r="25" fill="none" stroke="#f5c84c" stroke-width="1.5" opacity="0.4"/>
          <circle cx="0" cy="0" r="15" fill="none" stroke="#f5c84c" stroke-width="1" opacity="0.3"/>
          <text x="0" y="40" fill="#6b94d4" font-size="9" font-family="monospace" text-anchor="middle">RIFLE VERTICAL — SALUTE</text>
        </g>
        <text x="80" y="100" fill="#f5c84c" font-size="28" text-anchor="middle">🫡</text>
        <text x="80" y="125" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">HIGHEST COMPLIMENT</text>
        <text x="520" y="100" fill="#f5c84c" font-size="28" text-anchor="middle">🎖️</text>
        <text x="520" y="125" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">WITH ARMS</text>
        <text x="300" y="165" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle">201 MANUAL — CEREMONIAL SALUTE</text>
      ` + end;
    }
    if (scene === "port") {
      return base + grad("g", "#0f1c2e", "#08111c") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="30" fill="#f5c84c" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">PORT ARMS — POSITION OF READINESS</text>
        <g transform="translate(300,100) rotate(-25)">
          <rect x="-5" y="-30" width="10" height="60" rx="2" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
          <rect x="-2" y="-35" width="4" height="55" fill="#2a3a55"/>
        </g>
        <text x="300" y="140" fill="#6b94d4" font-size="9" font-family="monospace" text-anchor="middle">DIAGONAL ACROSS THE BODY</text>
        <text x="80" y="100" fill="#9ab36a" font-size="14" font-family="monospace" text-anchor="middle">↗</text>
        <text x="80" y="120" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">TACTICAL CARRY</text>
        <text x="520" y="100" fill="#9ab36a" font-size="14" font-family="monospace" text-anchor="middle">🔄</text>
        <text x="520" y="120" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">TRANSITION</text>
        <text x="300" y="165" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle">201 MANUAL — POSITION OF READINESS</text>
      ` + end;
    }
    if (scene === "salute") {
      return base + grad("g", "#0f1c2e", "#08111c") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="30" fill="#f5c84c" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">SALUTE AT THE SHOULDER</text>
        <g transform="translate(220,90)">
          <rect x="-5" y="0" width="10" height="50" rx="2" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
          <circle cx="0" cy="-8" r="7" fill="#f5c84c" stroke="#c79a2e"/>
          <rect x="-2" y="-5" width="4" height="45" fill="#2a3a55"/>
          <text x="0" y="70" fill="#6b94d4" font-size="8" font-family="monospace" text-anchor="middle">RIFLE AT SHOULDER</text>
        </g>
        <g transform="translate(380,90)">
          <rect x="-5" y="0" width="10" height="50" rx="2" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
          <circle cx="0" cy="-8" r="7" fill="#f5c84c" stroke="#c79a2e"/>
          <rect x="-2" y="-5" width="4" height="45" fill="#2a3a55"/>
          <rect x="-12" y="-25" width="6" height="18" rx="2" fill="#3a5680" transform="rotate(25 -9 -16)"/>
          <text x="0" y="70" fill="#f5c84c" font-size="8" font-family="monospace" text-anchor="middle">HAND TO BROW</text>
        </g>
        <text x="300" y="165" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle">201 MANUAL — COMPLIMENT AT THE SHOULDER</text>
      ` + end;
    }
    if (scene === "recover") {
      return base + grad("g", "#0f1c2e", "#08111c") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="30" fill="#f5c84c" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">RECOVER ARMS — CEREMONIAL RECOVERY</text>
        <g transform="translate(300,100)">
          <rect x="-5" y="-50" width="10" height="60" rx="2" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
          <rect x="-2" y="-55" width="4" height="55" fill="#2a3a55"/>
          <rect x="-15" y="-20" width="5" height="15" rx="1" fill="#3a5680" transform="rotate(15 -12 -12)"/>
          <rect x="10" y="-20" width="5" height="15" rx="1" fill="#3a5680" transform="rotate(-15 12 -12)"/>
          <text x="0" y="30" fill="#6b94d4" font-size="9" font-family="monospace" text-anchor="middle">BOTH HANDS — VERTICAL</text>
        </g>
        <text x="80" y="100" fill="#f5c84c" font-size="20" text-anchor="middle">🔄</text>
        <text x="80" y="120" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">CEREMONIAL</text>
        <text x="520" y="100" fill="#f5c84c" font-size="20" text-anchor="middle">📋</text>
        <text x="520" y="120" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">FORMAL DRILL</text>
        <text x="300" y="165" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle">201 MANUAL — CEREMONIAL RECOVERY</text>
      ` + end;
    }
    if (scene === "reverse") {
      return base + grad("g", "#1a1c20", "#0a0c10") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="30" fill="#c9334a" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">REVERSE ARMS — MARK OF RESPECT</text>
        <g transform="translate(300,100)">
          <rect x="-5" y="0" width="10" height="60" rx="2" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5" transform="rotate(180)"/>
          <rect x="-2" y="0" width="4" height="55" fill="#2a3a55" transform="rotate(180)"/>
          <text x="0" y="80" fill="#6b94d4" font-size="9" font-family="monospace" text-anchor="middle">MUZZLE DOWN — INVERTED</text>
        </g>
        <text x="80" y="100" fill="#c9334a" font-size="28" text-anchor="middle">🕊️</text>
        <text x="80" y="125" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">FUNERAL DRILL</text>
        <text x="520" y="100" fill="#c9334a" font-size="28" text-anchor="middle">🎖️</text>
        <text x="520" y="125" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">MEMORIAL SERVICE</text>
        <text x="300" y="165" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle">201 MANUAL — SOLEMN RESPECTS</text>
      ` + end;
    }
    if (scene === "colour") {
      return base + grad("g", "#0f1c2e", "#08111c") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="30" fill="#f5c84c" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">COLOUR PARTY — THE CARRY POSITION</text>
        <g transform="translate(300,40)">
          <rect x="-2" y="0" width="4" height="100" fill="#8b6f3e"/>
          <rect x="-25" y="10" width="50" height="35" fill="#c9334a" stroke="#f5c84c" stroke-width="1"/>
          <circle cx="0" cy="0" r="5" fill="#f5c84c" stroke="#c79a2e"/>
          <text x="0" y="120" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle">COLOUR UPRIGHT AT THE CARRY</text>
        </g>
        <g transform="translate(160,50)">
          <rect x="-5" y="0" width="10" height="50" rx="2" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
          <circle cx="0" cy="-8" r="7" fill="#f5c84c" stroke="#c79a2e"/>
          <text x="0" y="70" fill="#6b94d4" font-size="8" font-family="monospace" text-anchor="middle">ESCORT</text>
        </g>
        <g transform="translate(440,50)">
          <rect x="-5" y="0" width="10" height="50" rx="2" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
          <circle cx="0" cy="-8" r="7" fill="#f5c84c" stroke="#c79a2e"/>
          <text x="0" y="70" fill="#6b94d4" font-size="8" font-family="monospace" text-anchor="middle">ESCORT</text>
        </g>
        <text x="300" y="165" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle">201 MANUAL — COLOUR PARTY COMPOSITION</text>
      ` + end;
    }
    if (scene === "colour_fly") {
      return base + grad("g", "#0f1c2e", "#08111c") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="30" fill="#f5c84c" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">SLOPE → LET FLY → CATCH</text>
        <g transform="translate(120,45) rotate(-20 0 60)">
          <rect x="-2" y="0" width="4" height="80" fill="#8b6f3e"/>
          <rect x="-20" y="10" width="40" height="28" fill="#c9334a" stroke="#f5c84c" stroke-width="0.8"/>
          <text x="0" y="120" fill="#6b94d4" font-size="8" font-family="monospace" text-anchor="middle">SLOPE</text>
        </g>
        <g transform="translate(300,45)">
          <rect x="-2" y="0" width="4" height="90" fill="#8b6f3e"/>
          <path d="M2,15 Q40,5 70,18 Q40,25 2,40 Z" fill="#c9334a" stroke="#f5c84c" stroke-width="0.8" opacity="0.85"/>
          <text x="0" y="120" fill="#f5c84c" font-size="8" font-family="monospace" text-anchor="middle">LET FLY</text>
        </g>
        <g transform="translate(480,45)">
          <rect x="-2" y="0" width="4" height="90" fill="#8b6f3e"/>
          <rect x="-20" y="10" width="40" height="28" fill="#c9334a" stroke="#f5c84c" stroke-width="0.8"/>
          <text x="0" y="120" fill="#6b94d4" font-size="8" font-family="monospace" text-anchor="middle">CATCH</text>
        </g>
        <text x="300" y="165" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle">201 MANUAL — COLOUR MOVEMENTS</text>
      ` + end;
    }
    if (scene === "dip") {
      return base + grad("g", "#1a1c20", "#0a0c10") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="30" fill="#f5c84c" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">THE DIP — ROYAL SALUTE</text>
        <g transform="translate(300,90) rotate(80 0 0)">
          <rect x="-2" y="0" width="4" height="80" fill="#8b6f3e"/>
          <rect x="-20" y="10" width="40" height="28" fill="#c9334a" stroke="#f5c84c" stroke-width="1"/>
          <circle cx="0" cy="0" r="5" fill="#f5c84c" stroke="#c79a2e"/>
        </g>
        <text x="300" y="140" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle">COLOUR LOWERED TO HORIZONTAL</text>
        <text x="80" y="100" fill="#f5c84c" font-size="28" text-anchor="middle">👑</text>
        <text x="80" y="125" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">ROYAL SALUTE</text>
        <text x="520" y="100" fill="#f5c84c" font-size="28" text-anchor="middle">🎖️</text>
        <text x="520" y="125" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">ENTITLED DIGNITARY</text>
        <text x="300" y="165" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle">201 MANUAL — HIGHEST COLOUR COMPLIMENT</text>
      ` + end;
    }
    if (scene === "compliment") {
      return base + grad("g", "#0f1c2e", "#08111c") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="30" fill="#f5c84c" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">GENERAL SALUTE — FULL COMPLIMENT SEQUENCE</text>
        <rect x="60" y="50" width="120" height="90" rx="6" fill="rgba(71,107,159,0.15)" stroke="#f5c84c" stroke-width="1"/>
        <text x="120" y="72" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">1. PRESENT</text>
        <text x="120" y="88" fill="#6b94d4" font-size="8" font-family="monospace" text-anchor="middle">ARMS</text>
        <text x="120" y="115" fill="#9ab36a" font-size="20" text-anchor="middle">🫡</text>
        <rect x="200" y="50" width="120" height="90" rx="6" fill="rgba(71,107,159,0.15)" stroke="#f5c84c" stroke-width="1"/>
        <text x="260" y="72" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">2. LET FLY</text>
        <text x="260" y="88" fill="#6b94d4" font-size="8" font-family="monospace" text-anchor="middle">COLOUR</text>
        <text x="260" y="115" fill="#9ab36a" font-size="20" text-anchor="middle">🚩</text>
        <rect x="340" y="50" width="120" height="90" rx="6" fill="rgba(71,107,159,0.15)" stroke="#f5c84c" stroke-width="1"/>
        <text x="400" y="72" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">3. CATCH</text>
        <text x="400" y="88" fill="#6b94d4" font-size="8" font-family="monospace" text-anchor="middle">COLOUR</text>
        <text x="400" y="115" fill="#9ab36a" font-size="20" text-anchor="middle">🧵</text>
        <rect x="480" y="50" width="80" height="90" rx="6" fill="rgba(71,107,159,0.15)" stroke="#f5c84c" stroke-width="1"/>
        <text x="520" y="72" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">4. SHOULDER</text>
        <text x="520" y="88" fill="#6b94d4" font-size="8" font-family="monospace" text-anchor="middle">ARMS</text>
        <text x="520" y="115" fill="#9ab36a" font-size="20" text-anchor="middle">🔫</text>
        <text x="300" y="165" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle">201 MANUAL — CEREMONIAL DRILL CULMINATION</text>
      ` + end;
    }
    return base + `<rect width="${W}" height="${H}" fill="#08111c"/>` + end;
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
    PARADE_BADGES.forEach(b => {
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
    document.getElementById("topRank").textContent = rank.name.replace("Parade Drill ", "").replace("Drill ", "");
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
    document.getElementById("cmdBadgeTotal").textContent = "of " + PARADE_BADGES.length;
    document.getElementById("navTrainingCount").textContent = MISSIONS.length;
    document.getElementById("navMissionCount").textContent = MISSIONS.length;

    // Update threat meter based on progress
    const progress = state.completedMissions.length / MISSIONS.length;
    const threatPct = 70 - Math.round(progress * 40);
    const tf = document.getElementById("threatFill");
    if (tf) tf.style.width = threatPct + "%";

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
      if (done) { cls += " done"; progText = `${prog}/${total} ✓`; }
      else if (isActive) { cls += " active"; progText = `${prog}/${total} ▸`; }
      else if (unlocked) { progText = `${prog}/${total}`; }
      else { cls += " locked"; progText = "LOCKED"; }
      const num = done ? "" : m.order;
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
          <span class="mc-xp">⚡ ${missionXP(m)} XP</span>
          <span class="${statusCls}">${statusText} · ${prog}/${total}</span>
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
          <span class="mc-xp">⚡ ${missionXP(m)} XP</span>
          <span class="${statusCls}">${statusText} · ${prog}/${total}</span>
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
      toast("warn", "🔒 Module " + m.order + " is locked. Complete the previous module first.");
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
    document.getElementById("missionHeaderSub").textContent = m.tag + " — " + m.desc;

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
              <div class="th-sub">${m.tag} • ${mp.tasksDone.length}/${total} tasks complete</div>
            </div>
          </div>
          <div class="th-right">
            <span class="task-stage-pill">TASK ${activeTaskIndex + 1} / ${total}</span>
            <button class="btn btn-ghost" id="exitMissionBtn" type="button">← Back to list</button>
          </div>
        </div>
        <div class="task-body">
          <div class="scene-visual">${sceneSVG(m.scene)}<div class="scene-overlay">${m.brief.split(".")[0]}.</div></div>
          <div class="task-brief">${m.brief}</div>

          <div class="tool-dock" id="toolDock">
            ${TOOLS.map(t => `<button class="tool-btn ${activeTool === t.id ? "active" : ""}" data-tool="${t.id}" type="button"><span class="tb-ico">${t.icon}</span>${t.label}</button>`).join("")}
          </div>

          <div class="tool-req" id="toolReq">
            <span class="tr-ico">⚠️</span>
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
            <button class="btn btn-primary" id="submitTaskBtn" type="button">✓ Submit & Confirm</button>
            <button class="btn btn-ghost" id="hintBtn" type="button">💡 Hint</button>
          </div>

          <div class="terminal" id="terminal"><div class="ln ln-dim">// awaiting input…</div></div>
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
        <div class="toggle-icon">${on ? "✓" : "○"}</div>
      </div>`;
    }
    if (task.type === "select") {
      const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
      return `<select class="task-select" id="taskSelect" data-idx="${idx}">
        <option value="">— Select your answer —</option>
        ${task.options.map(o => `<option value="${esc(o)}">${esc(o)}</option>`).join("")}
      </select>`;
    }
    if (task.type === "type") {
      return `<input class="task-input" id="taskInput" type="text" placeholder="Type your answer…" autocomplete="off" />`;
    }
    if (task.type === "note") {
      return `<textarea class="task-note" id="taskNote" placeholder="Write your log entry here…"></textarea>`;
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
        termPush("info", `▸ Opened ${toolLabel(activeTool)}`);
      });
    });

    const toggleRow = document.getElementById("toggleRow");
    if (toggleRow) {
      toggleRow.addEventListener("click", () => {
        const idx = parseInt(toggleRow.dataset.idx, 10);
        toggleState[idx] = !toggleState[idx];
        const on = toggleState[idx];
        toggleRow.classList.toggle("on", on);
        toggleRow.querySelector(".toggle-icon").textContent = on ? "✓" : "○";
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
      ico.textContent = "✅";
      now.textContent = toolLabel(activeTool);
    } else {
      ico.textContent = "⚠️";
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
      fb.innerHTML = `❌ Wrong tool! This task requires <strong>${toolLabel(task.tool)}</strong>. You currently have <strong>${activeTool ? toolLabel(activeTool) : "no tool"}</strong> open. Open the correct tool from the dock above.`;
      termPush("err", `✗ FAILED — wrong tool. Required: ${toolLabel(task.tool)}`);
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
      fb.innerHTML = `❌ ${valid.msg}`;
      termPush("err", `✗ ${valid.msg}`);
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
    fb.innerHTML = `✅ Correct! ${task.proof}`;
    termPush("ok", `✓ ${task.proof}`);

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
    if (task.type === "type") {
      const inp = document.getElementById("taskInput");
      const val = (inp ? inp.value : "").trim().toUpperCase();
      if (!val) return { ok: false, msg: "Type your answer in the input field." };
      const exp = String(task.expected).toUpperCase();
      return val === exp ? { ok: true } : { ok: false, msg: `"${val}" is not correct. Hint: ${task.expected.length} characters.` };
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
    if (task.type === "select") hint = `The correct answer relates to: ${task.expected.slice(0, 40)}…`;
    else if (task.type === "type") hint = `The answer has ${task.expected.length} characters and starts with "${task.expected.charAt(0)}".`;
    else if (task.type === "note") hint = `Your note must include: ${task.keywords.join(", ")}.`;
    else if (task.type === "toggle") hint = "Click the toggle row to switch it to the ON (green) position.";
    else if (task.type === "slider") hint = `The target reading is close to ${task.expected} ${task.unit || "m"}.`;
    fb.textContent = "💡 " + hint;
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
      const badge = PARADE_BADGES.find(b => b.mission === m.id);
      toast("ok", `🏆 Mission complete! +${earned} XP earned. Badge unlocked: ${badge ? badge.name : m.title}.`);
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
    const badge = PARADE_BADGES.find(b => b.mission === m.id);
    const mp = missionProgress(m.id);
    return `<div class="task-console">
      <div class="task-body">
        <div class="complete-card">
          <div class="cc-ico">🏆</div>
          <div class="cc-title">Mission Complete: ${m.title}</div>
          <div class="cc-sub">${m.desc} You have successfully completed all ${m.tasks.length} tasks and earned the <strong>${badge ? badge.name : "Ceremonial Drill Cadet"}</strong> badge.</div>
          <div class="cc-stats">
            <div class="cc-stat"><div class="v">+${earned}</div><div class="l">XP Earned</div></div>
            <div class="cc-stat"><div class="v">${mp.tasksDone.length}/${m.tasks.length}</div><div class="l">Tasks Done</div></div>
            <div class="cc-stat"><div class="v">${mp.wrongAttempts || 0}</div><div class="l">Wrong Attempts</div></div>
          </div>
          <div class="task-actions" style="justify-content:center;">
            <button class="btn btn-primary" id="fileSitrepQuickBtn" type="button">📨 File SITREP for this mission</button>
            <button class="btn btn-ghost" id="backToListBtn" type="button">← Back to mission list</button>
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
    document.getElementById("ringRankLabel").textContent = rank.name.replace("Parade Drill ", "").replace("Drill ", "");
    document.getElementById("nextRankName").textContent = nxt ? nxt.name : "MAX RANK";
    const pct = rankProgressPct();
    const circ = 314;
    document.getElementById("xpRingFg").style.strokeDashoffset = circ - (circ * pct / 100);
    document.getElementById("ringXPToNext").textContent = nxt ? `${state.xp - rank.xp} / ${nxt.xp - rank.xp} XP to next rank` : "MAX RANK ACHIEVED";

    const chart = document.getElementById("xpBarChart");
    chart.innerHTML = MISSIONS.map(m => {
      const done = missionDone(m);
      const xp = done ? missionXP(m) : 0;
      const h = Math.max(4, (xp / 100) * 140);
      return `<div class="bar" style="height:${h}px;" title="${m.title}: ${xp} XP"><div class="bar-val">${xp}</div><div class="bar-label">M${m.order}</div></div>`;
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
      else { cls += ""; tag = '<span class="r-tag locked">LOCKED</span>'; }
      return `<div class="${cls}">
        <div class="r-ico">${r.icon}</div>
        <div class="r-body">
          <div class="r-name">${r.name}</div>
          <div class="r-xp">${r.xp} XP • CALLSIGN ${r.callsign}</div>
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
    sel.innerHTML = `<option value="">Select a completed mission…</option>` +
      completed.map(m => `<option value="${m.id}">${m.tag} — ${m.title}</option>`).join("");

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
          <div class="se-body"><strong>${m ? m.tag + " — " + m.title : s.mission}</strong><br/>${escapeHTML(s.summary)}</div>
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
    showFeedback(fb, "ok", `SITREP filed successfully! +20 XP. Your drill instructor has received your report.`);
    toast("ok", "📨 SITREP filed! +20 XP");
    renderSitrep();
    renderSidebar();
    renderTopStats();
    renderCommand();
    renderAnalysis();
  }

  function showFeedback(el, kind, msg) {
    el.className = "task-feedback show " + kind;
    el.textContent = (kind === "ok" ? "✅ " : kind === "err" ? "❌ " : "💡 ") + msg;
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
        <div class="lc-foot"><span>${read ? "✓ Read" : "Tap to read"}</span><span>+${a.xp} XP</span></div>
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
      toast("ok", `📖 Article read: "${a.title}" — +${a.xp} XP`);
      renderLearn();
      renderSidebar();
      renderTopStats();
      renderAnalysis();
    } else {
      toast("info", `📖 Already read: "${a.title}"`);
    }
  }

  // ==========================================================
  // PARADE GROUND — CEREMONIAL ARMS & COLOUR DRILL GAME
  // Interactive trainer with animated SVG cadets holding drill rifles
  // and a colour party. Cadence beats, timing meter, scoring.
  // ==========================================================

  // Arms drill commands (rifle positions from the 201 manual)
  const ARMS_COMMANDS = [
    { id: "shoulder",  caut: "Squad",        exec: "SHOULDER ARMS",       move: "shoulder",  label: "Shoulder Arms",        type: "arms",   ico: "🔫", xp: 15 },
    { id: "present",   caut: "Squad",        exec: "PRESENT ARMS",        move: "present",   label: "Present Arms",         type: "arms",   ico: "🫡", xp: 20 },
    { id: "port",      caut: "Squad",        exec: "PORT ARMS",           move: "port",      label: "Port Arms",            type: "arms",   ico: "📐", xp: 15 },
    { id: "salute",    caut: "To the front—salute", exec: "SALUTE AT THE SHOULDER", move: "salute", label: "Salute at the Shoulder", type: "arms", ico: "👋", xp: 20 },
    { id: "recover",   caut: "Squad",        exec: "RECOVER ARMS",        move: "recover",   label: "Recover Arms",         type: "arms",   ico: "🔄", xp: 20 },
    { id: "reverse",   caut: "Squad",        exec: "REVERSE ARMS",        move: "reverse",   label: "Reverse Arms",         type: "arms",   ico: "🕊️", xp: 25 }
  ];

  // Colour party commands (flag positions from the 201 manual)
  const COLOUR_COMMANDS = [
    { id: "carry",     caut: "Colour Party", exec: "CARRY",               move: "carry",     label: "Carry",                type: "colour", ico: "🚩", xp: 15 },
    { id: "slope",     caut: "Colour Party", exec: "SLOPE COLOURS",       move: "slope",     label: "Slope",                type: "colour", ico: "📐", xp: 15 },
    { id: "letfly",    caut: "Colour Party", exec: "LET FLY THE COLOUR",  move: "letfly",    label: "Let Fly",              type: "colour", ico: "🚩", xp: 25 },
    { id: "catch",     caut: "Colour Party", exec: "CATCH THE COLOUR",    move: "catch",     label: "Catch",                type: "colour", ico: "🧵", xp: 20 },
    { id: "dip",       caut: "Colour Party", exec: "DIP THE COLOUR",      move: "dip",       label: "Dip",                  type: "colour", ico: "👑", xp: 30 }
  ];

  // The General Salute compliment sequence
  const SALUTE_SEQUENCE = [
    { cmdId: "present", from: "ARMS" },
    { cmdId: "letfly",  from: "COLOUR" },
    { cmdId: "catch",   from: "COLOUR" },
    { cmdId: "shoulder",from: "ARMS" }
  ];

  // All commands combined for random selection
  const ALL_COMMANDS = ARMS_COMMANDS.concat(COLOUR_COMMANDS);

  // Game state (in-memory, synced to localStorage)
  let pg = {
    active: false,
    currentCmd: null,
    selectedMove: null,
    beatTimer: null,
    beatCount: 0,
    timingTimer: null,
    timingStart: 0,
    timingWindow: 6000,
    score: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    bestStreak: 0,
    round: 0,
    compliments: 0,
    sequenceMode: false,
    sequence: [],
    sequenceStep: 0,
    cadetState: "shoulder",
    colourState: "carry",
    cmdFlashTimer: null
  };

  // Load persisted game stats
  function loadParadeStats() {
    try {
      const raw = localStorage.getItem(SK.paradeGame);
      if (raw) {
        const p = JSON.parse(raw);
        pg.score = p.score || 0;
        pg.correct = p.correct || 0;
        pg.wrong = p.wrong || 0;
        pg.bestStreak = p.bestStreak || 0;
        pg.round = p.rounds || 0;
        pg.compliments = p.compliments || 0;
      }
    } catch (e) {}
  }

  function saveParadeStats() {
    try {
      localStorage.setItem(SK.paradeGame, JSON.stringify({
        score: pg.score,
        correct: pg.correct,
        wrong: pg.wrong,
        bestStreak: pg.bestStreak,
        rounds: pg.round,
        compliments: pg.compliments
      }));
    } catch (e) {}
  }

  // Generate a single cadet SVG with rifle, at a given position
  function cadetSVG(x, y, stateName, isColourBearer) {
    // Body parts — base attention pose
    const bodyCls = "pd-cadet";
    let stateCls = "";

    // Rifle position class
    let rifleCls = "pd-rifle shoulder";
    let armRExtra = "";
    let bodyExtra = "";

    switch (stateName) {
      case "shoulder":
        stateCls = " attention-glow";
        rifleCls = "pd-rifle shoulder";
        break;
      case "present":
        stateCls = " present-glow";
        rifleCls = "pd-rifle present";
        bodyExtra = " presenting";
        break;
      case "port":
        rifleCls = "pd-rifle port";
        break;
      case "salute":
        stateCls = " attention-glow";
        rifleCls = "pd-rifle shoulder";
        bodyExtra = " saluting";
        break;
      case "recover":
        rifleCls = "pd-rifle recover";
        break;
      case "reverse":
        rifleCls = "pd-rifle reverse";
        break;
      case "attention":
        stateCls = " attention-glow";
        rifleCls = "pd-rifle shoulder";
        break;
      case "march":
      case "quickmarch":
        bodyExtra = " marching";
        rifleCls = "pd-rifle shoulder";
        break;
      case "marktime":
        bodyExtra = " marktime";
        rifleCls = "pd-rifle shoulder";
        break;
      case "error-flash":
        stateCls = " error-flash";
        break;
      default:
        rifleCls = "pd-rifle shoulder";
    }

    // Cadet body: torso + head + legs + arms + rifle
    let inner = "";

    if (isColourBearer) {
      // Colour bearer — holds the colour pike instead of a rifle
      let colourCls = "pd-colour carry";
      switch (stateName) {
        case "carry": case "shoulder": case "attention": colourCls = "pd-colour carry"; break;
        case "slope": colourCls = "pd-colour slope"; break;
        case "letfly": colourCls = "pd-colour letfly"; break;
        case "catch": colourCls = "pd-colour carry"; break;
        case "dip": colourCls = "pd-colour dip"; break;
        case "present": colourCls = "pd-colour letfly"; break;
        default: colourCls = "pd-colour carry";
      }
      inner =
        // Legs
        `<rect class="pd-leg-l" x="${x - 7}" y="${y + 8}" width="6" height="16" rx="2" fill="#2a3a55"/>` +
        `<rect class="pd-leg-r" x="${x + 1}" y="${y + 8}" width="6" height="16" rx="2" fill="#2a3a55"/>` +
        // Torso
        `<rect x="${x - 9}" y="${y - 20}" width="18" height="30" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>` +
        // Head
        `<circle cx="${x}" cy="${y - 27}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>` +
        // Arms
        `<rect class="pd-arm-l" x="${x - 14}" y="${y - 16}" width="5" height="18" rx="2" fill="#3a5680"/>` +
        `<rect class="pd-arm-r" x="${x + 9}" y="${y - 16}" width="5" height="18" rx="2" fill="#3a5680"/>` +
        // Colour pike + flag
        `<g class="${colourCls}">` +
          `<rect x="${x - 1.5}" y="${y - 42}" width="3" height="50" fill="#8b6f3e"/>` +
          `<rect class="pd-flag-cloth" x="${x + 1.5}" y="${y - 40}" width="22" height="16" fill="#c9334a" stroke="#f5c84c" stroke-width="0.6" opacity="0.92"/>` +
          `<circle cx="${x}" cy="${y - 44}" r="3" fill="#f5c84c" stroke="#c79a2e" stroke-width="0.5"/>` +
        `</g>`;
    } else {
      // Regular cadet — holds drill rifle
      inner =
        // Legs
        `<rect class="pd-leg-l" x="${x - 7}" y="${y + 8}" width="6" height="16" rx="2" fill="#2a3a55"/>` +
        `<rect class="pd-leg-r" x="${x + 1}" y="${y + 8}" width="6" height="16" rx="2" fill="#2a3a55"/>` +
        // Torso
        `<rect x="${x - 9}" y="${y - 20}" width="18" height="30" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>` +
        // Head
        `<circle cx="${x}" cy="${y - 27}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>` +
        // Arms
        `<rect class="pd-arm-l" x="${x - 14}" y="${y - 16}" width="5" height="18" rx="2" fill="#3a5680"/>` +
        `<rect class="pd-arm-r" x="${x + 9}" y="${y - 16}" width="5" height="18" rx="2" fill="#3a5680"/>` +
        // Rifle
        `<g class="${rifleCls}">` +
          `<rect x="${x - 1.5}" y="${y - 28}" width="3" height="36" fill="#3a3a3a" stroke="#1a1a1a" stroke-width="0.5"/>` +
          `<rect x="${x - 2.5}" y="${y + 4}" width="5" height="8" rx="1" fill="#6b4f2e"/>` +
          `<rect x="${x - 1.5}" y="${y - 30}" width="3" height="4" fill="#5a5a5a"/>` +
        `</g>`;
    }

    return `<g class="${bodyCls}${stateCls}${bodyExtra}">${inner}</g>`;
  }

  // Generate the SVG parade ground with a squad of cadets + colour party
  function renderParadeGround() {
    const wrap = document.getElementById("pgCanvasWrap");
    if (!wrap) return;

    const cadetStateName = pg.cadetState;
    const colourStateName = pg.colourState;

    // 3 ranks × 5 files = 15 cadets, with colour bearer in the centre of the front rank
    const startX = 90, startY = 100, spacingX = 80, spacingY = 65;
    const cadets = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        const isColourBearer = (r === 0 && c === 2);
        cadets.push({
          x: startX + c * spacingX,
          y: startY + r * spacingY,
          rank: r,
          file: c,
          isColourBearer: isColourBearer
        });
      }
    }

    const cadetSvg = cadets.map(cd => {
      return cadetSVG(cd.x, cd.y, cd.isColourBearer ? colourStateName : cadetStateName, cd.isColourBearer);
    }).join("");

    const svg = `<svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%;">
      <defs>
        <linearGradient id="paradeGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3a4d6b"/>
          <stop offset="100%" stop-color="#2a3a55"/>
        </linearGradient>
        <linearGradient id="rankLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(245,200,76,0)"/>
          <stop offset="50%" stop-color="rgba(245,200,76,0.4)"/>
          <stop offset="100%" stop-color="rgba(245,200,76,0)"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="600" height="340" fill="url(#paradeGround)"/>
      <!-- Parade square markings -->
      <rect x="50" y="50" width="500" height="270" fill="none" stroke="rgba(245,200,76,0.25)" stroke-width="2" stroke-dasharray="8 4"/>
      <!-- Rank alignment lines -->
      <line x1="70" y1="100" x2="530" y2="100" stroke="url(#rankLine)" stroke-width="2"/>
      <line x1="70" y1="165" x2="530" y2="165" stroke="url(#rankLine)" stroke-width="2"/>
      <line x1="70" y1="230" x2="530" y2="230" stroke="url(#rankLine)" stroke-width="2"/>
      <!-- DI / parade commander position marker (front center) -->
      <circle cx="300" cy="25" r="6" fill="#f5c84c" stroke="#c79a2e" stroke-width="1.5"/>
      <text x="300" y="18" text-anchor="middle" font-size="9" fill="#f5c84c" font-family="monospace">CMDR</text>
      <!-- Dignitary / reviewing officer marker (front left) -->
      <g class="pd-dignitary">
        <circle cx="70" cy="25" r="5" fill="#c9334a" stroke="#f5c84c" stroke-width="1"/>
        <text x="70" y="18" text-anchor="middle" font-size="8" fill="#c9334a" font-family="monospace">VIP</text>
      </g>
      <!-- Squad label -->
      <text x="300" y="320" text-anchor="middle" font-size="10" fill="rgba(245,200,76,0.6)" font-family="monospace">3 RANKS × 5 FILES — 15 CADETS + COLOUR PARTY</text>
      <!-- Cadets -->
      ${cadetSvg}
    </svg>`;

    wrap.innerHTML = svg;
  }

  // Render the movement response buttons (arms + colour grids)
  function renderMoveButtons() {
    const armsGrid = document.getElementById("pgArmsGrid");
    const colourGrid = document.getElementById("pgColourGrid");
    if (armsGrid) {
      armsGrid.innerHTML = ARMS_COMMANDS.map(cmd => {
        return `<button class="pg-move-btn" data-move="${cmd.id}" data-type="arms" type="button" disabled>
          <span class="pg-mb-ico">${cmd.ico}</span>
          <span class="pg-mb-label">${cmd.label}</span>
        </button>`;
      }).join("");
      armsGrid.querySelectorAll(".pg-move-btn").forEach(btn => {
        btn.addEventListener("click", () => selectMovement(btn.dataset.move));
      });
    }
    if (colourGrid) {
      colourGrid.innerHTML = COLOUR_COMMANDS.map(cmd => {
        return `<button class="pg-move-btn" data-move="${cmd.id}" data-type="colour" type="button" disabled>
          <span class="pg-mb-ico">${cmd.ico}</span>
          <span class="pg-mb-label">${cmd.label}</span>
        </button>`;
      }).join("");
      colourGrid.querySelectorAll(".pg-move-btn").forEach(btn => {
        btn.addEventListener("click", () => selectMovement(btn.dataset.move));
      });
    }
  }

  // Render the cadence beat dots
  function renderBeatDots(activeBeat) {
    const dots = document.getElementById("pgBeatDots");
    if (!dots) return;
    let html = "";
    for (let i = 0; i < 8; i++) {
      html += `<span class="pg-beat-dot ${i === activeBeat ? "active" : ""}"></span>`;
    }
    dots.innerHTML = html;
  }

  // Update the stats display
  function updateParadeStats() {
    const s = document.getElementById("pgScore"); if (s) s.textContent = pg.score;
    const c = document.getElementById("pgCorrect"); if (c) c.textContent = pg.correct;
    const w = document.getElementById("pgWrong"); if (w) w.textContent = pg.wrong;
    const st = document.getElementById("pgStreak"); if (st) st.textContent = pg.streak;
    const cp = document.getElementById("pgCompliments"); if (cp) cp.textContent = pg.compliments;
  }

  // Update colour status indicator
  function updateColourStatus() {
    const pos = document.getElementById("pgColourPos");
    const sub = document.getElementById("pgColourSub");
    if (!pos || !sub) return;
    const labels = {
      carry:   { name: "Carry",   desc: "Colour held upright at the carry" },
      slope:   { name: "Slope",   desc: "Colour pike sloped over the shoulder" },
      letfly:  { name: "Let Fly", desc: "Colour flying free from the pike" },
      catch:   { name: "Catch",   desc: "Colour gathered back onto the pike" },
      dip:     { name: "Dip",     desc: "Colour lowered in Royal Salute" }
    };
    const lbl = labels[pg.colourState] || labels.carry;
    pos.textContent = lbl.name;
    sub.textContent = lbl.desc;
  }

  // Update the compliment sequence list display
  function updateComplimentList() {
    const list = document.getElementById("pgComplimentList");
    if (!list) return;
    if (pg.sequence.length === 0) {
      list.innerHTML = `<p class="muted" style="font-size:11px; padding:8px;">No commands called yet. Start the parade or trigger a General Salute compliment.</p>`;
      return;
    }
    list.innerHTML = pg.sequence.map((id, i) => {
      const cmd = ALL_COMMANDS.find(c => c.id === id);
      if (!cmd) return "";
      const isCurrent = pg.sequenceMode && i === pg.sequenceStep;
      const done = pg.sequenceMode && i < pg.sequenceStep;
      let cls = "pg-seq-item";
      if (isCurrent) cls += " current";
      if (done) cls += " done";
      return `<div class="${cls}">
        <span class="pg-seq-num">${i + 1}</span>
        <span class="pg-seq-ico">${cmd.ico}</span>
        <span class="pg-seq-text">${cmd.exec}</span>
      </div>`;
    }).join("");
  }

  // Start the cadence beat animation (116 BPM = ~517ms per beat)
  function startCadence() {
    stopCadence();
    pg.beatCount = 0;
    const interval = 60000 / 116;
    renderBeatDots(0);
    pg.beatTimer = setInterval(() => {
      pg.beatCount = (pg.beatCount + 1) % 8;
      renderBeatDots(pg.beatCount);
    }, interval);
  }

  function stopCadence() {
    if (pg.beatTimer) {
      clearInterval(pg.beatTimer);
      pg.beatTimer = null;
    }
  }

  // Start the timing meter countdown
  function startTiming() {
    stopTiming();
    pg.timingStart = Date.now();
    const fill = document.getElementById("pgTimingFill");
    if (fill) {
      fill.style.transition = "none";
      fill.style.width = "100%";
      void fill.offsetWidth;
      fill.style.transition = `width ${pg.timingWindow}ms linear`;
      fill.style.width = "0%";
    }
    pg.timingTimer = setTimeout(() => {
      if (pg.currentCmd && !pg.selectedMove) {
        handleWrongResponse("Time's up! No response given.");
      }
    }, pg.timingWindow);
  }

  function stopTiming() {
    if (pg.timingTimer) {
      clearTimeout(pg.timingTimer);
      pg.timingTimer = null;
    }
    const fill = document.getElementById("pgTimingFill");
    if (fill) {
      fill.style.transition = "none";
      fill.style.width = "0%";
    }
  }

  // Calculate timing bonus
  function timingBonus() {
    const elapsed = Date.now() - pg.timingStart;
    const remaining = Math.max(0, pg.timingWindow - elapsed);
    const pct = remaining / pg.timingWindow;
    if (pct > 0.75) return 1.5;
    if (pct > 0.5) return 1.25;
    if (pct > 0.25) return 1.0;
    return 0.75;
  }

  // Call a new command — show cautionary then executive
  function callCommand(cmd) {
    pg.currentCmd = cmd;
    pg.selectedMove = null;

    const cautEl = document.getElementById("pgCmdCautionary");
    const execEl = document.getElementById("pgCmdExecutive");
    const typeEl = document.getElementById("pgCmdType");

    if (cautEl) cautEl.textContent = cmd.caut.toUpperCase();
    if (execEl) {
      execEl.textContent = "…";
      execEl.classList.remove("flash");
    }
    if (typeEl) {
      typeEl.style.display = "inline-block";
      typeEl.textContent = cmd.type === "arms" ? "ARMS" : "COLOUR";
      typeEl.className = "pg-cmd-type " + cmd.type;
    }

    setTimeout(() => {
      if (execEl) {
        execEl.textContent = cmd.exec;
        execEl.classList.add("flash");
      }
      document.querySelectorAll(".pg-move-btn").forEach(btn => btn.disabled = false);
      startTiming();
      const fb = document.getElementById("pgFeedback");
      if (fb) {
        fb.className = "pg-feedback info";
        fb.innerHTML = `<strong>${cmd.caut.toUpperCase()}</strong> — <strong>${cmd.exec}</strong> — Select the correct movement!`;
      }
    }, 800);
  }

  // Player selects a movement
  function selectMovement(moveId) {
    if (!pg.currentCmd || pg.selectedMove) return;
    pg.selectedMove = moveId;

    document.querySelectorAll(".pg-move-btn").forEach(btn => btn.disabled = true);

    // Highlight selected button
    const selBtn = document.querySelector(`.pg-move-btn[data-move="${moveId}"]`);
    if (selBtn) {
      if (moveId === pg.currentCmd.id) selBtn.classList.add("correct");
      else selBtn.classList.add("wrong");
    }

    if (moveId === pg.currentCmd.id) {
      handleCorrectResponse();
    } else {
      const wrongCmd = ALL_COMMANDS.find(c => c.id === moveId);
      handleWrongResponse(`Incorrect! "${pg.currentCmd.exec}" requires "${pg.currentCmd.label}", not "${wrongCmd ? wrongCmd.label : moveId}".`);
    }
  }

  function handleCorrectResponse() {
    stopTiming();
    const bonus = timingBonus();
    const earnedXp = Math.round(pg.currentCmd.xp * bonus);
    pg.score += earnedXp;
    pg.correct++;
    pg.streak++;
    if (pg.streak > pg.bestStreak) pg.bestStreak = pg.streak;
    pg.round++;

    state.xp += earnedXp;
    state.totalAttempts = (state.totalAttempts || 0) + 1;
    state.streak = pg.streak;
    if (pg.streak > state.bestStreak) state.bestStreak = pg.streak;
    saveState();
    saveParadeStats();

    // Update cadet/colour visual state
    if (pg.currentCmd.type === "arms") {
      pg.cadetState = pg.currentCmd.move;
    } else {
      pg.colourState = pg.currentCmd.move;
    }
    renderParadeGround();
    updateColourStatus();

    const fb = document.getElementById("pgFeedback");
    if (fb) {
      const bonusText = bonus > 1 ? ` <span style="color:var(--gold-bright)">⚡ ${Math.round((bonus - 1) * 100)}% speed bonus!</span>` : bonus < 1 ? ` <span style="color:var(--amber)">Slow response — reduced XP</span>` : "";
      fb.className = "pg-feedback ok";
      fb.innerHTML = `✅ Correct! <strong>${pg.currentCmd.exec}</strong> → <strong>${pg.currentCmd.label}</strong>. +${earnedXp} XP${bonusText}. Streak: ${pg.streak}`;
    }

    updateParadeStats();
    updateParadeStatsSync();
    toast("ok", `✅ Correct! +${earnedXp} XP`);

    const nextBtn = document.getElementById("pgNextBtn");
    if (nextBtn) nextBtn.disabled = false;

    // In sequence mode, advance to next command
    if (pg.sequenceMode && pg.sequenceStep < pg.sequence.length - 1) {
      pg.sequenceStep++;
      updateComplimentList();
      setTimeout(() => {
        const nextCmd = ALL_COMMANDS.find(c => c.id === pg.sequence[pg.sequenceStep]);
        if (nextCmd) callCommand(nextCmd);
      }, 1500);
    } else if (pg.sequenceMode) {
      // Sequence complete
      const bonusXp = pg.sequence.length * 5;
      const fb2 = document.getElementById("pgFeedback");
      if (fb2) {
        fb2.className = "pg-feedback ok";
        fb2.innerHTML = `🏆 Compliment complete! All ${pg.sequence.length} movements executed correctly. Sequence bonus: +${bonusXp} XP`;
      }
      state.xp += bonusXp;
      pg.compliments++;
      saveState();
      saveParadeStats();
      updateParadeStats();
      toast("ok", `🏆 General Salute compliment complete! +${bonusXp} XP bonus`);
      pg.sequenceMode = false;
      pg.sequence = [];
      pg.sequenceStep = 0;
      updateComplimentList();
      const banner = document.getElementById("pgModeBanner");
      if (banner) banner.classList.remove("show");
      const seqBtn = document.getElementById("pgSequenceBtn");
      if (seqBtn) seqBtn.textContent = "🎖️ General Salute";
    }
  }

  function handleWrongResponse(msg) {
    stopTiming();
    pg.wrong++;
    pg.streak = 0;
    pg.round++;
    state.totalAttempts = (state.totalAttempts || 0) + 1;
    state.wrongAttempts = (state.wrongAttempts || 0) + 1;
    state.streak = 0;
    saveState();
    saveParadeStats();

    // Flash the squad
    const prevState = pg.cadetState;
    pg.cadetState = "error-flash";
    renderParadeGround();
    setTimeout(() => { pg.cadetState = prevState; renderParadeGround(); }, 600);

    const fb = document.getElementById("pgFeedback");
    if (fb) {
      fb.className = "pg-feedback err";
      fb.innerHTML = `❌ ${msg} Streak reset. The correct response was <strong>${pg.currentCmd.label}</strong>.`;
    }

    updateParadeStats();
    updateParadeStatsSync();
    toast("err", "❌ Incorrect! Streak reset.");

    const nextBtn = document.getElementById("pgNextBtn");
    if (nextBtn) nextBtn.disabled = false;

    if (pg.sequenceMode) {
      pg.sequenceMode = false;
      pg.sequence = [];
      pg.sequenceStep = 0;
      updateComplimentList();
      const banner = document.getElementById("pgModeBanner");
      if (banner) banner.classList.remove("show");
      const seqBtn = document.getElementById("pgSequenceBtn");
      if (seqBtn) seqBtn.textContent = "🎖️ General Salute";
      const fb2 = document.getElementById("pgFeedback");
      if (fb2) fb2.innerHTML += ` Compliment aborted due to error.`;
    }
  }

  function updateParadeStatsSync() {
    renderSidebar();
    renderTopStats();
    renderAnalysis();
  }

  // Start a new drill round
  function startDrill() {
    pg.active = true;
    pg.streak = 0;
    startCadence();
    pg.cadetState = "shoulder";
    pg.colourState = "carry";
    renderParadeGround();
    updateColourStatus();

    const fb = document.getElementById("pgFeedback");
    if (fb) {
      fb.className = "pg-feedback info";
      fb.textContent = "Parade commenced! The commander will call commands. Respond quickly for bonus XP.";
    }

    const startBtn = document.getElementById("pgStartBtn");
    if (startBtn) startBtn.disabled = true;

    setTimeout(() => nextCommand(), 1200);
  }

  // Pick and call the next random command
  function nextCommand() {
    if (!pg.active) return;
    const nextBtn = document.getElementById("pgNextBtn");
    if (nextBtn) nextBtn.disabled = true;

    let cmd;
    do {
      cmd = ALL_COMMANDS[Math.floor(Math.random() * ALL_COMMANDS.length)];
    } while (pg.currentCmd && cmd.id === pg.currentCmd.id && ALL_COMMANDS.length > 1);

    callCommand(cmd);
  }

  // Start the General Salute compliment sequence
  function startGeneralSalute() {
    if (pg.sequenceMode) {
      toast("info", "Already in compliment sequence mode.");
      return;
    }

    pg.sequenceMode = true;
    pg.sequence = SALUTE_SEQUENCE.map(s => s.cmdId);
    pg.sequenceStep = 0;

    if (!pg.active) {
      startCadence();
      pg.active = true;
      pg.cadetState = "shoulder";
      pg.colourState = "carry";
      renderParadeGround();
      updateColourStatus();
    }

    const banner = document.getElementById("pgModeBanner");
    if (banner) banner.classList.add("show");
    const seqBtn = document.getElementById("pgSequenceBtn");
    if (seqBtn) seqBtn.disabled = true;

    const fb = document.getElementById("pgFeedback");
    if (fb) {
      fb.className = "pg-feedback info";
      fb.innerHTML = `🎖️ <strong>General Salute!</strong> Execute each movement in the correct 201 sequence: Present Arms → Let Fly the Colour → Catch the Colour → Shoulder Arms. Complete all four for a bonus!`;
    }

    updateComplimentList();

    const startBtn = document.getElementById("pgStartBtn");
    if (startBtn) startBtn.disabled = true;
    const nextBtn = document.getElementById("pgNextBtn");
    if (nextBtn) nextBtn.disabled = true;

    // Call the first command in the sequence
    setTimeout(() => {
      const firstCmd = ALL_COMMANDS.find(c => c.id === pg.sequence[0]);
      if (firstCmd) callCommand(firstCmd);
    }, 1000);
  }

  // Reset the parade game
  function resetParadeGame() {
    stopCadence();
    stopTiming();
    pg.active = false;
    pg.currentCmd = null;
    pg.selectedMove = null;
    pg.streak = 0;
    pg.sequenceMode = false;
    pg.sequence = [];
    pg.sequenceStep = 0;
    pg.cadetState = "shoulder";
    pg.colourState = "carry";

    const cautEl = document.getElementById("pgCmdCautionary");
    const execEl = document.getElementById("pgCmdExecutive");
    const typeEl = document.getElementById("pgCmdType");
    if (cautEl) cautEl.textContent = "—";
    if (execEl) { execEl.textContent = "Awaiting command…"; execEl.classList.remove("flash"); }
    if (typeEl) typeEl.style.display = "none";

    const fb = document.getElementById("pgFeedback");
    if (fb) {
      fb.className = "pg-feedback info";
      fb.innerHTML = `Press <strong>Start Parade</strong> to begin. The commander will call commands — select the correct movement for each.`;
    }

    const startBtn = document.getElementById("pgStartBtn");
    if (startBtn) startBtn.disabled = false;
    const nextBtn = document.getElementById("pgNextBtn");
    if (nextBtn) nextBtn.disabled = true;
    const seqBtn = document.getElementById("pgSequenceBtn");
    if (seqBtn) { seqBtn.disabled = false; seqBtn.textContent = "🎖️ General Salute"; }

    const banner = document.getElementById("pgModeBanner");
    if (banner) banner.classList.remove("show");

    document.querySelectorAll(".pg-move-btn").forEach(btn => {
      btn.disabled = true;
      btn.classList.remove("correct", "wrong");
    });

    renderParadeGround();
    updateColourStatus();
    renderBeatDots(-1);
    updateComplimentList();
    updateParadeStats();
    toast("info", "Parade Ground reset.");
  }

  // Modal
  function pgShowModal() { const o = document.getElementById("pgModalOverlay"); if (o) o.style.display = "flex"; }
  function pgHideModal() { const o = document.getElementById("pgModalOverlay"); if (o) o.style.display = "none"; }

  // Main render function for the Parade Ground section
  function renderParadeGame() {
    loadParadeStats();
    renderParadeGround();
    renderMoveButtons();
    renderBeatDots(-1);
    updateParadeStats();
    updateColourStatus();
    updateComplimentList();

    const startBtn = document.getElementById("pgStartBtn");
    if (startBtn && !startBtn.dataset.bound) {
      startBtn.addEventListener("click", startDrill);
      startBtn.dataset.bound = "1";
    }
    const nextBtn = document.getElementById("pgNextBtn");
    if (nextBtn && !nextBtn.dataset.bound) {
      nextBtn.addEventListener("click", nextCommand);
      nextBtn.dataset.bound = "1";
    }
    const seqBtn = document.getElementById("pgSequenceBtn");
    if (seqBtn && !seqBtn.dataset.bound) {
      seqBtn.addEventListener("click", startGeneralSalute);
      seqBtn.dataset.bound = "1";
    }
    const resetBtn = document.getElementById("pgResetBtn");
    if (resetBtn && !resetBtn.dataset.bound) {
      resetBtn.addEventListener("click", resetParadeGame);
      resetBtn.dataset.bound = "1";
    }
    const howBtn = document.getElementById("pgHowBtn");
    if (howBtn && !howBtn.dataset.bound) {
      howBtn.addEventListener("click", pgShowModal);
      howBtn.dataset.bound = "1";
    }
    const modalClose = document.getElementById("pgModalClose");
    if (modalClose && !modalClose.dataset.bound) {
      modalClose.addEventListener("click", pgHideModal);
      modalClose.dataset.bound = "1";
    }
    const ov = document.getElementById("pgModalOverlay");
    if (ov && !ov.dataset.bound) {
      ov.addEventListener("click", function (e) { if (e.target === ov) pgHideModal(); });
      ov.dataset.bound = "1";
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
    if (name === "parade") renderParadeGame();
    if (name === "learn") renderLearn();
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
    ico.textContent = kind === "ok" ? "✅" : kind === "warn" ? "⚠️" : kind === "err" ? "❌" : "ℹ️";
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
    try { trMutate(ARMS_COMMANDS); } catch(e) {}
    try { trMutate(COLOUR_COMMANDS); } catch(e) {}
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(SALUTE_SEQUENCE); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(cadets); } catch(e) {}
    try { trMutate(labels); } catch(e) {}
    try { trMutate(sliderValue); } catch(e) {}
    try { trMutate(statusMap); } catch(e) {}
    try { trMutate(toggleState); } catch(e) {}
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
    const deepSection = params.get("section");

    loadParadeStats();
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
    renderParadeGame();

    if (deepSection) {
      switchSection(deepSection);
    }
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
