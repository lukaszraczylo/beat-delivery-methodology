# Information architecture

The site is one document — the BEAT manifesto — split into pages. This document lists the sections and pages, their order and their purpose. It is the reference for the router (`public/src/router/index.js`), the header navigation and the section navigation.

The route table below is the source of truth for paths, page titles and section membership. The router exports the same data as `sections` and per-route `meta`, so no other file hard-codes a section list.

## Sections

Sections group pages by the question a reader asks. The order is the reading order.

| Order | Section id | Label | Question it answers |
| --- | --- | --- | --- |
| 1 | `start` | Start | What is BEAT and where do I begin? |
| 2 | `foundations` | Foundations | What does BEAT value and what does it claim? |
| 3 | `method` | The Method | How does a BEAT team plan and work? |
| 4 | `applying` | Applying BEAT | How does a team adopt BEAT and check that it works? |
| 5 | `reference` | Reference | What are the numbers, roles and templates? |

## Pages

| Section | Order in section | Path | Page title (`meta.title`) | Purpose |
| --- | --- | --- | --- | --- |
| `start` | 1 | `/` | Home | State the manifesto, the core values and the commitment, and offer the two next steps: read the values or assess the team. |
| `foundations` | 1 | `/foundations/values` | Values | List the core values and the five team values, with the behaviour each value requires. |
| `foundations` | 2 | `/foundations/principles` | Principles | State the twelve principles in four groups (focus, communication, autonomy, sustainability) and their summary. |
| `method` | 1 | `/method/framework` | The Framework | Define roles, beats, work items, prioritisation buckets, the board and the planning numbers. |
| `method` | 2 | `/method/practices` | Practices | Define meetings, the daily check-in, collaboration, the definition of done, incident handling and optional technical practices. |
| `applying` | 1 | `/applying/onboarding` | Onboarding | Give a three-week onboarding path and the first-month expectations for a new maker and for the connector. |
| `applying` | 2 | `/applying/anti-patterns` | Anti-Patterns | Name process, people and organisational anti-patterns, when BEAT is not working, and where the method fits. |
| `applying` | 3 | `/applying/assessment` | Team Assessment | Let a team score itself against the principles and read the result. |
| `reference` | 1 | `/reference` | Quick Reference | Collect the values, numbers, buckets, roles, ceremonies, templates, definition of done and incident protocol for lookup. |
| `start` | 99 | catch-all | Page not found | Answer an unknown path with the not-found page. |

The catch-all is a page in the `start` section for routing purposes only; it does not appear in the section navigation.

## URL compatibility

Every path published before the redesign stays valid. The old flat paths are declared as aliases of the new pages, so a request to an old path renders its new page without a second navigation. The pre-redesign list is in `docs/pre-redesign-routes.md`.

| Old path | New path |
| --- | --- |
| `/` | `/` |
| `/values` | `/foundations/values` |
| `/principles` | `/foundations/principles` |
| `/framework` | `/method/framework` |
| `/practices` | `/method/practices` |
| `/onboarding` | `/applying/onboarding` |
| `/anti-patterns` | `/applying/anti-patterns` |
| `/assessment` | `/applying/assessment` |
| `/reference` | `/reference` |

## Wayfinding

- The header navigation lists the five sections in `order`, built from the `sections` export.
- The section navigation lists the pages of the current section, ordered by `meta.sectionOrder`, filtered by `meta.section`.
- Every page has a unique `meta.title` in the router; the document title and the page heading take their text from it.
- Both navigations must be persistent on every page and keyboard operable. The components that render them live in `public/src/components/layout`; this document fixes their data, not their markup.

## Route contract

Each page route in `public/src/router/index.js` carries:

- `meta.title` — unique per page, used for the document title and the page heading.
- `meta.section` — one of the section ids above.
- `meta.sectionOrder` — the page's position inside its section.

The catch-all route carries the same keys so that every route has a title and a section.
