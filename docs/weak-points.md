# BEAT weak-point record

Inventory of every weak point found in `README.md` and in the site content (`public/src/data`, `public/src/views`), written before any repair. Nothing in this file is fixed text; each entry states the planned resolution — the file and section that will carry the corrected wording.

## How to read this record

Each entry gives:

- **Location** — file and section (or data key / view component) where the weak point sits.
- **Category** — one of: unsupported claim, wrong number, self-contradiction, uncovered situation, rule not applicable as written.
- **Original wording** — quoted verbatim from the file.
- **Planned resolution** — the file and section that will carry the fixed text.

Entries marked **unresolved** are passages whose intent could not be settled from the text alone; they are listed so the repair card can decide them.

Categories are ordered: unsupported claim, wrong number, self-contradiction, rule not applicable as written, uncovered situation. The uncited-claims list is at the end, one line per claim or figure, including the claims expected to be reworded or removed.

---

## Unsupported claim

### WP-01 — The whole "research" list has no source

- **Location:** `README.md` — "What We Have Learned"
- **Category:** unsupported claim
- **Original wording:** "BEAT emerges from research on how developers actually work:"
- **Planned resolution:** `README.md` — "What We Have Learned": name the sources behind each surviving claim and reword the rest as BEAT's own observations; mirrored in `public/src/data/manifesto.js` — `researchStats`, and `public/src/views/HomeView.vue` — "Our Philosophy".

### WP-02 — Developer introversion stated as fact

- **Location:** `README.md` — "What We Have Learned"
- **Category:** unsupported claim
- **Original wording:** "Developers trend toward introversion and need low-stimulation focus time"
- **Planned resolution:** `README.md` — "What We Have Learned": the personality evidence is mixed (MBTI-based studies show a modest skew, other studies find no difference), so reword as an explicit BEAT premise or cite the specific study; not mirrored on the site.

### WP-03 — Self-determination theory presented as unnamed research

- **Location:** `README.md` — "What We Have Learned"
- **Category:** unsupported claim
- **Original wording:** "Autonomy, competence, and relatedness drive intrinsic motivation"
- **Planned resolution:** `README.md` — "What We Have Learned": attribute to Self-Determination Theory (Deci and Ryan) and state that it is a general motivation theory, not a developer-specific finding.

### WP-04 — "Research shows" with no citation, twice

- **Location:** `README.md` — Principle 2, "Interruptions are not free"
- **Category:** unsupported claim
- **Original wording:** "Research shows 52 minutes to reach deep focus, 23 minutes to recover from interruption."
- **Planned resolution:** `README.md` — Principle 2: attach a citation, or reword; mirrored in `public/src/data/manifesto.js` — `principles.focus[1].description` and `public/src/data/assessment.js` — `beatRecommendations.focus.low.description`.

### WP-05 — The nine limits are presented as if derived from research

- **Location:** `README.md` — "Appendix: Quick Reference" → "The Numbers"
- **Category:** unsupported claim
- **Original wording:** "| Sacred block | 4 hours daily |", "| Meetings per week | ≤2 hours total |", "| WIP per maker | 3 items |", "| Planning capacity | 80% |", "| Exploration time | 20% (1 day/beat) |", "| NOW items | Max 3-5 |", "| Review response | 4 hours |", "| Auto-proceed | 24 hours |"
- **Planned resolution:** `README.md` — "Appendix: Quick Reference" → "The Numbers": state that these are BEAT's own defaults; mirrored in `public/src/data/manifesto.js` — `constraints`, `public/src/views/FrameworkView.vue` — "The Numbers", `public/src/views/ReferenceView.vue` — "The Numbers".

### WP-06 — Suitability claims with no evidence

- **Location:** `README.md` — "Where BEAT Fits"
- **Category:** unsupported claim
- **Original wording:** "BEAT works best for:", "Remote-first or distributed teams", "Senior and mid-level developers", "Product companies", "Teams of 3-8 people", "High-trust environments", "Async-native cultures", "BEAT fits poorly for:", "Junior-heavy teams needing close guidance", "Regulated industries requiring ceremony", "Agency work with constant client sync", "Organizations unwilling to protect focus time", "BEAT can adapt for:"
- **Planned resolution:** `README.md` — "Where BEAT Fits": reword as observed practice rather than a research-backed fit, or cite; mirrored in `public/src/data/manifesto.js` — `whereItFits`, rendered by `public/src/views/AntiPatternsView.vue` — "Where BEAT Fits".

### WP-07 — "Burnout destroys teams" stated as fact

- **Location:** `README.md` — Principle 10, "Sustainable pace is not optional"
- **Category:** unsupported claim
- **Original wording:** "Burnout destroys teams. Recovery is productive."
- **Planned resolution:** `README.md` — Principle 10: cite occupational-health evidence or reword as the BEAT stance; mirrored in `public/src/data/manifesto.js` — `principles.sustainability[0].description`.

### WP-08 — "Building in isolation produces irrelevant software"

- **Location:** `README.md` — "Customer & User Feedback"
- **Category:** unsupported claim
- **Original wording:** "Building in isolation produces irrelevant software. We stay connected to users:"
- **Planned resolution:** `README.md` — "Customer & User Feedback": cite or reword as opinion. This section has no site counterpart at all — see WP-48.

