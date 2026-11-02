#!/usr/bin/env node
/**
 * check-routes.mjs
 *
 * Plain Node script (no runtime dependency, no test framework) that proves
 * every URL published before the redesign still resolves at the branch head.
 *
 * The check has two halves, and both must hold for every old path:
 *
 *   1. Router half. The old paths are read out of docs/pre-redesign-routes.md
 *      (the committed "before" list) and each one is resolved against the
 *      route table of public/src/router/index.js: a route path, an alias of a
 *      route, or the target of a redirect.
 *
 *   2. Published-output half. The site is published from the directory the
 *      GitHub Pages workflow uploads (./public/dist). A cold request to an old
 *      URL is answered by that directory: the app shell at the base path and
 *      the 404.html fallback at every other path. Both must boot the app from
 *      the same entry bundle, and the route table inside that bundle must
 *      still carry the old path and resolve it to the same target as the
 *      router config.
 *
 * The route list is read at run time, so a path added to the document later
 * is picked up without editing this script.
 *
 * Usage:
 *   node scripts/check-routes.mjs [--routes <file>] [--router <file>] [--dist <dir>]
 *
 * Options:
 *   --routes <file>  pre-redesign route list (default: docs/pre-redesign-routes.md)
 *   --router <file>  router config (default: public/src/router/index.js)
 *   --dist <dir>     published output (default: the directory the workflow uploads)
 *
 * Exit codes: 0 = every old path resolves, 1 = at least one path does not
 * resolve, 2 = bad usage or I/O error.
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(SCRIPT_DIR, '..')
const DEFAULT_ROUTES_DOC = join(REPO_ROOT, 'docs', 'pre-redesign-routes.md')
const DEFAULT_ROUTER = join(REPO_ROOT, 'public', 'src', 'router', 'index.js')
const WORKFLOW_FILE = join(REPO_ROOT, '.github', 'workflows', 'deploy.yml')
const FALLBACK_DIST = resolve(REPO_ROOT, 'public', 'dist')

const usage = [
  'Usage: node scripts/check-routes.mjs [--routes <file>] [--router <file>] [--dist <dir>]',
  '',
  'Resolves every pre-redesign path against the router config and the published output.',
  '',
  'Options:',
  '  --routes <file>  pre-redesign route list (default: docs/pre-redesign-routes.md)',
  '  --router <file>  router config (default: public/src/router/index.js)',
  '  --dist <dir>     published output (default: the directory the Pages workflow uploads)',
  '',
  'Exit codes: 0 = every old path resolves, 1 = a path does not resolve, 2 = usage or I/O error.'
].join('\n')

// A local reference points at a file of the build output; everything else is
// an external URL or an in-page anchor.
const ASSET_ATTRIBUTE_RE = /(?:src|href)\s*=\s*"([^"]*)"/g
const APP_MOUNT_RE = /<div\s+id="app"/

/* ------------------------------------------------------------------ options */

function readOptions (argv) {
  const known = new Set(['--help', '-h'])
  const takesValue = new Map([['--routes', 'routes'], ['--router', 'router'], ['--dist', 'dist']])
  const options = {}

  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index]
    if (!argument.startsWith('-')) throw new Error(`unexpected argument: ${argument}`)
    if (known.has(argument)) {
      options.help = true
      continue
    }
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

/* --------------------------------------------------------------- route list */

/**
 * The route list is the first cell of the Markdown tables of the document:
 * a code span that starts with a slash. Every other path literal in the
 * document (the favicon, the workflow output directory) is not a route.
 */
function parseRouteList (markdown) {
  const paths = []
  const seen = new Set()
  for (const line of markdown.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed.startsWith('|')) continue
    const cells = trimmed.split('|')
    if (cells.length < 3) continue
    const cell = cells[1].trim()
    const value = cell.startsWith('`') && cell.endsWith('`') ? cell.slice(1, -1).trim() : cell
    if (!value.startsWith('/')) continue
    if (seen.has(value)) continue
    seen.add(value)
    paths.push(value)
  }
  return paths
}

/* ----------------------------------------------------------- source scanning */

/**
 * Index of the bracket that closes the one at `start`, skipping strings and
 * comments so a bracket inside them does not end the literal.
 */
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
      if (character === '*' && next === '/') { state = 'code'; index += 2; continue }
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

