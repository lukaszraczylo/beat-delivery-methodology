# The BEAT Manifesto

**B**alanced. **E**mpowered. **A**sync. **T**eams.

---

We are uncovering better ways of building software by doing it and helping others do it.

Through this work we have come to value:

---

## Core Values

**Deep work** over constant availability

**Asynchronous communication** over synchronous meetings

**Written documentation** over verbal agreements

**Individual autonomy** over prescribed processes

**Sustainable pace** over heroic effort

**Small experiments** over careful plans

---

That is, while there is value in the items on the right, we value the items on the left more.

---

## The Five Team Values

Beyond what we value in our work, we hold these values in how we treat each other:

**Trust** — We assume competence and good intent. We give autonomy because we trust it will be used well. We share information openly because we trust it will be handled responsibly.

**Courage** — We speak up when something is wrong. We admit when we don't know. We challenge decisions respectfully. We try new approaches even when they might fail.

**Candor** — We give honest feedback, kindly delivered. We say what we mean in writing. We surface problems early rather than hiding them. We disagree openly, then commit.

**Ownership** — We take responsibility for our work and its impact. We don't wait to be told. We fix what we find broken. We see things through to done.

**Calm** — We do not create urgency where none exists. We respond thoughtfully, not reactively. We protect each other's focus. We choose sustainable over heroic.

---

## The Twelve Principles of BEAT

<!-- id: principle-focus -->

### On Focus

**1. Protect the focus state above all else.**

Sacred blocks come first, because everything else in the plan depends on them. A maker protects a focus block of four hours each working day — a BEAT default, listed in the constraints table — and chooses when it falls. The only exception is a declared production incident: the incident lead may suspend a block, and only for the time the incident runs.

**2. Interruptions are not free.**

Interrupting someone costs more than the question appears to. Resuming interrupted work takes about twenty-five minutes [mark-2005], and the most productive users tracked by DeskTime worked in blocks of fifty-two minutes [desktime-2014]. So we default to async and wait for the open window.

**3. Presence does not equal productivity.**

We do not measure hours worked or time online. We measure outcomes delivered. Presence is not evidence of output, so a maker is judged by what ships, not by hours spent in meetings.

---

<!-- id: principle-communication -->

### On Communication

**4. Writing is thinking made visible.**

We write by default. A decision counts only when it is written down and the record names who decided it — silence is not consent. Written words can be searched, referenced, and shared across time zones. They outlive the meeting that never was.

**5. Synchronous time is expensive. Spend it wisely.**

Meetings cost everyone present, simultaneously, and the people who need the room most are rarely in it. Surveyed knowledge workers reported lower productivity above two hours a day in meetings [slack-workplace-lab-2017]. We limit meetings to the budget in the constraints table, one hour maximum each, and a declared incident is the only exception. If it can be written, write it; if it must be discussed, write first, then discuss the delta.

**6. Response time is not reaction time.**

Async means responding when working, not responding immediately. We expect a response within one working day, counted against the coverage hours in the time-zone rules. Urgent means a phone call to the on-call rota, and the rota names the fallback when nobody answers. Everything else waits.

---

<!-- id: principle-autonomy -->

### On Autonomy

**7. Trust makers to make.**

Those who build the thing decide how to build it. They choose their tools, their approach, their schedule, their collaborators. Method is the maker's. The done condition is the team's, and a maker who cannot meet one raises it before the work starts, not after. We give makers autonomy because autonomy, competence and relatedness are the needs that make sustained motivation possible [deci-ryan-2000] — a general motivation finding, not a result about developers. We provide goals and constraints, not instructions.

**8. Pull, don't push.**

Work is not assigned. Work is pulled by those with capacity and interest. The Enabler orders the stack — priority and order, never assignment — and makers pull from the top of it. A maker may skip an item with a reason, propose an alternative, and object to the order through the dispute path in the priority rules.

**9. The maker's "no" is valid.**

Makers may refuse work that is unethical, impossible, or poorly conceived. They may challenge priorities. They may push back on requirements. A refusal is a decision and is recorded like any other: this is not insubordination—it is ownership.

---

<!-- id: principle-sustainability -->

### On Sustainability

**10. Sustainable pace is not optional.**

Overtime is a red flag, not a badge of honor. When deadlines conflict with capacity, we cut scope and we never cut rest. The capacity plan belongs to the Enabler, is set per maker for each beat at eighty percent of that maker's available working time, and says what does not fit. When a NOW item would break the plan, the deadline moves before the rest does.

**11. The team's health is the Enabler's responsibility.**

Someone must watch for warning signs: maxed WIP, skipped check-ins, overtime patterns, withdrawal. Someone must shield the team from organizational noise. Someone must say "no" to protect "yes." That someone is the Enabler, and the thresholds behind each warning sign are listed with the measurement rules.

