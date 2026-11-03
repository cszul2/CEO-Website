import { AskCeoForm } from '../components/AskCeoForm'
import { Icon } from '../components/Icon'
import { InteriorLayout, PageHeader, SectionHeading } from '../components/PageHeader'
import { faqs } from '../data/content'

export function AskPage() {
  return (
    <InteriorLayout>
      <PageHeader
        eyebrow="Employee voice"
        title="Ask the CEO"
        description="Share a thoughtful question about company direction, priorities, customers, or the employee experience."
        icon="message"
      />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,.72fr)]">
        <section className="content-card p-5 sm:p-7">
          <SectionHeading title="Submit a question" text="Questions in this local prototype are for demonstration only." />
          <AskCeoForm />
        </section>
        <section className="content-card p-5 sm:p-7">
          <SectionHeading title="Before you ask" text="A few helpful details about the intended experience." />
          <div className="space-y-3">
            {faqs.map((item) => (
              <details key={item.question} className="faq-item group">
                <summary>
                  <span>{item.question}</span>
                  <Icon name="chevron" className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </InteriorLayout>
  )
}
