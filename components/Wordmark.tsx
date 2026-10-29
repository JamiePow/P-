import Link from 'next/link'
import { LogoHorizontal, Monogram } from './Brand'

type WordmarkProps = { variant?: 'horizontal' | 'monogram'; className?: string }

/* The supplied lockups, drawn in currentColor so they invert on dark surfaces. */
export default function Wordmark({ variant = 'horizontal', className = '' }: WordmarkProps) {
  return (
    <Link href="/" aria-label="Pow &amp; Partners, home" className={`inline-block ${className}`}>
      {variant === 'monogram' ? (
        <Monogram label="Pow &amp; Partners" className="h-9 w-auto" />
      ) : (
        <LogoHorizontal label="Pow &amp; Partners" className="h-7 w-auto sm:h-8" />
      )}
    </Link>
  )
}
