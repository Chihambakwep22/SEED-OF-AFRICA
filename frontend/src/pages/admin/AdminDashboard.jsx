import { useEffect, useState } from 'react'
import { adminAPI } from '../../api/client'
import AdminLayout from '../../components/admin/AdminLayout'
import '../../styles/Admin.css'

const PLACEHOLDER_STATS = [
  'Total Mentors',
  'Active Mentorships',
  'Training Completion Rate',
  'Resources Downloaded',
  'AI Usage Statistics',
  'Revenue Analytics',
  'Upcoming Sessions',
]

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    adminAPI.stats()
      .then(({ data }) => setStats(data))
      .catch(() => setError('Could not load dashboard stats.'))
  }, [])

  return (
    <AdminLayout>
      <h1>Super Admin Dashboard</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats?.total_users ?? '—'}</div>
          <div className="admin-stat-label">Total Users</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats?.total_entrepreneurs ?? '—'}</div>
          <div className="admin-stat-label">Total Entrepreneurs</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats?.total_enterprises ?? '—'}</div>
          <div className="admin-stat-label">Total Enterprises</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats?.pending_approvals ?? '—'}</div>
          <div className="admin-stat-label">Pending Approvals</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats?.monthly_registrations ?? '—'}</div>
          <div className="admin-stat-label">Registrations This Month</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats?.active_programs ?? '—'}</div>
          <div className="admin-stat-label">Active Programs</div>
        </div>

        {PLACEHOLDER_STATS.map((label) => (
          <div className="admin-stat-card placeholder" key={label}>
            <div className="admin-stat-value">—</div>
            <div className="admin-stat-label">{label}</div>
            <div className="admin-stat-label">Coming soon</div>
          </div>
        ))}
      </div>

      <div className="admin-activity-feed">
        <h2>Platform Activity Feed</h2>
        {!stats?.activity_feed?.length && <p>No activity yet.</p>}
        {stats?.activity_feed?.map((item, index) => (
          <div className="admin-activity-item" key={index}>
            {item.type === 'registration'
              ? `New ${item.role} registration: ${item.email}`
              : `Login: ${item.email}`}
            <time>{new Date(item.timestamp).toLocaleString()}</time>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