### WP-09 — "The uninterrupted mind produces the best work"

- **Location:** `README.md` — Principle 1, "Protect the focus state above all else"
- **Category:** unsupported claim
- **Original wording:** "The uninterrupted mind produces the best work."
- **Planned resolution:** `README.md` — Principle 1: cite the focus research or reword as a BEAT principle; mirrored in `public/src/data/manifesto.js` — `principles.focus[0].description` and `public/src/data/assessment.js` — `beatRecommendations.focus.low.beatPrinciple`.

### WP-10 — Quantitative comparison of focus versus meetings

- **Location:** `README.md` — Principle 3, "Presence does not equal productivity"
- **Category:** unsupported claim
- **Original wording:** "A maker in focus for four hours outproduces a maker in meetings for eight."
- **Planned resolution:** `README.md` — Principle 3: reword as the BEAT assumption it is, or cite; mirrored in `public/src/data/manifesto.js` — `principles.focus[2].description` and `public/src/data/assessment.js` — `beatRecommendations.focus.medium.beatPrinciple`.

---

## Wrong number

### WP-11 — "52 minutes to reach deep focus" is a different finding

- **Location:** `README.md` — Principle 2 and "What We Have Learned"
- **Category:** wrong number
- **Original wording:** "Research shows 52 minutes to reach deep focus, 23 minutes to recover from interruption." and "Deep focus requires 52 minutes to reach and 23 minutes to recover from interruption"
- **Why:** The 52-minute figure comes from DeskTime's 2014 analysis of its own users: the most productive 10% worked in 52-minute blocks followed by 17-minute breaks. It is the length of a productive work block, not the time it takes to reach focus.
- **Planned resolution:** `README.md` — Principle 2 and "What We Have Learned": replace with the finding as it was measured, with a citation, or drop the number; mirrored in `public/src/data/manifesto.js` — `principles.focus[1].description` and `researchStats[0]`, `public/src/data/assessment.js` — `beatRecommendations.focus.low.description`.

### WP-12 — "23 minutes to recover" carries false precision

- **Location:** `README.md` — Principle 2 and "What We Have Learned"
- **Category:** wrong number
- **Original wording:** "23 minutes to recover from interruption"
- **Why:** The 23 minutes 15 seconds figure was given to the 2006 Gallup Business Journal in an interview; the peer-reviewed CHI 2005 paper ("No Task Left Behind?", Mark, González and Harris) reports 25 minutes 26 seconds for the same measure. The seconds-level precision is not from a published paper.
- **Planned resolution:** `README.md` — Principle 2 and "What We Have Learned": cite the CHI paper and use its figure, or round to a sourced number; mirrored in `public/src/data/manifesto.js` — `principles.focus[1].description` and `researchStats[1]`, `public/src/data/assessment.js` — `beatRecommendations.focus.low.description`.

### WP-13 — "More than two meetings per day reduces productive output to 14%" has no source

- **Location:** `README.md` — "What We Have Learned"
- **Category:** wrong number
- **Original wording:** "More than two meetings per day reduces productive output to 14%"
- **Why:** No published finding supports this. The closest real results are Slack's Workplace Lab survey (more than two *hours* a day in meetings hurts productivity, with no 14% figure), MIT Sloan's meeting-free-day study across 76 companies (up to 73% productivity gain, 57% less stress), and a Stack Overflow survey of developers (they want to decline 31% of meetings but cancel only 14% — a different quantity that reads like the source of this number).
- **Planned resolution:** `README.md` — "What We Have Learned": remove the claim or replace it with the sourced finding it was derived from; mirrored in `public/src/data/manifesto.js` — `researchStats[2]`.

### WP-14 — "Peak cognitive work capacity is approximately four hours per day" rounds a different number

- **Location:** `README.md` — "What We Have Learned"
- **Category:** wrong number
- **Original wording:** "Peak cognitive work capacity is approximately four hours per day"
- **Why:** The nearest published figure is DeskTime's ~3 hours 43 minutes of focused work per day for top performers; Slack's survey found that people would *like* four hours of focus time, which is a preference, not a capacity limit. The stated figure reads as a research finding.
- **Planned resolution:** `README.md` — "What We Have Learned": correct the number and cite it, or reword as BEAT's own planning assumption; mirrored in `public/src/data/manifesto.js` — `researchStats[3]`.

### WP-15 — "72% of meetings are ineffective at their stated purpose"

- **Location:** `README.md` — "What We Have Learned"
- **Category:** wrong number
- **Original wording:** "72% of meetings are ineffective at their stated purpose"
- **Why:** The citable figures are 71% (182 senior managers surveyed in a Harvard Business School study, reported by Rogelberg, *The Surprising Science of Meetings*, OUP 2019) and 70% (Harvard Business Review, March 2022). The survey asked whether meetings were unproductive and inefficient, not whether they were "ineffective at their stated purpose".
- **Planned resolution:** `README.md` — "What We Have Learned": use 71% with the Rogelberg citation and reword to match what was measured, or use 70% with the HBR source; mirrored in `public/src/data/manifesto.js` — `researchStats[4]`.

### WP-16 — The NOW limit is stated two ways

- **Location:** `README.md` — "Prioritization" and "Appendix: Quick Reference" → "The Numbers"
- **Category:** wrong number
- **Original wording:** "**NOW** — Critical, blocking, time-sensitive. Maximum five items." and "| NOW items | Max 3-5 |"
- **Why:** The same limit is five in one section and a three-to-five range in the other, in the same document.
- **Planned resolution:** `README.md` — "Prioritization" and "Appendix: Quick Reference" → "The Numbers": one limit, stated once; mirrored in `public/src/data/manifesto.js` — `priorityBuckets[0].description` and `constraints`.

### WP-17 — Exploration time: 20% and one day per beat cannot both hold

- **Location:** `README.md` — Principle 12 and "Appendix: Quick Reference" → "The Numbers"
- **Category:** wrong number
- **Original wording:** "Twenty percent of time belongs to the maker for learning, tooling, experiments, and interests." and "| Exploration time | 20% (1 day/beat) |"
- **Why:** One day per beat is 20% only if a beat is exactly five working days, but a beat is "flexible iterations of one to two weeks". At ten working days the same rule gives 10%.
- **Planned resolution:** `README.md` — Principle 12 and "Appendix: Quick Reference" → "The Numbers": express the allocation in one unit; mirrored in `public/src/data/manifesto.js` — `principles.sustainability[2].description`, `constraints`, `public/src/views/HomeView.vue` — `keyNumbers` ("20%").

### WP-18 — The assessment uses two different scoring thresholds

- **Location:** `public/src/data/assessment.js` — `overallAssessment` and `public/src/views/AssessmentView.vue` — `overallLevel`, `categoryScores`
- **Category:** wrong number
- **Original wording:** "range: [12, 24]", "range: [25, 36]", "range: [37, 42]", "range: [43, 48]" and "level: total <= max * 0.4 ? 'low' : total <= max * 0.7 ? 'medium' : 'high'"
- **Why:** The overall scale calls 37 of 48 (77%) "strong" and 43 of 48 (90%) "excellent", while a category is called "high" from 71% of its maximum. A team can therefore score "excellent" overall while every category reads only "high", and the two bands disagree on the same percentages.
- **Planned resolution:** `public/src/views/AssessmentView.vue` — `categoryScores` and `overallLevel`: derive both from one shared threshold set, and state it in `public/src/data/assessment.js` — `overallAssessment`.

---

## Self-contradiction

### WP-19 — Sacred blocks are absolute, then suspended by anything urgent

- **Location:** `README.md` — Principle 1 and "The BEAT Commitment", against "Incidents & Emergencies"
- **Category:** self-contradiction
- **Original wording:** "We maintain sacred blocks of four hours daily where no meetings, messages, or interruptions are permitted." and "**Protecting focus** — We will not interrupt sacred time. We will wait." against "**During incidents:**" and "Sacred blocks are suspended"
- **Why:** The principle and the commitment are absolute ("above all else", "no interruptions are permitted"); the incident carve-out is not scoped — it names no role that may suspend a block, no time box, no rotation, and it can be invoked by anyone who judges something an incident.
- **Planned resolution:** `README.md` — Principle 1 and "The BEAT Commitment": qualify with an explicit exception clause naming who may suspend a block, and when; mirrored in `public/src/data/manifesto.js` — `principles.focus[0].description` and `incidentProtocol`, rendered by `public/src/views/PracticesView.vue` — "Incidents & Emergencies".

### WP-20 — "Pull, don't push" against "The Enabler sets the stack"

- **Location:** `README.md` — Principle 8 and "Prioritization"
- **Category:** self-contradiction
- **Original wording:** "Work is not assigned. Work is pulled by those with capacity and interest." and "The Enabler sets the stack. Makers may adjust with reason."
- **Why:** The Enabler ordering the stack is assignment-adjacent; who may set the stack, on what basis, and how a maker disputes the order are all undefined.
- **Planned resolution:** `README.md` — Principle 8 and "Prioritization": state the Enabler's role as ordering rather than assigning, and give the dispute path; mirrored in `public/src/data/manifesto.js` — `principles.autonomy[1].description`, `priorityBuckets`, `roles[1].description`.

### WP-21 — Maker autonomy over how, against a team-owned definition of done

- **Location:** `README.md` — Principle 7 and "Definition of Done"
- **Category:** self-contradiction
- **Original wording:** "Those who build the thing decide how to build it. They choose their tools, their approach, their schedule, their collaborators." against "**The team owns this definition.** Adjust it as needed. But once agreed, honor it." with "Code reviewed by at least one other maker"
- **Why:** A maker's freedom is stated as absolute over method, while the done criteria — including a review the maker cannot satisfy alone — are owned by the team, and no path exists for a maker who disagrees with the done condition.
- **Planned resolution:** `README.md` — Principle 7 and "Definition of Done": separate method autonomy from the done condition and add the disagreement path; mirrored in `public/src/data/manifesto.js` — `principles.autonomy[0].description`, `definitionOfDone.code`, `public/src/views/PracticesView.vue` — "Definition of Done".

### WP-22 — The weekly meeting budget against the incident update cadence

- **Location:** `README.md` — Principle 5 and "Incidents & Emergencies"
- **Category:** self-contradiction
- **Original wording:** "We limit them to two hours per week, one hour maximum each." against "3. **Communicate** — Brief status updates every 30 minutes until resolved."
- **Why:** A sustained incident produces 30-minute updates for as long as it runs, which exceeds the weekly meeting budget and the one-hour maximum; the exception is not time-boxed and no owner is named for it.
- **Planned resolution:** `README.md` — Principle 5 and "Incidents & Emergencies": state the incident exception explicitly, including its time box; mirrored in `public/src/data/manifesto.js` — `principles.communication[1].description`, `incidentProtocol[2]`.

### WP-23 — "We do not assign buddies" against the onboarding buddy

- **Location:** `README.md` — "Collaboration" against "Onboarding to BEAT" → "Connector's Responsibility"
- **Category:** self-contradiction
- **Original wording:** "We do not schedule pairing. We do not mandate walkthroughs. We do not assign buddies." against "New member has a \"buddy\" for questions (informal, not mandatory pairing)"
- **Why:** The prose prohibition and the onboarding promise are in direct conflict; the parenthetical "not mandatory pairing" does not resolve it, because the issue is whether a buddy is assigned at all.
- **Planned resolution:** `README.md` — "Collaboration" and "Onboarding to BEAT" → "Connector's Responsibility": reconcile the two statements; mirrored in `public/src/data/manifesto.js` — `onboarding`, rendered by `public/src/views/OnboardingView.vue` — "Connector's Responsibility", and the identical sentence in `public/src/views/PracticesView.vue` — "Collaboration".

### WP-24 — "Everything else waits" against auto-proceed on reviews

- **Location:** `README.md` — Principle 6, "Avoiding Chokepoints" → "Reviews", against "Definition of Done"
- **Category:** self-contradiction
- **Original wording:** "Urgent means phone call. Everything else waits." and "**Reviews:** Anyone can review. Four-hour response SLA. Auto-proceed after 24 hours if CI passes." against "Code reviewed by at least one other maker"
- **Why:** Auto-proceed after 24 hours merges code that has not been reviewed, which the definition of done forbids and the anti-pattern table lists as the fix for review blocking ("Anyone can review, auto-proceed rule"). The rule also states no exception for security-sensitive changes.
- **Planned resolution:** `README.md` — "Avoiding Chokepoints" → "Reviews" and "Definition of Done": state which reviews auto-proceed applies to and how that reconciles with the done criteria; mirrored in `public/src/data/manifesto.js` — `definitionOfDone.code[2]`, `constraints`, `public/src/views/AssessmentView.vue` — no review-turnaround question exists.

### WP-25 — "Decisions not documented did not happen" against silence-as-consent

- **Location:** `README.md` — Principle 4 and Principle 9, against "Avoiding Chokepoints" → "Decisions"
- **Category:** self-contradiction
- **Original wording:** "Decisions not documented did not happen." against "**Decisions:** Post recommendation. Wait 24 hours. No objection means proceed." and "Makers may refuse work that is unethical, impossible, or poorly conceived."
- **Why:** Silence-as-consent is a decision without documentation, and a maker's silence is treated as agreement while their explicit refusal is treated as ownership — the same silence carries opposite meanings depending on who is silent.
- **Planned resolution:** `README.md` — Principle 4, Principle 9 and "Avoiding Chokepoints" → "Decisions": require a documented decision record and distinguish "no objection" from consent; mirrored in `public/src/data/manifesto.js` — `principles.communication[0].description`, `principles.autonomy[2].description`.

### WP-26 — "No known defects introduced" against shipping logged defects

- **Location:** `README.md` — "Spotted Issues" against "Definition of Done"
- **Category:** self-contradiction
- **Original wording:** "**More than five minutes, not blocking?** Log it, continue. Protect your focus." and "No known defects introduced" and "\"Done\" means done—not \"done but...\" or \"done except...\""
- **Why:** A logged defect found during the work ships inside the merged item, which the done criteria forbid, and the text nowhere distinguishes "not done" from "done with a logged defect".
- **Planned resolution:** `README.md` — "Spotted Issues" and "Definition of Done": say explicitly whether a logged defect blocks done, and where it is tracked; mirrored in `public/src/data/manifesto.js` — `definitionOfDone.code[5]`, rendered by `public/src/views/PracticesView.vue` and `public/src/views/ReferenceView.vue` — "Spotted Issue Decision".

### WP-27 — Exploration work has no place on the board

- **Location:** `README.md` — Principle 12 against "The Board"
- **Category:** self-contradiction
- **Original wording:** "No justification required. No approval needed." against "ICE → LATER → NEXT → IN PROGRESS → DONE" and "Work-in-progress limit: three per maker."
- **Why:** Exploration is a standing claim on a maker's time, but the board has no lane for it and the WIP limit does not say whether exploration counts against the three items — so a maker can either exceed the limit or abandon the exploration entitlement.
- **Planned resolution:** `README.md` — Principle 12 and "The Board": state how exploration time sits against the WIP limit and whether it has a board lane; mirrored in `public/src/data/manifesto.js` — `principles.sustainability[2].description`, `constraints`, `public/src/views/FrameworkView.vue` — "The Board".

### WP-28 — "We plan at 80%" against an uncapped NOW bucket

