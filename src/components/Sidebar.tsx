import { NavLink } from 'react-router-dom'
import { navigation } from '../data/content'
import { Icon } from './Icon'
import { Logo } from './Logo'

interface SidebarProps {
  mobile?: boolean
  open?: boolean
  onClose?: () => void
}

/** Renders primary navigation as either a fixed sidebar or a dismissible mobile drawer. */
export function Sidebar({ mobile = false, open = false, onClose }: SidebarProps) {
  const links = (
    <nav aria-label="Primary navigation" className="space-y-1">
      {navigation.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          onClick={onClose}
          className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
        >
          <Icon name={item.icon} className="h-[18px] w-[18px] shrink-0" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )

  if (!mobile) return <aside className="desktop-sidebar">{links}</aside>

  return (
    <div className={`mobile-nav-layer ${open ? 'mobile-nav-open' : ''}`} aria-hidden={!open}>
      <button className="mobile-nav-backdrop" type="button" onClick={onClose} aria-label="Close navigation" />
      <aside className="mobile-sidebar">
        <div className="mb-7 flex items-center justify-between">
          <Logo />
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close navigation">
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>
        {links}
      </aside>
    </div>
  )
}
