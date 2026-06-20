import { useAuth } from '../../context/AuthContext'
import EntrepreneurLayout from '../../components/entrepreneur/EntrepreneurLayout'

export default function EntrepreneurDashboard() {
  const { user, logout } = useAuth()

  return (
    <EntrepreneurLayout>
      <h1>Welcome, {user.profile?.full_name || user.email}</h1>
      <p>Entrepreneur Dashboard</p>
      <button className="btn btn-primary" onClick={logout}>Log Out</button>
    </EntrepreneurLayout>
  )
}
