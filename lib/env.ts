/* ------------------------------------------------------------------------ *
 * lib/env.ts
 *
 * Where this build is running, and what it is allowed to do there.
 *
 * Vercel sets VERCEL_ENV to production, preview or development. Anything
 * that is not production is a review build, and a review build is never
 * indexable. The default when the variable is absent, which is local
 * development, is also not production.
 * ------------------------------------------------------------------------ */

export const deployEnv = (process.env.VERCEL_ENV ?? 'development') as
  | 'production'
  | 'preview'
  | 'development'

export const isProduction = deployEnv === 'production'

/*
  Indexing is gated twice, and deliberately.

  VERCEL_ENV alone used to decide it, on the assumption that a production
  deployment meant a launched site. That assumption broke the moment the
  production URL started being used for review: the redesign went up at
  powand.vercel.app with robots.txt serving "Allow: /" while the contact
  mailbox is still unprovisioned, the inner pages are still the previous
  design and the photography is licensed stock standing in for a shoot.

  So a build is now indexable only when it is a production deployment AND
  launch has been declared explicitly, by setting ALLOW_INDEXING=1 in the
  project's environment. Review on production stays closed to crawlers;
  launch is one variable and one redeploy.
*/
export const launchDeclared = process.env.ALLOW_INDEXING === '1'

/** Production alone is not enough. Launch has to be stated. */
export const indexingAllowed = isProduction && launchDeclared

/** Every page carries this. */
export const robotsPolicy = indexingAllowed
  ? { index: true, follow: true }
  : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } }
