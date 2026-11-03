#!/usr/bin/env node
/**
 * check-design-rules.mjs
 *
 * Plain Node script (no runtime dependency) that checks the design rules of
 * the BEAT site mechanically:
 *
 *   emoji            no emoji characters
 *   gradient-utility no gradient utilities (bg-gradient-*, from-*, via-*, to-*)
 *   gradient-decl    no linear-gradient / radial-gradient / conic-gradient
 *   inline-style     no inline style attributes
 *   style-block      no <style> blocks in Vue components
 *   icon-markup      no icon markup other than FontAwesome components or classes
 *
 * Usage:
 *   node scripts/check-design-rules.mjs [path ...]
 *
 * Paths default to README.md and public/src, relative to the repository root.
 * Exit codes: 0 = no violations, 1 = violations found, 2 = bad usage or I/O error.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(SCRIPT_DIR, '..')
const DEFAULT_TARGETS = [join(REPO_ROOT, 'README.md'), join(REPO_ROOT, 'public/src')]

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'coverage', '.vite', '.locust'])
const TEXT_EXTENSIONS = new Set([
  '.md', '.mdx', '.vue', '.js', '.mjs', '.cjs', '.ts', '.jsx', '.tsx',
  '.css', '.html', '.json', '.txt'
])
const MARKUP_EXTENSIONS = new Set(['.vue', '.html'])
const VUE_EXTENSIONS = new Set(['.vue'])

const RULE_IDS = [
  'emoji',
  'gradient-utility',
  'gradient-decl',
  'inline-style',
  'style-block',
  'icon-markup'
]

// ---------------------------------------------------------------------------
// Emoji
//
// A character counts as an emoji when it renders as one by default
// (Emoji_Presentation), when it is a pictograph that carries the emoji
// presentation selector U+FE0F (for example the heart in "❤️"), or when it is
// a keycap sequence (U+20E3). Text-presentation dingbats that are commonly
// used in plain text - such as U+2713 CHECK MARK - are not emoji and stay
// allowed.
// ---------------------------------------------------------------------------
const EMOJI_PRESENTATION_RE = /\p{Emoji_Presentation}/u
const EXTENDED_PICTOGRAPHIC_RE = /\p{Extended_Pictographic}/u
const EMOJI_KEYCAP = '\u20E3'
const EMOJI_SELECTOR = '\uFE0F'

// ---------------------------------------------------------------------------
// Gradients
//
// The colour list keeps the rule from firing on ordinary prose ("from the
// team") and keeps Tailwind's position utilities (to-top, to-bottom,
// to-left, to-right) out of the gradient rule.
// ---------------------------------------------------------------------------
const COLOR_TOKEN =
  '(?:transparent|current|inherit|white|black|slate|gray|zinc|neutral|stone|' +
  'red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|' +
  'violet|purple|fuchsia|pink|rose)'
const COLOR_SCALE = '(?:-\\d{2,3})?(?:/\\d{1,3})?'
// An arbitrary value, for example from-[#6366f1].
const COLOR_ARBITRARY = '(?:\\[[^\\]\\s]+\\])'
const GRADIENT_UTILITY_RES = [
  { re: /\bbg-gradient-[A-Za-z0-9_-]+/g, name: 'bg-gradient-*' },
  { re: /\bbg-linear-[A-Za-z0-9_-]+/g, name: 'bg-linear-*' },
  { re: new RegExp(`\\bfrom-(?:${COLOR_TOKEN}${COLOR_SCALE}|${COLOR_ARBITRARY})`, 'g'), name: 'from-*' },
  { re: new RegExp(`\\bvia-(?:${COLOR_TOKEN}${COLOR_SCALE}|${COLOR_ARBITRARY})`, 'g'), name: 'via-*' },
  { re: new RegExp(`\\bto-(?:${COLOR_TOKEN}${COLOR_SCALE}|${COLOR_ARBITRARY})`, 'g'), name: 'to-*' }
]
const GRADIENT_DECL_RE =
  /(?:-webkit-|-moz-|-o-)?(?:repeating-)?(?:linear|radial|conic)-gradient\s*\(/gi

// ---------------------------------------------------------------------------
// Inline styles
//
// Static style="..." attributes and bound :style="..." / v-bind:style="..."
// bindings. The lookbehind keeps JavaScript property assignments such as
// "el.style = 'x'" out of the rule.
// ---------------------------------------------------------------------------
const INLINE_STYLE_RE = /(?<![\w$.])(?::|v-bind:)?style\s*=\s*["']/g

// <style> blocks inside Vue single-file components.
const STYLE_BLOCK_RE = /<style(\s[^>]*)?>/gi

// ---------------------------------------------------------------------------
// Icons
//
// FontAwesome is the only allowed icon system: the FontAwesome free style
// prefixes (fa, fas, far, fal, fat, fab, ...), any fa-* icon class, and the
// FontAwesome Vue components. Everything else - inline SVG, Material
// Symbols, Lucide, Heroicons and similar - is a violation.
// ---------------------------------------------------------------------------
const FA_EXACT_TOKENS = new Set([
  'fa', 'fas', 'far', 'fal', 'fat', 'fab', 'fad', 'fass',
  'fa-solid', 'fa-regular', 'fa-brands', 'fa-light', 'fa-thin',
  'fa-duotone', 'fa-sharp', 'fa-classic', 'fa-kit'
])
const isFontAwesomeToken = (token) => FA_EXACT_TOKENS.has(token) || token.startsWith('fa-')

const NON_FA_EXACT_TOKENS = new Set([
  'material-icons', 'material-symbols', 'material-symbols-rounded',
  'material-symbols-outlined', 'mdi', 'bi', 'lucide', 'heroicon', 'heroicons',
  'feather', 'feather-icon', 'ti', 'ai', 'remixicon', 'octicon', 'devicon',
  'typicons', 'phosphor', 'jam', 'uil', 'gg', 'iconify', 'line-awesome',
  'uicons', 'bootstrap-icons', 'emojione', 'twemoji', 'emoji'
])
// Prefixes of common non-FontAwesome icon systems. Tailwind spacing
// utilities that share a prefix (pe-*, ms-*, me-*) are deliberately absent.
const NON_FA_PREFIXES = [
  'mdi-', 'bi-', 'lucide-', 'hero-', 'feather-', 'ti-', 'ai-', 'remix-',
  'ion-', 'uil-', 'gg-', 'emoji-', 'emojione-', 'twemoji-',
  'material-symbols-', 'material-icons-', 'bootstrap-icons-'
]
const isNonFontAwesomeToken = (token) =>
  NON_FA_EXACT_TOKENS.has(token) || NON_FA_PREFIXES.some((prefix) => token.startsWith(prefix))

const FA_COMPONENT_TAGS = new Set(['font-awesome-icon', 'fa-icon', 'fontawesome-icon'])

const usage = `Usage: node scripts/check-design-rules.mjs [path ...] [--strict-emoji]

Paths default to README.md and public/src (relative to the repository root).
--strict-emoji  also flag text-presentation pictographs (for example U+2713
                CHECK MARK); by default only characters that render as emoji
                are flagged.
Exit codes: 0 = clean, 1 = violations found, 2 = usage or I/O error.`

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

const findings = []
const addFinding = (file, offset, rule, message, locator) => {
  const { line, column } = locator(offset)
  findings.push({ file, line, column, rule, message })
}

/**
 * Class attribute values of one tag. Static values are collected; a bound
 * class counts as static only when it is a plain string literal.
 */
