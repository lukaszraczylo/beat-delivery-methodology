export const coreValues = [
  { valueMore: 'Deep work', over: 'Constant availability', icon: 'fas fa-brain' },
  { valueMore: 'Asynchronous communication', over: 'Synchronous meetings', icon: 'fas fa-comments' },
  { valueMore: 'Written documentation', over: 'Verbal agreements', icon: 'fas fa-file-alt' },
  { valueMore: 'Individual autonomy', over: 'Prescribed processes', icon: 'fas fa-user-check' },
  { valueMore: 'Sustainable pace', over: 'Heroic effort', icon: 'fas fa-heart' },
  { valueMore: 'Small experiments', over: 'Careful plans', icon: 'fas fa-flask' }
]

export const teamValues = [
  {
    name: 'Trust',
    icon: 'fas fa-handshake',
    gradient: 'from-blue-500 to-blue-600',
    description: 'We assume competence and good intent. We give autonomy because we trust it will be used well. We share information openly because we trust it will be handled responsibly.'
  },
  {
    name: 'Courage',
    icon: 'fas fa-shield-alt',
    gradient: 'from-purple-500 to-purple-600',
    description: 'We speak up when something is wrong. We admit when we don\'t know. We challenge decisions respectfully. We try new approaches even when they might fail.'
  },
  {
    name: 'Candor',
    icon: 'fas fa-comments',
    gradient: 'from-cyan-500 to-cyan-600',
    description: 'We give honest feedback, kindly delivered. We say what we mean in writing. We surface problems early rather than hiding them. We disagree openly, then commit.'
  },
  {
    name: 'Ownership',
    icon: 'fas fa-flag',
    gradient: 'from-green-500 to-green-600',
    description: 'We take responsibility for our work and its impact. We don\'t wait to be told. We fix what we find broken. We see things through to done.'
  },
  {
    name: 'Calm',
    icon: 'fas fa-spa',
    gradient: 'from-amber-500 to-amber-600',
    description: 'We do not create urgency where none exists. We respond thoughtfully, not reactively. We protect each other\'s focus. We choose sustainable over heroic.'
  }
]

// Stable ids for the four principle groups. The README side uses the same ids
// so a section can be matched across both mirrors.
export const principleSections = [
  { id: 'principle-focus', key: 'focus', title: 'On Focus', number: '1-3' },
  { id: 'principle-communication', key: 'communication', title: 'On Communication', number: '4-6' },
  { id: 'principle-autonomy', key: 'autonomy', title: 'On Autonomy', number: '7-9' },
  { id: 'principle-sustainability', key: 'sustainability', title: 'On Sustainability', number: '10-12' }
]

