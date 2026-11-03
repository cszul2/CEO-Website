/** @fileoverview Defines the category-filterable collection of shared company resources. */

import { useState } from 'react'
import { Icon } from '../components/Icon'
import { InteriorLayout, PageHeader } from '../components/PageHeader'
import { resources } from '../data/content'

/** Filters shared resources by category and presents the matching cards. */
export function ResourcesPage() {
  const categories = ['All', ...Array.from(new Set(resources.map((resource) => resource.category)))]
  const [category, setCategory] = useState('All')
  const visible = category === 'All' ? resources : resources.filter((resource) => resource.category === category)

  return (
    <InteriorLayout>
      <PageHeader
        eyebrow="Tools for shared context"
        title="Resources"
        description="Company-wide materials that help teams communicate consistently, plan clearly, and connect their work to the strategy."
        icon="folder"
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => <button key={item} type="button" className={`filter-chip ${category === item ? 'filter-chip-active' : ''}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
      </PageHeader>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-live="polite">
        {visible.map((resource) => (
          <article key={resource.title} className="content-card group flex min-h-60 flex-col p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <span className="feature-icon accent-green"><Icon name={resource.icon} className="h-5 w-5" /></span>
              <Icon name="arrow" className="h-4 w-4 text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-slate-300" />
            </div>
            <span className="mt-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300">{resource.category}</span>
            <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-white">{resource.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{resource.text}</p>
          </article>
        ))}
      </section>
      <div className="demo-note">Resource cards are presentation-only in this prototype. Connect each card to an approved document or intranet destination before launch.</div>
    </InteriorLayout>
  )
}