function readClassAttributes (attributeText) {
  const staticValues = []
  let hasDynamic = false
  const attributeRe = /([:@#]?[\w.-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g
  let match
  while ((match = attributeRe.exec(attributeText)) !== null) {
    const name = match[1]
    if (name !== 'class' && name !== ':class' && name !== 'v-bind:class') continue
    const value = match[2] ?? match[3] ?? match[4] ?? ''
    if (name === 'class') {
      staticValues.push(value)
      continue
    }
    const literal = value.trim().match(/^(['"])([\s\S]*)\1$/)
    if (literal) staticValues.push(literal[2])
    else hasDynamic = true
  }
  return { staticValues, hasDynamic }
}

const tokenizeClasses = (value) =>
  value.split(/\s+/).map((token) => token.trim()).filter(Boolean)

/** The markup regions of a file: the template block of a Vue file, or the whole file. */
function markupRegions (text, extension) {
  if (!VUE_EXTENSIONS.has(extension)) return [{ start: 0, end: text.length }]
  const open = text.search(/<template(\s[^>]*)?>/i)
  if (open === -1) return []
  const openEnd = text.indexOf('>', open) + 1
  const close = text.lastIndexOf('</template>')
  if (close === -1 || close < openEnd) return []
  return [{ start: openEnd, end: close }]
}

/** Scan one file for every design-rule violation. */
function scanFile (file, text, strictEmoji) {
  const locator = makeLocator(text)
  const extension = extname(file)
  const isMarkup = MARKUP_EXTENSIONS.has(extension)
  const isVue = VUE_EXTENSIONS.has(extension)

  // Emoji characters. The scan walks code points, not UTF-16 code units, so
  // astral characters such as U+1F680 are seen as one character.
  let previousCharacter = ''
  for (let index = 0; index < text.length; ) {
    const codePoint = text.codePointAt(index)
    const character = String.fromCodePoint(codePoint)
    const width = character.length
    if (character === EMOJI_SELECTOR) {
      if (EXTENDED_PICTOGRAPHIC_RE.test(previousCharacter)) {
        addFinding(file, index, 'emoji', 'emoji presentation selector (U+FE0F) on a pictograph', locator)
      }
      previousCharacter = character
      index += width
      continue
    }
    if (character === EMOJI_KEYCAP) {
      addFinding(file, index, 'emoji', 'keycap sequence (U+20E3)', locator)
      previousCharacter = character
      index += width
      continue
    }
    if (!EMOJI_PRESENTATION_RE.test(character)) {
      if (strictEmoji && EXTENDED_PICTOGRAPHIC_RE.test(character)) {
        const strictCodePoint = codePoint.toString(16).toUpperCase()
        addFinding(
          file,
          index,
          'emoji',
          `pictograph "${character}" (U+${strictCodePoint.padStart(4, '0')}), text presentation`,
          locator
        )
      }
      previousCharacter = character
      index += width
      continue
    }
    const hex = codePoint.toString(16).toUpperCase()
    addFinding(
      file,
      index,
      'emoji',
      `emoji character "${character}" (U+${hex.padStart(4, '0')})`,
      locator
    )
    previousCharacter = character
    index += width
  }

  // Gradient utilities and gradient declarations.
  for (const { re, name } of GRADIENT_UTILITY_RES) {
    for (const match of text.matchAll(re)) {
      addFinding(file, match.index, 'gradient-utility', `gradient utility "${match[0]}" (${name})`, locator)
    }
  }
  for (const match of text.matchAll(GRADIENT_DECL_RE)) {
    addFinding(file, match.index, 'gradient-decl', `gradient declaration "${match[0].trim()}"`, locator)
  }

  if (isVue) {
    // <style> blocks in Vue single-file components.
    for (const match of text.matchAll(STYLE_BLOCK_RE)) {
      addFinding(file, match.index, 'style-block', '<style> block in Vue component', locator)
    }
  }

  if (!isMarkup) return

  for (const region of markupRegions(text, extension)) {
    const regionText = text.slice(region.start, region.end)

    // Inline style attributes.
    for (const match of regionText.matchAll(INLINE_STYLE_RE)) {
      addFinding(file, region.start + match.index, 'inline-style', 'inline style attribute', locator)
    }

    // Icon markup: inline SVG, icon systems other than FontAwesome, and <i>
    // elements that carry no FontAwesome class.
    const tagRe = /<([a-zA-Z][\w.-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)\/?>/g
    for (const match of regionText.matchAll(tagRe)) {
      const tag = match[1].toLowerCase()
      const attributeText = match[2] ?? ''

      if (tag === 'svg') {
        addFinding(file, region.start + match.index, 'icon-markup', 'inline <svg> element; use a FontAwesome icon', locator)
        continue
      }
      if (FA_COMPONENT_TAGS.has(tag)) continue

      const { staticValues, hasDynamic } = readClassAttributes(attributeText)
      const tokens = staticValues.flatMap(tokenizeClasses)

      for (const token of tokens) {
        if (isNonFontAwesomeToken(token)) {
          addFinding(
            file,
            region.start + match.index,
            'icon-markup',
            `icon class "${token}" is not a FontAwesome class`,
            locator
          )
        }
      }

      if (tag === 'i') {
        const hasFontAwesome = tokens.some(isFontAwesomeToken)
        if (!hasFontAwesome && !hasDynamic) {
          addFinding(
            file,
            region.start + match.index,
            'icon-markup',
            '<i> icon element without a FontAwesome class',
            locator
          )
        }
      }
    }
  }
}

function main (argv) {
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(usage)
    return 0
  }
  const known = new Set(['--strict-emoji', '--help', '-h'])
  const unknown = argv.filter((argument) => argument.startsWith('-') && !known.has(argument))
  if (unknown.length > 0) throw new Error(`unknown option: ${unknown[0]}`)
  const strictEmoji = argv.includes('--strict-emoji')
  const paths = argv.filter((argument) => !argument.startsWith('-'))
  const targets = paths.length > 0 ? paths : DEFAULT_TARGETS

  const files = []
  for (const target of targets) {
    for (const file of collectFiles(target)) {
      if (!files.includes(file)) files.push(file)
    }
  }
  files.sort()

  for (const file of files) {
    const text = readFileSync(file, 'utf8')
    if (text.includes('\u0000')) continue
    scanFile(file, text, strictEmoji)
  }

  const shown = (file) => relative(process.cwd(), file) || file
  console.log(`check-design-rules: ${files.length} file(s) scanned across ${targets.length} target(s)`)
  for (const finding of findings) {
    console.log(
      `${shown(finding.file)}:${finding.line}:${finding.column}: ` +
      `[${finding.rule}] ${finding.message}`
    )
  }

  const byRule = new Map(RULE_IDS.map((id) => [id, 0]))
  for (const finding of findings) byRule.set(finding.rule, byRule.get(finding.rule) + 1)
  const byFile = new Map()
  for (const finding of findings) {
    const name = shown(finding.file)
    byFile.set(name, (byFile.get(name) ?? 0) + 1)
  }

  console.log(`${findings.length} violation(s) in ${byFile.size} file(s)`)
  for (const id of RULE_IDS) console.log(`  ${id}: ${byRule.get(id)}`)
  return findings.length > 0 ? 1 : 0
}

try {
  process.exit(main(process.argv.slice(2)))
} catch (error) {
  console.error(`check-design-rules: ${error.message}`)
  console.error(usage)
  process.exit(2)
}
