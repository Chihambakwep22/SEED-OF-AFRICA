import { useEffect, useState } from 'react'
import { entrepreneurAPI } from '../../api/client'
import EntrepreneurLayout from '../../components/entrepreneur/EntrepreneurLayout'
import '../../styles/Auth.css'

const INITIAL = {
  full_name: '',
  phone_number: '',
  country: '',
  business_name: '',
  industry: '',
  location: '',
  business_stage: '',
  business_size: '',
  certifications: '',
  completion_percentage: 0,
}

export default function Profile() {
  const [formData, setFormData] = useState(INITIAL)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [documents, setDocuments] = useState([])
  const [docsLoading, setDocsLoading] = useState(true)
  const [docName, setDocName] = useState('')
  const [docFile, setDocFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [docError, setDocError] = useState('')

  const loadDocuments = () => {
    setDocsLoading(true)
    entrepreneurAPI.listDocuments()
      .then(({ data }) => setDocuments(data.results))
      .catch(() => setDocError('Could not load your documents.'))
      .finally(() => setDocsLoading(false))
  }

  useEffect(() => {
    entrepreneurAPI.getProfile()
      .then(({ data }) => setFormData(data))
      .catch(() => setError('Could not load your profile.'))
      .finally(() => setLoading(false))
    loadDocuments()
  }, [])

  const handleUpload = async (e) => {
    e.preventDefault()
    setDocError('')
    setUploading(true)
    try {
      await entrepreneurAPI.uploadDocument(docName, docFile)
      setDocName('')
      setDocFile(null)
      e.target.reset()
      loadDocuments()
    } catch (err) {
      const detail = err.response?.data
      setDocError(
        typeof detail === 'object' ? Object.values(detail).flat().join(' ') : 'Could not upload document.'
      )
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteDocument = async (document) => {
    if (window.confirm(`Delete "${document.name}"?`)) {
      try {
        await entrepreneurAPI.deleteDocument(document.id)
        loadDocuments()
      } catch {
        setDocError('Could not delete document.')
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setSaving(true)
    try {
      const { data } = await entrepreneurAPI.updateProfile(formData)
      setFormData(data)
      setSuccess(true)
    } catch (err) {
      const detail = err.response?.data
      setError(
        typeof detail === 'object' ? Object.values(detail).flat().join(' ') : 'Could not save your profile.'
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <EntrepreneurLayout>
        <p>Loading profile...</p>
      </EntrepreneurLayout>
    )
  }

  return (
    <EntrepreneurLayout>
      <h1>My Profile</h1>

      <div className="profile-completion" style={{ maxWidth: '600px' }}>
        <div className="profile-completion-label">
          <span>Profile completion</span>
          <span>{formData.completion_percentage}%</span>
        </div>
        <div className="profile-completion-bar">
          <div className="profile-completion-fill" style={{ width: `${formData.completion_percentage}%` }} />
        </div>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Profile updated successfully.</div>}

        <div className="form-group">
          <label htmlFor="full_name">Full Name *</label>
          <input type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input type="tel" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location (City / Province)</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="business_name">Business Name *</label>
          <input type="text" id="business_name" name="business_name" value={formData.business_name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry *</label>
          <input type="text" id="industry" name="industry" value={formData.industry} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="business_stage">Business Stage</label>
          <select id="business_stage" name="business_stage" value={formData.business_stage} onChange={handleChange}>
            <option value="">Select a stage</option>
            <option value="idea">Idea</option>
            <option value="startup">Startup</option>
            <option value="growth">Growth</option>
            <option value="established">Established</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="business_size">Business Size</label>
          <input type="text" id="business_size" name="business_size" value={formData.business_size} onChange={handleChange} placeholder="e.g. 1-10, 11-50, 51-200" />
        </div>

        <div className="form-group">
          <label htmlFor="certifications">Certifications</label>
          <textarea id="certifications" name="certifications" value={formData.certifications} onChange={handleChange} rows="3" placeholder="Comma-separated, e.g. ISO 9001, B-BBEE Level 2" />
        </div>

        <button type="submit" className="btn btn-primary btn-xl" disabled={saving}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>

      <h2 style={{ marginTop: '2.5rem' }}>Business Documents</h2>

      <form className="auth-form" onSubmit={handleUpload} style={{ maxWidth: '600px' }}>
        {docError && <div className="error-message">{docError}</div>}

        <div className="form-group">
          <label htmlFor="doc_name">Document Name *</label>
          <input
            type="text"
            id="doc_name"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            placeholder="e.g. Business Registration Certificate"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="doc_file">File *</label>
          <input
            type="file"
            id="doc_file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            onChange={(e) => setDocFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>

      <div className="admin-table-wrapper" style={{ maxWidth: '600px', marginTop: '1.5rem' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Uploaded</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {docsLoading && (
              <tr><td colSpan="3">Loading...</td></tr>
            )}
            {!docsLoading && documents.length === 0 && (
              <tr><td colSpan="3">No documents uploaded yet.</td></tr>
            )}
            {!docsLoading && documents.map((document) => (
              <tr key={document.id}>
                <td><a href={document.file} target="_blank" rel="noreferrer">{document.name}</a></td>
                <td>{new Date(document.uploaded_at).toLocaleDateString()}</td>
                <td>
                  <button className="danger" onClick={() => handleDeleteDocument(document)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </EntrepreneurLayout>
  )
}
