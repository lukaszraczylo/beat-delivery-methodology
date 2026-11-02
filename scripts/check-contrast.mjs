#!/usr/bin/env node
/**
 * check-contrast.mjs
 *
 * Plain Node script (no runtime dependency, no test framework) that measures
 * the WCAG 2.2 contrast ratio of every foreground/background pair of the
 * theme token contract, in the light theme and in the dark theme.
 *
 * The token values come from the token stylesheet: the `:root` block holds
 * the light values and the `.dark` block holds the dark values. The pairs
 * come from a separate data file (scripts/contrast-pairs.json by default),
 * so the list of measured pairs is reviewable on its own.
 *
 * The thresholds follow WCAG 2.2:
 *   body text        4.5:1   (SC 1.4.3 Contrast Minimum)
 *   large text       3:1     (SC 1.4.3, large-scale text)
 *   UI component     3:1     (SC 1.4.11 Non-text Contrast)
 *
 * Usage:
 *   node scripts/check-contrast.mjs [--tokens <file>] [--pairs <file>]
 *                                  [--json] [--help]
 *
 * Exit codes: 0 = every pair meets its threshold, 1 = at least one pair is
 * below its threshold, 2 = bad usage or I/O error.
 */

import { readFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(SCRIPT_DIR, '..')
const DEFAULT_TOKENS = join(REPO_ROOT, 'public', 'src', 'main.css')
const DEFAULT_PAIRS = join(SCRIPT_DIR, 'contrast-pairs.json')

/** The WCAG 2.2 minimum for each pair category. */
const THRESHOLDS = {
  'body-text': 4.5,
  'large-text': 3,
  'ui-component': 3,
}

const THEMES = ['light', 'dark']

const usage = `Usage: node scripts/check-contrast.mjs [options]

  --tokens <file>   token stylesheet to read (default: public/src/main.css)
  --pairs <file>    pair list to read (default: scripts/contrast-pairs.json)
  --json            print the measurements as JSON instead of a table
  --help            print this text
Exit codes: 0 = all pairs pass, 1 = at least one pair fails, 2 = usage or I/O error.`

/* ------------------------------------------------------------------ colours */

/**
 * Parse a CSS colour into its sRGB channels.
 *
 * Hex colours (#rgb, #rrggbb, #rrggbbaa) and the rgb()/rgba() function are
 * supported, which covers every form a token value can take.
 */
function parseColor (value) {
  const text = String(value).trim()

  const hex = /^#([0-9a-f]{3,8})$/i.exec(text)
  if (hex) {
    const digits = hex[1]
    const expand = digits.length <= 4
      ? digits.split('').map((d) => d + d).join('')
      : digits
    if (expand.length !== 6 && expand.length !== 8) {
      throw new Error(`unsupported hex colour: ${text}`)
    }
    return {
      r: parseInt(expand.slice(0, 2), 16),
      g: parseInt(expand.slice(2, 4), 16),
      b: parseInt(expand.slice(4, 6), 16),
      a: expand.length === 8 ? parseInt(expand.slice(6, 8), 16) / 255 : 1,
    }
  }

  const rgb = /^rgba?\(\s*([^)]+)\)$/i.exec(text)
  if (rgb) {
    const parts = rgb[1].split(/[\s,/]+/).filter(Boolean)
    if (parts.length < 3) throw new Error(`unsupported rgb colour: ${text}`)
    const channel = (part) => (part.endsWith('%')
      ? Math.round((parseFloat(part) / 100) * 255)
      : parseInt(part, 10))
    const alpha = parts[3] === undefined
      ? 1
      : (parts[3].endsWith('%') ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]))
    return {
      r: channel(parts[0]),
      g: channel(parts[1]),
      b: channel(parts[2]),
      a: alpha,
    }
  }

  throw new Error(`unsupported colour value: ${text}`)
}

/** Composite a translucent colour over an opaque one. */
function flatten (top, bottom) {
  const alpha = top.a
  if (alpha >= 1) return { r: top.r, g: top.g, b: top.b }
  return {
    r: Math.round(top.r * alpha + bottom.r * (1 - alpha)),
    g: Math.round(top.g * alpha + bottom.g * (1 - alpha)),
    b: Math.round(top.b * alpha + bottom.b * (1 - alpha)),
  }
}

/** The relative luminance of a colour, per WCAG 2.2. */
function relativeLuminance ({ r, g, b }) {
  const channel = (value) => {
    const srgb = value / 255
    return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

/**
 * The contrast ratio between two colours, per WCAG 2.2.
 *
 * A translucent foreground is composited over the background first, because
 * that is what the reader sees.
 */
function contrastRatio (foreground, background) {
  const fg = flatten(foreground, background)
  const bg = { r: background.r, g: background.g, b: background.b }
  const lighter = Math.max(relativeLuminance(fg), relativeLuminance(bg))
  const darker = Math.min(relativeLuminance(fg), relativeLuminance(bg))
  return (lighter + 0.05) / (darker + 0.05)
}

/* ------------------------------------------------------------- token file */

/**
 * Read the custom properties of one block of a stylesheet.
 *
 * The block is selected by its selector, so the same reader finds the light
 * values in `:root` and the dark values in `.dark`.
 */
function readBlock (css, selector) {
  const pattern = new RegExp(`(^|[}\\s,])${selector.replace('.', '\\.')}\\s*\\{`, 'm')
  const match = pattern.exec(css)
  if (!match) throw new Error(`no "${selector}" block in the token file`)

  const start = match.index + match[0].length
  const end = css.indexOf('}', start)
  if (end === -1) throw new Error(`unterminated "${selector}" block in the token file`)

  const values = new Map()
  for (const entry of css.slice(start, end).split(';')) {
    const declaration = entry.trim()
    if (declaration === '' || declaration.startsWith('/*')) continue
    const colon = declaration.indexOf(':')
    if (colon === -1) continue
    values.set(declaration.slice(0, colon).trim(), declaration.slice(colon + 1).trim())
  }
  return values
}

/** The token values of both themes, read from the token stylesheet. */
function readTokens (tokenPath) {
  let css
  try {
    css = readFileSync(tokenPath, 'utf8')
  } catch {
    throw new Error(`cannot read token file: ${tokenPath}`)
  }
  const light = readBlock(css, ':root')
  const dark = readBlock(css, '.dark')
  return { light, dark }
}

/* -------------------------------------------------------------- pair list */

/** Read and validate the pair list. */
function readPairs (pairsPath) {
  let data
  try {
    data = JSON.parse(readFileSync(pairsPath, 'utf8'))
  } catch (error) {
    throw new Error(`cannot read pair list: ${pairsPath} (${error.message})`)
  }
  if (!data || !Array.isArray(data.pairs) || data.pairs.length === 0) {
    throw new Error(`pair list has no pairs: ${pairsPath}`)
  }

  const ids = new Set()
  return data.pairs.map((pair) => {
    for (const field of ['id', 'category', 'foreground', 'background']) {
      if (typeof pair[field] !== 'string' || pair[field].trim() === '') {
        throw new Error(`pair is missing "${field}": ${JSON.stringify(pair)}`)
      }
    }
    if (!Object.hasOwn(THRESHOLDS, pair.category)) {
      throw new Error(
        `pair "${pair.id}" has unknown category "${pair.category}"; ` +
        `known categories: ${Object.keys(THRESHOLDS).join(', ')}`
      )
    }
    if (ids.has(pair.id)) throw new Error(`duplicate pair id: ${pair.id}`)
    ids.add(pair.id)

    // The pair list states the threshold it needs. The category default
    // must agree with it, so a wrong threshold cannot slip in unnoticed.
    const categoryThreshold = THRESHOLDS[pair.category]
    let threshold = categoryThreshold
    if (pair.threshold !== undefined) {
      if (typeof pair.threshold !== 'number' || !Number.isFinite(pair.threshold)) {
        throw new Error(`pair "${pair.id}" has a non-numeric threshold: ${pair.threshold}`)
      }
      if (Math.abs(pair.threshold - categoryThreshold) > 1e-9) {
        throw new Error(
          `pair "${pair.id}" has threshold ${pair.threshold}, but category ` +
          `"${pair.category}" requires ${categoryThreshold}`
        )
      }
      threshold = pair.threshold
    }

    return {
      id: pair.id,
      category: pair.category,
      foreground: pair.foreground,
      background: pair.background,
      surface: typeof pair.surface === 'string' ? pair.surface : '',
      threshold,
    }
  })
}

/* ------------------------------------------------------------ measurement */

/**
 * Measure every pair in both themes.
 *
 * A pair whose tokens are missing from a theme is reported as an error
 * rather than skipped: a missing token is a contrast failure the site
 * cannot recover from.
 */
function measure (pairs, tokens) {
  const results = []
  for (const pair of pairs) {
    const themes = {}
    for (const theme of THEMES) {
      const foregroundValue = tokens[theme].get(pair.foreground)
      const backgroundValue = tokens[theme].get(pair.background)
      if (foregroundValue === undefined || backgroundValue === undefined) {
        const missing = [
          foregroundValue === undefined ? pair.foreground : null,
          backgroundValue === undefined ? pair.background : null,
        ].filter(Boolean).join(', ')
        themes[theme] = {
          error: `token not defined in the ${theme} theme: ${missing}`,
          foregroundValue: foregroundValue ?? null,
          backgroundValue: backgroundValue ?? null,
          ratio: null,
          pass: false,
        }
        continue
      }
      const foreground = parseColor(foregroundValue)
      const background = parseColor(backgroundValue)
      const ratio = contrastRatio(foreground, background)
      themes[theme] = {
        error: null,
        foregroundValue,
        backgroundValue,
        ratio: Number(ratio.toFixed(2)),
        pass: ratio >= pair.threshold - 1e-9,
      }
    }
    results.push({ ...pair, themes })
  }
  return results
}

/* ----------------------------------------------------------------- output */

/** Format a ratio for the report: two decimals, or a placeholder. */
const formatRatio = (ratio) => (ratio === null ? 'n/a' : `${ratio.toFixed(2)}:1`)

function printTable (results, tokenPath, pairsPath) {
  const shown = (file) => relative(process.cwd(), file) || file
  console.log(`check-contrast: token file ${shown(tokenPath)}`)
  console.log(`check-contrast: pair list  ${shown(pairsPath)}`)
  console.log(`check-contrast: ${results.length} pair(s) measured in ${THEMES.length} theme(s)`)
  console.log('')

  for (const theme of THEMES) {
    console.log(`theme: ${theme}`)
    for (const result of results) {
      const measurement = result.themes[theme]
      const status = measurement.error
        ? 'ERROR'
        : (measurement.pass ? 'pass' : 'FAIL')
      console.log(
        `  ${status.padEnd(5)} ${result.id} ` +
        `(${result.foreground} ${measurement.foregroundValue ?? 'n/a'} on ` +
        `${result.background} ${measurement.backgroundValue ?? 'n/a'}) ` +
        `ratio ${formatRatio(measurement.ratio)}, ` +
        `required ${result.threshold.toFixed(1)}:1` +
        (measurement.error ? ` - ${measurement.error}` : '')
      )
    }
    console.log('')
  }
}

/** The failing measurements, in a stable order. */
function failures (results) {
  const failing = []
  for (const result of results) {
    for (const theme of THEMES) {
      const measurement = result.themes[theme]
      if (!measurement.pass) failing.push({ result, theme, measurement })
    }
  }
  return failing
}

/* -------------------------------------------------------------------- main */

function main (argv) {
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(usage)
    return 0
  }
  const known = new Set(['--tokens', '--pairs', '--json', '--help', '-h'])
  const unknown = argv.filter((argument) => argument.startsWith('-') && !known.has(argument))
  if (unknown.length > 0) throw new Error(`unknown option: ${unknown[0]}`)

  const optionValue = (name) => {
    const index = argv.indexOf(name)
    return index === -1 ? null : (argv[index + 1] ?? null)
  }
  const tokenOption = optionValue('--tokens')
  const pairsOption = optionValue('--pairs')
  if (argv.includes('--tokens') && tokenOption === null) throw new Error('--tokens needs a file path')
  if (argv.includes('--pairs') && pairsOption === null) throw new Error('--pairs needs a file path')

  const tokenPath = tokenOption === null ? DEFAULT_TOKENS : resolve(process.cwd(), tokenOption)
  const pairsPath = pairsOption === null ? DEFAULT_PAIRS : resolve(process.cwd(), pairsOption)

  const tokens = readTokens(tokenPath)
  const pairs = readPairs(pairsPath)
  const results = measure(pairs, tokens)
  const failing = failures(results)

  if (argv.includes('--json')) {
    console.log(JSON.stringify({
      tokenFile: tokenPath,
      pairFile: pairsPath,
      pairs: results.length,
      failures: failing.length,
      results,
    }, null, 2))
    return failing.length > 0 ? 1 : 0
  }

  printTable(results, tokenPath, pairsPath)

  const measurements = results.length * THEMES.length
  console.log(
    `check-contrast: ${results.length} pair(s), ${measurements} measurement(s), ` +
    `${measurements - failing.length} pass, ${failing.length} fail`
  )
  if (failing.length > 0) {
    console.log('')
    console.log('failing pairs:')
    for (const { result, theme, measurement } of failing) {
      const reason = measurement.error ?? 'contrast ratio below the required threshold'
      console.log(
        `  ${result.id} [${theme}] ${result.foreground} ${measurement.foregroundValue ?? 'n/a'} on ` +
        `${result.background} ${measurement.backgroundValue ?? 'n/a'}: ` +
        `ratio ${formatRatio(measurement.ratio)}, required ${result.threshold.toFixed(1)}:1 - ${reason}`
      )
    }
  }
  return failing.length > 0 ? 1 : 0
}

try {
  process.exit(main(process.argv.slice(2)))
} catch (error) {
  console.error(`check-contrast: ${error.message}`)
  console.error(usage)
  process.exit(2)
}