**12. Exploration time is not a reward. It is a requirement.**

A fifth of each maker's working time belongs to learning, tooling, experiments, and interests — a BEAT default, listed in the constraints table. No justification required. No approval needed. Exploration does not consume a work-in-progress slot and does not sit on the board: it is scheduled, not tracked as work.

---

<!-- id: section-method -->

## The Framework

The principles above guide us. The framework below implements them.

Every rule in this section states what it applies to, who decides it, and what to do when it does not fit.

---

### Roles

We recognize three roles, loosely held:

**The Maker** builds things. They have full autonomy over implementation. They pull work, propose solutions, review code, and surface blockers. They choose what, how, when, where, and with whom. The done condition is the team's, not theirs to change alone.

**The Enabler** removes obstacles. They order the priority stack, shield from interruptions, monitor wellbeing, and facilitate decisions. They do not dictate—they enable: they set order and capacity, never assignment. They plan capacity at the level in the measurement rules. When they are a party to a dispute, they step out of it.

**The Connector** maintains knowledge flow. They keep documentation current, ensure context flows between makers, and onboard new members. This role is optional and may rotate.

---

### Beats

We work in **beats**—flexible iterations of one to two weeks.

Beats have **goals**, not commitments. We aim; we do not promise. Beats flow into each other. There is no sprint pressure, no velocity tracking, no burndown theater.

At beat start, we review priorities and pull initial work. During the beat, we check in async daily. At beat close, we reflect: what worked, what didn't, what to improve.

A commitment made outside the team is renegotiated by whoever made it, with the Enabler helping, and the team hears about it before the next beat starts.

---

### Work Items

Documentation effort scales with task size:

**Tasks** (hours): A one-liner. No ceremony needed.

**Work Items** (days): Title, context, done condition. Three lines.

**Projects** (week+): Half-page doc with breakdown. No more.

We size with **S/M/L**, not story points. We do not groom. We do not point. We do not track velocity.

Sizing applies to team-internal planning. A team that must report to an external programme, a regulator or a regulated customer keeps that reporting obligation and adapts the method around it.

---

### Definition of Done

Work is not done until it meets these criteria:

**For Code:**
- Code works as intended
- Tests pass: the existing suite passes, and new behaviour carries a test unless the team has agreed an exception for it, which the Enabler records
- Code reviewed by at least one other maker, or auto-proceeded under the review rule with the exceptions in that rule named in the merge
- Merged to main branch
- Deployable: the artefact builds and runs for the team's own use, and is deployed where the team deploys its own work
- No known defects introduced: a defect found during the work and logged as its own item does not block this one, provided it is recorded before the merge

**For Non-Code:**
- Meets the stated "done when" condition
- Reviewed by the relevant party where the item names one; where it names none, the maker decides
- Documented where others can find it

**The team owns this definition.** Adjust it as needed. But once agreed, honor it. "Done" means done—not "done but..." or "done except..."

If a maker cannot meet a condition, they raise it before the work starts; the team either changes the condition or the work does not start.

If something is merged but not truly done, it carries hidden cost. Be honest about completeness.

---

### Prioritization

We use four buckets:

**NOW** — Critical, blocking, time-sensitive. Maximum five items — a BEAT default, listed in the constraints table. When the bucket needs more than the capacity plan allows, the plan wins: the deadline moves or the scope shrinks.

**NEXT** — High value for this beat. An ordered stack. Pull from top. The order is the Enabler's to set; any maker may dispute it through the priority rules.

**LATER** — Valuable but not urgent. The backlog.

**ICEBOX** — Someday, or needs more thought. Revisit quarterly.

The Enabler orders the stack, on priority and capacity; they do not assign items to makers. Makers may adjust the order with a reason. A maker who objects to the order says so asynchronously, with their reason. If nobody answers within one working day, the dispute goes to a short synchronous discussion, and the Enabler decides unless they are a party to it, in which case the team decides.

---

### The Board

A simple kanban with priority built in:

```
ICE → LATER → NEXT → IN PROGRESS → DONE
```

Work-in-progress limit: three per maker. The maker stops taking new work at the limit. If the maker is blocked and every remaining item is blocked too, they say so in the check-in and the Enabler unblocks or reorders.

NEXT is ordered. NOW pins to top. Items with no activity for five working days return to the backlog, unless the maker pins them as intentionally parked; the pin is reviewed at the next beat close, and an unpinned item returns to the backlog. The Enabler sweeps the board at each beat close.

---

### Meetings

Hard limits — all of them BEAT defaults, listed in the constraints table:

