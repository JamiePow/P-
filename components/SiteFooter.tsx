import Link from 'next/link'
import { Monogram } from './Brand'
import { footerColumns, site } from '@/lib/data'

export default function SiteFooter() {
  return (
    <footer className="on-dark">
      <div className="shell py-20">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Monogram label={site.name} className="h-14 w-auto" />
            <p className="mt-7 font-mono text-[10px] uppercase tracking-label">{site.tagline}</p>
            <p className="mt-6 max-w-xs text-sm text-muted">{site.description}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="font-mono text-[10px] uppercase tracking-label text-soft">
                  {column.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors duration-300 ease-brand hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rule mt-16 flex flex-col gap-5 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-label">
            {site.internalLine}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-label text-muted">
            {site.reach}
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3 text-xs text-muted sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. Registered in [country], number
            [00000000].
          </p>
          <p className="flex gap-6">
            <Link href="/privacy" className="hover:text-[var(--c-ink)]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[var(--c-ink)]">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
