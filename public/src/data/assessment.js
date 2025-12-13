export const assessmentCategories = [
  {
    id: 'focus',
    title: 'Focus & Deep Work',
    icon: 'fas fa-brain',
    gradient: 'from-blue-500 to-cyan-500',
    color: 'blue'
  },
  {
    id: 'communication',
    title: 'Communication',
    icon: 'fas fa-comments',
    gradient: 'from-purple-500 to-pink-500',
    color: 'purple'
  },
  {
    id: 'autonomy',
    title: 'Autonomy & Trust',
    icon: 'fas fa-user-shield',
    gradient: 'from-green-500 to-emerald-500',
    color: 'green'
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    icon: 'fas fa-leaf',
    gradient: 'from-amber-500 to-orange-500',
    color: 'amber'
  }
]

export const assessmentQuestions = [
  // Focus & Deep Work
  {
    id: 1,
    category: 'focus',
    question: 'How often do you get uninterrupted blocks of 2+ hours for focused work?',
    options: [
      { value: 1, label: 'Rarely or never', description: 'Constant interruptions throughout the day' },
      { value: 2, label: 'Sometimes', description: 'Maybe once or twice a week' },
      { value: 3, label: 'Often', description: 'Most days I can find some focus time' },
      { value: 4, label: 'Always', description: 'I have protected focus blocks daily' }
    ]
  },
  {
    id: 2,
    category: 'focus',
    question: 'How many meetings do you have in a typical week?',
    options: [
      { value: 1, label: '10+ hours', description: 'Meetings dominate my calendar' },
      { value: 2, label: '5-10 hours', description: 'Significant meeting load' },
      { value: 3, label: '2-5 hours', description: 'Moderate amount of meetings' },
      { value: 4, label: 'Under 2 hours', description: 'Minimal meeting time' }
    ]
  },
  {
    id: 3,
    category: 'focus',
    question: 'How is productivity measured on your team?',
    options: [
      { value: 1, label: 'Hours worked / time online', description: 'Presence-based metrics' },
      { value: 2, label: 'Tasks completed / velocity', description: 'Activity-based metrics' },
      { value: 3, label: 'Mix of activity and outcomes', description: 'Some outcome focus' },
      { value: 4, label: 'Outcomes delivered', description: 'Results matter, not hours' }
    ]
  },

  // Communication
  {
    id: 4,
    category: 'communication',
    question: 'How are most decisions communicated and documented?',
    options: [
      { value: 1, label: 'Verbal only', description: 'Discussed but rarely written down' },
      { value: 2, label: 'Scattered notes', description: 'Some docs, but hard to find' },
      { value: 3, label: 'Mostly documented', description: 'Important decisions get written' },
      { value: 4, label: 'Always written first', description: 'Write-first culture' }
    ]
  },
  {
    id: 5,
    category: 'communication',
    question: 'What\'s the expected response time to messages?',
    options: [
      { value: 1, label: 'Immediate', description: 'Expected to respond within minutes' },
      { value: 2, label: 'Within hours', description: 'Same-day responses expected' },
      { value: 3, label: 'Within a day', description: '24-hour response is acceptable' },
      { value: 4, label: 'Async-friendly', description: 'Response when working, no pressure' }
    ]
  },
  {
    id: 6,
    category: 'communication',
    question: 'How are urgent issues escalated?',
    options: [
      { value: 1, label: 'Everything is urgent', description: 'No clear priority system' },
      { value: 2, label: 'Depends on who\'s asking', description: 'Urgency varies by person' },
      { value: 3, label: 'Some prioritization', description: 'We try to triage' },
      { value: 4, label: 'Clear escalation path', description: 'Urgent = phone, else async' }
    ]
  },

  // Autonomy & Trust
  {
    id: 7,
    category: 'autonomy',
    question: 'How is work assigned to team members?',
    options: [
      { value: 1, label: 'Top-down assignment', description: 'Manager decides who does what' },
      { value: 2, label: 'Mostly assigned', description: 'Some choice, but limited' },
      { value: 3, label: 'Collaborative', description: 'Team discusses, then assigns' },
      { value: 4, label: 'Pull-based', description: 'Developers choose from prioritized work' }
    ]
  },
  {
    id: 8,
    category: 'autonomy',
    question: 'Can developers choose their own tools and approaches?',
    options: [
      { value: 1, label: 'No', description: 'Strict standardization' },
      { value: 2, label: 'Limited', description: 'Some flexibility within constraints' },
      { value: 3, label: 'Mostly yes', description: 'Freedom with guidelines' },
      { value: 4, label: 'Full autonomy', description: 'Trust makers to make decisions' }
    ]
  },
  {
    id: 9,
    category: 'autonomy',
    question: 'Can team members push back on work they disagree with?',
    options: [
      { value: 1, label: 'No', description: 'Expected to comply' },
      { value: 2, label: 'Discouraged', description: 'Possible but not welcomed' },
      { value: 3, label: 'Sometimes', description: 'Depends on the situation' },
      { value: 4, label: 'Encouraged', description: 'Challenges are valued' }
    ]
  },

  // Sustainability
  {
    id: 10,
    category: 'sustainability',
    question: 'How often does your team work overtime?',
    options: [
      { value: 1, label: 'Frequently', description: 'Overtime is normal' },
      { value: 2, label: 'Often', description: 'Regular crunch periods' },
      { value: 3, label: 'Sometimes', description: 'Occasional overtime' },
      { value: 4, label: 'Rarely', description: 'Sustainable pace is protected' }
    ]
  },
  {
    id: 11,
    category: 'sustainability',
    question: 'What happens when deadlines conflict with capacity?',
    options: [
      { value: 1, label: 'Work harder', description: 'Team pushes through' },
      { value: 2, label: 'Negotiate later', description: 'Promise now, adjust later' },
      { value: 3, label: 'Discuss options', description: 'Some scope flexibility' },
      { value: 4, label: 'Cut scope', description: 'We never cut rest, only scope' }
    ]
  },
  {
    id: 12,
    category: 'sustainability',
    question: 'Do team members have time for learning and exploration?',
    options: [
      { value: 1, label: 'No', description: 'Always feature work' },
      { value: 2, label: 'Personal time only', description: 'Learning is on your own time' },
      { value: 3, label: 'Sometimes', description: 'When we have slack' },
      { value: 4, label: 'Protected time', description: '20% for exploration built in' }
    ]
  }
]

