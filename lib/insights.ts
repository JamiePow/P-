/* ------------------------------------------------------------------------ *
 * lib/insights.ts
 *
 * The Insights index reads from here. It is deliberately empty: nothing has
 * been written, and the page says so rather than carrying filler.
 *
 * To publish, add an entry. The index renders it with no layout work.
 * ------------------------------------------------------------------------ */

export type Insight = {
  slug: string
  title: string
  /* ISO date, rendered as written */
  date: string
  standfirst: string
}

export const insights: Insight[] = []

/*
 * Whether the section is published at all.
 *
 * Derived from the content rather than set by hand, so there is one switch
 * and it cannot disagree with itself. While this is false the route returns
 * a 404, the page is excluded from the sitemap, and robots.txt disallows it,
 * so an unfinished section cannot reach a search result.
 *
 * Adding the first entry above restores the page, the sitemap entry and the
 * crawl rule together. The navigation link is the one deliberate exception:
 * add it back to NAV in components/c04/Chrome.tsx when you want it seen.
 */
export const insightsPublished = insights.length > 0
