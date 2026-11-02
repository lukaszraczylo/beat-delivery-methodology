#!/usr/bin/env node
/**
 * check-banned-terms.mjs
 *
 * Plain Node script (no runtime dependency) that checks copy discipline: no
 * marketing language in the site copy or in the README headings.
 *
 * The banned terms live in a separate data file (scripts/banned-terms.txt by
 * default) so the list can be tuned without touching this script.
 *
 * Usage:
 *   node scripts/check-banned-terms.mjs [path ...] [--list <file>] [--md-scope headings|all]
 *
 * Paths default to README.md and public/src, relative to the repository root.
 * Exit codes: 0 = no hits, 1 = hits found, 2 = bad usage or I/O error.
 *
 * What counts as copy:
 *   - JavaScript and Vue script blocks: the text of string literals. A reader
 *     sees that text; identifiers, object keys and comments are not copy.
 *   - Vue templates: text content and the user-visible attributes title, alt,
 *     label, placeholder and aria-label.
 *   - Markdown: headings only, unless --md-scope all is given.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(SCRIPT_DIR, '..')
const DEFAULT_LIST = join(SCRIPT_DIR, 'banned-terms.txt')
const DEFAULT_TARGETS = [join(REPO_ROOT, 'README.md'), join(REPO_ROOT, 'public/src')]

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'coverage', '.vite', '.locust'])
const CODE_EXTENSIONS = new Set(['.js', '.mjs', '.cjs', '.ts', '.jsx', '.tsx'])
const VUE_EXTENSIONS = new Set(['.vue'])
const MARKDOWN_EXTENSIONS = new Set(['.md', '.mdx'])
const TEXT_EXTENSIONS = new Set([...CODE_EXTENSIONS, ...VUE_EXTENSIONS, ...MARKDOWN_EXTENSIONS])

// Attributes of a tag whose value the reader sees.
const USER_VISIBLE_ATTRIBUTES = new Set(['title', 'alt', 'label', 'placeholder', 'aria-label'])

const usage = `Usage: node scripts/check-banned-terms.mjs [path ...] [--list <file>] [--md-scope headings|all]

Paths default to README.md and public/src (relative to the repository root).
--list <file>    banned-term list to read (default: scripts/banned-terms.txt)
--md-scope       headings (default) or all, for Markdown files
Exit codes: 0 = no hits, 1 = hits found, 2 = usage or I/O error.`

/** Read the banned-term list. One term per line, "#" starts a comment. */
function readTermList (listPath) {
  let text
  try {
    text = readFileSync(listPath, 'utf8')
  } catch {
    throw new Error(`cannot read banned-term list: ${listPath}`)
  }
  const terms = []
  for (const rawLine of text.split('\n')) {
    const line = rawLine.replace(/\r$/, '').trim()
    if (line === '' || line.startsWith('#')) continue
    terms.push(line)
  }
  if (terms.length === 0) throw new Error(`banned-term list is empty: ${listPath}`)
  return terms
}

/** Build the matcher for one term: word boundaries for single words, flexible spacing for phrases. */
function buildMatcher (term) {
  const pattern = term
    .split(/\s+/)
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('[\\s_-]+')
  return {
    term,
    regex: new RegExp(`(?<![\\p{L}\\p{N}])${pattern}(?![\\p{L}\\p{N}])`, 'giu')
  }
}

/** Collect the text files under a target path. */
function collectFiles (target) {
  const absolute = resolve(process.cwd(), target)
  let stats
  try {
    stats = statSync(absolute)
  } catch {
    throw new Error(`cannot read target: ${target}`)
  }
  if (stats.isFile()) return [absolute]
  const files = []
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) continue
        walk(join(dir, entry.name))
      } else if (entry.isFile()) {
        if (TEXT_EXTENSIONS.has(extname(entry.name))) files.push(join(dir, entry.name))
      }
    }
  }
  walk(absolute)
  return files.sort()
}

/**
 * A string literal that is a locator - a URL, a protocol-relative URL or an
 * absolute path - points at something, it is not copy the reader reads.
 */
function isLocator (text) {
  if (/\s/.test(text)) return false
  return /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(text) || text.startsWith('/') || /^mailto:/i.test(text)
}

