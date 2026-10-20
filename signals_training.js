/* ============================================================
   ADVANCED SIGNALS & COMMS TRAINING COMMAND — signals_training.js
   Operation Signal Watch: hands-on Red Star PO 224 signalling simulator
   Maple Defender-style dashboard engine (IIFE architecture)
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "signalsTrainingProgress",
    sitreps: "signalsTrainingSitreps",
    wrongAttempts: "signalsTrainingWrongAttempts",
    streak: "signalsTrainingStreak",
    bestStreak: "signalsTrainingBestStreak",
    readArticles: "signalsTrainingReadArticles"
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoCompleted";
  const SIGNALS_BADGE_ID = 7;

  // ==========================================================
  // RANK LADDER (Signals progression ranks)
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Signal Recruit",          icon: "📶",  xp: 0,    callsign: "SIGNAL-1" },
    { id: 1, name: "Signal Cadet",            icon: "📡",  xp: 300,  callsign: "COMMS-2" },
    { id: 2, name: "Senior Signal Cadet",     icon: "⭐",  xp: 700,  callsign: "SENIOR-3" },
    { id: 3, name: "Signals Instructor Cadet",icon: "🏅",  xp: 1200, callsign: "INSTR-4" },
    { id: 4, name: "Comms Commander Cadet",   icon: "👑",  xp: 1800, callsign: "CMDR-5" },
    { id: 5, name: "Master Signaller",        icon: "🏆",  xp: 2500, callsign: "MASTER-6" }
  ];

  // ==========================================================
  // TOOLS (signalling & comms tools cadets must "open")
  // ==========================================================
  const TOOLS = [
    { id: "flare",          icon: "🚀", label: "Distress Flare" },
    { id: "mirror",         icon: "🪞", label: "Signal Mirror" },
    { id: "whistle",        icon: "📢", label: "Emergency Whistle" },
    { id: "groundair",      icon: "📋", label: "Ground-to-Air Code Sheet" },
    { id: "signalfire",     icon: "🔥", label: "Signal Fire Kit" },
    { id: "radio",          icon: "📻", label: "Radio Set" },
    { id: "voiceproc",      icon: "🗣️", label: "Voice Procedure Card" },
    { id: "sitrepform",     icon: "📝", label: "SITREP Form" },
    { id: "authtable",      icon: "🔐", label: "Authentication Table" },
    { id: "freqcard",       icon: "🎚️", label: "Frequency Card" },
    { id: "phonetic",       icon: "🔤", label: "Phonetic Alphabet Chart" },
    { id: "cellphone",      icon: "📱", label: "Cell Phone" },
    { id: "smokegen",       icon: "💨", label: "Smoke Generator" },
    { id: "signalprep",     icon: "🛠️", label: "Signal Prep Checklist" }
  ];

  // ==========================================================
  // TRAINING MISSIONS — Advanced Signals & Comms
  // Based on PO 224 signalling syllabus + radio communications
  // Each mission has 4 hands-on tasks. Tool enforcement required.
  // ==========================================================
  const MISSIONS = [
    {
      id: "sig_devices",
      order: 1,
      tag: "SIGNALS 01",
      icon: "🚀",
      title: "Field Signalling Devices",
      desc: "Master flares, signal mirrors, and whistles — the three primary personal signalling devices.",
      xp: 100,
      brief: "Your signals instructor is running a practical on field signalling devices. When you are lost or in distress, these are the tools that get you found. You will work through distress flares (Red Star, 45-60m altitude, 7-15 second burn), signal mirrors (reflecting sunlight in sets of three flashes), and emergency whistles (three blasts is the universal distress signal, the same as S.O.S.). Each device has specific operating procedures you must follow precisely.",
      scene: "flares",
      chapters: [
        { title: "Distress Flares", desc: "Red Star flares: 45-60m altitude, 7-15 second burn time." },
        { title: "Signal Mirror", desc: "Reflect sunlight toward search aircraft in sets of three flashes." },
        { title: "Emergency Whistle", desc: "Three blasts = universal distress = S.O.S." },
        { title: "Device Selection", desc: "Choose the right device for the conditions and visibility." }
      ],
      tasks: [
        {
          type: "select", tool: "flare",
          title: "Flare Burn Time",
          prompt: "You are preparing to fire a Red Star distress flare. Your instructor asks you to identify the burn time and altitude specifications. Select the correct altitude range that a Red Star distress flare reaches.",
          options: [
            "15-25 metres",
            "45-60 metres",
            "100-150 metres",
            "300-500 metres"
          ],
          expected: "45-60 metres",
          proof: "Correct! A Red Star distress flare reaches an altitude of 45-60 metres and burns for 7-15 seconds. Fire it vertically for maximum visibility."
        },
        {
          type: "select", tool: "mirror",
          title: "Signal Mirror Flash Pattern",
          prompt: "You spot a search aircraft on the horizon. Using your signal mirror, you must flash the sunlight toward the aircraft. How many flashes should you send in each set?",
          options: [
            "One flash, then wait",
            "Two flashes, repeated",
            "Three flashes, repeated",
            "Five flashes, repeated"
          ],
          expected: "Three flashes, repeated",
          proof: "Correct! The signal mirror is flashed in sets of three — the international distress signal. Aim the reflection at the aircraft and repeat the three-flash pattern."
        },
        {
          type: "select", tool: "whistle",
          title: "Emergency Whistle Signal",
          prompt: "You are separated from your group in dense forest. You use your emergency whistle to signal for help. What is the universal distress signal on a whistle?",
          options: [
            "One long continuous blast",
            "Two short blasts",
            "Three blasts (S.O.S.)",
            "Five rapid blasts"
          ],
          expected: "Three blasts (S.O.S.)",
          proof: "Correct! Three blasts on a whistle is the universal distress signal, representing S.O.S. Repeat the three-blast pattern at regular intervals."
        },
        {
          type: "toggle", tool: "signalprep",
          title: "Signal Preparation Protocol",
          prompt: "Your instructor explains that signal preparation is critical. Before deploying any signalling device, you must ensure the area is open and visible, prepare multiple signal types, and protect equipment from moisture and cold. Toggle the signal preparation protocol to ON to confirm you have completed the checklist.",
          expected: true,
          proof: "Correct! Signal preparation is essential: choose open areas, prepare multiple types of signals, protect equipment from moisture and cold, ensure unusual signs are visible from the air, and care for all signalling equipment."
        }
      ]
    },
    {
      id: "ground_air",
      order: 2,
      tag: "SIGNALS 02",
      icon: "📋",
      title: "Ground-to-Air Visual Signals",
      desc: "Learn the international ground-to-air code symbols and how to lay them out for search aircraft.",
      xp: 100,
      brief: "A search-and-rescue aircraft is scanning your area. You need to lay out ground-to-air visual signals so the crew can read your message from the air. The symbols must be large — lines no less than 1 metre wide and 8 metres long, with symbols at least 3 metres apart. You must use contrasting colours or shadows, orient them parallel to the sun (east-west), and locate them in a large, high, open area for maximum visibility.",
      scene: "groundair",
      chapters: [
        { title: "Symbol Dimensions", desc: "Lines ≥1m wide, ≥8m long. Symbols ≥3m apart." },
        { title: "Orientation", desc: "Orient parallel to the sun, east-west." },
        { title: "Contrast & Colour", desc: "Use contrasting colours or shadows for visibility." },
        { title: "Code Symbols", desc: "V = require assistance, X = require medical, F = require food." }
      ],
      tasks: [
        {
          type: "select", tool: "groundair",
          title: "Minimum Line Width",
          prompt: "You are laying out a ground-to-air signal symbol using logs and branches. Your instructor asks about the minimum dimensions. What is the minimum width and length for the lines of a ground-to-air signal?",
          options: [
            "0.5m wide and 4m long",
            "1m wide and 8m long",
            "2m wide and 15m long",
            "3m wide and 20m long"
          ],
          expected: "1m wide and 8m long",
          proof: "Correct! Ground-to-air signal lines must be no less than 1 metre wide and 8 metres long, with symbols at least 3 metres apart, to be readable from the air."
        },
        {
          type: "select", tool: "groundair",
          title: "Symbol Spacing",
          prompt: "You are laying out multiple ground-to-air code symbols in sequence. How far apart must the symbols be spaced?",
          options: [
            "At least 1 metre apart",
            "At least 2 metres apart",
            "At least 3 metres apart",
            "At least 5 metres apart"
          ],
          expected: "At least 3 metres apart",
          proof: "Correct! Ground-to-air symbols must be at least 3 metres apart so the aircraft crew can distinguish each symbol clearly from altitude."
        },
        {
          type: "select", tool: "groundair",
          title: "Signal Orientation",
          prompt: "You have laid out your ground-to-air symbols. Which direction should the symbols be oriented for best visibility from the air?",
          options: [
            "North-south, facing magnetic north",
            "Parallel to the sun, east-west",
            "Directly toward the wind direction",
            "Random orientation is acceptable"
          ],
          expected: "Parallel to the sun, east-west",
          proof: "Correct! Ground-to-air signals should be oriented parallel to the sun (east-west) to maximize the contrast and shadow effect, making them more visible to search aircraft."
        },
        {
          type: "select", tool: "groundair",
          title: "Require Medical Assistance",
          prompt: "A member of your patrol has a serious injury. You need to lay out the ground-to-air code symbol that tells the search aircraft you require medical assistance. Which symbol do you lay out?",
          options: [
            "V — require assistance",
            "X — require medical assistance",
            "F — require food and water",
            "N — no assistance required"
          ],
          expected: "X — require medical assistance",
          proof: "Correct! The letter X laid out as a ground-to-air signal means 'require medical assistance.' V means require assistance, F means require food and water."
        }
      ]
    },
    {
      id: "signal_fire",
      order: 3,
      tag: "SIGNALS 03",
      icon: "🔥",
      title: "Signal Fire Preparation",
      desc: "Build the three-fire triangle distress pattern, the torch tree, and the luminous cone fire.",
      xp: 100,
      brief: "Your signals instructor is teaching emergency signal fire construction. There are three types of emergency signal fires: the three-fire triangle pattern (three evenly spaced fires 35 metres apart in a triangle or straight line — the internationally recognized ground distress signal), the torch tree (an isolated tree ignited to produce a large visible flame), and the luminous cone fire (a tripod with a platform for an elevated, luminous fire). You must also know the best locations and how to maximize smoke for daytime visibility.",
      scene: "signalfire",
      chapters: [
        { title: "Three-Fire Triangle", desc: "Three fires 35m apart in a triangle or line = international distress." },
        { title: "Torch Tree", desc: "An isolated tree ignited for a large visible flame." },
        { title: "Luminous Cone Fire", desc: "Tripod with platform 45-60cm below apex for elevated fire." },
        { title: "Maximizing Smoke", desc: "Green boughs, damp wood, and rubber produce dense smoke." }
      ],
      tasks: [
        {
          type: "select", tool: "signalfire",
          title: "Three-Fire Triangle Pattern",
          prompt: "You are preparing the three-fire triangle distress signal pattern. What is the correct spacing and arrangement of the three fires?",
          options: [
            "Three fires 10m apart in a cluster",
            "Three fires 35m apart in a triangle or straight line",
            "Three fires 100m apart in a line",
            "Two fires 50m apart side by side"
          ],
          expected: "Three fires 35m apart in a triangle or straight line",
          proof: "Correct! The three-fire triangle pattern uses three evenly spaced fires approximately 35 metres apart, arranged in a triangle or straight line — the internationally recognized ground distress signal."
        },
        {
          type: "select", tool: "signalfire",
          title: "Luminous Cone Fire Platform",
          prompt: "You are constructing a luminous cone fire using a tripod. The instructor asks about the platform placement. How far below the apex of the tripod should the platform be placed?",
          options: [
            "10-20 cm below the apex",
            "25-35 cm below the apex",
            "45-60 cm below the apex",
            "90-120 cm below the apex"
          ],
          expected: "45-60 cm below the apex",
          proof: "Correct! The platform for a luminous cone fire is placed 45-60 cm below the apex of the tripod. Tinder and kindling go on the platform, with green boughs on top to produce smoke."
        },
        {
          type: "select", tool: "signalfire",
          title: "Best Signal Fire Location",
          prompt: "You need to choose a location for your signal fire. Which of the following is the best location for a signal fire to maximize the chance of being spotted?",
          options: [
            "In a dense forest canopy for wind protection",
            "On elevated ground in a highly visible clearing or near a stream edge, with fuel available",
            "In a narrow valley to contain the fire",
            "At the bottom of a ravine for shelter"
          ],
          expected: "On elevated ground in a highly visible clearing or near a stream edge, with fuel available",
          proof: "Correct! The best signal fire location is on elevated ground in a highly visible clearing or near the edge of a stream, with a nearby fuel source. This maximizes visibility from both the ground and the air."
        },
        {
          type: "select", tool: "signalfire",
          title: "Maximizing Smoke",
          prompt: "It is daytime and you need to produce maximum smoke from your signal fire for visibility. Which materials should you add to the fire to generate the most smoke?",
          options: [
            "Dry standing wood only",
            "Leaves, green boughs, damp wood, or rubber",
            "Dry grass and peat",
            "Animal dung and coal"
          ],
          expected: "Leaves, green boughs, damp wood, or rubber",
          proof: "Correct! To maximize smoke for daytime visibility, add leaves, green boughs, wet or damp wood, or rubber to the fire. Maintain the smoke by covering the fire with fuel and puffing the smoke with a blanket."
        }
      ]
    },
    {
      id: "radio_procedure",
      order: 4,
      tag: "SIGNALS 04",
      icon: "📻",
      title: "Radio Voice Procedure",
      desc: "Learn radio net operation, voice procedure words, and the phonetic alphabet for clear comms.",
      xp: 100,
      brief: "Your signals instructor is running a radio net practical. You will learn to operate within a radio net using proper voice procedure. Key voice procedure words include: ROGER (received and understood), WILCO (will comply), OVER (end of transmission, reply expected), OUT (end of transmission, no reply expected), and COPY (message received). You will also practice the NATO phonetic alphabet — Alpha, Bravo, Charlie, Delta — to spell out critical information clearly over the radio. Remember: never say 'over and out' together — they are mutually exclusive.",
      scene: "radio",
      chapters: [
        { title: "Voice Procedure Words", desc: "ROGER, WILCO, OVER, OUT, COPY, SAY AGAIN." },
        { title: "Phonetic Alphabet", desc: "Alpha, Bravo, Charlie, Delta... for clear spelling." },
        { title: "Radio Net Operation", desc: "Call signs, net discipline, and frequency management." },
        { title: "Transmission Protocol", desc: "Short, clear transmissions. Think before you transmit." }
      ],
      tasks: [
        {
          type: "select", tool: "voiceproc",
          title: "Voice Procedure — OVER",
          prompt: "You are transmitting a message on the radio net. You have finished your transmission and expect a reply from the receiving station. Which voice procedure word do you use to end your transmission?",
          options: [
            "OUT — end of transmission, no reply expected",
            "OVER — end of transmission, reply expected",
            "ROGER — message received and understood",
            "WILCO — will comply with instructions"
          ],
          expected: "OVER — end of transmission, reply expected",
          proof: "Correct! OVER means 'end of transmission, reply expected.' Use OUT when no reply is expected. Never combine them — 'over and out' is incorrect voice procedure."
        },
        {
          type: "select", tool: "phonetic",
          title: "Phonetic Alphabet — Charlie",
          prompt: "You need to spell out the word 'CAT' over the radio using the NATO phonetic alphabet. Your instructor asks what word represents the letter 'C'. Select the correct phonetic word.",
          options: [
            "Canada",
            "Charlie",
            "Cherokee",
            "Cobra"
          ],
          expected: "Charlie",
          proof: "Correct! In the NATO phonetic alphabet, the letter C is represented by the word 'Charlie.' The full word CAT would be spelled: Charlie, Alpha, Tango."
        },
        {
          type: "select", tool: "voiceproc",
          title: "Voice Procedure — WILCO",
          prompt: "Your net control station has just given you instructions to move to a new checkpoint. You understand the message and will comply. Which voice procedure word should you transmit?",
          options: [
            "ROGER — received and understood only",
            "WILCO — will comply with the instructions",
            "COPY — message copied to log",
          "SAY AGAIN — request repetition"
          ],
          expected: "WILCO — will comply with the instructions",
          proof: "Correct! WILCO means 'will comply' — it indicates you have received the instructions and will carry them out. ROGER only means received and understood, without the commitment to comply."
        },
        {
          type: "type", tool: "voiceproc",
          title: "Correct Transmission Ending",
          prompt: "You have finished your radio transmission and do NOT expect a reply. Type the single voice procedure word (in uppercase) that correctly ends this transmission.",
          expected: "OUT",
          proof: "Correct! OUT means 'end of transmission, no reply expected.' Remember: OVER and OUT are mutually exclusive — never say 'over and out.'"
        }
      ]
    },
    {
      id: "sitrep",
      order: 5,
      tag: "SIGNALS 05",
      icon: "📝",
      title: "SITREP Formatting",
      desc: "Format and transmit a Situation Report (SITREP) using the standard military message format.",
      xp: 100,
      brief: "Your signals instructor is teaching SITREP — Situation Report — formatting. A SITREP is a structured message used to report the situation on the ground to your headquarters or net control station. A well-formatted SITREP includes: the originator's call sign, the date-time group, the situation (what is happening), and any requests for support. Messages should be concise, clear, and transmitted using proper voice procedure. You will format and transmit a practice SITREP over the radio net.",
      scene: "sitrep",
      chapters: [
        { title: "SITREP Structure", desc: "Call sign, date-time group, situation, requests." },
        { title: "Message Conciseness", desc: "Keep messages short, clear, and to the point." },
        { title: "Date-Time Group", desc: "Standard format: DDHHMMZ MON YYYY." },
        { title: "Transmission Protocol", desc: "Use voice procedure words throughout." }
      ],
      tasks: [
        {
          type: "select", tool: "sitrepform",
          title: "SITREP Essential Elements",
          prompt: "You are composing a SITREP to transmit to your net control station. Which of the following elements are essential in a properly formatted SITREP?",
          options: [
            "Call sign, date-time group, situation, and requests",
            "Only the location and weather conditions",
            "Personal opinions and recommendations only",
            "A detailed narrative of the entire patrol"
          ],
          expected: "Call sign, date-time group, situation, and requests",
          proof: "Correct! A properly formatted SITREP includes the originator's call sign, the date-time group, the current situation, and any requests for support. Keep it concise and factual."
        },
        {
          type: "type", tool: "sitrepform",
          title: "Call Sign Format",
          prompt: "You are the patrol leader with the call sign 'SIGNAL-1'. Type your call sign in uppercase to begin the SITREP transmission (include the hyphen as shown).",
          expected: "SIGNAL-1",
          proof: "Correct! Your call sign SIGNAL-1 identifies you as the originator of the SITREP. Always begin a transmission with your call sign followed by the recipient's call sign."
        },
        {
          type: "note", tool: "sitrepform",
          title: "SITREP Situation Description",
          prompt: "Write a brief SITREP situation description for the following scenario: Your patrol has reached checkpoint Bravo, all personnel accounted for, but you have identified a dead zone with no radio signal and need to reposition to higher ground. Include the keywords: checkpoint, personnel, and radio.",
          keywords: ["checkpoint", "personnel", "radio"],
          altKeywords: ["checkpoint", "personnel", "signal"],
          proof: "Correct! Your SITREP situation description is clear and concise. It identifies the location (checkpoint Bravo), the status (all personnel accounted for), and the issue (radio dead zone requiring repositioning)."
        },
        {
          type: "select", tool: "voiceproc",
          title: "SITREP Transmission Closing",
          prompt: "You have finished transmitting your SITREP over the radio net. You do not expect a reply — your net control station will log the report. How do you correctly close the transmission?",
          options: [
            "OVER AND OUT",
            "OUT",
            "ROGER OUT",
            "WILCO OVER"
          ],
          expected: "OUT",
          proof: "Correct! Since you do not expect a reply, you close with OUT. Never use 'over and out' — they are mutually exclusive. OVER means reply expected; OUT means no reply expected."
        }
      ]
    },
    {
      id: "authentication",
      order: 6,
      tag: "SIGNALS 06",
      icon: "🔐",
      title: "Authentication & Signal Security",
      desc: "Learn authentication tables, frequency discipline, and signal security (SIGSEC) procedures.",
      xp: 100,
      brief: "Your signals instructor is covering authentication and signal security. Authentication is the process of verifying that a transmitting station is legitimate — you use a pre-shared authentication table to challenge and respond. Signal security (SIGSEC) means protecting your communications from interception: maintain frequency discipline (only transmit on assigned frequencies), keep transmissions short, avoid unnecessary chatter, and never discuss sensitive information over unencrypted channels. An enemy or unauthorized listener can exploit loose radio discipline.",
      scene: "auth",
      chapters: [
        { title: "Authentication Tables", desc: "Pre-shared challenge-and-response codes for station verification." },
        { title: "Frequency Discipline", desc: "Transmit only on assigned frequencies. No unauthorized changes." },
        { title: "Transmission Security", desc: "Short transmissions, minimal chatter, no sensitive data." },
        { title: "SIGSEC Principles", desc: "Assume every transmission is intercepted. Protect information." }
      ],
      tasks: [
        {
          type: "select", tool: "authtable",
          title: "Authentication Purpose",
          prompt: "An unknown station contacts your radio net claiming to be a friendly unit. What is the purpose of the authentication procedure?",
          options: [
            "To encrypt all voice transmissions",
            "To verify that the transmitting station is legitimate using a pre-shared challenge-and-response code",
            "To change the radio frequency",
            "To boost the radio signal strength"
          ],
          expected: "To verify that the transmitting station is legitimate using a pre-shared challenge-and-response code",
          proof: "Correct! Authentication verifies a station's identity using a pre-shared authentication table. You send a challenge code, and the responding station must reply with the correct response from the table."
        },
        {
          type: "select", tool: "freqcard",
          title: "Frequency Discipline",
          prompt: "Your assigned radio frequency is experiencing interference. A junior cadet suggests switching to a different, unassigned frequency. What is the correct action regarding frequency discipline?",
          options: [
            "Switch to any clear frequency immediately",
            "Maintain the assigned frequency — only the net control station authorizes frequency changes",
            "Turn off the radio until interference stops",
            "Broadcast on multiple frequencies simultaneously"
          ],
          expected: "Maintain the assigned frequency — only the net control station authorizes frequency changes",
          proof: "Correct! Frequency discipline requires operating only on assigned frequencies. Only the net control station can authorize a frequency change. Unauthorized frequency changes disrupt the net and compromise communications."
        },
        {
          type: "select", tool: "voiceproc",
          title: "Transmission Security",
          prompt: "Which of the following practices best supports signal security (SIGSEC) during radio transmissions?",
          options: [
            "Long, detailed transmissions to ensure clarity",
            "Short, concise transmissions with minimal chatter and no sensitive information",
            "Discussing patrol plans and personnel names openly",
            "Transmitting continuously to maintain net contact"
          ],
          expected: "Short, concise transmissions with minimal chatter and no sensitive information",
          proof: "Correct! SIGSEC requires short, concise transmissions with minimal chatter. Never discuss sensitive information, patrol plans, or personnel names over the radio. Assume every transmission can be intercepted."
        },
        {
          type: "toggle", tool: "signalprep",
          title: "SIGSEC Protocol Activation",
          prompt: "Before commencing radio operations on the net, you must confirm that SIGSEC protocols are active: authentication table loaded, assigned frequency confirmed, and transmission security brief understood. Toggle the SIGSEC protocol to ON to confirm activation.",
          expected: true,
          proof: "Correct! SIGSEC protocol is now active. Authentication table loaded, assigned frequency confirmed, and all operators briefed on transmission security. Maintain discipline throughout the exercise."
        }
      ]
    },
    {
      id: "emergency_comms",
      order: 7,
      tag: "SIGNALS 07",
      icon: "📱",
      title: "Emergency Communications",
      desc: "Use cell phones, radios, and check-in procedures to call for help in an emergency.",
      xp: 100,
      brief: "Your signals instructor is teaching emergency communications procedures. When lost or in distress, a cell phone or radio can be your lifeline — but you must use it correctly. Move to higher ground to get a signal, as terrain and elevation can block transmissions. If using a cell phone, keep it off between check-in times to conserve battery. Always arrange a check-in time with your contact before departure. If you have radio contact, transmit your situation using proper voice procedure and request assistance. Battery conservation is critical — you may need your device for hours or days.",
      scene: "emergency",
      chapters: [
        { title: "Higher Ground", desc: "Move to elevated terrain to improve signal reception." },
        { title: "Battery Conservation", desc: "Turn off devices between check-in times." },
        { title: "Check-In Procedures", desc: "Arrange check-in times before departure." },
        { title: "Priority Distress", desc: "Distress calls have priority over all other traffic." }
      ],
      tasks: [
        {
          type: "select", tool: "cellphone",
          title: "Improving Cell Phone Signal",
          prompt: "You are lost in a valley and your cell phone shows no signal. What should you do to improve your chances of getting a signal?",
          options: [
            "Stay in the valley and keep redialling",
            "Move to higher ground — terrain and elevation can block signals",
            "Remove the phone battery to reset the signal",
            "Hold the phone vertically and spin in circles"
          ],
          expected: "Move to higher ground — terrain and elevation can block signals",
          proof: "Correct! Terrain and elevation can block radio and cell phone signals. Move to higher ground to improve your chances of getting a signal. Valleys, ravines, and dense forest all reduce signal strength."
        },
        {
          type: "select", tool: "cellphone",
          title: "Battery Conservation",
          prompt: "You have a cell phone with limited battery and need to conserve power for an emergency call. What is the best practice for battery conservation during a survival situation?",
          options: [
            "Keep the phone on continuously in case a signal appears",
            "Turn the phone off between arranged check-in times to conserve battery",
            "Remove the SIM card to save power",
            "Make frequent test calls to check signal strength"
          ],
          expected: "Turn the phone off between arranged check-in times to conserve battery",
          proof: "Correct! Turn the phone off between arranged check-in times to conserve battery. Only power on at the pre-arranged times to check for signal. This extends battery life for hours or days."
        },
        {
          type: "select", tool: "radio",
          title: "Distress Call Priority",
          prompt: "You hear a distress call on the radio net at the same time as a routine logistics message. Which transmission has priority?",
          options: [
            "The routine logistics message, since it was first",
            "The distress call — distress traffic has priority over all other communications",
            "Neither — wait for net control to decide",
            "Both can be handled simultaneously"
          ],
          expected: "The distress call — distress traffic has priority over all other communications",
          proof: "Correct! Distress calls have absolute priority over all other radio traffic. All stations must cease transmission and monitor the distress frequency until the distress situation is resolved."
        },
        {
          type: "toggle", tool: "signalprep",
          title: "Check-In Protocol",
          prompt: "Before departing on a field exercise, you must arrange a check-in time with your contact and confirm your communications plan. Toggle the check-in protocol to ON to confirm you have arranged your check-in time.",
          expected: true,
          proof: "Correct! Always arrange a check-in time before departure. If you miss a check-in, your contact knows to initiate a search. This simple protocol is one of the most effective emergency communication tools."
        }
      ]
    },
    {
      id: "field_exercise",
      order: 8,
      tag: "SIGNALS 08",
      icon: "🎯",
      title: "Field Signalling Exercise",
      desc: "Integrate all signalling skills in a simulated search-and-rescue field exercise.",
      xp: 150,
      brief: "Final exercise: you are the signals operator for a patrol that has become separated during a field exercise. A search-and-rescue response is being coordinated. You must integrate everything you have learned: select the right signalling devices for the conditions, lay out ground-to-air visual signals with correct dimensions and orientation, prepare a signal fire for maximum visibility, transmit a SITREP using proper voice procedure, authenticate with net control, and maintain signal security throughout. This is your capstone signals challenge.",
      scene: "challenge",
      chapters: [
        { title: "Device Selection", desc: "Choose appropriate devices for current conditions." },
        { title: "Ground-to-Air Layout", desc: "Lay out symbols with correct dimensions and orientation." },
        { title: "Signal Fire", desc: "Prepare a signal fire in the best location with smoke materials." },
        { title: "SITREP & Auth", desc: "Transmit SITREP, authenticate with net control, maintain SIGSEC." }
      ],
      tasks: [
        {
          type: "select", tool: "signalprep",
          title: "Integrated Signal Plan",
          prompt: "You are in an open area with a search aircraft visible. Daytime, good visibility, but no cell signal. Which combination of signalling methods gives you the best chance of being found?",
          options: [
            "Signal fire with smoke only",
            "Ground-to-air visual symbols + signal fire with smoke + signal mirror flashes",
            "Whistle blasts only",
            "Cell phone calls only"
          ],
          expected: "Ground-to-air visual symbols + signal fire with smoke + signal mirror flashes",
          proof: "Correct! Use multiple signalling methods simultaneously: ground-to-air visual symbols for the aircraft, a signal fire with smoke for daytime visibility, and signal mirror flashes directed at the aircraft. Multiple signals increase your chances dramatically."
        },
        {
          type: "select", tool: "groundair",
          title: "Ground-to-Air Symbol Layout",
          prompt: "You are laying out the ground-to-air symbol for 'require assistance' (V). What are the minimum dimensions and orientation for the signal lines?",
          options: [
            "Lines 0.5m wide, 4m long, oriented north-south",
            "Lines 1m wide, 8m long, oriented parallel to the sun (east-west)",
            "Lines 2m wide, 15m long, oriented toward the wind",
            "Lines 3m wide, 5m long, in any direction"
          ],
          expected: "Lines 1m wide, 8m long, oriented parallel to the sun (east-west)",
          proof: "Correct! The V symbol's lines must be at least 1m wide and 8m long, oriented parallel to the sun (east-west) for maximum contrast and visibility from the air."
        },
        {
          type: "select", tool: "signalfire",
          title: "Signal Fire Smoke Generation",
          prompt: "You have your signal fire burning and a search aircraft approaching. You need to generate maximum smoke for visibility. What do you add to the fire?",
          options: [
            "More dry standing wood for a hotter flame",
            "Green boughs, damp wood, and rubber for dense smoke",
            "Nothing — let the fire burn naturally",
            "Water to create steam"
          ],
          expected: "Green boughs, damp wood, and rubber for dense smoke",
          proof: "Correct! Add green boughs, damp wood, or rubber to generate dense visible smoke. Maintain the smoke by covering the fire with fuel and puffing it with a blanket to create intermittent smoke puffs."
        },
        {
          type: "note", tool: "radio",
          title: "Final SITREP Transmission",
          prompt: "Compose your final SITREP for net control. Describe your situation: patrol separated, position at open clearing on high ground, ground-to-air signals laid, signal fire prepared, all personnel safe, requesting extraction. Include the keywords: patrol, signals, and extraction.",
          keywords: ["patrol", "signals", "extraction"],
          altKeywords: ["patrol", "signal", "extraction"],
          proof: "Correct! Your SITREP is clear, concise, and includes all essential elements: your situation (patrol separated), your position and preparations (high ground, signals laid, fire prepared), and your request (extraction). Net control can now coordinate the rescue."
        }
      ]
    }
  ];

  // ==========================================================
  // SIGNALS BADGES (auto-generated from MISSIONS)
  // ==========================================================
  const SIGNALS_BADGES = MISSIONS.map(m => ({
    id: "b_" + m.id,
    icon: m.icon,
    name: m.title,
    xp: m.xp,
    mission: m.id
  }));

  // ==========================================================
  // LEARN ARTICLES (Signals Knowledge Base)
  // ==========================================================
  const LEARN_ARTICLES = [
    { id: "l_flare",          cat: "Signalling Devices", icon: "🚀", title: "Distress Flares",                 desc: "Red Star flares reach 45-60m altitude and burn 7-15 seconds. Fire vertically for maximum visibility.", xp: 15 },
    { id: "l_mirror",         cat: "Signalling Devices", icon: "🪞", title: "Signal Mirror Technique",         desc: "Reflect sunlight in sets of three flashes toward search aircraft. Aim along your extended arm.", xp: 15 },
    { id: "l_whistle",        cat: "Signalling Devices", icon: "📢", title: "Emergency Whistle Signals",       desc: "Three blasts = universal distress = S.O.S. Repeat at regular intervals. Carry a whistle at all times.", xp: 15 },
    { id: "l_devices_prep",   cat: "Signalling Devices", icon: "🛠️", title: "Signal Preparation",             desc: "Choose open areas, prepare multiple signal types, protect equipment from moisture and cold.", xp: 15 },
    { id: "l_ground_air",     cat: "Ground-to-Air",     icon: "📋", title: "Ground-to-Air Code Symbols",      desc: "V = require assistance, X = require medical, F = require food. Lines ≥1m wide, ≥8m long, ≥3m apart.", xp: 15 },
    { id: "l_symbol_dims",    cat: "Ground-to-Air",     icon: "📐", title: "Signal Dimensions & Orientation", desc: "Orient symbols parallel to the sun (east-west) for maximum contrast. Use contrasting colours or shadows.", xp: 15 },
    { id: "l_three_fire",     cat: "Signal Fires",      icon: "🔥", title: "Three-Fire Triangle Pattern",     desc: "Three fires 35m apart in a triangle or straight line — the international ground distress signal.", xp: 15 },
    { id: "l_torch_tree",     cat: "Signal Fires",      icon: "🌲", title: "Torch Tree Signal",               desc: "An isolated tree ignited to produce a large, visible flame. Use only in genuine emergencies.", xp: 15 },
    { id: "l_luminous_cone",  cat: "Signal Fires",      icon: "🔥", title: "Luminous Cone Fire",              desc: "Tripod of 3 sticks 2m long, platform 45-60cm below apex. Tinder and kindling on platform, green boughs on top.", xp: 15 },
    { id: "l_smoke",          cat: "Signal Fires",      icon: "💨", title: "Maximizing Smoke",                desc: "Add green boughs, damp wood, or rubber for dense smoke. Puff with a blanket to create intermittent plumes.", xp: 15 },
    { id: "l_fire_location",  cat: "Signal Fires",      icon: "⛰️", title: "Signal Fire Location",            desc: "Elevated ground, highly visible clearing or stream edge, with available fuel nearby.", xp: 15 },
    { id: "l_voice_proc",     cat: "Radio Comms",       icon: "🗣️", title: "Voice Procedure Words",           desc: "ROGER (understood), WILCO (will comply), OVER (reply expected), OUT (no reply), COPY (received).", xp: 15 },
    { id: "l_phonetic",       cat: "Radio Comms",       icon: "🔤", title: "NATO Phonetic Alphabet",          desc: "Alpha, Bravo, Charlie, Delta, Echo... use to spell critical info clearly over the radio.", xp: 15 },
    { id: "l_radio_net",      cat: "Radio Comms",       icon: "📻", title: "Radio Net Operation",             desc: "Call signs, net discipline, and frequency management. Net control station directs all traffic.", xp: 15 },
    { id: "l_sitrep_format",  cat: "Radio Comms",       icon: "📝", title: "SITREP Formatting",               desc: "Call sign, date-time group, situation, and requests. Keep it concise, factual, and clear.", xp: 15 },
    { id: "l_authentication", cat: "Signal Security",   icon: "🔐", title: "Authentication Tables",           desc: "Pre-shared challenge-and-response codes to verify a station's identity on the radio net.", xp: 15 },
    { id: "l_sigsec",         cat: "Signal Security",   icon: "🛡️", title: "Signal Security (SIGSEC)",       desc: "Short transmissions, minimal chatter, no sensitive data. Assume every transmission is intercepted.", xp: 15 },
    { id: "l_freq_discipline",cat: "Signal Security",   icon: "🎚️", title: "Frequency Discipline",           desc: "Operate only on assigned frequencies. Only net control authorizes frequency changes.", xp: 15 },
    { id: "l_emergency_call", cat: "Emergency Comms",   icon: "📱", title: "Emergency Cell Phone Use",        desc: "Move to higher ground for signal. Turn off between check-in times to conserve battery.", xp: 15 },
    { id: "l_check_in",       cat: "Emergency Comms",   icon: "⏰", title: "Check-In Procedures",             desc: "Arrange check-in times before departure. Missed check-in triggers search and rescue.", xp: 15 },
    { id: "l_distress_priority",cat: "Emergency Comms", icon: "🚨", title: "Distress Call Priority",          desc: "Distress traffic has absolute priority over all other communications. All stations must monitor.", xp: 15 }
  ];

  // ==========================================================
  // ARENA QUESTIONS — Advanced Signals & Comms curriculum
  // EOs: M224.06 (Methods of Signalling), C224.02 (Signal Fire),
  //      plus radio comms: voice procedure, SITREP, authentication, SIGSEC
  // ==========================================================
  const ARENA_QUESTIONS = [
    // ── EO M224.06 — Identify Methods of Signalling ──
    { eo: "M224.06", q: "What altitude does a Red Star distress flare reach when fired?", options: ["15-25 metres", "45-60 metres", "100-150 metres", "300-500 metres"], correct: 1 },
    { eo: "M224.06", q: "What is the burn time of a Red Star distress flare?", options: ["3-5 seconds", "7-15 seconds", "20-30 seconds", "45-60 seconds"], correct: 1 },
    { eo: "M224.06", q: "How should a signal mirror be flashed to signal distress?", options: ["One continuous flash", "In sets of three flashes, repeated", "In sets of five flashes", "A single long flash"], correct: 1 },
    { eo: "M224.06", q: "What is the universal distress signal when using an emergency whistle?", options: ["One long blast", "Two short blasts", "Three blasts (S.O.S.)", "Five rapid blasts"], correct: 2 },
    { eo: "M224.06", q: "Three blasts on a whistle represents which distress signal?", options: ["Help needed", "S.O.S.", "Lost and found", "All clear"], correct: 1 },
    { eo: "M224.06", q: "When using a cell phone or radio to call for help and you have no signal, what should you do?", options: ["Stay where you are and keep trying", "Move to higher ground — terrain and elevation can block signals", "Remove the battery to reset", "Walk downhill to find water"], correct: 1 },
    { eo: "M224.06", q: "How should you conserve a cell phone battery during an emergency?", options: ["Keep it on continuously", "Turn it off between arranged check-in times", "Make frequent test calls", "Remove the SIM card"], correct: 1 },
    { eo: "M224.06", q: "What should you arrange with your contact before departing on a field exercise?", options: ["A meeting point only", "A check-in time", "A password", "An emergency frequency"], correct: 1 },
    { eo: "M224.06", q: "The three-fire triangle distress signal uses three fires spaced how far apart?", options: ["10 metres apart", "35 metres apart", "100 metres apart", "200 metres apart"], correct: 1 },
    { eo: "M224.06", q: "How should the three fires in the triangle distress pattern be arranged?", options: ["In a tight cluster", "In a triangle or straight line", "In a circle", "In a square formation"], correct: 1 },
    { eo: "M224.06", q: "The three-fire triangle pattern is recognized internationally as what type of signal?", options: ["A campfire signal", "A ground distress signal", "A weather indicator", "A navigation marker"], correct: 1 },
    { eo: "M224.06", q: "What is the minimum width and length for ground-to-air signal lines?", options: ["0.5m wide and 4m long", "1m wide and 8m long", "2m wide and 15m long", "3m wide and 20m long"], correct: 1 },
    { eo: "M224.06", q: "How far apart should ground-to-air code symbols be spaced from each other?", options: ["At least 1 metre apart", "At least 2 metres apart", "At least 3 metres apart", "At least 5 metres apart"], correct: 2 },
    { eo: "M224.06", q: "Which direction should ground-to-air signal symbols be oriented for best visibility?", options: ["North-south toward magnetic north", "Parallel to the sun, east-west", "Toward the wind direction", "Random orientation is fine"], correct: 1 },
    { eo: "M224.06", q: "Where should ground-to-air signals be located for maximum visibility?", options: ["In a dense forest", "In a large, high, open area", "In a narrow valley", "At the bottom of a ravine"], correct: 1 },
    { eo: "M224.06", q: "How can ground-to-air signals be made more visible from the air?", options: ["Use contrasting colours or shadows", "Paint them green", "Make them as small as possible", "Use only natural-coloured materials"], correct: 0 },
    { eo: "M224.06", q: "What does the ground-to-air symbol 'V' indicate?", options: ["Require medical assistance", "Require assistance", "Require food and water", "No assistance required"], correct: 1 },
    { eo: "M224.06", q: "What does the ground-to-air symbol 'X' indicate?", options: ["Require assistance", "Require medical assistance", "Require food and water", "Direction of travel"], correct: 1 },
    { eo: "M224.06", q: "Which of the following is a key signal preparation principle?", options: ["Prepare only one type of signal", "Prepare multiple types of signals and protect them from moisture and cold", "Keep all signals hidden until needed", "Use only electronic devices"], correct: 1 },
    { eo: "M224.06", q: "What should you ensure about the area before deploying signalling devices?", options: ["It should be concealed and hidden", "It should be open and visible from the air", "It should be deep in a forest", "It should be near a water source only"], correct: 1 },

    // ── EO C224.02 — Prepare a Signal Fire ──
    { eo: "C224.02", q: "What are the three types of emergency signal fires?", options: ["Campfire, bonfire, and torch fire", "Three-fire triangle pattern, torch tree, and luminous cone fire", "Smoke fire, flame fire, and heat fire", "Day fire, night fire, and signal fire"], correct: 1 },
    { eo: "C224.02", q: "What is a torch tree in the context of signal fires?", options: ["A tree used as firewood", "An isolated tree that is ignited to produce a large visible flame", "A tree branch used as a torch", "A tree marked with signal tape"], correct: 1 },
    { eo: "C224.02", q: "What is a luminous cone fire?", options: ["A fire built in a cone-shaped pit", "A tripod with a platform that supports an elevated, luminous fire", "A fire shaped like a traffic cone", "A fire made only of cone-shaped kindling"], correct: 1 },
    { eo: "C224.02", q: "How long should the sticks be for a luminous cone fire tripod?", options: ["1 metre long", "2 metres long", "3 metres long", "5 metres long"], correct: 1 },
    { eo: "C224.02", q: "How far below the apex of the tripod should the platform be placed in a luminous cone fire?", options: ["10-20 cm", "25-35 cm", "45-60 cm", "90-120 cm"], correct: 2 },
    { eo: "C224.02", q: "How are the three sticks of a luminous cone fire tripod secured?", options: ["Nailed together", "Lashed together in a tepee arrangement", "Wired together", "Glued at the base"], correct: 1 },
    { eo: "C224.02", q: "What is placed on the platform of a luminous cone fire?", options: ["Only large logs", "Tinder and kindling, with green boughs on top for smoke", "Wet leaves only", "Coal and oil"], correct: 1 },
    { eo: "C224.02", q: "Which of the following is the best location for a signal fire?", options: ["In a dense forest canopy", "On elevated ground in a highly visible clearing or near a stream edge, with fuel available", "In a narrow valley", "At the bottom of a ravine"], correct: 1 },
    { eo: "C224.02", q: "Which materials produce the most smoke when added to a signal fire?", options: ["Dry standing wood", "Leaves, green boughs, wet or damp wood, or rubber", "Dry grass and peat", "Animal dung and coal"], correct: 1 },
    { eo: "C224.02", q: "How can you maintain and puff the smoke from a signal fire?", options: ["By blowing on it directly", "By covering the fire with fuel and puffing the smoke with a blanket", "By pouring water on it", "By fanning it with your hands"], correct: 1 },
    { eo: "C224.02", q: "Why add green boughs to a signal fire?", options: ["To make it burn hotter", "To produce thick smoke for daytime visibility", "To prevent the fire from spreading", "To make the fire last longer at night"], correct: 1 },
    { eo: "C224.02", q: "Which of the following can be used as a fuel source for a signal fire?", options: ["Only dry standing wood", "Dry standing wood, dry inside fallen trees, green wood finely split, dry grasses, peat, animal dung, animal fats, coal/oil, or rubber", "Only commercial firelighters", "Only wet wood"], correct: 1 },
    { eo: "C224.02", q: "What is a hazard of lighting a signal fire without proper preparation?", options: ["It may not burn brightly enough", "It can start a forest fire and endanger the cadet and rescuers", "It will attract unwanted wildlife", "It will deplete your fuel supply"], correct: 1 },
    { eo: "C224.02", q: "Why is rubber or plastic useful in a signal fire?", options: ["It burns very cleanly", "It produces dense black smoke that is highly visible", "It prevents the fire from spreading", "It makes the fire smell pleasant"], correct: 1 },
    { eo: "C224.02", q: "What is the total time allocated for EO C224.02 (Prepare a Signal Fire)?", options: ["30 minutes", "45 minutes", "60 minutes", "90 minutes"], correct: 2 },

    // ── Radio Communications: Voice Procedure ──
    { eo: "RADIO", q: "What does the voice procedure word 'OVER' mean?", options: ["End of transmission, no reply expected", "End of transmission, reply expected", "Message received and understood", "Will comply with instructions"], correct: 1 },
    { eo: "RADIO", q: "What does the voice procedure word 'OUT' mean?", options: ["End of transmission, no reply expected", "End of transmission, reply expected", "Message received and understood", "Request repetition"], correct: 0 },
    { eo: "RADIO", q: "What does the voice procedure word 'ROGER' mean?", options: ["Will comply with instructions", "Message received and understood", "End of transmission", "Request repetition"], correct: 1 },
    { eo: "RADIO", q: "What does the voice procedure word 'WILCO' mean?", options: ["Message received and understood only", "Will comply with the instructions received", "End of transmission, reply expected", "Request repetition of last message"], correct: 1 },
    { eo: "RADIO", q: "Why should you never say 'OVER AND OUT' together?", options: ["It is too long", "They are mutually exclusive — OVER means reply expected, OUT means no reply expected", "It confuses the radio equipment", "It is not a real phrase"], correct: 1 },
    { eo: "RADIO", q: "In the NATO phonetic alphabet, what word represents the letter 'C'?", options: ["Canada", "Charlie", "Cherokee", "Cobra"], correct: 1 },
    { eo: "RADIO", q: "In the NATO phonetic alphabet, what word represents the letter 'A'?", options: ["Apple", "Alpha", "America", "Adam"], correct: 1 },
    { eo: "RADIO", q: "In the NATO phonetic alphabet, what word represents the letter 'B'?", options: ["Bravo", "Boy", "Beta", "Boston"], correct: 0 },
    { eo: "RADIO", q: "In the NATO phonetic alphabet, what word represents the letter 'T'?", options: ["Tango", "Tommy", "Texas", "Target"], correct: 0 },
    { eo: "RADIO", q: "What is the primary rule for radio transmission length?", options: ["Transmit for as long as needed", "Keep transmissions short, clear, and concise", "Always transmit for at least 30 seconds", "Transmission length does not matter"], correct: 1 },

    // ── Radio Communications: SITREP ──
    { eo: "SITREP", q: "What does SITREP stand for?", options: ["Signal Report", "Situation Report", "Site Report", "System Report"], correct: 1 },
    { eo: "SITREP", q: "Which elements are essential in a properly formatted SITREP?", options: ["Only the location and weather", "Call sign, date-time group, situation, and requests", "Personal opinions and recommendations", "A detailed narrative of the entire patrol"], correct: 1 },
    { eo: "SITREP", q: "How should a SITREP be composed?", options: ["As long and detailed as possible", "Concise, factual, and clear", "In narrative story format", "With personal commentary included"], correct: 1 },
    { eo: "SITREP", q: "What should always begin a radio transmission?", options: ["The message content", "Your call sign followed by the recipient's call sign", "A greeting", "The time of day"], correct: 1 },

    // ── Radio Communications: Authentication & SIGSEC ──
    { eo: "AUTH", q: "What is the purpose of authentication in radio communications?", options: ["To encrypt all voice transmissions", "To verify that a transmitting station is legitimate using a pre-shared challenge-and-response code", "To change the radio frequency", "To boost the signal strength"], correct: 1 },
    { eo: "AUTH", q: "How is authentication typically performed on a radio net?", options: ["By sending a password in plain text", "By sending a challenge code and verifying the response against a pre-shared authentication table", "By asking for the operator's name", "By checking the signal strength"], correct: 1 },
    { eo: "AUTH", q: "What does the abbreviation SIGSEC stand for?", options: ["Signal Section", "Signal Security", "Signalling Sequence", "Signal Setup"], correct: 1 },
    { eo: "AUTH", q: "Which practice best supports signal security (SIGSEC)?", options: ["Long, detailed transmissions for clarity", "Short, concise transmissions with minimal chatter and no sensitive information", "Discussing patrol plans openly", "Transmitting continuously to maintain contact"], correct: 1 },
    { eo: "AUTH", q: "What is frequency discipline in radio operations?", options: ["Changing frequencies frequently to avoid detection", "Operating only on assigned frequencies, with changes authorized only by net control", "Using the highest available frequency", "Transmitting on all frequencies simultaneously"], correct: 1 },
    { eo: "AUTH", q: "Who has the authority to authorize a frequency change on a radio net?", options: ["Any operator on the net", "Only the net control station", "The most senior cadet present", "No one — frequencies are fixed permanently"], correct: 1 },
    { eo: "AUTH", q: "What should you assume about every radio transmission you make?", options: ["It is completely private", "It can be intercepted by unauthorized listeners", "It is automatically encrypted", "It disappears after reception"], correct: 1 },
    { eo: "AUTH", q: "What type of traffic has absolute priority over all other radio communications?", options: ["Routine logistics messages", "Distress calls", "Administrative announcements", "Training traffic"], correct: 1 },
    { eo: "AUTH", q: "When a distress call is heard on the radio net, what should all other stations do?", options: ["Continue their transmissions as normal", "Cease transmission and monitor the distress frequency", "Change to a different frequency", "Attempt to relay the distress message themselves"], correct: 1 },
    { eo: "AUTH", q: "What is a radio dead zone?", options: ["An area where radios are prohibited", "An area where terrain and elevation block radio signals", "A frequency that is no longer assigned", "A type of radio encryption"], correct: 1 }
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
  // MAP PROGRESS SYNC — badge 7 on the quest map
  // ==========================================================
  function syncMapProgress() {
    try {
      const allDone = MISSIONS.every(m => state.completedMissions.includes(m.id));
      let mapProgress = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || "[]");
      if (allDone && !mapProgress.includes(SIGNALS_BADGE_ID)) {
        mapProgress.push(SIGNALS_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      } else if (!allDone && mapProgress.includes(SIGNALS_BADGE_ID)) {
        mapProgress = mapProgress.filter(id => id !== SIGNALS_BADGE_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      }
    } catch (e) {}
  }

  // ==========================================================
  // SCENE SVG GENERATORS — Signals & comms themes (signal blue/teal)
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
    const end = `</svg>`;
    const grad = (id, c1, c2) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;

    if (scene === "flares") {
      return base + grad("g", "#0a1628", "#040a14") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="300" cy="40" r="3" fill="#ff5a6e"/>
        <line x1="300" y1="40" x2="300" y2="120" stroke="#ff8a5a" stroke-width="2" stroke-dasharray="3 3" opacity="0.6"/>
        <path d="M 300 120 L 296 130 L 300 135 L 304 130 Z" fill="#ff5a6e"/>
        <text x="320" y="80" fill="#ff8a5a" font-size="10" font-family="monospace">45-60m ALT</text>
        <text x="320" y="96" fill="#ff8a5a" font-size="9" font-family="monospace">7-15s BURN</text>
        <circle cx="150" cy="60" r="12" fill="none" stroke="#5b9eff" stroke-width="1" opacity="0.4"/>
        <circle cx="150" cy="60" r="20" fill="none" stroke="#5b9eff" stroke-width="1" opacity="0.2"/>
        <line x1="150" y1="48" x2="150" y2="72" stroke="#5b9eff" stroke-width="2"/>
        <line x1="138" y1="60" x2="162" y2="60" stroke="#5b9eff" stroke-width="2"/>
        <text x="150" y="95" fill="#5b9eff" font-size="9" font-family="monospace" text-anchor="middle">MIRROR</text>
        <text x="470" y="80" fill="#1ec8a5" font-size="24" text-anchor="middle">📢</text>
        <text x="470" y="105" fill="#1ec8a5" font-size="9" font-family="monospace" text-anchor="middle">3 BLASTS</text>
        <text x="300" y="165" fill="#5b9eff" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">FIELD SIGNALLING DEVICES</text>
      ` + end;
    }
    if (scene === "groundair") {
      return base + grad("g", "#0a1628", "#040a14") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="40" y="60" width="520" height="80" fill="#0d1a2e" stroke="#2f6fbe" opacity="0.5"/>
        <line x1="150" y1="90" x2="190" y2="120" stroke="#ffb454" stroke-width="6" stroke-linecap="round"/>
        <line x1="150" y1="120" x2="190" y2="90" stroke="#ffb454" stroke-width="6" stroke-linecap="round"/>
        <text x="170" y="140" fill="#ffb454" font-size="14" font-family="monospace" text-anchor="middle" font-weight="bold">X</text>
        <line x1="250" y1="90" x2="250" y2="120" stroke="#1ec8a5" stroke-width="6" stroke-linecap="round"/>
        <line x1="240" y1="120" x2="260" y2="120" stroke="#1ec8a5" stroke-width="6" stroke-linecap="round"/>
        <text x="250" y="140" fill="#1ec8a5" font-size="14" font-family="monospace" text-anchor="middle" font-weight="bold">V</text>
        <line x1="330" y1="90" x2="330" y2="120" stroke="#5b9eff" stroke-width="6" stroke-linecap="round"/>
        <line x1="320" y1="100" x2="340" y2="100" stroke="#5b9eff" stroke-width="6" stroke-linecap="round"/>
        <text x="330" y="140" fill="#5b9eff" font-size="14" font-family="monospace" text-anchor="middle" font-weight="bold">F</text>
        <circle cx="480" cy="35" r="4" fill="#f5c84c"/>
        <text x="480" y="22" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle">SUN</text>
        <line x1="100" y1="30" x2="500" y2="30" stroke="#f5c84c" stroke-width="1" stroke-dasharray="4 4" opacity="0.4"/>
        <text x="300" y="20" fill="#f5c84c" font-size="8" font-family="monospace" text-anchor="middle">EAST-WEST ORIENTATION</text>
        <text x="300" y="165" fill="#5b9eff" font-size="9" font-family="monospace" text-anchor="middle">≥1m WIDE · ≥8m LONG · ≥3m APART</text>
      ` + end;
    }
    if (scene === "signalfire") {
      return base + grad("g", "#0a1628", "#040a14") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="120" cy="100" r="15" fill="#ff6b3a" opacity="0.8"/>
        <circle cx="120" cy="100" r="22" fill="#ff9a3a" opacity="0.4"/>
        <circle cx="240" cy="100" r="15" fill="#ff6b3a" opacity="0.8"/>
        <circle cx="240" cy="100" r="22" fill="#ff9a3a" opacity="0.4"/>
        <circle cx="380" cy="100" r="15" fill="#ff6b3a" opacity="0.8"/>
        <circle cx="380" cy="100" r="22" fill="#ff9a3a" opacity="0.4"/>
        <line x1="120" y1="120" x2="240" y2="120" stroke="#5b9eff" stroke-width="1" stroke-dasharray="4 4"/>
        <line x1="240" y1="120" x2="380" y2="120" stroke="#5b9eff" stroke-width="1" stroke-dasharray="4 4"/>
        <text x="180" y="135" fill="#5b9eff" font-size="8" font-family="monospace" text-anchor="middle">35m</text>
        <text x="310" y="135" fill="#5b9eff" font-size="8" font-family="monospace" text-anchor="middle">35m</text>
        <text x="250" y="150" fill="#5b9eff" font-size="9" font-family="monospace" text-anchor="middle">3-FIRE TRIANGLE</text>
        <line x1="450" y1="60" x2="455" y2="115" stroke="#1ec8a5" stroke-width="3"/>
        <line x1="460" y1="60" x2="465" y2="115" stroke="#1ec8a5" stroke-width="3"/>
        <line x1="470" y1="60" x2="475" y2="115" stroke="#1ec8a5" stroke-width="3"/>
        <circle cx="465" cy="75" r="6" fill="#4deec9" opacity="0.6"/>
        <text x="465" y="135" fill="#1ec8a5" font-size="8" font-family="monospace" text-anchor="middle">CONE FIRE</text>
        <text x="300" y="165" fill="#ff9a3a" font-size="9" font-family="monospace" text-anchor="middle">SIGNAL FIRE PREPARATION</text>
      ` + end;
    }
    if (scene === "radio") {
      return base + grad("g", "#0a1628", "#040a14") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="120" y="40" width="140" height="80" rx="6" fill="#0d1a2e" stroke="#1ec8a5" stroke-width="2"/>
        <circle cx="190" cy="70" r="18" fill="none" stroke="#1ec8a5" stroke-width="2"/>
        <circle cx="190" cy="70" r="12" fill="none" stroke="#4deec9" stroke-width="1" opacity="0.6"/>
        <circle cx="190" cy="70" r="6" fill="#1ec8a5"/>
        <rect x="140" y="98" width="100" height="14" rx="3" fill="#040a14" stroke="#2f6fbe"/>
        <text x="190" y="108" fill="#4deec9" font-size="8" font-family="monospace" text-anchor="middle">FREQ: 147.000</text>
        <text x="190" y="58" fill="#5b9eff" font-size="9" font-family="monospace" text-anchor="middle">RADIO NET</text>
        <path d="M 310 50 Q 320 45 330 50 Q 340 40 350 50" fill="none" stroke="#5b9eff" stroke-width="2"/>
        <path d="M 310 65 Q 320 60 330 65 Q 340 55 350 65" fill="none" stroke="#5b9eff" stroke-width="2" opacity="0.7"/>
        <path d="M 310 80 Q 320 75 330 80 Q 340 70 350 80" fill="none" stroke="#5b9eff" stroke-width="2" opacity="0.5"/>
        <text x="330" y="100" fill="#5b9eff" font-size="9" font-family="monospace" text-anchor="middle">VOICE PROC</text>
        <text x="420" y="50" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle">PHONETIC</text>
        <text x="420" y="70" fill="#f5c84c" font-size="11" font-family="monospace" text-anchor="middle" font-weight="bold">A-B-C-D</text>
        <text x="420" y="90" fill="#f5c84c" font-size="8" font-family="monospace" text-anchor="middle">Alpha Bravo</text>
        <text x="300" y="165" fill="#5b9eff" font-size="9" font-family="monospace" text-anchor="middle">RADIO VOICE PROCEDURE</text>
      ` + end;
    }
    if (scene === "sitrep") {
      return base + grad("g", "#0a1628", "#040a14") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="100" y="35" width="180" height="110" rx="4" fill="#0d1a2e" stroke="#2f6fbe" stroke-width="1.5"/>
        <text x="190" y="55" fill="#5b9eff" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">SITREP</text>
        <line x1="115" y1="62" x2="265" y2="62" stroke="#2f6fbe" opacity="0.5"/>
        <text x="115" y="78" fill="#4deec9" font-size="8" font-family="monospace">FROM: SIGNAL-1</text>
        <text x="115" y="93" fill="#4deec9" font-size="8" font-family="monospace">DTG: 071430Z</text>
        <text x="115" y="108" fill="#b0c4e0" font-size="8" font-family="monospace">SIT: Patrol at CP-B</text>
        <text x="115" y="121" fill="#b0c4e0" font-size="8" font-family="monospace">REQ: Reposition high</text>
        <text x="115" y="138" fill="#ffb454" font-size="8" font-family="monospace">END: OUT</text>
        <path d="M 340 60 Q 350 55 360 60 Q 370 50 380 60" fill="none" stroke="#1ec8a5" stroke-width="2"/>
        <path d="M 340 75 Q 350 70 360 75 Q 370 65 380 75" fill="none" stroke="#1ec8a5" stroke-width="2" opacity="0.7"/>
        <text x="380" y="95" fill="#1ec8a5" font-size="9" font-family="monospace" text-anchor="middle">TRANSMIT</text>
        <circle cx="450" cy="90" r="20" fill="none" stroke="#f5c84c" stroke-width="2" opacity="0.5"/>
        <text x="450" y="95" fill="#f5c84c" font-size="16" text-anchor="middle">📝</text>
        <text x="300" y="165" fill="#5b9eff" font-size="9" font-family="monospace" text-anchor="middle">SITREP FORMATTING</text>
      ` + end;
    }
    if (scene === "auth") {
      return base + grad("g", "#0a1628", "#040a14") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="100" y="35" width="120" height="100" rx="4" fill="#0d1a2e" stroke="#ffb454" stroke-width="1.5"/>
        <text x="160" y="55" fill="#ffb454" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">AUTH TABLE</text>
        <line x1="110" y1="62" x2="210" y2="62" stroke="#ffb454" opacity="0.4"/>
        <text x="110" y="78" fill="#4deec9" font-size="8" font-family="monospace">CHG: A7 → RSP: K3</text>
        <text x="110" y="92" fill="#4deec9" font-size="8" font-family="monospace">CHG: B2 → RSP: M9</text>
        <text x="110" y="106" fill="#4deec9" font-size="8" font-family="monospace">CHG: C5 → RSP: P1</text>
        <text x="110" y="125" fill="#ffb454" font-size="8" font-family="monospace">PRE-SHARED</text>
        <rect x="280" y="45" width="80" height="80" rx="4" fill="#0d1a2e" stroke="#1ec8a5" stroke-width="1.5"/>
        <text x="320" y="65" fill="#1ec8a5" font-size="16" text-anchor="middle">🔐</text>
        <text x="320" y="85" fill="#1ec8a5" font-size="8" font-family="monospace" text-anchor="middle">SIGSEC</text>
        <text x="320" y="100" fill="#4deec9" font-size="7" font-family="monospace" text-anchor="middle">SHORT TX</text>
        <text x="320" y="112" fill="#4deec9" font-size="7" font-family="monospace" text-anchor="middle">NO SENSITIVE</text>
        <rect x="420" y="45" width="80" height="80" rx="4" fill="#0d1a2e" stroke="#5b9eff" stroke-width="1.5"/>
        <text x="460" y="65" fill="#5b9eff" font-size="16" text-anchor="middle">🎚️</text>
        <text x="460" y="85" fill="#5b9eff" font-size="8" font-family="monospace" text-anchor="middle">FREQ DISC</text>
        <text x="460" y="100" fill="#4deec9" font-size="7" font-family="monospace" text-anchor="middle">ASSIGNED</text>
        <text x="460" y="112" fill="#4deec9" font-size="7" font-family="monospace" text-anchor="middle">ONLY</text>
        <text x="300" y="165" fill="#ffb454" font-size="9" font-family="monospace" text-anchor="middle">AUTHENTICATION & SIGNAL SECURITY</text>
      ` + end;
    }
    if (scene === "emergency") {
      return base + grad("g", "#0a1628", "#040a14") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <path d="M 0 130 L 120 80 L 240 110 L 360 60 L 480 90 L 600 70 L 600 180 L 0 180 Z" fill="#0d1a2e" stroke="#2f6fbe" opacity="0.6"/>
        <circle cx="300" cy="40" r="15" fill="#ff5a6e" opacity="0.3"/>
        <circle cx="300" cy="40" r="8" fill="#ff5a6e" opacity="0.6"/>
        <text x="300" y="44" fill="#ff5a6e" font-size="10" text-anchor="middle">📱</text>
        <text x="300" y="25" fill="#ff5a6e" font-size="8" font-family="monospace" text-anchor="middle">HIGHER GROUND</text>
        <path d="M 250 60 L 300 40 L 350 60" fill="none" stroke="#5b9eff" stroke-width="1" stroke-dasharray="3 3"/>
        <text x="180" y="105" fill="#ff5a6e" font-size="8" font-family="monospace" text-anchor="middle">DEAD ZONE</text>
        <line x1="120" y1="80" x2="120" y2="130" stroke="#ff5a6e" stroke-width="1" opacity="0.3"/>
        <text x="460" y="100" fill="#1ec8a5" font-size="20" text-anchor="middle">⏰</text>
        <text x="460" y="120" fill="#1ec8a5" font-size="8" font-family="monospace" text-anchor="middle">CHECK-IN</text>
        <text x="300" y="165" fill="#5b9eff" font-size="9" font-family="monospace" text-anchor="middle">EMERGENCY COMMUNICATIONS</text>
      ` + end;
    }
    if (scene === "challenge") {
      return base + grad("g", "#0a1628", "#040a14") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <circle cx="80" cy="60" r="14" fill="#ff6b3a" opacity="0.8"/>
        <circle cx="80" cy="60" r="20" fill="#ff9a3a" opacity="0.3"/>
        <circle cx="160" cy="100" r="14" fill="#ff6b3a" opacity="0.8"/>
        <circle cx="160" cy="100" r="20" fill="#ff9a3a" opacity="0.3"/>
        <circle cx="240" cy="70" r="14" fill="#ff6b3a" opacity="0.8"/>
        <circle cx="240" cy="70" r="20" fill="#ff9a3a" opacity="0.3"/>
        <text x="160" y="135" fill="#ff9a3a" font-size="7" font-family="monospace" text-anchor="middle">3-FIRE TRIANGLE</text>
        <line x1="320" y1="50" x2="340" y2="90" stroke="#1ec8a5" stroke-width="6" stroke-linecap="round"/>
        <line x1="320" y1="90" x2="340" y2="50" stroke="#1ec8a5" stroke-width="6" stroke-linecap="round"/>
        <text x="330" y="105" fill="#1ec8a5" font-size="9" font-family="monospace" text-anchor="middle">V</text>
        <rect x="400" y="50" width="60" height="50" rx="4" fill="#0d1a2e" stroke="#5b9eff"/>
        <text x="430" y="70" fill="#5b9eff" font-size="9" font-family="monospace" text-anchor="middle">RADIO</text>
        <text x="430" y="85" fill="#4deec9" font-size="7" font-family="monospace" text-anchor="middle">SITREP</text>
        <circle cx="490" cy="65" r="8" fill="none" stroke="#f5c84c" stroke-width="2"/>
        <text x="490" y="70" fill="#f5c84c" font-size="8" text-anchor="middle">🪞</text>
        <text x="540" y="70" fill="#5b9eff" font-size="9" font-family="monospace">✈️</text>
        <text x="540" y="85" fill="#5b9eff" font-size="7" font-family="monospace">SAR</text>
        <text x="300" y="165" fill="#f5c84c" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">FIELD SIGNALLING EXERCISE</text>
      ` + end;
    }
    return base + `<rect width="${W}" height="${H}" fill="#0a1628"/><text x="${W/2}" y="${H/2}" fill="#5b9eff" font-size="12" text-anchor="middle">SIGNAL WATCH</text>` + end;
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
    SIGNALS_BADGES.forEach(b => {
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
    document.getElementById("topRank").textContent = rank.name.replace("Signal Recruit", "Recruit").replace("Signal Cadet", "Cadet").replace("Signal ", "");
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
    document.getElementById("cmdBadgeTotal").textContent = "of " + SIGNALS_BADGES.length;

    // Threat meter — rises with wrong attempts
    const threatPct = Math.min(80, 20 + state.wrongAttempts * 5);
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
      const badge = SIGNALS_BADGES.find(b => b.mission === m.id);
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
    const badge = SIGNALS_BADGES.find(b => b.mission === m.id);
    const mp = missionProgress(m.id);
    return `<div class="task-console">
      <div class="task-body">
        <div class="complete-card">
          <div class="cc-ico">🏆</div>
          <div class="cc-title">Mission Complete: ${m.title}</div>
          <div class="cc-sub">${m.desc} You have successfully completed all ${m.tasks.length} tasks and earned the <strong>${badge ? badge.name : "Signal Cadet"}</strong> badge.</div>
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
    document.getElementById("ringRankLabel").textContent = rank.name.replace("Signal ", "");
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
      const h = Math.max(4, (xp / 150) * 140);
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
          NOMINAL: { cls: "low", text: "NOMINAL" },
          MINOR_HAZARD: { cls: "med", text: "MINOR HAZARD" },
          ABORTED: { cls: "high", text: "ABORTED" }
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
    showFeedback(fb, "ok", `SITREP filed successfully! +20 XP. Your signals instructor has received your report.`);
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
  // ARENA GAME ENGINE — Signals & Comms confirmation game
  // Draws from all MISSIONS modules: field signalling devices,
  // ground-to-air signals, signal fires, radio voice procedure,
  // SITREP, authentication & SIGSEC, emergency comms.
  // 10 questions per round, 8+ correct to pass, badge + 100 XP on first pass.
  // ==========================================================
  const signalsArena = {
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
        '<div class="arena-idle-ico">📡</div>' +
        '<h2>Advanced Signals & Comms Arena</h2>' +
        '<p class="muted" style="font-size:13px; line-height:1.6; max-width:480px; margin:0 auto;">Test your mastery of all Red Star Signals & Communications training modules. The Arena presents randomized questions drawn from every module — field signalling devices, ground-to-air visual signals, signal fire preparation, radio voice procedure, SITREP formatting, authentication & signal security, and emergency communications. Answer correctly to build your streak and confirm your advanced signals fundamentals.</p>' +
        '<div class="arena-mode-buttons" style="margin-top:20px;">' +
          '<button class="btn btn-primary" id="signalsArenaStartBtn" type="button">🎮 Start 10-Question Round</button>' +
          '<button class="btn btn-ghost" id="signalsArenaExamBtn" type="button" style="margin-left:10px;">📋 Exam Mode (8 to pass)</button>' +
        '</div>' +
        (state.arenaBadgeEarned ?
          '<p class="muted" style="margin-top:14px; font-size:12px;">✅ Signals Arena badge earned! Keep practising to improve your streak.</p>' :
          '<p class="muted" style="margin-top:14px; font-size:12px;">Complete a 10-question round with 8+ correct to earn the Signals Arena badge.</p>') +
      '</div>';
    arenaUpdateSide();

    const startBtn = document.getElementById("signalsArenaStartBtn");
    const examBtn = document.getElementById("signalsArenaExamBtn");
    if (startBtn) startBtn.addEventListener("click", function () { arenaStartRound(false); });
    if (examBtn) examBtn.addEventListener("click", function () { arenaStartRound(true); });
  }

  function arenaStartRound(examMode) {
    signalsArena.active = true;
    signalsArena.examMode = !!examMode;
    signalsArena.pool = shuffleArenaArray(ARENA_QUESTIONS.slice());
    signalsArena.poolIndex = 0;
    signalsArena.score = 0;
    signalsArena.correct = 0;
    signalsArena.wrong = 0;
    signalsArena.streak = 0;
    signalsArena.round = 0;
    signalsArena.totalRounds = 10;
    signalsArena.answered = false;
    arenaRenderQuestion();
  }

  function arenaRenderQuestion() {
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    if (signalsArena.poolIndex >= signalsArena.pool.length || signalsArena.round >= signalsArena.totalRounds) {
      arenaFinishRound();
      return;
    }
    signalsArena.currentQ = signalsArena.pool[signalsArena.poolIndex];
    signalsArena.answered = false;
    const q = signalsArena.currentQ;
    const progressPct = Math.round((signalsArena.round / signalsArena.totalRounds) * 100);

    stage.innerHTML =
      '<div class="arena-active">' +
        '<div class="arena-progress-bar"><div class="arena-progress-fill" style="width:' + progressPct + '%"></div></div>' +
        '<div class="arena-q-meta">' +
          '<span class="arena-eo-tag">' + escapeHTML(q.eo) + "</span>" +
          '<span class="arena-round">Question ' + (signalsArena.round + 1) + " of " + signalsArena.totalRounds + "</span>" +
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
    if (signalsArena.answered) return;
    signalsArena.answered = true;
    const q = signalsArena.currentQ;
    const isCorrect = idx === q.correct;
    const fb = document.getElementById("arenaFeedback");
    signalsArena.round++;

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
      signalsArena.correct++;
      signalsArena.streak++;
      if (signalsArena.streak > signalsArena.bestStreak) signalsArena.bestStreak = signalsArena.streak;
      signalsArena.score += 10 + (signalsArena.streak > 1 ? signalsArena.streak * 2 : 0);
      if (fb) { fb.className = "arena-feedback ok"; fb.innerHTML = "✅ Correct! " + escapeHTML(q.options[q.correct]) + (signalsArena.streak > 1 ? " — 🔥 " + signalsArena.streak + " streak!" : ""); }
    } else {
      signalsArena.wrong++;
      signalsArena.streak = 0;
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
      signalsArena.poolIndex++;
      arenaRenderQuestion();
    }, 1800);
  }

  function arenaFinishRound() {
    signalsArena.active = false;
    const stage = document.getElementById("arenaStage");
    if (!stage) return;
    const total = signalsArena.correct + signalsArena.wrong;
    const pct = total > 0 ? Math.round((signalsArena.correct / total) * 100) : 0;
    const passed = signalsArena.correct >= 8;

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
    if (signalsArena.examMode) {
      if (passed) {
        msg = "QUALIFIED! You passed the Advanced Signals & Comms exam with " + signalsArena.correct + "/" + total + " correct. Score: " + signalsArena.score + ".";
        badgeText = "Signals Arena badge unlocked — you have confirmed your advanced signals fundamentals!";
      } else {
        msg = "NOT YET QUALIFIED. You scored " + signalsArena.correct + "/" + total + ". You need 8/10 to pass. Review the Learn library and try again.";
      }
    } else {
      if (pct >= 80) {
        msg = "OUTSTANDING! " + signalsArena.correct + "/" + total + " correct (" + pct + "%). Score: " + signalsArena.score + ". Your advanced signals fundamentals are confirmed.";
        if (passed && state.arenaBadgeEarned) badgeText = "Signals Arena badge earned!";
      } else if (pct >= 50) {
        msg = "SOLID EFFORT. " + signalsArena.correct + "/" + total + " correct (" + pct + "%). Score: " + signalsArena.score + ". Review the Learn library and try again.";
      } else {
        msg = "KEEP TRAINING. " + signalsArena.correct + "/" + total + " correct (" + pct + "%). Study the Learn library and practise each module.";
      }
    }

    stage.innerHTML =
      '<div class="arena-complete">' +
        '<div class="arena-complete-ico">' + (passed ? "🏆" : "📊") + "</div>" +
        '<h2>' + (passed ? "Round Complete!" : "Round Complete") + "</h2>" +
        '<div class="arena-score-display">' +
          '<div class="arena-score-item"><div class="as-val">' + signalsArena.correct + "/" + total + '</div><div class="as-lbl">Correct</div></div>' +
          '<div class="arena-score-item"><div class="as-val">' + signalsArena.score + '</div><div class="as-lbl">Score</div></div>' +
          '<div class="arena-score-item"><div class="as-val">' + signalsArena.bestStreak + '</div><div class="as-lbl">Best Streak</div></div>' +
        "</div>" +
        '<p style="color:var(--ink-2); font-size:13px; line-height:1.6; max-width:440px; margin:12px auto;">' + msg + "</p>" +
        (badgeText ? '<p style="color:var(--gold-bright); font-size:13px; font-weight:600; margin:10px 0;">🏅 ' + escapeHTML(badgeText) + "</p>" : "") +
        '<div class="arena-mode-buttons" style="margin-top:16px;">' +
          '<button class="btn btn-primary" id="signalsArenaRetryBtn" type="button">🎮 Play Again</button>' +
          '<button class="btn btn-ghost" id="signalsArenaExamBtn2" type="button" style="margin-left:10px;">📋 Exam Mode</button>' +
        "</div>" +
      "</div>";

    arenaUpdateSide();
    if (passed) toast("ok", "🏆 Signals Arena round passed! " + signalsArena.correct + "/" + total + " correct.");

    const retryBtn = document.getElementById("signalsArenaRetryBtn");
    const examBtn2 = document.getElementById("signalsArenaExamBtn2");
    if (retryBtn) retryBtn.addEventListener("click", function () { arenaStartRound(false); });
    if (examBtn2) examBtn2.addEventListener("click", function () { arenaStartRound(true); });
  }

  function arenaUpdateSide() {
    const side = document.getElementById("arenaSide");
    if (!side) return;
    const total = signalsArena.correct + signalsArena.wrong;
    const pct = total > 0 ? Math.round((signalsArena.correct / total) * 100) : 0;
    side.innerHTML =
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">📊</span> Arena Stats</h3>' +
        '<div class="arena-stat-row"><span>Score</span><strong>' + signalsArena.score + "</strong></div>" +
        '<div class="arena-stat-row"><span>Correct</span><strong>' + signalsArena.correct + "/" + total + "</strong></div>" +
        '<div class="arena-stat-row"><span>Accuracy</span><strong>' + pct + "%</strong></div>" +
        '<div class="arena-stat-row"><span>Current Streak</span><strong>' + signalsArena.streak + "</strong></div>" +
        '<div class="arena-stat-row"><span>Best Streak</span><strong>' + signalsArena.bestStreak + "</strong></div>" +
      "</div>" +
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">🏆</span> Arena Badge</h3>' +
        '<div class="arena-badge-status ' + (state.arenaBadgeEarned ? "earned" : "locked") + '">' +
          (state.arenaBadgeEarned ?
            '<div class="ab-ico">🏅</div><div class="ab-text"><strong>Signals Arena</strong><br/>Badge Earned!</div>' :
            '<div class="ab-ico">🔒</div><div class="ab-text"><strong>Locked</strong><br/>Score 8/10 to unlock</div>') +
        "</div>" +
      "</div>" +
      '<div class="arena-stat-block">' +
        '<h3><span class="ico">📚</span> Question Pool</h3>' +
        '<div class="arena-stat-row"><span>Total Questions</span><strong>' + ARENA_QUESTIONS.length + "</strong></div>" +
        '<div class="arena-stat-row"><span>Modules Covered</span><strong>7</strong></div>' +
        '<div class="arena-stat-row"><span>Rounds Played</span><strong>' + (state.totalAttempts > 0 ? Math.floor(state.totalAttempts / 10) : 0) + "</strong></div>" +
      "</div>";
  }

  function renderArenaGame() {
    if (!signalsArena.active) {
      arenaRenderStartScreen();
    } else {
      arenaRenderQuestion();
    }
  }

  /* ── i18n: translate data arrays in-place ── */
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
