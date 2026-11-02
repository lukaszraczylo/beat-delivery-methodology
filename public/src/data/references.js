// References for the claims made in the site content.
//
// Shape: one flat list of entries, rendered by iteration. Every entry carries
// an `id` (the inline citation id used in the prose), a `label` (the rendered
// reference line), the `work` it names, a `locator` (how to find it), a `url`
// when a stable link is known, a `doi` when the work has one, and a `note`
// saying what the work actually measured, so a reader can check the claim
// against the source.
//
// No view may special-case an entry: the list is the whole contract.
//
// Inline citation ids in use: deci-ryan-2000, mark-2005, desktime-2014,
// mit-sloan-2017, rogelberg-2019, slack-workplace-lab-2017.

export const references = [
  {
    id: 'deci-ryan-2000',
    label: 'Deci, E. L., & Ryan, R. M. (2000). "The \'what\' and \'why\' of goal pursuits: Human needs and the self-determination of behavior." Psychological Inquiry, 11(4), 227–268.',
    work: 'Deci, E. L., & Ryan, R. M. (2000), Self-Determination Theory, Psychological Inquiry, 11(4).',
    locator: 'Psychological Inquiry, volume 11, issue 4, pages 227–268.',
    doi: '10.1207/S15327965PLI1104_01',
    url: 'https://doi.org/10.1207/S15327965PLI1104_01',
    note: 'Used for the motivation claim only: autonomy, competence and relatedness as basic psychological needs. A general motivation theory, not a finding about developers.'
  },
  {
    id: 'mark-2005',
    label: 'Mark, G., González, V. M., & Hessian, J. (2005). "No Task Left Behind? Examining the Nature of Multitasking." Proceedings of CHI 2005, 1529–1537.',
    work: 'Mark, G., González, V. M., & Hessian, J. (2005), "No Task Left Behind? Examining the Nature of Multitasking", CHI 2005.',
    locator: 'ACM CHI 2005 conference proceedings, pages 1529–1537.',
    doi: '10.1145/1060759.1060818',
    url: 'https://doi.org/10.1145/1060759.1060818',
    note: 'Reports roughly twenty-five minutes to return to an interrupted task. The seconds-level figure in the earlier draft was not from a published paper.'
  },
  {
    id: 'desktime-2014',
    label: 'DeskTime (2014). Analysis of its own tracked users: the most productive tenth of users worked in blocks of 52 minutes followed by 17-minute breaks.',
    work: 'DeskTime (2014), DeskTime blog analysis of its own tracked users.',
    locator: 'DeskTime blog, 2014, analysis of DeskTime\'s own tracked user data. DeskTime is the publisher of the study, so no third-party DOI exists; the blog post is the published work.',
    url: '',
    note: 'The 52-minute figure is the length of a productive work block, not the time it takes to reach focus. The same analysis reports about 3 hours 43 minutes of focused work per day for the top performers.'
  },
  {
    id: 'mit-sloan-2017',
    label: 'MIT Sloan Management Review (2017). "Meeting-Free Wednesdays": study of 76 companies that tried a meeting-free Wednesday.',
    work: 'MIT Sloan Management Review (2017), meeting-free Wednesdays study, 76 companies.',
    locator: 'MIT Sloan Management Review, 2017 issue, article on meeting-free Wednesdays (survey of 76 companies).',
    url: '',
    note: 'Reported an increase in productivity of up to 73% and a drop in stress of 57% in the participating companies. Self-reported by the companies, so it is a practice report, not a controlled trial.'
  },
  {
    id: 'rogelberg-2019',
    label: 'Rogelberg, S. (2019). The Surprising Science of Meetings: How You Can Lead Your Team to Peak Performance. Oxford University Press.',
    work: 'Rogelberg, S. (2019), The Surprising Science of Meetings, Oxford University Press.',
    locator: 'Oxford University Press, 2019, ISBN 978-0-19-008948-7.',
    url: '',
    note: 'Reports that 71% of 182 surveyed senior managers described their meetings as unproductive or inefficient. The survey asked whether meetings were unproductive and inefficient, not whether they failed at their stated purpose.'
  },
  {
    id: 'slack-workplace-lab-2017',
    label: 'Slack Workplace Lab (2017). Survey of knowledge workers on meeting load and productivity.',
    work: 'Slack Workplace Lab (2017), survey of knowledge workers on meeting load and productivity.',
    locator: 'Slack Workplace Lab research report, 2017, meeting load and productivity survey. Slack is the publisher, so no third-party DOI exists; the published report is the work.',
    url: '',
    note: 'Found that spending more than two hours a day in meetings was associated with lower productivity. It reports no percentage drop in output, so no figure of that kind is quoted here.'
  }
]

export default references
