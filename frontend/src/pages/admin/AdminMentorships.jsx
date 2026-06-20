import { useEffect, useState } from 'react'
import { adminAPI } from '../../api/client'
import AdminLayout from '../../components/admin/AdminLayout'
import '../../styles/Admin.css'
import '../../styles/Auth.css'

export default function AdminMentorships() {
  const [mentorships, setMentorships] = useState([])
  const [mentors, setMentors] = useState([])
  const [entrepreneurs, setEntrepreneurs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [assignOpen, setAssignOpen] = useState(false)
  const [assignData, setAssignData] = useState({ mentor: '', entrepreneur: '', notes: '' })
  const [assignError, setAssignError] = useState('')

  const loadMentorships = () => {
    setLoading(true)
    setError('')
    adminAPI.listMentorships()
      .then(({ data }) => setMentorships(data.results))
      .catch(() => setError('Could not load mentorships.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadMentorships()
    adminAPI.listUsers({ role: 'mentor' }).then(({ data }) => setMentors(data.results))
    adminAPI.listUsers({ role: 'entrepreneur' }).then(({ data }) => setEntrepreneurs(data.results))
  }, [])

  const handleAssignChange = (e) => {
    const { name, value } = e.target
    setAssignData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAssignSubmit = async (e) => {
    e.preventDefault()
    setAssignError('')
    try {
      await adminAPI.createMentorship(assignData)
      setAssignOpen(false)
      setAssignData({ mentor: '', entrepreneur: '', notes: '' })
      loadMentorships()
    } catch (err) {
      const detail = err.response?.data
      setAssignError(
        typeof detail === 'object' ? Object.values(detail).flat().join(' ') : 'Could not create assignment.'
      )
    }
  }

  const handleMarkCompleted = async (mentorship) => {
    try {
      await adminAPI.updateMentorship(mentorship.id, { status: 'completed' })
      loadMentorships()
    } catch {
      setError('Could not update assignment.')
    }
  }

  const handleDelete = async (mentorship) => {
    if (window.confirm(`Remove the assignment between ${mentorship.mentor_email} and ${mentorship.entrepreneur_email}?`)) {
      try {
        await adminAPI.deleteMentorship(mentorship.id)
        loadMentorships()
      } catch {
        setError('Could not remove assignment.')
      }
    }
  }

  return (
    <AdminLayout>
      <h1>Mentor Assignments</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-toolbar">
        <div className="spacer" />
        <button type="button" className="btn btn-primary" onClick={() => setAssignOpen(true)}>Assign Mentor</button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mentor</th>
              <th>Entrepreneur</th>
              <th>Status</th>
              <th>Assigned</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan="6">Loading...</td></tr>
            )}
            {!loading && mentorships.length === 0 && (
              <tr><td colSpan="6">No mentor assignments yet.</td></tr>
            )}
            {!loading && mentorships.map((mentorship) => (
              <tr key={mentorship.id}>
                <td>{mentorship.mentor_name || mentorship.mentor_email}</td>
                <td>{mentorship.entrepreneur_name || mentorship.entrepreneur_email}</td>
                <td>
                  <span className={`admin-badge ${mentorship.status === 'active' ? 'active' : 'inactive'}`}>
                    {mentorship.status}
                  </span>
                </td>
                <td>{new Date(mentorship.assigned_at).toLocaleDateString()}</td>
                <td>{mentorship.notes}</td>
                <td>
                  <div className="admin-row-actions">
                    {mentorship.status === 'active' && (
                      <button onClick={() => handleMarkCompleted(mentorship)}>Mark Completed</button>
                    )}
                    <button className="danger" onClick={() => handleDelete(mentorship)}>Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {assignOpen && (
        <div className="admin-modal-overlay" onClick={() => setAssignOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Assign Mentor</h2>
            <form onSubmit={handleAssignSubmit}>
              {assignError && <div className="error-message">{assignError}</div>}

              <div className="form-group">
                <label htmlFor="mentor">Mentor *</label>
                <select id="mentor" name="mentor" value={assignData.mentor} onChange={handleAssignChange} required>
                  <option value="">Select a mentor</option>
                  {mentors.map((mentor) => (
                    <option key={mentor.id} value={mentor.id}>{mentor.email}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="entrepreneur">Entrepreneur *</label>
                <select id="entrepreneur" name="entrepreneur" value={assignData.entrepreneur} onChange={handleAssignChange} required>
                  <option value="">Select an entrepreneur</option>
                  {entrepreneurs.map((entrepreneur) => (
                    <option key={entrepreneur.id} value={entrepreneur.id}>{entrepreneur.email}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea id="notes" name="notes" value={assignData.notes} onChange={handleAssignChange} rows="3" />
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setAssignOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Assign</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
