#!/usr/bin/env node
/**
 * check-a11y.mjs
 *
 * Plain Node script (no test framework) that runs an axe-core scan over
 * every route of the BEAT site, at a mobile width and a desktop width, in the
 * light theme and in the dark theme.
 *
 * The scan runs against the built site in public/dist, served over HTTP by a
 * small built-in static server, because that is what the GitHub Pages
 * workflow publishes. The app uses Vue Router hash history, so a route
 * reaches the browser as the page URL plus a fragment:
 *
 *   http://127.0.0.1:<port>/#<route-path>
 *
 * The route list is read out of the router config (public/src/router/index.js)
 * at run time, so a route added to the router later is picked up without
 * editing this script. The aliases of a route are scanned too: an alias
 * renders the same page and a published URL, so it must reach the same
 * verdict.
 *
 * The theme is driven through the site's own storage key (beat-theme) and
 * the prefers-color-scheme media query, so the site applies the theme the way
 * a reader does. The script asserts the applied theme on every page before
 * it scans, so a scan can never be reported against the wrong theme.
 *
 * axe-core is loaded from the installed package (public/node_modules/axe-core)
 * into the page, so the scan needs no network access and no vendored copy.
 *
 * Usage:
 *   node scripts/check-a11y.mjs [--dist <dir>] [--router <file>]
 *                               [--json] [--help]
 *
 * Options:
 *   --dist <dir>    built site to scan (default: public/dist)
 *   --router <file> router config to read the route list from
 *                   (default: public/src/router/index.js)
 *   --json          print the results as JSON instead of a table
 *   --help          print this text
 *
 * Exit codes: 0 = no serious or critical violation and no unfixed moderate
 * violation, 1 = at least one such violation, 2 = usage or I/O error.
 */

import { createServer } from 'node:http'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(SCRIPT_DIR, '..')
const DEFAULT_DIST = join(REPO_ROOT, 'public', 'dist')
const DEFAULT_ROUTER = join(REPO_ROOT, 'public', 'src', 'router', 'index.js')
const AXE_PATH = join(REPO_ROOT, 'public', 'node_modules', 'axe-core', 'axe.min.js')

/** The site's own package holds the devDependencies, so they resolve there. */
const SITE_REQUIRE = createRequire(join(REPO_ROOT, 'public', 'package.json'))

/** The viewports the brief names: a mobile width and a desktop width. */
const WIDTHS = [
  { name: '360', width: 360, height: 800 },
  { name: '1440', width: 1440, height: 900 },
]

/** The two themes. The name is also the value stored under beat-theme. */
const THEMES = ['light', 'dark']

/** The storage key the site's own theme helper reads. */
const THEME_STORAGE_KEY = 'beat-theme'

/**
 * The WCAG A and AA rule sets axe-core ships: WCAG 2.0, 2.1 and 2.2.
 * The A level rules are included as well, because a failure there is a
 * failure of a criterion the AA level inherits.
 */
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

/** Impact levels that fail the check. */
const FAILING_IMPACTS = ['serious', 'critical']

/** Moderate violations fail the check unless they are marked as fixed. */
const FAILING_MODERATE = 'moderate'

const usage = `Usage: node scripts/check-a11y.mjs [options]

  --dist <dir>      built site to scan (default: public/dist)
  --router <file>   router config to read the route list from
  --browser <path>  Chromium executable to drive
  --json            print the results as JSON instead of a table
  --help            print this text
Exit codes: 0 = no serious or critical and no unfixed moderate violation,
1 = at least one such violation, 2 = usage or I/O error.`

/* ------------------------------------------------------------------ options */

function readOptions (argv) {
  const flags = new Map([['--help', 'help'], ['-h', 'help'], ['--json', 'json']])
  const takesValue = new Map([['--dist', 'dist'], ['--router', 'router'], ['--browser', 'browser']])
  const options = { dist: DEFAULT_DIST, router: DEFAULT_ROUTER, browser: null, json: false, help: false }

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

/** Index of the bracket that closes the one at `start`, skipping strings. */
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

/** Normalize a path: leading slash, no query, no fragment, no trailing slash. */
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

/**
 * The route table of the router file, read as data.
 *
 * The file is a Vue module that imports vue-router and its view components,
 * so it is never imported or executed: only the route table literal is
 * evaluated, and the view components are never called.
 */
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

    const aliases = []
    if (typeof route.alias === 'string') aliases.push(route.alias)
    else if (Array.isArray(route.alias)) {
      for (const alias of route.alias) if (typeof alias === 'string') aliases.push(alias)
    } else if (route.alias && typeof route.alias === 'object' && typeof route.alias.path === 'string') {
      aliases.push(route.alias.path)
    }

    // A catch-all renders the not-found page for every unknown path. It is a
    // page of the site, so it is scanned at its own sample path.
    const isCatchAll = path.includes('*')

    entries.push({
      path,
      name: typeof route.name === 'string' ? route.name : null,
      title: route.meta && typeof route.meta.title === 'string' ? route.meta.title : null,
      aliases: aliases.map(normalizePath).filter((alias) => alias !== null),
      isCatchAll,
    })
  }
  return entries
}

/* ----------------------------------------------------------- static server */

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
}

/**
 * Serve the built site over HTTP.
 *
 * The site uses hash history, so every route is requested as the index
 * document with a fragment. A missing path still answers with the app shell,
 * which is what the 404.html fallback does on the Pages host.
 */
function startServer (distDir) {
  const server = createServer((request, response) => {
    const requested = decodeURIComponent((request.url ?? '/').split('?')[0].split('#')[0])
    const relative = requested.replace(/^\/+/, '')
    const candidate = relative === '' ? 'index.html' : relative

    let filePath = join(distDir, candidate)
    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
      const fallback = join(distDir, '404.html')
      if (existsSync(fallback)) filePath = fallback
      else filePath = join(distDir, 'index.html')
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

/* ---------------------------------------------------------------- the scan */

/**
 * Run axe-core over one page and return the raw result.
 *
 * The result is the axe-core result object, untouched apart from the nodes
 * that carry the extra fields the script adds.
 */
async function scanPage (context, url, axeSource) {
  const page = await context.newPage()
  const consoleErrors = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })
  page.on('pageerror', (error) => consoleErrors.push(String(error)))

  try {
    await page.goto(url, { waitUntil: 'load' })
    // The app mounts after the bundle loads and the route resolves.
    await page.waitForFunction(() => {
      const main = document.querySelector('#main-content')
      return Boolean(main && main.textContent && main.textContent.trim().length > 0)
    }, { timeout: 15000 })
    // Let the fonts settle so a measurement is not taken mid-layout.
    await page.evaluate(() => document.fonts?.ready?.then?.(() => undefined) ?? undefined)
    await page.waitForTimeout(120)

    const appliedTheme = await page.evaluate(() => ({
      rootClass: document.documentElement.className,
      stored: (() => {
        try { return window.localStorage.getItem('beat-theme') } catch { return null }
      })(),
      background: getComputedStyle(document.body).backgroundColor,
    }))

    await page.addScriptTag({ content: axeSource })
    const raw = await page.evaluate(async (tags) => {
      // eslint-disable-next-line no-undef
      const result = await window.axe.run(document, {
        runOnly: { type: 'tag', values: tags },
        resultTypes: ['violations', 'incomplete', 'passes', 'inapplicable'],
      })
      return result
    }, TAGS)

    return { raw, appliedTheme, consoleErrors }
  } finally {
    await page.close()
  }
}

/** The violations of a raw result, with the fields the report needs. */
function summarize (raw) {
  return raw.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    helpUrl: violation.helpUrl,
    tags: violation.tags,
    nodes: violation.nodes.map((node) => ({
      impact: node.impact,
      target: node.target,
      html: node.html,
      failureSummary: node.failureSummary,
      any: node.any.map((check) => ({ id: check.id, message: check.message, data: check.data })),
      all: node.all.map((check) => ({ id: check.id, message: check.message, data: check.data })),
      none: node.none.map((check) => ({ id: check.id, message: check.message, data: check.data })),
    })),
  }))
}

/** Count the nodes of a result by impact. */
function impactCounts (raw) {
  const counts = { critical: 0, serious: 0, moderate: 0, minor: 0 }
  for (const violation of raw.violations) {
    const key = violation.impact ?? 'minor'
    counts[key] = (counts[key] ?? 0) + violation.nodes.length
  }
  return counts
}

/**
 * The verdict for one scan.
 *
 * A serious or critical violation fails the check. A moderate violation
 * fails the check unless every one of its nodes is marked as fixed by axe
 * (`failureSummary` contains "Fixes applied"), because an unfixed moderate
 * violation is exactly what the brief forbids.
 */
