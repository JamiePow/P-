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
