# BEAT weak-point record

Inventory of every weak point found in `README.md` and in the site content (`public/src/data`, `public/src/views`), written before any repair, and reconciled with the repairs actually made at the branch head. Nothing in this file is fixed text; each entry states the resolution that was made — the file and section that now carries the corrected wording, the deviation from the resolution planned at audit time, and the disposition of every claim or figure that was reworded as opinion or removed.

## Reconciliation

- **Entry count:** 52 entries, unchanged — WP-01 to WP-52.
- **Category counts:** unchanged — 10 unsupported claim, 8 wrong number, 15 self-contradiction, 14 rule not applicable as written, 5 uncovered situation.
- **Reconciled against:** the branch head `de96a46`, reading `README.md` (`36d4223`), `public/src/data` (`588fb8d`, `ec83e8e`, `349af72`), `public/src/views` (`fa782d0`, `2bc9527`) as they stand.
- **What changed per entry:** the `Planned resolution` line of the audit is replaced by `Resolution made`, which names the file and section or data key that now carries the fixed text. `Deviation from plan` is present only where the repair landed somewhere other than the plan said. `Disposition` states what happened to the claim or figure — reworded, removed or added — and quotes the new wording. `Resolved position` is present on every self-contradiction entry.
- **Left as the audit wrote them:** the "Uncited claims and figures" list and the "Planned resolutions summary" table at the end of this file are kept unchanged, so the audit trail stays readable. Where an entry shows that a listed claim or a planned location no longer matches the text at the branch head, the entry says so; the list and the table were not edited to match.
- **Not reconciled here:** two wording differences between `README.md` and the site data remain open — the self-assessment band arithmetic (WP-18, WP-51) and the "one working day" / "24 working hours" wording (WP-31, WP-41). Both are recorded in the entries; neither file is owned by this record.

## How to read this record

Each entry gives:

- **Location** — file and section (or data key / view component) where the weak point sits.
- **Category** — one of: unsupported claim, wrong number, self-contradiction, uncovered situation, rule not applicable as written.
- **Original wording** — quoted verbatim from the file.
- **Resolution made** — the file and section that now carries the fixed text, as it reads at the branch head.
- **Deviation from plan** — where the repair landed somewhere other than the planned resolution said. Present only where it applies.
- **Disposition** — what happened to the claim or figure: reworded, removed or added, with the new wording quoted.
- **Resolved position** — the position the text now takes. Present on every self-contradiction entry.

Every claim and figure in scope was settled from the text itself, so each entry names the resolution that was made rather than an open question. Two differences between `README.md` and the site data are still open at the branch head and are named in their entries (WP-18 and WP-51, WP-31 and WP-41).

Categories are ordered: unsupported claim, wrong number, self-contradiction, rule not applicable as written, uncovered situation. The uncited-claims list is at the end, one line per claim or figure, including the claims expected to be reworded or removed.

---

## Unsupported claim

### WP-01 — The whole "research" list has no source

- **Location:** `README.md` — "What We Have Learned"
- **Category:** unsupported claim
- **Original wording:** "BEAT emerges from research on how developers actually work:"
- **Resolution made:** `README.md` — "What We Have Learned" now opens "Some of what follows comes from published work, with the source named. The rest is what we have seen in the teams that run BEAT — our own observations, not research findings." Each surviving claim carries a named source; mirrored in `public/src/data/manifesto.js` — `researchStats`, which now holds five entries (25 minutes [mark-2005], 52 minutes [desktime-2014], 3h 43m [desktime-2014], 71% [rogelberg-2019], 73% [mit-sloan-2017]).
- **Disposition:** reworded — the list is no longer framed as research: "Some of what follows comes from published work, with the source named. The rest is what we have seen in the teams that run BEAT — our own observations, not research findings." The site copy was reworded in the same pass: `public/src/views/HomeView.vue` — the hero prose "A software delivery methodology built for how developers actually work." and the "Our Philosophy" section, whose sentence "BEAT emerges from research on how developers actually work. We built it for these realities, not against them." framed the research list as research, were reworded — the hero now carries the computed summary "The method states ${coreValues.length} core values and ${principleCount} principles. This site reads it in ${orderedSections.length} sections, in reading order." and the page renders "What we value more", "What the research says", "The BEAT Commitment" and "Where to go next"; the `keyNumbers` cards "4hrs" and "2hrs" were removed from the page.

### WP-02 — Developer introversion stated as fact

- **Location:** `README.md` — "What We Have Learned"
- **Category:** unsupported claim
- **Original wording:** "Developers trend toward introversion and need low-stimulation focus time"
- **Resolution made:** `README.md` — "What We Have Learned": the personality claim is replaced by an observation the authors can stand behind, "developers we work with ask for long stretches of low-stimulation time", inside the paragraph that separates published work from BEAT's own observations. Not mirrored on the site, as planned.
- **Disposition:** reworded — "developers we work with ask for long stretches of low-stimulation time" (the previous "Developers trend toward introversion and need low-stimulation focus time" is gone).

### WP-03 — Self-determination theory presented as unnamed research

- **Location:** `README.md` — "What We Have Learned"
- **Category:** unsupported claim
- **Original wording:** "Autonomy, competence, and relatedness drive intrinsic motivation"
- **Resolution made:** `README.md` — Principle 7 now attributes the theory: "We give makers autonomy because autonomy, competence and relatedness are the needs that make sustained motivation possible [deci-ryan-2000] — a general motivation finding, not a result about developers." The source is listed under `README.md` — "References" with id `deci-ryan-2000`.
- **Disposition:** reworded — "autonomy, competence and relatedness are the needs that make sustained motivation possible [deci-ryan-2000] — a general motivation finding, not a result about developers."

### WP-04 — "Research shows" with no citation, twice

- **Location:** `README.md` — Principle 2, "Interruptions are not free"
- **Category:** unsupported claim
- **Original wording:** "Research shows 52 minutes to reach deep focus, 23 minutes to recover from interruption."
- **Resolution made:** `README.md` — Principle 2 now reads "Resuming interrupted work takes about twenty-five minutes [mark-2005], and the most productive users tracked by DeskTime worked in blocks of fifty-two minutes [desktime-2014]."; mirrored in `public/src/data/manifesto.js` — `principles.focus[1].description` and `researchStats`, and in `public/src/data/assessment.js` — `beatRecommendations.focus.low.description`.
- **Disposition:** reworded — "Resuming interrupted work takes about twenty-five minutes [mark-2005], and the most productive users tracked by DeskTime worked in blocks of fifty-two minutes [desktime-2014]." The closing sentence of the same paragraph, "Every \"quick question\" costs more than it appears.", was reworded in `README.md` — Principle 2 and in `public/src/data/manifesto.js` — `principles.focus[1].description`: the paragraph now opens "Interrupting someone costs more than the question appears to." and ends with "So we default to async and wait for the open window." In plain text the removed sentence was: Every "quick question" costs more than it appears.

### WP-05 — The nine limits are presented as if derived from research

- **Location:** `README.md` — "Appendix: Quick Reference" → "The Numbers"
- **Category:** unsupported claim
- **Original wording:** "| Sacred block | 4 hours daily |", "| Meetings per week | ≤2 hours total |", "| WIP per maker | 3 items |", "| Planning capacity | 80% |", "| Exploration time | 20% (1 day/beat) |", "| NOW items | Max 3-5 |", "| Review response | 4 hours |", "| Auto-proceed | 24 hours |"
- **Resolution made:** `README.md` — "Appendix: Quick Reference" → "The Numbers" now opens "Every limit below is a BEAT default chosen by the BEAT authors. None of them is a research finding"; mirrored in `public/src/data/manifesto.js` — `constraints`, which carries the same sentence above its nine rows.
- **Deviation from plan:** the planned view sections `public/src/views/FrameworkView.vue` — "The Numbers" and `public/src/views/ReferenceView.vue` — "The Numbers" do not exist at the branch head. The view mirror is now `FrameworkView.vue` — "Planning numbers" and `ReferenceView.vue` — "Constraints", and the source-of-truth sentence lives in `README.md` and in `manifesto.js` — `constraints`.
- **Disposition:** reworded — "Every limit below is a BEAT default chosen by the BEAT authors. None of them is a research finding". The limits were reworded where they were stated as findings: `README.md` — "Daily Check-in" now reads "Post once daily, when convenient, in your own working day. Two minutes. No gathering required." instead of "Post once daily, when convenient. Two minutes."; `public/src/data/manifesto.js` — `ceremonies` now reads "Creative solving, with a 10-minute exit window — a BEAT default, not a research finding" instead of "Creative solving, with 10-minute exit window"; `public/src/views/PracticesView.vue` no longer renders the "Daily Check-in" section or the `keyNumbers` cards "2 hours" / "per week total" and "1 hour" / "maximum per meeting", so those two figures now appear only as BEAT defaults under the constraints table.

### WP-06 — Suitability claims with no evidence

- **Location:** `README.md` — "Where BEAT Fits"
- **Category:** unsupported claim
- **Original wording:** "BEAT works best for:", "Remote-first or distributed teams", "Senior and mid-level developers", "Product companies", "Teams of 3-8 people", "High-trust environments", "Async-native cultures", "BEAT fits poorly for:", "Junior-heavy teams needing close guidance", "Regulated industries requiring ceremony", "Agency work with constant client sync", "Organizations unwilling to protect focus time", "BEAT can adapt for:"
- **Resolution made:** `README.md` — "Where BEAT Fits" now opens "These are the contexts we have seen BEAT used in, not a researched fit. The list records our practice; it is not a finding about what improves delivery." and its three lists are headed "BEAT has worked for us in:", "BEAT has fitted poorly in:" and "BEAT has been adapted for:"; mirrored in `public/src/data/manifesto.js` — `whereItFits` (the same note is carried in `whereItFits.note`), rendered by `public/src/views/AntiPatternsView.vue` — "Where BEAT fits".
- **Disposition:** reworded — "These are the contexts we have seen BEAT used in, not a researched fit." The list labels "BEAT works best for:", "BEAT fits poorly for:" and "BEAT can adapt for:" were replaced by the three "has worked / has fitted poorly / has been adapted" headings. The same pass removed the site-only `public/src/views/ValuesView.vue` — "Values in Action" section, whose sentence "These values are not just words on a page. They guide our daily decisions, how we interact with each other, and how we approach every piece of work. When in doubt, return to these values." claimed an effect the values cannot have; the page now renders "Core values" and "Team values", each stating the behaviour it requires.

### WP-07 — "Burnout destroys teams" stated as fact

- **Location:** `README.md` — Principle 10, "Sustainable pace is not optional"
- **Category:** unsupported claim
- **Original wording:** "Burnout destroys teams. Recovery is productive."
- **Resolution made:** `README.md` — Principle 10 now states the BEAT stance, "Overtime is a red flag, not a badge of honor. When deadlines conflict with capacity, we cut scope and we never cut rest."; mirrored in `public/src/data/manifesto.js` — `principles.sustainability[0].description`, and in `README.md` — "Burnout Prevention" → "**Plan at 80%.**".
- **Disposition:** removed — "Burnout destroys teams. Recovery is productive." was removed and replaced by "Overtime is a red flag, not a badge of honor. When deadlines conflict with capacity, we cut scope and we never cut rest."

### WP-08 — "Building in isolation produces irrelevant software"

- **Location:** `README.md` — "Customer & User Feedback"
- **Category:** unsupported claim
- **Original wording:** "Building in isolation produces irrelevant software. We stay connected to users:"
- **Resolution made:** `README.md` — "Customer & User Feedback" now opens "Work built away from users drifts away from what users need. We keep the line to users open." and closes with "**What this is not.** This is a practice the team commits to, not a researched effect on delivery." The section now has a site counterpart — `public/src/data/manifesto.js` — `customerFeedback` (see WP-50).
- **Disposition:** reworded — "Work built away from users drifts away from what users need. We keep the line to users open."

### WP-09 — "The uninterrupted mind produces the best work"

- **Location:** `README.md` — Principle 1, "Protect the focus state above all else"
- **Category:** unsupported claim
- **Original wording:** "The uninterrupted mind produces the best work."
- **Resolution made:** `README.md` — Principle 1 now reads "Sacred blocks come first, because everything else in the plan depends on them. A maker protects a focus block of four hours each working day — a BEAT default, listed in the constraints table — and chooses when it falls."; mirrored in `public/src/data/manifesto.js` — `principles.focus[0].description`, and in `public/src/data/assessment.js` — `beatRecommendations.focus.low.beatPrinciple`, which no longer carries the claim.
- **Disposition:** removed — "The uninterrupted mind produces the best work." was removed; the principle now carries the BEAT stance quoted above with the four-hour block marked as a BEAT default.

### WP-10 — Quantitative comparison of focus versus meetings

- **Location:** `README.md` — Principle 3, "Presence does not equal productivity"
- **Category:** unsupported claim
- **Original wording:** "A maker in focus for four hours outproduces a maker in meetings for eight."
- **Resolution made:** `README.md` — Principle 3 now reads "We do not measure hours worked or time online. We measure outcomes delivered. Presence is not evidence of output, so a maker is judged by what ships, not by hours spent in meetings."; mirrored in `public/src/data/manifesto.js` — `principles.focus[2].description`, and in `public/src/data/assessment.js` — `beatRecommendations.focus.medium`, whose `description` is now "You have some focus time, but it's inconsistent. With more structure, your team could recover time that interruptions now take from it."
- **Disposition:** removed — "A maker in focus for four hours outproduces a maker in meetings for eight." was removed; no hours-versus-hours comparison remains. The same wording in `public/src/data/assessment.js` — `beatRecommendations.focus.medium.description` was reworded: "With more structure, your team could recover time that interruptions now take from it." replaces "With more structure, your team could dramatically increase productivity."

---

## Wrong number

### WP-11 — "52 minutes to reach deep focus" is a different finding

- **Location:** `README.md` — Principle 2 and "What We Have Learned"
- **Category:** wrong number
- **Original wording:** "Research shows 52 minutes to reach deep focus, 23 minutes to recover from interruption." and "Deep focus requires 52 minutes to reach and 23 minutes to recover from interruption"
- **Why:** The 52-minute figure comes from DeskTime's 2014 analysis of its own users: the most productive 10% worked in 52-minute blocks followed by 17-minute breaks. It is the length of a productive work block, not the time it takes to reach focus.
- **Resolution made:** `README.md` — Principle 2 and "What We Have Learned" now state the finding as measured, "the most productive users tracked by DeskTime worked in blocks of fifty-two minutes [desktime-2014]"; mirrored in `public/src/data/manifesto.js` — `researchStats` and `principles.focus[1].description`, and in `public/src/data/assessment.js` — `beatRecommendations.focus.low.description`.
- **Disposition:** reworded — "the most productive users tracked by DeskTime worked in blocks of fifty-two minutes [desktime-2014]" (the figure is now the length of a productive block, not the time to reach focus). The same claim in `public/src/data/assessment.js` — `beatRecommendations.focus.low.description` was reworded: "Constant interruptions and meetings are undermining your team's ability to do deep work. Resuming interrupted work takes about twenty-five minutes [mark-2005], and the most productive users tracked by DeskTime worked in blocks of fifty-two minutes [desktime-2014]." — the sentence "Research shows it takes 52 minutes to reach focus and 23 minutes to recover from interruption." is gone.

### WP-12 — "23 minutes to recover" carries false precision

- **Location:** `README.md` — Principle 2 and "What We Have Learned"
- **Category:** wrong number
- **Original wording:** "23 minutes to recover from interruption"
- **Why:** The 23 minutes 15 seconds figure was given to the 2006 Gallup Business Journal in an interview; the peer-reviewed CHI 2005 paper ("No Task Left Behind?", Mark, González and Harris) reports 25 minutes 26 seconds for the same measure. The seconds-level precision is not from a published paper.
- **Resolution made:** `README.md` — Principle 2 now gives the peer-reviewed figure, "Resuming interrupted work takes about twenty-five minutes [mark-2005]"; mirrored in `public/src/data/manifesto.js` — `researchStats` and `principles.focus[1].description`, and in `public/src/data/assessment.js` — `beatRecommendations.focus.low.description`.
- **Disposition:** reworded — "Resuming interrupted work takes about twenty-five minutes [mark-2005]". The 23 minutes 15 seconds figure and its seconds-level precision were dropped.

### WP-13 — "More than two meetings per day reduces productive output to 14%" has no source

- **Location:** `README.md` — "What We Have Learned"
- **Category:** wrong number
- **Original wording:** "More than two meetings per day reduces productive output to 14%"
- **Why:** No published finding supports this. The closest real results are Slack's Workplace Lab survey (more than two *hours* a day in meetings hurts productivity, with no 14% figure), MIT Sloan's meeting-free-day study across 76 companies (up to 73% productivity gain, 57% less stress), and a Stack Overflow survey of developers (they want to decline 31% of meetings but cancel only 14% — a different quantity that reads like the source of this number).
- **Resolution made:** `README.md` — "What We Have Learned": the 14% claim was removed and replaced by the sourced meeting-free-day finding, cited to `mit-sloan-2017`; mirrored in `public/src/data/manifesto.js` — `researchStats`, which carries 73% [mit-sloan-2017] and no 14% entry.
- **Disposition:** removed — "More than two meetings per day reduces productive output to 14%" was removed; the replacement is the MIT Sloan meeting-free-day finding, 73% [mit-sloan-2017], stated as what that study measured. The same figure in `public/src/data/manifesto.js` — `researchStats[2]`, "14%" / "productive output with 2+ meetings/day", was removed with the claim it belonged to; `researchStats` now holds 25 minutes [mark-2005], 52 minutes [desktime-2014], 3h 43m [desktime-2014], 71% [rogelberg-2019] and 73% [mit-sloan-2017]. The unsourced share in `public/src/data/assessment.js` — `beatRecommendations.focus.medium.recommendations[1]`, "Audit your meeting calendar - can 50% become async?", was reworded to "Audit your meeting calendar - can half of it become async?".

### WP-14 — "Peak cognitive work capacity is approximately four hours per day" rounds a different number

- **Location:** `README.md` — "What We Have Learned"
- **Category:** wrong number
- **Original wording:** "Peak cognitive work capacity is approximately four hours per day"
- **Why:** The nearest published figure is DeskTime's ~3 hours 43 minutes of focused work per day for top performers; Slack's survey found that people would *like* four hours of focus time, which is a preference, not a capacity limit. The stated figure reads as a research finding.
- **Resolution made:** `README.md` — "What We Have Learned": the four-hour capacity claim was replaced by the DeskTime figure of 3h 43m of focused work per day for top performers, cited to `desktime-2014`; mirrored in `public/src/data/manifesto.js` — `researchStats`, which carries 3h 43m [desktime-2014].
- **Disposition:** reworded — the "approximately four hours per day" capacity claim is gone; the four-hour block survives only as a BEAT default, "a BEAT default, listed in the constraints table" (Principle 1, `constraints`). The same figure in `public/src/data/manifesto.js` — `researchStats[3]`, "4 hours" / "peak cognitive work capacity daily", was reworded to "3h 43m" / "focused work per day for the top performers tracked [desktime-2014]".

### WP-15 — "72% of meetings are ineffective at their stated purpose"

- **Location:** `README.md` — "What We Have Learned"
- **Category:** wrong number
- **Original wording:** "72% of meetings are ineffective at their stated purpose"
- **Why:** The citable figures are 71% (182 senior managers surveyed in a Harvard Business School study, reported by Rogelberg, *The Surprising Science of Meetings*, OUP 2019) and 70% (Harvard Business Review, March 2022). The survey asked whether meetings were unproductive and inefficient, not whether they were "ineffective at their stated purpose".
- **Resolution made:** `README.md` — "What We Have Learned" now gives the survey figure with its scope, "Seventy-one percent of 182 surveyed senior managers reported that meetings are unproductive and inefficient [rogelberg-2019]"; mirrored in `public/src/data/manifesto.js` — `researchStats`, which carries 71% [rogelberg-2019].
- **Disposition:** reworded — "Seventy-one percent of 182 surveyed senior managers … [rogelberg-2019]" replaces "72% of meetings are ineffective at their stated purpose", and the claim now says what the survey asked.

### WP-16 — The NOW limit is stated two ways

- **Location:** `README.md` — "Prioritization" and "Appendix: Quick Reference" → "The Numbers"
- **Category:** wrong number
- **Original wording:** "**NOW** — Critical, blocking, time-sensitive. Maximum five items." and "| NOW items | Max 3-5 |"
- **Why:** The same limit is five in one section and a three-to-five range in the other, in the same document.
- **Resolution made:** `README.md` — "Prioritization" and "Appendix: Quick Reference" → "The Numbers" now state one limit: "Maximum five items — a BEAT default, listed in the constraints table" (Prioritization) and the row "NOW items | Max 5" (The Numbers); mirrored in `public/src/data/manifesto.js` — `priorityBuckets[0].description` and `constraints`.
- **Disposition:** reworded — "Maximum five items — a BEAT default, listed in the constraints table." The "Max 3-5" range is gone.

### WP-17 — Exploration time: 20% and one day per beat cannot both hold

- **Location:** `README.md` — Principle 12 and "Appendix: Quick Reference" → "The Numbers"
- **Category:** wrong number
- **Original wording:** "Twenty percent of time belongs to the maker for learning, tooling, experiments, and interests." and "| Exploration time | 20% (1 day/beat) |"
- **Why:** One day per beat is 20% only if a beat is exactly five working days, but a beat is "flexible iterations of one to two weeks". At ten working days the same rule gives 10%.
- **Resolution made:** `README.md` — Principle 12 now states one unit, "A fifth of each maker's working time belongs to learning, tooling, experiments, and interests — a BEAT default, listed in the constraints table.", and "Appendix: Quick Reference" → "The Numbers" carries the row "Exploration time | 20% of working time"; mirrored in `public/src/data/manifesto.js` — `principles.sustainability[2].description` and `constraints`.
- **Deviation from plan:** the one-day-per-beat wording and the `public/src/views/HomeView.vue` — `keyNumbers` copy were dropped instead of being carried in a second unit; the percentage is now the only unit on both sides.
- **Disposition:** reworded — "A fifth of each maker's working time belongs to learning, tooling, experiments, and interests — a BEAT default, listed in the constraints table." The same figure in `README.md` — "Burnout Prevention" was reworded: "**Protect exploration time.** A fifth of each maker's working time, moved to the next beat and recorded when the team is busy." replaces "**Protect exploration time.** One day per beat."; the option description in `public/src/data/assessment.js` — `assessmentQuestions[11].options[3].description` was reworded: "20% of working time for exploration — a BEAT default, listed in the constraints table" replaces "20% for exploration built in".

### WP-18 — The assessment uses two different scoring thresholds

- **Location:** `public/src/data/assessment.js` — `overallAssessment` and `public/src/views/AssessmentView.vue` — `overallLevel`, `categoryScores`
- **Category:** wrong number
- **Original wording:** "range: [12, 24]", "range: [25, 36]", "range: [37, 42]", "range: [43, 48]" and "level: total <= max * 0.4 ? 'low' : total <= max * 0.7 ? 'medium' : 'high'"
- **Why:** The overall scale calls 37 of 48 (77%) "strong" and 43 of 48 (90%) "excellent", while a category is called "high" from 71% of its maximum. A team can therefore score "excellent" overall while every category reads only "high", and the two bands disagree on the same percentages.
- **Resolution made:** `public/src/data/assessment.js` — `overallAssessment.scoring` now carries one threshold set plus a separate band statement: `categoryThresholds` reads "BEAT's own scoring rule, not a research finding: a category is low below 40 percent of that category's own maximum, medium from 40 to 70 percent of it, and high above 70 percent. The four overall bands are a separate BEAT choice, stated as absolute score ranges out of 48, and are not produced by those two percentage cuts: low 12 to 24, medium 25 to 36, strong 37 to 42, high 43 to 48.", with the new `bandCuts` (12–24 "Significant Opportunity for Improvement", 25–36 "Building Better Practices", 37–42 "Strong Foundation", 43–48 "BEAT-Ready Team") and `derivation` fields; `public/src/views/AssessmentView.vue` computes the category level from one rule (`levelFor`, 0.4 and 0.7 of the category maximum) and reads the bands from `overallAssessment.scoring.bandCuts` (`bandFor`); `README.md` — "The Self-Assessment" (anchor `assessment-scoring`) states the same rule and the validity note.
- **Deviation from plan:** `README.md` — "The Self-Assessment" (line 698) still says "The same two cuts give the four overall bands", which is the false arithmetic this entry was raised about; the data side now says the bands are "a separate BEAT choice … not produced by those two percentage cuts". The README wording is outside this card's file, so the difference is recorded here rather than fixed.
- **Disposition:** reworded — the two disagreeing threshold sets are replaced by one category rule plus an explicitly separate band list.

---

## Self-contradiction

### WP-19 — Sacred blocks are absolute, then suspended by anything urgent

- **Location:** `README.md` — Principle 1 and "The BEAT Commitment", against "Incidents & Emergencies"
- **Category:** self-contradiction
- **Original wording:** "We maintain sacred blocks of four hours daily where no meetings, messages, or interruptions are permitted." and "**Protecting focus** — We will not interrupt sacred time. We will wait." against "**During incidents:**" and "Sacred blocks are suspended"
- **Why:** The principle and the commitment are absolute ("above all else", "no interruptions are permitted"); the incident carve-out is not scoped — it names no role that may suspend a block, no time box, no rotation, and it can be invoked by anyone who judges something an incident.
- **Resolution made:** `README.md` — Principle 1 now scopes the exception: "The only exception is a declared production incident: the incident lead may suspend a block, and only for the time the incident runs." and "Incidents & Emergencies" repeats it under "**During incidents:** The incident lead may suspend a sacred block, and only for the time the incident runs"; mirrored in `public/src/data/manifesto.js` — `principles.focus[0].description` and `incidentProtocol`, rendered by `public/src/views/PracticesView.vue` — "Incident protocol".
- **Resolved position:** the block is absolute except for a declared production incident, and only the incident lead may suspend it, for the duration of the incident.
- **Disposition:** reworded — "The only exception is a declared production incident: the incident lead may suspend a block, and only for the time the incident runs."

### WP-20 — "Pull, don't push" against "The Enabler sets the stack"

- **Location:** `README.md` — Principle 8 and "Prioritization"
- **Category:** self-contradiction
- **Original wording:** "Work is not assigned. Work is pulled by those with capacity and interest." and "The Enabler sets the stack. Makers may adjust with reason."
- **Why:** The Enabler ordering the stack is assignment-adjacent; who may set the stack, on what basis, and how a maker disputes the order are all undefined.
- **Resolution made:** `README.md` — Principle 8 now states "The Enabler orders the stack — priority and order, never assignment — and makers pull from the top of it. A maker may skip an item with a reason, propose an alternative, and object to the order through the dispute path in the priority rules."; mirrored in `public/src/data/manifesto.js` — `principles.autonomy[1].description` and `roles[1].description` ("they set order and capacity, never assignment").
- **Resolved position:** the Enabler orders the stack by priority and order and never assigns; the maker pulls, may skip with a reason, and objects through the dispute path.
- **Disposition:** reworded — "The Enabler orders the stack — priority and order, never assignment — and makers pull from the top of it." The site mirror was reworded in the same pass: `public/src/views/FrameworkView.vue` no longer renders the "Prioritization Buckets" heading, which named the board structure as a fixed set of buckets; the page now renders "Priority buckets" in a `PageSection`, and the bucket rules live in `manifesto.js` — `priorityBuckets`.

### WP-21 — Maker autonomy over how, against a team-owned definition of done

- **Location:** `README.md` — Principle 7 and "Definition of Done"
- **Category:** self-contradiction
- **Original wording:** "Those who build the thing decide how to build it. They choose their tools, their approach, their schedule, their collaborators." against "**The team owns this definition.** Adjust it as needed. But once agreed, honor it." with "Code reviewed by at least one other maker"
- **Why:** A maker's freedom is stated as absolute over method, while the done criteria — including a review the maker cannot satisfy alone — are owned by the team, and no path exists for a maker who disagrees with the done condition.
- **Resolution made:** `README.md` — Principle 7 now separates the two: "Method is the maker's. The done condition is the team's, and a maker who cannot meet one raises it before the work starts, not after.", and "Definition of Done" adds "If a maker cannot meet a condition, they raise it before the work starts; the team either changes the condition or the work does not start."; mirrored in `public/src/data/manifesto.js` — `principles.autonomy[0].description` and `definitionOfDone.code`.
- **Resolved position:** method belongs to the maker, the done condition to the team, and disagreement is raised before the work starts, where the team either changes the condition or the work does not start.
- **Disposition:** reworded — "Method is the maker's. The done condition is the team's, and a maker who cannot meet one raises it before the work starts, not after."

### WP-22 — The weekly meeting budget against the incident update cadence

- **Location:** `README.md` — Principle 5 and "Incidents & Emergencies"
- **Category:** self-contradiction
- **Original wording:** "We limit them to two hours per week, one hour maximum each." against "3. **Communicate** — Brief status updates every 30 minutes until resolved."
- **Why:** A sustained incident produces 30-minute updates for as long as it runs, which exceeds the weekly meeting budget and the one-hour maximum; the exception is not time-boxed and no owner is named for it.
- **Resolution made:** `README.md` — Principle 5 now names the exception, "a declared incident is the only exception", and "Incidents & Emergencies" states it with an owner and a time box: "The meeting budget does not apply during an incident; the incident lead decides when normal rules resume." plus "Status updates every half hour until the incident is stable." and "Async post-mortem within two days."; mirrored in `public/src/data/manifesto.js` — `principles.communication[1].description` and `incidentProtocol`.
- **Deviation from plan:** the incident protocol is now a step list (`incidentProtocol.steps`), not the single `incidentProtocol[2]` the plan named.
- **Resolved position:** the weekly meeting budget applies except during a declared incident, where the incident lead runs the updates and decides when normal rules resume.
- **Disposition:** reworded — "The meeting budget does not apply during an incident; the incident lead decides when normal rules resume." The same figure in `README.md` — "Incidents & Emergencies" step 5 and in `public/src/data/manifesto.js` — `incidentProtocol[4].description` was reworded: "Async post-mortem within two days. No blame. Root cause and prevention, with the action items tracked to completion." replaces "Async post-mortem within 48 hours. No blame. Root cause and prevention."

### WP-23 — "We do not assign buddies" against the onboarding buddy

- **Location:** `README.md` — "Collaboration" against "Onboarding to BEAT" → "Connector's Responsibility"
- **Category:** self-contradiction
- **Original wording:** "We do not schedule pairing. We do not mandate walkthroughs. We do not assign buddies." against "New member has a \"buddy\" for questions (informal, not mandatory pairing)"
- **Why:** The prose prohibition and the onboarding promise are in direct conflict; the parenthetical "not mandatory pairing" does not resolve it, because the issue is whether a buddy is assigned at all.
- **Resolution made:** `README.md` — "Collaboration" now reads "We do not schedule pairing. We do not mandate walkthroughs. Collaboration is initiated by those who need it. Where a team adds a mentor for a new member, that is the onboarding ramp, not a standing pairing: the mentor's time is planned capacity like any other work.", and "Onboarding to BEAT" → "What We Don't Do" keeps "Assign a mandatory buddy for months" as a negative; mirrored in `public/src/data/manifesto.js` — `onboarding` (`juniorTeams`) and `public/src/views/OnboardingView.vue`.
- **Deviation from plan:** the planned view section `public/src/views/OnboardingView.vue` — "Connector's Responsibility" was not created; the reconciliation landed in `README.md` — "Collaboration", "What We Don't Do" and "On Junior-Heavy Teams", in `manifesto.js` — `onboarding`, and in `OnboardingView.vue`. `README.md` — "Connector's Responsibility" still exists; the site data has no counterpart key for it.
- **Resolved position:** BEAT assigns no buddy; a team that adds a mentor for a new member does so as part of the onboarding ramp, and the mentor's time is planned capacity.
- **Disposition:** reworded — "Where a team adds a mentor for a new member, that is the onboarding ramp, not a standing pairing: the mentor's time is planned capacity like any other work."

### WP-24 — "Everything else waits" against auto-proceed on reviews

- **Location:** `README.md` — Principle 6, "Avoiding Chokepoints" → "Reviews", against "Definition of Done"
- **Category:** self-contradiction
- **Original wording:** "Urgent means phone call. Everything else waits." and "**Reviews:** Anyone can review. Four-hour response SLA. Auto-proceed after 24 hours if CI passes." against "Code reviewed by at least one other maker"
- **Why:** Auto-proceed after 24 hours merges code that has not been reviewed, which the definition of done forbids and the anti-pattern table lists as the fix for review blocking ("Anyone can review, auto-proceed rule"). The rule also states no exception for security-sensitive changes.
- **Resolution made:** `README.md` — "Avoiding Chokepoints" → "Reviews" now names the merge owner and the exceptions: "Auto-proceed after 24 working hours if the build passes: the author merges, or asks the Enabler to merge, once the window closes. A change with security, data-migration or billing impact, and a change to a dependency other teams consume, waits for a named reviewer and never auto-proceeds. Open review comments also stop auto-proceed: the author answers them or asks for a named reviewer.", and "Definition of Done" now reads "Code reviewed by at least one other maker, or auto-proceeded under the review rule with the exceptions in that rule named in the merge"; mirrored in `public/src/data/manifesto.js` — `definitionOfDone.code` and `decisionRules` — "Auto-proceed" and "Review response".
- **Resolved position:** auto-proceed is the exception, not the default: the build must pass, the window must close, the author or the Enabler merges, and security, data-migration, billing and cross-team dependency changes plus unanswered review comments never auto-proceed.
- **Disposition:** reworded — "Code reviewed by at least one other maker, or auto-proceeded under the review rule with the exceptions in that rule named in the merge".

### WP-25 — "Decisions not documented did not happen" against silence-as-consent

- **Location:** `README.md` — Principle 4 and Principle 9, against "Avoiding Chokepoints" → "Decisions"
- **Category:** self-contradiction
- **Original wording:** "Decisions not documented did not happen." against "**Decisions:** Post recommendation. Wait 24 hours. No objection means proceed." and "Makers may refuse work that is unethical, impossible, or poorly conceived."
- **Why:** Silence-as-consent is a decision without documentation, and a maker's silence is treated as agreement while their explicit refusal is treated as ownership — the same silence carries opposite meanings depending on who is silent.
- **Resolution made:** `README.md` — Principle 4 now requires the record: "We write by default. A decision counts only when it is written down and the record names who decided it — silence is not consent.", Principle 9 keeps refusal as ownership, "A refusal is a decision and is recorded like any other: this is not insubordination—it is ownership.", and "Avoiding Chokepoints" → "Decisions" now separates no objection from consent: "Post a recommendation naming the owner. Wait one working day. No objection means the decision is recorded and stands; silence is not consent on its own, so the record says who decided."; mirrored in `public/src/data/manifesto.js` — `principles.communication[0].description`, `principles.autonomy[2].description` and `decisionRules` — "Decisions" ("Nobody objects within 24 working hours — a BEAT default, not a research finding — and the decision is recorded.").
- **Resolved position:** a decision counts when it is written and names who decided it; silence is not consent, and a refusal is a recorded decision like any other.
- **Disposition:** reworded — "We write by default. A decision counts only when it is written down and the record names who decided it — silence is not consent."

### WP-26 — "No known defects introduced" against shipping logged defects

- **Location:** `README.md` — "Spotted Issues" against "Definition of Done"
- **Category:** self-contradiction
- **Original wording:** "**More than five minutes, not blocking?** Log it, continue. Protect your focus." and "No known defects introduced" and "\"Done\" means done—not \"done but...\" or \"done except...\""
- **Why:** A logged defect found during the work ships inside the merged item, which the done criteria forbid, and the text nowhere distinguishes "not done" from "done with a logged defect".
- **Resolution made:** `README.md` — "Spotted Issues" now says "A spotted issue that is logged as its own item does not block the work that found it, provided it is recorded before the merge.", and "Definition of Done" carries the matching criterion "No known defects introduced: a defect found during the work and logged as its own item does not block this one, provided it is recorded before the merge"; mirrored in `public/src/data/manifesto.js` — `definitionOfDone.code`.
- **Deviation from plan:** the planned view sections `public/src/views/PracticesView.vue` and `public/src/views/ReferenceView.vue` — "Spotted Issue Decision" do not exist at the branch head; the rule is carried by `README.md` — "Spotted Issues" and "Definition of Done", and by `manifesto.js` — `definitionOfDone.code`.
- **Resolved position:** a defect found during the work and logged as its own item does not block the item, provided it is recorded before the merge.
- **Disposition:** reworded — "A spotted issue that is logged as its own item does not block the work that found it, provided it is recorded before the merge." The site mirror changed in the same pass: `public/src/views/ReferenceView.vue` no longer renders the "Spotted Issue Decision" cards, whose questions "5 minutes or less?" and "More than 5 minutes?" were BEAT's own figures, and its "Incident Protocol" heading was reworded to "Incident protocol" in a `PageSection`; the rule now lives in `README.md` — "Spotted Issues" and in `manifesto.js` — `definitionOfDone.code`.

### WP-27 — Exploration work has no place on the board

- **Location:** `README.md` — Principle 12 against "The Board"
- **Category:** self-contradiction
- **Original wording:** "No justification required. No approval needed." against "ICE → LATER → NEXT → IN PROGRESS → DONE" and "Work-in-progress limit: three per maker."
- **Why:** Exploration is a standing claim on a maker's time, but the board has no lane for it and the WIP limit does not say whether exploration counts against the three items — so a maker can either exceed the limit or abandon the exploration entitlement.
- **Resolution made:** `README.md` — Principle 12 now answers the board question: "Exploration does not consume a work-in-progress slot and does not sit on the board: it is scheduled, not tracked as work.", and "Burnout Prevention" adds "**Protect exploration time.** A fifth of each maker's working time, moved to the next beat and recorded when the team is busy."; mirrored in `public/src/data/manifesto.js` — `principles.sustainability[2].description` and `decisionRules` — "Exploration time".
- **Deviation from plan:** the planned view mirror `public/src/views/FrameworkView.vue` — "The Board" was not given a separate exploration rule; the rule is carried in `README.md` — Principle 12 and "Burnout Prevention", and in `manifesto.js`.
- **Resolved position:** exploration is scheduled time, not board work: it consumes no work-in-progress slot and is moved to the next beat and recorded when the team is busy.
- **Disposition:** reworded — "Exploration does not consume a work-in-progress slot and does not sit on the board: it is scheduled, not tracked as work."

### WP-28 — "We plan at 80%" against an uncapped NOW bucket

- **Location:** `README.md` — Principle 10 against "Prioritization"
- **Category:** self-contradiction
- **Original wording:** "We plan at 80% and leave slack for life." against "**NOW** — Critical, blocking, time-sensitive. Maximum five items."
- **Why:** The bucket system has no capacity check; five critical items can exceed 80% of capacity, and the tie-break between "cut scope" and "take the work" is not stated, so capacity and priority are in unresolved conflict rather than a resolved one.
- **Resolution made:** `README.md` — Principle 10 now names the tie-break: "The capacity plan belongs to the Enabler, is set per maker for each beat at eighty percent of that maker's available working time, and says what does not fit. When a NOW item would break the plan, the deadline moves before the rest does.", and "Prioritization" states it for the bucket: "Maximum five items — a BEAT default, listed in the constraints table. When the bucket needs more than the capacity plan allows, the plan wins: the deadline moves or the scope shrinks."; mirrored in `public/src/data/manifesto.js` — `principles.sustainability[0].description`, `priorityBuckets[0].description` and `decisionRules` — "NOW bucket limit" and "Planning capacity".
- **Resolved position:** the capacity plan wins over the NOW bucket; a NOW item that breaks the plan has its deadline moved, or its scope cut.
- **Disposition:** reworded — "When the bucket needs more than the capacity plan allows, the plan wins: the deadline moves or the scope shrinks." The same table row in `README.md` — "Anti-Patterns" → "Process Anti-Patterns" was completed: "| **Permanent NOW** | Everything is urgent, always | If everything is NOW, nothing is. The Enabler returns items to NEXT until the bucket is inside its limit |" replaces "| **Permanent NOW** | Everything is urgent, always | If everything is NOW, nothing is |".

### WP-29 — Onboarding promise against "Where BEAT Fits"

- **Location:** `README.md` — "Onboarding to BEAT" against "Where BEAT Fits"
- **Category:** self-contradiction
- **Original wording:** "- Expect full productivity in week one" against "- Junior-heavy teams needing close guidance"
- **Why:** The manifesto claims BEAT fits junior-heavy teams poorly while its onboarding section promises a gradual ramp that is the only support a junior would get; neither section says which of the two wins for a junior team.
- **Resolution made:** `README.md` — "Where BEAT Fits" now states the exception in the poor-fit list, "Junior-heavy teams needing close guidance, unless the team adds a mentor alongside the BEAT ramp", and "Onboarding to BEAT" gained "On Junior-Heavy Teams"; mirrored in `public/src/data/manifesto.js` — `whereItFits.fitsPoorly` and `onboarding.juniorTeams`, rendered by `public/src/views/AntiPatternsView.vue` and `public/src/views/OnboardingView.vue`.
- **Resolved position:** BEAT fits a junior-heavy team poorly unless the team adds a mentor alongside the ramp; that is what the team must add.
- **Disposition:** reworded — "Junior-heavy teams needing close guidance, unless the team adds a mentor alongside the BEAT ramp".

---

## Rule not applicable as written

### WP-30 — "Urgent means phone call" cannot be executed

- **Location:** `README.md` — Principle 6 and "Incidents & Emergencies"
- **Category:** rule not applicable as written
- **Original wording:** "Urgent means phone call. Everything else waits." and "**Alert** — Post immediately in dedicated incident channel. Phone/page if needed."
- **Why:** No phone or paging channel is named, nobody is authorised to declare something urgent, there is no fallback when no one answers, and no rule for a maker in another time zone.
- **Resolution made:** `README.md` — Principle 6 now names the channel and the fallback: "Urgent means a phone call to the on-call rota, and the rota names the fallback when nobody answers.", and "Incidents & Emergencies" names the owner and the clock: step 1 "The on-call rota names who to call and the fallback when nobody answers.", step 2 "Someone claims ownership within fifteen minutes … and becomes the incident lead for the rest of the incident."; mirrored in `public/src/data/manifesto.js` — `principles.communication[2].description` and `incidentProtocol`, and in `public/src/data/assessment.js` — `assessmentQuestions[5].options[3].description` ("Urgent = phone, else async").
- **Resolved position:** urgent is a phone call to the on-call rota, the rota names the fallback, and whoever claims ownership within fifteen minutes becomes the incident lead.
- **Disposition:** reworded — "Urgent means a phone call to the on-call rota, and the rota names the fallback when nobody answers." The same figure in `README.md` — "Incidents & Emergencies" step 2 and in `public/src/data/manifesto.js` — `incidentProtocol[1].description` was reworded: "Someone claims ownership within fifteen minutes of the alert, and becomes the incident lead for the rest of the incident." replaces "Someone claims ownership within 15 minutes."

### WP-31 — "24 working hours" is undefined

- **Location:** `README.md` — Principle 6
- **Category:** rule not applicable as written
- **Original wording:** "We expect responses within 24 working hours."
- **Why:** "Working hours" is not defined per time zone or per working day, nobody owns the expectation, and no behaviour is stated for leave or absence. A maker in a far time zone cannot know when the clock starts.
- **Resolution made:** `README.md` — new "Working across Time Zones" (anchor `timeZones`) defines the clock: "Every rule in BEAT that counts time assumes one working day. Here is the one this team uses." with coverage hours, reference time zone and overlap hours; mirrored in `public/src/data/manifesto.js` — `timeZones` and `principles.communication[2].description` ("We expect a response within 24 working hours — the BEAT default, listed in the constraints table — counted against the coverage hours in the time-zone rules."), and in `public/src/data/assessment.js` — `assessmentQuestions[4].options[2].description` ("24 working hours — a BEAT default, listed in the constraints table").
- **Deviation from plan:** `README.md` — Principle 6 still says "We expect a response within one working day, counted against the coverage hours in the time-zone rules" (and "one working day" also appears in "Prioritization" and "Working across Time Zones"), while the data says "24 working hours". Both wordings are recorded here; the README text is outside this card's file.
- **Resolved position:** every time-based rule counts one working day defined by the team's coverage hours and reference time zone, and the expectation is 24 working hours — a BEAT default, not a research finding.
- **Disposition:** reworded — "We expect a response within 24 working hours — a BEAT default, listed in the constraints table — counted against the coverage hours in the time-zone rules." The same figure in `public/src/data/assessment.js` — `assessmentQuestions[4].options[2].description` was reworded: "24 working hours — a BEAT default, listed in the constraints table" replaces "24-hour response is acceptable", so the option and the README now state the same clock. The option list was also extended with a faster band, { value: 2, label: 'Within hours', description: 'Same-day responses expected' }, so the question offers hours, a day and longer rather than a single unsourced clock.

### WP-32 — The stale-item sweep has no trigger, owner, or exception

- **Location:** `README.md` — "The Board"
- **Category:** rule not applicable as written
- **Original wording:** "Items stale for five days return to backlog."
- **Why:** Staleness has no definition (no last-activity field on the board), no one performs the sweep, and there is no way to pin an item that is intentionally parked.
- **Resolution made:** `README.md` — "The Board" now defines staleness, the owner and the exception: "Items with no activity for five working days return to the backlog, unless the maker pins them as intentionally parked; the pin is reviewed at the next beat close, and an unpinned item returns to the backlog. The Enabler sweeps the board at each beat close."; mirrored in `public/src/data/manifesto.js` — `decisionRules` — "Stale-item sweep".
- **Deviation from plan:** the sweep landed in `decisionRules` — "Stale-item sweep", not in `constraints` as planned, and the planned `public/src/views/FrameworkView.vue` — "Stale Items" section does not exist at the branch head.
- **Resolved position:** an item with no activity for five working days returns to the backlog unless the maker pins it as intentionally parked; the pin is reviewed at the next beat close, and the Enabler sweeps the board at each beat close.
- **Disposition:** reworded — "Items with no activity for five working days return to the backlog, unless the maker pins them as intentionally parked." The site mirror changed in the same pass: `public/src/views/FrameworkView.vue` no longer renders the "Stale Items" card, whose text "Return to backlog after 5 days" stated the outcome without its trigger; the rule now lives in `manifesto.js` — `decisionRules` — "Stale-item sweep".

### WP-33 — Auto-proceed has no owner or exceptions

- **Location:** `README.md` — "Avoiding Chokepoints" → "Reviews"
- **Category:** rule not applicable as written
- **Original wording:** "**Reviews:** Anyone can review. Four-hour response SLA. Auto-proceed after 24 hours if CI passes."
- **Why:** No one is named to perform the merge, the rule says nothing about a review that raised substantive comments but was not answered, and no security-sensitive or data-migration exception is carved out.
- **Resolution made:** `README.md` — "Avoiding Chokepoints" → "Reviews" now names the merge owner, the response window and the exceptions: "Four working-hour response window, counted inside the coverage hours of the reference time zone. Auto-proceed after 24 working hours if the build passes: the author merges, or asks the Enabler to merge, once the window closes. A change with security, data-migration or billing impact, and a change to a dependency other teams consume, waits for a named reviewer and never auto-proceeds. Open review comments also stop auto-proceed: the author answers them or asks for a named reviewer."; mirrored in `public/src/data/manifesto.js` — `decisionRules` — "Review response" and "Auto-proceed", and `constraints` ("Review response | 4 working hours", "Auto-proceed | 24 working hours").
- **Deviation from plan:** the planned view sections `public/src/views/FrameworkView.vue` — "The Numbers" and `public/src/views/ReferenceView.vue` — "The Numbers" do not exist at the branch head; the rule lives in `README.md` — "Avoiding Chokepoints" → "Reviews", and in `manifesto.js` — `decisionRules`.
- **Resolved position:** the author or the Enabler merges after 24 working hours once the window closes and the build passes, except for security, data-migration, billing and cross-team dependency changes and for open review comments.
- **Disposition:** reworded — "Auto-proceed after 24 working hours if the build passes: the author merges, or asks the Enabler to merge, once the window closes."

### WP-34 — The WIP limit says what the limit is, not what to do at the limit

- **Location:** `README.md` — "The Board"
- **Category:** rule not applicable as written
- **Original wording:** "Work-in-progress limit: three per maker."
- **Why:** No owner, no stated consequence of reaching three, and no rule for a maker who is at the limit while the only remaining work is blocked.
- **Resolution made:** `README.md` — "The Board" now states the owner, the consequence and the blocked-work case: "Work-in-progress limit: three per maker. The maker stops taking new work at the limit. If the maker is blocked and every remaining item is blocked too, they say so in the check-in and the Enabler unblocks or reorders."; mirrored in `public/src/data/manifesto.js` — `decisionRules` — "Work-in-progress limit" and `constraints` ("WIP per maker | 3 items").
- **Deviation from plan:** the rule landed in `decisionRules` — "Work-in-progress limit"; the planned `public/src/views/FrameworkView.vue` — "WIP Limit" section does not exist at the branch head.
- **Resolved position:** at three items the maker stops taking new work; if the maker and every remaining item are blocked, the maker says so in the check-in and the Enabler unblocks or reorders.
- **Disposition:** reworded — "The maker stops taking new work at the limit." The site mirror changed in the same pass: `public/src/views/FrameworkView.vue` no longer renders the "WIP Limit" card, whose text "3 items per maker" gave the limit without what to do at it; the rule now lives in `manifesto.js` — `decisionRules` — "Work-in-progress limit".

### WP-35 — "We do not groom" has no scope and no exception

- **Location:** `README.md` — "Work Items"
- **Category:** rule not applicable as written
- **Original wording:** "We size with **S/M/L**, not story points. We do not groom. We do not point. We do not track velocity."
- **Why:** Three prohibitions with no scope (team-internal planning only, or every reporting obligation?) and no exception path for a team that must report to an external programme or a regulated customer.
- **Resolution made:** `README.md` — "Work Items" now states the scope and the exception: "Sizing applies to team-internal planning. A team that must report to an external programme, a regulator or a regulated customer keeps that reporting obligation and adapts the method around it."; mirrored in `public/src/data/manifesto.js` — `decisionRules` — "Sizing".
- **Deviation from plan:** the rule landed in `decisionRules` — "Sizing", not in `constraints`, and the planned `public/src/views/FrameworkView.vue` — "Work Items" section does not exist at the branch head.
- **Resolved position:** sizing applies to team-internal planning; an external reporting obligation is kept and the method is adapted around it.
- **Disposition:** reworded — "Sizing applies to team-internal planning. A team that must report to an external programme, a regulator or a regulated customer keeps that reporting obligation and adapts the method around it."

### WP-36 — "Claim files" has no mechanism

- **Location:** `README.md` — "Avoiding Chokepoints" → "Merges"
- **Category:** rule not applicable as written
- **Original wording:** "**Merges:** Merge main daily. Claim files. Keep branches short-lived."
- **Why:** "Claim files" names no mechanism (a lock, a branch-protection rule, a board column), no conflict rule, and no owner; "daily" cannot be enforced without a definition of the working day across time zones.
- **Resolution made:** `README.md` — "Avoiding Chokepoints" → "Merges" now names the mechanism and the conflict rule: "Claim files in the branch protection rule before you start; when two makers claim the same file, the earlier claim stands and the later one re-plans around it. … A day is a working day in the reference time zone."; mirrored in `public/src/data/manifesto.js` — `decisionRules` — "Claiming files", and in `technicalPractices` — "Trunk-Based Development", which carries the claim-files rule.
- **Resolved position:** files are claimed in the branch protection rule before work starts; the earlier claim stands and the later maker re-plans around it, and a day is a working day in the reference time zone.
- **Disposition:** reworded — "Claim files in the branch protection rule before you start; when two makers claim the same file, the earlier claim stands and the later one re-plans around it."

### WP-37 — "We plan at 80%" names neither a planner nor a unit

- **Location:** `README.md` — Principle 10 and "Burnout Prevention"
- **Category:** rule not applicable as written
- **Original wording:** "We plan at 80% and leave slack for life." and "**Plan at 80%.** Leave room for spotted issues, complexity, life."
- **Why:** No one is named as planning, 80% is not defined as a percentage of what (per maker, per team, per beat), and there is no instruction for what to plan first when demand exceeds capacity.
- **Resolution made:** `README.md` — Principle 10 now names the planner, the unit and the base: "The capacity plan belongs to the Enabler, is set per maker for each beat at eighty percent of that maker's available working time, and says what does not fit.", and "Burnout Prevention" repeats it: "**Plan at 80%.** The Enabler sets the capacity plan per maker for each beat, at eighty percent of that maker's available working time, and the plan says what does not fit."; mirrored in `public/src/data/manifesto.js` — `principles.sustainability[0].description`, `constraints` ("Planning capacity | 80% of available working time") and `decisionRules` — "Planning capacity".
- **Resolved position:** the Enabler plans, per maker, per beat, at eighty percent of that maker's available working time, and the plan states what does not fit.
- **Disposition:** reworded — "The capacity plan belongs to the Enabler, is set per maker for each beat at eighty percent of that maker's available working time, and says what does not fit." The same figure in `public/src/data/assessment.js` — `beatRecommendations.sustainability.medium.recommendations[2]` was reworded: "Review capacity planning—are you over 80% of your working time? (a BEAT default, listed in the constraints table)" replaces "Review capacity planning—are you over 80%?".

### WP-38 — The four-hour review SLA has no coverage hours

- **Location:** `README.md` — "Avoiding Chokepoints" → "Reviews"
- **Category:** rule not applicable as written
- **Original wording:** "Four-hour response SLA."
- **Why:** Four hours of whose day is not stated, no owner of the SLA, and the assessment instrument does not ask about review turnaround at all, so the rule is never exercised.
- **Resolution made:** `README.md` — "Avoiding Chokepoints" → "Reviews" now defines the window: "Four working-hour response window, counted inside the coverage hours of the reference time zone.", and "Working across Time Zones" defines those coverage hours and the reference time zone; mirrored in `public/src/data/manifesto.js` — `constraints` ("Review response | 4 working hours"), `decisionRules` — "Review response" and `timeZones`.
- **Resolved position:** the four-hour window is counted inside the coverage hours of the team's reference time zone, as defined in "Working across Time Zones".
- **Disposition:** reworded — "Four working-hour response window, counted inside the coverage hours of the reference time zone."

### WP-39 — "Meet team members 1:1 (async or sync, their preference)"