export const principles = {
  focus: [
    {
      number: 1,
      title: 'Protect the focus state above all else',
      description: 'Sacred blocks come first, because everything else in the plan depends on them. A maker protects a focus block of four hours each working day — a BEAT default, listed in the constraints table — and chooses when it falls. The only exception is a declared production incident: the incident lead may suspend a block, and only for the time the incident runs.'
    },
    {
      number: 2,
      title: 'Interruptions are not free',
      description: 'Interrupting someone costs more than the question appears to. Resuming interrupted work takes about twenty-five minutes [mark-2005], and the most productive users tracked by DeskTime worked in blocks of fifty-two minutes [desktime-2014]. So we default to async and wait for the open window.'
    },
    {
      number: 3,
      title: 'Presence does not equal productivity',
      description: 'We do not measure hours worked or time online. We measure outcomes delivered. Presence is not evidence of output, so a maker is judged by what ships, not by hours spent in meetings.'
    }
  ],
  communication: [
    {
      number: 4,
      title: 'Writing is thinking made visible',
      description: 'We write by default. A decision counts only when it is written down and the record names who decided it — silence is not consent. Written words can be searched, referenced, and shared across time zones. They outlive the meeting that never was.'
    },
    {
      number: 5,
      title: 'Synchronous time is expensive. Spend it wisely',
      description: 'Meetings cost everyone present, simultaneously, and the people who need the room most are rarely in it. Surveyed knowledge workers reported lower productivity above two hours a day in meetings [slack-workplace-lab-2017]. We limit meetings to the budget in the constraints table, one hour maximum each, and a declared incident is the only exception. If it can be written, write it; if it must be discussed, write first, then discuss the delta.'
    },
    {
      number: 6,
      title: 'Response time is not reaction time',
      description: 'Async means responding when working, not responding immediately. We expect a response within 24 working hours — the BEAT default, listed in the constraints table — counted against the coverage hours in the time-zone rules. Urgent means a phone call to the on-call rota, and the rota names the fallback when nobody answers. Everything else waits.'
    }
  ],
  autonomy: [
    {
      number: 7,
      title: 'Trust makers to make',
      description: 'Those who build the thing decide how to build it. They choose their tools, their approach, their schedule, their collaborators. Method is the maker\'s. The done condition is the team\'s, and a maker who cannot meet one raises it before the work starts, not after. We give makers autonomy because autonomy, competence and relatedness are the needs that make sustained motivation possible [deci-ryan-2000] — a general motivation finding, not a result about developers. We provide goals and constraints, not instructions.'
    },
    {
      number: 8,
      title: 'Pull, don\'t push',
      description: 'Work is not assigned. Work is pulled by those with capacity and interest. The Enabler orders the stack — priority and order, never assignment — and makers pull from the top of it. A maker may skip an item with a reason, propose an alternative, and object to the order through the dispute path in the priority rules.'
    },
    {
      number: 9,
      title: 'The maker\'s "no" is valid',
      description: 'Makers may refuse work that is unethical, impossible, or poorly conceived. They may challenge priorities. They may push back on requirements. A refusal is a decision and is recorded like any other: this is not insubordination—it is ownership.'
    }
  ],
  sustainability: [
    {
      number: 10,
      title: 'Sustainable pace is not optional',
      description: 'Overtime is a red flag, not a badge of honor. When deadlines conflict with capacity, we cut scope and we never cut rest. The capacity plan belongs to the Enabler, is set per maker for each beat at eighty percent of that maker\'s available working time, and says what does not fit. When a NOW item would break the plan, the deadline moves before the rest does.'
    },
    {
      number: 11,
      title: 'The team\'s health is the Enabler\'s responsibility',
      description: 'Someone must watch for warning signs: maxed WIP, skipped check-ins, overtime patterns, withdrawal. Someone must shield the team from organizational noise. Someone must say "no" to protect "yes." That someone is the Enabler, and the thresholds behind each warning sign are listed with the measurement rules.'
    },
    {
      number: 12,
      title: 'Exploration time is not a reward. It is a requirement',
      description: 'A fifth of each maker\'s working time belongs to learning, tooling, experiments, and interests — a BEAT default, listed in the constraints table. No justification required. No approval needed. Exploration does not consume a work-in-progress slot and does not sit on the board: it is scheduled, not tracked as work.'
    }
  ]
}

export const roles = [
  {
    name: 'The Maker',
    icon: 'fas fa-hammer',
    gradient: 'from-blue-500 to-blue-600',
    description: 'Builds things. They have full autonomy over implementation. They pull work, propose solutions, review code, and surface blockers. They choose what, how, when, where, and with whom. The done condition is the team\'s, not theirs to change alone.'
  },
  {
    name: 'The Enabler',
    icon: 'fas fa-hands-helping',
    gradient: 'from-purple-500 to-purple-600',
    description: 'Removes obstacles. They order the priority stack, shield from interruptions, monitor wellbeing, and facilitate decisions. They do not dictate—they enable: they set order and capacity, never assignment. They plan capacity at the level in the measurement rules. When they are a party to a dispute, they step out of it.'
  },
  {
    name: 'The Connector',
    icon: 'fas fa-project-diagram',
    gradient: 'from-cyan-500 to-cyan-600',
    description: 'Maintains knowledge flow. They keep documentation current, ensure context flows between makers, and onboard new members. This role is optional and may rotate.'
  }
]

export const priorityBuckets = [
  {
    name: 'NOW',
    color: 'red',
    description: 'Critical, blocking, time-sensitive. Maximum five items — a BEAT default, listed in the constraints table. When the bucket needs more than the capacity plan allows, the plan wins: the deadline moves or the scope shrinks.'
  },
  {
    name: 'NEXT',
    color: 'amber',
    description: 'High value for this beat. An ordered stack. Pull from top. The order is the Enabler\'s to set; any maker may dispute it through the priority rules.'
  },
  {
    name: 'LATER',
    color: 'blue',
    description: 'Valuable but not urgent. The backlog.'
  },
  {
    name: 'ICEBOX',
    color: 'gray',
    description: 'Someday, or needs more thought. Revisit quarterly.'
  }
]

