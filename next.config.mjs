/** @type {import('next').NextConfig} */

/*
  The enquiry endpoint at /api/enquiry is a server route. It cannot be
  produced by a static export, and a static export of this site would ship a
  contact form with nowhere to post to.

  Next already fails in that case, with an error about collecting page data
  that does not explain why. This refuses first, in plain words.

  EXPORT=1 remains available for producing flat files of the marketing pages
  for a design review, and it is not a deployment path.
*/
const isExport = process.env.EXPORT === '1'

if (isExport && process.env.ALLOW_EXPORT_WITHOUT_API !== '1') {
  throw new Error(
    [
      '',
      'Refusing to build a static export.',
      '',
      'This site has a server route at /api/enquiry which receives contact',
      'enquiries. A static export cannot serve it, so the contact form would',
      'post to a route that does not exist and every enquiry would be lost.',
      '',
      'Production must use the standard build on a Node runtime:  next build',
      '',
      'If you genuinely want flat files of the marketing pages for a review,',
      'and you accept that the enquiry endpoint will be missing, set',
      'ALLOW_EXPORT_WITHOUT_API=1 alongside EXPORT=1.',
      '',
    ].join('\n'),
  )
}

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /* The two shells were converged into one. These three routes existed on the
     retired shell. Nothing public ever linked to them, but a redirect costs
     nothing and stops a stale bookmark reaching a 404. */
  async redirects() {
    return [
      { source: '/approach', destination: '/how-we-work', permanent: true },
      { source: '/pillars', destination: '/what-we-do', permanent: true },
      { source: '/work', destination: '/solutions', permanent: true },
      { source: '/work/:slug', destination: '/solutions', permanent: true },
    ]
  },
  ...(isExport ? { output: 'export', images: { unoptimized: true } } : {}),
}

export default nextConfig
