import { NavLink } from 'react-router-dom'
import '../../styles/Admin.css'

export default function EntrepreneurLayout({ children }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <nav className="admin-sidebar-nav">
          <NavLink to="/entrepreneur/dashboard" className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}>
            Dashboard
          </NavLink>
          <NavLink to="/entrepreneur/profile" className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}>
            Profile
          </NavLink>
        </nav>
      </aside>
      <div className="admin-content">{children}</div>
    </div>
  )
}
