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
}

export default function Profile() {
  const [formData, setFormData] = useState(INITIAL)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    entrepreneurAPI.getProfile()
      .then(({ data }) => setFormData(data))
      .catch(() => setError('Could not load your profile.'))
      .finally(() => setLoading(false))
  }, [])

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
    </EntrepreneurLayout>
  )
}