export const ceremonies = [
  {
    name: 'Beat Start',
    duration: '30 min',
    purpose: 'Goals, priorities'
  },
  {
    name: 'Beat Close',
    duration: '30 min',
    purpose: 'Reflection, health check'
  },
  {
    name: 'Ad-hoc Help',
    duration: '≤25 min',
    purpose: 'Unblocking'
  },
  {
    name: 'Brainstorm',
    duration: '≤1 hr',
    purpose: 'Creative solving, with a 10-minute exit window — a BEAT default, not a research finding'
  }
]

// Every limit below is a BEAT default chosen by the BEAT authors. None of them
// is a research finding; the cited research in the manifesto informs the
// direction, not these numbers.
export const constraints = [
  { constraint: 'Sacred block', limit: '4 hours daily' },
  { constraint: 'Meetings per week', limit: '≤2 hours total' },
  { constraint: 'Meeting duration', limit: '≤1 hour each' },
  { constraint: 'WIP per maker', limit: '3 items' },
  { constraint: 'Planning capacity', limit: '80% of available working time' },
  { constraint: 'Exploration time', limit: '20% of working time' },
  { constraint: 'NOW items', limit: 'Max 5' },
  { constraint: 'Review response', limit: '4 working hours' },
  { constraint: 'Auto-proceed', limit: '24 working hours' }
]

// The framework section, keyed for the README mirror.
export const framework = {
  id: 'section-method',
  title: 'The Framework',
  summary: 'The principles above guide us. The framework below implements them.',
  subsections: [
    'Roles',
    'Beats',
    'Work Items',
    'Definition of Done',
    'Prioritization',
    'The Board',
    'Meetings',
    'Daily Check-in',
    'Collaboration',
    'Multi-Maker Work',
    'Avoiding Chokepoints',
    'Spotted Issues',
    'Burnout Prevention',
    'Customer & User Feedback',
    'Incidents & Emergencies',
    'Technical Practices (Optional)',
    'On-call and incident rotation',
    'Working across time zones',
    'Dependencies across teams',
    'Accountability and measurement',
    'Onboarding to BEAT'
  ]
}

// Section and principle ids, mapped to the site data key that holds them and
// to the heading each side uses. This is the data-side half of the committed
// section mapping: the README mirror and the consistency check read the same
// ids from here.
export const sectionMap = [
  ...principleSections.map((s) => ({ id: s.id, heading: s.title, dataKey: `principles.${s.key}` })),
  { id: 'section-method', heading: 'The Framework', dataKey: 'framework' },
  { id: 'onCall', heading: 'On-call and incident rotation', dataKey: 'onCall' },
  { id: 'timeZones', heading: 'Working across time zones', dataKey: 'timeZones' },
  { id: 'crossTeamDependencies', heading: 'Dependencies across teams', dataKey: 'crossTeamDependencies' },
  { id: 'measurement', heading: 'Accountability and measurement', dataKey: 'measurement' },
  { id: 'customerFeedback', heading: 'Customer & User Feedback', dataKey: 'customerFeedback' },
  { id: 'onboarding', heading: 'Onboarding to BEAT', dataKey: 'onboarding' },
  { id: 'assessment-scoring', heading: 'Assessment scoring', dataKey: 'overallAssessment.scoring' },
  { id: 'assessment-validity', heading: 'Assessment validity', dataKey: 'overallAssessment.validity' }
]

