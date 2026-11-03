import { InteriorLayout, PageHeader, SectionHeading } from '../components/PageHeader'
import { team } from '../data/content'

/** Displays the sample Office of the CEO team roster. */
export function TeamPage() {
  return (
    <InteriorLayout>
      <PageHeader
        eyebrow="Leadership and support"
        title="Our Team"
        description="The Office of the CEO connects company direction, operating priorities, communication, and cross-company leadership forums."
        icon="users"
      />
      <section>
        <SectionHeading title="Office of the CEO" text="Names and roles below are fictional sample content for the prototype." />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {team.map((member) => (
            <article key={member.name} className="content-card p-5 sm:p-6">
              <div className={`team-avatar accent-${member.accent}`}>{member.initials}</div>
              <h2 className="mt-5 text-lg font-semibold text-white">{member.name}</h2>
              <p className="mt-1 text-sm font-medium text-violet-300">{member.role}</p>
              <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-slate-500">{member.focus}</p>
            </article>
          ))}
        </div>
      </section>
    </InteriorLayout>
  )
}
