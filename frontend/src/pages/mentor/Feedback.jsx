import { useEffect, useState } from 'react'
import { mentorAPI } from '../../api/client'
import MentorLayout from '../../components/mentor/MentorLayout'
import '../../styles/Admin.css'
import '../../styles/Auth.css'

const CREATE_INITIAL = { mentorship: '', progress_rating: '', notes: '' }

export default function Feedback() {
  const [feedback, setFeedback] = useState([])
  const [entrepreneurs, setEntrepreneurs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [createOpen, setCreateOpen] = useState(false)
  const [createData, setCreateData] = useState(CREATE_INITIAL)
  const [createError, setCreateError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const load = () => {
    setLoading(true)
    setError('')
    mentorAPI.listFeedback()
      .then(({ data }) => setFeedback(data.results))
      .catch(() => setError('Could not load feedback.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    mentorAPI.getAssignedEntrepreneurs().then(({ data }) => setEntrepreneurs(data.results))
  }, [])

  const handleCreateChange = (e) => {
    const { name, value } = e.target
    setCreateData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    setCreateError('')
    setSubmitting(true)
    try {
      await mentorAPI.createFeedback({
        ...createData,
        progress_rating: createData.progress_rating || null,
      })
      setCreateOpen(false)
      setCreateData(CREATE_INITIAL)
      load()
    } catch (err) {
      const detail = err.response?.data
      setCreateError(
        typeof detail === 'object' ? Object.values(detail).flat().join(' ') : 'Could not submit feedback.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <MentorLayout>
      <h1>Feedback &amp; Progress Reports</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-toolbar">
        <div className="spacer" />
        <button type="button" className="btn btn-primary" onClick={() => setCreateOpen(true)}>Give Feedback</button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Entrepreneur</th>
              <th>Progress Rating</th>
              <th>Notes</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan="4">Loading...</td></tr>
            )}
            {!loading && feedback.length === 0 && (
              <tr><td colSpan="4">No feedback logged yet.</td></tr>
            )}
            {!loading && feedback.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.entrepreneur_name}</td>
                <td>{entry.progress_rating ? `${entry.progress_rating} / 5` : '—'}</td>
                <td>{entry.notes}</td>
                <td>{new Date(entry.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {createOpen && (
        <div className="admin-modal-overlay" onClick={() => setCreateOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Give Feedback</h2>
            <form onSubmit={handleCreateSubmit}>
              {createError && <div className="error-message">{createError}</div>}

              <div className="form-group">
                <label htmlFor="mentorship">Entrepreneur *</label>
                <select id="mentorship" name="mentorship" value={createData.mentorship} onChange={handleCreateChange} required>
                  <option value="">Select an entrepreneur</option>
                  {entrepreneurs.map((entrepreneur) => (
                    <option key={entrepreneur.id} value={entrepreneur.id}>{entrepreneur.full_name || entrepreneur.email}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="progress_rating">Progress Rating (1–5)</label>
                <select id="progress_rating" name="progress_rating" value={createData.progress_rating} onChange={handleCreateChange}>
                  <option value="">No rating</option>
                  <option value="1">1 — Struggling</option>
                  <option value="2">2 — Below Expectations</option>
                  <option value="3">3 — On Track</option>
                  <option value="4">4 — Good Progress</option>
                  <option value="5">5 — Excellent</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes *</label>
                <textarea id="notes" name="notes" value={createData.notes} onChange={handleCreateChange} rows="4" required />
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setCreateOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MentorLayout>
  )
}
