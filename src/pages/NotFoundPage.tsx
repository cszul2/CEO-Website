/** @fileoverview Provides the fallback page and recovery link for unmatched routes. */

import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'

/** Provides a recovery path when no route matches the requested URL. */
export function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center px-5 py-16 text-center">
      <div>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300"><Icon name="help" className="h-6 w-6" /></div>
        <p className="eyebrow mt-6">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">Page not found</h1>
        <p className="mt-3 text-sm text-slate-400">The page you’re looking for isn’t part of this prototype.</p>
        <Link to="/" className="primary-button mt-6">Return home <Icon name="arrow" className="h-4 w-4" /></Link>
      </div>
    </div>
  )
}