/** The objects at the top level of an array body, one string per object. */
function splitObjects (body) {
  const objects = []
  let index = 0
  while (index < body.length) {
    if (body[index] !== '{') { index += 1; continue }
    const end = matchingBracket(body, index)
    if (end === -1) break
    objects.push(body.slice(index, end + 1))
    index = end + 1
  }
  return objects
}

/** The quoted string that starts at `start`, with its value and its end. */
function readQuoted (source, start) {
  const quote = source[start]
  if (quote !== '"' && quote !== "'" && quote !== '`') return null
  let index = start + 1
  let value = ''
  while (index < source.length) {
    const character = source[index]
    if (character === '\\') {
      value += source[index + 1] ?? ''
      index += 2
      continue
    }
    if (character === quote) return { value, end: index + 1 }
    value += character
    index += 1
  }
  return null
}

/** The position of the value of an object key, or -1 when the key is absent. */
function keyValueStart (object, key) {
  const match = new RegExp(`(?<=[{,])${key}:\\s*`).exec(object)
  return match === null ? -1 : match.index + match[0].length
}

/** The quoted values of an array literal, or null when it is not an array. */
function readStringList (source, start) {
  if (source[start] !== '[') return null
  const end = matchingBracket(source, start)
  if (end === -1) return null
  const values = []
  let index = start + 1
  while (index < end) {
    const character = source[index]
    if (character === '"' || character === "'" || character === '`') {
      const quoted = readQuoted(source, index)
      if (quoted === null) return null
      values.push(quoted.value)
      index = quoted.end
      continue
    }
    index += 1
  }
  return values
}

/* -------------------------------------------------------------- route model */

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

/** One route of a route table, in the shape the resolver works with. */
function describeRoute (route) {
  const aliases = []
  if (typeof route.alias === 'string') aliases.push(route.alias)
  else if (Array.isArray(route.alias)) {
    for (const alias of route.alias) if (typeof alias === 'string') aliases.push(alias)
  } else if (route.alias && typeof route.alias === 'object' && typeof route.alias.path === 'string') {
    aliases.push(route.alias.path)
  }

  const path = typeof route.path === 'string' ? normalizePath(route.path) : null

  return {
    path,
    name: typeof route.name === 'string' ? route.name : null,
    aliases: aliases.map(normalizePath).filter((alias) => alias !== null),
    redirect: typeof route.redirect === 'string' ? normalizePath(route.redirect) : null,
    redirectDynamic: route.redirect !== undefined && route.redirect !== null && typeof route.redirect !== 'string',
    // A catch-all matches every path, so it resolves nothing to its intended
    // content and must not count as a resolution.
    isCatchAll: path === null ? false : path.includes('*')
  }
}

/**
 * Follow a redirect to the route it ends at. A redirect target that is not a
 * route of the table, that redirects again, or that loops does not resolve.
 */
function followRedirect (redirect, routes) {
  let current = normalizePath(redirect)
  const seen = new Set()
  for (let step = 0; step < 10; step++) {
    if (current === null) return { target: null, detail: 'the redirect target is not a path' }
    if (seen.has(current)) return { target: null, detail: 'the redirect chain loops' }
    seen.add(current)
    const route = routes.find((entry) => !entry.isCatchAll && (entry.path === current || entry.aliases.includes(current)))
    if (route === undefined) return { target: null, detail: `the redirect target "${current}" is not a route` }
    if (route.redirectDynamic) return { target: null, detail: `the redirect target "${current}" has a function redirect` }
    if (route.redirect !== null) { current = route.redirect; continue }
    return { target: route.path, detail: `route "${route.name}"` }
  }
  return { target: null, detail: 'the redirect chain is too long' }
}

/**
 * Resolve one old path against a route table. A route path, an alias and a
 * redirect all count, and all three resolve to the page the path leads to.
 */
