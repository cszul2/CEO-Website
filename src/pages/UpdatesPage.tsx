import { useState } from 'react'
import { Icon } from '../components/Icon'
import { InteriorLayout, PageHeader } from '../components/PageHeader'
import { updates } from '../data/content'

/** Update categories selectable in the leadership feed. */
const types = ['All', 'CEO Update', 'Strategy', 'Policy', 'Announcement']

/** Filters leadership updates and expands one detail panel at a time. */
export function UpdatesPage() {
  const [type, setType] = useState('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const visible = type === 'All' ? updates : updates.filter((update) => update.type === type)

  return (
    <InteriorLayout>
      <PageHeader
        eyebrow="Stay connected"
        title="Leadership Updates"
        description="CEO communications, company announcements, and leadership context in one clear, accessible feed."
        icon="megaphone"
      >
        <div className="flex flex-wrap gap-2" aria-label="Filter updates by type">
          {types.map((item) => (
            <button key={item} type="button" className={`filter-chip ${type === item ? 'filter-chip-active' : ''}`} aria-pressed={type === item} onClick={() => setType(item)}>
              {item}
            </button>
          ))}
        </div>
      </PageHeader>

      <section className="space-y-4" aria-live="polite">
        {visible.map((update, index) => (
          <article key={update.id} id={update.id} className="content-card scroll-mt-24 overflow-hidden">
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:p-6">
              <span className={`feature-icon accent-${update.accent} h-12 w-12`}>
                <Icon name={update.type === 'CEO Update' ? 'play' : update.type === 'Strategy' ? 'layers' : update.type === 'Policy' ? 'file' : 'megaphone'} className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="tag">{update.type}</span>
                  <span>{update.date}</span>
                  {update.duration && <span>· {update.duration}</span>}
                </div>
                <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">{update.title}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{update.summary}</p>
                <button
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-violet-200"
                  type="button"
                  aria-expanded={expandedId === update.id}
                  onClick={() => setExpandedId((current) => current === update.id ? null : update.id)}
                >
                  {expandedId === update.id ? 'Show less' : index === 0 ? 'Open update' : 'Read more'} <Icon name="arrow" className={`h-4 w-4 transition-transform ${expandedId === update.id ? 'rotate-90' : ''}`} />
                </button>
                {expandedId === update.id && (
                  <div className="mt-5 max-w-3xl border-t border-white/10 pt-5 text-sm leading-7 text-slate-300">
                    <p>
                      This sample detail view demonstrates how a full communication can expand in place. Replace this text with approved content, a recording, or a link to the authoritative source.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </InteriorLayout>
  )
}
