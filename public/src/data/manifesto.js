export const coreValues = [
  { valueMore: 'Deep work', over: 'Constant availability', icon: 'fas fa-brain' },
  { valueMore: 'Asynchronous communication', over: 'Synchronous meetings', icon: 'fas fa-comments' },
  { valueMore: 'Written documentation', over: 'Verbal agreements', icon: 'fas fa-file-alt' },
  { valueMore: 'Individual autonomy', over: 'Prescribed processes', icon: 'fas fa-user-check' },
  { valueMore: 'Sustainable pace', over: 'Heroic effort', icon: 'fas fa-heart' },
  { valueMore: 'Small experiments', over: 'Perfect plans', icon: 'fas fa-flask' }
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

export const principles = {
  focus: [
    {
      number: 1,
      title: 'Protect the focus state above all else',
      description: 'The uninterrupted mind produces the best work. We maintain sacred blocks of four hours daily where no meetings, messages, or interruptions are permitted. The maker chooses when this time occurs.'
    },
    {
      number: 2,
      title: 'Interruptions are not free',
      description: 'Research shows 52 minutes to reach deep focus, 23 minutes to recover from interruption. Every "quick question" costs more than it appears. Default to async. Wait for the open window.'
    },
    {
      number: 3,
      title: 'Presence does not equal productivity',
      description: 'We do not measure hours worked or time online. We measure outcomes delivered. A maker in focus for four hours outproduces a maker in meetings for eight.'
    }
  ],
  communication: [
    {
      number: 4,
      title: 'Writing is thinking made visible',
      description: 'We write by default. Decisions not documented did not happen. Written words can be searched, referenced, and shared across time zones. They outlive the meeting that never was.'
    },
    {
      number: 5,
      title: 'Synchronous time is expensive. Spend it wisely',
      description: 'Meetings cost everyone present, simultaneously. We limit them to two hours per week, one hour maximum each. If it can be written, write it. If it must be discussed, write first, then discuss the delta.'
    },
    {
      number: 6,
      title: 'Response time is not reaction time',
      description: 'Async means responding when working, not responding immediately. We expect responses within 24 working hours. Urgent means phone call. Everything else waits.'
    }
  ],
  autonomy: [
    {
      number: 7,
      title: 'Trust makers to make',
      description: 'Those who build the thing decide how to build it. They choose their tools, their approach, their schedule, their collaborators. We provide goals and constraints, not instructions.'
    },
    {
      number: 8,
      title: 'Pull, don\'t push',
      description: 'Work is not assigned. Work is pulled by those with capacity and interest. Makers select from a prioritized stack. They may skip with reason. They may propose alternatives.'
    },
    {
      number: 9,
      title: 'The maker\'s "no" is valid',
      description: 'Makers may refuse work that is unethical, impossible, or poorly conceived. They may challenge priorities. They may push back on requirements. This is not insubordination—it is ownership.'
    }
  ],
  sustainability: [
    {
      number: 10,
      title: 'Sustainable pace is not optional',
      description: 'Overtime is a red flag, not a badge of honor. When deadlines conflict with capacity, we cut scope. We never cut rest. Burnout destroys teams. Recovery is productive. We plan at 80% and leave slack for life.'
    },
    {
      number: 11,
      title: 'The team\'s health is the Enabler\'s responsibility',
      description: 'Someone must watch for warning signs: maxed WIP, skipped check-ins, overtime patterns, withdrawal. Someone must shield the team from organizational noise. Someone must say "no" to protect "yes."'
    },
    {
      number: 12,
      title: 'Exploration time is not a reward. It is a requirement',
      description: 'Twenty percent of time belongs to the maker for learning, tooling, experiments, and interests. No justification required. No approval needed. This is how we stay sharp. This is how we find better ways.'
    }
  ]
}

export const roles = [
  {
    name: 'The Maker',
    icon: 'fas fa-hammer',
    gradient: 'from-blue-500 to-blue-600',
    description: 'Builds things. They have full autonomy over implementation. They pull work, propose solutions, review code, and surface blockers. They choose what, how, when, where, and with whom.'
  },
  {
    name: 'The Enabler',
    icon: 'fas fa-hands-helping',
    gradient: 'from-purple-500 to-purple-600',
    description: 'Removes obstacles. They maintain the priority stack, shield from interruptions, monitor wellbeing, and facilitate decisions. They do not dictate—they enable.'
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
    description: 'Critical, blocking, time-sensitive. Maximum five items.'
  },
  {
    name: 'NEXT',
    color: 'amber',
    description: 'High value for this beat. An ordered stack. Pull from top.'
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
    purpose: 'Creative solving, with 10-minute exit window'
  }
]

export const constraints = [
  { constraint: 'Sacred block', limit: '4 hours daily' },
  { constraint: 'Meetings per week', limit: '≤2 hours total' },
  { constraint: 'Meeting duration', limit: '≤1 hour each' },
  { constraint: 'WIP per maker', limit: '3 items' },
  { constraint: 'Planning capacity', limit: '80%' },
  { constraint: 'Exploration time', limit: '20% (1 day/beat)' },
  { constraint: 'NOW items', limit: 'Max 3-5' },
  { constraint: 'Review response', limit: '4 hours' },
  { constraint: 'Auto-proceed', limit: '24 hours' }
]

export const definitionOfDone = {
  code: [
    'Code works as intended',
    'Tests pass (existing and new where appropriate)',
    'Code reviewed by at least one other maker',
    'Merged to main branch',
    'Deployable (or deployed, depending on team practice)',
    'No known defects introduced'
  ],
  nonCode: [
    'Meets the stated "done when" condition',
    'Reviewed by relevant party if needed',
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
      fix: 'If everything is NOW, nothing is'
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
      fix: 'Anyone can review, auto-proceed rule'
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
      fix: 'Surface commitments before making them'
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
  weekOne: {
    title: 'Week One: Observe',
    items: [
      'Read this manifesto',
      'Shadow async check-ins and board activity',
      'Observe one Beat Start and/or Beat Close',
      'Get access to tools, repos, docs',
      'Meet team members 1:1 (async or sync, their preference)'
    ]
  },
  weekTwo: {
    title: 'Week Two: Participate',
    items: [
      'Pull first small task (S-sized)',
      'Post first daily check-in',
      'Submit first PR, experience review process',
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
  }
}

export const incidentProtocol = [
  { step: '1. Alert', description: 'Post immediately in dedicated incident channel. Phone/page if needed.' },
  { step: '2. Acknowledge', description: 'Someone claims ownership within 15 minutes.' },
  { step: '3. Communicate', description: 'Brief status updates every 30 minutes until resolved.' },
  { step: '4. Fix', description: 'Stabilize first, perfect later. Rollback is a valid fix.' },
  { step: '5. Document', description: 'Async post-mortem within 48 hours. No blame. Root cause and prevention.' }
]

export const technicalPractices = [
  {
    name: 'Continuous Integration',
    description: 'Merge frequently. Keep main deployable. Automated tests run on every push.'
  },
  {
    name: 'Small Pull Requests',
    description: 'Easier to review, faster to merge, lower risk. Aim for PRs reviewable in under 30 minutes.'
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
    description: 'Short-lived branches. Merge daily. Avoid long-running feature branches.'
  }
]

export const whereItFits = {
  worksFor: [
    'Remote-first or distributed teams',
    'Senior and mid-level developers',
    'Product companies',
    'Teams of 3-8 people',
    'High-trust environments',
    'Async-native cultures'
  ],
  fitsPoorly: [
    'Junior-heavy teams needing close guidance',
    'Regulated industries requiring ceremony',
    'Agency work with constant client sync',
    'Organizations unwilling to protect focus time'
  ],
  canAdapt: [
    'Incident response (see Incidents section)',
    'Mixed seniority (extra onboarding support)',
    'Larger teams (multiple BEAT teams with coordination layer)'
  ]
}

export const researchStats = [
  { stat: '52 minutes', description: 'to reach deep focus' },
  { stat: '23 minutes', description: 'to recover from interruption' },
  { stat: '14%', description: 'productive output with 2+ meetings/day' },
  { stat: '4 hours', description: 'peak cognitive work capacity daily' },
  { stat: '72%', description: 'of meetings are ineffective' }
]
