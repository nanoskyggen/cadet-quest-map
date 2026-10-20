
const STORAGE_COMPLETED = 'cyberRangeCompleted';
const STORAGE_STEPS = 'cyberRangeStepProgress';
const STORAGE_WRONG = 'cyberRangeWrongAttempts';
const MAP_PROGRESS_KEY = 'cadetMapDemoCompleted';
const CYBER_BADGE_ID = 17;
const scenarios = [
  {
    "id": 1,
    "title": "Phishing & Credential Theft",
    "brief": "A suspicious account-warning email led to an impossible-travel login and a new mailbox forwarding rule. Work the ticket like a blue-team analyst.",
    "tags": [
      "Mail",
      "Identity",
      "Credential Safety"
    ],
    "tools": {
      "Mail Client": "INBOX: Urgent account closure notice\nFrom: support@cadet-trainlng.example\nReply-To: reset-helpdesk.example@gmail.com\nDisplayed link: cadet-training.example/login\nActual target: cadet-training.example.security-check.invalid/login\nAttachment: none\n\nUser says they typed their password after clicking the link.",
      "Identity Console": "User: cadet.rivera\n09:12 login from normal school network\n09:37 login from unfamiliar ASN, impossible travel\n09:39 mailbox forwarding rule created to external address\nActive sessions: 2",
      "Ticket Notes": "Objective: stop credential abuse, preserve email headers, and help the user recover safely."
    },
    "steps": [
      "Preserve phishing evidence",
      "Revoke active sessions",
      "Reset password and MFA",
      "Report through approved channel"
    ],
    "actions": [
      {
        "text": "Save the email headers and report the phishing message to the security queue.",
        "step": 0,
        "feedback": "Evidence preserved. The response team can now analyze sender, reply-to, and link details."
      },
      {
        "text": "Revoke all suspicious sessions for cadet.rivera.",
        "step": 1,
        "feedback": "Session abuse contained. The attacker loses current access."
      },
      {
        "text": "Reset the password through the official portal and require MFA re-registration.",
        "step": 2,
        "feedback": "Credential recovery completed through a trusted path."
      },
      {
        "text": "Reply to the phishing sender asking if the message is real.",
        "wrong": "Do not reply to the suspected attacker. Use official reporting channels."
      },
      {
        "text": "Submit the incident report with preserved headers, timeline, and actions taken.",
        "step": 3,
        "feedback": "Report complete. The phishing mission is closed."
      }
    ]
  },
  {
    "id": 2,
    "title": "Malware Triage",
    "brief": "A training laptop executed a suspicious file from Downloads. Triage it without spreading the file or destroying evidence.",
    "tags": [
      "EDR",
      "Endpoint",
      "Containment"
    ],
    "tools": {
      "EDR Console": "Host: TRAINING-LAPTOP-07\nUser: cadet.chen\nProcess: invoice_update.exe\nParent: explorer.exe\nBehavior: scheduled task created, startup key modified\nNetwork: repeated outbound attempts to rare external IP",
      "File Viewer": "Path: C:\\Users\\cadet.chen\\Downloads\\invoice_update.exe\nSource: email attachment\nHash: simulated-hash-7A19\nStatus: do not open on analyst workstation",
      "Network Monitor": "Outbound attempts blocked by training firewall. Connections repeat every 30 seconds."
    },
    "steps": [
      "Isolate endpoint",
      "Capture indicators",
      "Preserve sample safely",
      "Escalate to incident lead"
    ],
    "actions": [
      {
        "text": "Network-isolate TRAINING-LAPTOP-07 from the EDR console.",
        "step": 0,
        "feedback": "Endpoint isolated. Potential spread is limited."
      },
      {
        "text": "Record hash, path, parent process, persistence clues, and destination IP.",
        "step": 1,
        "feedback": "Indicators captured for correlation and blocking."
      },
      {
        "text": "Preserve the file only in the approved malware evidence area.",
        "step": 2,
        "feedback": "Sample preserved safely for authorized analysis."
      },
      {
        "text": "Email the executable to other cadets to see if it runs.",
        "wrong": "Never distribute suspected malware. That could spread infection."
      },
      {
        "text": "Escalate the triage summary to the incident lead.",
        "step": 3,
        "feedback": "Escalation complete. Malware triage mission closed."
      }
    ]
  },
  {
    "id": 3,
    "title": "Web Log Investigation",
    "brief": "The training website shows suspicious traffic. Use the SIEM and web logs to classify the activity and preserve evidence.",
    "tags": [
      "SIEM",
      "Web Logs",
      "Reconnaissance"
    ],
    "tools": {
      "SIEM Search": "10.4.18.23 repeated POST /login 401\n198.51.100.77 GET /admin 403\n198.51.100.77 GET /.env 404\n198.51.100.77 GET /config.php.bak 404\n203.0.113.45 GET /news?id=5' 500",
      "Web Server": "Application emitted database syntax error on suspicious parameter testing. Admin and backup probes were denied but still recorded.",
      "Case Timeline": "Build a timeline with source IPs, paths, response codes, and suspected behavior categories."
    },
    "steps": [
      "Tag suspicious patterns",
      "Export relevant logs",
      "Create timeline",
      "Recommend monitoring rule"
    ],
    "actions": [
      {
        "text": "Tag login failures, sensitive-file probing, and suspicious parameter testing as separate patterns.",
        "step": 0,
        "feedback": "Patterns classified instead of treating the log as one generic event."
      },
      {
        "text": "Export the relevant log window with source IPs, paths, and response codes.",
        "step": 1,
        "feedback": "Logs preserved for review and correlation."
      },
      {
        "text": "Create a timeline showing when each source IP changed behavior.",
        "step": 2,
        "feedback": "Timeline created. Investigators can now see progression."
      },
      {
        "text": "Ignore the probes because the server returned 403 and 404.",
        "wrong": "Failed probes still matter. They show reconnaissance and attempted discovery."
      },
      {
        "text": "Recommend a SIEM alert for repeated sensitive-file probes and database-error spikes.",
        "step": 3,
        "feedback": "Monitoring improved. Web log mission closed."
      }
    ]
  },
  {
    "id": 4,
    "title": "SQL Injection Attack",
    "brief": "Suspicious request parameters and database errors suggest injection attempts. Respond defensively without attempting unauthorized exploitation.",
    "tags": [
      "AppSec",
      "Input Validation",
      "Safe Response"
    ],
    "tools": {
      "App Logs": "Endpoint: /cadets/profile?id=105\nObserved: punctuation and boolean-looking fragments in id parameter\nResponse: HTTP 500 database syntax error\nAffected routes: /profile, /search, /awards",
      "Code Note": "Legacy code appears to concatenate user input into a database query. App owner requested defensive recommendations.",
      "WAF Panel": "Current rule set: basic bot filtering. No custom alert for database syntax error bursts."
    },
    "steps": [
      "Preserve app logs",
      "Notify app owner",
      "Recommend parameterized queries",
      "Add temporary monitoring"
    ],
    "actions": [
      {
        "text": "Preserve the relevant app, web, and database error logs.",
        "step": 0,
        "feedback": "Evidence preserved before changes are made."
      },
      {
        "text": "Notify the application owner and incident lead of suspected SQL injection attempts.",
        "step": 1,
        "feedback": "The right technical owner is now involved."
      },
      {
        "text": "Recommend parameterized queries and server-side input validation.",
        "step": 2,
        "feedback": "Correct defensive fix identified."
      },
      {
        "text": "Try random attack strings from the internet against other websites.",
        "wrong": "Unauthorized testing is not allowed. Stay inside the approved training range."
      },
      {
        "text": "Add temporary monitoring for database-error spikes and suspicious parameter patterns.",
        "step": 3,
        "feedback": "Detection improved while the application fix is planned."
      }
    ]
  },
  {
    "id": 5,
    "title": "Ransomware Containment",
    "brief": "Shared files are renamed and ransom notes appeared. Move quickly to contain spread and protect recovery options.",
    "tags": [
      "Containment",
      "Backups",
      "Incident Response"
    ],
    "tools": {
      "File Share": "Many files renamed .locked-training\nNew file: READ_ME_RECOVERY.txt\nWrite source: HOST-22 using cadet account",
      "Backup Console": "Last clean snapshot: 02:00\nBackup repository currently online\nNo restore started yet",
      "Identity Console": "Compromised account suspected. Multiple write operations in short time window."
    },
    "steps": [
      "Isolate suspected host",
      "Disable compromised account",
      "Protect backups",
      "Activate response plan"
    ],
    "actions": [
      {
        "text": "Isolate HOST-22 from the network.",
        "step": 0,
        "feedback": "Suspected encryption source contained."
      },
      {
        "text": "Disable the compromised account and revoke sessions.",
        "step": 1,
        "feedback": "Credential path contained."
      },
      {
        "text": "Protect backup storage from modification before restoration planning.",
        "step": 2,
        "feedback": "Recovery options protected."
      },
      {
        "text": "Keep all systems connected so users can finish work.",
        "wrong": "Leaving systems connected can allow more encryption and spread."
      },
      {
        "text": "Activate the incident response plan and document the clean snapshot time.",
        "step": 3,
        "feedback": "Response coordinated. Ransomware mission closed."
      }
    ]
  },
  {
    "id": 6,
    "title": "Rogue Wi‑Fi Access Point",
    "brief": "A lookalike Wi‑Fi network is broadcasting near the training area. Identify, document, and reduce user exposure.",
    "tags": [
      "Wireless",
      "Evil Twin",
      "User Protection"
    ],
    "tools": {
      "Wireless Survey": "Official SSID: CadetTraining-Secure\nSuspicious SSID: CadetTraining_Secure\nSignal strongest near parking lot\nSecurity: open portal requesting username/password",
      "Device Logs": "Two cadet tablets attempted auto-join. No confirmed credential submission yet.",
      "Comms Draft": "Need a short warning: do not connect, forget suspicious network, report prompts."
    },
    "steps": [
      "Warn users",
      "Forget rogue SSID",
      "Document signal/location",
      "Report to network staff"
    ],
    "actions": [
      {
        "text": "Send a user warning not to connect to CadetTraining_Secure.",
        "step": 0,
        "feedback": "Users warned before more devices connect."
      },
      {
        "text": "Help affected devices forget the suspicious SSID.",
        "step": 1,
        "feedback": "Auto-join risk reduced."
      },
      {
        "text": "Document SSID, signal strength, security type, and strongest location.",
        "step": 2,
        "feedback": "Useful wireless evidence collected."
      },
      {
        "text": "Connect with an admin password to test the portal.",
        "wrong": "Never test a suspicious access point with real credentials."
      },
      {
        "text": "Report the suspected rogue access point to network staff.",
        "step": 3,
        "feedback": "Network team can now locate and handle the device."
      }
    ]
  },
  {
    "id": 7,
    "title": "Privilege Escalation on Linux",
    "brief": "A Linux host shows failed sudo attempts and a writable maintenance script that runs as root. Review the misconfiguration defensively.",
    "tags": [
      "Linux",
      "Permissions",
      "Hardening"
    ],
    "tools": {
      "Terminal": "auth.log: cadet-test sudo attempt denied\n/tmp/backup-helper created by cadet-test\ncron: maintenance script executed as root\npermissions: /opt/maint/backup.sh group-writable by training",
      "User Groups": "Group training includes several normal cadet accounts. maintenance script inherits group write permissions.",
      "Hardening Notes": "Goal: remove unsafe write permission, audit changes, review sudo rules."
    },
    "steps": [
      "Identify unsafe permission",
      "Restrict script permissions",
      "Audit recent changes",
      "Review sudoers"
    ],
    "actions": [
      {
        "text": "Flag the group-writable root-run maintenance script as the privilege risk.",
        "step": 0,
        "feedback": "Misconfiguration identified."
      },
      {
        "text": "Restrict script ownership and write permissions to authorized admins.",
        "step": 1,
        "feedback": "Privilege path hardened."
      },
      {
        "text": "Audit recent changes to the script and related cron job.",
        "step": 2,
        "feedback": "Change history reviewed for possible tampering."
      },
      {
        "text": "Tell cadets to try payloads until they become root.",
        "wrong": "This is a defensive range. Do not attempt unauthorized exploitation."
      },
      {
        "text": "Review sudoers and group membership for least privilege.",
        "step": 3,
        "feedback": "Linux hardening mission closed."
      }
    ]
  },
  {
    "id": 8,
    "title": "Active Directory Compromise",
    "brief": "A service account was added to Domain Admins and logged into a domain controller. Treat this as a high-severity identity incident.",
    "tags": [
      "Active Directory",
      "Identity",
      "Privileged Access"
    ],
    "tools": {
      "Identity Console": "02:14 svc-print added to Domain Admins\n02:16 svc-print login to DC-01\n02:17 directory replication-like activity\n02:20 scheduled task pushed to workstations",
      "Account Profile": "svc-print should perform print tasks only. Interactive login is abnormal.",
      "Security Logs": "Need preserved DC logs, group membership changes, and workstation task events."
    },
    "steps": [
      "Contain service account",
      "Preserve DC logs",
      "Review privileged changes",
      "Escalate domain compromise"
    ],
    "actions": [
      {
        "text": "Disable or contain svc-print and revoke active sessions.",
        "step": 0,
        "feedback": "Suspicious privileged account contained."
      },
      {
        "text": "Preserve domain controller and security event logs.",
        "step": 1,
        "feedback": "Critical identity evidence preserved."
      },
      {
        "text": "Review Domain Admin changes and scheduled task deployment.",
        "step": 2,
        "feedback": "Privilege and persistence changes reviewed."
      },
      {
        "text": "Rename svc-print and assume the issue is fixed.",
        "wrong": "Renaming does not remove privileges, sessions, or persistence."
      },
      {
        "text": "Escalate as a potential domain compromise.",
        "step": 3,
        "feedback": "High-severity escalation complete."
      }
    ]
  },
  {
    "id": 9,
    "title": "Insider Data Exfiltration",
    "brief": "DLP alerts show unusual after-hours downloads and upload to personal cloud storage. Handle confidentially and preserve evidence.",
    "tags": [
      "DLP",
      "Insider Risk",
      "Confidentiality"
    ],
    "tools": {
      "DLP Console": "User: trainee.accounting\nDownloaded 2.4 GB from restricted folder after hours\nCreated archive_final.zip\nUploaded large file to personal cloud domain",
      "Access Logs": "Access volume is unusual for this role. Role change pending. No public accusations allowed.",
      "Policy Viewer": "Follow chain of command. Preserve evidence. Restrict access only through approved process."
    },
    "steps": [
      "Preserve DLP evidence",
      "Notify approved leaders",
      "Restrict access by policy",
      "Keep case confidential"
    ],
    "actions": [
      {
        "text": "Preserve DLP alerts, access logs, filenames, timestamps, and destination domain.",
        "step": 0,
        "feedback": "Evidence preserved for a fair investigation."
      },
      {
        "text": "Notify security leadership through the approved confidential process.",
        "step": 1,
        "feedback": "Escalation handled properly."
      },
      {
        "text": "Apply access restriction only if policy and leadership authorize it.",
        "step": 2,
        "feedback": "Risk reduced while respecting process."
      },
      {
        "text": "Call out the user in a public chat so they explain themselves.",
        "wrong": "Do not make public accusations. Protect confidentiality and the investigation."
      },
      {
        "text": "Mark the case confidential and document who has access to the evidence.",
        "step": 3,
        "feedback": "Insider-risk mission closed."
      }
    ]
  },
  {
    "id": 10,
    "title": "Cloud Account Takeover",
    "brief": "A cloud admin account created a new access key after MFA fatigue prompts. Contain sessions, keys, and risky policy changes.",
    "tags": [
      "Cloud IAM",
      "MFA",
      "Access Keys"
    ],
    "tools": {
      "Cloud IAM": "User: cadet-admin-training\nNew access key from unfamiliar country\nMFA fatigue prompts reported\nStorage bucket policy broadened\nAPI calls: list users, list buckets, create key",
      "Audit Logs": "Several actions occurred shortly after user approved repeated MFA prompts.",
      "Storage Console": "One bucket policy changed from restricted to broader access."
    },
    "steps": [
      "Revoke sessions and keys",
      "Reset MFA",
      "Review policy changes",
      "Preserve cloud audit logs"
    ],
    "actions": [
      {
        "text": "Revoke suspicious sessions and disable the newly created access key.",
        "step": 0,
        "feedback": "Cloud persistence path contained."
      },
      {
        "text": "Reset credentials and re-register MFA using the official process.",
        "step": 1,
        "feedback": "Account recovery completed safely."
      },
      {
        "text": "Review and revert unauthorized storage bucket policy changes.",
        "step": 2,
        "feedback": "Cloud exposure reduced."
      },
      {
        "text": "Approve all future MFA prompts so alerts stop.",
        "wrong": "MFA fatigue is an attack pattern. Never approve prompts you did not initiate."
      },
      {
        "text": "Preserve cloud audit logs and submit the account-takeover timeline.",
        "step": 3,
        "feedback": "Cloud takeover mission closed."
      }
    ]
  },
  {
    "id": 11,
    "title": "Command-and-Control Beaconing",
    "brief": "A workstation contacts an unusual domain every 60 seconds. Correlate network and endpoint evidence, then contain safely.",
    "tags": [
      "Network",
      "C2 Beaconing",
      "Correlation"
    ],
    "tools": {
      "Network Monitor": "Host: WS-CADET-19\nDomain: update-check-training.invalid\nPattern: every 60 seconds ± 2 seconds\nBytes: small request, small response",
      "Endpoint Console": "User reports no app using the domain. Unknown file recently executed from Downloads.",
      "Firewall": "Indicator can be blocked through approved control after evidence is captured."
    },
    "steps": [
      "Identify beacon pattern",
      "Correlate endpoint event",
      "Isolate host",
      "Block indicator and escalate"
    ],
    "actions": [
      {
        "text": "Classify the regular 60-second traffic as possible beaconing.",
        "step": 0,
        "feedback": "Beacon-like timing recognized."
      },
      {
        "text": "Correlate the traffic with the unknown file execution on WS-CADET-19.",
        "step": 1,
        "feedback": "Network and endpoint evidence connected."
      },
      {
        "text": "Isolate WS-CADET-19 while preserving logs.",
        "step": 2,
        "feedback": "Potential command-and-control channel contained."
      },
      {
        "text": "Browse to the suspicious domain from a personal phone.",
        "wrong": "Do not interact with suspicious infrastructure from personal devices."
      },
      {
        "text": "Block the indicator through approved controls and escalate the case.",
        "step": 3,
        "feedback": "C2 beaconing mission closed."
      }
    ]
  }
];


