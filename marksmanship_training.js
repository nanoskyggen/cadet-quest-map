/* ============================================================
   FIRING RANGE — MARKSMANSHIP PRINCIPLES TRAINING
   marksmanship_training.js
   Range Qualification Simulator: hands-on marksmanship fundamentals
   Maple Defender-style dashboard engine (IIFE architecture)
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "marksmanshipTrainingProgress",
    sitreps: "marksmanshipTrainingSitreps",
    wrongAttempts: "marksmanshipTrainingWrongAttempts",
    streak: "marksmanshipTrainingStreak",
    bestStreak: "marksmanshipTrainingBestStreak",
    readArticles: "marksmanshipTrainingReadArticles",
    rangeGame: "marksmanshipTrainingRangeGame"
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const MARKSMANSHIP_BADGE_ID = 18;

  // ==========================================================
  // RANK LADDER (Marksmanship progression ranks)
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Range Recruit",           icon: "\u{1F396}\u{FE0F}",  xp: 0,    callsign: "RANGE-1" },
    { id: 1, name: "Range Cadet",             icon: "\u{1F396}\u{FE0F}",  xp: 300,  callsign: "RANGE-2" },
    { id: 2, name: "Senior Marksman Cadet",   icon: "\u2B50",  xp: 700,  callsign: "SENIOR-3" },
    { id: 3, name: "Sharpshooter Cadet",      icon: "\u{1F3C5}", xp: 1200, callsign: "SHARP-4" },
    { id: 4, name: "Range Instructor Cadet",  icon: "\u{1F451}", xp: 1800, callsign: "INSTR-5" },
    { id: 5, name: "Master Marksman Cadet",   icon: "🏆",  xp: 2500, callsign: "MASTER-6" }
  ];

  // ==========================================================
  // TOOLS (range tools cadets must "open")
  // ==========================================================
  const TOOLS = [
    { id: "position",    icon: "🧍", label: "Firing Position" },
    { id: "sightalign",  icon: "👁️", label: "Sight Alignment Tool" },
    { id: "breathcycle", icon: "ᾧ️", label: "Breathing Cycle Chart" },
    { id: "trigger",     icon: "👆", label: "Trigger Pressure Gauge" },
    { id: "npa",         icon: "🧭", label: "NPA Compass" },
    { id: "groupanalyser", icon: "📊", label: "Shot Group Analyser" },
    { id: "zero",        icon: "🎯", label: "Zeroing Chart" },
    { id: "wind",        icon: "\u{1F32C}\u{FE0F}", label: "Wind Gauge" },
    { id: "rangechart",  icon: "\u{1F4CF}", label: "Range Estimation" },
    { id: "sling",       icon: "\u{1F45C}", label: "Sling Adjustment" },
    { id: "rest",        icon: "\u{1F6CB}\u{FE0F}", label: "Rest & Support" },
    { id: "followthrough", icon: "🔁", label: "Follow-Through Card" },
    { id: "safety",      icon: "🛡️", label: "Range Safety" }
  ];

  // ==========================================================
  // TRAINING MISSIONS \u2014 First-Year Marksmanship Principles
  // Each mission has 4 hands-on tasks. Tool enforcement required.
  // ==========================================================
  const MISSIONS = [
    {
      id: "position",
      order: 1,
      tag: "MARKS 01",
      icon: "🧍",
      title: "The Firing Position & Hold",
      desc: "Master the foundation of marksmanship — a firm, stable firing position that supports the rifle.",
      xp: 100,
      brief: "Your range instructor is putting you through the firing position. This is the foundation of every shot. The shooting position and hold must be firm enough to support the rifle. Get this wrong and every shot that follows will be off. Bone support, muscle relaxation, and natural balance are the keys to a steady hold.",
      scene: "position",
      chapters: [
        { title: "Bone Support", desc: "Use bones, not muscles, to support the rifle." },
        { title: "Muscle Relaxation", desc: "Relax muscles to let bones carry the weight." },
        { title: "Natural Balance", desc: "Position must be naturally balanced over support points." },
        { title: "Firm Hold", desc: "The hold must be firm enough to support the rifle without tension." },
      ],
      tasks: [
        {
          type: "select", tool: "position",
          title: "Position the Support Arm",
          prompt: "Open the Firing Position tool and select the correct support arm structure for a stable prone position.",
          options: [
            "Left forearm vertical, forming a support triangle with the sling",
            "Left arm flat on the ground, relaxed sideways",
            "Right arm tucked under the body for support",
            "Both arms extended forward equally",
          ],
          expected: "Left forearm vertical, forming a support triangle with the sling",
          proof: "Left forearm vertical with sling support — the bone support triangle that keeps the rifle steady without muscle effort."
        },
        {
          type: "select", tool: "position",
          title: "Muscle vs Bone",
          prompt: "What should carry the weight of the rifle in a good firing position?",
          options: [
            "Bones, with muscles relaxed",
            "Muscles, tensed for stability",
            "A combination of both equally",
            "The sling alone, arms completely loose",
          ],
          expected: "Bones, with muscles relaxed",
          proof: "Bones carry the weight, muscles relaxed — the fundamental principle of a stable, fatigue-free firing position."
        },
        {
          type: "select", tool: "position",
          title: "Left Elbow Placement",
          prompt: "Where should the left (support) elbow be placed in the prone position?",
          options: [
            "Directly under the rifle, forming a vertical support line",
            "Out to the side at a wide angle for comfort",
            "Behind the body for recoil absorption",
            "Wherever feels most natural at the time",
          ],
          expected: "Directly under the rifle, forming a vertical support line",
          proof: "Left elbow directly under the rifle — the vertical support line that gives maximum stability and consistency."
        },
        {
          type: "note", tool: "position",
          title: "Describe the Firm Hold",
          prompt: "Write a note describing the key elements of a firm, stable firing position. Include the keywords 'bone support', 'muscle relaxation', and 'natural balance'.",
          keywords: ["bone support", "muscle relaxation", "natural balance"],
          proof: "Bone support, muscle relaxation, and natural balance — the three pillars of a firm, steady hold. Mission complete."
        },
      ]
    },
    {
      id: "npa",
      order: 2,
      tag: "MARKS 02",
      icon: "🧭",
      title: "Natural Point of Aim",
      desc: "Learn to align your body so the rifle points naturally at the target — zero muscle tension.",
      xp: 100,
      brief: "Your instructor introduces the Natural Point of Aim (NPA) — where the rifle naturally wants to point when your position is relaxed. If the rifle does not point naturally at the target, you will use muscle tension to hold it on aim, and that tension will cause the shot to wander. Adjusting your body position to achieve correct NPA is a critical marksmanship skill.",
      scene: "npa",
      chapters: [
        { title: "Finding NPA", desc: "Close your eyes, relax, let the rifle settle — where does it point?" },
        { title: "Body Adjustment", desc: "Shift your body, not the rifle, to move the NPA." },
        { title: "Verification", desc: "Close eyes again to confirm the NPA is on target." },
        { title: "No Muscle Tension", desc: "The rifle must stay on target with no muscular effort." },
      ],
      tasks: [
        {
          type: "select", tool: "npa",
          title: "Finding the NPA",
          prompt: "Open the NPA Compass tool. How do you find your natural point of aim?",
          options: [
            "Close your eyes, relax completely, and let the rifle settle — note where it points",
            "Aim at the target and tense your muscles to hold it there",
            "Look through the sights and force the rifle onto the target",
            "Ask a partner to position the rifle for you",
          ],
          expected: "Close your eyes, relax completely, and let the rifle settle — note where it points",
          proof: "Close eyes, relax, let the rifle settle — the NPA test reveals where your body naturally points the rifle."
        },
        {
          type: "select", tool: "npa",
          title: "Adjusting the NPA",
          prompt: "If the NPA is off target, how should you correct it?",
          options: [
            "Shift your body position — not the rifle — to move the NPA onto the target",
            "Pull the rifle back onto the target with your arms",
            "Tilt your head to compensate for the offset",
            "Adjust the rear sight to correct the point of aim",
          ],
          expected: "Shift your body position — not the rifle — to move the NPA onto the target",
          proof: "Shift the body, not the rifle — adjusting NPA means repositioning yourself so the relaxed rifle points at the target."
        },
        {
          type: "select", tool: "npa",
          title: "Why NPA Matters",
          prompt: "Why is a correct natural point of aim critical for accurate shooting?",
          options: [
            "Without it, muscle tension holds the rifle on target and degrades the shot",
            "It allows you to shoot faster between targets",
            "It makes the rifle lighter and easier to hold",
            "It is only important for long-range shooting, not close range",
          ],
          expected: "Without it, muscle tension holds the rifle on target and degrades the shot",
          proof: "Muscle tension from poor NPA moves the rifle during the shot — correct NPA means the rifle stays on aim with zero effort."
        },
        {
          type: "note", tool: "npa",
          title: "Describe NPA Verification",
          prompt: "Write a note describing how to verify and adjust your natural point of aim. Include the keywords 'close eyes', 'relax', and 'shift body'.",
          keywords: ["close eyes", "relax", "shift body"],
          proof: "Close eyes, relax, and shift body — the NPA verification cycle ensures the rifle points naturally at the target. Mission complete."
        },
      ]
    },
    {
      id: "sightalignment",
      order: 3,
      tag: "MARKS 03",
      icon: "👁️",
      title: "Sight Alignment & Sight Picture",
      desc: "Master the visual fundamentals — aligning front and rear sights and placing them on the target.",
      xp: 100,
      brief: "Your instructor walks you through sight alignment and sight picture. Sight alignment means the front sight is centred in the rear aperture. Sight picture means the aligned sights are placed on the target with the correct hold. Even a tiny sight alignment error compounds over distance — a 1mm misalignment at the sights can mean a miss of several centimetres downrange. Focus on the front sight; the target should be slightly blurry.",
      scene: "sightalignment",
      chapters: [
        { title: "Sight Alignment", desc: "Front sight centred in the rear aperture — equal light on both sides." },
        { title: "Sight Picture", desc: "Aligned sights placed on the target — the aim point." },
        { title: "Visual Focus", desc: "Focus on the front sight, not the target." },
        { title: "The 6 o'Clock Hold", desc: "Front sight at the bottom of the aiming mark for a consistent picture." },
      ],
      tasks: [
        {
          type: "select", tool: "sightalign",
          title: "Sight Alignment Defined",
          prompt: "Open the Sight Alignment Tool. What does correct sight alignment look like?",
          options: [
            "Front sight centred in the rear aperture with equal light on both sides",
            "Front sight touching the top of the rear aperture",
            "Rear aperture centred on the front sight tip",
            "Target centred between the front and rear sights",
          ],
          expected: "Front sight centred in the rear aperture with equal light on both sides",
          proof: "Front sight centred in rear aperture, equal light both sides — the definition of correct sight alignment."
        },
        {
          type: "select", tool: "sightalign",
          title: "Visual Focus Point",
          prompt: "Where should your eye focus be when aiming?",
          options: [
            "On the front sight — the target will be slightly blurry",
            "On the target — the sights should be slightly blurry",
            "Equally on both the sights and the target",
            "On the rear aperture only",
          ],
          expected: "On the front sight — the target will be slightly blurry",
          proof: "Focus on the front sight — the sharpest element in your sight picture. The target is secondary; the front sight dictates where the bullet goes."
        },
        {
          type: "select", tool: "sightalign",
          title: "Sight Picture",
          prompt: "What is the 'sight picture'?",
          options: [
            "The aligned sights placed on the target with the correct hold",
            "The view through the rear aperture only",
            "The shape of the front sight post",
            "The distance between front and rear sights",
          ],
          expected: "The aligned sights placed on the target with the correct hold",
          proof: "Sight picture = aligned sights + target placement. The complete visual relationship that determines where the bullet strikes."
        },
        {
          type: "note", tool: "sightalign",
          title: "Describe Alignment Error",
          prompt: "Write a note explaining why sight alignment is critical and how small errors compound. Include the keywords 'front sight', 'rear aperture', and 'compounds'.",
          keywords: ["front sight", "rear aperture", "compounds"],
          proof: "Front sight in rear aperture, errors compound downrange — even a 1mm misalignment becomes a large miss at distance. Mission complete."
        },
      ]
    },
    {
      id: "breathcontrol",
      order: 4,
      tag: "MARKS 04",
      icon: "ᾧ️",
      title: "Breath Control",
      desc: "Time the shot to the natural respiratory pause at the end of exhale for maximum stillness.",
      xp: 100,
      brief: "Your instructor teaches breath control — one of the most important factors in consistent shot placement. As you breathe, the rifle moves up and down. The best time to fire is during the natural respiratory pause at the end of an exhale, when the lungs are empty and the body is naturally still. The diaphragm is most relaxed at this point. The pause should last no more than 8–10 seconds — if you cannot fire in that window, breathe and start again.",
      scene: "breathcontrol",
      chapters: [
        { title: "Normal Breathing", desc: "Breathe normally while aligning the sights." },
        { title: "The Exhale", desc: "Take a breath, then exhale fully." },
        { title: "Natural Pause", desc: "At the end of exhale, the body is naturally still — fire now." },
        { title: "8–10 Second Window", desc: "If you cannot fire in 8–10 seconds, breathe and restart." },
      ],
      tasks: [
        {
          type: "select", tool: "breathcycle",
          title: "When to Fire",
          prompt: "Open the Breathing Cycle Chart tool. When is the best time to release the shot?",
          options: [
            "During the natural respiratory pause at the end of an exhale",
            "At the top of a full inhalation, lungs full",
            "Mid-breath, during the transition between inhale and exhale",
            "At any point — breathing does not affect the shot",
          ],
          expected: "During the natural respiratory pause at the end of an exhale",
          proof: "Fire at the natural respiratory pause, end of exhale — the body is naturally still, the diaphragm relaxed, the hold steadiest."
        },
        {
          type: "select", tool: "breathcycle",
          title: "Why End of Exhale?",
          prompt: "Why is the end of the exhale the best moment to fire?",
          options: [
            "The diaphragm is most relaxed and the body is naturally still at this point",
            "The lungs are full of air which stabilises the chest",
            "It is the longest pause in the breathing cycle",
            "It is the only pause available in the cycle",
          ],
          expected: "The diaphragm is most relaxed and the body is naturally still at this point",
          proof: "Diaphragm relaxed, body still at end of exhale — the physiological reason the natural respiratory pause is the optimal firing window."
        },
        {
          type: "select", tool: "breathcycle",
          title: "Maximum Hold Time",
          prompt: "How long should you hold your breath at the natural pause before firing?",
          options: [
            "No more than 8–10 seconds — then breathe and restart if needed",
            "As long as it takes to get the perfect shot",
            "30 seconds for maximum stillness",
            "2–3 seconds maximum, then fire immediately",
          ],
          expected: "No more than 8–10 seconds — then breathe and restart if needed",
          proof: "8–10 second maximum — holding longer causes oxygen deprivation and trembling, which degrades the shot. Restart if needed."
        },
        {
          type: "note", tool: "breathcycle",
          title: "Describe the Breathing Cycle",
          prompt: "Write a note describing the marksmanship breathing cycle and when to fire. Include the keywords 'exhale', 'respiratory pause', and 'natural stillness'.",
          keywords: ["exhale", "respiratory pause", "natural stillness"],
          proof: "Exhale, respiratory pause, natural stillness — the breathing cycle that gives you the steadiest hold for the shot. Mission complete."
        },
      ]
    },
    {
      id: "triggercontrol",
      order: 5,
      tag: "MARKS 05",
      icon: "👆",
      title: "Trigger Control",
      desc: "Master the smooth, steady trigger squeeze — the surprise break that does not disturb the aim.",
      xp: 100,
      brief: "Your instructor covers trigger control — arguably the most important marksmanship skill. The trigger must be squeezed smoothly and steadily straight back, not pulled or jerked. The shot should almost surprise you. If you anticipate the recoil and jerk the trigger, you will pull the rifle off target. Use the pad of the index finger, apply pressure straight to the rear, and maintain your sight picture through the shot break and follow-through.",
      scene: "triggercontrol",
      chapters: [
        { title: "Finger Placement", desc: "Pad of the index finger on the trigger — not too much, not too little." },
        { title: "Straight Back", desc: "Pressure applied straight to the rear — no sideways force." },
        { title: "The Surprise Break", desc: "Squeeze until the shot fires — do not anticipate the break." },
        { title: "No Jerking", desc: "Jerking the trigger pulls the rifle off target — squeeze, do not pull." },
      ],
      tasks: [
        {
          type: "select", tool: "trigger",
          title: "Finger Placement",
          prompt: "Open the Trigger Pressure Gauge tool. Where should the trigger finger be placed?",
          options: [
            "Pad of the index finger — the most sensitive part, not too much finger",
            "The first joint of the index finger, hooked around the trigger",
            "The tip of the finger only, barely touching",
            "The whole finger, wrapped around the trigger grip",
          ],
          expected: "Pad of the index finger — the most sensitive part, not too much finger",
          proof: "Pad of the index finger — sensitive enough for controlled pressure, positioned for a straight rearward squeeze without hooking."
        },
        {
          type: "select", tool: "trigger",
          title: "The Surprise Break",
          prompt: "What is the 'surprise break' in trigger control?",
          options: [
            "Squeezing so smoothly that the exact moment of firing is a surprise — no anticipation",
            "Firing when you least expect the rifle to go off",
            "A technique for rapid double-tap shooting",
            "When the rifle fires before you finish aiming",
          ],
          expected: "Squeezing so smoothly that the exact moment of firing is a surprise — no anticipation",
          proof: "Surprise break — the shot fires during a smooth squeeze without anticipation, eliminating the flinch that pulls shots off target."
        },
        {
          type: "select", tool: "trigger",
          title: "Trigger Jerk Consequence",
          prompt: "What happens if you jerk or pull the trigger instead of squeezing?",
          options: [
            "The rifle is pulled off target, usually toward the dominant hand side",
            "The shot goes high, above the target",
            "The rifle fails to fire",
            "There is no effect if the sights are aligned correctly",
          ],
          expected: "The rifle is pulled off target, usually toward the dominant hand side",
          proof: "Trigger jerk pulls the rifle off target — typically toward the trigger hand. The most common cause of horizontal shot displacement."
        },
        {
          type: "note", tool: "trigger",
          title: "Describe the Squeeze",
          prompt: "Write a note describing correct trigger control technique. Include the keywords 'smooth squeeze', 'straight back', and 'surprise break'.",
          keywords: ["smooth squeeze", "straight back", "surprise break"],
          proof: "Smooth squeeze, straight back, surprise break — the three elements of trigger control that keep the rifle on target through the shot. Mission complete."
        },
      ]
    },
    {
      id: "followthrough",
      order: 6,
      tag: "MARKS 06",
      icon: "🔁",
      title: "Follow-Through",
      desc: "Maintain position, aim, and trigger pressure after the shot — until the bullet leaves the barrel.",
      xp: 100,
      brief: "Your instructor teaches follow-through — what happens after the shot fires is just as important as what happens before. Follow-through means maintaining your firing position, sight alignment, and trigger pressure after the shot breaks, until the bullet has left the barrel and recoil is complete. On air rifles in particular, the pellet has a relatively long barrel time, so any change in pressure during that time will move the shot. Call your shot — note where the sights were at the instant of firing.",
      scene: "followthrough",
      chapters: [
        { title: "Hold Position", desc: "Maintain the firing position after the shot — do not relax." },
        { title: "Keep Aiming", desc: "Continue looking through the sights — do not lift your head." },
        { title: "Trigger Contact", desc: "Keep the finger on the trigger — do not release immediately." },
        { title: "Call the Shot", desc: "Note where the sights were at the instant of firing — was it on call?" },
      ],
      tasks: [
        {
          type: "select", tool: "followthrough",
          title: "What is Follow-Through",
          prompt: "Open the Follow-Through Card tool. What does follow-through mean in marksmanship?",
          options: [
            "Maintaining position, aim, and trigger pressure after the shot until the bullet leaves the barrel",
            "Looking at the target to see where the shot hit",
            "Chambering the next round immediately after firing",
            "Relaxing the position to recover from recoil",
          ],
          expected: "Maintaining position, aim, and trigger pressure after the shot until the bullet leaves the barrel",
          proof: "Follow-through = maintain position, aim, and trigger after the shot — the bullet is still in the barrel and any movement changes the point of impact."
        },
        {
          type: "select", tool: "followthrough",
          title: "Why Follow-Through Matters",
          prompt: "Why is follow-through especially important with air rifles?",
          options: [
            "Air rifle pellets have a relatively long barrel time, so any movement during that time shifts the shot",
            "Air rifles have no recoil so follow-through is unnecessary",
            "The pellet is so light that the rifle does not move anyway",
            "Follow-through only matters for centre-fire rifles",
          ],
          expected: "Air rifle pellets have a relatively long barrel time, so any movement during that time shifts the shot",
          proof: "Long barrel time on air rifles — the pellet is still accelerating when you might think the shot is over. Maintain position until it is truly gone."
        },
        {
          type: "select", tool: "followthrough",
          title: "Calling the Shot",
          prompt: "What does it mean to 'call your shot'?",
          options: [
            "Mentally noting where the sights were at the instant of firing, before looking at the target",
            "Shouting a call to the range officer before firing",
            "Predicting the score before the shot is fired",
            "Verbalising the shot sequence to your coach",
          ],
          expected: "Mentally noting where the sights were at the instant of firing, before looking at the target",
          proof: "Call the shot — snapshot the sight picture at the instant of fire. Compare it to the actual hit to diagnose alignment and trigger faults."
        },
        {
          type: "note", tool: "followthrough",
          title: "Describe Follow-Through",
          prompt: "Write a note describing correct follow-through. Include the keywords 'maintain position', 'trigger pressure', and 'call the shot'.",
          keywords: ["maintain position", "trigger pressure", "call the shot"],
          proof: "Maintain position, trigger pressure, call the shot — the follow-through sequence that completes the shot cycle. Mission complete."
        },
      ]
    },
    {
      id: "groupanalysis",
      order: 7,
      tag: "MARKS 07",
      icon: "📊",
      title: "Shot Grouping & Analysis",
      desc: "Fire groups and diagnose patterns — vertical stringing, horizontal spread, and scattered shots.",
      xp: 100,
      brief: "Your instructor introduces shot grouping and analysis. A group is several shots fired from the same position at the same point of aim. The size and shape of the group tells you about your shooting. A tight group means consistent fundamentals. Vertical stringing suggests a breathing problem. Horizontal spread often indicates trigger control issues. A scattered group means position instability. Learn to read your groups and diagnose the cause.",
      scene: "groupanalysis",
      chapters: [
        { title: "Group Size", desc: "Tight groups indicate consistent fundamentals — the goal." },
        { title: "Vertical Stringing", desc: "Shots spread up and down — usually a breathing fault." },
        { title: "Horizontal Spread", desc: "Shots spread left and right — usually a trigger control fault." },
        { title: "Scattered Group", desc: "Shots everywhere — position instability or inconsistent NPA." },
      ],
      tasks: [
        {
          type: "select", tool: "groupanalyser",
          title: "Tight Group Meaning",
          prompt: "Open the Shot Group Analyser tool. What does a tight shot group indicate?",
          options: [
            "Consistent fundamentals — the position, aim, and trigger are being repeated correctly",
            "The rifle is zeroed correctly but the shooter is lucky",
            "The target is too close to show real errors",
            "The shooter is anticipating the recoil",
          ],
          expected: "Consistent fundamentals — the position, aim, and trigger are being repeated correctly",
          proof: "Tight group = consistent fundamentals. The position, sight alignment, breath control, and trigger squeeze are being repeated shot after shot."
        },
        {
          type: "select", tool: "groupanalyser",
          title: "Vertical Stringing",
          prompt: "If your shots are stringing vertically (up and down), what is the most likely cause?",
          options: [
            "Inconsistent breathing — firing at different points in the breathing cycle",
            "Trigger control problems — jerking the trigger sideways",
            "The rifle sights are misaligned horizontally",
            "Wind pushing the bullets up and down",
          ],
          expected: "Inconsistent breathing — firing at different points in the breathing cycle",
          proof: "Vertical stringing = breathing fault. Firing at different points in the breathing cycle moves the rifle up and down, spreading shots vertically."
        },
        {
          type: "select", tool: "groupanalyser",
          title: "Horizontal Spread",
          prompt: "If your shots are spreading horizontally (left and right), what is the most likely cause?",
          options: [
            "Trigger control problems — jerking or pulling the trigger sideways",
            "Breathing at the wrong time in the cycle",
            "The rifle is not zeroed for elevation",
            "The target is too far away",
          ],
          expected: "Trigger control problems — jerking or pulling the trigger sideways",
          proof: "Horizontal spread = trigger fault. Jerking or pulling the trigger moves the rifle left or right, spreading shots horizontally."
        },
        {
          type: "note", tool: "groupanalyser",
          title: "Describe Group Analysis",
          prompt: "Write a note describing how to analyse a shot group. Include the keywords 'tight group', 'vertical stringing', and 'horizontal spread'.",
          keywords: ["tight group", "vertical stringing", "horizontal spread"],
          proof: "Tight group, vertical stringing, horizontal spread — the diagnostic patterns that reveal which fundamental needs work. Mission complete."
        },
      ]
    },
    {
      id: "zeroing",
      order: 8,
      tag: "MARKS 08",
      icon: "🎯",
      title: "Zeroing the Rifle",
      desc: "Adjust the sights so the point of aim equals the point of impact at a known range.",
      xp: 100,
      brief: "Your instructor covers zeroing — adjusting the rifle sights so that the point of aim (where you are aiming) equals the point of impact (where the bullet strikes) at a specific range. Fire a group, note where it lands relative to the point of aim, then adjust the sights to move the group to the centre. Move the rear sight in the direction you want the group to move. A zeroed rifle at one range will hit differently at another — know your zero distance.",
      scene: "zeroing",
      chapters: [
        { title: "Fire a Group", desc: "Shoot a group from a stable position at a known range." },
        { title: "Note the Offset", desc: "Where does the group land relative to the point of aim?" },
        { title: "Adjust the Sights", desc: "Move the rear sight in the direction you want the group to move." },
        { title: "Confirm the Zero", desc: "Fire another group to confirm the group is now centred." },
      ],
      tasks: [
        {
          type: "select", tool: "zero",
          title: "Point of Aim vs Impact",
          prompt: "Open the Zeroing Chart tool. What does it mean to zero a rifle?",
          options: [
            "Adjust the sights so the point of aim equals the point of impact at a specific range",
            "Set the rifle to fire at maximum power",
            "Calibrate the trigger pull weight",
            "Adjust the sling tension for the firing position",
          ],
          expected: "Adjust the sights so the point of aim equals the point of impact at a specific range",
          proof: "Zeroing = point of aim equals point of impact. The sights are adjusted so the bullet strikes exactly where you aim at a known distance."
        },
        {
          type: "select", tool: "zero",
          title: "Sight Adjustment Direction",
          prompt: "Your group is hitting high and to the right. How do you adjust the rear sight?",
          options: [
            "Move the rear sight down and to the left — in the direction you want the group to move",
            "Move the rear sight up and to the right — away from the group",
            "Move the front sight down and to the left",
            "Do not adjust — just aim lower and to the left",
          ],
          expected: "Move the rear sight down and to the left — in the direction you want the group to move",
          proof: "Move the rear sight in the direction you want the group to go — high-right group means move rear sight down-left to bring the group to centre."
        },
        {
          type: "select", tool: "zero",
          title: "Range and Zero",
          prompt: "If your rifle is zeroed at 25 metres, what happens at 50 metres?",
          options: [
            "The point of impact will be different — the bullet trajectory changes with distance",
            "The rifle will still be perfectly zeroed at 50 metres",
            "The rifle will not fire accurately at 50 metres",
            "The zero only matters at 25 metres, not other ranges",
          ],
          expected: "The point of impact will be different — the bullet trajectory changes with distance",
          proof: "Zero is range-specific — the bullet follows an arc, so a zero at 25m will not be a zero at 50m. Know your zero distance and your trajectory."
        },
        {
          type: "note", tool: "zero",
          title: "Describe the Zeroing Process",
          prompt: "Write a note describing the zeroing process. Include the keywords 'fire a group', 'adjust the rear sight', and 'point of aim'.",
          keywords: ["fire a group", "adjust the rear sight", "point of aim"],
          proof: "Fire a group, adjust the rear sight, confirm point of aim — the zeroing cycle that brings the group to the centre. Mission complete."
        },
      ]
    },
    {
      id: "safetyrange",
      order: 9,
      tag: "MARKS 09",
      icon: "🛡️",
      title: "Range Safety & Procedures",
      desc: "Master the safety rules and range commands that keep the firing line safe at all times.",
      xp: 100,
      brief: "Your instructor covers range safety — the non-negotiable rules and procedures that keep everyone safe on the firing line. Treat every rifle as if it is loaded. Never point the rifle at anything you do not intend to shoot. Keep your finger off the trigger until you are ready to fire. Know the range commands: load, ready on the firing line, commence firing, cease firing. The range officer's word is absolute. Safety is always the first priority.",
      scene: "safetyrange",
      chapters: [
        { title: "Treat as Loaded", desc: "Always treat every rifle as if it is loaded — no exceptions." },
        { title: "Muzzle Direction", desc: "Never point the rifle at anything you do not intend to shoot." },
        { title: "Trigger Discipline", desc: "Finger off the trigger until ready to fire." },
        { title: "Range Commands", desc: "Know and obey all range commands immediately — the RO is in charge." },
      ],
      tasks: [
        {
          type: "select", tool: "safety",
          title: "First Safety Rule",
          prompt: "Open the Range Safety tool. What is the first and most fundamental safety rule?",
          options: [
            "Treat every rifle as if it is loaded — always, without exception",
            "Only follow safety rules when the range officer is watching",
            "Safety rules only apply on the firing line, not in the butts",
            "Treat a rifle as loaded only if you have not checked it yourself",
          ],
          expected: "Treat every rifle as if it is loaded — always, without exception",
          proof: "Treat every rifle as if loaded — the foundational safety rule that prevents accidents. No exceptions, no assumptions."
        },
        {
          type: "select", tool: "safety",
          title: "Muzzle Direction",
          prompt: "Where should the muzzle of the rifle always be pointed?",
          options: [
            "In a safe direction — never at anything you do not intend to shoot",
            "Down at the ground at all times",
            "Up at the sky when not firing",
            "At the target only when the range is clear",
          ],
          expected: "In a safe direction — never at anything you do not intend to shoot",
          proof: "Muzzle in a safe direction — never point at anything you do not intend to shoot. Control where the muzzle points at all times."
        },
        {
          type: "select", tool: "safety",
          title: "Trigger Discipline",
          prompt: "When should your finger be on the trigger?",
          options: [
            "Only when you are ready to fire — finger off the trigger at all other times",
            "Whenever you are holding the rifle",
            "Only when the rifle is loaded",
            "Whenever the range officer says you can",
          ],
          expected: "Only when you are ready to fire — finger off the trigger at all other times",
          proof: "Finger off the trigger until ready to fire — trigger discipline prevents accidental discharges. Rest the finger alongside the trigger guard."
        },
        {
          type: "note", tool: "safety",
          title: "Describe Range Commands",
          prompt: "Write a note describing the key range commands and their meaning. Include the keywords 'cease fire', 'range officer', and 'safety first'.",
          keywords: ["cease fire", "range officer", "safety first"],
          proof: "Cease fire, range officer, safety first — the commands and hierarchy that keep the firing line safe. Mission complete."
        },
      ]
    },
    {
      id: "qualification",
      order: 10,
      tag: "MARKS 10",
      icon: "🏆",
      title: "Range Qualification",
      desc: "Put it all together — apply all four principles in a qualification shoot and earn your marksman badge.",
      xp: 100,
      brief: "Your final mission is the range qualification shoot. You will apply everything you have learned: a firm, stable firing position; correct natural point of aim; precise sight alignment and sight picture; breath control timed to the natural respiratory pause; smooth trigger squeeze with a surprise break; and full follow-through. Fire a qualification string and analyse your group. This is where the four marksmanship principles come together as one coordinated process.",
      scene: "qualification",
      chapters: [
        { title: "Stability", desc: "Firm position, bone support, relaxed muscles, natural balance." },
        { title: "Alignment", desc: "Sight alignment, sight picture, breath control, NPA." },
        { title: "Control", desc: "Trigger squeeze, surprise break, follow-through, shot call." },
        { title: "Analysis", desc: "Read the group, diagnose any faults, confirm the zero." },
      ],
      tasks: [
        {
          type: "select", tool: "position",
          title: "The Four Principles",
          prompt: "What are the four marksmanship principles in order?",
          options: [
            "Position and hold, natural point of aim, sight alignment and picture, shot release and follow-through",
            "Aim, fire, reload, repeat",
            "Stance, grip, trigger, safety",
            "Position, breathing, trigger, scoring",
          ],
          expected: "Position and hold, natural point of aim, sight alignment and picture, shot release and follow-through",
          proof: "The four principles: position/hold, NPA, sight alignment/picture, shot release/follow-through — the complete marksmanship cycle."
        },
        {
          type: "select", tool: "groupanalyser",
          title: "Qualification Standard",
          prompt: "What does a qualification shoot test?",
          options: [
            "Your ability to apply all four marksmanship principles consistently under time pressure",
            "Your ability to shoot as fast as possible",
            "Your knowledge of range commands",
            "Your ability to zero a rifle quickly",
          ],
          expected: "Your ability to apply all four marksmanship principles consistently under time pressure",
          proof: "Qualification tests consistent application of all four principles — stability, alignment, control, and analysis — under the pressure of a scored string."
        },
        {
          type: "select", tool: "followthrough",
          title: "The Shot Sequence",
          prompt: "What is the correct sequence for firing a single shot?",
          options: [
            "Stable position, NPA, sight alignment, breathe, squeeze, follow-through, call the shot",
            "Aim, pull the trigger, look at the target, reload",
            "Load, fire, check the target, adjust",
            "Position, fire, analyse, repeat",
          ],
          expected: "Stable position, NPA, sight alignment, breathe, squeeze, follow-through, call the shot",
          proof: "The complete shot sequence: position → NPA → align → breathe → squeeze → follow-through → call — every shot, every time."
        },
        {
          type: "note", tool: "qualification",
          title: "Describe the Marksmanship Cycle",
          prompt: "Write a note describing the complete marksmanship shot cycle from position to follow-through. Include the keywords 'four principles', 'shot sequence', and 'consistency'.",
          keywords: ["four principles", "shot sequence", "consistency"],
          proof: "Four principles, shot sequence, consistency — the marksmanship cycle applied to every shot. Qualification complete. You are a marksman."
        },
      ]
    },
  ];

  // ==========================================================
  // LEARN LIBRARY ARTICLES
  // ==========================================================
  const LEARN_ARTICLES = [
    { id: "l_position",       cat: "Fundamentals",   icon: "\u{1F9CD}",  title: "The Firing Position",              desc: "Bone support, muscle relaxation, natural balance \u2014 the foundation of every shot.", xp: 15 },
    { id: "l_npa",            cat: "Fundamentals",   icon: "\u{1F9ED}",  title: "Natural Point of Aim",             desc: "Where the rifle naturally points when relaxed \u2014 adjust the body, not the rifle.", xp: 15 },
    { id: "l_sight_align",    cat: "Aiming",         icon: "\u{1F441}\u{FE0F}", title: "Sight Alignment",                desc: "Front sight centred in the rear aperture \u2014 equal light on both sides.", xp: 15 },
    { id: "l_sight_picture",  cat: "Aiming",         icon: "\u{1F3AF}", title: "Sight Picture",                    desc: "Aligned sights placed on the target \u2014 the 6 o'clock hold and visual focus.", xp: 15 },
    { id: "l_breath",         cat: "Aiming",         icon: "\u{1FA7}\u{FE0F}", title: "Breath Control",                 desc: "Fire during the natural respiratory pause at end of exhale \u2014 8\u201310 second window.", xp: 15 },
    { id: "l_trigger",        cat: "Control",        icon: "\u{1F446}",  title: "Trigger Control",                 desc: "Smooth squeeze, straight back, surprise break \u2014 never jerk or pull.", xp: 15 },
    { id: "l_follow",         cat: "Control",        icon: "\u{1F501}",  title: "Follow-Through",                   desc: "Maintain position, aim, and trigger after the shot until the bullet leaves the barrel.", xp: 15 },
    { id: "l_shot_call",      cat: "Control",        icon: "\u{1F441}\u{FE0F}", title: "Calling the Shot",               desc: "Mentally snapshot the sight picture at the instant of fire \u2014 compare to the hit.", xp: 15 },
    { id: "l_group_tight",    cat: "Analysis",       icon: "\u{1F4CA}",  title: "Tight Groups",                    desc: "A tight group means consistent fundamentals \u2014 the goal of every shooter.", xp: 15 },
    { id: "l_group_vertical", cat: "Analysis",       icon: "\u{1F4CA}",  title: "Vertical Stringing",              desc: "Shots spreading up and down \u2014 usually an inconsistent breathing fault.", xp: 15 },
    { id: "l_group_horiz",    cat: "Analysis",       icon: "\u{1F4CA}",  title: "Horizontal Spread",               desc: "Shots spreading left and right \u2014 usually a trigger control problem.", xp: 15 },
    { id: "l_group_scatter",  cat: "Analysis",       icon: "\u{1F4CA}",  title: "Scattered Groups",                desc: "Shots everywhere \u2014 position instability or inconsistent natural point of aim.", xp: 15 },
    { id: "l_zero",           cat: "Zeroing",        icon: "\u{1F3AF}",  title: "Zeroing the Rifle",               desc: "Adjust sights so point of aim equals point of impact at a known range.", xp: 15 },
    { id: "l_zero_dir",       cat: "Zeroing",        icon: "\u{1F4CF}",  title: "Sight Adjustment Direction",      desc: "Move the rear sight in the direction you want the group to move.", xp: 15 },
    { id: "l_zero_range",     cat: "Zeroing",        icon: "\u{1F4CF}",  title: "Zero Range & Trajectory",         desc: "A zero at one range is not a zero at another \u2014 know your trajectory.", xp: 15 },
    { id: "l_moa",            cat: "Zeroing",        icon: "\u{1F4CF}",  title: "Minute of Angle (MOA)",            desc: "1 MOA \u2248 1 inch at 100 yards \u2014 the unit of angular measurement for sighting.", xp: 15 },
    { id: "l_prone",          cat: "Positions",      icon: "\u{1F9CD}",  title: "The Prone Position",              desc: "Most stable position \u2014 lying flat, sling-supported, bone support triangle.", xp: 15 },
    { id: "l_kneeling",       cat: "Positions",      icon: "\u{1F9CE}",  title: "The Kneeling Position",           desc: "Kneeling roll under the right ankle, left elbow on left knee for support.", xp: 15 },
    { id: "l_standing",       cat: "Positions",      icon: "\u{1F9CD}",  title: "The Standing Position",           desc: "Least stable but fastest \u2014 left arm against the body, balance on the feet.", xp: 15 },
    { id: "l_sling",          cat: "Positions",      icon: "\u{1F45C}",  title: "The Sling & Support Triangle",    desc: "Sling tension lets the arm relax \u2014 the support triangle stays vertical.", xp: 15 },
    { id: "l_wind",           cat: "Conditions",     icon: "\u{1F32C}\u{FE0F}", title: "Wind Effects",                   desc: "Crosswind drifts the bullet \u2014 learn to read wind flags and compensate.", xp: 15 },
    { id: "l_light",          cat: "Conditions",     icon: "\u{1F4A1}",  title: "Light Conditions",                desc: "Poor light, mist, or mirage affect sight picture \u2014 adapt your aiming.", xp: 15 },
    { id: "l_safety",         cat: "Safety",         icon: "\u{1F6E1}\u{FE0F}", title: "Range Safety Rules",             desc: "Treat as loaded, muzzle safe direction, finger off trigger, obey all commands.", xp: 15 },
    { id: "l_commands",       cat: "Safety",         icon: "\u{1F4E2}",  title: "Range Commands",                  desc: "Load, ready on the firing line, commence firing, cease firing \u2014 know them all.", xp: 15 },
    { id: "l_four_principles",cat: "Fundamentals",   icon: "\u{1F396}\u{FE0F}", title: "The Four Marksmanship Principles", desc: "Position/hold, NPA, sight alignment/picture, shot release/follow-through.", xp: 15 },
    { id: "l_sea",            cat: "Cross-Element",  icon: "\u2693",  title: "Sea Cadet Marksmanship",          desc: "Sea Cadets use the .177 air rifle on indoor ranges \u2014 same principles, naval range procedures.", xp: 15 },
    { id: "l_army",           cat: "Cross-Element",  icon: "\u{1F396}\u{FE0F}", title: "Army Cadet Marksmanship",        desc: "Army Cadets train on the L98A2 Cadet GP Rifle \u2014 the cadet adaptation of the SA80.", xp: 15 },
    { id: "l_air",            cat: "Cross-Element",  icon: "\u2708\u{FE0F}", title: "Air Cadet Marksmanship",         desc: "Air Cadets shoot .177 air rifles and the L98 \u2014 RAF-marksmanship standards apply.", xp: 15 }
  ];

  // ==========================================================
  // MARKSMANSHIP BADGES (auto-generated from MISSIONS)
  // ==========================================================
  const MARKSMANSHIP_BADGES = MISSIONS.map(m => ({
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
      rangeGame: { score: 0, correct: 0, wrong: 0, bestStreak: 0, rounds: 0 }
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
  // MAP PROGRESS SYNC \u2014 badge 18 on the quest map
  // ==========================================================
  function syncMapProgress() {
    try {
      const allDone = MISSIONS.every(m => state.completedMissions.includes(m.id));
      let mapProgress = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || "[]");
      if (allDone && !mapProgress.includes(MARKSMANSHIP_BADGE_ID)) {
        mapProgress.push(MARKSMANSHIP_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      } else if (!allDone && mapProgress.includes(MARKSMANSHIP_BADGE_ID)) {
        mapProgress = mapProgress.filter(id => id !== MARKSMANSHIP_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      }
    } catch (e) {}
  }

  // ==========================================================
  // RANK HELPERS
  // ==========================================================
  function currentRank() {
    let r = RANKS[0];
    for (let i = 0; i < RANKS.length; i++) {
      if (state.xp >= RANKS[i].xp) r = RANKS[i];
    }
    return r;
  }
  function nextRank() {
    for (let i = 0; i < RANKS.length; i++) {
      if (state.xp < RANKS[i].xp) return RANKS[i];
    }
    return null;
  }
  function rankProgressPct() {
    const cr = currentRank();
    const nr = nextRank();
    if (!nr) return 100;
    return Math.min(100, Math.round(((state.xp - cr.xp) / (nr.xp - cr.xp)) * 100));
  }

  // ==========================================================
  // XP & STREAK
  // ==========================================================
  function addXP(amount) {
    state.xp += amount;
    if (state.xp < 0) state.xp = 0;
    saveState();
  }
  function recordAttempt(correct) {
    state.totalAttempts++;
    if (correct) {
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    } else {
      state.streak = 0;
      state.wrongAttempts++;
    }
    saveState();
  }

  // ==========================================================
  // SCENE SVG RENDERER
  // ==========================================================
  function renderScene(scene) {
    const W = 600, H = 200;
    const base = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">';
    const end = '</svg>';
    const grad = (id, c1, c2) => '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>';

    if (scene === "position") {
      return base + grad("g", "#0f1a2e", "#070d18") + '\
        <rect width="' + W + '" height="' + H + '" fill="url(#g)"/>\
        <line x1="200" y1="30" x2="200" y2="170" stroke="#2f4a73" stroke-width="1" stroke-dasharray="4 4" opacity="0.4"/>\
        <line x1="400" y1="30" x2="400" y2="170" stroke="#2f4a73" stroke-width="1" stroke-dasharray="4 4" opacity="0.4"/>\
        <rect x="150" y="120" width="300" height="8" rx="2" fill="#1b3548"/>\
        <rect x="210" y="80" width="4" height="48" fill="#476b9f"/>\
        <polygon points="210,80 214,80 230,110 226,110" fill="#476b9f"/>\
        <circle cx="270" cy="60" r="10" fill="#6b94d4"/>\
        <rect x="264" y="68" width="12" height="30" rx="3" fill="#476b9f"/>\
        <rect x="258" y="96" width="6" height="22" rx="2" fill="#2f4a73"/>\
        <rect x="276" y="96" width="6" height="22" rx="2" fill="#2f4a73"/>\
        <line x1="230" y1="110" x2="214" y2="80" stroke="#f5c84c" stroke-width="1.5" opacity="0.6"/>\
        <text x="180" y="155" fill="#f5c84c" font-size="9" font-family="monospace">BONE SUPPORT</text>\
        <text x="300" y="155" fill="#6b94d4" font-size="9" font-family="monospace">RELAXED MUSCLES</text>\
        <text x="430" y="155" fill="#38d97b" font-size="9" font-family="monospace">NATURAL BALANCE</text>\
        <text x="300" y="25" fill="#6b94d4" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">FIRING POSITION \u2014 PRONE</text>\
      ' + end;
    }
    if (scene === "npa") {
      return base + grad("g", "#0f1a2e", "#070d18") + '\
        <rect width="' + W + '" height="' + H + '" fill="url(#g)"/>\
        <circle cx="500" cy="100" r="35" fill="none" stroke="#ff5a6e" stroke-width="1.5" opacity="0.5"/>\
        <circle cx="500" cy="100" r="20" fill="none" stroke="#ff5a6e" stroke-width="1" opacity="0.4"/>\
        <circle cx="500" cy="100" r="8" fill="#ff5a6e" opacity="0.6"/>\
        <line x1="100" y1="100" x2="465" y2="100" stroke="#f5c84c" stroke-width="2" stroke-dasharray="6 4"/>\
        <text x="475" y="105" fill="#f5c84c" font-size="9" font-family="monospace">NPA</text>\
        <circle cx="150" cy="120" r="6" fill="#6b94d4"/>\
        <rect x="144" y="126" width="12" height="24" rx="2" fill="#476b9f"/>\
        <line x1="156" y1="130" x2="200" y2="100" stroke="#2f4a73" stroke-width="2"/>\
        <text x="100" y="155" fill="#6b94d4" font-size="9" font-family="monospace">SHOOTER</text>\
        <text x="250" y="80" fill="#f5c84c" font-size="9" font-family="monospace">AIM LINE</text>\
        <text x="500" y="60" fill="#ff5a6e" font-size="9" font-family="monospace" text-anchor="middle">TARGET</text>\
        <text x="300" y="25" fill="#6b94d4" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">NATURAL POINT OF AIM</text>\
      ' + end;
    }
    if (scene === "sightalignment") {
      return base + grad("g", "#0a1018", "#060a10") + '\
        <rect width="' + W + '" height="' + H + '" fill="url(#g)"/>\
        <circle cx="300" cy="100" r="55" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>\
        <circle cx="300" cy="100" r="35" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>\
        <circle cx="300" cy="100" r="15" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>\
        <circle cx="300" cy="100" r="6" fill="#ff5a6e" opacity="0.5"/>\
        <circle cx="300" cy="100" r="40" fill="none" stroke="#6b94d4" stroke-width="2.5"/>\
        <rect x="296" y="85" width="8" height="30" fill="#eaf2ff" stroke="#f5c84c" stroke-width="1"/>\
        <line x1="250" y1="100" x2="350" y2="100" stroke="rgba(255,255,255,0.15)" stroke-dasharray="3 3" stroke-width="0.5"/>\
        <line x1="300" y1="55" x2="300" y2="145" stroke="rgba(255,255,255,0.15)" stroke-dasharray="3 3" stroke-width="0.5"/>\
        <text x="300" y="25" fill="#6b94d4" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">SIGHT ALIGNMENT</text>\
        <text x="370" y="70" fill="#f5c84c" font-size="9" font-family="monospace">REAR APERTURE</text>\
        <text x="320" y="80" fill="#eaf2ff" font-size="9" font-family="monospace">FRONT POST</text>\
        <text x="300" y="175" fill="#38d97b" font-size="9" font-family="monospace" text-anchor="middle">CENTRED \u2014 EQUAL LIGHT</text>\
      ' + end;
    }
    if (scene === "breathcontrol") {
      return base + grad("g", "#0f1a2e", "#070d18") + '\
        <rect width="' + W + '" height="' + H + '" fill="url(#g)"/>\
        <path d="M 50 120 Q 120 40 190 120 Q 260 200 330 120 Q 400 40 470 120 Q 540 200 560 120" fill="none" stroke="#6b94d4" stroke-width="2"/>\
        <rect x="170" y="115" width="40" height="12" fill="rgba(56,217,123,0.15)" stroke="#1f9e54" stroke-width="1" stroke-dasharray="3 2"/>\
        <rect x="450" y="115" width="40" height="12" fill="rgba(56,217,123,0.15)" stroke="#1f9e54" stroke-width="1" stroke-dasharray="3 2"/>\
        <circle cx="190" cy="121" r="4" fill="#38d97b"/>\
        <circle cx="470" cy="121" r="4" fill="#38d97b"/>\
        <text x="190" y="160" fill="#38d97b" font-size="8" font-family="monospace" text-anchor="middle">FIRE</text>\
        <text x="470" y="160" fill="#38d97b" font-size="8" font-family="monospace" text-anchor="middle">FIRE</text>\
        <text x="120" y="180" fill="#6b94d4" font-size="8" font-family="monospace" text-anchor="middle">INHALE</text>\
        <text x="260" y="180" fill="#6b94d4" font-size="8" font-family="monospace" text-anchor="middle">EXHALE</text>\
        <text x="300" y="25" fill="#6b94d4" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">BREATH CONTROL \u2014 RESPIRATORY PAUSE</text>\
      ' + end;
    }
    if (scene === "triggercontrol") {
      return base + grad("g", "#0f1a2e", "#070d18") + '\
        <rect width="' + W + '" height="' + H + '" fill="url(#g)"/>\
        <rect x="150" y="60" width="200" height="10" rx="2" fill="#1b3548" stroke="#476b9f"/>\
        <rect x="200" y="70" width="12" height="40" rx="2" fill="#476b9f"/>\
        <circle cx="206" cy="115" r="6" fill="#f5c84c" stroke="#c79a2e"/>\
        <path d="M 195 120 Q 185 135 200 145" fill="none" stroke="#6b94d4" stroke-width="2.5"/>\
        <circle cx="205" cy="125" r="5" fill="#eaf2ff"/>\
        <path d="M 350 80 L 400 80 L 400 120" fill="none" stroke="#38d97b" stroke-width="2" stroke-dasharray="4 3"/>\
        <path d="M 400 120 L 430 120" fill="none" stroke="#38d97b" stroke-width="3"/>\
        <polygon points="430,116 440,120 430,124" fill="#38d97b"/>\
        <text x="370" y="70" fill="#38d97b" font-size="9" font-family="monospace">SMOOTH SQUEEZE</text>\
        <text x="300" y="165" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle">PAD OF FINGER \u2014 STRAIGHT BACK</text>\
        <text x="300" y="25" fill="#6b94d4" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">TRIGGER CONTROL</text>\
      ' + end;
    }
    if (scene === "followthrough") {
      return base + grad("g", "#0f1a2e", "#070d18") + '\
        <rect width="' + W + '" height="' + H + '" fill="url(#g)"/>\
        <rect x="50" y="50" width="120" height="100" rx="6" fill="#101a2e" stroke="#476b9f"/>\
        <text x="110" y="70" fill="#6b94d4" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">BEFORE</text>\
        <text x="110" y="90" fill="#b0c4e0" font-size="9" font-family="monospace" text-anchor="middle">Position</text>\
        <text x="110" y="105" fill="#b0c4e0" font-size="9" font-family="monospace" text-anchor="middle">Align</text>\
        <text x="110" y="120" fill="#b0c4e0" font-size="9" font-family="monospace" text-anchor="middle">Breathe</text>\
        <text x="110" y="135" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle">Squeeze</text>\
        <rect x="240" y="50" width="120" height="100" rx="6" fill="#101a2e" stroke="#38d97b"/>\
        <text x="300" y="70" fill="#38d97b" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">DURING</text>\
        <text x="300" y="90" fill="#38d97b" font-size="12" font-family="monospace" text-anchor="middle">FIRE!</text>\
        <text x="300" y="110" fill="#b0c4e0" font-size="9" font-family="monospace" text-anchor="middle">Shot breaks</text>\
        <text x="300" y="130" fill="#b0c4e0" font-size="9" font-family="monospace" text-anchor="middle">Hold position</text>\
        <rect x="430" y="50" width="120" height="100" rx="6" fill="#101a2e" stroke="#f5c84c"/>\
        <text x="490" y="70" fill="#f5c84c" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">AFTER</text>\
        <text x="490" y="90" fill="#b0c4e0" font-size="9" font-family="monospace" text-anchor="middle">Follow-through</text>\
        <text x="490" y="105" fill="#b0c4e0" font-size="9" font-family="monospace" text-anchor="middle">Call shot</text>\
        <text x="490" y="120" fill="#b0c4e0" font-size="9" font-family="monospace" text-anchor="middle">Analyse</text>\
        <text x="300" y="25" fill="#6b94d4" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">FOLLOW-THROUGH</text>\
      ' + end;
    }
    if (scene === "groupanalysis") {
      return base + grad("g", "#0f1a2e", "#070d18") + '\
        <rect width="' + W + '" height="' + H + '" fill="url(#g)"/>\
        <circle cx="120" cy="100" r="40" fill="none" stroke="rgba(255,255,255,0.12)"/>\
        <circle cx="120" cy="100" r="25" fill="none" stroke="rgba(255,255,255,0.08)"/>\
        <circle cx="120" cy="100" r="10" fill="none" stroke="rgba(255,255,255,0.06)"/>\
        <circle cx="118" cy="100" r="2.5" fill="#000" stroke="#38d97b" stroke-width="1"/>\
        <circle cx="122" cy="100" r="2.5" fill="#000" stroke="#38d97b" stroke-width="1"/>\
        <circle cx="120" cy="97" r="2.5" fill="#000" stroke="#38d97b" stroke-width="1"/>\
        <circle cx="120" cy="103" r="2.5" fill="#000" stroke="#38d97b" stroke-width="1"/>\
        <circle cx="120" cy="100" r="2.5" fill="#000" stroke="#38d97b" stroke-width="1"/>\
        <text x="120" y="160" fill="#38d97b" font-size="9" font-family="monospace" text-anchor="middle">TIGHT GROUP</text>\
        <circle cx="300" cy="100" r="40" fill="none" stroke="rgba(255,255,255,0.12)"/>\
        <circle cx="300" cy="100" r="25" fill="none" stroke="rgba(255,255,255,0.08)"/>\
        <circle cx="300" cy="80" r="2.5" fill="#000" stroke="#f5c84c" stroke-width="1"/>\
        <circle cx="298" cy="95" r="2.5" fill="#000" stroke="#f5c84c" stroke-width="1"/>\
        <circle cx="302" cy="110" r="2.5" fill="#000" stroke="#f5c84c" stroke-width="1"/>\
        <circle cx="300" cy="125" r="2.5" fill="#000" stroke="#f5c84c" stroke-width="1"/>\
        <circle cx="301" cy="105" r="2.5" fill="#000" stroke="#f5c84c" stroke-width="1"/>\
        <text x="300" y="160" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle">VERTICAL STRING</text>\
        <circle cx="480" cy="100" r="40" fill="none" stroke="rgba(255,255,255,0.12)"/>\
        <circle cx="480" cy="100" r="25" fill="none" stroke="rgba(255,255,255,0.08)"/>\
        <circle cx="465" cy="95" r="2.5" fill="#000" stroke="#ff5a6e" stroke-width="1"/>\
        <circle cx="475" cy="108" r="2.5" fill="#000" stroke="#ff5a6e" stroke-width="1"/>\
        <circle cx="490" cy="92" r="2.5" fill="#000" stroke="#ff5a6e" stroke-width="1"/>\
        <circle cx="495" cy="110" r="2.5" fill="#000" stroke="#ff5a6e" stroke-width="1"/>\
        <circle cx="483" cy="100" r="2.5" fill="#000" stroke="#ff5a6e" stroke-width="1"/>\
        <text x="480" y="160" fill="#ff5a6e" font-size="9" font-family="monospace" text-anchor="middle">SCATTERED</text>\
        <text x="300" y="25" fill="#6b94d4" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">SHOT GROUP ANALYSIS</text>\
      ' + end;
    }
    if (scene === "zeroing") {
      return base + grad("g", "#0f1a2e", "#070d18") + '\
        <rect width="' + W + '" height="' + H + '" fill="url(#g)"/>\
        <circle cx="300" cy="100" r="50" fill="none" stroke="rgba(255,255,255,0.12)"/>\
        <circle cx="300" cy="100" r="30" fill="none" stroke="rgba(255,255,255,0.08)"/>\
        <circle cx="300" cy="100" r="6" fill="#ff5a6e" opacity="0.5"/>\
        <circle cx="280" cy="80" r="2.5" fill="#000" stroke="#f5c84c" stroke-width="1"/>\
        <circle cx="283" cy="83" r="2.5" fill="#000" stroke="#f5c84c" stroke-width="1"/>\
        <circle cx="277" cy="82" r="2.5" fill="#000" stroke="#f5c84c" stroke-width="1"/>\
        <circle cx="281" cy="79" r="2.5" fill="#000" stroke="#f5c84c" stroke-width="1"/>\
        <circle cx="279" cy="81" r="2.5" fill="#000" stroke="#f5c84c" stroke-width="1"/>\
        <line x1="281" y1="81" x2="300" y2="100" stroke="#38d97b" stroke-width="1.5" stroke-dasharray="4 3"/>\
        <polygon points="296,96 302,98 298,104" fill="#38d97b"/>\
        <text x="265" y="65" fill="#f5c84c" font-size="9" font-family="monospace">GROUP</text>\
        <text x="315" y="100" fill="#38d97b" font-size="9" font-family="monospace">ADJUST</text>\
        <text x="300" y="175" fill="#38d97b" font-size="9" font-family="monospace" text-anchor="middle">MOVE REAR SIGHT TOWARD CENTRE</text>\
        <text x="300" y="25" fill="#6b94d4" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">ZEROING THE RIFLE</text>\
      ' + end;
    }
    if (scene === "safetyrange") {
      return base + grad("g", "#0f1a2e", "#070d18") + '\
        <rect width="' + W + '" height="' + H + '" fill="url(#g)"/>\
        <rect x="80" y="50" width="130" height="100" rx="6" fill="#101a2e" stroke="#ff5a6e"/>\
        <text x="145" y="70" fill="#ff5a6e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">TREAT AS</text>\
        <text x="145" y="85" fill="#ff5a6e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">LOADED</text>\
        <text x="145" y="115" fill="#b0c4e0" font-size="14" font-family="monospace" text-anchor="middle">1</text>\
        <rect x="235" y="50" width="130" height="100" rx="6" fill="#101a2e" stroke="#f5c84c"/>\
        <text x="300" y="70" fill="#f5c84c" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">MUZZLE</text>\
        <text x="300" y="85" fill="#f5c84c" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">SAFE DIR</text>\
        <text x="300" y="115" fill="#b0c4e0" font-size="14" font-family="monospace" text-anchor="middle">2</text>\
        <rect x="390" y="50" width="130" height="100" rx="6" fill="#101a2e" stroke="#6b94d4"/>\
        <text x="455" y="70" fill="#6b94d4" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">FINGER OFF</text>\
        <text x="455" y="85" fill="#6b94d4" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">TRIGGER</text>\
        <text x="455" y="115" fill="#b0c4e0" font-size="14" font-family="monospace" text-anchor="middle">3</text>\
        <text x="300" y="25" fill="#6b94d4" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">RANGE SAFETY RULES</text>\
      ' + end;
    }
    if (scene === "qualification") {
      return base + grad("g", "#0f1a2e", "#070d18") + '\
        <rect width="' + W + '" height="' + H + '" fill="url(#g)"/>\
        <circle cx="300" cy="100" r="55" fill="none" stroke="rgba(255,255,255,0.12)"/>\
        <circle cx="300" cy="100" r="35" fill="none" stroke="rgba(255,255,255,0.08)"/>\
        <circle cx="300" cy="100" r="15" fill="none" stroke="rgba(255,255,255,0.06)"/>\
        <circle cx="300" cy="100" r="6" fill="#ff5a6e" opacity="0.5"/>\
        <circle cx="298" cy="100" r="2.5" fill="#000" stroke="#38d97b" stroke-width="1.5"/>\
        <circle cx="302" cy="100" r="2.5" fill="#000" stroke="#38d97b" stroke-width="1.5"/>\
        <circle cx="300" cy="97" r="2.5" fill="#000" stroke="#38d97b" stroke-width="1.5"/>\
        <circle cx="300" cy="103" r="2.5" fill="#000" stroke="#38d97b" stroke-width="1.5"/>\
        <circle cx="300" cy="100" r="2.5" fill="#000" stroke="#38d97b" stroke-width="1.5"/>\
        <text x="300" y="25" fill="#f5c84c" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">RANGE QUALIFICATION \u2014 ALL FOUR PRINCIPLES</text>\
        <text x="150" y="100" fill="#6b94d4" font-size="9" font-family="monospace">POSITION</text>\
        <text x="200" y="130" fill="#6b94d4" font-size="9" font-family="monospace">NPA</text>\
        <text x="380" y="130" fill="#6b94d4" font-size="9" font-family="monospace">ALIGN</text>\
        <text x="420" y="100" fill="#6b94d4" font-size="9" font-family="monospace">BREATHE</text>\
        <text x="380" y="70" fill="#6b94d4" font-size="9" font-family="monospace">SQUEEZE</text>\
        <text x="200" y="70" fill="#6b94d4" font-size="9" font-family="monospace">FOLLOW</text>\
      ' + end;
    }
    return base + '<rect width="' + W + '" height="' + H + '" fill="#0f1a2e"/><text x="300" y="100" fill="#6b94d4" font-size="14" text-anchor="middle">RANGE</text>' + end;
  }

  // ==========================================================
  // SIDEBAR & TOP STATS
  // ==========================================================
  function refreshBadges() {
    state.badges = MISSIONS.filter(m => state.completedMissions.includes(m.id)).map(m => ({
      id: "b_" + m.id, icon: m.icon, name: m.title, xp: m.xp
    }));
  }
  function renderSidebar() {
    const cr = currentRank();
    const nr = nextRank();
    const pilotRank = document.getElementById("pilotRank");
    const pilotCallsign = document.getElementById("pilotCallsign");
    const xpFill = document.getElementById("xpFill");
    const xpText = document.getElementById("xpText");
    if (pilotRank) pilotRank.textContent = cr.name;
    if (pilotCallsign) pilotCallsign.textContent = "CALLSIGN: " + cr.callsign;
    if (xpFill) xpFill.style.width = rankProgressPct() + "%";
    if (xpText) xpText.textContent = nr ? state.xp + " / " + nr.xp + " XP" : state.xp + " XP (MAX)";
  }
  function renderTopStats() {
    const cr = currentRank();
    const topRank = document.getElementById("topRank");
    const topXP = document.getElementById("topXP");
    const topBadges = document.getElementById("topBadges");
    if (topRank) topRank.textContent = cr.name;
    if (topXP) topXP.textContent = state.xp;
    if (topBadges) topBadges.textContent = state.badges.length;
  }

  // ==========================================================
  // COMMAND SECTION
  // ==========================================================
  function renderCommand() {
    const done = state.completedMissions.length;
    const cmdMissionsDone = document.getElementById("cmdMissionsDone");
    if (cmdMissionsDone) cmdMissionsDone.textContent = done;
    const cmdMissionsTotal = document.getElementById("cmdMissionsTotal");
    if (cmdMissionsTotal) cmdMissionsTotal.textContent = "of " + MISSIONS.length;
    const cmdXP = document.getElementById("cmdXP");
    if (cmdXP) cmdXP.textContent = state.xp;
    const nr = nextRank();
    const cmdXPNext = document.getElementById("cmdXPNext");
    if (cmdXPNext) cmdXPNext.textContent = nr ? "+" + (nr.xp - state.xp) + " to next rank" : "MAX RANK";
    const cmdSitreps = document.getElementById("cmdSitreps");
    if (cmdSitreps) cmdSitreps.textContent = state.sitreps.length;
    const cmdBadges = document.getElementById("cmdBadges");
    if (cmdBadges) cmdBadges.textContent = state.badges.length;
    const cmdBadgeTotal = document.getElementById("cmdBadgeTotal");
    if (cmdBadgeTotal) cmdBadgeTotal.textContent = "of " + MISSIONS.length;

    const chapterList = document.getElementById("chapterList");
    if (chapterList) {
      chapterList.innerHTML = MISSIONS.map(m => {
        const done = state.completedMissions.includes(m.id);
        return '<div class="chapter-item' + (done ? " done" : "") + '">\
          <span class="ch-num">' + m.order + '</span>\
          <span class="ch-ico">' + m.icon + '</span>\
          <span class="ch-title">' + escapeHTML(m.title) + '</span>\
          <span class="ch-status">' + (done ? "\u2705" : "\u2b1c") + '</span>\
        </div>';
      }).join("");
    }
    const threatFill = document.getElementById("threatFill");
    if (threatFill) {
      const pct = 25 + (done / MISSIONS.length) * 50;
      threatFill.style.width = pct + "%";
    }
  }

  // ==========================================================
  // TRAINING SECTION
  // ==========================================================
  function renderTraining() {
    const grid = document.getElementById("trainingGrid");
    if (!grid) return;
    grid.innerHTML = MISSIONS.map(m => {
      const done = state.completedMissions.includes(m.id);
      const locked = m.order > 1 && !state.completedMissions.includes(MISSIONS[m.order - 2].id);
      return '<div class="mission-card' + (done ? " done" : "") + (locked ? " locked" : "") + '" data-mission="' + m.id + '">\
        <div class="mc-head">\
          <span class="mc-ico">' + m.icon + '</span>\
          <div class="mc-info"><div class="mc-tag">' + m.tag + '</div><div class="mc-title">' + escapeHTML(m.title) + '</div></div>\
        </div>\
        <p class="mc-desc">' + escapeHTML(m.desc) + '</p>\
        <div class="mc-foot">\
          <span class="mc-xp">+' + m.xp + ' XP</span>\
          <span class="mc-status">' + (done ? "COMPLETE" : locked ? "LOCKED" : "AVAILABLE") + '</span>\
        </div>\
      </div>';
    }).join("");
    grid.querySelectorAll(".mission-card").forEach(card => {
      card.addEventListener("click", () => {
        if (card.classList.contains("locked")) return;
        const mid = card.dataset.mission;
        openMission(mid);
        switchSection("missions");
      });
    });
    const navTrainingCount = document.getElementById("navTrainingCount");
    if (navTrainingCount) navTrainingCount.textContent = MISSIONS.length;
    const navMissionCount = document.getElementById("navMissionCount");
    if (navMissionCount) navMissionCount.textContent = MISSIONS.length;
  }

  // ==========================================================
  // MISSION SELECTOR
  // ==========================================================
  function renderMissionSelector() {
    const sel = document.getElementById("missionSelector");
    if (!sel) return;
    sel.innerHTML = MISSIONS.map(m => {
      const done = state.completedMissions.includes(m.id);
      const active = activeMissionId === m.id;
      return '<div class="mission-card' + (done ? " done" : "") + (active ? " active" : "") + '" data-mission="' + m.id + '">\
        <div class="mc-head">\
          <span class="mc-ico">' + m.icon + '</span>\
          <div class="mc-info"><div class="mc-tag">' + m.tag + '</div><div class="mc-title">' + escapeHTML(m.title) + '</div></div>\
        </div>\
        <p class="mc-desc">' + escapeHTML(m.desc) + '</p>\
        <div class="mc-foot">\
          <span class="mc-xp">+' + m.xp + ' XP</span>\
          <span class="mc-status">' + (done ? "COMPLETE" : active ? "ACTIVE" : "START") + '</span>\
        </div>\
      </div>';
    }).join("");
    sel.querySelectorAll(".mission-card").forEach(card => {
      card.addEventListener("click", () => openMission(card.dataset.mission));
    });
  }

  // ==========================================================
  // OPEN MISSION
  // ==========================================================
  function openMission(missionId) {
    const m = MISSIONS.find(x => x.id === missionId);
    if (!m) return;
    activeMissionId = m.id;
    activeTaskIndex = 0;
    activeTool = "";
    if (!state.missionProgress[m.id]) state.missionProgress[m.id] = { completedTasks: [] };
    renderMissionSelector();
    renderMissionConsole();
  }

  // ==========================================================
  // MISSION CONSOLE
  // ==========================================================
  function renderMissionConsole() {
    const m = MISSIONS.find(x => x.id === activeMissionId);
    if (!m) return;
    const console = document.getElementById("missionConsole");
    if (!console) return;
    console.style.display = "block";
    const selector = document.getElementById("missionSelector");
    if (selector) selector.style.display = "none";
    const headerTitle = document.getElementById("missionHeaderTitle");
    const headerSub = document.getElementById("missionHeaderSub");
    if (headerTitle) headerTitle.textContent = m.title;
    if (headerSub) headerSub.textContent = m.tag + " \u2014 " + m.desc;

    const prog = state.missionProgress[m.id] || { completedTasks: [] };
    const allDone = prog.completedTasks.length >= m.tasks.length;

    let html = '<div class="console-wrap">\
      <div class="console-left">\
        <div class="console-scene">' + renderScene(m.scene) + '</div>\
        <div class="console-brief">\
          <div class="tag-row"><span class="tag steel">' + m.tag + '</span><span class="tag">+' + m.xp + ' XP</span>' + (allDone ? '<span class="tag live">COMPLETE</span>' : '') + '</div>\
          <h3>Mission Brief</h3>\
          <p>' + escapeHTML(m.brief) + '</p>\
          <div class="chapter-mini-list">\
            ' + m.chapters.map((ch, i) => '<div class="chapter-mini"><span class="cm-num">' + (i + 1) + '</span><span class="cm-title">' + escapeHTML(ch.title) + '</span><span class="cm-desc">' + escapeHTML(ch.desc) + '</span></div>').join("") + '\
          </div>\
        </div>\
      </div>\
      <div class="console-right">\
        <div class="task-progress-bar"><div class="task-progress-fill" style="width:' + (prog.completedTasks.length / m.tasks.length * 100) + '%"></div></div>\
        <div class="task-list">';

    m.tasks.forEach((task, idx) => {
      const isDone = prog.completedTasks.includes(idx);
      const isCurrent = idx === activeTaskIndex && !isDone && !allDone;
      html += '<div class="task-item' + (isDone ? " done" : "") + (isCurrent ? " current" : "") + '">\
        <div class="task-item-head">\
          <span class="task-num">' + (idx + 1) + '</span>\
          <span class="task-title">' + escapeHTML(task.title) + '</span>\
          <span class="task-check">' + (isDone ? "\u2705" : "") + '</span>\
        </div>';
      if (isCurrent) {
        html += '<div class="task-tool-req">Tool required: <strong>' + getToolLabel(task.tool) + '</strong> ' + getToolIcon(task.tool) + '</div>';
        html += '<p class="task-prompt">' + escapeHTML(task.prompt) + '</p>';
        html += renderTaskControl(task, idx);
      }
      html += '</div>';
    });

    html += '</div>';
    if (allDone) {
      html += '<div class="task-complete-banner">\u{1F3C6} Mission Complete \u2014 ' + m.xp + ' XP earned!</div>';
    }
    html += '</div></div>';

    console.innerHTML = html;
    bindTaskControls();
  }

  function getToolLabel(toolId) {
    const t = TOOLS.find(x => x.id === toolId);
    return t ? t.label : toolId;
  }
  function getToolIcon(toolId) {
    const t = TOOLS.find(x => x.id === toolId);
    return t ? t.icon : "";
  }

  function renderTaskControl(task, idx) {
    if (task.type === "select") {
      const shuffled = shuffleArray(task.options.slice());
      let html = '<div class="task-options">';
      shuffled.forEach(opt => {
        html += '<button class="task-option-btn" data-value="' + escapeHTML(opt) + '" data-idx="' + idx + '" type="button">' + escapeHTML(opt) + '</button>';
      });
      html += '</div><div class="task-feedback" id="taskFeedback' + idx + '"></div>';
      return html;
    }
    if (task.type === "note") {
      return '<div class="task-note-wrap">\
        <textarea class="task-note" id="taskNote' + idx + '" placeholder="Type your response here\u2026" rows="4"></textarea>\
        <button class="btn btn-primary" id="taskNoteSubmit' + idx + '" type="button">Submit Response</button>\
        <div class="task-feedback" id="taskFeedback' + idx + '"></div>\
      </div>';
    }
    return "";
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function bindTaskControls() {
    document.querySelectorAll(".task-option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const m = MISSIONS.find(x => x.id === activeMissionId);
        if (!m) return;
        const task = m.tasks[idx];
        const val = btn.dataset.value;
        const fb = document.getElementById("taskFeedback" + idx);
        if (val === task.expected) {
          btn.classList.add("correct");
          document.querySelectorAll(".task-option-btn[data-idx='" + idx + "']").forEach(b => { if (b !== btn) b.disabled = true; });
          if (fb) { fb.className = "task-feedback ok"; fb.textContent = "\u2705 " + task.proof; }
          completeTask(idx);
        } else {
          btn.classList.add("wrong");
          if (fb) { fb.className = "task-feedback err"; fb.textContent = "\u274c Incorrect. Review the principle and try again."; }
          recordAttempt(false);
          renderSidebar();
          renderTopStats();
          renderCommand();
          setTimeout(() => btn.classList.remove("wrong"), 800);
        }
      });
    });
    document.querySelectorAll("[id^='taskNoteSubmit']").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.id.replace("taskNoteSubmit", ""));
        const m = MISSIONS.find(x => x.id === activeMissionId);
        if (!m) return;
        const task = m.tasks[idx];
        const ta = document.getElementById("taskNote" + idx);
        const text = (ta ? ta.value : "").toLowerCase();
        const fb = document.getElementById("taskFeedback" + idx);
        const allFound = task.keywords.every(kw => text.includes(kw.toLowerCase()));
        if (text.trim().length < 10) {
          if (fb) { fb.className = "task-feedback err"; fb.textContent = "\u274c Please write a more detailed response (at least 10 characters)."; }
          return;
        }
        if (allFound) {
          if (fb) { fb.className = "task-feedback ok"; fb.textContent = "\u2705 " + task.proof; }
          ta.disabled = true;
          btn.disabled = true;
          completeTask(idx);
        } else {
          if (fb) { fb.className = "task-feedback err"; fb.textContent = "\u274c Your response is missing key concepts. Make sure you include: " + task.keywords.join(", ") + "."; }
          recordAttempt(false);
          renderSidebar();
          renderTopStats();
        }
      });
    });
  }

  function completeTask(idx) {
    const m = MISSIONS.find(x => x.id === activeMissionId);
    if (!m) return;
    const prog = state.missionProgress[m.id] || { completedTasks: [] };
    if (!prog.completedTasks.includes(idx)) {
      prog.completedTasks.push(idx);
      state.missionProgress[m.id] = prog;
      recordAttempt(true);
    }
    if (prog.completedTasks.length >= m.tasks.length) {
      if (!state.completedMissions.includes(m.id)) {
        state.completedMissions.push(m.id);
        addXP(m.xp);
        refreshBadges();
        showToast("\u{1F3C6} Mission Complete! +" + m.xp + " XP", "\u{1F3C6}");
      }
    } else {
      activeTaskIndex = idx + 1;
    }
    saveState();
    renderSidebar();
    renderTopStats();
    renderCommand();
    renderTraining();
    renderMissionSelector();
    renderMissionConsole();
    renderAnalysis();
    renderRanks();
    renderSitrep();
  }

  // ==========================================================
  // ANALYSIS SECTION
  // ==========================================================
  function renderAnalysis() {
    const ringXP = document.getElementById("ringXP");
    if (ringXP) ringXP.textContent = state.xp;
    const cr = currentRank();
    const ringRankLabel = document.getElementById("ringRankLabel");
    if (ringRankLabel) ringRankLabel.textContent = cr.name;
    const xpRingFg = document.getElementById("xpRingFg");
    if (xpRingFg) {
      const pct = rankProgressPct();
      xpRingFg.style.strokeDashoffset = 314 - (314 * pct / 100);
    }
    const nr = nextRank();
    const nextRankName = document.getElementById("nextRankName");
    if (nextRankName) nextRankName.textContent = nr ? nr.name : "MAX RANK";
    const ringXPToNext = document.getElementById("ringXPToNext");
    if (ringXPToNext) ringXPToNext.textContent = nr ? state.xp + " / " + nr.xp + " XP to next rank" : state.xp + " XP (MAX)";

    const xpBarChart = document.getElementById("xpBarChart");
    if (xpBarChart) {
      const maxXP = Math.max.apply(null, MISSIONS.map(m => m.xp));
      xpBarChart.innerHTML = MISSIONS.map(m => {
        const done = state.completedMissions.includes(m.id);
        const h = (m.xp / maxXP) * 100;
        return '<div class="bar-col' + (done ? " done" : "") + '">\
          <div class="bar-fill" style="height:' + (done ? h : 0) + '%"></div>\
          <div class="bar-label">' + m.order + '</div>\
        </div>';
      }).join("");
    }
    updateAnalysis();
  }
  function updateAnalysis() {
    const acc = state.totalAttempts > 0 ? Math.round((1 - state.wrongAttempts / state.totalAttempts) * 100) : 100;
    const accuracyPct = document.getElementById("accuracyPct");
    if (accuracyPct) accuracyPct.textContent = acc + "%";
    const totalAttempts = document.getElementById("totalAttempts");
    if (totalAttempts) totalAttempts.textContent = state.totalAttempts;
    const bestStreak = document.getElementById("bestStreak");
    if (bestStreak) bestStreak.textContent = state.bestStreak;
  }

  // ==========================================================
  // RANKS SECTION
  // ==========================================================
  function renderRanks() {
    const rankList = document.getElementById("rankList");
    if (!rankList) return;
    const cr = currentRank();
    rankList.innerHTML = RANKS.map(r => {
      const isCurrent = r.id === cr.id;
      const isPast = r.id < cr.id;
      return '<div class="rank-row' + (isCurrent ? " current" : "") + (isPast ? " past" : "") + '">\
        <span class="rank-ico">' + r.icon + '</span>\
        <div class="rank-info"><div class="rank-name">' + r.name + '</div><div class="rank-callsign">CALLSIGN: ' + r.callsign + '</div></div>\
        <div class="rank-xp">' + r.xp + ' XP</div>\
        <div class="rank-status">' + (isPast ? "EARNED" : isCurrent ? "CURRENT" : "LOCKED") + '</div>\
      </div>';
    }).join("");
  }

  // ==========================================================
  // SITREP SECTION
  // ==========================================================
  function renderSitrep() {
    const sitrepMission = document.getElementById("sitrepMission");
    if (sitrepMission) {
      const completed = MISSIONS.filter(m => state.completedMissions.includes(m.id));
      sitrepMission.innerHTML = '<option value="">Select a completed mission\u2026</option>' +
        completed.map(m => '<option value="' + m.id + '">' + m.tag + ' \u2014 ' + escapeHTML(m.title) + '</option>').join("");
    }
    const sitrepLog = document.getElementById("sitrepLog");
    if (sitrepLog) {
      if (state.sitreps.length === 0) {
        sitrepLog.innerHTML = '<p class="muted center" style="padding:20px;">No SITREPs filed yet. Complete a mission and file your first report.</p>';
      } else {
        sitrepLog.innerHTML = state.sitreps.slice().reverse().map(s => {
          const m = MISSIONS.find(x => x.id === s.mission);
          const statusClass = s.status === "NOMINAL" ? "ok" : s.status === "ABORTED" ? "err" : "warn";
          return '<div class="sitrep-entry">\
            <div class="sitrep-entry-head">\
              <span class="sitrep-status ' + statusClass + '">' + s.status + '</span>\
              <span class="sitrep-mission">' + (m ? m.tag : s.mission) + '</span>\
              <span class="sitrep-date">' + s.date + '</span>\
            </div>\
            <p class="sitrep-summary">' + escapeHTML(s.summary) + '</p>\
          </div>';
        }).join("");
      }
    }
  }
  function fileSitrep() {
    const missionSel = document.getElementById("sitrepMission");
    const statusSel = document.getElementById("sitrepStatus");
    const summaryTa = document.getElementById("sitrepSummary");
    const fb = document.getElementById("sitrepFeedback");
    if (!missionSel || !statusSel || !summaryTa || !fb) return;
    const mission = missionSel.value;
    const status = statusSel.value;
    const summary = summaryTa.value.trim();
    if (!mission) { fb.className = "task-feedback err"; fb.textContent = "\u274c Select a completed mission."; return; }
    if (!status) { fb.className = "task-feedback err"; fb.textContent = "\u274c Choose an overall status."; return; }
    if (summary.length < 20) { fb.className = "task-feedback err"; fb.textContent = "\u274c Summary must be at least 20 characters."; return; }
    state.sitreps.push({ mission, status, summary, date: new Date().toLocaleDateString() });
    saveState();
    missionSel.value = "";
    statusSel.value = "";
    summaryTa.value = "";
    fb.className = "task-feedback ok";
    fb.textContent = "\u2705 SITREP filed successfully.";
    renderSitrep();
    renderCommand();
    renderTopStats();
    showToast("SITREP Filed", "\u{1F4DD}");
  }

  // ==========================================================
  // LEARN SECTION
  // ==========================================================
  function renderLearn() {
    const grid = document.getElementById("learnGrid");
    if (!grid) return;
    grid.innerHTML = LEARN_ARTICLES.map(a => {
      const read = state.readArticles.includes(a.id);
      return '<div class="lib-card' + (read ? " read" : "") + '" data-article="' + a.id + '">\
        <div class="lib-head"><span class="lib-ico">' + a.icon + '</span><span class="lib-cat">' + a.cat + '</span></div>\
        <h3 class="lib-title">' + escapeHTML(a.title) + '</h3>\
        <p class="lib-desc">' + escapeHTML(a.desc) + '</p>\
        <div class="lib-foot"><span class="lib-xp">+' + a.xp + ' XP</span><span class="lib-read">' + (read ? "READ" : "READ NOW") + '</span></div>\
      </div>';
    }).join("");
    grid.querySelectorAll(".lib-card").forEach(card => {
      card.addEventListener("click", () => openArticle(card.dataset.article));
    });
  }
  function openArticle(articleId) {
    const a = LEARN_ARTICLES.find(x => x.id === articleId);
    if (!a) return;
    if (!state.readArticles.includes(a.id)) {
      state.readArticles.push(a.id);
      addXP(a.xp);
      saveState();
      renderSidebar();
      renderTopStats();
      renderCommand();
      renderAnalysis();
      showToast("Article Read! +" + a.xp + " XP", a.icon);
    }
    renderLearn();
  }
  // ==========================================================
  // FIRING RANGE GAME -- Range Qualification Simulator
  // 5 hands-on modes (no multiple-choice quizzes)
  // ==========================================================

  const rg = {
    active: false,
    examMode: false,
    challengePool: [],
    poolIndex: 0,
    currentMode: null,        // "sight" | "breath" | "trigger" | "npa" | "group"
    score: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    bestStreak: 0,
    round: 0,
    totalRounds: 0,
    challengeDone: false,
    // Per-mode transient state
    sight: { frontX: 0, frontY: 0, targetX: 0, targetY: 0, aligned: false, wobble: 0, wobbleT: 0, dragging: false, fired: false },
    breath: { phase: 0, running: false, inPause: false, fired: false, startTime: 0, raf: null, phaseLabels: [] },
    trigger: { pressure: 0, holding: false, fired: false, breakPoint: 0, raf: null, startTime: 0 },
    npa: { offset: 0, target: 0, fired: false, aligned: false, steps: 0 },
    group: { shots: [], firedCount: 0, diagnosed: false, pattern: "", correctPattern: "", zeroed: false, fired: false },
    timer: { raf: null, start: 0, duration: 0, running: false }
  };

  const RG_MODES = [
    { id: "sight",   label: "SIGHT ALIGNMENT", icon: "\u{1F441}\u{FE0F}", type: "type-sight",
      title: "Align Front Sight in Rear Aperture", tip: "Drag the front sight post to centre it in the rear aperture and level it on the target. Release when aligned, then fire." },
    { id: "breath",  label: "BREATH CONTROL", icon: "\u{1FAB8}", type: "type-breath",
      title: "Fire During Respiratory Pause", tip: "Watch the breathing cycle. Fire only during the natural pause at the end of exhale -- the green zone." },
    { id: "trigger", label: "TRIGGER SQUEEZE", icon: "\u{1F446}", type: "type-trigger",
      title: "Smooth Squeeze -- Surprise Break", tip: "Hold the trigger button to apply smooth, steady pressure. Release when you feel the surprise break near the gold line. Do NOT jerk." },
    { id: "npa",     label: "NATURAL POINT OF AIM", icon: "\u{1F9ED}", type: "type-npa",
      title: "Adjust Body for Natural Point of Aim", tip: "Use the arrows to shift your body position so the rifle naturally points at the target. When aligned, fire." },
    { id: "group",   label: "SHOT GROUPING", icon: "\u{1F3AF}", type: "type-group",
      title: "Fire 5 Shots, Diagnose & Zero", tip: "Fire five shots at the target, then identify the group pattern and apply the correct sight correction." }
  ];

  function rgLoadStats() {
    try {
      const raw = localStorage.getItem(SK.rangeGame);
      if (raw) {
        const d = JSON.parse(raw);
        rg.bestStreak = d.bestStreak || 0;
        rg.score = d.score || 0;
        rg.correct = d.correct || 0;
        rg.wrong = d.wrong || 0;
        rg.round = d.round || 0;
      }
    } catch (e) {}
  }

  function rgSaveStats() {
    try {
      localStorage.setItem(SK.rangeGame, JSON.stringify({
        bestStreak: rg.bestStreak,
        score: rg.score,
        correct: rg.correct,
        wrong: rg.wrong,
        round: rg.round
      }));
    } catch (e) {}
  }

  function rgSetFeedback(msg, kind) {
    const fb = document.getElementById("rgFeedback");
    if (!fb) return;
    fb.className = "rg-feedback " + (kind || "info");
    fb.innerHTML = msg;
  }

  function rgSetModeBadge(modeId, title) {
    const badge = document.getElementById("rgModeBadge");
    const titleEl = document.getElementById("rgChallengeTitle");
    if (!badge || !titleEl) return;
    if (modeId) {
      const mode = RG_MODES.find(m => m.id === modeId);
      if (mode) {
        badge.className = "rg-mode-badge " + mode.type;
        badge.textContent = mode.label;
        titleEl.textContent = mode.title;
        titleEl.classList.remove("flash");
        void titleEl.offsetWidth;
        titleEl.classList.add("flash");
      }
    } else {
      badge.className = "rg-mode-badge idle";
      badge.textContent = "SELECT MODE";
      titleEl.textContent = title || "Ready on the firing line";
    }
  }

  function rgUpdateStats() {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set("rgScore", rg.score);
    set("rgCorrect", rg.correct);
    set("rgWrong", rg.wrong);
    set("rgStreak", rg.streak);
    set("rgRound", rg.round);
  }

  function rgAddLog(text, ok, score) {
    const list = document.getElementById("rgLogList");
    if (!list) return;
    if (list.querySelector(".muted")) list.innerHTML = "";
    const item = document.createElement("div");
    item.className = "rg-log-item " + (ok ? "ok" : "bad");
    const modeLabel = rg.currentMode ? RG_MODES.find(m => m.id === rg.currentMode) : null;
    const ico = ok ? "\u2705" : "\u274C";
    item.innerHTML = '<span class="rg-log-ico">' + ico + '</span>' +
      '<span class="rg-log-text">' + (modeLabel ? modeLabel.label + " \u2014 " : "") +
      escapeHTML(text) + (score !== undefined ? ' <span class="score">[' + score + ']</span>' : '') + '</span>';
    list.insertBefore(item, list.firstChild);
    while (list.children.length > 20) list.removeChild(list.lastChild);
  }

  function rgRenderTargetView() {
    const wrap = document.getElementById("rgTargetWrap");
    if (!wrap) return;
    let shots = "";
    // Show shots from group mode if available, otherwise just show target rings
    const allShots = rg.group.shots;
    allShots.forEach((s, i) => {
      const latest = i === allShots.length - 1 ? " latest" : "";
      shots += '<circle class="rg-target-shot' + latest + '" cx="' + s.x + '" cy="' + s.y + '" r="3.5"/>';
    });
    const rings = '<circle class="rg-target-ring" cx="100" cy="100" r="90"/>' +
      '<circle class="rg-target-ring" cx="100" cy="100" r="72"/>' +
      '<circle class="rg-target-ring" cx="100" cy="100" r="54"/>' +
      '<circle class="rg-target-ring" cx="100" cy="100" r="36"/>' +
      '<circle class="rg-target-ring" cx="100" cy="100" r="18"/>' +
      '<circle class="rg-target-bull" cx="100" cy="100" r="8"/>';
    wrap.innerHTML = '<svg viewBox="0 0 200 200">' + rings + shots + '</svg>';
  }

  // -- Timer helpers --
  function rgStartTimer(durationSec, onTick, onEnd) {
    rgStopTimer();
    rg.timer.running = true;
    rg.timer.start = performance.now();
    rg.timer.duration = durationSec * 1000;
    const fill = document.getElementById("rgTimerFill");
    const text = document.getElementById("rgTimerText");
    function tick() {
      if (!rg.timer.running) return;
      const elapsed = performance.now() - rg.timer.start;
      const remaining = rg.timer.duration - elapsed;
      const pct = Math.max(0, Math.min(100, (elapsed / rg.timer.duration) * 100));
      if (fill) fill.style.width = pct + "%";
      if (text) text.textContent = Math.max(0, (remaining / 1000)).toFixed(1) + "s";
      if (onTick) onTick(elapsed, remaining);
      if (remaining <= 0) {
        rg.timer.running = false;
        if (fill) fill.style.width = "100%";
        if (text) text.textContent = "0.0s";
        if (onEnd) onEnd();
        return;
      }
      rg.timer.raf = requestAnimationFrame(tick);
    }
    rg.timer.raf = requestAnimationFrame(tick);
  }

  function rgStopTimer() {
    rg.timer.running = false;
    if (rg.timer.raf) cancelAnimationFrame(rg.timer.raf);
    rg.timer.raf = null;
  }

  function rgResetTimerDisplay() {
    const fill = document.getElementById("rgTimerFill");
    const text = document.getElementById("rgTimerText");
    if (fill) fill.style.width = "0%";
    if (text) text.textContent = "\u2014";
  }

  // -- Challenge lifecycle --
  function rgStartQualification() {
    rgStopAllAnimations();
    rg.active = true;
    rg.examMode = false;
    rg.score = 0;
    rg.correct = 0;
    rg.wrong = 0;
    rg.streak = 0;
    rg.round = 0;
    rg.totalRounds = 0;
    rg.group.shots = [];
    rg.group.firedCount = 0;
    rg.group.diagnosed = false;
    rg.group.zeroed = false;
    rg.challengePool = shuffleArray(RG_MODES.map(m => m.id));
    rg.poolIndex = 0;
    rgUpdateStats();
    rgRenderTargetView();
    document.getElementById("rgStartBtn").disabled = true;
    document.getElementById("rgExamBtn").disabled = true;
    document.getElementById("rgNextBtn").disabled = true;
    rgNextMode();
  }

  function rgStartExamMode() {
    rgStopAllAnimations();
    rg.active = true;
    rg.examMode = true;
    rg.score = 0;
    rg.correct = 0;
    rg.wrong = 0;
    rg.streak = 0;
    rg.round = 0;
    rg.totalRounds = 5;
    rg.group.shots = [];
    rg.group.firedCount = 0;
    rg.group.diagnosed = false;
    rg.group.zeroed = false;
    rg.challengePool = [];
    // Exam: 5 rounds, each picks a random mode
    for (let i = 0; i < 5; i++) {
      rg.challengePool.push(RG_MODES[Math.floor(Math.random() * RG_MODES.length)].id);
    }
    rg.poolIndex = 0;
    rgUpdateStats();
    rgRenderTargetView();
    document.getElementById("rgStartBtn").disabled = true;
    document.getElementById("rgExamBtn").disabled = true;
    document.getElementById("rgNextBtn").disabled = true;
    rgSetFeedback("<strong>EXAM MODE</strong> \u2014 5 rounds, random modes. Qualify with 4 out of 5. Range is hot!", "info");
    setTimeout(function () { rgNextMode(); }, 800);
  }

  function rgNextMode() {
    rgStopAllAnimations();
    if (rg.poolIndex >= rg.challengePool.length) {
      rgFinishQualification();
      return;
    }
    rg.currentMode = rg.challengePool[rg.poolIndex];
    rg.poolIndex++;
    rg.round++;
    rg.challengeDone = false;
    rgUpdateStats();
    document.getElementById("rgNextBtn").disabled = true;
    rgSetModeBadge(rg.currentMode);
    const mode = RG_MODES.find(function (m) { return m.id === rg.currentMode; });
    rgSetFeedback("<strong>" + mode.label + "</strong> \u2014 " + mode.tip, "info");

    if (rg.currentMode === "sight") renderSightAlignmentChallenge();
    else if (rg.currentMode === "breath") renderBreathControlChallenge();
    else if (rg.currentMode === "trigger") renderTriggerSqueezeChallenge();
    else if (rg.currentMode === "npa") renderNPAChallenge();
    else if (rg.currentMode === "group") renderShotGroupingChallenge();
  }

  function rgHandleResult(success, scoreVal, detailText) {
    if (rg.challengeDone) return;
    rg.challengeDone = true;
    rgStopAllAnimations();
    rgStopTimer();
    rgResetTimerDisplay();
    if (success) {
      rg.correct++;
      rg.streak++;
      if (rg.streak > rg.bestStreak) rg.bestStreak = rg.streak;
      rg.score += scoreVal || 10;
      rgSetFeedback("\u2705 <strong>HIT!</strong> " + detailText + " +" + (scoreVal || 10) + " points.", "ok");
      rgAddLog(detailText, true, scoreVal || 10);
    } else {
      rg.wrong++;
      rg.streak = 0;
      rgSetFeedback("\u274C <strong>MISS / FAULT!</strong> " + detailText, "err");
      rgAddLog(detailText, false, 0);
    }
    recordAttempt(success);
    rgUpdateStats();
    rgSaveStats();
    renderSidebar();
    renderTopStats();
    renderAnalysis();
    document.getElementById("rgNextBtn").disabled = false;
  }

  function rgFinishQualification() {
    rg.active = false;
    rgStopAllAnimations();
    rg.currentMode = null;
    rgSetModeBadge(null, "Qualification Complete");
    rgResetTimerDisplay();
    document.getElementById("rgStartBtn").disabled = false;
    document.getElementById("rgExamBtn").disabled = false;
    document.getElementById("rgNextBtn").disabled = true;
    const total = rg.correct + rg.wrong;
    const pct = total > 0 ? Math.round((rg.correct / total) * 100) : 0;
    let msg = "";
    if (rg.examMode) {
      if (rg.correct >= 4) {
        msg = "<strong>QUALIFIED!</strong> You passed the range exam with " + rg.correct + "/5. Score: " + rg.score + ". You are a marksman.";
        addXP(50);
        saveState();
        renderSidebar(); renderTopStats(); renderCommand();
        showToast("Range Exam Passed! +50 XP", "\u{1F396}\u{FE0F}");
      } else {
        msg = "<strong>NOT YET QUALIFIED.</strong> You scored " + rg.correct + "/5. You need 4/5 to pass. Keep practising \u2014 the fundamentals improve with repetition.";
      }
    } else {
      if (pct >= 80) {
        msg = "<strong>OUTSTANDING SHOOTING!</strong> " + rg.correct + "/" + total + " hits (" + pct + "%). Score: " + rg.score + ". Try Exam Mode for formal qualification.";
      } else if (pct >= 50) {
        msg = "<strong>SOLID EFFORT.</strong> " + rg.correct + "/" + total + " hits (" + pct + "%). Score: " + rg.score + ". Focus on the fundamentals and try again.";
      } else {
        msg = "<strong>KEEP TRAINING.</strong> " + rg.correct + "/" + total + " hits (" + pct + "%). Review the Learn library and practise each mode.";
      }
    }
    rgSetFeedback(msg, pct >= 50 ? "ok" : "err");
    // Restore idle challenge area
    const area = document.getElementById("rgChallengeArea");
    if (area) area.innerHTML = '<div class="rg-idle-prompt">' +
      '<div class="rg-idle-ico">\u{1F3AF}</div>' +
      '<h2>Qualification Complete</h2>' +
      '<p style="color:var(--ink-2); font-size:13px; line-height:1.6;">' + msg.replace(/<[^>]+>/g, "") + '</p>' +
      '<p class="muted" style="font-size:12px; margin-top:14px;">Press <strong>Start Qualification</strong> for another round, or <strong>Exam Mode</strong> for the formal test.</p>' +
      '</div>';
  }

  function rgReset() {
    rgStopAllAnimations();
    rg.active = false;
    rg.examMode = false;
    rg.currentMode = null;
    rg.score = 0;
    rg.correct = 0;
    rg.wrong = 0;
    rg.streak = 0;
    rg.round = 0;
    rg.challengePool = [];
    rg.poolIndex = 0;
    rg.group.shots = [];
    rg.group.firedCount = 0;
    rg.group.diagnosed = false;
    rg.group.zeroed = false;
    rgResetTimerDisplay();
    rgSetModeBadge(null);
    rgUpdateStats();
    rgRenderTargetView();
    rgSetFeedback("Range reset. Press <strong>Start Qualification</strong> to begin.", "info");
    document.getElementById("rgStartBtn").disabled = false;
    document.getElementById("rgExamBtn").disabled = false;
    document.getElementById("rgNextBtn").disabled = true;
    renderRangeGame();
  }

  function rgStopAllAnimations() {
    rgStopTimer();
    if (rg.breath.raf) { cancelAnimationFrame(rg.breath.raf); rg.breath.raf = null; }
    if (rg.trigger.raf) { cancelAnimationFrame(rg.trigger.raf); rg.trigger.raf = null; }
    rg.breath.running = false;
    rg.trigger.holding = false;
  }

  // ==========================================================
  // MODE 1: SIGHT ALIGNMENT
  // Drag the front sight post to centre it in the rear aperture
  // and level it on the target. Fire when aligned.
  // ==========================================================
  function renderSightAlignmentChallenge() {
    const area = document.getElementById("rgChallengeArea");
    if (!area) return;
    // Target is at centre (50%,50%). Front sight starts offset.
    const tx = 50, ty = 50; // target centre in % (will be mapped to SVG coords)
    rg.sight.targetX = 250; // SVG centre
    rg.sight.targetY = 130;
    rg.sight.frontX = 250 + (Math.random() - 0.5) * 120; // random offset
    rg.sight.frontY = 130 + (Math.random() - 0.5) * 60;
    rg.sight.aligned = false;
    rg.sight.fired = false;
    rg.sight.wobble = 0;
    rg.sight.wobbleT = 0;
    rg.sight.dragging = false;

    area.innerHTML =
      '<div class="sight-wrap">' +
        '<div class="sight-view" id="sightView">' +
          '<svg viewBox="0 0 500 260" id="sightSvg">' +
            '<line class="sight-crosshair" x1="250" y1="0" x2="250" y2="260"/>' +
            '<line class="sight-crosshair" x1="0" y1="130" x2="500" y2="130"/>' +
            '<circle class="sight-target-ring" cx="250" cy="130" r="60"/>' +
            '<circle class="sight-target-ring" cx="250" cy="130" r="40"/>' +
            '<circle class="sight-target-ring" cx="250" cy="130" r="20"/>' +
            '<circle class="sight-target-bull" cx="250" cy="130" r="8"/>' +
            '<circle class="sight-rear-aperture" cx="250" cy="130" r="95"/>' +
            '<rect class="sight-front-post" id="sightFrontPost" x="' + (rg.sight.frontX - 8) + '" y="' + (rg.sight.frontY - 20) + '" width="16" height="40" rx="2"/>' +
          '</svg>' +
        '</div>' +
        '<p class="sight-instruction">Drag the <strong>front sight post</strong> to centre it in the rear aperture and align it on the bull. When the post turns <strong>green</strong>, fire.</p>' +
        '<button class="sight-fire-btn" id="sightFireBtn" type="button" disabled>FIRE</button>' +
      '</div>';

    const svg = document.getElementById("sightSvg");
    const post = document.getElementById("sightFrontPost");
    const view = document.getElementById("sightView");
    const fireBtn = document.getElementById("sightFireBtn");

    function svgPoint(evt) {
      const rect = svg.getBoundingClientRect();
      const sx = (evt.clientX - rect.left) / rect.width * 500;
      const sy = (evt.clientY - rect.top) / rect.height * 260;
      return { x: sx, y: sy };
    }

    function checkAlignment() {
      const dx = rg.sight.frontX - rg.sight.targetX;
      const dy = rg.sight.frontY - rg.sight.targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Wobble: adds slight oscillation to simulate unsteady hold
      rg.sight.wobbleT += 0.05;
      const wobbleX = Math.sin(rg.sight.wobbleT * 1.3) * 3;
      const wobbleY = Math.cos(rg.sight.wobbleT * 1.7) * 2;
      const effDist = Math.sqrt((dx + wobbleX) * (dx + wobbleX) + (dy + wobbleY) * (dy + wobbleY));
      const aligned = effDist < 18;
      if (aligned !== rg.sight.aligned) {
        rg.sight.aligned = aligned;
        if (aligned) {
          post.classList.add("aligned");
          fireBtn.classList.add("ready");
          fireBtn.disabled = false;
        } else {
          post.classList.remove("aligned");
          fireBtn.classList.remove("ready");
          fireBtn.disabled = true;
        }
      }
      // Update post position with wobble
      post.setAttribute("x", (rg.sight.frontX - 8 + wobbleX));
      post.setAttribute("y", (rg.sight.frontY - 20 + wobbleY));
      if (!rg.sight.fired) requestAnimationFrame(checkAlignment);
    }

    function onDown(evt) {
      evt.preventDefault();
      rg.sight.dragging = true;
      const pt = svgPoint(evt.touches ? evt.touches[0] : evt);
      rg.sight.frontX = pt.x;
      rg.sight.frontY = pt.y;
    }
    function onMove(evt) {
      if (!rg.sight.dragging) return;
      evt.preventDefault();
      const pt = svgPoint(evt.touches ? evt.touches[0] : evt);
      rg.sight.frontX = Math.max(160, Math.min(340, pt.x));
      rg.sight.frontY = Math.max(50, Math.min(210, pt.y));
    }
    function onUp() { rg.sight.dragging = false; }

    svg.addEventListener("mousedown", onDown);
    svg.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    svg.addEventListener("touchstart", onDown, { passive: false });
    svg.addEventListener("touchmove", onMove, { passive: false });
    svg.addEventListener("touchend", onUp);

    fireBtn.addEventListener("click", function () {
      if (rg.sight.fired || !rg.sight.aligned) return;
      rg.sight.fired = true;
      const dx = rg.sight.frontX - rg.sight.targetX;
      const dy = rg.sight.frontY - rg.sight.targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Muzzle flash effect
      fireBtn.textContent = "BANG!";
      fireBtn.disabled = true;
      fireBtn.classList.remove("ready");
      if (dist < 10) {
        rgHandleResult(true, 12, "Perfect sight alignment \u2014 centred on the bull. Dead centre hit.");
      } else if (dist < 18) {
        rgHandleResult(true, 10, "Good sight alignment \u2014 front post centred in aperture. Solid hit.");
      } else {
        rgHandleResult(false, 0, "Fired before alignment was correct. Front sight was off-centre.");
      }
      // Add shot to target view
      const targetX = 100 + (dx / 120) * 30;
      const targetY = 100 + (dy / 80) * 30;
      rg.group.shots.push({ x: Math.max(10, Math.min(190, targetX)), y: Math.max(10, Math.min(190, targetY)) });
      rgRenderTargetView();
    });

    // Start alignment check loop
    requestAnimationFrame(checkAlignment);

    // Start a 15-second timer
    rgStartTimer(15, null, function () {
      if (!rg.challengeDone) {
        rg.sight.fired = true;
        rgHandleResult(false, 0, "Time expired \u2014 you did not fire in time. The sight was not aligned.");
      }
    });
  }

  // ==========================================================
  // MODE 2: BREATH CONTROL
  // Watch the breathing cycle; fire during the respiratory pause
  // (end of exhale). A sine wave shows inhale/exhale; the bottom
  // flat zone is the pause.
  // ==========================================================
  function renderBreathControlChallenge() {
    const area = document.getElementById("rgChallengeArea");
    if (!area) return;
    rg.breath.phase = 0;
    rg.breath.running = true;
    rg.breath.inPause = false;
    rg.breath.fired = false;
    rg.breath.startTime = performance.now();

    area.innerHTML =
      '<div class="breath-wrap">' +
        '<div class="breath-canvas" id="breathCanvas">' +
          '<svg viewBox="0 0 500 200" id="breathSvg">' +
            // Pause zone at the bottom (end of exhale)
            '<rect class="breath-pause-zone" x="0" y="150" width="500" height="30"/>' +
            // Labels
            '<text class="breath-phase-label" x="60" y="30">INHALE</text>' +
            '<text class="breath-phase-label" x="60" y="180">EXHALE</text>' +
            '<text class="breath-phase-label" x="400" y="175" style="fill:var(--green);">PAUSE</text>' +
            // Curve will be drawn dynamically
            '<path class="breath-curve" id="breathCurve" d=""/>' +
            // Indicator dot
            '<circle class="breath-indicator" id="breathIndicator" cx="0" cy="0" r="6"/>' +
            '<text class="breath-phase-label" id="breathPhaseText" x="250" y="195" style="font-size:9px;">PREPARE...</text>' +
          '</svg>' +
        '</div>' +
        '<p class="breath-instruction">Watch the breathing cycle. Fire only when the indicator is in the <strong>green pause zone</strong> at the end of exhale.</p>' +
        '<button class="breath-fire-btn" id="breathFireBtn" type="button" disabled>FIRE</button>' +
      '</div>';

    const curve = document.getElementById("breathCurve");
    const indicator = document.getElementById("breathIndicator");
    const phaseText = document.getElementById("breathPhaseText");
    const fireBtn = document.getElementById("breathFireBtn");

    // Breathing cycle: 4s inhale, 4s exhale, 2s pause = 10s total
    // We use a parametric curve. y goes from 170 (bottom/exhale) up to 30 (top/inhale)
    const CYCLE = 10000; // 10 seconds
    const INHALE = 4000;
    const EXHALE = 4000;
    const PAUSE = 2000;

    function breathValue(t) {
      // t in ms within cycle
      if (t < INHALE) {
        // Inhale: 170 -> 30
        const p = t / INHALE;
        return 170 - p * 140;
      } else if (t < INHALE + EXHALE) {
        // Exhale: 30 -> 170
        const p = (t - INHALE) / EXHALE;
        return 30 + p * 140;
      } else {
        // Pause: stays at 170
        return 170;
      }
    }

    function isInPause(t) {
      return t >= INHALE + EXHALE && t < CYCLE;
    }

    function getPhaseLabel(t) {
      if (t < INHALE) return "INHALE";
      if (t < INHALE + EXHALE) return "EXHALE";
      if (t < CYCLE) return "RESPIRATORY PAUSE";
      return "INHALE";
    }

    // Draw the full curve statically
    let curvePath = "M 0 170";
    for (let x = 0; x <= 500; x += 5) {
      const t = (x / 500) * CYCLE;
      const y = breathValue(t);
      curvePath += " L " + x + " " + y;
    }
    curve.setAttribute("d", curvePath);

    function animate() {
      if (!rg.breath.running) return;
      const elapsed = (performance.now() - rg.breath.startTime) % CYCLE;
      const x = (elapsed / CYCLE) * 500;
      const y = breathValue(elapsed);
      indicator.setAttribute("cx", x);
      indicator.setAttribute("cy", y);
      const inPause = isInPause(elapsed);
      if (inPause !== rg.breath.inPause) {
        rg.breath.inPause = inPause;
        if (inPause) {
          indicator.classList.add("in-pause");
          fireBtn.classList.add("in-pause");
          fireBtn.disabled = false;
        } else {
          indicator.classList.remove("in-pause");
          fireBtn.classList.remove("in-pause");
          fireBtn.disabled = true;
        }
      }
      phaseText.textContent = getPhaseLabel(elapsed);
      rg.breath.raf = requestAnimationFrame(animate);
    }
    rg.breath.raf = requestAnimationFrame(animate);

    fireBtn.addEventListener("click", function () {
      if (rg.breath.fired) return;
      rg.breath.fired = true;
      rg.breath.running = false;
      const elapsed = (performance.now() - rg.breath.startTime) % CYCLE;
      const inPause = isInPause(elapsed);
      fireBtn.textContent = "BANG!";
      fireBtn.disabled = true;
      fireBtn.classList.remove("in-pause");
      if (inPause) {
        // Score based on how deep into the pause they fired
        const pauseT = elapsed - (INHALE + EXHALE);
        const bonus = pauseT > 500 ? 12 : 10;
        rgHandleResult(true, bonus, "Fired during the respiratory pause \u2014 natural let-off. Steady hold, clean break.");
        // Shot near centre
        rg.group.shots.push({ x: 98 + Math.random() * 4, y: 98 + Math.random() * 4 });
      } else {
        const phase = getPhaseLabel(elapsed);
        rgHandleResult(false, 0, "Fired during " + phase.toLowerCase() + " \u2014 the shot was disturbed by breathing motion. Wait for the pause.");
        // Shot scattered based on breathing motion
        const scatter = phase === "INHALE" ? -15 : 15;
        rg.group.shots.push({ x: 100 + scatter + (Math.random() - 0.5) * 20, y: 100 + (Math.random() - 0.5) * 30 });
      }
      rgRenderTargetView();
    });

    // 20-second timer to complete
    rgStartTimer(20, null, function () {
      if (!rg.challengeDone) {
        rg.breath.fired = true;
        rg.breath.running = false;
        rgHandleResult(false, 0, "Time expired \u2014 you held too long. Fire during one of the pause windows.");
      }
    });
  }

  // ==========================================================
  // MODE 3: TRIGGER SQUEEZE
  // Hold the trigger button to apply smooth, steady pressure.
  // The pressure gauge fills. Release near the "break" line for
  // the surprise break. Jerking (releasing too fast or too far)
  // is a fault.
  // ==========================================================
  function renderTriggerSqueezeChallenge() {
    const area = document.getElementById("rgChallengeArea");
    if (!area) return;
    rg.trigger.pressure = 0;
    rg.trigger.holding = false;
    rg.trigger.fired = false;
    // Break point is randomised between 70-85%
    rg.trigger.breakPoint = 70 + Math.random() * 15;
    rg.trigger.startTime = performance.now();

    area.innerHTML =
      '<div class="trigger-wrap">' +
        '<div class="trigger-gauge" id="triggerGauge">' +
          '<svg viewBox="0 0 500 80">' +
            '<rect class="trigger-track" x="20" y="25" width="460" height="30" rx="4"/>' +
            '<rect class="trigger-ideal-zone" id="triggerIdealZone" x="0" y="25" width="0" height="30"/>' +
            '<line class="trigger-break-line" id="triggerBreakLine" x1="0" y1="20" x2="0" y2="60"/>' +
            '<rect class="trigger-needle" id="triggerNeedle" x="18" y="22" width="6" height="36" rx="2"/>' +
            '<text class="trigger-label" x="20" y="75">0%</text>' +
            '<text class="trigger-label" x="480" y="75">100%</text>' +
            '<text class="trigger-label" id="triggerBreakLabel" x="0" y="16">BREAK</text>' +
          '</svg>' +
        '</div>' +
        '<div class="trigger-pressure-val" id="triggerPressureVal">0%</div>' +
        '<p class="trigger-instruction">Press and <strong>hold</strong> the trigger to apply smooth, steady pressure. Release when the needle reaches the <strong>gold break line</strong> for the surprise break. Releasing too early or too late pulls the shot.</p>' +
        '<button class="trigger-hold-btn" id="triggerHoldBtn" type="button">HOLD TRIGGER</button>' +
      '</div>';

    const needle = document.getElementById("triggerNeedle");
    const idealZone = document.getElementById("triggerIdealZone");
    const breakLine = document.getElementById("triggerBreakLine");
    const breakLabel = document.getElementById("triggerBreakLabel");
    const pressureVal = document.getElementById("triggerPressureVal");
    const holdBtn = document.getElementById("triggerHoldBtn");

    // Position break line
    const breakX = 20 + (rg.trigger.breakPoint / 100) * 460;
    breakLine.setAttribute("x1", breakX);
    breakLine.setAttribute("x2", breakX);
    breakLabel.setAttribute("x", breakX);
    // Ideal zone: +/- 8% around break point
    const idealStart = 20 + (Math.max(0, rg.trigger.breakPoint - 8) / 100) * 460;
    const idealEnd = 20 + (Math.min(100, rg.trigger.breakPoint + 8) / 100) * 460;
    idealZone.setAttribute("x", idealStart);
    idealZone.setAttribute("width", idealEnd - idealStart);

    let lastTime = performance.now();

    function animate() {
      if (rg.trigger.fired) return;
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      if (rg.trigger.holding) {
        // Smooth pressure increase: ~25% per second (takes ~4s to reach 100%)
        rg.trigger.pressure += 25 * dt;
        if (rg.trigger.pressure > 100) rg.trigger.pressure = 100;
      }
      // Update visuals
      const needleX = 20 + (rg.trigger.pressure / 100) * 460 - 3;
      needle.setAttribute("x", needleX);
      pressureVal.textContent = Math.round(rg.trigger.pressure) + "%";
      // Color states
      const dist = Math.abs(rg.trigger.pressure - rg.trigger.breakPoint);
      if (dist < 8) {
        needle.classList.add("safe");
        needle.classList.remove("danger");
        pressureVal.classList.add("safe");
        pressureVal.classList.remove("danger");
      } else if (rg.trigger.pressure > rg.trigger.breakPoint + 12) {
        needle.classList.add("danger");
        needle.classList.remove("safe");
        pressureVal.classList.add("danger");
        pressureVal.classList.remove("safe");
      } else {
        needle.classList.remove("safe", "danger");
        pressureVal.classList.remove("safe", "danger");
      }
      rg.trigger.raf = requestAnimationFrame(animate);
    }
    rg.trigger.raf = requestAnimationFrame(animate);

    function startHold(e) {
      e.preventDefault();
      if (rg.trigger.fired) return;
      rg.trigger.holding = true;
      holdBtn.classList.add("holding");
    }
    function endHold(e) {
      if (e) e.preventDefault();
      if (rg.trigger.fired || !rg.trigger.holding) return;
      rg.trigger.holding = false;
      holdBtn.classList.remove("holding");
      // Evaluate the shot
      rg.trigger.fired = true;
      holdBtn.textContent = "FIRED";
      holdBtn.disabled = true;
      const p = rg.trigger.pressure;
      const dist = Math.abs(p - rg.trigger.breakPoint);
      if (dist < 5) {
        rgHandleResult(true, 12, "Perfect surprise break \u2014 pressure released exactly at the break point. Clean shot.");
        rg.group.shots.push({ x: 98 + Math.random() * 4, y: 98 + Math.random() * 4 });
      } else if (dist < 8) {
        rgHandleResult(true, 10, "Good trigger control \u2014 smooth squeeze, released near the break. Solid hit.");
        rg.group.shots.push({ x: 95 + Math.random() * 10, y: 95 + Math.random() * 10 });
      } else if (p < rg.trigger.breakPoint - 8) {
        rgHandleResult(false, 0, "Released too early \u2014 you flinched before the break. The shot went low.");
        rg.group.shots.push({ x: 100 + (Math.random() - 0.5) * 10, y: 120 + Math.random() * 20 });
      } else {
        rgHandleResult(false, 0, "Over-pulled past the break \u2014 you jerked the trigger. The shot pulled to the side.");
        rg.group.shots.push({ x: 120 + Math.random() * 20, y: 100 + (Math.random() - 0.5) * 15 });
      }
      rgRenderTargetView();
    }

    holdBtn.addEventListener("mousedown", startHold);
    holdBtn.addEventListener("mouseup", endHold);
    holdBtn.addEventListener("mouseleave", endHold);
    holdBtn.addEventListener("touchstart", startHold, { passive: false });
    holdBtn.addEventListener("touchend", endHold, { passive: false });

    // 12-second timer
    rgStartTimer(12, null, function () {
      if (!rg.challengeDone) {
        rg.trigger.fired = true;
        rg.trigger.holding = false;
        rgHandleResult(false, 0, "Time expired \u2014 you never squeezed the trigger. Commit to the shot.");
      }
    });
  }

  // ==========================================================
  // MODE 4: NATURAL POINT OF AIM (NPA)
  // The rifle points off-target. Use arrow buttons to shift body
  // position until the aim line aligns with the target. Fire when
  // the NPA is correct (offset near zero).
  // ==========================================================
  function renderNPAChallenge() {
    const area = document.getElementById("rgChallengeArea");
    if (!area) return;
    // Random initial offset (-40 to +40 degrees-ish, scaled)
    rg.npa.offset = (Math.random() < 0.5 ? -1 : 1) * (20 + Math.random() * 25);
    rg.npa.target = 0;
    rg.npa.fired = false;
    rg.npa.aligned = false;
    rg.npa.steps = 0;

    area.innerHTML =
      '<div class="npa-wrap">' +
        '<div class="npa-canvas" id="npaCanvas">' +
          '<svg viewBox="0 0 500 240" id="npaSvg">' +
            // Target at right side
            '<circle class="npa-target-center" cx="420" cy="120" r="14"/>' +
            '<circle class="sight-target-ring" cx="420" cy="120" r="30"/>' +
            '<circle class="sight-target-ring" cx="420" cy="120" r="50"/>' +
            // Aim line from shooter (left) to target
            '<line class="npa-aim-line" id="npaAimLine" x1="80" y1="120" x2="420" y2="120"/>' +
            // Shooter figure (simple)
            '<g class="npa-shooter" id="npaShooter" transform="translate(80,120)">' +
              '<circle cx="0" cy="-18" r="10" fill="var(--steel-bright)" opacity="0.8"/>' +
              '<rect x="-8" y="-8" width="16" height="30" rx="4" fill="var(--steel)" opacity="0.7"/>' +
              '<rect x="5" y="-5" width="40" height="6" rx="2" fill="var(--ink-2)"/>' + // rifle
            '</g>' +
            // NPA offset indicator
            '<text class="breath-phase-label" id="npaOffsetText" x="250" y="220" style="font-size:11px;">NPA OFFSET: 0\u00B0</text>' +
          '</svg>' +
        '</div>' +
        '<div class="npa-offset-display" id="npaOffsetDisplay">NPA Offset: <span class="bad">' + Math.round(rg.npa.offset) + '\u00B0</span></div>' +
        '<div class="npa-adjust-btns">' +
          '<button class="npa-adjust-btn empty" disabled></button>' +
          '<button class="npa-adjust-btn" id="npaUpBtn" type="button">\u2191</button>' +
          '<button class="npa-adjust-btn empty" disabled></button>' +
          '<button class="npa-adjust-btn" id="npaLeftBtn" type="button">\u2190</button>' +
          '<button class="npa-adjust-btn" id="npaCenterBtn" type="button">\u25CF</button>' +
          '<button class="npa-adjust-btn" id="npaRightBtn" type="button">\u2192</button>' +
          '<button class="npa-adjust-btn empty" disabled></button>' +
          '<button class="npa-adjust-btn" id="npaDownBtn" type="button">\u2193</button>' +
          '<button class="npa-adjust-btn empty" disabled></button>' +
        '</div>' +
        '<p class="npa-instruction">Shift your <strong>body position</strong> (not the rifle) until the aim line naturally points at the target. When offset is near zero, fire.</p>' +
        '<button class="npa-fire-btn" id="npaFireBtn" type="button" disabled>FIRE</button>' +
      '</div>';

    const aimLine = document.getElementById("npaAimLine");
    const shooter = document.getElementById("npaShooter");
    const offsetText = document.getElementById("npaOffsetText");
    const offsetDisplay = document.getElementById("npaOffsetDisplay");
    const fireBtn = document.getElementById("npaFireBtn");

    function updateNPA() {
      // The aim line endpoint shifts based on offset
      // Offset is in "degrees" but we map to pixel displacement
      const endX = 420;
      const endY = 120 + (rg.npa.offset * 1.5);
      aimLine.setAttribute("x2", endX);
      aimLine.setAttribute("y2", endY);
      // Update shooter rotation slightly to show body adjustment
      const rot = rg.npa.offset * 0.3;
      shooter.setAttribute("transform", "translate(80,120) rotate(" + rot + ")");
      offsetText.textContent = "NPA OFFSET: " + Math.round(Math.abs(rg.npa.offset)) + "\u00B0";
      const isAligned = Math.abs(rg.npa.offset) < 5;
      if (isAligned !== rg.npa.aligned) {
        rg.npa.aligned = isAligned;
        if (isAligned) {
          aimLine.classList.add("aligned");
          fireBtn.classList.add("ready");
          fireBtn.disabled = false;
          offsetDisplay.innerHTML = 'NPA Offset: <span class="ok">' + Math.round(Math.abs(rg.npa.offset)) + '\u00B0 \u2014 ALIGNED</span>';
        } else {
          aimLine.classList.remove("aligned");
          fireBtn.classList.remove("ready");
          fireBtn.disabled = true;
          offsetDisplay.innerHTML = 'NPA Offset: <span class="bad">' + Math.round(Math.abs(rg.npa.offset)) + '\u00B0</span>';
        }
      }
    }

    function adjust(delta) {
      if (rg.npa.fired) return;
      rg.npa.offset += delta;
      rg.npa.offset = Math.max(-50, Math.min(50, rg.npa.offset));
      rg.npa.steps++;
      updateNPA();
    }

    document.getElementById("npaUpBtn").addEventListener("click", function () { adjust(-5); });
    document.getElementById("npaDownBtn").addEventListener("click", function () { adjust(5); });
    document.getElementById("npaLeftBtn").addEventListener("click", function () { adjust(-5); });
    document.getElementById("npaRightBtn").addEventListener("click", function () { adjust(5); });
    document.getElementById("npaCenterBtn").addEventListener("click", function () { adjust(-rg.npa.offset); });

    fireBtn.addEventListener("click", function () {
      if (rg.npa.fired || !rg.npa.aligned) return;
      rg.npa.fired = true;
      fireBtn.textContent = "BANG!";
      fireBtn.disabled = true;
      fireBtn.classList.remove("ready");
      const off = Math.abs(rg.npa.offset);
      if (off < 3) {
        rgHandleResult(true, 12, "Perfect NPA \u2014 the rifle naturally pointed at the target. No muscle tension, clean shot in " + rg.npa.steps + " adjustments.");
        rg.group.shots.push({ x: 98 + Math.random() * 4, y: 98 + Math.random() * 4 });
      } else {
        rgHandleResult(true, 10, "Good NPA \u2014 body adjusted, rifle naturally on target. Acceptable shot in " + rg.npa.steps + " adjustments.");
        rg.group.shots.push({ x: 95 + Math.random() * 10, y: 95 + Math.random() * 10 });
      }
      rgRenderTargetView();
    });

    updateNPA();

    // 18-second timer
    rgStartTimer(18, null, function () {
      if (!rg.challengeDone) {
        rg.npa.fired = true;
        rgHandleResult(false, 0, "Time expired \u2014 your NPA was still off by " + Math.round(Math.abs(rg.npa.offset)) + "\u00B0. Adjust the body, not the rifle.");
      }
    });
  }

  // ==========================================================
  // MODE 5: SHOT GROUPING
  // Fire 5 shots at the target. Each shot has a small random
  // dispersion based on a pre-set "fault" pattern. After 5 shots,
  // diagnose the group pattern (vertical, horizontal, scattered,
  // or tight) and select the correct correction.
  // ==========================================================
  function renderShotGroupingChallenge() {
    const area = document.getElementById("rgChallengeArea");
    if (!area) return;
    rg.group.shots = [];
    rg.group.firedCount = 0;
    rg.group.diagnosed = false;
    rg.group.zeroed = false;
    rg.group.fired = false;

    // Pick a random pattern for this challenge
    const patterns = ["vertical", "horizontal", "scattered", "tight"];
    rg.group.correctPattern = patterns[Math.floor(Math.random() * patterns.length)];

    // Group centre offset (where the group is centred relative to bull)
    const groupOffsetX = (Math.random() - 0.5) * 30;
    const groupOffsetY = (Math.random() - 0.5) * 30;
    rg.group.groupOffsetX = groupOffsetX;
    rg.group.groupOffsetY = groupOffsetY;

    area.innerHTML =
      '<div class="group-wrap">' +
        '<div class="group-target" id="groupTarget">' +
          '<svg viewBox="0 0 280 280" id="groupSvg">' +
            '<circle class="group-ring" cx="140" cy="140" r="130"/>' +
            '<circle class="group-ring" cx="140" cy="140" r="104"/>' +
            '<circle class="group-ring" cx="140" cy="140" r="78"/>' +
            '<circle class="group-ring" cx="140" cy="140" r="52"/>' +
            '<circle class="group-ring" cx="140" cy="140" r="26"/>' +
            '<circle class="group-bull" cx="140" cy="140" r="10"/>' +
            '<line class="group-cross" x1="140" y1="10" x2="140" y2="270"/>' +
            '<line class="group-cross" x1="10" y1="140" x2="270" y2="140"/>' +
          '</svg>' +
        '</div>' +
        '<div class="group-controls-row">' +
          '<button class="group-fire-btn" id="groupFireBtn" type="button">FIRE SHOT</button>' +
          '<div class="group-shot-counter">Shots: <span class="val" id="groupShotCount">0</span>/5</div>' +
        '</div>' +
        '<div class="group-diagnose-area" id="groupDiagnoseArea" style="display:none;">' +
          '<div class="group-diagnose-prompt">Diagnose the shot group pattern:</div>' +
          '<div class="group-pattern-btns">' +
            '<button class="group-pattern-btn" data-pattern="vertical" type="button">Vertical Stringing<br><small>Breathing fault</small></button>' +
            '<button class="group-pattern-btn" data-pattern="horizontal" type="button">Horizontal Spread<br><small>Trigger fault</small></button>' +
            '<button class="group-pattern-btn" data-pattern="scattered" type="button">Scattered Group<br><small>Position instability</small></button>' +
            '<button class="group-pattern-btn" data-pattern="tight" type="button">Tight Group<br><small>Consistent fundamentals</small></button>' +
          '</div>' +
        '</div>' +
        '<p class="group-instruction" id="groupInstruction">Fire <strong>5 shots</strong> one at a time. Then diagnose the group pattern and apply the correct sight correction.</p>' +
      '</div>';

    const fireBtn = document.getElementById("groupFireBtn");
    const shotCount = document.getElementById("groupShotCount");
    const diagnoseArea = document.getElementById("groupDiagnoseArea");
    const instruction = document.getElementById("groupInstruction");

    function generateShot() {
      const cx = 140 + rg.group.groupOffsetX;
      const cy = 140 + rg.group.groupOffsetY;
      let dx, dy;
      switch (rg.group.correctPattern) {
        case "vertical":
          dx = (Math.random() - 0.5) * 8;
          dy = (Math.random() - 0.5) * 50;
          break;
        case "horizontal":
          dx = (Math.random() - 0.5) * 50;
          dy = (Math.random() - 0.5) * 8;
          break;
        case "scattered":
          dx = (Math.random() - 0.5) * 55;
          dy = (Math.random() - 0.5) * 55;
          break;
        case "tight":
        default:
          dx = (Math.random() - 0.5) * 12;
          dy = (Math.random() - 0.5) * 12;
          break;
      }
      return { x: cx + dx, y: cy + dy };
    }

    function renderShots() {
      const svg = document.getElementById("groupSvg");
      if (!svg) return;
      // Remove old shot holes
      svg.querySelectorAll(".group-shot-hole, .group-center-mark").forEach(function (el) { el.remove(); });
      rg.group.shots.forEach(function (s, i) {
        const isTen = Math.abs(s.x - 140) < 20 && Math.abs(s.y - 140) < 20;
        const hole = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        hole.setAttribute("class", "group-shot-hole" + (isTen ? " ten" : ""));
        hole.setAttribute("cx", s.x);
        hole.setAttribute("cy", s.y);
        hole.setAttribute("r", 4);
        svg.appendChild(hole);
      });
      // Show group centre mark after all 5 shots
      if (rg.group.firedCount >= 5) {
        let avgX = 0, avgY = 0;
        rg.group.shots.forEach(function (s) { avgX += s.x; avgY += s.y; });
        avgX /= rg.group.shots.length;
        avgY /= rg.group.shots.length;
        const mark = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        mark.setAttribute("class", "group-center-mark");
        mark.setAttribute("cx", avgX);
        mark.setAttribute("cy", avgY);
        mark.setAttribute("r", 8);
        svg.appendChild(mark);
      }
    }

    fireBtn.addEventListener("click", function () {
      if (rg.group.firedCount >= 5 || rg.group.fired) return;
      const shot = generateShot();
      rg.group.shots.push(shot);
      rg.group.firedCount++;
      shotCount.textContent = rg.group.firedCount;
      fireBtn.classList.add("fired");
      renderShots();
      // Also add to target view
      const tvX = (shot.x / 280) * 200;
      const tvY = (shot.y / 280) * 200;
      rg.group.shots_targetView = rg.group.shots_targetView || [];
      rg.group.shots_targetView.push({ x: tvX, y: tvY });
      // Update target view with group shots
      const wrap = document.getElementById("rgTargetWrap");
      if (wrap && rg.group.shots_targetView) {
        let shotsSvg = "";
        rg.group.shots_targetView.forEach(function (s, i) {
          const latest = i === rg.group.shots_targetView.length - 1 ? " latest" : "";
          shotsSvg += '<circle class="rg-target-shot' + latest + '" cx="' + s.x + '" cy="' + s.y + '" r="3.5"/>';
        });
        const rings = '<circle class="rg-target-ring" cx="100" cy="100" r="90"/>' +
          '<circle class="rg-target-ring" cx="100" cy="100" r="72"/>' +
          '<circle class="rg-target-ring" cx="100" cy="100" r="54"/>' +
          '<circle class="rg-target-ring" cx="100" cy="100" r="36"/>' +
          '<circle class="rg-target-ring" cx="100" cy="100" r="18"/>' +
          '<circle class="rg-target-bull" cx="100" cy="100" r="8"/>';
        wrap.innerHTML = '<svg viewBox="0 0 200 200">' + rings + shotsSvg + '</svg>';
      }
      if (rg.group.firedCount >= 5) {
        fireBtn.disabled = true;
        fireBtn.textContent = "STRING COMPLETE";
        diagnoseArea.style.display = "flex";
        instruction.innerHTML = "Now <strong>diagnose the group pattern</strong> below. Select the pattern that matches your shot group.";
        rgSetFeedback("Five shots fired. <strong>Diagnose the group pattern</strong> \u2014 look at how the shots are distributed on the target.", "info");
      } else {
        rgSetFeedback("Shot " + rg.group.firedCount + "/5 fired. " + (5 - rg.group.firedCount) + " shots remaining.", "info");
      }
    });

    // Diagnosis buttons
    diagnoseArea.querySelectorAll(".group-pattern-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (rg.group.diagnosed) return;
        rg.group.diagnosed = true;
        const chosen = btn.dataset.pattern;
        const correct = chosen === rg.group.correctPattern;
        diagnoseArea.querySelectorAll(".group-pattern-btn").forEach(function (b) {
          b.disabled = true;
          if (b.dataset.pattern === rg.group.correctPattern) b.classList.add("correct");
          if (b === btn && !correct) b.classList.add("wrong");
        });
        if (correct) {
          let detail = "Correct diagnosis! ";
          switch (rg.group.correctPattern) {
            case "vertical": detail += "Vertical stringing \u2014 inconsistent breathing. Focus on the respiratory pause."; break;
            case "horizontal": detail += "Horizontal spread \u2014 trigger control fault. Smooth the squeeze."; break;
            case "scattered": detail += "Scattered group \u2014 position instability. Check your NPA and sling tension."; break;
            case "tight": detail += "Tight group \u2014 consistent fundamentals. Now zero the sights to centre the group."; break;
          }
          // Add the group shots to the main shots array for target view
          if (!rg.group.shots_targetView) {
            rg.group.shots_targetView = rg.group.shots.map(function (s) {
              return { x: (s.x / 280) * 200, y: (s.y / 280) * 200 };
            });
          }
          // Also update the main group.shots for target view
          rg.group.shots = rg.group.shots_targetView;
          rgRenderTargetView();
          rgHandleResult(true, 15, detail);
        } else {
          let detail = "Incorrect diagnosis. The actual pattern was: <strong>" + rg.group.correctPattern + "</strong>. ";
          switch (rg.group.correctPattern) {
            case "vertical": detail += "Shots spreading up/down indicate a breathing fault."; break;
            case "horizontal": detail += "Shots spreading left/right indicate a trigger control fault."; break;
            case "scattered": detail += "Shots in all directions indicate position instability."; break;
            case "tight": detail += "Shots clustered tightly indicate consistent fundamentals."; break;
          }
          rg.group.shots = rg.group.shots_targetView || rg.group.shots;
          rgRenderTargetView();
          rgHandleResult(false, 0, detail);
        }
      });
    });

    // No timer for group mode (it's a deliberate, analytical exercise)
    rgResetTimerDisplay();
    rgSetFeedback("Shot Grouping mode. Fire 5 shots, then diagnose the pattern. No time limit \u2014 focus on accuracy.", "info");
  }

  // ==========================================================
  // RENDER RANGE GAME (idle state)
  // ==========================================================
  function renderRangeGame() {
    rgLoadStats();
    rgUpdateStats();
    rgRenderTargetView();
    rgResetTimerDisplay();
    rgSetModeBadge(null);

    // Bind control buttons
    const startBtn = document.getElementById("rgStartBtn");
    const nextBtn = document.getElementById("rgNextBtn");
    const examBtn = document.getElementById("rgExamBtn");
    const resetBtn = document.getElementById("rgResetBtn");
    if (startBtn) startBtn.addEventListener("click", rgStartQualification);
    if (nextBtn) nextBtn.addEventListener("click", rgNextMode);
    if (examBtn) examBtn.addEventListener("click", rgStartExamMode);
    if (resetBtn) resetBtn.addEventListener("click", rgReset);
  }

  // ==========================================================
  // HELPER: showToast
  // ==========================================================
  let toastTimer = null;
  function showToast(text, icon) {
    const t = document.getElementById("toast");
    if (!t) return;
    const ico = document.getElementById("toastIco");
    const txt = document.getElementById("toastText");
    if (ico) ico.textContent = icon || "\u2705";
    if (txt) txt.textContent = text;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 3500);
  }

  // ==========================================================
  // HELPER: escapeHTML
  // ==========================================================
  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ==========================================================
  // SECTION SWITCHING
  // ==========================================================
  function switchSection(name) {
    document.querySelectorAll(".section").forEach(function (s) { s.classList.remove("active"); });
    const target = document.getElementById("section-" + name);
    if (target) target.classList.add("active");
    document.querySelectorAll(".nav-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.section === name);
    });
    if (name === "command") renderCommand();
    if (name === "training") renderTraining();
    if (name === "missions") { renderMissionSelector(); if (activeMissionId) openMissionRender(); }
    if (name === "analysis") renderAnalysis();
    if (name === "sitrep") renderSitrep();
    if (name === "ranks") renderRanks();
    if (name === "learn") renderLearn();
    if (name === "range") renderRangeGame();
    document.querySelector(".main").scrollTop = 0;
  }

  function openMissionRender() {
    const sel = document.getElementById("missionSelector");
    const con = document.getElementById("missionConsole");
    if (sel) sel.style.display = "none";
    if (con) con.style.display = "block";
    renderMissionConsole();
  }

  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(RG_MODES); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(patterns); } catch(e) {}
    try { trMutate(sliderValue); } catch(e) {}
    try { trMutate(toggleState); } catch(e) {}
  }



  // ==========================================================
  // INIT
  // ==========================================================
  function init() {
    // Nav buttons
    document.querySelectorAll(".nav-btn").forEach(function (b) {
      b.addEventListener("click", function () { switchSection(b.dataset.section); });
    });

    // Mobile menu
    const mb = document.getElementById("mobileMenuBtn");
    if (mb) mb.addEventListener("click", function () {
      document.getElementById("sidebar").classList.toggle("open");
    });

    // SITREP file button
    const fsb = document.getElementById("fileSitrepBtn");
    if (fsb) fsb.addEventListener("click", fileSitrep);

    // Deep-link: ?mission=id
    const params = new URLSearchParams(window.location.search);
    const deepMission = params.get("mission");

    loadState();
    rgLoadStats();
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
    renderRangeGame();

    if (deepMission) {
      const m = MISSIONS.find(function (x) { return x.id === deepMission; });
      if (m) setTimeout(function () { openMission(m.id); }, 200);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
