#!/usr/bin/env node
/**
 * check-citations.mjs
 *
 * Plain Node script (no dependency, no test framework) that proves every
 * research claim and figure in README.md and in public/src/data carries a
 * resolvable inline citation, and that every inline citation resolves on
 * both mirrors.
 *
 * The citation scheme (settled by the methodology lead): a bracketed named id,
 * the same ids on both mirrors — deci-ryan-2000, mark-2005, desktime-2014,
 * mit-sloan-2017, rogelberg-2019, slack-workplace-lab-2017. README.md carries
 * a `## References` section listing every id; public/src/data/references.js
 * carries the equivalent references structure. Source reachability is NOT
 * checked: a locator (DOI, ISBN or locator note) present in the entry is
 * sufficient.
 *
 * What counts as a claim or figure here:
 *   - README.md: a content line carrying a digit or research vocabulary
 *     (survey, study, reported, participant, respondent, trial). Structured
 *     lines are carved out and never claims: table rows, fenced code, the
 *     references section itself, the version footer, principle-number titles,
 *     ceremony/duration list items and bold lead-in rule or limit statements
 *     (limits and durations are BEAT defaults, not research findings).
 *   - public/src/data: a prose string value carrying a digit, a percent sign
 *     or research vocabulary. Presentation and structured keys are carved out:
 *     icon, gradient, color, id, citation, stat, value, label, step, name,
 *     title, constraint, limit, rule, range, key, dataKey, heading, over,
 *     valueMore, pattern, category, duration, number. Durations, limits,
 *     option scale labels and score values are structured fields, not claims.
 *
 * What resolves a claim: an inline `[id]` marker that resolves to a reference
 * entry on BOTH sides, or a BEAT-default marker in the same string
 * ("a BEAT default", "BEAT's own ... not a research finding", "not a measured
 * threshold").
 *
 * The run fails (exit 1) when:
 *   - a claim or figure carries neither an inline citation nor a BEAT-default
 *     marker;
 *   - an inline citation id resolves to no entry in the README references
 *     section or to no entry in the data references structure;
 *   - the two reference sets disagree (an id on only one side);
 *   - a reference entry has no locator (README: DOI, ISBN or locator note;
 *     data: an empty `locator` field);
 *   - a reference entry is never cited (a FAILURE, not a warning: an entry
 *     no claim uses is a defect under this scheme).
 *
 * Usage:
 *   node scripts/check-citations.mjs [--readme <file>] [--manifesto <file>]
 *                                    [--assessment <file>] [--references <file>]
 *
 * Exit codes: 0 = every claim resolves and every citation and reference entry
 *                 resolves on both sides,
 *             1 = at least one of the checks above fails,
 *             2 = usage or I/O error.
 */

import { readFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(SCRIPT_DIR, '..')

const DEFAULTS = {
  readme: join(REPO_ROOT, 'README.md'),
  manifesto: join(REPO_ROOT, 'public', 'src', 'data', 'manifesto.js'),
  assessment: join(REPO_ROOT, 'public', 'src', 'data', 'assessment.js'),
  references: join(REPO_ROOT, 'public', 'src', 'data', 'references.js')
}

const usage = [
  'Usage: node scripts/check-citations.mjs [--readme <file>] [--manifesto <file>]',
  '                                       [--assessment <file>] [--references <file>]',
  '',
  'Checks that every research claim and figure in README.md and public/src/data',
  'carries an inline [id] citation or a BEAT-default marker, and that every id',
  'resolves to a reference entry in the README ## References section and in',
  'public/src/data/references.js. A reference entry that is never cited fails.',
  '',
  'Exit codes: 0 = all claims and citations resolve, 1 = a check fails, 2 = usage or I/O error.'
].join('\n')

/* ------------------------------------------------------------------ options */

function readOptions (argv) {
  const takesValue = new Map([
    ['--readme', 'readme'],
    ['--manifesto', 'manifesto'],
    ['--assessment', 'assessment'],
    ['--references', 'references']
  ])
  const options = { ...DEFAULTS }

  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index]
    if (argument === '--help' || argument === '-h') {
      options.help = true
      continue
    }
    if (!argument.startsWith('-')) throw new Error(`unexpected argument: ${argument}`)
    const equals = argument.indexOf('=')
    const name = equals === -1 ? argument : argument.slice(0, equals)
    if (!takesValue.has(name)) throw new Error(`unknown option: ${argument}`)
    let value
    if (equals === -1) {
      value = argv[index + 1]
      index += 1
      if (value === undefined || value.startsWith('-')) throw new Error(`${name} needs a value`)
    } else {
      value = argument.slice(equals + 1)
      if (value === '') throw new Error(`${name} needs a value`)
    }
    options[takesValue.get(name)] = resolve(value)
  }
  return options
}