function resolvePath (oldPath, routes) {
  const normalized = normalizePath(oldPath)
  if (normalized === null) return null

  const describe = (route) => {
    if (route.redirectDynamic) {
      return { route, target: null, detail: `route "${route.name}" has a function redirect, which cannot be resolved statically` }
    }
    if (route.redirect !== null) {
      const followed = followRedirect(route.redirect, routes)
      return {
        route,
        target: followed.target,
        detail: `redirect of route "${route.name}" to "${route.redirect}" (${followed.detail})`
      }
    }
    if (route.path === normalized) {
      return { route, target: route.path, detail: `route "${route.name}"` }
    }
    return { route, target: route.path, detail: `alias of route "${route.name}"` }
  }

  const byPath = routes.find((route) => !route.isCatchAll && route.path === normalized)
  if (byPath !== undefined) return describe(byPath)

  const byAlias = routes.find((route) => !route.isCatchAll && route.aliases.includes(normalized))
  if (byAlias !== undefined) return describe(byAlias)

  return null
}

/* -------------------------------------------------------------- router file */

/**
 * The route table of the router file, read as data. The file is a Vue module
 * that imports vue-router and its view components, so it cannot be imported
 * as-is; only the route table literal is evaluated, and the view components
 * are never called.
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
  return routes.map(describeRoute)
}

/* -------------------------------------------------------- published output */

/** Files of the published directory, filtered by extension. */
function collectFiles (dir, extension) {
  const files = []
  const walk = (current) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.isFile() && full.endsWith(extension)) files.push(full)
    }
  }
  walk(dir)
  return files.sort()
}

/** A reference is local when it points at a file of the build output. */
function isLocalReference (reference) {
  if (reference === '') return false
  if (reference.startsWith('#')) return false
  if (reference.startsWith('//')) return false
  if (/^[a-z][a-z0-9+.-]*:/i.test(reference)) return false
  return true
}

/** The local references of a built document, in the order they appear. */
function localReferences (html) {
  const references = []
  for (const match of html.matchAll(ASSET_ATTRIBUTE_RE)) {
    const reference = match[1]
    if (isLocalReference(reference)) references.push(reference)
  }
  return [...new Set(references)]
}

