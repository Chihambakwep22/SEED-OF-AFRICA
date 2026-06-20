import { useAuth } from '../../context/AuthContext'
import EnterpriseLayout from '../../components/enterprise/EnterpriseLayout'

export default function EnterpriseDashboard() {
  const { user } = useAuth()

  return (
    <EnterpriseLayout>
      <h1>Welcome, {user.profile?.company_name || user.email}</h1>
      <p>Enterprise Dashboard</p>
    </EnterpriseLayout>
  )
}
