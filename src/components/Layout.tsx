import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AskCeoForm } from './AskCeoForm'
import { Header } from './Header'
import { Icon } from './Icon'
import { Modal } from './Modal'
import { Sidebar } from './Sidebar'

/** Supplies persistent navigation and overlays around each routed page. */
export function Layout() {
  const [navOpen, setNavOpen] = useState(false)
  const [askOpen, setAskOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Return visitors to the top when a route changes.
    setNavOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header onMenuClick={() => setNavOpen(true)} />
      <Sidebar mobile open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="app-body">
        <Sidebar />
        <main id="main-content" className="min-w-0 flex-1" tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      <button className="ask-fab" type="button" onClick={() => setAskOpen(true)}>
        <span className="ask-fab-icon"><Icon name="message" className="h-5 w-5" /></span>
        <span>Ask the CEO</span>
      </button>

      <Modal open={askOpen} onClose={() => setAskOpen(false)} eyebrow="Employee voice" title="Ask the CEO" size="sm">
        <AskCeoForm compact />
      </Modal>
    </div>
  )
}
