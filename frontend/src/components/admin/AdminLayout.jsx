import { NavLink } from 'react-router-dom'
import '../../styles/Admin.css'

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <nav className="admin-sidebar-nav">
          <NavLink to="/admin/dashboard" className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}>
            Users
          </NavLink>
        </nav>
      </aside>
      <div className="admin-content">{children}</div>
    </div>
  )
}
