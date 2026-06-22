import { useEffect, useState } from 'react'
import { entrepreneurAPI } from '../../api/client'
import { useAuth } from '../../context/AuthContext'
import EntrepreneurLayout from '../../components/entrepreneur/EntrepreneurLayout'
import '../../styles/Admin.css'

export default function EntrepreneurDashboard() {
  const { user } = useAuth()
  const [feedback, setFeedback] = useState([])

  useEffect(() => {
    entrepreneurAPI.myFeedback()
      .then(({ data }) => setFeedback(data.results))
      .catch(() => {})
  }, [])

  return (
    <EntrepreneurLayout>
      <h1>Welcome, {user.profile?.full_name || user.email}</h1>
      <p>Entrepreneur Dashboard</p>

      <div className="admin-activity-feed" style={{ marginTop: '2rem' }}>
        <h2>Mentor Feedback</h2>
        {feedback.length === 0 && <p>No feedback from your mentor yet.</p>}
        {feedback.map((entry) => (
          <div className="admin-activity-item" key={entry.id}>
            <strong>{entry.mentor_name}</strong>
            {entry.progress_rating && ` — ${entry.progress_rating} / 5`}
            <br />
            {entry.notes}
            <time>{new Date(entry.created_at).toLocaleDateString()}</time>
          </div>
        ))}
      </div>
    </EntrepreneurLayout>
  )
}