- **Location:** `README.md` — Principle 10 against "Prioritization"
- **Category:** self-contradiction
- **Original wording:** "We plan at 80% and leave slack for life." against "**NOW** — Critical, blocking, time-sensitive. Maximum five items."
- **Why:** The bucket system has no capacity check; five critical items can exceed 80% of capacity, and the tie-break between "cut scope" and "take the work" is not stated, so capacity and priority are in unresolved conflict rather than a resolved one.
- **Planned resolution:** `README.md` — Principle 10 and "Prioritization": state which wins when the NOW bucket exceeds planned capacity; mirrored in `public/src/data/manifesto.js` — `principles.sustainability[0].description`, `priorityBuckets`.

### WP-29 — Onboarding promise against "Where BEAT Fits"

- **Location:** `README.md` — "Onboarding to BEAT" against "Where BEAT Fits"
- **Category:** self-contradiction
- **Original wording:** "- Expect full productivity in week one" against "- Junior-heavy teams needing close guidance"
- **Why:** The manifesto claims BEAT fits junior-heavy teams poorly while its onboarding section promises a gradual ramp that is the only support a junior would get; neither section says which of the two wins for a junior team.
- **Planned resolution:** `README.md` — "Where BEAT Fits" and "Onboarding to BEAT": state the exception and what a junior-heavy team must add; mirrored in `public/src/data/manifesto.js` — `whereItFits.fitsPoorly`, `onboarding`.

---

## Rule not applicable as written

### WP-30 — "Urgent means phone call" cannot be executed

- **Location:** `README.md` — Principle 6 and "Incidents & Emergencies"
- **Category:** rule not applicable as written
- **Original wording:** "Urgent means phone call. Everything else waits." and "**Alert** — Post immediately in dedicated incident channel. Phone/page if needed."
- **Why:** No phone or paging channel is named, nobody is authorised to declare something urgent, there is no fallback when no one answers, and no rule for a maker in another time zone.
- **Planned resolution:** `README.md` — Principle 6 and "Incidents & Emergencies": name the escalation channel, who may declare urgency, and the fallback; mirrored in `public/src/data/manifesto.js` — `principles.communication[2].description` and `incidentProtocol[0]`, `public/src/data/assessment.js` — `assessmentQuestions[5].options[3].description`.

### WP-31 — "24 working hours" is undefined

- **Location:** `README.md` — Principle 6
- **Category:** rule not applicable as written
- **Original wording:** "We expect responses within 24 working hours."
- **Why:** "Working hours" is not defined per time zone or per working day, nobody owns the expectation, and no behaviour is stated for leave or absence. A maker in a far time zone cannot know when the clock starts.
- **Planned resolution:** `README.md` — Principle 6: define working hours and the reference time zone, and name who owns the expectation; mirrored in `public/src/data/manifesto.js` — `principles.communication[2].description`, `public/src/data/assessment.js` — `beatRecommendations.communication.low.recommendations[1]`.

### WP-32 — The stale-item sweep has no trigger, owner, or exception

- **Location:** `README.md` — "The Board"
- **Category:** rule not applicable as written
- **Original wording:** "Items stale for five days return to backlog."
- **Why:** Staleness has no definition (no last-activity field on the board), no one performs the sweep, and there is no way to pin an item that is intentionally parked.
- **Planned resolution:** `README.md` — "The Board": define staleness, name the owner of the sweep, and allow a pin; mirrored in `public/src/views/FrameworkView.vue` — "Stale Items" ("Return to backlog after 5 days"), and added to `public/src/data/manifesto.js` — `constraints` (see WP-47).

### WP-33 — Auto-proceed has no owner or exceptions

- **Location:** `README.md` — "Avoiding Chokepoints" → "Reviews"
- **Category:** rule not applicable as written
- **Original wording:** "**Reviews:** Anyone can review. Four-hour response SLA. Auto-proceed after 24 hours if CI passes."
- **Why:** No one is named to perform the merge, the rule says nothing about a review that raised substantive comments but was not answered, and no security-sensitive or data-migration exception is carved out.
- **Planned resolution:** `README.md` — "Avoiding Chokepoints" → "Reviews": name the merge owner, state what happens when comments exist, and carve out exceptions; mirrored in `public/src/data/manifesto.js` — `constraints` ("Auto-proceed | 24 hours"), `public/src/views/FrameworkView.vue` — "The Numbers", `public/src/views/ReferenceView.vue` — "The Numbers".

### WP-34 — The WIP limit says what the limit is, not what to do at the limit

- **Location:** `README.md` — "The Board"
- **Category:** rule not applicable as written
- **Original wording:** "Work-in-progress limit: three per maker."
- **Why:** No owner, no stated consequence of reaching three, and no rule for a maker who is at the limit while the only remaining work is blocked.
- **Planned resolution:** `README.md` — "The Board": state the owner, the consequence and the blocked-work exception; mirrored in `public/src/data/manifesto.js` — `constraints` ("WIP per maker | 3 items"), `public/src/views/FrameworkView.vue` — "WIP Limit" ("3 items per maker").

### WP-35 — "We do not groom" has no scope and no exception

- **Location:** `README.md` — "Work Items"
- **Category:** rule not applicable as written
- **Original wording:** "We size with **S/M/L**, not story points. We do not groom. We do not point. We do not track velocity."
- **Why:** Three prohibitions with no scope (team-internal planning only, or every reporting obligation?) and no exception path for a team that must report to an external programme or a regulated customer.
- **Planned resolution:** `README.md` — "Work Items": state the scope and the exception; mirrored in `public/src/views/FrameworkView.vue` — "Work Items" (identical sentence), and added to `public/src/data/manifesto.js` — `constraints` (see WP-47).

