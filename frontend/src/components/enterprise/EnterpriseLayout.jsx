import { NavLink } from 'react-router-dom'
import '../../styles/Admin.css'

export default function EnterpriseLayout({ children }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <nav className="admin-sidebar-nav">
          <NavLink to="/enterprise/dashboard" className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}>
            Dashboard
          </NavLink>
          <NavLink to="/enterprise/suppliers" className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}>
            Supplier Discovery
          </NavLink>
        </nav>
      </aside>
      <div className="admin-content">{children}</div>
    </div>
  )
}
