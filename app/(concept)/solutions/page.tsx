import type { Metadata } from 'next'
import { Shell, PageHead } from '@/components/c04/Chrome'
import { Cta } from '@/components/c04/Parts'
import Solutions from '@/components/c04/Solutions'
import { ctas, solutions, solutionsDisclosure } from '@/lib/c04'

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Atelier for jewellery and bridal, Nexus for field and route operations, Blueprint for construction subcontractors. Built inside the sector rather than for it.',
  alternates: { canonical: '/solutions' },
}

export default function SolutionsPage() {
  return (
    <Shell current="/solutions">
      <PageHead
        n="02"
        folio="Solutions"
        title={<>Built inside the sector, not for it<span className="c4-stop">.</span></>}
        lead="Three operating platforms, each shaped by a business that had to run on it."
        aside={<p className="c4-body">{solutionsDisclosure}</p>}
      />

      <section className="c4-sec2">
        <div className="c4-shell">
          <Solutions items={solutions} />
          <Cta line={ctas.solutions.line} action={ctas.solutions.action} href="/contact" />
        </div>
      </section>
    </Shell>
  )
}
