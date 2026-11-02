#!/usr/bin/env node
/**
 * generate-404.mjs
 *
 * Plain Node script (no runtime dependency) that writes the SPA fallback
 * `dist/404.html` from the built `dist/index.html`.
 *
 * The fallback must not be frozen at authoring time. A cold request to an
 * old URL is answered by the host with the `404.html` document, and that
 * document has to load the hashed assets of the build that is actually
 * published. A committed copy of a built index.html goes stale on the next
 * build, and the fallback then fetches an asset that no longer exists and
 * boots a blank app. So the fallback is derived from the build output on
 * every build, and this script runs last, after `vite build` has finished.
 *
 * The fallback carries the built index document verbatim, so it has the same
 * app entry script, stylesheet, favicon, meta tags, pre-paint theme script
 * and `<div id="app">` mount point as the index page.
 *
 * Usage:
 *   node scripts/generate-404.mjs [--dist <dir>]
 *
 * The dist directory defaults to <repo>/public/dist and is resolved from the
 * location of this script, not from process.cwd(), so the generator behaves
 * the same whether npm is invoked from the repository root or from public/.
 *
 * Exit codes: 0 = fallback written, 1 = the build output is not usable,
 * 2 = bad usage or I/O error.
 */

import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(SCRIPT_DIR, '..')
const DEFAULT_DIST_DIR = resolve(REPO_ROOT, 'public', 'dist')

const usage = [
  'Usage: node scripts/generate-404.mjs [--dist <dir>]',
  '',
  'Writes <dist>/404.html from <dist>/index.html, so the SPA fallback always',
  'references the assets of the current build.',
  '',
  'Options:',
  '  --dist <dir>  Build output directory (default: <repo>/public/dist)'
].join('\n')

const ASSET_ATTRIBUTE_RE = /(?:src|href)\s*=\s*"([^"]*)"/g
const APP_MOUNT_RE = /<div\s+id="app"/

/**
 * A reference is local when it points at a file in the build output.
 * Absolute URLs, protocol-relative URLs, data URIs and in-page anchors are
 * not build artefacts and are not checked.
 */
function isLocalReference (reference) {
  if (reference === '') return false
  if (reference.startsWith('#')) return false
  if (reference.startsWith('//')) return false
  if (/^[a-z][a-z0-9+.-]*:/i.test(reference)) return false
  return true
}

/** Map a built reference to the file it names inside the dist directory. */
function localTarget (distDir, reference) {
  return join(distDir, reference.replace(/^\.?\//, ''))
}

function readDistDir (argv) {
  const known = new Set(['--help', '-h'])
  const unknown = argv.filter((argument) => {
    if (!argument.startsWith('-')) return false
    if (argument === '--dist') return false
    return !known.has(argument)
  })
  if (unknown.length > 0) throw new Error(`unknown option: ${unknown[0]}`)
  const index = argv.indexOf('--dist')
  if (index === -1) return DEFAULT_DIST_DIR
  const value = argv[index + 1]
  if (value === undefined || value.startsWith('-')) throw new Error('--dist needs a directory')
  return resolve(value)
}

function digest (buffer) {
  return createHash('sha256').update(buffer).digest('hex')
}

function main (argv) {
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(usage)
    return 0
  }

  const distDir = readDistDir(argv)
  const indexPath = join(distDir, 'index.html')

  if (!existsSync(indexPath)) {
    console.error(`generate-404: no built index at ${indexPath}`)
    console.error('generate-404: run the Vite build first, "npm run build" runs both steps.')
    return 1
  }

  const indexBytes = readFileSync(indexPath)
  const html = indexBytes.toString('utf8')

  if (!APP_MOUNT_RE.test(html)) {
    console.error(`generate-404: ${indexPath} has no <div id="app"> mount point`)
    console.error('generate-404: refusing to write a fallback that cannot boot the app.')
    return 1
  }

  const references = [...new Set(
    [...html.matchAll(ASSET_ATTRIBUTE_RE)]
      .map((match) => match[1])
      .filter(isLocalReference)
  )]

  const missing = references.filter((reference) => !existsSync(localTarget(distDir, reference)))
  if (missing.length > 0) {
    console.error(`generate-404: ${indexPath} references files that are not in the build output:`)
    for (const reference of missing) {
      console.error(`  ${reference} -> ${localTarget(distDir, reference)}`)
    }
    console.error('generate-404: refusing to write a fallback that would boot a blank app.')
    return 1
  }

  const outputPath = join(distDir, '404.html')
  const unchanged = existsSync(outputPath) && readFileSync(outputPath).equals(indexBytes)
  writeFileSync(outputPath, indexBytes)

  console.log(`generate-404: source  ${indexPath}`)
  console.log(`generate-404: output  ${outputPath}`)
  console.log(`generate-404: bytes   ${indexBytes.length}`)
  console.log(`generate-404: sha256  ${digest(indexBytes)}`)
  console.log(`generate-404: ${unchanged ? 'unchanged' : 'written'}`)
  console.log(`generate-404: ${references.length} local reference(s) checked in the build output:`)
  for (const reference of references) {
    console.log(`  ${reference} -> ${localTarget(distDir, reference)}`)
  }
  return 0
}

try {
  process.exit(main(process.argv.slice(2)))
} catch (error) {
  console.error(`generate-404: ${error.message}`)
  console.error(usage)
  process.exit(2)
}
