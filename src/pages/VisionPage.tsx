/** @fileoverview Presents the company's long-term vision, principles, and direction statements. */

import { Icon } from '../components/Icon'
import { InteriorLayout, PageHeader, SectionHeading } from '../components/PageHeader'
import { principles, siteContent } from '../data/content'

/** Presents the long-term vision, principles, and complementary direction statements. */
export function VisionPage() {
  return (
    <InteriorLayout>
      <PageHeader
        eyebrow="Purpose and direction"
        title="Vision"
        description="A shared picture of where we are going, why it matters, and the principles that help every team move with confidence."
        icon="target"
      />

      <section className="vision-statement-card">
        <div className="relative z-10 max-w-3xl">
          <p className="eyebrow text-violet-200">Our long-term vision</p>
          <p className="mt-4 text-2xl font-medium leading-[1.45] tracking-[-0.03em] text-white sm:text-3xl">
            “{siteContent.visionStatement}”
          </p>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="How we show up" title="Our principles" text="Simple commitments that help turn ambition into everyday decisions." />
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((principle) => (
            <article key={principle.title} className="content-card flex gap-4 p-5 sm:p-6">
              <span className="feature-icon accent-violet"><Icon name={principle.icon} className="h-5 w-5" /></span>
              <div>
                <h3 className="font-semibold text-white">{principle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{principle.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          ['Mission', 'Create practical value for customers and communities through work that is responsible, relevant, and built to last.'],
          ['North star', 'Be the company people trust to solve important problems with clarity, care, and consistent execution.'],
          ['2030 direction', 'Lead in customer experience, responsible innovation, and the quality of the workplace we create together.'],
        ].map(([title, text]) => (
          <article key={title} className="content-card p-6">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">{title}</span>
            <p className="mt-4 text-[15px] leading-7 text-slate-300">{text}</p>
          </article>
        ))}
      </section>
    </InteriorLayout>
  )
}
