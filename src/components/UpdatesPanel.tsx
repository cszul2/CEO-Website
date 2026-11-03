import { Link } from 'react-router-dom'
import { updates } from '../data/content'
import { Icon } from './Icon'

/** Shows the three newest leadership updates in a standalone or embedded panel. */
export function UpdatesPanel({ embedded = false }: { embedded?: boolean }) {
  return (
    <aside className={embedded ? '' : 'updates-panel'} aria-labelledby="updates-heading">
      <div className="mb-2 flex items-center justify-between gap-4">
        <h2 id="updates-heading" className="text-xl font-semibold tracking-[-0.03em] text-white">Updates</h2>
        <Link to="/updates" className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-300 hover:text-violet-200">
          View All <Icon name="arrow" className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div>
        {updates.slice(0, 3).map((update) => (
          <Link key={update.id} to={`/updates#${update.id}`} className="update-row">
            <span className={`update-icon accent-${update.accent}`}>
              <Icon name={update.type === 'CEO Update' ? 'play' : update.type === 'Policy' ? 'file' : update.type === 'Strategy' ? 'layers' : 'megaphone'} className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-semibold leading-[1.35] text-slate-100">{update.title}</span>
              <span className="mt-1 block text-[11px] text-slate-400">{update.date}{update.duration ? ` · ${update.duration}` : ''}</span>
            </span>
          </Link>
        ))}
      </div>
    </aside>
  )
}
