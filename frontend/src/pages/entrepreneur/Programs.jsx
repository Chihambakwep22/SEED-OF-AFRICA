import { useEffect, useState } from 'react'
import { entrepreneurAPI } from '../../api/client'
import EntrepreneurLayout from '../../components/entrepreneur/EntrepreneurLayout'
import '../../styles/Admin.css'
import '../../styles/Auth.css'

export default function Programs() {
  const [programs, setPrograms] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [applyTarget, setApplyTarget] = useState(null)
  const [message, setMessage] = useState('')
  const [applyError, setApplyError] = useState('')
  const [applying, setApplying] = useState(false)

  const load = () => {
    setLoading(true)
    setError('')
    Promise.all([entrepreneurAPI.listAvailablePrograms(), entrepreneurAPI.myApplications()])
      .then(([programsRes, applicationsRes]) => {
        setPrograms(programsRes.data.results)
        setApplications(applicationsRes.data.results)
      })
      .catch(() => setError('Could not load programs.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const appliedProgramIds = new Set(applications.map((application) => application.program))

  const openApply = (program) => {
    setApplyTarget(program)
    setMessage('')
    setApplyError('')
  }

  const handleApplySubmit = async (e) => {
    e.preventDefault()
    setApplyError('')
    setApplying(true)
    try {
      await entrepreneurAPI.applyToProgram(applyTarget.id, message)
      setApplyTarget(null)
      load()
    } catch (err) {
      const detail = err.response?.data
      setApplyError(
        typeof detail === 'object' ? Object.values(detail).flat().join(' ') : 'Could not submit application.'
      )
    } finally {
      setApplying(false)
    }
  }

  if (loading) {
    return (
      <EntrepreneurLayout>
        <p>Loading programs...</p>
      </EntrepreneurLayout>
    )
  }

  return (
    <EntrepreneurLayout>
      <h1>Development Programs</h1>

      {error && <div className="error-message">{error}</div>}

      <h2>Open Programs</h2>
      {programs.length === 0 && <p>No open programs right now. Check back soon.</p>}
      <div className="admin-table-wrapper">
        {programs.length > 0 && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Industry Focus</th>
                <th>Deadline</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program.id}>
                  <td>{program.title}</td>
                  <td>{program.industry_focus || '—'}</td>
                  <td>{program.application_deadline || '—'}</td>
                  <td>{program.description}</td>
                  <td>
                    {appliedProgramIds.has(program.id) ? (
                      <span className="admin-badge pending">Applied</span>
                    ) : (
                      <button onClick={() => openApply(program)}>Apply</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>My Applications</h2>
      {applications.length === 0 && <p>You haven't applied to any programs yet.</p>}
      <div className="admin-table-wrapper">
        {applications.length > 0 && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Program</th>
                <th>Status</th>
                <th>Applied</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.program_title}</td>
                  <td>
                    <span className={`admin-badge ${application.status === 'accepted' ? 'active' : application.status === 'rejected' ? 'inactive' : 'pending'}`}>
                      {application.status}
                    </span>
                  </td>
                  <td>{new Date(application.applied_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {applyTarget && (
        <div className="admin-modal-overlay" onClick={() => setApplyTarget(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Apply — {applyTarget.title}</h2>
            <form onSubmit={handleApplySubmit}>
              {applyError && <div className="error-message">{applyError}</div>}
              <div className="form-group">
                <label htmlFor="message">Why are you a good fit? (optional)</label>
                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="4" />
              </div>
              <div className="admin-modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setApplyTarget(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={applying}>
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </EntrepreneurLayout>
  )
}
