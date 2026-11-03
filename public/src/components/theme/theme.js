/**
 * Theme handling for the light and dark themes.
 *
 * The stored choice wins: localStorage holds it under THEME_STORAGE_KEY.
 * With nothing stored the site follows the prefers-color-scheme media query,
 * and keeps following it for as long as no explicit choice is made.
 * The dark theme is active while the root element carries the class "dark".
 *
 * The module is free of Vue imports so the pre-mount bootstrap in main.js
 * can use it before the app exists.
 */

/** localStorage key that holds the reader's choice. */
export const THEME_STORAGE_KEY = 'beat-theme'

const DARK_CLASS = 'dark'
const DARK_QUERY = '(prefers-color-scheme: dark)'
const THEMES = ['light', 'dark']

/** The subscribers that want to know when the active theme changes. */
const subscribers = new Set()

/** Tell the subscribers that the theme is now this one. */
function notify (theme) {
  for (const subscriber of [...subscribers]) subscriber(theme)
}

/**
 * The stored theme, or null when nothing valid is stored.
 * Storage can be unavailable (private mode, blocked cookies); that is not an
 * error, it only means there is no stored choice.
 */
export function readStoredTheme () {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY)
    return THEMES.includes(value) ? value : null
  } catch {
    return null
  }
}

/** True when the system asks for the dark theme. */
export function systemPrefersDark () {
  try {
    return typeof window.matchMedia === 'function' && window.matchMedia(DARK_QUERY).matches === true
  } catch {
    return false
  }
}

/** The theme to show: the stored choice wins, the system preference is the default. */
export function resolveTheme () {
  return readStoredTheme() ?? (systemPrefersDark() ? 'dark' : 'light')
}

/** Put the theme on the root element and return the theme that is now active. */
export function applyTheme (theme) {
  const root = document.documentElement
  if (root) {
    root.classList.toggle(DARK_CLASS, theme === 'dark')
  }
  notify(theme)
  return theme
}

/** True when the root element currently carries the dark theme. */
export function isDarkTheme () {
  const root = document.documentElement
  return Boolean(root && root.classList.contains(DARK_CLASS))
}

/**
 * Remember the theme so it survives a reload.
 * A storage failure leaves the theme applied for this page view only.
 */
export function storeTheme (theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Storage is unavailable; the theme still applies for this page view.
  }
}

/**
 * Apply the stored theme, or the system default, before the app mounts.
 * Returns the applied theme.
 */
export function initializeTheme () {
  const theme = resolveTheme()
  applyTheme(theme)
  followSystemTheme()
  return theme
}

/**
 * Follow the system preference while no explicit choice is stored.
 *
 * The listener applies the new system preference, unless the reader has made
 * an explicit choice in the meantime: the stored choice always wins.
 */
function followSystemTheme () {
  if (typeof window.matchMedia !== 'function') return
  let query
  try {
    query = window.matchMedia(DARK_QUERY)
  } catch {
    return
  }
  if (!query || typeof query.addEventListener !== 'function') return

  const onChange = (event) => {
    if (readStoredTheme() !== null) return
    applyTheme(event.matches ? 'dark' : 'light')
  }

  try {
    query.addEventListener('change', onChange)
  } catch {
    return
  }
}

/**
 * Subscribe to theme changes. Returns a function that removes the subscriber.
 * The subscriber is called with the theme that is now active.
 */
export function onThemeChange (subscriber) {
  subscribers.add(subscriber)
  return () => subscribers.delete(subscriber)
}

/**
 * Switch between the light and the dark theme, remember the choice and
 * return the theme that is now active.
 */
export function toggleTheme () {
  const theme = isDarkTheme() ? 'light' : 'dark'
  applyTheme(theme)
  storeTheme(theme)
  return theme
}
