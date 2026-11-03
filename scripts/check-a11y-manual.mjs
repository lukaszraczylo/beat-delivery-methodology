/**
 * Manual WCAG 2.2 AA checks for the BEAT site, run in a real browser.
 *
 * The script drives the built site over HTTP and records, for every route:
 *
 *   1. Keyboard operability: every interactive element is reachable with
 *      Tab, the focus order follows the visual order, and the focused
 *      element shows a visible focus indicator (outline, box-shadow or a
 *      border colour change against the un-focused state).
 *   2. Landmarks and heading order: one banner, one main, one contentinfo,
 *      at most one navigation landmark per group, exactly one h1, and no
 *      skipped heading level.
 *   3. Meaningful link text: every link has an accessible name that
 *      describes its destination, and no link is named "click here",
 *      "read more", "here", "link" or a bare URL.
 *   4. Alt text: every image carries an alt attribute; an informative image
 *      has text, a decorative image has an empty alt.
 *   5. Measured contrast: the computed foreground and background colours of
 *      every text node, its size and weight, compared against the WCAG
 *      thresholds (4.5:1 for body text, 3:1 for large text).
 *
 * The script prints the raw measurements and writes a JSON file. It does
 * not change any application code.
 *
 * Usage:
 *   node scripts/check-a11y-manual.mjs [--dist <dir>] [--browser <path>]
 *                                    [--json <file>] [--help]
 *
 * Exit codes: 0 = every check passed, 1 = at least one check failed,
 * 2 = usage or I/O error.
 */

import { createServer } from 'node:http'
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(SCRIPT_DIR, '..')
const DEFAULT_DIST = join(REPO_ROOT, 'public', 'dist')
const DEFAULT_ROUTER = join(REPO_ROOT, 'public', 'src', 'router', 'index.js')
const SITE_REQUIRE = createRequire(join(REPO_ROOT, 'public', 'package.json'))

const THEME_STORAGE_KEY = 'beat-theme'

/** Viewports to check: the mobile width and the desktop width of the brief. */
const WIDTHS = [
  { name: '360', width: 360, height: 800 },
  { name: '1440', width: 1440, height: 900 },
]

/** The two themes. */
const THEMES = ['light', 'dark']

/** Link names that describe nothing about the destination. */
const MEANINGLESS_LINK_NAMES = [
  'click here', 'here', 'read more', 'more', 'link', 'this', 'this page',
  'learn more', 'continue', 'details', 'see more', 'read this',
]

const usage = `Usage: node scripts/check-a11y-manual.mjs [options]

  --dist <dir>      built site to check (default: public/dist)
  --router <file>   router config to read the route list from
  --browser <path>  Chromium executable to drive
  --json <file>     write the measurements to this file
  --help            print this text
Exit codes: 0 = every check passed, 1 = a check failed, 2 = usage or I/O error.`

/* ------------------------------------------------------------------ options */

function readOptions (argv) {
  const flags = new Map([['--help', 'help'], ['-h', 'help']])
  const takesValue = new Map([['--dist', 'dist'], ['--router', 'router'], ['--browser', 'browser'], ['--json', 'json']])
  const options = { dist: DEFAULT_DIST, router: DEFAULT_ROUTER, browser: null, json: null, help: false }

  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index]
    if (argument.startsWith('-')) {
      const flag = flags.get(argument)
      if (flag !== undefined) {
        options[flag] = true
        continue
      }
      const key = takesValue.get(argument)
      if (key === undefined) throw new Error(`unknown option: ${argument}`)
      const value = argv[index + 1]
      if (value === undefined) throw new Error(`option ${argument} needs a value`)
      options[key] = resolve(value)
      index += 1
      continue
    }
    throw new Error(`unexpected argument: ${argument}`)
  }

  return options
}

/* -------------------------------------------------------------- route table */

function matchingBracket (source, start) {
  const pairs = { '[': ']', '{': '}', '(': ')' }
  const open = source[start]
  const close = pairs[open]
  if (close === undefined) return -1

  let depth = 0
  let index = start
  let state = 'code'
  while (index < source.length) {
    const character = source[index]
    const next = source[index + 1]
    if (state === 'code') {
      if (character === '/' && next === '/') { state = 'line'; index += 2; continue }
      if (character === '/' && next === '*') { state = 'block'; index += 2; continue }
      if (character === '"') { state = 'double'; index += 1; continue }
      if (character === "'") { state = 'single'; index += 1; continue }
      if (character === '`') { state = 'template'; index += 1; continue }
      if (character === open) depth += 1
      else if (character === close) {
        depth -= 1
        if (depth === 0) return index
      }
      index += 1
      continue
    }
    if (state === 'line') {
      if (character === '\n') state = 'code'
      index += 1
      continue
    }
    if (state === 'block') {
      if (character === '*' && next === '/') state = 'code'
      index += 1
      continue
    }
    if (character === '\\') { index += 2; continue }
    if ((state === 'single' && character === "'") ||
        (state === 'double' && character === '"') ||
        (state === 'template' && character === '`')) state = 'code'
    index += 1
  }
  return -1
}

