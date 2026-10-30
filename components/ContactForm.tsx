'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { enquiryOptions } from '@/lib/c04'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Errors = Record<string, string>

/*
  The form posts to our own endpoint and reports exactly what the server
  said. There is no branch anywhere in this file that shows the thank you
  without a 200 from /api/enquiry. The previous version had one, and it
  reported success to every visitor while delivering nothing.
*/

const ENDPOINT = '/api/enquiry'

export default function ContactForm({
  fallbackEmail = null,
  enabled = true,
}: {
  fallbackEmail?: string | null
  /* False when no delivery target is configured. The fields are shown and
     disabled rather than hidden, so the page still reads as a contact page
     and the design is intact, and nothing can be submitted. */
  enabled?: boolean
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const started = useRef<number>(0)
  const firstInvalid = useRef<string | null>(null)
  const summary = useRef<HTMLDivElement>(null)

  useEffect(() => {
    started.current = Date.now()
  }, [])

  /* The same rules the server applies, so the visitor is not sent to the
     network to be told about an empty field. The server is still the
     authority; this only saves a round trip. */
  function check(data: Record<string, string>): Errors {
    const e: Errors = {}
    if (!data.name?.trim()) e.name = 'Please add your name.'
    if (!data.email?.trim()) e.email = 'Please add an email address so we can reply.'
    else if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(data.email.trim()))
      e.email = 'That email address does not look right.'
    if (!data.message?.trim()) e.message = 'Please tell us a little about the project.'
    else if (data.message.trim().length < 12)
      e.message = 'A line or two more would help us reply usefully.'
    return e
  }

  function focusFirstError(e: Errors) {
    const field = ['name', 'email', 'message'].find((k) => e[k])
    firstInvalid.current = field ?? null
    if (field) document.getElementById(field)?.focus()
    else summary.current?.focus()
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!enabled) return
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    const local = check(data)
    if (Object.keys(local).length) {
      setErrors(local)
      setStatus('error')
      setMessage('Some details need another look.')
      focusFirstError(local)
      return
    }

    setStatus('sending')
    setErrors({})
    setMessage(null)

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          type: data.pillar,
          message: data.message,
          website: data.website,
          elapsed: Date.now() - started.current,
          referer: typeof document !== 'undefined' ? document.referrer : '',
          page: typeof location !== 'undefined' ? location.pathname : '',
        }),
      })

      let body: { ok?: boolean; message?: string; errors?: Errors } = {}
      try {
        body = await res.json()
      } catch {
        /* a response we cannot read is a failure, not a success */
      }

      if (res.ok && body.ok) {
        setStatus('sent')
        form.reset()
        return
      }

      setErrors(body.errors ?? {})
      setMessage(
        body.message ??
          (fallbackEmail
            ? 'We could not deliver that just now. Please email us directly and we will pick it up from there.'
            : 'We could not deliver that just now. Please try again shortly.'),
      )
      setStatus('error')
      if (body.errors) focusFirstError(body.errors)
      else summary.current?.focus()
    } catch {
      setMessage(
        fallbackEmail
          ? 'We could not reach the server. Please check your connection, or email us directly and we will pick it up from there.'
          : 'We could not reach the server. Please check your connection and try again.',
      )
      setStatus('error')
      summary.current?.focus()
    }
  }

  if (status === 'sent') {
    return (
      <div className="c4-thanks" role="status">
        <p className="c4-thanks__h">Thank you.</p>
        <p>
          Your enquiry has reached us. We read everything that comes in and reply within one working
          day.
        </p>
      </div>
    )
  }

  const field = 'c4-input'
  const label = 'c4-label'
  const hint = 'c4-form__err'

  const err = (k: string) =>
    errors[k] ? (
      <p className={hint} id={`${k}-error`}>
        {errors[k]}
      </p>
    ) : null
  const props = (k: string) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  })

  return (
    <form onSubmit={onSubmit} noValidate className="c4-form">
      {!enabled ? (
        <div className="c4-form__notice" id="enquiries-closed">
          <p className="c4-label">Enquiries are not open yet</p>
          <p className="c4-small">
            The enquiry mailbox is still being set up, so this form cannot be sent and has been
            disabled. It is shown here so the page can be reviewed as it will work. Nothing typed
            into it would reach us.
          </p>
        </div>
      ) : null}
      {/* Announced the moment it appears, and focusable so the keyboard
          lands on the explanation rather than back at the top of the form. */}
      <div
        ref={summary}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className={status === 'error' && message ? 'c4-form__notice' : 'c4-sr'}
      >
        {status === 'error' && message ? (
          <p className="c4-small">
            {message}
            {fallbackEmail ? (
              <>
                {' '}
                <a href={`mailto:${fallbackEmail}`} className="c4-form__mail">
                  {fallbackEmail}
                </a>
              </>
            ) : null}
          </p>
        ) : null}
      </div>

      <fieldset disabled={!enabled} aria-describedby={!enabled ? 'enquiries-closed' : undefined} className="contents">
      <div className="c4-form__grid">
        <div>
          <label className={label} htmlFor="name">
            Your name
          </label>
          <input className={field} id="name" name="name" type="text" autoComplete="name" required {...props('name')} />
          {err('name')}
        </div>
        <div>
          <label className={label} htmlFor="email">
            Email
          </label>
          <input className={field} id="email" name="email" type="email" autoComplete="email" required {...props('email')} />
          {err('email')}
        </div>
        <div>
          <label className={label} htmlFor="company">
            Company
          </label>
          <input className={field} id="company" name="company" type="text" autoComplete="organization" />
        </div>
        <div>
          <label className={label} htmlFor="pillar">
            What it concerns
          </label>
          <select className={field} id="pillar" name="pillar" defaultValue="operations">
            {enquiryOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="c4-form__msg">
        <label className={label} htmlFor="message">
          The project, in a few lines
        </label>
        <textarea
          className={field}
          id="message"
          name="message"
          rows={5}
          required
          {...props('message')}
        />
        {err('message')}
      </div>

      {/* Hidden from people, from screen readers and from the tab order.
          Anything that fills it in is not a visitor. */}
      <div aria-hidden="true" className="c4-form__hp">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      </fieldset>

      <button
        type="submit"
        disabled={!enabled || status === 'sending'}
        aria-busy={status === 'sending'}
        className="c4-btn c4-form__send"
      >
        {!enabled ? 'Enquiries not open yet' : status === 'sending' ? 'Sending' : 'Send it over'}
      </button>
    </form>
  )
}