const interactionTasks = {
  1: [
    { type:'type', tool:'Mail Client', title:'Capture the phishing evidence', prompt:'Open Mail Client, then type the suspicious actual target domain shown in the message.', expected:'security-check.invalid', placeholder:'example: suspicious-domain.invalid', proof:'Target domain captured for phishing analysis.' },
    { type:'toggle', tool:'Identity Console', title:'Revoke active sessions', prompt:'Open Identity Console and switch on session revocation for the compromised user.', expected:true, proof:'Suspicious sessions revoked in the identity console.' },
    { type:'select', tool:'Identity Console', title:'Recover the account safely', prompt:'Choose the safest recovery action after session revocation.', options:['Reply to sender','Reset password and require MFA re-registration','Ignore the alert'], expected:'Reset password and require MFA re-registration', proof:'Password reset and MFA recovery selected.' },
    { type:'note', tool:'Ticket Notes', title:'Submit the incident report', prompt:'Write a short report note that includes headers, timeline, and actions.', keywords:['headers','timeline','actions'], proof:'Incident report submitted through the approved queue.' }
  ],
  2: [
    { type:'toggle', tool:'EDR Console', title:'Isolate the endpoint', prompt:'Open EDR Console and enable network isolation for TRAINING-LAPTOP-07.', expected:true, proof:'Endpoint isolation command staged in EDR.' },
    { type:'type', tool:'File Viewer', title:'Record the malware indicator', prompt:'Open File Viewer and type the simulated file hash.', expected:'simulated-hash-7A19', placeholder:'hash value', proof:'Hash indicator recorded.' },
    { type:'select', tool:'File Viewer', title:'Preserve the sample safely', prompt:'Choose where the suspicious file should be preserved.', options:['Analyst desktop','Approved malware evidence area','Email attachment to classmates'], expected:'Approved malware evidence area', proof:'Sample routed to approved evidence storage.' },
    { type:'note', tool:'Network Monitor', title:'Escalate triage summary', prompt:'Write a note including host, hash, and outbound activity.', keywords:['host','hash','outbound'], proof:'Triage summary escalated to the incident lead.' }
  ],
  3: [
    { type:'select', tool:'SIEM Search', title:'Classify the suspicious patterns', prompt:'Open SIEM Search and select the pattern set visible in the logs.', options:['Normal browsing only','Login failures, sensitive-file probes, and parameter testing','Email delivery delay'], expected:'Login failures, sensitive-file probes, and parameter testing', proof:'Suspicious web patterns tagged.' },
    { type:'toggle', tool:'SIEM Search', title:'Export relevant logs', prompt:'Enable export for the relevant log window.', expected:true, proof:'Relevant source IPs, paths, and response codes exported.' },
    { type:'type', tool:'Case Timeline', title:'Build the timeline', prompt:'Type the IP that probed admin and backup paths.', expected:'198.51.100.77', placeholder:'source IP', proof:'Timeline anchored to the probing source IP.' },
    { type:'note', tool:'Web Server', title:'Recommend monitoring', prompt:'Write a recommendation including sensitive-file probes and database-error spikes.', keywords:['sensitive','database','alert'], proof:'Monitoring recommendation added.' }
  ],
  4: [
    { type:'toggle', tool:'App Logs', title:'Preserve application logs', prompt:'Open App Logs and enable evidence preservation.', expected:true, proof:'Application, web, and database error logs preserved.' },
    { type:'select', tool:'Code Note', title:'Notify the right owner', prompt:'Choose who should be notified for defensive remediation.', options:['Application owner and incident lead','Public social media','No one'], expected:'Application owner and incident lead', proof:'Application owner and incident lead notified.' },
    { type:'select', tool:'Code Note', title:'Pick the defensive fix', prompt:'Select the safe coding recommendation.', options:['Parameterized queries and server-side validation','More verbose errors for everyone','Copy attack strings online'], expected:'Parameterized queries and server-side validation', proof:'Defensive fix identified.' },
    { type:'note', tool:'WAF Panel', title:'Add temporary monitoring', prompt:'Write a WAF/SIEM note including database errors and suspicious parameters.', keywords:['database','parameter','monitor'], proof:'Temporary monitoring rule documented.' }
  ],
  5: [
    { type:'toggle', tool:'File Share', title:'Isolate suspected host', prompt:'Open File Share and enable isolation for HOST-22.', expected:true, proof:'Suspected encryption source isolated.' },
    { type:'toggle', tool:'Identity Console', title:'Disable compromised account', prompt:'Open Identity Console and enable account/session containment.', expected:true, proof:'Compromised credential path contained.' },
    { type:'select', tool:'Backup Console', title:'Protect backup storage', prompt:'Choose the safest immediate backup action.', options:['Start random restore now','Protect backup repository from modification','Delete snapshots'], expected:'Protect backup repository from modification', proof:'Backup recovery options protected.' },
    { type:'note', tool:'Backup Console', title:'Activate response plan', prompt:'Write a note including response plan and clean snapshot time.', keywords:['response','snapshot','02:00'], proof:'Ransomware response plan activated.' }
  ],
  6: [
    { type:'note', tool:'Comms Draft', title:'Warn users', prompt:'Draft a warning including do not connect and report prompts.', keywords:['do not connect','report'], proof:'User warning drafted.' },
    { type:'toggle', tool:'Device Logs', title:'Forget rogue SSID', prompt:'Open Device Logs and enable forget-network guidance for affected tablets.', expected:true, proof:'Affected devices queued to forget the suspicious SSID.' },
    { type:'type', tool:'Wireless Survey', title:'Document the rogue SSID', prompt:'Type the suspicious SSID exactly as shown.', expected:'CadetTraining_Secure', placeholder:'SSID', proof:'Rogue SSID documented.' },
    { type:'note', tool:'Wireless Survey', title:'Report to network staff', prompt:'Write a report including SSID, location, and open portal.', keywords:['ssid','parking','open'], proof:'Wireless report sent to network staff.' }
  ],
  7: [
    { type:'type', tool:'Terminal', title:'Identify unsafe permission', prompt:'Open Terminal and type the risky script path.', expected:'/opt/maint/backup.sh', placeholder:'/path/to/script', proof:'Group-writable root-run script identified.' },
    { type:'select', tool:'Hardening Notes', title:'Restrict script permissions', prompt:'Choose the safe permission fix.', options:['Authorized admins only','Everyone can write','Move it to Downloads'], expected:'Authorized admins only', proof:'Script ownership and write permissions restricted.' },
    { type:'toggle', tool:'Terminal', title:'Audit recent changes', prompt:'Enable change audit review for the script and cron job.', expected:true, proof:'Recent script and cron changes reviewed.' },
    { type:'note', tool:'User Groups', title:'Review least privilege', prompt:'Write a note including sudoers, group membership, and least privilege.', keywords:['sudoers','group','least'], proof:'Linux hardening review completed.' }
  ],
  8: [
    { type:'toggle', tool:'Identity Console', title:'Contain service account', prompt:'Open Identity Console and enable containment for svc-print.', expected:true, proof:'Suspicious service account contained.' },
    { type:'toggle', tool:'Security Logs', title:'Preserve domain controller logs', prompt:'Open Security Logs and enable DC log preservation.', expected:true, proof:'Domain controller evidence preserved.' },
    { type:'select', tool:'Identity Console', title:'Review privileged changes', prompt:'Select the suspicious privileged change to review.', options:['svc-print added to Domain Admins','Printer paper low','Normal user password age'], expected:'svc-print added to Domain Admins', proof:'Privileged group change reviewed.' },
    { type:'note', tool:'Account Profile', title:'Escalate domain compromise', prompt:'Write a note including domain compromise and scheduled task activity.', keywords:['domain','compromise','scheduled'], proof:'High-severity identity escalation submitted.' }
  ],
  9: [
    { type:'toggle', tool:'DLP Console', title:'Preserve DLP evidence', prompt:'Open DLP Console and enable evidence preservation.', expected:true, proof:'DLP alerts and access details preserved.' },
    { type:'select', tool:'Policy Viewer', title:'Notify approved leaders', prompt:'Choose the proper escalation path.', options:['Approved confidential process','Public chat accusation','Ignore it'], expected:'Approved confidential process', proof:'Security leadership notified confidentially.' },
    { type:'select', tool:'Policy Viewer', title:'Restrict access by policy', prompt:'Choose the access decision.', options:['Only if policy and leadership authorize it','Immediately shame the user','Never document access'], expected:'Only if policy and leadership authorize it', proof:'Access restriction handled by policy.' },
    { type:'note', tool:'Access Logs', title:'Keep case confidential', prompt:'Write a note including confidential, evidence, and access.', keywords:['confidential','evidence','access'], proof:'Confidential case handling documented.' }
  ],
  10: [
    { type:'toggle', tool:'Cloud IAM', title:'Revoke sessions and keys', prompt:'Open Cloud IAM and enable revocation for suspicious sessions and the new key.', expected:true, proof:'Suspicious cloud sessions and access key contained.' },
    { type:'select', tool:'Cloud IAM', title:'Reset MFA safely', prompt:'Choose the safe account recovery path.', options:['Official credential reset and MFA re-registration','Approve every prompt','Share admin password'], expected:'Official credential reset and MFA re-registration', proof:'Cloud account recovery selected.' },
    { type:'toggle', tool:'Storage Console', title:'Review bucket policy changes', prompt:'Open Storage Console and enable policy review/revert.', expected:true, proof:'Unauthorized bucket policy exposure reduced.' },
    { type:'note', tool:'Audit Logs', title:'Preserve cloud audit timeline', prompt:'Write a note including audit logs, MFA fatigue, and access key.', keywords:['audit','mfa','key'], proof:'Cloud takeover timeline submitted.' }
  ],
  11: [
    { type:'type', tool:'Network Monitor', title:'Identify beacon pattern', prompt:'Open Network Monitor and type the beacon interval shown.', expected:'60 seconds', placeholder:'interval', proof:'Regular beacon interval identified.' },
    { type:'select', tool:'Endpoint Console', title:'Correlate endpoint event', prompt:'Choose the endpoint event that matches the network signal.', options:['Unknown file executed from Downloads','Printer installed','Calendar reminder'], expected:'Unknown file executed from Downloads', proof:'Network traffic correlated with endpoint execution.' },
    { type:'toggle', tool:'Endpoint Console', title:'Isolate the host', prompt:'Enable isolation for WS-CADET-19 while preserving logs.', expected:true, proof:'Potential C2 host isolated.' },
    { type:'note', tool:'Firewall', title:'Block indicator and escalate', prompt:'Write a note including block, approved controls, and escalate.', keywords:['block','approved','escalate'], proof:'Indicator block and escalation documented.' }
  ]
};

