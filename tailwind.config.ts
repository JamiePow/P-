import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: 'var(--c-page)',
        ink: 'var(--c-ink)',
        muted: 'var(--c-muted)',
        soft: 'var(--c-soft)',
        hairline: 'var(--c-hairline)',
        accent: 'var(--c-accent)',
        panel: 'var(--c-panel)',
        stone: '#b8b5ae',
        warm: '#e6e3dc',
      },
      fontFamily: {
        display: 'var(--font-display)',
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      letterSpacing: {
        label: '0.18em',
        wide: '0.06em',
      },
      maxWidth: {
        shell: '1280px',
        prose: '60ch',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

export default config