/** The text of the string literals in a code range, with their absolute offsets. */
function codeStrings (text, start, end) {
  const pieces = []
  let index = start
  while (index < end) {
    const character = text[index]
    if (character === '/' && text[index + 1] === '/') {
      while (index < end && text[index] !== '\n') index++
      continue
    }
    if (character === '/' && text[index + 1] === '*') {
      index += 2
      while (index < end && !(text[index] === '*' && text[index + 1] === '/')) index++
      index += 2
      continue
    }
    if (character === '"' || character === "'") {
      const contentStart = index + 1
      index++
      while (index < end) {
        if (text[index] === '\\') {
          index += 2
          continue
        }
        if (text[index] === character) break
        index++
      }
      pieces.push({ start: contentStart, text: text.slice(contentStart, index) })
      index++
      continue
    }
    if (character === '`') {
      // Template literal: the literal text between the substitutions is copy,
      // the expressions inside ${...} are code and are skipped.
      index++
      let segmentStart = index
      while (index < end) {
        if (text[index] === '\\') {
          index += 2
          continue
        }
        if (text[index] === '`') break
        if (text[index] === '$' && text[index + 1] === '{') {
          pieces.push({ start: segmentStart, text: text.slice(segmentStart, index) })
          index += 2
          let depth = 1
          while (index < end && depth > 0) {
            if (text[index] === '{') depth++
            else if (text[index] === '}') depth--
            index++
          }
          segmentStart = index
          continue
        }
        index++
      }
      pieces.push({ start: segmentStart, text: text.slice(segmentStart, index) })
      index++
      continue
    }
    index++
  }
  return pieces.filter((piece) => piece.text !== '' && !isLocator(piece.text))
}

/** The region of a Vue file's <template> block, or null. */
function templateRegion (text) {
  const open = text.search(/<template(\s[^>]*)?>/i)
  if (open === -1) return null
  const openEnd = text.indexOf('>', open) + 1
  const close = text.lastIndexOf('</template>')
  if (close === -1 || close < openEnd) return null
  return { start: openEnd, end: close }
}

/** The region of a Vue file's <script> block, or null. */
function scriptRegion (text) {
  const open = text.search(/<script(\s[^>]*)?>/i)
  if (open === -1) return null
  const openEnd = text.indexOf('>', open) + 1
  const close = text.lastIndexOf('</script>')
  if (close === -1 || close < openEnd) return null
  return { start: openEnd, end: close }
}

/** Text content and user-visible attribute values of a template region. */
function templateCopy (text, region) {
  const pieces = []
  const slice = text.slice(region.start, region.end)
  const tagRe = /<!--[\s\S]*?-->|<\/?([a-zA-Z][\w.-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)\/?>/g
  let last = 0
  for (const match of slice.matchAll(tagRe)) {
    // Text between the previous tag and this one is template text content.
    if (match.index > last) {
      pieces.push({ start: region.start + last, text: slice.slice(last, match.index) })
    }
    last = match.index + match[0].length

    if (match[1] === undefined) continue // an HTML comment is not copy

    const attributeText = match[2] ?? ''
    const attributeTextOffset = match.index + 1 + match[1].length
    const attributeRe = /([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g
    let attribute
    while ((attribute = attributeRe.exec(attributeText)) !== null) {
      // A bound attribute (:title, v-bind:title) shows the same value as the
      // static one, so both are copy.
      const name = attribute[1].toLowerCase().replace(/^(?:v-bind:|:)/, '')
      if (!USER_VISIBLE_ATTRIBUTES.has(name)) continue
      const doubleQuoted = attribute[2] !== undefined
      const value = doubleQuoted ? attribute[2] : attribute[3]
      const quoteCharacter = doubleQuoted ? '"' : "'"
      const equals = attribute[0].indexOf('=')
      const valueOffset = attribute[0].indexOf(quoteCharacter, equals) + 1
      pieces.push({
        start: region.start + attributeTextOffset + attribute.index + valueOffset,
        text: value
      })
    }
  }
  if (last < slice.length) {
    pieces.push({ start: region.start + last, text: slice.slice(last) })
  }
  return pieces
}

/** Headings of a Markdown file, with their absolute offsets. */
function markdownHeadings (text) {
  const headings = []
  let inFence = false
  const lines = text.split('\n')
  let offset = 0
  for (const line of lines) {
    if (/^\s{0,3}(?:```|~~~)/.test(line)) {
      inFence = !inFence
      offset += line.length + 1
      continue
    }
    if (!inFence) {
      const match = line.match(/^ {0,3}#{1,6}[ \t]+(.+)$/)
      if (match) {
        const inline = match[1]
          .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
          .replace(/[*_`~]/g, '')
        headings.push({ start: offset, text: inline })
      }
    }
    offset += line.length + 1
  }
  return headings
}

/** Every piece of copy in a file, with absolute offsets. */
function extractCopy (text, extension, mdScope) {
  const pieces = []
  if (MARKDOWN_EXTENSIONS.has(extension)) {
    if (mdScope === 'all') {
      pieces.push({ start: 0, text })
    } else {
      pieces.push(...markdownHeadings(text))
    }
    return pieces
  }
  if (CODE_EXTENSIONS.has(extension)) {
    pieces.push(...codeStrings(text, 0, text.length))
    return pieces
  }
  if (VUE_EXTENSIONS.has(extension)) {
    const script = scriptRegion(text)
    if (script) pieces.push(...codeStrings(text, script.start, script.end))
    const template = templateRegion(text)
    if (template) pieces.push(...templateCopy(text, template))
    return pieces
  }
  return pieces
}

/** Line/column lookup for an offset inside a text buffer. */
function makeLocator (text) {
  const lineStarts = [0]
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\n') lineStarts.push(i + 1)
  }
  return (offset) => {
    let low = 0
    let high = lineStarts.length - 1
    while (low < high) {
      const mid = (low + high + 1) >> 1
      if (lineStarts[mid] <= offset) low = mid
      else high = mid - 1
    }
    return { line: low + 1, column: offset - lineStarts[low] + 1 }
  }
}

function main (argv) {
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(usage)
    return 0
  }

  let listPath = DEFAULT_LIST
  let mdScope = 'headings'
  const paths = []
  for (let i = 0; i < argv.length; i++) {
    const argument = argv[i]
    if (argument === '--list') {
      listPath = resolve(process.cwd(), argv[++i] ?? '')
    } else if (argument.startsWith('--list=')) {
      listPath = resolve(process.cwd(), argument.slice('--list='.length))
    } else if (argument === '--md-scope') {
      mdScope = argv[++i] ?? 'headings'
    } else if (argument.startsWith('--md-scope=')) {
      mdScope = argument.slice('--md-scope='.length)
    } else if (argument.startsWith('-')) {
      throw new Error(`unknown option: ${argument}`)
    } else {
      paths.push(argument)
    }
  }
  if (mdScope !== 'headings' && mdScope !== 'all') {
    throw new Error('--md-scope must be "headings" or "all"')
  }

  const targets = paths.length > 0 ? paths : DEFAULT_TARGETS
  const terms = readTermList(listPath).map(buildMatcher)

  const files = []
  for (const target of targets) {
    for (const file of collectFiles(target)) {
      if (!files.includes(file)) files.push(file)
    }
  }
  files.sort()

  const hits = []
  for (const file of files) {
    const text = readFileSync(file, 'utf8')
    if (text.includes('\u0000')) continue
    const extension = extname(file)
    const locator = makeLocator(text)
    for (const piece of extractCopy(text, extension, mdScope)) {
      for (const matcher of terms) {
        matcher.regex.lastIndex = 0
        for (const match of piece.text.matchAll(matcher.regex)) {
          const offset = piece.start + match.index
          const { line, column } = locator(offset)
          hits.push({ file, line, column, term: matcher.term, matched: match[0] })
        }
      }
    }
  }

  const shown = (file) => relative(process.cwd(), file) || file
  console.log(
    `check-banned-terms: ${files.length} file(s) scanned across ${targets.length} target(s), ` +
    `${terms.length} banned term(s) from ${shown(listPath)} (md-scope: ${mdScope})`
  )
  for (const hit of hits) {
    console.log(
      `${shown(hit.file)}:${hit.line}:${hit.column}: ` +
      `[banned-term] "${hit.matched}" (list entry: ${hit.term})`
    )
  }

  const byTerm = new Map()
  for (const hit of hits) byTerm.set(hit.term, (byTerm.get(hit.term) ?? 0) + 1)
  const byFile = new Map()
  for (const hit of hits) {
    const name = shown(hit.file)
    byFile.set(name, (byFile.get(name) ?? 0) + 1)
  }

  console.log(`${hits.length} hit(s) in ${byFile.size} file(s)`)
  for (const [term, count] of [...byTerm.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
    console.log(`  ${term}: ${count}`)
  }
  return hits.length > 0 ? 1 : 0
}

try {
  process.exit(main(process.argv.slice(2)))
} catch (error) {
  console.error(`check-banned-terms: ${error.message}`)
  console.error(usage)
  process.exit(2)
}