const loginScreen = document.getElementById('loginScreen');
const desktop = document.getElementById('desktop');
const loginBtn = document.getElementById('loginBtn');
const username = document.getElementById('username');
const password = document.getElementById('password');
const loginError = document.getElementById('loginError');
const ticketList = document.getElementById('ticketList');
const missionTitle = document.getElementById('missionTitle');
const missionBrief = document.getElementById('missionBrief');
const missionTags = document.getElementById('missionTags');
const checklist = document.getElementById('checklist');
const toolDock = document.getElementById('toolDock');
const activeToolTitle = document.getElementById('activeToolTitle');
const toolOutput = document.getElementById('toolOutput');
const actionGrid = document.getElementById('actionGrid');
const scenarioVisual = document.getElementById('scenarioVisual');
const feedback = document.getElementById('feedback');
const vmScore = document.getElementById('vmScore');
const vmProgress = document.getElementById('vmProgress');
const resetRange = document.getElementById('resetRange');
const unlockModal = document.getElementById('unlockModal');
const clock = document.getElementById('clock');

let selectedId = 1;
let completed = new Set(JSON.parse(localStorage.getItem(STORAGE_COMPLETED) || '[]'));
let stepProgress = JSON.parse(localStorage.getItem(STORAGE_STEPS) || '{}');
let wrongAttempts = Number(localStorage.getItem(STORAGE_WRONG) || '0');
let activeToolName = '';
const correctActionByStep = [0, 1, 2, 4];

function bootVm() {
  if (username.value.trim().toLowerCase() !== 'cadet' || password.value !== 'range') {
    loginError.textContent = 'Login failed. Use cadet / range for this training VM.';
    return;
  }
  loginScreen.classList.add('hidden');
  desktop.classList.remove('hidden');
  feedback.textContent = 'VM booted. Select tools, inspect evidence, and complete each mission action sequence.';
  buildTickets();
  selectScenario(selectedId);
}

function save() {
  localStorage.setItem(STORAGE_COMPLETED, JSON.stringify([...completed]));
  localStorage.setItem(STORAGE_STEPS, JSON.stringify(stepProgress));
  localStorage.setItem(STORAGE_WRONG, String(wrongAttempts));
}

function stepsFor(id) {
  const key = String(id);
  if (!Array.isArray(stepProgress[key])) stepProgress[key] = [];
  return new Set(stepProgress[key]);
}

function setSteps(id, set) {
  stepProgress[String(id)] = [...set].sort((a,b)=>a-b);
}

function updateClock() {
  const now = new Date();
  clock.textContent = ` • ${now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}`;
}

function updateProgress() {
  const xp = Math.max(0, completed.size * 100 - wrongAttempts * 5);
  vmScore.textContent = `${xp} XP`;
  vmProgress.textContent = `${completed.size}/11 complete`;
  document.querySelectorAll('.ticket-btn').forEach(btn => {
    const id = Number(btn.dataset.id);
    btn.classList.toggle('active', id === selectedId);
    btn.classList.toggle('done', completed.has(id));
    btn.querySelector('.ticket-status').textContent = completed.has(id) ? '✓' : '';
  });
  if (completed.size === scenarios.length) {
    const mapProgress = new Set(JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || '[]'));
    mapProgress.add(CYBER_BADGE_ID);
    localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify([...mapProgress]));
    unlockModal.classList.add('show');
  }
}

function buildTickets() {
  ticketList.innerHTML = scenarios.map(s => `
    <button class="ticket-btn" type="button" data-id="${s.id}">
      <span class="ticket-num">${s.id}</span>
      <span class="ticket-name">${s.title}</span>
      <span class="ticket-status"></span>
    </button>`).join('');
  ticketList.querySelectorAll('.ticket-btn').forEach(btn => btn.addEventListener('click', () => selectScenario(Number(btn.dataset.id))));
}

function selectScenario(id) {
  selectedId = id;
  const s = scenarios.find(item => item.id === id);
  const doneSteps = stepsFor(id);
  missionTitle.textContent = `Ticket #${s.id} — ${s.title}`;
  missionBrief.textContent = s.brief;
  missionTags.innerHTML = s.tags.map(tag => `<span>${tag}</span>`).join('');
  checklist.innerHTML = s.steps.map((step, idx) => `
    <div class="check-item ${doneSteps.has(idx) ? 'done' : ''}">
      <span class="check-box">${doneSteps.has(idx) ? '✓' : ''}</span>
      <span>${step}</span>
    </div>`).join('');
  renderScenarioVisual(s);
  buildTools(s);
  buildActions(s);
  feedback.className = 'feedback';
  feedback.textContent = completed.has(id) ? 'Mission already complete. You can still inspect the VM evidence and review actions.' : 'Mission loaded. Open a tool, inspect the evidence, then choose the correct action sequence.';
  updateProgress();
}