### WP-36 — "Claim files" has no mechanism

- **Location:** `README.md` — "Avoiding Chokepoints" → "Merges"
- **Category:** rule not applicable as written
- **Original wording:** "**Merges:** Merge main daily. Claim files. Keep branches short-lived."
- **Why:** "Claim files" names no mechanism (a lock, a branch-protection rule, a board column), no conflict rule, and no owner; "daily" cannot be enforced without a definition of the working day across time zones.
- **Planned resolution:** `README.md` — "Avoiding Chokepoints" → "Merges": name the claiming mechanism and the conflict rule; mirrored in `public/src/data/manifesto.js` — `technicalPractices[5]` ("Trunk-Based Development" covers merging only).

### WP-37 — "We plan at 80%" names neither a planner nor a unit

- **Location:** `README.md` — Principle 10 and "Burnout Prevention"
- **Category:** rule not applicable as written
- **Original wording:** "We plan at 80% and leave slack for life." and "**Plan at 80%.** Leave room for spotted issues, complexity, life."
- **Why:** No one is named as planning, 80% is not defined as a percentage of what (per maker, per team, per beat), and there is no instruction for what to plan first when demand exceeds capacity.
- **Planned resolution:** `README.md` — Principle 10 and "Burnout Prevention": name the planner, the unit and the capacity base; mirrored in `public/src/data/manifesto.js` — `principles.sustainability[0].description`, `constraints` ("Planning capacity | 80%").

### WP-38 — The four-hour review SLA has no coverage hours

- **Location:** `README.md` — "Avoiding Chokepoints" → "Reviews"
- **Category:** rule not applicable as written
- **Original wording:** "Four-hour response SLA."
- **Why:** Four hours of whose day is not stated, no owner of the SLA, and the assessment instrument does not ask about review turnaround at all, so the rule is never exercised.
- **Planned resolution:** `README.md` — "Avoiding Chokepoints" → "Reviews": define the measurement window and the owner; mirrored in `public/src/data/manifesto.js` — `constraints` ("Review response | 4 hours").

### WP-39 — "Meet team members 1:1 (async or sync, their preference)"

- **Location:** `README.md` — "Onboarding to BEAT" → "Week One: Observe"
- **Category:** rule not applicable as written
- **Original wording:** "Meet team members 1:1 (async or sync, their preference)"
- **Why:** An asynchronous 1:1 is not defined, no cadence, owner or tooling is given, and it sits against the earlier finding that the onboarding section assigns a buddy but the collaboration section forbids it.
- **Planned resolution:** `README.md` — "Onboarding to BEAT" → "Week One: Observe": define the cadence and owner, or fold it into the buddy mechanism; mirrored in `public/src/data/manifesto.js` — `onboarding.weekOne.items[4]`.

### WP-40 — "We aim; we do not promise" has no path for promises already made

- **Location:** `README.md` — "Beats" against "Anti-Patterns" → "Organizational Anti-Patterns"
- **Category:** rule not applicable as written
- **Original wording:** "Beats have **goals**, not commitments. We aim; we do not promise." against "| **Stealth deadlines** | Surprise \"we promised client by Friday\" | Surface commitments before making them |"
- **Why:** The anti-pattern forbids hidden commitments, but a commitment already made to a customer — openly, by someone else — falls outside every rule; nothing says who renegotiates it or what the maker does with it.
- **Planned resolution:** `README.md` — "Beats" and "Anti-Patterns" → "Organizational Anti-Patterns": state the rule for commitments that already exist; mirrored in `public/src/data/manifesto.js` — `antiPatterns.organizational[1]`, `public/src/views/FrameworkView.vue` — "Beats".

### WP-41 — "Disputes resolve async, then sync if stuck" has no timeout or fallback decider

- **Location:** `README.md` — "Prioritization"
- **Category:** rule not applicable as written
- **Original wording:** "The Enabler sets the stack. Makers may adjust with reason. Disputes resolve async, then sync if stuck."
- **Why:** "Stuck" has no time limit, no fallback decider is named for a dispute the Enabler cannot settle, and the Enabler is not excluded from being a party to the dispute.
- **Planned resolution:** `README.md` — "Prioritization": state the escalation timeout, the fallback decider and the Enabler's recusal; mirrored in `public/src/data/manifesto.js` — `roles[1].description`, `priorityBuckets`.

### WP-42 — Two of the six done criteria are conditional, so "done" is not decidable

- **Location:** `README.md` — "Definition of Done"
- **Category:** rule not applicable as written
- **Original wording:** "Tests pass (existing and new where appropriate)" and "Deployable (or deployed, depending on team practice)" and "**The team owns this definition.** Adjust it as needed. But once agreed, honor it."
- **Why:** Two of the six criteria are conditional on team practice, the list has no owner for the "where appropriate" judgement, and no rule says what a maker does when a done condition cannot be met — while the section insists "Done" means done.
- **Planned resolution:** `README.md` — "Definition of Done": make each criterion decidable and name who decides the conditional parts; mirrored in `public/src/data/manifesto.js` — `definitionOfDone.code`, `public/src/views/PracticesView.vue` — "Definition of Done", `public/src/views/ReferenceView.vue` — "Definition of Done (Code)".

### WP-43 — The optional technical practices block has no applicability statement

- **Location:** `README.md` — "Technical Practices (Optional)"
- **Category:** rule not applicable as written
- **Original wording:** "These are not mandated. They are offered as practices that support focus, speed, and quality. Adopt what serves you. Discard what doesn't."
- **Why:** The block names no scope (whole team, one service, one repository), no decision owner, and no rule for a practice that is only partly applicable — for example mandatory automated testing with a legacy codebase that has no test harness.
- **Planned resolution:** `README.md` — "Technical Practices (Optional)": state the scope, the decision owner and the partial-adoption rule; mirrored in `public/src/data/manifesto.js` — `technicalPractices`, `public/src/views/PracticesView.vue` — "Technical Practices".

---

## Uncovered situation

### WP-44 — Incidents and on-call: the incident is covered, the rotation is not

- **Location:** `README.md` — missing section (the "Incidents & Emergencies" section covers the incident only)
- **Category:** uncovered situation
- **Original wording:** "**During incidents:**" and "Sacred blocks are suspended" and "Whoever is available helps—no \"not my job\"" and "**This is not normal work.** Incidents should be rare. If they're frequent, that's a systemic problem to solve—not a reason to abandon sustainable pace."
- **Why:** Nothing defines who is on call, how the rotation is set, how it is handed over across time zones, whether on-call work is counted inside or outside a beat, how it is compensated, or how "available" is defined when Principle 6 says "Everything else waits" and Principle 10 makes overtime a red flag. "Whoever is available" is the only availability rule, and it depends on availability never being defined. A search of `public/src/data` and `public/src/views` finds no mention of on-call, a rotation, a handover or compensation.
- **Planned resolution:** `README.md` — new subsection "On-call and incident rotation" in "The Framework", next to "Incidents & Emergencies": rotation, handover, compensation, availability definition, and whether on-call sits inside the beat; mirrored in `public/src/data/manifesto.js` — new `onCall` data key, and a new block in `public/src/views/PracticesView.vue`.

### WP-45 — Time zones: named as a benefit, never as a condition

- **Location:** `README.md` — missing section (time zones appear only as an argument for writing)
- **Category:** uncovered situation
- **Original wording:** "Written words can be searched, referenced, and shared across time zones."
- **Why:** The manifesto calls itself remote-first and lists "Remote-first or distributed teams" as a best fit, yet never states coverage hours, what "24 working hours" means across zones, how the daily check-in works for a maker whose day has barely started, how one maker's sacred block lands on another maker's working day, how a 30-minute Beat Start is attended across zones, or how handover happens. Every time-dependent rule in the text — sacred blocks, 24 working hours, 4-hour review SLA, 24-hour auto-proceed, 5-day staleness, daily merges — assumes a single working day that does not exist for a distributed team.
- **Planned resolution:** `README.md` — new subsection "Working across time zones" in "The Framework": coverage hours, the reference time zone for each SLA, overlap hours for ceremonies, and handover; mirrored in `public/src/data/manifesto.js` — new `timeZones` data key, and a new block in `public/src/views/PracticesView.vue`.

### WP-46 — Onboarding: a four-week ramp with no escalation path