export const beatRecommendations = {
  focus: {
    low: {
      title: 'Your Focus is Under Attack',
      description: 'Constant interruptions and meetings are destroying your team\'s ability to do deep work. Research shows it takes 52 minutes to reach focus and 23 minutes to recover from interruption.',
      recommendations: [
        'Establish 4-hour daily sacred blocks where no meetings or interruptions are allowed',
        'Limit meetings to 2 hours per week maximum',
        'Measure outcomes, not hours worked or time online',
        'Let makers choose when their focus time occurs'
      ],
      beatPrinciple: 'Protect the focus state above all else. The uninterrupted mind produces the best work.'
    },
    medium: {
      title: 'Focus Needs Protection',
      description: 'You have some focus time, but it\'s inconsistent. With more structure, your team could dramatically increase productivity.',
      recommendations: [
        'Formalize sacred blocks and make them non-negotiable',
        'Audit your meeting calendar - can 50% become async?',
        'Create clear signals for when someone is in focus mode',
        'Track interruption patterns and address the sources'
      ],
      beatPrinciple: 'Presence does not equal productivity. A maker in focus for four hours outproduces a maker in meetings for eight.'
    },
    high: {
      title: 'Strong Focus Culture',
      description: 'Your team values deep work. BEAT can help you maintain and strengthen this culture as you scale.',
      recommendations: [
        'Document your focus practices for new team members',
        'Continue protecting what\'s working',
        'Share your approach with other teams',
        'Watch for gradual erosion of focus time'
      ],
      beatPrinciple: 'Interruptions are not free. Every "quick question" costs more than it appears.'
    }
  },
  communication: {
    low: {
      title: 'Communication is Chaotic',
      description: 'Without written documentation and async practices, knowledge is lost, decisions are forgotten, and everyone stays chained to chat.',
      recommendations: [
        'Adopt a "write first" policy for all decisions',
        'Set expectation: responses within 24 working hours, not minutes',
        'Create clear channels: urgent = phone, everything else waits',
        'Replace daily standups with written async check-ins'
      ],
      beatPrinciple: 'Writing is thinking made visible. Decisions not documented did not happen.'
    },
    medium: {
      title: 'Communication Needs Structure',
      description: 'You have some good practices, but inconsistency leads to confusion about when to interrupt vs. when to wait.',
      recommendations: [
        'Define clear response time expectations',
        'Create templates for common communication (check-ins, decisions)',
        'Establish when sync communication is appropriate',
        'Build a searchable knowledge base'
      ],
      beatPrinciple: 'Synchronous time is expensive. Spend it wisely. If it can be written, write it.'
    },
    high: {
      title: 'Effective Async Communication',
      description: 'Your team communicates well asynchronously. Keep refining and documenting these practices.',
      recommendations: [
        'Mentor other teams in async practices',
        'Continuously improve documentation',
        'Maintain clear escalation paths',
        'Review and prune old documentation regularly'
      ],
      beatPrinciple: 'Response time is not reaction time. Async means responding when working, not responding immediately.'
    }
  },
  autonomy: {
    low: {
      title: 'Trust is Missing',
      description: 'Top-down control stifles creativity and ownership. Developers who can\'t make decisions become disengaged and stop innovating.',
      recommendations: [
        'Shift from assigning work to letting developers pull work',
        'Provide goals and constraints, not detailed instructions',
        'Trust makers to choose their tools and approaches',
        'Create safe space for pushing back on poorly conceived work'
      ],
      beatPrinciple: 'Trust makers to make. Those who build the thing decide how to build it.'
    },
    medium: {
      title: 'Autonomy is Inconsistent',
      description: 'Some freedom exists, but it varies. Building genuine trust requires consistent practices.',
      recommendations: [
        'Define clear boundaries: what decisions can makers own?',
        'Make "pull not push" the default for work assignment',
        'Encourage challenges and alternative proposals',
        'Remove approval bottlenecks where possible'
      ],
      beatPrinciple: 'The maker\'s "no" is valid. This is not insubordination—it is ownership.'
    },
    high: {
      title: 'High-Trust Environment',
      description: 'Your team operates with real autonomy. This is rare and valuable—protect it.',
      recommendations: [
        'Document how autonomy works for new members',
        'Guard against creeping micromanagement',
        'Share your culture openly',
        'Continue empowering individual decision-making'
      ],
      beatPrinciple: 'Pull, don\'t push. Work is not assigned. Work is pulled by those with capacity and interest.'
    }
  },
  sustainability: {
    low: {
      title: 'Burnout Risk is High',
      description: 'Regular overtime and no time for learning is a recipe for burnout, turnover, and declining quality.',
      recommendations: [
        'Plan at 80% capacity, leaving slack for life',
        'When deadlines conflict, cut scope—never cut rest',
        'Protect 20% time for learning and exploration',
        'Make overtime a red flag, not a badge of honor'
      ],
      beatPrinciple: 'Sustainable pace is not optional. Overtime is a red flag, not a badge of honor.'
    },
    medium: {
      title: 'Sustainability Needs Attention',
      description: 'You\'re managing, but there are warning signs. Building in more slack now prevents bigger problems later.',
      recommendations: [
        'Track overtime patterns and address root causes',
        'Formally protect exploration time',
        'Review capacity planning—are you over 80%?',
        'Watch for burnout warning signs'
      ],
      beatPrinciple: 'The team\'s health is the Enabler\'s responsibility. Someone must watch for warning signs.'
    },
    high: {
      title: 'Sustainable Pace Culture',
      description: 'Your team has built healthy work habits. This enables long-term high performance.',
      recommendations: [
        'Maintain your boundaries under pressure',
        'Help other teams learn sustainable practices',
        'Continue investing in learning time',
        'Celebrate sustainable delivery over heroics'
      ],
      beatPrinciple: 'Exploration time is not a reward. It is a requirement. This is how we stay sharp.'
    }
  }
}

export const overallAssessment = {
  struggling: {
    range: [12, 24],
    title: 'Significant Opportunity for Improvement',
    icon: 'fas fa-exclamation-triangle',
    color: 'red',
    description: 'Your team faces significant challenges that BEAT is designed to solve. The good news: there\'s tremendous potential for improvement.',
    callToAction: 'Start with the biggest pain point. Small changes compound over time.'
  },
  developing: {
    range: [25, 36],
    title: 'Building Better Practices',
    icon: 'fas fa-seedling',
    color: 'amber',
    description: 'Your team has some good foundations but inconsistent practices. BEAT can provide the structure to level up.',
    callToAction: 'Focus on making existing good practices consistent and documented.'
  },
  strong: {
    range: [37, 42],
    title: 'Strong Foundation',
    icon: 'fas fa-chart-line',
    color: 'blue',
    description: 'Your team already practices many BEAT principles. Formalizing them will help you scale and onboard new members.',
    callToAction: 'Document what works and share it with your organization.'
  },
  excellent: {
    range: [43, 48],
    title: 'BEAT-Ready Team',
    icon: 'fas fa-star',
    color: 'green',
    description: 'Congratulations! Your team is already aligned with BEAT principles. Consider adopting the framework formally.',
    callToAction: 'You\'re ready to fully adopt BEAT and become ambassadors for these practices.'
  }
}
