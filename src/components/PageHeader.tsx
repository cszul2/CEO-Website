/** @fileoverview Supplies shared layout and heading primitives for interior pages. */

import type { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow: string
  title: string
  description: string
  icon: string
  children?: ReactNode
}

/** Renders the reusable title area for an interior page. */
export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header-orb page-header-orb-one" />
      <div className="page-header-orb page-header-orb-two" />
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl lg:text-[2.75rem]">{title}</h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-300 sm:text-base">{description}</p>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  )
}

/** Constrains an interior page to the shared content width and spacing. */
export function InteriorLayout({ children }: { children: ReactNode }) {
  return <div className="interior-page">{children}</div>
}

/** Renders a consistent heading and optional supporting copy for a section. */
export function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="mb-5">
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 className="text-2xl font-semibold tracking-[-0.035em] text-white">{title}</h2>
      {text && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{text}</p>}
    </div>
  )
}