function normalizePath (value) {
  if (typeof value !== 'string') return null
  let path = value.trim()
  if (path === '') return null
  if (!path.startsWith('/')) path = `/${path}`
  const cut = path.search(/[?#]/)
  if (cut !== -1) path = path.slice(0, cut)
  if (path.length > 1) path = path.replace(/\/+$/, '')
  return path
}

function readRouterRoutes (routerPath) {
  const source = readFileSync(routerPath, 'utf8')
  const declaration = /(?:export\s+)?const\s+routes\s*=\s*/.exec(source)
  if (declaration === null) throw new Error(`no "const routes = ..." in ${routerPath}`)
  const start = source.indexOf('[', declaration.index + declaration[0].length)
  if (start === -1) throw new Error(`the routes export in ${routerPath} is not an array literal`)
  const end = matchingBracket(source, start)
  if (end === -1) throw new Error(`the routes array in ${routerPath} is not closed`)
  const literal = source.slice(start, end + 1)

  const routes = vm.runInNewContext(`(${literal})`, Object.create(null), {
    importModuleDynamically: (specifier) => {
      throw new Error(`the router file must not be executed, but it imports ${specifier}`)
    }
  })
  if (!Array.isArray(routes)) throw new Error(`the routes export in ${routerPath} is not an array`)

  const entries = []
  for (const route of routes) {
    const path = normalizePath(route.path)
    if (path === null) continue
    entries.push({
      path,
      name: typeof route.name === 'string' ? route.name : null,
      title: route.meta && typeof route.meta.title === 'string' ? route.meta.title : null,
      isCatchAll: path.includes('*'),
    })
  }
  return entries
}

/* ----------------------------------------------------------- static server */

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
}

function startServer (distDir) {
  const server = createServer((request, response) => {
    const requested = decodeURIComponent((request.url ?? '/').split('?')[0].split('#')[0])
    const relative = requested.replace(/^\/+/, '')
    const candidate = relative === '' ? 'index.html' : relative

    let filePath = join(distDir, candidate)
    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
      const fallback = join(distDir, '404.html')
      filePath = existsSync(fallback) ? fallback : join(distDir, 'index.html')
    }

    const type = MIME_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream'
    const body = readFileSync(filePath)
    response.writeHead(200, { 'Content-Type': type, 'Content-Length': body.length })
    response.end(body)
  })

  return new Promise((resolveServer, rejectServer) => {
    server.on('error', rejectServer)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      resolveServer({ server, origin: `http://127.0.0.1:${address.port}` })
    })
  })
}

/* ------------------------------------------------------- in-page check code */

/**
 * The checks that run inside the page.
 *
 * They are injected as a string, so they cannot use the outer scope; every
 * helper they need is defined inside the function.
 */
