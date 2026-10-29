/* The eyebrow from the plan: a red tick rule above a mono label. */
export default function Label({
  children,
  className = '',
  tick = true,
}: {
  children: React.ReactNode
  className?: string
  tick?: boolean
}) {
  return (
    <p
      className={`${tick ? 'tick' : ''} font-mono text-[10px] uppercase tracking-label text-muted ${className}`}
    >
      {children}
    </p>
  )
}
