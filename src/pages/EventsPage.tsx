/** @fileoverview Defines the events page and its session-local event-saving interaction. */

import { useState } from 'react'
import { Icon } from '../components/Icon'
import { InteriorLayout, PageHeader, SectionHeading } from '../components/PageHeader'
import { events } from '../data/content'

/** Lists upcoming events and tracks locally saved selections for the current session. */
export function EventsPage() {
  const [saved, setSaved] = useState<string[]>([])

  return (
    <InteriorLayout>
      <PageHeader
        eyebrow="Meet, listen, participate"
        title="Events"
        description="Town halls, leadership conversations, and opportunities to learn with colleagues across the company."
        icon="calendar"
      />
      <section>
        <SectionHeading eyebrow="Coming up" title="Company-wide events" text="Times are shown in UTC for this prototype." />
        <div className="space-y-4">
          {events.map((event) => {
            const isSaved = saved.includes(event.title)
            return (
              <article key={event.title} className="content-card flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
                <div className="event-date">
                  <span className="text-[11px] font-bold tracking-[0.15em] text-violet-300">{event.month}</span>
                  <span className="text-2xl font-semibold text-white">{event.day}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500"><span>{event.time}</span><span>·</span><span>{event.format}</span></div>
                  <h2 className="mt-1.5 text-lg font-semibold text-white">{event.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{event.description}</p>
                </div>
                <button className={isSaved ? 'secondary-button text-emerald-300' : 'secondary-button'} type="button" onClick={() => setSaved((current) => isSaved ? current.filter((item) => item !== event.title) : [...current, event.title])}>
                  <Icon name={isSaved ? 'check' : 'calendar'} className="h-4 w-4" />
                  {isSaved ? 'Saved' : 'Save event'}
                </button>
              </article>
            )
          })}
        </div>
      </section>
      {saved.length > 0 && <div className="demo-note" role="status">Saved locally for this browser session. No calendar integration is connected in the prototype.</div>}
    </InteriorLayout>
  )
}