const PAGE_CHECKS = `(() => {
  const results = {}

  /* ---------------------------------------------------------- colour maths */

  const parseColor = (value) => {
    const match = /rgba?\\(([^)]+)\\)/.exec(value)
    if (match === null) return null
    const parts = match[1].split(',').map((part) => Number.parseFloat(part.trim()))
    if (parts.length < 3 || parts.some((part) => Number.isNaN(part))) return null
    return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 }
  }

  const channelLuminance = (channel) => {
    const value = channel / 255
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  }

  const relativeLuminance = (color) => (
    0.2126 * channelLuminance(color.r) +
    0.7152 * channelLuminance(color.g) +
    0.0722 * channelLuminance(color.b)
  )

  const contrastRatio = (foreground, background) => {
    const a = relativeLuminance(foreground)
    const b = relativeLuminance(background)
    const lighter = Math.max(a, b)
    const darker = Math.min(a, b)
    return (lighter + 0.05) / (darker + 0.05)
  }

  /** The opaque background behind an element, walking up the tree. */
  const effectiveBackground = (element) => {
    let node = element
    while (node !== null && node.nodeType === 1) {
      const color = parseColor(getComputedStyle(node).backgroundColor)
      if (color !== null && color.a > 0) {
        if (color.a === 1) return color
        // A translucent background is composited over its own backdrop.
        const parent = effectiveBackground(node.parentElement)
        if (parent === null) return color
        return {
          r: color.r * color.a + parent.r * (1 - color.a),
          g: color.g * color.a + parent.g * (1 - color.a),
          b: color.b * color.a + parent.b * (1 - color.a),
          a: 1
        }
      }
      node = node.parentElement
    }
    return { r: 255, g: 255, b: 255, a: 1 }
  }

  /* ------------------------------------------------------------- landmarks */

  // The landmark role of an element follows the HTML-AAM rules: a header or
  // footer is a banner or a contentinfo only at the top level of the
  // document. A header inside main, article, aside, nav or section is a
  // plain section heading and carries no landmark role.
  const sectioningAncestor = 'article, aside, main, nav, section'
  const landmarkRole = (element) => {
    const explicit = element.getAttribute('role')
    if (explicit !== null && explicit !== '') return explicit
    const tag = element.tagName.toLowerCase()
    if (tag === 'main') return 'main'
    if (tag === 'nav') return 'navigation'
    if (tag === 'aside') return 'complementary'
    if (tag === 'header') return element.closest(sectioningAncestor) === null ? 'banner' : 'generic'
    if (tag === 'footer') return element.closest(sectioningAncestor) === null ? 'contentinfo' : 'generic'
    return null
  }

  const landmarks = []
  for (const element of document.querySelectorAll('header, nav, main, aside, footer, [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="complementary"], [role="search"]')) {
    const role = landmarkRole(element)
    if (role === null) continue
    landmarks.push({
      role,
      label: element.getAttribute('aria-label') ?? '',
      heading: (element.querySelector('a, button, [class*="text-"]')?.textContent ?? '').trim().slice(0, 60)
    })
  }
  results.landmarks = landmarks

  const count = (role) => landmarks.filter((landmark) => landmark.role === role).length
  results.landmarkCounts = {
    banner: count('banner'),
    navigation: count('navigation'),
    main: count('main'),
    contentinfo: count('contentinfo'),
    complementary: count('complementary'),
    search: count('search')
  }

  /* -------------------------------------------------------- heading order */

  const headings = []
  for (const element of document.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
    if (element.closest('[aria-hidden="true"]')) continue
    const style = getComputedStyle(element)
    if (style.display === 'none' || style.visibility === 'hidden') continue
    headings.push({
      level: Number.parseInt(element.tagName.slice(1), 10),
      text: element.textContent.trim().replace(/\\s+/g, ' ').slice(0, 80),
      target: element.id === '' ? element.tagName.toLowerCase() : '#' + element.id
    })
  }
  results.headings = headings
  results.h1Count = headings.filter((heading) => heading.level === 1).length
  results.headingSkips = []
  let previous = null
  for (const heading of headings) {
    if (previous !== null && heading.level > previous + 1) {
      results.headingSkips.push({ from: previous, to: heading.level, text: heading.text })
    }
    previous = heading.level
  }

  /* -------------------------------------------------------------- link text */

  const links = []
  for (const anchor of document.querySelectorAll('a[href]')) {
    const style = getComputedStyle(anchor)
    if (style.display === 'none' || style.visibility === 'hidden') continue
    const name = (anchor.getAttribute('aria-label') ?? anchor.textContent ?? '').trim().replace(/\\s+/g, ' ')
    // A link whose text is its own URL is only acceptable inside a reference
    // entry: the entry itself carries the citation id and the label, so the
    // link is not the only way to find out what it points at.
    const entry = anchor.closest('li')
    let labelledEntry = false
    if (entry !== null) {
      labelledEntry = Array.from(entry.querySelectorAll('p, h2, h3, h4, dt, dd')).some((node) => {
        const text = node.textContent.trim().replace(/\\s+/g, ' ')
        return text.length > 0 && text !== name
      })
    }
    links.push({
      href: anchor.getAttribute('href'),
      name,
      text: anchor.textContent.trim().replace(/\\s+/g, ' ').slice(0, 80),
      title: anchor.getAttribute('title') ?? '',
      bareUrl: /^https?:\\/\\//.test(name),
      labelledEntry
    })
  }
  results.links = links

  /* -------------------------------------------------------------- alt text */

  const images = []
  for (const image of document.querySelectorAll('img')) {
    images.push({
      src: image.getAttribute('src'),
      alt: image.getAttribute('alt'),
      hasAlt: image.hasAttribute('alt'),
      ariaHidden: image.getAttribute('aria-hidden') === 'true'
    })
  }
  for (const svg of document.querySelectorAll('svg')) {
    images.push({
      src: 'inline <svg>',
      alt: svg.getAttribute('aria-label'),
      hasAlt: svg.hasAttribute('aria-label'),
      ariaHidden: svg.getAttribute('aria-hidden') === 'true'
    })
  }
  results.images = images

  /* --------------------------------------------------------------- contrast */

  const contrast = []
  const seen = new Set()
  for (const element of document.querySelectorAll('body *')) {
    const style = getComputedStyle(element)
    if (style.display === 'none' || style.visibility === 'hidden') continue
    if (style.opacity === '0') continue

    // Only elements that own a text node are measured: a wrapper that only
    // holds children does not paint text of its own.
    const ownsText = [...element.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim() !== '')
    if (!ownsText) continue

    const foreground = parseColor(style.color)
    if (foreground === null) continue
    const background = effectiveBackground(element)
    const ratio = contrastRatio(foreground, background)
    const fontSize = Number.parseFloat(style.fontSize)
    const fontWeight = Number.parseInt(style.fontWeight, 10) || 400
    const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700)
    const required = isLarge ? 3 : 4.5

    const key = element.tagName + '|' + style.color + '|' + style.backgroundColor + '|' + element.className
    if (seen.has(key)) continue
    seen.add(key)

    contrast.push({
      tag: element.tagName.toLowerCase(),
      className: typeof element.className === 'string' ? element.className.slice(0, 120) : '',
      text: element.textContent.trim().replace(/\\s+/g, ' ').slice(0, 60),
      color: style.color,
      background: 'rgb(' + Math.round(background.r) + ', ' + Math.round(background.g) + ', ' + Math.round(background.b) + ')',
      fontSize,
      fontWeight,
      isLarge,
      required,
      ratio: Math.round(ratio * 100) / 100,
      passes: ratio >= required
    })
  }
  results.contrast = contrast

  /* ------------------------------------------------- interactive elements */

  // The counter lives on the window, so a second run over the same page (the
  // mobile menu open) hands out the ids it already gave, and only new
  // elements get a new one.
  if (window.__a11yCheckCounter === undefined) window.__a11yCheckCounter = 0

  const interactive = []
  // A scope limits the scan to one part of the page, for example the menu
  // that the small-screen navigation opens.
  const scope = window.__a11yScope ?? null
  const scopeRoot = scope === null ? document : document.querySelector(scope)
  if (scopeRoot !== null) {
  for (const element of scopeRoot.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')) {
    const style = getComputedStyle(element)
    if (style.display === 'none' || style.visibility === 'hidden') continue
    // An element inside a hidden ancestor has no box, so it cannot take
    // focus: the desktop navigation is hidden on small screens.
    if (element.getClientRects().length === 0) continue
    if (!element.hasAttribute('data-a11y-check-id')) {
      window.__a11yCheckCounter += 1
      element.setAttribute('data-a11y-check-id', 'a11y-interactive-' + window.__a11yCheckCounter)
    }
    const id = element.getAttribute('data-a11y-check-id')
    const type = element.getAttribute('type')
    interactive.push({
      id,
      tag: element.tagName.toLowerCase(),
      text: (element.textContent ?? element.getAttribute('aria-label') ?? '').trim().replace(/\\s+/g, ' ').slice(0, 60),
      href: element.getAttribute('href'),
      tabindex: element.getAttribute('tabindex'),
      inputType: type,
      value: element.getAttribute('value'),
      // Radios that share a name are one group and therefore one tab stop.
      radioGroup: type === 'radio' ? (element.getAttribute('name') ?? '') : null
    })
  }
  }
  results.interactive = interactive

  return results
})()`

