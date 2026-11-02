# Section and principle map

The BEAT manifesto exists twice: as `README.md` and as the site content in `public/src/data`. This document is the committed map between the two. Every section and every principle carries an id; this table gives, for each id, the README heading it sits on, the line of the README anchor that marks it, and the site data key that holds it.

The map is the reference for the consistency check that confirms no section or principle exists on only one side. It is generated from the files, not from memory: the README side is the set of `<!-- id: xxx -->` HTML comment anchors in `README.md`, and the data side is the `sectionMap` export in `public/src/data/manifesto.js` (line 239).

## How to read the table

- **Id** — the shared identifier. It is the text inside the README's `<!-- id: xxx -->` comment and the `id` field in the data's `sectionMap`. It appears in neither rendered output, so the id can change without changing what a reader sees.
- **README heading** — the Markdown heading the id belongs to, with its heading level and line number.
- **Anchor line** — the line of the `<!-- id: xxx -->` comment in `README.md`.
- **Anchor marks** — what the anchor introduces. For eleven ids this is the heading itself, one blank line below the anchor. For the two assessment ids it is a paragraph, and the row says which.
- **Site data key** — the path to the data that holds the same content, relative to `public/src/data/manifesto.js` or `public/src/data/assessment.js`.

## The map

| Id | README heading | Anchor line | Anchor marks | Site data key |
| --- | --- | --- | --- | --- |
| `principle-focus` | `On Focus` (H3, line 53) | line 51 | the heading | `principles.focus` |
| `principle-communication` | `On Communication` (H3, line 71) | line 69 | the heading | `principles.communication` |
| `principle-autonomy` | `On Autonomy` (H3, line 89) | line 87 | the heading | `principles.autonomy` |
| `principle-sustainability` | `On Sustainability` (H3, line 107) | line 105 | the heading | `principles.sustainability` |
| `section-method` | `The Framework` (H2, line 125) | line 123 | the heading | `framework` |
| `measurement` | `Accountability and Measurement` (H3, line 330) | line 328 | the heading | `measurement` |
| `customerFeedback` | `Customer & User Feedback` (H3, line 356) | line 354 | the heading | `customerFeedback` |
| `onCall` | `On-call and Incident Rotation` (H3, line 410) | line 408 | the heading | `onCall` |
| `timeZones` | `Working across Time Zones` (H3, line 434) | line 432 | the heading | `timeZones` |
| `crossTeamDependencies` | `Dependencies across Teams` (H3, line 458) | line 456 | the heading | `crossTeamDependencies` |
| `onboarding` | `Onboarding to BEAT` (H2, line 500) | line 498 | the heading | `onboarding` |
| `assessment-scoring` | `The Self-Assessment` (H2, line 694) | line 692 | the heading; the scoring rule is the paragraph `**How it is scored.**` at line 698 | `overallAssessment.scoring` |
| `assessment-validity` | `The Self-Assessment` (H2, line 694) | line 700 | the paragraph `**What it measures.**` at line 702, under that heading | `overallAssessment.validity` |

Thirteen ids, one row each. The two assessment ids share the `## The Self-Assessment` heading. `assessment-scoring` marks the scoring rule in the paragraph at `README.md:698`; `assessment-validity` marks the validity note in the paragraph at `README.md:702`. Neither paragraph is a heading, so `assessment-validity` has no heading of its own — it is anchored to the section heading that contains it, and the row says so.

## The five named situations

The brief for this project names five situations the method must cover: incidents and on-call, time zones, onboarding, cross-team dependencies, and accountability and measurement. Each has a dedicated subsection on both sides.

| Situation | Id | README heading and line | Site data key | Data export at |
| --- | --- | --- | --- | --- |
| Incidents and on-call | `onCall` | `On-call and Incident Rotation`, `README.md:410` | `onCall` | `manifesto.js:593` |
| Time zones | `timeZones` | `Working across Time Zones`, `README.md:434` | `timeZones` | `manifesto.js:628` |
| Cross-team dependencies | `crossTeamDependencies` | `Dependencies across Teams`, `README.md:458` | `crossTeamDependencies` | `manifesto.js:667` |
| Accountability and measurement | `measurement` | `Accountability and Measurement`, `README.md:330` | `measurement` | `manifesto.js:702` |
| Onboarding | `onboarding` | `Onboarding to BEAT`, `README.md:500` | `onboarding` | `manifesto.js:441` |

### `customerFeedback` is not one of the five

