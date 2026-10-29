import localFont from 'next/font/local'

/*
  Fonts for the concept route only.

  The reference proposal embeds exactly four faces: Instrument Serif in
  Regular and Italic, and Inter in Regular and Medium. It embeds no
  monospace, and this stylesheet declares no semibold, so the route loads
  those four files and nothing else.

  They are declared here rather than imported from app/fonts.ts, because
  that module also declares IBM Plex Mono and Next preloads every face a
  route's font module declares.

  The site routes keep app/fonts.ts, with the mono face, unchanged.
*/

export const display = localFont({
  src: [
    { path: '../fonts/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

export const sans = localFont({
  src: [
    { path: '../fonts/inter-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/inter-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
})
