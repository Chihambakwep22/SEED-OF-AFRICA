import { useAuth } from '../../context/AuthContext'
import '../../styles/Dashboard.css'

export default function EnterpriseDashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="dashboard-placeholder">
      <h1>Welcome, {user.profile?.company_name || user.email}</h1>
      <p>Enterprise Dashboard</p>
      <button className="btn btn-primary" onClick={logout}>Log Out</button>
    </div>
  )
}