/** Check one built document: it must boot the app and its assets must exist. */
function checkDocument (distDir, filePath) {
  const html = readFileSync(filePath, 'utf8')
  const problems = []
  if (!APP_MOUNT_RE.test(html)) problems.push('has no <div id="app"> mount point')
  const references = localReferences(html)
  const missing = references.filter((reference) => !existsSync(join(distDir, reference.replace(/^\.?\//, ''))))
  for (const reference of missing) {
    problems.push(`references ${reference}, which is not in the published output`)
  }
  const scripts = references.filter((reference) => reference.endsWith('.js'))
  if (scripts.length === 0) problems.push('loads no script, so it cannot boot the app')
  return { references, scripts, problems }
}

/** The directory the GitHub Pages workflow uploads, read from the workflow. */
function publishedDirFromWorkflow () {
  if (!existsSync(WORKFLOW_FILE)) return null
  const text = readFileSync(WORKFLOW_FILE, 'utf8')
  const match = /^[ \t]*path:[ \t]*['"]?([^'"\s]+)['"]?[ \t]*$/m.exec(text)
  if (match === null) return null
  return resolve(REPO_ROOT, match[1])
}

/**
 * The route table inside the built bundle. The bundler keeps the route
 * records as plain objects, so the built table is read back the same way the
 * router config is: as data.
 *
 * The table is found by its marker, not by matching path literals: the
 * bundle holds dozens of unrelated `{path:` objects (navigation entries,
 * router internals) and matching those would accept a path that the app
 * never routes to.
 */
function readBuiltRoutes (jsFiles) {
  const markers = ['routes:[', 'routes=[', 'routes = [']
  for (const file of jsFiles) {
    const source = readFileSync(file, 'utf8')
    for (const marker of markers) {
      let index = source.indexOf(marker)
      while (index !== -1) {
        const arrayStart = index + marker.length - 1
        const end = matchingBracket(source, arrayStart)
        if (end !== -1) {
          const records = splitObjects(source.slice(arrayStart + 1, end))
            .map((object) => {
              const pathStart = keyValueStart(object, 'path')
              const path = pathStart === -1 ? null : readQuoted(object, pathStart)
              if (path === null) return null
              const nameStart = keyValueStart(object, 'name')
              const name = nameStart === -1 ? null : readQuoted(object, nameStart)
              const aliasStart = keyValueStart(object, 'alias')
              const alias = aliasStart === -1 ? [] : readStringList(object, aliasStart)
              const redirectStart = keyValueStart(object, 'redirect')
              const redirect = redirectStart === -1 ? null : readQuoted(object, redirectStart)
              return {
                path: path.value,
                name: name === null ? null : name.value,
                alias: alias ?? [],
                redirect: redirect === null ? null : redirect.value,
                redirectDynamic: redirectStart !== -1 && redirect === null
              }
            })
            .filter((route) => route !== null)
          if (records.length > 0) {
            return { file, routes: records.map(describeRoute) }
          }
        }
        index = source.indexOf(marker, index + 1)
      }
    }
  }
  return { file: null, routes: [] }
}

/**
 * The route table of the bundle the published document loads. Only that
 * bundle decides what a visitor gets, so a table in some other file of the
 * build output does not count.
 */
function readLoadedRouteTable (documents, jsFiles) {
  const byName = new Map(jsFiles.map((file) => [file.split('/').pop(), file]))
  const candidates = []
  for (const document of documents) {
    if (!document.present) continue
    for (const reference of document.scripts) {
      const file = byName.get(reference.split('/').pop())
      if (file !== undefined && !candidates.includes(file)) candidates.push(file)
    }
  }
  for (const file of candidates) {
    const table = readBuiltRoutes([file])
    if (table.routes.length > 0) return table
  }
  return { file: null, routes: [] }
}

/** The state of the published output. */
function inspectPublishedOutput (distDir) {
  const published = { distDir, exists: false, index: null, fallback: null, jsFiles: [], table: { file: null, routes: [] } }
  if (!existsSync(distDir)) return published
  published.exists = true

  const indexPath = join(distDir, 'index.html')
  published.index = existsSync(indexPath)
    ? { present: true, path: indexPath, ...checkDocument(distDir, indexPath) }
    : { present: false, path: indexPath, references: [], scripts: [], problems: ['is missing'] }

  const fallbackPath = join(distDir, '404.html')
  published.fallback = existsSync(fallbackPath)
    ? { present: true, path: fallbackPath, ...checkDocument(distDir, fallbackPath) }
    : { present: false, path: fallbackPath, references: [], scripts: [], problems: ['is missing'] }

  published.jsFiles = collectFiles(distDir, '.js')
  published.table = readLoadedRouteTable([published.index, published.fallback], published.jsFiles)
  return published
}

/**
 * The published-output half of the check for one old path: the published
 * directory answers a cold request to the old URL with a document that boots
 * the app, and the route table inside the built bundle carries the old path
 * and resolves it to the same target as the router config.
 */
function checkPublishedOutput (oldPath, target, published) {
  if (!published.exists) {
    return { ok: false, reason: `the published output ${published.distDir} does not exist`, detail: null }
  }
  if (!published.index.present) {
    return { ok: false, reason: 'the published output has no index.html (app shell)', detail: null }
  }
  if (published.index.problems.length > 0) {
    return { ok: false, reason: `index.html ${published.index.problems[0]}`, detail: null }
  }
  if (!published.fallback.present) {
    return { ok: false, reason: 'the published output has no 404.html (cold-request fallback)', detail: null }
  }
  if (published.fallback.problems.length > 0) {
    return { ok: false, reason: `404.html ${published.fallback.problems[0]}`, detail: null }
  }
  const sameBundle = published.index.scripts.join(' ') === published.fallback.scripts.join(' ')
  if (!sameBundle) {
    return { ok: false, reason: 'index.html and 404.html load different bundles, so a cold request boots another build', detail: null }
  }
  if (published.table.routes.length === 0) {
    return { ok: false, reason: 'the built bundle carries no route table', detail: null }
  }

  const resolved = resolvePath(oldPath, published.table.routes)
  if (resolved === null) {
    return { ok: false, reason: 'the built route table has no route, alias or redirect for this path', detail: null }
  }
  if (resolved.target === null) {
    return { ok: false, reason: `the built route table: ${resolved.detail}`, detail: null }
  }
  if (normalizePath(target) !== normalizePath(resolved.target)) {
    return {
      ok: false,
      reason: `the built route table resolves it to "${resolved.target}", the router config to "${target}"`,
      detail: resolved.detail
    }
  }
  return {
    ok: true,
    reason: null,
    detail: `${resolved.detail} in ${relative(published.distDir, published.table.file)}`
  }
}

/* -------------------------------------------------------------------- main */

function main (argv) {
  const options = readOptions(argv)
  if (options.help) {
    console.log(usage)
    return 0
  }

  const routesDoc = options.routes ?? DEFAULT_ROUTES_DOC
  const routerPath = options.router ?? DEFAULT_ROUTER
  const distDir = options.dist ?? publishedDirFromWorkflow() ?? FALLBACK_DIST

  if (!existsSync(routesDoc)) {
    console.error(`check-routes: no route list at ${routesDoc}`)
    return 2
  }
  if (!existsSync(routerPath)) {
    console.error(`check-routes: no router config at ${routerPath}`)
    return 2
  }

  const oldPaths = parseRouteList(readFileSync(routesDoc, 'utf8'))
  if (oldPaths.length === 0) {
    console.error(`check-routes: no path found in ${routesDoc}`)
    return 2
  }
  const routes = readRouterRoutes(routerPath)
  const published = inspectPublishedOutput(distDir)

  console.log(`check-routes: route list  ${routesDoc}`)
  console.log(`check-routes: router      ${routerPath}`)
  console.log(`check-routes: published   ${distDir}`)
  console.log(`check-routes: ${oldPaths.length} old path(s), ${routes.length} route(s) in the router`)

  const documentLine = (label, document) => {
    if (document === null) {
      console.log(`check-routes:   ${label.padEnd(10)} MISSING  ${join(published.distDir, label)}`)
      return
    }
    if (!document.present) {
      console.log(`check-routes:   ${label.padEnd(10)} MISSING  ${document.path}`)
      return
    }
    if (document.problems.length > 0) {
      console.log(`check-routes:   ${label.padEnd(10)} BAD      ${document.path}: ${document.problems.join('; ')}`)
      return
    }
    console.log(`check-routes:   ${label.padEnd(10)} OK       ${document.path}: boots the app, ${document.references.length} local reference(s) present`)
  }
  documentLine('index.html', published.index)
  documentLine('404.html', published.fallback)
  console.log(`check-routes:   bundle     ${published.jsFiles.length} script(s) in the published output, route table read from ${published.table.file === null ? 'none' : relative(published.distDir, published.table.file)}`)
  console.log('')

  const results = oldPaths.map((oldPath) => {
    const resolved = resolvePath(oldPath, routes)
    const target = resolved === null ? null : resolved.target
    const built = resolved !== null && resolved.target !== null
      ? checkPublishedOutput(oldPath, target, published)
      : { ok: false, reason: 'not in the router config', detail: null }
    return { oldPath, resolved, target, built }
  })

  const oldWidth = Math.max(...results.map((result) => result.oldPath.length))
  const targetWidth = Math.max(...results.map((result) => (result.target ?? 'UNRESOLVED').length))

  const failures = []
  for (const result of results) {
    const routerDetail = result.resolved === null
      ? 'router: no route path, alias or redirect matches this path'
      : `router: ${result.resolved.detail}`
    const builtDetail = result.built.ok
      ? `built: ${result.built.detail}`
      : `built: ${result.built.reason}`
    const targetText = result.target ?? 'UNRESOLVED'
    console.log(`${result.oldPath.padEnd(oldWidth)} -> ${targetText.padEnd(targetWidth)}  ${routerDetail}  ${builtDetail}`)
    if (!result.resolved || result.resolved.target === null || !result.built.ok) {
      failures.push({ oldPath: result.oldPath, target: result.target, routerDetail, builtDetail })
    }
  }

  console.log('')
  if (failures.length > 0) {
    console.log(`check-routes: ${failures.length} path(s) did not resolve:`)
    for (const failure of failures) {
      console.log(`  ${failure.oldPath} -> ${failure.target ?? 'UNRESOLVED'}`)
      console.log(`    ${failure.routerDetail}`)
      console.log(`    ${failure.builtDetail}`)
    }
    console.log('')
  }
  console.log(`check-routes: ${results.length} old path(s) checked, ${results.length - failures.length} resolved, ${failures.length} unresolved`)
  return failures.length === 0 ? 0 : 1
}

try {
  process.exit(main(process.argv.slice(2)))
} catch (error) {
  console.error(`check-routes: ${error.message}`)
  console.error(usage)
  process.exit(2)
}