- **Two hours per week** total, for recurring and scheduled meetings inside a working week
- **One hour maximum** per meeting
- **Agenda required** or meeting cancelled

The Enabler schedules; a meeting without an agenda is cancelled. Ad-hoc help and a blocked work item count against the same budget. A declared incident is the only exception: the incident lead runs it outside the budget.

We hold:

- **Beat Start** (30 min): Goals, priorities
- **Beat Close** (30 min): Reflection, health check
- **Ad-hoc Help** (≤25 min): Unblocking
- **Brainstorm** (≤1 hr): Creative solving, with 10-minute exit window

If a topic needs more than one hour: write first, comment async, meet on the delta. Never extend.

---

### Daily Check-in

Replace standups with written updates:

```
Working on: [current task]
Blocked by: [nothing / specific issue]
```

Post once daily, when convenient, in your own working day. Two minutes. No gathering required.

---

### Collaboration

Default mode is **solo deep work**.

Help is **ad-hoc**: post when stuck, someone responds when available, sync briefly if needed, return to solo work.

We do not schedule pairing. We do not mandate walkthroughs. Collaboration is initiated by those who need it. Where a team adds a mentor for a new member, that is the onboarding ramp, not a standing pairing: the mentor's time is planned capacity like any other work.

---

### Multi-Maker Work

Large features require coordination without ceremony:

**Break vertically.** Each maker owns an end-to-end slice, not a horizontal layer. Slices ship independently.

**Define interfaces first.** Agree on contracts. Work in parallel against them. Mock until real.

**Coordinate via doc.** One feature doc serves as source of truth. Makers claim slices, flag blockers, log decisions. Update async.

**Sync only when stuck.** When async fails, meet briefly. Document outcome. Return to async.

---

### Avoiding Chokepoints

**Reviews:** Anyone can review, so nobody is the assigned reviewer. Four working-hour response window, counted inside the coverage hours of the reference time zone. Auto-proceed after 24 working hours if the build passes: the author merges, or asks the Enabler to merge, once the window closes. A change with security, data-migration or billing impact, and a change to a dependency other teams consume, waits for a named reviewer and never auto-proceeds. Open review comments also stop auto-proceed: the author answers them or asks for a named reviewer.

**Merges:** Merge main daily. Claim files in the branch protection rule before you start; when two makers claim the same file, the earlier claim stands and the later one re-plans around it. Keep branches short-lived. A day is a working day in the reference time zone.

**Blockers:** Surface in check-in. Pull different work while waiting. The Enabler escalates a blocker inside the team by reordering the board; a blocker that belongs to another team is escalated through the dependency rules.

**Decisions:** Post a recommendation naming the owner. Wait one working day. No objection means the decision is recorded and stands; silence is not consent on its own, so the record says who decided. An objection moves it to a brief synchronous discussion, and the owner decides.

---

### Spotted Issues

When you find something wrong while doing something else:

**Blocking your work?** Fix now.

**Five minutes or less?** Fix now.

**More than five minutes, not blocking?** Log it, continue. Protect your focus.

**Production critical?** Flag team immediately.

The five-minute line is a BEAT default, not a measured threshold: it is the point at which the fix stops being cheaper than the context switch. A spotted issue that is logged as its own item does not block the work that found it, provided it is recorded before the merge.

---

### Burnout Prevention

**Plan at 80%.** The Enabler sets the capacity plan per maker for each beat, at eighty percent of that maker's available working time, and the plan says what does not fit. Leave room for spotted issues, complexity, life.

**Protect exploration time.** A fifth of each maker's working time, moved to the next beat and recorded when the team is busy. No justification needed.

**Enforce boundaries.** No after-hours expectation. Vacation means offline. Mental health days need no explanation.

**Monitor health.** Every beat close: Did anyone crunch? Is anyone overwhelmed? Are boundaries respected? The warning signs and their thresholds are listed with the measurement rules.

**Cut scope, not sleep.** When deadlines conflict with capacity, the deadline yields or the scope shrinks. Never the person.

---

<!-- id: measurement -->

### Accountability and Measurement

We promise outcomes and measure activity. This says which is which, who measures, and when.

This applies to every team that runs BEAT, for every beat. The Enabler owns the measurement for the beat; the team reviews it at the beat close and changes the measures it does not want.

**What is measured.** The outcome the team was set up to deliver, and whether the work landed. Not hours, not tasks completed, not points, not activity.

**Who measures.** The Enabler collects the evidence for the beat; the team reviews it at the beat close. The people who did the work do not report their own hours.

**When.** Once per beat, at the beat close, and immediately when a warning sign fires.

**Window.** The outcome is judged over the window in which it could have landed: the beat for most work, and longer for work that cannot land inside one beat.