// Every rule states what it applies to, who decides, and what to do when it
// does not fit. The views render this list by iteration.
export const decisionRules = [
  {
    rule: 'Sacred block',
    appliesTo: 'Every maker, every working day.',
    decidedBy: 'The maker chooses the time; the Enabler protects it.',
    ifItDoesNotFit: 'A declared production incident. The incident lead suspends the block and says when it resumes.'
  },
  {
    rule: 'Meeting budget',
    appliesTo: 'Recurring and scheduled meetings inside a working week.',
    decidedBy: 'The Enabler schedules; the meeting is cancelled without an agenda.',
    ifItDoesNotFit: 'A declared incident, which the incident lead runs outside the budget. Ad-hoc help and a blocked work item count against the same budget.'
  },
  {
    rule: 'Work-in-progress limit',
    appliesTo: 'Items a maker has started and not finished.',
    decidedBy: 'The maker, who stops taking new work at the limit.',
    ifItDoesNotFit: 'The maker is blocked and every remaining item is blocked too. They say so in the check-in and the Enabler unblocks or reorders.'
  },
  {
    rule: 'NOW bucket limit',
    appliesTo: 'The NOW bucket of the board.',
    decidedBy: 'The Enabler, who returns items to NEXT to keep the bucket inside its limit.',
    ifItDoesNotFit: 'A genuine critical item. The Enabler records it, names the deadline it displaces, and the displaced deadline moves.'
  },
  {
    rule: 'Planning capacity',
    appliesTo: 'The capacity plan for one beat, per maker.',
    decidedBy: 'The Enabler, at eighty percent of the maker\'s available working time.',
    ifItDoesNotFit: 'Demand above capacity. The Enabler lists what does not fit and the team decides what moves.'
  },
  {
    rule: 'Exploration time',
    appliesTo: 'Each maker\'s working time.',
    decidedBy: 'The maker, without approval.',
    ifItDoesNotFit: 'Nothing. Exploration time is not traded away when the team is busy; it is moved to the next beat and that is recorded.'
  },
  {
    rule: 'Stale-item sweep',
    appliesTo: 'Board items with no activity for five working days.',
    decidedBy: 'The Enabler sweeps at each beat close.',
    ifItDoesNotFit: 'An item that is intentionally parked. The maker pins it, the pin is reviewed at the next beat close, and an unpinned item returns to the backlog.'
  },
  {
    rule: 'Review response',
    appliesTo: 'An open pull request, within the coverage hours of the reference time zone.',
    decidedBy: 'Any maker who reviews; nobody is the assigned reviewer.',
    ifItDoesNotFit: 'A change with security, data-migration or billing impact, and a change to a dependency other teams consume. These wait for a named reviewer and never auto-proceed.'
  },
  {
    rule: 'Auto-proceed',
    appliesTo: 'An open pull request past the review response window, with a passing build.',
    decidedBy: 'The author merges, or asks the Enabler to merge, once the window closes.',
    ifItDoesNotFit: 'Open review comments. The author answers them or asks for a named reviewer. Exceptions in the review rule never auto-proceed.'
  },
  {
    rule: 'Sizing',
    appliesTo: 'Team-internal planning of work items.',
    decidedBy: 'The maker who picks the item.',
    ifItDoesNotFit: 'A team that must report to an external programme, a regulator or a regulated customer keeps that reporting obligation and adapts the method around it.'
  },
  {
    rule: 'Claiming files',
    appliesTo: 'Files a maker is changing on a shared branch.',
    decidedBy: 'The maker, in the branch protection rule before starting.',
    ifItDoesNotFit: 'Two makers claim the same file. The earlier claim stands and the later maker re-plans around the file.'
  },
  {
    rule: 'Decisions',
    appliesTo: 'Every decision that changes what the team does.',
    decidedBy: 'The owner named in the written recommendation.',
    ifItDoesNotFit: 'Nobody objects within 24 working hours — a BEAT default, not a research finding — and the decision is recorded. An objection moves it to a short synchronous discussion and the owner decides.'
  },
  {
    rule: 'Done condition',
    appliesTo: 'Every item the team takes on.',
    decidedBy: 'The team, which owns the definition and records any change to it.',
    ifItDoesNotFit: 'A maker cannot meet a condition. They raise it before the work starts; the team either changes the condition or the work does not start.'
  },
  {
    rule: 'Technical practices',
    appliesTo: 'One repository or service, adopted by the team that owns it.',
    decidedBy: 'The team that owns the code.',
    ifItDoesNotFit: 'A practice only partly applies, for example automated testing on a codebase with no test harness. The team adopts the part that applies and writes down the part it defers.'
  }
]

export const definitionOfDone = {
  code: [
    'Code works as intended',
    'Tests pass: the existing suite passes, and new behaviour carries a test unless the team has agreed an exception for it, which the Enabler records',
    'Code reviewed by at least one other maker, or auto-proceeded under the review rule with the exceptions in that rule named in the merge',
    'Merged to main branch',
    'Deployable: the artefact builds and runs for the team\'s own use, and is deployed where the team deploys its own work',
    'No known defects introduced: a defect found during the work and logged as its own item does not block this one, provided it is recorded before the merge'
  ],
  nonCode: [
    'Meets the stated "done when" condition',
    'Reviewed by the relevant party where the item names one; where it names none, the maker decides',
    'Documented where others can find it'
  ]
}

