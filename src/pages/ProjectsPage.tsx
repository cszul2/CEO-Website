import { Icon } from '../components/Icon'
import { InteriorLayout, PageHeader, SectionHeading } from '../components/PageHeader'
import { projects } from '../data/content'

/** Displays the portfolio view of strategic initiatives and their sample progress. */
export function ProjectsPage() {
  return (
    <InteriorLayout>
      <PageHeader
        eyebrow="Strategy in motion"
        title="Priority Projects"
        description="A portfolio-level view of major initiatives connected to our enterprise strategy. Progress figures are illustrative."
        icon="rocket"
      />
      <section>
        <SectionHeading title="Enterprise initiatives" text="Shared visibility helps teams understand where work connects and where dependencies need attention." />
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="content-card p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="feature-icon accent-blue"><Icon name="rocket" className="h-5 w-5" /></span>
                <span className={`status-chip ${project.status === 'On track' ? 'status-active' : ''}`}>{project.status}</span>
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-white">{project.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{project.text}</p>
              <p className="mt-4 text-xs text-slate-600">Accountable group · {project.owner}</p>
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs"><span className="text-slate-500">Illustrative progress</span><span className="font-semibold text-slate-300">{project.progress}%</span></div>
                <div className="progress-track"><span style={{ width: `${project.progress}%` }} /></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </InteriorLayout>
  )
}