**Warning signs and their thresholds.** Overtime in two consecutive beats, or WIP at the limit in two consecutive beats, or the same blocker unresolved across two beats, or a maker who has missed two check-ins in a row. Each one is discussed at the next beat close, and the response is written down there.

**Not a scorecard.** The measurement exists to change the plan. It is not a ranking of makers, it is not reported upward as a performance figure, and it is not used to compare teams.

**When an outcome is not observable.** Work whose outcome is not observable — support, infrastructure, research, maintenance — is measured by the change it produced and reviewed at the beat close. It is never measured by hours.

**The assessment on this site.** The self-assessment is a self-report. It has no validity evidence, it does not measure the outcomes above, and it is a starting point for a conversation rather than a measurement.

---

<!-- id: customerFeedback -->

### Customer & User Feedback

Work built away from users drifts away from what users need. We keep the line to users open. This section applies to every team that builds something users use. The team decides who reads user feedback; the Enabler makes sure the feedback reaches the makers who can act on it. A team with no direct user contact — an internal platform, for example — reads the requests of the teams that use it, and treats those requests as the user feedback.

**Direct access.** Makers can read support tickets, analytics and user interviews without them being filtered through several layers of management.

**Regular exposure.** At least once per beat, someone on the team reads real user feedback and shares the highlights asynchronously. The source is named, so a claim can be checked.

**Small releases.** Ship in small pieces so real usage can answer the question the work was built on.

**Problems, not solutions.** Users describe what hurts them; the team decides how to fix it. The proposed solution is treated as one input, not as the answer.

**Close the loop.** When a release answers a user request, the team tells the requester. That is how the next request arrives.

**What this is not.** This is a practice the team commits to, not a researched effect on delivery. It is written down because the team intends to do it, and it is reviewed like any other practice.

---

### Incidents & Emergencies

When production breaks, normal rules suspend temporarily:

**What qualifies as an incident:**
- Users cannot complete critical actions
- Data integrity is at risk
- Security vulnerability is being exploited
- Significant revenue or reputation impact

**Incident protocol:**

1. **Alert** — Post immediately in the incident channel. The on-call rota names who to call and the fallback when nobody answers.
2. **Acknowledge** — Someone claims ownership within fifteen minutes of the alert, and becomes the incident lead for the rest of the incident.
3. **Communicate** — Status updates every half hour until the incident is stable. The meeting budget does not apply during an incident; the incident lead decides when normal rules resume.
4. **Fix** — Stabilize first, improve later. Rollback is a valid fix.
5. **Document** — Async post-mortem within two days. No blame. Root cause and prevention, with the action items tracked to completion.

**During incidents:**
- The incident lead may suspend a sacred block, and only for the time the incident runs
- Sync communication is acceptable
- Async rules resume when the incident lead says they do
- Whoever is available helps—no "not my job"

**After incidents:**
- Post-mortem required (async document)
- Focus on systems, not individuals
- Action items tracked and completed
- Share learnings with team

**This is not normal work.** Incidents should be rare. If they're frequent, that's a systemic problem to solve—not a reason to abandon sustainable pace.

---

<!-- id: onCall -->

### On-call and Incident Rotation

The incident protocol covers the incident. This covers the rota that carries it.

This applies to any service with a production path a customer depends on. The team that owns the service sets the rota; the Enabler keeps it staffed and the Connector keeps it written down. A service with no customer-facing failure mode needs no rota. A team too small to share the load covers it in named hours rather than shifts, and says so.

**Rotation.** The rota names one person per shift and one backup, published in the service documentation. The rota is set per beat and reviewed at each beat close.

**Handover.** Each handover is written: what is open, what is watching, what broke last time. The incoming shift reads it before the outgoing shift ends.

**Availability.** On-call means reachable during the shift, not watching screens. Outside the shift, a maker is offline and pages are not expected.

**Who may declare an incident.** Anyone may raise the alert; the on-call maker decides whether it meets the incident criteria, and the acknowledgement step makes that maker the incident lead.

**Inside or outside the beat.** On-call time is planned capacity, not overtime. The Enabler plans the on-call load into the beat and lowers the planned commitment of whoever is on.

**Compensation.** On-call time back is taken in time: the maker chooses the following working time they hand back, and the Enabler protects it.

**Escalation.** If the on-call maker cannot resolve within the acknowledgement window, they escalate to the backup, then to the incident lead named in the rota, then to the Enabler.

---

<!-- id: timeZones -->

### Working across Time Zones

Every rule in BEAT that counts time assumes one working day. Here is the one this team uses.

This applies to every rule measured in hours or days: response expectations, the review window, auto-proceed, stale items, daily merges and the daily check-in. The team names its reference time zone at the start of a beat; the Enabler records it with the beat goals. A team that spans zones unevenly picks the zone with the fewest members as the reference, or picks no reference and states each rule in absolute hours instead.

