/* ============================================================
   COMMUNITY SERVICE PROJECT TRAINING COMMAND — community_training.js
   Operation Civic Heart: project planning, risk assessment,
   community engagement, and debrief leadership.
   Maple Defender-style dashboard engine (IIFE architecture)
   Unique game: Project Command Center — interactive multi-stage
   community service project simulator with Web Audio API
   uplifting ambient music and sound effects.
   ============================================================ */

(function () {
  "use strict";

  // ==========================================================
  // STORAGE KEYS
  // ==========================================================
  const SK = {
    progress: "communityTrainingProgress",
    sitreps: "communityTrainingSitreps",
    wrongAttempts: "communityTrainingWrongAttempts",
    streak: "communityTrainingStreak",
    bestStreak: "communityTrainingBestStreak",
    readArticles: "communityTrainingReadArticles"
  };
  const MAP_PROGRESS_KEY = "cadetMapDemoYear2Completed";
  const COMMUNITY_LESSON_ID = 112;

  // ==========================================================
  // MODULE-LEVEL STATE VARIABLES
  // ==========================================================
  let state = null;
  let activeMissionId = null;
  let activeTaskIndex = 0;
  let activeTool = "";
  let toggleState = {};
  let sliderValue = {};
  let selectState = {};
  let orderState = {};

  // ==========================================================
  // RANK LADDER (Community Service progression ranks)
  // ==========================================================
  const RANKS = [
    { id: 0, name: "Service Recruit",           icon: "\u{1F91D}",  xp: 0,    callsign: "CIVIC-1" },
    { id: 1, name: "Service Cadet",             icon: "\u{1F4CB}",  xp: 300,  callsign: "HEART-2" },
    { id: 2, name: "Senior Service Cadet",      icon: "\u2B50",  xp: 700,  callsign: "SENIOR-3" },
    { id: 3, name: "Project Leader Cadet",      icon: "\u{1F3F4}\uFE0F",  xp: 1200, callsign: "LEAD-4" },
    { id: 4, name: "Community Commander Cadet", icon: "\u{1F451}",  xp: 1800, callsign: "CMDR-5" },
    { id: 5, name: "Civic Heart Master",        icon: "\u{1F3C6}",  xp: 2500, callsign: "MASTER-6" }
  ];

  // ==========================================================
  // TOOLS (community service project tools cadets must "open")
  // ==========================================================
  const TOOLS = [
    { id: "projectplan",  icon: "\u{1F4CB}", label: "Project Plan" },
    { id: "riskassess",   icon: "\u{1F4CB}", label: "Risk Assessment Form" },
    { id: "contactsheet", icon: "\u{1F4DE}", label: "Contact Sheet" },
    { id: "emaildraft",   icon: "\u{1F4E7}", label: "Email Draft" },
    { id: "timeline",     icon: "\u{1F4C5}", label: "Project Timeline" },
    { id: "resourceplan", icon: "\u{1F4E2}", label: "Resource Plan" },
    { id: "volunteerlist",icon: "\u{1F465}", label: "Volunteer Roster" },
    { id: "budgetsheet",  icon: "\u{1F4B0}", label: "Budget Sheet" },
    { id: "firstaidkit",  icon: "\u{1FA79}", label: "First Aid Kit" },
    { id: "commsplan",    icon: "\u{1F4F1}", label: "Communications Plan" },
    { id: "contingency",  icon: "\u{26A0}\uFE0F", label: "Contingency Plan" },
    { id: "debriefform",  icon: "\u{1F4DD}", label: "Debrief Form" },
    { id: "feedbackform", icon: "\u{1F4AC}", label: "Feedback Form" },
    { id: "sitrepform",   icon: "\u{1F4DD}", label: "SITREP Form" }
  ];

  // ==========================================================
  // TRAINING MISSIONS — Community Service Project
  // Based on Red Star PO X02 Perform Community Service syllabus
  // EO MX02.01: Perform Community Service (mandatory)
  // EO CX02.01: Perform Community Service (complementary)
  // Each mission has 4 hands-on tasks. Tool enforcement required.
  // ==========================================================
  const MISSIONS = [
    {
      id: "cs_scope",
      order: 1,
      tag: "COMMUNITY 01",
      icon: "\u{1F9ED}",
      title: "Defining the Project Scope",
      desc: "Learn how to identify a community need, select an appropriate service activity, and define clear project objectives.",
      xp: 100,
      brief: "Your community service instructor introduces the first step of any community service project: defining the scope. Before you plan anything, you need to identify a genuine community need, choose an activity that matches your cadet corps capabilities, and write clear objectives using the SMART criteria — Specific, Measurable, Achievable, Relevant, and Time-bound. A well-defined scope prevents scope creep and ensures your project delivers real value to the community.",
      scene: "scope",
      chapters: [
        { title: "Identifying Community Needs", desc: "Assess what your community actually needs — not what you assume." },
        { title: "Selecting the Right Activity", desc: "Match the activity to your team skills and available resources." },
        { title: "SMART Objectives", desc: "Specific, Measurable, Achievable, Relevant, Time-bound." },
        { title: "Defining Success Criteria", desc: "How will you know the project was successful?" }
      ],
      tasks: [
        {
          type: "select", tool: "projectplan",
          prompt: "Your cadet corps wants to do a community service project. What is the FIRST step you should take to define the project scope?",
          options: [
            { ico: "\u{1F4CB}", text: "Identify a genuine community need by researching and talking to community members", correct: true, fb: "Correct! Before planning anything, you must identify what the community actually needs. This means researching local issues, talking to community organizations, and understanding where your cadet corps can make a real impact. Starting with a genuine need ensures your project delivers value." },
            { ico: "\u{1F4B0}", text: "Set a budget and figure out how much money you can spend", correct: false, fb: "Budget is important but it comes later. You need to know what the project IS before you can budget for it. Start by identifying the community need." },
            { ico: "\u{1F465}", text: "Recruit volunteers and assign them to tasks", correct: false, fb: "Recruiting volunteers comes after you know what the project is. If you recruit before defining the scope, you may have the wrong people for the wrong project. Start with the community need." },
            { ico: "\u{1F4C5}", text: "Pick a date and set the timeline for the project", correct: false, fb: "Setting a date is part of planning, but you need to know what the project is first. The scope determines the timeline, not the other way around. Start by identifying the community need." }
          ]
        },
        {
          type: "select", tool: "projectplan",
          prompt: "You have identified that the local park has a litter problem. Which of the following is a SMART objective for a community clean-up project?",
          options: [
            { ico: "\u{1F9F9}", text: "Clean up Riverside Park on Saturday, May 15, with 12 cadets, collecting a minimum of 20 bags of litter from the trail and picnic areas", correct: true, fb: "Correct! This objective is Specific (Riverside Park, trail and picnic areas), Measurable (20 bags of litter, 12 cadets), Achievable (12 cadets can do this), Relevant (addresses the litter problem), and Time-bound (Saturday, May 15). This is a textbook SMART objective." },
            { ico: "\u{1F30A}", text: "Make the park look better", correct: false, fb: "This is too vague. 'Look better' is not measurable — how will you know when it is achieved? A SMART objective needs specific, measurable criteria." },
            { ico: "\u{1F310}", text: "Clean up every park in the city", correct: false, fb: "This is not achievable for a single cadet corps. SMART objectives must be Achievable — this scope is far too large for your team." },
            { ico: "\u{1F9F9}", text: "Pick up some litter when we have time", correct: false, fb: "This is neither time-bound nor specific. 'When we have time' has no deadline, and 'some litter' is not measurable. SMART objectives need concrete criteria." }
          ]
        },
        {
          type: "order", tool: "projectplan",
          prompt: "Arrange the steps for defining a community service project scope in the correct order.",
          items: [
            "Research community needs and talk to local organizations",
            "Select an activity that matches your corps capabilities",
            "Write SMART objectives for the project",
            "Define success criteria to measure outcomes"
          ],
          correctOrder: [0, 1, 2, 3]
        },
        {
          type: "select", tool: "projectplan",
          prompt: "Your cadet corps has 15 members and 4 hours available on a Saturday. Which project scope is most appropriate?",
          options: [
            { ico: "\u{1F9F9}", text: "Clean up a 2 km stretch of riverside trail with 12 cadets in 3 hours, leaving 1 hour for setup and debrief", correct: true, fb: "Correct! This scope is achievable for 15 cadets in 4 hours. It accounts for setup and debrief time, uses most of the team, and has a defined area. This is a realistic, well-scoped project." },
            { ico: "\u{1F3ED}", text: "Renovate the entire community centre building in one afternoon", correct: false, fb: "This is not achievable for 15 cadets in 4 hours. Building renovation requires trades skills, equipment, and weeks of work. The scope far exceeds your corps capabilities." },
            { ico: "\u{1F33F}", text: "Plant 500 trees across 3 different parks in the city", correct: false, fb: "This is too ambitious for 15 cadets in 4 hours. Multiple locations spread your team too thin, and 500 trees is a very large number. The scope exceeds your resources." },
            { ico: "\u{1F4A0}", text: "Solve the city homelessness problem", correct: false, fb: "This is a societal issue far beyond a single cadet corps project. SMART objectives must be Achievable — this scope is completely unrealistic for your team." }
          ]
        }
      ]
    },
    {
      id: "cs_plan",
      order: 2,
      tag: "COMMUNITY 02",
      icon: "\u{1F4CB}",
      title: "Writing the Project Plan",
      desc: "Break down the project into tasks, assign responsibilities, create a timeline, and build a resource plan.",
      xp: 100,
      brief: "With the scope defined, your instructor walks you through writing a detailed project plan. A good project plan breaks the activity into specific tasks, assigns each task to a team member or subgroup, creates a timeline with milestones, and identifies all required resources — materials, equipment, transportation, and personnel. The plan is your roadmap: without it, tasks get missed, timelines slip, and resources run short. You will learn task decomposition, responsibility assignment using a simple RACI approach, and timeline construction.",
      scene: "plan",
      chapters: [
        { title: "Task Decomposition", desc: "Break the project into small, manageable tasks." },
        { title: "Responsibility Assignment", desc: "Assign each task to a specific person or subgroup." },
        { title: "Timeline & Milestones", desc: "Create a schedule with key milestones and deadlines." },
        { title: "Resource Planning", desc: "List all materials, equipment, and personnel needed." }
      ],
      tasks: [
        {
          type: "select", tool: "timeline",
          prompt: "You are planning the Riverside Park clean-up. What is the best approach to breaking the project into tasks?",
          options: [
            { ico: "\u{1F4CB}", text: "Break the project into phases (setup, execution, cleanup, debrief) then list specific tasks under each phase", correct: true, fb: "Correct! Breaking the project into phases first, then listing specific tasks under each phase, creates an organized and complete task list. This ensures nothing is missed and the workflow is logical. For example: Setup phase includes gathering supplies and safety briefing; Execution includes litter collection and sorting." },
            { ico: "\u{1F4DD}", text: "Write one task: 'Clean up the park' and leave the rest to the team on the day", correct: false, fb: "A single vague task is not a plan. Without specific sub-tasks, team members will not know what to do, things will be missed, and the project will be disorganized. Break it down into phases and specific tasks." },
            { ico: "\u{1F465}", text: "List 50 micro-tasks with no grouping or structure", correct: false, fb: "While detailed, 50 ungrouped micro-tasks are overwhelming and hard to manage. Grouping tasks into phases makes the plan readable and actionable. Structure matters as much as detail." },
            { ico: "\u{1F634}", text: "Skip the task list and figure it out as you go", correct: false, fb: "Winging it leads to missed tasks, confused volunteers, and project failure. A project plan with structured tasks is essential for a successful community service activity." }
          ]
        },
        {
          type: "order", tool: "timeline",
          prompt: "Arrange these project phases for the clean-up event in the correct chronological order.",
          items: [
            "Planning & Preparation (weeks before)",
            "Volunteer Briefing & Setup (morning of event)",
            "Execution — Litter Collection (event day)",
            "Cleanup, Debrief & Documentation (end of event)"
          ],
          correctOrder: [0, 1, 2, 3]
        },
        {
          type: "select", tool: "resourceplan",
          prompt: "Which of the following is the most complete resource list for the Riverside Park clean-up?",
          options: [
            { ico: "\u{1F9F9}", text: "Garbage bags, gloves, litter pickers, first aid kit, hand sanitizer, water for volunteers, transportation, sign-in sheet, high-vis vests", correct: true, fb: "Correct! This is a complete resource list covering materials (bags, gloves, pickers), safety (first aid kit, sanitizer, vests), personnel support (water), logistics (transportation), and administration (sign-in sheet). A thorough resource plan anticipates every need." },
            { ico: "\u{1F4A7}", text: "Garbage bags", correct: false, fb: "This is far too incomplete. You need gloves for safety, a first aid kit for emergencies, water for volunteers, and many other items. A single-item resource list will leave you unprepared on event day." },
            { ico: "\u{1F4B0}", text: "Money for pizza afterward", correct: false, fb: "Post-event food is a nice-to-have but it is not the core resource list. You need operational supplies, safety equipment, and logistics support. Plan for the project needs first." },
            { ico: "\u{1F9F9}", text: "Garbage bags and gloves", correct: false, fb: "This is better than one item but still incomplete. You are missing a first aid kit (safety requirement), water (volunteer welfare), litter pickers (efficiency), high-vis vests (visibility), and a sign-in sheet (administration)." }
          ]
        },
        {
          type: "select", tool: "volunteerlist",
          prompt: "You have 12 volunteers for the clean-up. How should you assign responsibilities?",
          options: [
            { ico: "\u{1F465}", text: "Assign specific roles: 2 team leaders, 8 collectors in 2 teams of 4, 1 first aid attendant, 1 logistics coordinator", correct: true, fb: "Correct! This assigns clear roles with a chain of command (team leaders), divides workers into manageable teams (2 teams of 4), ensures safety coverage (first aid attendant), and handles logistics (coordinator). Every volunteer knows their role and responsibility." },
            { ico: "\u{1F634}", text: "Tell everyone to just grab a bag and start picking up litter", correct: false, fb: "Without assigned roles, there is no organization, no safety coverage, no one tracking progress, and no one managing logistics. Volunteers will be confused and the project will be inefficient." },
            { ico: "\u{1F451}", text: "Assign all 12 people to be team leaders", correct: false, fb: "If everyone is a leader, no one is doing the work. You need a mix of leaders and workers. 2 team leaders guiding 8 collectors is a much better structure." },
            { ico: "\u{1F468}\u200D\u2695\uFE0F", text: "Make one person responsible for everything", correct: false, fb: "One person cannot manage safety, logistics, and litter collection simultaneously. Distributing responsibilities across the team ensures all areas are covered and no one is overwhelmed." }
          ]
        }
      ]
    },
    {
      id: "cs_risk",
      order: 3,
      tag: "COMMUNITY 03",
      icon: "\u{26A0}\uFE0F",
      title: "Conducting a Risk Assessment",
      desc: "Identify hazards, assess risk levels, and implement control measures for an off-base community activity.",
      xp: 100,
      brief: "Safety is the top priority for any off-base cadet activity. Your instructor teaches you how to conduct a formal risk assessment before the community service event. The process has four steps: identify hazards (what could go wrong?), assess the risk level (how likely and how severe?), implement control measures (how do we reduce the risk?), and document the plan. Hazards for a park clean-up include sharp objects, weather, traffic, uneven terrain, and volunteer medical conditions. A thorough risk assessment is mandatory before any off-base activity.",
      scene: "risk",
      chapters: [
        { title: "Hazard Identification", desc: "What could cause harm during the activity?" },
        { title: "Risk Assessment Matrix", desc: "Rate likelihood and severity to determine risk level." },
        { title: "Control Measures", desc: "Implement controls using the hierarchy of controls." },
        { title: "Documentation & Review", desc: "Record the assessment and review it before the event." }
      ],
      tasks: [
        {
          type: "select", tool: "riskassess",
          prompt: "You are conducting a risk assessment for the Riverside Park clean-up. What is the FIRST step?",
          options: [
            { ico: "\u{1F50D}", text: "Identify all potential hazards associated with the activity and location", correct: true, fb: "Correct! The first step in any risk assessment is hazard identification. Walk the site, consider the activity, and list everything that could cause harm: sharp objects in litter, uneven terrain, traffic near the park, weather conditions, and volunteer medical conditions. You cannot control risks you have not identified." },
            { ico: "\u{1F6E1}\uFE0F", text: "Buy safety equipment and distribute it to volunteers", correct: false, fb: "Safety equipment is a control measure, but you cannot select the right equipment until you have identified the hazards. Hazard identification always comes first." },
            { ico: "\u{1F4DD}", text: "Fill out the risk assessment form with generic boilerplate text", correct: false, fb: "A generic risk assessment is useless. Every activity and location has unique hazards. You must actually identify the specific hazards for your event at your location." },
            { ico: "\u{1F691}", text: "Arrange for an ambulance to be on standby", correct: false, fb: "An ambulance is an emergency response measure, not a first step. You need to identify hazards first, then implement preventative controls, and only then plan emergency response. Start with hazard identification." }
          ]
        },
        {
          type: "select", tool: "riskassess",
          prompt: "You identify that volunteers will be picking up litter which may contain broken glass and sharp metal. Using the risk matrix (likelihood × severity), what is the appropriate risk level and control?",
          options: [
            { ico: "\u{1FA74}", text: "High risk — control with heavy-duty gloves, litter pickers, no hand contact with sharp items, and a sharps disposal container", correct: true, fb: "Correct! Sharp objects in litter are a high risk (likely to occur, moderate to severe injury). The hierarchy of controls says: eliminate where possible (use pickers so hands do not touch), protect with PPE (heavy-duty gloves), and provide proper disposal (sharps container). This is a comprehensive control strategy." },
            { ico: "\u{1F9F9}", text: "Low risk — just tell volunteers to be careful", correct: false, fb: "Telling people to 'be careful' is not a control measure. Sharp objects in litter are a high risk. You need physical controls: gloves, litter pickers, and proper disposal procedures. Verbal warnings alone do not reduce risk adequately." },
            { ico: "\u{1F6D1}", text: "Medium risk — cancel the litter collection and just do landscaping instead", correct: false, fb: "While elimination is the top of the hierarchy, you do not need to cancel the entire activity. The risk is manageable with proper controls (gloves, pickers, sharps container). Cancellation is only needed when risks cannot be adequately controlled." },
            { ico: "\u{1F44B}", text: "No risk — volunteers will know to avoid sharp objects", correct: false, fb: "This completely underestimates the hazard. Sharp objects in litter are a real and significant risk. Assuming volunteers will just avoid them is not a control measure. You must implement physical controls." }
          ]
        },
        {
          type: "order", tool: "riskassess",
          prompt: "Arrange the four steps of conducting a risk assessment in the correct order.",
          items: [
            "Identify hazards associated with the activity and location",
            "Assess the risk level using the likelihood × severity matrix",
            "Implement control measures to reduce each risk",
            "Document the assessment and brief the team before the event"
          ],
          correctOrder: [0, 1, 2, 3]
        },
        {
          type: "select", tool: "riskassess",
          prompt: "The weather forecast shows possible rain on the day of your outdoor clean-up event. What is the best approach to managing this risk?",
          options: [
            { ico: "\u{1F327}\uFE0F", text: "Monitor the forecast, prepare a rain contingency plan (indoor alternative or reschedule), brief volunteers on weather gear, and set a go/no-go decision time", correct: true, fb: "Correct! Weather is a common risk for outdoor events. The best approach is multi-layered: monitor the forecast, prepare a contingency plan, brief volunteers on what to bring, and set a clear decision time. This shows thorough risk management without overreacting." },
            { ico: "\u{1F634}", text: "Ignore it — a little rain never hurt anyone", correct: false, fb: "Ignoring weather risk is dangerous and irresponsible. Rain can create slippery conditions, reduce visibility, and cause volunteers to become cold and demoralized. As a leader, you must plan for weather contingencies." },
            { ico: "\u{1F6D1}", text: "Cancel the event immediately since rain is possible", correct: false, fb: "Canceling based on a possibility of rain is an overreaction. Weather forecasts change. The correct approach is to monitor, prepare a contingency, and make a go/no-go decision closer to the event date." },
            { ico: "\u{1F326}\uFE0F", text: "Hope it does not rain and deal with it if it does", correct: false, fb: "Hoping for good weather is not a risk management strategy. You need a contingency plan and a decision framework. As a project leader, you must be proactive, not reactive." }
          ]
        }
      ]
    },
    {
      id: "cs_comm",
      order: 4,
      tag: "COMMUNITY 04",
      icon: "\u{1F4DE}",
      title: "Communicating with Civilian Organisations",
      desc: "Draft professional emails, make phone calls, and confirm arrangements with civilian partner organisations.",
      xp: 100,
      brief: "Community service projects involve working with civilian organisations — local government, community groups, or charities. Your instructor teaches you how to communicate professionally with these partners. This means drafting clear, respectful emails that introduce your corps, state your purpose, and request specific support. It means following up with phone calls, confirming all arrangements in writing, and maintaining a contact log. Professional communication builds trust and ensures the partnership runs smoothly.",
      scene: "comm",
      chapters: [
        { title: "Professional Email Structure", desc: "Subject line, greeting, body, closing, and signature." },
        { title: "Making Contact by Phone", desc: "Prepare a script, speak clearly, and take notes." },
        { title: "Confirming Arrangements", desc: "Always confirm details in writing after verbal agreements." },
        { title: "Contact Log & Follow-Up", desc: "Track all communications and follow up on pending items." }
      ],
      tasks: [
        {
          type: "select", tool: "emaildraft",
          prompt: "You need to email the Riverside Park manager to request permission for your clean-up event. Which email subject line is most professional?",
          options: [
            { ico: "\u{1F4E7}", text: "Request for Permission — Cadet Corps Community Clean-Up at Riverside Park, May 15", correct: true, fb: "Correct! This subject line is clear, specific, and professional. It states the purpose (request for permission), identifies the group (Cadet Corps), describes the activity (community clean-up), names the location (Riverside Park), and includes the date (May 15). The recipient immediately knows what the email is about." },
            { ico: "\u{1F44B}", text: "Hey! Can we do a thing at the park?", correct: false, fb: "This is far too casual and vague for professional communication. A park manager needs to know who you are, what you want to do, where, and when. Use a clear, formal subject line." },
            { ico: "\u{1F4E7}", text: "URGENT!!!! NEED ANSWER ASAP!!!!", correct: false, fb: "All caps and excessive exclamation marks are unprofessional. This sounds demanding and gives no information about the actual request. Professional communication is calm, clear, and respectful." },
            { ico: "\u{1F4DD}", text: "Email", correct: false, fb: "This subject line says nothing. The recipient cannot prioritize or categorize the email. Always write a descriptive subject line that summarizes the content." }
          ]
        },
        {
          type: "select", tool: "contactsheet",
          prompt: "You have a phone call with the park manager who agrees to provide garbage bags and arrange pickup of collected litter. What should you do immediately after the call?",
          options: [
            { ico: "\u{1F4DD}", text: "Send a follow-up email confirming what was agreed: the garbage bags, the litter pickup arrangement, the date, and any other details discussed", correct: true, fb: "Correct! After any verbal agreement, always confirm in writing. This prevents misunderstandings, creates a record of what was agreed, and gives both parties a reference. A follow-up email saying 'Thank you for our call. To confirm, you will provide...' is professional and essential." },
            { ico: "\u{1F44D}", text: "Nothing — they said yes on the phone so it is settled", correct: false, fb: "Verbal agreements are easily forgotten or misunderstood. Without written confirmation, the park manager may forget the details or a miscommunication may go unnoticed. Always confirm in writing." },
            { ico: "\u{1F465}", text: "Tell your volunteers about the arrangement and move on", correct: false, fb: "While you should inform your volunteers, you also need to confirm the arrangement with the park manager in writing. Without confirmation, the agreement may not be honored on the day. Always document verbal agreements." },
            { ico: "\u{1F634}", text: "Wait until the day of the event to see if they remember", correct: false, fb: "Hoping the partner remembers is not a strategy. If they forget the garbage bags or the litter pickup, your event is in trouble. Confirm everything in writing immediately after the call." }
          ]
        },
        {
          type: "order", tool: "emaildraft",
          prompt: "Arrange the parts of a professional email to a civilian organisation in the correct order.",
          items: [
            "Subject line — clear and descriptive",
            "Greeting — formal and respectful (Dear Mr./Ms. Name)",
            "Body — introduction, purpose, specific request",
            "Closing — thank you, signature with contact details"
          ],
          correctOrder: [0, 1, 2, 3]
        },
        {
          type: "select", tool: "contactsheet",
          prompt: "Why is it important to maintain a contact log for all communications with your civilian partner?",
          options: [
            { ico: "\u{1F4D1}", text: "It creates a record of who said what and when, prevents miscommunication, and ensures follow-up items are not forgotten", correct: true, fb: "Correct! A contact log tracks every communication — emails, calls, meetings — with dates, topics, and outcomes. This prevents miscommunication ('we never agreed to that'), ensures follow-up items are tracked, and provides a reference if disputes arise. It is a fundamental project management tool." },
            { ico: "\u{1F634}", text: "It is not important — you can remember everything", correct: false, fb: "Human memory is unreliable, especially for multi-week projects with multiple communications. A contact log ensures nothing is forgotten and provides objective documentation. It is an essential project tool." },
            { ico: "\u{1F4CB}", text: "It is only needed for legal reasons if something goes wrong", correct: false, fb: "A contact log is not just for legal protection. It is an active project management tool that helps you track progress, follow up on items, and prevent miscommunication throughout the project, not just after problems." },
            { ico: "\u{1F4F1}", text: "It is only needed if you have more than one partner", correct: false, fb: "Even with a single partner, a contact log is essential. Multiple emails, calls, and meetings happen over the course of a project, and tracking them prevents miscommunication and forgotten items regardless of how many partners you have." }
          ]
        }
      ]
    },
    {
      id: "cs_resources",
      order: 5,
      tag: "COMMUNITY 05",
      icon: "\u{1F4E2}",
      title: "Allocating Resources & Budget",
      desc: "Manage the project budget, allocate materials and equipment, and coordinate transportation and logistics.",
      xp: 100,
      brief: "Every community service project requires resources — materials, equipment, transportation, and sometimes a budget. Your instructor teaches you how to create a resource plan that accounts for everything needed, estimate costs, allocate materials to teams, and coordinate logistics like transportation to and from the event site. Good resource management means your team has what they need, when they need it, without waste or shortage. You will learn budgeting basics, procurement, and logistics coordination.",
      scene: "resources",
      chapters: [
        { title: "Budget Estimation", desc: "Estimate costs for all materials, equipment, and logistics." },
        { title: "Procurement & Donations", desc: "Purchase supplies or seek donations from local businesses." },
        { title: "Material Allocation", desc: "Distribute supplies to teams fairly and efficiently." },
        { title: "Transportation & Logistics", desc: "Coordinate how volunteers and equipment get to the site." }
      ],
      tasks: [
        {
          type: "select", tool: "budgetsheet",
          prompt: "You are creating a budget for the Riverside Park clean-up. Which approach is most responsible?",
          options: [
            { ico: "\u{1F4B0}", text: "List all required items, estimate costs for each, total the budget, and identify what can be donated versus purchased", correct: true, fb: "Correct! A responsible budget lists every required item with estimated costs, totals the budget, and identifies where you can save through donations. Many local businesses will donate garbage bags, gloves, or water to a cadet community service project. This approach is thorough and cost-conscious." },
            { ico: "\u{1F634}", text: "Do not worry about budget — everything will work out", correct: false, fb: "Ignoring the budget leads to surprise costs, missing supplies, and financial problems. A responsible project leader estimates costs and plans the budget before the event." },
            { ico: "\u{1F4B8}", text: "Buy the most expensive equipment to be safe", correct: false, fb: "Buying the most expensive equipment is wasteful. Community service projects should be cost-conscious. Seek donations, buy what is needed at reasonable prices, and avoid unnecessary expense." },
            { ico: "\u{1F4B5}", text: "Ask each volunteer to bring their own supplies and spend nothing", correct: false, fb: "While volunteers can bring some personal items, relying entirely on them is unreliable. Some will forget or bring inadequate supplies. The corps should provide core safety equipment (gloves, first aid) and key materials." }
          ]
        },
        {
          type: "select", tool: "resourceplan",
          prompt: "You need 50 garbage bags, 15 pairs of gloves, and water for 12 volunteers. How should you acquire these resources?",
          options: [
            { ico: "\u{1F3EA}", text: "Ask local businesses for donations of garbage bags and water, purchase gloves with corps funds, and confirm the park manager is providing litter pickers", correct: true, fb: "Correct! A mixed approach is smart: seek donations from local businesses (many will support a cadet community project), purchase what cannot be donated, and confirm what the partner organisation is providing. This minimizes cost while ensuring all resources are secured." },
            { ico: "\u{1F6D2}", text: "Buy everything at full retail price from a hardware store", correct: false, fb: "While this works, it is not the most cost-conscious approach. Many local businesses will donate supplies to a cadet community service project. Seeking donations first saves corps funds and builds community relationships." },
            { ico: "\u{1F469}\u200D\u1F337}", text: "Ask each volunteer to buy their own gloves and bags", correct: false, fb: "Asking volunteers to buy their own supplies creates an unfair burden and reduces participation. The corps should provide core supplies. Seek donations or use corps funds for essential materials." },
            { ico: "\u{1F634}", text: "Show up on the day and hope someone brings supplies", correct: false, fb: "This is not resource planning — it is hoping for the best. Without secured resources, your event may not happen at all. Acquire all supplies before the event day." }
          ]
        },
        {
          type: "order", tool: "resourceplan",
          prompt: "Arrange the resource management steps in the correct order.",
          items: [
            "List all required resources with quantities",
            "Estimate costs and identify donation opportunities",
            "Acquire resources through purchase or donation",
            "Distribute resources to teams on event day"
          ],
          correctOrder: [0, 1, 2, 3]
        },
        {
          type: "select", tool: "resourceplan",
          prompt: "You need to transport 12 cadets and supplies to Riverside Park. What is the safest transportation plan?",
          options: [
            { ico: "\u{1F699}", text: "Arrange corps transportation with a qualified driver, confirm seatbelts for all passengers, plan the route, and brief the driver on the arrival time and loading point", correct: true, fb: "Correct! Safe transportation requires a qualified driver, seatbelts for everyone, a planned route, and clear instructions. For cadet activities, transportation must follow corps policies including qualified drivers and appropriate vehicles. Planning the route and timing prevents delays." },
            { ico: "\u{1F697}", text: "Have cadets drive themselves in their personal vehicles", correct: false, fb: "Cadets driving themselves is generally not permitted for official cadet activities and creates liability issues. Transportation should be arranged through the corps with qualified drivers and appropriate vehicles." },
            { ico: "\u{1F6B6}", text: "Have everyone walk to the park carrying all the supplies", correct: false, fb: "Walking may be feasible if the park is very close, but carrying all supplies (50 garbage bags, water, equipment) on foot is impractical. Arrange proper transportation for volunteers and supplies." },
            { ico: "\u{1F634}", text: "Tell everyone to find their own way there", correct: false, fb: "Uncoordinated transportation leads to late arrivals, lost volunteers, and safety issues. As a project leader, you should arrange or coordinate transportation to ensure everyone arrives safely and on time." }
          ]
        }
      ]
    },
    {
      id: "cs_eventday",
      order: 6,
      tag: "COMMUNITY 06",
      icon: "\u{1F4C5}",
      title: "Event Day Execution",
      desc: "Run the safety briefing, manage volunteers, monitor progress, and respond to unexpected situations on event day.",
      xp: 100,
      brief: "The day of the event has arrived. Your instructor walks you through event day leadership: conducting a safety briefing before work begins, managing your volunteer teams, monitoring progress against the plan, and responding to unexpected situations. Event day is where all your planning pays off — but it is also where things go wrong. A good leader stays calm, adapts to changes, communicates clearly, and keeps safety as the top priority throughout the activity.",
      scene: "eventday",
      chapters: [
        { title: "Safety Briefing", desc: "Brief volunteers on hazards, controls, and emergency procedures." },
        { title: "Team Management", desc: "Keep teams on task, motivated, and coordinated." },
        { title: "Progress Monitoring", desc: "Track completion against the plan and adjust as needed." },
        { title: "Incident Response", desc: "Respond calmly and effectively to unexpected situations." }
      ],
      tasks: [
        {
          type: "select", tool: "commsplan",
          prompt: "Volunteers have arrived at Riverside Park. What is the FIRST thing you should do before work begins?",
          options: [
            { ico: "\u{1F4AC}", text: "Conduct a safety briefing covering hazards, control measures, emergency procedures, first aid location, and communication plan", correct: true, fb: "Correct! A safety briefing before work begins is mandatory. Cover the identified hazards (sharp objects, terrain, traffic), the control measures (gloves, pickers, stay in teams), emergency procedures (who to call, where to go), first aid attendant location, and the communication plan (check-in times, radio/phone contacts). No work starts until safety is briefed." },
            { ico: "\u{1F9F9}", text: "Hand out garbage bags and tell everyone to start", correct: false, fb: "Starting work without a safety briefing is dangerous and irresponsible. Volunteers need to know the hazards, controls, and emergency procedures before they begin. Safety briefing always comes first." },
            { ico: "\u{1F4F8}", text: "Take a group photo for social media", correct: false, fb: "A group photo is nice but it is not the first priority. Safety comes before photos. Conduct the safety briefing first, then you can take photos during or after the event." },
            { ico: "\u{2615}", text: "Have coffee and chat while waiting for everyone to arrive", correct: false, fb: "While waiting for late arrivals is sometimes necessary, once your team is assembled, the first action is the safety briefing. Do not delay safety for social time." }
          ]
        },
        {
          type: "select", tool: "commsplan",
          prompt: "During the clean-up, one of your team leaders reports that a volunteer has found a needle in the litter. What should you do?",
          options: [
            { ico: "\u{1FA74}", text: "Stop collection in that area, have the trained volunteer use the sharps container to dispose of the needle, and remind all teams to use litter pickers and not touch sharp items by hand", correct: true, fb: "Correct! Finding a needle is exactly the kind of hazard your risk assessment anticipated. Stop work in the area, use the sharps container for safe disposal, and reinforce the control measures (litter pickers, no hand contact). This is a calm, effective incident response that prioritizes safety." },
            { ico: "\u{1F4A5}", text: "Panic and evacuate the entire park immediately", correct: false, fb: "Panicking and evacuating is an overreaction. A single needle is a manageable hazard that your risk assessment and controls were designed for. Use the sharps container and reinforce procedures. Stay calm as a leader." },
            { ico: "\u{1F44C}", text: "Tell the volunteer to just throw it in the garbage bag with the rest", correct: false, fb: "This is extremely dangerous. A needle in a garbage bag can puncture the bag and injure someone later. Needles must go in a sharps container. Never dispose of sharps in regular garbage." },
            { ico: "\u{1F634}", text: "Ignore it — the volunteer can deal with it themselves", correct: false, fb: "As the project leader, you are responsible for volunteer safety. Ignoring a hazardous needle is negligent. Stop work, ensure safe disposal, and reinforce control measures." }
          ]
        },
        {
          type: "order", tool: "commsplan",
          prompt: "Arrange the event day leadership steps in the correct chronological order.",
          items: [
            "Conduct safety briefing and sign in all volunteers",
            "Distribute equipment and assign teams to areas",
            "Monitor progress and conduct periodic check-ins",
            "Collect equipment, do final cleanup, and debrief"
          ],
          correctOrder: [0, 1, 2, 3]
        },
        {
          type: "select", tool: "commsplan",
          prompt: "It is 90 minutes into the clean-up and Team B is significantly behind Team A. What is the best leadership response?",
          options: [
            { ico: "\u{1F465}", text: "Check in with Team B's leader, find out what is slowing them down, and reallocate volunteers from Team A if needed to balance the workload", correct: true, fb: "Correct! A good leader monitors progress and adjusts. Check in with the team leader to understand the issue (maybe their area has more litter or a hazard). Then reallocate resources — send a volunteer or two from the ahead-of-schedule Team A to help. This is adaptive leadership." },
            { ico: "\u{1F620}", text: "Tell Team B they need to work faster and stop being lazy", correct: false, fb: "Berating volunteers is terrible leadership. There may be valid reasons Team B is behind — more litter, difficult terrain, or a hazard. A good leader investigates and supports, not criticizes." },
            { ico: "\u{1F634}", text: "Do nothing — they will catch up eventually", correct: false, fb: "Ignoring a progress issue means the event may run over time or Team B may not finish their area. A leader actively monitors and adjusts to keep the project on track." },
            { ico: "\u{1F6D1}", text: "Cancel Team B's area and tell them to go home", correct: false, fb: "Canceling part of the project because of a minor delay is an overreaction. Simply reallocate resources to help Team B catch up. Adaptive problem-solving is key to event day leadership." }
          ]
        }
      ]
    },
    {
      id: "cs_debrief",
      order: 7,
      tag: "COMMUNITY 07",
      icon: "\u{1F4AC}",
      title: "Leading the Debrief",
      desc: "Conduct a structured after-action review, gather feedback, document lessons learned, and reflect on community impact.",
      xp: 100,
      brief: "The event is over, but the project is not complete. Your instructor teaches you how to lead a debrief — an after-action review where the team reflects on what went well, what did not, and what to improve next time. A good debrief is structured, inclusive, and honest. It celebrates successes, identifies lessons learned, and documents recommendations for future projects. The debrief is also where you reflect on the community impact — did you achieve your objectives? How did the community benefit? This reflection is what turns a one-time event into lasting learning.",
      scene: "debrief",
      chapters: [
        { title: "Debrief Structure", desc: "What went well, what did not, what to improve." },
        { title: "Gathering Feedback", desc: "Collect input from all volunteers and the civilian partner." },
        { title: "Documenting Lessons Learned", desc: "Record actionable insights for future projects." },
        { title: "Reflecting on Community Impact", desc: "Assess the outcomes and value delivered to the community." }
      ],
      tasks: [
        {
          type: "select", tool: "debriefform",
          prompt: "The clean-up event is finished. When should you conduct the debrief?",
          options: [
            { ico: "\u{23F1}\uFE0F", text: "Immediately after the event while everyone is still together and memories are fresh", correct: true, fb: "Correct! The debrief should happen immediately after the event, while volunteers are still together and their experiences are fresh in their minds. Waiting days or weeks means details are forgotten and the team has dispersed. An on-site debrief captures the most accurate and useful feedback." },
            { ico: "\u{1F4C5}", text: "At the next cadet training night a week later", correct: false, fb: "Waiting a week means memories fade, details are forgotten, and some volunteers may not attend the training night. The debrief should happen immediately after the event while experiences are fresh." },
            { ico: "\u{1F4C5}", text: "A month later when you have time to think about it", correct: false, fb: "A month later is far too long. By then, most details will be forgotten and the learning value is greatly diminished. Debrief while memories are fresh — immediately after the event." },
            { ico: "\u{1F634}", text: "Debriefs are optional — skip it if everyone is tired", correct: false, fb: "Debriefs are essential, not optional. They are where the team learns from the experience and improves for next time. Even a brief 15-minute debrief is valuable. Do not skip it." }
          ]
        },
        {
          type: "select", tool: "debriefform",
          prompt: "Which is the best structure for conducting the debrief discussion?",
          options: [
            { ico: "\u{1F4AC}", text: "Ask three questions: What went well? What did not go well? What should we do differently next time? Give everyone a chance to speak", correct: true, fb: "Correct! This three-question structure is a classic after-action review format. It is simple, positive, and constructive. 'What went well' celebrates successes. 'What did not go well' identifies problems without blame. 'What should we do differently' generates actionable improvements. Giving everyone a chance to speak ensures all perspectives are heard." },
            { ico: "\u{1F620}", text: "List everything that went wrong and who is to blame", correct: false, fb: "A blame-focused debrief is counterproductive. It makes volunteers defensive, damages morale, and discourages future participation. Focus on what to improve, not who to blame. The debrief should be constructive." },
            { ico: "\u{1F44D}", text: "Only talk about what went well and skip the problems", correct: false, fb: "Only discussing positives means you miss the opportunity to learn from mistakes. A good debrief covers both successes and areas for improvement. Honest reflection is key to growth." },
            { ico: "\u{1F634}", text: "Let the instructor do all the talking while volunteers listen", correct: false, fb: "A one-way lecture is not a debrief. The value comes from hearing all perspectives — volunteers on the ground saw things the leader did not. Everyone should have a chance to speak." }
          ]
        },
        {
          type: "order", tool: "debriefform",
          prompt: "Arrange the debrief process steps in the correct order.",
          items: [
            "Gather the team and explain the debrief purpose",
            "Discuss what went well, what did not, and what to improve",
            "Document lessons learned and recommendations",
            "Thank the team and reflect on community impact"
          ],
          correctOrder: [0, 1, 2, 3]
        },
        {
          type: "select", tool: "feedbackform",
          prompt: "Why is it important to reflect on the community impact during the debrief?",
          options: [
            { ico: "\u{1F91D}", text: "It connects the team to the purpose of their service, reinforces the value of community engagement, and motivates future participation", correct: true, fb: "Correct! Reflecting on community impact — how many bags of litter were collected, how the park looks now, what the community said — connects volunteers to the meaning of their work. This reinforces the value of citizenship and service, builds corps pride, and motivates cadets to participate in future community projects. It is the capstone of the learning cycle." },
            { ico: "\u{1F634}", text: "It is not important — the event is over so it does not matter", correct: false, fb: "Reflecting on impact is one of the most important parts of the debrief. It is what transforms a task into a learning experience. Understanding the community benefit reinforces the value of service and motivates future participation." },
            { ico: "\u{1F4B0}", text: "It is only needed to report to the funding organization", correct: false, fb: "While impact reporting may be needed for funders, the primary value of reflecting on impact is for the cadets themselves — to understand the meaning of their service and grow as citizens. It is not just an administrative exercise." },
            { ico: "\u{1F3C6}", text: "It is only for earning badges and awards", correct: false, fb: "Badges and awards are recognition, not the purpose of reflection. The purpose is to help cadets understand the value of community service, develop as citizens, and feel motivated to continue serving. The learning is the real reward." }
          ]
        }
      ]
    },
    {
      id: "cs_citizenship",
      order: 8,
      tag: "COMMUNITY 08",
      icon: "\u{1F30D}",
      title: "Citizenship & Active Community Engagement",
      desc: "Understand the role of community service in citizenship, the benefits of civic engagement, and how to sustain community partnerships.",
      xp: 100,
      brief: "The final module connects community service to the broader concept of citizenship. Your instructor discusses why community service is a core part of the cadet program — it builds active citizens, strengthens communities, and develops leadership skills that transfer to all areas of life. You will learn about the benefits of sustained community engagement, how to build lasting partnerships with civilian organisations, and how community service ties together the leadership, communication, and citizenship skills from both Green Star and Red Star training. This is the capstone of the Red Star community service phase.",
      scene: "citizenship",
      chapters: [
        { title: "Community Service & Citizenship", desc: "How service builds active, engaged citizens." },
        { title: "Benefits of Civic Engagement", desc: "Personal growth, community impact, and leadership development." },
        { title: "Sustaining Partnerships", desc: "Building long-term relationships with community organisations." },
        { title: "Red Star Capstone", desc: "Tying together leadership, communication, and citizenship." }
      ],
      tasks: [
        {
          type: "select", tool: "sitrepform",
          prompt: "Why is community service a mandatory part of the cadet program?",
          options: [
            { ico: "\u{1F30D}", text: "It encourages cadets to be active citizens, builds leadership and teamwork skills, and strengthens the connection between the cadet corps and the community", correct: true, fb: "Correct! PO X02 states the aim is 'to encourage cadets to be active citizens through participation in a community service activity as a member of a team.' Community service builds citizenship, develops leadership and teamwork, and creates a positive relationship between the cadet corps and the civilian community. It is a core part of cadet development." },
            { ico: "\u{1F634}", text: "It is just busywork to fill time between training weekends", correct: false, fb: "Community service is far from busywork. It is a core performance objective of the cadet program designed to build citizenship, leadership, and community connections. It is a meaningful part of cadet development." },
            { ico: "\u{1F4B0}", text: "It is only to raise money for the cadet corps", correct: false, fb: "Community service is not about fundraising for the corps. It is about serving the community and developing cadets as active citizens. While some projects may raise awareness, the purpose is service, not profit." },
            { ico: "\u{1F3F3}\uFE0F", text: "It is only for the public relations benefit", correct: false, fb: "While community service does create positive visibility for the corps, that is a secondary benefit. The primary purpose is developing cadets as active citizens and serving the community. PR is a byproduct, not the goal." }
          ]
        },
        {
          type: "select", tool: "sitrepform",
          prompt: "Your clean-up project was a success. How can you sustain the relationship with the park manager for future projects?",
          options: [
            { ico: "\u{1F91D}", text: "Send a thank-you email with photos and results, ask for feedback on the partnership, and discuss potential future collaboration opportunities", correct: true, fb: "Correct! Sustaining a community partnership requires follow-up: a thank-you with photos and results shows appreciation and accountability, asking for feedback shows respect for the partner's perspective, and discussing future opportunities plants the seed for ongoing collaboration. This turns a one-time event into a lasting partnership." },
            { ico: "\u{1F634}", text: "Do nothing — the project is over so the relationship is done", correct: false, fb: "Treating the partner as a one-time contact wastes the relationship you built. A thank-you and discussion of future opportunities can turn a single project into an ongoing partnership that benefits the corps and community for years." },
            { ico: "\u{1F4DE}", text: "Only contact them again when you need something next year", correct: false, fb: "Only contacting the partner when you need something is transactional, not relational. A thank-you after the event and regular communication builds a genuine partnership. People remember how they are treated." },
            { ico: "\u{1F4F1}", text: "Add them to a mailing list and send generic updates", correct: false, fb: "A personal thank-you email is far more meaningful than a generic mailing list. Community partnerships are built on personal relationships, not mass communications. Take the time for a genuine, personalized follow-up." }
          ]
        },
        {
          type: "order", tool: "sitrepform",
          prompt: "Arrange the community service project lifecycle in the correct order.",
          items: [
            "Define scope and write the project plan",
            "Conduct risk assessment and communicate with partners",
            "Execute the event with safety and leadership",
            "Debrief, document lessons, and sustain the partnership"
          ],
          correctOrder: [0, 1, 2, 3]
        },
        {
          type: "select", tool: "sitrepform",
          prompt: "How does the Community Service Project module tie together skills from the Red Star program?",
          options: [
            { ico: "\u{1F451}", text: "It integrates leadership (leading a team), communication (partnering with civilians), and citizenship (serving the community) into one capstone experience", correct: true, fb: "Correct! The Community Service Project is the capstone of Red Star because it integrates three core skill areas: leadership (planning and leading a team), communication (professional interaction with civilian organisations), and citizenship (active service to the community). This is where all the skills from both Green Star and Red Star come together in a real-world application." },
            { ico: "\u{1F634}", text: "It does not connect to other modules — it is standalone", correct: false, fb: "The Community Service Project is explicitly designed as a capstone that integrates leadership, communication, and citizenship skills. It is the opposite of standalone — it draws on everything cadets have learned throughout the program." },
            { ico: "\u{1F4A0}", text: "It only uses leadership skills and ignores communication", correct: false, fb: "Communication is central to the community service project — you must communicate professionally with civilian organisations, brief your team, and lead a debrief. It uses both leadership and communication skills, plus citizenship." },
            { ico: "\u{1F3AF}", text: "It only uses marksmanship and drill skills", correct: false, fb: "Marksmanship and drill are not directly related to community service planning. The community service project integrates leadership, communication, and citizenship — the core civic skills of the cadet program." }
          ]
        }
      ]
    }
  ];

  // ==========================================================
  // COMMUNITY BADGES (auto-generated from MISSIONS)
  // ==========================================================
  const COMMUNITY_BADGES = MISSIONS.map(m => ({
    mission: m.id,
    icon: m.icon,
    title: m.title,
    xp: m.xp
  }));

  // ==========================================================
  // LEARN ARTICLES — Community Service Knowledge Base
  // ==========================================================
  const LEARN_ARTICLES = [
    {
      id: "la_smart",
      tag: "Planning",
      icon: "\u{1F9ED}",
      title: "SMART Objectives for Community Projects",
      desc: "How to write Specific, Measurable, Achievable, Relevant, and Time-bound objectives.",
      readXP: 10,
      body: "<p>The <strong>SMART criteria</strong> is a framework for writing clear, actionable project objectives. Every community service project should have at least one SMART objective that defines what success looks like.</p><p><strong>Specific:</strong> The objective names exactly what will be done, where, and by whom. 'Clean up Riverside Park' is specific; 'do something good' is not.</p><p><strong>Measurable:</strong> The objective includes quantifiable criteria. 'Collect 20 bags of litter' is measurable; 'clean up a lot' is not.</p><p><strong>Achievable:</strong> The objective is realistic given your team size, time, and resources. Cleaning one park with 12 cadets is achievable; cleaning every park in the city is not.</p><p><strong>Relevant:</strong> The objective addresses a genuine community need that your corps can meaningfully impact.</p><p><strong>Time-bound:</strong> The objective has a clear deadline. 'On Saturday, May 15' is time-bound; 'sometime' is not.</p><p>A well-written SMART objective: <em>'Clean up Riverside Park on Saturday, May 15, with 12 cadets, collecting a minimum of 20 bags of litter from the trail and picnic areas.'</em></p>"
    },
    {
      id: "la_riskmatrix",
      tag: "Risk Management",
      icon: "\u{26A0}\uFE0F",
      title: "The Risk Assessment Matrix",
      desc: "How to use the likelihood × severity matrix to rate and prioritize risks.",
      readXP: 10,
      body: "<p>A <strong>risk assessment matrix</strong> helps you rate each identified hazard by combining two factors: <strong>likelihood</strong> (how probable is it?) and <strong>severity</strong> (how bad would it be?). The result is a risk level that tells you which hazards need the most attention.</p><p><strong>Likelihood levels:</strong> Rare, Unlikely, Possible, Likely, Almost Certain.</p><p><strong>Severity levels:</strong> Insignificant, Minor, Moderate, Major, Catastrophic.</p><p>Combining these on a matrix gives risk levels: Low, Medium, High, Extreme. A hazard that is Likely and Major is High risk. A hazard that is Rare and Minor is Low risk.</p><p>For each risk, implement <strong>control measures</strong> using the hierarchy of controls: Eliminate (remove the hazard entirely), Substitute (replace with something safer), Engineering controls (physical barriers), Administrative controls (procedures and training), Personal Protective Equipment (gloves, vests, eyewear).</p><p>Document every hazard, its risk level, and its control measures on the risk assessment form. Review the assessment with your team before the event.</p>"
    },
    {
      id: "la_hoc",
      tag: "Risk Management",
      icon: "\u{1F6E1}\uFE0F",
      title: "The Hierarchy of Controls",
      desc: "The five-level system for reducing risk from most to least effective.",
      readXP: 10,
      body: "<p>The <strong>hierarchy of controls</strong> is a system used in risk management to reduce exposure to hazards. It ranks control methods from most effective to least effective:</p><p><strong>1. Elimination:</strong> Remove the hazard entirely. If a section of the park has hazardous waste, do not assign volunteers to that area. This is the most effective control.</p><p><strong>2. Substitution:</strong> Replace the hazard with something safer. If manual lifting is a risk, use a cart or trolley instead.</p><p><strong>3. Engineering Controls:</strong> Isolate people from the hazard. Use litter pickers so hands do not touch sharp objects. Set up barriers near traffic areas.</p><p><strong>4. Administrative Controls:</strong> Change the way people work. Implement a buddy system, rotate tasks to prevent fatigue, set work-rest schedules.</p><p><strong>5. Personal Protective Equipment (PPE):</strong> Equip volunteers with gloves, high-visibility vests, and closed-toe shoes. This is the last line of defense, not the first.</p><p>Always start at the top of the hierarchy. PPE alone is never sufficient — it should supplement other controls, not replace them.</p>"
    },
    {
      id: "la_email",
      tag: "Communication",
      icon: "\u{1F4E7}",
      title: "Professional Email Structure",
      desc: "The standard format for communicating with civilian organisations by email.",
      readXP: 10,
      body: "<p>When communicating with civilian organisations, your emails represent your cadet corps. A professional email has five key parts:</p><p><strong>Subject Line:</strong> Clear, descriptive, and specific. 'Request for Permission — Cadet Corps Community Clean-Up at Riverside Park, May 15' tells the recipient exactly what the email is about.</p><p><strong>Greeting:</strong> Formal and respectful. Use 'Dear Mr./Ms. [Last Name]' if you know the name, or 'Dear [Organisation] Team' if you do not. Avoid casual greetings like 'Hey' or 'Hi there'.</p><p><strong>Body:</strong> Introduce yourself and your corps, state your purpose clearly, make a specific request, and provide relevant details (date, time, location, number of volunteers). Keep it concise — one or two short paragraphs.</p><p><strong>Closing:</strong> Thank the recipient for their time and consideration. Use 'Sincerely' or 'Respectfully' followed by your name, rank, corps, and contact information.</p><p><strong>Signature:</strong> Include your full name, cadet rank, corps name, and a phone number or email where you can be reached.</p>"
    },
    {
      id: "la_contactlog",
      tag: "Communication",
      icon: "\u{1F4D1}",
      title: "The Contact Log",
      desc: "Why and how to track every communication with your civilian partner.",
      readXP: 10,
      body: "<p>A <strong>contact log</strong> is a running record of every communication with your civilian partner organisation. It tracks emails, phone calls, meetings, and any other interactions. Each entry includes the date, who you spoke with, the topic, and the outcome or agreed actions.</p><p><strong>Why it matters:</strong></p><p>1. <strong>Prevents miscommunication:</strong> If there is ever a disagreement about what was agreed, the contact log provides an objective record.</p><p>2. <strong>Tracks follow-ups:</strong> If the partner promised to provide garbage bags, the log reminds you to confirm delivery before the event.</p><p>3. <strong>Provides continuity:</strong> If a different cadet takes over the project, the log tells them exactly where things stand.</p><p>4. <strong>Demonstrates professionalism:</strong> A well-maintained contact log shows the partner that your corps is organized and reliable.</p><p>Keep the contact log in a shared document that all project leaders can access. Update it immediately after every communication — do not rely on memory.</p>"
    },
    {
      id: "la_raci",
      tag: "Planning",
      icon: "\u{1F465}",
      title: "RACI Responsibility Assignment",
      desc: "A simple framework for clarifying who is Responsible, Accountable, Consulted, and Informed.",
      readXP: 10,
      body: "<p><strong>RACI</strong> is a responsibility assignment framework that clarifies roles for each task in a project. Each task is assigned four types of roles:</p><p><strong>R — Responsible:</strong> The person who does the work. For a litter collection task, the responsible person is the volunteer picking up litter. There can be multiple responsible people for one task.</p><p><strong>A — Accountable:</strong> The person who owns the task and is answerable for its completion. This is usually the team leader or project leader. There should be only one accountable person per task to avoid confusion.</p><p><strong>C — Consulted:</strong> People who provide input or expertise before the task is done. For a risk assessment, the corps safety officer might be consulted. Communication flows two ways.</p><p><strong>I — Informed:</strong> People who need to be kept up to date on progress or outcomes. The corps commanding officer might be informed about the event schedule. Communication flows one way.</p><p>Using RACI for your project plan ensures every task has a clear owner and everyone knows their role. This prevents the 'I thought you were doing that' problem.</p>"
    },
    {
      id: "la_contingency",
      tag: "Planning",
      icon: "\u{1F327}\uFE0F",
      title: "Contingency Planning",
      desc: "How to prepare backup plans for when things do not go as expected.",
      readXP: 10,
      body: "<p>A <strong>contingency plan</strong> is a backup plan for when your primary plan is disrupted. Every community service project should have contingency plans for the most likely disruptions.</p><p><strong>Weather contingency:</strong> If rain is forecast, have an indoor alternative (a community centre clean-up) or a reschedule date ready. Set a go/no-go decision time — for example, decide by 6 PM the night before.</p><p><strong>Volunteer no-show contingency:</strong> If fewer volunteers show up than expected, have a plan to reduce scope (cover a smaller area) or reassign roles (combine teams). Always recruit 10-15% more volunteers than you need.</p><p><strong>Equipment shortage contingency:</strong> If donated supplies do not arrive, have a backup supplier identified and a small emergency budget for purchasing replacements.</p><p><strong>Medical emergency contingency:</strong> Know the nearest hospital, have a qualified first aid attendant on site, and have an evacuation plan. Ensure someone has a charged phone and emergency contact numbers.</p><p>Contingency planning is not pessimism — it is preparedness. A leader who has backup plans can stay calm and adapt when things change.</p>"
    },
    {
      id: "la_debrief",
      tag: "Leadership",
      icon: "\u{1F4AC}",
      title: "The After-Action Review",
      desc: "Structured debrief format for learning from every project.",
      readXP: 10,
      body: "<p>An <strong>after-action review (AAR)</strong> is a structured debrief that helps a team learn from every project. It was developed by the military and is now used in organizations worldwide. The format is simple and powerful.</p><p><strong>The Three Questions:</strong></p><p>1. <strong>What went well?</strong> Start with positives. This builds morale and identifies strengths to repeat. 'The safety briefing was thorough and everyone understood the hazards.'</p><p>2. <strong>What did not go well?</strong> Be honest but not blameful. Focus on processes, not people. 'Team B ran out of garbage bags and had to wait 20 minutes for resupply.'</p><p>3. <strong>What should we do differently next time?</strong> Generate specific, actionable improvements. 'Next time, assign a logistics runner to each team with extra supplies.'</p><p><strong>Best practices for a good AAR:</strong></p><p>• Hold it immediately after the event while memories are fresh.</p><p>• Give everyone a chance to speak — volunteers on the ground see things the leader does not.</p><p>• Keep it positive and constructive — this is learning, not blaming.</p><p>• Document the lessons learned for future project leaders.</p>"
    },
    {
      id: "la_citizenship",
      tag: "Citizenship",
      icon: "\u{1F30D}",
      title: "Community Service & Active Citizenship",
      desc: "How community service develops cadets as engaged, responsible citizens.",
      readXP: 10,
      body: "<p>The aim of <strong>PO X02 — Perform Community Service</strong> is 'to encourage cadets to be active citizens through participation in a community service activity as a member of a team.' This is a core performance objective of the cadet program, not an optional add-on.</p><p><strong>What is active citizenship?</strong> Active citizenship means taking responsibility for your community and actively contributing to its well-being. It is the difference between being a resident and being a citizen — a resident lives in a community, but a citizen serves it.</p><p><strong>How community service builds citizenship:</strong></p><p>1. <strong>Awareness:</strong> Cadets learn about community needs they may not have known about.</p><p>2. <strong>Empathy:</strong> Working directly with community members builds understanding and compassion.</p><p>3. <strong>Agency:</strong> Cadets see that they can make a tangible difference, which builds civic confidence.</p><p>4. <strong>Habit:</strong> Regular community service creates a lifelong habit of civic engagement.</p><p>5. <strong>Leadership:</strong> Planning and leading service projects develops transferable leadership skills.</p><p>The cadet program's emphasis on community service ensures that cadets do not just train as individuals but develop as citizens who contribute to their communities for life.</p>"
    },
    {
      id: "la_partnership",
      tag: "Citizenship",
      icon: "\u{1F91D}",
      title: "Building Sustained Community Partnerships",
      desc: "How to turn a one-time event into a lasting community relationship.",
      readXP: 10,
      body: "<p>A single community service event is valuable, but a <strong>sustained partnership</strong> with a community organisation creates ongoing impact for both the corps and the community. Here is how to build lasting partnerships:</p><p><strong>1. Deliver on your promises:</strong> The most important thing is to do what you said you would do. Show up on time, complete the work, and meet your objectives. Reliability is the foundation of trust.</p><p><strong>2. Follow up after every event:</strong> Send a thank-you with photos and results. Ask for feedback on how the partnership went from their perspective. This shows you value the relationship, not just the activity.</p><p><strong>3. Discuss future opportunities:</strong> After a successful event, talk about what else you could do together. 'We loved cleaning up the park — are there other areas where you could use cadet help?' This plants the seed for ongoing collaboration.</p><p><strong>4. Maintain regular contact:</strong> Do not let the relationship go cold between events. Check in periodically, share corps news, and invite the partner to corps events where appropriate.</p><p><strong>5. Be professional at all times:</strong> Every interaction reflects on your corps. Professional, respectful communication builds a reputation that makes partners want to work with you again.</p>"
    },
    {
      id: "la_safetybrief",
      tag: "Leadership",
      icon: "\u{1F4AC}",
      title: "Conducting an Effective Safety Briefing",
      desc: "What to cover before any community service activity begins.",
      readXP: 10,
      body: "<p>A <strong>safety briefing</strong> is a mandatory part of every off-base cadet activity. It ensures all volunteers understand the hazards, controls, and emergency procedures before work begins. No work starts until the safety briefing is complete.</p><p><strong>What to cover in a safety briefing:</strong></p><p>1. <strong>Activity overview:</strong> Briefly remind everyone what we are doing, where, and for how long.</p><p>2. <strong>Identified hazards:</strong> Review the hazards from the risk assessment — sharp objects, uneven terrain, traffic, weather.</p><p>3. <strong>Control measures:</strong> Explain what is in place to manage each hazard — gloves and pickers for sharp objects, buddy system for terrain, high-vis vests near roads.</p><p>4. <strong>Emergency procedures:</strong> Who is the first aid attendant and where are they? What is the emergency signal? Where is the evacuation point? What are the emergency contact numbers?</p><p>5. <strong>Communication plan:</strong> How will teams check in? What radio channel or phone number? What are the check-in times?</p><p>6. <strong>Sign-in and accountability:</strong> Everyone signs in. The team leader knows who is in their team and does a head count.</p><p>Keep the briefing clear and concise — 10 to 15 minutes. Ask if anyone has questions. Confirm everyone understands before dismissing to tasks.</p>"
    },
    {
      id: "la_volunteers",
      tag: "Leadership",
      icon: "\u{1F465}",
      title: "Managing Volunteer Teams",
      desc: "How to keep volunteers motivated, organized, and safe during the event.",
      readXP: 10,
      body: "<p>Managing volunteers on event day is a core leadership skill. Unlike paid workers, volunteers are giving their time freely — they need clear direction, motivation, and appreciation to stay engaged.</p><p><strong>Clear direction:</strong> Every volunteer should know their role, their team, their area, and their team leader. Vague instructions lead to confusion and disengagement. Use the project plan and role assignments to give everyone a specific job.</p><p><strong>Motivation:</strong> Keep the energy positive. Remind volunteers why they are here — the community impact they will make. Check in with teams during the event, not just at the end. A simple 'great work, Team A — you are making a real difference' goes a long way.</p><p><strong>Safety:</strong> Monitor volunteers for fatigue, discomfort, or signs of distress. Enforce work-rest cycles in hot or cold weather. Do not let anyone push beyond their limits — safety always comes first.</p><p><strong>Appreciation:</strong> Thank volunteers during and after the event. Acknowledge individual contributions in the debrief. Consider small tokens of appreciation — certificates, photos, or a post-event meal. Volunteers who feel valued will return for future projects.</p><p><strong>Problem-solving:</strong> When issues arise, address them calmly and quickly. Reallocate resources, adjust plans, and keep the team informed. A leader who stays composed under pressure keeps the whole team steady.</p>"
    },
    {
      id: "la_pox02",
      tag: "Curriculum",
      icon: "\u{1F4DA}",
      title: "PO X02 — Perform Community Service",
      desc: "The Red Star performance objective that governs community service training.",
      readXP: 10,
      body: "<p><strong>PO X02 — Perform Community Service</strong> is the performance objective that governs community service training in the Royal Canadian Army Cadets program. The aim of this PO is <em>'to encourage cadets to be active citizens through participation in a community service activity as a member of a team.'</em></p><p><strong>Enabling Objectives:</strong></p><p>• <strong>MX02.01 — Perform Community Service</strong> (9 periods, mandatory): Cadets participate in a community service activity as part of a team. This includes planning, executing, and debriefing the activity.</p><p>• <strong>CX02.01 — Perform Community Service</strong> (18 periods, complementary): Extended community service activities that go deeper into project planning, leadership, and community engagement.</p><p><strong>Key skills developed:</strong></p><p>1. Project planning — writing plans, timelines, and resource lists.</p><p>2. Risk assessment — identifying hazards and implementing controls.</p><p>3. Professional communication — interacting with civilian organisations.</p><p>4. Leadership — leading a team through a real-world project.</p><p>5. Citizenship — understanding the value of community service and active civic engagement.</p><p><strong>Assessment:</strong> Cadets are assessed on their participation, planning contribution, and leadership during the community service activity. The community service project is a capstone experience that ties together leadership, communication, and citizenship skills from both Green Star and Red Star training.</p>"
    },
    {
      id: "la_scopecreep",
      tag: "Planning",
      icon: "\u{1F4A0}",
      title: "Preventing Scope Creep",
      desc: "How to keep your project focused and avoid expanding beyond your plan.",
      readXP: 10,
      body: "<p><strong>Scope creep</strong> is the gradual expansion of a project beyond its original objectives. It is one of the most common reasons community service projects fail or run over budget and over time.</p><p><strong>How scope creep happens:</strong> During planning, you scope a park clean-up to cover the trail and picnic area. On event day, a volunteer suggests also cleaning the parking lot. Then someone mentions the creek bank. Then the neighbouring playground. Suddenly your 3-hour project is a 6-hour marathon with exhausted volunteers.</p><p><strong>How to prevent scope creep:</strong></p><p>1. <strong>Write clear objectives:</strong> Your SMART objectives define exactly what is in scope. Anything not in the objectives is out of scope.</p><p>2. <strong>Stick to the plan:</strong> If someone suggests adding work, ask: 'Is this in our objectives? Do we have the time, volunteers, and resources for it?' If not, note it as a future project.</p><p>3. <strong>Communicate scope to volunteers:</strong> During the safety briefing, clearly state what areas you are covering and what you are not. This prevents volunteers from wandering into unplanned areas.</p><p>4. <strong>Document additions for next time:</strong> If you identify additional needs during the event, write them down as recommendations for a future project. This acknowledges the need without expanding the current scope.</p><p>5. <strong>Be willing to say no:</strong> As a leader, you must protect your team from overcommitment. 'That is a great idea — let us plan it as a separate project' is a professional response that respects both the idea and your team's limits.</p>"
    },
    {
      id: "la_impact",
      tag: "Citizenship",
      icon: "\u{1F4CA}",
      title: "Measuring Community Impact",
      desc: "How to assess and document the real-world outcomes of your service project.",
      readXP: 10,
      body: "<p>Measuring the <strong>community impact</strong> of your service project is essential for demonstrating value, learning from the experience, and planning future projects. Impact measurement turns 'we did a good thing' into 'we collected 23 bags of litter from a 2 km trail, improving the park for an estimated 500 weekly visitors.'</p><p><strong>Quantitative measures:</strong></p><p>• Number of volunteers who participated.</p><p>• Volume of work completed (bags of litter, metres of trail cleared, items sorted).</p><p>• Hours of service contributed.</p><p>• Area covered (square metres, kilometres of trail).</p><p>• People reached or served.</p><p><strong>Qualitative measures:</strong></p><p>• Feedback from the civilian partner (what did they think of the work?).</p><p>• Feedback from community members (did park visitors notice and appreciate the improvement?).</p><p>• Volunteer reflections from the debrief (what did cadets learn and feel?).</p><p>• Before and after photos showing the difference made.</p><p><strong>Documenting impact:</strong> After the event, compile the quantitative and qualitative data into a brief impact report. Share it with your corps, the civilian partner, and the community. This demonstrates accountability, celebrates the team's achievement, and builds the case for future community service projects.</p>"
    }
  ];

  // ==========================================================
  // PROJECT COMMAND CENTER — Unique Interactive Game Data
  // A multi-stage community service project simulator with
  // ambient music via Web Audio API. NOT a quiz — a sequential
  // decision simulator with success meters, narrative, and
  // consequences. Cadets play the role of project leader.
  // ==========================================================
  const PROJECT_COMMAND = {
    stages: [
      {
        id: "pc_scope",
        title: "Stage 1: Define the Project",
        tag: "PROJECT SCOPE",
        icon: "\u{1F9ED}",
        narrative: "Your cadet corps has been asked to plan a community service activity. The local community centre director mentioned that the neighbourhood park needs attention. You are the designated project leader. This is where your training begins — how will you define the project scope?",
        prompt: "What is your first action as project leader?",
        visual: "scope",
        choices: [
          {
            ico: "\u{1F50D}",
            title: "Research the community need",
            desc: "Visit the park, talk to the community centre director, and identify the specific problem.",
            correct: true,
            fbTitle: "Excellent — defining the need first!",
            fbDetail: "You visit Riverside Park and talk to the community centre director. You learn that litter has accumulated along the riverside trail and picnic areas, making the park unpleasant for families. The director would love to see a clean-up event. By researching first, you have identified a genuine community need and a specific, achievable activity. This is the foundation of a successful project.",
            effects: { planning: +20, safety: 0, impact: +10, teamwork: +5, budget: 0 }
          },
          {
            ico: "\u{1F4C5}",
            title: "Pick a date and announce it",
            desc: "Choose a Saturday next month and start recruiting volunteers immediately.",
            correct: false,
            fbTitle: "Putting the cart before the horse!",
            fbDetail: "You announce a clean-up date before knowing what needs cleaning, how many volunteers you need, or what resources are required. The community centre director is confused — you have not even discussed the scope with them. Starting with a date before defining the project leads to a poorly planned event. Always identify the need first.",
            effects: { planning: -15, safety: -5, impact: -5, teamwork: 0, budget: -10 }
          },
          {
            ico: "\u{1F4B0}",
            title: "Set a budget of $500",
            desc: "Allocate money first, then figure out what to spend it on.",
            correct: false,
            fbTitle: "Budget before scope is backwards!",
            fbDetail: "You set a $500 budget without knowing what the project involves. You might need more, or you might need much less — many supplies can be donated. Budgeting before scoping leads to wasted money or insufficient funds. Define the project scope first, then estimate what it will cost.",
            effects: { planning: -10, safety: 0, impact: 0, teamwork: 0, budget: -15 }
          },
          {
            ico: "\u{1F4F8}",
            title: "Post on social media asking for ideas",
            desc: "Let the community suggest what you should do.",
            correct: false,
            fbTitle: "Avoiding leadership responsibility!",
            fbDetail: "As the project leader, it is your job to research and define the scope, not to crowdsource it on social media. While community input is valuable, you should gather it through direct engagement with the community centre director and park staff, not through a vague social media post. Take ownership of the project definition.",
            effects: { planning: -10, safety: 0, impact: -5, teamwork: -5, budget: 0 }
          }
        ]
      },
      {
        id: "pc_objectives",
        title: "Stage 2: Write SMART Objectives",
        tag: "OBJECTIVES",
        icon: "\u{1F4CB}",
        narrative: "You have identified the need: litter along the riverside trail and picnic areas at Riverside Park. Now you need to write clear objectives for the project. Your instructor has taught you the SMART criteria — Specific, Measurable, Achievable, Relevant, Time-bound. How will you define success?",
        prompt: "Which objective will you write for the project plan?",
        visual: "objectives",
        choices: [
          {
            ico: "\u{1F9F9}",
            title: "SMART clean-up objective",
            desc: "Clean up Riverside Park trail and picnic areas on Saturday May 15, with 12 cadets, collecting minimum 20 bags of litter.",
            correct: true,
            fbTitle: "A textbook SMART objective!",
            fbDetail: "Your objective is Specific (Riverside Park trail and picnic areas), Measurable (20 bags of litter, 12 cadets), Achievable (12 cadets can do this in a few hours), Relevant (addresses the identified litter problem), and Time-bound (Saturday, May 15). This objective gives your team a clear target and a way to measure success. Excellent project planning.",
            effects: { planning: +25, safety: +5, impact: +15, teamwork: +10, budget: +5 }
          },
          {
            ico: "\u{1F30A}",
            title: "'Make the park look better'",
            desc: "A general goal to improve the park's appearance.",
            correct: false,
            fbTitle: "Too vague to be useful!",
            fbDetail: "Your objective 'make the park look better' has no measurable criteria. How will you know when it is achieved? How many bags? Which areas? What date? Without measurable criteria, you cannot track progress or demonstrate success. Rewrite it using the SMART criteria.",
            effects: { planning: -10, safety: 0, impact: -5, teamwork: -5, budget: 0 }
          },
          {
            ico: "\u{1F310}",
            title: "Clean up every park in the city",
            desc: "A bold, ambitious goal to clean all city parks.",
            correct: false,
            fbTitle: "Not achievable for your team!",
            fbDetail: "Cleaning every park in the city is far beyond what 12 cadets can accomplish in one day. The 'A' in SMART stands for Achievable. This scope is unrealistic and will lead to failure and demoralized volunteers. Scale the objective to what your team can actually accomplish.",
            effects: { planning: -15, safety: -5, impact: -10, teamwork: -10, budget: -10 }
          },
          {
            ico: "\u{1F33F}",
            title: "Improve community relations",
            desc: "A general goal to build goodwill with the community.",
            correct: false,
            fbTitle: "An outcome, not an objective!",
            fbDetail: "Improving community relations is a valuable outcome of the project, but it is not a SMART objective. It is not specific or measurable in the way a clean-up goal is. Use it as the broader purpose, but write a specific, measurable objective for what the team will actually do.",
            effects: { planning: -5, safety: 0, impact: +5, teamwork: 0, budget: 0 }
          }
        ]
      },
      {
        id: "pc_risk",
        title: "Stage 3: Conduct the Risk Assessment",
        tag: "RISK MANAGEMENT",
        icon: "\u{26A0}\uFE0F",
        narrative: "With the plan written, you must conduct a risk assessment before the event. You walk the park site and identify several hazards: sharp objects in the litter, uneven ground along the trail, a road running alongside the park, and possible rain on the event date. How will you manage these risks?",
        prompt: "What is your approach to the risk assessment?",
        visual: "risk",
        choices: [
          {
            ico: "\u{1F6E1}\uFE0F",
            title: "Full risk assessment with controls",
            desc: "Document each hazard, rate it on the matrix, and implement controls: gloves, pickers, sharps container, high-vis vests, buddy system, weather contingency.",
            correct: true,
            fbTitle: "Thorough and professional!",
            fbDetail: "You document every hazard on the risk assessment form, rate each by likelihood and severity, and implement appropriate controls using the hierarchy of controls. Sharp objects get gloves, litter pickers, and a sharps container. Traffic gets high-vis vests and a buddy system. Weather gets a contingency plan and a go/no-go decision time. This is textbook risk management — your team will be safe.",
            effects: { planning: +15, safety: +30, impact: +10, teamwork: +10, budget: -5 }
          },
          {
            ico: "\u{1F44B}",
            title: "Tell volunteers to be careful",
            desc: "A verbal warning about the hazards should be enough.",
            correct: false,
            fbTitle: "Verbal warnings are not controls!",
            fbDetail: "Telling volunteers to 'be careful' is not a control measure. Sharp objects, traffic, and weather require physical controls: gloves, pickers, high-vis vests, and a weather contingency plan. Verbal warnings alone do not adequately reduce risk. As a leader, you must implement real controls.",
            effects: { planning: -5, safety: -25, impact: -5, teamwork: -5, budget: 0 }
          },
          {
            ico: "\u{1F6D1}",
            title: "Cancel the outdoor event",
            desc: "The risks are too high — cancel and do an indoor activity instead.",
            correct: false,
            fbTitle: "An unnecessary overreaction!",
            fbDetail: "The hazards you identified are all manageable with proper controls. Canceling an outdoor event because of manageable risks is an overreaction that denies the community a valuable service. The risk assessment exists to help you manage risks, not to avoid all activities. Implement the controls and proceed.",
            effects: { planning: -10, safety: +10, impact: -20, teamwork: -10, budget: -5 }
          },
          {
            ico: "\u{1F634}",
            title: "Skip the risk assessment",
            desc: "It is just a park clean-up — what could go wrong?",
            correct: false,
            fbTitle: "Dangerously negligent!",
            fbDetail: "Skipping the risk assessment is the most dangerous choice a leader can make. Sharp objects can cause cuts and infections, traffic can cause serious injury, and weather can create hazardous conditions. Without a risk assessment, none of these are controlled. This is a serious safety failure that could result in injuries and liability. Always conduct a risk assessment for off-base activities.",
            effects: { planning: -15, safety: -30, impact: -10, teamwork: -10, budget: 0 }
          }
        ]
      },
      {
        id: "pc_comm",
        title: "Stage 4: Communicate with the Partner",
        tag: "CIVILIAN COMMUNICATION",
        icon: "\u{1F4DE}",
        narrative: "You need to confirm arrangements with the community centre director and the park manager. You draft an email requesting permission, arranging garbage bag supply, and coordinating litter pickup after the event. The park manager responds by phone and agrees to everything. What do you do next?",
        prompt: "How do you handle the communication after the phone call?",
        visual: "comm",
        choices: [
          {
            ico: "\u{1F4DD}",
            title: "Confirm everything in writing",
            desc: "Send a follow-up email summarizing what was agreed: bags, pickup, date, and all details discussed.",
            correct: true,
            fbTitle: "Professional and thorough!",
            fbDetail: "You send a follow-up email confirming every detail discussed on the phone: the park manager will provide 50 garbage bags, arrange litter pickup at 3 PM on May 15, and grant permission for 12 cadets to clean the trail and picnic areas. This creates a written record, prevents misunderstandings, and shows professionalism. The park manager appreciates your thoroughness.",
            effects: { planning: +20, safety: +10, impact: +10, teamwork: +5, budget: +10 }
          },
          {
            ico: "\u{1F44D}",
            title: "Trust the verbal agreement",
            desc: "They said yes on the phone — no need to follow up in writing.",
            correct: false,
            fbTitle: "Verbal agreements get forgotten!",
            fbDetail: "You decide not to follow up in writing. Two weeks later, on event day, the park manager has forgotten about the garbage bags and the litter pickup arrangement. Your team arrives with no bags and no way to dispose of collected litter. Verbal agreements are too easily forgotten or misremembered. Always confirm in writing.",
            effects: { planning: -20, safety: -10, impact: -15, teamwork: -10, budget: -10 }
          },
          {
            ico: "\u{1F465}",
            title: "Tell your volunteers about it",
            desc: "Pass the information to the team and move on to other planning.",
            correct: false,
            fbTitle: "Forgot to confirm with the partner!",
            fbDetail: "You tell your volunteers about the arrangements but never confirm them with the park manager in writing. You have communicated internally but not externally. The partner may forget or misunderstand the details. You must confirm with the civilian partner in writing, not just with your team.",
            effects: { planning: -10, safety: -5, impact: -10, teamwork: +5, budget: -5 }
          },
          {
            ico: "\u{1F4F1}",
            title: "Text the park manager informally",
            desc: "Send a quick text saying 'thanks for the call, see you Saturday.'",
            correct: false,
            fbTitle: "Too informal for a professional relationship!",
            fbDetail: "A casual text does not document the specific arrangements — bags, pickup, permission. If there is a dispute later, a text saying 'see you Saturday' does not prove what was agreed. Professional communication with civilian partners should be in the form of a proper email that documents all details.",
            effects: { planning: -10, safety: -5, impact: -5, teamwork: 0, budget: -5 }
          }
        ]
      },
      {
        id: "pc_resources",
        title: "Stage 5: Allocate Resources",
        tag: "RESOURCES & LOGISTICS",
        icon: "\u{1F4E2}",
        narrative: "One week before the event, you need to finalize your resources. You need garbage bags (provided by the park manager), gloves, litter pickers, water for volunteers, a first aid kit, high-vis vests, and a sign-in sheet. You have 12 volunteers and a small corps budget. How will you acquire the remaining resources?",
        prompt: "What is your resource acquisition strategy?",
        visual: "resources",
        choices: [
          {
            ico: "\u{1F3EA}",
            title: "Seek donations, then purchase",
            desc: "Ask local businesses to donate gloves, water, and vests. Purchase litter pickers and first aid supplies with corps funds.",
            correct: true,
            fbTitle: "Smart and cost-conscious!",
            fbDetail: "You visit a local hardware store and they donate 15 pairs of work gloves. A nearby grocery store donates 3 cases of water. The corps budget covers 12 litter pickers and a first aid kit refill. You have everything you need at minimal cost, and you have built relationships with local businesses who may support future projects. This is excellent resource management.",
            effects: { planning: +15, safety: +10, impact: +15, teamwork: +10, budget: +25 }
          },
          {
            ico: "\u{1F6D2}",
            title: "Buy everything at retail price",
            desc: "Purchase all supplies from a hardware store using the full corps budget.",
            correct: false,
            fbTitle: "Works but wasteful!",
            fbDetail: "You buy everything at full retail price, using most of the corps budget. The project is fully resourced, but you have spent money that could have been saved through donations. Many local businesses would have donated supplies to a cadet community service project. Seek donations first to conserve corps funds and build community relationships.",
            effects: { planning: +10, safety: +10, impact: +5, teamwork: +5, budget: -20 }
          },
          {
            ico: "\u{1F469}\u200D\u1F337}",
            title: "Ask volunteers to bring their own",
            desc: "Tell each volunteer to bring gloves, water, and whatever they can.",
            correct: false,
            fbTitle: "Unreliable and unfair!",
            fbDetail: "Some volunteers bring adequate supplies, but others forget or bring inadequate items. One cadet has no gloves and picks up litter bare-handed, risking cuts. Another has no water and becomes dehydrated. Relying on volunteers for core safety supplies is unreliable and creates safety risks. The corps should provide essential safety equipment.",
            effects: { planning: -10, safety: -15, impact: -5, teamwork: -10, budget: +10 }
          },
          {
            ico: "\u{1F634}",
            title: "Hope for the best on event day",
            desc: "Do not worry about resources now — sort it out when you get there.",
            correct: false,
            fbTitle: "A recipe for disaster!",
            fbDetail: "On event day, you realize you have no gloves, no litter pickers, no water, and no first aid kit. Volunteers stand around with nothing to do and no way to safely collect litter. The event is a failure before it even starts. Resource planning must happen before the event, not on the day. This is a serious planning failure.",
            effects: { planning: -25, safety: -20, impact: -20, teamwork: -15, budget: 0 }
          }
        ]
      },
      {
        id: "pc_eventday",
        title: "Stage 6: Event Day Leadership",
        tag: "EXECUTION",
        icon: "\u{1F4C5}",
        narrative: "It is Saturday, May 15. The weather is overcast but dry. Your 12 volunteers have arrived at Riverside Park. The park manager has dropped off the garbage bags. Everything you planned is coming together. Now you need to lead the event. What is your first action?",
        prompt: "What do you do first with your assembled team?",
        visual: "eventday",
        choices: [
          {
            ico: "\u{1F4AC}",
            title: "Conduct a safety briefing",
            desc: "Brief volunteers on hazards, controls, emergency procedures, first aid, and the communication plan.",
            correct: true,
            fbTitle: "Safety first — excellent leadership!",
            fbDetail: "You gather the team and conduct a thorough safety briefing. You cover the hazards (sharp objects, uneven terrain, road traffic), the controls (gloves, pickers, buddy system, high-vis vests), emergency procedures (first aid attendant location, emergency contacts, evacuation point), and the communication plan (check-in times, team leader roles). Every volunteer signs in. Only after safety is briefed do you distribute equipment and begin work. This is how a leader runs an event.",
            effects: { planning: +10, safety: +25, impact: +15, teamwork: +20, budget: 0 }
          },
          {
            ico: "\u{1F9F9}",
            title: "Hand out bags and start working",
            desc: "Get everyone working right away to maximize clean-up time.",
            correct: false,
            fbTitle: "Safety briefing skipped!",
            fbDetail: "You hand out garbage bags and tell everyone to start. Volunteers scatter without knowing the hazards, the controls, or the emergency procedures. One cadet picks up broken glass bare-handed because no one told them to use the litter pickers. Another team wanders near the road without high-vis vests. Starting work without a safety briefing is a serious leadership failure.",
            effects: { planning: -5, safety: -25, impact: +5, teamwork: -10, budget: 0 }
          },
          {
            ico: "\u{1F4F8}",
            title: "Take a group photo first",
            desc: "Capture the moment for social media before starting work.",
            correct: false,
            fbTitle: "Priorities are wrong!",
            fbDetail: "You spend 15 minutes taking group photos and posting on social media. Meanwhile, volunteers are standing around getting cold and impatient. The safety briefing still has not happened. Photos are nice, but safety and getting to work are the priorities. Conduct the safety briefing first, then take photos during the event.",
            effects: { planning: -5, safety: -10, impact: -5, teamwork: -5, budget: 0 }
          },
          {
            ico: "\u{2615}",
            title: "Wait for late arrivals",
            desc: "Delay the start until everyone who said they might come has arrived.",
            correct: false,
            fbTitle: "Indecisive leadership!",
            fbDetail: "You wait 30 minutes for volunteers who said they might come but have not confirmed. The team that is present becomes bored and cold. Eventually you start with 9 volunteers instead of 12, having wasted 30 minutes of event time. Set a clear start time, conduct the safety briefing with those present, and integrate late arrivals as they arrive. Do not penalize the punctual for the tardy.",
            effects: { planning: -10, safety: -5, impact: -10, teamwork: -10, budget: 0 }
          }
        ]
      },
      {
        id: "pc_incident",
        title: "Stage 7: Respond to an Incident",
        tag: "INCIDENT MANAGEMENT",
        icon: "\u{1F6A8}",
        narrative: "Ninety minutes into the clean-up, Team B's leader reports that a volunteer has found a discarded needle among the litter. Several volunteers are nervous. The weather is also starting to turn — dark clouds are rolling in. Two challenges at once. As the project leader, how do you respond?",
        prompt: "How do you handle the needle and the changing weather?",
        visual: "incident",
        choices: [
          {
            ico: "\u{1FA74}",
            title: "Calm, controlled response",
            desc: "Stop work near the needle, dispose of it in the sharps container, reinforce controls, then assess weather and make a go/no-go call.",
            correct: true,
            fbTitle: "Crisis leadership at its best!",
            fbDetail: "You stay calm and take charge. First, you stop collection in the area where the needle was found and have a trained volunteer dispose of it in the sharps container you brought. You radio all teams to reinforce the rule: use litter pickers, no hand contact with sharp items. Then you assess the weather — the dark clouds look serious. You check the forecast, see rain imminent, and make the call to wrap up collection in 20 minutes and move to the debrief. Your team sees a leader who is composed, decisive, and safety-focused. This is what training is for.",
            effects: { planning: +10, safety: +25, impact: +10, teamwork: +20, budget: 0 }
          },
          {
            ico: "\u{1F6A8}",
            title: "Evacuate the park immediately",
            desc: "A needle is a biohazard — pull everyone out and abort the event.",
            correct: false,
            fbTitle: "An overreaction that abandons the project!",
            fbDetail: "You panic and order an immediate evacuation. Volunteers are confused and disappointed — the event is only half done. The needle is a manageable hazard that your risk assessment anticipated. You have a sharps container and protocols for exactly this situation. Evacuating over a single manageable hazard shows a lack of confidence in your own planning. Stay calm, manage the incident, and continue the event.",
            effects: { planning: -10, safety: +10, impact: -20, teamwork: -15, budget: 0 }
          },
          {
            ico: "\u{1F44C}",
            title: "Tell them to throw it in the bag",
            desc: "It is just one needle — put it in with the rest of the litter.",
            correct: false,
            fbTitle: "Extremely dangerous!",
            fbDetail: "You tell the volunteer to throw the needle in the garbage bag. Later, when the bag is handled for disposal, the needle punctures the bag and pierces a park worker's hand. This is a serious biohazard exposure that could have been prevented with the sharps container you brought. Never dispose of needles in regular garbage. This is a critical safety failure.",
            effects: { planning: -10, safety: -30, impact: -10, teamwork: -10, budget: 0 }
          },
          {
            ico: "\u{1F634}",
            title: "Ignore both issues",
            desc: "The volunteers can deal with the needle, and a little rain is fine.",
            correct: false,
            fbTitle: "Negligent leadership!",
            fbDetail: "You ignore both the needle and the weather. A volunteer handles the needle with bare hands, risking a needle-stick injury. Then the rain hits — volunteers are unprepared, get soaked and cold, and the litter they have collected starts blowing around. The event descends into chaos. Ignoring incidents is the mark of a failed leader. You must address both issues immediately.",
            effects: { planning: -15, safety: -30, impact: -15, teamwork: -20, budget: 0 }
          }
        ]
      },
      {
        id: "pc_debrief",
        title: "Stage 8: Lead the Debrief",
        tag: "REFLECTION & DEBRIEF",
        icon: "\u{1F4AC}",
        narrative: "The clean-up is complete. Your 12 volunteers collected 27 bags of litter — exceeding your objective of 20! The park looks transformed. The park manager stopped by to thank the team. Now, with everyone still gathered, it is time for the debrief. This is where the learning happens. How will you conduct it?",
        prompt: "How do you structure the debrief discussion?",
        visual: "debrief",
        choices: [
          {
            ico: "\u{1F4AC}",
            title: "Structured after-action review",
            desc: "Ask: What went well? What did not go well? What should we do differently next time? Let everyone speak.",
            correct: true,
            fbTitle: "A model debrief!",
            fbDetail: "You gather the team and conduct a structured after-action review. 'What went well?' — volunteers highlight the thorough safety briefing, the team organization, and exceeding the litter collection goal. 'What did not go well?' — Team B ran low on bags mid-event and had to wait for resupply. 'What should we do differently?' — assign a logistics runner to each team with extra supplies next time. You document the lessons learned, thank everyone for their service, and reflect on the community impact: 27 bags of litter removed, a cleaner park for 500 weekly visitors, and a strengthened partnership with the community centre. The cadets leave feeling proud, valued, and motivated for future service. This is what community service is all about.",
            effects: { planning: +20, safety: +10, impact: +25, teamwork: +25, budget: +5 }
          },
          {
            ico: "\u{1F44D}",
            title: "Only discuss the positives",
            desc: "The event was a success — just celebrate and do not bring up problems.",
            correct: false,
            fbTitle: "Missed the learning opportunity!",
            fbDetail: "You only talk about what went well. The team celebrates, but the bag shortage problem is never discussed or solved. Next time, the same problem will happen again. A debrief that only covers positives misses half its purpose. You must also discuss what did not go well and what to improve — that is where the learning happens.",
            effects: { planning: -10, safety: 0, impact: +10, teamwork: +5, budget: 0 }
          },
          {
            ico: "\u{1F620}",
            title: "Focus on what went wrong",
            desc: "Lecture the team about the bag shortage and other mistakes.",
            correct: false,
            fbTitle: "Demoralizing and counterproductive!",
            fbDetail: "You spend the debrief criticizing the team for the bag shortage and other issues. Volunteers feel demoralized and defensive. Several cadets tell you they are not sure they want to volunteer again. A blame-focused debrief destroys morale and discourages future participation. Focus on constructive improvement, not blame.",
            effects: { planning: -5, safety: 0, impact: -10, teamwork: -20, budget: 0 }
          },
          {
            ico: "\u{1F634}",
            title: "Skip the debrief",
            desc: "Everyone is tired — just thank them and let them go home.",
            correct: false,
            fbTitle: "Wasted a critical learning moment!",
            fbDetail: "You skip the debrief and send everyone home. The lessons from this event — what worked, what did not, what to improve — are lost as memories fade. Next time, the same mistakes will be repeated. The debrief is where a one-time event becomes lasting learning. It is essential, not optional. Even a brief 15-minute debrief is invaluable.",
            effects: { planning: -15, safety: -5, impact: -15, teamwork: -10, budget: 0 }
          }
        ]
      }
    ],
    passThreshold: 6,
    meters: [
      { key: "planning",  label: "Planning",   icon: "\u{1F4CB}", color: "var(--signal)" },
      { key: "safety",    label: "Safety",     icon: "\u{1F6E1}\uFE0F", color: "var(--green)" },
      { key: "impact",    label: "Impact",     icon: "\u{1F4CA}", color: "var(--gold)" },
      { key: "teamwork",  label: "Teamwork",   icon: "\u{1F465}", color: "var(--civic)" },
      { key: "budget",    label: "Budget",     icon: "\u{1F4B0}", color: "var(--amber)" }
    ]
  };

  // ==========================================================
  // STATE MANAGEMENT
  // ==========================================================
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
      projectBadgeEarned: false,
      projectBestScore: 0
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
  // MAP PROGRESS SYNC -- lesson 112 on the year2 quest map
  // ==========================================================
  function syncMapProgress() {
    try {
      const allDone = MISSIONS.every(m => state.completedMissions.includes(m.id));
      let mapProgress = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || "[]");
      if (allDone && !mapProgress.includes(COMMUNITY_LESSON_ID)) {
        mapProgress.push(COMMUNITY_LESSON_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      } else if (!allDone && mapProgress.includes(COMMUNITY_LESSON_ID)) {
        mapProgress = mapProgress.filter(id => id !== COMMUNITY_LESSON_ID);
        localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
      }
    } catch (e) {}
  }

  // ==========================================================
  // SCENE SVG GENERATORS -- Community service & civic themes
  // ==========================================================
  function sceneSVG(scene) {
    const W = 600, H = 180;
    const base = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">';
    const end = '</svg>';
    const grad = function(id, c1, c2) {
      return '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>';
    };

    if (scene === "scope") {
      return base + grad("g1", "#0e1c16", "#122820") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g1)"/>' +
        '<circle cx="500" cy="40" r="30" fill="#35a75a" opacity="0.15"/>' +
        '<rect x="80" y="60" width="200" height="80" rx="8" fill="#1a3328" stroke="#35a75a" stroke-width="1" opacity="0.6"/>' +
        '<rect x="100" y="80" width="160" height="6" rx="3" fill="#35a75a" opacity="0.4"/>' +
        '<rect x="100" y="94" width="120" height="4" rx="2" fill="#f5c84c" opacity="0.3"/>' +
        '<rect x="100" y="104" width="140" height="4" rx="2" fill="#3b8fd4" opacity="0.3"/>' +
        '<rect x="100" y="114" width="80" height="4" rx="2" fill="#35a75a" opacity="0.3"/>' +
        '<circle cx="480" cy="90" r="40" fill="none" stroke="#35a75a" stroke-width="2" opacity="0.3"/>' +
        '<circle cx="480" cy="90" r="25" fill="none" stroke="#f5c84c" stroke-width="1.5" opacity="0.3"/>' +
        '<text x="480" y="95" text-anchor="middle" font-size="14" fill="#35a75a" opacity="0.6" font-family="monospace">SCOPE</text>' +
        end;
    }
    if (scene === "plan") {
      return base + grad("g2", "#0e1c16", "#0f2218") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g2)"/>' +
        '<rect x="60" y="40" width="180" height="100" rx="6" fill="#1a3328" stroke="#35a75a" stroke-width="1" opacity="0.5"/>' +
        '<line x1="90" y1="60" x2="210" y2="60" stroke="#35a75a" stroke-width="2" opacity="0.4"/>' +
        '<line x1="90" y1="80" x2="180" y2="80" stroke="#3b8fd4" stroke-width="2" opacity="0.3"/>' +
        '<line x1="90" y1="100" x2="200" y2="100" stroke="#f5c84c" stroke-width="2" opacity="0.3"/>' +
        '<line x1="90" y1="120" x2="160" y2="120" stroke="#35a75a" stroke-width="2" opacity="0.3"/>' +
        '<rect x="280" y="50" width="100" height="30" rx="4" fill="#122820" stroke="#3b8fd4" stroke-width="1" opacity="0.4"/>' +
        '<rect x="280" y="90" width="100" height="30" rx="4" fill="#122820" stroke="#35a75a" stroke-width="1" opacity="0.4"/>' +
        '<line x1="240" y1="65" x2="280" y2="65" stroke="#35a75a" stroke-width="1" opacity="0.3"/>' +
        '<line x1="240" y1="105" x2="280" y2="105" stroke="#3b8fd4" stroke-width="1" opacity="0.3"/>' +
        '<rect x="420" y="45" width="120" height="90" rx="6" fill="#1a3328" stroke="#f5c84c" stroke-width="1" opacity="0.4"/>' +
        '<line x1="440" y1="70" x2="520" y2="70" stroke="#f5c84c" stroke-width="2" opacity="0.3"/>' +
        '<line x1="440" y1="90" x2="500" y2="90" stroke="#35a75a" stroke-width="2" opacity="0.3"/>' +
        '<line x1="440" y1="110" x2="510" y2="110" stroke="#3b8fd4" stroke-width="2" opacity="0.3"/>' +
        end;
    }
    if (scene === "risk") {
      return base + grad("g3", "#0e1c16", "#1a1208") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g3)"/>' +
        '<rect x="120" y="30" width="180" height="120" rx="6" fill="#1a2310" stroke="#f5c84c" stroke-width="1" opacity="0.4"/>' +
        '<rect x="140" y="50" width="60" height="20" rx="3" fill="#ff5a6e" opacity="0.3"/>' +
        '<rect x="210" y="50" width="60" height="20" rx="3" fill="#ff9a42" opacity="0.3"/>' +
        '<rect x="280" y="50" width="60" height="20" rx="3" fill="#f5c84c" opacity="0.3"/>' +
        '<rect x="140" y="80" width="60" height="20" rx="3" fill="#ff9a42" opacity="0.3"/>' +
        '<rect x="210" y="80" width="60" height="20" rx="3" fill="#f5c84c" opacity="0.3"/>' +
        '<rect x="280" y="80" width="60" height="20" rx="3" fill="#35a75a" opacity="0.3"/>' +
        '<rect x="140" y="110" width="60" height="20" rx="3" fill="#f5c84c" opacity="0.3"/>' +
        '<rect x="210" y="110" width="60" height="20" rx="3" fill="#35a75a" opacity="0.3"/>' +
        '<rect x="280" y="110" width="60" height="20" rx="3" fill="#35a75a" opacity="0.3"/>' +
        '<circle cx="460" cy="90" r="35" fill="none" stroke="#f5c84c" stroke-width="2" opacity="0.4"/>' +
        '<path d="M460 72 L460 92 M460 100 L460 104" stroke="#f5c84c" stroke-width="3" opacity="0.5"/>' +
        '<circle cx="460" cy="110" r="3" fill="#f5c84c" opacity="0.5"/>' +
        end;
    }
    if (scene === "comm") {
      return base + grad("g4", "#0e1c16", "#0f1c26") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g4)"/>' +
        '<rect x="80" y="40" width="200" height="100" rx="8" fill="#102028" stroke="#3b8fd4" stroke-width="1" opacity="0.4"/>' +
        '<rect x="100" y="55" width="160" height="8" rx="4" fill="#3b8fd4" opacity="0.3"/>' +
        '<rect x="100" y="72" width="120" height="6" rx="3" fill="#3b8fd4" opacity="0.2"/>' +
        '<rect x="100" y="88" width="140" height="6" rx="3" fill="#3b8fd4" opacity="0.2"/>' +
        '<rect x="100" y="100" width="100" height="6" rx="3" fill="#3b8fd4" opacity="0.2"/>' +
        '<rect x="100" y="118" width="70" height="14" rx="7" fill="#3b8fd4" opacity="0.3"/>' +
        '<rect x="340" y="50" width="160" height="80" rx="8" fill="#102028" stroke="#35a75a" stroke-width="1" opacity="0.4"/>' +
        '<circle cx="420" cy="80" r="20" fill="none" stroke="#35a75a" stroke-width="2" opacity="0.4"/>' +
        '<path d="M410 80 L420 90 L432 72" stroke="#35a75a" stroke-width="3" fill="none" opacity="0.5"/>' +
        '<rect x="370" y="110" width="100" height="6" rx="3" fill="#35a75a" opacity="0.2"/>' +
        end;
    }
    if (scene === "resources") {
      return base + grad("g5", "#0e1c16", "#122820") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g5)"/>' +
        '<rect x="60" y="50" width="70" height="50" rx="6" fill="#1a3328" stroke="#35a75a" stroke-width="1" opacity="0.4"/>' +
        '<rect x="145" y="50" width="70" height="50" rx="6" fill="#1a3328" stroke="#f5c84c" stroke-width="1" opacity="0.4"/>' +
        '<rect x="230" y="50" width="70" height="50" rx="6" fill="#1a3328" stroke="#3b8fd4" stroke-width="1" opacity="0.4"/>' +
        '<rect x="315" y="50" width="70" height="50" rx="6" fill="#1a3328" stroke="#35a75a" stroke-width="1" opacity="0.4"/>' +
        '<circle cx="95" cy="75" r="12" fill="#35a75a" opacity="0.3"/>' +
        '<circle cx="180" cy="75" r="12" fill="#f5c84c" opacity="0.3"/>' +
        '<circle cx="265" cy="75" r="12" fill="#3b8fd4" opacity="0.3"/>' +
        '<circle cx="350" cy="75" r="12" fill="#35a75a" opacity="0.3"/>' +
        '<rect x="430" y="40" width="110" height="70" rx="6" fill="#102018" stroke="#f5c84c" stroke-width="1" opacity="0.3"/>' +
        '<text x="485" y="65" text-anchor="middle" font-size="16" fill="#f5c84c" opacity="0.5" font-family="monospace">$</text>' +
        '<rect x="450" y="75" width="70" height="6" rx="3" fill="#f5c84c" opacity="0.3"/>' +
        '<rect x="450" y="88" width="50" height="6" rx="3" fill="#f5c84c" opacity="0.2"/>' +
        end;
    }
    if (scene === "eventday") {
      return base + grad("g6", "#0e1c16", "#122820") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g6)"/>' +
        '<circle cx="100" cy="50" r="18" fill="#f5c84c" opacity="0.2"/>' +
        '<circle cx="100" cy="50" r="10" fill="#f5c84c" opacity="0.3"/>' +
        '<rect x="180" y="40" width="240" height="100" rx="8" fill="#1a3328" stroke="#35a75a" stroke-width="1" opacity="0.4"/>' +
        '<circle cx="230" cy="75" r="10" fill="#35a75a" opacity="0.4"/>' +
        '<circle cx="270" cy="75" r="10" fill="#3b8fd4" opacity="0.4"/>' +
        '<circle cx="310" cy="75" r="10" fill="#f5c84c" opacity="0.4"/>' +
        '<circle cx="350" cy="75" r="10" fill="#35a75a" opacity="0.4"/>' +
        '<rect x="210" y="100" width="180" height="6" rx="3" fill="#35a75a" opacity="0.2"/>' +
        '<rect x="210" y="115" width="120" height="6" rx="3" fill="#35a75a" opacity="0.2"/>' +
        '<rect x="460" y="45" width="80" height="90" rx="6" fill="#102018" stroke="#3b8fd4" stroke-width="1" opacity="0.3"/>' +
        '<text x="500" y="90" text-anchor="middle" font-size="20" fill="#3b8fd4" opacity="0.4" font-family="monospace">DAY</text>' +
        end;
    }
    if (scene === "debrief") {
      return base + grad("g7", "#0e1c16", "#0f1c26") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g7)"/>' +
        '<rect x="100" y="35" width="400" height="110" rx="10" fill="#102028" stroke="#3b8fd4" stroke-width="1" opacity="0.3"/>' +
        '<circle cx="160" cy="70" r="15" fill="#35a75a" opacity="0.3"/>' +
        '<circle cx="300" cy="70" r="15" fill="#f5c84c" opacity="0.3"/>' +
        '<circle cx="440" cy="70" r="15" fill="#3b8fd4" opacity="0.3"/>' +
        '<rect x="130" y="100" width="80" height="6" rx="3" fill="#35a75a" opacity="0.2"/>' +
        '<rect x="270" y="100" width="80" height="6" rx="3" fill="#f5c84c" opacity="0.2"/>' +
        '<rect x="410" y="100" width="80" height="6" rx="3" fill="#3b8fd4" opacity="0.2"/>' +
        '<rect x="140" y="120" width="320" height="4" rx="2" fill="#3b8fd4" opacity="0.15"/>' +
        end;
    }
    if (scene === "citizenship") {
      return base + grad("g8", "#0e1c16", "#122820") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#g8)"/>' +
        '<circle cx="300" cy="90" r="50" fill="none" stroke="#35a75a" stroke-width="2" opacity="0.3"/>' +
        '<circle cx="300" cy="90" r="35" fill="none" stroke="#f5c84c" stroke-width="1.5" opacity="0.3"/>' +
        '<circle cx="300" cy="90" r="20" fill="none" stroke="#3b8fd4" stroke-width="1" opacity="0.3"/>' +
        '<circle cx="200" cy="50" r="8" fill="#35a75a" opacity="0.4"/>' +
        '<circle cx="400" cy="50" r="8" fill="#f5c84c" opacity="0.4"/>' +
        '<circle cx="180" cy="130" r="8" fill="#3b8fd4" opacity="0.4"/>' +
        '<circle cx="420" cy="130" r="8" fill="#35a75a" opacity="0.4"/>' +
        '<line x1="200" y1="50" x2="300" y2="90" stroke="#35a75a" stroke-width="1" opacity="0.2"/>' +
        '<line x1="400" y1="50" x2="300" y2="90" stroke="#f5c84c" stroke-width="1" opacity="0.2"/>' +
        '<line x1="180" y1="130" x2="300" y2="90" stroke="#3b8fd4" stroke-width="1" opacity="0.2"/>' +
        '<line x1="420" y1="130" x2="300" y2="90" stroke="#35a75a" stroke-width="1" opacity="0.2"/>' +
        end;
    }
    // visuals for game stages
    if (scene === "objectives") {
      return base + grad("gObj", "#0e1c16", "#122820") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#gObj)"/>' +
        '<rect x="80" y="45" width="180" height="90" rx="6" fill="#1a3328" stroke="#35a75a" stroke-width="1" opacity="0.4"/>' +
        '<text x="170" y="75" text-anchor="middle" font-size="12" fill="#35a75a" opacity="0.5" font-family="monospace">SMART</text>' +
        '<rect x="100" y="85" width="140" height="4" rx="2" fill="#35a75a" opacity="0.3"/>' +
        '<rect x="100" y="97" width="100" height="4" rx="2" fill="#f5c84c" opacity="0.3"/>' +
        '<rect x="100" y="109" width="120" height="4" rx="2" fill="#3b8fd4" opacity="0.3"/>' +
        '<circle cx="420" cy="90" r="35" fill="none" stroke="#f5c84c" stroke-width="2" opacity="0.3"/>' +
        '<path d="M405 90 L415 100 L438 78" stroke="#f5c84c" stroke-width="3" fill="none" opacity="0.4"/>' +
        end;
    }
    if (scene === "incident") {
      return base + grad("gInc", "#0e1c16", "#1a1208") +
        '<rect width="' + W + '" height="' + H + '" fill="url(#gInc)"/>' +
        '<circle cx="300" cy="90" r="40" fill="none" stroke="#ff5a6e" stroke-width="2" opacity="0.4"/>' +
        '<circle cx="300" cy="90" r="25" fill="none" stroke="#ff9a42" stroke-width="1.5" opacity="0.3"/>' +
        '<path d="M300 65 L300 95 M300 105 L300 112" stroke="#ff5a6e" stroke-width="3" opacity="0.5"/>' +
        '<circle cx="300" cy="118" r="3" fill="#ff5a6e" opacity="0.5"/>' +
        '<rect x="100" y="60" width="100" height="60" rx="6" fill="#1a2310" stroke="#f5c84c" stroke-width="1" opacity="0.3"/>' +
        '<rect x="400" y="60" width="100" height="60" rx="6" fill="#102018" stroke="#35a75a" stroke-width="1" opacity="0.3"/>' +
        end;
    }
    return base + grad("gDef", "#0e1c16", "#122820") +
      '<rect width="' + W + '" height="' + H + '" fill="url(#gDef)"/>' +
      '<circle cx="300" cy="90" r="30" fill="none" stroke="#35a75a" stroke-width="2" opacity="0.3"/>' +
      end;
  }

  // ==========================================================
  // HELPERS
  // ==========================================================
  function escapeHTML(str) {
    if (str === null || str === undefined) return "";
    return String(str).replace(/[&<>"']/g, function (c) {
      var map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      return map[c];
    });
  }
  function toastOld(msg, type) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.className = "toast show" + (type ? " toast-" + type : "");
    setTimeout(function() { el.className = "toast"; }, 2800);
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
    COMMUNITY_BADGES.forEach(function(b) {
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
    const prev = MISSIONS.find(function(x) { return x.order === m.order - 1; });
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
    document.getElementById("pilotCallsign").textContent = tr("CALLSIGN:") + " " + rank.callsign;
    const pct = rankProgressPct();
    document.getElementById("xpFill").style.width = pct + "%";
    const span = nxt ? (nxt.xp - rank.xp) : 100;
    const into = nxt ? (state.xp - rank.xp) : span;
    document.getElementById("xpText").textContent = into + " / " + span + " XP";
  }

  function renderTopStats() {
    const rank = currentRank();
    refreshBadges();
    document.getElementById("topRank").textContent = rank.name.replace("Service Recruit", "Recruit").replace("Service Cadet", "Cadet").replace("Senior Service Cadet", "Sr. Cadet").replace("Service ", "");
    document.getElementById("topXP").textContent = state.xp;
    document.getElementById("topBadges").textContent = state.badges.length;
  }

  // ==========================================================
  // RENDER: COMMAND (DASHBOARD)
  // ==========================================================
  function renderCommand() {
    refreshBadges();
    document.getElementById("cmdMissionsDone").textContent = state.completedMissions.length;
    document.getElementById("cmdMissionsTotal").textContent = tr("of") + " " + MISSIONS.length;
    document.getElementById("cmdXP").textContent = state.xp;
    const nxt = nextRank();
    document.getElementById("cmdXPNext").textContent = nxt ? "+" + (nxt.xp - state.xp) + " " + tr("to") + " " + nxt.name : tr("MAX RANK");
    document.getElementById("cmdSitreps").textContent = state.sitreps.length;
    document.getElementById("cmdBadges").textContent = state.badges.length;
    document.getElementById("cmdBadgeTotal").textContent = tr("of") + " " + COMMUNITY_BADGES.length;

    const threatPct = Math.min(80, 20 + state.wrongAttempts * 5);
    const tf = document.getElementById("threatFill");
    if (tf) tf.style.width = threatPct + "%";

    const cl = document.getElementById("chapterList");
    cl.innerHTML = MISSIONS.map(function(m) {
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
      else { cls += " locked"; progText = tr("LOCKED"); }
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
    cl.querySelectorAll(".chapter-row:not(.locked)").forEach(function(el) {
      el.addEventListener("click", function() {
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
    grid.innerHTML = MISSIONS.map(function(m) {
      const done = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total = m.tasks.length;
      const pct = Math.round((prog / total) * 100);
      let cls = "mission-card";
      let statusCls = "mc-status";
      let statusText = "";
      if (done) { cls += " done"; statusCls += " done"; statusText = tr("COMPLETE"); }
      else if (!unlocked) { cls += " locked"; statusCls += " locked"; statusText = tr("LOCKED"); }
      else { statusCls += " active"; statusText = tr("READY"); }
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
    grid.querySelectorAll(".mission-card:not(.locked)").forEach(function(el) {
      el.addEventListener("click", function() { openMission(el.dataset.mission); });
    });
  }

  // ==========================================================
  // RENDER: MISSION SELECTOR
  // ==========================================================
  function renderMissionSelector() {
    const sel = document.getElementById("missionSelector");
    sel.innerHTML = MISSIONS.map(function(m) {
      const done = missionDone(m);
      const unlocked = missionUnlocked(m);
      const prog = tasksDoneCount(m);
      const total = m.tasks.length;
      const pct = Math.round((prog / total) * 100);
      let cls = "mission-card";
      let statusCls = "mc-status";
      let statusText = "";
      if (done) { cls += " done"; statusCls += " done"; statusText = tr("COMPLETE"); }
      else if (activeMissionId === m.id) { cls += " active"; statusCls += " active"; statusText = tr("IN PROGRESS"); }
      else if (!unlocked) { cls += " locked"; statusCls += " locked"; statusText = tr("LOCKED"); }
      else { statusCls += " active"; statusText = tr("READY"); }
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
    sel.querySelectorAll(".mission-card:not(.locked)").forEach(function(el) {
      el.addEventListener("click", function() { openMission(el.dataset.mission); });
    });
  }

  // ==========================================================
  // MISSION CONSOLE
  // ==========================================================
  function openMission(missionId) {
    const m = MISSIONS.find(function(x) { return x.id === missionId; });
    if (!m) return;
    if (!missionUnlocked(m)) {
      toast("warn", String.fromCharCode(128274) + " " + tr("Module") + " " + m.order + " " + tr("is locked. Complete the previous module first."));
      return;
    }
    activeMissionId = missionId;
    activeTool = "";
    toggleState = {};
    sliderValue = {};
    selectState = {};
    orderState = {};

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
    const m = MISSIONS.find(function(x) { return x.id === activeMissionId; });
    if (!m) return;
    const mp = missionProgress(m.id);
    const consoleEl = document.getElementById("missionConsole");

    if (missionDone(m)) {
      consoleEl.innerHTML = completedMissionHTML(m);
      const fb = document.getElementById("fileSitrepQuickBtn");
      if (fb) fb.addEventListener("click", function() { exitMission(); switchSection("sitrep"); });
      const bl = document.getElementById("backToListBtn");
      if (bl) bl.addEventListener("click", exitMission);
      return;
    }

    const task = m.tasks[activeTaskIndex];
    const total = m.tasks.length;

    consoleEl.innerHTML =
      '<div class="task-console">' +
        '<div class="task-header">' +
          '<div class="th-left">' +
            '<div class="th-ico">' + m.icon + '</div>' +
            '<div>' +
              '<div class="th-title">' + m.title + '</div>' +
              '<div class="th-sub">' + m.tag + ' ' + String.fromCharCode(8226) + ' ' + mp.tasksDone.length + '/' + total + ' ' + tr("tasks complete") + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="th-right">' +
            '<span class="task-stage-pill">' + tr("TASK") + ' ' + (activeTaskIndex + 1) + ' / ' + total + '</span>' +
            '<button class="btn btn-ghost" id="exitMissionBtn" type="button">' + String.fromCharCode(8592) + ' ' + tr("Back to list") + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="task-body">' +
          '<div class="scene-visual">' + sceneSVG(m.scene) + '<div class="scene-overlay">' + m.brief.split(".")[0] + '.</div></div>' +
          '<div class="task-brief">' + m.brief + '</div>' +

          '<div class="tool-dock" id="toolDock">' +
            TOOLS.map(function(t) { return '<button class="tool-btn ' + (activeTool === t.id ? "active" : "") + '" data-tool="' + t.id + '" type="button"><span class="tb-ico">' + t.icon + '</span>' + t.label + '</button>'; }).join("") +
          '</div>' +

          '<div class="tool-req" id="toolReq">' +
            '<span class="tr-ico">' + String.fromCharCode(9888) + String.fromCharCode(65039) + '</span>' +
            '<span class="tr-text">' + tr("This task requires the") + ' <strong>' + toolLabel(task.tool) + '</strong> ' + tr("to be open.") + ' ' + tr("Current tool:") + ' <span class="tr-now" id="trNow">' + (activeTool ? toolLabel(activeTool) : tr("NONE")) + '</span></span>' +
          '</div>' +

          '<div class="task-step-label">' +
            '<span class="step-num">' + tr("STEP") + ' ' + (activeTaskIndex + 1) + '</span>' +
            '<span class="step-title">' + (task.prompt ? task.prompt.substring(0, 60) : "Task") + '</span>' +
          '</div>' +
          '<div class="task-instructions">' + (task.prompt || "") + '</div>' +

          '<div class="task-control" id="taskControl">' +
            renderTaskControl(task, activeTaskIndex) +
          '</div>' +

          '<div class="task-actions">' +
            '<button class="btn btn-primary" id="submitTaskBtn" type="button">' + String.fromCharCode(10003) + ' ' + tr("Submit & Confirm") + '</button>' +
            '<button class="btn btn-ghost" id="hintBtn" type="button">' + String.fromCharCode(128161) + ' Hint</button>' +
          '</div>' +

          '<div class="terminal" id="terminal"><div class="ln ln-dim">// awaiting input' + String.fromCharCode(8230) + '</div></div>' +
          '<div class="task-feedback" id="taskFeedback"></div>' +

          '<hr class="divider"/>' +
          '<h3 style="margin-bottom:10px;">Mission Checklist</h3>' +
          '<div class="checklist" id="checklist">' +
            m.tasks.map(function(t, i) {
              const done = mp.tasksDone.includes(i);
              return '<div class="check-item ' + (done ? "done" : "") + '"><div class="ci-box"></div><div>' + (t.prompt ? t.prompt.substring(0, 50) + String.fromCharCode(8230) : "Task " + (i+1)) + '</div></div>';
            }).join("") +
          '</div>' +
        '</div>' +
      '</div>';

    bindConsoleEvents(task);
    if (activeTool !== task.tool) {
      activeTool = task.tool;
      const btn = document.querySelector('#toolDock .tool-btn[data-tool="' + task.tool + '"]');
      if (btn) btn.classList.add('active');
      document.querySelectorAll('#toolDock .tool-btn').forEach(function(b) { if (b.dataset.tool !== task.tool) b.classList.remove('active'); });
    }
    updateToolReq(task);
  }

  // ==========================================================
  // RENDER TASK CONTROL -- select and order types
  // ==========================================================
  function renderTaskControl(task, idx) {
    if (task.type === "select") {
      const opts = task.options || [];
      const chosen = selectState[idx];
      return '<div class="task-options" id="taskOptions" data-idx="' + idx + '">' +
        opts.map(function(o, i) {
          const sel = chosen === i;
          return '<button class="task-option-btn ' + (sel ? "selected" : "") + '" data-opt="' + i + '" type="button">' +
            '<span class="to-ico">' + (o.ico || "") + '</span>' +
            '<span class="to-text">' + escapeHTML(o.text) + '</span>' +
          '</button>';
        }).join("") +
      '</div>';
    }
    if (task.type === "order") {
      const items = task.items || [];
      if (!orderState[idx]) {
        orderState[idx] = items.map(function(_, i) { return i; });
      }
      const order = orderState[idx];
      return '<div class="task-order" id="taskOrder" data-idx="' + idx + '">' +
        order.map(function(origIdx, pos) {
          return '<div class="order-item" data-pos="' + pos + '">' +
            '<span class="oi-num">' + (pos + 1) + '</span>' +
            '<span class="oi-text">' + escapeHTML(items[origIdx]) + '</span>' +
            '<span class="oi-controls">' +
              '<button class="oi-btn oi-up" data-dir="up" type="button" ' + (pos === 0 ? "disabled" : "") + '>&#8593;</button>' +
              '<button class="oi-btn oi-down" data-dir="down" type="button" ' + (pos === order.length - 1 ? "disabled" : "") + '>&#8595;</button>' +
            '</span>' +
          '</div>';
        }).join("") +
      '</div>';
    }
    return "";
  }

  function bindConsoleEvents(task) {
    document.querySelectorAll("#toolDock .tool-btn").forEach(function(b) {
      b.addEventListener("click", function() {
        activeTool = b.dataset.tool;
        document.querySelectorAll("#toolDock .tool-btn").forEach(function(x) { x.classList.remove("active"); });
        b.classList.add("active");
        updateToolReq(task);
        termPush("info", String.fromCharCode(9656) + " Opened " + toolLabel(activeTool));
      });
    });

    document.querySelectorAll("#taskOptions .task-option-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        const optIdx = parseInt(btn.dataset.opt, 10);
        const taskIdx = parseInt(document.getElementById("taskOptions").dataset.idx, 10);
        selectState[taskIdx] = optIdx;
        document.querySelectorAll("#taskOptions .task-option-btn").forEach(function(b) { b.classList.remove("selected"); });
        btn.classList.add("selected");
        termPush("info", String.fromCharCode(9656) + " Selected: " + (task.options[optIdx].text || "").substring(0, 40));
      });
    });

    document.querySelectorAll("#taskOrder .oi-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        const pos = parseInt(btn.parentElement.parentElement.dataset.pos, 10);
        const taskIdx = parseInt(document.getElementById("taskOrder").dataset.idx, 10);
        const dir = btn.dataset.dir;
        const arr = orderState[taskIdx];
        if (dir === "up" && pos > 0) {
          const tmp = arr[pos]; arr[pos] = arr[pos-1]; arr[pos-1] = tmp;
        } else if (dir === "down" && pos < arr.length - 1) {
          const tmp = arr[pos]; arr[pos] = arr[pos+1]; arr[pos+1] = tmp;
        }
        renderOrderItems(taskIdx, task);
        termPush("info", String.fromCharCode(9656) + " Reordered item " + (pos+1) + " " + dir);
      });
    });

    const submitBtn = document.getElementById("submitTaskBtn");
    if (submitBtn) submitBtn.addEventListener("click", function() { submitTask(task); });
    const hintBtn = document.getElementById("hintBtn");
    if (hintBtn) hintBtn.addEventListener("click", function() { showHint(task); });
    const exitBtn = document.getElementById("exitMissionBtn");
    if (exitBtn) exitBtn.addEventListener("click", exitMission);
  }

  function renderOrderItems(taskIdx, task) {
    const container = document.getElementById("taskOrder");
    if (!container) return;
    const items = task.items || [];
    const order = orderState[taskIdx];
    container.innerHTML = order.map(function(origIdx, pos) {
      return '<div class="order-item" data-pos="' + pos + '">' +
        '<span class="oi-num">' + (pos + 1) + '</span>' +
        '<span class="oi-text">' + escapeHTML(items[origIdx]) + '</span>' +
        '<span class="oi-controls">' +
          '<button class="oi-btn oi-up" data-dir="up" type="button" ' + (pos === 0 ? "disabled" : "") + '>&#8593;</button>' +
          '<button class="oi-btn oi-down" data-dir="down" type="button" ' + (pos === order.length - 1 ? "disabled" : "") + '>&#8595;</button>' +
        '</span>' +
      '</div>';
    }).join("");
    container.querySelectorAll(".oi-btn").forEach(function(btn) {
      btn.addEventListener("click", function() {
        const pos = parseInt(btn.parentElement.parentElement.dataset.pos, 10);
        const dir = btn.dataset.dir;
        const arr = orderState[taskIdx];
        if (dir === "up" && pos > 0) {
          const tmp = arr[pos]; arr[pos] = arr[pos-1]; arr[pos-1] = tmp;
        } else if (dir === "down" && pos < arr.length - 1) {
          const tmp = arr[pos]; arr[pos] = arr[pos+1]; arr[pos+1] = tmp;
        }
        renderOrderItems(taskIdx, task);
        termPush("info", String.fromCharCode(9656) + " Reordered item " + (pos+1) + " " + dir);
      });
    });
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
    const t = TOOLS.find(function(x) { return x.id === id; });
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
    const m = MISSIONS.find(function(x) { return x.id === activeMissionId; });
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback";

    if (activeTool !== task.tool) {
      state.totalAttempts++;
      state.wrongAttempts++;
      state.streak = 0;
      saveState();
      fb.classList.add("show", "err");
      fb.innerHTML = String.fromCharCode(10060) + " " + tr("Wrong tool! This task requires") + " <strong>" + toolLabel(task.tool) + "</strong>. " + tr("You currently have") + " <strong>" + (activeTool ? toolLabel(activeTool) : tr("no tool")) + "</strong> " + tr("open. Open the correct tool from the dock above.");
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
    const proofText = valid.fb || tr("Correct! Task completed.");
    fb.innerHTML = String.fromCharCode(9989) + " " + proofText;
    termPush("ok", String.fromCharCode(10003) + " " + proofText.substring(0, 80));

    activeTaskIndex++;
    if (activeTaskIndex >= m.tasks.length) {
      completeMission(m);
    } else {
      setTimeout(function() { renderMissionConsole(); }, 1400);
    }
    updateAnalysis();
  }

  function validateTask(task) {
    if (task.type === "select") {
      const chosen = selectState[activeTaskIndex];
      if (chosen === undefined || chosen === null) {
        return { ok: false, msg: tr("Select an answer by tapping one of the options above.") };
      }
      const opt = task.options[chosen];
      if (opt && opt.correct) {
        return { ok: true, fb: opt.fb || tr("Correct!") };
      }
      const correctOpt = task.options.find(function(o) { return o.correct; });
      return { ok: false, msg: tr("Incorrect.") + " " + (opt ? opt.fb : "") + (correctOpt ? " " + tr("Correct answer:") + " " + correctOpt.text : "") };
    }
    if (task.type === "order") {
      const order = orderState[activeTaskIndex] || [];
      const correct = task.correctOrder || [];
      const matches = order.every(function(v, i) { return v === correct[i]; });
      if (matches) {
        return { ok: true, fb: task.fb || tr("Correct! Items are in the right order.") };
      }
      return { ok: false, msg: tr("The order is not correct yet. Rearrange the items using the up/down arrows and try again.") + " " + (task.fb || "") };
    }
    return { ok: false, msg: tr("Unknown task type.") };
  }

  function showHint(task) {
    const fb = document.getElementById("taskFeedback");
    fb.className = "task-feedback show info";
    let hint = "";
    if (task.type === "select") {
      const correctOpt = (task.options || []).find(function(o) { return o.correct; });
      hint = tr("The correct answer is:") + " " + (correctOpt ? correctOpt.text.substring(0, 50) + String.fromCharCode(8230) : tr("look for the most community-service-sound option"));
    } else if (task.type === "order") {
      const correct = task.correctOrder || [];
      hint = tr("The correct order starts with item") + " " + (correct[0] + 1) + ". " + tr("Use the up/down arrows to arrange all items.");
    }
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
      const badge = COMMUNITY_BADGES.find(function(b) { return b.mission === m.id; });
      toast("ok", String.fromCharCode(127942) + " " + tr("Mission complete!") + " +" + earned + " " + tr("XP earned.") + " " + tr("Badge unlocked:") + " " + (badge ? badge.name : m.title) + ".");
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
    const badge = COMMUNITY_BADGES.find(function(b) { return b.mission === m.id; });
    const mp = missionProgress(m.id);
    return '<div class="task-console">' +
      '<div class="task-body">' +
        '<div class="complete-card">' +
          '<div class="cc-ico">' + String.fromCharCode(127942) + '</div>' +
          '<div class="cc-title">' + tr("Mission Complete:") + ' ' + m.title + '</div>' +
          '<div class="cc-sub">' + m.desc + ' ' + tr("You have successfully completed all") + ' ' + m.tasks.length + ' ' + tr("tasks and earned the") + ' <strong>' + (badge ? badge.name : tr("Community Service Cadet")) + '</strong> ' + tr("badge.") + '</div>' +
          '<div class="cc-stats">' +
            '<div class="cc-stat"><div class="v">+' + earned + '</div><div class="l">' + tr("XP Earned") + '</div></div>' +
            '<div class="cc-stat"><div class="v">' + mp.tasksDone.length + '/' + m.tasks.length + '</div><div class="l">' + tr("Tasks Done") + '</div></div>' +
            '<div class="cc-stat"><div class="v">' + (mp.wrongAttempts || 0) + '</div><div class="l">' + tr("Wrong Attempts") + '</div></div>' +
          '</div>' +
          '<div class="task-actions" style="justify-content:center;">' +
            '<button class="btn btn-primary" id="fileSitrepQuickBtn" type="button">' + String.fromCharCode(128221) + ' ' + tr("File SITREP for this mission") + '</button>' +
            '<button class="btn btn-ghost" id="backToListBtn" type="button">' + String.fromCharCode(8592) + ' ' + tr("Back to mission list") + '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function exitMission() {
    activeMissionId = null;
    document.getElementById("missionConsole").style.display = "none";
    document.getElementById("missionSelector").style.display = "grid";
    document.getElementById("missionHeaderTitle").textContent = tr("Select a Mission");
    document.getElementById("missionHeaderSub").textContent = tr("Choose a training module from the Training tab, or pick a mission below to enter the simulator.");
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
    const elRingXP = document.getElementById("ringXP");
    if (elRingXP) elRingXP.textContent = state.xp;
    const elRingLabel = document.getElementById("ringRankLabel");
    if (elRingLabel) elRingLabel.textContent = rank.name.replace("Service Recruit", "Recruit").replace("Service Cadet", "Cadet").replace("Senior Service Cadet", "Sr. Cadet").replace("Service ", "");
    const elNextRank = document.getElementById("nextRankName");
    if (elNextRank) elNextRank.textContent = nxt ? nxt.name : tr("MAX RANK");
    const pct = rankProgressPct();
    const circ = 377;
    const elRingFg = document.getElementById("xpRingFg");
    if (elRingFg) elRingFg.style.strokeDashoffset = circ - (circ * pct / 100);
    const elRingToNext = document.getElementById("ringXPToNext");
    if (elRingToNext) elRingToNext.textContent = nxt ? (state.xp - rank.xp) + " / " + (nxt.xp - rank.xp) + " " + tr("XP to next rank") : tr("MAX RANK ACHIEVED");

    const chart = document.getElementById("xpBarChart");
    if (chart) chart.innerHTML = MISSIONS.map(function(m) {
      const done = missionDone(m);
      const xp = done ? missionXP(m) : 0;
      const h = Math.max(4, (xp / 150) * 140);
      return '<div class="bar" style="height:' + h + 'px;" title="' + m.title + ': ' + xp + ' XP"><div class="bar-val">' + xp + '</div><div class="bar-label">M' + m.order + '</div></div>';
    }).join("");

    const pchart = document.getElementById("progressChart");
    if (pchart) pchart.innerHTML = MISSIONS.map(function(m) {
      const mp = state.missionProgress[m.id] || { tasksDone: [] };
      const pct = Math.round((mp.tasksDone.length / m.tasks.length) * 100);
      return '<div class="prog-row"><div class="prog-label">' + m.title + '</div><div class="prog-track"><div class="prog-fill" style="width:' + pct + '%"></div></div><div class="prog-pct">' + pct + '%</div></div>';
    }).join("");

    const correct = state.totalAttempts - state.wrongAttempts;
    const acc = state.totalAttempts > 0 ? Math.round((correct / state.totalAttempts) * 100) : 100;
    const elAcc = document.getElementById("accuracyPct");
    if (elAcc) elAcc.textContent = acc + "%";
    const elTot = document.getElementById("totalAttempts");
    if (elTot) elTot.textContent = state.totalAttempts;
    const elBest = document.getElementById("bestStreak");
    if (elBest) elBest.textContent = state.bestStreak;
    const elCS = document.getElementById("currentStreak");
    if (elCS) elCS.textContent = state.streak;
    const elWA = document.getElementById("wrongAttempts");
    if (elWA) elWA.textContent = state.wrongAttempts;

    const amd = document.getElementById("analysisMissionsDone");
    if (amd) amd.textContent = state.completedMissions.length + " / " + MISSIONS.length;
    const axp = document.getElementById("analysisXP");
    if (axp) axp.textContent = state.xp;

    let totalTasks = 0;
    MISSIONS.forEach(function(m) {
      const mp = state.missionProgress[m.id] || { tasksDone: [] };
      totalTasks += mp.tasksDone.length;
    });
    const elTasks = document.getElementById("analysisTasks");
    if (elTasks) elTasks.textContent = totalTasks;
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
    list.innerHTML = RANKS.map(function(r) {
      let cls = "rank-row";
      let tag = "";
      if (r.id === cur.id) { cls += " current"; tag = '<span class="r-tag current">' + tr("CURRENT") + '</span>'; }
      else if (state.xp >= r.xp) { cls += " achieved"; tag = '<span class="r-tag achieved">' + tr("ACHIEVED") + '</span>'; }
      else { tag = '<span class="r-tag locked">' + tr("LOCKED") + '</span>'; }
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
    const completed = MISSIONS.filter(function(m) { return missionDone(m); });
    sel.innerHTML = '<option value="">' + tr("Select a completed mission") + String.fromCharCode(8230) + '</option>' +
      completed.map(function(m) { return '<option value="' + m.id + '">' + m.tag + ' ' + String.fromCharCode(8212) + ' ' + m.title + '</option>'; }).join("");

    const log = document.getElementById("sitrepLog");
    if (state.sitreps.length === 0) {
      log.innerHTML = '<p class="muted center" style="padding:20px;">' + tr("No SITREPs filed yet. Complete a mission and file your first report.") + '</p>';
    } else {
      log.innerHTML = state.sitreps.slice().reverse().map(function(s) {
        const statusMap = {
          NOMINAL: { cls: "low", text: "NOMINAL" },
          MINOR_HAZARD: { cls: "med", text: "MINOR HAZARD" },
          ABORTED: { cls: "high", text: "ABORTED" }
        };
        const st = statusMap[s.status] || statusMap.NOMINAL;
        const m = MISSIONS.find(function(x) { return x.id === s.mission; });
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

    if (!mission) { showFeedback(fb, "err", tr("Please select a completed mission.")); return; }
    if (!status) { showFeedback(fb, "err", tr("Please choose an overall status.")); return; }
    if (summary.length < 20) { showFeedback(fb, "err", tr("Your summary must be at least 20 characters long.")); return; }

    const entry = {
      mission: mission, status: status, summary: summary,
      time: new Date().toLocaleString("en-GB", { hour12: false })
    };
    state.sitreps.push(entry);
    state.xp += 20;
    saveState();
    document.getElementById("sitrepSummary").value = "";
    document.getElementById("sitrepStatus").value = "";
    document.getElementById("sitrepMission").value = "";
    showFeedback(fb, "ok", tr("SITREP filed successfully! +20 XP. Your community service instructor has received your report."));
    toast("ok", String.fromCharCode(128231) + " " + tr("SITREP filed! +20 XP"));
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
    grid.innerHTML = LEARN_ARTICLES.map(function(a) {
      const read = state.readArticles.includes(a.id);
      return '<div class="lib-card ' + (read ? "read" : "") + '" data-article="' + a.id + '">' +
        '<div class="lc-ico">' + a.icon + '</div>' +
        '<div class="lc-cat">' + (a.cat || a.tag || "") + '</div>' +
        '<div class="lc-title">' + a.title + '</div>' +
        '<div class="lc-desc">' + a.desc + '</div>' +
        '<div class="lc-foot"><span>' + (read ? String.fromCharCode(10003) + " " + tr("Read") : tr("Tap to read")) + '</span><span>+' + a.readXP + ' XP</span></div>' +
      '</div>';
    }).join("");
    grid.querySelectorAll(".lib-card").forEach(function(el) {
      el.addEventListener("click", function() { openArticle(el.dataset.article); });
    });
  }

  function openArticle(articleId) {
    const a = LEARN_ARTICLES.find(function(x) { return x.id === articleId; });
    if (!a) return;
    if (!state.readArticles.includes(articleId)) {
      state.readArticles.push(articleId);
      state.xp += a.readXP;
      saveState();
      toast("ok", String.fromCharCode(128214) + ' ' + tr("Article read:") + ' "' + a.title + '" ' + String.fromCharCode(8212) + " +" + a.readXP + " XP");
      renderLearn();
      renderSidebar();
      renderTopStats();
      renderAnalysis();
    } else {
      toast("info", String.fromCharCode(128214) + ' ' + tr("Already read:") + ' "' + a.title + '"');
    }
  }

  // ==========================================================
  // SWITCH SECTION
  // ==========================================================
  function switchSection(name) {
    document.querySelectorAll(".section").forEach(function(s) { s.classList.remove("active"); });
    const target = document.getElementById("section-" + name);
    if (target) target.classList.add("active");
    document.querySelectorAll(".nav-btn").forEach(function(b) { b.classList.toggle("active", b.dataset.section === name); });
    if (name === "command") renderCommand();
    if (name === "training") renderTraining();
    if (name === "missions") { renderMissionSelector(); if (activeMissionId) openMissionRender(); }
    if (name === "analysis") renderAnalysis();
    if (name === "sitrep") renderSitrep();
    if (name === "ranks") renderRanks();
    if (name === "learn") renderLearn();
    if (name === "project") projectRenderStartScreen();
    document.querySelector(".main").scrollTop = 0;
  }

  function openMissionRender() {
    document.getElementById("missionSelector").style.display = "none";
    document.getElementById("missionConsole").style.display = "block";
    renderMissionConsole();
  }

  // ==========================================================
  // TOAST (dynamic, appended to toastContainer)
  // ==========================================================
  function toast(kind, text) {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const el = document.createElement("div");
    el.className = "toast " + (kind || "info");
    const ico = kind === "ok" ? String.fromCharCode(9989) :
                kind === "warn" ? String.fromCharCode(9888) + String.fromCharCode(65039) :
                kind === "err" ? String.fromCharCode(10060) :
                String.fromCharCode(8505) + String.fromCharCode(65039);
    el.textContent = ico + "  " + text;
    container.appendChild(el);
    setTimeout(function() {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.4s";
      setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 400);
    }, 3200);
  }

  // ==========================================================
  // PROJECT COMMAND CENTER GAME ENGINE
  // A unique multi-stage interactive community service project simulator.
  // NOT a quiz -- cadets make sequential project leadership decisions
  // with success meters (Planning, Safety, Impact, Teamwork, Budget),
  // narrative stages, and Web Audio API uplifting community music.
  // 8 stages, pass threshold 6/8 correct, badge + 100 XP on first pass.
  // ==========================================================
  const PROJECT = {
    active: false,
    stageIndex: 0,
    correctCount: 0,
    answered: false,
    meters: { planning: 70, safety: 75, impact: 50, teamwork: 65, budget: 60 },
    musicOn: false,
    audioCtx: null,
    musicNodes: null
  };

  // ==========================================================
  // WEB AUDIO API -- Uplifting community spirit music + SFX
  // ==========================================================
  function initAudio() {
    if (PROJECT.audioCtx) return;
    try {
      PROJECT.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      PROJECT.audioCtx = null;
    }
  }

  function startCommunityMusic() {
    initAudio();
    if (!PROJECT.audioCtx) return;
    const ctx = PROJECT.audioCtx;
    if (ctx.state === "suspended") ctx.resume();
    stopCommunityMusic();

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.0;
    masterGain.connect(ctx.destination);
    masterGain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 2.0);

    // Warm pad -- two detuned sine oscillators (uplifting major feel)
    const pad1 = ctx.createOscillator();
    pad1.type = "sine";
    pad1.frequency.value = 261.63;
    const pad2 = ctx.createOscillator();
    pad2.type = "sine";
    pad2.frequency.value = 392.00;
    const padGain = ctx.createGain();
    padGain.gain.value = 0.06;
    pad1.connect(padGain);
    pad2.connect(padGain);
    padGain.connect(masterGain);
    pad1.start();
    pad2.start();

    // Gentle LFO for warmth wobble
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.2;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 3;
    lfo.connect(lfoGain);
    lfoGain.connect(pad1.frequency);
    lfo.start();

    // Melodic bell tones -- periodic uplifting notes (C-E-G arpeggio)
    const bellInterval = setInterval(function() {
      if (!PROJECT.musicOn) return;
      const notes = [523.25, 659.25, 783.99, 659.25];
      const noteIdx = Math.floor(Math.random() * notes.length);
      playBell(ctx, masterGain, notes[noteIdx]);
    }, 2200 + Math.random() * 1500);

    // Soft rhythm pulse -- gentle heartbeat-like beat
    const beatInterval = setInterval(function() {
      if (!PROJECT.musicOn) return;
      playSoftBeat(ctx, masterGain);
    }, 1400);

    PROJECT.musicNodes = { masterGain, pad1, pad2, lfo, bellInterval, beatInterval };
  }

  function playBell(ctx, master, freq) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.05);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.0);
    osc.connect(gain);
    gain.connect(master);
    osc.start();
    osc.stop(ctx.currentTime + 1.1);
  }

  function playSoftBeat(ctx, master) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 80;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.02);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(master);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  }

  function stopCommunityMusic() {
    if (!PROJECT.musicNodes) return;
    const ctx = PROJECT.audioCtx;
    const n = PROJECT.musicNodes;
    try {
      if (n.bellInterval) clearInterval(n.bellInterval);
      if (n.beatInterval) clearInterval(n.beatInterval);
      if (n.masterGain && ctx) {
        n.masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      }
      setTimeout(function() {
        try {
          if (n.pad1) n.pad1.stop();
          if (n.pad2) n.pad2.stop();
          if (n.lfo) n.lfo.stop();
        } catch (e) {}
      }, 600);
    } catch (e) {}
    PROJECT.musicNodes = null;
  }

  function toggleMusic() {
    PROJECT.musicOn = !PROJECT.musicOn;
    const control = document.getElementById("projectMusicControl");
    const note = control ? control.querySelector(".pmc-note") : null;
    const sub = control ? control.querySelector(".pmc-sub") : null;
    if (PROJECT.musicOn) {
      startCommunityMusic();
      if (control) control.classList.add("playing");
      if (sub) sub.textContent = tr("Playing: uplifting community spirit atmosphere");
      toast("info", String.fromCharCode(127925) + " " + tr("Community music on"));
    } else {
      stopCommunityMusic();
      if (control) control.classList.remove("playing");
      if (sub) sub.textContent = tr("Click to toggle uplifting community service atmosphere");
      toast("info", String.fromCharCode(128263) + " " + tr("Community music off"));
    }
  }

  // SFX for choices
  function playSFX(type) {
    initAudio();
    if (!PROJECT.audioCtx) return;
    const ctx = PROJECT.audioCtx;
    if (ctx.state === "suspended") ctx.resume();

    if (type === "correct") {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(659, ctx.currentTime + 0.12);
      osc.frequency.linearRampToValueAtTime(784, ctx.currentTime + 0.25);
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.04);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === "wrong") {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.3);
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === "complete") {
      [523, 659, 784, 1047].forEach(function(freq, i) {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        const gain = ctx.createGain();
        gain.gain.value = 0;
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1 + i * 0.1);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.05);
        osc.stop(ctx.currentTime + 1.9);
      });
    }
  }

  // ==========================================================
  // PROJECT COMMAND RENDER FUNCTIONS
  // ==========================================================
  function projectRenderStartScreen() {
    const stage = document.getElementById("projectStage");
    if (!stage) return;
    stage.innerHTML =
      '<div class="project-start">' +
        '<div class="project-start-ico">' + String.fromCharCode(127957) + String.fromCharCode(65039) + '</div>' +
        '<h2>' + tr("Project Command Center") + '</h2>' +
        '<p class="ps-desc">' + tr("You are the cadet project leader for a community clean-up event. The Project Command Center puts you through eight critical stages of planning and leading a community service project. At each stage, you must choose the right course of action. Every choice affects your project success meters: Planning, Safety, Impact, Teamwork, and Budget. Make the correct decision in at least 6 of 8 stages to earn the Project Command badge and +100 XP.") + '</p>' +
        '<div class="ps-stages">' +
          PROJECT_COMMAND.stages.map(function(s, i) {
            return '<span class="ps-stage-chip"><span class="psc-ico">' + s.icon + '</span>' + s.tag + '</span>';
          }).join("") +
        '</div>' +
        '<div style="margin-top:16px;">' +
          '<button class="btn btn-primary" id="projectStartBtn" type="button">' + String.fromCharCode(127918) + ' ' + tr("Begin Project Command") + '</button>' +
        '</div>' +
        (state.projectBadgeEarned ?
          '<p class="muted" style="margin-top:14px; font-size:12px;">' + String.fromCharCode(9989) + ' ' + tr("Project Command badge earned! Best score:") + ' ' + state.projectBestScore + '/' + PROJECT_COMMAND.stages.length + '. ' + tr("Play again to improve.") + '</p>' :
          '<p class="muted" style="margin-top:14px; font-size:12px;">' + tr("Complete 6 of 8 stages correctly to earn the Project Command badge.") + '</p>') +
      '</div>';
    projectUpdateSide();

    const startBtn = document.getElementById("projectStartBtn");
    if (startBtn) startBtn.addEventListener("click", projectStartGame);
  }

  function projectStartGame() {
    PROJECT.active = true;
    PROJECT.stageIndex = 0;
    PROJECT.correctCount = 0;
    PROJECT.answered = false;
    PROJECT.meters = { planning: 70, safety: 75, impact: 50, teamwork: 65, budget: 60 };
    projectRenderStage();
  }

  function projectRenderStage() {
    const stage = document.getElementById("projectStage");
    if (!stage) return;
    if (PROJECT.stageIndex >= PROJECT_COMMAND.stages.length) {
      projectFinishGame();
      return;
    }
    const s = PROJECT_COMMAND.stages[PROJECT.stageIndex];
    PROJECT.answered = false;

    stage.innerHTML =
      '<div class="project-game-head">' +
        '<div class="pgh-left">' +
          '<div class="pgh-stage-ico">' + s.icon + '</div>' +
          '<div>' +
            '<div class="pgh-stage-title">' + escapeHTML(s.title) + '</div>' +
            '<div class="pgh-stage-tag">' + s.tag + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="pgh-right">' +
          '<span class="pgh-progress">' + tr("Stage") + ' ' + (PROJECT.stageIndex + 1) + ' / ' + PROJECT_COMMAND.stages.length + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="project-stage-dots">' +
        PROJECT_COMMAND.stages.map(function(_, i) {
          let cls = "psd-dot";
          if (i < PROJECT.stageIndex) cls += " done";
          else if (i === PROJECT.stageIndex) cls += " active";
          return '<span class="' + cls + '"></span>';
        }).join("") +
      '</div>' +
      '<div class="scene-visual">' + sceneSVG(s.visual) + '</div>' +
      '<div class="project-narrative">' + escapeHTML(s.narrative) + '</div>' +
      '<div class="project-prompt">' + escapeHTML(s.prompt) + '</div>' +
      '<div class="project-choices" id="projectChoices">' +
        s.choices.map(function(c, i) {
          return '<button class="project-choice" data-idx="' + i + '" type="button">' +
            '<div class="pc-head">' +
              '<span class="pc-ico">' + (c.ico || "") + '</span>' +
              '<span class="pc-title">' + escapeHTML(c.title) + '</span>' +
            '</div>' +
            '<div class="pc-desc">' + escapeHTML(c.desc) + '</div>' +
          '</button>';
        }).join("") +
      '</div>' +
      '<div class="project-feedback" id="projectFeedback"></div>';

    projectUpdateSide();

    document.querySelectorAll("#projectChoices .project-choice").forEach(function(btn) {
      btn.addEventListener("click", function() { projectAnswerChoice(parseInt(btn.dataset.idx, 10)); });
    });
  }

  function projectAnswerChoice(idx) {
    if (PROJECT.answered) return;
    PROJECT.answered = true;
    const s = PROJECT_COMMAND.stages[PROJECT.stageIndex];
    const choice = s.choices[idx];
    const fb = document.getElementById("projectFeedback");
    const isCorrect = choice.correct;
    PROJECT.stageIndex++;

    // Apply effects to meters
    const eff = choice.effects || {};
    Object.keys(PROJECT.meters).forEach(function(key) {
      if (eff[key] !== undefined) {
        PROJECT.meters[key] = Math.max(0, Math.min(100, PROJECT.meters[key] + eff[key]));
      }
    });

    // Highlight choices
    document.querySelectorAll("#projectChoices .project-choice").forEach(function(btn) {
      const i = parseInt(btn.dataset.idx, 10);
      btn.disabled = true;
      if (s.choices[i].correct) {
        btn.classList.add("correct");
      } else if (i === idx && !isCorrect) {
        btn.classList.add("wrong");
      }
    });

    // Build effects display
    let effectsHTML = '<div class="pf-effects">';
    PROJECT_COMMAND.meters.forEach(function(m) {
      const delta = eff[m.key];
      if (delta !== undefined && delta !== 0) {
        const cls = delta > 0 ? "pos" : "neg";
        const sign = delta > 0 ? "+" : "";
        effectsHTML += '<span class="pf-effect ' + cls + '">' + m.icon + ' ' + m.label + ' ' + sign + delta + '</span>';
      }
    });
    effectsHTML += '</div>';

    if (isCorrect) {
      PROJECT.correctCount++;
      playSFX("correct");
      fb.classList.add("show", "ok");
      fb.innerHTML = '<div class="pf-title">' + String.fromCharCode(9989) + ' ' + escapeHTML(choice.fbTitle) + '</div>' +
        '<div class="pf-detail">' + escapeHTML(choice.fbDetail) + '</div>' + effectsHTML;
    } else {
      playSFX("wrong");
      fb.classList.add("show", "err");
      fb.innerHTML = '<div class="pf-title">' + String.fromCharCode(10060) + ' ' + escapeHTML(choice.fbTitle) + '</div>' +
        '<div class="pf-detail">' + escapeHTML(choice.fbDetail) + '</div>' + effectsHTML;
      const correctChoice = s.choices.find(function(c) { return c.correct; });
      if (correctChoice) {
        fb.innerHTML += '<div style="margin-top:8px; font-size:12px; color:var(--ink-3);"><strong>' + tr("Correct answer:") + '</strong> ' + escapeHTML(correctChoice.title) + '</div>';
      }
    }

    projectUpdateSide();

    const isLast = PROJECT.stageIndex >= PROJECT_COMMAND.stages.length;
    const nextBtn = document.createElement("button");
    nextBtn.className = "btn btn-primary project-next-btn";
    nextBtn.type = "button";
    nextBtn.textContent = isLast ? String.fromCharCode(127937) + " " + tr("See Results") : String.fromCharCode(8594) + " " + tr("Next Stage");
    nextBtn.addEventListener("click", function() {
      if (isLast) projectFinishGame();
      else projectRenderStage();
    });
    fb.appendChild(nextBtn);
  }

  function projectUpdateSide() {
    const side = document.getElementById("projectSide");
    if (!side) return;

    const stageInfo = PROJECT.active ?
      '<div class="pss-stat"><span class="pss-label">' + tr("Stage") + '</span><span class="pss-value">' + Math.min(PROJECT.stageIndex + 1, PROJECT_COMMAND.stages.length) + ' / ' + PROJECT_COMMAND.stages.length + '</span></div>' +
      '<div class="pss-stat"><span class="pss-label">' + tr("Correct") + '</span><span class="pss-value">' + PROJECT.correctCount + ' / ' + PROJECT_COMMAND.stages.length + '</span></div>' +
      '<div class="pss-stat"><span class="pss-label">' + tr("Pass") + '</span><span class="pss-value">' + PROJECT_COMMAND.passThreshold + '+</span></div>'
      :
      '<div class="pss-stat"><span class="pss-label">' + tr("Stages") + '</span><span class="pss-value">' + PROJECT_COMMAND.stages.length + '</span></div>' +
      '<div class="pss-stat"><span class="pss-label">' + tr("Pass") + '</span><span class="pss-value">' + PROJECT_COMMAND.passThreshold + '+</span></div>' +
      '<div class="pss-stat"><span class="pss-label">' + tr("Reward") + '</span><span class="pss-value">' + tr("Badge + 100 XP") + '</span></div>';

    side.innerHTML =
      '<h3>' + String.fromCharCode(127919) + ' ' + tr("Project Status") + '</h3>' +
      '<div class="pss-meters">' +
        PROJECT_COMMAND.meters.map(function(m) {
          const val = PROJECT.meters[m.key];
          let stateCls = "";
          if (val < 25) stateCls = " critical";
          else if (val < 50) stateCls = " low";
          const barColor = val < 25 ? "#ff5a6e" : val < 50 ? "#ff9a42" : m.color;
          return '<div class="pss-meter">' +
            '<div class="pss-meter-head">' +
              '<span class="pss-meter-label">' + m.icon + ' ' + m.label + '</span>' +
              '<span class="pss-meter-val">' + Math.round(val) + '</span>' +
            '</div>' +
            '<div class="pss-meter-bar"><div class="pss-meter-fill" style="width:' + val + '%; background:' + barColor + ';"></div></div>' +
          '</div>';
        }).join("") +
      '</div>' +
      '<div class="pss-stats">' + stageInfo + '</div>' +
      (state.projectBadgeEarned ?
        '<div style="margin-top:14px; padding:10px; background:rgba(245,200,76,0.08); border:1px solid var(--gold-dim); border-radius:8px; text-align:center;">' +
          '<div style="font-size:24px;">' + String.fromCharCode(127942) + '</div>' +
          '<div style="font-size:11px; color:var(--gold-bright); font-weight:700;">' + tr("Badge earned!") + '<br/>' + tr("Best:") + ' ' + state.projectBestScore + '/' + PROJECT_COMMAND.stages.length + '</div>' +
        '</div>'
        : "");
  }

  function projectFinishGame() {
    const stage = document.getElementById("projectStage");
    if (!stage) return;
    const total = PROJECT_COMMAND.stages.length;
    const score = PROJECT.correctCount;
    const passed = score >= PROJECT_COMMAND.passThreshold;
    PROJECT.active = false;

    if (passed) {
      playSFX("complete");
      if (!state.projectBadgeEarned) {
        state.projectBadgeEarned = true;
        state.xp += 100;
        saveState();
        toast("ok", String.fromCharCode(127942) + " " + tr("Project Command badge earned! +100 XP"));
      } else {
        saveState();
        toast("ok", String.fromCharCode(127942) + " " + tr("Project Command completed again!"));
      }
      if (score > state.projectBestScore) {
        state.projectBestScore = score;
        saveState();
      }
    } else {
      toast("warn", String.fromCharCode(9888) + String.fromCharCode(65039) + " " + tr("You succeeded in") + " " + score + "/" + total + " " + tr("stages.") + " " + PROJECT_COMMAND.passThreshold + " " + tr("needed to pass. Try again!"));
    }

    const resultIcon = passed ? String.fromCharCode(127942) : String.fromCharCode(128542);
    const resultTitle = passed ? tr("Project Success!") : tr("Project Needs Improvement");
    const resultSub = passed ?
      tr("You made the right decisions in") + " " + score + " " + tr("of") + " " + total + " " + tr("project stages. Your community service project was a success! The Project Command badge is yours.") :
      tr("You succeeded in") + " " + score + " " + tr("of") + " " + total + " " + tr("stages. You needed") + " " + PROJECT_COMMAND.passThreshold + " " + tr("to pass. Review the training modules and try the command center again.");

    stage.innerHTML =
      '<div class="project-complete ' + (passed ? "passed" : "failed") + '">' +
        '<div class="pc-result-ico">' + resultIcon + '</div>' +
        '<h2>' + resultTitle + '</h2>' +
        '<p class="pc-result-sub">' + resultSub + '</p>' +
        '<div class="pc-score-ring">' +
          '<div class="pc-score-num">' + score + '</div>' +
          '<div class="pc-score-den">/ ' + total + '</div>' +
          '<div class="pc-score-label">' + tr("Stages Correct") + '</div>' +
        '</div>' +
        '<div class="pc-final-conditions">' +
          PROJECT_COMMAND.meters.map(function(m) {
            const val = PROJECT.meters[m.key];
            return '<div class="pcfc-item">' +
              '<span class="pcfc-ico">' + m.icon + '</span>' +
              '<span class="pcfc-label">' + m.label + '</span>' +
              '<span class="pcfc-val">' + Math.round(val) + '</span>' +
            '</div>';
          }).join("") +
        '</div>' +
        (passed && state.projectBadgeEarned ?
          '<div class="pc-badge-earned">' + String.fromCharCode(127942) + ' ' + tr("Project Command Badge") + '</div>'
          : "") +
        '<div class="pc-actions">' +
          '<button class="btn btn-primary" id="projectRetryBtn" type="button">' + String.fromCharCode(128260) + ' ' + tr("Try Again") + '</button>' +
          '<button class="btn btn-ghost" id="projectExitBtn" type="button">' + String.fromCharCode(8592) + ' ' + tr("Back to Start") + '</button>' +
        '</div>' +
      '</div>';

    projectUpdateSide();
    renderSidebar();
    renderTopStats();
    renderAnalysis();

    const retryBtn = document.getElementById("projectRetryBtn");
    if (retryBtn) retryBtn.addEventListener("click", projectStartGame);
    const exitBtn = document.getElementById("projectExitBtn");
    if (exitBtn) exitBtn.addEventListener("click", projectRenderStartScreen);
  }

  // ==========================================================
  // I18N -- Apply translations to dynamic content
  // ==========================================================
  function applyI18n() {
    if (typeof trMutate !== "function") return;

    RANKS.forEach(function(r) {
      trMutate(r, "name", "community_rank_" + r.id + "_name");
      trMutate(r, "callsign", "community_rank_" + r.id + "_callsign");
    });

    TOOLS.forEach(function(t) {
      trMutate(t, "label", "community_tool_" + t.id);
    });

    MISSIONS.forEach(function(m) {
      trMutate(m, "title", "community_mission_" + m.id + "_title");
      trMutate(m, "desc", "community_mission_" + m.id + "_desc");
      trMutate(m, "brief", "community_mission_" + m.id + "_brief");
      if (m.tasks) {
        m.tasks.forEach(function(task, ti) {
          trMutate(task, "prompt", "community_mission_" + m.id + "_task" + ti + "_prompt");
          if (task.options) {
            task.options.forEach(function(opt, oi) {
              trMutate(opt, "text", "community_mission_" + m.id + "_task" + ti + "_opt" + oi);
              trMutate(opt, "fb", "community_mission_" + m.id + "_task" + ti + "_opt" + oi + "_fb");
            });
          }
          if (task.items) {
            task.items.forEach(function(item, ii) {
              task.items[ii] = tr("community_mission_" + m.id + "_task" + ti + "_item" + ii, item);
            });
          }
          trMutate(task, "fb", "community_mission_" + m.id + "_task" + ti + "_fb");
        });
      }
    });

    LEARN_ARTICLES.forEach(function(a) {
      trMutate(a, "title", "community_article_" + a.id + "_title");
      trMutate(a, "desc", "community_article_" + a.id + "_desc");
      trMutate(a, "body", "community_article_" + a.id + "_body");
      trMutate(a, "tag", "community_article_" + a.id + "_tag");
    });

    PROJECT_COMMAND.stages.forEach(function(s, si) {
      trMutate(s, "title", "community_project_stage" + si + "_title");
      trMutate(s, "narrative", "community_project_stage" + si + "_narrative");
      trMutate(s, "prompt", "community_project_stage" + si + "_prompt");
      trMutate(s, "tag", "community_project_stage" + si + "_tag");
      if (s.choices) {
        s.choices.forEach(function(c, ci) {
          trMutate(c, "title", "community_project_stage" + si + "_choice" + ci + "_title");
          trMutate(c, "desc", "community_project_stage" + si + "_choice" + ci + "_desc");
          trMutate(c, "fbTitle", "community_project_stage" + si + "_choice" + ci + "_fbtitle");
          trMutate(c, "fbDetail", "community_project_stage" + si + "_choice" + ci + "_fbdetail");
        });
      }
    });
  }

  // ==========================================================
  // INIT
  // ==========================================================
  function init() {
    state = loadState();

    document.querySelectorAll(".nav-btn").forEach(function(b) {
      b.addEventListener("click", function() { switchSection(b.dataset.section); });
    });

    const mb = document.getElementById("mobileMenuBtn");
    if (mb) mb.addEventListener("click", function() { document.getElementById("sidebar").classList.toggle("open"); });

    const fsb = document.getElementById("fileSitrepBtn");
    if (fsb) fsb.addEventListener("click", fileSitrep);

    const musicControl = document.getElementById("projectMusicControl");
    if (musicControl) musicControl.addEventListener("click", toggleMusic);

    applyI18n();
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
    projectRenderStartScreen();

    const navMC = document.getElementById("navMissionCount");
    if (navMC) navMC.textContent = MISSIONS.length;
    const navTC = document.getElementById("navTrainingCount");
    if (navTC) navTC.textContent = MISSIONS.length;

    const params = new URLSearchParams(window.location.search);
    const deepMission = params.get("mission");
    if (deepMission) {
      const m = MISSIONS.find(function(x) { return x.id === deepMission; });
      if (m) setTimeout(function() { openMission(m.id); }, 200);
    }

    window.addEventListener("beforeunload", function() {
      if (PROJECT.musicOn) stopCommunityMusic();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // ==========================================================
  // EXPOSE FOR I18N RE-APPLY
  // ==========================================================
  window.communityTraining = {
    applyI18n: applyI18n,
    renderAll: function() {
      renderSidebar();
      renderTopStats();
      renderCommand();
      renderTraining();
      renderMissionSelector();
      renderAnalysis();
      renderRanks();
      renderSitrep();
      renderLearn();
      projectRenderStartScreen();
    }
  };

})();
