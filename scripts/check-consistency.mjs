#!/usr/bin/env node
/**
 * check-consistency.mjs
 *
 * Plain Node script (no dependency, no test framework) that proves README.md
 * and the site content in public/src/data carry the same set of sections and
 * principles, and that docs/section-principle-map.md maps every one of them to
 * a README heading and a data key that actually exist.
 *
 * Where the two id sets come from:
 *   - README.md: the `<!-- id: xxx -->` HTML comment anchors.
 *   - public/src/data/manifesto.js: the `sectionMap` export, which spreads the
 *     four principle rows in from `principleSections`; the module is imported,
 *     so the spread is resolved by the language rather than re-parsed here.
 *
 * The run fails (exit 1) when:
 *   - an id exists on only one side;
 *   - an id that exists on either side has no row in the map;
 *   - a map row names an id that is on neither side;
 *   - a map row names a README heading or a data key that does not exist.
 *
 * Two things are reported but never fail the run, because neither is an id
 * set: `framework.subsections` (a content list; the run reports how many names
 * it holds and how many of them match a README heading) and the map's anchor
 * line numbers (they move whenever an edit above them adds a line).
 *
 * Usage:
 *   node scripts/check-consistency.mjs
 *   node scripts/check-consistency.mjs [--readme <file>] [--manifesto <file>]
 *                                      [--assessment <file>] [--map <file>]
 *
 * Options:
 *   --readme <file>      README to read the id anchors from (default: README.md)
 *   --manifesto <file>   data file holding `sectionMap` (default: public/src/data/manifesto.js)
 *   --assessment <file>  data file holding the assessment keys (default: public/src/data/assessment.js)
 *   --map <file>         mapping document (default: docs/section-principle-map.md)
 *
 * Exit codes: 0 = the two id sets match and every map row resolves,
 *             1 = at least one of the checks above fails,
 *             2 = usage or I/O error.
 */

import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(SCRIPT_DIR, '..')

const DEFAULTS = {
  readme: join(REPO_ROOT, 'README.md'),
  manifesto: join(REPO_ROOT, 'public', 'src', 'data', 'manifesto.js'),
  assessment: join(REPO_ROOT, 'public', 'src', 'data', 'assessment.js'),
  map: join(REPO_ROOT, 'docs', 'section-principle-map.md')
}

const usage = [
  'Usage: node scripts/check-consistency.mjs [--readme <file>] [--manifesto <file>]',
  '                                         [--assessment <file>] [--map <file>]',
  '',
  'Compares the README id anchors and the manifesto sectionMap against the rows of',
  'docs/section-principle-map.md.',
  '',
  'Options:',
  '  --readme <file>      README to read the id anchors from (default: README.md)',
  '  --manifesto <file>   data file holding sectionMap (default: public/src/data/manifesto.js)',
  '  --assessment <file>  data file holding the assessment keys (default: public/src/data/assessment.js)',
  '  --map <file>         mapping document (default: docs/section-principle-map.md)',
  '',
  'Exit codes: 0 = sets match and every map row resolves, 1 = a check fails, 2 = usage or I/O error.'
].join('\n')

