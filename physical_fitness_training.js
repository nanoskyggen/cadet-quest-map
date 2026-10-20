(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "physicalFitnessTrainingProgress",
    sitreps: "physicalFitnessTrainingSitreps",
    wrongAttempts: "physicalFitnessTrainingWrongAttempts",
    streak: "physicalFitnessTrainingStreak",
    bestStreak: "physicalFitnessTrainingBestStreak",
    readArticles: "physicalFitnessTrainingReadArticles",
    fgGame: "physicalFitnessTrainingFGGame"
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const PHYSICAL_FITNESS_BADGE_ID = 9;

  // ==========================================================
  // RANKS
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Fitness Recruit",     xp: 0,    icon: "⚡",    callsign: "ATHLETE-1" },
    { id: 1, name: "Fitness Cadet",       xp: 300,  icon: "🏃",   callsign: "ATHLETE-2" },
    { id: 2, name: "Endurance Cadet",     xp: 800,  icon: "💪",   callsign: "ATHLETE-3" },
    { id: 3, name: "Strength Cadet",      xp: 1400, icon: "🏆",   callsign: "ATHLETE-4" },
    { id: 4, name: "Fitness Specialist",  xp: 2000, icon: "⭐",   callsign: "ATHLETE-5" },
    { id: 5, name: "Master Athlete Cadet",xp: 2800, icon: "🏅",   callsign: "ATHLETE-6" }
  ];

  // ==========================================================
  // TOOLS
  // ==========================================================
  const TOOLS = [
    { id: "stopwatch",  icon: "⏱️",  label: "Stopwatch" },
    { id: "water",      icon: "💧",  label: "Water Bottle" },
    { id: "mat",        icon: "🧘",  label: "Exercise Mat" },
    { id: "cones",      icon: "🔶",  label: "Marker Cones" },
    { id: "whistle",    icon: "📣",  label: "Instructor Whistle" },
    { id: "rope",       icon: "🪢",  label: "Skipping Rope" },
    { id: "tape",       icon: "📏",  label: "Measure Tape" },
    { id: "firstkit",   icon: "🩹",  label: "First Aid Kit" },
    { id: "logbook",    icon: "📔",  label: "Training Log Book" },
    { id: "timer",      icon: "⏲️",  label: "Interval Timer" },
    { id: "snack",      icon: "🍌",  label: "Energy Snack" },
    { id: "towel",      icon: "🧖",  label: "Sweat Towel" },
    { id: "manual",     icon: "📖",  label: "Fitness Manual" }
  ];

  // ==========================================================
  // MISSIONS — 10 physical fitness training missions
  // ==========================================================
  const MISSIONS = [
    {
      id: "pf1", order: 1, tag: "WARM-UP", icon: "🔥",
      title: "The Safe Warm-Up",
      desc: "Master the four-stage warm-up: pulse-raiser, mobility, dynamic stretches, and sport-specific drills.",
      xp: 100,
      brief: "Your squad is about to start a fitness session. A proper warm-up prepares the body for exercise by raising the heart rate, mobilising joints, stretching muscles dynamically, and rehearsing the movements to come. Getting the sequence right reduces injury risk and improves performance. Run through the four stages in the correct order and explain why each one matters.",
      scene: "warmup",
      chapters: [
        { title: "Pulse-Raiser", desc: "Raise heart rate with light aerobic activity" },
        { title: "Mobility", desc: "Move joints through their full range" },
        { title: "Dynamic Stretches", desc: "Active stretches that mimic the session" },
        { title: "Sport-Specific Drills", desc: "Rehearse the movements you are about to do" }
      ],
      tasks: [
        { type: "select", label: "Stage 1 — What is the FIRST stage of a safe warm-up?",
          options: ["Static stretching while cold", "A gentle pulse-raiser like jogging or skipping", "Sprinting at full speed", "Lying down to rest"],
          correct: 1,
          tool: "whistle",
          explain: "The warm-up starts with a gentle pulse-raiser — light aerobic activity such as jogging, skipping, or star jumps. This gradually raises your heart rate and body temperature, pumping oxygen-rich blood to your muscles. Stretching cold muscles risks injury, so the pulse-raiser always comes first." },
        { type: "select", label: "Stage 2 — After raising your pulse, what should you do next?",
          options: ["Sit down and drink water", "Mobilise your joints through their full range of motion", "Start the main activity immediately", "Hold static stretches for 60 seconds each"],
          correct: 1,
          tool: "mat",
          explain: "After the pulse-raiser, mobilise your joints. Move each major joint — neck, shoulders, hips, knees, and ankles — through its full range of motion with controlled rotations and circles. This lubricates the joints, improves flexibility, and prepares them for the demands of exercise." },
        { type: "select", label: "Stage 3 — What type of stretching is best during a warm-up?",
          options: ["Static stretching (hold and hold still)", "Dynamic stretching (moving through the stretch)", "No stretching at all", "Partner-assisted forced stretching"],
          correct: 1,
          tool: "rope",
          explain: "Dynamic stretching is best during a warm-up. These are active, controlled movements that take your muscles through their range of motion — leg swings, arm circles, walking lunges, and high knees. Unlike static stretches (which are better for cool-down), dynamic stretches prepare muscles for movement without reducing power output." },
        { type: "select", label: "Stage 4 — What is the final stage of a warm-up?",
          options: ["Go straight to the changing room", "Sport-specific drills that rehearse the session's movements", "A long cold shower", "A heavy meal for energy"],
          correct: 1,
          tool: "cones",
          explain: "The final stage is sport-specific drills. These rehearse the actual movements you are about to perform — for cadets that might mean drill steps, marching practice, shuttle runs, or carrying technique. This primes the nervous system and muscles for the specific demands of the session, improving coordination and reducing injury risk." }
      ]
    },
    {
      id: "pf2", order: 2, tag: "COOL-DOWN", icon: "🧘",
      title: "The Recovery Cool-Down",
      desc: "Learn why a cool-down matters and how to bring your heart rate down safely with static stretches.",
      xp: 110,
      brief: "The session is over, but your work is not done. A proper cool-down gradually returns your heart rate to resting, clears waste products from your muscles, and prevents stiffness and soreness. It combines light aerobic activity to flush the system with static stretches held for 20–30 seconds each. Master the cool-down sequence and understand why skipping it slows your recovery.",
      scene: "cooldown",
      chapters: [
        { title: "Active Recovery", desc: "Light activity to gradually lower heart rate" },
        { title: "Static Stretches", desc: "Hold each stretch for 20–30 seconds" },
        { title: "Major Muscle Groups", desc: "Target calves, hamstrings, quads, hips, and shoulders" },
        { title: "Hydration & Refuel", desc: "Rehydrate and replace energy within 30 minutes" }
      ],
      tasks: [
        { type: "select", label: "Step 1 — Immediately after vigorous exercise, what should you do first in the cool-down?",
          options: ["Stop moving and sit down immediately", "Continue with light aerobic activity like slow walking or jogging", "Drink a large amount of water quickly", "Hold your breath to slow your heart"],
          correct: 1,
          tool: "whistle",
          explain: "Never stop dead after vigorous exercise — continue with light aerobic activity such as slow walking or gentle jogging. This keeps blood flowing and helps your body clear lactic acid and other waste products. Stopping suddenly can cause blood to pool in your legs, leading to dizziness or fainting." },
        { type: "select", label: "Step 2 — What type of stretching belongs in a cool-down?",
          options: ["Dynamic stretching only", "Static stretching — holding each position still", "No stretching is needed in a cool-down", "Bouncing stretches to push further"],
          correct: 1,
          tool: "mat",
          explain: "Static stretching belongs in the cool-down. After exercise, your muscles are warm and pliable, making it the safest time to hold stretches. Hold each stretch still for 20–30 seconds without bouncing. This improves flexibility, reduces muscle tension, and helps prevent the stiffness that comes after hard training." },
        { type: "select", label: "Step 3 — How long should you hold each static stretch during a cool-down?",
          options: ["2–3 seconds", "20–30 seconds", "At least 5 minutes", "Until it hurts sharply"],
          correct: 1,
          explain: "Hold each static stretch for 20–30 seconds. This gives the muscle time to relax and lengthen. You should feel a gentle pull, never sharp pain. Breathe slowly and steadily throughout. Stretching the major muscle groups — calves, hamstrings, quadriceps, hips, chest, and shoulders — gives the best recovery benefit." },
        { type: "select", label: "Step 4 — Within how long after exercise should you rehydrate and refuel for best recovery?",
          options: ["Within 30 minutes", "Only the next day", "Within 12 hours", "It does not matter when"],
          correct: 1,
          tool: "water",
          explain: "Aim to rehydrate and refuel within 30 minutes of finishing exercise. Your body is most efficient at replenishing glycogen (stored energy) and repairing muscle during this window. Drink water to replace lost fluids and eat a snack combining carbohydrate and protein — a banana, a sandwich, or a yoghurt — to kick-start recovery." }
      ]
    },
    {
      id: "pf3", order: 3, tag: "PACING", icon: "🏃",
      title: "Endurance Pacing",
      desc: "Learn to pace a distance run so you can sustain effort without burning out early.",
      xp: 120,
      brief: "You are tasked with completing a timed distance run. The biggest mistake new cadets make is starting too fast and burning out before the finish. Pacing means controlling your speed so you can maintain a steady effort for the whole distance. Learn to read your body, find your sustainable rhythm, and adjust your pace to finish strong rather than collapsing halfway.",
      scene: "pace",
      chapters: [
        { title: "Start Steady", desc: "Begin at a controlled, sustainable pace" },
        { title: "Find Your Rhythm", desc: "Settle into a breathing and stride pattern" },
        { title: "Monitor Effort", desc: "Check that you are not going too hard too early" },
        { title: "Finish Strong", desc: "Maintain or increase pace in the final stretch" }
      ],
      tasks: [
        { type: "select", label: "Stage 1 — At the start of a distance run, how should you set off?",
          options: ["Sprint as fast as you can to get ahead", "Start at a steady, controlled pace you can sustain", "Walk for the first half then sprint", "Follow whoever is in front regardless of your own pace"],
          correct: 1,
          tool: "stopwatch",
          explain: "Start at a steady, controlled pace you can sustain for the whole distance. Sprinting at the start burns through your energy reserves and floods your muscles with lactic acid, leaving you exhausted long before the finish. A controlled start lets your body settle into an efficient rhythm and saves energy for the closing stages." },
        { type: "select", label: "Stage 2 — What does 'finding your rhythm' mean during a run?",
          options: ["Running to music at maximum volume", "Settling into a consistent breathing and stride pattern", "Stopping every minute to check your phone", "Changing pace randomly to confuse rivals"],
          correct: 1,
          explain: "Finding your rhythm means settling into a consistent pattern of breathing and stride length. When your footfalls and breaths fall into a regular cycle, running becomes more efficient and feels easier. A common pattern is breathing in for two strides and out for two. This rhythm helps you maintain pace without constantly thinking about effort." },
        { type: "select", label: "Stage 3 — During the middle of a run, how can you tell if you are pacing correctly?",
          options: ["You cannot speak at all and are gasping", "You can speak in short phrases and feel challenged but in control", "You feel completely fresh with no effort at all", "Your vision is going blurry"],
          correct: 1,
          tool: "logbook",
          explain: "The 'talk test' is a simple way to judge pacing. If you can speak in short phrases, you are working at a sustainable endurance pace. If you cannot speak at all and are gasping, you are going too hard and will not last. If you feel completely fresh, you could go a little faster. Aim for challenged but in control." },
        { type: "select", label: "Stage 4 — In the final stretch of a paced run, what is the best strategy?",
          options: ["Slow right down to make sure you finish", "Maintain your pace and push harder if you have energy left", "Stop and walk the last 100 metres", "Sit down and wait for help"],
          correct: 1,
          explain: "In the final stretch, maintain your pace and push harder if you have energy in reserve. Because you paced sensibly, you should still have fuel left to finish strong. A controlled negative split — running the second half faster than the first — is a sign of excellent pacing. Give it everything in the last 50 metres." }
      ]
    },
    {
      id: "pf4", order: 4, tag: "HYDRATION", icon: "💧",
      title: "Hydration Management",
      desc: "Understand why water is essential and how to stay hydrated before, during, and after exercise.",
      xp: 110,
      brief: "Even mild dehydration — losing just 2% of your body water — reduces performance, causes fatigue, and impairs concentration. As a cadet in training, you must know when and how much to drink. This mission covers pre-exercise hydration, drinking during activity, recognising the signs of dehydration, and rehydrating afterwards. Get this right and your performance and safety both improve.",
      scene: "hydration",
      chapters: [
        { title: "Before Exercise", desc: "Drink water in the hours leading up to activity" },
        { title: "During Exercise", desc: "Sip regularly, especially in heat" },
        { title: "Recognise Dehydration", desc: "Know the warning signs" },
        { title: "After Exercise", desc: "Replace lost fluids fully" }
      ],
      tasks: [
        { type: "select", label: "Step 1 — How should you hydrate BEFORE exercise?",
          options: ["Drink nothing — you will drink during", "Drink water steadily in the hours before and a small amount 20 minutes before starting", "Drink a huge amount of water right before starting", "Only drink caffeinated energy drinks"],
          correct: 1,
          tool: "water",
          explain: "Hydration starts before exercise. Drink water steadily throughout the day and a small glass about 20 minutes before you start. This ensures your body begins the session properly hydrated. Drinking a huge amount all at once right before exercise can cause discomfort and sloshing — spread your intake out instead." },
        { type: "select", label: "Step 2 — During exercise, how often should you drink?",
          options: ["Only when you feel extremely thirsty", "Sip small amounts regularly, about every 15–20 minutes", "Drink a full litre every 5 minutes", "Avoid drinking entirely to build toughness"],
          correct: 1,
          explain: "During exercise, sip small amounts of water regularly — about every 15–20 minutes. Thirst is a late indicator of dehydration, so do not wait until you feel thirsty to drink. In hot weather or during long sessions you need more. Regular small sips keep your fluid levels topped up without causing stomach discomfort." },
        { type: "select", label: "Step 3 — Which of these is a sign of dehydration?",
          options: ["Clear, pale urine and feeling energetic", "Dark yellow urine, headache, dizziness, and dry mouth", "Sweating heavily with cool skin", "Feeling cold and shivering"],
          correct: 1,
          explain: "Signs of dehydration include dark yellow urine (a key early warning), headache, dizziness, dry mouth, fatigue, and poor concentration. The easiest check is urine colour — pale and clear means well hydrated, dark yellow means dehydrated. If you notice these signs, stop, drink water, rest in shade, and do not resume hard activity until you feel better." },
        { type: "select", label: "Step 4 — After exercise, how should you rehydrate?",
          options: ["Drink water gradually until urine is pale again", "Drink nothing — your body resets on its own", "Drink only sugary fizzy drinks", "Drink as much water as possible as fast as possible"],
          correct: 1,
          tool: "water",
          explain: "After exercise, rehydrate gradually with water until your urine returns to a pale colour. Weighing yourself before and after can tell you how much fluid you lost — each kilogram lost equals roughly a litre to replace. Drinking too much too fast can cause discomfort and, in extreme cases, water intoxication. Spread your rehydration over the hours following exercise." }
      ]
    },
    {
      id: "pf5", order: 5, tag: "NUTRITION", icon: "🍌",
      title: "Fuel for Performance",
      desc: "Learn how diet and nutrition affect fitness — what to eat before, during, and after training.",
      xp: 120,
      brief: "Your body is an engine, and food is its fuel. What and when you eat directly affects your energy, endurance, strength, and recovery. This mission covers the role of carbohydrates for energy, protein for muscle repair, healthy fats, and the timing of meals around training. Understand nutrition basics and you will train harder, recover faster, and perform better on the fitness course.",
      scene: "nutrition",
      chapters: [
        { title: "Carbohydrates", desc: "The body's main fuel for exercise" },
        { title: "Protein", desc: "Builds and repairs muscle" },
        { title: "Meal Timing", desc: "When to eat before and after training" },
        { title: "Balanced Diet", desc: "Variety for long-term health and performance" }
      ],
      tasks: [
        { type: "select", label: "Topic 1 — What is the body's main source of energy during exercise?",
          options: ["Carbohydrates", "Pure sugar sweets only", "Fizzy drinks", "Vitamins alone"],
          correct: 1,
          tool: "snack",
          explain: "Carbohydrates are the body's main fuel for exercise. They are broken down into glucose, which your muscles store as glycogen and burn for energy. Good sources include wholegrain bread, pasta, rice, oats, potatoes, and fruit. Without enough carbohydrate, you will feel sluggish and run out of energy quickly — often called 'hitting the wall.'" },
        { type: "select", label: "Topic 2 — What is the main role of protein in a fitness diet?",
          options: ["To give instant energy during exercise", "To build and repair muscle tissue", "To replace water", "To make you sweat less"],
          correct: 1,
          explain: "Protein builds and repairs muscle tissue. When you exercise, tiny tears form in your muscle fibres; protein supplies the amino acids needed to rebuild them stronger. Good sources include lean meat, fish, eggs, dairy, beans, lentils, and nuts. Eating protein after training supports recovery and helps you gain strength over time." },
        { type: "select", label: "Topic 3 — When is the best time to eat a main meal before exercise?",
          options: ["Immediately before starting", "2–3 hours before, with a small snack 30 minutes before if needed", "The day after exercise", "Only after exercise is finished"],
          correct: 1,
          explain: "Eat a main meal 2–3 hours before exercise so it has time to digest and provide steady energy. If you train sooner, a light snack like a banana or toast 30 minutes before can top up your energy. Eating a heavy meal right before exercise can cause cramps, sluggishness, and stomach discomfort as blood is diverted to digestion." },
        { type: "select", label: "Topic 4 — What does a balanced, healthy diet for an active cadet include?",
          options: ["Only protein and no other food groups", "A variety of carbohydrates, protein, healthy fats, fruit, and vegetables", "Only fast food for quick energy", "As many sweets and fizzy drinks as possible"],
          correct: 1,
          explain: "A balanced diet includes a variety of carbohydrates for energy, protein for muscle, healthy fats for sustained energy and cell function, plus plenty of fruit and vegetables for vitamins, minerals, and fibre. No single food gives you everything. Eating a colourful variety supports long-term health, strong immunity, and consistent fitness performance." }
      ]
    },
    {
      id: "pf6", order: 6, tag: "STRENGTH", icon: "💪",
      title: "Strength Fundamentals",
      desc: "Learn safe bodyweight strength exercises and the importance of proper form over speed.",
      xp: 130,
      brief: "Strength training builds the muscle power cadets need for carrying kit, climbing, and physical tasks. You do not need a gym — bodyweight exercises like press-ups, squats, lunges, and planks build real functional strength. The golden rule is form before speed: a slow, controlled press-up with proper technique builds more strength and causes fewer injuries than ten fast, sloppy ones. Master the fundamentals safely.",
      scene: "strength",
      chapters: [
        { title: "Press-Ups", desc: "Upper body pushing strength" },
        { title: "Squats", desc: "Lower body and core power" },
        { title: "Plank Hold", desc: "Core stability and endurance" },
        { title: "Form First", desc: "Technique beats speed every time" }
      ],
      tasks: [
        { type: "select", label: "Exercise 1 — For a correct press-up, how should your body be positioned?",
          options: ["Hips sagging low with back arched", "A straight line from head to heels, hands under shoulders", "Knees on the ground and back curved", "Head down and bottom high in the air"],
          correct: 1,
          tool: "mat",
          explain: "A correct press-up keeps a straight line from your head to your heels — no sagging hips, no raised bottom. Place your hands directly under your shoulders, slightly wider than chest width. Lower until your chest nearly touches the floor, then push back up. Keeping the body straight engages your core and protects your lower back from strain." },
        { type: "select", label: "Exercise 2 — When performing a squat, how deep should you go and where should your knees point?",
          options: ["As deep as possible with knees caving inward", "Thighs parallel to the ground, knees tracking over the toes", "Only a tiny dip with knees together", "Knees pointing outward as far as they can"],
          correct: 1,
          explain: "In a proper squat, lower until your thighs are roughly parallel to the ground (or as deep as your mobility allows comfortably). Keep your knees tracking in line with your toes — do not let them cave inward. Push your hips back as if sitting into a chair, keep your chest up, and drive through your heels to stand. This protects the knees and builds strong legs." },
        { type: "select", label: "Exercise 3 — What is the correct position for a plank hold?",
          options: ["Resting on your hands with hips high", "On forearms and toes, body in a straight line, core tight", "Lying flat on your stomach relaxing", "On one knee with the other leg up"],
          correct: 1,
          explain: "A plank is held on your forearms and toes with your body forming a straight line from head to heels. Engage your core by drawing your belly button toward your spine. Do not let your hips sag or pike up. Keep your neck neutral, looking at the floor. The plank builds deep core stability, which supports every other movement and protects your back." },
        { type: "select", label: "Principle 4 — Which is more important in strength training: form or speed?",
          options: ["Speed — do them as fast as possible", "Form — correct technique always comes first", "Neither matters", "Only the number of repetitions counts"],
          correct: 1,
          tool: "logbook",
          explain: "Form always comes before speed. A slow, controlled repetition with perfect technique builds more strength and prevents injury. Sloppy, fast reps use momentum instead of muscle and often strain joints. Quality over quantity: it is better to do five perfect press-ups than fifteen poor ones. Master the movement slowly first, then build speed and reps over time." }
      ]
    },
    {
      id: "pf7", order: 7, tag: "FLEXIBILITY", icon: "🤸",
      title: "Flexibility & Mobility",
      desc: "Understand the difference between flexibility and mobility and why both matter for fitness.",
      xp: 110,
      brief: "Flexibility and mobility are often confused but they are different. Flexibility is the ability of a muscle to lengthen; mobility is the ability of a joint to move actively through its full range. Both are essential — flexible, mobile joints move freely, reduce injury risk, and improve performance in every activity. This mission covers the key stretches, mobility drills, and how to improve range of motion safely over time.",
      scene: "flexibility",
      chapters: [
        { title: "Flexibility vs Mobility", desc: "Understand the difference" },
        { title: "Major Stretches", desc: "Calves, hamstrings, hips, shoulders" },
        { title: "Mobility Drills", desc: "Active joint movement exercises" },
        { title: "Safe Progress", desc: "Improve range gradually over time" }
      ],
      tasks: [
        { type: "select", label: "Concept 1 — What is the difference between flexibility and mobility?",
          options: ["They are exactly the same thing", "Flexibility is a muscle's ability to lengthen; mobility is a joint's ability to move actively through its range", "Flexibility is about running speed", "Mobility means lifting heavy weights"],
          correct: 1,
          explain: "Flexibility is passive — the ability of a muscle to stretch and lengthen, like touching your toes. Mobility is active — the ability of a joint to move through its full range under your own control, like circling your arms or deep squatting. You need both: flexible muscles allow length, mobile joints allow movement. Together they let you move freely and safely." },
        { type: "select", label: "Concept 2 — Which muscle group is often tight in cadets who sit a lot and should be stretched regularly?",
          options: ["The hamstrings and hip flexors", "The eyelids", "The fingers only", "The ear muscles"],
          correct: 1,
          tool: "mat",
          explain: "The hamstrings (back of the thigh) and hip flexors (front of the hip) are often tight in people who sit for long periods. Tight hamstrings limit running stride and can cause lower back pain; tight hip flexors tilt the pelvis and weaken the glutes. Stretching these regularly — with toe touches, lunges, and kneeling hip stretches — improves posture, movement, and comfort." },
        { type: "select", label: "Concept 3 — What is a mobility drill?",
          options: ["Holding a stretch completely still for ten minutes", "An active movement that takes a joint through its full range, like arm circles or leg swings", "Lifting the heaviest weight possible", "Sitting still and not moving at all"],
          correct: 1,
          explain: "A mobility drill is an active movement that takes a joint through its full range of motion — arm circles, leg swings, hip rotations, cat-cow spinal waves, and ankle circles. Unlike static stretching, mobility drills move the joint under your control, training the nervous system and improving active range. They are ideal in warm-ups and as daily maintenance for healthy joints." },
        { type: "select", label: "Concept 4 — How should you safely improve your flexibility over time?",
          options: ["Force stretches past the point of pain daily", "Stretch gently and consistently, progressing slowly over weeks and months", "Stretch once a year very hard", "Have someone push you into painful positions"],
          correct: 1,
          explain: "Improve flexibility gently and consistently. Stretch regularly — daily or several times a week — and progress slowly over weeks and months. You should feel a mild pull, never sharp pain. Bouncing or forcing a stretch causes the muscle to tighten protectively and risks tearing. Patience pays off: small, frequent gains add up to lasting, safe improvements in range of motion." }
      ]
    },
    {
      id: "pf8", order: 8, tag: "GOAL-SETTING", icon: "🎯",
      title: "Setting Fitness Goals",
      desc: "Learn to set SMART fitness goals and track your progress toward them.",
      xp: 120,
      brief: "A goal without a plan is just a wish. Setting clear, achievable fitness goals gives your training direction and motivation. The SMART framework — Specific, Measurable, Achievable, Relevant, Time-bound — turns vague hopes into concrete targets. This mission teaches you to set your own fitness goal, break it into steps, track your progress in a log book, and celebrate milestones along the way.",
      scene: "goals",
      chapters: [
        { title: "Be Specific", desc: "Define exactly what you want to achieve" },
        { title: "Make It Measurable", desc: "Use numbers to track progress" },
        { title: "Keep It Achievable", desc: "Set a realistic but challenging target" },
        { title: "Set a Timeframe", desc: "Give yourself a deadline" }
      ],
      tasks: [
        { type: "select", label: "Letter S — In a SMART goal, what does 'Specific' mean?",
          options: ["A vague hope like 'get fitter'", "A clear, exact target like 'run 1.5 km in under 10 minutes'", "Any goal at all", "A goal that changes every day"],
          correct: 1,
          tool: "logbook",
          explain: "'Specific' means your goal is clear and exact. 'Get fitter' is vague and hard to act on. 'Run 1.5 km in under 10 minutes' is specific — you know exactly what you are aiming for. A specific goal tells you what to do in training each session and gives you a clear pass or fail at the end. The more precise, the better." },
        { type: "select", label: "Letter M — What makes a goal 'Measurable'?",
          options: ["It has no way to check progress", "It uses numbers or clear markers so you can track progress", "It is based on feelings only", "It cannot be written down"],
          correct: 1,
          explain: "'Measurable' means the goal has numbers or clear markers you can track. 'Run faster' cannot be measured, but 'improve my 1.5 km time by 30 seconds' can. Recording your times, reps, or distances in a log book lets you see progress and stay motivated. If you cannot measure it, you cannot tell whether you are improving." },
        { type: "select", label: "Letter A — Why should a goal be 'Achievable'?",
          options: ["So you can set an impossible target and always fail", "So it is realistic given your current level but still challenging", "So it requires no effort at all", "So someone else does it for you"],
          correct: 1,
          explain: "'Achievable' means the goal is realistic for your current fitness level but still challenging enough to motivate you. Setting an impossible target leads to disappointment and giving up; setting one too easy leads to boredom. Find the sweet spot: a goal that stretches you but is within reach with consistent effort. Build up in stages — each small win builds toward the big one." },
        { type: "select", label: "Letter T — What does the 'Time-bound' part of a SMART goal add?",
          options: ["A deadline that creates focus and urgency", "A reason to never start", "An excuse to delay forever", "A requirement to train only at night"],
          correct: 1,
          explain: "'Time-bound' means the goal has a deadline, which creates focus and urgency. 'Run 1.5 km in under 10 minutes by the end of term' is far more powerful than the same goal with no timeframe. A deadline turns an open-ended wish into a commitment and helps you plan your training schedule. Set a realistic date and work backward to plan your weekly sessions." }
      ]
    },
    {
      id: "pf9", order: 9, tag: "RECOVERY", icon: "😴",
      title: "Rest & Recovery",
      desc: "Understand why rest days, sleep, and active recovery are essential parts of training.",
      xp: 110,
      brief: "Training breaks your body down; recovery builds it back stronger. Many cadets think more is always better, but without rest you plateau, get injured, and burn out. This mission covers the role of rest days, the critical importance of sleep for muscle repair and concentration, and active recovery like walking or easy stretching. Learn that recovery is not laziness — it is where the gains actually happen.",
      scene: "recovery",
      chapters: [
        { title: "Rest Days", desc: "Take scheduled days off to repair" },
        { title: "Sleep", desc: "8–10 hours for growth and repair" },
        { title: "Active Recovery", desc: "Light activity to aid recovery" },
        { title: "Overtraining", desc: "Spot the signs of doing too much" }
      ],
      tasks: [
        { type: "select", label: "Principle 1 — Why are rest days an essential part of a training program?",
          options: ["They are not — you should train hard every day", "They give your body time to repair and rebuild stronger", "They are only for lazy people", "They make you lose all your fitness"],
          correct: 1,
          explain: "Rest days are when your body repairs and rebuilds. Exercise creates microscopic tears in muscle fibres and depletes energy stores; rest allows the body to heal those tears and adapt, coming back stronger. Without rest, you accumulate fatigue, increase injury risk, and stop improving. Schedule at least one or two rest days per week — they are part of training, not a break from it." },
        { type: "select", label: "Principle 2 — How much sleep does a young, active cadet need each night for best recovery?",
          options: ["3–4 hours", "8–10 hours", "No sleep is needed if you train hard", "1 hour is plenty"],
          correct: 1,
          explain: "Young, active cadets need 8–10 hours of sleep each night. During deep sleep, the body releases growth hormone that repairs muscle, restores energy, and strengthens the immune system. Sleep also consolidates learning and improves concentration and reaction time. Poor sleep wrecks performance and recovery. Make sleep a training priority — it is as important as the workout itself." },
        { type: "select", label: "Principle 3 — What is 'active recovery'?",
          options: ["Training at maximum intensity every day", "Light, low-impact activity like walking, easy cycling, or gentle stretching on rest days", "Complete bed rest all day", "Competing in another sport at full effort"],
          correct: 1,
          tool: "towel",
          explain: "Active recovery is light, low-impact activity done on a rest day — a walk, easy cycle, gentle swim, or relaxed stretching. It increases blood flow to muscles, helping clear waste products and deliver nutrients without adding training stress. Active recovery often leaves you feeling better than total rest. It keeps you moving while still letting your body recover from harder sessions." },
        { type: "select", label: "Principle 4 — Which of these is a sign of overtraining?",
          options: ["Feeling energetic and motivated", "Persistent fatigue, poor sleep, declining performance, and frequent minor injuries", "Setting a new personal best", "Sleeping deeply and recovering quickly"],
          correct: 1,
          explain: "Signs of overtraining include persistent fatigue, poor sleep, declining performance despite training hard, lingering muscle soreness, irritability, and frequent minor injuries or illnesses. Your body is telling you it cannot keep up. The fix is more rest, not more training. If you spot these signs, take several rest days, ease back on intensity, prioritise sleep and nutrition, and build back gradually." }
      ]
    },
    {
      id: "pf10", order: 10, tag: "TEAMWORK", icon: "🤝",
      title: "Fitness Through Teamwork",
      desc: "Discover how training with others boosts motivation, safety, and performance.",
      xp: 130,
      brief: "Fitness is not just an individual effort — as a cadet you train, compete, and recover as a team. Training partners boost motivation, spot unsafe technique, push you to keep going, and make hard sessions enjoyable. Team challenges build camaraderie and accountability. This final mission covers how to support your squad during fitness activities, lead by example, and understand why teamwork makes everyone fitter, safer, and stronger together.",
      scene: "teamwork",
      chapters: [
        { title: "Mutual Motivation", desc: "Push and encourage each other" },
        { title: "Safety & Spotting", desc: "Watch out for each other's form and wellbeing" },
        { title: "Team Challenges", desc: "Relays and group goals build camaraderie" },
        { title: "Lead by Example", desc: "Set the standard for effort and attitude" }
      ],
      tasks: [
        { type: "select", label: "Benefit 1 — How does training with a partner or team help motivation?",
          options: ["It makes no difference at all", "Encouragement and accountability keep you going when you would otherwise quit", "It always makes you train less hard", "It only helps if your partner is worse than you"],
          correct: 1,
          tool: "whistle",
          explain: "Training with others boosts motivation through encouragement and accountability. When a session gets tough, a teammate's encouragement keeps you going; knowing others are counting on you makes you less likely to skip training. You push harder alongside peers than alone. This is why cadet fitness is built around squads — the group lifts each individual beyond what they could do by themselves." },
        { type: "select", label: "Benefit 2 — How does teamwork improve safety during fitness training?",
          options: ["It does not — safety is purely individual", "Partners can spot poor form, watch for signs of distress, and call for help if someone is struggling", "Teams always train more dangerously", "Only the instructor is responsible for safety"],
          correct: 1,
          tool: "firstkit",
          explain: "Teammates improve safety by spotting poor technique, watching for signs of overexertion or dehydration, and calling for help quickly if someone struggles or is injured. A training partner notices a sagging back on a press-up or a wobbly squat before it causes harm. In relays and group activities, the squad looks out for every member. Safety is a shared responsibility, not just the instructor's job." },
        { type: "select", label: "Benefit 3 — What do team fitness challenges like relays and group goals build?",
          options: ["Selfishness and isolation", "Camaraderie, communication, and a sense of shared achievement", "Individual egos only", "A reason to avoid training"],
          correct: 1,
          explain: "Team fitness challenges — relays, group distance goals, circuit competitions — build camaraderie, communication, and shared achievement. Everyone contributes to the team result, so each member's effort matters. You learn to communicate clearly, support weaker members, and celebrate together. These bonds carry into every other cadet activity, making the unit stronger and more cohesive in everything it does." },
        { type: "select", label: "Benefit 4 — What does it mean to 'lead by example' in team fitness?",
          options: ["Shouting at others to work harder while doing nothing yourself", "Showing effort, good attitude, and proper form so others follow your standard", "Winning every event regardless of others", "Training alone and ignoring the team"],
          correct: 1,
          tool: "logbook",
          explain: "Leading by example means showing the effort, attitude, and technique you want to see in others. When you give full effort, encourage teammates, and maintain good form, others follow your standard. Leadership in fitness is not about being the fastest or strongest — it is about setting the tone. A cadet who never quits and always supports the squad inspires everyone to raise their game." }
      ]
    }
  ];

  // ==========================================================
  // LEARN ARTICLES — Fitness knowledge base
  // ==========================================================
  const LEARN_ARTICLES = [
    { id: "art1",  cat: "Warm-Up",      icon: "🔥", title: "The Four-Stage Warm-Up",                desc: "Pulse-raiser, mobility, dynamic stretches, and sport-specific drills — why each stage matters.", xp: 12 },
    { id: "art2",  cat: "Warm-Up",      icon: "🏃", title: "Dynamic vs Static Stretching",           desc: "Why dynamic stretching belongs in warm-ups and static stretching belongs in cool-downs.", xp: 12 },
    { id: "art3",  cat: "Warm-Up",      icon: "❤️", title: "Raising Your Heart Rate Safely",         desc: "How a gentle pulse-raiser prepares your cardiovascular system for exercise.", xp: 10 },
    { id: "art4",  cat: "Warm-Up",      icon: "🦵", title: "Joint Mobility Exercises",               desc: "Move each major joint through its full range to lubricate and prepare for activity.", xp: 11 },
    { id: "art5",  cat: "Cool-Down",    icon: "🧘", title: "The Recovery Cool-Down",                 desc: "Why a gradual cool-down with static stretches prevents stiffness and aids recovery.", xp: 12 },
    { id: "art6",  cat: "Cool-Down",    icon: "⏳", title: "Holding Stretches: 20–30 Seconds",      desc: "The science behind how long to hold a static stretch for maximum benefit.", xp: 11 },
    { id: "art7",  cat: "Cool-Down",    icon: "🚶", title: "Active Recovery Explained",              desc: "Why light walking after exercise is better than stopping dead.", xp: 10 },
    { id: "art8",  cat: "Pacing",       icon: "🏃", title: "The Art of Pacing a Run",               desc: "Start steady, find your rhythm, and finish strong — the keys to endurance.", xp: 13 },
    { id: "art9",  cat: "Pacing",       icon: "🗣️", title: "The Talk Test for Pacing",              desc: "A simple way to check whether you are running at a sustainable endurance pace.", xp: 11 },
    { id: "art10", cat: "Pacing",       icon: "⏱️", title: "Negative Splits Explained",              desc: "Running the second half faster than the first — a sign of excellent pacing.", xp: 12 },
    { id: "art11", cat: "Pacing",       icon: "🌬️", title: "Breathing Patterns for Running",        desc: "How rhythmic breathing in for two strides, out for two, improves efficiency.", xp: 11 },
    { id: "art12", cat: "Hydration",    icon: "💧", title: "Why Hydration Matters",                  desc: "How even mild dehydration reduces performance and causes fatigue.", xp: 12 },
    { id: "art13", cat: "Hydration",    icon: "🚨", title: "Recognising Dehydration",                desc: "The warning signs — dark urine, headache, dizziness — and what to do.", xp: 12 },
    { id: "art14", cat: "Hydration",    icon: "🥤", title: "How Much Water to Drink",                desc: "Guidelines for hydrating before, during, and after exercise.", xp: 11 },
    { id: "art15", cat: "Hydration",    icon: "☀️", title: "Training in Hot Weather",                desc: "Extra hydration and safety precautions when exercising in heat.", xp: 13 },
    { id: "art16", cat: "Nutrition",    icon: "🍞", title: "Carbohydrates: Your Fuel",               desc: "Why carbs are the body's main energy source for exercise.", xp: 12 },
    { id: "art17", cat: "Nutrition",    icon: "🥩", title: "Protein for Muscle Repair",              desc: "How protein rebuilds the muscle tears caused by training.", xp: 12 },
    { id: "art18", cat: "Nutrition",    icon: "⏰", title: "Meal Timing Around Training",            desc: "When to eat meals and snacks for best energy and recovery.", xp: 13 },
    { id: "art19", cat: "Nutrition",    icon: "🥗", title: "Building a Balanced Diet",               desc: "Variety across food groups for long-term health and performance.", xp: 12 },
    { id: "art20", cat: "Strength",     icon: "💪", title: "Bodyweight Strength Basics",             desc: "Press-ups, squats, lunges, and planks — no equipment needed.", xp: 13 },
    { id: "art21", cat: "Strength",     icon: "📐", title: "Form Before Speed",                      desc: "Why perfect technique builds more strength than fast sloppy reps.", xp: 12 },
    { id: "art22", cat: "Strength",     icon: "📊", title: "Progressive Overload",                   desc: "How gradually increasing difficulty drives strength gains over time.", xp: 13 },
    { id: "art23", cat: "Flexibility",  icon: "🤸", title: "Flexibility vs Mobility",                 desc: "The difference between a muscle's length and a joint's active range.", xp: 11 },
    { id: "art24", cat: "Flexibility",  icon: "🦵", title: "Tight Hamstrings & Hip Flexors",        desc: "Why sitting makes these muscles tight and how to stretch them.", xp: 12 },
    { id: "art25", cat: "Goals",        icon: "🎯", title: "Setting SMART Fitness Goals",             desc: "Specific, Measurable, Achievable, Relevant, Time-bound targets that work.", xp: 13 },
    { id: "art26", cat: "Goals",        icon: "📔", title: "Tracking Progress in a Log Book",         desc: "Why recording your workouts keeps you motivated and on track.", xp: 11 },
    { id: "art27", cat: "Recovery",     icon: "😴", title: "The Power of Sleep",                     desc: "Why 8–10 hours of sleep is when your body actually rebuilds.", xp: 12 },
    { id: "art28", cat: "Recovery",     icon: "⚠️", title: "Spotting Overtraining",                   desc: "The warning signs you are doing too much and need more rest.", xp: 13 }
  ];

  // ==========================================================
  // BADGES (auto-generated from missions)
  // ==========================================================
  const FITNESS_BADGES = MISSIONS.map(function (m) {
    return { id: m.id, missionId: m.id, icon: m.icon, title: m.title, desc: "Completed " + m.tag + " — " + m.title, xp: m.xp };
  });

  // ==========================================================
  // STATE MANAGEMENT
  // ==========================================================
  let activeMissionId = null;
  let activeTaskIndex = 0;

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
      currentMissionTask: null
    };
  }

  let state = defaultState();

  function loadState() {
    try {
      const raw = localStorage.getItem(SK.progress);
      if (raw) {
        const loaded = JSON.parse(raw);
        state = Object.assign(defaultState(), loaded);
      }
    } catch (e) {
      state = defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(SK.progress, JSON.stringify(state));
    } catch (e) {}
  }

  function syncMapProgress() {
    try {
      let completed = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || "[]");
      if (state.completedMissions.length >= MISSIONS.length && completed.indexOf(PHYSICAL_FITNESS_BADGE_ID) === -1) {
        completed.push(PHYSICAL_FITNESS_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(completed));
      }
    } catch (e) {}
  }

  function currentRank() {
    let r = RANKS[0];
    for (var i = 0; i < RANKS.length; i++) {
      if (state.xp >= RANKS[i].xp) r = RANKS[i];
    }
    return r;
  }

  function nextRank() {
    for (var i = 0; i < RANKS.length; i++) {
      if (state.xp < RANKS[i].xp) return RANKS[i];
    }
    return null;
  }

  function rankProgressPct() {
    var cr = currentRank();
    var nr = nextRank();
    if (!nr) return 100;
    return Math.min(100, Math.round(((state.xp - cr.xp) / (nr.xp - cr.xp)) * 100));
  }

  function addXP(amount) {
    state.xp += amount;
    saveState();
  }

  function recordAttempt(correct) {
    state.totalAttempts++;
    if (!correct) {
      state.wrongAttempts++;
      state.streak = 0;
    } else {
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    }
    try {
      localStorage.setItem(SK.streak, String(state.streak));
      localStorage.setItem(SK.bestStreak, String(state.bestStreak));
      localStorage.setItem(SK.wrongAttempts, String(state.wrongAttempts));
    } catch (e) {}
  }

  // ==========================================================
  // RENDER: Scene visuals (SVG per mission)
  // ==========================================================
  function renderScene(sceneType) {
    var scenes = {
      warmup: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1f140a"/>' +
        '<ellipse cx="300" cy="140" rx="200" ry="20" fill="rgba(240,138,36,0.10)"/>' +
        '<g transform="translate(220,40)">' +
          '<circle cx="30" cy="18" r="18" fill="#f5c84c" stroke="#c99a2e" stroke-width="1"/>' +
          '<rect x="18" y="36" width="24" height="55" rx="8" fill="#f08a24" opacity="0.8"/>' +
          '<rect x="14" y="36" width="8" height="30" rx="3" fill="#f08a24" opacity="0.6"/>' +
          '<rect x="38" y="36" width="8" height="30" rx="3" fill="#f08a24" opacity="0.6"/>' +
          '<rect x="18" y="91" width="10" height="35" rx="3" fill="#2a1a1a"/>' +
          '<rect x="32" y="91" width="10" height="35" rx="3" fill="#2a1a1a"/>' +
        '</g>' +
        '<g transform="translate(380,55)">' +
          '<circle cx="20" cy="20" r="16" fill="#ff5a3c" opacity="0.7"/>' +
          '<path d="M 20 8 Q 14 20 20 32 Q 26 20 20 8 Z" fill="#ffd24c" opacity="0.8"/>' +
          '<text x="20" y="48" text-anchor="middle" font-size="9" fill="#f5c84c" font-family="monospace">PULSE</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#8a6a3a" font-family="monospace">SCENE: SQUAD WARM-UP — FOUR STAGES</text>' +
      '</svg>',
      cooldown: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1f140a"/>' +
        '<ellipse cx="300" cy="160" rx="200" ry="15" fill="rgba(56,217,123,0.08)"/>' +
        '<g transform="translate(250,50)">' +
          '<circle cx="30" cy="18" r="18" fill="#f5c84c" stroke="#c99a2e" stroke-width="1"/>' +
          '<rect x="18" y="36" width="24" height="55" rx="8" fill="#38d97b" opacity="0.7"/>' +
          '<rect x="10" y="40" width="10" height="30" rx="4" fill="#38d97b" opacity="0.5" transform="rotate(-20,15,55)"/>' +
          '<rect x="40" y="40" width="10" height="30" rx="4" fill="#38d97b" opacity="0.5" transform="rotate(20,45,55)"/>' +
        '</g>' +
        '<g transform="translate(380,45)">' +
          '<path d="M 5 30 Q 5 5 30 5 Q 55 5 55 30" stroke="#38d97b" stroke-width="2" fill="none"/>' +
          '<circle cx="30" cy="40" r="4" fill="#38d97b"/>' +
          '<text x="30" y="58" text-anchor="middle" font-size="8" fill="#38d97b" font-family="monospace">STRETCH</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#8a6a3a" font-family="monospace">SCENE: POST-SESSION COOL-DOWN</text>' +
      '</svg>',
      pace: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1f140a"/>' +
        '<ellipse cx="300" cy="150" rx="220" ry="14" fill="rgba(240,138,36,0.08)"/>' +
        '<g transform="translate(220,35)">' +
          '<circle cx="30" cy="18" r="16" fill="#f5c84c" stroke="#c99a2e" stroke-width="1"/>' +
          '<rect x="20" y="34" width="20" height="50" rx="8" fill="#f08a24" opacity="0.8"/>' +
          '<rect x="14" y="38" width="8" height="30" rx="3" fill="#f08a24" opacity="0.6" transform="rotate(-30,18,53)"/>' +
          '<rect x="38" y="38" width="8" height="30" rx="3" fill="#f08a24" opacity="0.6" transform="rotate(30,42,53)"/>' +
          '<rect x="18" y="84" width="9" height="30" rx="3" fill="#2a1a1a" transform="rotate(-20,22,99)"/>' +
          '<rect x="33" y="84" width="9" height="30" rx="3" fill="#2a1a1a" transform="rotate(25,37,99)"/>' +
        '</g>' +
        '<g transform="translate(360,60)">' +
          '<rect x="0" y="0" width="70" height="40" rx="6" fill="#2a1a1a" stroke="#f08a24" stroke-width="1.5"/>' +
          '<text x="35" y="18" text-anchor="middle" font-size="12" fill="#f5c84c" font-family="monospace" font-weight="bold">12:30</text>' +
          '<text x="35" y="32" text-anchor="middle" font-size="8" fill="#8a6a3a" font-family="monospace">PACE/KM</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#8a6a3a" font-family="monospace">SCENE: ENDURANCE RUN — STEADY PACING</text>' +
      '</svg>',
      hydration: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1f140a"/>' +
        '<ellipse cx="300" cy="160" rx="200" ry="15" fill="rgba(74,159,212,0.08)"/>' +
        '<g transform="translate(230,35)">' +
          '<circle cx="30" cy="18" r="16" fill="#f5c84c" stroke="#c99a2e" stroke-width="1"/>' +
          '<rect x="20" y="34" width="20" height="55" rx="8" fill="#f08a24" opacity="0.8"/>' +
        '</g>' +
        '<g transform="translate(370,30)">' +
          '<rect x="10" y="0" width="36" height="60" rx="10" fill="#4a9fd4" opacity="0.7"/>' +
          '<rect x="14" y="20" width="28" height="36" rx="6" fill="#7cc4ec" opacity="0.8"/>' +
          '<rect x="18" y="-4" width="20" height="8" rx="3" fill="#2a6a9a"/>' +
          '<text x="28" y="78" text-anchor="middle" font-size="8" fill="#4a9fd4" font-family="monospace">HYDRATE</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#8a6a3a" font-family="monospace">SCENE: HYDRATION STATION — BEFORE/DURING/AFTER</text>' +
      '</svg>',
      nutrition: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1f140a"/>' +
        '<ellipse cx="300" cy="160" rx="200" ry="15" fill="rgba(240,138,36,0.08)"/>' +
        '<g transform="translate(200,40)">' +
          '<rect x="0" y="0" width="70" height="50" rx="8" fill="#f5c84c" opacity="0.7"/>' +
          '<circle cx="20" cy="20" r="8" fill="#f08a24"/>' +
          '<circle cx="45" cy="30" r="6" fill="#ff5a3c"/>' +
          '<text x="35" y="70" text-anchor="middle" font-size="8" fill="#f5c84c" font-family="monospace">PLATE</text>' +
        '</g>' +
        '<g transform="translate(320,35)">' +
          '<path d="M 5 50 Q 10 15 20 25 Q 30 5 40 50 Z" fill="#ffd24c" stroke="#c99a2e" stroke-width="1"/>' +
          '<text x="22" y="68" text-anchor="middle" font-size="8" fill="#f5c84c" font-family="monospace">FUEL</text>' +
        '</g>' +
        '<g transform="translate(420,40)">' +
          '<rect x="0" y="10" width="30" height="20" rx="4" fill="#d4a868" opacity="0.8"/>' +
          '<rect x="5" y="32" width="20" height="14" rx="3" fill="#d4a868" opacity="0.7"/>' +
          '<text x="15" y="62" text-anchor="middle" font-size="8" fill="#d4a868" font-family="monospace">PROTEIN</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#8a6a3a" font-family="monospace">SCENE: FUEL FOR PERFORMANCE — NUTRITION</text>' +
      '</svg>',
      strength: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1f140a"/>' +
        '<ellipse cx="300" cy="150" rx="200" ry="14" fill="rgba(240,138,36,0.08)"/>' +
        '<g transform="translate(240,30)">' +
          '<circle cx="30" cy="16" r="16" fill="#f5c84c" stroke="#c99a2e" stroke-width="1"/>' +
          '<rect x="10" y="32" width="40" height="14" rx="5" fill="#f08a24" opacity="0.8"/>' +
          '<rect x="20" y="46" width="20" height="40" rx="6" fill="#f08a24" opacity="0.7"/>' +
          '<rect x="12" y="86" width="10" height="30" rx="3" fill="#2a1a1a"/>' +
          '<rect x="38" y="86" width="10" height="30" rx="3" fill="#2a1a1a"/>' +
        '</g>' +
        '<g transform="translate(380,50)">' +
          '<rect x="0" y="0" width="14" height="50" rx="4" fill="#c99a2e"/>' +
          '<rect x="18" y="20" width="40" height="10" rx="3" fill="#8a6a3a"/>' +
          '<rect x="62" y="0" width="14" height="50" rx="4" fill="#c99a2e"/>' +
          '<text x="38" y="68" text-anchor="middle" font-size="8" fill="#f5c84c" font-family="monospace">STRENGTH</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#8a6a3a" font-family="monospace">SCENE: BODYWEIGHT STRENGTH — FORM FIRST</text>' +
      '</svg>',
      flexibility: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1f140a"/>' +
        '<ellipse cx="300" cy="150" rx="200" ry="14" fill="rgba(56,217,123,0.08)"/>' +
        '<g transform="translate(210,55)">' +
          '<circle cx="20" cy="14" r="14" fill="#f5c84c" stroke="#c99a2e" stroke-width="1"/>' +
          '<rect x="14" y="28" width="12" height="45" rx="6" fill="#f08a24" opacity="0.8" transform="rotate(-25,20,50)"/>' +
          '<rect x="20" y="28" width="60" height="12" rx="6" fill="#f08a24" opacity="0.7"/>' +
          '<rect x="70" y="40" width="12" height="35" rx="5" fill="#f08a24" opacity="0.6"/>' +
        '</g>' +
        '<g transform="translate(400,40)">' +
          '<circle cx="30" cy="30" r="22" fill="none" stroke="#38d97b" stroke-width="2" opacity="0.6"/>' +
          '<path d="M 12 30 A 18 18 0 0 1 48 30" stroke="#38d97b" stroke-width="3" fill="none"/>' +
          '<text x="30" y="62" text-anchor="middle" font-size="8" fill="#38d97b" font-family="monospace">RANGE</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#8a6a3a" font-family="monospace">SCENE: FLEXIBILITY & MOBILITY WORK</text>' +
      '</svg>',
      goals: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1f140a"/>' +
        '<ellipse cx="300" cy="160" rx="200" ry="15" fill="rgba(240,138,36,0.08)"/>' +
        '<g transform="translate(250,30)">' +
          '<circle cx="40" cy="60" r="34" fill="none" stroke="#f08a24" stroke-width="2"/>' +
          '<circle cx="40" cy="60" r="22" fill="none" stroke="#f5c84c" stroke-width="2"/>' +
          '<circle cx="40" cy="60" r="10" fill="none" stroke="#ffd24c" stroke-width="2"/>' +
          '<circle cx="40" cy="60" r="3" fill="#ff5a3c"/>' +
        '</g>' +
        '<g transform="translate(360,55)">' +
          '<text x="0" y="0" font-size="22" fill="#f5c84c" font-weight="bold">S</text>' +
          '<text x="18" y="0" font-size="22" fill="#f08a24" font-weight="bold">M</text>' +
          '<text x="36" y="0" font-size="22" fill="#ffd24c" font-weight="bold">A</text>' +
          '<text x="54" y="0" font-size="22" fill="#f5c84c" font-weight="bold">R</text>' +
          '<text x="72" y="0" font-size="22" fill="#f08a24" font-weight="bold">T</text>' +
          '<text x="0" y="22" font-size="9" fill="#8a6a3a" font-family="monospace">GOAL FRAMEWORK</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#8a6a3a" font-family="monospace">SCENE: SETTING SMART FITNESS GOALS</text>' +
      '</svg>',
      recovery: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1f140a"/>' +
        '<ellipse cx="300" cy="150" rx="200" ry="14" fill="rgba(56,217,123,0.08)"/>' +
        '<g transform="translate(220,50)">' +
          '<circle cx="30" cy="16" r="16" fill="#f5c84c" stroke="#c99a2e" stroke-width="1"/>' +
          '<path d="M 24 12 Q 30 8 36 12" stroke="#8a6a3a" stroke-width="1.5" fill="none"/>' +
          '<rect x="18" y="34" width="24" height="14" rx="6" fill="#38d97b" opacity="0.6"/>' +
          '<rect x="14" y="48" width="32" height="14" rx="6" fill="#38d97b" opacity="0.5"/>' +
          '<rect x="18" y="62" width="24" height="14" rx="6" fill="#38d97b" opacity="0.4"/>' +
        '</g>' +
        '<g transform="translate(380,45)">' +
          '<path d="M 25 5 Q 15 15 25 25 Q 35 35 25 45" stroke="#38d97b" stroke-width="2" fill="none"/>' +
          '<circle cx="25" cy="5" r="3" fill="#38d97b"/>' +
          '<circle cx="25" cy="45" r="3" fill="#38d97b"/>' +
          '<text x="25" y="62" text-anchor="middle" font-size="8" fill="#38d97b" font-family="monospace">REST</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#8a6a3a" font-family="monospace">SCENE: REST & RECOVERY — SLEEP, REST, ACTIVE</text>' +
      '</svg>',
      teamwork: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1f140a"/>' +
        '<ellipse cx="300" cy="150" rx="220" ry="14" fill="rgba(240,138,36,0.10)"/>' +
        '<g transform="translate(180,50)">' +
          '<circle cx="20" cy="14" r="14" fill="#f5c84c" stroke="#c99a2e" stroke-width="1"/>' +
          '<rect x="12" y="28" width="16" height="45" rx="6" fill="#f08a24" opacity="0.8"/>' +
        '</g>' +
        '<g transform="translate(280,45)">' +
          '<circle cx="20" cy="14" r="14" fill="#ffd24c" stroke="#c99a2e" stroke-width="1"/>' +
          '<rect x="12" y="28" width="16" height="45" rx="6" fill="#f5c84c" opacity="0.8"/>' +
        '</g>' +
        '<g transform="translate(380,50)">' +
          '<circle cx="20" cy="14" r="14" fill="#f5c84c" stroke="#c99a2e" stroke-width="1"/>' +
          '<rect x="12" y="28" width="16" height="45" rx="6" fill="#f08a24" opacity="0.8"/>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#8a6a3a" font-family="monospace">SCENE: SQUAD FITNESS — TEAMWORK</text>' +
      '</svg>'
    };
    return scenes[sceneType] || scenes.warmup;
  }

  // ==========================================================
  // RENDER: Badges, Sidebar, Top Stats, Command
  // ==========================================================
  function refreshBadges() {
    state.badges = MISSIONS.filter(function (m) {
      return state.completedMissions.indexOf(m.id) !== -1;
    }).map(function (m) {
      return { id: m.id, icon: m.icon, title: m.title, xp: m.xp };
    });
  }

  function renderSidebar() {
    const cr = currentRank();
    const pilotRank = document.getElementById("pilotRank");
    const pilotCallsign = document.getElementById("pilotCallsign");
    const xpFill = document.getElementById("xpFill");
    const xpText = document.getElementById("xpText");
    if (pilotRank) pilotRank.textContent = cr.name;
    if (pilotCallsign) pilotCallsign.textContent = "CALLSIGN: " + cr.callsign;
    if (xpFill) xpFill.style.width = rankProgressPct() + "%";
    const nr = nextRank();
    if (xpText) xpText.textContent = state.xp + " / " + (nr ? nr.xp : state.xp) + " XP";
  }

  function renderTopStats() {
    const topRank = document.getElementById("topRank");
    if (topRank) topRank.textContent = currentRank().name;
    const topXP = document.getElementById("topXP");
    if (topXP) topXP.textContent = state.xp;
    const topBadges = document.getElementById("topBadges");
    if (topBadges) topBadges.textContent = state.badges.length;
  }

  function renderCommand() {
    const set = function (id, v) { const el = document.getElementById(id); if (el) el.textContent = v; };
    set("cmdMissionsDone", state.completedMissions.length);
    set("cmdMissionsTotal", "of " + MISSIONS.length);
    set("cmdXP", state.xp);
    const nr = nextRank();
    set("cmdXPNext", nr ? "+" + (nr.xp - state.xp) + " to next rank" : "MAX RANK");
    set("cmdSitreps", state.sitreps.length);
    set("cmdBadges", state.badges.length);
    set("cmdBadgeTotal", "of " + MISSIONS.length);

    // Chapter list
    const chapterList = document.getElementById("chapterList");
    if (chapterList) {
      chapterList.innerHTML = MISSIONS.map(function (m) {
        const done = state.completedMissions.indexOf(m.id) !== -1;
        const prog = state.missionProgress[m.id] || 0;
        const total = m.tasks.length;
        const isActive = activeMissionId === m.id;
        const isLocked = m.order > 1 && !isPrevMissionDone(m);
        const cls = done ? "done" : isActive ? "active" : isLocked ? "locked" : "";
        return '<div class="chapter-row ' + cls + '" data-mission="' + m.id + '">' +
          '<span class="n">' + m.order + '</span>' +
          '<div class="cr-body"><div class="cr-title">' + escapeHTML(m.title) + '</div><div class="cr-desc">' + escapeHTML(m.desc) + '</div></div>' +
          '<span class="cr-prog">' + (done ? "COMPLETE" : prog + "/" + total) + '</span>' +
        '</div>';
      }).join("");
      chapterList.querySelectorAll(".chapter-row").forEach(function (row) {
        row.addEventListener("click", function () {
          if (row.classList.contains("locked")) return;
          openMission(row.dataset.mission);
          switchSection("missions");
        });
      });
    }

    // Readiness fill based on progress
    const threatFill = document.getElementById("threatFill");
    if (threatFill) {
      const pct = Math.min(90, 30 + (state.completedMissions.length / MISSIONS.length) * 60);
      threatFill.style.width = pct + "%";
    }
  }

  function isPrevMissionDone(m) {
    if (m.order <= 1) return true;
    const prev = MISSIONS.find(function (x) { return x.order === m.order - 1; });
    return prev && state.completedMissions.indexOf(prev.id) !== -1;
  }

  // ==========================================================
  // RENDER: Training grid
  // ==========================================================
  function renderTraining() {
    const grid = document.getElementById("trainingGrid");
    if (!grid) return;
    grid.innerHTML = MISSIONS.map(function (m) {
      const done = state.completedMissions.indexOf(m.id) !== -1;
      const prog = state.missionProgress[m.id] || 0;
      const total = m.tasks.length;
      const pct = Math.round((prog / total) * 100);
      const isLocked = m.order > 1 && !isPrevMissionDone(m);
      const cls = done ? "done" : isLocked ? "locked" : prog > 0 ? "active" : "";
      return '<div class="mission-card ' + cls + '" data-mission="' + m.id + '">' +
        '<div class="mc-top"><div class="mc-ico">' + m.icon + '</div><div><div class="mc-tag">' + m.tag + ' · ' + m.order + '</div><div class="mc-title">' + escapeHTML(m.title) + '</div></div></div>' +
        '<div class="mc-desc">' + escapeHTML(m.desc) + '</div>' +
        '<div class="mc-prog-bar"><div class="mc-prog-fill" style="width:' + (done ? 100 : pct) + '%"></div></div>' +
        '<div class="mc-foot"><span class="mc-xp">+' + m.xp + ' XP</span><span class="mc-status ' + (done ? "done" : isLocked ? "locked" : "active") + '">' + (done ? "COMPLETE" : isLocked ? "LOCKED" : prog > 0 ? prog + "/" + total : "START") + '</span></div>' +
      '</div>';
    }).join("");
    grid.querySelectorAll(".mission-card").forEach(function (card) {
      card.addEventListener("click", function () {
        if (card.classList.contains("locked")) return;
        openMission(card.dataset.mission);
        switchSection("missions");
      });
    });
  }

  // ==========================================================
  // RENDER: Mission selector
  // ==========================================================
  function renderMissionSelector() {
    const sel = document.getElementById("missionSelector");
    if (!sel) return;
    sel.innerHTML = MISSIONS.map(function (m) {
      const done = state.completedMissions.indexOf(m.id) !== -1;
      const isLocked = m.order > 1 && !isPrevMissionDone(m);
      const cls = done ? "done" : isLocked ? "locked" : activeMissionId === m.id ? "active" : "";
      return '<div class="mission-card ' + cls + '" data-mission="' + m.id + '">' +
        '<div class="mc-top"><div class="mc-ico">' + m.icon + '</div><div><div class="mc-tag">' + m.tag + '</div><div class="mc-title">' + escapeHTML(m.title) + '</div></div></div>' +
        '<div class="mc-desc">' + escapeHTML(m.desc) + '</div>' +
        '<div class="mc-foot"><span class="mc-xp">+' + m.xp + ' XP</span><span class="mc-status ' + (done ? "done" : isLocked ? "locked" : "active") + '">' + (done ? "COMPLETE" : isLocked ? "LOCKED" : "BRIEF") + '</span></div>' +
      '</div>';
    }).join("");
    sel.querySelectorAll(".mission-card").forEach(function (card) {
      card.addEventListener("click", function () {
        if (card.classList.contains("locked")) return;
        openMission(card.dataset.mission);
      });
    });
  }

  // ==========================================================
  // Open mission + render console
  // ==========================================================
  function openMission(missionId) {
    const m = MISSIONS.find(function (x) { return x.id === missionId; });
    if (!m) return;
    activeMissionId = missionId;
    activeTaskIndex = state.missionProgress[missionId] || 0;
    if (activeTaskIndex >= m.tasks.length) activeTaskIndex = 0;
    const sel = document.getElementById("missionSelector");
    const con = document.getElementById("missionConsole");
    const headerTitle = document.getElementById("missionHeaderTitle");
    const headerSub = document.getElementById("missionHeaderSub");
    if (sel) sel.style.display = "none";
    if (con) con.style.display = "block";
    if (headerTitle) headerTitle.textContent = m.title;
    if (headerSub) headerSub.textContent = m.tag + " — " + m.desc;
    renderMissionConsole();
    renderMissionSelector();
  }

  function renderMissionConsole() {
    const m = MISSIONS.find(function (x) { return x.id === activeMissionId; });
    if (!m) return;
    const con = document.getElementById("missionConsole");
    if (!con) return;
    const done = state.completedMissions.indexOf(m.id) !== -1;
    const prog = state.missionProgress[m.id] || 0;

    var html = '<div class="task-console">' +
      '<div class="task-header">' +
        '<div class="th-left">' +
          '<div class="th-ico">' + m.icon + '</div>' +
          '<div><div class="th-title">' + escapeHTML(m.title) + '</div><div class="th-sub">' + m.tag + ' · +' + m.xp + ' XP on completion</div></div>' +
        '</div>' +
        '<div class="th-right">' +
          '<span class="task-stage-pill">TASK ' + (activeTaskIndex + 1) + '/' + m.tasks.length + '</span>' +
          '<button class="task-exit-btn" id="exitMissionBtn" type="button">← Back to Missions</button>' +
        '</div>' +
      '</div>' +
      '<div class="task-body">' +
        '<div class="scene-visual">' + renderScene(m.scene) +
          '<div class="scene-overlay">' + m.tag + ' SCENARIO</div>' +
        '</div>' +
        '<div class="task-brief">' + escapeHTML(m.brief) + '</div>' +
        '<div class="task-step-label"><span class="step-num">STEP ' + (activeTaskIndex + 1) + '</span><span class="step-title">Task ' + (activeTaskIndex + 1) + ' of ' + m.tasks.length + '</span></div>' +
        '<div class="task-instructions" id="taskInstructions"></div>' +
        '<div id="taskControlArea"></div>' +
        '<div class="task-feedback" id="taskFeedback"></div>' +
        '<div class="task-actions" id="taskActions"></div>' +
        '<div class="checklist" id="taskChecklist"></div>' +
      '</div>' +
    '</div>';

    if (done) {
      html += '<div class="card complete-card">' +
        '<div class="cc-ico">' + m.icon + '</div>' +
        '<div class="cc-title">Mission Complete!</div>' +
        '<div class="cc-sub">You have completed all tasks for ' + escapeHTML(m.title) + '. File a SITREP to log your training experience, or try the Fitness Circuit Simulator.</div>' +
        '<div class="cc-stats"><div class="cc-stat"><div class="v">+' + m.xp + '</div><div class="l">XP EARNED</div></div><div class="cc-stat"><div class="v">' + m.tasks.length + '</div><div class="l">TASKS DONE</div></div></div>' +
        '<div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;"><button class="btn btn-primary" id="ccFileSitrepBtn">📝 File SITREP</button><button class="btn btn-ghost" id="retryMissionBtn">↻ Retry Mission</button><button class="btn btn-gold" id="goSimulatorBtn">🏃 Try Simulator</button></div>' +
      '</div>';
    }

    con.innerHTML = html;

    const exitBtn = document.getElementById("exitMissionBtn");
    if (exitBtn) exitBtn.addEventListener("click", function () {
      activeMissionId = null;
      const sel2 = document.getElementById("missionSelector");
      if (sel2) sel2.style.display = "grid";
      con.style.display = "none";
      const ht = document.getElementById("missionHeaderTitle");
      const hs = document.getElementById("missionHeaderSub");
      if (ht) ht.textContent = "Select a Mission";
      if (hs) hs.textContent = "Choose a training module from the Training tab, or pick a mission below to enter the simulator.";
      renderMissionSelector();
    });

    if (done) {
      const retryBtn = document.getElementById("retryMissionBtn");
      if (retryBtn) retryBtn.addEventListener("click", function () {
        state.missionProgress[m.id] = 0;
        activeTaskIndex = 0;
        saveState();
        renderMissionConsole();
      });
      const goSim = document.getElementById("goSimulatorBtn");
      if (goSim) goSim.addEventListener("click", function () { switchSection("simulator"); });
      const ccFile = document.getElementById("ccFileSitrepBtn");
      if (ccFile) ccFile.addEventListener("click", function () { switchSection("sitrep"); });
      return;
    }

    renderTaskControl(m, m.tasks[activeTaskIndex]);
    renderTaskChecklist(m);
  }

  function renderTaskControl(m, task) {
    const instr = document.getElementById("taskInstructions");
    const area = document.getElementById("taskControlArea");
    const actions = document.getElementById("taskActions");
    if (!instr || !area) return;

    instr.innerHTML = task.label;

    if (task.type === "select") {
      const opts = shuffleArray(task.options.map(function (opt, i) {
        return { text: opt, originalIndex: i };
      }));
      area.innerHTML = '<div class="task-control">' + opts.map(function (o, i) {
        return '<button class="task-opt-btn" data-opt-idx="' + o.originalIndex + '" type="button">' + escapeHTML(o.text) + '</button>';
      }).join("") + '</div>';
      area.querySelectorAll("button[data-opt-idx]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const chosen = parseInt(btn.dataset.optIdx, 10);
          handleTaskAnswer(m, task, chosen, btn, area);
        });
      });
    } else if (task.type === "note") {
      area.innerHTML = '<div class="task-control"><textarea class="task-note" id="taskNoteInput" placeholder="Type your response here..."></textarea></div>';
      actions.innerHTML = '<button class="btn btn-primary" id="submitTaskBtn" type="button">✓ Submit Answer</button>';
      const submitBtn = document.getElementById("submitTaskBtn");
      if (submitBtn) submitBtn.addEventListener("click", function () {
        const ta = document.getElementById("taskNoteInput");
        const text = ta ? ta.value.trim() : "";
        handleNoteAnswer(m, task, text, ta);
      });
    }
  }

  function handleTaskAnswer(m, task, chosen, btn, area) {
    const fb = document.getElementById("taskFeedback");
    const correct = chosen === task.correct;
    if (correct) {
      if (fb) { fb.className = "task-feedback ok show"; fb.textContent = "✅ Correct! " + task.explain; }
      recordAttempt(true);
      area.querySelectorAll("button[data-opt-idx]").forEach(function (b) { b.disabled = true; });
      btn.classList.add("done");
      addXP(10);
      saveState();
      renderSidebar(); renderTopStats();
      setTimeout(function () { completeTask(m); }, 1800);
    } else {
      if (fb) { fb.className = "task-feedback err show"; fb.textContent = "❌ Not quite. " + (task.explain || "Try again."); }
      recordAttempt(false);
      btn.classList.add("wrong");
      saveState();
      renderTopStats(); renderAnalysis();
      setTimeout(function () {
        if (fb) { fb.className = "task-feedback info show"; fb.textContent = "💡 Review the explanation above, then try a different answer."; }
        btn.classList.remove("wrong");
      }, 2500);
    }
  }

  function handleNoteAnswer(m, task, text, ta) {
    const fb = document.getElementById("taskFeedback");
    if (text.length < 10) {
      if (fb) { fb.className = "task-feedback err show"; fb.textContent = "❌ Please write at least 10 characters."; }
      return;
    }
    const keywords = task.keywords || [];
    const lower = text.toLowerCase();
    const found = keywords.filter(function (k) { return lower.indexOf(k.toLowerCase()) !== -1; });
    const passed = found.length >= Math.ceil(keywords.length * 0.5);
    if (passed) {
      if (fb) { fb.className = "task-feedback ok show"; fb.textContent = "✅ Good response! " + (task.explain || "Key concepts identified."); }
      recordAttempt(true);
      addXP(10);
      saveState();
      renderSidebar(); renderTopStats();
      setTimeout(function () { completeTask(m); }, 1800);
    } else {
      if (fb) { fb.className = "task-feedback err show"; fb.textContent = "❌ Try to include key terms: " + keywords.join(", ") + ". " + (task.explain || ""); }
      recordAttempt(false);
      saveState();
      renderTopStats(); renderAnalysis();
    }
  }

  function completeTask(m) {
    const prog = (state.missionProgress[m.id] || 0) + 1;
    state.missionProgress[m.id] = prog;
    activeTaskIndex = prog;
    if (prog >= m.tasks.length) {
      if (state.completedMissions.indexOf(m.id) === -1) {
        state.completedMissions.push(m.id);
        addXP(m.xp);
        showToast("Mission Complete! +" + m.xp + " XP", m.icon);
        refreshBadges();
        syncMapProgress();
        renderSidebar(); renderTopStats(); renderCommand();
      }
    }
    saveState();
    renderTraining(); renderMissionSelector();
    renderMissionConsole();
  }

  function renderTaskChecklist(m) {
    const cl = document.getElementById("taskChecklist");
    if (!cl) return;
    const prog = state.missionProgress[m.id] || 0;
    cl.innerHTML = m.tasks.map(function (t, i) {
      const done = i < prog;
      return '<div class="check-item ' + (done ? "done" : "") + '"><div class="ci-box"></div>' + escapeHTML(t.label.substring(0, 60)) + (t.label.length > 60 ? "..." : "") + '</div>';
    }).join("");
  }

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // ==========================================================
  // RENDER: Analysis
  // ==========================================================
  function renderAnalysis() {
    const cr = currentRank();
    const ringXP = document.getElementById("ringXP");
    if (ringXP) ringXP.textContent = state.xp;
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
      const maxXP = Math.max.apply(null, MISSIONS.map(function (m) { return m.xp; }));
      xpBarChart.innerHTML = MISSIONS.map(function (m) {
        const done = state.completedMissions.indexOf(m.id) !== -1;
        const h = (m.xp / maxXP) * 100;
        return '<div class="bar-col' + (done ? " done" : "") + '">' +
          '<div class="bar-fill" style="height:' + (done ? h : 0) + '%"></div>' +
          '<div class="bar-label">' + m.order + '</div>' +
        '</div>';
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
  // RENDER: Ranks
  // ==========================================================
  function renderRanks() {
    const rankList = document.getElementById("rankList");
    if (!rankList) return;
    const cr = currentRank();
    rankList.innerHTML = RANKS.map(function (r) {
      const isCurrent = r.id === cr.id;
      const isPast = r.id < cr.id;
      return '<div class="rank-row' + (isCurrent ? " current" : "") + (isPast ? " past" : "") + '">' +
        '<span class="rank-ico">' + r.icon + '</span>' +
        '<div class="rank-info"><div class="rank-name">' + r.name + '</div><div class="rank-callsign">CALLSIGN: ' + r.callsign + '</div></div>' +
        '<div class="rank-xp">' + r.xp + ' XP</div>' +
        '<div class="rank-status ' + (isPast ? "past" : isCurrent ? "current" : "locked") + '">' + (isPast ? "EARNED" : isCurrent ? "CURRENT" : "LOCKED") + '</div>' +
      '</div>';
    }).join("");
  }

  // ==========================================================
  // RENDER: SITREP
  // ==========================================================
  function renderSitrep() {
    const sitrepMission = document.getElementById("sitrepMission");
    if (sitrepMission) {
      const completed = MISSIONS.filter(function (m) { return state.completedMissions.indexOf(m.id) !== -1; });
      sitrepMission.innerHTML = '<option value="">Select a completed mission…</option>' +
        completed.map(function (m) { return '<option value="' + m.id + '">' + m.tag + ' — ' + escapeHTML(m.title) + '</option>'; }).join("");
    }
    const sitrepLog = document.getElementById("sitrepLog");
    if (sitrepLog) {
      if (state.sitreps.length === 0) {
        sitrepLog.innerHTML = '<p class="muted center" style="padding:20px;">No SITREPs filed yet. Complete a mission and file your first report.</p>';
      } else {
        sitrepLog.innerHTML = state.sitreps.slice().reverse().map(function (s) {
          const m = MISSIONS.find(function (x) { return x.id === s.mission; });
          const statusClass = s.status === "NOMINAL" ? "ok" : s.status === "ABORTED" ? "err" : "warn";
          return '<div class="sitrep-entry">' +
            '<div class="sitrep-entry-head">' +
              '<span class="sitrep-status ' + statusClass + '">' + s.status + '</span>' +
              '<span class="sitrep-mission">' + (m ? m.tag : s.mission) + '</span>' +
              '<span class="sitrep-date">' + s.date + '</span>' +
            '</div>' +
            '<p class="sitrep-summary">' + escapeHTML(s.summary) + '</p>' +
          '</div>';
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
    if (!mission) { fb.className = "task-feedback err show"; fb.textContent = "❌ Select a completed mission."; return; }
    if (!status) { fb.className = "task-feedback err show"; fb.textContent = "❌ Choose an overall status."; return; }
    if (summary.length < 20) { fb.className = "task-feedback err show"; fb.textContent = "❌ Summary must be at least 20 characters."; return; }
    state.sitreps.push({ mission: mission, status: status, summary: summary, date: new Date().toLocaleDateString() });
    saveState();
    missionSel.value = "";
    statusSel.value = "";
    summaryTa.value = "";
    fb.className = "task-feedback ok show";
    fb.textContent = "✅ SITREP filed successfully.";
    renderSitrep();
    renderCommand();
    renderTopStats();
    showToast("SITREP Filed", "📝");
  }

  // ==========================================================
  // RENDER: Learn
  // ==========================================================
  function renderLearn() {
    const grid = document.getElementById("learnGrid");
    if (!grid) return;
    grid.innerHTML = LEARN_ARTICLES.map(function (a) {
      const read = state.readArticles.indexOf(a.id) !== -1;
      return '<div class="lib-card' + (read ? " read" : "") + '" data-article="' + a.id + '">' +
        '<div class="lib-head"><span class="lib-ico">' + a.icon + '</span><span class="lib-cat">' + a.cat + '</span></div>' +
        '<h3 class="lib-title">' + escapeHTML(a.title) + '</h3>' +
        '<p class="lib-desc">' + escapeHTML(a.desc) + '</p>' +
        '<div class="lib-foot"><span class="lib-xp">+' + a.xp + ' XP</span><span class="lib-read">' + (read ? "READ" : "READ NOW") + '</span></div>' +
      '</div>';
    }).join("");
    grid.querySelectorAll(".lib-card").forEach(function (card) {
      card.addEventListener("click", function () { openArticle(card.dataset.article); });
    });
  }

  function openArticle(articleId) {
    const a = LEARN_ARTICLES.find(function (x) { return x.id === articleId; });
    if (!a) return;
    if (state.readArticles.indexOf(a.id) === -1) {
      state.readArticles.push(a.id);
      addXP(a.xp);
      saveState();
      renderSidebar(); renderTopStats(); renderCommand(); renderAnalysis();
      showToast("Article Read! +" + a.xp + " XP", a.icon);
    }
    renderLearn();
  }

  // ==========================================================
  // FITNESS CIRCUIT SIMULATOR — Interactive Game Engine
  // 5 modes: Warm-Up, Pace Run, Rep Counter, Hydration, Cool-Down
  // ==========================================================
  const fg = {
    active: false,
    examMode: false,
    challengePool: [],
    poolIndex: 0,
    currentMode: null,
    score: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    bestStreak: 0,
    round: 0,
    totalRounds: 0,
    challengeDone: false,
    // Per-mode transient state
    warmup: { stepIndex: 0, steps: [], answered: false },
    pace: { taps: [], running: false, startTime: 0, raf: null, distance: 0, totalDistance: 400, lastBeat: 0, zone: "good", beats: 0, goodBeats: 0, cadetPos: 0 },
    reps: { taps: [], running: false, count: 0, targetCount: 15, startTime: 0, raf: null, formScore: 100, lastTap: 0, beatInterval: 1200 },
    hydration: { stepIndex: 0, answered: false, level: 80, timer: null },
    cooldown: { stepIndex: 0, answered: false, holding: false, holdStart: 0, holdRaf: null, holdDuration: 3000, heldMs: 0 },
    timer: { raf: null, start: 0, duration: 0, running: false }
  };

  const FG_MODES = [
    { id: "warmup",    label: "WARM-UP SEQUENCE",   icon: "🔥", type: "type-warmup",
      title: "Arrange the Dynamic Warm-Up", tip: "Put the warm-up phases in the correct order: pulse-raiser, dynamic stretches, mobility, and sport-specific drills. Prepare the body safely for training." },
    { id: "pace",      label: "PACE RUN",           icon: "🏃", type: "type-pace",
      title: "Maintain Your Running Pace", tip: "Tap to set your stride rhythm and keep your cadence in the green zone. Hold a steady pace for the full 400m distance." },
    { id: "reps",      label: "REP COUNTER",        icon: "💪", type: "type-reps",
      title: "Complete the Bodyweight Set", tip: "Tap DO REP at a controlled tempo. Complete 15 reps with good form — too fast or too slow reduces your form score." },
    { id: "hydration", label: "HYDRATION CHECK",    icon: "💧", type: "type-hydration",
      title: "Manage Your Hydration Strategy", tip: "Make the right call at each decision point during training. Choose when and what to drink to maintain performance." },
    { id: "cooldown",  label: "COOL-DOWN STRETCH",  icon: "🧘", type: "type-cooldown",
      title: "Hold Each Recovery Stretch", tip: "Press and hold each stretch for the required duration. Progress through 5 stretches to bring your heart rate down safely." }
  ];

  function fgLoadStats() {
    try {
      const raw = localStorage.getItem(SK.fgGame);
      if (raw) {
        const d = JSON.parse(raw);
        fg.bestStreak = d.bestStreak || 0;
        fg.score = d.score || 0;
        fg.correct = d.correct || 0;
        fg.wrong = d.wrong || 0;
        fg.round = d.round || 0;
      }
    } catch (e) {}
  }

  function fgSaveStats() {
    try {
      localStorage.setItem(SK.fgGame, JSON.stringify({
        bestStreak: fg.bestStreak,
        score: fg.score,
        correct: fg.correct,
        wrong: fg.wrong,
        round: fg.round
      }));
    } catch (e) {}
  }

  function fgSetFeedback(msg, kind) {
    const fb = document.getElementById("fgFeedback");
    if (!fb) return;
    fb.className = "fg-feedback " + (kind || "info");
    fb.innerHTML = msg;
  }

  function fgSetModeBadge(modeId, title) {
    const badge = document.getElementById("fgModeBadge");
    const titleEl = document.getElementById("fgChallengeTitle");
    if (!badge || !titleEl) return;
    if (modeId) {
      const mode = FG_MODES.find(function (m) { return m.id === modeId; });
      if (mode) {
        badge.className = "fg-mode-badge " + mode.type;
        badge.textContent = mode.label;
        titleEl.textContent = mode.title;
        titleEl.classList.remove("flash");
        void titleEl.offsetWidth;
        titleEl.classList.add("flash");
      }
    } else {
      badge.className = "fg-mode-badge idle";
      badge.textContent = "SELECT MODE";
      titleEl.textContent = title || "Ready at the fitness station";
    }
  }

  function fgSetAthleteState(state, icon) {
    const stateEl = document.getElementById("fgAthleteState");
    const icoEl = document.getElementById("fgAthleteIco");
    if (stateEl) { stateEl.textContent = state; stateEl.className = "fg-athlete-state " + (fgGetStateClass(state)); }
    if (icoEl) icoEl.textContent = icon || "🧍";
  }

  function fgGetStateClass(s) {
    if (s.indexOf("Ready") !== -1 || s.indexOf("Complete") !== -1 || s.indexOf("Recovered") !== -1 || s.indexOf("Cooling Down") !== -1) return "ready";
    if (s.indexOf("Exhausted") !== -1 || s.indexOf("Dehydrated") !== -1 || s.indexOf("Overheating") !== -1) return "exhausted";
    if (s.indexOf("Fatigued") !== -1 || s.indexOf("Pacing") !== -1 || s.indexOf("Warming Up") !== -1) return "fatigued";
    return "working";
  }

  function fgUpdateStats() {
    const set = function (id, v) { const el = document.getElementById(id); if (el) el.textContent = v; };
    set("fgScore", fg.score);
    set("fgCorrect", fg.correct);
    set("fgWrong", fg.wrong);
    set("fgStreak", fg.streak);
    set("fgRound", fg.round);
  }

  function fgAddLog(text, ok, score) {
    const list = document.getElementById("fgLogList");
    if (!list) return;
    if (list.querySelector(".muted")) list.innerHTML = "";
    const item = document.createElement("div");
    item.className = "fg-log-item " + (ok ? "ok" : "bad");
    const modeLabel = fg.currentMode ? FG_MODES.find(function (m) { return m.id === fg.currentMode; }) : null;
    const ico = ok ? "✅" : "❌";
    item.innerHTML = '<span class="fg-log-ico">' + ico + '</span>' +
      '<span class="fg-log-text">' + (modeLabel ? modeLabel.label + " — " : "") +
      escapeHTML(text) + (score !== undefined ? ' <span class="score">[' + score + ']</span>' : '') + '</span>';
    list.insertBefore(item, list.firstChild);
    while (list.children.length > 20) list.removeChild(list.lastChild);
  }

  // -- Timer helpers --
  function fgStartTimer(durationSec, onTick, onEnd) {
    fgStopTimer();
    fg.timer.running = true;
    fg.timer.start = performance.now();
    fg.timer.duration = durationSec * 1000;
    function tick() {
      if (!fg.timer.running) return;
      const elapsed = performance.now() - fg.timer.start;
      const remaining = fg.timer.duration - elapsed;
      const pct = Math.max(0, Math.min(100, (elapsed / fg.timer.duration) * 100));
      const fill = document.getElementById("fgTimerFill");
      const text = document.getElementById("fgTimerText");
      if (fill) fill.style.width = pct + "%";
      if (text) text.textContent = Math.max(0, (remaining / 1000)).toFixed(1) + "s";
      if (onTick) onTick(elapsed, remaining);
      if (remaining <= 0) {
        fg.timer.running = false;
        if (fill) fill.style.width = "100%";
        if (text) text.textContent = "0.0s";
        if (onEnd) onEnd();
        return;
      }
      fg.timer.raf = requestAnimationFrame(tick);
    }
    fg.timer.raf = requestAnimationFrame(tick);
  }

  function fgStopTimer() {
    fg.timer.running = false;
    if (fg.timer.raf) cancelAnimationFrame(fg.timer.raf);
    fg.timer.raf = null;
  }

  function fgResetTimerDisplay() {
    const fill = document.getElementById("fgTimerFill");
    const text = document.getElementById("fgTimerText");
    if (fill) fill.style.width = "0%";
    if (text) text.textContent = "—";
  }

  // -- Challenge lifecycle --
  function fgStartTraining() {
    fgStopAllAnimations();
    fg.active = true;
    fg.examMode = false;
    fg.score = 0;
    fg.correct = 0;
    fg.wrong = 0;
    fg.streak = 0;
    fg.round = 0;
    fg.totalRounds = 0;
    fg.challengePool = shuffleArray(FG_MODES.map(function (m) { return m.id; }));
    fg.poolIndex = 0;
    fgUpdateStats();
    document.getElementById("fgStartBtn").disabled = true;
    document.getElementById("fgExamBtn").disabled = true;
    document.getElementById("fgNextBtn").disabled = true;
    fgNextMode();
  }

  function fgStartExamMode() {
    fgStopAllAnimations();
    fg.active = true;
    fg.examMode = true;
    fg.score = 0;
    fg.correct = 0;
    fg.wrong = 0;
    fg.streak = 0;
    fg.round = 0;
    fg.totalRounds = 5;
    fg.challengePool = [];
    for (let i = 0; i < 5; i++) {
      fg.challengePool.push(FG_MODES[Math.floor(Math.random() * FG_MODES.length)].id);
    }
    fg.poolIndex = 0;
    fgUpdateStats();
    document.getElementById("fgStartBtn").disabled = true;
    document.getElementById("fgExamBtn").disabled = true;
    document.getElementById("fgNextBtn").disabled = true;
    fgSetFeedback("<strong>EXAM MODE</strong> — 5 rounds, random exercises. Qualify with 4 out of 5. The fitness course is open!", "info");
    setTimeout(function () { fgNextMode(); }, 800);
  }

  function fgNextMode() {
    fgStopAllAnimations();
    if (fg.poolIndex >= fg.challengePool.length) {
      fgFinishTraining();
      return;
    }
    fg.currentMode = fg.challengePool[fg.poolIndex];
    fg.poolIndex++;
    fg.round++;
    fg.challengeDone = false;
    fgUpdateStats();
    document.getElementById("fgNextBtn").disabled = true;
    fgSetModeBadge(fg.currentMode);
    const mode = FG_MODES.find(function (m) { return m.id === fg.currentMode; });
    fgSetFeedback("<strong>" + mode.label + "</strong> — " + mode.tip, "info");

    if (fg.currentMode === "warmup") renderWarmupChallenge();
    else if (fg.currentMode === "pace") renderPaceRunChallenge();
    else if (fg.currentMode === "reps") renderRepCounterChallenge();
    else if (fg.currentMode === "hydration") renderHydrationChallenge();
    else if (fg.currentMode === "cooldown") renderCooldownChallenge();
  }

  function fgHandleResult(success, scoreVal, detailText) {
    if (fg.challengeDone) return;
    fg.challengeDone = true;
    fgStopAllAnimations();
    fgStopTimer();
    fgResetTimerDisplay();
    if (success) {
      fg.correct++;
      fg.streak++;
      if (fg.streak > fg.bestStreak) fg.bestStreak = fg.streak;
      fg.score += scoreVal || 10;
      fgSetFeedback("✅ <strong>WELL DONE!</strong> " + detailText + " +" + (scoreVal || 10) + " points.", "ok");
      fgAddLog(detailText, true, scoreVal || 10);
      fgSetAthleteState("Recovered", "😊");
    } else {
      fg.wrong++;
      fg.streak = 0;
      fgSetFeedback("❌ <strong>INCORRECT.</strong> " + detailText, "err");
      fgAddLog(detailText, false, 0);
      fgSetAthleteState("Exhausted", "😣");
    }
    recordAttempt(success);
    fgUpdateStats();
    fgSaveStats();
    renderSidebar();
    renderTopStats();
    renderAnalysis();
    document.getElementById("fgNextBtn").disabled = false;
  }

  function fgFinishTraining() {
    fg.active = false;
    fgStopAllAnimations();
    fg.currentMode = null;
    fgSetModeBadge(null, "Training Complete");
    fgResetTimerDisplay();
    document.getElementById("fgStartBtn").disabled = false;
    document.getElementById("fgExamBtn").disabled = false;
    document.getElementById("fgNextBtn").disabled = true;
    const total = fg.correct + fg.wrong;
    const pct = total > 0 ? Math.round((fg.correct / total) * 100) : 0;
    let msg = "";
    if (fg.examMode) {
      if (fg.correct >= 4) {
        msg = "<strong>QUALIFIED!</strong> You passed the fitness exam with " + fg.correct + "/5. Score: " + fg.score + ". You are a physically prepared cadet.";
        addXP(50);
        saveState();
        renderSidebar(); renderTopStats(); renderCommand();
        showToast("Fitness Exam Passed! +50 XP", "🏆");
        fgSetAthleteState("Complete", "✅");
      } else {
        msg = "<strong>NOT YET QUALIFIED.</strong> You scored " + fg.correct + "/5. You need 4/5 to pass. Keep training — every session builds fitness.";
        fgSetAthleteState("Fatigued", "📚");
      }
    } else {
      if (pct >= 80) {
        msg = "<strong>OUTSTANDING!</strong> " + fg.correct + "/" + total + " correct (" + pct + "%). Score: " + fg.score + ". Try Exam Mode for formal qualification.";
        fgSetAthleteState("Complete", "✅");
      } else if (pct >= 50) {
        msg = "<strong>SOLID EFFORT.</strong> " + fg.correct + "/" + total + " correct (" + pct + "%). Score: " + fg.score + ". Review the Learn library and try again.";
        fgSetAthleteState("Recovered", "👀");
      } else {
        msg = "<strong>KEEP TRAINING.</strong> " + fg.correct + "/" + total + " correct (" + pct + "%). Study the fundamentals and practise each mode.";
        fgSetAthleteState("Fatigued", "📚");
      }
    }
    fgSetFeedback(msg, pct >= 50 ? "ok" : "err");
    const area = document.getElementById("fgChallengeArea");
    if (area) area.innerHTML = '<div class="fg-idle-prompt">' +
      '<div class="fg-idle-ico">🏁</div>' +
      '<h2>Training Complete</h2>' +
      '<p style="color:var(--ink-2); font-size:13px; line-height:1.6;">' + msg.replace(/<[^>]+>/g, "") + '</p>' +
      '<p class="muted" style="font-size:12px; margin-top:14px;">Press <strong>Start Training</strong> for another round, or <strong>Exam Mode</strong> for the formal test.</p>' +
      '</div>';
  }

  function fgReset() {
    fgStopAllAnimations();
    fg.active = false;
    fg.examMode = false;
    fg.currentMode = null;
    fg.score = 0;
    fg.correct = 0;
    fg.wrong = 0;
    fg.streak = 0;
    fg.round = 0;
    fg.challengePool = [];
    fg.poolIndex = 0;
    fgResetTimerDisplay();
    fgSetModeBadge(null);
    fgUpdateStats();
    fgSetFeedback("Simulator reset. Press <strong>Start Training</strong> to begin.", "info");
    fgSetAthleteState("Ready to Train", "🧍");
    document.getElementById("fgStartBtn").disabled = false;
    document.getElementById("fgExamBtn").disabled = false;
    document.getElementById("fgNextBtn").disabled = true;
    renderFGGame();
  }

  function fgStopAllAnimations() {
    fgStopTimer();
    if (fg.pace.raf) { cancelAnimationFrame(fg.pace.raf); fg.pace.raf = null; }
    if (fg.reps.raf) { cancelAnimationFrame(fg.reps.raf); fg.reps.raf = null; }
    if (fg.cooldown.holdRaf) { cancelAnimationFrame(fg.cooldown.holdRaf); fg.cooldown.holdRaf = null; }
    if (fg.hydration.timer) { clearInterval(fg.hydration.timer); fg.hydration.timer = null; }
    fg.pace.running = false;
    fg.reps.running = false;
    fg.cooldown.holding = false;
  }

  // ==========================================================
  // MODE 1: WARM-UP SEQUENCE
  // Put warm-up phases in the correct order (step-by-step decisions)
  // ==========================================================
  function renderWarmupChallenge() {
    const area = document.getElementById("fgChallengeArea");
    if (!area) return;
    fgSetAthleteState("Warming Up", "🔥");

    const steps = [
      {
        letter: "1", name: "PULSE-RAISER",
        scenario: "You step onto the fitness course to begin your warm-up. Your muscles are cold and your heart rate is low.",
        question: "What should you do FIRST to prepare for training?",
        options: [
          { text: "Static stretches on the ground", ico: "🧘", correct: false },
          { text: "Light jogging to raise your heart rate", ico: "🏃", correct: true },
          { text: "Sprint as fast as you can", ico: "⚡", correct: false },
          { text: "Drink a full litre of water", ico: "💧", correct: false }
        ]
      },
      {
        letter: "2", name: "DYNAMIC STRETCHES",
        scenario: "Your heart rate is elevated and you feel warmer. Now you need to prepare your muscles through their range of motion.",
        question: "Which stretches are best at this stage?",
        options: [
          { text: "Dynamic stretches like leg swings and arm circles", ico: "🔄", correct: true },
          { text: "Hold each stretch for 60 seconds", ico: "⏳", correct: false },
          { text: "Skip stretching and go straight to lifting", ico: "🏋️", correct: false },
          { text: "Only stretch your arms", ico: "💪", correct: false }
        ]
      },
      {
        letter: "3", name: "MOBILITY WORK",
        scenario: "Your muscles are loosening up. You want to prepare your joints for the full range of motion needed in training.",
        question: "What should you focus on next?",
        options: [
          { text: "Lie down and rest", ico: "😴", correct: false },
          { text: "Mobility drills for ankles, hips, and shoulders", ico: "🦴", correct: true },
          { text: "Maximal deadlifts", ico: "🏋️", correct: false },
          { text: "Drink an energy drink", ico: "🥤", correct: false }
        ]
      },
      {
        letter: "4", name: "SPORT-SPECIFIC DRILLS",
        scenario: "Your body is warm, mobile, and ready. You need to prime the specific movements you will use in the session.",
        question: "What is the final warm-up phase?",
        options: [
          { text: "Stop warming up — you are done", ico: "🛑", correct: false },
          { text: "Sport-specific drills at increasing intensity", ico: "🎯", correct: true },
          { text: "A cold shower", ico: "🚿", correct: false },
          { text: "Sit and visualise the session", ico: "🧠", correct: false }
        ]
      }
    ];

    fg.warmup.stepIndex = 0;
    fg.warmup.steps = steps;
    fg.warmup.answered = false;

    function renderStep() {
      const step = steps[fg.warmup.stepIndex];
      fgSetAthleteState("Warming Up: " + step.name, "🔥");
      area.innerHTML =
        '<div class="warmup-wrap">' +
          '<div class="warmup-cadet">' +
            '<svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg">' +
              '<rect width="520" height="160" fill="transparent"/>' +
              '<ellipse cx="260" cy="145" rx="160" ry="14" fill="rgba(240,138,36,0.1)"/>' +
              '<g transform="translate(200,35)">' +
                '<circle cx="28" cy="16" r="16" fill="#f5c84c" stroke="#e0a528" stroke-width="1"/>' +
                '<rect x="16" y="32" width="24" height="55" rx="8" fill="#f08a24" opacity="0.7"/>' +
                '<rect x="8" y="36" width="10" height="30" rx="3" fill="#f08a24" opacity="0.5" transform="rotate(-25,13,51)"/>' +
                '<rect x="38" y="36" width="10" height="30" rx="3" fill="#f08a24" opacity="0.5" transform="rotate(25,43,51)"/>' +
                '<rect x="16" y="87" width="8" height="30" rx="3" fill="#3a2a1a"/>' +
                '<rect x="32" y="87" width="8" height="30" rx="3" fill="#3a2a1a"/>' +
              '</g>' +
              '<g transform="translate(330,40)">' +
                '<circle cx="20" cy="20" r="18" fill="none" stroke="#f08a24" stroke-width="2"/>' +
                '<text x="20" y="27" text-anchor="middle" font-size="18" fill="#f08a24" font-weight="bold">' + step.letter + '/4</text>' +
              '</g>' +
            '</svg>' +
          '</div>' +
          '<div class="warmup-step-banner"><span class="num">' + step.letter + '</span>' + step.name + '</div>' +
          '<div class="warmup-scenario">' + escapeHTML(step.scenario) + '</div>' +
          '<div class="warmup-question">' + escapeHTML(step.question) + '</div>' +
          '<div class="warmup-options" id="warmupOptions">' +
            shuffleArray(step.options).map(function (opt) {
              return '<button class="warmup-option-btn" data-correct="' + opt.correct + '" type="button"><span class="opt-ico">' + opt.ico + '</span>' + escapeHTML(opt.text) + '</button>';
            }).join("") +
          '</div>' +
        '</div>';

      area.querySelectorAll(".warmup-option-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (fg.warmup.answered) return;
          fg.warmup.answered = true;
          const isCorrect = btn.dataset.correct === "true";
          area.querySelectorAll(".warmup-option-btn").forEach(function (b) { b.disabled = true; });
          if (isCorrect) {
            btn.classList.add("correct");
            fg.warmup.stepIndex++;
            if (fg.warmup.stepIndex >= steps.length) {
              fgSetAthleteState("Warming Up Complete", "✅");
              fgHandleResult(true, 12, "Warm-up sequence completed correctly — all 4 phases in the right order: pulse-raiser, dynamic stretches, mobility, sport-specific drills.");
            } else {
              fgSetFeedback("✅ Correct! " + step.name + " done. Moving to next phase...", "ok");
              setTimeout(function () { fg.warmup.answered = false; renderStep(); }, 1200);
            }
          } else {
            btn.classList.add("wrong");
            area.querySelectorAll(".warmup-option-btn").forEach(function (b) {
              if (b.dataset.correct === "true") b.classList.add("correct");
            });
            fgSetAthleteState("Exhausted", "😣");
            fgHandleResult(false, 0, "Incorrect at " + step.name + " phase. The correct action was to " + step.options.find(function (o) { return o.correct; }).text.toLowerCase() + ".");
          }
        });
      });
    }

    renderStep();
    fgStartTimer(45, null, function () {
      if (!fg.challengeDone) {
        fgHandleResult(false, 0, "Time expired — the warm-up sequence was not completed. Work through each phase efficiently.");
      }
    });
  }

  // ==========================================================
  // MODE 2: PACE RUN
  // Tap to maintain cadence in the green zone over 400m
  // ==========================================================
  function renderPaceRunChallenge() {
    const area = document.getElementById("fgChallengeArea");
    if (!area) return;
    fgSetAthleteState("Pacing", "🏃");

    fg.pace.taps = [];
    fg.pace.running = true;
    fg.pace.startTime = performance.now();
    fg.pace.distance = 0;
    fg.pace.totalDistance = 400;
    fg.pace.beats = 0;
    fg.pace.goodBeats = 0;
    fg.pace.cadetPos = 0;
    fg.pace.zone = "good";
    fg.pace.lastBeat = performance.now();
    // Target cadence: 150-180 spm (steps per minute)
    // Good zone: 150-180 spm → interval 333-400ms per step
    const TARGET_MIN_INTERVAL = 333;  // 180 spm (fast boundary)
    const TARGET_MAX_INTERVAL = 400;  // 150 spm (slow boundary)

    area.innerHTML =
      '<div class="pace-wrap">' +
        '<div class="pace-track">' +
          '<svg viewBox="0 0 520 120" xmlns="http://www.w3.org/2000/svg">' +
            '<rect width="520" height="120" fill="transparent"/>' +
            '<path d="M 20 90 Q 140 30, 260 90 T 500 90" fill="none" stroke="rgba(74,159,212,0.2)" stroke-width="3" stroke-dasharray="8,6"/>' +
            '<line x1="20" y1="95" x2="500" y2="95" stroke="rgba(240,138,36,0.3)" stroke-width="1"/>' +
            '<text x="20" y="110" font-size="9" fill="var(--ink-4)">START</text>' +
            '<text x="470" y="110" font-size="9" fill="var(--ink-4)">FINISH</text>' +
          '</svg>' +
          '<div class="pace-cadet-runner" id="paceRunner" style="left:20px;">🏃</div>' +
        '</div>' +
        '<div class="pace-progress-bar"><div class="pace-progress-fill" id="paceProgressFill" style="width:0%"></div></div>' +
        '<div class="pace-meter-wrap">' +
          '<div class="pace-meter-display">' +
            '<div class="pace-bpm-val good" id="paceBpmVal">—</div>' +
            '<div class="pace-bpm-label">Steps/min</div>' +
          '</div>' +
          '<div class="pace-distance" id="paceDistance">0m / 400m</div>' +
        '</div>' +
        '<div class="pace-zone-info" id="paceZoneInfo">Keep your cadence in the <strong>green zone (150–180 spm)</strong></div>' +
        '<div class="pace-controls">' +
          '<button class="pace-pace-btn" id="paceTapBtn" type="button">🏃 TAP TO STRIDE</button>' +
        '</div>' +
        '<p class="pace-instruction">Tap the button to set your stride rhythm. Keep your cadence between <strong>150–180 steps per minute</strong> to cover the full 400m efficiently.</p>' +
      '</div>';

    const tapBtn = document.getElementById("paceTapBtn");
    const runner = document.getElementById("paceRunner");
    const bpmVal = document.getElementById("paceBpmVal");
    const distanceEl = document.getElementById("paceDistance");
    const progressFill = document.getElementById("paceProgressFill");
    const zoneInfo = document.getElementById("paceZoneInfo");

    function updateDisplay() {
      const pct = Math.min(100, (fg.pace.distance / fg.pace.totalDistance) * 100);
      if (progressFill) progressFill.style.width = pct + "%";
      if (distanceEl) distanceEl.textContent = Math.round(fg.pace.distance) + "m / " + fg.pace.totalDistance + "m";
      // Move runner along the track
      const trackWidth = 480; // approx usable track width
      if (runner) runner.style.left = (20 + (pct / 100) * trackWidth) + "px";
    }

    // Continuous distance accumulation based on zone
    function paceLoop() {
      if (!fg.pace.running) return;
      const now = performance.now();
      const dt = now - (fg.pace.lastFrameTime || now);
      fg.pace.lastFrameTime = now;
      // Speed depends on zone: good = ~6m/s, slow = ~4m/s, fast = ~3.5m/s (less efficient)
      const speed = fg.pace.zone === "good" ? 6.0 : fg.pace.zone === "slow" ? 4.0 : 3.5;
      fg.pace.distance += (speed * dt / 1000);
      updateDisplay();
      if (fg.pace.distance >= fg.pace.totalDistance) {
        fg.pace.running = false;
        if (tapBtn) { tapBtn.disabled = true; tapBtn.textContent = "FINISHED"; }
        evaluatePace();
        return;
      }
      fg.pace.raf = requestAnimationFrame(paceLoop);
    }

    function evaluatePace() {
      const totalSteps = fg.pace.beats;
      const goodPct = totalSteps > 0 ? Math.round((fg.pace.goodBeats / totalSteps) * 100) : 0;
      if (goodPct >= 70) {
        fgSetAthleteState("Pacing Complete", "✅");
        fgHandleResult(true, 15, "Excellent pace control — " + goodPct + "% of your strides were in the 150–180 spm green zone. You covered 400m efficiently with steady cadence.");
      } else if (goodPct >= 50) {
        fgSetAthleteState("Recovered", "👀");
        fgHandleResult(true, 10, "Acceptable pace — " + goodPct + "% of strides in the green zone. Aim for a more consistent cadence to cover the distance more efficiently.");
      } else {
        fgSetAthleteState("Exhausted", "😣");
        fgHandleResult(false, 0, "Pace too inconsistent — only " + goodPct + "% of strides in the 150–180 spm green zone. Maintain a steady rhythm to avoid wasted energy.");
      }
    }

    function assessZone() {
      if (fg.pace.taps.length < 2) return;
      // Use the last few intervals to determine current zone
      const recent = fg.pace.taps.slice(-3);
      const intervals = [];
      for (let i = 1; i < recent.length; i++) intervals.push(recent[i] - recent[i - 1]);
      if (intervals.length === 0) return;
      const avgInterval = intervals.reduce(function (a, b) { return a + b; }, 0) / intervals.length;
      const spm = Math.round(60000 / avgInterval);
      let zone, zoneClass, zoneText;
      if (avgInterval >= TARGET_MIN_INTERVAL && avgInterval <= TARGET_MAX_INTERVAL) {
        zone = "good"; zoneClass = "good"; zoneText = "GREEN ZONE — excellent cadence!";
        fg.pace.goodBeats++;
      } else if (avgInterval > TARGET_MAX_INTERVAL) {
        zone = "slow"; zoneClass = "slow"; zoneText = "TOO SLOW — speed up your cadence!";
      } else {
        zone = "fast"; zoneClass = "fast"; zoneText = "TOO FAST — slow down for efficiency!";
      }
      fg.pace.zone = zone;
      fg.pace.beats++;
      if (bpmVal) {
        bpmVal.textContent = spm;
        bpmVal.className = "pace-bpm-val " + zoneClass;
      }
      if (zoneInfo) {
        zoneInfo.innerHTML = zone === "good" ? '<strong>' + zoneText + '</strong>' : zoneText;
        zoneInfo.className = "pace-zone-info " + (zone === "good" ? "" : zoneClass);
      }
    }

    if (tapBtn) tapBtn.addEventListener("click", function () {
      if (!fg.pace.running) return;
      const now = performance.now();
      fg.pace.taps.push(now);
      tapBtn.classList.add("pressed");
      setTimeout(function () { tapBtn.classList.remove("pressed"); }, 80);
      assessZone();
    });

    fg.pace.lastFrameTime = performance.now();
    fg.pace.raf = requestAnimationFrame(paceLoop);

    fgStartTimer(40, null, function () {
      if (!fg.challengeDone) {
        fg.pace.running = false;
        fgHandleResult(false, 0, "Time expired — you did not cover the full 400m. Maintain a steady pace to finish in time.");
      }
    });
  }

  // ==========================================================
  // MODE 3: REP COUNTER
  // Tap DO REP at controlled tempo with a form meter
  // ==========================================================
  function renderRepCounterChallenge() {
    const area = document.getElementById("fgChallengeArea");
    if (!area) return;
    fgSetAthleteState("Strength Set", "💪");

    fg.reps.taps = [];
    fg.reps.running = true;
    fg.reps.count = 0;
    fg.reps.targetCount = 15;
    fg.reps.startTime = performance.now();
    fg.reps.formScore = 100;
    fg.reps.lastTap = 0;
    // Ideal tempo: 1 rep every 1.5 seconds (up + down = controlled)
    fg.reps.beatInterval = 1500;
    const GOOD_MIN = 1100;  // not too fast
    const GOOD_MAX = 2000;  // not too slow

    area.innerHTML =
      '<div class="reps-wrap">' +
        '<div class="reps-visual">' +
          '<svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg">' +
            '<rect width="520" height="160" fill="transparent"/>' +
            '<ellipse cx="260" cy="150" rx="100" ry="10" fill="rgba(240,138,36,0.1)"/>' +
            '<g class="reps-cadet-body" id="repsCadetBody" transform="translate(225,20)">' +
              '<circle cx="35" cy="18" r="16" fill="#f5c84c" stroke="#e0a528" stroke-width="1"/>' +
              '<rect x="23" y="34" width="24" height="50" rx="8" fill="#f08a24" opacity="0.7"/>' +
              '<rect x="10" y="38" width="14" height="10" rx="5" fill="#f08a24" opacity="0.5" transform="rotate(-40,17,43)"/>' +
              '<rect x="46" y="38" width="14" height="10" rx="5" fill="#f08a24" opacity="0.5" transform="rotate(40,53,43)"/>' +
              '<rect x="25" y="84" width="9" height="35" rx="3" fill="#3a2a1a"/>' +
              '<rect x="37" y="84" width="9" height="35" rx="3" fill="#3a2a1a"/>' +
            '</g>' +
          '</svg>' +
        '</div>' +
        '<div class="reps-count-display" id="repsCount">0</div>' +
        '<div class="reps-count-label">REPS / ' + fg.reps.targetCount + '</div>' +
        '<div class="reps-form-meter-wrap">' +
          '<div class="reps-form-meter"><div class="reps-form-fill" id="repsFormFill" style="width:100%"></div></div>' +
          '<div class="reps-form-label"><span>FORM SCORE</span><span id="repsFormVal">100%</span></div>' +
        '</div>' +
        '<button class="reps-do-btn" id="repsDoBtn" type="button">💪 DO REP</button>' +
        '<p class="reps-instruction">Tap <strong>DO REP</strong> at a controlled tempo — roughly one rep every <strong>1.5 seconds</strong>. Too fast or too slow reduces your form score. Complete ' + fg.reps.targetCount + ' reps.</p>' +
      '</div>';

    const doBtn = document.getElementById("repsDoBtn");
    const countEl = document.getElementById("repsCount");
    const formFill = document.getElementById("repsFormFill");
    const formVal = document.getElementById("repsFormVal");
    const cadetBody = document.getElementById("repsCadetBody");

    function animateRep() {
      if (cadetBody) {
        cadetBody.classList.add("down");
        setTimeout(function () { cadetBody.classList.remove("down"); }, 400);
      }
    }

    function updateFormDisplay() {
      if (formFill) formFill.style.width = Math.max(0, fg.reps.formScore) + "%";
      if (formVal) formVal.textContent = Math.max(0, Math.round(fg.reps.formScore)) + "%";
    }

    doBtn.addEventListener("click", function () {
      if (!fg.reps.running || fg.reps.count >= fg.reps.targetCount) return;
      const now = performance.now();
      fg.reps.taps.push(now);
      fg.reps.count++;
      if (countEl) countEl.textContent = fg.reps.count;
      animateRep();
      doBtn.classList.add("pressed");
      setTimeout(function () { doBtn.classList.remove("pressed"); }, 100);

      // Assess tempo on 2nd rep onward
      if (fg.reps.taps.length >= 2) {
        const interval = now - fg.reps.taps[fg.reps.taps.length - 2];
        if (interval < GOOD_MIN) {
          // Too fast — deduct form
          fg.reps.formScore -= 8;
        } else if (interval > GOOD_MAX) {
          // Too slow — deduct form
          fg.reps.formScore -= 6;
        }
        // Penalty for very erratic timing
        if (fg.reps.taps.length >= 3) {
          const iv1 = fg.reps.taps[fg.reps.taps.length - 1] - fg.reps.taps[fg.reps.taps.length - 2];
          const iv2 = fg.reps.taps[fg.reps.taps.length - 2] - fg.reps.taps[fg.reps.taps.length - 3];
          if (Math.abs(iv1 - iv2) > 800) fg.reps.formScore -= 3;
        }
        fg.reps.formScore = Math.max(0, fg.reps.formScore);
        updateFormDisplay();
      }

      if (fg.reps.count >= fg.reps.targetCount) {
        fg.reps.running = false;
        doBtn.disabled = true;
        doBtn.textContent = "SET COMPLETE";
        const finalForm = Math.max(0, Math.round(fg.reps.formScore));
        if (finalForm >= 80) {
          fgSetAthleteState("Set Complete", "✅");
          fgHandleResult(true, 15, "Excellent rep tempo and form — " + fg.reps.targetCount + " reps completed with " + finalForm + "% form score. Controlled, disciplined strength work.");
        } else if (finalForm >= 50) {
          fgSetAthleteState("Recovered", "👀");
          fgHandleResult(true, 10, "Reps completed — " + finalForm + "% form score. Aim for a steadier tempo to maintain better form throughout the set.");
        } else {
          fgSetAthleteState("Exhausted", "😣");
          fgHandleResult(false, 0, "Form too inconsistent — only " + finalForm + "% form score. Maintain a controlled tempo of roughly 1 rep per 1.5 seconds for proper form.");
        }
      }
    });

    fgStartTimer(45, null, function () {
      if (!fg.challengeDone) {
        fg.reps.running = false;
        fgHandleResult(false, 0, "Time expired — you did not complete all " + fg.reps.targetCount + " reps. Keep a steady, controlled tempo throughout.");
      }
    });
  }

  // ==========================================================
  // MODE 4: HYDRATION CHECK
  // Decision-based scenarios with a hydration meter
  // ==========================================================
  function renderHydrationChallenge() {
    const area = document.getElementById("fgChallengeArea");
    if (!area) return;
    fgSetAthleteState("Hydration Check", "💧");

    const decisions = [
      {
        scenario: "It is 30 minutes into a hot-weather training session. You have been sweating heavily. Your mouth feels slightly dry.",
        question: "What should you do about hydration right now?",
        levelChange: 0,
        options: [
          { text: "Drink 150–250ml of water now", ico: "🥤", correct: true, reason: "Correct — drink small amounts regularly during exercise. 150–250ml every 15–20 minutes prevents dehydration." },
          { text: "Wait until you feel very thirsty", ico: "⏳", correct: false, reason: "Thirst is a late indicator — by the time you feel very thirsty, you are already dehydrated." },
          { text: "Drink a full litre all at once", ico: "💧", correct: false, reason: "Drinking too much at once can cause discomfort and hyponatraemia. Small, regular amounts are better." },
          { text: "Skip water — push through it", ico: "🚫", correct: false, reason: "Dehydration impairs performance and can be dangerous in heat. Drink regularly." }
        ]
      },
      {
        scenario: "You have been training hard for 60 minutes. You feel fatigued and your energy is dropping. You wonder whether to drink water or a sports drink.",
        question: "What is the best choice for prolonged exercise?",
        levelChange: -10,
        options: [
          { text: "A sports drink with electrolytes and carbs", ico: "🧃", correct: true, reason: "Correct — for exercise over 60 minutes, a sports drink replaces electrolytes lost in sweat and provides carbohydrate energy." },
          { text: "Only plain water", ico: "💧", correct: false, reason: "For sessions over 60 minutes, plain water alone does not replace lost electrolytes. A sports drink is better." },
          { text: "An energy drink with high caffeine", ico: "⚡", correct: false, reason: "High-caffeine energy drinks can cause jitters and dehydration. Use a proper sports drink instead." },
          { text: "Nothing — keep training", ico: "🚫", correct: false, reason: "After 60 minutes of hard training, your electrolytes and energy are depleted. Replenish with a sports drink." }
        ]
      },
      {
        scenario: "Training is over. You are cooling down and your hydration level is moderate. You want to rehydrate properly for recovery.",
        question: "What is the best post-exercise hydration strategy?",
        levelChange: -5,
        options: [
          { text: "Drink 500ml of water per 0.5kg of body weight lost", ico: "⚖️", correct: true, reason: "Correct — replace 150% of fluid lost (about 500ml per 0.5kg body weight lost) to fully rehydrate after exercise." },
          { text: "Drink as much water as possible quickly", ico: "🔥", correct: false, reason: "Over-drinking quickly can lead to hyponatraemia. Drink steadily to replace what you lost." },
          { text: "Have a fizzy drink for quick energy", ico: "🥤", correct: false, reason: "Fizzy drinks are high in sugar and poor for rehydration. Water or a recovery drink is far better." },
          { text: "Skip rehydration — you will drink later", ico: "🚫", correct: false, reason: "Post-exercise rehydration is critical for recovery. Replace lost fluids soon after training." }
        ]
      }
    ];

    fg.hydration.stepIndex = 0;
    fg.hydration.answered = false;
    fg.hydration.level = 80;

    function updateHydrationMeter() {
      const fill = document.getElementById("hydrationMeterFill");
      const val = document.getElementById("hydrationMeterVal");
      if (fill) fill.style.width = fg.hydration.level + "%";
      if (val) {
        val.textContent = fg.hydration.level + "%";
        val.className = "hydration-meter-val " + (fg.hydration.level >= 60 ? "good" : fg.hydration.level >= 30 ? "moderate" : "low");
      }
    }

    function renderDecision() {
      const decision = decisions[fg.hydration.stepIndex];
      fgSetAthleteState("Hydration: Step " + (fg.hydration.stepIndex + 1), "💧");
      area.innerHTML =
        '<div class="hydration-wrap">' +
          '<div class="hydration-cadet">' +
            '<svg viewBox="0 0 520 120" xmlns="http://www.w3.org/2000/svg">' +
              '<rect width="520" height="120" fill="transparent"/>' +
              '<g transform="translate(200,20)">' +
                '<circle cx="28" cy="16" r="16" fill="#f5c84c" stroke="#e0a528" stroke-width="1"/>' +
                '<rect x="16" y="32" width="24" height="55" rx="8" fill="#4a9fd4" opacity="0.6"/>' +
              '</g>' +
              '<g transform="translate(320,25)">' +
                '<rect x="0" y="0" width="30" height="55" rx="6" fill="rgba(56,217,123,0.15)" stroke="#38d97b" stroke-width="1.5"/>' +
                '<rect x="3" y="' + (55 - (fg.hydration.level * 0.45)) + '" width="24" height="' + (fg.hydration.level * 0.45) + '" rx="3" fill="#4a9fd4" opacity="0.7"/>' +
                '<rect x="10" y="-8" width="10" height="8" rx="2" fill="#38d97b"/>' +
              '</g>' +
            '</svg>' +
          '</div>' +
          '<div class="hydration-level-wrap">' +
            '<span class="hydration-bottle-ico">💧</span>' +
            '<div class="hydration-meter-wrap">' +
              '<div class="hydration-meter"><div class="hydration-meter-fill" id="hydrationMeterFill" style="width:' + fg.hydration.level + '%"></div></div>' +
              '<div class="hydration-meter-val ' + (fg.hydration.level >= 60 ? "good" : fg.hydration.level >= 30 ? "moderate" : "low") + '" id="hydrationMeterVal">' + fg.hydration.level + '%</div>' +
            '</div>' +
          '</div>' +
          '<div class="hydration-scenario">' + escapeHTML(decision.scenario) + '</div>' +
          '<div class="hydration-question">' + escapeHTML(decision.question) + '</div>' +
          '<div class="hydration-options" id="hydrationOptions">' +
            shuffleArray(decision.options).map(function (opt) {
              return '<button class="hydration-option-btn" data-correct="' + opt.correct + '" data-reason="' + escapeHTML(opt.reason) + '" type="button"><span class="opt-ico">' + opt.ico + '</span>' + escapeHTML(opt.text) + '</button>';
            }).join("") +
          '</div>' +
        '</div>';

      updateHydrationMeter();

      area.querySelectorAll(".hydration-option-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (fg.hydration.answered) return;
          fg.hydration.answered = true;
          const isCorrect = btn.dataset.correct === "true";
          const reason = btn.dataset.reason;
          area.querySelectorAll(".hydration-option-btn").forEach(function (b) { b.disabled = true; });
          if (isCorrect) {
            btn.classList.add("correct");
            // Correct answer boosts hydration
            fg.hydration.level = Math.min(100, fg.hydration.level + 15);
            updateHydrationMeter();
            fg.hydration.stepIndex++;
            if (fg.hydration.stepIndex >= decisions.length) {
              fgSetAthleteState("Hydration Complete", "✅");
              fgHandleResult(true, 12, "Hydration strategy correct — proper decisions at all 3 key moments. You maintained fluid balance throughout training and recovery.");
            } else {
              fgSetFeedback("✅ Correct! " + reason + " Continuing to next scenario...", "ok");
              setTimeout(function () { fg.hydration.answered = false; renderDecision(); }, 1500);
            }
          } else {
            btn.classList.add("wrong");
            area.querySelectorAll(".hydration-option-btn").forEach(function (b) {
              if (b.dataset.correct === "true") b.classList.add("correct");
            });
            // Wrong answer drops hydration
            fg.hydration.level = Math.max(0, fg.hydration.level - 20);
            updateHydrationMeter();
            fgSetAthleteState("Dehydrated", "😣");
            fgHandleResult(false, 0, "Incorrect hydration decision. " + reason);
          }
        });
      });
    }

    renderDecision();

    // Hydration slowly decreases over time during training
    fg.hydration.timer = setInterval(function () {
      if (fg.hydration.answered) return;
      fg.hydration.level = Math.max(0, fg.hydration.level - 2);
      updateHydrationMeter();
      if (fg.hydration.level <= 0) {
        fg.hydration.answered = true;
        fgSetAthleteState("Dehydrated", "😣");
        fgHandleResult(false, 0, "You became severely dehydrated — hydration was not managed in time. Drink small amounts regularly throughout training.");
      }
    }, 2500);

    fgStartTimer(40, null, function () {
      if (!fg.challengeDone) {
        fg.hydration.answered = true;
        fgHandleResult(false, 0, "Time expired — the hydration check was not completed. Make decisions promptly to maintain fluid balance.");
      }
    });
  }

  // ==========================================================
  // MODE 5: COOL-DOWN STRETCH
  // Press and hold each stretch for the required duration
  // ==========================================================
  function renderCooldownChallenge() {
    const area = document.getElementById("fgChallengeArea");
    if (!area) return;
    fgSetAthleteState("Cooling Down", "🧘");

    const steps = [
      { num: 1, name: "HAMSTRING STRETCH", instruction: "Sit on the ground, extend one leg, and reach toward your toes. <strong>Press and hold</strong> the button to maintain the stretch.", holdDuration: 3000, svgAction: "hamstring" },
      { num: 2, name: "QUAD STRETCH", instruction: "Stand on one leg, pull your other foot toward your buttocks. <strong>Press and hold</strong> to keep the stretch steady.", holdDuration: 3000, svgAction: "quad" },
      { num: 3, name: "SHOULDER STRETCH", instruction: "Pull one arm across your chest with the other. <strong>Press and hold</strong> to stretch the shoulder gently.", holdDuration: 3000, svgAction: "shoulder" },
      { num: 4, name: "HIP FLEXOR STRETCH", instruction: "Kneel on one knee, lean forward to stretch the hip. <strong>Press and hold</strong> to open the hip flexors.", holdDuration: 3000, svgAction: "hip" },
      { num: 5, name: "CALF STRETCH", instruction: "Push against a wall with one leg extended back. <strong>Press and hold</strong> to stretch the calf fully.", holdDuration: 3000, svgAction: "calf" }
    ];

    fg.cooldown.stepIndex = 0;
    fg.cooldown.answered = false;
    fg.cooldown.holding = false;
    fg.cooldown.heldMs = 0;

    function renderSVG(action) {
      const head = '<circle cx="25" cy="12" r="12" fill="#f5c84c" stroke="#e0a528" stroke-width="1"/>';
      let body = "", arms = "", legs = "";
      switch (action) {
        case "hamstring":
          body = '<rect x="15" y="22" width="20" height="55" rx="8" fill="#38d97b" opacity="0.6" transform="rotate(75,25,50)"/>';
          arms = '<rect x="30" y="30" width="18" height="6" rx="3" fill="#38d97b" opacity="0.5" transform="rotate(60,39,33)"/>';
          legs = '<rect x="20" y="55" width="8" height="40" rx="3" fill="#3a2a1a" transform="rotate(75,24,75)"/>' +
                 '<rect x="30" y="55" width="8" height="30" rx="3" fill="#3a2a1a"/>';
          break;
        case "quad":
          body = '<rect x="15" y="22" width="20" height="55" rx="8" fill="#38d97b" opacity="0.6"/>';
          arms = '<rect x="0" y="35" width="16" height="6" rx="3" fill="#38d97b" opacity="0.5" transform="rotate(-20,8,38)"/>';
          legs = '<rect x="16" y="75" width="8" height="35" rx="3" fill="#3a2a1a"/>' +
                 '<rect x="28" y="75" width="8" height="25" rx="3" fill="#3a2a1a" transform="rotate(70,32,87)"/>';
          break;
        case "shoulder":
          body = '<rect x="15" y="22" width="20" height="55" rx="8" fill="#38d97b" opacity="0.6"/>';
          arms = '<rect x="2" y="30" width="22" height="6" rx="3" fill="#38d97b" opacity="0.6"/>';
          legs = '<rect x="16" y="75" width="8" height="35" rx="3" fill="#3a2a1a"/>' +
                 '<rect x="26" y="75" width="8" height="35" rx="3" fill="#3a2a1a"/>';
          break;
        case "hip":
          body = '<rect x="10" y="30" width="22" height="45" rx="8" fill="#38d97b" opacity="0.6" transform="rotate(15,21,52)"/>';
          arms = '<rect x="5" y="35" width="16" height="6" rx="3" fill="#38d97b" opacity="0.5" transform="rotate(15,13,38)"/>';
          legs = '<rect x="10" y="73" width="8" height="20" rx="3" fill="#3a2a1a"/>' +
                 '<rect x="24" y="70" width="8" height="35" rx="3" fill="#3a2a1a" transform="rotate(20,28,85)"/>';
          break;
        case "calf":
          body = '<rect x="10" y="30" width="22" height="45" rx="8" fill="#38d97b" opacity="0.6" transform="rotate(10,21,52)"/>';
          arms = '<rect x="0" y="32" width="16" height="6" rx="3" fill="#38d97b" opacity="0.5" transform="rotate(10,8,35)"/>';
          legs = '<rect x="14" y="73" width="8" height="18" rx="3" fill="#3a2a1a"/>' +
                 '<rect x="26" y="68" width="8" height="40" rx="3" fill="#3a2a1a" transform="rotate(-10,30,88)"/>';
          break;
      }
      return '<svg viewBox="0 0 520 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="520" height="180" fill="transparent"/>' +
        '<ellipse cx="170" cy="165" rx="100" ry="10" fill="rgba(56,217,123,0.08)"/>' +
        '<g transform="translate(140,20)">' + head + body + arms + legs + '</g>' +
        '<g transform="translate(300,60)">' +
          '<circle cx="30" cy="30" r="26" fill="none" stroke="#38d97b" stroke-width="2" opacity="0.5"/>' +
          '<text x="30" y="38" text-anchor="middle" font-size="20" fill="#38d97b" font-weight="bold">🧘</text>' +
        '</g>' +
      '</svg>';
    }

    function renderStep() {
      const step = steps[fg.cooldown.stepIndex];
      fgSetAthleteState("Cooling Down: " + step.name, "🧘");
      fg.cooldown.holdDuration = step.holdDuration;
      fg.cooldown.heldMs = 0;
      fg.cooldown.holding = false;
      const progressDots = steps.map(function (s, i) {
        return '<div class="cooldown-dot ' + (i < fg.cooldown.stepIndex ? "done" : i === fg.cooldown.stepIndex ? "current" : "") + '"></div>';
      }).join("");

      area.innerHTML =
        '<div class="cooldown-wrap">' +
          '<div class="cooldown-cadet">' + renderSVG(step.svgAction) + '</div>' +
          '<div class="cooldown-step-banner"><span class="num">' + step.num + '</span>' + step.name + '</div>' +
          '<div class="cooldown-instruction">' + step.instruction + '</div>' +
          '<div class="cooldown-progress">' + progressDots + '</div>' +
          '<div class="cooldown-hold-bar"><div class="cooldown-hold-fill" id="cooldownHoldFill" style="width:0%"></div></div>' +
          '<button class="cooldown-btn" id="cooldownHoldBtn" type="button">🖐️ HOLD TO STRETCH</button>' +
        '</div>';

      const holdBtn = document.getElementById("cooldownHoldBtn");
      const holdFill = document.getElementById("cooldownHoldFill");

      function startHold() {
        if (fg.cooldown.holding || fg.cooldown.answered) return;
        fg.cooldown.holding = true;
        fg.cooldown.holdStart = performance.now();
        if (holdBtn) holdBtn.classList.add("holding");
        if (holdBtn) holdBtn.textContent = "🧘 HOLDING...";

        function holdLoop() {
          if (!fg.cooldown.holding || fg.cooldown.answered) return;
          const elapsed = performance.now() - fg.cooldown.holdStart;
          fg.cooldown.heldMs = elapsed;
          const pct = Math.min(100, (elapsed / fg.cooldown.holdDuration) * 100);
          if (holdFill) holdFill.style.width = pct + "%";
          if (elapsed >= fg.cooldown.holdDuration) {
            fg.cooldown.holding = false;
            if (holdBtn) { holdBtn.classList.remove("holding"); holdBtn.textContent = "✅ STRETCH HELD"; holdBtn.disabled = true; }
            fg.cooldown.stepIndex++;
            if (fg.cooldown.stepIndex >= steps.length) {
              fg.cooldown.answered = true;
              fgSetAthleteState("Cooling Down Complete", "✅");
              fgHandleResult(true, 12, "Cool-down complete! All 5 stretches held for the required duration. Your heart rate is down and muscles are recovering well.");
            } else {
              fgSetFeedback("✅ " + step.name + " held! Moving to next stretch...", "ok");
              setTimeout(function () { renderStep(); }, 800);
            }
            return;
          }
          fg.cooldown.holdRaf = requestAnimationFrame(holdLoop);
        }
        fg.cooldown.holdRaf = requestAnimationFrame(holdLoop);
      }

      function stopHold() {
        if (!fg.cooldown.holding) return;
        fg.cooldown.holding = false;
        if (fg.cooldown.holdRaf) { cancelAnimationFrame(fg.cooldown.holdRaf); fg.cooldown.holdRaf = null; }
        if (holdBtn) { holdBtn.classList.remove("holding"); holdBtn.textContent = "🖐️ HOLD TO STRETCH"; }
        // Reset progress if released early (partial hold)
        if (holdFill) holdFill.style.width = "0%";
      }

      if (holdBtn) {
        // Mouse events
        holdBtn.addEventListener("mousedown", startHold);
        holdBtn.addEventListener("mouseup", stopHold);
        holdBtn.addEventListener("mouseleave", stopHold);
        // Touch events
        holdBtn.addEventListener("touchstart", function (e) { e.preventDefault(); startHold(); }, { passive: false });
        holdBtn.addEventListener("touchend", function (e) { e.preventDefault(); stopHold(); }, { passive: false });
        holdBtn.addEventListener("touchcancel", stopHold);
      }
    }

    renderStep();
    fgStartTimer(60, null, function () {
      if (!fg.challengeDone) {
        fg.cooldown.answered = true;
        fgHandleResult(false, 0, "Time expired — the cool-down was not completed. Hold each stretch for the full duration to aid recovery.");
      }
    });
  }

  // ==========================================================
  // RENDER: Fitness Circuit Simulator (idle state)
  // ==========================================================
  function renderFGGame() {
    fgLoadStats();
    fgUpdateStats();
    fgResetTimerDisplay();
    fgSetModeBadge(null);
    fgSetAthleteState("Ready to Train", "🧍");

    const startBtn = document.getElementById("fgStartBtn");
    const nextBtn = document.getElementById("fgNextBtn");
    const examBtn = document.getElementById("fgExamBtn");
    const resetBtn = document.getElementById("fgResetBtn");
    if (startBtn) startBtn.addEventListener("click", fgStartTraining);
    if (nextBtn) nextBtn.addEventListener("click", fgNextMode);
    if (examBtn) examBtn.addEventListener("click", fgStartExamMode);
    if (resetBtn) resetBtn.addEventListener("click", fgReset);
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
    if (ico) ico.textContent = icon || "✅";
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
    if (name === "simulator") renderFGGame();
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
    try { trMutate(FG_MODES); } catch(e) {}
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(decisions); } catch(e) {}
    try { trMutate(intervals); } catch(e) {}
    try { trMutate(scenes); } catch(e) {}
    try { trMutate(steps); } catch(e) {}
  }



  // ==========================================================
  // INIT
  // ==========================================================
  function init() {
    document.querySelectorAll(".nav-btn").forEach(function (b) {
      b.addEventListener("click", function () { switchSection(b.dataset.section); });
    });

    const mb = document.getElementById("mobileMenuBtn");
    if (mb) mb.addEventListener("click", function () {
      document.getElementById("sidebar").classList.toggle("open");
    });

    const fsb = document.getElementById("fileSitrepBtn");
    if (fsb) fsb.addEventListener("click", fileSitrep);

    // Complete-card SITREP button (dynamically generated)
    document.addEventListener("click", function (e) {
      if (e.target && e.target.classList && e.target.classList.contains("ccFileSitrepBtn")) {
        fileSitrep();
      }
    });

    const params = new URLSearchParams(window.location.search);
    const deepMission = params.get("mission");

    loadState();
    fgLoadStats();
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
    renderFGGame();

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
