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

/** Every page carries this. Only a production deployment is indexable. */
export const robotsPolicy = isProduction
  ? { index: true, follow: true }
  : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } }
