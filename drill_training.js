/* ============================================================
   DRILL & PARADE TRAINING COMMAND — drill_training.js
   Parade Square: hands-on first-year cadet drill simulator
   Maple Defender-style dashboard engine (IIFE architecture)
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "drillTrainingProgress",
    sitreps: "drillTrainingSitreps",
    wrongAttempts: "drillTrainingWrongAttempts",
    streak: "drillTrainingStreak",
    bestStreak: "drillTrainingBestStreak",
    readArticles: "drillTrainingReadArticles",
    paradeGame: "drillTrainingParadeGame"
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const DRILL_BADGE_ID = 2;

  // ==========================================================
  // RANK LADDER (Drill progression ranks)
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Drill Recruit",        icon: "🎖️",  xp: 0,    callsign: "PARADE-1" },
    { id: 1, name: "Drill Cadet",          icon: "🪖",  xp: 300,  callsign: "DRILL-2" },
    { id: 2, name: "Senior Drill Cadet",   icon: "⭐",  xp: 700,  callsign: "SENIOR-3" },
    { id: 3, name: "Drill Instructor Cadet", icon: "🏅", xp: 1200, callsign: "INSTR-4" },
    { id: 4, name: "Parade Commander Cadet", icon: "👑", xp: 1800, callsign: "CMDR-5" },
    { id: 5, name: "Drill Master Cadet",   icon: "🏆",  xp: 2500, callsign: "MASTER-6" }
  ];

  // ==========================================================
  // TOOLS (drill-square tools cadets must "open")
  // ==========================================================
  const TOOLS = [
    { id: "footdiagram",  icon: "🦶",  label: "Foot Diagram" },
    { id: "turncompass",  icon: "🧭",  label: "Turn Compass" },
    { id: "cadence",      icon: "⏱️", label: "Cadence Metronome" },
    { id: "alignment",    icon: "📐",  label: "Squad Alignment" },
    { id: "salutepace",   icon: "🫡",  label: "Salute Pace Tracker" },
    { id: "formation",    icon: "🏟️", label: "Formation Diagram" },
    { id: "rankchart",    icon: "🎖️",  label: "Rank Chart" },
    { id: "headdress",    icon: "🪖",  label: "Headdress Guide" },
    { id: "paradeorder",  icon: "📋",  label: "Parade Order" },
    { id: "inspection",   icon: "🔍",  label: "Inspection Checklist" },
    { id: "commandcard",  icon: "📢",  label: "Command Card" },
    { id: "timingcard",   icon: "🔔",  label: "Timing Card" },
    { id: "positions",    icon: "🧍",  label: "Position Guide" }
  ];

  // ==========================================================
  // TRAINING MISSIONS — First-Year Drill across 3 Elements
  // Each mission has 4 hands-on tasks. Tool enforcement required.
  // ==========================================================
  const MISSIONS = [
    {
      id: "attention",
      order: 1,
      tag: "DRILL 01",
      icon: "🧍",
      title: "Position of Attention",
      desc: "Master the foundation of all drill — the position of attention.",
      xp: 100,
      brief: "Your drill instructor is putting the squad through the position of attention. This is the foundation of every drill movement. Get it wrong and everything that follows will be sloppy. Heels together, feet at 30°, body balanced, arms straight, head upright and eyes level.",
      scene: "attention",
      chapters: [
        { title: "Heel Position", desc: "Heels together and in line." },
        { title: "Foot Angle", desc: "Feet turned out 30°." },
        { title: "Body Balance", desc: "Weight even, body balanced." },
        { title: "Arms & Head", desc: "Arms straight, head upright, eyes level." }
      ],
      tasks: [
        {
          type: "select", tool: "footdiagram",
          title: "Position the Heels",
          prompt: "Open the Foot Diagram and select the correct heel position for attention.",
          options: [
            "Heels together and in line",
            "Heels shoulder-width apart",
            "Left heel ahead of the right",
            "Heels apart at a comfortable distance"
          ],
          expected: "Heels together and in line",
          proof: "Heels together and in line — the base of the position of attention."
        },
        {
          type: "select", tool: "footdiagram",
          title: "Set the Foot Angle",
          prompt: "What angle should the feet be turned out from the centre line?",
          options: ["30°", "45°", "15°", "90°"],
          expected: "30°",
          proof: "Feet turned out 30° — the standard angle that gives a balanced, natural stance."
        },
        {
          type: "select", tool: "positions",
          title: "Distribute Body Weight",
          prompt: "How should the body weight be distributed in the position of attention?",
          options: [
            "Evenly on both feet, body balanced and upright",
            "Mostly on the right foot for stability",
            "Rocking forward onto the balls of the feet",
            "Leaning slightly back for comfort"
          ],
          expected: "Evenly on both feet, body balanced and upright",
          proof: "Weight even on both feet, body balanced — the foundation of a steady, alert position."
        },
        {
          type: "note", tool: "footdiagram",
          title: "Describe Arms, Head & Eyes",
          prompt: "Write a note describing the position of the arms, head, and eyes at attention. Include the keywords 'arms straight', 'head upright', and 'eyes level'.",
          keywords: ["arms straight", "head upright", "eyes level"],
          proof: "Arms straight, hands lightly clenched, head upright, eyes level — the complete position of attention. Mission complete."
        }
      ]
    },
    {
      id: "stands",
      order: 2,
      tag: "DRILL 02",
      icon: "🧍",
      title: "Stand at Ease & Stand Easy",
      desc: "Learn the two intermediate relaxation positions from attention.",
      xp: 100,
      brief: "After attention, the squad must learn to stand at ease and stand easy. These are the relaxation positions used between drill movements. Stand at ease is a formal rest; stand easy allows further relaxation. Both must be executed smartly on command.",
      scene: "stands",
      chapters: [
        { title: "Stand at Ease", desc: "From attention, move the left foot and clasp hands behind the back." },
        { title: "Foot Movement", desc: "Left foot moves 25 cm to the left." },
        { title: "Stand Easy", desc: "From stand at ease, relax further." },
        { title: "Return to Attention", desc: "Spring back to attention on command." }
      ],
      tasks: [
        {
          type: "select", tool: "footdiagram",
          title: "Execute Stand at Ease",
          prompt: "On the command 'Stand at ease', what is the correct foot movement?",
          options: [
            "Move the left foot 25 cm to the left",
            "Move the right foot 25 cm to the right",
            "Keep both feet planted and bend the knees",
            "Step forward with the left foot"
          ],
          expected: "Move the left foot 25 cm to the left",
          proof: "Left foot moves 25 cm to the left — the first movement of stand at ease."
        },
        {
          type: "select", tool: "positions",
          title: "Position the Hands",
          prompt: "Where are the hands placed in the stand at ease position?",
          options: [
            "Clasped behind the back, right hand over left",
            "On the hips",
            "Hanging loosely at the sides",
            "Crossed in front of the body"
          ],
          expected: "Clasped behind the back, right hand over left",
          proof: "Hands clasped behind the back, right over left — the formal rest position."
        },
        {
          type: "toggle", tool: "positions",
          title: "Execute Stand Easy",
          prompt: "From stand at ease, enable the transition to stand easy — the squad may relax further, close the hands, and adopt a more relaxed posture while remaining in place.",
          expected: true,
          proof: "Stand easy executed — further relaxation allowed while remaining in position."
        },
        {
          type: "note", tool: "positions",
          title: "Return to Attention",
          prompt: "Write a note describing how the squad returns to attention from stand easy. Include the keywords 'spring', 'attention', and 'heels together'.",
          keywords: ["spring", "attention", "heels together"],
          proof: "On the command 'Squad', the squad springs to attention — heels together, feet at 30°. Stands mission complete."
        }
      ]
    },
    {
      id: "turns",
      order: 3,
      tag: "DRILL 03",
      icon: "🧭",
      title: "Turns at the Halt",
      desc: "Execute right turn, left turn, about turn, and inclines with correct pivots.",
      xp: 100,
      brief: "The squad is now learning turns at the halt. Each turn has a specific pivot point — right turn pivots on the right heel and left toe, left turn pivots on the left heel and right toe, and the about turn is a 180° turn. Inclines are 45° turns. Precision is everything.",
      scene: "turns",
      chapters: [
        { title: "Right Turn", desc: "90° right, pivot on right heel and left toe." },
        { title: "Left Turn", desc: "90° left, pivot on left heel and right toe." },
        { title: "About Turn", desc: "180° turn to the right." },
        { title: "Inclines", desc: "45° right or left incline." }
      ],
      tasks: [
        {
          type: "select", tool: "turncompass",
          title: "Execute the Right Turn",
          prompt: "On the command 'Right turn', what is the correct pivot for a 90° turn to the right?",
          options: [
            "Pivot on the right heel and left toe",
            "Pivot on the left heel and right toe",
            "Pivot on both heels",
            "Pivot on the balls of both feet"
          ],
          expected: "Pivot on the right heel and left toe",
          proof: "Right turn: pivot on the right heel and left toe — 90° to the right."
        },
        {
          type: "select", tool: "turncompass",
          title: "Execute the Left Turn",
          prompt: "On the command 'Left turn', what is the correct pivot for a 90° turn to the left?",
          options: [
            "Pivot on the left heel and right toe",
            "Pivot on the right heel and left toe",
            "Pivot on the left toe only",
            "Pivot on the right heel only"
          ],
          expected: "Pivot on the left heel and right toe",
          proof: "Left turn: pivot on the left heel and right toe — 90° to the left."
        },
        {
          type: "select", tool: "turncompass",
          title: "Execute the About Turn",
          prompt: "What degree of turn is executed on the command 'About turn'?",
          options: ["180° to the right", "90° to the right", "180° to the left", "360° full circle"],
          expected: "180° to the right",
          proof: "About turn: 180° to the right — the squad now faces the opposite direction."
        },
        {
          type: "note", tool: "turncompass",
          title: "Execute the Right Incline",
          prompt: "Write a note describing the right incline and its degree of turn. Include the keywords '45°', 'right', and 'incline'.",
          keywords: ["45", "right", "incline"],
          proof: "Right incline: 45° to the right — a half turn used for slight directional changes. Turns mission complete."
        }
      ]
    },
    {
      id: "marching",
      order: 4,
      tag: "DRILL 04",
      icon: "🚶",
      title: "Marching in Quick Time",
      desc: "Step off, maintain cadence, and swing the arms correctly in quick time.",
      xp: 100,
      brief: "The squad is learning to march in quick time. The first pace is 35 cm, subsequent paces are 75 cm, and the arms swing waist-high. Cadence is 116 beats per minute. Marching is the most visible drill skill — get the timing and arm swing right and the squad looks sharp.",
      scene: "marching",
      chapters: [
        { title: "First Pace", desc: "Step off with a 35 cm pace." },
        { title: "Standard Pace", desc: "Maintain 75 cm subsequent paces." },
        { title: "Arm Swing", desc: "Swing arms waist-high, front and rear." },
        { title: "Cadence", desc: "March at 116 beats per minute." }
      ],
      tasks: [
        {
          type: "select", tool: "footdiagram",
          title: "Execute the First Pace",
          prompt: "On the command 'Quick march', how long is the first pace?",
          options: ["35 cm", "75 cm", "50 cm", "100 cm"],
          expected: "35 cm",
          proof: "First pace is 35 cm — a half-pace that starts the march smoothly."
        },
        {
          type: "select", tool: "footdiagram",
          title: "Maintain the Standard Pace",
          prompt: "What is the length of each subsequent pace in quick time?",
          options: ["75 cm", "35 cm", "60 cm", "90 cm"],
          expected: "75 cm",
          proof: "Standard pace is 75 cm — the regulation marching pace in quick time."
        },
        {
          type: "select", tool: "cadence",
          title: "Swing the Arms",
          prompt: "How high should the arms swing when marching in quick time?",
          options: [
            "Waist-high, front and rear",
            "Chest-high, front only",
            "Shoulder-high, both directions",
            "Arms kept straight at the sides"
          ],
          expected: "Waist-high, front and rear",
          proof: "Arms swing waist-high, front and rear — the standard arm swing for quick march."
        },
        {
          type: "select", tool: "cadence",
          title: "Match the Cadence",
          prompt: "What is the standard cadence for marching in quick time?",
          options: ["116 beats per minute", "100 beats per minute", "140 beats per minute", "80 beats per minute"],
          expected: "116 beats per minute",
          proof: "Cadence is 116 BPM — the standard quick-time marching rhythm. Marching mission complete."
        }
      ]
    },
    {
      id: "halting",
      order: 5,
      tag: "DRILL 05",
      icon: "⏱️",
      title: "Halting from Quick March",
      desc: "Halt the squad in three timed movements from quick time.",
      xp: 100,
      brief: "The squad is marching in quick time and the instructor calls 'Squad, halt'. The halt is executed in three movements with specific timing. A smart halt keeps the squad aligned and balanced. The timing 'one, one-two' governs the three movements.",
      scene: "halting",
      chapters: [
        { title: "Command", desc: "The executive command 'halt' is given." },
        { title: "First Movement", desc: "Complete one more pace then plant the foot." },
        { title: "Second & Third", desc: "Bring the other foot in and assume attention." },
        { title: "Timing", desc: "Execute in the rhythm 'one, one-two'." }
      ],
      tasks: [
        {
          type: "select", tool: "cadence",
          title: "Respond to the Halt Command",
          prompt: "On the command 'Squad, halt' while marching, what happens first?",
          options: [
            "Complete one more pace, then plant the foot",
            "Stop immediately on the current foot",
            "Take two more paces then stop",
            "Jump to a halt on both feet"
          ],
          expected: "Complete one more pace, then plant the foot",
          proof: "One more pace is completed, then the foot is planted — the first movement of the halt."
        },
        {
          type: "select", tool: "cadence",
          title: "Execute the Second Movement",
          prompt: "After planting the foot, what is the second movement of the halt?",
          options: [
            "Bring the other foot in to meet the planted foot",
            "Lift the planted foot and step back",
            "Bend the knees and lower the body",
            "Swing the arms to the sides"
          ],
          expected: "Bring the other foot in to meet the planted foot",
          proof: "The other foot comes in to meet the planted foot — heels together, attention position."
        },
        {
          type: "select", tool: "cadence",
          title: "Identify the Halt Timing",
          prompt: "What is the timing rhythm for the three movements of the halt?",
          options: ["One, one-two", "One-two-three", "One-two, one", "One, two, three"],
          expected: "One, one-two",
          proof: "Timing is 'one, one-two' — the three-movement halt rhythm in quick time."
        },
        {
          type: "note", tool: "cadence",
          title: "Confirm the Final Position",
          prompt: "Write a note describing the final position after the halt and why timing matters. Include the keywords 'attention', 'heels together', and 'timing'.",
          keywords: ["attention", "heels together", "timing"],
          proof: "Final position is attention — heels together, feet at 30°. Correct timing keeps the squad aligned. Halting mission complete."
        }
      ]
    },
    {
      id: "marktime",
      order: 6,
      tag: "DRILL 06",
      icon: "🚶",
      title: "Mark Time, Forward & Halt",
      desc: "March on the spot, resume forward, and halt — all at the same cadence.",
      xp: 100,
      brief: "The squad is marching and needs to mark time (march on the spot), then move forward again, and halt. Mark time keeps the cadence but the feet do not move forward — they come up and down on the spot. All three movements maintain the same 116 BPM cadence.",
      scene: "marktime",
      chapters: [
        { title: "Mark Time", desc: "March on the spot, feet alternating up and down." },
        { title: "Cadence", desc: "Maintain 116 BPM while marking time." },
        { title: "Forward", desc: "Resume marching forward on command." },
        { title: "Halt", desc: "Halt from mark time using the standard procedure." }
      ],
      tasks: [
        {
          type: "select", tool: "cadence",
          title: "Execute Mark Time",
          prompt: "On the command 'Mark time', what do the feet do?",
          options: [
            "Alternate up and down on the spot without moving forward",
            "Take small steps forward",
            "Stop completely and stand still",
            "Step side to side"
          ],
          expected: "Alternate up and down on the spot without moving forward",
          proof: "Feet alternate up and down on the spot — marking time keeps the cadence without advancing."
        },
        {
          type: "select", tool: "cadence",
          title: "Maintain the Cadence",
          prompt: "What cadence is maintained while marking time?",
          options: ["116 beats per minute — same as quick march", "80 beats per minute — slower", "140 beats per minute — faster", "No fixed cadence"],
          expected: "116 beats per minute — same as quick march",
          proof: "Cadence stays at 116 BPM — the same rhythm as quick march, just on the spot."
        },
        {
          type: "toggle", tool: "cadence",
          title: "Resume Forward March",
          prompt: "On the command 'Forward', enable the squad to resume marching forward from mark time — stepping off with the same cadence and pace length.",
          expected: true,
          proof: "Squad resumes forward march — same cadence, same 75 cm pace. Smooth transition from mark time."
        },
        {
          type: "note", tool: "cadence",
          title: "Halt from Mark Time",
          prompt: "Write a note describing how to halt from mark time and how it differs from halting while marching forward. Include the keywords 'mark time', 'halt', and 'spot'.",
          keywords: ["mark time", "halt", "spot"],
          proof: "To halt from mark time, stop the feet and assume attention — no extra pace needed since you are already on the spot. Mark time mission complete."
        }
      ]
    },
    {
      id: "saluting",
      order: 7,
      tag: "DRILL 07",
      icon: "🫡",
      title: "Saluting — To Front, Flank & On the March",
      desc: "Execute the salute to the front, to the flank, and while marching.",
      xp: 100,
      brief: "An officer is approaching the squad. Cadets must know when and how to salute — to the front at the halt, to the flank, and while marching. The salute on the march begins 5 paces before the officer and is completed 1 pace past. Timing and form are critical to showing proper respect.",
      scene: "saluting",
      chapters: [
        { title: "Salute to Front", desc: "Salute at the halt, to the front." },
        { title: "Salute to Flank", desc: "Salute to the right or left at the halt." },
        { title: "Salute on March", desc: "Salute while marching — 5 paces before to 1 pace past." },
        { title: "Return to Attention", desc: "Return smartly to attention after the salute." }
      ],
      tasks: [
        {
          type: "select", tool: "salutepace",
          title: "Execute the Salute to the Front",
          prompt: "How is the salute to the front executed at the halt?",
          options: [
            "Right hand to the headdress, palm forward, fingers extended, held briefly then returned",
            "Left hand raised to shoulder height",
            "A nod of the head while at attention",
            "Both hands brought to the chest"
          ],
          expected: "Right hand to the headdress, palm forward, fingers extended, held briefly then returned",
          proof: "Salute to the front: right hand, palm forward, fingers extended — held briefly then returned smartly."
        },
        {
          type: "select", tool: "headdress",
          title: "Determine When to Salute",
          prompt: "When is a salute the proper compliment (as opposed to just standing at attention)?",
          options: [
            "When wearing headdress",
            "When not wearing headdress",
            "Always, regardless of headdress",
            "Only when indoors"
          ],
          expected: "When wearing headdress",
          proof: "Salute when wearing headdress — without headdress, stand at attention as the compliment."
        },
        {
          type: "select", tool: "salutepace",
          title: "Salute on the March — Timing",
          prompt: "When saluting on the march, when should the salute begin and end relative to the officer?",
          options: [
            "5 paces before the officer to 1 pace past",
            "3 paces before to 3 paces past",
            "When directly in front of the officer only",
            "10 paces before to 5 paces past"
          ],
          expected: "5 paces before the officer to 1 pace past",
          proof: "Salute on the march: 5 paces before to 1 pace past — the standard timing for a marching salute."
        },
        {
          type: "note", tool: "salutepace",
          title: "Return to Attention",
          prompt: "Write a note describing how the squad returns to attention after saluting and why the salute shows respect. Include the keywords 'attention', 'respect', and 'officer'.",
          keywords: ["attention", "respect", "officer"],
          proof: "After the salute, the hand returns smartly to the side and the cadet resumes attention. The salute shows respect to the officer's rank. Saluting mission complete."
        }
      ]
    },
    {
      id: "dressing",
      order: 8,
      tag: "DRILL 08",
      icon: "📐",
      title: "Dressing a Squad",
      desc: "Dress the squad to the right with three movements and eyes front.",
      xp: 100,
      brief: "The squad has finished a movement and needs to be realigned. Dressing a squad ensures everyone is in correct alignment and covering. The right dress is the most common — the squad dresses to the right-hand person in three movements, then the instructor calls 'Eyes front' to return.",
      scene: "dressing",
      chapters: [
        { title: "Right Dress", desc: "The command 'Right dress' is given." },
        { title: "First Movement", desc: "Squad turns heads and eyes to the right." },
        { title: "Alignment", desc: "Each cadet aligns with the person to their right." },
        { title: "Eyes Front", desc: "On 'Eyes front', heads return to the front." }
      ],
      tasks: [
        {
          type: "select", tool: "alignment",
          title: "Respond to Right Dress",
          prompt: "On the command 'Right dress', what is the first movement?",
          options: [
            "The squad turns heads and eyes to the right",
            "The squad takes a step to the right",
            "The squad marches forward",
            "The squad stands at ease"
          ],
          expected: "The squad turns heads and eyes to the right",
          proof: "First movement of right dress — heads and eyes turn to the right to find the alignment."
        },
        {
          type: "select", tool: "alignment",
          title: "Align the Squad",
          prompt: "How does each cadet achieve correct alignment during the right dress?",
          options: [
            "Each cadet aligns with the person to their right, adjusting position and covering",
            "Each cadet stands still and waits",
            "The squad moves as a block to the right",
            "Only the front rank moves"
          ],
          expected: "Each cadet aligns with the person to their right, adjusting position and covering",
          proof: "Each cadet aligns with the person to their right — correct dressing and covering achieved."
        },
        {
          type: "select", tool: "alignment",
          title: "Execute Eyes Front",
          prompt: "On the command 'Eyes front', what does the squad do?",
          options: [
            "Return heads and eyes sharply to the front",
            "Turn heads to the left",
            "Stand at ease",
            "Begin marching"
          ],
          expected: "Return heads and eyes sharply to the front",
          proof: "Eyes front — heads and eyes return sharply to the front, completing the dressing."
        },
        {
          type: "note", tool: "alignment",
          title: "Explain Why Dressing Matters",
          prompt: "Write a note explaining why dressing a squad is important for parade discipline. Include the keywords 'alignment', 'covering', and 'discipline'.",
          keywords: ["alignment", "covering", "discipline"],
          proof: "Dressing ensures correct alignment and covering — the squad looks uniform and disciplined. Dressing mission complete."
        }
      ]
    },
    {
      id: "openclose",
      order: 9,
      tag: "DRILL 09",
      icon: "🏟️",
      title: "Open & Close Order March",
      desc: "Open and close the order between ranks for inspection and parade.",
      xp: 100,
      brief: "The squad is formed in two ranks (rows) and needs to open order for inspection. Open order march creates space between the ranks so the inspecting officer can walk between them. Close order march brings them back together. These movements are essential for parade inspection procedures.",
      scene: "openclose",
      chapters: [
        { title: "Open Order", desc: "The command 'Open order march' is given." },
        { title: "Rear Rank", desc: "Rear rank steps back to create space." },
        { title: "Inspection Spacing", desc: "Correct distance between ranks for inspection." },
        { title: "Close Order", desc: "Close order march returns ranks to normal spacing." }
      ],
      tasks: [
        {
          type: "select", tool: "formation",
          title: "Execute Open Order March",
          prompt: "On the command 'Open order march', what does the rear rank do?",
          options: [
            "Steps back to create space between the ranks",
            "Steps forward to close up",
            "Turns to the right",
            "Stands at ease"
          ],
          expected: "Steps back to create space between the ranks",
          proof: "Rear rank steps back — space created between ranks for inspection."
        },
        {
          type: "select", tool: "formation",
          title: "Determine Inspection Spacing",
          prompt: "Why is open order used before an inspection?",
          options: [
            "So the inspecting officer can walk between the ranks",
            "To make the squad look bigger",
            "To give cadets more room to relax",
            "To change the formation shape"
          ],
          expected: "So the inspecting officer can walk between the ranks",
          proof: "Open order creates space for the inspecting officer to walk between ranks — proper inspection spacing."
        },
        {
          type: "toggle", tool: "formation",
          title: "Execute Close Order March",
          prompt: "On the command 'Close order march', enable the rear rank to step forward and return to normal spacing.",
          expected: true,
          proof: "Close order march — rear rank steps forward, normal spacing restored."
        },
        {
          type: "note", tool: "formation",
          title: "Confirm the Procedure",
          prompt: "Write a note describing the open and close order procedure and when each is used during a parade. Include the keywords 'open order', 'close order', and 'inspection'.",
          keywords: ["open order", "close order", "inspection"],
          proof: "Open order for inspection, close order to return — the standard parade spacing procedure. Open & close order mission complete."
        }
      ]
    },
    {
      id: "parade",
      order: 10,
      tag: "DRILL 10",
      icon: "🎪",
      title: "Parade Procedures & Formations",
      desc: "Form up, march past, undergo inspection, and dismiss the squad.",
      xp: 100,
      brief: "Final mission. The squad is on the parade square for a full parade. You must form up the squad, conduct the march-past, undergo inspection, and finally dismiss the squad. This combines every drill skill learned so far into one complete parade procedure. Show what you have learned, Cadet.",
      scene: "parade",
      chapters: [
        { title: "Form Up", desc: "Squad forms up in the correct formation on the square." },
        { title: "March Past", desc: "Squad marches past the reviewing officer in quick time." },
        { title: "Inspection", desc: "Squad undergoes inspection in open order." },
        { title: "Dismissal", desc: "Squad is dismissed correctly from the parade." }
      ],
      tasks: [
        {
          type: "select", tool: "formation",
          title: "Form Up the Squad",
          prompt: "How should the squad form up on the parade square?",
          options: [
            "In two ranks, dressed and covered, at attention, facing the reviewing officer",
            "Scattered in a loose group",
            "In a single file line",
            "In a circle formation"
          ],
          expected: "In two ranks, dressed and covered, at attention, facing the reviewing officer",
          proof: "Squad formed up in two ranks, dressed and covered, at attention — correct parade formation."
        },
        {
          type: "select", tool: "cadence",
          title: "Conduct the March Past",
          prompt: "During the march past, how does the squad move past the reviewing officer?",
          options: [
            "In quick time, at 116 BPM, with eyes right as they pass",
            "At a slow walk, looking straight ahead",
            "Running past in double time",
            "Standing still while the officer walks past"
          ],
          expected: "In quick time, at 116 BPM, with eyes right as they pass",
          proof: "March past in quick time — 116 BPM, eyes right as the squad passes the reviewing officer."
        },
        {
          type: "select", tool: "inspection",
          title: "Undergo Inspection",
          prompt: "How is the inspection conducted during the parade?",
          options: [
            "In open order, so the inspecting officer can walk between the ranks",
            "In close order, with ranks pressed together",
            "With the squad at stand easy",
            "With the squad dismissed from the square"
          ],
          expected: "In open order, so the inspecting officer can walk between the ranks",
          proof: "Inspection in open order — the inspecting officer walks between ranks checking dress and bearing."
        },
        {
          type: "note", tool: "paradeorder",
          title: "Dismiss the Squad",
          prompt: "Write a note describing how the squad is correctly dismissed from the parade and the full parade procedure. Include the keywords 'dismiss', 'parade', and 'attention'.",
          keywords: ["dismiss", "parade", "attention"],
          proof: "Squad dismissed from the parade — called to attention, given the dismissal command, and marched off. All 10 drill missions complete. Outstanding performance on the square, Cadet."
        }
      ]
    }
  ];

  // ==========================================================
  // LEARN LIBRARY ARTICLES
  // ==========================================================
  const LEARN_ARTICLES = [
    { id: "l_attention",      cat: "Positions",   icon: "🧍", title: "The Position of Attention",          desc: "Heels together, feet at 30°, body balanced, arms straight, head upright — the foundation of all drill.", xp: 15 },
    { id: "l_standat_ease",   cat: "Positions",   icon: "🧍", title: "Stand at Ease & Stand Easy",         desc: "Two relaxation positions: stand at ease (formal rest) and stand easy (further relaxation).", xp: 15 },
    { id: "l_right_turn",     cat: "Turns",       icon: "🧭", title: "Turns at the Halt",                  desc: "Right turn, left turn, about turn, and inclines — each with a specific pivot point.", xp: 15 },
    { id: "l_about_turn",     cat: "Turns",       icon: "🔄", title: "The About Turn",                    desc: "A 180° turn to the right — the squad faces the opposite direction.", xp: 15 },
    { id: "l_inclines",       cat: "Turns",       icon: "↪️", title: "Inclines — 45° Turns",               desc: "Right and left inclines are half-turns used for slight directional changes.", xp: 15 },
    { id: "l_quick_march",    cat: "Marching",    icon: "🚶", title: "Marching in Quick Time",             desc: "35 cm first pace, 75 cm standard, arms waist-high, 116 BPM — the marching standard.", xp: 15 },
    { id: "l_arm_swing",      cat: "Marching",    icon: "💪", title: "The Arm Swing",                     desc: "Arms swing waist-high, front and rear — the key to a sharp marching appearance.", xp: 15 },
    { id: "l_cadence",        cat: "Marching",    icon: "⏱️", title: "Cadence & Timing",                   desc: "116 beats per minute — the rhythm that keeps the squad in step.", xp: 15 },
    { id: "l_halting",        cat: "Marching",    icon: "⏱️", title: "Halting from Quick March",           desc: "Three movements, timing 'one, one-two' — a smart, balanced halt.", xp: 15 },
    { id: "l_mark_time",      cat: "Marching",    icon: "🚶", title: "Mark Time",                         desc: "Marching on the spot at the same 116 BPM cadence — feet up and down, no forward movement.", xp: 15 },
    { id: "l_salute_front",   cat: "Saluting",    icon: "🫡", title: "Saluting to the Front",             desc: "Right hand, palm forward, fingers extended — the salute at the halt.", xp: 15 },
    { id: "l_salute_march",   cat: "Saluting",    icon: "🫡", title: "Saluting on the March",              desc: "5 paces before the officer to 1 pace past — timing for a marching salute.", xp: 15 },
    { id: "l_headdress",      cat: "Saluting",    icon: "🪖", title: "Headdress & Compliments",            desc: "Salute when wearing headdress — without headdress, stand at attention.", xp: 15 },
    { id: "l_right_dress",    cat: "Dressing",    icon: "📐", title: "Dressing a Squad",                  desc: "Right dress in three movements, then eyes front — keeping the squad aligned.", xp: 15 },
    { id: "l_eyes_front",     cat: "Dressing",    icon: "👁️", title: "Eyes Front",                        desc: "Return heads and eyes sharply to the front after dressing.", xp: 15 },
    { id: "l_open_order",     cat: "Formations",  icon: "🏟️", title: "Open & Close Order March",           desc: "Open order for inspection, close order to return — spacing between ranks.", xp: 15 },
    { id: "l_two_ranks",      cat: "Formations",  icon: "👥", title: "Squad Formations",                  desc: "Two ranks, dressed and covered — the standard parade formation.", xp: 15 },
    { id: "l_march_past",     cat: "Parade",      icon: "🎪", title: "The March Past",                    desc: "Quick time, 116 BPM, eyes right — marching past the reviewing officer.", xp: 15 },
    { id: "l_inspection",     cat: "Parade",      icon: "🔍", title: "Parade Inspection",                 desc: "Open order, inspecting officer between ranks — checking dress and bearing.", xp: 15 },
    { id: "l_dismissal",      cat: "Parade",      icon: "📋", title: "Dismissing the Squad",              desc: "Attention, dismissal command, march off — the correct way to end a parade.", xp: 15 },
    { id: "l_sea_terms",      cat: "Cross-Element", icon: "⚓", title: "Sea Cadet Drill Terminology",     desc: "Naval terms: 'deck' for ground, 'division' for squad — Sea Cadet drill specifics.", xp: 15 },
    { id: "l_army_terms",     cat: "Cross-Element", icon: "🪖", title: "Army Cadet Drill Terminology",    desc: "Canadian Armed Forces drill manual (CFP 201) terms — the standard for all cadet drill.", xp: 15 },
    { id: "l_air_terms",      cat: "Cross-Element", icon: "✈️", title: "Air Cadet Drill Terminology",     desc: "ATC/RAF AP818 drill manual — Air Cadets use the same movements with ATC terminology.", xp: 15 },
    { id: "l_three_elements", cat: "Cross-Element", icon: "🎖️", title: "Drill Across All Three Elements", desc: "Sea, Army, and Air Cadets share the same core drill movements — only terminology differs.", xp: 15 }
  ];

  // ==========================================================
  // DRILL BADGES (auto-generated from MISSIONS)
  // ==========================================================
  const DRILL_BADGES = MISSIONS.map(m => ({
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
      paradeGame: { score: 0, correct: 0, wrong: 0, bestStreak: 0, rounds: 0 },
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
  // MAP PROGRESS SYNC — badge 2 on the quest map
  // ==========================================================
  function syncMapProgress() {
    try {
      const allDone = MISSIONS.every(m => state.completedMissions.includes(m.id));
      let mapProgress = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || "[]");
      if (allDone && !mapProgress.includes(DRILL_BADGE_ID)) {
        mapProgress.push(DRILL_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      } else if (!allDone && mapProgress.includes(DRILL_BADGE_ID)) {
        mapProgress = mapProgress.filter(id => id !== DRILL_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      }
    } catch (e) {}
  }

  // ==========================================================
  // SCENE SVG GENERATORS — Parade & drill themes (steel-blue/gold)
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
    const end = `</svg>`;
    const grad = (id, c1, c2) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;

    if (scene === "attention") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="300" cy="90" r="60" fill="none" stroke="#476b9f" stroke-width="1" opacity="0.3"/>
        <circle cx="300" cy="90" r="40" fill="none" stroke="#476b9f" stroke-width="1" opacity="0.2"/>
        <line x1="250" y1="150" x2="350" y2="150" stroke="#f5c84c" stroke-width="2"/>
        <polygon points="296,148 300,160 304,148" fill="#f5c84c"/>
        <line x1="300" y1="50" x2="300" y2="150" stroke="#2f4a73" stroke-width="1" stroke-dasharray="4 4" opacity="0.5"/>
        <circle cx="290" cy="148" r="4" fill="#f5c84c"/>
        <circle cx="310" cy="148" r="4" fill="#f5c84c"/>
        <path d="M 280 145 L 280 140 L 285 135 L 315 135 L 320 140 L 320 145" fill="none" stroke="#6b94d4" stroke-width="2"/>
        <circle cx="300" cy="80" r="8" fill="#6b94d4"/>
        <text x="220" y="165" fill="#f5c84c" font-size="9" font-family="monospace">L HEEL</text>
        <text x="365" y="165" fill="#f5c84c" font-size="9" font-family="monospace">R HEEL</text>
        <text x="300" y="40" fill="#6b94d4" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">POSITION OF ATTENTION</text>
        <text x="460" y="90" fill="#f5c84c" font-size="20" text-anchor="middle">🧍</text>
      ` + end;
    }
    if (scene === "stands") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="100" y="40" width="180" height="100" rx="6" fill="#101a2e" stroke="#476b9f"/>
        <text x="190" y="60" fill="#6b94d4" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">STAND AT EASE</text>
        <line x1="120" y1="70" x2="260" y2="70" stroke="#2f4a73"/>
        <text x="190" y="90" fill="#b0c4e0" font-size="9" font-family="monospace" text-anchor="middle">Left foot 25cm left</text>
        <text x="190" y="106" fill="#b0c4e0" font-size="9" font-family="monospace" text-anchor="middle">Hands behind back</text>
        <text x="190" y="122" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle">Right over left</text>
        <rect x="320" y="40" width="180" height="100" rx="6" fill="#101a2e" stroke="#476b9f"/>
        <text x="410" y="60" fill="#6b94d4" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">STAND EASY</text>
        <line x1="340" y1="70" x2="480" y2="70" stroke="#2f4a73"/>
        <text x="410" y="90" fill="#b0c4e0" font-size="9" font-family="monospace" text-anchor="middle">Further relaxation</text>
        <text x="410" y="106" fill="#b0c4e0" font-size="9" font-family="monospace" text-anchor="middle">Close the hands</text>
        <text x="410" y="122" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle">Remain in place</text>
        <text x="300" y="165" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle">RELAXATION POSITIONS</text>
      ` + end;
    }
    if (scene === "turns") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="300" cy="90" r="55" fill="#101a2e" stroke="#476b9f" stroke-width="2"/>
        <circle cx="300" cy="90" r="45" fill="none" stroke="#2f4a73" stroke-width="1" opacity="0.5"/>
        <line x1="300" y1="40" x2="300" y2="140" stroke="#2f4a73" stroke-width="1" opacity="0.4"/>
        <line x1="250" y1="90" x2="350" y2="90" stroke="#2f4a73" stroke-width="1" opacity="0.4"/>
        <polygon points="300,40 294,52 306,52" fill="#ff5a6e"/>
        <text x="300" y="35" fill="#ff5a6e" font-size="9" font-family="monospace" text-anchor="middle">N</text>
        <path d="M 300 90 L 350 90 A 50 50 0 0 0 354 50" fill="none" stroke="#f5c84c" stroke-width="2.5"/>
        <text x="365" y="70" fill="#f5c84c" font-size="10" font-family="monospace">90° RIGHT</text>
        <path d="M 300 90 L 250 90 A 50 50 0 0 1 246 50" fill="none" stroke="#6b94d4" stroke-width="2.5"/>
        <text x="180" y="70" fill="#6b94d4" font-size="10" font-family="monospace">90° LEFT</text>
        <path d="M 300 90 L 300 140 A 50 50 0 1 0 300 40" fill="none" stroke="#38d97b" stroke-width="2.5" opacity="0.7"/>
        <text x="380" y="135" fill="#38d97b" font-size="10" font-family="monospace">180° ABOUT</text>
        <text x="100" y="165" fill="#7a9a78" font-size="8" font-family="monospace">R HEEL+L TOE → RIGHT</text>
        <text x="300" y="165" fill="#6b94d4" font-size="9" font-family="monospace" text-anchor="middle">TURNS AT THE HALT</text>
      ` + end;
    }
    if (scene === "marching") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="40" y="100" width="520" height="30" rx="3" fill="#101a2e" stroke="#2f4a73"/>
        <text x="300" y="85" fill="#6b94d4" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">QUICK TIME — 116 BPM</text>
        <g font-family="monospace">
          <text x="60" y="120" fill="#f5c84c" font-size="11">🚶</text>
          <text x="120" y="120" fill="#6b94d4" font-size="11">🚶</text>
          <text x="180" y="120" fill="#6b94d4" font-size="11">🚶</text>
          <text x="240" y="120" fill="#6b94d4" font-size="11">🚶</text>
          <text x="300" y="120" fill="#6b94d4" font-size="11">🚶</text>
          <text x="360" y="120" fill="#6b94d4" font-size="11">🚶</text>
          <text x="420" y="120" fill="#6b94d4" font-size="11">🚶</text>
          <text x="480" y="120" fill="#6b94d4" font-size="11">🚶</text>
        </g>
        <rect x="55" y="135" width="60" height="20" rx="3" fill="#0a1525" stroke="#f5c84c"/>
        <text x="85" y="148" fill="#f5c84c" font-size="8" font-family="monospace" text-anchor="middle">35cm FIRST</text>
        <rect x="115" y="135" width="60" height="20" rx="3" fill="#0a1525" stroke="#6b94d4"/>
        <text x="145" y="148" fill="#6b94d4" font-size="8" font-family="monospace" text-anchor="middle">75cm STD</text>
        <rect x="175" y="135" width="60" height="20" rx="3" fill="#0a1525" stroke="#6b94d4"/>
        <text x="205" y="148" fill="#6b94d4" font-size="8" font-family="monospace" text-anchor="middle">75cm STD</text>
        <text x="300" y="148" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">→ 75cm per pace →</text>
        <text x="300" y="60" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle">ARMS SWING WAIST-HIGH</text>
        <path d="M 250 100 L 240 80 M 260 100 L 270 80" stroke="#f5c84c" stroke-width="1.5" opacity="0.6"/>
        <path d="M 350 100 L 340 80 M 360 100 L 370 80" stroke="#f5c84c" stroke-width="1.5" opacity="0.6"/>
        <text x="300" y="165" fill="#9ab36a" font-size="8" font-family="monospace" text-anchor="middle">MARCHING IN QUICK TIME</text>
      ` + end;
    }
    if (scene === "halting") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="60" y="50" width="480" height="80" rx="6" fill="#101a2e" stroke="#476b9f"/>
        <text x="300" y="40" fill="#f5c84c" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">HALT — THREE MOVEMENTS</text>
        <rect x="90" y="65" width="120" height="50" rx="4" fill="#0a1525" stroke="#f5c84c"/>
        <text x="150" y="83" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">ONE</text>
        <text x="150" y="98" fill="#b0c4e0" font-size="8" font-family="monospace" text-anchor="middle">Complete pace</text>
        <text x="150" y="110" fill="#b0c4e0" font-size="8" font-family="monospace" text-anchor="middle">Plant foot</text>
        <rect x="240" y="65" width="120" height="50" rx="4" fill="#0a1525" stroke="#6b94d4"/>
        <text x="300" y="83" fill="#6b94d4" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">ONE</text>
        <text x="300" y="98" fill="#b0c4e0" font-size="8" font-family="monospace" text-anchor="middle">Other foot in</text>
        <text x="300" y="110" fill="#b0c4e0" font-size="8" font-family="monospace" text-anchor="middle">to meet</text>
        <rect x="390" y="65" width="120" height="50" rx="4" fill="#0a1525" stroke="#38d97b"/>
        <text x="450" y="83" fill="#38d97b" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">TWO</text>
        <text x="450" y="98" fill="#b0c4e0" font-size="8" font-family="monospace" text-anchor="middle">Attention</text>
        <text x="450" y="110" fill="#b0c4e0" font-size="8" font-family="monospace" text-anchor="middle">Heels together</text>
        <text x="300" y="155" fill="#f5c84c" font-size="10" font-family="monospace" text-anchor="middle">TIMING: "ONE, ONE-TWO"</text>
      ` + end;
    }
    if (scene === "marktime") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="40" y="90" width="520" height="40" rx="3" fill="#101a2e" stroke="#2f4a73"/>
        <circle cx="300" cy="110" r="20" fill="none" stroke="#f5c84c" stroke-width="2" stroke-dasharray="3 3"/>
        <text x="300" y="115" fill="#f5c84c" font-size="14" font-family="monospace" text-anchor="middle">🚶</text>
        <text x="300" y="145" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle">ON THE SPOT</text>
        <text x="300" y="50" fill="#6b94d4" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">MARK TIME — 116 BPM</text>
        <path d="M 290 95 L 290 85 M 310 95 L 310 85" stroke="#6b94d4" stroke-width="2" opacity="0.6"/>
        <text x="100" y="80" fill="#b0c4e0" font-size="8" font-family="monospace">Feet up & down</text>
        <text x="420" y="80" fill="#b0c4e0" font-size="8" font-family="monospace">No forward move</text>
        <text x="300" y="165" fill="#9ab36a" font-size="8" font-family="monospace" text-anchor="middle">MARK TIME · FORWARD · HALT</text>
      ` + end;
    }
    if (scene === "saluting") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="60" y="45" width="480" height="90" rx="6" fill="#101a2e" stroke="#476b9f"/>
        <text x="300" y="35" fill="#f5c84c" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">SALUTE ON THE MARCH</text>
        <g font-family="monospace" font-size="12">
          <text x="110" y="90" fill="#6b94d4">🚶</text>
          <text x="160" y="90" fill="#6b94d4">🚶</text>
          <text x="210" y="90" fill="#6b94d4">🚶</text>
          <text x="260" y="90" fill="#6b94d4">🚶</text>
          <text x="310" y="90" fill="#6b94d4">🚶</text>
          <text x="360" y="90" fill="#6b94d4">🚶</text>
          <text x="410" y="90" fill="#6b94d4">🚶</text>
          <text x="460" y="90" fill="#6b94d4">🚶</text>
        </g>
        <text x="300" y="90" fill="#f5c84c" font-size="20" text-anchor="middle">🫡</text>
        <line x1="110" y1="110" x2="260" y2="110" stroke="#f5c84c" stroke-width="2"/>
        <line x1="360" y1="110" x2="460" y2="110" stroke="#6b94d4" stroke-width="2"/>
        <text x="185" y="125" fill="#f5c84c" font-size="8" font-family="monospace" text-anchor="middle">5 PACES BEFORE</text>
        <text x="410" y="125" fill="#6b94d4" font-size="8" font-family="monospace" text-anchor="middle">1 PACE PAST</text>
        <rect x="280" y="100" width="40" height="14" rx="2" fill="#0a1525" stroke="#f5c84c"/>
        <text x="300" y="110" fill="#f5c84c" font-size="7" font-family="monospace" text-anchor="middle">OFFICER</text>
        <text x="300" y="165" fill="#9ab36a" font-size="8" font-family="monospace" text-anchor="middle">SALUTING — FRONT · FLANK · MARCH</text>
      ` + end;
    }
    if (scene === "dressing") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="35" fill="#6b94d4" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">RIGHT DRESS — THREE MOVEMENTS</text>
        <g font-family="monospace" font-size="11">
          <text x="120" y="95" fill="#f5c84c" font-weight="bold">🧍</text>
          <text x="200" y="95" fill="#6b94d4">🧍</text>
          <text x="280" y="95" fill="#6b94d4">🧍</text>
          <text x="360" y="95" fill="#6b94d4">🧍</text>
          <text x="440" y="95" fill="#6b94d4">🧍</text>
        </g>
        <line x1="130" y1="110" x2="450" y2="110" stroke="#2f4a73" stroke-width="1" stroke-dasharray="4 3"/>
        <path d="M 200 95 L 145 90 M 280 95 L 205 90 M 360 95 L 285 90 M 440 95 L 365 90" stroke="#f5c84c" stroke-width="1" opacity="0.5" marker-end="url(#arr)"/>
        <text x="120" y="125" fill="#f5c84c" font-size="8" font-family="monospace" text-anchor="middle">ANCHOR</text>
        <text x="300" y="125" fill="#b0c4e0" font-size="8" font-family="monospace" text-anchor="middle">ALIGN TO RIGHT</text>
        <text x="300" y="155" fill="#f5c84c" font-size="10" font-family="monospace" text-anchor="middle">→ EYES FRONT ←</text>
      ` + end;
    }
    if (scene === "openclose") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <text x="300" y="35" fill="#6b94d4" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">OPEN & CLOSE ORDER</text>
        <g font-family="monospace" font-size="11">
          <text x="120" y="75" fill="#6b94d4">🧍</text>
          <text x="200" y="75" fill="#6b94d4">🧍</text>
          <text x="280" y="75" fill="#6b94d4">🧍</text>
          <text x="360" y="75" fill="#6b94d4">🧍</text>
          <text x="440" y="75" fill="#6b94d4">🧍</text>
        </g>
        <text x="300" y="95" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">FRONT RANK</text>
        <line x1="60" y1="105" x2="540" y2="105" stroke="#f5c84c" stroke-width="1" stroke-dasharray="3 3" opacity="0.4"/>
        <text x="530" y="108" fill="#f5c84c" font-size="7" font-family="monospace">SPACING</text>
        <g font-family="monospace" font-size="11">
          <text x="120" y="135" fill="#6b94d4">🧍</text>
          <text x="200" y="135" fill="#6b94d4">🧍</text>
          <text x="280" y="135" fill="#6b94d4">🧍</text>
          <text x="360" y="135" fill="#6b94d4">🧍</text>
          <text x="440" y="135" fill="#6b94d4">🧍</text>
        </g>
        <text x="300" y="155" fill="#7a9a78" font-size="8" font-family="monospace" text-anchor="middle">REAR RANK (stepped back for inspection)</text>
        <text x="300" y="168" fill="#9ab36a" font-size="8" font-family="monospace" text-anchor="middle">OPEN ORDER → INSPECTION → CLOSE ORDER</text>
      ` + end;
    }
    if (scene === "parade") {
      return base + grad("g", "#0f1a2e", "#070d18") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="60" y="60" width="480" height="80" rx="8" fill="#0a1525" stroke="#f5c84c" stroke-width="1.5"/>
        <text x="300" y="50" fill="#f5c84c" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">🏆 PARADE SQUARE 🏆</text>
        <g font-family="monospace" font-size="11">
          <text x="120" y="90" fill="#f5c84c">🧍</text>
          <text x="200" y="90" fill="#6b94d4">🧍</text>
          <text x="280" y="90" fill="#6b94d4">🧍</text>
          <text x="360" y="90" fill="#6b94d4">🧍</text>
          <text x="440" y="90" fill="#6b94d4">🧍</text>
          <text x="120" y="120" fill="#6b94d4">🧍</text>
          <text x="200" y="120" fill="#6b94d4">🧍</text>
          <text x="280" y="120" fill="#6b94d4">🧍</text>
          <text x="360" y="120" fill="#6b94d4">🧍</text>
          <text x="440" y="120" fill="#6b94d4">🧍</text>
        </g>
        <text x="520" y="105" fill="#f5c84c" font-size="16" text-anchor="middle">🎖️</text>
        <text x="520" y="125" fill="#7a9a78" font-size="7" font-family="monospace" text-anchor="middle">REVIEWING</text>
        <text x="300" y="155" fill="#9ab36a" font-size="9" font-family="monospace" text-anchor="middle">FORM UP → MARCH PAST → INSPECTION → DISMISS</text>
      ` + end;
    }
    return base + `<rect width="${W}" height="${H}" fill="#0a1525"/>` + end;
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
    DRILL_BADGES.forEach(b => {
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
    document.getElementById("topRank").textContent = rank.name.replace("Drill Recruit", "Recruit").replace("Drill Cadet", "Cadet").replace("Drill ", "");
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
    document.getElementById("cmdBadgeTotal").textContent = "of " + DRILL_BADGES.length;

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
      const num = done ? "✓" : m.order;
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
      const altOk = task.altKeywords ? checkKw(task.altKeywords) : false;
      if (mainOk || altOk) return { ok: true };
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
    else if (task.type === "note") hint = `Your note must include: ${task.keywords.join(", ")}${task.altKeywords ? " (or " + task.altKeywords.join(", ") + ")" : ""}.`;
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
      const badge = DRILL_BADGES.find(b => b.mission === m.id);
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
    const badge = DRILL_BADGES.find(b => b.mission === m.id);
    const mp = missionProgress(m.id);
    return `<div class="task-console">
      <div class="task-body">
        <div class="complete-card">
          <div class="cc-ico">🏆</div>
          <div class="cc-title">Mission Complete: ${m.title}</div>
          <div class="cc-sub">${m.desc} You have successfully completed all ${m.tasks.length} tasks and earned the <strong>${badge ? badge.name : "Drill Cadet"}</strong> badge.</div>
          <div class="cc-stats">
            <div class="cc-stat"><div class="v">+${earned}</div><div class="l">XP Earned</div></div>
            <div class="cc-stat"><div class="v">${mp.tasksDone.length}/${m.tasks.length}</div><div class="l">Tasks Done</div></div>
            <div class="cc-stat"><div class="v">${mp.wrongAttempts || 0}</div><div class="l">Wrong Attempts</div></div>
          </div>
          <div class="task-actions" style="justify-content:center;">
            <button class="btn btn-primary" id="fileSitrepQuickBtn" type="button">📝 File SITREP for this mission</button>
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
    document.getElementById("ringRankLabel").textContent = rank.name.replace("Drill ", "");
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
    showFeedback(fb, "ok", `SITREP filed successfully! +20 XP. Your commanding officer has received your report.`);
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
  // PARADE SQUARE — INTERACTIVE DRILL GAME
  // ==========================================================

  // Drill commands with their cautionary and executive parts,
  // the correct movement response, and the visual cadet state.
  const DRILL_COMMANDS = [
    { id: "attention",   caut: "Squad",      exec: "ATTENTION",         move: "attention",   label: "Come to Attention",        ico: "🧍", xp: 10 },
    { id: "standease",   caut: "Squad",      exec: "STAND AT EASE",     move: "standease",   label: "Stand at Ease",            ico: "🧍‍♂️", xp: 10 },
    { id: "standeasy",   caut: "Squad",      exec: "STAND EASY",        move: "standeasy",   label: "Stand Easy",               ico: "😴", xp: 10 },
    { id: "rightturn",   caut: "Squad",      exec: "RIGHT TURN",        move: "rightturn",   label: "Right Turn",               ico: "➡️", xp: 15 },
    { id: "leftturn",    caut: "Squad",      exec: "LEFT TURN",         move: "leftturn",    label: "Left Turn",                ico: "⬅️", xp: 15 },
    { id: "aboutturn",   caut: "Squad",      exec: "ABOUT TURN",        move: "aboutturn",   label: "About Turn",               ico: "🔄", xp: 15 },
    { id: "quickmarch",  caut: "Squad",      exec: "QUICK MARCH",       move: "quickmarch",  label: "Quick March",              ico: "🚶", xp: 15 },
    { id: "halt",        caut: "Squad",      exec: "HALT",              move: "halt",        label: "Halt",                     ico: "✋", xp: 15 },
    { id: "marktime",    caut: "Squad",      exec: "MARK TIME",         move: "marktime",    label: "Mark Time",                ico: "👣", xp: 20 },
    { id: "forward",     caut: "Squad",      exec: "FORWARD",           move: "forward",     label: "Forward",                  ico: "➡️", xp: 20 },
    { id: "salute",      caut: "To the front—salute", exec: "SALUTE",   move: "salute",      label: "Salute",                   ico: "🫡", xp: 20 },
    { id: "eyesright",   caut: "Squad",      exec: "EYES RIGHT",        move: "eyesright",   label: "Eyes Right",               ico: "👀", xp: 15 },
    { id: "eyesfront",   caut: "Squad",      exec: "EYES FRONT",        move: "eyesfront",   label: "Eyes Front",               ico: "👁️", xp: 15 },
    { id: "openclose",   caut: "Squad",      exec: "OPEN ORDER MARCH",  move: "openclose",   label: "Open/Close Order",         ico: "↔️", xp: 25 },
    { id: "rightdress",  caut: "Squad",      exec: "RIGHT DRESS",       move: "rightdress",  label: "Right Dress",              ico: "📐", xp: 20 }
  ];

  // Game state (in-memory, synced to localStorage)
  let pg = {
    active: false,          // is a drill session running
    currentCmd: null,       // the active command being responded to
    selectedMove: null,     // the player's selected movement
    beatTimer: null,        // cadence beat interval
    beatCount: 0,           // current beat number
    timingTimer: null,      // timing meter countdown
    timingStart: 0,         // timestamp when command was shown
    timingWindow: 6000,     // ms to respond
    score: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    bestStreak: 0,
    round: 0,
    sequenceMode: false,
    sequence: [],           // array of command ids for sequence mode
    sequenceStep: 0,
    cadetState: "attention" // current visual state of the squad
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
        rounds: pg.round
      }));
    } catch (e) {}
  }

  // Generate the SVG parade square with a squad of cadets
  function renderParadeSquare(cadetState) {
    const state = cadetState || pg.cadetState;
    const wrap = document.getElementById("paradeCanvasWrap");
    if (!wrap) return;

    // Cadet positions in a 3-rank formation
    const cadets = [];
    const startX = 130, startY = 90, spacingX = 80, spacingY = 70;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 5; c++) {
        cadets.push({ x: startX + c * spacingX, y: startY + r * spacingY, rank: r, file: c });
      }
    }

    let cadetSvg = cadets.map(cd => {
      let body = "";
      let cls = "parade-cadet";
      let transform = "";

      switch (state) {
        case "attention":
          cls += " attention-glow";
          body = `<rect x="${cd.x - 8}" y="${cd.y - 25}" width="16" height="32" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
                  <circle cx="${cd.x}" cy="${cd.y - 32}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>
                  <rect x="${cd.x - 9}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>
                  <rect x="${cd.x + 2}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>`;
          break;
        case "standease":
          body = `<rect x="${cd.x - 8}" y="${cd.y - 22}" width="16" height="32" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
                  <circle cx="${cd.x}" cy="${cd.y - 29}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>
                  <rect x="${cd.x - 14}" y="${cd.y - 10}" width="6" height="20" rx="2" fill="#3a5680" transform="rotate(-15 ${cd.x - 11} ${cd.y})"/>
                  <rect x="${cd.x - 9}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>
                  <rect x="${cd.x + 2}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>`;
          break;
        case "standeasy":
          body = `<rect x="${cd.x - 9}" y="${cd.y - 18}" width="18" height="30" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5" opacity="0.8"/>
                  <circle cx="${cd.x}" cy="${cd.y - 24}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1" opacity="0.8"/>
                  <rect x="${cd.x - 10}" y="${cd.y + 5}" width="8" height="14" rx="2" fill="#2a3a55" opacity="0.7"/>
                  <rect x="${cd.x + 2}" y="${cd.y + 5}" width="8" height="14" rx="2" fill="#2a3a55" opacity="0.7"/>`;
          break;
        case "rightturn":
          transform = `transform="rotate(90 ${cd.x} ${cd.y})"`;
          body = `<rect x="${cd.x - 8}" y="${cd.y - 25}" width="16" height="32" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
                  <circle cx="${cd.x}" cy="${cd.y - 32}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>
                  <rect x="${cd.x - 9}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>
                  <rect x="${cd.x + 2}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>`;
          break;
        case "leftturn":
          transform = `transform="rotate(-90 ${cd.x} ${cd.y})"`;
          body = `<rect x="${cd.x - 8}" y="${cd.y - 25}" width="16" height="32" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
                  <circle cx="${cd.x}" cy="${cd.y - 32}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>
                  <rect x="${cd.x - 9}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>
                  <rect x="${cd.x + 2}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>`;
          break;
        case "aboutturn":
          transform = `transform="rotate(180 ${cd.x} ${cd.y})"`;
          body = `<rect x="${cd.x - 8}" y="${cd.y - 25}" width="16" height="32" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
                  <circle cx="${cd.x}" cy="${cd.y - 32}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>
                  <rect x="${cd.x - 9}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>
                  <rect x="${cd.x + 2}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>`;
          break;
        case "quickmarch":
        case "forward":
          cls += " marching";
          body = `<rect x="${cd.x - 8}" y="${cd.y - 25}" width="16" height="32" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
                  <circle cx="${cd.x}" cy="${cd.y - 32}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>
                  <rect x="${cd.x - 11}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55" class="leg-l"/>
                  <rect x="${cd.x + 4}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55" class="leg-r"/>`;
          break;
        case "halt":
          cls += " attention-glow";
          body = `<rect x="${cd.x - 8}" y="${cd.y - 25}" width="16" height="32" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
                  <circle cx="${cd.x}" cy="${cd.y - 32}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>
                  <rect x="${cd.x - 9}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>
                  <rect x="${cd.x + 2}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>`;
          break;
        case "marktime":
          cls += " marching";
          body = `<rect x="${cd.x - 8}" y="${cd.y - 25}" width="16" height="32" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
                  <circle cx="${cd.x}" cy="${cd.y - 32}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>
                  <rect x="${cd.x - 11}" y="${cd.y + 5}" width="7" height="16" rx="2" fill="#2a3a55" class="leg-l"/>
                  <rect x="${cd.x + 4}" y="${cd.y + 5}" width="7" height="16" rx="2" fill="#2a3a55" class="leg-r"/>`;
          break;
        case "salute":
          cls += " attention-glow";
          body = `<rect x="${cd.x - 8}" y="${cd.y - 25}" width="16" height="32" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
                  <circle cx="${cd.x}" cy="${cd.y - 32}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>
                  <rect x="${cd.x - 8}" y="${cd.y - 40}" width="6" height="16" rx="2" fill="#3a5680" transform="rotate(25 ${cd.x - 5} ${cd.y - 32})"/>
                  <rect x="${cd.x - 9}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>
                  <rect x="${cd.x + 2}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>`;
          break;
        case "eyesright":
          body = `<rect x="${cd.x - 8}" y="${cd.y - 25}" width="16" height="32" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
                  <circle cx="${cd.x + 2}" cy="${cd.y - 32}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>
                  <circle cx="${cd.x + 5}" cy="${cd.y - 33}" r="1.5" fill="#2a3a55"/>
                  <rect x="${cd.x - 9}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>
                  <rect x="${cd.x + 2}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>`;
          break;
        case "eyesfront":
          cls += " attention-glow";
          body = `<rect x="${cd.x - 8}" y="${cd.y - 25}" width="16" height="32" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
                  <circle cx="${cd.x}" cy="${cd.y - 32}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>
                  <rect x="${cd.x - 9}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>
                  <rect x="${cd.x + 2}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>`;
          break;
        case "openclose":
          // widen the ranks
          const off = cd.rank === 0 ? -15 : (cd.rank === 2 ? 15 : 0);
          body = `<rect x="${cd.x - 8}" y="${cd.y - 25 + off}" width="16" height="32" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
                  <circle cx="${cd.x}" cy="${cd.y - 32 + off}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>
                  <rect x="${cd.x - 9}" y="${cd.y + 7 + off}" width="7" height="14" rx="2" fill="#2a3a55"/>
                  <rect x="${cd.x + 2}" y="${cd.y + 7 + off}" width="7" height="14" rx="2" fill="#2a3a55"/>`;
          break;
        case "rightdress":
          // cadets looking right, adjusting alignment
          body = `<rect x="${cd.x - 8 + (cd.file * 2)}" y="${cd.y - 25}" width="16" height="32" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
                  <circle cx="${cd.x + 2 + (cd.file * 2)}" cy="${cd.y - 32}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>
                  <rect x="${cd.x - 9 + (cd.file * 2)}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>
                  <rect x="${cd.x + 2 + (cd.file * 2)}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>`;
          break;
        default:
          body = `<rect x="${cd.x - 8}" y="${cd.y - 25}" width="16" height="32" rx="3" fill="#476b9f" stroke="#2f4a73" stroke-width="1.5"/>
                  <circle cx="${cd.x}" cy="${cd.y - 32}" r="7" fill="#f5c84c" stroke="#c79a2e" stroke-width="1"/>
                  <rect x="${cd.x - 9}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>
                  <rect x="${cd.x + 2}" y="${cd.y + 7}" width="7" height="14" rx="2" fill="#2a3a55"/>`;
      }

      return `<g class="${cls}" ${transform}>${body}</g>`;
    }).join("");

    // Build the parade square with ground markings
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
      <!-- Ground -->
      <rect x="0" y="0" width="600" height="340" fill="url(#paradeGround)"/>
      <!-- Parade square markings -->
      <rect x="60" y="50" width="480" height="260" fill="none" stroke="rgba(245,200,76,0.25)" stroke-width="2" stroke-dasharray="8 4"/>
      <!-- Rank alignment lines -->
      <line x1="80" y1="90" x2="520" y2="90" stroke="url(#rankLine)" stroke-width="2"/>
      <line x1="80" y1="160" x2="520" y2="160" stroke="url(#rankLine)" stroke-width="2"/>
      <line x1="80" y1="230" x2="520" y2="230" stroke="url(#rankLine)" stroke-width="2"/>
      <!-- DI position marker (front center) -->
      <circle cx="300" cy="20" r="6" fill="#f5c84c" stroke="#c79a2e" stroke-width="1.5"/>
      <text x="300" y="14" text-anchor="middle" font-size="9" fill="#f5c84c" font-family="monospace">DI</text>
      <!-- Squad label -->
      <text x="300" y="320" text-anchor="middle" font-size="11" fill="rgba(245,200,76,0.6)" font-family="monospace">3 RANKS × 5 FILES — 15 CADETS</text>
      <!-- Cadets -->
      ${cadetSvg}
    </svg>`;

    wrap.innerHTML = svg;
  }

  // Render the movement response buttons
  function renderMoveButtons() {
    const grid = document.getElementById("paradeMoveGrid");
    if (!grid) return;
    grid.innerHTML = DRILL_COMMANDS.map(cmd => {
      return `<button class="parade-move-btn" data-move="${cmd.id}" type="button" disabled>
        <span class="pg-mb-ico">${cmd.ico}</span>
        <span class="pg-mb-label">${cmd.label}</span>
      </button>`;
    }).join("");
    grid.querySelectorAll(".parade-move-btn").forEach(btn => {
      btn.addEventListener("click", () => selectMovement(btn.dataset.move));
    });
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
    const r = document.getElementById("pgRound"); if (r) r.textContent = pg.round;
  }

  // Update the sequence list display
  function updateSequenceList() {
    const list = document.getElementById("pgSequenceList");
    if (!list) return;
    if (pg.sequence.length === 0) {
      list.innerHTML = `<p class="muted" style="font-size:11px; padding:8px;">No commands called yet.</p>`;
      return;
    }
    list.innerHTML = pg.sequence.map((id, i) => {
      const cmd = DRILL_COMMANDS.find(c => c.id === id);
      if (!cmd) return "";
      const isCurrent = pg.sequenceMode && i === pg.sequenceStep;
      return `<div class="pg-seq-item ${isCurrent ? "current" : ""}">
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
    const interval = 60000 / 116; // ~517ms
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
      // Force reflow then animate
      void fill.offsetWidth;
      fill.style.transition = `width ${pg.timingWindow}ms linear`;
      fill.style.width = "0%";
    }
    pg.timingTimer = setTimeout(() => {
      // Time's up — count as wrong if no selection
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

  // Calculate timing bonus: faster = more XP
  function timingBonus() {
    const elapsed = Date.now() - pg.timingStart;
    const remaining = Math.max(0, pg.timingWindow - elapsed);
    const pct = remaining / pg.timingWindow;
    if (pct > 0.75) return 1.5;   // very fast — 50% bonus
    if (pct > 0.5) return 1.25;   // fast — 25% bonus
    if (pct > 0.25) return 1.0;   // normal — no bonus
    return 0.75;                  // slow — 25% penalty
  }

  // Call a new command — show cautionary then executive
  function callCommand(cmd) {
    pg.currentCmd = cmd;
    pg.selectedMove = null;

    const cautEl = document.getElementById("pgCmdCautionary");
    const execEl = document.getElementById("pgCmdExecutive");

    // Show cautionary part first
    if (cautEl) cautEl.textContent = cmd.caut.toUpperCase();
    if (execEl) {
      execEl.textContent = "…";
      execEl.classList.remove("flash");
    }

    // After a brief pause, show the executive command
    setTimeout(() => {
      if (execEl) {
        execEl.textContent = cmd.exec;
        execEl.classList.add("flash");
      }
      // Enable movement buttons
      document.querySelectorAll(".parade-move-btn").forEach(btn => btn.disabled = false);
      // Start timing
      startTiming();
      // Update feedback
      const fb = document.getElementById("paradeFeedback");
      if (fb) {
        fb.className = "parade-feedback info";
        fb.innerHTML = `<strong>${cmd.caut.toUpperCase()}</strong> — <strong>${cmd.exec}</strong> — Select the correct movement!`;
      }
    }, 800);
  }

  // Player selects a movement
  function selectMovement(moveId) {
    if (!pg.currentCmd || pg.selectedMove) return;
    pg.selectedMove = moveId;

    // Disable all buttons
    document.querySelectorAll(".parade-move-btn").forEach(btn => btn.disabled = true);

    if (moveId === pg.currentCmd.id) {
      handleCorrectResponse();
    } else {
      handleWrongResponse(`Incorrect! "${pg.currentCmd.exec}" requires "${pg.currentCmd.label}", not "${getMoveLabel(moveId)}".`);
    }
  }

  function getMoveLabel(id) {
    const cmd = DRILL_COMMANDS.find(c => c.id === id);
    return cmd ? cmd.label : id;
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

    // Award XP to the main system
    state.xp += earnedXp;
    state.totalAttempts = (state.totalAttempts || 0) + 1;
    state.streak = pg.streak;
    if (pg.streak > state.bestStreak) state.bestStreak = pg.streak;
    saveState();
    saveParadeStats();

    // Update cadet visual state
    pg.cadetState = pg.currentCmd.move;
    renderParadeSquare(pg.cadetState);

    // Feedback
    const fb = document.getElementById("paradeFeedback");
    if (fb) {
      const bonusText = bonus > 1 ? ` <span style="color:var(--gold-bright)">⚡ ${Math.round((bonus - 1) * 100)}% speed bonus!</span>` : bonus < 1 ? ` <span style="color:var(--amber)">Slow response — reduced XP</span>` : "";
      fb.className = "parade-feedback ok";
      fb.innerHTML = `✅ Correct! <strong>${pg.currentCmd.exec}</strong> → <strong>${pg.currentCmd.label}</strong>. +${earnedXp} XP${bonusText}. Streak: ${pg.streak}`;
    }

    updateParadeStats();
    updateParadeStatsSync();
    toast("ok", `✅ Correct! +${earnedXp} XP`);

    // Enable next button
    const nextBtn = document.getElementById("pgNextBtn");
    if (nextBtn) nextBtn.disabled = false;

    // In sequence mode, advance to next command
    if (pg.sequenceMode && pg.sequenceStep < pg.sequence.length - 1) {
      pg.sequenceStep++;
      updateSequenceList();
      setTimeout(() => {
        const nextCmd = DRILL_COMMANDS.find(c => c.id === pg.sequence[pg.sequenceStep]);
        if (nextCmd) callCommand(nextCmd);
      }, 1500);
    } else if (pg.sequenceMode) {
      // Sequence complete
      const fb2 = document.getElementById("paradeFeedback");
      if (fb2) {
        fb2.className = "parade-feedback ok";
        fb2.innerHTML = `🏆 Sequence complete! All ${pg.sequence.length} commands executed correctly. Total bonus: +${pg.sequence.length * 5} XP`;
      }
      state.xp += pg.sequence.length * 5;
      saveState();
      saveParadeStats();
      pg.sequenceMode = false;
      pg.sequence = [];
      pg.sequenceStep = 0;
      updateSequenceList();
      const seqBtn = document.getElementById("pgSequenceBtn");
      if (seqBtn) seqBtn.textContent = "📜 Sequence Mode";
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
    renderParadeSquare("error-flash");
    setTimeout(() => renderParadeSquare(pg.cadetState), 600);

    const fb = document.getElementById("paradeFeedback");
    if (fb) {
      fb.className = "parade-feedback err";
      fb.innerHTML = `❌ ${msg} Streak reset. The correct response was <strong>${pg.currentCmd.label}</strong>.`;
    }

    updateParadeStats();
    updateParadeStatsSync();
    toast("err", `❌ Incorrect! Streak reset.`);

    const nextBtn = document.getElementById("pgNextBtn");
    if (nextBtn) nextBtn.disabled = false;

    // In sequence mode, a wrong answer ends the sequence
    if (pg.sequenceMode) {
      pg.sequenceMode = false;
      pg.sequence = [];
      pg.sequenceStep = 0;
      updateSequenceList();
      const seqBtn = document.getElementById("pgSequenceBtn");
      if (seqBtn) seqBtn.textContent = "📜 Sequence Mode";
      const fb2 = document.getElementById("paradeFeedback");
      if (fb2) fb2.innerHTML += ` Sequence aborted due to error.`;
    }
  }

  // Sync parade stats to main display
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
    renderParadeSquare("attention");
    pg.cadetState = "attention";

    const fb = document.getElementById("paradeFeedback");
    if (fb) {
      fb.className = "parade-feedback info";
      fb.textContent = "Drill session started! The instructor will call commands. Respond quickly for bonus XP.";
    }

    const startBtn = document.getElementById("pgStartBtn");
    if (startBtn) startBtn.disabled = true;

    // Call the first command
    setTimeout(() => nextCommand(), 1200);
  }

  // Pick and call the next random command
  function nextCommand() {
    if (!pg.active) return;
    const nextBtn = document.getElementById("pgNextBtn");
    if (nextBtn) nextBtn.disabled = true;

    // Pick a random command (not the same as last)
    let cmd;
    do {
      cmd = DRILL_COMMANDS[Math.floor(Math.random() * DRILL_COMMANDS.length)];
    } while (pg.currentCmd && cmd.id === pg.currentCmd.id && DRILL_COMMANDS.length > 1);

    callCommand(cmd);
  }

  // Start sequence mode — player builds a custom command sequence
  function startSequenceMode() {
    if (pg.sequenceMode) {
      // Already in sequence mode — add current command to sequence
      if (pg.currentCmd) {
        pg.sequence.push(pg.currentCmd.id);
        updateSequenceList();
        toast("info", `Added "${pg.currentCmd.exec}" to sequence (${pg.sequence.length} commands)`);
      }
      return;
    }

    // Start sequence builder
    pg.sequenceMode = true;
    pg.sequence = [];
    pg.sequenceStep = 0;
    if (!pg.active) {
      startCadence();
      pg.active = true;
    }
    const seqBtn = document.getElementById("pgSequenceBtn");
    if (seqBtn) seqBtn.textContent = "➕ Add to Sequence";

    const fb = document.getElementById("paradeFeedback");
    if (fb) {
      fb.className = "parade-feedback info";
      fb.innerHTML = `📜 <strong>Sequence Mode:</strong> Commands will be called. Select the correct response for each. After each correct response, the next command in your sequence executes. Build a multi-command drill routine! Click "Add to Sequence" to queue the current command, or just respond normally to start building.`;
    }

    // Call the first command
    setTimeout(() => nextCommand(), 800);
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
    pg.cadetState = "attention";

    const cautEl = document.getElementById("pgCmdCautionary");
    const execEl = document.getElementById("pgCmdExecutive");
    if (cautEl) cautEl.textContent = "—";
    if (execEl) execEl.textContent = "Awaiting command…";

    const fb = document.getElementById("paradeFeedback");
    if (fb) {
      fb.className = "parade-feedback info";
      fb.innerHTML = `Press <strong>Start Drill</strong> to begin. Commands will be called one at a time.`;
    }

    const startBtn = document.getElementById("pgStartBtn");
    if (startBtn) startBtn.disabled = false;
    const nextBtn = document.getElementById("pgNextBtn");
    if (nextBtn) nextBtn.disabled = true;
    const seqBtn = document.getElementById("pgSequenceBtn");
    if (seqBtn) seqBtn.textContent = "📜 Sequence Mode";

    document.querySelectorAll(".parade-move-btn").forEach(btn => btn.disabled = true);

    renderParadeSquare("attention");
    renderBeatDots(-1);
    updateSequenceList();
    updateParadeStats();
    toast("info", "Parade Square reset.");
  }

  // Main render function for the Parade Square section
  function renderParadeGame() {
    loadParadeStats();
    renderParadeSquare(pg.cadetState);
    renderMoveButtons();
    renderBeatDots(-1);
    updateParadeStats();
    updateSequenceList();

    // Bind buttons if not already bound
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
      seqBtn.addEventListener("click", startSequenceMode);
      seqBtn.dataset.bound = "1";
    }
    const resetBtn = document.getElementById("pgResetBtn");
    if (resetBtn && !resetBtn.dataset.bound) {
      resetBtn.addEventListener("click", resetParadeGame);
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
    if (name === "parade") renderParadeGame();
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
    ico.textContent = kind === "ok" ? "✅" : kind === "warn" ? "⚠️" : kind === "err" ? "❌" : "ℹ️";
    txt.textContent = text;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3500);
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // ==========================================================
  // ARENA QUESTIONS — PO 208 Drill & Ceremonial curriculum
  // EOs: M208.01 (Turns on the March), M208.02 (Form Single File),
  //      C208.01 (Ceremonial Drill Review), C208.02 (Drill with Arms)
  // ==========================================================
  const ARENA_QUESTIONS = [
    // ── EO M208.01 — Execute Left and Right Turns on the March ──
    { eo: "M208.01", q: "On the command LEFT – TURN on the march in quick time, which foot is forward and on the ground when the command is given?", options: ["The left foot", "The right foot", "Either foot", "Both feet together"], correct: 1 },
    { eo: "M208.01", q: "On the command RIGHT – TURN on the march in quick time, which foot is forward and on the ground when the command is given?", options: ["The right foot", "The left foot", "Either foot", "Both feet together"], correct: 1 },
    { eo: "M208.01", q: "What is the correct timing for a left turn on the march?", options: ["One, two, three", "Check, pivot, left, right, left", "Left, right, left", "Pivot, check, march"], correct: 1 },
    { eo: "M208.01", q: "What is the correct timing for a right turn on the march?", options: ["Check, pivot, right, left, right", "One, two, three, four", "Right, left, right", "Pivot, march, check"], correct: 0 },
    { eo: "M208.01", q: "In the first movement of a left turn on the march, what does the cadet do?", options: ["Pivot 90 degrees immediately", "Take one half pace forward with the left foot, right arm swung forward, left arm to the rear", "Bend the right knee and cut arms", "Stop marching and stand at attention"], correct: 1 },
    { eo: "M208.01", q: "In the second movement of a left turn on the march, what happens to the arms?", options: ["They continue swinging normally", "They are cut to the side as in the position of attention", "The left arm is raised above the head", "Both arms are extended forward"], correct: 1 },
    { eo: "M208.01", q: "During a left turn on the march, on which foot does the cadet pivot 90 degrees to the left?", options: ["The right foot", "The ball of the left foot", "The heel of the right foot", "Both feet simultaneously"], correct: 1 },
    { eo: "M208.01", q: "During a right turn on the march, on which foot does the cadet pivot 90 degrees to the right?", options: ["The ball of the right foot", "The left foot", "The heel of the left foot", "Both feet simultaneously"], correct: 0 },
    { eo: "M208.01", q: "When bending the knee during a turn on the march, how high is the knee raised off the ground?", options: ["5 cm", "10 cm", "15 cm", "20 cm"], correct: 2 },
    { eo: "M208.01", q: "In the third movement of a left turn on the march, what does the cadet do?", options: ["Come to a halt", "Take a half pace with the left foot and continue to march, swinging the arms", "Turn another 90 degrees", "Stand at attention"], correct: 1 },
    { eo: "M208.01", q: "What quality does well-rehearsed drill promote among squad members, according to the lesson conclusion?", options: ["Individualism", "Competition", "Teamwork", "Silence"], correct: 2 },
    { eo: "M208.01", q: "What is the total time allocated for EO M208.01 (Execute Left and Right Turns on the March)?", options: ["30 minutes", "45 minutes", "60 minutes", "90 minutes"], correct: 2 },
    { eo: "M208.01", q: "Which instructional method is used for EO M208.01?", options: ["Lecture", "Demonstration and performance", "Group discussion", "Self-study"], correct: 1 },
    { eo: "M208.01", q: "What reference manual is cited for the drill movements in EO M208.01?", options: ["A-PD-201-000/PT-000, The Canadian Forces Manual of Drill and Ceremonial", "The Cadet Air Rifle Reference Manual", "The Royal Canadian Sea Cadets Manual", "The Army Cadet Field Manual"], correct: 0 },

    // ── EO M208.02 — Form Single File From the Halt ──
    { eo: "M208.02", q: "On the command to form single file from the halt, what does the directing flank do?", options: ["Stands still and waits", "Marches off in single file in quick time", "Turns about and marches away", "Forms a line abreast"], correct: 1 },
    { eo: "M208.02", q: "When forming single file from the halt as a squad in threes, what do the remaining cadets do after the directing flank marches off?", options: ["They halt in place", "They mark time", "They immediately march forward", "They about turn"], correct: 1 },
    { eo: "M208.02", q: "When forming single file from the halt as a squad in threes, what do the markers of the other two ranks execute?", options: ["A right turn only", "A left (right) incline, leading off when the file on their left (right) is clear", "An about turn", "They stand fast permanently"], correct: 1 },
    { eo: "M208.02", q: "What is the full command to form single file from the halt?", options: ["SINGLE FILE, MARCH", "SINGLE FILE FROM THE LEFT (RIGHT), QUICK – MARCH", "FILE, GO", "FORM UP, QUICK MARCH"], correct: 1 },
    { eo: "M208.02", q: "When forming single file from the halt as a squad in line, how do the remaining cadets follow the directing flank file?", options: ["They about turn and march away", "They mark time indefinitely", "By wheeling in single file, following the file on their left (right) when clear", "They run to catch up"], correct: 2 },
    { eo: "M208.02", q: "What is the total time allocated for EO M208.02 (Form Single File From the Halt)?", options: ["15 minutes", "30 minutes", "45 minutes", "60 minutes"], correct: 1 },
    { eo: "M208.02", q: "Should cadets practice forming single file from different positions in the squad?", options: ["No, only from the right", "No, only from the left", "Yes, they should practice from different positions", "Only from the centre"], correct: 2 },
    { eo: "M208.02", q: "What must be maintained when completing the movements for forming single file?", options: ["Silence", "Cadence", "Eye contact", "Arm swing only"], correct: 1 },
    { eo: "M208.02", q: "How many teaching points are there in EO M208.02?", options: ["One", "Two", "Three", "Four"], correct: 1 },
    { eo: "M208.02", q: "In EO M208.02, Teaching Point 1 covers forming single file from the halt as which formation?", options: ["A squad in line", "A squad in threes", "A single rank", "A hollow square"], correct: 1 },
    { eo: "M208.02", q: "In EO M208.02, Teaching Point 2 covers forming single file from the halt as which formation?", options: ["A squad in line", "A squad in threes", "A column of route", "A diamond formation"], correct: 0 },

    // ── EO C208.01 — Practice Ceremonial Drill as a Review ──
    { eo: "C208.01", q: "What is the purpose of EO C208.01 (Practice Ceremonial Drill as a Review)?", options: ["To introduce new drill movements", "To allow practice of Green Star mandatory training", "To learn sword drill", "To teach biathlon skills"], correct: 1 },
    { eo: "C208.01", q: "What is the total time allocated for EO C208.01 (Practice Ceremonial Drill as a Review)?", options: ["30 minutes", "45 minutes", "60 minutes", "120 minutes"], correct: 2 },
    { eo: "C208.01", q: "Is EO C208.01 a mandatory or complementary lesson in the Red Star program?", options: ["Mandatory", "Complementary", "Optional elective", "Summer training only"], correct: 1 },
    { eo: "C208.01", q: "Where should an instructor refer for the content of EO C208.01 since no instructional guide is provided?", options: ["A-PD-201-000/PT-001", "A-CR-CCP-053/PT-001", "The Red Star PO 211 manual", "The Green Star Navigation guide"], correct: 0 },
    { eo: "C208.01", q: "Ceremonial drill review focuses on rehearsing which type of movements?", options: ["New advanced movements only", "Previously learned Green Star drill movements", "Fieldcraft skills", "Navigation techniques"], correct: 1 },
    { eo: "C208.01", q: "What is a key benefit of practising ceremonial drill as a review?", options: ["It replaces fitness training", "It improves marksmanship", "It reinforces discipline, precision, and cohesion previously developed", "It teaches first aid"], correct: 2 },
    { eo: "C208.01", q: "Which of the following best describes the relationship between C208.01 and the Green Star program?", options: ["It covers entirely new material not seen before", "It reviews and reinforces Green Star mandatory drill training", "It replaces Green Star drill entirely", "It is unrelated to Green Star"], correct: 1 },

    // ── EO C208.02 — Execute Drill With Arms ──
    { eo: "C208.02", q: "What is the total time allocated for EO C208.02 (Execute Drill With Arms)?", options: ["60 minutes", "120 minutes", "180 minutes", "240 minutes"], correct: 3 },
    { eo: "C208.02", q: "Which manual should an instructor refer to for the content of EO C208.02 since no instructional guide is provided?", options: ["A-PD-201-000/PT-000, The Canadian Forces Manual of Drill and Ceremonial", "A-CR-CCP-053/PT-001, Royal Canadian Sea Cadets Manual of Drill and Ceremonial", "The Army Cadet Field Manual", "The Cadet Marksmanship Reference"], correct: 1 },
    { eo: "C208.02", q: "Is EO C208.02 a mandatory or complementary lesson in the Red Star program?", options: ["Mandatory", "Complementary", "Required for all cadets", "Summer training only"], correct: 1 },
    { eo: "C208.02", q: "What does 'drill with arms' primarily involve?", options: ["Navigation with a compass", "Drill movements performed while carrying a rifle or weapon", "First aid with medical supplies", "Communication with radios"], correct: 1 },
    { eo: "C208.02", q: "How many periods does EO C208.02 account for in the PO 208 schedule?", options: ["2 periods", "4 periods", "6 periods", "8 periods"], correct: 3 },
    { eo: "C208.02", q: "What is the maximum number of complementary periods allowed for PO 208 in total?", options: ["6 periods", "9 periods", "12 periods", "16 periods"], correct: 3 },
    { eo: "C208.02", q: "Of the nine complementary periods for PO 208, what is the maximum that may be used for C108.01 and C208.01 combined?", options: ["3 periods", "4 periods", "6 periods", "9 periods"], correct: 2 },
    { eo: "C208.02", q: "Are cadet corps required to use all nine complementary periods available for PO 208?", options: ["Yes, all must be used", "No, corps are not required to use all nine periods", "Only if the corps has a drill team", "Only during summer training"], correct: 1 },

    // ── PO 208 General / Cross-cutting ──
    { eo: "PO 208", q: "What is the overall aim of PO 208 (Execute Drill as a Member of a Squad)?", options: ["To teach cadets how to navigate", "To provide cadets with drill movements designed to improve the efficiency of a squad on the march", "To develop marksmanship skills", "To teach survival skills"], correct: 1 },
    { eo: "PO 208", q: "Under what environmental conditions should PO 208 drill be conducted?", options: ["In a classroom only", "A drill hall or outdoor parade square in favourable weather", "In any weather conditions", "Only in the field"], correct: 1 },
    { eo: "PO 208", q: "What is given to cadets as part of the conditions for executing PO 208 drill?", options: ["Maps and compasses", "Words of command, supervision, and assistance as required", "Rifles and ammunition", "Radio equipment"], correct: 1 },
    { eo: "PO 208", q: "Which manual serves as the standard reference for all PO 208 drill movements?", options: ["A-PD-201-000/PT-000, The Canadian Forces Manual of Drill and Ceremonial", "The Army Cadet Survival Manual", "The Cadet Fitness Guide", "The Red Star Navigation Manual"], correct: 0 },
    { eo: "PO 208", q: "What does the PO 208 standard require cadets to execute as a member of a squad?", options: ["Navigation and bearings", "Turns to the left and right on the march, and forming single file from the halt as a squad in threes and in line", "Fire lighting and shelter building", "Radio communication procedures"], correct: 1 },
    { eo: "PO 208", q: "What should instructors do regarding the order of EOs in PO 208?", options: ["Conduct them in any order", "Conduct the EOs as listed, as subsequent EOs are dependent on previous EOs", "Skip mandatory EOs if time is short", "Conduct complementary EOs first"], correct: 1 },
    { eo: "PO 208", q: "Which vocabulary words are recommended to impress on the platoon that movements must be performed smartly?", options: ['"Slow", "steady", "careful", "gentle"', '"Crack", "drive", "seize", "grasp"', '"Loud", "bold", "fast", "hard"', '"Quiet", "soft", "smooth", "easy"'], correct: 1 },
    { eo: "PO 208", q: "What must never be used during drill instruction, according to the instructor guidance?", options: ["Assistant instructors", "Profanity or personal sarcasm", "Verbal commands", "Demonstrations"], correct: 1 },
    { eo: "PO 208", q: "What should an instructor do when faults occur during drill practice?", options: ["Ignore them until the end of the lesson", "Check for faults and correct them immediately when they occur", "Only correct the senior cadet", "Wait for the next training session"], correct: 1 },
    { eo: "PO 208", q: "What indicates the words of command for each drill movement in the instructional guide?", options: ["Italic text", "Capitalization", "Underlined text", "Bold red text"], correct: 1 },
    { eo: "PO 208", q: "What should be combined with proper drill movements throughout the period of instruction?", options: ["Loud shouting", "A professional demeanour", "Relaxed posture", "Continuous talking"], correct: 1 },
    { eo: "PO 208", q: "Which of the following formations can be used for effective squad instruction of drill?", options: ["Single rank, hollow square, or semi-circle", "Column of route only", "Diamond formation only", "Single file only"], correct: 0 },
    { eo: "PO 208", q: "When may assistant instructors be required for drill instruction?", options: ["Never", "When the squad is broken down into smaller sections for movements that require extra practice", "Only for ceremonial parades", "Only during summer training"], correct: 1 },
    { eo: "PO 208", q: "What is the recommended approach for conducting each teaching point in a drill lesson?", options: ["Lecture only with no practice", "Have cadets fall in, explain and demonstrate, give time to practice, then perform as a squad", "Watch a video and discuss", "Read from the manual only"], correct: 1 },
    { eo: "PO 208", q: "What should the end-of-lesson confirmation for drill consist of?", options: ["A written exam", "Cadets performing the movements as a squad, emphasizing any movements they had difficulty with", "An oral quiz", "A peer evaluation form"], correct: 1 },
    { eo: "PO 208", q: "In what three ways should the complete movements be practised during end-of-lesson confirmation?", options: ["Standing, sitting, kneeling", "With the instructor calling the time, the squad calling the time, and the squad judging the time", "Alone, in pairs, as a squad", "Slow, medium, fast pace"], correct: 1 },
    { eo: "PO 208", q: "What qualities does drill develop through self-discipline and practice?", options: ["Strength and endurance", "Obedience and alertness that create teamwork among members", "Marksmanship and accuracy", "Navigation and orientation"], correct: 1 },
    { eo: "PO 208", q: "What is the complementary EO from the Green Star program that may be selected as complementary training in the Red Star program for PO 208?", options: ["C108.01 (Execute Supplementary Drill Movements)", "C108.02 (Fieldcraft)", "C108.03 (Navigation)", "C108.04 (Fitness)"], correct: 0 },
    { eo: "PO 208", q: "From which chapters of A-PD-201-000/PT-000 should drill movements be selected for EO C108.01?", options: ["Chapters 1 or 4", "Chapters 2 or 3", "Chapters 5 or 6", "The appendix only"], correct: 1 },
    { eo: "PO 208", q: "What type of feedback is recommended during drill practices, weekly parade nights, and ceremonial parades?", options: ["No feedback", "Ongoing feedback", "Feedback only at the end of the year", "Written reports only"], correct: 1 },
    { eo: "PO 208", q: "Which training element do the PO 208 drill lessons fall under in the Red Star program?", options: ["Fitness and Sports", "Leadership / Drill and Ceremonial", "Expedition Training", "Biathlon"], correct: 1 },
    { eo: "PO 208", q: "What is the total mandatory period count for PO 208?", options: ["1 period", "3 periods", "6 periods", "8 periods"], correct: 1 },
    { eo: "PO 208", q: "What is the total complementary period count for PO 208?", options: ["9 periods", "12 periods", "16 periods", "20 periods"], correct: 2 },
    { eo: "PO 208", q: "How many periods does EO M208.01 account for in the PO 208 schedule?", options: ["1 period", "2 periods", "3 periods", "4 periods"], correct: 1 },
    { eo: "PO 208", q: "How many periods does EO M208.02 account for in the PO 208 schedule?", options: ["1 period", "2 periods", "3 periods", "4 periods"], correct: 0 },
    { eo: "PO 208", q: "How many periods does EO C208.01 account for in the PO 208 schedule?", options: ["1 period", "2 periods", "4 periods", "6 periods"], correct: 1 }
  ];

  // ==========================================================
  // ARENA GAME ENGINE
  // ==========================================================
  const drillArena = {
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
        '<div class="arena-idle-ico">🎖️</div>' +
        '<h2>Advanced Drill & Ceremonial Arena</h2>' +
        '<p class="muted" style="font-size:13px; line-height:1.6; max-width:480px; margin:0 auto;">Test your mastery of all Red Star Drill & Ceremonial training modules. The Arena presents randomized questions drawn from every EO of the PO 208 syllabus — turns on the march, forming single file, ceremonial drill review, and drill with arms. Answer correctly to build your streak and confirm your advanced drill fundamentals.</p>' +
        '<div class="arena-mode-buttons" style="margin-top:20px;">' +
          '<button class="btn btn-primary" id="drillArenaStartBtn" type="button">🎮 Start 10-Question Round</button>' +
          '<button class="btn btn-ghost" id="drillArenaExamBtn" type="button" style="margin-left:10px;">📋 Exam Mode (8 to pass)</button>' +
        '</div>' +
        (state.arenaBadgeEarned ?
          '<p class="muted" style="margin-top:14px; font-size:12px;">✅ Drill Arena badge earned! Keep practising to improve your streak.</p>' :
          '<p class="muted" style="margin-top:14px; font-size:12px;">Complete a 10-question round with 8+ correct to earn the Drill Arena badge.</p>') +
      '</div>';
    arenaUpdateSide();

    const startBtn = document.getElementById("drillArenaStartBtn");
    const examBtn = document.getElementById("drillArenaExamBtn");
    if (startBtn) startBtn.addEventListener("click", function () { arenaStartRound(false); });
    if (examBtn) examBtn.addEventListener("click", function () { arenaStartRound(true); });
  }

  function arenaStartRound(examMode) {
    drillArena.active = true;
    drillArena.examMode = !!examMode;
    drillArena.pool = shuffleArenaArray(ARENA_QUESTIONS.slice());
    drillArena.poolIndex = 0;
    drillArena.score = 0;
    drillArena.correct = 0;
    drillArena.wrong = 0;
    drillArena.streak = 0;
    drillArena.round = 0;
    drillArena.totalRounds = 10;
    drillArena.answered = false;
    arenaRenderQuestion();
  }

  function arenaRenderQuestion() {
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    if (drillArena.poolIndex >= drillArena.pool.length || drillArena.round >= drillArena.totalRounds) {
      arenaFinishRound();
      return;
    }
    drillArena.currentQ = drillArena.pool[drillArena.poolIndex];
    drillArena.answered = false;
    const q = drillArena.currentQ;
    const progressPct = Math.round((drillArena.round / drillArena.totalRounds) * 100);

    stage.innerHTML =
      '<div class="arena-active">' +
        '<div class="arena-progress-bar"><div class="arena-progress-fill" style="width:' + progressPct + '%"></div></div>' +
        '<div class="arena-q-meta">' +
          '<span class="arena-eo-tag">' + escapeHTML(q.eo) + "</span>" +
          '<span class="arena-round">Question ' + (drillArena.round + 1) + " of " + drillArena.totalRounds + "</span>" +
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
    if (drillArena.answered) return;
    drillArena.answered = true;
    const q = drillArena.currentQ;
    const isCorrect = idx === q.correct;
    const fb = document.getElementById("arenaFeedback");
    drillArena.round++;

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
      drillArena.correct++;
      drillArena.streak++;
      if (drillArena.streak > drillArena.bestStreak) drillArena.bestStreak = drillArena.streak;
      drillArena.score += 10 + (drillArena.streak > 1 ? drillArena.streak * 2 : 0);
      if (fb) { fb.className = "arena-feedback ok"; fb.innerHTML = "✅ Correct! " + escapeHTML(q.options[q.correct]) + (drillArena.streak > 1 ? " — 🔥 " + drillArena.streak + " streak!" : ""); }
    } else {
      drillArena.wrong++;
      drillArena.streak = 0;
      if (fb) { fb.className = "arena-feedback err"; fb.innerHTML = "❌ Incorrect. The correct answer is: <strong>" + escapeHTML(q.options[q.correct]) + "</strong>"; }
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
      drillArena.poolIndex++;
      arenaRenderQuestion();
    }, 1800);
  }

  function arenaFinishRound() {
    drillArena.active = false;
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    const total = drillArena.correct + drillArena.wrong;
    const pct = total > 0 ? Math.round((drillArena.correct / total) * 100) : 0;
    const passed = drillArena.correct >= 8;

    if (passed && !state.arenaBadgeEarned) {
      state.arenaBadgeEarned = true;
      state.xp += 100;
      saveState();
      refreshBadges();
      renderSidebar();
      renderTopStats();
      renderCommand();
      renderAnalysis();
      renderRanks();
    }

    let msg = "";
    let badgeText = "";
    if (drillArena.examMode) {
      if (passed) {
        msg = "QUALIFIED! You passed the Advanced Drill & Ceremonial exam with " + drillArena.correct + "/" + total + " correct. Score: " + drillArena.score + ".";
        badgeText = "Drill Arena badge unlocked — you have confirmed your advanced drill fundamentals!";
      } else {
        msg = "NOT YET QUALIFIED. You scored " + drillArena.correct + "/" + total + ". You need 8/10 to pass. Review the Learn library and try again.";
      }
    } else {
      if (pct >= 80) {
        msg = "OUTSTANDING! " + drillArena.correct + "/" + total + " correct (" + pct + "%). Score: " + drillArena.score + ". Your advanced drill fundamentals are confirmed.";
        if (passed && state.arenaBadgeEarned) badgeText = "Drill Arena badge earned!";
      } else if (pct >= 50) {
        msg = "SOLID EFFORT. " + drillArena.correct + "/" + total + " correct (" + pct + "%). Score: " + drillArena.score + ". Review the Learn library and try again.";
      } else {
        msg = "KEEP TRAINING. " + drillArena.correct + "/" + total + " correct (" + pct + "%). Study the Learn library and practise each module.";
      }
    }

    stage.innerHTML =
      '<div class="arena-complete">' +
        '<div class="arena-complete-ico">' + (passed ? "🏆" : "📊") + "</div>" +
        '<h2>' + (passed ? "Round Complete!" : "Round Complete") + "</h2>" +
        '<div class="arena-score-display">' +
          '<div class="arena-score-item"><div class="as-val">' + drillArena.correct + "/" + total + '</div><div class="as-lbl">Correct</div></div>' +
          '<div class="arena-score-item"><div class="as-val">' + drillArena.score + '</div><div class="as-lbl">Score</div></div>' +
          '<div class="arena-score-item"><div class="as-val">' + drillArena.bestStreak + '</div><div class="as-lbl">Best Streak</div></div>' +
        "</div>" +
        '<p style="color:var(--ink-2); font-size:13px; line-height:1.6; max-width:440px; margin:12px auto;">' + msg + "</p>" +
        (badgeText ? '<p style="color:var(--gold-bright); font-size:13px; font-weight:600; margin:10px 0;">🎖️ ' + escapeHTML(badgeText) + "</p>" : "") +
        '<div class="arena-mode-buttons" style="margin-top:16px;">' +
          '<button class="btn btn-primary" id="drillArenaRetryBtn" type="button">🎮 Play Again</button>' +
          '<button class="btn btn-ghost" id="drillArenaExamBtn2" type="button" style="margin-left:10px;">📋 Exam Mode</button>' +
        "</div>" +
      "</div>";

    arenaUpdateSide();
    if (passed) toast("ok", "🏆 Drill Arena round passed! " + drillArena.correct + "/" + total + " correct.");

    const retryBtn = document.getElementById("drillArenaRetryBtn");
    const examBtn2 = document.getElementById("drillArenaExamBtn2");
    if (retryBtn) retryBtn.addEventListener("click", function () { arenaStartRound(false); });
    if (examBtn2) examBtn2.addEventListener("click", function () { arenaStartRound(true); });
  }

  function arenaUpdateSide() {
    const side = document.getElementById("arenaSide");
    if (!side) return;
    const total = drillArena.correct + drillArena.wrong;
    const pct = total > 0 ? Math.round((drillArena.correct / total) * 100) : 0;
    side.innerHTML =
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">📊</span> Arena Stats</h3>' +
        '<div class="arena-stat-row"><span>Score</span><strong>' + drillArena.score + "</strong></div>" +
        '<div class="arena-stat-row"><span>Correct</span><strong>' + drillArena.correct + "/" + total + "</strong></div>" +
        '<div class="arena-stat-row"><span>Accuracy</span><strong>' + pct + "%</strong></div>" +
        '<div class="arena-stat-row"><span>Current Streak</span><strong>' + drillArena.streak + "</strong></div>" +
        '<div class="arena-stat-row"><span>Best Streak</span><strong>' + drillArena.bestStreak + "</strong></div>" +
      "</div>" +
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">🏆</span> Arena Badge</h3>' +
        '<div class="arena-badge-status ' + (state.arenaBadgeEarned ? "earned" : "locked") + '">' +
          (state.arenaBadgeEarned ?
            '<div class="ab-ico">🎖️</div><div class="ab-text"><strong>Drill Arena</strong><br/>Badge Earned!</div>' :
            '<div class="ab-ico">🔒</div><div class="ab-text"><strong>Locked</strong><br/>Score 8/10 to unlock</div>') +
        "</div>" +
      "</div>" +
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">📚</span> Question Pool</h3>' +
        '<div class="arena-stat-row"><span>Total Questions</span><strong>' + ARENA_QUESTIONS.length + "</strong></div>" +
        '<div class="arena-stat-row"><span>Modules Covered</span><strong>4</strong></div>' +
        '<div class="arena-stat-row"><span>Rounds Played</span><strong>' + (state.totalAttempts > 0 ? Math.floor(state.totalAttempts / 10) : 0) + "</strong></div>" +
      "</div>";
  }

  function renderArenaGame() {
    if (!drillArena.active) {
      arenaRenderStartScreen();
    } else {
      arenaRenderQuestion();
    }
  }

  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(DRILL_COMMANDS); } catch(e) {}
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(cadets); } catch(e) {}
    try { trMutate(sliderValue); } catch(e) {}
    try { trMutate(statusMap); } catch(e) {}
    try { trMutate(toggleState); } catch(e) {}
    try { trMutate(ARENA_QUESTIONS); } catch(e) {}
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
    if (mb) mb.addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));

    // SITREP file button
    const fsb = document.getElementById("fileSitrepBtn");
    if (fsb) fsb.addEventListener("click", fileSitrep);

    // Check for deep-link: ?mission=id
    const params = new URLSearchParams(window.location.search);
    const deepMission = params.get("mission");

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
