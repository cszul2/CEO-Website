/** @fileoverview Renders the home page's featured destination cards from shared content data. */

import { Link } from 'react-router-dom'
import { homeCards } from '../data/content'
import { Icon } from './Icon'

/** Displays the featured navigation cards on the home page. */
export function HomeCards() {
  return (
    <section aria-labelledby="explore-title">
      <div className="sr-only" id="explore-title">Explore the Office of the CEO</div>
      <div className="home-card-grid">
        {homeCards.map((card) => (
          <Link key={card.title} to={card.path} className={`home-card accent-${card.accent}`}>
            <span className="home-card-icon">
              <Icon name={card.icon} className="h-8 w-8" strokeWidth={1.7} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[17px] font-semibold tracking-[-0.025em] text-white">{card.title}</span>
              <span className="mt-1.5 block text-[12px] leading-[1.45] text-slate-300">{card.description}</span>
            </span>
            <Icon name="arrow" className="mt-1 h-4 w-4 shrink-0 text-slate-200 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  )
}