**Coverage hours.** The team states the hours it is covered, in the reference time zone, and publishes them. Outside those hours a maker is offline.

**Reference time zone.** One named time zone starts every clock in BEAT: the review window, auto-proceed, staleness and the daily merge. It is written down where the board lives.

**Overlap hours.** Ceremonies run inside the overlap between the zones they span. A ceremony that has no overlap is written instead, and read asynchronously.

**Handover.** The team that ends its day writes the state of open work before it ends, so the next team starts from the written state rather than from a message.

**Daily check-in.** The check-in is posted in the maker's own working day, not in the reference one. A maker whose day has barely started posts when it starts for them.

**Sacred blocks.** A maker's sacred block sits in their own working day. Nobody schedules into another maker's block, and a block in one zone is never a reason to be online in another.

**Urgent work across zones.** Urgency follows the rota, not the person who noticed. If nobody on the rota is in working hours, the issue waits unless it meets the incident criteria.

---

<!-- id: crossTeamDependencies -->

### Dependencies across Teams

Escalation, connectors and interfaces all stop at the team boundary. Here is how work crosses it.

This applies to any work item that depends on another team, and any commitment this team makes to another team. The Enabler owns the dependency list; the team that owns the other side owns the work on their side. A dependency with no counterpart on the other side is escalated to the Connector, who finds an owner or says the work cannot proceed on that dependency.

**Naming the dependency.** An item with a dependency names the other team and the thing they owe: a decision, a date, an interface. "Blocked on platform" is not a dependency.

**Raising it.** The dependency is posted in the check-in the day it appears, not when it starts to hurt. The Enabler carries it to the other team's Enabler.

**Interfaces.** Agreed contracts are written before either side builds, and they are versioned. Changing an agreed interface is a change to both teams' plans, and both are told.

**Commitments to other teams.** A commitment this team makes to another team is recorded in the same place as the board, with the date and the owner, so it is not lost when the beat ends.

**Shared foundations.** A change to a shared library or platform that affects several teams is raised with all affected teams before it is scheduled, not after.

**When the other side does not answer.** An unanswered dependency is escalated by the Enabler to the other team's Enabler, and then to their manager. The team that is blocked records what it is not doing while it waits.

---

### Technical Practices (Optional)

BEAT does not prescribe technical practices. These apply to one repository or service, adopted by the team that owns it. The team that owns the code decides. A practice that only partly applies — automated testing on a codebase with no test harness, for example — is adopted in the part that applies, and the team writes down the part it defers and when it returns to it.

**Continuous Integration** — Merge frequently. Keep main deployable. Automated tests run on every push.

**Small Pull Requests** — Easier to review, faster to merge, lower risk. Aim for PRs a reviewer can read in one sitting — a BEAT default, not a measured threshold.

**Feature Flags** — Merge incomplete work safely. Decouple deployment from release. Enable experimentation.

**Automated Testing** — Tests enable confidence. Confidence enables speed. Coverage targets are team-decided.

**Refactoring as You Go** — Leave code better than you found it. Small improvements compound. No permission needed.

**Trunk-Based Development** — Short-lived branches. Merge daily. Claim files in the branch protection rule before you start; when two makers claim the same file, the earlier claim stands and the later one re-plans around it. A day is a working day in the reference time zone.

These are not mandated. They are offered as practices that support focus, speed, and quality. Adopt what serves you. Discard what doesn't.

---

<!-- id: onboarding -->

## Onboarding to BEAT

When someone new joins a BEAT team:

### Week One: Observe

- Read this manifesto
- Read the decision log, the architecture notes and the board history for the area you join
- Shadow async check-ins and board activity
- Observe one Beat Start and/or Beat Close
- Get access to tools, repos, docs
- Meet team members one to one: the Connector or the Enabler arranges it, you choose the format and the time, and a written exchange counts as a meeting

### Week Two: Participate

- Pull first small task (S-sized)
- Post first daily check-in
- Submit first PR, and treat the first review as teaching rather than as the review window
- Ask questions freely—in channel, not DMs (so others learn too)

### Week Three: Contribute

- Pull regular work items
- Participate in Beat Close
- Start taking ad-hoc help requests
- Begin exploration time

### First Month Expectations

- Understand the board and priority buckets
- Know how to post check-ins and flag blockers
- Completed several work items end-to-end
- Experienced one full beat cycle
- Identified sacred block timing that works

### Reading List

- This manifesto
- The decision log for the area you join: what was decided, by whom, and why
- The architecture notes for the services you will touch
- The board history for the last two beats: what was tried, what shipped, what was dropped

