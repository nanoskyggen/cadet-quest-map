/* ============================================================
   RADIO COMMUNICATIONS TRAINING — radio_training.js
   CIS syllabus simulator with interactive radio game + audio
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "radioTrainingProgress",
    wrongAttempts: "radioTrainingWrongAttempts",
    streak: "radioTrainingStreak",
    bestStreak: "radioTrainingBestStreak",
    readArticles: "radioTrainingReadArticles",
    gameBest: "radioTrainingGameBest"
  };

  // ==========================================================
  // RANK LADDER — Signal cadet progression
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Radio Cadet Recruit", icon: "🎖️", xp: 0, callsign: "ALPHA-1" },
    { id: 1, name: "Signal Cadet", icon: "📟", xp: 300, callsign: "BRAVO-1" },
    { id: 2, name: "Communications Operator", icon: "📡", xp: 700, callsign: "DELTA-1" },
    { id: 3, name: "Senior Signaller", icon: "📻", xp: 1200, callsign: "KILO-1" },
    { id: 4, name: "Signals Specialist", icon: "⭐", xp: 1800, callsign: "ROMEO-1" },
    { id: 5, name: "Master Communicator", icon: "🏅", xp: 2500, callsign: "ZULU-1" }
  ];

  // ==========================================================
  // NATO PHONETIC ALPHABET
  // ==========================================================
  const PHONETICS = [
    { l: "A", w: "ALFA", p: "AL-FAH" },
    { l: "B", w: "BRAVO", p: "BRAH-VOH" },
    { l: "C", w: "CHARLIE", p: "CHAR-LEE" },
    { l: "D", w: "DELTA", p: "DELL-TAH" },
    { l: "E", w: "ECHO", p: "ECK-OH" },
    { l: "F", w: "FOXTROT", p: "FOKS-TROT" },
    { l: "G", w: "GOLF", p: "GOLF" },
    { l: "H", w: "HOTEL", p: "HOH-TEL" },
    { l: "I", w: "INDIA", p: "IN-DEE-AH" },
    { l: "J", w: "JULIETT", p: "JEW-LEE-ETT" },
    { l: "K", w: "KILO", p: "KEY-LOH" },
    { l: "L", w: "LIMA", p: "LEE-MAH" },
    { l: "M", w: "MIKE", p: "MIKE" },
    { l: "N", w: "NOVEMBER", p: "NO-VEM-BER" },
    { l: "O", w: "OSCAR", p: "OSS-CAH" },
    { l: "P", w: "PAPA", p: "PAH-PAH" },
    { l: "Q", w: "QUEBEC", p: "KEH-BECK" },
    { l: "R", w: "ROMEO", p: "ROW-ME-OH" },
    { l: "S", w: "SIERRA", p: "SEE-AIR-RAH" },
    { l: "T", w: "TANGO", p: "TANG-GO" },
    { l: "U", w: "UNIFORM", p: "YOU-NEE-FORM" },
    { l: "V", w: "VICTOR", p: "VIK-TAH" },
    { l: "W", w: "WHISKEY", p: "WISS-KEY" },
    { l: "X", w: "XRAY", p: "ECKS-RAY" },
    { l: "Y", w: "YANKEE", p: "YANG-KEY" },
    { l: "Z", w: "ZULU", p: "ZOO-LOO" }
  ];

  const PHONETIC_NUMS = [
    { n: 0, w: "ZERO" }, { n: 1, w: "WUN" }, { n: 2, w: "TOO" },
    { n: 3, w: "TREE" }, { n: 4, w: "FOW-ER" }, { n: 5, w: "FIFE" },
    { n: 6, w: "SIX" }, { n: 7, w: "SEV-EN" }, { n: 8, w: "AIT" },
    { n: 9, w: "NIN-ER" }
  ];

  // ==========================================================
  // TRAINING MODULES / MISSIONS
  // ==========================================================
  const MISSIONS = [
    {
      id: "phonetic_alphabet",
      order: 1,
      tag: "MODULE 01",
      icon: "🔤",
      title: "NATO Phonetic Alphabet",
      desc: "Master the 26-letter phonetic alphabet from ALFA to ZULU — the foundation of clear radio communication.",
      xp: 100,
      brief: "You are at the radio training station. Your instructor wants you to demonstrate the NATO phonetic alphabet, the standard words used to spell out letters over the radio so they cannot be confused. Open the radio set and work through each check.",
      scene: "radio",
      chapters: [
        { title: "Letter Recognition", desc: "Match letters to their phonetic words." },
        { title: "Word Decode", desc: "Identify which letter a phonetic word represents." },
        { title: "Spelling Practice", desc: "Spell a word using the phonetic alphabet." },
        { title: "Pronunciation", desc: "Confirm correct pronunciation guides." }
      ],
      tasks: [
        {
          type: "select", tool: "radio",
          title: "Phonetic for 'M'",
          prompt: "In the NATO phonetic alphabet, what word represents the letter 'M'?",
          options: ["Mexico", "Mike", "Mother", "Maple"],
          expected: "Mike",
          proof: "Phonetic confirmed — M = MIKE."
        },
        {
          type: "type", tool: "radio",
          title: "Decode 'Papa'",
          prompt: "Type the single letter that the phonetic word 'PAPA' represents.",
          expected: "P",
          proof: "Phonetic decode confirmed — PAPA = P."
        },
        {
          type: "select", tool: "radio",
          title: "Spell 'G' in 'Golf'",
          prompt: "Your callsign is GOLF-3. Which phonetic word do you transmit for the letter 'G'?",
          options: ["George", "Gulf", "Golf", "Giant"],
          expected: "Golf",
          proof: "Callsign spelled correctly — G = GOLF."
        },
        {
          type: "note", tool: "comms",
          title: "Log Why We Use Phonetics",
          prompt: "Switch to the COMMS log. Write a short entry explaining why the phonetic alphabet is used in radio communications. Your note must include the keywords 'clarity' and 'confusion'.",
          keywords: ["clarity", "confusion"],
          proof: "Phonetic rationale logged — clarity prevents confusion over noisy radio channels."
        }
      ]
    },
    {
      id: "phonetic_numbers",
      order: 2,
      tag: "MODULE 02",
      icon: "🔢",
      title: "Phonetic Numbers",
      desc: "Learn the special pronunciation of digits — WUN, TOO, TREE, FIFE — so numbers are never misheard on the net.",
      xp: 100,
      brief: "Numbers are pronounced differently over the radio to avoid confusion. Your instructor will test whether you can transmit and decode numbers using the correct phonetic pronunciation. Open the radio set and complete each task.",
      scene: "radio",
      chapters: [
        { title: "Number Pronunciation", desc: "Learn how each digit is spoken." },
        { title: "Group Decode", desc: "Read a group of numbers aloud correctly." },
        { title: "Digit to Word", desc: "Match numbers to their radio words." },
        { title: "Frequency Readback", desc: "Confirm a frequency using phonetic numbers." }
      ],
      tasks: [
        {
          type: "select", tool: "radio",
          title: "How to Say '5'",
          prompt: "Over the radio, how is the digit '5' pronounced to avoid confusion with '9'?",
          options: ["FIVE", "FIFE", "FIVER", "FIFY"],
          expected: "FIFE",
          proof: "Phonetic number confirmed — 5 = FIFE."
        },
        {
          type: "type", tool: "radio",
          title: "Decode 'TREE'",
          prompt: "Type the digit that the phonetic word 'TREE' represents.",
          expected: "3",
          proof: "Phonetic number decode confirmed — TREE = 3."
        },
        {
          type: "select", tool: "radio",
          title: "The Digit '9'",
          prompt: "Which pronunciation is used for the number '9' over the radio?",
          options: ["NINE", "NINER", "NIN-ER", "NINE-ER"],
          expected: "NIN-ER",
          proof: "Phonetic number confirmed — 9 = NIN-ER."
        },
        {
          type: "note", tool: "comms",
          title: "Read Back a Frequency",
          prompt: "Switch to COMMS. Read back the frequency 122.8 using phonetic numbers. Include the words 'WUN TOO TOO' and 'AIT' in your readback.",
          keywords: ["wun too too", "ait"],
          proof: "Frequency readback logged — 122.8 transmitted as WUN TOO TOO POINT AIT."
        }
      ]
    },
    {
      id: "clock_24hr",
      order: 3,
      tag: "MODULE 03",
      icon: "🕐",
      title: "The 24-Hour Clock",
      desc: "Read and convert the 24-hour clock used throughout the cadet program and military communications.",
      xp: 100,
      brief: "Radio operators and the military use the 24-hour clock to avoid AM/PM confusion. Your instructor will test your ability to read and convert 24-hour times. Open the radio set and work through each task.",
      scene: "radio",
      chapters: [
        { title: "Reading 24-Hour Time", desc: "Understand four-digit time groups." },
        { title: "AM Conversion", desc: "Convert morning times to 24-hour format." },
        { title: "PM Conversion", desc: "Convert afternoon and evening times." },
        { title: "Special Times", desc: "Recognise midnight and noon." }
      ],
      tasks: [
        {
          type: "select", tool: "radio",
          title: "Convert 2:30 PM",
          prompt: "What is 2:30 PM expressed in 24-hour clock format (four-digit group)?",
          options: ["0230", "1430", "1230", "1330"],
          expected: "1430",
          proof: "24-hour conversion confirmed — 2:30 PM = 1430."
        },
        {
          type: "type", tool: "radio",
          title: "Convert 9:15 AM",
          prompt: "Type 9:15 AM as a four-digit 24-hour time group (no colon, no spaces).",
          expected: "0915",
          proof: "24-hour conversion confirmed — 9:15 AM = 0915."
        },
        {
          type: "select", tool: "radio",
          title: "What Does '0000' Mean?",
          prompt: "In the 24-hour clock, what time does '0000' represent?",
          options: ["Noon (12:00 PM)", "Midnight (12:00 AM)", "10:00 PM", "1:00 AM"],
          expected: "Midnight (12:00 AM)",
          proof: "24-hour time confirmed — 0000 = midnight, the start of the day."
        },
        {
          type: "note", tool: "comms",
          title: "Log a Scheduled Check-In",
          prompt: "Switch to COMMS. Log a scheduled radio check-in at 7:45 PM using the 24-hour clock. Include the four-digit group '1945' and the word 'check-in' in your entry.",
          keywords: ["1945", "check-in"],
          proof: "Check-in logged — 1945 hrs (7:45 PM) recorded using 24-hour clock."
        }
      ]
    },
    {
      id: "voice_procedure",
      order: 4,
      tag: "MODULE 04",
      icon: "🗣️",
      title: "Voice Procedure (RSVP)",
      desc: "Master voice procedure using Rhythm, Speed, Volume, and Pitch — the four qualities of clear radio speech.",
      xp: 100,
      brief: "Voice Procedure (VP) is the set of rules for speaking clearly on the radio. The key is RSVP: Rhythm, Speed, Volume, and Pitch. Your instructor will test your understanding of each. Open the radio set and complete the tasks.",
      scene: "radio",
      chapters: [
        { title: "What is RSVP?", desc: "Learn the four qualities of voice procedure." },
        { title: "Correct Speed", desc: "Identify the proper speaking pace." },
        { title: "Volume & Pitch", desc: "Understand how loudness and tone affect clarity." },
        { title: "Listen Before Speaking", desc: "Confirm radio discipline rules." }
      ],
      tasks: [
        {
          type: "select", tool: "radio",
          title: "What Does RSVP Stand For?",
          prompt: "In voice procedure, what does RSVP refer to?",
          options: [
            "Rhythm, Speed, Volume, Pitch",
            "Radio, Signal, Volume, Power",
            "Receive, Send, Verify, Pause",
            "Range, Signal, Voice, Power"
          ],
          expected: "Rhythm, Speed, Volume, Pitch",
          proof: "Voice procedure confirmed — RSVP = Rhythm, Speed, Volume, Pitch."
        },
        {
          type: "select", tool: "radio",
          title: "Correct Speaking Speed",
          prompt: "When transmitting over the radio, how fast should you speak?",
          options: [
            "As fast as possible to save air time",
            "Slower than normal conversation, pausing between phrases",
            "At exactly the same speed as normal speech",
            "In a whisper to avoid blocking the frequency"
          ],
          expected: "Slower than normal conversation, pausing between phrases",
          proof: "Speed confirmed — speak slower than normal, with pauses between phrases."
        },
        {
          type: "select", tool: "radio",
          title: "First Rule of Radio Discipline",
          prompt: "Before transmitting on the radio, what must you always do first?",
          options: [
            "Shout your callsign to get attention",
            "Listen to make sure the frequency is clear",
            "Adjust your antenna to maximum height",
            "Turn up the volume to full"
          ],
          expected: "Listen to make sure the frequency is clear",
          proof: "Radio discipline confirmed — always listen before speaking to avoid blocking others."
        },
        {
          type: "note", tool: "comms",
          title: "Log the Four Qualities",
          prompt: "Switch to COMMS. Write a short note on the four qualities of voice procedure. Include all four words: 'rhythm', 'speed', 'volume', and 'pitch'.",
          keywords: ["rhythm", "speed", "volume", "pitch"],
          proof: "VP qualities logged — rhythm, speed, volume, and pitch all noted."
        }
      ]
    },
    {
      id: "prowords_calls",
      order: 5,
      tag: "MODULE 05",
      icon: "💬",
      title: "Prowords & Call Format",
      desc: "Learn procedural words like OVER, OUT, ROGER, WILCO, and the correct call format used on the radio net.",
      xp: 100,
      brief: "Prowords (procedural words) are standard terms that make radio communication precise and efficient. Your instructor will test your knowledge of prowords and the correct call format. Open the radio set and work through each task.",
      scene: "radio",
      chapters: [
        { title: "OVER vs OUT", desc: "Understand the difference between OVER and OUT." },
        { title: "ROGER & WILCO", desc: "Learn acknowledgment and compliance prowords." },
        { title: "Call Format", desc: "Build a correct radio call in proper order." },
        { title: "Other Prowords", desc: "Recognise SAY AGAIN, CORRECTION, STANDBY." }
      ],
      tasks: [
        {
          type: "select", tool: "radio",
          title: "Meaning of 'OVER'",
          prompt: "What does the proword 'OVER' mean in a radio transmission?",
          options: [
            "My transmission is ended and I expect a reply",
            "My transmission is ended and no reply is expected",
            "I am handing over control to another station",
            "The message is too long to send"
          ],
          expected: "My transmission is ended and I expect a reply",
          proof: "Proword confirmed — OVER means 'I expect a reply'."
        },
        {
          type: "select", tool: "radio",
          title: "Meaning of 'OUT'",
          prompt: "What does the proword 'OUT' signify when used at the end of a transmission?",
          options: [
            "I expect a reply from you",
            "My transmission is ended and no reply is expected — conversation finished",
            "The radio is being turned off",
            "Please repeat your last message"
          ],
          expected: "My transmission is ended and no reply is expected — conversation finished",
          proof: "Proword confirmed — OUT means 'conversation finished, no reply expected'."
        },
        {
          type: "select", tool: "radio",
          title: "Correct Call Format",
          prompt: "What is the correct order for a standard radio call?",
          options: [
            "Your message, then who you are, then who you are calling",
            "Who you are calling, THIS IS, who you are, your message, OVER",
            "Your callsign, your message, then the other station's callsign",
            "OVER, your message, who you are, OUT"
          ],
          expected: "Who you are calling, THIS IS, who you are, your message, OVER",
          proof: "Call format confirmed — called station, THIS IS, calling station, message, OVER."
        },
        {
          type: "note", tool: "comms",
          title: "Log ROGER vs WILCO",
          prompt: "Switch to COMMS. Explain the difference between ROGER and WILCO in a short note. Include both words 'ROGER' and 'WILCO'.",
          keywords: ["roger", "wilco"],
          proof: "Proword distinction logged — ROGER (understood) vs WILCO (will comply)."
        }
      ]
    },
    {
      id: "call_types_signals",
      order: 6,
      tag: "MODULE 06",
      icon: "🚨",
      title: "Call Types & Signal Reports",
      desc: "Learn the four priority call types — Routine, Security, Urgency, Distress — and how to report signal strength.",
      xp: 100,
      brief: "Radio calls are categorised by priority. Understanding call types and how to report signal quality (loudness and readability) is essential for safe net operations. Your instructor will test your knowledge. Open the radio set and complete each task.",
      scene: "radio",
      chapters: [
        { title: "Call Priorities", desc: "Learn Routine, Security, Urgency, and Distress." },
        { title: "Distress Calls", desc: "Recognise the MAYDAY emergency call." },
        { title: "Signal Loudness", desc: "Understand the 1–5 loudness scale." },
        { title: "Readability Reports", desc: "Learn '5 by 5' readability reporting." }
      ],
      tasks: [
        {
          type: "select", tool: "radio",
          title: "The Emergency Call",
          prompt: "Which call word, repeated three times, signals a DISTRESS (emergency) call on the radio?",
          options: ["Sécurité, Sécurité, Sécurité", "Pan-Pan, Pan-Pan, Pan-Pan", "Mayday, Mayday, Mayday", "Standby, Standby, Standby"],
          expected: "Mayday, Mayday, Mayday",
          proof: "Call type confirmed — MAYDAY ×3 = DISTRESS (emergency) call."
        },
        {
          type: "select", tool: "radio",
          title: "Urgency Call Word",
          prompt: "Which call word, repeated three times, signals an URGENCY call (serious but not immediately life-threatening)?",
          options: ["Mayday", "Pan-Pan", "Sécurité", "Roger"],
          expected: "Pan-Pan",
          proof: "Call type confirmed — Pan-Pan ×3 = URGENCY call."
        },
        {
          type: "select", tool: "radio",
          title: "Signal Readability '5 by 5'",
          prompt: "When a station reports '5 by 5' on a radio check, what does it mean?",
          options: [
            "Signal is weak and barely readable",
            "Loudness 5 (strong) and readability 5 (perfectly clear)",
            "Five minutes until the next transmission",
            "Five stations on the frequency"
          ],
          expected: "Loudness 5 (strong) and readability 5 (perfectly clear)",
          proof: "Signal report confirmed — 5 by 5 = maximum loudness and readability."
        },
        {
          type: "note", tool: "comms",
          title: "Log the Four Call Types",
          prompt: "Switch to COMMS. Write a note listing the four call types in order of priority. Include the words 'routine', 'security', 'urgency', and 'distress'.",
          keywords: ["routine", "security", "urgency", "distress"],
          proof: "Call types logged — routine, security, urgency, distress in priority order."
        }
      ]
    }
  ];

  // ==========================================================
  // LEARN LIBRARY ARTICLES
  // ==========================================================
  const LEARN_ARTICLES = [
    { id: "l_phonetic_full", cat: "Phonetic Alphabet", icon: "🔤", title: "The Full NATO Phonetic Alphabet", desc: "All 26 letters from ALFA to ZULU with pronunciation guides.", xp: 15,
      body: [
        { h: "Why a Phonetic Alphabet?", p: "Over a noisy radio channel, single letters like 'B' and 'D' or 'M' and 'N' sound almost identical. The NATO phonetic alphabet assigns a distinct, recognisable word to each letter so that spelled-out information — callsigns, grid references, names — is understood correctly the first time." },
        { h: "The Complete Alphabet", p: "Each letter is paired with its phonetic word and the approved pronunciation. Cadets memorise all 26 and must be able to spell any word aloud using them." }
      ],
      table: { headers: ["Letter", "Word", "Pronounce"], rows: PHONETICS.map(x => [x.l, x.w, x.p]) }
    },
    { id: "l_phonetic_nums", cat: "Phonetic Numbers", icon: "🔢", title: "Phonetic Number Pronunciation", desc: "How digits are spoken over the radio — WUN, TOO, TREE, FIFE.", xp: 15,
      body: [
        { h: "Why Numbers Sound Different", p: "Just like letters, numbers can be confused over the radio. 'Five' and 'nine' sound similar in poor conditions, as do 'three' and 'free'. To solve this, each digit has a special phonetic pronunciation designed for clarity at distance and through static." },
        { h: "The Ten Digits", p: "Numbers are spoken individually, not as groups. For example, the time 1430 is transmitted as 'WUN FOW-ER TREE ZERO', not 'fourteen thirty'. Decimal points are spoken as 'POINT'." }
      ],
      table: { headers: ["Digit", "Phonetic"], rows: PHONETIC_NUMS.map(x => [x.n, x.w]) }
    },
    { id: "l_clock24", cat: "24-Hour Clock", icon: "🕐", title: "The 24-Hour Clock System", desc: "Four-digit time groups used in military and cadet communications.", xp: 15,
      body: [
        { h: "No AM or PM", p: "The 24-hour clock eliminates the confusion between morning and afternoon by numbering the hours from 0000 (midnight) through 2359 (one minute before midnight). Every time is written as a four-digit group with no colon." },
        { h: "Conversion Rules", p: "For AM times (midnight to noon), the hours stay the same but are padded to two digits: 9:15 AM becomes 0915. For PM times (after noon), add 12 to the hour: 2:30 PM becomes 1430, and 7:45 PM becomes 1945. Special times: 0000 is midnight (start of day), 1200 is noon." },
        { h: "Speaking the Time", p: "Times are spoken digit by digit: 1430 is 'WUN FOW-ER TREE ZERO'. The word 'hours' may follow informally but is not required." }
      ]
    },
    { id: "l_voice_proc", cat: "Voice Procedure", icon: "🗣️", title: "Voice Procedure and RSVP", desc: "Rhythm, Speed, Volume, Pitch — the four qualities of clear speech.", xp: 15,
      body: [
        { h: "What is Voice Procedure?", p: "Voice Procedure (VP) is the standardised way of speaking on a radio so that messages are clear, concise, and unambiguous. Good VP ensures the receiver understands the message on the first transmission, saving air time and avoiding dangerous misunderstandings." },
        { h: "The RSVP Qualities", p: "Rhythm — speak in a steady, even cadence, not in bursts. Speed — speak slower than normal conversation, pausing briefly between natural phrase groups so the listener can absorb the information. Volume — speak at a normal conversational level; shouting distorts the microphone and whispering is lost in static. Pitch — keep your voice at its natural pitch; raising pitch causes distortion." },
        { h: "Radio Discipline", p: "Always listen before transmitting to ensure the frequency is clear. Be brief — say only what is necessary. Answer calls promptly. Never use the proword OVER and OUT together — they are mutually exclusive." }
      ]
    },
    { id: "l_prowords", cat: "Prowords", icon: "💬", title: "Procedural Words (Prowords)", desc: "OVER, OUT, ROGER, WILCO, SAY AGAIN, CORRECTION and more.", xp: 15,
      body: [
        { h: "What Are Prowords?", p: "Procedural words, or prowords, are standard terms that carry a specific meaning on the radio net. Using them ensures every operator understands exactly what is intended, without lengthy explanations." },
        { h: "Key Prowords", p: "OVER — my transmission is ended and I expect a reply. OUT — my transmission is ended and no reply is expected; the conversation is finished. ROGER — I have received and understood your message. WILCO — I will comply (contraction of 'will comply'). SAY AGAIN — repeat your last transmission. CORRECTION — an error was made; the correct version follows. STANDBY — wait, I will call you back. THIS IS — the callsign that follows is mine. WAIT — I must pause for a few seconds." },
        { h: "The Golden Rule", p: "Never say 'OVER AND OUT'. OVER invites a reply; OUT ends the conversation. They cannot be used together. Pick one based on whether you expect a response." }
      ]
    },
    { id: "l_call_types", cat: "Call Types", icon: "🚨", title: "Priority Call Types", desc: "Routine, Security, Urgency, and Distress — the four call priorities.", xp: 15,
      body: [
        { h: "Four Levels of Priority", p: "Radio calls are categorised by their urgency. Knowing the priority system ensures that emergency traffic always gets through first and that routine messages do not block the frequency when something urgent is happening." },
        { h: "The Call Types", p: "ROUTINE — normal day-to-day communications; no special call word. SECURITY (Sécurité, Sécurité, Sécurité) — a safety message about a hazard to navigation or operations. URGENCY (Pan-Pan, Pan-Pan, Pan-Pan) — a serious situation that is not immediately life-threatening but needs urgent attention. DISTRESS (Mayday, Mayday, Mayday) — a grave and imminent danger requiring immediate assistance; this is the highest priority and all other stations must stop transmitting." },
        { h: "Signal Reports", p: "Stations report signal quality using two scales, each from 1 to 5. Loudness measures signal strength (1 = faint, 5 = strong). Readability measures how clearly the message is understood (1 = unreadable, 5 = perfectly clear). A perfect signal is '5 by 5'." }
      ]
    },
    { id: "l_call_format", cat: "Call Format", icon: "📋", title: "The Standard Radio Call Format", desc: "How to structure a transmission: who, this is, message, over.", xp: 15,
      body: [
        { h: "The Call Order", p: "Every radio transmission follows a standard structure. You always identify who you are calling first, then who you are, then deliver your message, then close with a proword. This order ensures the called station knows the message is for them and who is sending it." },
        { h: "Step by Step", p: "1. Call the station you want: 'BRAVO-2,' 2. Identify yourself: 'this is CONTROL,' 3. Deliver your message: 'radio check, over.' The full call: 'BRAVO-2, this is CONTROL, radio check, OVER.' If BRAVO-2 replies 'CONTROL, this is BRAVO-2, ROGER, OUT' then the conversation is complete." },
        { h: "Confirmation", p: "After receiving an important message, repeat back the key details to confirm accuracy. This is called a 'readback' and ensures no information was lost in transmission." }
      ]
    }
  ];

  // ==========================================================
  // TOOLS
  // ==========================================================
  const TOOLS = [
    { id: "radio", icon: "📻", label: "Radio Set" },
    { id: "comms", icon: "📟", label: "Comms Log" },
    { id: "phonetic", icon: "🔤", label: "Phonetic Chart" },
    { id: "clock", icon: "🕐", label: "24-Hr Clock" }
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
      readArticles: []
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
  }

  // ==========================================================
  // SCENE SVG GENERATORS
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
    const end = `</svg>`;
    const grad = (id, c1, c2) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;

    if (scene === "radio") {
      return base + grad("g", "#0a2030", "#040a14") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <g opacity="0.12" stroke="#2dd4d4" stroke-width="0.5">
          <line x1="0" y1="45" x2="600" y2="45"/><line x1="0" y1="90" x2="600" y2="90"/><line x1="0" y1="135" x2="600" y2="135"/>
          <line x1="150" y1="0" x2="150" y2="180"/><line x1="300" y1="0" x2="300" y2="180"/><line x1="450" y1="0" x2="450" y2="180"/>
        </g>
        <rect x="170" y="30" width="260" height="120" rx="10" fill="#0d1d33" stroke="#1f4470"/>
        <rect x="190" y="48" width="220" height="44" rx="4" fill="#020610" stroke="#1f4470"/>
        <text x="300" y="70" fill="#5cf0f0" font-size="12" font-family="monospace" text-anchor="middle">FREQ 122.800</text>
        <text x="300" y="84" fill="#34d97b" font-size="10" font-family="monospace" text-anchor="middle">RX — STANDBY</text>
        <circle cx="220" cy="120" r="8" fill="#ff5a6e"/><text x="220" y="138" fill="#6f86a8" font-size="8" font-family="monospace" text-anchor="middle">TX</text>
        <circle cx="260" cy="120" r="8" fill="#34d97b"/><text x="260" y="138" fill="#6f86a8" font-size="8" font-family="monospace" text-anchor="middle">RX</text>
        <circle cx="300" cy="120" r="11" fill="#2dd4d4" stroke="#5cf0f0" stroke-width="1.5"/><text x="300" y="124" fill="#02101e" font-size="9" font-family="monospace" text-anchor="middle" font-weight="bold">PTT</text>
        <rect x="330" y="112" width="55" height="18" rx="3" fill="#020610" stroke="#1f4470"/>
        <text x="357" y="125" fill="#5cf0f0" font-size="10" font-family="monospace" text-anchor="middle">122.8</text>
        <text x="300" y="24" fill="#5cf0f0" font-size="10" font-family="monospace" text-anchor="middle">VHF RADIO SET — CIS STATION</text>
      ` + end;
    }
    if (scene === "tower") {
      return base + grad("g", "#061525", "#020a14") + `
        <rect width="${W}" height="${H}" fill="url(#g)"/>
        <rect x="0" y="140" width="600" height="40" fill="#0a1525"/>
        <line x1="300" y1="40" x2="300" y2="140" stroke="#1f4470" stroke-width="3"/>
        <line x1="270" y1="80" x2="330" y2="80" stroke="#1f4470" stroke-width="2"/>
        <line x1="278" y1="100" x2="322" y2="100" stroke="#1f4470" stroke-width="2"/>
        <line x1="285" y1="120" x2="315" y2="120" stroke="#1f4470" stroke-width="2"/>
        <circle cx="300" cy="35" r="4" fill="#ff5a6e"><animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite"/></circle>
        <circle cx="300" cy="140" r="6" fill="#0d1d33" stroke="#2dd4d4" stroke-width="1.5"/>
        <circle cx="300" cy="140" r="3" fill="#2dd4d4"/>
        <text x="300" y="168" fill="#5cf0f0" font-size="10" font-family="monospace" text-anchor="middle">SIGNAL TOWER — CIS</text>
      ` + end;
    }
    return base + `<rect width="${W}" height="${H}" fill="#0d1d33"/>` + end;
  }

  // ==========================================================
  // RANK LOGIC
  // ==========================================================
  function currentRank() {
    let r = RANKS[0];
    for (const rank of RANKS) { if (state.xp >= rank.xp) r = rank; }
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
  const RADIO_BADGES = [
    { id: "b_phonetic", icon: "🔤", name: "Phonetic Master", xp: 100, mission: "phonetic_alphabet" },
    { id: "b_numbers", icon: "🔢", name: "Number Sharp", xp: 100, mission: "phonetic_numbers" },
    { id: "b_clock", icon: "🕐", name: "Time Keeper", xp: 100, mission: "clock_24hr" },
    { id: "b_vp", icon: "🗣️", name: "Voice Procedure", xp: 100, mission: "voice_procedure" },
    { id: "b_prowords", icon: "💬", name: "Proword Pro", xp: 100, mission: "prowords_calls" },
    { id: "b_calls", icon: "🚨", name: "Call Type Expert", xp: 100, mission: "call_types_signals" }
  ];

  function refreshBadges() {
    state.badges = [];
    RADIO_BADGES.forEach(b => { if (state.completedMissions.includes(b.mission)) state.badges.push(b.id); });
  }

  // ==========================================================
  // MISSION PROGRESS HELPERS
  // ==========================================================
  function missionProgress(missionId) {
    return state.missionProgress[missionId] || { tasksDone: [], wrongAttempts: 0 };
  }
  function missionDone(m) { return state.completedMissions.includes(m.id); }
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
  function tasksDoneCount(m) { return missionProgress(m.id).tasksDone.length; }

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
    document.getElementById("topRank").textContent = rank.name.replace("Radio Cadet ", "").replace("Cadet ", "");
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
    document.getElementById("cmdBadgeTotal").textContent = "of " + RADIO_BADGES.length;

    const cl = document.getElementById("chapterList");
    cl.innerHTML = MISSIONS.map((m, i) => {
      const done = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total = m.tasks.length;
      const isActive = activeMissionId === m.id && !done;
      let cls = "chapter";
      let status = "";
      if (done) { cls += " done"; status = `<div class="ch-status done">COMPLETE — ${prog}/${total}</div>`; }
      else if (isActive) { cls += " active"; status = `<div class="ch-status ready">IN PROGRESS — ${prog}/${total}</div>`; }
      else if (unlocked) { cls += ""; status = `<div class="ch-status ready">READY — ${prog}/${total}</div>`; }
      else { cls += " locked"; status = `<div class="ch-status locked">LOCKED — complete Module ${m.order - 1}</div>`; }
      const num = done ? "" : `<span class="n">${m.order}</span>`;
      return `<div class="${cls}" data-mission="${m.id}">
        <div class="ch-num">${num}</div>
        <div class="ch-body">
          <div class="ch-title">${m.title}</div>
          <div class="ch-desc">${m.desc}</div>
          ${status}
        </div>
      </div>`;
    }).join("");
    cl.querySelectorAll(".chapter:not(.locked)").forEach(el => {
      el.addEventListener("click", () => { const mid = el.dataset.mission; openMission(mid); });
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
      if (done) cls += " done";
      if (!unlocked) cls += " locked";
      return `<div class="${cls}" data-mission="${m.id}">
        <div class="mc-ico">${m.icon}</div>
        <div class="mc-tag">${m.tag}</div>
        <div class="mc-title">${m.title}</div>
        <div class="mc-desc">${m.desc}</div>
        <div class="mc-meta"><span>⚡ ${missionXP(m)} XP</span><span>📋 ${prog}/${total}</span></div>
        <div class="mc-prog"><div class="mc-prog-fill" style="width:${pct}%"></div></div>
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
      if (done) cls += " done";
      if (activeMissionId === m.id) cls += " active";
      if (!unlocked) cls += " locked";
      return `<div class="${cls}" data-mission="${m.id}">
        <div class="mc-ico">${m.icon}</div>
        <div class="mc-tag">${m.tag}</div>
        <div class="mc-title">${m.title}</div>
        <div class="mc-desc">${m.desc}</div>
        <div class="mc-meta"><span>⚡ ${missionXP(m)} XP</span><span>📋 ${prog}/${total}</span></div>
        <div class="mc-prog"><div class="mc-prog-fill" style="width:${pct}%"></div></div>
      </div>`;
    }).join("");
    sel.querySelectorAll(".mission-card:not(.locked)").forEach(el => {
      el.addEventListener("click", () => openMission(el.dataset.mission));
    });
  }

  // ==========================================================
  // OPEN A MISSION
  // ==========================================================
  function openMission(missionId) {
    const m = MISSIONS.find(x => x.id === missionId);
    if (!m) return;
    if (!missionUnlocked(m)) { toast("warn", "🔒 Module " + m.order + " is locked. Complete the previous module first."); return; }
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
    if (missionDone(m)) { consoleEl.innerHTML = completedMissionHTML(m); bindCompleteEvents(m); return; }
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
          <div class="task-control" id="taskControl">${renderTaskControl(task, activeTaskIndex)}</div>
          <div class="task-actions">
            <button class="btn btn-primary" id="submitTaskBtn" type="button">✓ Submit &amp; Confirm</button>
            <button class="btn btn-ghost" id="hintBtn" type="button">💡 Hint</button>
            <button class="btn btn-ghost" id="speakTaskBtn" type="button">🔊 Hear It</button>
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
      </div>`;
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

  function bindCompleteEvents(m) {
    const fileBtn = document.getElementById("fileSitrepQuickBtn");
    if (fileBtn) fileBtn.addEventListener("click", () => { switchSection("sitrep"); });
    const backBtn = document.getElementById("backToListBtn");
    if (backBtn) backBtn.addEventListener("click", exitMission);
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
      return `<input class="task-slider" id="taskSlider" type="range" min="0" max="30" value="${sliderValue[idx]}" data-idx="${idx}" />
        <div class="slider-readout" id="sliderReadout">${sliderValue[idx]}</div>`;
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
        // Play a click sound
        radioSound("click");
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
        radioSound("beep");
      });
    }
    const slider = document.getElementById("taskSlider");
    if (slider) {
      slider.addEventListener("input", () => {
        const idx = parseInt(slider.dataset.idx, 10);
        sliderValue[idx] = parseInt(slider.value, 10);
        document.getElementById("sliderReadout").textContent = sliderValue[idx];
      });
    }
    const submitBtn = document.getElementById("submitTaskBtn");
    if (submitBtn) submitBtn.addEventListener("click", () => submitTask(task));
    const hintBtn = document.getElementById("hintBtn");
    if (hintBtn) hintBtn.addEventListener("click", () => showHint(task));
    const speakBtn = document.getElementById("speakTaskBtn");
    if (speakBtn) speakBtn.addEventListener("click", () => speakTaskPrompt(task));
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
    if (satisfied) { ico.textContent = "✅"; now.textContent = toolLabel(activeTool); }
    else { ico.textContent = "⚠️"; now.textContent = activeTool ? toolLabel(activeTool) : "NONE"; }
  }

  function toolLabel(id) { const t = TOOLS.find(x => x.id === id); return t ? t.label : id; }

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
      state.totalAttempts++; state.wrongAttempts++; state.streak = 0; saveState();
      fb.classList.add("show", "err");
      fb.innerHTML = `❌ Wrong tool! This task requires <strong>${toolLabel(task.tool)}</strong>. You currently have <strong>${activeTool ? toolLabel(activeTool) : "no tool"}</strong> open. Open the correct tool from the dock above.`;
      termPush("err", `✗ FAILED — wrong tool. Required: ${toolLabel(task.tool)}`);
      radioSound("error");
      updateAnalysis(); return;
    }
    const valid = validateTask(task);
    state.totalAttempts++;
    if (!valid.ok) {
      state.wrongAttempts++; state.streak = 0;
      const mp = missionProgress(m.id);
      mp.wrongAttempts = (mp.wrongAttempts || 0) + 1;
      state.missionProgress[m.id] = mp;
      saveState();
      fb.classList.add("show", "err");
      fb.innerHTML = `❌ ${valid.msg}`;
      termPush("err", `✗ ${valid.msg}`);
      radioSound("error");
      updateAnalysis(); return;
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
    radioSound("success");
    activeTaskIndex++;
    if (activeTaskIndex >= m.tasks.length) { completeMission(m); }
    else { setTimeout(() => renderMissionConsole(), 1100); }
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
      return val === exp ? { ok: true } : { ok: false, msg: `"${val}" is not correct. Hint: ${task.expected.length} character(s).` };
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
      return { ok: false, msg: `The reading is set to ${v}. Adjust the dial to match the target.` };
    }
    return { ok: false, msg: "Unknown task type." };
  }

  function showHint(task) {
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback show info";
    let hint = "";
    if (task.type === "select") hint = `The correct answer relates to: ${task.expected.split("(")[0].trim().slice(0, 40)}…`;
    else if (task.type === "type") hint = `The answer has ${task.expected.length} character(s) and starts with "${task.expected.charAt(0)}".`;
    else if (task.type === "note") hint = `Your note must include: ${task.keywords.join(", ")}${task.altKeywords ? " (or " + task.altKeywords.join(", ") + ")" : ""}.`;
    else if (task.type === "toggle") hint = "Click the toggle row to switch it to the ON (green) position.";
    else if (task.type === "slider") hint = `The target reading is close to ${task.expected}.`;
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
      const badge = RADIO_BADGES.find(b => b.mission === m.id);
      toast("ok", `🏅 Mission complete! +${earned} XP earned. Badge unlocked: ${badge ? badge.name : m.title}.`);
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
    const badge = RADIO_BADGES.find(b => b.mission === m.id);
    const mp = missionProgress(m.id);
    return `<div class="task-console">
      <div class="task-body">
        <div class="complete-card">
          <div class="cc-ico">🏅</div>
          <div class="cc-title">Mission Complete: ${m.title}</div>
          <div class="cc-sub">${m.desc} You have successfully completed all ${m.tasks.length} tasks and earned the <strong>${badge ? badge.name : "Signal Cadet"}</strong> badge.</div>
          <div class="cc-stats">
            <div class="cc-stat"><div class="v">+${earned}</div><div class="l">XP Earned</div></div>
            <div class="cc-stat"><div class="v">${mp.tasksDone.length}/${m.tasks.length}</div><div class="l">Tasks Done</div></div>
            <div class="cc-stat"><div class="v">${mp.wrongAttempts || 0}</div><div class="l">Wrong Attempts</div></div>
          </div>
          <div class="task-actions" style="justify-content:center;">
            <button class="btn btn-primary" id="fileSitrepQuickBtn" type="button">📟 File SITREP for this mission</button>
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
    document.getElementById("ringRankLabel").textContent = rank.name.replace("Radio Cadet ", "").replace("Cadet ", "");
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

  function updateAnalysis() { renderAnalysis(); renderSidebar(); renderTopStats(); }

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
          MINOR_INTERFERENCE: { cls: "med", text: "MINOR INTERFERENCE", color: "var(--amber)" },
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
    const entry = { mission, status, summary, time: new Date().toLocaleString("en-GB", { hour12: false }) };
    state.sitreps.push(entry);
    state.xp += 20;
    saveState();
    document.getElementById("sitrepSummary").value = "";
    document.getElementById("sitrepStatus").value = "";
    document.getElementById("sitrepMission").value = "";
    showFeedback(fb, "ok", "SITREP filed successfully! +20 XP. Your commanding officer has received your report.");
    toast("ok", "📟 SITREP filed! +20 XP");
    radioSound("transmit");
    renderSitrep(); renderSidebar(); renderTopStats(); renderCommand(); renderAnalysis();
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
    showArticleModal(a);
    if (!state.readArticles.includes(articleId)) {
      state.readArticles.push(articleId);
      state.xp += a.xp;
      saveState();
      toast("ok", `📖 Article read: "${a.title}" — +${a.xp} XP`);
      renderLearn(); renderSidebar(); renderTopStats(); renderAnalysis();
    } else {
      toast("info", `📖 Already read: "${a.title}"`);
    }
  }

  function showArticleModal(a) {
    // Remove existing
    const existing = document.getElementById("articleModalOverlay");
    if (existing) existing.remove();
    let bodyHTML = "";
    if (a.body) {
      bodyHTML += a.body.map(s => `<h3>${s.h}</h3><p>${s.p}</p>`).join("");
    }
    if (a.table) {
      bodyHTML += `<h3>Reference Table</h3><table><thead><tr>${a.table.headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>`;
      bodyHTML += a.table.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("");
      bodyHTML += `</tbody></table>`;
    }
    const overlay = document.createElement("div");
    overlay.className = "article-modal-overlay";
    overlay.id = "articleModalOverlay";
    overlay.innerHTML = `<div class="article-modal">
      <div class="article-modal-head">
        <h2>${a.icon} ${a.title}</h2>
        <button class="rg-modal-close" id="articleModalClose" type="button">✕</button>
      </div>
      <div class="article-modal-body">${bodyHTML}</div>
      <div class="article-modal-foot">
        <span class="am-xp">+${a.xp} XP earned for reading</span>
        <button class="btn btn-primary" id="articleModalDone" type="button">Got It</button>
      </div>
    </div>`;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    document.getElementById("articleModalClose").addEventListener("click", close);
    document.getElementById("articleModalDone").addEventListener("click", close);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
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
    if (name === "tower") rgInit();
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

  // ==========================================================
  // AUDIO ENGINE — Web Audio API for radio sounds + speech
  // ==========================================================
  let audioCtx = null;
  let audioMaster = null;

  function ensureAudio() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioMaster = audioCtx.createGain();
        audioMaster.gain.value = 0.4;
        audioMaster.connect(audioCtx.destination);
      } catch (e) { audioCtx = null; }
    }
    if (audioCtx && audioCtx.state === "suspended") { audioCtx.resume(); }
  }

  // --- Radio sound effects ---
  function radioSound(type) {
    ensureAudio();
    if (!audioCtx) return;
    const t = audioCtx.currentTime;
    if (type === "beep") {
      // Short beep tone
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = "sine"; osc.frequency.value = 880;
      osc.connect(g); g.connect(audioMaster);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.3, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.start(t); osc.stop(t + 0.15);
    } else if (type === "click") {
      // UI click
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = "square"; osc.frequency.value = 1200;
      osc.connect(g); g.connect(audioMaster);
      g.gain.setValueAtTime(0.15, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.start(t); osc.stop(t + 0.05);
    } else if (type === "success") {
      // Rising two-tone success
      [660, 990].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = "sine"; osc.frequency.value = freq;
        osc.connect(g); g.connect(audioMaster);
        const st = t + i * 0.1;
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.25, st + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, st + 0.2);
        osc.start(st); osc.stop(st + 0.22);
      });
    } else if (type === "error") {
      // Low buzz error
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = "sawtooth"; osc.frequency.value = 200;
      osc.connect(g); g.connect(audioMaster);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.2, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.start(t); osc.stop(t + 0.32);
    } else if (type === "static") {
      // Radio static burst
      const dur = 0.4;
      const bufSize = audioCtx.sampleRate * dur;
      const buf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) { data[i] = (Math.random() * 2 - 1) * 0.3; }
      const noise = audioCtx.createBufferSource(); noise.buffer = buf;
      const filt = audioCtx.createBiquadFilter();
      filt.type = "bandpass"; filt.frequency.value = 1500; filt.Q.value = 0.5;
      const g = audioCtx.createGain();
      noise.connect(filt); filt.connect(g); g.connect(audioMaster);
      g.gain.setValueAtTime(0.4, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      noise.start(t); noise.stop(t + dur + 0.02);
    } else if (type === "transmit") {
      // Transmit tone (PTT press) — keyed tone
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = "triangle"; osc.frequency.value = 440;
      osc.connect(g); g.connect(audioMaster);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.2, t + 0.03);
      g.gain.setValueAtTime(0.2, t + 0.15);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.start(t); osc.stop(t + 0.32);
    } else if (type === "roger") {
      // Roger beep (acknowledgment)
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = "sine"; osc.frequency.value = 1000;
      osc.connect(g); g.connect(audioMaster);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.3, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      osc.start(t); osc.stop(t + 0.2);
    } else if (type === "morse") {
      // Morse code beep (dah)
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = "sine"; osc.frequency.value = 750;
      osc.connect(g); g.connect(audioMaster);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.25, t + 0.02);
      g.gain.setValueAtTime(0.25, t + 0.18);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      osc.start(t); osc.stop(t + 0.24);
    }
  }

  // Speak text using Web Speech API (falls back gracefully)
  function speakText(text, rate) {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = rate || 0.85;
      u.pitch = 0.9;
      u.volume = 0.8;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  function speakTaskPrompt(task) {
    ensureAudio();
    radioSound("beep");
    setTimeout(() => speakText(task.prompt, 0.8), 200);
  }

  function speakPhonetic(letter) {
    ensureAudio();
    const entry = PHONETICS.find(p => p.l === letter.toUpperCase());
    if (!entry) return;
    radioSound("beep");
    // Add radio static then speak
    setTimeout(() => {
      radioSound("static");
      speakText(entry.w + ". " + entry.p, 0.75);
    }, 150);
  }

  // ==========================================================
  // RADIO NET GAME ENGINE
  // ==========================================================
  const RG = {
    running: false,
    paused: false,
    stations: [],
    selectedId: null,
    score: 0,
    confirmed: 0,
    missed: 0,
    wave: 1,
    spawnTimer: 0,
    spawnInterval: 4000, // ms
    rafId: null,
    lastFrame: 0,
    callNumber: 0,
    callParts: { callsign: null, proword: null, confirm: null },
    waveformSamples: [],
    waveformRaf: null
  };

  const RG_TOWER = { cx: 400, cy: 380 };
  const RG_NAMES = ["BRAVO", "DELTA", "FOXTROT", "KILO", "LIMA", "MIKE", "OSCAR", "ROMEO", "SIERRA", "TANGO", "UNIFORM", "WHISKEY"];
  const RG_MESSAGES = ["radio check", "requesting orders", "position report ready", "signal strength check", "requesting resupply", "reporting all clear"];
  const RG_PROWORDS = ["ROGER", "WILCO", "SAY AGAIN", "RADIO CHECK", "STANDBY"];

  function rgInitTowerSVG() {
    const svg = document.getElementById("rgTower");
    if (!svg) return;
    let html = "";
    // Sky gradient
    html += `<defs><linearGradient id="rgSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02101e"/><stop offset="1" stop-color="#061a2e"/></linearGradient></defs>`;
    html += `<rect width="800" height="550" fill="url(#rgSky)"/>`;
    // Grid
    html += `<g opacity="0.08" stroke="#2dd4d4" stroke-width="0.5">`;
    for (let x = 0; x <= 800; x += 50) html += `<line x1="${x}" y1="0" x2="${x}" y2="550"/>`;
    for (let y = 0; y <= 550; y += 50) html += `<line x1="0" y1="${y}" x2="800" y2="${y}"/>`;
    html += `</g>`;
    // Ground
    html += `<rect x="0" y="430" width="800" height="120" fill="#0a1525"/>`;
    html += `<line x1="0" y1="430" x2="800" y2="430" stroke="#1f4470" stroke-width="1.5"/>`;
    // Tower structure
    const tx = RG_TOWER.cx, ty = RG_TOWER.cy;
    html += `<rect x="${tx - 18}" y="${ty}" width="36" height="50" fill="#0d1d33" stroke="#1f4470" stroke-width="1.5"/>`;
    html += `<rect x="${tx - 22}" y="${ty - 15}" width="44" height="18" rx="3" fill="#122745" stroke="#1f4470"/>`;
    // Tower windows
    html += `<rect x="${tx - 14}" y="${ty + 8}" width="10" height="10" fill="#2dd4d4" opacity="0.4"/>`;
    html += `<rect x="${tx + 4}" y="${ty + 8}" width="10" height="10" fill="#2dd4d4" opacity="0.4"/>`;
    // Antenna mast
    html += `<line x1="${tx}" y1="${ty - 15}" x2="${tx}" y2="${ty - 110}" stroke="#5cf0f0" stroke-width="2"/>`;
    // Antenna crossbars
    html += `<line x1="${tx - 12}" y1="${ty - 50}" x2="${tx + 12}" y2="${ty - 50}" stroke="#2dd4d4" stroke-width="1.5"/>`;
    html += `<line x1="${tx - 8}" y1="${ty - 80}" x2="${tx + 8}" y2="${ty - 80}" stroke="#2dd4d4" stroke-width="1.5"/>`;
    // Tower warning light
    html += `<circle cx="${tx}" cy="${ty - 110}" r="4" fill="#ff5a6e"><animate attributeName="opacity" values="1;0.15;1" dur="1.5s" repeatCount="indefinite"/></circle>`;
    // Signal waves (animated)
    html += `<circle class="rg-wave" cx="${tx}" cy="${ty - 110}" r="8"/>`;
    html += `<circle class="rg-wave w2" cx="${tx}" cy="${ty - 110}" r="8"/>`;
    html += `<circle class="rg-wave w3" cx="${tx}" cy="${ty - 110}" r="8"/>`;
    // Tower label
    html += `<text x="${tx}" y="${ty + 68}" text-anchor="middle" class="rg-label" fill="#5cf0f0" font-size="11" font-weight="700">CONTROL TOWER</text>`;
    html += `<text x="${tx}" y="${ty + 80}" text-anchor="middle" class="rg-label" fill="#6f86a8" font-size="9">CIS — NET ALPHA</text>`;
    // Dynamic layers
    html += `<g id="rgConnectionsLayer"></g>`;
    html += `<g id="rgStationsLayer"></g>`;
    html += `<g id="rgEffectsLayer"></g>`;
    svg.innerHTML = html;
  }

  function rgSpawnStation() {
    const phonetic = RG_NAMES[Math.floor(Math.random() * RG_NAMES.length)];
    RG.callNumber++;
    const num = (RG.callNumber % 9) + 1;
    const callsign = phonetic + "-" + num;
    const message = RG_MESSAGES[Math.floor(Math.random() * RG_MESSAGES.length)];
    // Position around the tower perimeter
    const angle = Math.random() * Math.PI * 2;
    const dist = 180 + Math.random() * 80;
    const x = RG_TOWER.cx + Math.cos(angle) * dist;
    const y = 200 + Math.sin(angle) * 120; // keep in upper area
    const sigLoud = 3 + Math.floor(Math.random() * 3); // 3-5
    const sigRead = 3 + Math.floor(Math.random() * 3);
    const station = {
      id: "s" + Date.now() + Math.floor(Math.random() * 1000),
      callsign: callsign,
      phonetic: phonetic,
      num: num,
      message: message,
      messagePhonetic: message.toUpperCase(),
      x: x, y: y,
      sigLoud: sigLoud,
      sigRead: sigRead,
      signal: sigLoud + " by " + sigRead,
      state: "waiting", // waiting -> active -> confirmed | lost
      timer: 0,
      maxWait: 18000 - (RG.wave - 1) * 1000, // ms, shrinks with waves
      pulsePhase: Math.random() * Math.PI * 2
    };
    RG.stations.push(station);
    rgLog("info", "◆ " + callsign + " calling — \"" + message + "\", " + station.signal);
    rgUpdateStatus("📻 " + callsign + " is calling. Click to answer.");
    radioSound("beep");
  }

  function rgLoop(ts) {
    if (!RG.running || RG.paused) return;
    if (!RG.lastFrame) RG.lastFrame = ts;
    const dt = Math.min(100, ts - RG.lastFrame);
    RG.lastFrame = ts;

    rgUpdate(dt);
    rgRender();

    RG.rafId = requestAnimationFrame(rgLoop);
  }

  function rgUpdate(dt) {
    // Spawn logic
    RG.spawnTimer += dt;
    const interval = Math.max(2000, RG.spawnInterval - (RG.wave - 1) * 300);
    const activeCount = RG.stations.filter(s => s.state === "waiting" || s.state === "active").length;
    if (RG.spawnTimer >= interval && activeCount < 2 + Math.floor(RG.wave / 2)) {
      RG.spawnTimer = 0;
      rgSpawnStation();
    }

    // Wave progression
    if (RG.confirmed + RG.missed > 0 && (RG.confirmed + RG.missed) % 5 === 0) {
      if (RG.wave < Math.floor((RG.confirmed + RG.missed) / 5) + 1) {
        RG.wave = Math.floor((RG.confirmed + RG.missed) / 5) + 1;
        rgLog("info", "▣ WAVE " + RG.wave + " — traffic increasing. Stay sharp.");
        toast("ok", "Wave " + RG.wave + " — more stations incoming!");
        rgUpdateScoreboard();
      }
    }

    // Update stations
    for (let i = RG.stations.length - 1; i >= 0; i--) {
      const s = RG.stations[i];
      s.pulsePhase += 0.05;
      if (s.state === "waiting") {
        s.timer += dt;
        if (s.timer >= s.maxWait) {
          s.state = "lost";
          RG.missed++;
          RG.score = Math.max(0, RG.score - 30);
          rgLog("err", "✗ " + s.callsign + " timed out and dropped off the net. −30 pts.");
          rgUpdateStatus("⚠ " + s.callsign + " dropped off — missed call!");
          radioSound("error");
          rgUpdateScoreboard();
          if (RG.selectedId === s.id) { RG.selectedId = null; rgRenderSelected(); rgClearBuilder(); }
        }
      } else if (s.state === "confirmed" || s.state === "lost") {
        // Fade out after 2s
        s.fadeTimer = (s.fadeTimer || 0) + dt;
        if (s.fadeTimer > 2000) { RG.stations.splice(i, 1); }
      }
    }
  }

  function rgRender() {
    const layer = document.getElementById("rgStationsLayer");
    const connLayer = document.getElementById("rgConnectionsLayer");
    if (!layer) return;
    const tx = RG_TOWER.cx, ty = RG_TOWER.cy - 110;

    // Connection lines
    let connHTML = "";
    RG.stations.forEach(s => {
      if (s.state === "active" || s.state === "confirmed") {
        const color = s.state === "confirmed" ? "#34d97b" : "#ffd66b";
        const dash = s.state === "confirmed" ? "" : "stroke-dasharray=\"4 3\"";
        connHTML += `<line x1="${tx}" y1="${ty}" x2="${s.x}" y2="${s.y}" stroke="${color}" stroke-width="1.5" opacity="0.5" ${dash}/>`;
      }
    });
    connLayer.innerHTML = connHTML;

    // Station dots
    let html = "";
    RG.stations.forEach(s => {
      const selected = RG.selectedId === s.id;
      let color = "#6f86a8";
      let cls = "rg-target-dot";
      if (s.state === "waiting") { color = "#aebfd6"; }
      if (s.state === "active") { color = "#ffd66b"; cls += " transmitting"; }
      if (s.state === "confirmed") { color = "#5cf0f0"; cls += " selected"; }
      if (s.state === "lost") { color = "#ff5a6e"; }
      if (selected) { cls += " selected"; }
      const r = 5 + Math.sin(s.pulsePhase) * 1.5;
      const opacity = (s.state === "confirmed" || s.state === "lost") ? Math.max(0, 1 - (s.fadeTimer || 0) / 2000) : 1;
      html += `<circle class="${cls}" cx="${s.x}" cy="${s.y}" r="${r}" fill="${color}" opacity="${opacity}" data-station="${s.id}"/>`;
      html += `<circle cx="${s.x}" cy="${s.y}" r="${r + 6}" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity * 0.3}"/>`;
      if (opacity > 0.5) {
        html += `<text x="${s.x}" y="${s.y - 12}" text-anchor="middle" class="rg-label ${selected ? "rg-label-selected" : ""}" fill="${color}" font-size="10" font-weight="700">${s.callsign}</text>`;
      }
    });
    layer.innerHTML = html;
    // Bind clicks
    layer.querySelectorAll(".rg-target-dot").forEach(el => {
      el.addEventListener("click", () => rgSelectStation(el.dataset.station));
    });
  }

  function rgSelectStation(id) {
    const s = RG.stations.find(x => x.id === id);
    if (!s) return;
    if (s.state === "lost" || s.state === "confirmed") return;
    RG.selectedId = id;
    s.state = "active";
    radioSound("static");
    rgRenderSelected();
    rgRenderChips(s);
    rgUpdateStatus("📻 Selected " + s.callsign + " — build your transmission.");
  }

  function rgRenderSelected() {
    const empty = document.getElementById("rgsEmpty");
    const detail = document.getElementById("rgsDetail");
    const s = RG.stations.find(x => x.id === RG.selectedId);
    if (!s) {
      empty.style.display = "block";
      detail.style.display = "none";
      return;
    }
    empty.style.display = "none";
    detail.style.display = "block";
    document.getElementById("rgsCallsign").textContent = s.callsign;
    document.getElementById("rgsStation").textContent = "REMOTE";
    document.getElementById("rgsType").textContent = s.state.toUpperCase();
    document.getElementById("rgsMsg").textContent = "\"" + s.message + "\"";
    document.getElementById("rgsSignal").textContent = s.signal;
  }

  function rgRenderChips(s) {
    rgClearBuilder();
    // Step 1: Call sign chips — all station callsigns as options
    const callChips = document.getElementById("rgCallChips");
    const allCalls = RG.stations.filter(x => x.state === "waiting" || x.state === "active").map(x => x.callsign);
    // Add a few decoys
    const decoys = ["ALFA-1", "CHARLIE-3", "ECHO-5", "GOLF-2"];
    decoys.forEach(d => { if (!allCalls.includes(d)) allCalls.push(d); });
    // Shuffle
    allCalls.sort(() => Math.random() - 0.5);
    callChips.innerHTML = allCalls.map(c => `<span class="rg-chip" data-type="callsign" data-val="${c}">${c}</span>`).join("");

    // Step 3: Proword chips
    const prowordChips = document.getElementById("rgProwordChips");
    const prowords = RG_PROWORDS.slice().sort(() => Math.random() - 0.5);
    prowordChips.innerHTML = prowords.map(p => `<span class="rg-chip" data-type="proword" data-val="${p}">${p}</span>`).join("");

    // Step 4: Confirm chips — phonetic letters to spell the message
    const confirmChips = document.getElementById("rgConfirmChips");
    // The confirm should spell the first letter of the station's phonetic word
    const targetLetter = s.phonetic.charAt(0);
    const options = [targetLetter];
    // Add 3 decoy letters
    const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    while (options.length < 4) {
      const rand = allLetters[Math.floor(Math.random() * 26)];
      if (!options.includes(rand)) options.push(rand);
    }
    options.sort(() => Math.random() - 0.5);
    confirmChips.innerHTML = options.map(l => {
      const entry = PHONETICS.find(p => p.l === l);
      return `<span class="rg-chip" data-type="confirm" data-val="${l}" data-word="${entry ? entry.w : l}">${entry ? entry.w : l}</span>`;
    }).join("");

    // Bind chip clicks
    document.querySelectorAll(".rg-chip").forEach(chip => {
      chip.addEventListener("click", () => rgChipClick(chip));
    });
  }

  function rgChipClick(chip) {
    if (chip.classList.contains("disabled")) return;
    const type = chip.dataset.type;
    const val = chip.dataset.val;
    // Deselect others of same type
    document.querySelectorAll(`.rg-chip[data-type="${type}"]`).forEach(c => c.classList.remove("selected"));
    chip.classList.add("selected");
    RG.callParts[type] = val;
    radioSound("click");
    if (type === "confirm") {
      // Speak the phonetic word
      const word = chip.dataset.word;
      speakText(word, 0.7);
    }
    rgUpdateBuiltLine();
  }

  function rgUpdateBuiltLine() {
    const abl = document.getElementById("ablText");
    const parts = [];
    if (RG.callParts.callsign) parts.push(RG.callParts.callsign);
    parts.push("this is CONTROL,");
    if (RG.callParts.proword) parts.push(RG.callParts.proword);
    if (RG.callParts.confirm) {
      const entry = PHONETICS.find(p => p.l === RG.callParts.confirm);
      parts.push(entry ? entry.w : RG.callParts.confirm);
    }
    if (parts.length <= 2) {
      abl.textContent = "— select components —";
      abl.classList.remove("invalid");
      document.getElementById("rgTransmitBtn").disabled = true;
    } else {
      abl.textContent = parts.join(" ") + ", OVER";
      abl.classList.remove("invalid");
      document.getElementById("rgTransmitBtn").disabled = false;
    }
  }

  function rgClearBuilder() {
    RG.callParts = { callsign: null, proword: null, confirm: null };
    document.querySelectorAll(".rg-chip").forEach(c => c.classList.remove("selected"));
    const abl = document.getElementById("ablText");
    if (abl) { abl.textContent = "— select components —"; abl.classList.remove("invalid"); }
    const btn = document.getElementById("rgTransmitBtn");
    if (btn) btn.disabled = true;
    const callChips = document.getElementById("rgCallChips");
    const prowordChips = document.getElementById("rgProwordChips");
    const confirmChips = document.getElementById("rgConfirmChips");
    if (callChips) callChips.innerHTML = "";
    if (prowordChips) prowordChips.innerHTML = "";
    if (confirmChips) confirmChips.innerHTML = "";
  }

  function rgTransmit() {
    const s = RG.stations.find(x => x.id === RG.selectedId);
    if (!s) return;
    radioSound("transmit");
    setTimeout(() => radioSound("static"), 300);

    let points = 0;
    let feedback = [];
    let callSignOk = RG.callParts.callsign === s.callsign;
    let prowordOk = RG.callParts.proword === "ROGER" || RG.callParts.proword === "WILCO";
    let confirmOk = RG.callParts.confirm === s.phonetic.charAt(0);

    if (callSignOk) { points += 30; feedback.push("✓ Correct call sign"); }
    else { points -= 20; feedback.push("✗ Wrong call sign (should be " + s.callsign + ")"); }

    if (prowordOk) { points += 20; feedback.push("✓ Valid proword: " + RG.callParts.proword); }
    else { points -= 10; feedback.push("✗ Wrong/missing proword"); }

    if (confirmOk) {
      points += 50;
      const entry = PHONETICS.find(p => p.l === s.phonetic.charAt(0));
      feedback.push("✓ Correct confirmation: " + (entry ? entry.w : s.phonetic.charAt(0)));
    } else {
      points -= 10;
      feedback.push("✗ Wrong confirmation letter");
    }

    if (callSignOk && prowordOk && confirmOk) {
      // Full correct call — bonus
      points = 100;
      s.state = "confirmed";
      RG.confirmed++;
      rgLog("ok", "✓ " + s.callsign + " — ROGER, confirmed. +100 pts. Signal " + s.signal);
      rgUpdateStatus("✅ " + s.callsign + " confirmed — excellent work!");
      radioSound("roger");
      speakText(s.callsign + ", roger, out", 0.8);
    } else {
      s.state = "waiting"; // back to waiting if not fully correct
      s.timer = 0;
      rgLog("warn", "⚠ " + s.callsign + " — partial call. " + feedback.join("; ") + ". Net: " + (points > 0 ? "+" : "") + points + " pts.");
      rgUpdateStatus("⚠ " + s.callsign + " — transmission incomplete. Try again.");
    }

    RG.score = Math.max(0, RG.score + points);
    rgUpdateScoreboard();

    // Save best score
    try {
      const best = parseInt(localStorage.getItem(SK.gameBest) || "0", 10);
      if (RG.score > best) localStorage.setItem(SK.gameBest, String(RG.score));
    } catch (e) {}

    if (s.state === "confirmed") {
      RG.selectedId = null;
      rgRenderSelected();
      setTimeout(() => rgClearBuilder(), 1500);
    }
  }

  function rgLog(kind, text) {
    const term = document.getElementById("rgTerminal");
    if (!term) return;
    const ln = document.createElement("div");
    ln.className = "rg-ln rg-ln-" + kind;
    ln.textContent = text;
    term.appendChild(ln);
    term.scrollTop = term.scrollHeight;
  }

  function rgUpdateStatus(text) {
    const strip = document.getElementById("rgStatusStrip");
    const txt = document.getElementById("rgStatusTxt");
    txt.textContent = text;
    strip.classList.remove("alert", "success");
    if (text.startsWith("⚠")) strip.classList.add("alert");
    if (text.startsWith("✅")) strip.classList.add("success");
  }

  function rgUpdateScoreboard() {
    document.getElementById("rgScore").textContent = RG.score;
    document.getElementById("rgConfirmed").textContent = RG.confirmed;
    document.getElementById("rgWave").textContent = RG.wave;
    document.getElementById("rgMissed").textContent = RG.missed;
  }

  // --- Waveform animation ---
  function rgWaveformLoop() {
    const svg = document.getElementById("rgWaveform");
    if (!svg) return;
    if (!RG.running || RG.paused) { RG.waveformRaf = requestAnimationFrame(rgWaveformLoop); return; }
    // Generate waveform points
    const W = 600, H = 80;
    let path = "M0 40 ";
    for (let x = 0; x <= W; x += 4) {
      // Base noise + signal
      const noise = (Math.random() - 0.5) * 8;
      const signal = Math.sin(x * 0.05 + Date.now() * 0.003) * 12;
      const y = 40 + noise + signal;
      path += `L${x} ${y.toFixed(1)} `;
    }
    // Grid lines
    let gridHTML = "";
    for (let i = 1; i < 4; i++) {
      gridHTML += `<line class="rg-waveform-grid" x1="0" y1="${i * 20}" x2="${W}" y2="${i * 20}"/>`;
    }
    gridHTML += `<line class="rg-waveform-grid" x1="${W/2}" y1="0" x2="${W/2}" y2="${H}"/>`;
    svg.innerHTML = gridHTML + `<path class="rg-waveform-line" d="${path}"/>`;
    RG.waveformRaf = requestAnimationFrame(rgWaveformLoop);
  }

  function rgInit() {
    rgInitTowerSVG();
    rgUpdateScoreboard();
    rgClearBuilder();
    // Start waveform animation
    if (!RG.waveformRaf) rgWaveformLoop();
    // Bind game buttons if not already
    const startBtn = document.getElementById("rgStartBtn");
    if (startBtn && !startBtn.dataset.bound) {
      startBtn.dataset.bound = "1";
      startBtn.addEventListener("click", rgStart);
    }
    const pauseBtn = document.getElementById("rgPauseBtn");
    if (pauseBtn && !pauseBtn.dataset.bound) {
      pauseBtn.dataset.bound = "1";
      pauseBtn.addEventListener("click", rgPause);
    }
    const howBtn = document.getElementById("rgHowBtn");
    if (howBtn && !howBtn.dataset.bound) {
      howBtn.dataset.bound = "1";
      howBtn.addEventListener("click", rgShowHowTo);
    }
    const transmitBtn = document.getElementById("rgTransmitBtn");
    if (transmitBtn && !transmitBtn.dataset.bound) {
      transmitBtn.dataset.bound = "1";
      transmitBtn.addEventListener("click", rgTransmit);
    }
    const clearBtn = document.getElementById("rgClearBtn");
    if (clearBtn && !clearBtn.dataset.bound) {
      clearBtn.dataset.bound = "1";
      clearBtn.addEventListener("click", rgClearBuilder);
    }
    const modalClose = document.getElementById("rgModalClose");
    if (modalClose && !modalClose.dataset.bound) {
      modalClose.dataset.bound = "1";
      modalClose.addEventListener("click", rgHideHowTo);
    }
    const modalStart = document.getElementById("rgModalStart");
    if (modalStart && !modalStart.dataset.bound) {
      modalStart.dataset.bound = "1";
      modalStart.addEventListener("click", () => { rgHideHowTo(); rgStart(); });
    }
    const overlay = document.getElementById("rgModalOverlay");
    if (overlay && !overlay.dataset.bound) {
      overlay.dataset.bound = "1";
      overlay.addEventListener("click", (e) => { if (e.target === overlay) rgHideHowTo(); });
    }
  }

  function rgStart() {
    ensureAudio();
    if (RG.running && !RG.paused) return;
    RG.running = true;
    RG.paused = false;
    RG.lastFrame = 0;
    if (RG.rafId) cancelAnimationFrame(RG.rafId);
    RG.rafId = requestAnimationFrame(rgLoop);
    document.getElementById("rgStartBtn").disabled = true;
    document.getElementById("rgPauseBtn").disabled = false;
    rgUpdateStatus("📻 Net watch active — stations will call in. Answer them!");
    rgLog("info", "▶ NET WATCH STARTED — Wave " + RG.wave);
    radioSound("transmit");
  }

  function rgPause() {
    RG.paused = !RG.paused;
    const btn = document.getElementById("rgPauseBtn");
    btn.textContent = RG.paused ? "▶ Resume" : "⏸ Pause";
    rgUpdateStatus(RG.paused ? "⏸ Net watch paused." : "📻 Net watch resumed.");
    if (!RG.paused) { RG.lastFrame = 0; RG.rafId = requestAnimationFrame(rgLoop); }
  }

  function rgShowHowTo() {
    const overlay = document.getElementById("rgModalOverlay");
    if (overlay) overlay.style.display = "flex";
  }
  function rgHideHowTo() {
    const overlay = document.getElementById("rgModalOverlay");
    if (overlay) overlay.style.display = "none";
  }

  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(LEARN_ARTICLES); } catch(e) {}
    try { trMutate(MISSIONS); } catch(e) {}
    try { trMutate(PHONETICS); } catch(e) {}
    try { trMutate(PHONETIC_NUMS); } catch(e) {}
    try { trMutate(RADIO_BADGES); } catch(e) {}
    try { trMutate(RANKS); } catch(e) {}
    try { trMutate(RG); } catch(e) {}
    try { trMutate(RG_MESSAGES); } catch(e) {}
    try { trMutate(RG_NAMES); } catch(e) {}
    try { trMutate(RG_PROWORDS); } catch(e) {}
    try { trMutate(RG_TOWER); } catch(e) {}
    try { trMutate(SK); } catch(e) {}
    try { trMutate(TOOLS); } catch(e) {}
    try { trMutate(decoys); } catch(e) {}
    try { trMutate(feedback); } catch(e) {}
    try { trMutate(options); } catch(e) {}
    try { trMutate(parts); } catch(e) {}
    try { trMutate(sliderValue); } catch(e) {}
    try { trMutate(statusMap); } catch(e) {}
    try { trMutate(toggleState); } catch(e) {}
  }



  // ==========================================================
  // INIT
  // ==========================================================
  function init() {
    renderSidebar();
    renderTopStats();
    renderCommand();
    renderTraining();
    renderMissionSelector();
    renderRanks();
    renderSitrep();
    renderLearn();

    // Nav buttons
    document.querySelectorAll("#mainNav .nav-btn").forEach(btn => {
      btn.addEventListener("click", () => switchSection(btn.dataset.section));
    });

    // Mobile menu
    const mmb = document.getElementById("mobileMenuBtn");
    if (mmb) mmb.addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("open");
    });

    // SITREP file button
    const fileBtn = document.getElementById("fileSitrepBtn");
    if (fileBtn) fileBtn.addEventListener("click", fileSitrep);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
