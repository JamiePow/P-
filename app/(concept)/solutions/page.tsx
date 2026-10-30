import type { Metadata } from 'next'
import { Shell, PageHead } from '@/components/c04/Chrome'
import { Cta } from '@/components/c04/Parts'
import Solutions from '@/components/c04/Solutions'
import { ctas, solutions, solutionsDisclosure } from '@/lib/c04'

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Atelier for jewellery and bridal, Nexus for field and route operations, Blueprint for construction subcontractors. Each one was built inside a working business and corrected by the people running it.',
  alternates: { canonical: '/solutions' },
}

export default function SolutionsPage() {
  return (
    <Shell current="/solutions">
      <PageHead
        n="02"
        folio="Solutions"
        title={<>Three platforms, each built inside a working business<span className="c4-stop">.</span></>}
        lead="Atelier was built inside a premium jeweller. Nexus was built inside a route-based service operation. Blueprint is being built with construction subcontractors now."
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
