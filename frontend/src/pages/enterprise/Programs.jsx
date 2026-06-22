import { useEffect, useState } from 'react'
import { enterpriseAPI } from '../../api/client'
import EnterpriseLayout from '../../components/enterprise/EnterpriseLayout'
import '../../styles/Admin.css'
import '../../styles/Auth.css'

const CREATE_INITIAL = {
  title: '',
  description: '',
  industry_focus: '',
  application_deadline: '',
  status: 'draft',
}

export default function Programs() {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [createOpen, setCreateOpen] = useState(false)
  const [createData, setCreateData] = useState(CREATE_INITIAL)
  const [createError, setCreateError] = useState('')

  const [applicantsTarget, setApplicantsTarget] = useState(null)
  const [applicants, setApplicants] = useState([])
  const [applicantsLoading, setApplicantsLoading] = useState(false)

  const loadPrograms = () => {
    setLoading(true)
    setError('')
    enterpriseAPI.listPrograms()
      .then(({ data }) => setPrograms(data.results))
      .catch(() => setError('Could not load programs.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadPrograms()
  }, [])

  const handleCreateChange = (e) => {
    const { name, value } = e.target
    setCreateData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    setCreateError('')
    try {
      const payload = { ...createData, application_deadline: createData.application_deadline || null }
      await enterpriseAPI.createProgram(payload)
      setCreateOpen(false)
      setCreateData(CREATE_INITIAL)
      loadPrograms()
    } catch (err) {
      const detail = err.response?.data
      setCreateError(
        typeof detail === 'object' ? Object.values(detail).flat().join(' ') : 'Could not create program.'
      )
    }
  }

  const handleStatusChange = async (program, statusValue) => {
    try {
      await enterpriseAPI.updateProgram(program.id, { status: statusValue })
      loadPrograms()
    } catch {
      setError('Could not update program.')
    }
  }

  const handleDelete = async (program) => {
    if (window.confirm(`Delete "${program.title}"? This cannot be undone.`)) {
      try {
        await enterpriseAPI.deleteProgram(program.id)
        loadPrograms()
      } catch {
        setError('Could not delete program.')
      }
    }
  }

  const openApplicants = async (program) => {
    setApplicantsTarget(program)
    setApplicantsLoading(true)
    try {
      const { data } = await enterpriseAPI.getApplicants(program.id)
      setApplicants(data)
    } finally {
      setApplicantsLoading(false)
    }
  }

  const handleRespond = async (application, statusValue) => {
    try {
      await enterpriseAPI.respondToApplication(application.id, statusValue)
      const { data } = await enterpriseAPI.getApplicants(applicantsTarget.id)
      setApplicants(data)
      loadPrograms()
    } catch {
      setError('Could not update application.')
    }
  }

  return (
    <EnterpriseLayout>
      <h1>Development Programs</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-toolbar">
        <div className="spacer" />
        <button type="button" className="btn btn-primary" onClick={() => setCreateOpen(true)}>Create Program</button>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Industry Focus</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Applicants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan="6">Loading...</td></tr>
            )}
            {!loading && programs.length === 0 && (
              <tr><td colSpan="6">No programs created yet.</td></tr>
            )}
            {!loading && programs.map((program) => (
              <tr key={program.id}>
                <td>{program.title}</td>
                <td>{program.industry_focus || '—'}</td>
                <td>{program.application_deadline || '—'}</td>
                <td>
                  <select value={program.status} onChange={(e) => handleStatusChange(program, e.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td>{program.applicant_count}</td>
                <td>
                  <div className="admin-row-actions">
                    <button onClick={() => openApplicants(program)}>View Applicants</button>
                    <button className="danger" onClick={() => handleDelete(program)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {createOpen && (
        <div className="admin-modal-overlay" onClick={() => setCreateOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create Program</h2>
            <form onSubmit={handleCreateSubmit}>
              {createError && <div className="error-message">{createError}</div>}

              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input type="text" id="title" name="title" value={createData.title} onChange={handleCreateChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea id="description" name="description" value={createData.description} onChange={handleCreateChange} rows="4" required />
              </div>

              <div className="form-group">
                <label htmlFor="industry_focus">Industry Focus</label>
                <input type="text" id="industry_focus" name="industry_focus" value={createData.industry_focus} onChange={handleCreateChange} />
              </div>

              <div className="form-group">
                <label htmlFor="application_deadline">Application Deadline</label>
                <input type="date" id="application_deadline" name="application_deadline" value={createData.application_deadline} onChange={handleCreateChange} />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={createData.status} onChange={handleCreateChange}>
                  <option value="draft">Draft</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setCreateOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {applicantsTarget && (
        <div className="admin-modal-overlay" onClick={() => setApplicantsTarget(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Applicants — {applicantsTarget.title}</h2>
            {applicantsLoading && <p>Loading...</p>}
            {!applicantsLoading && applicants.length === 0 && <p>No applicants yet.</p>}
            {!applicantsLoading && applicants.map((application) => (
              <div className="admin-activity-item" key={application.id} style={{ display: 'block' }}>
                <strong>{application.entrepreneur_name || application.entrepreneur_email}</strong> — {application.business_name}
                <div>
                  <span className={`admin-badge ${application.status === 'accepted' ? 'active' : application.status === 'rejected' ? 'inactive' : 'pending'}`}>
                    {application.status}
                  </span>
                </div>
                {application.message && <p>{application.message}</p>}
                {application.status === 'pending' && (
                  <div className="admin-row-actions">
                    <button onClick={() => handleRespond(application, 'accepted')}>Accept</button>
                    <button className="danger" onClick={() => handleRespond(application, 'rejected')}>Reject</button>
                  </div>
                )}
              </div>
            ))}
            <div className="admin-modal-actions">
              <button type="button" className="btn btn-outline" onClick={() => setApplicantsTarget(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </EnterpriseLayout>
  )
}
