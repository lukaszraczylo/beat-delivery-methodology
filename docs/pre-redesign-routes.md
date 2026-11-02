# Pre-redesign routes

Baseline captured from the repository before any route was changed, at commit `9560c2c` (2026-11-02). This document is the "before" list that the URL-compatibility check measures against. Do not rewrite it after the router changes.

## How this list was captured

- Router: `public/src/router/index.js` at the baseline commit (all `path` values in the `routes` array).
- Site links: every link target in `README.md` and every internal link in `public/src` (`RouterLink` targets and hard-coded path strings).
- Deploy: `.github/workflows/deploy.yml` (build and publish steps) and `public/vite.config.js` (base URL and history mode).

## Published URL form

The site uses Vue Router hash history (`createWebHashHistory`) with Vite `base: './'`, and the GitHub Pages workflow publishes the contents of `public/dist` (`actions/upload-pages-artifact` with `path: ./public/dist`). A route therefore reaches the browser as the page URL plus a fragment:

```
https://<owner>.github.io/<repo>/#<route-path>
```

The hash fragment is resolved by the app, so every route below is a client-side path. No `404.html` file and no catch-all route existed at the baseline, so an unknown fragment rendered the app shell with an empty router view.

## Routes defined by the router

| Path | Route name | View component |
| --- | --- | --- |
| `/` | `Home` | `@/views/HomeView.vue` |
| `/values` | `Values` | `@/views/ValuesView.vue` |
| `/principles` | `Principles` | `@/views/PrinciplesView.vue` |
| `/framework` | `Framework` | `@/views/FrameworkView.vue` |
| `/practices` | `Practices` | `@/views/PracticesView.vue` |
| `/onboarding` | `Onboarding` | `@/views/OnboardingView.vue` |
| `/anti-patterns` | `AntiPatterns` | `@/views/AntiPatternsView.vue` |
| `/reference` | `Reference` | `@/views/ReferenceView.vue` |
| `/assessment` | `Assessment` | `@/views/AssessmentView.vue` |

Source: `git show 9560c2c:public/src/router/index.js`.

## Paths linked from README.md

`README.md` contains one Markdown link, `[docs/weak-points.md](docs/weak-points.md)`, which points at a repository file, not a site route. It contains no links to the published site and no route paths. The route list above is therefore the complete set of published paths at the baseline.

Source: `grep -n "](\|https\?://" README.md` returns only that link.

## Paths referenced by the GitHub Pages workflow

`.github/workflows/deploy.yml` references no individual route. It references the build output directory only:

- `working-directory: ./public` with `npm ci` and `npm run build`
- `path: ./public/dist` for `actions/upload-pages-artifact@v3`

The output directory must stay `public/dist`.

## Internal links that point at these routes

These are the in-app links at the baseline. They must keep resolving after the restructure.

- `public/src/components/layout/NavBar.vue`: `/`, `/values`, `/principles`, `/framework`, `/practices`, `/onboarding`, `/anti-patterns`, `/reference`, `/assessment`
- `public/src/components/layout/Footer.vue`: `/`, `/values`, `/principles`, `/framework`, `/reference`, `/assessment`, `/anti-patterns`, `/onboarding`, `/practices`
- `public/src/views/HomeView.vue`: `/values`, `/principles`, `/framework`, `/practices`, `/onboarding`, `/reference`, `/assessment`
- `public/src/views/AssessmentView.vue`: `/values`

## Path-like references outside the router

- `public/index.html` loads the favicon from the absolute path `/favicon.svg`. It is a static asset in `public/public/favicon.svg`, not a route, and is recorded here only because it is the one other path literal the published page references. Vite rewrites it to `./favicon.svg` in the built output, as `grep -o 'href="[^"]*favicon[^"]*"' public/dist/index.html` shows.

## Compatibility requirement

Every path in the table under "Routes defined by the router" must resolve to its intended page after the redesign: either unchanged, or through a redirect or alias declared in `public/src/router/index.js`.