const ANCHOR_RE = /<!--\s*id:\s*([^\s>]+?)\s*-->/g
const HEADING_RE = /^(#{1,6})\s+(.+?)\s*$/
const CODE_SPAN_RE = /`([^`]+)`/

// The map table is the one table whose header carries all four columns; the
// other tables in the document (the five situations, the out-of-scope
// namespaces) have a different column set and are not map rows.
const MAP_COLUMNS = {
  id: /^id$/i,
  heading: /readme heading/i,
  anchor: /anchor line/i,
  dataKey: /site data key/i
}

/* ------------------------------------------------------------------ options */

function readOptions (argv) {
  const takesValue = new Map([
    ['--readme', 'readme'],
    ['--manifesto', 'manifesto'],
    ['--assessment', 'assessment'],
    ['--map', 'map']
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

/* ------------------------------------------------------------ README side */

/** The `<!-- id: xxx -->` anchors, with the line each one sits on. */
function readReadmeIds (markdown) {
  const ids = []
  const lines = markdown.split('\n')
  for (let index = 0; index < lines.length; index++) {
    ANCHOR_RE.lastIndex = 0
    let match = ANCHOR_RE.exec(lines[index])
    while (match !== null) {
      ids.push({ id: match[1], line: index + 1 })
      match = ANCHOR_RE.exec(lines[index])
    }
  }
  return ids
}

/** The Markdown headings, with level, text and line. */
function readReadmeHeadings (markdown) {
  const headings = []
  const lines = markdown.split('\n')
  for (let index = 0; index < lines.length; index++) {
    const match = HEADING_RE.exec(lines[index])
    if (match === null) continue
    headings.push({ level: match[1].length, text: match[2].replace(/\s+#+$/, '').trim(), line: index + 1 })
  }
  return headings
}

/* -------------------------------------------------------------- data side */

async function loadDataModule (file) {
  if (!existsSync(file)) throw new Error(`data file not found: ${file}`)
  return import(pathToFileURL(file).href)
}

/** The `sectionMap` export, as `{ id, heading, dataKey }` rows. */
function readSectionMap (namespace, file) {
  const sectionMap = namespace.sectionMap
  if (!Array.isArray(sectionMap)) {
    throw new Error(`${file} has no sectionMap array export`)
  }
  return sectionMap.map((row, index) => {
    if (row === null || typeof row !== 'object' || typeof row.id !== 'string' || row.id.trim() === '') {
      throw new Error(`${file} sectionMap[${index}] has no string id`)
    }
    return {
      id: row.id.trim(),
      heading: typeof row.heading === 'string' ? row.heading : '',
      dataKey: typeof row.dataKey === 'string' ? row.dataKey : ''
    }
  })
}

/** Resolve a dotted key such as `principles.focus` against a module namespace. */
function resolveDataKey (key, modules) {
  for (const [label, namespace] of modules) {
    let value = namespace
    let found = true
    for (const part of key.split('.')) {
      if (value === null || typeof value !== 'object' || !(part in value)) {
        found = false
        break
      }
      value = value[part]
    }
    if (found) return { file: label, value }
  }
  return null
}

/* ------------------------------------------------------------- map document */

function splitCells (line) {
  return line
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

/** The first code span of a cell, which is how the map quotes ids and keys. */
function firstCodeSpan (cell) {
  const match = CODE_SPAN_RE.exec(cell)
  return match === null ? null : match[1].trim()
}

function readMapRows (markdown) {
  const lines = markdown.split('\n')
  const rows = []
  let columns = null

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index].trim()
    if (!line.startsWith('|')) {
      columns = null
      continue
    }
    const cells = splitCells(line)
    if (columns === null) {
      const found = {}
      for (const [name, matcher] of Object.entries(MAP_COLUMNS)) {
        const at = cells.findIndex((cell) => matcher.test(cell))
        if (at !== -1) found[name] = at
      }
      if (Object.keys(found).length === Object.keys(MAP_COLUMNS).length) columns = found
      continue
    }
    if (cells.every((cell) => /^:?-{2,}:?$/.test(cell))) continue
    rows.push({ cells, columns, line: index + 1 })
  }

  return rows.map(({ cells, columns, line }) => {
    const cell = (name) => cells[columns[name]] ?? ''
    const anchorMatch = /line\s+(\d+)/i.exec(cell('anchor'))
    return {
      line,
      id: firstCodeSpan(cell('id')),
      heading: firstCodeSpan(cell('heading')),
      anchorLine: anchorMatch === null ? null : Number(anchorMatch[1]),
      dataKey: firstCodeSpan(cell('dataKey'))
    }
  })
}

/* -------------------------------------------------------------------- main */

const normalize = (text) => text.replace(/\s+/g, ' ').trim().toLowerCase()

/** First line after `line` that carries content: not blank, not another anchor. */
function markedLine (lines, line) {
  for (let index = line; index < lines.length; index++) {
    const text = lines[index].trim()
    if (text === '' || text.startsWith('<!--')) continue
    return { line: index + 1, text }
  }
  return null
}

const shorten = (text, limit) => (text.length <= limit ? text : `${text.slice(0, limit - 3)}...`)

async function main (argv) {
  const options = readOptions(argv)
  if (options.help) {
    console.log(usage)
    return 0
  }

  const readmeText = readFileSync(options.readme, 'utf8')
  const mapText = readFileSync(options.map, 'utf8')
  const manifesto = await loadDataModule(options.manifesto)
  const assessment = await loadDataModule(options.assessment)

  const readmeIds = readReadmeIds(readmeText)
  const readmeHeadings = readReadmeHeadings(readmeText)
  const sectionMap = readSectionMap(manifesto, relative(REPO_ROOT, options.manifesto))
  const mapRows = readMapRows(mapText)

  const modules = [
    [relative(REPO_ROOT, options.manifesto), manifesto],
    [relative(REPO_ROOT, options.assessment), assessment]
  ]

  const readmeSet = new Set(readmeIds.map((entry) => entry.id))
  const dataSet = new Set(sectionMap.map((entry) => entry.id))
  const mapSet = new Set(mapRows.filter((row) => row.id !== null).map((row) => row.id))

  const readmeOnly = [...readmeSet].filter((id) => !dataSet.has(id)).sort()
  const dataOnly = [...dataSet].filter((id) => !readmeSet.has(id)).sort()
  const bothSides = [...readmeSet].filter((id) => dataSet.has(id)).sort()
  const unmapped = [...new Set([...readmeSet, ...dataSet])].filter((id) => !mapSet.has(id)).sort()
  const orphanMapRows = [...mapSet].filter((id) => !readmeSet.has(id) && !dataSet.has(id)).sort()

  const headingsByText = new Map()
  for (const heading of readmeHeadings) {
    const key = normalize(heading.text)
    if (!headingsByText.has(key)) headingsByText.set(key, heading)
  }

  const dataKeysById = new Map(sectionMap.map((entry) => [entry.id, entry.dataKey]))
  const anchorLineById = new Map(readmeIds.map((entry) => [entry.id, entry.line]))

  const failures = []
  const notes = []

  if (readmeOnly.length > 0) failures.push(`${readmeOnly.length} id(s) on the README side only: ${readmeOnly.join(', ')}`)
  if (dataOnly.length > 0) failures.push(`${dataOnly.length} id(s) on the data side only: ${dataOnly.join(', ')}`)
  if (unmapped.length > 0) failures.push(`${unmapped.length} id(s) with no row in the map: ${unmapped.join(', ')}`)
  if (orphanMapRows.length > 0) failures.push(`${orphanMapRows.length} map row(s) naming an id that is on neither side: ${orphanMapRows.join(', ')}`)

  for (const row of mapRows) {
    const where = `${relative(REPO_ROOT, options.map)}:${row.line}`
    if (row.id === null) {
      failures.push(`${where} map row has no id`)
      continue
    }
    if (row.heading === null) {
      failures.push(`${where} ${row.id}: map row has no README heading`)
    } else {
      const heading = headingsByText.get(normalize(row.heading))
      if (heading === undefined) {
        failures.push(`${where} ${row.id}: README heading "${row.heading}" does not exist in ${relative(REPO_ROOT, options.readme)}`)
      } else if (heading.text !== row.heading) {
        notes.push(`${row.id}: README heading is "${heading.text}", map row says "${row.heading}" (letter case only, not a mismatch)`)
      }
    }
    if (row.dataKey === null) {
      failures.push(`${where} ${row.id}: map row has no site data key`)
    } else if (resolveDataKey(row.dataKey, modules) === null) {
      failures.push(`${where} ${row.id}: data key "${row.dataKey}" does not exist in ${relative(REPO_ROOT, options.manifesto)} or ${relative(REPO_ROOT, options.assessment)}`)
    }
    if (row.anchorLine !== null) {
      const actual = anchorLineById.get(row.id)
      if (actual === undefined) {
        notes.push(`${row.id}: map row states anchor line ${row.anchorLine}, but there is no such anchor`)
      } else if (actual !== row.anchorLine) {
        notes.push(`${row.id}: map row states anchor line ${row.anchorLine}, the anchor is at line ${actual} (line numbers drift, not a mismatch)`)
      }
    }
  }

  const duplicates = (entries) => {
    const seen = new Set()
    const repeated = new Set()
    for (const entry of entries) {
      if (seen.has(entry.id)) repeated.add(entry.id)
      seen.add(entry.id)
    }
    return [...repeated].sort()
  }
  const duplicateReadme = duplicates(readmeIds)
  const duplicateData = duplicates(sectionMap)
  if (duplicateReadme.length > 0) notes.push(`README anchor repeated: ${duplicateReadme.join(', ')}`)
  if (duplicateData.length > 0) notes.push(`sectionMap id repeated: ${duplicateData.join(', ')}`)

  for (const id of bothSides) {
    const fromMap = mapRows.find((row) => row.id === id)?.dataKey
    const fromData = dataKeysById.get(id)
    if (fromMap !== undefined && fromMap !== fromData) {
      notes.push(`${id}: map row data key "${fromMap}" differs from sectionMap data key "${fromData}"`)
    }
  }

  /* ------------------------------------------------------------- reporting */

  const readmeLabel = relative(REPO_ROOT, options.readme)
  const mapLabel = relative(REPO_ROOT, options.map)
  console.log('check-consistency: BEAT section and principle consistency')
  console.log(`check-consistency: repo      ${REPO_ROOT}`)
  console.log(`check-consistency: README    ${readmeLabel} (${readmeText.split('\n').length} lines, ${readmeIds.length} id anchor(s), ${readmeHeadings.length} heading(s))`)
  console.log(`check-consistency: data      ${relative(REPO_ROOT, options.manifesto)} (sectionMap, ${sectionMap.length} id(s))`)
  console.log(`check-consistency: map       ${mapLabel} (${mapRows.length} row(s))`)
  console.log('')

  console.log(`check-consistency: README id set (${readmeSet.size})`)
  const idWidth = Math.max(4, ...[...readmeSet].map((id) => id.length))
  const readmeLines = readmeText.split('\n')
  for (const entry of [...readmeIds].sort((a, b) => a.id.localeCompare(b.id))) {
    // An anchor sits inside a section and may mark either the heading that
    // follows it or a paragraph under an earlier heading, so both are shown.
    const enclosing = readmeHeadings.filter((heading) => heading.line < entry.line).at(-1)
    const under = enclosing === undefined
      ? 'no heading above it'
      : `under "${enclosing.text}" (H${enclosing.level}, line ${enclosing.line})`
    const marked = markedLine(readmeLines, entry.line)
    const marks = marked === null ? 'nothing after it' : `marks line ${marked.line}: ${shorten(marked.text, 64)}`
    console.log(`check-consistency:   ${entry.id.padEnd(idWidth)}  ${readmeLabel}:${entry.line}  ${under}; ${marks}`)
  }
  console.log('')

  console.log(`check-consistency: data id set (${dataSet.size}) from sectionMap`)
  for (const entry of [...sectionMap].sort((a, b) => a.id.localeCompare(b.id))) {
    console.log(`check-consistency:   ${entry.id.padEnd(idWidth)}  dataKey=${entry.dataKey}  heading="${entry.heading}"`)
  }
  console.log('')

  console.log(`check-consistency: on both sides (${bothSides.length}): ${bothSides.join(', ') || '(none)'}`)
  console.log(`check-consistency: README only  (${readmeOnly.length}): ${readmeOnly.join(', ') || '(none)'}`)
  console.log(`check-consistency: data only    (${dataOnly.length}): ${dataOnly.join(', ') || '(none)'}`)
  console.log('')

  console.log(`check-consistency: map rows (${mapRows.length}) against both sides`)
  for (const row of mapRows) {
    if (row.id === null) {
      console.log(`check-consistency:   ${mapLabel}:${row.line}  no id in this row`)
      continue
    }
    const heading = row.heading === null ? null : headingsByText.get(normalize(row.heading))
    const headingText = heading === undefined || heading === null
      ? `heading "${row.heading ?? '(none)'}" NOT FOUND`
      : `heading "${heading.text}" at ${readmeLabel}:${heading.line}`
    const resolved = row.dataKey === null ? null : resolveDataKey(row.dataKey, modules)
    const keyText = row.dataKey === null
      ? 'data key (none)'
      : resolved === null
        ? `data key "${row.dataKey}" NOT FOUND`
        : `data key "${row.dataKey}" at ${resolved.file}`
    const anchorText = row.anchorLine === null ? 'anchor line (none)' : `anchor line ${row.anchorLine}`
    console.log(`check-consistency:   ${row.id.padEnd(idWidth)}  ${headingText}; ${keyText}; ${anchorText}`)
  }
  console.log('')

  const subsections = Array.isArray(manifesto.framework?.subsections) ? manifesto.framework.subsections : []
  const matchedSubsections = subsections.filter((name) => headingsByText.has(normalize(String(name))))
  const unmatchedSubsections = subsections.filter((name) => !headingsByText.has(normalize(String(name))))
  console.log(`check-consistency: framework.subsections (informational, a content list, not an id set)`)
  console.log(`check-consistency:   ${subsections.length} name(s), ${matchedSubsections.length} match a ${readmeLabel} heading, ${unmatchedSubsections.length} do not`)
  for (const name of unmatchedSubsections) {
    console.log(`check-consistency:   no heading for "${name}"`)
  }
  console.log('')

  if (notes.length > 0) {
    console.log(`check-consistency: notes (${notes.length}, informational, not failures)`)
    for (const note of notes) console.log(`check-consistency:   ${note}`)
    console.log('')
  }

  if (failures.length > 0) {
    console.log(`check-consistency: FAIL, ${failures.length} mismatch(es)`)
    for (const failure of failures) console.log(`check-consistency:   ${failure}`)
    console.log('')
    console.log(`check-consistency: ${readmeSet.size} README id(s), ${dataSet.size} data id(s), ${bothSides.length} on both sides, ${readmeOnly.length + dataOnly.length} one-sided, ${mapRows.length} map row(s), ${unmapped.length} unmapped, ${failures.length} mismatch(es)`)
    return 1
  }

  console.log(`check-consistency: PASS, ${readmeSet.size} README id(s) and ${dataSet.size} data id(s), ${bothSides.length} on both sides, 0 one-sided, ${mapRows.length} map row(s) covering every id, every heading and data key resolved`)
  return 0
}

try {
  process.exitCode = await main(process.argv.slice(2))
} catch (error) {
  console.error(`check-consistency: ${error.message}`)
  console.error(usage)
  process.exitCode = 2
}
