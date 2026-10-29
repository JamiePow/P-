'use client'

/*
  The arithmetic.

  Not a savings calculator. It takes one number the visitor already knows, or
  can guess within an hour, and does the multiplication they have never
  bothered to do. Both inputs are theirs to move, both assumptions are printed
  under the figures, and the result is labelled illustrative, because the
  audit is what produces a real one.
*/

import { useId, useState } from 'react'
import { calc } from '@/lib/c04'

export default function ValueCalc() {
  const [hours, setHours] = useState(calc.defaultHours)
  const [share, setShare] = useState(calc.defaultShare)
  const idH = useId()
  const idS = useId()

  const perYear = hours * calc.weeksPerYear
  const days = Math.round(perYear / calc.hoursPerDay)
  const returned = Math.round((days * share) / 100)

  return (
    <div className="c4-calc" data-reveal>
      <div className="c4-calc__controls">
        <div className="c4-field">
          <label className="c4-label" htmlFor={idH}>
            Hours a week spent moving information between systems
          </label>
          <div className="c4-field__row">
            <input
              id={idH}
              type="range"
              min={2}
              max={40}
              step={1}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
            />
            <output htmlFor={idH} className="c4-field__out">
              {hours}h
            </output>
          </div>
        </div>

        <div className="c4-field">
          <label className="c4-label" htmlFor={idS}>
            Share of that which could run without a person
          </label>
          <div className="c4-field__row">
            <input
              id={idS}
              type="range"
              min={0}
              max={90}
              step={5}
              value={share}
              onChange={(e) => setShare(Number(e.target.value))}
            />
            <output htmlFor={idS} className="c4-field__out">
              {share}%
            </output>
          </div>
        </div>

        <p className="c4-calc__assume">{calc.assumptions}</p>
      </div>

      <div className="c4-calc__figures" aria-live="polite">
        <div>
          <p className="c4-label">Hours a year</p>
          <p className="c4-calc__fig">{perYear.toLocaleString('en-GB')}</p>
        </div>
        <div>
          <p className="c4-label">Working days a year</p>
          <p className="c4-calc__fig">{days}</p>
        </div>
        <div>
          <p className="c4-label c4-label--red">Days that could come back</p>
          <p className="c4-calc__fig c4-calc__fig--accent">{returned}</p>
        </div>
      </div>

      <p className="c4-calc__caveat">{calc.caveat}</p>
    </div>
  )
}