export const antiPatterns = {
  process: [
    {
      pattern: 'Async theater',
      looksLike: 'Writing decisions but ignoring comments',
      fix: 'Genuine engagement or revert to sync'
    },
    {
      pattern: 'Sacred block erosion',
      looksLike: '"Quick calls" during focus time',
      fix: 'Enabler enforces boundaries'
    },
    {
      pattern: 'Check-in decay',
      looksLike: 'Updates become sporadic, then stop',
      fix: 'Address in retro, understand why'
    },
    {
      pattern: 'Permanent NOW',
      looksLike: 'Everything is urgent, always',
      fix: 'If everything is NOW, nothing is. The Enabler returns items to NEXT until the bucket is inside its limit'
    },
    {
      pattern: 'Grooming creep',
      looksLike: 'Meetings sneak back in disguised',
      fix: 'Ask: could this be async?'
    },
    {
      pattern: 'Document graveyard',
      looksLike: 'Docs written but never maintained',
      fix: 'Connector role, or delete stale docs'
    }
  ],
  people: [
    {
      pattern: 'Hero culture',
      looksLike: 'Same person handles all crises',
      fix: 'Rotate, distribute, investigate cause'
    },
    {
      pattern: 'Silent struggle',
      looksLike: 'Maker stuck for days, says nothing',
      fix: 'Normalize asking for help early'
    },
    {
      pattern: 'Autonomy hoarding',
      looksLike: 'One maker claims all interesting work',
      fix: 'Discuss in retro, Enabler balances'
    },
    {
      pattern: 'Review blocking',
      looksLike: 'PRs languish waiting for "the" reviewer',
      fix: 'Anyone can review, auto-proceed rule, with the exceptions in the review rule'
    },
    {
      pattern: 'Passive Enabler',
      looksLike: 'Enabler doesn\'t shield or prioritize',
      fix: 'Role clarity, or rotate role'
    }
  ],
  organizational: [
    {
      pattern: 'Management override',
      looksLike: 'Exec demands meeting during sacred block',
      fix: 'Enabler pushes back, escalates pattern'
    },
    {
      pattern: 'Stealth deadlines',
      looksLike: 'Surprise "we promised client by Friday"',
      fix: 'Surface commitments before making them. A commitment already made outside the team is renegotiated by whoever made it, with the Enabler helping, and the team hears about it before the next beat starts'
    },
    {
      pattern: 'Metric theater',
      looksLike: 'Tracking velocity, points, hours',
      fix: 'Stop. Measure outcomes, not activity.'
    },
    {
      pattern: 'BEAT in name only',
      looksLike: 'Ceremonies adopted, principles ignored',
      fix: 'Re-read manifesto, recommit or don\'t claim BEAT'
    }
  ]
}

export const onboarding = {
  id: 'onboarding',
  weekOne: {
    title: 'Week One: Observe',
    items: [
      'Read this manifesto',
      'Read the decision log, the architecture notes and the board history for the area you join',
      'Shadow async check-ins and board activity',
      'Observe one Beat Start and/or Beat Close',
      'Get access to tools, repos, docs',
      'Meet team members one to one: the Connector or the Enabler arranges it, you choose the format and the time, and a written exchange counts as a meeting'
    ]
  },
  weekTwo: {
    title: 'Week Two: Participate',
    items: [
      'Pull first small task (S-sized)',
      'Post first daily check-in',
      'Submit first PR, and treat the first review as teaching rather than as the review window',
      'Ask questions freely—in channel, not DMs (so others learn too)'
    ]
  },
  weekThree: {
    title: 'Week Three: Contribute',
    items: [
      'Pull regular work items',
      'Participate in Beat Close',
      'Start taking ad-hoc help requests',
      'Begin exploration time'
    ]
  },
  firstMonth: {
    title: 'First Month Expectations',
    items: [
      'Understand the board and priority buckets',
      'Know how to post check-ins and flag blockers',
      'Completed several work items end-to-end',
      'Experienced one full beat cycle',
      'Identified sacred block timing that works'
    ]
  },
  readingList: {
    title: 'Reading List',
    items: [
      'This manifesto',
      'The decision log for the area you join: what was decided, by whom, and why',
      'The architecture notes for the services you will touch',
      'The board history for the last two beats: what was tried, what shipped, what was dropped'
    ]
  },
  escalationPath: {
    title: 'When the Ramp Is Not Working',
    items: [
      'Say so in the first week, not after the first month: the Connector or the Enabler adjusts the ramp or the plan',
      'The Enabler re-scopes your first items until they fit the time you actually have',
      'If the ramp is still blocked two weeks in, the Enabler raises it at the next beat close and the team changes the plan',
      'You may decline work, meetings and on-call during the ramp, and the team plans around that'
    ]
  },
  firstReview: {
    title: 'Your First Review',
    items: [
      'Your first pull request is reviewed for teaching, not against the review window',
      'It does not auto-proceed: you ask a named maker for the review and you wait',
      'After your first merged item, the review window applies to you like it does to everyone else'
    ]
  },
  juniorTeams: {
    title: 'On Junior-Heavy Teams',
    items: [
      'Where BEAT fits poorly is on junior-heavy teams that need close guidance, so those teams add a mentor on top of this ramp',
      'The mentor is a named maker who reviews the new member\'s first items and answers questions in working hours',
      'The mentor\'s time is planned capacity like any other work, not an overflow',
      'The ramp lengthens: the new member pulls feature work only after the first month'
    ]
  }
}