function buildTools(s) {
  const names = Object.keys(s.tools);
  toolDock.innerHTML = names.map((name, idx) => `<button class="tool-btn ${idx === 0 ? 'active' : ''}" type="button" data-tool="${name}">${name}</button>`).join('');
  toolDock.querySelectorAll('.tool-btn').forEach(btn => btn.addEventListener('click', () => openTool(btn.dataset.tool)));
  openTool(names[0]);
}

function openTool(name) {
  const s = scenarios.find(item => item.id === selectedId);
  activeToolTitle.textContent = name;
  activeToolName = name;
  toolOutput.textContent = s.tools[name];
  document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tool === name));
}

function renderScenarioVisual(s) {
  scenarioVisual.innerHTML = `<img src="assets/cyber_scenarios/scenario_${String(s.id).padStart(2, '0')}.svg" alt="${s.title} scenario illustration"><figcaption>Live training image: ${s.title}</figcaption>`;
}

function buildActions(s) {
  const doneSteps = stepsFor(s.id);
  const expectedStep = doneSteps.size;
  const tasks = interactionTasks[s.id] || [];
  if (expectedStep >= s.steps.length || completed.has(s.id)) {
    actionGrid.innerHTML = `<div class="task-complete-card"><strong>Ticket closed.</strong><p>You can still inspect the evidence tools, but this incident has already been completed and saved.</p></div>`;
    return;
  }
  const task = tasks[expectedStep];
  const control = renderTaskControl(task);
  actionGrid.innerHTML = `
    <section class="task-card" data-step="${expectedStep}">
      <div class="task-step-label">Step ${expectedStep + 1} of ${s.steps.length}</div>
      <h3>${task.title}</h3>
      <p>${task.prompt}</p>
      <div class="task-instructions">Required VM app: <strong>${task.tool}</strong>. Open that app in the Analyst Workbench, inspect the evidence, then complete this control.</div>
      ${control}
      <div class="task-buttons">
        <button class="task-submit" type="button" id="taskSubmit">Complete VM Task</button>
        <button class="unsafe-btn" type="button" id="unsafeShortcut">Unsafe shortcut: skip evidence and close ticket</button>
      </div>
    </section>`;
  document.getElementById('taskSubmit').addEventListener('click', completeCurrentTask);
  document.getElementById('unsafeShortcut').addEventListener('click', () => runAction(3));
}

function renderTaskControl(task) {
  if (task.type === 'toggle') {
    return `<div class="task-control"><label class="task-toggle"><span>Enable the defensive action in ${task.tool}</span><input id="taskToggle" type="checkbox"></label></div>`;
  }
  if (task.type === 'select') {
    return `<div class="task-control"><label>Choose action<select id="taskSelect"><option value="">Select a VM action...</option>${task.options.map(option => `<option value="${option}">${option}</option>`).join('')}</select></label></div>`;
  }
  if (task.type === 'note') {
    return `<div class="task-control"><label>Incident note<textarea id="taskNote" placeholder="Write a short ticket note using the evidence..."></textarea></label><div class="small-proof">Tip: include the required evidence words from the prompt.</div></div>`;
  }
  return `<div class="task-control"><label>Evidence entry<input id="taskInput" placeholder="${task.placeholder || 'Type evidence from the tool'}"></label></div>`;
}

function completeCurrentTask() {
  const s = scenarios.find(item => item.id === selectedId);
  const doneSteps = stepsFor(s.id);
  const expectedStep = doneSteps.size;
  const task = interactionTasks[s.id][expectedStep];
  if (activeToolName !== task.tool) {
    wrongAttempts += 1;
    feedback.className = 'feedback bad';
    feedback.textContent = `Open ${task.tool} first. Cadets must use the right VM tool before performing this task.`;
    save();
    updateProgress();
    return;
  }
  const validation = validateTask(task);
  if (!validation.ok) {
    wrongAttempts += 1;
    feedback.className = 'feedback bad';
    feedback.textContent = validation.message;
    save();
    updateProgress();
    return;
  }
  const actionIndex = correctActionByStep[expectedStep];
  runAction(actionIndex, task.proof);
}