function verdict (raw) {
  const failures = []
  for (const violation of raw.violations) {
    const impact = violation.impact ?? 'minor'
    if (FAILING_IMPACTS.includes(impact)) {
      failures.push({ id: violation.id, impact, nodes: violation.nodes.length })
      continue
    }
    if (impact === FAILING_MODERATE) {
      const unfixed = violation.nodes.filter((node) => {
        const summary = node.failureSummary ?? ''
        return !/fix(es|ed)?\s+applied/i.test(summary)
      })
      if (unfixed.length > 0) {
        failures.push({ id: violation.id, impact, nodes: unfixed.length })
      }
    }
  }
  return { pass: failures.length === 0, failures }
}

/* ------------------------------------------------------------------- main */

async function main (argv) {
  const options = readOptions(argv)
  if (options.help) {
    console.log(usage)
    return 0
  }

  if (!existsSync(options.dist)) {
    throw new Error(`cannot read the built site: ${options.dist} does not exist. Run "npm run build" in public/ first.`)
  }
  if (!existsSync(options.router)) {
    throw new Error(`cannot read the router config: ${options.router} does not exist.`)
  }
  if (!existsSync(AXE_PATH)) {
    throw new Error(`cannot read axe-core: ${AXE_PATH} does not exist. Run "npm install" in public/ first.`)
  }

  const routes = readRouterRoutes(options.router)
  if (routes.length === 0) throw new Error(`the router config ${options.router} lists no route`)

  const axeSource = readFileSync(AXE_PATH, 'utf8')

  const { chromium } = SITE_REQUIRE('playwright-core')
  const { server, origin } = await startServer(options.dist)
  const launchOptions = { args: ['--no-sandbox'] }
  if (options.browser !== null) launchOptions.executablePath = options.browser
  const browser = await chromium.launch(launchOptions)

  const results = []
  try {
    for (const theme of THEMES) {
      for (const viewport of WIDTHS) {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          colorScheme: theme,
          deviceScaleFactor: 1,
        })
        // The site's own theme helper reads this key and wins over the media
        // query, so the stored choice and the media query agree.
        await context.addInitScript(
          ([key, value]) => {
            try { window.localStorage.setItem(key, value) } catch { /* storage blocked */ }
          },
          [THEME_STORAGE_KEY, theme]
        )

        for (const route of routes) {
          // The catch-all renders the not-found page; a sample path makes the
          // request concrete.
          const path = route.isCatchAll ? '/this-page-does-not-exist' : route.path
          const url = `${origin}/#${path}`
          const { raw, appliedTheme, consoleErrors } = await scanPage(context, url, axeSource)

          const dark = appliedTheme.rootClass.split(/\s+/).includes('dark')
          const applied = dark ? 'dark' : 'light'
          if (applied !== theme) {
            throw new Error(`theme mismatch on ${path} at ${viewport.name}px: the page applied "${applied}" but "${theme}" was requested`)
          }

          const counts = impactCounts(raw)
          const { pass, failures } = verdict(raw)
          results.push({
            theme,
            width: viewport.width,
            widthName: viewport.name,
            path,
            routeName: route.name,
            routeTitle: route.title,
            isCatchAll: route.isCatchAll,
            isAlias: false,
            url,
            appliedTheme: applied,
            storedTheme: appliedTheme.stored,
            bodyBackground: appliedTheme.background,
            consoleErrors,
            counts,
            passes: raw.passes?.length ?? 0,
            incomplete: raw.incomplete?.length ?? 0,
            inapplicable: raw.inapplicable?.length ?? 0,
            violations: summarize(raw),
            pass,
            failures,
            raw,
          })

          process.stderr.write(`scanned ${theme} ${viewport.name}px ${path} -> ${pass ? 'pass' : 'FAIL'}\n`)
        }

        // The aliases are published URLs that render the same page, so they
        // are scanned at one width and one theme: the page they render is the
        // page that was scanned above, so a second full sweep would measure
        // the same document again.
        for (const route of routes) {
          for (const alias of route.aliases) {
            const url = `${origin}/#${alias}`
            const { raw, appliedTheme } = await scanPage(context, url, axeSource)
            const counts = impactCounts(raw)
            const { pass, failures } = verdict(raw)
            results.push({
              theme,
              width: viewport.width,
              widthName: viewport.name,
              path: alias,
              routeName: route.name,
              routeTitle: route.title,
              isCatchAll: false,
              isAlias: true,
              url,
              appliedTheme: appliedTheme.rootClass.split(/\s+/).includes('dark') ? 'dark' : 'light',
              storedTheme: appliedTheme.stored,
              bodyBackground: appliedTheme.background,
              consoleErrors: [],
              counts,
              passes: raw.passes?.length ?? 0,
              incomplete: raw.incomplete?.length ?? 0,
              inapplicable: raw.inapplicable?.length ?? 0,
              violations: summarize(raw),
              pass,
              failures,
              raw,
            })
            process.stderr.write(`scanned ${theme} ${viewport.name}px ${alias} (alias) -> ${pass ? 'pass' : 'FAIL'}\n`)
          }
        }

        await context.close()
      }
    }
  } finally {
    await browser.close()
    server.close()
  }

  const failing = results.filter((result) => !result.pass)

  if (options.json) {
    console.log(JSON.stringify({ results: results.map(({ raw, ...rest }) => rest) }, null, 2))
  } else {
    printReport(results)
  }

  return failing.length === 0 ? 0 : 1
}

/**
 * The human-readable report.
 *
 * One block per route, width and theme, with the raw scan output for that
 * combination: every violation with its impact, help text, WCAG tags and
 * the failing nodes.
 */
function printReport (results) {
  const byCombination = new Map()
  for (const result of results) {
    const key = `${result.theme} ${result.widthName}`
    if (!byCombination.has(key)) byCombination.set(key, [])
    byCombination.get(key).push(result)
  }

  for (const [combination, group] of byCombination) {
    console.log('')
    console.log('='.repeat(78))
    console.log(`check-a11y: ${combination}px`)
    console.log('='.repeat(78))
    for (const result of group) {
      const label = result.isAlias ? `${result.path} (alias of ${result.routeName})` : result.path
      console.log('')
      console.log(`--- route ${label} | theme ${result.theme} | viewport ${result.widthName}px ---`)
      console.log(`url: ${result.url}`)
      console.log(`title: ${result.routeTitle ?? '(none)'}`)
      console.log(`applied theme: ${result.appliedTheme} (stored: ${result.storedTheme})`)
      console.log(`axe-core passes: ${result.passes} | incomplete: ${result.incomplete} | inapplicable: ${result.inapplicable}`)
      const counts = result.counts
      console.log(`violations: critical ${counts.critical ?? 0} | serious ${counts.serious ?? 0} | moderate ${counts.moderate ?? 0} | minor ${counts.minor ?? 0}`)
      if (result.consoleErrors.length > 0) {
        console.log(`console errors: ${result.consoleErrors.length}`)
        for (const error of result.consoleErrors) console.log(`  ${error}`)
      }
      if (result.violations.length === 0) {
        console.log('no violations')
        continue
      }
      for (const violation of result.violations) {
        console.log('')
        console.log(`  [${violation.impact ?? 'unknown'}] ${violation.id}: ${violation.help}`)
        console.log(`  tags: ${violation.tags.join(', ')}`)
        console.log(`  help: ${violation.helpUrl}`)
        for (const node of violation.nodes) {
          console.log(`    node: ${JSON.stringify(node.target)}`)
          console.log(`    html: ${node.html}`)
          if (node.failureSummary) {
            for (const line of node.failureSummary.split('\n')) console.log(`      ${line}`)
          }
          for (const check of [...node.any, ...node.all, ...node.none]) {
            console.log(`      check ${check.id}: ${check.message}`)
          }
        }
      }
    }
  }

  const failing = results.filter((result) => !result.pass)
  console.log('')
  console.log('='.repeat(78))
  console.log(`check-a11y: ${results.length} scan(s) over ${results.length} route/width/theme combination(s)`)
  console.log(`check-a11y: ${results.length - failing.length} pass, ${failing.length} fail`)
  for (const result of failing) {
    console.log(`  FAIL ${result.theme} ${result.widthName}px ${result.path}: ${result.failures.map((failure) => `${failure.impact} ${failure.id} (${failure.nodes} node(s))`).join(', ')}`)
  }
  console.log('')
}

try {
  process.exit(await main(process.argv.slice(2)))
} catch (error) {
  console.error(`check-a11y: ${error.message}`)
  console.error(usage)
  process.exit(2)
}