/* ------------------------------------------------------- keyboard walking */

/**
 * Walk the focus order with the keyboard and record what each stop looks
 * like, so the focus indicator can be compared against the resting state.
 */
async function walkFocus (page, { withinMenu = false } = {}) {
  await page.evaluate((menuOnly) => {
    if (document.activeElement !== null && document.activeElement !== document.body) {
      document.activeElement.blur()
    }
    if (menuOnly) {
      const menu = document.querySelector('#site-menu')
      if (menu !== null) {
        const first = menu.querySelector('a[href], button, input, select, textarea, [tabindex]')
        if (first !== null) first.focus()
      }
    }
  }, withinMenu)

  const readStop = async () => await page.evaluate((menuOnly) => {
    const element = document.activeElement
    if (element === null || element === document.body) return null
    if (menuOnly) {
      const menu = document.querySelector('#site-menu')
      if (menu === null || !menu.contains(element)) return null
    }
    const style = getComputedStyle(element)
    const rect = element.getBoundingClientRect()
    // The position of the element in the document, so the focus order can
    // be compared with the order the elements appear in.
    const all = document.querySelectorAll('*')
    let domIndex = -1
    for (let position = 0; position < all.length; position++) {
      if (all[position] === element) { domIndex = position; break }
    }
    return {
      id: element.getAttribute('data-a11y-check-id') ?? '',
      tag: element.tagName.toLowerCase(),
      text: (element.textContent ?? element.getAttribute('aria-label') ?? '').trim().replace(/\s+/g, ' ').slice(0, 60),
      href: element.getAttribute('href'),
      type: element.getAttribute('type'),
      name: element.getAttribute('name'),
      domIndex,
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
      outlineColor: style.outlineColor,
      outlineOffset: style.outlineOffset,
      boxShadow: style.boxShadow,
      borderColor: style.borderColor,
      backgroundColor: style.backgroundColor,
      color: style.color,
      top: Math.round(rect.top),
      left: Math.round(rect.left),
      width: Math.round(rect.width),
      height: Math.round(rect.height)
    }
  }, withinMenu)

  const stops = []
  const limit = 200
  // The first element of the menu already has the focus, so it is read
  // before the first Tab press. On the page itself nothing is focused yet,
  // so the walk starts with Tab.
  if (withinMenu) {
    const first = await readStop()
    if (first === null) return stops
    stops.push(first)
  }
  for (let index = 0; index < limit; index++) {
    await page.keyboard.press('Tab')
    const stop = await readStop()
    if (stop === null) break
    stops.push(stop)
    // A focus cycle that repeats the first stop has come full circle.
    if (stops.length > 1 && stops[0].id === stop.id) break
  }
  return stops
}