export const incidentProtocol = [
  { step: '1. Alert', description: 'Post immediately in the incident channel. The on-call rota names who to call and the fallback when nobody answers.' },
  { step: '2. Acknowledge', description: 'Someone claims ownership within fifteen minutes of the alert, and becomes the incident lead for the rest of the incident.' },
  { step: '3. Communicate', description: 'Status updates every half hour until the incident is stable. The meeting budget does not apply during an incident; the incident lead decides when normal rules resume.' },
  { step: '4. Fix', description: 'Stabilize first, improve later. Rollback is a valid fix.' },
  { step: '5. Document', description: 'Async post-mortem within two days. No blame. Root cause and prevention, with the action items tracked to completion.' }
]

export const technicalPractices = [
  {
    name: 'Continuous Integration',
    description: 'Merge frequently. Keep main deployable. Automated tests run on every push.'
  },
  {
    name: 'Small Pull Requests',
    description: 'Easier to review, faster to merge, lower risk. Aim for PRs a reviewer can read in one sitting — a BEAT default, not a measured threshold.'
  },
  {
    name: 'Feature Flags',
    description: 'Merge incomplete work safely. Decouple deployment from release. Enable experimentation.'
  },
  {
    name: 'Automated Testing',
    description: 'Tests enable confidence. Confidence enables speed. Coverage targets are team-decided.'
  },
  {
    name: 'Refactoring as You Go',
    description: 'Leave code better than you found it. Small improvements compound. No permission needed.'
  },
  {
    name: 'Trunk-Based Development',
    description: 'Short-lived branches. Merge daily. Claim files in the branch protection rule before you start; when two makers claim the same file, the earlier claim stands and the later one re-plans around it. A day is a working day in the reference time zone.'
  }
]

export const practicePolicy = {
  scope: 'One repository or service, adopted by the team that owns it.',
  decidedBy: 'The team that owns the code.',
  partialAdoption: 'A practice that only partly applies — automated testing on a codebase with no test harness, for example — is adopted in the part that applies, and the team writes down the part it defers and when it returns to it.'
}

export const whereItFits = {
  worksFor: [
    'Remote-first or distributed teams, where written work carries the team across time zones',
    'Senior and mid-level developers, who need protection more than supervision',
    'Product companies, where the work is decided in the open',
    'Teams of three to eight people, where one Enabler can still hold the whole board',
    'High-trust environments, where the Enabler can order without a mandate',
    'Async-native cultures, where writing is already the default'
  ],
  fitsPoorly: [
    'Junior-heavy teams needing close guidance, unless the team adds a mentor alongside the BEAT ramp',
    'Regulated industries requiring ceremony that BEAT does not provide',
    'Agency work with constant client sync, where the client calendar sets the meeting budget',
    'Organizations unwilling to protect focus time'
  ],
  canAdapt: [
    'Incident response (see Incidents section)',
    'Mixed seniority (extra onboarding support)',
    'Larger teams (multiple BEAT teams with coordination layer)'
  ],
  note: 'These are the contexts we have seen BEAT used in, not a researched fit. The list records our practice; it is not a finding about what improves delivery.'
}

export const researchStats = [
  { stat: '25 minutes', description: 'to resume an interrupted task [mark-2005]', citation: 'mark-2005' },
  { stat: '52 minutes', description: 'length of a productive work block [desktime-2014]', citation: 'desktime-2014' },
  { stat: '3h 43m', description: 'focused work per day for the top performers tracked [desktime-2014]', citation: 'desktime-2014' },
  { stat: '71%', description: 'of surveyed senior managers call their meetings unproductive or inefficient [rogelberg-2019]', citation: 'rogelberg-2019' },
  { stat: '73%', description: 'reported productivity gain in companies that tried a meeting-free Wednesday [mit-sloan-2017]', citation: 'mit-sloan-2017' }
]