### Your First Review

- Your first pull request is reviewed for teaching, not against the review window
- It does not auto-proceed: you ask a named maker for the review and you wait
- After your first merged item, the review window applies to you like it does to everyone else

### When the Ramp Is Not Working

- Say so in the first week, not after the first month: the Connector or the Enabler adjusts the ramp or the plan
- The Enabler re-scopes your first items until they fit the time you actually have
- If the ramp is still blocked two weeks in, the Enabler raises it at the next beat close and the team changes the plan
- You may decline work, meetings and on-call during the ramp, and the team plans around that

### On Junior-Heavy Teams

- Where BEAT fits poorly is on junior-heavy teams that need close guidance, so those teams add a mentor on top of this ramp
- The mentor is a named maker who reviews the new member's first items and answers questions in working hours
- The mentor's time is planned capacity like any other work, not an overflow
- The ramp lengthens: the new member pulls feature work only after the first month

### Connector's Responsibility

The Connector (or Enabler if no Connector) ensures:
- Documentation is current and findable
- First tasks are well-scoped and achievable
- Overwhelm is caught early

### What We Don't Do

- Throw new members into complex work immediately
- Expect full productivity in week one
- Leave people to figure it out alone
- Assign a mandatory buddy for months

Onboarding should feel like a gradual ramp, not a firehose or an abandonment.

---

## Anti-Patterns

Common ways teams fail at BEAT:

### Process Anti-Patterns

| Anti-Pattern | What It Looks Like | The Fix |
|--------------|-------------------|---------|
| **Async theater** | Writing decisions but ignoring comments | Genuine engagement or revert to sync |
| **Sacred block erosion** | "Quick calls" during focus time | Enabler enforces boundaries |
| **Check-in decay** | Updates become sporadic, then stop | Address in retro, understand why |
| **Permanent NOW** | Everything is urgent, always | If everything is NOW, nothing is. The Enabler returns items to NEXT until the bucket is inside its limit |
| **Grooming creep** | Meetings sneak back in disguised | Ask: could this be async? |
| **Document graveyard** | Docs written but never maintained | Connector role, or delete stale docs |

### People Anti-Patterns

| Anti-Pattern | What It Looks Like | The Fix |
|--------------|-------------------|---------|
| **Hero culture** | Same person handles all crises | Rotate, distribute, investigate cause |
| **Silent struggle** | Maker stuck for days, says nothing | Normalize asking for help early |
| **Autonomy hoarding** | One maker claims all interesting work | Discuss in retro, Enabler balances |
| **Review blocking** | PRs languish waiting for "the" reviewer | Anyone can review, auto-proceed rule, with the exceptions in the review rule |
| **Passive Enabler** | Enabler doesn't shield or prioritize | Role clarity, or rotate role |

### Organizational Anti-Patterns

| Anti-Pattern | What It Looks Like | The Fix |
|--------------|-------------------|---------|
| **Management override** | Exec demands meeting during sacred block | Enabler pushes back, escalates pattern |
| **Stealth deadlines** | Surprise "we promised client by Friday" | Surface commitments before making them. A commitment already made outside the team is renegotiated by whoever made it, with the Enabler helping, and the team hears about it before the next beat starts |
| **Metric theater** | Tracking velocity, points, hours | Stop. Measure outcomes, not activity. |
| **BEAT in name only** | Ceremonies adopted, principles ignored | Re-read manifesto, recommit or don't claim BEAT |

### When BEAT Isn't Working

Signs the methodology isn't serving the team:

- Overtime in two consecutive beats
- WIP at the limit in two consecutive beats
- The same blocker unresolved across two beats
- A maker who has missed two check-ins in a row
- Decisions taking too long async
- Quality declining
- Team feeling disconnected
- Makers disengaged from beat goals

**Response:** Each of these is discussed at the next beat close, with the response written down there, and the plan is changed where it is the plan that failed. BEAT is a tool, not a religion. If it's not working, change it or choose something else.

---

## What We Have Learned

Some of what follows comes from published work, with the source named. The rest is what we have seen in the teams that run BEAT — our own observations, not research findings.

- Resuming interrupted work takes about twenty-five minutes [mark-2005]
- The most productive users tracked by DeskTime worked in blocks of fifty-two minutes, and about 3 hours 43 minutes of focused work per day for the top performers [desktime-2014]
- Seventy-one percent of 182 surveyed senior managers described their meetings as unproductive or inefficient [rogelberg-2019]
- Companies that tried a meeting-free Wednesday reported a productivity gain of up to 73% [mit-sloan-2017]
- Knowledge workers surveyed reported lower productivity above two hours a day in meetings [slack-workplace-lab-2017]
- Autonomy, competence and relatedness are the needs that make sustained motivation possible [deci-ryan-2000] — a general motivation theory, not a result about developers