- **Location:** `README.md` — "Onboarding to BEAT" → "Week One: Observe"
- **Category:** rule not applicable as written
- **Original wording:** "Meet team members 1:1 (async or sync, their preference)"
- **Why:** An asynchronous 1:1 is not defined, no cadence, owner or tooling is given, and it sits against the earlier finding that the onboarding section assigns a buddy but the collaboration section forbids it.
- **Resolution made:** `README.md` — "Onboarding to BEAT" → "Week One" now names the arranger and what counts: "Meet team members one to one: the Connector or the Enabler arranges it, you choose the format and the time, and a written exchange counts as a meeting"; mirrored in `public/src/data/manifesto.js` — `onboarding.weekOne.items[4], which carries the same sentence.
- **Deviation from plan:** no recurring cadence was added; the repair names the arranger (the Connector or the Enabler), leaves the format and the time to the new member, and says that a written exchange counts as a meeting.
- **Resolved position:** the Connector or the Enabler arranges the one-to-one, the new member chooses the format and the time, and a written exchange counts as a meeting.
- **Disposition:** reworded — "Meet team members one to one: the Connector or the Enabler arranges it, you choose the format and the time, and a written exchange counts as a meeting".

### WP-40 — "We aim; we do not promise" has no path for promises already made

- **Location:** `README.md` — "Beats" against "Anti-Patterns" → "Organizational Anti-Patterns"
- **Category:** rule not applicable as written
- **Original wording:** "Beats have **goals**, not commitments. We aim; we do not promise." against "| **Stealth deadlines** | Surprise \"we promised client by Friday\" | Surface commitments before making them |"
- **Why:** The anti-pattern forbids hidden commitments, but a commitment already made to a customer — openly, by someone else — falls outside every rule; nothing says who renegotiates it or what the maker does with it.
- **Resolution made:** `README.md` — "Beats" now states the path for a commitment that already exists: "A commitment made outside the team is renegotiated by whoever made it, with the Enabler helping, and the team hears about it before the next beat starts.", and "Anti-Patterns" → "Organizational" now reads "Surface commitments before making them. A commitment already made outside the team is renegotiated by whoever made it"; mirrored in `public/src/data/manifesto.js` — `antiPatterns.organizational[1]`.
- **Deviation from plan:** the view mirror is now `public/src/views/FrameworkView.vue` — "Beats and ceremonies", which renders the data rule; no separate "Beats" view section was added.
- **Resolved position:** a commitment already made outside the team is renegotiated by whoever made it, the Enabler helps, and the team hears about it before the next beat starts.
- **Disposition:** reworded — "A commitment made outside the team is renegotiated by whoever made it, with the Enabler helping, and the team hears about it before the next beat starts." The site mirror changed in the same pass: `public/src/views/FrameworkView.vue` no longer renders the "Beats" section, whose text "We work in beats—flexible iterations of one to two weeks." gave the beat length without the source of truth; the page now renders "Beats and ceremonies", and the beat length is stated in `README.md` — "Beats" and in `manifesto.js` — `ceremonies`.

### WP-41 — "Disputes resolve async, then sync if stuck" has no timeout or fallback decider

- **Location:** `README.md` — "Prioritization"
- **Category:** rule not applicable as written
- **Original wording:** "The Enabler sets the stack. Makers may adjust with reason. Disputes resolve async, then sync if stuck."
- **Why:** "Stuck" has no time limit, no fallback decider is named for a dispute the Enabler cannot settle, and the Enabler is not excluded from being a party to the dispute.
- **Resolution made:** `README.md` — "Prioritization" now gives the timeout, the fallback and the recusal: "If nobody answers within one working day, the dispute goes to a short synchronous discussion, and the Enabler decides unless they are a party to it, in which case the team decides."; mirrored in `public/src/data/manifesto.js` — `roles[1].description` ("When they are a party to a dispute, they step out of it."), `priorityBuckets` and `decisionRules` — "Decisions" ("Nobody objects within 24 working hours — a BEAT default, not a research finding — and the decision is recorded.").
- **Deviation from plan:** the data states the wait as "24 working hours" while `README.md` says "one working day"; the same wording difference as WP-31. The README text is outside this card's file.
- **Resolved position:** a dispute waits one working day for an answer, then goes to a short synchronous discussion; the Enabler decides unless they are a party to it, in which case the team decides.
- **Disposition:** reworded — "If nobody answers within one working day, the dispute goes to a short synchronous discussion, and the Enabler decides unless they are a party to it, in which case the team decides."

### WP-42 — Two of the six done criteria are conditional, so "done" is not decidable

- **Location:** `README.md` — "Definition of Done"
- **Category:** rule not applicable as written
- **Original wording:** "Tests pass (existing and new where appropriate)" and "Deployable (or deployed, depending on team practice)" and "**The team owns this definition.** Adjust it as needed. But once agreed, honor it."
- **Why:** Two of the six criteria are conditional on team practice, the list has no owner for the "where appropriate" judgement, and no rule says what a maker does when a done condition cannot be met — while the section insists "Done" means done.
- **Resolution made:** `README.md` — "Definition of Done" now makes each criterion decidable and names who decides the conditional parts: "Tests pass: the existing suite passes, and new behaviour carries a test unless the team has agreed an exception for it, which the Enabler records"; "Code reviewed by at least one other maker, or auto-proceeded under the review rule with the exceptions in that rule named in the merge"; "Deployable: the artefact builds and runs for the team's own use, and is deployed where the team deploys its own work"; "No known defects introduced: a defect found during the work and logged as its own item does not block this one, provided it is recorded before the merge"; "If a maker cannot meet a condition, they raise it before the work starts; the team either changes the condition or the work does not start."; mirrored in `public/src/data/manifesto.js` — `definitionOfDone.code` and `decisionRules` — "Done condition".
- **Deviation from plan:** the view mirror `public/src/views/ReferenceView.vue` — "Definition of Done (Code)" exists as "Definition of done"; there is no separate code-only block in the view at the branch head.
- **Resolved position:** each criterion states its exception and who records it, the Enabler records an agreed test exception, and a condition that cannot be met is raised before the work starts, where the team changes the condition or the work does not start.
- **Disposition:** reworded — "If a maker cannot meet a condition, they raise it before the work starts; the team either changes the condition or the work does not start."

### WP-43 — The optional technical practices block has no applicability statement

- **Location:** `README.md` — "Technical Practices (Optional)"
- **Category:** rule not applicable as written
- **Original wording:** "These are not mandated. They are offered as practices that support focus, speed, and quality. Adopt what serves you. Discard what doesn't."
- **Why:** The block names no scope (whole team, one service, one repository), no decision owner, and no rule for a practice that is only partly applicable — for example mandatory automated testing with a legacy codebase that has no test harness.
- **Resolution made:** `README.md` — "Technical Practices (Optional)" now states the scope, the owner and the partial-adoption rule: "BEAT does not prescribe technical practices. These apply to one repository or service, adopted by the team that owns it. The team that owns the code decides. A practice that only partly applies … is adopted in the part that applies …"; mirrored in `public/src/data/manifesto.js` — `technicalPractices` and `practicePolicy` (scope, decidedBy, partialAdoption), rendered by `public/src/views/PracticesView.vue` — "Technical practices".
- **Resolved position:** the practices apply to one repository or service, the team that owns the code decides, and a practice that only partly applies is adopted in the part that applies.
- **Disposition:** reworded — "BEAT does not prescribe technical practices. These apply to one repository or service, adopted by the team that owns it. The team that owns the code decides." The same figure in `README.md` — "Technical Practices (Optional)" and in `public/src/data/manifesto.js` — `technicalPractices[1].description` was reworded: "Aim for PRs a reviewer can read in one sitting — a BEAT default, not a measured threshold." replaces "Aim for PRs reviewable in under 30 minutes."; `public/src/views/AntiPatternsView.vue` no longer renders the "The Fix" column of the anti-pattern tables, whose cells were BEAT's own rules with no source.

---

## Uncovered situation

### WP-44 — Incidents and on-call: the incident is covered, the rotation is not

- **Location:** `README.md` — missing section (the "Incidents & Emergencies" section covers the incident only)
- **Category:** uncovered situation
- **Original wording:** "**During incidents:**" and "Sacred blocks are suspended" and "Whoever is available helps—no \"not my job\"" and "**This is not normal work.** Incidents should be rare. If they're frequent, that's a systemic problem to solve—not a reason to abandon sustainable pace."
- **Why:** Nothing defines who is on call, how the rotation is set, how it is handed over across time zones, whether on-call work is counted inside or outside a beat, how it is compensated, or how "available" is defined when Principle 6 says "Everything else waits" and Principle 10 makes overtime a red flag. "Whoever is available" is the only availability rule, and it depends on availability never being defined. A search of `public/src/data` and `public/src/views` finds no mention of on-call, a rotation, a handover or compensation.
- **Resolution made:** `README.md` — new "The Framework" → "On-call and Incident Rotation" (anchor `onCall`) covers Rotation, Handover, Availability, Who may declare an incident, Inside or outside the beat, Compensation and Escalation; mirrored in `public/src/data/manifesto.js` — new `onCall` key, rendered by `public/src/views/PracticesView.vue` in the situations block (`const situations = [onCall, timeZones, crossTeamDependencies, measurement, customerFeedback]`).
- **Disposition:** added — the section "On-call and Incident Rotation" and the `onCall` data key, neither of which existed before.

### WP-45 — Time zones: named as a benefit, never as a condition

- **Location:** `README.md` — missing section (time zones appear only as an argument for writing)
- **Category:** uncovered situation
- **Original wording:** "Written words can be searched, referenced, and shared across time zones."
- **Why:** The manifesto calls itself remote-first and lists "Remote-first or distributed teams" as a best fit, yet never states coverage hours, what "24 working hours" means across zones, how the daily check-in works for a maker whose day has barely started, how one maker's sacred block lands on another maker's working day, how a 30-minute Beat Start is attended across zones, or how handover happens. Every time-dependent rule in the text — sacred blocks, 24 working hours, 4-hour review SLA, 24-hour auto-proceed, 5-day staleness, daily merges — assumes a single working day that does not exist for a distributed team.
- **Resolution made:** `README.md` — new "The Framework" → "Working across Time Zones" (anchor `timeZones`) states "Every rule in BEAT that counts time assumes one working day. Here is the one this team uses." with Coverage hours, Reference time zone, Overlap hours, Handover, Daily check-in, Sacred blocks and Urgent work across zones; mirrored in `public/src/data/manifesto.js` — new `timeZones` key, rendered by `public/src/views/PracticesView.vue` in the situations block.
- **Disposition:** added — the section "Working across Time Zones" and the `timeZones` data key, neither of which existed before.

### WP-46 — Onboarding: a four-week ramp with no escalation path

- **Location:** `README.md` — "Onboarding to BEAT" (gaps within an existing section)
- **Category:** uncovered situation
- **Original wording:** "### Week One: Observe", "- Expect full productivity in week one" and "New member has a \"buddy\" for questions (informal, not mandatory pairing)"
- **Why:** The section lists what happens week by week but not what happens when the ramp fails: no named artefact set a new member must read (decision log, architecture notes, the board's own history), no treatment of a new member's first review against the four-hour review SLA and the 24-hour auto-proceed rule, no statement of what a new member may decline, and no reconciliation with the "Junior-heavy teams needing close guidance" entry in "BEAT fits poorly for:" — the only guidance a junior receives is this ramp. No time-zone note applies to week one either, since the 1:1s may be asynchronous.
- **Resolution made:** `README.md` — "Onboarding to BEAT" gained four subsections: "Reading List", "Your First Review", "When the Ramp Is Not Working" (which states "You may decline work, meetings and on-call during the ramp") and "On Junior-Heavy Teams"; mirrored in `public/src/data/manifesto.js` — `onboarding` (`readingList`, `firstReview`, `escalationPath`, `juniorTeams`), rendered by `public/src/views/OnboardingView.vue`.
- **Deviation from plan:** the planned `public/src/views/PracticesView.vue` — "Collaboration" mirror was not created; the escalation path, reading list, first review and junior-team rules live in `README.md` — "Onboarding to BEAT", in `manifesto.js` — `onboarding`, and in `OnboardingView.vue`.
- **Disposition:** added — the four new "Onboarding to BEAT" subsections and the four new `onboarding` keys.

### WP-47 — Cross-team dependencies: everything stops at the team boundary

- **Location:** `README.md` — missing section
- **Category:** uncovered situation
- **Original wording:** "**Blockers:** Surface in check-in. Pull different work while waiting. Enabler escalates." and "**The Connector** maintains knowledge flow. They keep documentation current, ensure context flows between makers, and onboard new members." and "**Define interfaces first.** Agree on contracts. Work in parallel against them."
- **Why:** All escalation, all connectors and all interface agreement are intra-team. Nothing covers a dependency owned by another team, a pull-based team with no inbound queue, a shared library or platform change that blocks several teams, or how a commitment made to another team is tracked. "Enabler escalates" names no target of the escalation.
- **Resolution made:** `README.md` — new "The Framework" → "Dependencies across Teams" (anchor `crossTeamDependencies`) covers Naming the dependency, Raising it, Interfaces, Commitments to other teams, Shared foundations and When the other side does not answer; mirrored in `public/src/data/manifesto.js` — new `crossTeamDependencies` key, rendered by `public/src/views/PracticesView.vue` in the situations block.
- **Disposition:** added — the section "Dependencies across Teams" and the `crossTeamDependencies` data key, neither of which existed before. The site mirror changed in the same pass: `public/src/views/PracticesView.vue` no longer renders the "Multi-Maker Work" section, whose cards "Break vertically", "Coordinate via doc" and "Sync only when stuck" stated BEAT's own rules with no scope or owner; the rules stay in `README.md` — "Multi-Maker Work".

### WP-48 — Accountability and measurement: outcomes are promised but never defined

- **Location:** `README.md` — missing section (measurement is asserted in Principle 3 and the anti-pattern table, never specified)
- **Category:** uncovered situation
- **Original wording:** "We do not measure hours worked or time online. We measure outcomes delivered." and "| **Metric theater** | Tracking velocity, points, hours | Stop. Measure outcomes, not activity. |" and "- Burnout despite 80% planning"
- **Why:** No section states what is measured, by whom, over what window, or what happens where outcomes are not observable — support, infrastructure, research, maintenance. "Outcomes" is never defined. The anti-pattern forbids activity metrics without saying what replaces them. The warning sign "Burnout despite 80% planning" has no threshold that triggers the response it implies, and the response it names is "Discuss in Beat Close". The site's assessment instrument is a self-report with no statement of validity, so it cannot serve as the measurement mechanism either.
- **Resolution made:** `README.md` — new "The Framework" → "Accountability and Measurement" (anchor `measurement`) states "What is measured.", "Who measures.", "When.", "Window.", "**Warning signs and their thresholds.**" (overtime at the limit in two consecutive beats, WIP at the limit in two consecutive beats, the same blocker unresolved across two beats, a maker who has missed two check-ins in a row), "Not a scorecard.", "When an outcome is not observable." and "**The assessment on this site.**"; mirrored in `public/src/data/manifesto.js` — new `measurement` key, rendered by `public/src/views/PracticesView.vue` in the situations block, plus the validity note in `public/src/data/assessment.js` — `overallAssessment.validity.note` ("This is a self-report with no published validity evidence.").
- **Deviation from plan:** the four warning-sign thresholds sit in "Accountability and Measurement" → "Warning signs and their thresholds"; the "Anti-Patterns" → "When BEAT Isn't Working" list now carries the same four thresholds.
- **Disposition:** added — the section "Accountability and Measurement", the `measurement` data key and the assessment validity note.

---

## Consistency gaps between README.md and the site

### WP-49 — The site commitment list is missing one of the five commitments

- **Location:** `README.md` — "The BEAT Commitment" against `public/src/views/HomeView.vue` — `commitments`
- **Category:** self-contradiction
- **Original wording:** "**Improving always** — We will reflect each beat. We will adjust. We will find better ways." against a `commitments` array with four entries: "Protecting focus", "Defaulting to async", "Trusting makers", "Sustaining pace"
- **Why:** The site states a different commitment set from the README it claims to publish.
- **Resolution made:** `public/src/views/HomeView.vue` — `commitments` now carries all five commitments (Protecting focus, Defaulting to async, Trusting makers, Sustaining pace, Improving always), matching `README.md` — "The BEAT Commitment" (which ends "**Improving always** — We will reflect each beat. We will adjust. We will find better ways.").
- **Deviation from plan:** the fifth commitment was added in the view, as planned, but the list stayed local to `public/src/views/HomeView.vue`; no `commitments` key was added to `public/src/data`, so the README and the site still carry the list in two places.
- **Resolved position:** the site now publishes the same five commitments as the README.
- **Disposition:** added — the fifth commitment "Improving always" is now present in the site's list, so the site publishes the same five commitments as the README.

### WP-50 — "Customer & User Feedback" has no site counterpart at all

- **Location:** `README.md` — "Customer & User Feedback" against the absence of any matching site content
- **Category:** self-contradiction
- **Original wording:** "**Direct access.** Makers should have direct access to user feedback—support tickets, analytics, user interviews. Not filtered through three layers of management." and "**Regular exposure.** At least once per beat, someone on the team reviews real user feedback. Share highlights async."
- **Why:** A search of `public/src/data` and `public/src/views` finds no section, data key or view carrying this content, so the site and the README do not carry the same set of sections.
- **Resolution made:** `public/src/data/manifesto.js` — new `customerFeedback` key (id, title "Customer & User Feedback", summary "Work built away from users drifts away from what users need. We keep the line to users open.", appliesTo, decidedBy, ifItDoesNotFit and items), rendered by `public/src/views/PracticesView.vue` in the situations block; `README.md` — "Customer & User Feedback" stays as the source text.
- **Deviation from plan:** the site carries the section inside the practices situations list rather than as a standalone route section, and `customerFeedback` is a sixth situation block alongside the five the plan named.
- **Resolved position:** the site now carries the "Customer & User Feedback" content that previously existed only in the README.
- **Disposition:** added — the `customerFeedback` data key and its rendering in `PracticesView.vue`.

### WP-51 — The assessment exists on the site with no README counterpart

- **Location:** `public/src/views/AssessmentView.vue` and `public/src/data/assessment.js` against `README.md` — missing section
- **Category:** self-contradiction
- **Original wording:** "export const assessmentQuestions = [", "export const overallAssessment = {", "{{ totalScore }} / 48"
- **Why:** The site publishes a full route (`/assessment`) with 12 scored questions, four categories, per-category recommendations and four overall bands; the README has no assessment section and its "Appendix: Quick Reference" has no assessment block, so the two sides do not carry the same set of sections.
- **Resolution made:** `README.md` — new "The Self-Assessment" (anchor `assessment-scoring`) and its validity paragraph (anchor `assessment-validity`), plus the appendix block "The Self-Assessment", now describe the twelve scored questions, the four categories, the 0–4 points per question, the 48-point maximum, the category bands (low below 40% of a category maximum, medium 40–70%, high above 70%), the overall bands (low 12 to 24, medium 25 to 36, strong 37 to 42, high 43 to 48) and the statement that the assessment is a self-report with no published validity evidence; mirrored in `public/src/data/assessment.js` — `overallAssessment.scoring` and `overallAssessment.validity`, with the site route unchanged.
- **Deviation from plan:** the README section exists, but its scoring paragraph still says "The same two cuts give the four overall bands", while the data says the bands are "a separate BEAT choice … not produced by those two percentage cuts". The README wording is outside this card's file, so the difference is recorded here rather than fixed.
- **Resolved position:** both sides now describe the same instrument — twelve scored questions, four categories, 48 points maximum, one category rule and one band list — and both state that it is a self-report with no published validity evidence; only the README's derivation sentence still differs from the data.
- **Disposition:** added — the README sections "The Self-Assessment" and the appendix assessment block. The assessment copy was reworded in the same pass. In `public/src/data/assessment.js` — `overallAssessment.struggling.description`: "Your team faces significant challenges that BEAT is designed to address. The good news: there is room for real improvement here." replaces "Your team faces significant challenges that BEAT is designed to solve. The good news: there's tremendous potential for improvement."; `overallAssessment.developing.description`: "BEAT can provide the structure to build on them." replaces "BEAT can provide the structure to level up."; `overallAssessment.excellent.description`: "Your team is already aligned with BEAT principles. Consider adopting the framework formally." replaces "Congratulations! Your team is already aligned with BEAT principles. Consider adopting the framework formally."; `overallAssessment.excellent.callToAction`: "You're ready to adopt BEAT fully and to teach these practices to others." replaces "You're ready to fully adopt BEAT and become ambassadors for these practices." In `public/src/views/AssessmentView.vue` the hero subtitle "Discover how BEAT can help your team deliver better and faster." and the intro paragraph "Answer 12 quick questions about your current practices. We'll analyze your responses and show you specifically how BEAT principles can help your team." were removed, and the teaser row "3-5 min", "Anonymous" and "Instant results" was removed with them; the hero now reads "Answer a short set of questions about how your team works. Score what your team does now, not what it intends to do." and the progress line reads "Answered so far: ${answeredCount}." instead of "Answered ${answeredCount} of ${assessmentQuestions.length}."

### WP-52 — Three board rules exist only in the README prose and one view

- **Location:** `README.md` — "The Board" against `public/src/data/manifesto.js` — `constraints`
- **Category:** self-contradiction
- **Original wording:** "Work-in-progress limit: three per maker. NEXT is ordered. NOW pins to top. Items stale for five days return to backlog." against a `constraints` array holding nine entries and none of them being "NOW pins to top" or "Items stale for five days return to backlog"
- **Why:** The board rules live in README prose and in `public/src/views/FrameworkView.vue` ("WIP Limit", "Stale Items"), but the shared `constraints` structure that feeds "The Numbers" on both the framework page and the reference page carries neither the pinning rule nor the staleness rule, and the "We do not groom" rule has no entry there at all. The mapping a reader of either side builds is therefore different from the other.
- **Resolution made:** `public/src/data/manifesto.js` — the missing board rules are now shared data in `decisionRules` — "Work-in-progress limit", "Stale-item sweep", "NOW bucket limit" and "Sizing", each with appliesTo, decidedBy and ifItDoesNotFit; `constraints` carries the nine numeric limits that feed "The Numbers" on both the framework and the reference page, including "WIP per maker | 3 items", "NOW items | Max 5" and "Planning capacity | 80% of available working time".
- **Deviation from plan:** the board rules landed in `decisionRules` (fourteen rules), not in `constraints` as planned, and the planned `public/src/views/FrameworkView.vue` — "WIP Limit" and "Stale Items" sections do not exist at the branch head; the view now renders "Planning numbers" and "Decision rules".
- **Resolved position:** the WIP limit, the stale-item sweep, the NOW bucket limit and the sizing rule are the same rules on both sides, carried once in the shared data.
- **Disposition:** added — the `decisionRules` — "Work-in-progress limit", "Stale-item sweep", "NOW bucket limit" and "Sizing" rules.

---

## Uncited claims and figures

Every research claim and every figure in `README.md`, `public/src/data` and `public/src/views` that currently carries no citation, one line each. "Expect" states the planned disposition. Claims that are BEAT's own rules rather than research are marked as such — they still need an explicit source-of-truth statement (WP-05) or a citation.

### README.md — research claims

- `README.md` — "What We Have Learned": "BEAT emerges from research on how developers actually work:" — framing of the whole list as research; expect reword.
- `README.md` — "What We Have Learned": "Developers trend toward introversion and need low-stimulation focus time" — uncited; expect reword as a BEAT premise.
- `README.md` — "What We Have Learned": "Deep focus requires 52 minutes to reach and 23 minutes to recover from interruption" — uncited and wrong source; expect reword.
- `README.md` — "What We Have Learned": "More than two meetings per day reduces productive output to 14%" — uncited, no such finding; expect removal.
- `README.md` — "What We Have Learned": "Peak cognitive work capacity is approximately four hours per day" — uncited, wrong number; expect reword.
- `README.md` — "What We Have Learned": "72% of meetings are ineffective at their stated purpose" — uncited, wrong number; expect reword to the sourced figure.
- `README.md` — "What We Have Learned": "Autonomy, competence, and relatedness drive intrinsic motivation" — uncited; expect citation to Self-Determination Theory.
- `README.md` — Principle 1: "The uninterrupted mind produces the best work." — uncited claim.
- `README.md` — Principle 1: "We maintain sacred blocks of four hours daily" — BEAT's own figure.
- `README.md` — Principle 2: "Research shows 52 minutes to reach deep focus, 23 minutes to recover from interruption." — uncited and wrong source.
- `README.md` — Principle 2: "Every \"quick question\" costs more than it appears." — uncited claim, the closing sentence of the same research paragraph; expect citation or reword as a BEAT rule.
- `README.md` — Principle 3: "A maker in focus for four hours outproduces a maker in meetings for eight." — uncited quantitative claim.
- `README.md` — Principle 5: "We limit them to two hours per week, one hour maximum each." — BEAT's own figures.
- `README.md` — Principle 6: "We expect responses within 24 working hours." — BEAT's own figure; "24 working hours" is undefined (see WP-31).
- `README.md` — Principle 10: "Burnout destroys teams. Recovery is productive." — uncited claim.
- `README.md` — Principle 10: "We plan at 80% and leave slack for life." — BEAT's own figure.
- `README.md` — Principle 11: "Someone must watch for warning signs: maxed WIP, skipped check-ins, overtime patterns, withdrawal." — BEAT's own warning-sign list, unsourced; the thresholds are undefined (see WP-48).
- `README.md` — Principle 11: "Someone must shield the team from organizational noise. Someone must say \"no\" to protect \"yes.\"" — BEAT's own rule; no owner or escalation path stated.
- `README.md` — Principle 12: "Twenty percent of time belongs to the maker for learning, tooling, experiments, and interests." — BEAT's own figure.
- `README.md` — "Customer & User Feedback": "Building in isolation produces irrelevant software." — uncited claim.
- `README.md` — "Where BEAT Fits": "BEAT works best for:" and its six items ("Remote-first or distributed teams", "Senior and mid-level developers", "Product companies", "Teams of 3-8 people", "High-trust environments", "Async-native cultures") — uncited effectiveness claims.
- `README.md` — "Where BEAT Fits": "BEAT fits poorly for:" and its four items ("Junior-heavy teams needing close guidance", "Regulated industries requiring ceremony", "Agency work with constant client sync", "Organizations unwilling to protect focus time") — uncited effectiveness claims.
- `README.md` — "Where BEAT Fits": "BEAT can adapt for:" and its three items ("Incident response (see Incidents section)", "Mixed seniority (extra onboarding support)", "Larger teams (multiple BEAT teams with coordination layer)") — uncited claims.
- `README.md` — "Where BEAT Fits": "Teams of 3-8 people" — unsourced figure.

### README.md — figures and rules presented as limits

- `README.md` — "Appendix: Quick Reference" → "The Numbers": "| Sacred block | 4 hours daily |" — BEAT's own limit, no derivation stated.
- `README.md` — "Appendix: Quick Reference" → "The Numbers": "| Meetings per week | ≤2 hours total |" — BEAT's own limit.
- `README.md` — "Appendix: Quick Reference" → "The Numbers": "| Meeting duration | ≤1 hour each |" — BEAT's own limit.
- `README.md` — "Appendix: Quick Reference" → "The Numbers": "| WIP per maker | 3 items |" — BEAT's own limit.
- `README.md` — "Appendix: Quick Reference" → "The Numbers": "| Planning capacity | 80% |" — BEAT's own limit.
- `README.md` — "Appendix: Quick Reference" → "The Numbers": "| Exploration time | 20% (1 day/beat) |" — BEAT's own limit; internally inconsistent.
- `README.md` — "Appendix: Quick Reference" → "The Numbers": "| NOW items | Max 3-5 |" — BEAT's own limit; conflicts with "Maximum five items".
- `README.md` — "Appendix: Quick Reference" → "The Numbers": "| Review response | 4 hours |" — BEAT's own limit.
- `README.md` — "Appendix: Quick Reference" → "The Numbers": "| Auto-proceed | 24 hours |" — BEAT's own limit.
- `README.md` — "Prioritization": "**NOW** — Critical, blocking, time-sensitive. Maximum five items." — uncited figure; conflicts with the appendix.
- `README.md` — "The Board": "Work-in-progress limit: three per maker." — BEAT's own figure.
- `README.md` — "The Board": "Items stale for five days return to backlog." — BEAT's own figure.
- `README.md` — "The Board": "NOW pins to top." — BEAT's own rule.
- `README.md` — "Avoiding Chokepoints": "**Reviews:** Anyone can review. Four-hour response SLA. Auto-proceed after 24 hours if CI passes." — BEAT's own figures.
- `README.md` — "Avoiding Chokepoints": "**Merges:** Merge main daily." — BEAT's own rule.
- `README.md` — "Avoiding Chokepoints": "**Decisions:** Post recommendation. Wait 24 hours." — BEAT's own figure.
- `README.md` — "Incidents & Emergencies": "Someone claims ownership within 15 minutes." — BEAT's own figure.
- `README.md` — "Incidents & Emergencies": "Brief status updates every 30 minutes until resolved." — BEAT's own figure.
- `README.md` — "Incidents & Emergencies": "Async post-mortem within 48 hours." — BEAT's own figure.
- `README.md` — "Incidents & Emergencies": the four incident-qualification bullets ("Users cannot complete critical actions", "Data integrity is at risk", "Security vulnerability is being exploited", "Significant revenue or reputation impact") — uncited criteria.
- `README.md` — "Meetings": "**Two hours per week** total" and "**One hour maximum** per meeting" — BEAT's own figures.
- `README.md` — "Meetings": "**Beat Start** (30 min)", "**Beat Close** (30 min)", "**Ad-hoc Help** (≤25 min)", "**Brainstorm** (≤1 hr)" — BEAT's own figures.
- `README.md` — "Meetings": "with 10-minute exit window" — BEAT's own figure.
- `README.md` — "Burnout Prevention": "**Plan at 80%.**" — unsourced figure.
- `README.md` — "Burnout Prevention": "**Protect exploration time.** One day per beat." — unsourced figure.
- `README.md` — "Beats": "We work in **beats**—flexible iterations of one to two weeks." — BEAT's own definition; the length drives the "20% (1 day/beat)" figure.
- `README.md` — "Work Items": "**Tasks** (hours)", "**Work Items** (days)", "**Projects** (week+)" and "We size with **S/M/L**, not story points." — BEAT's own sizing bands, unsourced.
- `README.md` — "Daily Check-in": "Post once daily, when convenient. Two minutes." — BEAT's own figures.
- `README.md` — "Anti-Patterns" → "Organizational Anti-Patterns": "| **Stealth deadlines** | Surprise \"we promised client by Friday\" | Surface commitments before making them |" — the Friday deadline is illustrative, the rule is BEAT's own.
- `README.md` — "Anti-Patterns" → "Process Anti-Patterns": "| **Permanent NOW** | Everything is urgent, always | If everything is NOW, nothing is |" — uncited claim.
- `README.md` — "Technical Practices (Optional)": "Aim for PRs reviewable in under 30 minutes." — BEAT's own figure.
- `README.md` — "Onboarding to BEAT": the Week One / Week Two / Week Three ramp and the "First Month Expectations" list — BEAT's own rules, unsourced.
- `README.md` — "Spotted Issues": "**Five minutes or less?**" and "**More than five minutes, not blocking?**" — BEAT's own figures.
- `README.md` — "Customer & User Feedback": "**Regular exposure.** At least once per beat" — BEAT's own figure.
- `README.md` — "Appendix: Quick Reference" → "The Ceremonies": "Beat Start | 30 min", "Beat Close | 30 min", "Ad-hoc Help | ≤25 min", "Brainstorm | ≤1 hr" — BEAT's own figures.
- `README.md` — "Appendix: Quick Reference" → "Incident Protocol": "Acknowledge (15 min)", "Communicate (every 30 min)", "Document (within 48 hrs)" — BEAT's own figures.
- `README.md` — "Appendix: Quick Reference" → "Spotted Issue Decision": "≤5 min?" and ">5 min?" — BEAT's own figures.

### public/src/data/manifesto.js

- `manifesto.js` — `researchStats[0]`: "52 minutes" / "to reach deep focus" — uncited and wrong source.
- `manifesto.js` — `researchStats[1]`: "23 minutes" / "to recover from interruption" — uncited and false precision.
- `manifesto.js` — `researchStats[2]`: "14%" / "productive output with 2+ meetings/day" — uncited, no such finding; expect removal.
- `manifesto.js` — `researchStats[3]`: "4 hours" / "peak cognitive work capacity daily" — uncited and wrong number.
- `manifesto.js` — `researchStats[4]`: "72%" / "of meetings are ineffective" — uncited and wrong number.
- `manifesto.js` — `principles.focus[0].description`: "The uninterrupted mind produces the best work." — uncited claim.
- `manifesto.js` — `principles.focus[0].description`: "sacred blocks of four hours daily" — BEAT's own figure.
- `manifesto.js` — `principles.focus[1].description`: "Research shows 52 minutes to reach deep focus, 23 minutes to recover from interruption." — uncited and wrong source.
- `manifesto.js` — `principles.focus[1].description`: "Every \"quick question\" costs more than it appears." — uncited claim, the closing sentence of the same research paragraph; expect citation or reword as a BEAT rule.
- `manifesto.js` — `principles.focus[2].description`: "A maker in focus for four hours outproduces a maker in meetings for eight." — uncited quantitative claim.
- `manifesto.js` — `principles.communication[0].description`: "Decisions not documented did not happen." — uncited claim.
- `manifesto.js` — `principles.communication[1].description`: "two hours per week, one hour maximum each" — BEAT's own figures.
- `manifesto.js` — `principles.communication[2].description`: "responses within 24 working hours" — BEAT's own figure.
- `manifesto.js` — `principles.communication[2].description`: "Urgent means phone call." — BEAT's own rule.
- `manifesto.js` — `principles.sustainability[0].description`: "Burnout destroys teams. Recovery is productive." — uncited claim.
- `manifesto.js` — `principles.sustainability[0].description`: "We plan at 80% and leave slack for life." — unsourced figure.
- `manifesto.js` — `principles.sustainability[2].description`: "Twenty percent of time belongs to the maker" — unsourced figure.
- `manifesto.js` — `constraints`: all nine entries ("4 hours daily", "≤2 hours total", "≤1 hour each", "3 items", "80%", "20% (1 day/beat)", "Max 3-5", "4 hours", "24 hours") — uncited figures.
- `manifesto.js` — `priorityBuckets[0].description`: "Maximum five items." — uncited figure; conflicts with `constraints` "Max 3-5".
- `manifesto.js` — `ceremonies`: "30 min", "30 min", "≤25 min", "≤1 hr" and "with 10-minute exit window" — BEAT's own figures.
- `manifesto.js` — `definitionOfDone.code`: "Tests pass (existing and new where appropriate)" and "Deployable (or deployed, depending on team practice)" — conditional criteria, no source.
- `manifesto.js` — `incidentProtocol[1].description`: "Someone claims ownership within 15 minutes." — BEAT's own figure.
- `manifesto.js` — `incidentProtocol[2].description`: "Brief status updates every 30 minutes until resolved." — BEAT's own figure.
- `manifesto.js` — `incidentProtocol[4].description`: "Async post-mortem within 48 hours." — BEAT's own figure.
- `manifesto.js` — `technicalPractices[1].description`: "Aim for PRs reviewable in under 30 minutes." — BEAT's own figure.
- `manifesto.js` — `whereItFits.worksFor`: all six suitability claims — uncited.
- `manifesto.js` — `whereItFits.fitsPoorly`: all four suitability claims — uncited.
- `manifesto.js` — `whereItFits.canAdapt`: all three suitability claims — uncited.
- `manifesto.js` — `onboarding.weekOne.items[4]`: "Meet team members 1:1 (async or sync, their preference)" — BEAT's own rule.
- `manifesto.js` — `antiPatterns.organizational[1]`: "Surface commitments before making them" — BEAT's own rule.
- `manifesto.js` — `antiPatterns.process[3]`: "If everything is NOW, nothing is" — uncited claim.
- `manifesto.js` — `antiPatterns.people[3].fix`: "Anyone can review, auto-proceed rule" — BEAT's own rule.

### public/src/data/assessment.js

- `assessment.js` — `beatRecommendations.focus.low.description`: "Research shows it takes 52 minutes to reach focus and 23 minutes to recover from interruption." — uncited and wrong source.
- `assessment.js` — `beatRecommendations.focus.low.recommendations[0]`: "Establish 4-hour daily sacred blocks" — BEAT's own figure.
- `assessment.js` — `beatRecommendations.focus.low.recommendations[1]`: "Limit meetings to 2 hours per week maximum" — BEAT's own figure.
- `assessment.js` — `beatRecommendations.focus.medium.recommendations[1]`: "Audit your meeting calendar - can 50% become async?" — unsourced figure.
- `assessment.js` — `beatRecommendations.focus.low.beatPrinciple`: "The uninterrupted mind produces the best work." — uncited claim.
- `assessment.js` — `beatRecommendations.focus.medium.beatPrinciple`: "A maker in focus for four hours outproduces a maker in meetings for eight." — uncited quantitative claim.
- `assessment.js` — `beatRecommendations.communication.low.recommendations[1]`: "Set expectation: responses within 24 working hours, not minutes" — BEAT's own figure.
- `assessment.js` — `beatRecommendations.communication.low.recommendations[2]`: "Create clear channels: urgent = phone, everything else waits" — BEAT's own rule.
- `assessment.js` — `beatRecommendations.sustainability.low.recommendations[0]`: "Plan at 80% capacity, leaving slack for life" — unsourced figure.
- `assessment.js` — `beatRecommendations.sustainability.low.recommendations[2]`: "Protect 20% time for learning and exploration" — unsourced figure.
- `assessment.js` — `beatRecommendations.sustainability.medium.recommendations[2]`: "Review capacity planning—are you over 80%?" — unsourced figure.
- `assessment.js` — `assessmentQuestions[0].question`: "How often do you get uninterrupted blocks of 2+ hours for focused work?" and its option descriptions — BEAT's own thresholds, unsourced.
- `assessment.js` — `assessmentQuestions[1].question`: "How many meetings do you have in a typical week?" with the "10+ hours", "5-10 hours", "2-5 hours", "Under 2 hours" bands — BEAT's own bands, unsourced.
- `assessment.js` — `assessmentQuestions[4].options[2].description`: "24-hour response is acceptable" — BEAT's own figure; the README says "24 working hours", so the two differ.
- `assessment.js` — `assessmentQuestions[11].options[3].description`: "20% for exploration built in" — unsourced figure.
- `assessment.js` — `assessmentQuestions[2]`, `assessmentQuestions[6]`, `assessmentQuestions[7]`, `assessmentQuestions[8]`, `assessmentQuestions[9]`, `assessmentQuestions[10]`: their option sets ("Hours worked / time online", "Pull-based", "Cut scope", …) — BEAT's own scales, unsourced and not tied to the twelve principles.
- `assessment.js` — `overallAssessment`: the ranges [12, 24], [25, 36], [37, 42], [43, 48] — BEAT's own bands, no stated derivation.
- `assessment.js` — `overallAssessment.struggling.description`: "Your team faces significant challenges that BEAT is designed to solve. The good news: there's tremendous potential for improvement." — uncited effectiveness claim; expect reword ("tremendous" is also marketing language).
- `assessment.js` — `overallAssessment.developing.description`: "BEAT can provide the structure to level up." — uncited effectiveness claim; expect reword.
- `assessment.js` — `overallAssessment.strong.description`: "Formalizing them will help you scale and onboard new members." — uncited effectiveness claim; expect reword.
- `assessment.js` — `overallAssessment.excellent.description`: "Congratulations! Your team is already aligned with BEAT principles. Consider adopting the framework formally." — uncited claim; "Congratulations!" is also marketing language.
- `assessment.js` — `overallAssessment.*.callToAction`: the four call-to-action strings ("Start with the biggest pain point. Small changes compound over time.", "Focus on making existing good practices consistent and documented.", "Document what works and share it with your organization.", "You're ready to fully adopt BEAT and become ambassadors for these practices.") — BEAT's own advice, uncited.
- `assessment.js` — `assessmentQuestions[5].options[3].description`: "Clear escalation path" / "Urgent = phone, else async" — BEAT's own rule.
- `assessment.js` — `beatRecommendations.*.title`: the twelve band titles ("Your Focus is Under Attack", "Focus Needs Protection", "Strong Focus Culture", "Communication is Chaotic", "Communication Needs Structure", "Effective Async Communication", "Trust is Missing", "Autonomy is Inconsistent", "High-Trust Environment", "Burnout Risk is High", "Sustainability Needs Attention", "Sustainable Pace Culture") — twelve copy strings, uncited, no source needed beyond the source-of-truth statement (WP-05).
- `assessment.js` — `beatRecommendations.focus.medium.description`: "With more structure, your team could dramatically increase productivity." — uncited effectiveness claim; expect reword.
- `assessment.js` — `beatRecommendations.communication.medium.beatPrinciple`: "Synchronous time is expensive. Spend it wisely. If it can be written, write it." — mirrors README Principle 5, unsourced.
- `assessment.js` — `beatRecommendations.communication.high.beatPrinciple`: "Response time is not reaction time. Async means responding when working, not responding immediately." — mirrors README Principle 6, unsourced.
- `assessment.js` — `beatRecommendations.autonomy.low.beatPrinciple`: "Trust makers to make. Those who build the thing decide how to build it." — mirrors README Principle 7, unsourced.
- `assessment.js` — `beatRecommendations.autonomy.medium.beatPrinciple`: "The maker's \"no\" is valid. This is not insubordination—it is ownership." — mirrors README Principle 9, unsourced.
- `assessment.js` — `beatRecommendations.autonomy.high.beatPrinciple`: "Pull, don't push. Work is not assigned. Work is pulled by those with capacity and interest." — mirrors README Principle 8, unsourced.
- `assessment.js` — `beatRecommendations.sustainability.medium.beatPrinciple`: "The team's health is the Enabler's responsibility. Someone must watch for warning signs." — mirrors README Principle 11, unsourced.
- `assessment.js` — `beatRecommendations.sustainability.high.beatPrinciple`: "Exploration time is not a reward. It is a requirement. This is how we stay sharp." — mirrors README Principle 12, unsourced.
- `assessment.js` — `beatRecommendations.sustainability.low.beatPrinciple`: "Sustainable pace is not optional. Overtime is a red flag, not a badge of honor." — mirrors README Principle 10, unsourced.
- `assessment.js` — `beatRecommendations.focus.high.description`: "Your team values deep work. BEAT can help you maintain and strengthen this culture as you scale." — uncited effectiveness claim; expect reword.
- `assessment.js` — `beatRecommendations.focus.high.beatPrinciple`: "Interruptions are not free. Every \"quick question\" costs more than it appears." — uncited claim, the closing sentence of the same research paragraph as README Principle 2.
- `assessment.js` — `beatRecommendations.communication.low.description`: "Without written documentation and async practices, knowledge is lost, decisions are forgotten, and everyone stays chained to chat." — uncited claim; expect citation.
- `assessment.js` — `beatRecommendations.communication.low.beatPrinciple`: "Writing is thinking made visible. Decisions not documented did not happen." — uncited claim, mirrors README Principle 5.
- `assessment.js` — `beatRecommendations.communication.medium.description`: "You have some good practices, but inconsistency leads to confusion about when to interrupt vs. when to wait." — uncited claim; expect citation.
- `assessment.js` — `beatRecommendations.communication.high.description`: "Your team communicates well asynchronously. Keep refining and documenting these practices." — uncited effectiveness claim; expect reword.
- `assessment.js` — `beatRecommendations.autonomy.low.description`: "Top-down control stifles creativity and ownership. Developers who can't make decisions become disengaged and stop innovating." — uncited claim; expect citation.
- `assessment.js` — `beatRecommendations.autonomy.medium.description`: "Some freedom exists, but it varies. Building genuine trust requires consistent practices." — uncited claim; expect citation.
- `assessment.js` — `beatRecommendations.autonomy.high.description`: "Your team operates with real autonomy. This is rare and valuable—protect it." — uncited claim; expect citation.
- `assessment.js` — `beatRecommendations.sustainability.low.description`: "Regular overtime and no time for learning is a recipe for burnout, turnover, and declining quality." — uncited claim; expect citation.
- `assessment.js` — `beatRecommendations.sustainability.medium.description`: "You're managing, but there are warning signs. Building in more slack now prevents bigger problems later." — uncited claim; expect citation.
- `assessment.js` — `beatRecommendations.sustainability.high.description`: "Your team has built healthy work habits. This enables long-term high performance." — uncited effectiveness claim; expect reword.
- `assessment.js` — `beatRecommendations.*.description`: the twelve band descriptions (all listed above) — twelve copy strings, uncited, no source needed beyond the source-of-truth statement (WP-05).
- `assessment.js` — `beatRecommendations.*.beatPrinciple`: the twelve band principle lines (all listed above) — twelve copy strings, uncited, no source needed beyond the source-of-truth statement (WP-05).
- `assessment.js` — `overallAssessment.*.title`: the four overall band titles ("Significant Opportunity for Improvement", "Building Better Practices", "Strong Foundation", "BEAT-Ready Team") — four copy strings, uncited, no source needed beyond the source-of-truth statement (WP-05).

### public/src/views

- `HomeView.vue` — hero prose: "A software delivery methodology built for how developers actually work." — uncited effectiveness claim.
- `HomeView.vue` — "Our Philosophy": "BEAT emerges from research on how developers actually work. We built it for these realities, not against them." — uncited framing of the `researchStats` block as research.
- `HomeView.vue` — "Our Philosophy": the five rendered `researchStats` values ("52 minutes", "23 minutes", "14%", "4 hours", "72%") — uncited figures, three wrong.
- `HomeView.vue` — `keyNumbers`: "4hrs", "2hrs", "80%", "20%" — BEAT's own figures shown without attribution.
- `HomeView.vue` — `commitments`: "We will not interrupt sacred time. We will wait." — the absolute form of the principle that the incident carve-out suspends.
- `FrameworkView.vue` — "The Numbers": the nine `constraints` rows — uncited figures.
- `FrameworkView.vue` — "WIP Limit": "3 items per maker" — BEAT's own figure.
- `FrameworkView.vue` — "Stale Items": "Return to backlog after 5 days" — BEAT's own figure.
- `FrameworkView.vue` — "Work Items": "We do not groom. We do not point. We do not track velocity." — BEAT's own prohibitions, unscoped.
- `FrameworkView.vue` — "Beats": "We work in beats—flexible iterations of one to two weeks." — BEAT's own definition.
- `FrameworkView.vue` — "Roles": "The Enabler ... maintain the priority stack" against "Work is not assigned" — the contradiction in site prose.
- `PracticesView.vue` — "Collaboration": "We do not schedule pairing. We do not mandate walkthroughs. We do not assign buddies." — conflicts with the onboarding buddy.
- `PracticesView.vue` — "Meetings": the ceremony durations "30 min", "30 min", "≤25 min", "≤1 hr" — BEAT's own figures.
- `PracticesView.vue` — "Daily Check-in": "Post once daily, when convenient. Two minutes." — BEAT's own figures.
- `PracticesView.vue` — "Technical Practices": "Aim for PRs reviewable in under 30 minutes" — BEAT's own figure.
- `PracticesView.vue` — "Multi-Maker Work": "Break vertically", "Define interfaces first", "Coordinate via doc", "Sync only when stuck" — BEAT's own rules, no scope or owner stated.
- `ValuesView.vue` — "Values in Action": "These values are not just words on a page." — uncited claim about the effect of the values.
- `PracticesView.vue` — "Incidents & Emergencies": "Someone claims ownership within 15 minutes", "Brief status updates every 30 minutes until resolved", "Async post-mortem within 48 hours", "Sacred blocks are suspended" — BEAT's own figures and the unscoped exception.
- `PracticesView.vue` — "Definition of Done": "Tests pass (existing and new where appropriate)" and "Deployable (or deployed, depending on team practice)" — conditional criteria.
- `PracticesView.vue` — "Technical Practices": "Aim for PRs reviewable in under 30 minutes" — BEAT's own figure.
- `ReferenceView.vue` — "The Numbers": the nine `constraints` rows — uncited figures.
- `ReferenceView.vue` — "Definition of Done (Code)": the six rendered `definitionOfDone.code` items, including "Tests pass (existing and new where appropriate)" and "Deployable (or deployed, depending on team practice)" — conditional criteria rendered with no source.
- `README.md` — "Appendix: Quick Reference" → "Definition of Done": the trimmed block ("✓ Tests pass", "✓ Deployable", "✓ No known defects") — the conditions of the full wording are dropped here, so the appendix states a looser criterion than the body of the README.
- `ReferenceView.vue` — "Incident Protocol": "Acknowledge (15 min)", "Communicate (every 30 min)", "Document (within 48 hrs)" — BEAT's own figures.
- `ReferenceView.vue` — "Spotted Issue Decision": "5 minutes or less?" and "More than 5 minutes?" — BEAT's own figures.
- `AntiPatternsView.vue` — "Where BEAT Fits": the six, four and three suitability claims — uncited.
- `AssessmentView.vue` — the assessment teaser row: "3-5 min" (time to complete), "Anonymous" and "Instant results" — BEAT's own figures and claims, unsourced and unverified.
- `AssessmentView.vue` — "{{ totalScore }} / 48" and the four band titles — BEAT's own bands, no stated derivation.
- `AssessmentView.vue` — `categoryScores` thresholds (0.4 / 0.7) — unsourced thresholds that disagree with `overallAssessment` (see WP-18).
- `AntiPatternsView.vue` — "When BEAT Isn't Working": "Burnout despite 80% planning" — the same unsourced 80% figure as the README, and no threshold behind it (see WP-48).
- `AntiPatternsView.vue` — the four anti-pattern tables rendered from `manifesto.js` — `antiPatterns` — each "The Fix" cell is BEAT's own rule with no source.
- `PracticesView.vue` — "Meetings": `meetingLimits` "2 hours" / "per week total" and "1 hour" / "maximum per meeting" — BEAT's own figures.
- `OnboardingView.vue` — "Connector's Responsibility": "New member has a \"buddy\" for questions (informal, not mandatory pairing)" — conflicts with the collaboration rule.
- `OnboardingView.vue` — the four week blocks and "First Month Expectations" — BEAT's own rules, unsourced.
- `AssessmentView.vue` — the hero subtitle: "Discover how BEAT can help your team deliver better and faster." — uncited effectiveness claim; expect reword.
- `AssessmentView.vue` — the intro paragraph: "Answer 12 quick questions about your current practices. We'll analyze your responses and show you specifically how BEAT principles can help your team." — uncited effectiveness claim and the "12 quick questions" figure (the assessment holds 12 questions, but the count is BEAT's own, not sourced).

### Consistency items that carry no figure but break the citation pass

- `README.md` — "Where BEAT Fits" has no site counterpart list of the same size; `AntiPatternsView.vue` renders it from `manifesto.js` — `whereItFits` (see WP-50).
- `README.md` — "Customer & User Feedback" is absent from `public/src/data` and `public/src/views` entirely (see WP-50).
- `public/src/views/AssessmentView.vue` and `public/src/data/assessment.js` have no README counterpart (see WP-51).

---

## Planned resolutions summary

Each planned resolution names the file and the section or data key that will carry the corrected text, so the repair card can work from this record directly.

| Weak point | README section | Site data key | Site view |
|---|---|---|---|
| WP-01, WP-02, WP-03, WP-11–WP-15 | "What We Have Learned" | `researchStats` | `HomeView.vue` — "Our Philosophy" |
| WP-04, WP-09, WP-10 | Principles 1, 2, 3 | `principles.focus` | `PrinciplesView.vue` |
| WP-05, WP-16, WP-17, WP-37 | "Appendix: Quick Reference" → "The Numbers" | `constraints`, `priorityBuckets` | `FrameworkView.vue` — "The Numbers", `ReferenceView.vue` — "The Numbers" |
| WP-06 | "Where BEAT Fits" | `whereItFits` | `AntiPatternsView.vue` — "Where BEAT Fits" |
| WP-07 | Principle 10 | `principles.sustainability` | `PrinciplesView.vue` |
| WP-08 | "Customer & User Feedback" | new `customerFeedback` | new site section |
| WP-19, WP-22 | "Incidents & Emergencies" | `incidentProtocol`, `principles` | `PracticesView.vue` — "Incidents & Emergencies" |
| WP-20, WP-41 | "Prioritization" | `priorityBuckets`, `roles` | `FrameworkView.vue` — "Prioritization Buckets" |
| WP-21, WP-42 | "Definition of Done" | `definitionOfDone.code` | `PracticesView.vue` — "Definition of Done", `ReferenceView.vue` — "Definition of Done (Code)" |
| WP-23, WP-39, WP-46 | "Onboarding to BEAT" | `onboarding` | `OnboardingView.vue`, `PracticesView.vue` — "Collaboration" |
| WP-24, WP-25, WP-26, WP-32–WP-36, WP-38, WP-43 | "Avoiding Chokepoints", "The Board", "Spotted Issues", "Work Items", "Technical Practices (Optional)" | `constraints`, `technicalPractices`, `definitionOfDone.code` | `FrameworkView.vue`, `PracticesView.vue`, `ReferenceView.vue` |
| WP-27, WP-28 | Principle 12, Principle 10, "The Board" | `principles.sustainability`, `constraints` | `FrameworkView.vue` — "The Board" |
| WP-29 | "Where BEAT Fits", "Onboarding to BEAT" | `whereItFits.fitsPoorly`, `onboarding` | `AntiPatternsView.vue`, `OnboardingView.vue` |
| WP-30, WP-31 | Principle 6 | `principles.communication`, `incidentProtocol` | `AssessmentView.vue` |
| WP-18 | new README assessment section | `overallAssessment` | `AssessmentView.vue` — `categoryScores`, `overallLevel` |
| WP-40 | "Beats" | `antiPatterns.organizational` | `FrameworkView.vue` — "Beats" |
| WP-44 | new "On-call and incident rotation" | new `onCall` | `PracticesView.vue` |
| WP-45 | new "Working across time zones" | new `timeZones` | `PracticesView.vue` |
| WP-47 | new "Dependencies across teams" | new `crossTeamDependencies` | `PracticesView.vue` |
| WP-48 | new "Accountability and measurement" | new `measurement` | `PracticesView.vue` |
| WP-49–WP-52 | "The BEAT Commitment", "Customer & User Feedback", "The Board", new assessment section | `commitments` (`HomeView.vue`), `customerFeedback`, `constraints` | `HomeView.vue`, `AssessmentView.vue` |
