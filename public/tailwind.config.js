/**
 * Semantic token bridge between the Tailwind theme and the stylesheet.
 *
 * The nine contract tokens live as CSS custom properties in the stylesheet
 * (light values in `:root`, dark values in `.dark`):
 *
 *   --color-background, --color-foreground, --color-muted,
 *   --color-muted-foreground, --color-border, --color-accent,
 *   --color-accent-foreground, --color-text-body, --color-text-large
 *
 * Every colour utility below reads its custom property, so no utility
 * hard-codes a palette hex value and a theme swap only touches the stylesheet.
 */

/**
 * Resolve a semantic token to its CSS custom property.
 *
 * The base utility gets the plain `var()` reference. Opacity modifiers
 * (`bg-background/50`) need an alpha channel, which a bare `var()` cannot
 * carry, so those get `color-mix()` instead of being dropped from the build.
 */
const token = (name) => ({ opacityValue }) => {
  const value = `var(--color-${name})`;
  if (opacityValue === undefined) return value;
  const ratio = typeof opacityValue === 'number' ? opacityValue : Number.parseFloat(opacityValue);
  // The base utility reports its opacity as the `var(--tw-*-opacity, 1)` fallback.
  if (!Number.isFinite(ratio)) return value;
  return `color-mix(in srgb, ${value} ${ratio * 100}%, transparent)`;
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  // Keep the semantic utilities in the bundle even before a component
  // references them, so the token layer ships as a whole. Dark mode needs no
  // extra entries: the custom properties swap values under `.dark`.
  safelist: [
    'bg-background', 'bg-foreground', 'bg-muted', 'bg-muted-foreground', 'bg-border', 'bg-accent', 'bg-accent-foreground', 'bg-body', 'bg-large',
    'text-background', 'text-foreground', 'text-muted', 'text-muted-foreground', 'text-border', 'text-accent', 'text-accent-foreground', 'text-body', 'text-large',
    'border-background', 'border-foreground', 'border-muted', 'border-muted-foreground', 'border-border', 'border-accent', 'border-accent-foreground', 'border-body', 'border-large',
    'text-body-base', 'text-body-lg', 'text-title', 'text-heading', 'text-heading-lg', 'text-display-sm', 'text-display',
    'font-sans', 'font-mono',
    // Opacity modifiers resolve through `color-mix()`, so the common steps
    // ship with the token layer instead of being dropped from the build.
    'bg-background/50', 'bg-background/80', 'bg-muted/50', 'bg-accent/50',
    'text-foreground/70', 'text-muted/80', 'text-accent/80', 'border-border/50',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Semantic colour tokens. Every value is a CSS custom property read
      // from the stylesheet, so a palette change happens in one place and no
      // utility hard-codes a hex value.
      colors: {
        background: token('background'),
        foreground: token('foreground'),
        muted: token('muted'),
        'muted-foreground': token('muted-foreground'),
        border: token('border'),
        accent: token('accent'),
        'accent-foreground': token('accent-foreground'),
        // The contract names the last two tokens "text-body" and "text-large".
        // Their colour keys keep the token's own name, so the utility that
        // reads `--color-text-body` is `text-body` and the one that reads
        // `--color-text-large` is `text-large`. The type scale uses
        // `body-base`, so no class name carries two rules.
        body: token('text-body'),
        large: token('text-large'),
      },
      // System font stacks: no webfont download, no font CDN request.
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      // Extended screens for better responsive control
      screens: {
        'xs': '475px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      // Extended max-width for ultrawide support
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      // Type scale. The body step is 16px with a 1.6 line height, and three
      // heading steps sit above it: title (20px), heading (24px), heading-lg
      // (30px). The display steps keep their fluid clamps because their
      // smallest size stays well above the heading steps. The body step is
      // named `body-base` so it does not collide with the colour token
      // `--color-text-body`, whose utility is `text-body`.
      fontSize: {
        'display': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'heading-lg': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'title': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.005em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-base': ['1rem', { lineHeight: '1.6' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-15px) rotate(1deg)' },
          '66%': { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.1)',
        'modern': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        'modern-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      },
      transitionTimingFunction: {
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