And what we have observed ourselves: developers we work with ask for long stretches of low-stimulation time; the work that ships is the work nobody interrupted; teams that protect focus get their work done, while teams that spend the week in meetings do not. We built BEAT for these realities, not against them. Every number in the constraints table is a BEAT default chosen by the BEAT authors — the cited research informs the direction, not the numbers.

---

## Where BEAT Fits

These are the contexts we have seen BEAT used in, not a researched fit. The list records our practice; it is not a finding about what improves delivery.

BEAT has worked for us in:

- Remote-first or distributed teams, where written work carries the team across time zones
- Senior and mid-level developers, who need protection more than supervision
- Product companies, where the work is decided in the open
- Teams of three to eight people, where one Enabler can still hold the whole board
- High-trust environments, where the Enabler can order without a mandate
- Async-native cultures, where writing is already the default

BEAT has fitted poorly in:

- Junior-heavy teams needing close guidance, unless the team adds a mentor alongside the BEAT ramp
- Regulated industries requiring ceremony that BEAT does not provide
- Agency work with constant client sync, where the client calendar sets the meeting budget
- Organizations unwilling to protect focus time

BEAT has been adapted for:

- Incident response (see Incidents section)
- Mixed seniority (extra onboarding support)
- Larger teams (multiple BEAT teams with coordination layer)

Know your context. Adapt accordingly.

---

## The BEAT Commitment

By adopting BEAT, we commit to:

**Protecting focus** — We will not interrupt sacred time. We will wait. The one exception is a declared incident, and the incident lead decides when the block resumes.

**Defaulting to async** — We will write first, meet only when writing fails.

**Trusting makers** — We will provide goals, not instructions. Constraints, not control.

**Sustaining pace** — We will cut scope before we cut rest. We will plan for humans, not machines.

**Improving always** — We will reflect each beat. We will adjust. We will find better ways.

---

<!-- id: assessment-scoring -->

## The Self-Assessment

The site publishes a self-assessment: a short questionnaire a team fills in about its own practice, scored into four categories — focus, communication, autonomy and sustainability — and then into an overall band.

**How it is scored.** Every question is worth 0 to 4 points, and each category carries three questions, so the maximum score is 48. The thresholds are BEAT's own scoring rule, not a research finding: a category is low below 40 percent of its maximum, medium from 40 to 70 percent, and high above 70 percent. The same two cuts give the four overall bands: low 12 to 24, medium 25 to 36, strong 37 to 42, and high 43 to 48.

<!-- id: assessment-validity -->

**What it measures.** This is a self-report with no published validity evidence. It measures what a team believes about its own practice, not delivery, quality or wellbeing. Use it to start a conversation and to compare your own score over time, not as a benchmark against other teams.

---

## In Summary

```
We protect focus.
We write things down.
We trust each other.
We work sustainably.
We ship and learn.
```

---

*BEAT: Built for how developers actually work.*

---

## Appendix: Quick Reference

### The Core Values

| We Value More | Over |
|---------------|------|
| Deep work | Constant availability |
| Async communication | Synchronous meetings |
| Written documentation | Verbal agreements |
| Individual autonomy | Prescribed processes |
| Sustainable pace | Heroic effort |
| Small experiments | Careful plans |

### The Team Values

| Value | Meaning |
|-------|---------|
| Trust | Assume competence and good intent |
| Courage | Speak up, admit uncertainty, try new things |
| Candor | Honest feedback, surface problems early |
| Ownership | Take responsibility, don't wait to be told |
| Calm | No false urgency, protect each other's focus |

### The Numbers

Every limit below is a BEAT default chosen by the BEAT authors. None of them is a research finding; the cited research informs the direction, not these numbers.

| Constraint | Limit |
|------------|-------|
| Sacred block | 4 hours daily |
| Meetings per week | ≤2 hours total |
| Meeting duration | ≤1 hour each |
| WIP per maker | 3 items |
| Planning capacity | 80% of available working time |
| Exploration time | 20% of working time |
| NOW items | Max 5 |
| Review response | 4 working hours |
| Auto-proceed | 24 working hours |

### The Buckets

| Bucket | Meaning |
|--------|---------|
| NOW | Critical, blocking, deadline |
| NEXT | This beat, ordered stack |
| LATER | Future beats |
| ICEBOX | Someday, unclear |

### The Roles

| Role | Purpose |
|------|---------|
| Maker | Builds with autonomy |
| Enabler | Unblocks and shields |
| Connector | Maintains knowledge (optional) |

### The Ceremonies