/* --------------------------------------------------------------- primitives */

const CITATION_RE = /\[([a-z][a-z0-9]*(?:-[a-z0-9]+)*)]/g
const MARKER_RE = /BEAT default|BEAT'?s own|not a research finding|not research findings|not a measured threshold/i
const RESEARCH_RE = /\b(survey\w*|stud(?:y|ies|ied)|reported|participant\w*|respondent\w*|trial)\b/i
/** A research term under `not ...`/`no ...`/`never ...` is a disclaimer, not a claim. */
const NEGATION_RE = /\b(not|no|never)\s+(?:\w+\s+){0,2}?(survey\w*|stud(?:y|ies|ied)|reported|participant\w*|respondent\w*|trial)/i
const HAS_DIGIT_RE = /\d/
const HAS_PERCENT_RE = /%/

/** Bracketed inline citation ids, skipping markdown links `[text](url)`. */
function citationsIn (text) {
  const ids = []
  CITATION_RE.lastIndex = 0
  let match = CITATION_RE.exec(text)
  while (match !== null) {
    if (text[match.index + match[0].length] !== '(') ids.push(match[1])
    match = CITATION_RE.exec(text)
  }
  return ids
}

/* -------------------------------------------------------------- README side */

/**
 * Scan the README. Returns the reference entries of the `## References`
 * section, every inline citation id used outside that section, and every
 * checked claim line with its resolution.
 */