- **Location:** `README.md` — "Onboarding to BEAT" (gaps within an existing section)
- **Category:** uncovered situation
- **Original wording:** "### Week One: Observe", "- Expect full productivity in week one" and "New member has a \"buddy\" for questions (informal, not mandatory pairing)"
- **Why:** The section lists what happens week by week but not what happens when the ramp fails: no named artefact set a new member must read (decision log, architecture notes, the board's own history), no treatment of a new member's first review against the four-hour review SLA and the 24-hour auto-proceed rule, no statement of what a new member may decline, and no reconciliation with the "Junior-heavy teams needing close guidance" entry in "BEAT fits poorly for:" — the only guidance a junior receives is this ramp. No time-zone note applies to week one either, since the 1:1s may be asynchronous.
- **Planned resolution:** `README.md` — "Onboarding to BEAT": add the reading list, the escalation path when the ramp is not working, the rule for a new member's first review, and the junior-heavy-team exception; reconciled with `README.md` — "Where BEAT Fits"; mirrored in `public/src/data/manifesto.js` — `onboarding` and `whereItFits.fitsPoorly`, `public/src/views/OnboardingView.vue`.

### WP-47 — Cross-team dependencies: everything stops at the team boundary

- **Location:** `README.md` — missing section
- **Category:** uncovered situation
- **Original wording:** "**Blockers:** Surface in check-in. Pull different work while waiting. Enabler escalates." and "**The Connector** maintains knowledge flow. They keep documentation current, ensure context flows between makers, and onboard new members." and "**Define interfaces first.** Agree on contracts. Work in parallel against them."
- **Why:** All escalation, all connectors and all interface agreement are intra-team. Nothing covers a dependency owned by another team, a pull-based team with no inbound queue, a shared library or platform change that blocks several teams, or how a commitment made to another team is tracked. "Enabler escalates" names no target of the escalation.
- **Planned resolution:** `README.md` — new subsection "Dependencies across teams" in "The Framework": who owns a dependency outside the team, how it is raised, how interfaces are agreed and versioned, and how commitments to other teams are tracked; mirrored in `public/src/data/manifesto.js` — new `crossTeamDependencies` data key, and a new block in `public/src/views/PracticesView.vue`.

### WP-48 — Accountability and measurement: outcomes are promised but never defined

- **Location:** `README.md` — missing section (measurement is asserted in Principle 3 and the anti-pattern table, never specified)
- **Category:** uncovered situation
- **Original wording:** "We do not measure hours worked or time online. We measure outcomes delivered." and "| **Metric theater** | Tracking velocity, points, hours | Stop. Measure outcomes, not activity. |" and "- Burnout despite 80% planning"
- **Why:** No section states what is measured, by whom, over what window, or what happens where outcomes are not observable — support, infrastructure, research, maintenance. "Outcomes" is never defined. The anti-pattern forbids activity metrics without saying what replaces them. The warning sign "Burnout despite 80% planning" has no threshold that triggers the response it implies, and the response it names is "Discuss in Beat Close". The site's assessment instrument is a self-report with no statement of validity, so it cannot serve as the measurement mechanism either.
- **Planned resolution:** `README.md` — new subsection "Accountability and measurement" in "The Framework", after "Burnout Prevention": what is measured, the owner, the cadence, the treatment of work without observable outcomes, and the threshold behind each warning sign in "When BEAT Isn't Working"; mirrored in `public/src/data/manifesto.js` — new `measurement` data key and a new block in `public/src/views/PracticesView.vue`, plus a validity note on the assessment in `public/src/data/assessment.js`.

---

## Consistency gaps between README.md and the site

### WP-49 — The site commitment list is missing one of the five commitments

- **Location:** `README.md` — "The BEAT Commitment" against `public/src/views/HomeView.vue` — `commitments`
- **Category:** self-contradiction
- **Original wording:** "**Improving always** — We will reflect each beat. We will adjust. We will find better ways." against a `commitments` array with four entries: "Protecting focus", "Defaulting to async", "Trusting makers", "Sustaining pace"
- **Why:** The site states a different commitment set from the README it claims to publish.
- **Planned resolution:** `public/src/views/HomeView.vue` — `commitments`: add the fifth commitment so the site carries all five.

### WP-50 — "Customer & User Feedback" has no site counterpart at all

- **Location:** `README.md` — "Customer & User Feedback" against the absence of any matching site content
- **Category:** self-contradiction
- **Original wording:** "**Direct access.** Makers should have direct access to user feedback—support tickets, analytics, user interviews. Not filtered through three layers of management." and "**Regular exposure.** At least once per beat, someone on the team reviews real user feedback. Share highlights async."
- **Why:** A search of `public/src/data` and `public/src/views` finds no section, data key or view carrying this content, so the site and the README do not carry the same set of sections.
- **Planned resolution:** `public/src/data/manifesto.js` — new `customerFeedback` data key, and a matching section in the redesigned site; `README.md` — "Customer & User Feedback" stays as the source text.

### WP-51 — The assessment exists on the site with no README counterpart

- **Location:** `public/src/views/AssessmentView.vue` and `public/src/data/assessment.js` against `README.md` — missing section
- **Category:** self-contradiction
- **Original wording:** "export const assessmentQuestions = [", "export const overallAssessment = {", "{{ totalScore }} / 48"
- **Why:** The site publishes a full route (`/assessment`) with 12 scored questions, four categories, per-category recommendations and four overall bands; the README has no assessment section and its "Appendix: Quick Reference" has no assessment block, so the two sides do not carry the same set of sections.
- **Planned resolution:** `README.md` — new section describing the self-assessment (questions, categories, scoring bands, and the statement that it is a self-report) plus an appendix block; keep the site route and mirror the same numbers in `public/src/data/assessment.js`.

### WP-52 — Three board rules exist only in the README prose and one view

- **Location:** `README.md` — "The Board" against `public/src/data/manifesto.js` — `constraints`
- **Category:** self-contradiction
- **Original wording:** "Work-in-progress limit: three per maker. NEXT is ordered. NOW pins to top. Items stale for five days return to backlog." against a `constraints` array holding nine entries and none of them being "NOW pins to top" or "Items stale for five days return to backlog"
- **Why:** The board rules live in README prose and in `public/src/views/FrameworkView.vue` ("WIP Limit", "Stale Items"), but the shared `constraints` structure that feeds "The Numbers" on both the framework page and the reference page carries neither the pinning rule nor the staleness rule, and the "We do not groom" rule has no entry there at all. The mapping a reader of either side builds is therefore different from the other.
- **Planned resolution:** `public/src/data/manifesto.js` — `constraints`: add the missing board rules and the sizing rule so the shared structure matches `README.md` — "The Board" and "Work Items".

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
- `README.md` — Principle 2: "Research shows 52 minutes to reach deep focus, 23 minutes to recover from interruption." — uncited and wrong source.
- `README.md` — Principle 3: "A maker in focus for four hours outproduces a maker in meetings for eight." — uncited quantitative claim.
- `README.md` — Principle 10: "Burnout destroys teams. Recovery is productive." — uncited claim.
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
- `assessment.js` — `overallAssessment`: the ranges [12, 24], [25, 36], [37, 42], [43, 48] — BEAT's own bands, no stated derivation.
- `assessment.js` — `assessmentQuestions[5].options[3].description`: "Clear escalation path" / "Urgent = phone, else async" — BEAT's own rule.

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