// --- Situation subsections -------------------------------------------------

export const onCall = {
  id: 'onCall',
  title: 'On-call and incident rotation',
  summary: 'The incident protocol covers the incident. This covers the rota that carries it.',
  appliesTo: 'Any service with a production path a customer depends on.',
  decidedBy: 'The team that owns the service sets the rota; the Enabler keeps it staffed and the Connector keeps it written down.',
  ifItDoesNotFit: 'A service with no customer-facing failure mode needs no rota. A team too small to share the load covers it in named hours rather than shifts, and says so.',
  items: [
    {
      title: 'Rotation',
      detail: 'The rota names one person per shift and one backup, published in the service documentation. The rota is set per beat and reviewed at each beat close.'
    },
    {
      title: 'Handover',
      detail: 'Each handover is written: what is open, what is watching, what broke last time. The incoming shift reads it before the outgoing shift ends.'
    },
    {
      title: 'Availability',
      detail: 'On-call means reachable during the shift, not watching screens. Outside the shift, a maker is offline and pages are not expected.'
    },
    {
      title: 'Inside or outside the beat',
      detail: 'On-call time is planned capacity, not overtime. The Enabler plans the on-call load into the beat and lowers the planned commitment of whoever is on.'
    },
    {
      title: 'Compensation',
      detail: 'On-call time back is taken in time: the maker chooses the following working time they hand back, and the Enabler protects it.'
    },
    {
      title: 'Escalation',
      detail: 'If the on-call maker cannot resolve within the acknowledgement window, they escalate to the backup, then to the incident lead named in the rota, then to the Enabler.'
    }
  ]
}

export const timeZones = {
  id: 'timeZones',
  title: 'Working across time zones',
  summary: 'Every rule in BEAT that counts time runs on the team\'s stated coverage hours, in working hours. Here is the reference time zone those hours are counted in.',
  appliesTo: 'Every rule measured in hours or days: response expectations, the review window, auto-proceed, stale items, daily merges and the daily check-in.',
  decidedBy: 'The team names its reference time zone at the start of a beat; the Enabler records it with the beat goals.',
  ifItDoesNotFit: 'A team that spans zones unevenly picks the zone with the fewest members as the reference, or picks no reference and states each rule in absolute hours instead.',
  items: [
    {
      title: 'Coverage hours',
      detail: 'The team states the hours it is covered, in the reference time zone, and publishes them. Outside those hours a maker is offline.'
    },
    {
      title: 'Reference time zone',
      detail: 'One named time zone starts every clock in BEAT: the review window, auto-proceed, staleness and the daily merge. It is written down where the board lives.'
    },
    {
      title: 'Overlap hours',
      detail: 'Ceremonies run inside the overlap between the zones they span. A ceremony that has no overlap is written instead, and read asynchronously.'
    },
    {
      title: 'Handover',
      detail: 'The team that ends its day writes the state of open work before it ends, so the next team starts from the written state rather than from a message.'
    },
    {
      title: 'Daily check-in',
      detail: 'The check-in is posted in the maker\'s own working day, not in the reference one. A maker whose day has barely started posts when it starts for them.'
    },
    {
      title: 'Sacred blocks',
      detail: 'A maker\'s sacred block sits in their own working day. Nobody schedules into another maker\'s block, and a block in one zone is never a reason to be online in another.'
    },
    {
      title: 'Urgent work across zones',
      detail: 'Urgency follows the rota, not the person who noticed. If nobody on the rota is in working hours, the issue waits unless it meets the incident criteria.'
    }
  ]
}

