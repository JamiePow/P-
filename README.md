# Pow & Partners

Marketing site for the P& group, built to the founding plan (September 2026) and
the brand as set out in the Crafted Studio partnership proposal.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run export     # static export into ./out
node bundle-preview.mjs   # after an export: builds the single-file preview
```

## What is here

- `app/` routes: home, `/pillars`, `/approach`, `/work`, `/work/[slug]`, `/contact`,
  `/privacy`, `/terms`, plus `sitemap.ts` and `robots.ts`.
- `lib/data.ts` the single content layer. Every page reads from it.
- `components/` the shared primitives: `Reveal`, `Label` (the red tick eyebrow),
  `Dot` (the red full stop), `Placeholder`, `PageHero`, `CtaBand`, `Brand`,
  header, footer, contact form.
- `app/globals.css` the palette as CSS custom properties. `.on-dark` and
  `.on-accent` re-point the same tokens for the black and red surfaces rather
  than duplicating the palette.

## Brand

Palette from the plan's colophon: red `#FF0000`, near black `#0D0D0D`,
ivory `#FAF8F5`, with stone `#B8B5AE` and warm grey `#E6E3DC` carried over from
the proposal.

Type, also from the colophon: Instrument Serif (display, standing in for Canela),
Inter (body) and IBM Plex Mono (the uppercase micro-labels, folios and data
tables). All three are self-hosted in `app/fonts`, no external CDNs. When the
Canela and Neue Haas Grotesk licences are in place, drop the `.woff2` files into
that folder and change the `src` paths in `app/fonts.ts`.

Marks: `LogoHorizontal` and `Monogram` are traced from the supplied artwork into
SVG paths and generated into `components/Brand.tsx`. Ink is drawn with
`currentColor`, so one component serves both the black and the white lockups.
The ampersand is set in the display face rather than drawn, because the plan is
explicit that the ampersand is the brand. To regenerate after reissued artwork:
`python3 scripts/trace-logos.py assets <source-dir>` then
`node scripts/build-brand-components.mjs`.

## What the site says, and what it does not

Public: the positioning, the five-step loop, the three pillars and Labs, the four
value layers, the partners, and the package bands, which were themselves
benchmarked against published rate cards.

Deliberately not public: the group financial model, the equity split, partner
reward, and anything else the plan marks confidential. Client names are held
back, so the two proof points are described but unnamed.

## Still to do

- Contact form endpoint. Set `NEXT_PUBLIC_FORM_ENDPOINT` and the form posts JSON
  to it. Without one it validates and confirms without sending.
- Photography. `Placeholder` renders a labelled brand surface wherever an image
  belongs. Pass a `src` and it renders the image through `next/image` instead.
- Jack's surname, the registered address, and sign-off on naming the two
  businesses. Everything unconfirmed is left in square brackets on purpose.
