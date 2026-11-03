import { useEffect, useState } from 'react'
import { Icon } from '../components/Icon'
import { InteriorLayout, PageHeader } from '../components/PageHeader'

/** Lifecycle states supplied by the policy API. */
type PolicyStatus = 'Active' | 'Expiring soon' | 'Expired'

/** A policy record returned by the local policy API. */
interface PolicyRecord {
  id: string
  name: string
  description: string
  signed_on: string
  expires_on: string
  status: PolicyStatus
  document_url: string
}

/** Status options available in the policy-register filter. */
const statusFilters: Array<'All' | PolicyStatus> = ['All', 'Active', 'Expiring soon', 'Expired']

/**
 * Formats an ISO calendar date in UTC to avoid a viewer's time zone changing its day.
 *
 * @param value - A date in `YYYY-MM-DD` format.
 * @returns A human-readable UTC date.
 */
function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`))
}

/** Converts an API policy status into the corresponding status-chip CSS class. */
function statusClass(status: PolicyStatus) {
  return `status-${status.toLowerCase().replace(' ', '-')}`
}

/** Fetches, filters, and displays policy records from the local API. */
export function PoliciesPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'All' | PolicyStatus>('All')
  const [policies, setPolicies] = useState<PolicyRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    // Debounce filter changes so rapid typing does not issue a request per keystroke.
    const requestDelay = window.setTimeout(async () => {
      const parameters = new URLSearchParams()
      if (query.trim()) parameters.set('q', query.trim())
      if (status !== 'All') parameters.set('status', status)

      setLoading(true)
      setError(null)

      try {
        const queryString = parameters.toString()
        const response = await fetch(`/api/policies${queryString ? `?${queryString}` : ''}`, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        })
        if (!response.ok) throw new Error(`Policy API returned ${response.status}`)
        const records = await response.json() as PolicyRecord[]
        setPolicies(records)
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return
        setPolicies([])
        setError('Policy records are temporarily unavailable. Confirm the local API is running and try again.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }, 200)

    return () => {
      // Cancel both the scheduled and active requests when inputs change or the page unmounts.
      window.clearTimeout(requestDelay)
      controller.abort()
    }
  }, [query, refreshKey, status])

  return (
    <InteriorLayout>
      <PageHeader
        eyebrow="Principles in practice"
        title="Policies and Guidance"
        description="Clear expectations, practical guidance, and shared standards to help teams make consistent decisions with confidence."
        icon="policy"
      />

      <section className="content-card p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="page-search">
            <Icon name="search" className="h-4 w-4 text-slate-500" />
            <span className="sr-only">Search policies</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search policies and guidance" />
          </label>
          <div className="flex flex-wrap gap-2" aria-label="Filter by document status">
            {statusFilters.map((item) => (
              <button
                key={item}
                type="button"
                className={`filter-chip ${status === item ? 'filter-chip-active' : ''}`}
                aria-pressed={status === item}
                onClick={() => setStatus(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="content-card overflow-hidden" aria-live="polite" aria-busy={loading}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-white">Policy register</h2>
            <p className="mt-1 text-xs text-slate-500">Live records from the policy database</p>
          </div>
          {!loading && !error && <span className="tag">{policies.length} {policies.length === 1 ? 'document' : 'documents'}</span>}
        </div>

        {error ? (
          <div className="p-10 text-center">
            <p className="font-medium text-white">Unable to load policies</p>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">{error}</p>
            <button type="button" className="filter-chip mt-5" onClick={() => setRefreshKey((key) => key + 1)}>Try again</button>
          </div>
        ) : (
          <div className="policy-table-wrap">
            <table className="policy-table">
              <caption className="sr-only">Policies and guidance documents from the SQL policy database</caption>
              <thead>
                <tr>
                  <th scope="col">UUIDv4</th>
                  <th scope="col">Policy or guidance</th>
                  <th scope="col">Description</th>
                  <th scope="col">Signed</th>
                  <th scope="col">Expires</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="policy-table-message">Loading policy records…</td>
                  </tr>
                ) : policies.length > 0 ? policies.map((policy) => (
                  <tr key={policy.id}>
                    <td><code className="policy-uuid">{policy.id}</code></td>
                    <td>
                      <a className="policy-link" href={policy.document_url} target="_blank" rel="noreferrer">
                        <span>{policy.name}</span>
                        <Icon name="arrow" className="h-3.5 w-3.5 shrink-0" />
                      </a>
                    </td>
                    <td className="policy-description">{policy.description}</td>
                    <td className="policy-date"><time dateTime={policy.signed_on}>{formatDate(policy.signed_on)}</time></td>
                    <td className="policy-date"><time dateTime={policy.expires_on}>{formatDate(policy.expires_on)}</time></td>
                    <td><span className={`status-chip ${statusClass(policy.status)}`}>{policy.status}</span></td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="policy-table-message">No policies match the current search and status filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </InteriorLayout>
  )
}
