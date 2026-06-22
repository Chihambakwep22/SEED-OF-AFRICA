import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import '../../styles/Admin.css'

export default function EntrepreneurLayout({ children }) {
  const { logout } = useAuth()

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
          <NavLink to="/entrepreneur/programs" className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`}>
            Programs
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