function scanReadme (markdown, label) {
  const lines = markdown.split('\n')
  const result = { label, references: [], citations: [], checked: [], skippedStructured: 0, totalLines: lines.length }
  let inCodeFence = false
  let inReferences = false

  for (let index = 0; index < lines.length; index++) {
    const raw = lines[index]
    const line = raw.trim()
    const at = `${label}:${index + 1}`

    if (line.startsWith('```')) {
      inCodeFence = !inCodeFence
      continue
    }
    if (inCodeFence) {
      result.skippedStructured += 1
      continue
    }
    if (/^##\s+References\s*$/.test(line)) {
      inReferences = true
      continue
    }
    if (inReferences) {
      const entry = /^\s*-\s+\*\*\[([a-z][a-z0-9-]*)\]\*\*/.exec(raw)
      if (entry) result.references.push({ id: entry[1], at, text: line })
      continue
    }
    if (line === '' || line.startsWith('<!--') || /^#{1,6}\s/.test(line)) continue
    if (line.startsWith('|')) { result.skippedStructured += 1; continue }
    if (/^\*BEAT v\d/.test(line)) { result.skippedStructured += 1; continue }

    let body = line
    const numberedStep = /^\d+\.\s+(.*)$/.exec(body)
    if (numberedStep !== null) body = numberedStep[1]
    if (/^\*\*\d+\.\s.*\*\*$/.test(body)) { result.skippedStructured += 1; continue }
    if (/^-\s+\*\*[^*]+\*\*\s*\(/.test(body)) { result.skippedStructured += 1; continue }
    if (/^\*\*[^*]{1,48}?[.:]\*\*/.test(body)) { result.skippedStructured += 1; continue }

    for (const id of citationsIn(body)) result.citations.push({ id, at })

    if (HAS_DIGIT_RE.test(body) || HAS_PERCENT_RE.test(body) || (RESEARCH_RE.test(body) && !NEGATION_RE.test(body))) {
      const ids = citationsIn(body)
      const resolved = ids.length > 0 ? ids.every((id) => true) : MARKER_RE.test(body)
      result.checked.push({ at, body, ids, resolved })
    }
  }
  return result
}

/* --------------------------------------------------------------- data side */

const EXCLUDED_KEYS = new Set([
  'icon', 'gradient', 'color', 'id', 'citation', 'stat', 'value', 'label', 'step',
  'name', 'title', 'constraint', 'limit', 'rule', 'range', 'key', 'dataKey',
  'heading', 'over', 'valueMore', 'pattern', 'category', 'duration', 'number'
])

/** The last segment of a walk path, e.g. `principles.focus[1].description`. */
const pathKey = (path) => (path.split('.').at(-1) ?? '').replace(/\[\d+\]$/, '')

function walk (value, path, label, result) {
  if (typeof value === 'string') {
    const key = pathKey(path)
    if (key === 'citation') {
      result.bareCitations.push({ id: value.trim(), at: `${label} ${path}` })
      return
    }
    if (EXCLUDED_KEYS.has(key)) return
    const ids = citationsIn(value)
    for (const id of ids) result.citations.push({ id, at: `${label} ${path}` })
    if (HAS_DIGIT_RE.test(value) || HAS_PERCENT_RE.test(value) || (RESEARCH_RE.test(value) && !NEGATION_RE.test(value))) {
      const resolved = ids.length > 0 || MARKER_RE.test(value)
      result.checked.push({ at: `${label} ${path}`, value, ids, resolved })
    }
    return
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}[${index}]`, label, result))
    return
  }
  if (value !== null && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      walk(child, path === '' ? key : `${path}.${key}`, label, result)
    }
  }
}

async function loadDataModule (file) {
  if (!existsSync(file)) throw new Error(`data file not found: ${file}`)
  return import(pathToFileURL(file).href)
}

/* -------------------------------------------------------------------- main */

const shorten = (text, limit) => (text.length <= limit ? text : `${text.slice(0, limit - 3)}...`)

async function main (argv) {
  const options = readOptions(argv)
  if (options.help) {
    console.log(usage)
    return 0
  }

  const readmeLabel = relative(REPO_ROOT, options.readme)
  const manifestoLabel = relative(REPO_ROOT, options.manifesto)
  const assessmentLabel = relative(REPO_ROOT, options.assessment)
  const referencesLabel = relative(REPO_ROOT, options.references)

  const readme = scanReadme(readFileSync(options.readme, 'utf8'), readmeLabel)
  const manifesto = await loadDataModule(options.manifesto)
  const assessment = await loadDataModule(options.assessment)
  const referencesModule = await loadDataModule(options.references)

  const dataResult = {
    label: 'data', citations: [], bareCitations: [], checked: []
  }
  walk(manifesto, '', manifestoLabel, dataResult)
  walk(assessment, '', assessmentLabel, dataResult)

  const dataReferences = Array.isArray(referencesModule.references)
    ? referencesModule.references
    : []
  const dataRefEntries = dataReferences.map((entry, index) => ({
    id: typeof entry?.id === 'string' ? entry.id : '',
    locator: typeof entry?.locator === 'string' ? entry.locator.trim() : '',
    at: `${referencesLabel} references[${index}]`
  }))

  /* ------------------------------------------------------------- resolvers */

  const readmeRefIds = new Set(readme.references.map((entry) => entry.id))
  const dataRefIds = new Set(dataRefEntries.map((entry) => entry.id))

  const citedIds = new Set([
    ...readme.citations.map((entry) => entry.id),
    ...dataResult.citations.map((entry) => entry.id),
    ...dataResult.bareCitations.map((entry) => entry.id)
  ])

  const failures = []

  // Every inline citation id must resolve to an entry on BOTH sides.
  const allCitations = [
    ...readme.citations.map((entry) => ({ ...entry, side: 'README' })),
    ...dataResult.citations.map((entry) => ({ ...entry, side: 'data' }))
  ]
  for (const { id, at, side } of allCitations) {
    if (!readmeRefIds.has(id)) failures.push(`${at}: inline citation [${id}] (${side}) resolves to no ${readmeLabel} references entry`)
    if (!dataRefIds.has(id)) failures.push(`${at}: inline citation [${id}] (${side}) resolves to no ${referencesLabel} entry`)
  }
  for (const { id, at } of dataResult.bareCitations) {
    if (!readmeRefIds.has(id)) failures.push(`${at}: citation field "${id}" resolves to no ${readmeLabel} references entry`)
    if (!dataRefIds.has(id)) failures.push(`${at}: citation field "${id}" resolves to no ${referencesLabel} entry`)
  }

  // The two reference sets must agree.
  for (const id of readmeRefIds) {
    if (!dataRefIds.has(id)) failures.push(`${readmeLabel} references entry [${id}] has no entry in ${referencesLabel}`)
  }
  for (const id of dataRefIds) {
    if (!readmeRefIds.has(id)) failures.push(`${referencesLabel} entry [${id}] has no entry in the ${readmeLabel} references section`)
  }

  // Locator sufficiency: README entry needs DOI, ISBN or a locator note;
  // data entry needs a non-empty locator field.
  for (const entry of readme.references) {
    if (!/DOI:|ISBN|—/.test(entry.text)) failures.push(`${entry.at}: reference entry [${entry.id}] carries no DOI, ISBN or locator note`)
  }
  for (const entry of dataRefEntries) {
    if (entry.id === '') failures.push(`${entry.at}: reference entry has no id`)
    else if (entry.locator === '') failures.push(`${entry.at}: reference entry [${entry.id}] has an empty locator field`)
  }

  // A reference entry that is never cited fails (not a warning).
  for (const id of new Set([...readmeRefIds, ...dataRefIds])) {
    if (!citedIds.has(id)) failures.push(`reference entry [${id}] is never cited by any inline citation`)
  }

  // Claims: a triggered line or string resolves by citation or marker.
  for (const claim of readme.checked) {
    if (!claim.resolved) failures.push(`${claim.at}: uncited claim or figure: "${shorten(claim.body, 96)}"`)
  }
  for (const claim of dataResult.checked) {
    if (!claim.resolved) failures.push(`${claim.at}: uncited claim or figure: "${shorten(claim.value, 96)}"`)
  }

  /* ------------------------------------------------------------- reporting */

  console.log('check-citations: BEAT inline citation check')
  console.log(`check-citations: repo        ${REPO_ROOT}`)
  console.log(`check-citations: README      ${readmeLabel} (${readme.totalLines} lines, ${readme.skippedStructured} structured line(s) carved out, ${readme.checked.length} claim line(s) checked, ${readme.references.length} reference entrie(s))`)
  console.log(`check-citations: data        ${manifestoLabel} + ${assessmentLabel} (${dataResult.checked.length} prose claim(s) checked)`)
  console.log(`check-citations: references  ${referencesLabel} (${dataRefEntries.length} entrie(s))`)
  console.log('')

  console.log(`check-citations: README reference entries (${readme.references.length})`)
  for (const entry of readme.references) {
    console.log(`check-citations:   ${entry.id.padEnd(26)}  ${entry.at}`)
  }
  console.log('')

  console.log(`check-citations: data reference entries (${dataRefEntries.length})`)
  for (const entry of dataRefEntries) {
    console.log(`check-citations:   ${entry.id.padEnd(26)}  ${entry.at}  locator: ${entry.locator === '' ? '(EMPTY)' : 'present'}`)
  }
  console.log('')

  console.log(`check-citations: inline citations used (${new Set(allCitations.map((c) => c.id)).size} distinct id(s), ${allCitations.length} site(s))`)
  for (const entry of readme.citations) console.log(`check-citations:   [${entry.id}]  ${entry.at}`)
  for (const entry of dataResult.citations) console.log(`check-citations:   [${entry.id}]  ${entry.at}`)
  for (const entry of dataResult.bareCitations) console.log(`check-citations:   [${entry.id}]  ${entry.at} (citation field)`)
  console.log('')

  console.log(`check-citations: README claim lines checked (${readme.checked.length})`)
  for (const claim of readme.checked) {
    const how = claim.ids.length > 0 ? `cited [${claim.ids.join(', ')}]` : 'BEAT-default marker'
    console.log(`check-citations:   ${claim.at}  ${how}  "${shorten(claim.body, 72)}"`)
  }
  console.log('')

  console.log(`check-citations: data prose claims checked (${dataResult.checked.length})`)
  for (const claim of dataResult.checked) {
    const how = claim.ids.length > 0 ? `cited [${claim.ids.join(', ')}]` : (claim.resolved ? 'BEAT-default marker' : 'UNRESOLVED')
    console.log(`check-citations:   ${claim.at}  ${how}  "${shorten(claim.value, 64)}"`)
  }
  console.log('')

  if (failures.length > 0) {
    console.log(`check-citations: FAIL, ${failures.length} defect(s)`)
    for (const failure of failures) console.log(`check-citations:   ${failure}`)
    console.log('')
    console.log(`check-citations: ${readme.checked.length} README claim line(s), ${dataResult.checked.length} data prose claim(s), ${readme.references.length} README reference entrie(s), ${dataRefEntries.length} data reference entrie(s), ${allCitations.length + dataResult.bareCitations.length} citation site(s), ${failures.length} defect(s)`)
    return 1
  }

  console.log(`check-citations: PASS, ${readme.checked.length} README claim line(s) and ${dataResult.checked.length} data prose claim(s) all resolve, ${readme.references.length} README and ${dataRefEntries.length} data reference entrie(s) agree, every citation resolves on both sides, every entry cited and located`)
  return 0
}

import { existsSync } from 'node:fs'

try {
  process.exitCode = await main(process.argv.slice(2))
} catch (error) {
  console.error(`check-citations: ${error.message}`)
  console.error(usage)
  process.exitCode = 2
}
