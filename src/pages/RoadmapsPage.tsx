import { InteriorLayout, PageHeader, SectionHeading } from '../components/PageHeader'
import { roadmap } from '../data/content'

export function RoadmapsPage() {
  return (
    <InteriorLayout>
      <PageHeader
        eyebrow="The path ahead"
        title="Enterprise Roadmap"
        description="A directional view of major phases and shared milestones. Individual programs maintain more detailed delivery plans."
        icon="map"
      />
      <section>
        <SectionHeading eyebrow="2026–2028" title="Building momentum in stages" text="The roadmap is designed to make sequencing and dependencies visible across the organization." />
        <div className="roadmap-line">
          {roadmap.map((item, index) => (
            <article key={item.period} className="roadmap-item">
              <div className={`roadmap-marker ${index === 0 ? 'roadmap-marker-active' : ''}`}><span>{index + 1}</span></div>
              <div className="content-card p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-300">{item.period}</span>
                  <span className={`status-chip ${index === 0 ? 'status-active' : ''}`}>{item.status}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em] text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="demo-note">
        <span className="font-semibold text-slate-200">Prototype note:</span>
        Roadmap dates and milestones are sample content. Replace them in the central content file with approved company plans.
      </div>
    </InteriorLayout>
  )
}
