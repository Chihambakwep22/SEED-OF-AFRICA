import { useEffect, useState } from 'react'
import { mentorAPI } from '../../api/client'
import { useAuth } from '../../context/AuthContext'
import MentorLayout from '../../components/mentor/MentorLayout'
import '../../styles/Admin.css'

const PLACEHOLDER_CARDS = [
  'Session Calendar',
  'Messages',
]

export default function MentorDashboard() {
  const { user } = useAuth()
  const [entrepreneurs, setEntrepreneurs] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    mentorAPI.getAssignedEntrepreneurs()
      .then(({ data }) => setEntrepreneurs(data.results))
      .catch(() => setError('Could not load assigned entrepreneurs.'))
  }, [])

  return (
    <MentorLayout>
      <h1>Welcome, {user.email}</h1>
      <p>Mentor Dashboard</p>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-activity-feed">
        <h2>Assigned Entrepreneurs</h2>
        {entrepreneurs.length === 0 && <p>No entrepreneurs assigned yet.</p>}
        {entrepreneurs.map((entrepreneur) => (
          <div className="admin-activity-item" key={entrepreneur.id}>
            <strong>{entrepreneur.full_name}</strong> — {entrepreneur.business_name} ({entrepreneur.industry})
            <br />
            {entrepreneur.email} {entrepreneur.phone_number && `· ${entrepreneur.phone_number}`}
          </div>
        ))}
      </div>

      <div className="admin-stats-grid" style={{ marginTop: '2rem' }}>
        {PLACEHOLDER_CARDS.map((label) => (
          <div className="admin-stat-card placeholder" key={label}>
            <div className="admin-stat-value">—</div>
            <div className="admin-stat-label">{label}</div>
            <div className="admin-stat-label">Coming soon</div>
          </div>
        ))}
      </div>
    </MentorLayout>
  )
}
