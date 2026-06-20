import { useAuth } from '../../context/AuthContext'
import '../../styles/Dashboard.css'

export default function EntrepreneurDashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="dashboard-placeholder">
      <h1>Welcome, {user.profile?.full_name || user.email}</h1>
      <p>Entrepreneur Dashboard</p>
      <button className="btn btn-primary" onClick={logout}>Log Out</button>
    </div>
  )
}
