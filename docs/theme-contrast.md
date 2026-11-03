# Theme contrast measurements

Measured contrast ratios for the theme token contract, in the light theme and in the dark theme. Every number in the table below was produced by the harness in this repository, not estimated by hand.

- **Harness:** `scripts/check-contrast.mjs`
- **Pair list:** `scripts/contrast-pairs.json`
- **Token source:** `public/src/main.css` (`:root` block for light, `.dark` block for dark)
- **Measured at:** the token values of commit `552d8474bf68e3fe37950fb7a97196daf33f84c0`, 2026-11-02. The token file is unchanged between that commit and this one (`git diff 552d847 HEAD -- public/src/main.css public/tailwind.config.js` is empty), so the table still holds at the branch head.
- **Result:** 16 pairs measured in 2 themes = 32 measurements, 32 pass, 0 fail

Reproduce with:

```
node scripts/check-contrast.mjs
```

The harness exits `0` when every pair meets its threshold, `1` when at least one pair is below its threshold (naming each failing pair with its token names, values, measured ratio and required threshold), and `2` on a usage or I/O error.

## Which stylesheet holds the tokens

Two stylesheets are imported by `public/src/main.js`. The contrast is measured against the one the browser actually receives.

- `public/src/assets/styles/main.css` is the legacy Tailwind stylesheet. It contains no `:root` block, no `.dark` block and no `--color-*` declaration, so it holds no theme token values.
- `public/src/main.css` is the token stylesheet. It holds the only `:root` block and the only `.dark` block, with the nine semantic colour tokens.

The built bundle confirms this. After `npm run build` in `public/`, the token blocks are the last rules of the built stylesheet `public/dist/assets/index-WwvGP2s-.css`, and `public/dist/index.html` links that file. The hashed file name is the one from the build at the measured commit, so it changes if the stylesheet changes:

```
$ grep -cE '(^|[^-\w])\:root\s*\{' public/src/assets/styles/main.css
0
$ grep -cE '\.dark\s*\{' public/src/assets/styles/main.css
0
$ grep -c -- '--color-' public/src/assets/styles/main.css
0
$ grep -cE '(^|[^-\w])\:root\s*\{' public/src/main.css
1
$ grep -cE '\.dark\s*\{' public/src/main.css
1
$ grep -c -- '--color-' public/src/main.css
27
$ grep -oE 'href="\./assets/index-[^"]*\.css"' public/dist/index.html
href="./assets/index-WwvGP2s-.css"
$ tail -c 400 public/dist/assets/index-WwvGP2s-.css
...d-foreground:#475569;--color-border:#64748b;--color-accent:#1d4ed8;--color-accent-foreground:#fff;--color-text-body:#374151;--color-text-large:#1f2937}.dark{--color-background:#0f172a;--color-foreground:#f8fafc;--color-muted:#1e293b;--color-muted-foreground:#94a3b8;--color-border:#7c8ca3;--color-accent:#60a5fa;--color-accent-foreground:#0f172a;--color-text-body:#cbd5e1;--color-text-large:#e2e8f0}
```

The start of the tail is elided with `...`; the token blocks are the two rules at the end of the file.

Running the harness against the built bundle gives the same ratios as the table below, which confirms the token file is what the browser sees:

```
$ node scripts/check-contrast.mjs --tokens public/dist/assets/index-WwvGP2s-.css --json
... "pairs": 16, "failures": 0 ...
```

## Thresholds

The threshold for each pair comes from its own `threshold` field in `scripts/contrast-pairs.json`, and the harness checks it against the category default, so a threshold that disagrees with its category is rejected:

- `body-text` — 4.5:1 (WCAG 2.2 SC 1.4.3 Contrast Minimum).
- `large-text` — 3:1 (WCAG 2.2 SC 1.4.3, large-scale text).
- `ui-component` — 3:1 (WCAG 2.2 SC 1.4.11 Non-text Contrast, for component boundaries such as borders and focus outlines).

## Measured table

Ratios are computed with the WCAG 2.2 relative-luminance formula, `(L1 + 0.05) / (L2 + 0.05)`, and rounded to two decimals for display. The harness compares the unrounded ratio against the threshold.

| Pair | Category | Light foreground | Light background | Light ratio | Dark foreground | Dark background | Dark ratio | Threshold | Result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `body-text-on-background` | body-text | `--color-text-body` #374151 | `--color-background` #ffffff | 10.31:1 | `--color-text-body` #cbd5e1 | `--color-background` #0f172a | 12.02:1 | 4.5:1 | pass |
| `body-text-on-muted` | body-text | `--color-text-body` #374151 | `--color-muted` #f1f5f9 | 9.41:1 | `--color-text-body` #cbd5e1 | `--color-muted` #1e293b | 9.85:1 | 4.5:1 | pass |
| `foreground-on-background` | body-text | `--color-foreground` #111827 | `--color-background` #ffffff | 17.74:1 | `--color-foreground` #f8fafc | `--color-background` #0f172a | 17.06:1 | 4.5:1 | pass |
| `foreground-on-muted` | body-text | `--color-foreground` #111827 | `--color-muted` #f1f5f9 | 16.19:1 | `--color-foreground` #f8fafc | `--color-muted` #1e293b | 13.98:1 | 4.5:1 | pass |
| `muted-foreground-on-background` | body-text | `--color-muted-foreground` #475569 | `--color-background` #ffffff | 7.58:1 | `--color-muted-foreground` #94a3b8 | `--color-background` #0f172a | 6.96:1 | 4.5:1 | pass |
| `muted-foreground-on-muted` | body-text | `--color-muted-foreground` #475569 | `--color-muted` #f1f5f9 | 6.92:1 | `--color-muted-foreground` #94a3b8 | `--color-muted` #1e293b | 5.71:1 | 4.5:1 | pass |
| `accent-text-on-background` | body-text | `--color-accent` #1d4ed8 | `--color-background` #ffffff | 6.70:1 | `--color-accent` #60a5fa | `--color-background` #0f172a | 7.02:1 | 4.5:1 | pass |
| `accent-text-on-muted` | body-text | `--color-accent` #1d4ed8 | `--color-muted` #f1f5f9 | 6.12:1 | `--color-accent` #60a5fa | `--color-muted` #1e293b | 5.75:1 | 4.5:1 | pass |
| `accent-foreground-on-accent` | body-text | `--color-accent-foreground` #ffffff | `--color-accent` #1d4ed8 | 6.70:1 | `--color-accent-foreground` #0f172a | `--color-accent` #60a5fa | 7.02:1 | 4.5:1 | pass |
| `large-text-on-background` | large-text | `--color-text-large` #1f2937 | `--color-background` #ffffff | 14.68:1 | `--color-text-large` #e2e8f0 | `--color-background` #0f172a | 14.48:1 | 3.0:1 | pass |
| `large-text-on-muted` | large-text | `--color-text-large` #1f2937 | `--color-muted` #f1f5f9 | 13.40:1 | `--color-text-large` #e2e8f0 | `--color-muted` #1e293b | 11.87:1 | 3.0:1 | pass |
| `border-on-background` | ui-component | `--color-border` #64748b | `--color-background` #ffffff | 4.76:1 | `--color-border` #7c8ca3 | `--color-background` #0f172a | 5.22:1 | 3.0:1 | pass |
| `border-on-muted` | ui-component | `--color-border` #64748b | `--color-muted` #f1f5f9 | 4.34:1 | `--color-border` #7c8ca3 | `--color-muted` #1e293b | 4.28:1 | 3.0:1 | pass |
| `accent-boundary-on-background` | ui-component | `--color-accent` #1d4ed8 | `--color-background` #ffffff | 6.70:1 | `--color-accent` #60a5fa | `--color-background` #0f172a | 7.02:1 | 3.0:1 | pass |
| `accent-boundary-on-muted` | ui-component | `--color-accent` #1d4ed8 | `--color-muted` #f1f5f9 | 6.12:1 | `--color-accent` #60a5fa | `--color-muted` #1e293b | 5.75:1 | 3.0:1 | pass |
| `foreground-boundary-on-background` | ui-component | `--color-foreground` #111827 | `--color-background` #ffffff | 17.74:1 | `--color-foreground` #f8fafc | `--color-background` #0f172a | 17.06:1 | 3.0:1 | pass |

No pair is below its threshold in either theme, so there are no failing pairs to report at this commit.

## Full harness output at this commit

```
$ node scripts/check-contrast.mjs
check-contrast: token file public/src/main.css
check-contrast: pair list  scripts/contrast-pairs.json
check-contrast: 16 pair(s) measured in 2 theme(s)

theme: light
  pass  body-text-on-background (--color-text-body #374151 on --color-background #ffffff) ratio 10.31:1, required 4.5:1
  pass  body-text-on-muted (--color-text-body #374151 on --color-muted #f1f5f9) ratio 9.41:1, required 4.5:1
  pass  foreground-on-background (--color-foreground #111827 on --color-background #ffffff) ratio 17.74:1, required 4.5:1
  pass  foreground-on-muted (--color-foreground #111827 on --color-muted #f1f5f9) ratio 16.19:1, required 4.5:1
  pass  muted-foreground-on-background (--color-muted-foreground #475569 on --color-background #ffffff) ratio 7.58:1, required 4.5:1
  pass  muted-foreground-on-muted (--color-muted-foreground #475569 on --color-muted #f1f5f9) ratio 6.92:1, required 4.5:1
  pass  accent-text-on-background (--color-accent #1d4ed8 on --color-background #ffffff) ratio 6.70:1, required 4.5:1
  pass  accent-text-on-muted (--color-accent #1d4ed8 on --color-muted #f1f5f9) ratio 6.12:1, required 4.5:1
  pass  accent-foreground-on-accent (--color-accent-foreground #ffffff on --color-accent #1d4ed8) ratio 6.70:1, required 4.5:1
  pass  large-text-on-background (--color-text-large #1f2937 on --color-background #ffffff) ratio 14.68:1, required 3.0:1
  pass  large-text-on-muted (--color-text-large #1f2937 on --color-muted #f1f5f9) ratio 13.40:1, required 3.0:1
  pass  border-on-background (--color-border #64748b on --color-background #ffffff) ratio 4.76:1, required 3.0:1
  pass  border-on-muted (--color-border #64748b on --color-muted #f1f5f9) ratio 4.34:1, required 3.0:1
  pass  accent-boundary-on-background (--color-accent #1d4ed8 on --color-background #ffffff) ratio 6.70:1, required 3.0:1
  pass  accent-boundary-on-muted (--color-accent #1d4ed8 on --color-muted #f1f5f9) ratio 6.12:1, required 3.0:1
  pass  foreground-boundary-on-background (--color-foreground #111827 on --color-background #ffffff) ratio 17.74:1, required 3.0:1

theme: dark
  pass  body-text-on-background (--color-text-body #cbd5e1 on --color-background #0f172a) ratio 12.02:1, required 4.5:1
  pass  body-text-on-muted (--color-text-body #cbd5e1 on --color-muted #1e293b) ratio 9.85:1, required 4.5:1
  pass  foreground-on-background (--color-foreground #f8fafc on --color-background #0f172a) ratio 17.06:1, required 4.5:1
  pass  foreground-on-muted (--color-foreground #f8fafc on --color-muted #1e293b) ratio 13.98:1, required 4.5:1
  pass  muted-foreground-on-background (--color-muted-foreground #94a3b8 on --color-background #0f172a) ratio 6.96:1, required 4.5:1
  pass  muted-foreground-on-muted (--color-muted-foreground #94a3b8 on --color-muted #1e293b) ratio 5.71:1, required 4.5:1
  pass  accent-text-on-background (--color-accent #60a5fa on --color-background #0f172a) ratio 7.02:1, required 4.5:1
  pass  accent-text-on-muted (--color-accent #60a5fa on --color-muted #1e293b) ratio 5.75:1, required 4.5:1
  pass  accent-foreground-on-accent (--color-accent-foreground #0f172a on --color-accent #60a5fa) ratio 7.02:1, required 4.5:1
  pass  large-text-on-background (--color-text-large #e2e8f0 on --color-background #0f172a) ratio 14.48:1, required 3.0:1
  pass  large-text-on-muted (--color-text-large #e2e8f0 on --color-muted #1e293b) ratio 11.87:1, required 3.0:1
  pass  border-on-background (--color-border #7c8ca3 on --color-background #0f172a) ratio 5.22:1, required 3.0:1
  pass  border-on-muted (--color-border #7c8ca3 on --color-muted #1e293b) ratio 4.28:1, required 3.0:1
  pass  accent-boundary-on-background (--color-accent #60a5fa on --color-background #0f172a) ratio 7.02:1, required 3.0:1
  pass  accent-boundary-on-muted (--color-accent #60a5fa on --color-muted #1e293b) ratio 5.75:1, required 3.0:1
  pass  foreground-boundary-on-background (--color-foreground #f8fafc on --color-background #0f172a) ratio 17.06:1, required 3.0:1

check-contrast: 16 pair(s), 32 measurement(s), 32 pass, 0 fail
$ echo $?
0
```

## Harness self-test

The harness was checked against fixtures that break the token contract on purpose, to confirm it fails loudly instead of passing silently. The fixtures are scratch copies of the token file; the token file in the repository is unchanged.

One foreground changed so that exactly one pair fails — light `--color-accent-foreground` moved from `#ffffff` to `#93c5fd`:

```
$ diff public/src/main.css "$LOCUST_SCRATCH_DIR/fixture-single-pair.css"
35c35
<   --color-accent-foreground: #ffffff;
---
>   --color-accent-foreground: #93c5fd;
$ node scripts/check-contrast.mjs --tokens "$LOCUST_SCRATCH_DIR/fixture-single-pair.css"
...
check-contrast: 16 pair(s), 32 measurement(s), 31 pass, 1 fail

failing pairs:
  accent-foreground-on-accent [light] --color-accent-foreground #93c5fd on --color-accent #1d4ed8: ratio 3.72:1, required 4.5:1 - contrast ratio below the required threshold
$ echo $?
1
```

One foreground changed so that several pairs fail — light `--color-text-body` moved from `#374151` to `#9ca3af`:

```
$ node scripts/check-contrast.mjs --tokens "$LOCUST_SCRATCH_DIR/fixture-failing-tokens.css"
...
check-contrast: 16 pair(s), 32 measurement(s), 30 pass, 2 fail

failing pairs:
  body-text-on-background [light] --color-text-body #9ca3af on --color-background #ffffff: ratio 2.54:1, required 4.5:1 - contrast ratio below the required threshold
  body-text-on-muted [light] --color-text-body #9ca3af on --color-muted #f1f5f9: ratio 2.32:1, required 4.5:1 - contrast ratio below the required threshold
$ echo $?
1
```

A token removed from the dark theme is reported as a failure, not skipped:

```
$ node scripts/check-contrast.mjs --tokens "$LOCUST_SCRATCH_DIR/fixture-missing-token.css"
...
check-contrast: 16 pair(s), 32 measurement(s), 30 pass, 2 fail

failing pairs:
  border-on-background [dark] --color-border n/a on --color-background #0f172a: ratio n/a, required 3.0:1 - token not defined in the dark theme: --color-border
  border-on-muted [dark] --color-border n/a on --color-muted #1e293b: ratio n/a, required 3.0:1 - token not defined in the dark theme: --color-border
$ echo $?
1
```

A bad invocation exits `2` rather than reporting a pass:

```
$ node scripts/check-contrast.mjs --tokens /nonexistent.css
check-contrast: cannot read token file: /nonexistent.css
Usage: node scripts/check-contrast.mjs [options]
...
$ echo $?
2
```

A pair whose threshold disagrees with its category is rejected instead of being measured against a threshold the reviewer did not write:

```
$ node scripts/check-contrast.mjs --pairs "$LOCUST_SCRATCH_DIR/pairs-bad-threshold.json"
check-contrast: pair "body-text-on-background" has threshold 3, but category "body-text" requires 4.5
Usage: node scripts/check-contrast.mjs [options]
...
$ echo $?
2
```

## Scope

This harness measures the token contract: the values declared in `public/src/main.css` and the pairs listed in `scripts/contrast-pairs.json`. It does not audit how the components consume the tokens. At this commit the components still use the legacy hard-coded Tailwind palette classes (`text-gray-100`, `bg-gray-900`, `text-blue-600` and similar), so no component references the new token utilities yet; adopting them is the work of the redesign card. When a component adopts a token, the pair that governs that surface must exist in `scripts/contrast-pairs.json`.

The pair list is data, not code, so adding a governed surface is a one-line JSON change. The harness rejects a pair with an unknown category, a missing field or a duplicate id, so a malformed list fails loudly instead of silently measuring less than intended.
