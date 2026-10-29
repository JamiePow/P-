import Image from 'next/image'
import { Amp } from './Brand'

type PlaceholderProps = {
  src?: string
  alt: string
  label: string
  ratio?: string
  className?: string
  priority?: boolean
}

/*
  Renders the image when one exists, and a labelled brand surface when it does
  not, so the layout is honest about what is still missing rather than filling
  it with stock photography.
*/
export default function Placeholder({
  src,
  alt,
  label,
  ratio = '4 / 3',
  className = '',
  priority = false,
}: PlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[#0d0d0d] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: [
                'radial-gradient(120% 90% at 78% 8%, rgba(250,248,245,0.08) 0%, rgba(250,248,245,0) 55%)',
                'linear-gradient(107deg, rgba(255,0,0,0) 46%, rgba(255,0,0,0.10) 49.4%, rgba(255,0,0,0.7) 50%, rgba(255,0,0,0.10) 50.6%, rgba(255,0,0,0) 54%)',
                'repeating-linear-gradient(107deg, rgba(250,248,245,0.03) 0 1px, rgba(250,248,245,0) 1px 9px)',
                'linear-gradient(145deg, #232323 0%, #0d0d0d 62%)',
              ].join(', '),
            }}
          />
          <span className="absolute left-0 top-0 h-full w-[2px] bg-accent" />
          <Amp className="pointer-events-none absolute right-5 top-3 text-[clamp(3.5rem,7vw,8rem)] leading-none text-[#faf8f5] opacity-[0.12] sm:right-8" />
          <div className="absolute inset-0 flex items-end p-5 sm:p-7">
            <span className="font-mono text-[10px] uppercase tracking-label text-[#faf8f5]/55">
              {label}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