| Event | Duration | Purpose |
|-------|----------|---------|
| Beat Start | 30 min | Goals, priorities |
| Beat Close | 30 min | Reflection, health |
| Ad-hoc Help | ≤25 min | Unblocking |
| Brainstorm | ≤1 hr | Creative solving |

### Definition of Done

```
Code:
✓ Works as intended
✓ Tests pass: the existing suite passes, and new behaviour carries a
  test unless the team has agreed an exception for it, which the
  Enabler records
✓ Reviewed by at least one other maker, or auto-proceeded under the
  review rule with the exceptions in that rule named in the merge
✓ Merged to main branch
✓ Deployable: the artefact builds and runs for the team's own use, and
  is deployed where the team deploys its own work
✓ No known defects introduced: a defect found during the work and
  logged as its own item does not block this one, provided it is
  recorded before the merge
```

### Daily Check-in Template

```
Working on: [task]
Blocked by: [nothing / issue]
```

### Spotted Issue Decision

```
Blocking? → Fix now
≤5 min?   → Fix now
>5 min?   → Log it, continue
Critical? → Flag team
```

### Incident Protocol

```
1. Alert (immediately)
2. Acknowledge (15 min)
3. Communicate (every 30 min)
4. Fix (stabilize first)
5. Document (within 48 hrs)
```

### The Self-Assessment

```
Categories: focus, communication, autonomy, sustainability
Questions per category: 3
Points per question: 0 to 4
Maximum score: 48

Category band: low below 40% of its maximum,
               medium from 40% to 70%,
               high above 70%
Overall band:  low 12 to 24
               medium 25 to 36
               strong 37 to 42
               high 43 to 48
```

The scoring rule is BEAT's own, not a research finding. The assessment is a self-report with no published validity evidence: it measures what a team believes about its own practice, not delivery, quality or wellbeing. Use it to start a conversation and to compare your own score over time, not as a benchmark against other teams.

---

## License

This manifesto is open for use and adaptation.

Attribution appreciated. Improvement welcomed. Dogma discouraged.

The weak-point review of this manifesto — every unsupported claim, wrong number, contradiction, uncovered situation and rule that cannot be applied as written, with the planned resolution for each — is recorded in [docs/weak-points.md](docs/weak-points.md).

---

## References

Every inline citation above points to an entry here. The ids are the ones the site uses, so a claim can be checked against the same source from either side.

- **[deci-ryan-2000]** Deci, E. L., & Ryan, R. M. (2000). "The 'what' and 'why' of goal pursuits: Human needs and the self-determination of behavior." *Psychological Inquiry*, 11(4), 227–268. DOI: [10.1207/S15327965PLI1104_01](https://doi.org/10.1207/S15327965PLI1104_01). — Cited for the motivation claim only: autonomy, competence and relatedness as basic psychological needs. A general motivation theory, not a finding about developers.
- **[mark-2005]** Mark, G., González, V. M., & Hessian, J. (2005). "No Task Left Behind? Examining the Nature of Multitasking." *Proceedings of CHI 2005*, 1529–1537. DOI: [10.1145/1060759.1060818](https://doi.org/10.1145/1060759.1060818). — Reports roughly twenty-five minutes to return to an interrupted task.
- **[desktime-2014]** DeskTime (2014). Analysis of its own tracked users: the most productive tenth of users worked in blocks of 52 minutes followed by 17-minute breaks. — DeskTime blog, 2014. DeskTime is the publisher of the study, so no third-party DOI exists; the blog post is the published work. The 52-minute figure is the length of a productive work block, not the time it takes to reach focus. The same analysis reports about 3 hours 43 minutes of focused work per day for the top performers.
- **[mit-sloan-2017]** MIT Sloan Management Review (2017). "Meeting-Free Wednesdays": study of 76 companies that tried a meeting-free Wednesday. — MIT Sloan Management Review, 2017 issue. Reported an increase in productivity of up to 73% and a drop in stress of 57% in the participating companies. Self-reported by the companies, so it is a practice report, not a controlled trial.
- **[rogelberg-2019]** Rogelberg, S. (2019). *The Surprising Science of Meetings: How You Can Lead Your Team to Peak Performance*. Oxford University Press. ISBN 978-0-19-008948-7. — Reports that 71% of 182 surveyed senior managers described their meetings as unproductive or inefficient. The survey asked whether meetings were unproductive and inefficient, not whether they failed at their stated purpose.
- **[slack-workplace-lab-2017]** Slack Workplace Lab (2017). Survey of knowledge workers on meeting load and productivity. — Slack Workplace Lab research report, 2017. Found that spending more than two hours a day in meetings was associated with lower productivity. It reports no percentage drop in output, so no figure of that kind is quoted in this manifesto.

---

*BEAT v1.0*