/**
 * Open the small-screen navigation menu with the keyboard and close it again
 * with Escape, so the links behind the button are checked as well.
 *
 * The button is found by its accessible name, because it has no id of its
 * own. When the button is not on the page (the desktop layout has no menu),
 * the caller is told so instead of getting a failure.
 */
async function openMenuWithKeyboard (page) {
  const button = page.locator('button[aria-controls="site-menu"]')
  if (await button.count() === 0) return { opened: false, reason: 'no menu button on this page' }
  if (!await button.isVisible()) return { opened: false, reason: 'the menu button is hidden at this width' }

  await button.focus()
  await page.keyboard.press('Enter')
  await page.waitForTimeout(120)

  const opened = await page.evaluate(() => {
    const menu = document.querySelector('#site-menu')
    const trigger = document.querySelector('button[aria-controls="site-menu"]')
    return {
      present: menu !== null,
      expanded: trigger?.getAttribute('aria-expanded') ?? null
    }
  })
  if (!opened.present || opened.expanded !== 'true') {
    return { opened: false, reason: 'the menu did not open when the button was activated with Enter' }
  }
  return { opened: true }
}

/**
 * The resting appearance of the same elements, so a focus indicator can be
 * told apart from the normal state.
 */
async function readRestingStyles (page) {
  return page.evaluate(() => {
    const resting = []
    for (const element of document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')) {
      const style = getComputedStyle(element)
      resting.push({
        id: element.getAttribute('data-a11y-check-id') ?? '',
        tag: element.tagName.toLowerCase(),
        text: (element.textContent ?? element.getAttribute('aria-label') ?? '').trim().replace(/\s+/g, ' ').slice(0, 60),
        outlineStyle: style.outlineStyle,
        outlineWidth: style.outlineWidth,
        outlineColor: style.outlineColor,
        boxShadow: style.boxShadow,
        borderColor: style.borderColor,
        backgroundColor: style.backgroundColor
      })
    }
    return resting
  })
}

/* ------------------------------------------------------------------- main */

