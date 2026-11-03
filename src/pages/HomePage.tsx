import { HomeCards } from '../components/HomeCards'
import { UpdatesPanel } from '../components/UpdatesPanel'
import { VisionHero } from '../components/VisionHero'

/** Assembles the vision hero, featured links, and responsive update panels. */
export function HomePage() {
  return (
    <div className="home-layout">
      <div className="min-w-0 space-y-4">
        <VisionHero />
        <HomeCards />
      </div>
      <div className="home-updates-column">
        <UpdatesPanel />
      </div>
      <div className="home-updates-mobile">
        <section className="content-card p-5 sm:p-6">
          <UpdatesPanel embedded />
        </section>
      </div>
    </div>
  )
}
