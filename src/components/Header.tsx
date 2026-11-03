import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { searchIndex } from '../data/content'
import { Icon } from './Icon'
import { Logo } from './Logo'

interface HeaderProps {
  onMenuClick: () => void
}

/** Provides the global search, notifications, and mobile-menu control. */
export function Header({ onMenuClick }: HeaderProps) {
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const results = query.trim().length > 1
    ? searchIndex
        .filter((item) => `${item.title} ${item.text} ${item.type}`.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 7)
    : []

  useEffect(() => {
    // Reset transient controls after navigation so they cannot obscure the new page.
    setSearchOpen(false)
    setQuery('')
    setNoticeOpen(false)
  }, [location.pathname])

  useEffect(() => {
    // Close the search panel when a pointer event occurs outside its container.
    const handleOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  return (
    <header className="app-header">
      <div className="flex h-full items-center gap-3 px-4 sm:px-5">
        <button className="icon-button lg:hidden" type="button" onClick={onMenuClick} aria-label="Open navigation">
          <Icon name="menu" className="h-5 w-5" />
        </button>
        <Link to="/" aria-label="Office of the CEO home" className="shrink-0">
          <Logo />
        </Link>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div ref={searchRef} className="relative hidden sm:block">
            <label className="global-search">
              <Icon name="search" className="h-[17px] w-[17px] shrink-0 text-slate-400" />
              <span className="sr-only">Search the Office of the CEO</span>
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setSearchOpen(true)
                }}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setSearchOpen(false)
                }}
                placeholder="Search the OCEO"
              />
            </label>
            {searchOpen && query.trim().length > 1 && (
              <div className="search-results" role="listbox" aria-label="Search results">
                <div className="mb-2 flex items-center justify-between px-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Results</span>
                  <span className="text-xs text-slate-500">{results.length} found</span>
                </div>
                {results.length > 0 ? results.map((result) => (
                  <Link key={`${result.type}-${result.title}`} to={result.path} className="search-result" role="option">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-slate-100">{result.title}</span>
                      <span className="mt-1 block truncate text-xs text-slate-500">{result.text}</span>
                    </span>
                    <span className="result-type">{result.type}</span>
                  </Link>
                )) : (
                  <p className="px-2 py-5 text-center text-sm text-slate-400">No matching content found.</p>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className="icon-button relative"
              type="button"
              aria-label="View notifications"
              aria-expanded={noticeOpen}
              onClick={() => setNoticeOpen((open) => !open)}
            >
              <Icon name="bell" className="h-5 w-5" />
              <span className="notification-dot" />
            </button>
            {noticeOpen && (
              <div className="notification-card">
                <p className="text-sm font-semibold text-white">You’re up to date</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">The latest CEO update is available on the Updates page.</p>
                <Link to="/updates" className="mt-3 inline-flex text-xs font-semibold text-violet-300 hover:text-violet-200">View updates</Link>
              </div>
            )}
          </div>

          <button className="avatar" type="button" aria-label="Open employee profile">
            <span>JD</span>
          </button>
        </div>
      </div>
    </header>
  )
}