export const crossTeamDependencies = {
  id: 'crossTeamDependencies',
  title: 'Dependencies across teams',
  summary: 'Escalation, connectors and interfaces all stop at the team boundary. Here is how work crosses it.',
  appliesTo: 'Any work item that depends on another team, and any commitment this team makes to another team.',
  decidedBy: 'The Enabler owns the dependency list; the team that owns the other side owns the work on their side.',
  ifItDoesNotFit: 'A dependency with no counterpart on the other side is escalated to the Connector, who finds an owner or says the work cannot proceed on that dependency.',
  items: [
    {
      title: 'Naming the dependency',
      detail: 'An item with a dependency names the other team and the thing they owe: a decision, a date, an interface. "Blocked on platform" is not a dependency.'
    },
    {
      title: 'Raising it',
      detail: 'The dependency is posted in the check-in the day it appears, not when it starts to hurt. The Enabler carries it to the other team\'s Enabler.'
    },
    {
      title: 'Interfaces',
      detail: 'Agreed contracts are written before either side builds, and they are versioned. Changing an agreed interface is a change to both teams\' plans, and both are told.'
    },
    {
      title: 'Commitments to other teams',
      detail: 'A commitment this team makes to another team is recorded in the same place as the board, with the date and the owner, so it is not lost when the beat ends.'
    },
    {
      title: 'Shared foundations',
      detail: 'A change to a shared library or platform that affects several teams is raised with all affected teams before it is scheduled, not after.'
    },
    {
      title: 'When the other side does not answer',
      detail: 'An unanswered dependency is escalated by the Enabler to the other team\'s Enabler, and then to their manager. The team that is blocked records what it is not doing while it waits.'
    }
  ]
}

export const measurement = {
  id: 'measurement',
  title: 'Accountability and measurement',
  summary: 'We promise outcomes and measure activity. This says which is which, who measures, and when.',
  appliesTo: 'Every team that runs BEAT, for every beat.',
  decidedBy: 'The Enabler owns the measurement for the beat; the team reviews it at the beat close and changes the measures it does not want.',
  ifItDoesNotFit: 'Work whose outcome is not observable — support, infrastructure, research, maintenance — is measured by the change it produced and reviewed at the beat close. It is never measured by hours.',
  items: [
    {
      title: 'What is measured',
      detail: 'The outcome the team was set up to deliver, and whether the work landed. Not hours, not tasks completed, not points, not activity.'
    },
    {
      title: 'Who measures',
      detail: 'The Enabler collects the evidence for the beat; the team reviews it at the beat close. The people who did the work do not report their own hours.'
    },
    {
      title: 'When',
      detail: 'Once per beat, at the beat close, and immediately when a warning sign fires.'
    },
    {
      title: 'Window',
      detail: 'The outcome is judged over the window in which it could have landed, which is the beat for most work and longer for work that cannot land inside one beat.'
    },
    {
      title: 'Warning signs and their thresholds',
      detail: 'Overtime in two consecutive beats, or WIP at the limit in two consecutive beats, or the same blocker unresolved across two beats, or a maker who has missed two check-ins in a row. Each one is discussed at the next beat close, and the response is written down there.'
    },
    {
      title: 'Not a scorecard',
      detail: 'The measurement exists to change the plan. It is not a ranking of makers, it is not reported upward as a performance figure, and it is not used to compare teams.'
    },
    {
      title: 'The assessment on this site',
      detail: 'The self-assessment is a self-report. It has no validity evidence, it does not measure the outcomes above, and it is a starting point for a conversation rather than a measurement.'
    }
  ]
}

export const customerFeedback = {
  id: 'customerFeedback',
  title: 'Customer & User Feedback',
  summary: 'Work built away from users drifts away from what users need. We keep the line to users open.',
  appliesTo: 'Every team that builds something users use.',
  decidedBy: 'The team decides who reads user feedback; the Enabler makes sure the feedback reaches the makers who can act on it.',
  ifItDoesNotFit: 'A team with no direct user contact — an internal platform, for example — reads the requests of the teams that use it, and treats those requests as the user feedback.',
  items: [
    {
      title: 'Direct access',
      detail: 'Makers can read support tickets, analytics and user interviews without them being filtered through several layers of management.'
    },
    {
      title: 'Regular exposure',
      detail: 'At least once per beat, someone on the team reads real user feedback and shares the highlights asynchronously. The source is named, so a claim can be checked.'
    },
    {
      title: 'Small releases',
      detail: 'Ship in small pieces so real usage can answer the question the work was built on.'
    },
    {
      title: 'Problems, not solutions',
      detail: 'Users describe what hurts them; the team decides how to fix it. The proposed solution is treated as one input, not as the answer.'
    },
    {
      title: 'Closing the loop',
      detail: 'When a release answers a user request, the team tells the requester. That is how the next request arrives.'
    },
    {
      title: 'What this is not',
      detail: 'This is a practice the team commits to, not a researched effect on delivery. It is written down because the team intends to do it, and it is reviewed like any other practice.'
    }
  ]
}
