(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "firstAidTrainingProgress",
    sitreps: "firstAidTrainingSitreps",
    wrongAttempts: "firstAidTrainingWrongAttempts",
    streak: "firstAidTrainingStreak",
    bestStreak: "firstAidTrainingBestStreak",
    readArticles: "firstAidTrainingReadArticles",
    erGame: "firstAidTrainingERGame"
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const FIRST_AID_BADGE_ID = 8;

  // ==========================================================
  // RANKS
  // ==========================================================
  const RANKS = [
    { id: 0, name: "First Aider Recruit", xp: 0,    icon: "✚",   callsign: "MEDIC-1" },
    { id: 1, name: "First Aider Cadet",   xp: 300,  icon: "🩹",  callsign: "MEDIC-2" },
    { id: 2, name: "Field Medic Cadet",   xp: 800,  icon: "💊",  callsign: "MEDIC-3" },
    { id: 3, name: "Senior Medic Cadet",  xp: 1400, icon: "🚑",  callsign: "MEDIC-4" },
    { id: 4, name: "Medic Specialist",    xp: 2000, icon: "⭐",  callsign: "MEDIC-5" },
    { id: 5, name: "Master Medic Cadet",  xp: 2800, icon: "🏆",  callsign: "MEDIC-6" }
  ];

  // ==========================================================
  // TOOLS
  // ==========================================================
  const TOOLS = [
    { id: "gloves",      icon: "🧤",  label: "Disposable Gloves" },
    { id: "phone",       icon: "📱",  label: "Emergency Phone" },
    { id: "defib",       icon: "⚡",  label: "AED / Defibrillator" },
    { id: "dressing",    icon: "🩹",  label: "Sterile Dressing" },
    { id: "bandage",     icon: "🏥",  label: "Pressure Bandage" },
    { id: "tourniquet",  icon: "🔒",  label: "Tourniquet" },
    { id: "scissors",    icon: "✂️",  label: "Trauma Shears" },
    { id: "blanket",     icon: "🧣",  label: "Survival Blanket" },
    { id: "mask",        icon: "😷",  label: "CPR Face Shield" },
    { id: "airway",      icon: "🫁",  label: "Airway Adjunct" },
    { id: "pen",         icon: "🖊️", label: "Marker Pen" },
    { id: "water",       icon: "💧",  label: "Clean Water" },
    { id: "manual",      icon: "📖",  label: "First Aid Manual" }
  ];

  // ==========================================================
  // MISSIONS — 10 first aid training missions
  // ==========================================================
  const MISSIONS = [
    {
      id: "fa1", order: 1, tag: "DRABC", icon: "🩺",
      title: "The Primary Survey",
      desc: "Master the DRABC primary survey — the first thing you do for any casualty.",
      xp: 100,
      brief: "You arrive at a scene where a cadet has collapsed during a field exercise. Run the primary survey: check for Danger, assess Response, open the Airway, check Breathing, and look for Circulation. Each step must be done in the correct order — getting the sequence wrong can cost lives.",
      scene: "drabc",
      chapters: [
        { title: "Danger", desc: "Ensure the scene is safe before approaching" },
        { title: "Response", desc: "Check if the casualty is conscious" },
        { title: "Airway", desc: "Open and clear the airway" },
        { title: "Breathing & Circulation", desc: "Assess breathing and check for severe bleeding" }
      ],
      tasks: [
        { type: "select", label: "Step 1 — Before you approach the collapsed cadet, what is the FIRST thing you must do?",
          options: ["Check if the casualty is breathing", "Check for Danger to yourself and others", "Call 999 immediately", "Open the casualty's airway"],
          correct: 1,
          tool: "gloves",
          explain: "DRABC starts with Danger. Before touching the casualty, make sure there are no hazards — live wires, traffic, falling debris, or hostile situations — that could injure you or the casualty further." },
        { type: "select", label: "Step 2 — The scene is safe. How do you check the casualty's Response?",
          options: ["Shake their shoulders and shout 'Can you hear me?'", "Pour water on their face", "Check their pulse first", "Lift their legs up"],
          correct: 0,
          explain: "Check response by gently shaking the casualty's shoulders and shouting. If they respond, keep them still and assess for injuries. If not, they are unresponsive — move to the airway." },
        { type: "select", label: "Step 3 — The casualty is unresponsive. How do you open the Airway?",
          options: ["Tilt the head back and lift the chin (head-tilt chin-lift)", "Push down on the forehead", "Turn them onto their front", "Pull their tongue forward"],
          correct: 0,
          tool: "gloves",
          explain: "Use the head-tilt chin-lift manoeuvre: place one hand on the forehead and two fingers under the chin, then tilt the head back gently. This opens the airway. If you suspect a spinal injury, use the jaw-thrust method instead." },
        { type: "select", label: "Step 4 — The airway is open. How long should you check for Breathing?",
          options: ["2 seconds", "No more than 10 seconds", "At least 2 minutes", "30 seconds"],
          correct: 1,
          explain: "Check breathing for no more than 10 seconds. Look for chest movement, listen for breath sounds, and feel for breath on your cheek. If the casualty is not breathing normally, begin CPR immediately." }
      ]
    },
    {
      id: "fa2", order: 2, tag: "CPR", icon: "🫀",
      title: "Cardiopulmonary Resuscitation",
      desc: "Learn when and how to perform CPR chest compressions and rescue breaths.",
      xp: 120,
      brief: "A cadet has collapsed and is not breathing normally. You need to perform CPR. Know the correct hand position, compression depth, rate, and the 30:2 ratio of compressions to breaths. Timing and technique are critical — effective CPR can double or triple survival chances.",
      scene: "cpr",
      chapters: [
        { title: "Preparation", desc: "Call for help and prepare the casualty" },
        { title: "Hand Position", desc: "Place hands correctly on the chest" },
        { title: "Compression Rate", desc: "Compress at the right speed and depth" },
        { title: "The 30:2 Ratio", desc: "Combine compressions with rescue breaths" }
      ],
      tasks: [
        { type: "select", label: "Before starting CPR, what must you ensure has happened?",
          options: ["That someone has called 999 for an ambulance and an AED is being fetched", "That the casualty has been given water", "That the casualty's shoes have been removed", "That you have written down the time"],
          correct: 0,
          tool: "phone",
          explain: "Before starting CPR, ensure 999 has been called and an AED (defibrillator) is being retrieved. If you are alone, call 999 first, then start CPR. CPR alone rarely restarts the heart — you need the ambulance and defibrillator." },
        { type: "select", label: "Where do you place your hands for chest compressions?",
          options: ["On the casualty's stomach", "On the lower ribs", "In the centre of the chest (on the breastbone)", "On the collarbone"],
          correct: 2,
          tool: "gloves",
          explain: "Place the heel of one hand in the centre of the chest on the breastbone (sternum), and place the other hand on top, interlocking fingers. Keep your arms straight and your shoulders directly above your hands." },
        { type: "select", label: "What is the correct compression rate and depth for an adult?",
          options: ["60 per minute, 2cm deep", "100–120 per minute, 5–6cm deep", "200 per minute, 10cm deep", "40 per minute, 3cm deep"],
          correct: 1,
          explain: "Compress at 100–120 compressions per minute, pushing down 5–6cm (about 2 inches) on an adult. The beat of 'Stayin' Alive' by the Bee Gees is the right tempo. Allow the chest to fully recoil between compressions." },
        { type: "select", label: "What is the correct ratio of compressions to rescue breaths?",
          options: ["15 compressions : 2 breaths", "30 compressions : 2 breaths", "10 compressions : 1 breath", "50 compressions : 5 breaths"],
          correct: 1,
          tool: "mask",
          explain: "The ratio is 30 compressions followed by 2 rescue breaths. Give each breath over 1 second, watching for the chest to rise. If you are unwilling or unable to give breaths, do compression-only CPR at 100–120 per minute." }
      ]
    },
    {
      id: "fa3", order: 3, tag: "BLEEDING", icon: "🩸",
      title: "Controlling Severe Bleeding",
      desc: "Learn to assess and control external bleeding using direct pressure and elevation.",
      xp: 110,
      brief: "A cadet has a deep laceration on their forearm from a training accident. Blood is flowing steadily. You need to control the bleeding using direct pressure, elevation, and dressing. Know when a tourniquet is appropriate and how to prevent shock.",
      scene: "bleeding",
      chapters: [
        { title: "Assessment", desc: "Identify the type and severity of bleeding" },
        { title: "Direct Pressure", desc: "Apply firm pressure to the wound" },
        { title: "Dressing & Elevation", desc: "Apply a dressing and elevate the limb" },
        { title: "Shock Prevention", desc: "Recognise and manage hypovolaemic shock" }
      ],
      tasks: [
        { type: "select", label: "What is the FIRST and most important method to control external bleeding?",
          options: ["Apply a tourniquet immediately", "Apply firm direct pressure to the wound", "Wash the wound with water", "Elevate the limb only"],
          correct: 1,
          tool: "dressing",
          explain: "Direct pressure is the first-line treatment for most external bleeding. Press firmly on the wound with a sterile dressing or clean cloth. Most bleeding can be controlled with sustained direct pressure alone." },
        { type: "select", label: "After applying direct pressure, what should you do with the injured limb if possible?",
          options: ["Keep it below heart level", "Elevate it above the level of the heart", "Keep it flat on the ground", "Bandage it tightly to the body"],
          correct: 0,
          tool: "bandage",
          explain: "Elevate the injured limb above the level of the heart if possible (and if no fracture is suspected). This reduces blood flow to the area and helps control bleeding. Maintain direct pressure while elevating." },
        { type: "select", label: "The dressing is soaked through with blood. What do you do?",
          options: ["Remove it and apply a fresh one", "Add a second dressing on top and continue pressure", "Remove all dressings and use a tourniquet", "Nothing — it is normal"],
          correct: 1,
          explain: "Never remove a blood-soaked dressing — it will disturb the clot that is forming. Instead, add a second dressing on top of the first and continue applying firm pressure. Removing the dressing restarts the bleeding." },
        { type: "select", label: "A tourniquet should only be used when:",
          options: ["For any cut that bleeds", "Direct pressure cannot control life-threatening bleeding from a limb", "The casualty says it hurts", "There is a small scratch"],
          correct: 1,
          tool: "tourniquet",
          explain: "Tourniquets are a last resort, used only when direct pressure fails to control catastrophic bleeding from a limb. Apply it above the wound, tighten until bleeding stops, and note the time of application. They can save lives but also risk limb damage." }
      ]
    },
    {
      id: "fa4", order: 4, tag: "CHOKING", icon: "😮‍💨",
      title: "Responding to Choking",
      desc: "Learn to recognise choking and deliver back blows and abdominal thrusts correctly.",
      xp: 100,
      brief: "A cadet is eating lunch and suddenly starts clutching their throat. They cannot speak or cough. You need to recognise the choking emergency and respond with the correct sequence of back blows and abdominal thrusts. Knowing the difference between mild and severe obstruction saves lives.",
      scene: "choking",
      chapters: [
        { title: "Recognition", desc: "Identify the signs of severe choking" },
        { title: "Back Blows", desc: "Deliver up to 5 sharp back blows" },
        { title: "Abdominal Thrusts", desc: "Apply up to 5 Heimlich manoeuvres" },
        { title: "When They Collapse", desc: "Response if the casualty becomes unconscious" }
      ],
      tasks: [
        { type: "select", label: "How do you know the casualty has a SEVERE airway obstruction?",
          options: ["They are coughing loudly and speaking", "They cannot speak, cough, or breathe, and may be clutching their throat", "They are breathing through their nose", "They are drinking water normally"],
          correct: 1,
          explain: "Severe obstruction is indicated by the inability to speak, cough, or breathe. The casualty may clutch their throat (the universal choking sign). If they can still cough, encourage them to keep coughing — do not intervene. If they cannot, act immediately." },
        { type: "select", label: "What is the first technique to try for a conscious choking adult?",
          options: ["Abdominal thrusts (Heimlich manoeuvre)", "Up to 5 sharp back blows between the shoulder blades", "Lay them flat and do CPR", "Give them water to drink"],
          correct: 1,
          explain: "Start with up to 5 sharp back blows. Bend the casualty forward, support their chest, and strike firmly between the shoulder blades with the heel of your hand. Check after each blow to see if the obstruction has cleared." },
        { type: "select", label: "Back blows have not cleared the obstruction. What is the next step?",
          options: ["Give up to 5 abdominal thrusts (Heimlich manoeuvre)", "Start CPR immediately", "Slap them on the back harder", "Turn them upside down"],
          correct: 0,
          explain: "If 5 back blows fail, give up to 5 abdominal thrusts. Stand behind the casualty, place a clenched fist between the navel and ribcage, and pull sharply inward and upward. Alternate between 5 back blows and 5 abdominal thrusts until the obstruction clears." },
        { type: "select", label: "The choking casualty becomes unconscious. What do you do?",
          options: ["Keep doing abdominal thrusts", "Support them to the ground, call 999, and start CPR", "Turn them on their side and wait", "Give them a drink of water"],
          correct: 1,
          tool: "phone",
          explain: "If the casualty becomes unconscious, carefully support them to the ground, call 999 immediately, and begin CPR starting with chest compressions. Each compression may help dislodge the obstruction. Check the mouth between compressions and remove any visible obstruction." }
      ]
    },
    {
      id: "fa5", order: 5, tag: "HEART", icon: "❤️‍🔥",
      title: "Recognising Heart Attack",
      desc: "Learn the signs of a heart attack and the correct emergency response.",
      xp: 110,
      brief: "A senior cadet complains of sudden crushing chest pain during a parade. You suspect a heart attack. You need to recognise the warning signs, position the casualty correctly, call for emergency help, and monitor them until the ambulance arrives. Early recognition and response are critical.",
      scene: "heart",
      chapters: [
        { title: "Recognition", desc: "Identify the signs and symptoms of a heart attack" },
        { title: "Positioning", desc: "Position the casualty correctly" },
        { title: "Emergency Call", desc: "Call 999 and provide accurate information" },
        { title: "Monitoring", desc: "Monitor breathing and prepare for CPR" }
      ],
      tasks: [
        { type: "select", label: "Which of these is a classic sign of a heart attack?",
          options: ["Crushing central chest pain that may spread to the arm, jaw, or back", "A mild headache and tiredness", "A runny nose and sneezing", "An itchy rash on the arm"],
          correct: 0,
          explain: "Classic signs include crushing or tightening central chest pain (often described as like a heavy weight on the chest), pain radiating to the left arm, jaw, neck, or back, shortness of breath, sweating, nausea, and a sense of dread. Symptoms can vary, especially in women." },
        { type: "select", label: "How should you position a conscious casualty with suspected heart attack?",
          options: ["Lay them completely flat", "Sit them down in a comfortable position, leaning slightly forward with knees raised", "Stand them up and walk them around", "Place them on their front"],
          correct: 1,
          explain: "Sit the casualty in a comfortable position — typically leaning slightly forward with knees raised, or propped up against a wall. This reduces the strain on the heart. Do not let them walk around or exert themselves. Keep them calm and still." },
        { type: "select", label: "What should you do immediately after recognising a suspected heart attack?",
          options: ["Drive them to hospital yourself", "Call 999 for an ambulance immediately", "Give them food and water", "Tell them to sleep it off"],
          correct: 0,
          tool: "phone",
          explain: "Call 999 immediately. Do not drive the casualty to hospital yourself — paramedics can begin treatment en route. While waiting, keep the casualty calm and seated, loosen tight clothing, monitor their breathing, and be ready to start CPR if they become unconscious." },
        { type: "select", label: "If the casualty becomes unconscious and stops breathing normally, what do you do?",
          options: ["Wait for the ambulance to arrive", "Begin CPR immediately and use an AED if available", "Sit them up in a chair", "Give them a glass of water"],
          correct: 1,
          tool: "defib",
          explain: "If the casualty becomes unconscious and is not breathing normally, begin CPR immediately. If an AED (defibrillator) is available, turn it on and follow its voice instructions. Early defibrillation is critical in cardiac arrest following a heart attack." }
      ]
    },
    {
      id: "fa6", order: 6, tag: "RECOVERY", icon: "🛌",
      title: "The Recovery Position",
      desc: "Learn to place an unconscious, breathing casualty in the recovery position to protect the airway.",
      xp: 100,
      brief: "You have completed your primary survey. The casualty is unconscious but breathing normally. You need to place them in the recovery position to keep their airway open and allow fluids to drain from the mouth. This is a critical skill that prevents airway obstruction in unconscious casualties.",
      scene: "recovery",
      chapters: [
        { title: "Preparation", desc: "Check the casualty and prepare to move them" },
        { title: "Arm & Leg Position", desc: "Position the near arm and far leg" },
        { title: "The Roll", desc: "Roll the casualty onto their side" },
        { title: "Airway Protection", desc: "Ensure the airway remains open" }
      ],
      tasks: [
        { type: "select", label: "When should you place a casualty in the recovery position?",
          options: ["When they are conscious and walking", "When they are unconscious but breathing normally", "When they are not breathing at all", "When they have a broken arm"],
          correct: 1,
          explain: "Place a casualty in the recovery position when they are unconscious but breathing normally. This keeps the airway open and allows vomit or fluids to drain from the mouth, preventing them from choking. If the casualty is not breathing, start CPR instead." },
        { type: "select", label: "What do you do with the casualty's near arm (the arm closest to you)?",
          options: ["Place it across their chest", "Place it straight out at a right angle to the body", "Tuck it behind their back", "Raise it above their head"],
          correct: 1,
          explain: "Place the near arm at a right angle to the body, with the palm facing up and the elbow bent. This creates a base and supports the body when you roll them onto their side." },
        { type: "select", label: "What do you do with the casualty's far leg and far arm before rolling?",
          options: ["Cross the far arm across the chest and bend the far leg at the knee", "Straighten both completely", "Tuck them behind the body", "Leave them where they are"],
          correct: 0,
          explain: "Bring the far arm across the chest so the back of the hand is against the near cheek. Then bend the far leg at the knee so the foot is flat on the ground. This arm and leg become the supports when you roll the casualty toward you." },
        { type: "select", label: "After rolling the casualty into the recovery position, what should you do?",
          options: ["Leave them and walk away", "Adjust the upper leg to stabilise the body and tilt the head back to keep the airway open", "Sit them up immediately", "Cover their face with a blanket"],
          correct: 1,
          explain: "Adjust the upper leg so the hip and knee are bent at right angles — this stabilises the body and prevents rolling. Tilt the head back to keep the airway open, and check that the hand under the cheek supports the head. Monitor breathing until help arrives." }
      ]
    },
    {
      id: "fa7", order: 7, tag: "SHOCK", icon: "😰",
      title: "Managing Shock",
      desc: "Recognise and manage hypovolaemic and other forms of shock in a casualty.",
      xp: 100,
      brief: "A cadet who was bleeding heavily has become pale, cold, and clammy. You recognise the signs of shock. You need to manage the casualty by laying them down, elevating their legs, keeping them warm, and reassuring them while waiting for emergency help. Shock can be fatal if untreated.",
      scene: "shock",
      chapters: [
        { title: "Recognition", desc: "Identify the signs of shock" },
        { title: "Positioning", desc: "Lay the casualty down correctly" },
        { title: "Warmth & Reassurance", desc: "Keep the casualty warm and calm" },
        { title: "What Not to Do", desc: "Avoid common mistakes in shock management" }
      ],
      tasks: [
        { type: "select", label: "Which of these are signs of shock?",
          options: ["Pale, cold, clammy skin with rapid pulse and rapid shallow breathing", "Red, flushed skin and slow pulse", "Normal skin colour and relaxed breathing", "Warm dry skin and a calm manner"],
          correct: 0,
          explain: "Signs of shock include pale or grey skin, cold and clammy to the touch, a rapid and weak pulse, rapid shallow breathing, sweating, thirst, nausea, dizziness, and eventual loss of consciousness. Shock occurs when vital organs are not getting enough oxygen." },
        { type: "select", label: "How should you position a casualty in shock (with no head injury or breathing difficulty)?",
          options: ["Sit them upright in a chair", "Lay them down and raise their legs about 20–30cm", "Stand them up and walk them around", "Place them face down"],
          correct: 0,
          explain: "Lay the casualty flat on their back and raise their legs about 20–30cm (a foot) to improve blood flow to the brain and vital organs. Do not raise the legs if you suspect a head injury, breathing difficulty, or certain fractures." },
        { type: "select", label: "What should you do to keep a casualty in shock warm?",
          options: ["Nothing — let them cool down", "Cover them with a coat or blanket, but do not overheat", "Place them near a hot fire", "Give them a hot water bottle directly on the skin"],
          correct: 1,
          tool: "blanket",
          explain: "Cover the casualty with a coat or blanket to keep them warm, but do not overheat them. Do not apply direct heat (like hot water bottles) to the skin, and do not use a heat source that could burn. Loosen tight clothing to improve circulation." },
        { type: "select", label: "What must you NOT do when managing a casualty in shock?",
          options: ["Reassure the casualty constantly", "Give them anything to eat or drink", "Monitor their breathing and pulse", "Call 999 for an ambulance"],
          correct: 1,
          explain: "Never give a casualty in shock anything to eat or drink — they may need surgery or anaesthesia, and an empty stomach is safer. If they are thirsty, moisten their lips with water only. Reassure them constantly, monitor their breathing and pulse, and call 999." }
      ]
    },
    {
      id: "fa8", order: 8, tag: "BURNS", icon: "🔥",
      title: "Treating Burns and Scalds",
      desc: "Learn the correct first aid for burns and scalds using the cool-call-cover method.",
      xp: 100,
      brief: "A cadet has accidentally touched a hot cooking stove during a field exercise and has a burn on their hand. You need to apply the correct first aid: cool the burn, call for help if needed, and cover it properly. Know what never to do with a burn — common myths can cause more harm.",
      scene: "burns",
      chapters: [
        { title: "Cooling", desc: "Cool the burn under running water for 20 minutes" },
        { title: "Removal", desc: "Carefully remove jewellery and tight clothing" },
        { title: "Covering", desc: "Cover with cling film or a sterile dressing" },
        { title: "What Not to Do", desc: "Avoid harmful traditional remedies" }
      ],
      tasks: [
        { type: "select", label: "What is the FIRST thing you should do for a burn or scald?",
          options: ["Apply butter or toothpaste", "Cool it under cool running water for at least 20 minutes", "Pop any blisters that form", "Cover it with a tight bandage immediately"],
          correct: 1,
          tool: "water",
          explain: "Cool the burn under cool (not ice cold) running water for at least 20 minutes. This stops the burning process, reduces pain, and limits tissue damage. Cooling should happen as quickly as possible — ideally within 3 hours of the burn occurring." },
        { type: "select", label: "While cooling the burn, what else should you do if possible?",
          options: ["Remove jewellery and tight clothing near the burn before it swells", "Apply ice directly to the burn", "Cover the burn with a towel", "Leave jewellery on to protect the skin"],
          correct: 0,
          explain: "Carefully remove jewellery, watches, rings, and tight clothing near the burn before swelling makes it impossible. Do not remove anything that is stuck to the burn. Swelling can constrict circulation if items are left on." },
        { type: "select", label: "After cooling, how should you cover the burn?",
          options: ["Wrap it tightly in a bandage", "Cover it loosely with cling film or a clean, non-fluffy dressing", "Leave it open to the air", "Cover it with cotton wool"],
          correct: 1,
          tool: "dressing",
          explain: "After cooling, cover the burn loosely with cling film (do not wrap tightly) or a clean, non-fluffy sterile dressing. Cling film is ideal because it does not stick to the wound, is sterile from the roll, and is transparent so the burn can be assessed without removal." },
        { type: "select", label: "Which of these should you NEVER do when treating a burn?",
          options: ["Apply butter, oils, toothpaste, or ice to the burn; or break blisters", "Cool it under running water", "Cover it with cling film", "Remove tight jewellery nearby"],
          correct: 0,
          explain: "Never apply butter, oils, toothpaste, cream, or ice to a burn — these trap heat, increase infection risk, and damage tissue. Never break blisters — they are a natural sterile dressing. Do not use adhesive dressings or fluffy materials that could stick to the wound." }
      ]
    },
    {
      id: "fa9", order: 9, tag: "FRACTURES", icon: "🦴",
      title: "Suspected Fractures & Sprains",
      desc: "Learn to recognise and immobilise suspected fractures and manage sprains.",
      xp: 110,
      brief: "A cadet has fallen during an obstacle course and is holding their ankle, in significant pain. You suspect a fracture or sprain. You need to recognise the signs, immobilise the injury, prevent further damage, and decide when to seek medical help. The RICE method applies to sprains.",
      scene: "fractures",
      chapters: [
        { title: "Recognition", desc: "Identify the signs of a fracture" },
        { title: "Immobilisation", desc: "Stabilise the injury without moving it" },
        { title: "Sprain Management", desc: "Apply the RICE method for sprains" },
        { title: "When to Seek Help", desc: "Know when a fracture needs urgent care" }
      ],
      tasks: [
        { type: "select", label: "Which of these suggests a bone may be fractured?",
          options: ["Swelling, deformity, tenderness, and inability to bear weight or move the limb", "Slight redness with no pain", "A small bruise with full movement", "Mild stiffness that goes away in seconds"],
          correct: 0,
          explain: "Signs of a fracture include pain and tenderness, swelling and bruising, deformity or an unnatural angle, a snapping sound at the time of injury, loss of movement or function, and in open fractures, a wound with bone visible. A closed fracture has no break in the skin." },
        { type: "select", label: "How should you treat a suspected fracture before medical help arrives?",
          options: ["Try to push the bone back into place", "Immobilise the limb in the position found and support it with padding and bandages", "Move the limb to check if it hurts", "Apply heat to the area"],
          correct: 1,
          tool: "bandage",
          explain: "Do not try to realign the bone or move the limb. Immobilise it in the position you found it. Support the injury with soft padding and secure it with bandages above and below the fracture site (not directly over it). Handle the casualty gently to prevent further damage." },
        { type: "select", label: "For a sprain or strain, what does the RICE method stand for?",
          options: ["Rest, Ice, Compression, Elevation", "Run, Inspect, Cool, Examine", "Relax, Immobilise, Cover, Elevate", "Reassure, Ice, Call, Elevate"],
          correct: 0,
          explain: "RICE stands for Rest (stop the activity), Ice (apply a cold pack for 15–20 minutes), Compression (apply a supportive bandage), and Elevation (raise the injured part above heart level). This reduces swelling and pain in sprains and soft tissue injuries." },
        { type: "select", label: "A suspected fracture requires urgent medical attention when:",
          options: ["It is an open fracture (bone visible), or the limb is deformed, or there is loss of circulation below the injury", "It is just slightly sore", "The casualty can walk on it", "There is a tiny bruise"],
          correct: 0,
          tool: "phone",
          explain: "Seek urgent medical help for open fractures (bone through the skin), deformed limbs, suspected spinal or pelvic fractures, fractures of the femur or skull, or when there are signs of lost circulation below the injury (cold, pale, or blue skin, no pulse). Call 999." }
      ]
    },
    {
      id: "fa10", order: 10, tag: "EMERGENCY", icon: "📞",
      title: "Calling for Emergency Help",
      desc: "Learn how to call 999 effectively and provide the right information to emergency services.",
      xp: 90,
      brief: "Every first aider must know how to call for emergency help. In this mission, you will learn what information to give when calling 999, how to use the speakerphone for hands-free CPR, and what questions the operator will ask. Clear, accurate communication gets help to you faster.",
      scene: "emergency",
      chapters: [
        { title: "When to Call", desc: "Recognise emergencies that require a 999 call" },
        { title: "What to Say", desc: "Provide the right information to the operator" },
        { title: "Speakerphone", desc: "Use speakerphone for hands-free first aid" },
        { title: "Staying on the Line", desc: "Follow the operator's instructions" }
      ],
      tasks: [
        { type: "select", label: "Which of these situations requires calling 999 immediately?",
          options: ["A small paper cut", "A casualty who is unresponsive and not breathing normally", "A mild headache", "A small splinter"],
          correct: 0,
          tool: "phone",
          explain: "Call 999 for life-threatening emergencies: a casualty who is unresponsive and not breathing, severe bleeding that cannot be controlled, suspected heart attack or stroke, severe burns, major trauma, or any situation where life is at risk. For non-urgent concerns, call 111." },
        { type: "select", label: "When you call 999, what information should you give the operator first?",
          options: ["Your favourite colour", "Your location (as precise as possible) and the nature of the emergency", "Your shoe size", "What you had for breakfast"],
          correct: 1,
          explain: "Give your exact location first — this is the most critical piece of information. Then describe what has happened and the nature of the emergency. Be clear and concise. The operator will ask about the number of casualties, their condition, and any hazards at the scene." },
        { type: "select", label: "How should you use your phone when performing CPR?",
          options: ["Hold the phone to your ear with one hand while doing CPR with the other", "Put the phone on speakerphone so you can perform CPR hands-free while following the operator's guidance", "Put the phone away and do CPR alone", "Text the emergency services"],
          correct: 1,
          explain: "Put the phone on speakerphone so both your hands are free to perform CPR. The operator can talk you through the steps, count compressions with you, and tell you when the ambulance is approaching. Many operators are trained to coach CPR over the phone." },
        { type: "select", label: "After calling 999, what should you do?",
          options: ["Hang up immediately and wait outside", "Stay on the line and follow the operator's instructions until help arrives", "Turn off your phone to save battery", "Call all your friends to tell them"],
          correct: 0,
          explain: "Stay on the line with the operator. Do not hang up until they tell you to. They will give you real-time instructions, tell you when the ambulance is near, and may guide you through CPR or other first aid. If you need to leave the casualty to flag down the ambulance, tell the operator." }
      ]
    }
  ];

  // ==========================================================
  // LEARN ARTICLES — First aid knowledge base
  // ==========================================================
  const LEARN_ARTICLES = [
    { id: "art1",  cat: "Primary Survey", icon: "🩺", title: "The DRABC Primary Survey",          desc: "The systematic first approach to every casualty: Danger, Response, Airway, Breathing, Circulation.", xp: 15 },
    { id: "art2",  cat: "Primary Survey", icon: "⚠️", title: "Assessing Scene Safety",              desc: "How to evaluate and secure a scene before approaching a casualty. Your safety comes first.", xp: 10 },
    { id: "art3",  cat: "Primary Survey", icon: "👋", title: "Checking the Level of Response",       desc: "Using AVPU (Alert, Voice, Pain, Unresponsive) to assess a casualty's consciousness.", xp: 10 },
    { id: "art4",  cat: "Primary Survey", icon: "🫁", title: "Opening the Airway",                    desc: "The head-tilt chin-lift and jaw-thrust methods for opening an obstructed airway.", xp: 12 },
    { id: "art5",  cat: "CPR",            icon: "🫀", title: "CPR for Adults",                        desc: "The complete adult CPR protocol: hand position, depth, rate, and the 30:2 ratio.", xp: 20 },
    { id: "art6",  cat: "CPR",            icon: "👶", title: "CPR for Children and Infants",          desc: "Modifications to CPR technique for children under 8 and infants under 1 year.", xp: 18 },
    { id: "art7",  cat: "CPR",            icon: "⚡", title: "Using an AED (Defibrillator)",           desc: "How to use an Automated External Defibrillator safely and effectively.", xp: 20 },
    { id: "art8",  cat: "CPR",            icon: "🎵", title: "CPR Compression Rate and Rhythm",        desc: "Why 100–120 compressions per minute matters, and how to keep the right tempo.", xp: 12 },
    { id: "art9",  cat: "Bleeding",       icon: "🩸", title: "Types of Bleeding",                     desc: "Arterial, venous, and capillary bleeding — how to recognise each and what they mean.", xp: 12 },
    { id: "art10", cat: "Bleeding",       icon: "🩹", title: "Direct Pressure Technique",             desc: "How to apply effective direct pressure and dressings to control external bleeding.", xp: 15 },
    { id: "art11", cat: "Bleeding",       icon: "🔒", title: "Tourniquets: When and How",              desc: "The correct application of a tourniquet for catastrophic limb bleeding — a last resort.", xp: 18 },
    { id: "art12", cat: "Bleeding",       icon: "🧣", title: "Internal Bleeding and Bruising",          desc: "Recognising the signs of internal bleeding and when it is a medical emergency.", xp: 14 },
    { id: "art13", cat: "Choking",        icon: "😮‍💨", title: "Recognising Mild vs Severe Choking",    desc: "The difference between mild and severe airway obstruction and when to act.", xp: 12 },
    { id: "art14", cat: "Choking",        icon: "👋", title: "Back Blows Technique",                   desc: "How to deliver effective back blows to a conscious choking adult or child.", xp: 12 },
    { id: "art15", cat: "Choking",        icon: "🤜", title: "Abdominal Thrusts (Heimlich)",           desc: "The correct technique for abdominal thrusts and when to use them.", xp: 14 },
    { id: "art16", cat: "Choking",        icon: "👶", title: "Choking in Infants",                     desc: "Modified choking response for babies under 1 year — back blows and chest thrusts.", xp: 15 },
    { id: "art17", cat: "Heart Attack",   icon: "❤️‍🔥", title: "Heart Attack Signs and Symptoms",      desc: "Recognising the warning signs of a heart attack and the importance of early response.", xp: 16 },
    { id: "art18", cat: "Heart Attack",   icon: "🚑", title: "Heart Attack vs Cardiac Arrest",          desc: "The critical difference between a heart attack and cardiac arrest, and the different responses.", xp: 16 },
    { id: "art19", cat: "Recovery",       icon: "🛌", title: "The Recovery Position Step by Step",      desc: "A complete guide to placing an unconscious breathing casualty in the recovery position.", xp: 15 },
    { id: "art20", cat: "Recovery",       icon: "🫁", title: "Why the Recovery Position Saves Lives",   desc: "How the recovery position protects the airway and prevents aspiration in unconscious casualties.", xp: 12 },
    { id: "art21", cat: "Shock",          icon: "😰", title: "Understanding Shock",                    desc: "What happens to the body in shock and why it is a life-threatening condition.", xp: 14 },
    { id: "art22", cat: "Shock",          icon: "🧣", title: "Managing Hypovolaemic Shock",             desc: "The correct first aid response to blood-loss shock: positioning, warmth, and reassurance.", xp: 14 },
    { id: "art23", cat: "Burns",          icon: "🔥", title: "Burns: Cool, Call, Cover",                desc: "The three-step approach to burn first aid and why timing is critical.", xp: 15 },
    { id: "art24", cat: "Burns",          icon: "🚫", title: "Burn Treatment Myths to Avoid",           desc: "Common home remedies for burns that actually cause more harm than good.", xp: 12 },
    { id: "art25", cat: "Fractures",      icon: "🦴", title: "Recognising Fractures",                   desc: "The signs and symptoms of broken bones and how to tell a fracture from a sprain.", xp: 14 },
    { id: "art26", cat: "Fractures",      icon: "🩹", title: "The RICE Method for Sprains",             desc: "Rest, Ice, Compression, Elevation — the standard first aid for soft tissue injuries.", xp: 12 },
    { id: "art27", cat: "Emergency",      icon: "📞", title: "Calling 999 Effectively",                 desc: "What information to give, what questions to expect, and how to communicate clearly.", xp: 12 },
    { id: "art28", cat: "Emergency",      icon: "🆘", title: "The First Aider's Golden Rules",           desc: "The fundamental principles every first aider should follow: stay calm, stay safe, and act.", xp: 15 }
  ];

  // ==========================================================
  // BADGES (auto-generated from missions)
  // ==========================================================
  const FIRST_AID_BADGES = MISSIONS.map(function (m) {
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
      if (state.completedMissions.length >= MISSIONS.length && completed.indexOf(FIRST_AID_BADGE_ID) === -1) {
        completed.push(FIRST_AID_BADGE_ID);
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
      drabc: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1a0e0e"/>' +
        '<ellipse cx="300" cy="140" rx="200" ry="20" fill="rgba(217,75,75,0.08)"/>' +
        '<g transform="translate(220,50)">' +
          '<circle cx="30" cy="18" r="18" fill="#d4c4a0" stroke="#a89878" stroke-width="1"/>' +
          '<rect x="18" y="36" width="24" height="55" rx="8" fill="#4a9fd4" opacity="0.8"/>' +
          '<rect x="14" y="36" width="8" height="30" rx="3" fill="#4a9fd4" opacity="0.6"/>' +
          '<rect x="38" y="36" width="8" height="30" rx="3" fill="#4a9fd4" opacity="0.6"/>' +
          '<rect x="18" y="91" width="10" height="35" rx="3" fill="#2a1a1a"/>' +
          '<rect x="32" y="91" width="10" height="35" rx="3" fill="#2a1a1a"/>' +
        '</g>' +
        '<g transform="translate(380,60)">' +
          '<circle cx="20" cy="16" r="14" fill="#ff5a6e" opacity="0.7"/>' +
          '<text x="20" y="21" text-anchor="middle" font-size="16" fill="white" font-weight="bold">!</text>' +
          '<text x="20" y="45" text-anchor="middle" font-size="9" fill="#a89878" font-family="monospace">HAZARD?</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#6b5e44" font-family="monospace">SCENE: COLLAPSED CADET — PRIMARY SURVEY</text>' +
      '</svg>',
      cpr: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1a0e0e"/>' +
        '<ellipse cx="300" cy="160" rx="220" ry="15" fill="rgba(217,75,75,0.08)"/>' +
        '<g transform="translate(240,40)">' +
          '<circle cx="35" cy="18" r="18" fill="#d4c4a0" stroke="#a89878" stroke-width="1"/>' +
          '<rect x="22" y="36" width="26" height="70" rx="8" fill="#4a9fd4" opacity="0.8"/>' +
          '<ellipse cx="35" cy="50" rx="14" ry="10" fill="#d94b4b" opacity="0.6"/>' +
          '<circle cx="35" cy="50" r="8" fill="#ff6b6b" stroke="#fff3ce" stroke-width="1"/>' +
          '<text x="35" y="54" text-anchor="middle" font-size="10" fill="white" font-weight="bold">+</text>' +
        '</g>' +
        '<g transform="translate(370,55)">' +
          '<rect x="0" y="0" width="50" height="40" rx="8" fill="#ff5a6e" opacity="0.8"/>' +
          '<path d="M 8 20 L 18 20 L 18 8 L 32 8 L 32 20 L 42 20" stroke="white" stroke-width="2" fill="none"/>' +
          '<text x="25" y="35" text-anchor="middle" font-size="8" fill="white" font-family="monospace">CPR</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#6b5e44" font-family="monospace">SCENE: CARDIAC ARREST — CPR IN PROGRESS</text>' +
      '</svg>',
      bleeding: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1a0e0e"/>' +
        '<ellipse cx="300" cy="160" rx="200" ry="15" fill="rgba(255,90,110,0.1)"/>' +
        '<g transform="translate(200,40)">' +
          '<rect x="0" y="10" width="180" height="20" rx="10" fill="#d4c4a0" stroke="#a89878" stroke-width="1"/>' +
          '<rect x="80" y="10" width="30" height="20" fill="#ff5a6e" opacity="0.6"/>' +
          '<circle cx="90" cy="42" r="5" fill="#ff5a6e"/>' +
          '<circle cx="100" cy="48" r="3" fill="#ff5a6e" opacity="0.7"/>' +
          '<circle cx="95" cy="55" r="2" fill="#ff5a6e" opacity="0.5"/>' +
          '<text x="95" y="72" text-anchor="middle" font-size="8" fill="#ff5a6e" font-family="monospace">WOUND</text>' +
        '</g>' +
        '<g transform="translate(440,30)">' +
          '<rect x="0" y="0" width="40" height="50" rx="6" fill="#fff3ce" opacity="0.7"/>' +
          '<rect x="6" y="10" width="28" height="6" fill="#d94b4b" opacity="0.5"/>' +
          '<text x="20" y="35" text-anchor="middle" font-size="7" fill="#6b5e44" font-family="monospace">DRESSING</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#6b5e44" font-family="monospace">SCENE: LACERATION — BLEEDING CONTROL</text>' +
      '</svg>',
      choking: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1a0e0e"/>' +
        '<ellipse cx="300" cy="160" rx="180" ry="15" fill="rgba(74,159,212,0.08)"/>' +
        '<g transform="translate(260,35)">' +
          '<circle cx="30" cy="18" r="18" fill="#d4c4a0" stroke="#a89878" stroke-width="1"/>' +
          '<rect x="20" y="36" width="20" height="60" rx="8" fill="#4a9fd4" opacity="0.8"/>' +
          '<rect x="15" y="40" width="6" height="35" rx="3" fill="#4a9fd4" opacity="0.6"/>' +
          '<g transform="translate(24,30)">' +
            '<circle cx="6" cy="6" r="5" fill="#ff5a6e" opacity="0.8"/>' +
            '<text x="6" y="9" text-anchor="middle" font-size="7" fill="white" font-weight="bold">!</text>' +
          '</g>' +
          '<path d="M 30 60 Q 35 65 40 60" stroke="#ff5a6e" stroke-width="2" fill="none" opacity="0.5"/>' +
        '</g>' +
        '<g transform="translate(380,50)">' +
          '<text x="0" y="0" font-size="20" fill="#ff5a6e" font-weight="bold">!</text>' +
          '<text x="0" y="20" font-size="9" fill="#a89878" font-family="monospace">CANNOT</text>' +
          '<text x="0" y="32" font-size="9" fill="#a89878" font-family="monospace">BREATHE</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#6b5e44" font-family="monospace">SCENE: CHOKING CASUALTY — AIRWAY OBSTRUCTION</text>' +
      '</svg>',
      heart: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1a0e0e"/>' +
        '<ellipse cx="300" cy="160" rx="180" ry="15" fill="rgba(217,75,75,0.08)"/>' +
        '<g transform="translate(250,30)">' +
          '<circle cx="30" cy="20" r="18" fill="#d4c4a0" stroke="#a89878" stroke-width="1"/>' +
          '<rect x="18" y="38" width="24" height="65" rx="8" fill="#4a9fd4" opacity="0.8"/>' +
          '<g transform="translate(18,45)">' +
            '<path d="M 12 6 C 12 2, 6 2, 6 6 C 6 2, 0 2, 0 6 C 0 10, 6 14, 6 14 C 6 14, 12 10, 12 6 Z" fill="#ff5a6e" stroke="#fff3ce" stroke-width="0.5"/>' +
          '</g>' +
          '<path d="M 42 52 Q 48 52 48 58" stroke="#ff5a6e" stroke-width="1.5" fill="none" opacity="0.6"/>' +
        '</g>' +
        '<g transform="translate(380,50)">' +
          '<text x="0" y="0" font-size="14" fill="#ff5a6e" font-family="monospace">CHEST</text>' +
          '<text x="0" y="18" font-size="14" fill="#ff5a6e" font-family="monospace">PAIN!</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#6b5e44" font-family="monospace">SCENE: SUSPECTED HEART ATTACK — RECOGNITION</text>' +
      '</svg>',
      recovery: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1a0e0e"/>' +
        '<ellipse cx="300" cy="160" rx="200" ry="15" fill="rgba(56,217,123,0.08)"/>' +
        '<g transform="translate(220,70)">' +
          '<circle cx="20" cy="10" r="14" fill="#d4c4a0" stroke="#a89878" stroke-width="1"/>' +
          '<rect x="10" y="22" width="18" height="50" rx="8" fill="#4a9fd4" opacity="0.8" transform="rotate(15,19,47)"/>' +
          '<rect x="22" y="30" width="15" height="35" rx="6" fill="#4a9fd4" opacity="0.6" transform="rotate(40,29,47)"/>' +
          '<rect x="5" y="28" width="12" height="40" rx="5" fill="#4a9fd4" opacity="0.6" transform="rotate(-20,11,48)"/>' +
          '<rect x="10" y="70" width="14" height="30" rx="5" fill="#2a1a1a" transform="rotate(25,17,85)"/>' +
          '<rect x="22" y="70" width="14" height="30" rx="5" fill="#2a1a1a" transform="rotate(-10,29,85)"/>' +
        '</g>' +
        '<g transform="translate(400,45)">' +
          '<circle cx="20" cy="20" r="18" fill="none" stroke="#38d97b" stroke-width="2" opacity="0.6"/>' +
          '<text x="20" y="25" text-anchor="middle" font-size="16" fill="#38d97b" font-weight="bold">✓</text>' +
          '<text x="20" y="50" text-anchor="middle" font-size="8" fill="#38d97b" font-family="monospace">RECOVERY</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#6b5e44" font-family="monospace">SCENE: UNCONSCIOUS BREATHING — RECOVERY POSITION</text>' +
      '</svg>',
      shock: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1a0e0e"/>' +
        '<ellipse cx="300" cy="160" rx="200" ry="15" fill="rgba(255,180,84,0.08)"/>' +
        '<g transform="translate(250,50)">' +
          '<circle cx="30" cy="18" r="18" fill="#d4c4a0" stroke="#a89878" stroke-width="1" opacity="0.7"/>' +
          '<rect x="18" y="36" width="24" height="55" rx="8" fill="#4a9fd4" opacity="0.5"/>' +
          '<rect x="10" y="36" width="6" height="25" rx="3" fill="#4a9fd4" opacity="0.3"/>' +
          '<rect x="44" y="36" width="6" height="25" rx="3" fill="#4a9fd4" opacity="0.3"/>' +
        '</g>' +
        '<g transform="translate(370,40)">' +
          '<text x="0" y="0" font-size="12" fill="#ffb454" font-family="monospace">PALE</text>' +
          '<text x="0" y="15" font-size="12" fill="#ffb454" font-family="monospace">COLD</text>' +
          '<text x="0" y="30" font-size="12" fill="#ffb454" font-family="monospace">CLAMMY</text>' +
        '</g>' +
        '<g transform="translate(450,30)">' +
          '<path d="M 5 20 Q 5 5, 20 5 Q 35 5, 35 20" stroke="#ffb454" stroke-width="2" fill="none"/>' +
          '<rect x="0" y="15" width="5" height="10" fill="#ffb454"/>' +
          '<rect x="35" y="15" width="5" height="10" fill="#ffb454"/>' +
          '<text x="20" y="45" text-anchor="middle" font-size="7" fill="#ffb454" font-family="monospace">BLANKET</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#6b5e44" font-family="monospace">SCENE: CASUALTY IN SHOCK — WARM & MONITOR</text>' +
      '</svg>',
      burns: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1a0e0e"/>' +
        '<ellipse cx="300" cy="160" rx="200" ry="15" fill="rgba(255,90,110,0.08)"/>' +
        '<g transform="translate(220,40)">' +
          '<rect x="0" y="0" width="60" height="80" rx="10" fill="#d4c4a0" stroke="#a89878" stroke-width="1"/>' +
          '<circle cx="30" cy="30" r="18" fill="#ff5a6e" opacity="0.5"/>' +
          '<circle cx="30" cy="30" r="10" fill="#ff5a6e" opacity="0.7"/>' +
          '<circle cx="30" cy="30" r="4" fill="#fff3ce" opacity="0.5"/>' +
        '</g>' +
        '<g transform="translate(350,35)">' +
          '<path d="M 0 50 Q 10 0, 20 20 Q 30 0, 40 50" stroke="#4a9fd4" stroke-width="2.5" fill="none"/>' +
          '<text x="20" y="68" text-anchor="middle" font-size="8" fill="#4a9fd4" font-family="monospace">COOL WATER</text>' +
        '</g>' +
        '<g transform="translate(440,40)">' +
          '<rect x="0" y="0" width="30" height="40" rx="4" fill="#fff3ce" opacity="0.6"/>' +
          '<text x="15" y="55" text-anchor="middle" font-size="7" fill="#6b5e44" font-family="monospace">CLING FILM</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#6b5e44" font-family="monospace">SCENE: BURN TO HAND — COOL, CALL, COVER</text>' +
      '</svg>',
      fractures: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1a0e0e"/>' +
        '<ellipse cx="300" cy="160" rx="200" ry="15" fill="rgba(255,180,84,0.08)"/>' +
        '<g transform="translate(230,40)">' +
          '<circle cx="35" cy="18" r="16" fill="#d4c4a0" stroke="#a89878" stroke-width="1"/>' +
          '<rect x="22" y="34" width="26" height="55" rx="8" fill="#4a9fd4" opacity="0.7"/>' +
        '</g>' +
        '<g transform="translate(200,85)">' +
          '<rect x="0" y="0" width="100" height="14" rx="7" fill="#d4c4a0" stroke="#a89878" stroke-width="1"/>' +
          '<path d="M 45 7 L 50 2 L 55 7 L 50 12 Z" fill="#ff5a6e"/>' +
          '<line x1="45" y1="0" x2="45" y2="14" stroke="#ff5a6e" stroke-width="1" opacity="0.5"/>' +
          '<line x1="55" y1="0" x2="55" y2="14" stroke="#ff5a6e" stroke-width="1" opacity="0.5"/>' +
          '<text x="50" y="25" text-anchor="middle" font-size="8" fill="#ff5a6e" font-family="monospace">FRACTURE</text>' +
        '</g>' +
        '<g transform="translate(420,50)">' +
          '<rect x="0" y="0" width="50" height="14" rx="7" fill="#ffb454" opacity="0.5"/>' +
          '<rect x="0" y="18" width="50" height="14" rx="7" fill="#ffb454" opacity="0.5"/>' +
          '<text x="25" y="45" text-anchor="middle" font-size="7" fill="#ffb454" font-family="monospace">SPLINT</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#6b5e44" font-family="monospace">SCENE: SUSPECTED FRACTURE — IMMOBILISE</text>' +
      '</svg>',
      emergency: '<svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="600" height="180" fill="#1a0e0e"/>' +
        '<ellipse cx="300" cy="160" rx="200" ry="15" fill="rgba(217,75,75,0.08)"/>' +
        '<g transform="translate(240,35)">' +
          '<rect x="0" y="0" width="60" height="100" rx="10" fill="#2e1a1a" stroke="#6b2828" stroke-width="2"/>' +
          '<rect x="6" y="10" width="48" height="55" rx="4" fill="#0d0606"/>' +
          '<text x="30" y="38" text-anchor="middle" font-size="18" fill="#d94b4b" font-weight="bold">999</text>' +
          '<text x="30" y="52" text-anchor="middle" font-size="7" fill="#a89878" font-family="monospace">EMERGENCY</text>' +
          '<circle cx="18" cy="78" r="6" fill="#d4c4a0" opacity="0.6"/>' +
          '<circle cx="42" cy="78" r="6" fill="#d4c4a0" opacity="0.6"/>' +
          '<circle cx="30" cy="90" r="5" fill="#ff5a6e"/>' +
        '</g>' +
        '<g transform="translate(360,50)">' +
          '<path d="M 0 30 Q 0 0, 30 0 Q 60 0, 60 30" stroke="#38d97b" stroke-width="2" fill="none"/>' +
          '<circle cx="30" cy="35" r="5" fill="#38d97b"/>' +
          '<text x="30" y="55" text-anchor="middle" font-size="8" fill="#38d97b" font-family="monospace">CALL</text>' +
        '</g>' +
        '<text x="300" y="172" text-anchor="middle" font-size="10" fill="#6b5e44" font-family="monospace">SCENE: CALLING 999 — CLEAR COMMUNICATION</text>' +
      '</svg>'
    };
    return scenes[sceneType] || scenes.drabc;
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

    // Threat fill based on progress
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
      const prog = state.missionProgress[m.id] || 0;
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
        '<div class="cc-sub">You have completed all tasks for ' + escapeHTML(m.title) + '. File a SITREP to log your training experience, or try the Emergency Response Simulator.</div>' +
        '<div class="cc-stats"><div class="cc-stat"><div class="v">+' + m.xp + '</div><div class="l">XP EARNED</div></div><div class="cc-stat"><div class="v">' + m.tasks.length + '</div><div class="l">TASKS DONE</div></div></div>' +
        '<div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;"><button class="btn btn-primary" onclick="document.getElementById(\'fileSitrepBtn\').scrollIntoView();">📝 File SITREP</button><button class="btn btn-ghost" id="retryMissionBtn">↻ Retry Mission</button><button class="btn btn-gold" id="goSimulatorBtn">🚑 Try Simulator</button></div>' +
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
        return '<button class="bleed-action-btn" data-opt-idx="' + o.originalIndex + '" type="button">' + escapeHTML(o.text) + '</button>';
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
  // EMERGENCY RESPONSE SIMULATOR — Interactive First Aid Game
  // 5 hands-on modes (no multiple-choice quizzes)
  // ==========================================================

  const er = {
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
    drabc: { stepIndex: 0, steps: [], answered: false },
    cpr: { compressions: [], running: false, startTime: 0, raf: null, targetCount: 30, beatInterval: 545, lastBeat: 0, beatsPlayed: 0 },
    bleed: { bleedLevel: 90, stepIndex: 0, correctSteps: [], answered: false, timer: null },
    choke: { stepIndex: 0, answered: false, count: 0 },
    recovery: { stepIndex: 0, answered: false },
    timer: { raf: null, start: 0, duration: 0, running: false }
  };

  const ER_MODES = [
    { id: "drabc",     label: "PRIMARY SURVEY",    icon: "🩺", type: "type-drabc",
      title: "Run the DRABC Primary Survey", tip: "Assess the casualty through each stage: Danger, Response, Airway, Breathing, Circulation. Choose the correct action at each step." },
    { id: "cpr",       label: "CPR RHYTHM",        icon: "🫀", type: "type-cpr",
      title: "Perform 30 Chest Compressions", tip: "Tap the compress button at 100–120 compressions per minute. Match the rhythm for 30 compressions. Too fast or too slow is a fault." },
    { id: "bleed",     label: "BLEEDING CONTROL",  icon: "🩸", type: "type-bleed",
      title: "Control Severe Bleeding", tip: "Apply treatment steps in the correct order. The bleeding meter is rising — act quickly before the casualty deteriorates." },
    { id: "choke",     label: "CHOKING RESPONSE",  icon: "😮‍💨", type: "type-choke",
      title: "Respond to a Choking Casualty", tip: "Assess the casualty and choose the correct technique. Alternate back blows and abdominal thrusts in the right sequence." },
    { id: "recovery",  label: "RECOVERY POSITION", icon: "🛌", type: "type-recovery",
      title: "Place Casualty in Recovery Position", tip: "Follow each step in sequence to place an unconscious breathing casualty in the recovery position. Protect the airway." }
  ];

  function erLoadStats() {
    try {
      const raw = localStorage.getItem(SK.erGame);
      if (raw) {
        const d = JSON.parse(raw);
        er.bestStreak = d.bestStreak || 0;
        er.score = d.score || 0;
        er.correct = d.correct || 0;
        er.wrong = d.wrong || 0;
        er.round = d.round || 0;
      }
    } catch (e) {}
  }

  function erSaveStats() {
    try {
      localStorage.setItem(SK.erGame, JSON.stringify({
        bestStreak: er.bestStreak,
        score: er.score,
        correct: er.correct,
        wrong: er.wrong,
        round: er.round
      }));
    } catch (e) {}
  }

  function erSetFeedback(msg, kind) {
    const fb = document.getElementById("erFeedback");
    if (!fb) return;
    fb.className = "er-feedback " + (kind || "info");
    fb.innerHTML = msg;
  }

  function erSetModeBadge(modeId, title) {
    const badge = document.getElementById("erModeBadge");
    const titleEl = document.getElementById("erChallengeTitle");
    if (!badge || !titleEl) return;
    if (modeId) {
      const mode = ER_MODES.find(function (m) { return m.id === modeId; });
      if (mode) {
        badge.className = "er-mode-badge " + mode.type;
        badge.textContent = mode.label;
        titleEl.textContent = mode.title;
        titleEl.classList.remove("flash");
        void titleEl.offsetWidth;
        titleEl.classList.add("flash");
      }
    } else {
      badge.className = "er-mode-badge idle";
      badge.textContent = "SELECT MODE";
      titleEl.textContent = title || "Ready at the first aid station";
    }
  }

  function erSetPatientState(state, icon) {
    const stateEl = document.getElementById("erPatientState");
    const icoEl = document.getElementById("erPatientIco");
    if (stateEl) { stateEl.textContent = state; stateEl.className = "er-patient-state " + (erGetStateClass(state)); }
    if (icoEl) icoEl.textContent = icon || "🧍";
  }

  function erGetStateClass(s) {
    if (s.indexOf("Stable") !== -1 || s.indexOf("Recovering") !== -1 || s.indexOf("Placed") !== -1) return "stable";
    if (s.indexOf("Critical") !== -1 || s.indexOf("Arrest") !== -1 || s.indexOf("Severe") !== -1) return "critical";
    if (s.indexOf("Monitoring") !== -1 || s.indexOf("Assessing") !== -1 || s.indexOf("Responding") !== -1) return "monitoring";
    return "monitoring";
  }

  function erUpdateStats() {
    const set = function (id, v) { const el = document.getElementById(id); if (el) el.textContent = v; };
    set("erScore", er.score);
    set("erCorrect", er.correct);
    set("erWrong", er.wrong);
    set("erStreak", er.streak);
    set("erRound", er.round);
  }

  function erAddLog(text, ok, score) {
    const list = document.getElementById("erLogList");
    if (!list) return;
    if (list.querySelector(".muted")) list.innerHTML = "";
    const item = document.createElement("div");
    item.className = "er-log-item " + (ok ? "ok" : "bad");
    const modeLabel = er.currentMode ? ER_MODES.find(function (m) { return m.id === er.currentMode; }) : null;
    const ico = ok ? "✅" : "❌";
    item.innerHTML = '<span class="er-log-ico">' + ico + '</span>' +
      '<span class="er-log-text">' + (modeLabel ? modeLabel.label + " — " : "") +
      escapeHTML(text) + (score !== undefined ? ' <span class="score">[' + score + ']</span>' : '') + '</span>';
    list.insertBefore(item, list.firstChild);
    while (list.children.length > 20) list.removeChild(list.lastChild);
  }

  // -- Timer helpers --
  function erStartTimer(durationSec, onTick, onEnd) {
    erStopTimer();
    er.timer.running = true;
    er.timer.start = performance.now();
    er.timer.duration = durationSec * 1000;
    function tick() {
      if (!er.timer.running) return;
      const elapsed = performance.now() - er.timer.start;
      const remaining = er.timer.duration - elapsed;
      const pct = Math.max(0, Math.min(100, (elapsed / er.timer.duration) * 100));
      const fill = document.getElementById("erTimerFill");
      const text = document.getElementById("erTimerText");
      if (fill) fill.style.width = pct + "%";
      if (text) text.textContent = Math.max(0, (remaining / 1000)).toFixed(1) + "s";
      if (onTick) onTick(elapsed, remaining);
      if (remaining <= 0) {
        er.timer.running = false;
        if (fill) fill.style.width = "100%";
        if (text) text.textContent = "0.0s";
        if (onEnd) onEnd();
        return;
      }
      er.timer.raf = requestAnimationFrame(tick);
    }
    er.timer.raf = requestAnimationFrame(tick);
  }

  function erStopTimer() {
    er.timer.running = false;
    if (er.timer.raf) cancelAnimationFrame(er.timer.raf);
    er.timer.raf = null;
  }

  function erResetTimerDisplay() {
    const fill = document.getElementById("erTimerFill");
    const text = document.getElementById("erTimerText");
    if (fill) fill.style.width = "0%";
    if (text) text.textContent = "—";
  }

  // -- Challenge lifecycle --
  function erStartTraining() {
    erStopAllAnimations();
    er.active = true;
    er.examMode = false;
    er.score = 0;
    er.correct = 0;
    er.wrong = 0;
    er.streak = 0;
    er.round = 0;
    er.totalRounds = 0;
    er.challengePool = shuffleArray(ER_MODES.map(function (m) { return m.id; }));
    er.poolIndex = 0;
    erUpdateStats();
    document.getElementById("erStartBtn").disabled = true;
    document.getElementById("erExamBtn").disabled = true;
    document.getElementById("erNextBtn").disabled = true;
    erNextMode();
  }

  function erStartExamMode() {
    erStopAllAnimations();
    er.active = true;
    er.examMode = true;
    er.score = 0;
    er.correct = 0;
    er.wrong = 0;
    er.streak = 0;
    er.round = 0;
    er.totalRounds = 5;
    er.challengePool = [];
    for (let i = 0; i < 5; i++) {
      er.challengePool.push(ER_MODES[Math.floor(Math.random() * ER_MODES.length)].id);
    }
    er.poolIndex = 0;
    erUpdateStats();
    document.getElementById("erStartBtn").disabled = true;
    document.getElementById("erExamBtn").disabled = true;
    document.getElementById("erNextBtn").disabled = true;
    erSetFeedback("<strong>EXAM MODE</strong> — 5 rounds, random scenarios. Qualify with 4 out of 5. The hut is open!", "info");
    setTimeout(function () { erNextMode(); }, 800);
  }

  function erNextMode() {
    erStopAllAnimations();
    if (er.poolIndex >= er.challengePool.length) {
      erFinishTraining();
      return;
    }
    er.currentMode = er.challengePool[er.poolIndex];
    er.poolIndex++;
    er.round++;
    er.challengeDone = false;
    erUpdateStats();
    document.getElementById("erNextBtn").disabled = true;
    erSetModeBadge(er.currentMode);
    const mode = ER_MODES.find(function (m) { return m.id === er.currentMode; });
    erSetFeedback("<strong>" + mode.label + "</strong> — " + mode.tip, "info");

    if (er.currentMode === "drabc") renderDRABCChallenge();
    else if (er.currentMode === "cpr") renderCPRChallenge();
    else if (er.currentMode === "bleed") renderBleedingChallenge();
    else if (er.currentMode === "choke") renderChokingChallenge();
    else if (er.currentMode === "recovery") renderRecoveryChallenge();
  }

  function erHandleResult(success, scoreVal, detailText) {
    if (er.challengeDone) return;
    er.challengeDone = true;
    erStopAllAnimations();
    erStopTimer();
    erResetTimerDisplay();
    if (success) {
      er.correct++;
      er.streak++;
      if (er.streak > er.bestStreak) er.bestStreak = er.streak;
      er.score += scoreVal || 10;
      erSetFeedback("✅ <strong>WELL DONE!</strong> " + detailText + " +" + (scoreVal || 10) + " points.", "ok");
      erAddLog(detailText, true, scoreVal || 10);
      erSetPatientState("Recovering", "😊");
    } else {
      er.wrong++;
      er.streak = 0;
      erSetFeedback("❌ <strong>INCORRECT.</strong> " + detailText, "err");
      erAddLog(detailText, false, 0);
      erSetPatientState("Critical", "😰");
    }
    recordAttempt(success);
    erUpdateStats();
    erSaveStats();
    renderSidebar();
    renderTopStats();
    renderAnalysis();
    document.getElementById("erNextBtn").disabled = false;
  }

  function erFinishTraining() {
    er.active = false;
    erStopAllAnimations();
    er.currentMode = null;
    erSetModeBadge(null, "Training Complete");
    erResetTimerDisplay();
    document.getElementById("erStartBtn").disabled = false;
    document.getElementById("erExamBtn").disabled = false;
    document.getElementById("erNextBtn").disabled = true;
    const total = er.correct + er.wrong;
    const pct = total > 0 ? Math.round((er.correct / total) * 100) : 0;
    let msg = "";
    if (er.examMode) {
      if (er.correct >= 4) {
        msg = "<strong>QUALIFIED!</strong> You passed the first aid exam with " + er.correct + "/5. Score: " + er.score + ". You are a competent first aider.";
        addXP(50);
        saveState();
        renderSidebar(); renderTopStats(); renderCommand();
        showToast("First Aid Exam Passed! +50 XP", "🏆");
        erSetPatientState("Stable", "✅");
      } else {
        msg = "<strong>NOT YET QUALIFIED.</strong> You scored " + er.correct + "/5. You need 4/5 to pass. Keep practising — every rep builds confidence.";
        erSetPatientState("Needs Training", "📚");
      }
    } else {
      if (pct >= 80) {
        msg = "<strong>OUTSTANDING!</strong> " + er.correct + "/" + total + " correct (" + pct + "%). Score: " + er.score + ". Try Exam Mode for formal qualification.";
        erSetPatientState("Stable", "✅");
      } else if (pct >= 50) {
        msg = "<strong>SOLID EFFORT.</strong> " + er.correct + "/" + total + " correct (" + pct + "%). Score: " + er.score + ". Review the Learn library and try again.";
        erSetPatientState("Monitoring", "👀");
      } else {
        msg = "<strong>KEEP TRAINING.</strong> " + er.correct + "/" + total + " correct (" + pct + "%). Study the fundamentals and practise each mode.";
        erSetPatientState("Needs Training", "📚");
      }
    }
    erSetFeedback(msg, pct >= 50 ? "ok" : "err");
    const area = document.getElementById("erChallengeArea");
    if (area) area.innerHTML = '<div class="er-idle-prompt">' +
      '<div class="er-idle-ico">🚑</div>' +
      '<h2>Training Complete</h2>' +
      '<p style="color:var(--ink-2); font-size:13px; line-height:1.6;">' + msg.replace(/<[^>]+>/g, "") + '</p>' +
      '<p class="muted" style="font-size:12px; margin-top:14px;">Press <strong>Start Training</strong> for another round, or <strong>Exam Mode</strong> for the formal test.</p>' +
      '</div>';
  }

  function erReset() {
    erStopAllAnimations();
    er.active = false;
    er.examMode = false;
    er.currentMode = null;
    er.score = 0;
    er.correct = 0;
    er.wrong = 0;
    er.streak = 0;
    er.round = 0;
    er.challengePool = [];
    er.poolIndex = 0;
    erResetTimerDisplay();
    erSetModeBadge(null);
    erUpdateStats();
    erSetFeedback("Simulator reset. Press <strong>Start Training</strong> to begin.", "info");
    erSetPatientState("Awaiting Patient", "🧍");
    document.getElementById("erStartBtn").disabled = false;
    document.getElementById("erExamBtn").disabled = false;
    document.getElementById("erNextBtn").disabled = true;
    renderERGame();
  }

  function erStopAllAnimations() {
    erStopTimer();
    if (er.cpr.raf) { cancelAnimationFrame(er.cpr.raf); er.cpr.raf = null; }
    if (er.bleed.timer) { clearInterval(er.bleed.timer); er.bleed.timer = null; }
    er.cpr.running = false;
  }

  // ==========================================================
  // MODE 1: PRIMARY SURVEY (DRABC)
  // Step through Danger, Response, Airway, Breathing, Circulation
  // ==========================================================
  function renderDRABCChallenge() {
    const area = document.getElementById("erChallengeArea");
    if (!area) return;
    erSetPatientState("Assessing", "🧍");

    const steps = [
      {
        letter: "D", name: "DANGER",
        scenario: "You arrive at a scene where a cadet has collapsed near a training area. There is a fallen power line nearby.",
        question: "What is your FIRST action?",
        options: [
          { text: "Rush to the casualty immediately", ico: "🏃", correct: false },
          { text: "Check for danger and ensure the scene is safe", ico: "⚠️", correct: true },
          { text: "Check if they are breathing", ico: "🫁", correct: false },
          { text: "Call 999 right away", ico: "📞", correct: false }
        ]
      },
      {
        letter: "R", name: "RESPONSE",
        scenario: "The scene is now safe. You approach the casualty. They appear motionless.",
        question: "How do you check their response?",
        options: [
          { text: "Gently shake shoulders and shout 'Can you hear me?'", ico: "👋", correct: true },
          { text: "Pour water on their face", ico: "💧", correct: false },
          { text: "Check their pulse first", ico: "🩺", correct: false },
          { text: "Slap their cheeks hard", ico: "🤚", correct: false }
        ]
      },
      {
        letter: "A", name: "AIRWAY",
        scenario: "The casualty does not respond. They are unresponsive.",
        question: "How do you open the airway?",
        options: [
          { text: "Turn them onto their front", ico: "🔄", correct: false },
          { text: "Head-tilt, chin-lift manoeuvre", ico: "🫁", correct: true },
          { text: "Push down on the forehead", ico: "⬇️", correct: false },
          { text: "Pull their tongue forward", ico: "👅", correct: false }
        ]
      },
      {
        letter: "B", name: "BREATHING",
        scenario: "The airway is now open. You need to check if the casualty is breathing.",
        question: "How long should you check for breathing?",
        options: [
          { text: "At least 2 minutes", ico: "⏰", correct: false },
          { text: "No more than 10 seconds", ico: "⏱️", correct: true },
          { text: "2 seconds only", ico: "⚡", correct: false },
          { text: "30 seconds", ico: "🕐", correct: false }
        ]
      },
      {
        letter: "C", name: "CIRCULATION",
        scenario: "The casualty is not breathing normally. You also notice a deep cut on their arm with significant bleeding.",
        question: "What should you prioritise?",
        options: [
          { text: "Start CPR immediately and send for an AED", ico: "🫀", correct: true },
          { text: "Treat the bleeding first, then CPR", ico: "🩸", correct: false },
          { text: "Leave to find a first aid kit", ico: "🏃", correct: false },
          { text: "Wait for the ambulance before acting", ico: "⏳", correct: false }
        ]
      }
    ];

    er.drabc.stepIndex = 0;
    er.drabc.steps = steps;
    er.drabc.answered = false;

    function renderStep() {
      const step = steps[er.drabc.stepIndex];
      erSetPatientState("Assessing: " + step.name, "🩺");
      area.innerHTML =
        '<div class="drabc-wrap">' +
          '<div class="drabc-casualty">' +
            '<svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg">' +
              '<rect width="520" height="160" fill="transparent"/>' +
              '<ellipse cx="260" cy="140" rx="160" ry="14" fill="rgba(217,75,75,0.08)"/>' +
              '<g transform="translate(210,35)">' +
                '<circle cx="28" cy="16" r="16" fill="#d4c4a0" stroke="#a89878" stroke-width="1"/>' +
                '<rect x="16" y="32" width="24" height="55" rx="8" fill="#4a9fd4" opacity="0.7"/>' +
                '<rect x="12" y="32" width="8" height="28" rx="3" fill="#4a9fd4" opacity="0.5"/>' +
                '<rect x="36" y="32" width="8" height="28" rx="3" fill="#4a9fd4" opacity="0.5"/>' +
              '</g>' +
              '<g transform="translate(320,40)">' +
                '<circle cx="20" cy="20" r="16" fill="none" stroke="' + (step.letter === "D" ? "#ff5a6e" : "#38d97b") + '" stroke-width="2"/>' +
                '<text x="20" y="26" text-anchor="middle" font-size="16" fill="' + (step.letter === "D" ? "#ff5a6e" : "#38d97b") + '" font-weight="bold">' + step.letter + '</text>' +
              '</g>' +
            '</svg>' +
          '</div>' +
          '<div class="drabc-step-banner"><span class="letter">' + step.letter + '</span>' + step.name + '</div>' +
          '<div class="drabc-scenario">' + escapeHTML(step.scenario) + '</div>' +
          '<div class="drabc-question">' + escapeHTML(step.question) + '</div>' +
          '<div class="drabc-options" id="drabcOptions">' +
            shuffleArray(step.options).map(function (opt, i) {
              return '<button class="drabc-option-btn" data-correct="' + opt.correct + '" type="button"><span class="opt-ico">' + opt.ico + '</span>' + escapeHTML(opt.text) + '</button>';
            }).join("") +
          '</div>' +
        '</div>';

      area.querySelectorAll(".drabc-option-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (er.drabc.answered) return;
          er.drabc.answered = true;
          const isCorrect = btn.dataset.correct === "true";
          area.querySelectorAll(".drabc-option-btn").forEach(function (b) { b.disabled = true; });
          if (isCorrect) {
            btn.classList.add("correct");
            er.drabc.stepIndex++;
            if (er.drabc.stepIndex >= steps.length) {
              erSetPatientState("Stable", "✅");
              erHandleResult(true, 12, "Primary survey completed correctly — all 5 stages of DRABC assessed in the right order.");
            } else {
              erSetFeedback("✅ Correct! " + step.name + " assessed. Moving to next stage...", "ok");
              setTimeout(function () { er.drabc.answered = false; renderStep(); }, 1200);
            }
          } else {
            btn.classList.add("wrong");
            area.querySelectorAll(".drabc-option-btn").forEach(function (b) {
              if (b.dataset.correct === "true") b.classList.add("correct");
            });
            erHandleResult(false, 0, "Incorrect at " + step.name + " stage. The correct action was to " + step.options.find(function (o) { return o.correct; }).text.toLowerCase() + ".");
          }
        });
      });
    }

    renderStep();
    erStartTimer(45, null, function () {
      if (!er.challengeDone) {
        erHandleResult(false, 0, "Time expired — the primary survey was not completed. Work through DRABC quickly but carefully.");
      }
    });
  }

  // ==========================================================
  // MODE 2: CPR RHYTHM
  // Tap the compress button at 100-120 BPM for 30 compressions
  // ==========================================================
  function renderCPRChallenge() {
    const area = document.getElementById("erChallengeArea");
    if (!area) return;
    erSetPatientState("Cardiac Arrest", "🫀");

    er.cpr.compressions = [];
    er.cpr.running = true;
    er.cpr.startTime = performance.now();
    er.cpr.beatsPlayed = 0;
    // 110 BPM = 1 beat every 545ms. We use visual beat markers.
    const TARGET_BPM = 110;
    const BEAT_INTERVAL = 60000 / TARGET_BPM; // ~545ms

    area.innerHTML =
      '<div class="cpr-wrap">' +
        '<div class="cpr-heart-visual">' +
          '<svg class="cpr-heart-svg" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">' +
            '<path class="cpr-heart-body" id="cprHeartBody" d="M 100 140 C 100 100, 30 90, 30 55 C 30 30, 60 20, 100 55 C 140 20, 170 30, 170 55 C 170 90, 100 100, 100 140 Z"/>' +
            '<text x="100" y="75" text-anchor="middle" font-size="28" fill="white" font-weight="bold">+</text>' +
          '</svg>' +
        '</div>' +
        '<div class="cpr-rhythm-track" id="cprRhythmTrack">' +
          '<div class="cpr-rhythm-line" id="cprRhythmLine"></div>' +
        '</div>' +
        '<div class="cpr-tempo-display" id="cprTempoDisplay">— BPM</div>' +
        '<button class="cpr-compress-btn" id="cprCompressBtn" type="button">COMPRESS</button>' +
        '<div class="cpr-counter">Compressions: <span class="val" id="cprCount">0</span>/30</div>' +
        '<p class="cpr-instruction">Tap <strong>COMPRESS</strong> at 100–120 beats per minute. Match the rhythm for 30 compressions. The beat of "Stayin\' Alive" is the right tempo.</p>' +
      '</div>';

    const compressBtn = document.getElementById("cprCompressBtn");
    const heartBody = document.getElementById("cprHeartBody");
    const countEl = document.getElementById("cprCount");
    const tempoDisplay = document.getElementById("cprTempoDisplay");
    const rhythmLine = document.getElementById("cprRhythmLine");
    const trackEl = document.getElementById("cprRhythmTrack");

    function addBeatMarker(isUser) {
      const marker = document.createElement("div");
      marker.className = "cpr-beat-marker" + (isUser ? " user" : "");
      const trackRect = trackEl.getBoundingClientRect();
      const lineLeft = rhythmLine.offsetLeft;
      marker.style.left = lineLeft + "px";
      trackEl.appendChild(marker);
      // Animate the marker moving left and fading
      const startTime = performance.now();
      function animateMarker() {
        if (!er.cpr.running) return;
        const elapsed = performance.now() - startTime;
        const progress = elapsed / 2000; // 2 seconds to cross
        if (progress >= 1) { marker.remove(); return; }
        marker.style.left = (lineLeft - progress * lineLeft) + "px";
        marker.style.opacity = String(1 - progress * 0.7);
        requestAnimationFrame(animateMarker);
      }
      requestAnimationFrame(animateMarker);
    }

    // Generate visual beat markers at target BPM
    function beatLoop() {
      if (!er.cpr.running) return;
      const now = performance.now();
      if (now - er.cpr.lastBeat >= BEAT_INTERVAL) {
        er.cpr.lastBeat = now;
        er.cpr.beatsPlayed++;
        addBeatMarker(false);
        // Heart pulse
        if (heartBody) { heartBody.classList.add("beat"); setTimeout(function () { heartBody.classList.remove("beat"); }, 120); }
      }
      er.cpr.raf = requestAnimationFrame(beatLoop);
    }
    er.cpr.lastBeat = performance.now();
    er.cpr.raf = requestAnimationFrame(beatLoop);

    let compressCount = 0;
    compressBtn.addEventListener("click", function () {
      if (!er.cpr.running || compressCount >= 30) return;
      const now = performance.now();
      er.cpr.compressions.push(now);
      compressCount++;
      if (countEl) countEl.textContent = compressCount;
      addBeatMarker(true);
      // Heart pulse on compress
      if (heartBody) { heartBody.classList.add("beat"); setTimeout(function () { heartBody.classList.remove("beat"); }, 120); }
      compressBtn.classList.add("pressed");
      setTimeout(function () { compressBtn.classList.remove("pressed"); }, 100);

      // Calculate BPM from intervals (need at least 2 compressions)
      if (er.cpr.compressions.length >= 2) {
        const intervals = [];
        for (let i = 1; i < er.cpr.compressions.length; i++) {
          intervals.push(er.cpr.compressions[i] - er.cpr.compressions[i - 1]);
        }
        const avgInterval = intervals.reduce(function (a, b) { return a + b; }, 0) / intervals.length;
        const bpm = Math.round(60000 / avgInterval);
        if (tempoDisplay) {
          tempoDisplay.textContent = bpm + " BPM";
          tempoDisplay.className = "cpr-tempo-display " + (bpm >= 100 && bpm <= 120 ? "good" : bpm < 100 ? "slow" : "fast");
        }
      }

      if (compressCount >= 30) {
        er.cpr.running = false;
        compressBtn.disabled = true;
        compressBtn.textContent = "COMPLETE";
        // Evaluate average BPM
        const intervals = [];
        for (let i = 1; i < er.cpr.compressions.length; i++) {
          intervals.push(er.cpr.compressions[i] - er.cpr.compressions[i - 1]);
        }
        const avgInterval = intervals.reduce(function (a, b) { return a + b; }, 0) / intervals.length;
        const bpm = Math.round(60000 / avgInterval);
        // Count how many intervals were in range
        const inRange = intervals.filter(function (iv) {
          const ibpm = 60000 / iv;
          return ibpm >= 100 && ibpm <= 120;
        }).length;
        const pct = Math.round((inRange / intervals.length) * 100);
        if (pct >= 70) {
          erSetPatientState("Recovering", "😊");
          erHandleResult(true, 15, "Excellent CPR rhythm — " + bpm + " BPM average, " + pct + "% of compressions in the 100–120 range. Effective chest compressions.");
        } else if (pct >= 50) {
          erSetPatientState("Monitoring", "👀");
          erHandleResult(true, 10, "Acceptable CPR rhythm — " + bpm + " BPM average, " + pct + "% in range. Aim for steadier timing.");
        } else {
          erSetPatientState("Critical", "😰");
          erHandleResult(false, 0, "CPR rhythm too inconsistent — " + bpm + " BPM average, only " + pct + "% in the 100–120 range. Compressions must be steady at 100–120 per minute.");
        }
      }
    });

    erStartTimer(30, null, function () {
      if (!er.challengeDone) {
        er.cpr.running = false;
        erHandleResult(false, 0, "Time expired — you did not complete 30 compressions. CPR must be continuous and effective.");
      }
    });
  }

  // ==========================================================
  // MODE 3: BLEEDING CONTROL
  // Apply treatment steps in the correct order; bleeding meter rises
  // ==========================================================
  function renderBleedingChallenge() {
    const area = document.getElementById("erChallengeArea");
    if (!area) return;
    erSetPatientState("Severe Bleeding", "🩸");

    const correctOrder = [
      { id: "gloves", text: "Put on disposable gloves", ico: "🧤" },
      { id: "pressure", text: "Apply firm direct pressure", ico: "🤚" },
      { id: "dressing", text: "Apply sterile dressing", ico: "🩹" },
      { id: "elevate", text: "Elevate the limb", ico: "⬆️" },
      { id: "call", text: "Call 999 for help", ico: "📞" }
    ];

    er.bleed.bleedLevel = 90;
    er.bleed.stepIndex = 0;
    er.bleed.correctSteps = correctOrder;
    er.bleed.answered = false;

    // Shuffle the options for display
    const displayOptions = shuffleArray(correctOrder.slice());

    function updateBleedMeter() {
      const fill = document.getElementById("bleedMeterFill");
      const val = document.getElementById("bleedMeterVal");
      if (fill) fill.style.width = er.bleed.bleedLevel + "%";
      if (val) {
        val.textContent = er.bleed.bleedLevel + "%";
        val.className = "bleed-meter-val " + (er.bleed.bleedLevel >= 70 ? "critical" : er.bleed.bleedLevel >= 40 ? "moderate" : "controlled");
      }
    }

    function renderChallenge() {
      const nextStep = correctOrder[er.bleed.stepIndex];
      area.innerHTML =
        '<div class="bleed-wrap">' +
          '<div class="bleed-casualty">' +
            '<svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg">' +
              '<rect width="520" height="160" fill="transparent"/>' +
              '<ellipse cx="260" cy="140" rx="160" ry="14" fill="rgba(255,90,110,0.1)"/>' +
              '<g transform="translate(180,50)">' +
                '<rect x="0" y="10" width="160" height="18" rx="9" fill="#d4c4a0" stroke="#a89878" stroke-width="1"/>' +
                '<rect x="70" y="10" width="25" height="18" fill="#ff5a6e" opacity="' + (0.3 + er.bleed.bleedLevel / 200) + '"/>' +
                '<circle cx="80" cy="40" r="' + (3 + er.bleed.bleedLevel / 30) + '" fill="#ff5a6e"/>' +
                '<circle cx="90" cy="' + (45 + er.bleed.bleedLevel / 5) + '" r="' + (2 + er.bleed.bleedLevel / 40) + '" fill="#ff5a6e" opacity="0.7"/>' +
              '</g>' +
            '</svg>' +
          '</div>' +
          '<div class="bleed-meter-wrap">' +
            '<span class="bleed-meter-label">BLEEDING:</span>' +
            '<div class="bleed-meter-bar"><div class="bleed-meter-fill" id="bleedMeterFill" style="width:' + er.bleed.bleedLevel + '%"></div></div>' +
            '<span class="bleed-meter-val ' + (er.bleed.bleedLevel >= 70 ? "critical" : er.bleed.bleedLevel >= 40 ? "moderate" : "controlled") + '" id="bleedMeterVal">' + er.bleed.bleedLevel + '%</span>' +
          '</div>' +
          '<div class="bleed-step-prompt">Step ' + (er.bleed.stepIndex + 1) + ' of 5 — Select the correct next action:</div>' +
          '<div class="bleed-action-btns" id="bleedOptions">' +
            displayOptions.filter(function (opt) {
              return correctOrder.slice(0, er.bleed.stepIndex).findIndex(function (s) { return s.id === opt.id; }) === -1;
            }).map(function (opt) {
              return '<button class="bleed-action-btn" data-id="' + opt.id + '" type="button"><span class="act-ico">' + opt.ico + '</span>' + escapeHTML(opt.text) + '</button>';
            }).join("") +
          '</div>' +
        '</div>';

      updateBleedMeter();

      area.querySelectorAll(".bleed-action-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (er.bleed.answered) return;
          const chosenId = btn.dataset.id;
          const expectedId = correctOrder[er.bleed.stepIndex].id;
          if (chosenId === expectedId) {
            btn.classList.add("done");
            er.bleed.stepIndex++;
            er.bleed.bleedLevel = Math.max(10, er.bleed.bleedLevel - 18);
            updateBleedMeter();
            if (er.bleed.stepIndex >= correctOrder.length) {
              er.bleed.answered = true;
              erSetPatientState("Stable", "✅");
              erHandleResult(true, 15, "Bleeding controlled! All 5 steps applied in the correct order: gloves, direct pressure, dressing, elevation, and calling for help.");
            } else {
              erSetFeedback("✅ Correct step! Bleeding reduced. Continue with the next action...", "ok");
              setTimeout(function () { renderChallenge(); }, 800);
            }
          } else {
            er.bleed.answered = true;
            btn.classList.add("wrong");
            area.querySelectorAll(".bleed-action-btn").forEach(function (b) {
              if (b.dataset.id === expectedId) b.classList.add("correct");
            });
            erSetPatientState("Critical", "😰");
            erHandleResult(false, 0, "Wrong step order. The correct next action was: " + correctOrder[er.bleed.stepIndex].text + ". Always put on gloves first, then apply direct pressure.");
          }
        });
      });
    }

    renderChallenge();

    // Bleeding gets worse over time
    er.bleed.timer = setInterval(function () {
      if (er.bleed.answered) return;
      er.bleed.bleedLevel = Math.min(100, er.bleed.bleedLevel + 2);
      updateBleedMeter();
      if (er.bleed.bleedLevel >= 100) {
        er.bleed.answered = true;
        erSetPatientState("Critical", "😰");
        erHandleResult(false, 0, "The casualty deteriorated — bleeding was not controlled in time. Act faster and apply direct pressure immediately.");
      }
    }, 1500);

    erStartTimer(40, null, function () {
      if (!er.challengeDone) {
        er.bleed.answered = true;
        erHandleResult(false, 0, "Time expired — the bleeding was not fully controlled. Work through the steps efficiently.");
      }
    });
  }

  // ==========================================================
  // MODE 4: CHOKING RESPONSE
  // Assess and choose correct technique, alternate back blows & thrusts
  // ==========================================================
  function renderChokingChallenge() {
    const area = document.getElementById("erChallengeArea");
    if (!area) return;
    erSetPatientState("Airway Obstructed", "😮‍💨");

    const decisions = [
      {
        scenario: "A cadet is eating and suddenly clutches their throat. They cannot speak, cough, or breathe. They are conscious.",
        question: "What is your first action?",
        options: [
          { text: "Encourage them to cough", ico: "🤧", correct: false, reason: "They cannot cough — this indicates a severe obstruction. Do not wait." },
          { text: "Give 5 sharp back blows", ico: "👋", correct: true, reason: "Correct — start with up to 5 sharp back blows between the shoulder blades." },
          { text: "Start CPR immediately", ico: "🫀", correct: false, reason: "CPR is only needed if the casualty becomes unconscious. They are still conscious." },
          { text: "Give them water to drink", ico: "💧", correct: false, reason: "Never give fluids to a choking casualty — it could worsen the obstruction." }
        ]
      },
      {
        scenario: "You have given 5 back blows. The obstruction has not cleared. The casualty is still conscious.",
        question: "What do you do next?",
        options: [
          { text: "Give 5 abdominal thrusts (Heimlich)", ico: "🤜", correct: true, reason: "Correct — alternate between 5 back blows and 5 abdominal thrusts." },
          { text: "Keep doing more back blows", ico: "👋", correct: false, reason: "After 5 back blows, switch to abdominal thrusts. Alternate between the two." },
          { text: "Slap them harder on the back", ico: "🤚", correct: false, reason: "Move on to abdominal thrusts — do not continue with back blows alone." },
          { text: "Wait and see if it clears", ico: "⏳", correct: false, reason: "Do not wait — the airway is still obstructed. Act with abdominal thrusts." }
        ]
      },
      {
        scenario: "You have alternated back blows and abdominal thrusts. The obstruction still has not cleared. The casualty is becoming weak.",
        question: "What is the critical action now?",
        options: [
          { text: "Keep alternating back blows and thrusts, and call 999", ico: "📞", correct: true, reason: "Correct — continue alternating and call 999. If they collapse, start CPR." },
          { text: "Stop and wait for them to recover", ico: "⏳", correct: false, reason: "Do not stop — call 999 and keep alternating back blows and abdominal thrusts." },
          { text: "Turn them upside down by the ankles", ico: "🔄", correct: false, reason: "Do not turn adults upside down. Continue with back blows and abdominal thrusts." },
          { text: "Leave to find help", ico: "🏃", correct: false, reason: "Do not leave the casualty. Call 999 and continue treatment." }
        ]
      }
    ];

    er.choke.stepIndex = 0;
    er.choke.answered = false;

    function renderDecision() {
      const decision = decisions[er.choke.stepIndex];
      erSetPatientState("Responding: Step " + (er.choke.stepIndex + 1), "😮‍💨");
      area.innerHTML =
        '<div class="choke-wrap">' +
          '<div class="choke-casualty">' +
            '<svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg">' +
              '<rect width="520" height="160" fill="transparent"/>' +
              '<ellipse cx="260" cy="140" rx="160" ry="14" fill="rgba(74,159,212,0.08)"/>' +
              '<g transform="translate(230,30)">' +
                '<circle cx="28" cy="16" r="16" fill="#d4c4a0" stroke="#a89878" stroke-width="1"/>' +
                '<rect x="18" y="32" width="20" height="55" rx="8" fill="#4a9fd4" opacity="0.7"/>' +
                '<g transform="translate(22,26)">' +
                  '<circle cx="6" cy="6" r="5" fill="#ff5a6e" opacity="0.8"/>' +
                  '<text x="6" y="9" text-anchor="middle" font-size="7" fill="white" font-weight="bold">!</text>' +
                '</g>' +
              '</g>' +
              '<g transform="translate(310,45)">' +
                '<text x="0" y="0" font-size="14" fill="#ff5a6e" font-weight="bold">CANNOT</text>' +
                '<text x="0" y="18" font-size="14" fill="#ff5a6e" font-weight="bold">BREATHE</text>' +
              '</g>' +
            '</svg>' +
          '</div>' +
          '<div class="choke-scenario">' + escapeHTML(decision.scenario) + '</div>' +
          '<div class="choke-question">' + escapeHTML(decision.question) + '</div>' +
          '<div class="choke-options" id="chokeOptions">' +
            shuffleArray(decision.options).map(function (opt) {
              return '<button class="choke-option-btn" data-correct="' + opt.correct + '" data-reason="' + escapeHTML(opt.reason) + '" type="button"><span class="opt-ico">' + opt.ico + '</span>' + escapeHTML(opt.text) + '</button>';
            }).join("") +
          '</div>' +
        '</div>';

      area.querySelectorAll(".choke-option-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (er.choke.answered) return;
          er.choke.answered = true;
          const isCorrect = btn.dataset.correct === "true";
          const reason = btn.dataset.reason;
          area.querySelectorAll(".choke-option-btn").forEach(function (b) { b.disabled = true; });
          if (isCorrect) {
            btn.classList.add("correct");
            er.choke.stepIndex++;
            if (er.choke.stepIndex >= decisions.length) {
              erSetPatientState("Stable", "✅");
              erHandleResult(true, 12, "Choking response correct — proper assessment and technique applied. The obstruction is cleared.");
            } else {
              erSetFeedback("✅ Correct! " + reason + " Continuing to next scenario...", "ok");
              setTimeout(function () { er.choke.answered = false; renderDecision(); }, 1500);
            }
          } else {
            btn.classList.add("wrong");
            area.querySelectorAll(".choke-option-btn").forEach(function (b) {
              if (b.dataset.correct === "true") b.classList.add("correct");
            });
            erSetPatientState("Critical", "😰");
            erHandleResult(false, 0, "Incorrect response. " + reason);
          }
        });
      });
    }

    renderDecision();
    erStartTimer(36, null, function () {
      if (!er.challengeDone) {
        erHandleResult(false, 0, "Time expired — the choking response was not completed. Act quickly — airway obstruction is life-threatening.");
      }
    });
  }

  // ==========================================================
  // MODE 5: RECOVERY POSITION
  // Step-by-step casualty positioning with progress dots
  // ==========================================================
  function renderRecoveryChallenge() {
    const area = document.getElementById("erChallengeArea");
    if (!area) return;
    erSetPatientState("Unconscious, Breathing", "🛌");

    const steps = [
      { num: 1, instruction: "Kneel beside the casualty. Place the <strong>near arm</strong> at a right angle to the body, palm up, elbow bent.", svgAction: "near-arm" },
      { num: 2, instruction: "Bring the <strong>far arm</strong> across the chest so the back of the hand rests against the near cheek. Hold it there.", svgAction: "far-arm" },
      { num: 3, instruction: "Bend the <strong>far leg</strong> at the knee so the foot is flat on the ground.", svgAction: "far-leg" },
      { num: 4, instruction: "Pull on the bent far knee to <strong>roll the casualty toward you</strong> onto their side.", svgAction: "roll" },
      { num: 5, instruction: "Adjust the upper leg at right angles to <strong>stabilise</strong>. Tilt the head back to keep the airway open. Check breathing.", svgAction: "final" }
    ];

    er.recovery.stepIndex = 0;
    er.recovery.answered = false;

    function renderSVG(action, stepNum) {
      const baseHead = '<circle cx="25" cy="12" r="12" fill="#d4c4a0" stroke="#a89878" stroke-width="1"/>';
      let body = "";
      let arms = "";
      let legs = "";
      switch (action) {
        case "near-arm":
          body = '<rect x="15" y="22" width="20" height="55" rx="8" fill="#4a9fd4" opacity="0.7"/>';
          arms = '<rect x="2" y="25" width="16" height="6" rx="3" fill="#4a9fd4" opacity="0.5" transform="rotate(-30,10,28)"/>';
          legs = '<rect x="16" y="75" width="8" height="35" rx="3" fill="#2a1a1a"/><rect x="26" y="75" width="8" height="35" rx="3" fill="#2a1a1a"/>';
          break;
        case "far-arm":
          body = '<rect x="15" y="22" width="20" height="55" rx="8" fill="#4a9fd4" opacity="0.7"/>';
          arms = '<rect x="2" y="25" width="16" height="6" rx="3" fill="#4a9fd4" opacity="0.5" transform="rotate(-30,10,28)"/>' +
                 '<rect x="20" y="15" width="18" height="6" rx="3" fill="#4a9fd4" opacity="0.6"/>';
          legs = '<rect x="16" y="75" width="8" height="35" rx="3" fill="#2a1a1a"/><rect x="26" y="75" width="8" height="35" rx="3" fill="#2a1a1a"/>';
          break;
        case "far-leg":
          body = '<rect x="15" y="22" width="20" height="55" rx="8" fill="#4a9fd4" opacity="0.7"/>';
          arms = '<rect x="2" y="25" width="16" height="6" rx="3" fill="#4a9fd4" opacity="0.5" transform="rotate(-30,10,28)"/>' +
                 '<rect x="20" y="15" width="18" height="6" rx="3" fill="#4a9fd4" opacity="0.6"/>';
          legs = '<rect x="16" y="75" width="8" height="35" rx="3" fill="#2a1a1a"/>' +
                 '<rect x="22" y="75" width="8" height="25" rx="3" fill="#2a1a1a" transform="rotate(50,26,87)"/>';
          break;
        case "roll":
          body = '<rect x="10" y="28" width="22" height="48" rx="8" fill="#4a9fd4" opacity="0.7" transform="rotate(15,21,52)"/>';
          arms = '<rect x="5" y="38" width="18" height="6" rx="3" fill="#4a9fd4" opacity="0.5" transform="rotate(15,14,41)"/>';
          legs = '<rect x="14" y="72" width="8" height="25" rx="3" fill="#2a1a1a" transform="rotate(25,18,84)"/>' +
                 '<rect x="24" y="72" width="8" height="20" rx="3" fill="#2a1a1a" transform="rotate(55,28,82)"/>';
          break;
        case "final":
          body = '<rect x="5" y="35" width="24" height="45" rx="8" fill="#4a9fd4" opacity="0.7" transform="rotate(30,17,57)"/>';
          arms = '<rect x="0" y="45" width="18" height="6" rx="3" fill="#4a9fd4" opacity="0.5" transform="rotate(30,9,48)"/>';
          legs = '<rect x="12" y="70" width="8" height="22" rx="3" fill="#2a1a1a" transform="rotate(40,16,81)"/>' +
                 '<rect x="22" y="72" width="8" height="18" rx="3" fill="#2a1a1a" transform="rotate(70,26,81)"/>';
          break;
      }
      return '<svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="520" height="200" fill="transparent"/>' +
        '<ellipse cx="180" cy="175" rx="120" ry="12" fill="rgba(56,217,123,0.08)"/>' +
        '<g transform="translate(150,30)">' + baseHead + body + arms + legs + '</g>' +
        '<g transform="translate(310,60)">' +
          '<circle cx="30" cy="30" r="26" fill="none" stroke="#38d97b" stroke-width="2" opacity="0.5"/>' +
          '<text x="30" y="38" text-anchor="middle" font-size="20" fill="#38d97b" font-weight="bold">' + stepNum + '/5</text>' +
        '</g>' +
      '</svg>';
    }

    function renderStep() {
      const step = steps[er.recovery.stepIndex];
      erSetPatientState("Positioning: Step " + step.num, "🛌");
      const progressDots = steps.map(function (s, i) {
        return '<div class="recovery-dot ' + (i < er.recovery.stepIndex ? "done" : i === er.recovery.stepIndex ? "current" : "") + '"></div>';
      }).join("");

      area.innerHTML =
        '<div class="recovery-wrap">' +
          '<div class="recovery-casualty">' + renderSVG(step.svgAction, step.num) + '</div>' +
          '<div class="recovery-step-banner"><span class="num">' + step.num + '</span>Step ' + step.num + ' of 5</div>' +
          '<div class="recovery-instruction">' + step.instruction + '</div>' +
          '<div class="recovery-progress">' + progressDots + '</div>' +
          '<button class="recovery-btn" id="recoveryNextBtn" type="button">✓ Done — Next Step</button>' +
        '</div>';

      const nextBtn = document.getElementById("recoveryNextBtn");
      if (nextBtn) nextBtn.addEventListener("click", function () {
        if (er.recovery.answered) return;
        er.recovery.stepIndex++;
        if (er.recovery.stepIndex >= steps.length) {
          er.recovery.answered = true;
          erSetPatientState("Placed & Stable", "✅");
          erHandleResult(true, 12, "Recovery position complete! The casualty is on their side with airway protected, legs stabilising the body, and head tilted back. Airway is open and clear.");
        } else {
          renderStep();
        }
      });
    }

    renderStep();
    erStartTimer(50, null, function () {
      if (!er.challengeDone) {
        er.recovery.answered = true;
        erHandleResult(false, 0, "Time expired — the recovery position was not completed. Practise the 5 steps until they are second nature.");
      }
    });
  }

  // ==========================================================
  // RENDER: Emergency Simulator (idle state)
  // ==========================================================
  function renderERGame() {
    erLoadStats();
    erUpdateStats();
    erResetTimerDisplay();
    erSetModeBadge(null);
    erSetPatientState("Awaiting Patient", "🧍");

    const startBtn = document.getElementById("erStartBtn");
    const nextBtn = document.getElementById("erNextBtn");
    const examBtn = document.getElementById("erExamBtn");
    const resetBtn = document.getElementById("erResetBtn");
    if (startBtn) startBtn.addEventListener("click", erStartTraining);
    if (nextBtn) nextBtn.addEventListener("click", erNextMode);
    if (examBtn) examBtn.addEventListener("click", erStartExamMode);
    if (resetBtn) resetBtn.addEventListener("click", erReset);
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
    if (name === "simulator") renderERGame();
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
    try { trMutate(ER_MODES); } catch(e) {}
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(correctOrder); } catch(e) {}
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

    const params = new URLSearchParams(window.location.search);
    const deepMission = params.get("mission");

    loadState();
    erLoadStats();
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
    renderERGame();

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
