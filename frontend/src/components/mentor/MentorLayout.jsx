import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import '../../styles/Admin.css'

export default function MentorLayout({ children }) {
  const { logout } = useAuth()

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <nav className="admin-sidebar-nav">
          <NavLink to="/mentor/dashboard" className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}>
            Dashboard
          </NavLink>
          <button type="button" className="admin-sidebar-link admin-sidebar-logout" onClick={logout}>
            Logout
          </button>
        </nav>
      </aside>
      <div className="admin-content">{children}</div>
    </div>
  )
}
