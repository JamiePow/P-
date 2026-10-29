'use client'

/*
  Fig. 01 — six systems, before and after.

  The figure makes one argument and makes it twice: today every system talks
  to every other system, and each of those lines is a person; connected, every
  system talks to one layer. Switching between the two states is the whole
  demonstration, so the control is the first thing in the figure.

  The names are real text rather than labels inside a picture, so they can be
  selected, translated and read aloud. Only the wires are drawn. Pointing at
  or focusing a system traces its connections. The figure is complete and
  correct with scripting off, in which case it shows the connected state.
*/

import { useState } from 'react'
import { systemsLeft, systemsRight } from '@/lib/c04'

const YS = [16.667, 50, 83.333]

/* Today: every system wired to every other, across the middle. */
const TANGLE = YS.flatMap((ly, i) =>
  YS.map((ry, j) => ({ d: `M0 ${ly}L100 ${ry}`, left: i, right: j })),
)

/* Connected: everything meets one layer. */
const joinLeft = (y: number) => `M0 ${y} C 18 ${y}, 26 50, 38 50`
const joinRight = (y: number) => `M62 50 C 74 50, 82 ${y}, 100 ${y}`

type Side = 'left' | 'right'

export default function SystemsFigure() {
  const [joined, setJoined] = useState(true)
  const [active, setActive] = useState<{ side: Side; i: number } | null>(null)

  const isLive = (side: Side, i: number) =>
    active !== null && active.side === side && active.i === i

  const caption = active
    ? (active.side === 'left' ? systemsLeft : systemsRight)[active.i].feeds
    : joined
      ? 'One connection per system. One record they all agree with.'
      : 'Nine handovers between six systems, and every one of them is a person.'

  const item = (side: Side, i: number, name: string, feeds: string) => (
    <button
      key={name}
      type="button"
      className={`c4-fig__item${side === 'right' ? ' c4-fig__item--r' : ''}`}
      aria-pressed={isLive(side, i)}
      data-feeds={feeds}
      data-side={side}
      data-i={i}
      onMouseEnter={() => setActive({ side, i })}
      onMouseLeave={() => setActive(null)}
      onFocus={() => setActive({ side, i })}
      onBlur={() => setActive(null)}
      onClick={() => setActive(isLive(side, i) ? null : { side, i })}
    >
      <span className="dot" aria-hidden="true" />
      {name}
    </button>
  )

  return (
    <figure className={`c4-fig${active ? ' is-focused' : ''}`} data-reveal>
      <div className="c4-fig__head">
        <p className="c4-label">Fig. 01 · Six systems, before and after</p>
        <div className="c4-seg" role="group" aria-label="Figure state">
          <button
            type="button"
            className="c4-seg__btn"
            aria-pressed={!joined}
            onClick={() => setJoined(false)}
          >
            Today
          </button>
          <button
            type="button"
            className="c4-seg__btn"
            aria-pressed={joined}
            onClick={() => setJoined(true)}
          >
            Connected
          </button>
        </div>
      </div>

      <div className="c4-fig__labels">
        <p className="c4-label">What you already run</p>
        <p className="c4-label c4-count">{joined ? 'One layer' : 'Nine handovers'}</p>
      </div>

      <div className="c4-fig__body">
        <div className="c4-fig__col c4-fig__col--in">
          {systemsLeft.map((s, i) => item('left', i, s.name, s.feeds))}
        </div>

        <div className="c4-fig__spine">
          <svg
            className="c4-fig__wires"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            {joined ? (
              <>
                {YS.map((y, i) => (
                  <path
                    key={`l${i}`}
                    d={joinLeft(y)}
                    className={`c4-wire${isLive('left', i) ? ' is-live' : ''}`}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                {YS.map((y, i) => (
                  <path
                    key={`r${i}`}
                    d={joinRight(y)}
                    className={`c4-wire${isLive('right', i) ? ' is-live' : ''}`}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </>
            ) : (
              TANGLE.map((w, k) => (
                <path
                  key={k}
                  d={w.d}
                  className={`c4-wire${
                    isLive('left', w.left) || isLive('right', w.right) ? ' is-live' : ''
                  }`}
                  vectorEffect="non-scaling-stroke"
                />
              ))
            )}
          </svg>
          <span className={`c4-fig__amp${joined ? '' : ' is-off'}`} aria-hidden="true">
            &amp;
          </span>
        </div>

        <div className="c4-fig__col c4-fig__col--out">
          {systemsRight.map((s, i) => item('right', i, s.name, s.feeds))}
        </div>
      </div>

      <figcaption className="c4-fig__cap">
        <p className="c4-label" aria-live="polite">
          {caption}
        </p>
        <p className="c4-label">Illustrative · your systems, named in the audit</p>
      </figcaption>

      {/* The non-visual equivalent. Not an alt attribute: the same information,
          as text, for anyone who is not reading the drawing. */}
      <div className="c4-sr">
        <h3>What the figure shows</h3>
        <p>
          {joined
            ? 'Connected: each of the six systems holds one connection, to a single layer that keeps one shared record.'
            : 'Today: six systems, each one wired to the others by a person carrying information between them, which is nine handovers in all.'}
        </p>
        <ul>
          {[...systemsLeft, ...systemsRight].map((s) => (
            <li key={s.id}>
              {s.name}: {s.feeds}.
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}
