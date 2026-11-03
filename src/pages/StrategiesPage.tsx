import { Icon } from '../components/Icon'
import { InteriorLayout, PageHeader, SectionHeading } from '../components/PageHeader'
import { strategies } from '../data/content'

export function StrategiesPage() {
  return (
    <InteriorLayout>
      <PageHeader
        eyebrow="From direction to action"
        title="Strategies"
        description="Four connected choices focus our energy on the outcomes that matter most for customers, employees, and long-term performance."
        icon="layers"
      >
        <div className="flex flex-wrap gap-2">
          {['Customer-led', 'Focused growth', 'Modern foundations', 'People-powered'].map((tag) => <span key={tag} className="tag">{tag}</span>)}
        </div>
      </PageHeader>

      <section>
        <SectionHeading eyebrow="Strategic pillars" title="Our enterprise priorities" text="Each pillar has clear outcomes, accountable owners, and measurable signals of progress." />
        <div className="grid gap-4 md:grid-cols-2">
          {strategies.map((strategy) => (
            <article key={strategy.number} className={`strategy-card accent-${strategy.accent}`}>
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-semibold text-current">{strategy.number}</span>
                <Icon name="arrow" className="h-4 w-4 text-slate-500" />
              </div>
              <h3 className="mt-8 text-xl font-semibold tracking-[-0.03em] text-white">{strategy.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{strategy.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-card p-6 sm:p-7">
        <SectionHeading title="How priorities connect" text="Shared measures keep local decisions aligned without prescribing a single way of working." />
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            ['Customer', 'Trust, adoption, ease'],
            ['Business', 'Focused growth, resilience'],
            ['People', 'Clarity, capability, belonging'],
          ].map(([title, text], index) => (
            <div key={title} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-400/10 text-xs font-bold text-violet-300">{index + 1}</span>
              <div><h3 className="text-sm font-semibold text-white">{title}</h3><p className="mt-1 text-sm text-slate-500">{text}</p></div>
            </div>
          ))}
        </div>
      </section>
    </InteriorLayout>
  )
}