function validateTask(task) {
  if (task.type === 'toggle') {
    return document.getElementById('taskToggle').checked ? {ok:true} : {ok:false, message:'Turn on the defensive VM control before completing this step.'};
  }
  if (task.type === 'select') {
    const value = document.getElementById('taskSelect').value;
    return value === task.expected ? {ok:true} : {ok:false, message:'That selection does not match the safe defensive action shown by the evidence.'};
  }
  if (task.type === 'note') {
    const value = document.getElementById('taskNote').value.toLowerCase();
    const missing = task.keywords.filter(word => !value.includes(word.toLowerCase()));
    return missing.length === 0 ? {ok:true} : {ok:false, message:`Your ticket note is missing: ${missing.join(', ')}.`};
  }
  const value = document.getElementById('taskInput').value.trim().toLowerCase();
  return value.includes(String(task.expected).toLowerCase()) ? {ok:true} : {ok:false, message:'Check the evidence tool again and enter the requested indicator exactly enough to identify it.'};
}

function runAction(index, extraProof = '') {
  const s = scenarios.find(item => item.id === selectedId);
  const action = s.actions[index];
  const doneSteps = stepsFor(s.id);
  const button = actionGrid.querySelector(`[data-action="${index}"]`);
  if (action.wrong) {
    wrongAttempts += 1;
    if (button) button.classList.add('wrong');
    feedback.className = 'feedback bad';
    feedback.textContent = `Wrong VM action — ${action.wrong}`;
    save();
    updateProgress();
    return;
  }
  const expectedStep = doneSteps.size;
  if (action.step !== expectedStep) {
    wrongAttempts += 1;
    if (button) button.classList.add('wrong');
    feedback.className = 'feedback bad';
    feedback.textContent = `Action out of sequence — complete checklist step ${expectedStep + 1} first: ${s.steps[expectedStep]}.`;
    save();
    updateProgress();
    return;
  }
  doneSteps.add(action.step);
  setSteps(s.id, doneSteps);
  if (button) {
    button.classList.add('correct');
    button.disabled = true;
  }
  let message = `VM task complete — ${extraProof || action.feedback}`;
  if (doneSteps.size === s.steps.length) {
    completed.add(s.id);
    message += ' Mission complete. Ticket closed and XP awarded.';
  }
  save();
  selectScenario(s.id);
  feedback.className = 'feedback good';
  feedback.textContent = message;
}

resetRange.addEventListener('click', () => {
  completed = new Set();
  stepProgress = {};
  wrongAttempts = 0;
  const mapProgress = JSON.parse(localStorage.getItem(MAP_PROGRESS_KEY) || '[]').filter(id => id !== CYBER_BADGE_ID);
  localStorage.setItem(MAP_PROGRESS_KEY, JSON.stringify(mapProgress));
  save();
  unlockModal.classList.remove('show');
  selectScenario(selectedId);
});

loginBtn.addEventListener('click', bootVm);
password.addEventListener('keydown', event => { if (event.key === 'Enter') bootVm(); });
username.addEventListener('keydown', event => { if (event.key === 'Enter') bootVm(); });
setInterval(updateClock, 1000);
updateClock();

  /* ── i18n: translate data arrays in-place ── */
  if (typeof trMutate === "function") {
    try { trMutate(correctActionByStep); } catch(e) {}
    try { trMutate(interactionTasks); } catch(e) {}
    try { trMutate(scenarios); } catch(e) {}
  }