`customerFeedback` (`Customer & User Feedback`, `README.md:356`, data key `customerFeedback`, export at `manifesto.js:741`) is a **sixth section**, not one of the five named situations. It is in the map for completeness, because it exists on both sides and the consistency check compares it like any other id. It must not be counted or presented as one of the five situations.

## Id sets found on each side

Collected from the files at the branch head, not from the brief.

**README side** — the `<!-- id: xxx -->` anchors in `README.md` (13):

```
assessment-scoring
assessment-validity
crossTeamDependencies
customerFeedback
measurement
onCall
onboarding
principle-autonomy
principle-communication
principle-focus
principle-sustainability
section-method
timeZones
```

**Data side** — the `sectionMap` export in `public/src/data/manifesto.js` (13), including the four principle rows that `sectionMap` spreads in from `principleSections` (`manifesto.js:45-50`):

```
assessment-scoring
assessment-validity
crossTeamDependencies
customerFeedback
measurement
onCall
onboarding
principle-autonomy
principle-communication
principle-focus
principle-sustainability
section-method
timeZones
```

**Intersection** — all 13 ids are on both sides:

```
assessment-scoring
assessment-validity
crossTeamDependencies
customerFeedback
measurement
onCall
onboarding
principle-autonomy
principle-communication
principle-focus
principle-sustainability
section-method
timeZones
```

**One-sided ids** — none.

```
README-only: (none)
Data-only:  (none)
```

Every id the data side exposes has a README anchor, and every README anchor has a data key. No id exists on only one side.

### Ids that are out of scope

Other id namespaces exist in the repository. They are not section or principle ids and are not part of this map.

| Namespace | Where | Examples |
| --- | --- | --- |
| Citation keys | `public/src/data/references.js` | `mark-2005`, `desktime-2014`, `rogelberg-2019`, `deci-ryan-2000`, `mit-sloan-2017`, `slack-workplace-lab-2017` |
| Assessment category ids | `public/src/data/assessment.js:3-28` | `focus`, `communication`, `autonomy`, `sustainability` |
| Site navigation section ids | `public/src/router/index.js:5-9` | `start`, `foundations`, `method`, `applying`, `reference` |

The four assessment category ids (`focus`, `communication`, `autonomy`, `sustainability`) are the categories the twelve principles are scored under. They are not the same ids as `principle-focus` and friends, and are deliberately not mapped here.

## Notes on the two sides

### Heading text differs by letter case in five rows

The README uses title case for its headings; `sectionMap` records the sentence case used by the data structures. The content is the same section in both cases. This is a difference in label text, not a one-sided id.

| Id | README heading | `sectionMap` heading |
| --- | --- | --- |
| `measurement` | Accountability and Measurement | Accountability and measurement |
| `onCall` | On-call and Incident Rotation | On-call and incident rotation |
| `timeZones` | Working across Time Zones | Working across time zones |
| `crossTeamDependencies` | Dependencies across Teams | Dependencies across teams |
| `assessment-scoring` | The Self-Assessment | Assessment scoring |
| `assessment-validity` | The Self-Assessment (paragraph `What it measures.`) | Assessment validity |

The last two are not case differences: the data side names the two paragraphs by what they hold, while the README has one heading with two paragraphs under it.

### The `framework` subsection lists differ in order and in one member

`framework.subsections` (`manifesto.js:210-232`) lists 21 names. The README's `## The Framework` section carries 20 `###` headings between `README.md:125` and `README.md:498`.

- `Onboarding to BEAT` is a member of `framework.subsections` and is a top-level `##` heading in the README, not a `###` under `## The Framework`. It is mapped here under its own id, `onboarding`.
- The two lists also order the same names differently. The data order is `Customer & User Feedback`, `Incidents & Emergencies`, `Technical Practices (Optional)`, `On-call and incident rotation`, `Working across time zones`, `Dependencies across teams`, `Accountability and measurement`, `Onboarding to BEAT`. The README order is `Accountability and Measurement`, `Customer & User Feedback`, `Incidents & Emergencies`, `On-call and Incident Rotation`, `Working across Time Zones`, `Dependencies across Teams`, `Technical Practices (Optional)`.

No name is present in one list and missing from the other, other than `Onboarding to BEAT` as described. The map is by id, so the ordering difference does not make an id one-sided.

## Verification

The commands that produced the id sets and the table, run at the branch head:

```sh
grep -n '<!-- id:' README.md
grep -n '^export const' public/src/data/manifesto.js public/src/data/assessment.js
sed -n '239,250p' public/src/data/manifesto.js
```

The consistency check script that reads this map is owned by another card. It must report zero one-sided ids against the sets above.
