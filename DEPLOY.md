# P& website — state of this folder

Handed over 29 October 2026. Build and types clean, zero automated
accessibility violations across twelve routes at four breakpoints, all five
commercial journeys passing.

## Connecting it up

```bash
npm install
npm run build        # must succeed before deploying
npm run dev          # http://localhost:3000
```

Then `git init`, commit, push, and import the repo in Vercel. The project
`pow-and-partners` already exists under the `pow-xd-ltd` team with Vercel
Authentication switched on for every deployment; you can import into it or
start a fresh one.

**Use the standard Next build on a Node runtime.** `next.config.mjs` refuses a
static export, because a static export cannot serve `/api/enquiry` and the
contact form would post into a void.

## What is deliberately switched off

**Concept 04 is the homepage.** It serves at `/`. The previous homepage is
not in the route tree; it is kept at `.rollback/legacy-homepage.tsx.bak`.
To restore it, move that file back to `app/(site)/page.tsx` and move
`app/(concept)/page.tsx` back to `app/(concept)/concept-04/page.tsx`.

**Enquiries are disabled.** With no delivery target configured, the contact
form renders in full and is inert: fields disabled, submission blocked, and a
notice saying the mailbox is still being set up. No email address is shown
anywhere on the site until one is verified. `GET /api/enquiry` reports
readiness without revealing any configured value.

**Nothing is indexable.** Every route is `noindex, nofollow` and robots.txt
disallows everything, gated on `VERCEL_ENV` in `lib/env.ts`. A production
deployment flips both automatically. Nothing else needs changing.

## Turning things on

Set these in Vercel, not in the repository. See `.env.example` for what each
one does when it is missing.

| Variable | Purpose |
|---|---|
| `ENQUIRY_WEBHOOK_URL` | Where an enquiry is posted: CRM, automation hook or email API |
| `ENQUIRY_WEBHOOK_TOKEN` | Optional bearer token for the above |
| `ENQUIRY_NOTIFY_EMAIL` | The mailbox that receives notifications |
| `NEXT_PUBLIC_CONTACT_EMAIL` | The address shown on the site |
| `CONTACT_EMAIL_VERIFIED` | `true` only after a real enquiry has arrived in that mailbox |

The last one is a separate switch on purpose. Configuring an address proves
nothing; receiving a message through it does.

The production domain is set in `lib/data.ts` as `https://p-and.co.uk`. The
sitemap, the canonical URLs and the structured data all read from it, so one
edit moves all three.

## Still open

Four provisional values render as visible placeholders: a partner surname,
commitments 04 to 06, the registered country and the company number. Seven
essential photographs are art direction placeholders. The legal drafts in
`lib/legal.ts` have not been reviewed by a lawyer, and only the cookie policy
is wired to a page. Insights is built and empty. The audit credit treatment
is shown on the pricing page as undecided.

## Checking the work yourself

```bash
node scripts/site-qa.mjs       # routes, axe, overflow, journeys, links
node scripts/enquiry-e2e.mjs   # twelve enquiry cases against a live receiver
```

Both start the built site themselves and need no configuration.
