'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { pillars } from '@/lib/data'

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
      <div className="rule pt-10">
        <p className="font-display text-3xl">Thank you.</p>
        <p className="mt-4 max-w-prose text-muted">
          Your enquiry has reached us. We read everything that comes in and reply within one working
          day.
        </p>
      </div>
    )
  }

  const field =
    'mt-2 w-full border-b border-hairline bg-transparent pb-3 font-sans text-base outline-none transition-colors duration-300 ease-brand focus:border-accent aria-[invalid=true]:border-accent disabled:cursor-not-allowed disabled:opacity-55'
  const label = 'font-mono text-[10px] uppercase tracking-label text-muted'
  const hint = 'mt-2 font-sans text-sm text-ink'

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
    <form onSubmit={onSubmit} noValidate className="rule pt-10">
      {!enabled ? (
        <div className="mb-9 border-l-2 border-accent pl-5" id="enquiries-closed">
          <p className="font-mono text-[10px] uppercase tracking-label text-muted">
            Enquiries are not open yet
          </p>
          <p className="mt-3 max-w-prose font-sans text-sm">
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
        className={status === 'error' && message ? 'mb-9 border-l-2 border-accent pl-5' : 'sr-only'}
      >
        {status === 'error' && message ? (
          <p className="font-sans text-sm">
            {message}
            {fallbackEmail ? (
              <>
                {' '}
                <a href={`mailto:${fallbackEmail}`} className="border-b border-accent">
                  {fallbackEmail}
                </a>
              </>
            ) : null}
          </p>
        ) : null}
      </div>

      <fieldset disabled={!enabled} aria-describedby={!enabled ? 'enquiries-closed' : undefined} className="contents">
      <div className="grid gap-9 sm:grid-cols-2">
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
          <select className={field} id="pillar" name="pillar" defaultValue={pillars[2].slug}>
            {pillars.map((pillar) => (
              <option key={pillar.slug} value={pillar.slug}>
                {pillar.name}
              </option>
            ))}
            <option value="other">Something else</option>
          </select>
        </div>
      </div>

      <div className="mt-9">
        <label className={label} htmlFor="message">
          The project, in a few lines
        </label>
        <textarea
          className={`${field} resize-none`}
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
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      </fieldset>

      <button
        type="submit"
        disabled={!enabled || status === 'sending'}
        aria-busy={status === 'sending'}
        className="group mt-10 inline-flex items-center gap-3 border-b border-accent pb-2 font-mono text-[11px] uppercase tracking-label disabled:cursor-wait disabled:opacity-50"
      >
        {!enabled ? 'Enquiries not open yet' : status === 'sending' ? 'Sending' : 'Send it over'}
        <span className="transition-transform duration-300 ease-brand group-hover:translate-x-1">
          &rarr;
        </span>
      </button>
    </form>
  )
}