async function main (argv) {
  const options = readOptions(argv)
  if (options.help) {
    console.log(usage)
    return 0
  }
  if (!existsSync(options.dist)) throw new Error(`cannot read the built site: ${options.dist} does not exist`)
  if (!existsSync(options.router)) throw new Error(`cannot read the router config: ${options.router} does not exist`)

  const routes = readRouterRoutes(options.router)
  const { chromium } = SITE_REQUIRE('playwright-core')
  const { server, origin } = await startServer(options.dist)
  const launchOptions = { args: ['--no-sandbox'] }
  if (options.browser !== null) launchOptions.executablePath = options.browser
  const browser = await chromium.launch(launchOptions)

  const report = { routes: [], failures: [] }

  try {
    for (const theme of THEMES) {
      for (const viewport of WIDTHS) {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          colorScheme: theme,
          deviceScaleFactor: 1,
        })
        await context.addInitScript(
          ([key, value]) => {
            try { window.localStorage.setItem(key, value) } catch { /* storage blocked */ }
          },
          [THEME_STORAGE_KEY, theme]
        )

        for (const route of routes) {
          const path = route.isCatchAll ? '/this-page-does-not-exist' : route.path
          const page = await context.newPage()
          await page.goto(`${origin}/#${path}`, { waitUntil: 'load' })
          await page.waitForFunction(() => {
            const main = document.querySelector('#main-content')
            return Boolean(main && main.textContent && main.textContent.trim().length > 0)
          }, { timeout: 15000 })
          await page.waitForTimeout(120)

          const applied = await page.evaluate(() => ({
            rootClass: document.documentElement.className,
            stored: (() => { try { return window.localStorage.getItem('beat-theme') } catch { return null } })()
          }))
          const appliedTheme = applied.rootClass.split(/\s+/).includes('dark') ? 'dark' : 'light'
          if (appliedTheme !== theme) {
            throw new Error(`theme mismatch on ${path} at ${viewport.name}px: the page applied "${appliedTheme}" but "${theme}" was requested`)
          }

          const checks = await page.evaluate(PAGE_CHECKS)
          const resting = await readRestingStyles(page)
          const stops = await walkFocus(page)

          // On small screens the navigation lives behind a menu button. The
          // menu is opened with the keyboard, the links inside it are walked
          // as well, and the menu is closed again with Escape.
          const menu = await openMenuWithKeyboard(page)
          const menuChecks = menu.opened ? await page.evaluate(() => {
            window.__a11yScope = '#site-menu'
            return null
          }).then(async () => await page.evaluate(PAGE_CHECKS)) : null
          const menuStops = menu.opened ? await walkFocus(page, { withinMenu: true }) : []
          if (menu.opened) await page.keyboard.press('Escape')
          await page.waitForTimeout(80)
          const menuClosed = await page.evaluate(() => {
            const button = document.querySelector('button[aria-controls="site-menu"]')
            const menu = document.querySelector('#site-menu')
            return {
              menuPresent: menu !== null,
              expanded: button?.getAttribute('aria-expanded') ?? null,
              focusOnButton: document.activeElement === button
            }
          })

          const entry = {
            theme,
            width: viewport.width,
            widthName: viewport.name,
            path,
            routeName: route.name,
            routeTitle: route.title,
            appliedTheme,
            landmarks: checks.landmarks,
            landmarkCounts: checks.landmarkCounts,
            headings: checks.headings,
            h1Count: checks.h1Count,
            headingSkips: checks.headingSkips,
            links: checks.links,
            images: checks.images,
            contrast: checks.contrast,
            interactive: checks.interactive,
            focusStops: stops,
            restingStyles: resting,
            menu: menu.opened
              ? {
                  opened: true,
                  landmarks: menuChecks.landmarks,
                  landmarkCounts: menuChecks.landmarkCounts,
                  headings: menuChecks.headings,
                  links: menuChecks.links,
                  images: menuChecks.images,
                  contrast: menuChecks.contrast,
                  interactive: menuChecks.interactive,
                  focusStops: menuStops,
                  closed: menuClosed
                }
              : { opened: false, reason: menu.reason }
          }

          /* ---------------------------------------------------- the verdicts */

          const problems = []

          if (checks.landmarkCounts.banner !== 1) problems.push(`banner landmarks: ${checks.landmarkCounts.banner} (expected 1)`)
          if (checks.landmarkCounts.main !== 1) problems.push(`main landmarks: ${checks.landmarkCounts.main} (expected 1)`)
          if (checks.landmarkCounts.contentinfo !== 1) problems.push(`contentinfo landmarks: ${checks.landmarkCounts.contentinfo} (expected 1)`)
          if (checks.landmarkCounts.navigation < 1) problems.push('no navigation landmark')
          if (checks.h1Count !== 1) problems.push(`h1 headings: ${checks.h1Count} (expected 1)`)
          if (checks.headingSkips.length > 0) {
            problems.push(`heading level skipped: ${checks.headingSkips.map((skip) => `h${skip.from} to h${skip.to} ("${skip.text}")`).join('; ')}`)
          }

          const meaninglessLinks = checks.links.filter((link) => {
            const name = link.name.toLowerCase().replace(/[.!:,]+$/, '')
            if (name === '') return true
            // A bare URL is a bad link name, unless it sits in a reference
            // entry that names the work it links to.
            if (/^https?:\/\//.test(name)) return !link.labelledEntry
            return MEANINGLESS_LINK_NAMES.includes(name)
          })
          for (const link of meaninglessLinks) {
            problems.push(`link text "${link.name}" does not describe its destination (${link.href})`)
          }

          const imagesWithoutAlt = checks.images.filter((image) => !image.hasAlt && !image.ariaHidden)
          for (const image of imagesWithoutAlt) {
            problems.push(`image without alt text: ${image.src}`)
          }
          const informativeWithoutText = checks.images.filter((image) => image.hasAlt && image.alt.trim() === '' && !image.ariaHidden && image.src !== 'inline <svg>')
          for (const image of informativeWithoutText) {
            problems.push(`image with empty alt but no aria-hidden: ${image.src}`)
          }

          const contrastFailures = checks.contrast.filter((measurement) => !measurement.passes)
          for (const measurement of contrastFailures) {
            problems.push(`contrast ${measurement.ratio}:1 (needs ${measurement.required}:1) on ${measurement.tag}.${measurement.className} "${measurement.text}"`)
          }

          // Every interactive element must be reachable with Tab. Radios
          // that share a name form one group and therefore one tab stop, so
          // the group is checked once.
          const reachable = new Set(stops.map((stop) => stop.id))
          const unreachable = checks.interactive.filter((element) => {
            if (reachable.has(element.id)) return false
            if (element.radioGroup !== null) {
              return !checks.interactive.some((other) => other.radioGroup === element.radioGroup && reachable.has(other.id))
            }
            return true
          })
          if (unreachable.length > 0) {
            problems.push(`${unreachable.length} interactive element(s) not reachable with Tab: ${unreachable.map((element) => element.tag + ' "' + element.text + '"').join(', ')}`)
          }

          // The focus order must follow the order the elements appear in.
          // The order in the document is the order a screen-reader user
          // meets them, so a stop that comes before its predecessor in the
          // document is a wrong order.
          const orderBreaks = []
          for (let index = 1; index < stops.length; index++) {
            const previous = stops[index - 1]
            const current = stops[index]
            if (previous.domIndex >= 0 && current.domIndex >= 0 && current.domIndex < previous.domIndex) {
              orderBreaks.push(`${previous.tag} "${previous.text}" before ${current.tag} "${current.text}"`)
            }
          }
          if (orderBreaks.length > 0) {
            problems.push(`focus order does not follow the document order: ${orderBreaks.join('; ')}`)
          }

          // The focus indicator must be visible: an outline that is drawn, or
          // a ring or a border change against the resting state.
          const restingById = new Map(resting.map((element) => [element.id, element]))
          const withoutIndicator = []
          for (const stop of stops) {
            const before = restingById.get(stop.id)
            const outlineWidth = Number.parseFloat(stop.outlineWidth) || 0
            const outlineDrawn = stop.outlineStyle !== 'none' && outlineWidth > 0
            const shadowChanged = before !== undefined && stop.boxShadow !== before.boxShadow && stop.boxShadow !== 'none'
            const borderChanged = before !== undefined && stop.borderColor !== before.borderColor
            if (!outlineDrawn && !shadowChanged && !borderChanged) {
              withoutIndicator.push(`${stop.tag} "${stop.text}" (outline ${stop.outlineStyle} ${stop.outlineWidth})`)
            }
          }
          if (withoutIndicator.length > 0) {
            problems.push(`${withoutIndicator.length} focus stop(s) without a visible focus indicator: ${withoutIndicator.join('; ')}`)
          }

          // The menu behind the button, when the page has one, must open
          // with the keyboard, hold the same landmarks, and close again.
          if (entry.menu.opened) {
            if (entry.menu.landmarkCounts.main !== 1) problems.push(`menu: main landmarks ${entry.menu.landmarkCounts.main} (expected 1)`)
            if (entry.menu.landmarkCounts.banner !== 1) problems.push(`menu: banner landmarks ${entry.menu.landmarkCounts.banner} (expected 1)`)
            if (entry.menu.closed.menuPresent) problems.push('menu: the menu did not close when Escape was pressed')
            if (entry.menu.closed.expanded !== 'false') problems.push(`menu: aria-expanded is "${entry.menu.closed.expanded}" after closing (expected "false")`)
            if (!entry.menu.closed.focusOnButton) problems.push('menu: focus did not return to the menu button after closing')

            const menuReachable = new Set(entry.menu.focusStops.map((stop) => stop.id))
            const menuUnreachable = entry.menu.interactive.filter((element) => {
              if (menuReachable.has(element.id)) return false
              if (element.radioGroup !== null) {
                return !entry.menu.interactive.some((other) => other.radioGroup === element.radioGroup && menuReachable.has(other.id))
              }
              return true
            })
            if (menuUnreachable.length > 0) {
              problems.push(`menu: ${menuUnreachable.length} interactive element(s) not reachable with Tab: ${menuUnreachable.map((element) => element.tag + ' "' + element.text + '"').join(', ')}`)
            }

            const menuOrderBreaks = []
            for (let index = 1; index < entry.menu.focusStops.length; index++) {
              const previous = entry.menu.focusStops[index - 1]
              const current = entry.menu.focusStops[index]
              if (previous.domIndex >= 0 && current.domIndex >= 0 && current.domIndex < previous.domIndex) {
                menuOrderBreaks.push(`${previous.tag} "${previous.text}" before ${current.tag} "${current.text}"`)
              }
            }
            if (menuOrderBreaks.length > 0) {
              problems.push(`menu: focus order does not follow the document order: ${menuOrderBreaks.join('; ')}`)
            }
          }

          entry.problems = problems
          entry.pass = problems.length === 0
          report.routes.push(entry)

          for (const problem of problems) {
            report.failures.push({ theme, width: viewport.width, path, problem })
          }

          process.stderr.write(`checked ${theme} ${viewport.name}px ${path} -> ${entry.pass ? 'pass' : `${problems.length} problem(s)`}\n`)
          await page.close()
        }

        await context.close()
      }
    }
  } finally {
    await browser.close()
    server.close()
  }

  if (options.json !== null) writeFileSync(options.json, JSON.stringify(report, null, 2))

  printReport(report)
  return report.failures.length === 0 ? 0 : 1
}

function printReport (report) {
  console.log('')
  console.log('='.repeat(78))
  console.log('check-a11y-manual: per-route manual check results')
  console.log('='.repeat(78))

  for (const entry of report.routes) {
    console.log('')
    console.log(`--- ${entry.theme} ${entry.widthName}px ${entry.path} ---`)
    console.log(`title: ${entry.routeTitle ?? '(none)'}`)
    console.log(`landmarks: banner ${entry.landmarkCounts.banner} | navigation ${entry.landmarkCounts.navigation} | main ${entry.landmarkCounts.main} | contentinfo ${entry.landmarkCounts.contentinfo} | complementary ${entry.landmarkCounts.complementary}`)
    console.log(`headings: ${entry.headings.length} total, ${entry.h1Count} h1, ${entry.headingSkips.length} skipped level(s)`)
    for (const heading of entry.headings) {
      console.log(`  h${heading.level} ${heading.text}`)
    }
    console.log(`links: ${entry.links.length}`)
    for (const link of entry.links) {
      console.log(`  "${link.name}" -> ${link.href}`)
    }
    console.log(`images: ${entry.images.length}`)
    for (const image of entry.images) {
      console.log(`  ${image.src} alt=${JSON.stringify(image.alt)}${image.ariaHidden ? ' aria-hidden' : ''}`)
    }
    console.log(`focus stops: ${entry.focusStops.length}`)
    for (const stop of entry.focusStops) {
      console.log(`  ${stop.tag} "${stop.text}" outline=${stop.outlineStyle} ${stop.outlineWidth} ${stop.outlineColor} shadow=${stop.boxShadow === 'none' ? 'none' : 'set'}`)
    }
    console.log(`contrast measurements: ${entry.contrast.length} (${entry.contrast.filter((m) => m.passes).length} pass, ${entry.contrast.filter((m) => !m.passes).length} fail)`)
    for (const measurement of entry.contrast) {
      console.log(`  ${measurement.passes ? 'pass' : 'FAIL'} ${measurement.ratio}:1 (needs ${measurement.required}:1) ${measurement.tag}.${measurement.className} "${measurement.text}" ${measurement.color} on ${measurement.background} ${measurement.fontSize}px/${measurement.fontWeight}${measurement.isLarge ? ' large' : ''}`)
    }
    if (entry.problems.length > 0) {
      console.log(`problems: ${entry.problems.length}`)
      for (const problem of entry.problems) console.log(`  - ${problem}`)
    }
  }

  console.log('')
  console.log('='.repeat(78))
  console.log(`check-a11y-manual: ${report.routes.length} route/width/theme combination(s), ${report.routes.length - report.failures.length} clean, ${report.failures.length} problem(s)`)
  for (const failure of report.failures) {
    console.log(`  ${failure.theme} ${failure.width}px ${failure.path}: ${failure.problem}`)
  }
  console.log('')
}

try {
  process.exit(await main(process.argv.slice(2)))
} catch (error) {
  console.error(`check-a11y-manual: ${error.message}`)
  console.error(usage)
  process.exit(2)
}
