import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import '../styles/Auth.css'

const ENTREPRENEUR_INITIAL = {
  full_name: '',
  email: '',
  phone_number: '',
  country: '',
  business_name: '',
  industry: '',
  password: '',
  confirm_password: '',
}

const ENTERPRISE_INITIAL = {
  company_name: '',
  contact_person: '',
  email: '',
  phone_number: '',
  industry: '',
  company_size: '',
  password: '',
  confirm_password: '',
}

export default function Signup() {
  const { registerEntrepreneur, registerEnterprise } = useAuth()
  const navigate = useNavigate()
  const [accountType, setAccountType] = useState('entrepreneur')
  const [entrepreneurData, setEntrepreneurData] = useState(ENTREPRENEUR_INITIAL)
  const [enterpriseData, setEnterpriseData] = useState(ENTERPRISE_INITIAL)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleEntrepreneurChange = (e) => {
    const { name, value } = e.target
    setEntrepreneurData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEnterpriseChange = (e) => {
    const { name, value } = e.target
    setEnterpriseData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const { password, confirm_password } = accountType === 'entrepreneur' ? entrepreneurData : enterpriseData
    if (password !== confirm_password) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    try {
      if (accountType === 'entrepreneur') {
        const { confirm_password: _confirm, ...payload } = entrepreneurData
        await registerEntrepreneur(payload)
      } else {
        const { confirm_password: _confirm, ...payload } = enterpriseData
        await registerEnterprise(payload)
      }
      navigate('/login')
    } catch (err) {
      const detail = err.response?.data
      setError(
        typeof detail === 'object' ? Object.values(detail).flat().join(' ') : 'Registration failed. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const passwordFieldType = showPassword ? 'text' : 'password'

  return (
    <div className="auth-page">
      <section className="page-hero">
        <h1>Create Your Account</h1>
        <p>Join Thale-Quants as an Entrepreneur or an Enterprise</p>
      </section>

      <section className="auth-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="account-type-toggle">
            <button
              type="button"
              className={`account-type-btn ${accountType === 'entrepreneur' ? 'active' : ''}`}
              onClick={() => setAccountType('entrepreneur')}
            >
              Entrepreneur
            </button>
            <button
              type="button"
              className={`account-type-btn ${accountType === 'enterprise' ? 'active' : ''}`}
              onClick={() => setAccountType('enterprise')}
            >
              Enterprise
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {accountType === 'entrepreneur' ? (
            <>
              <div className="form-group">
                <label htmlFor="full_name">Full Name *</label>
                <input type="text" id="full_name" name="full_name" value={entrepreneurData.full_name} onChange={handleEntrepreneurChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" value={entrepreneurData.email} onChange={handleEntrepreneurChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone_number">Phone Number</label>
                <input type="tel" id="phone_number" name="phone_number" value={entrepreneurData.phone_number} onChange={handleEntrepreneurChange} />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country *</label>
                <input type="text" id="country" name="country" value={entrepreneurData.country} onChange={handleEntrepreneurChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="business_name">Business Name *</label>
                <input type="text" id="business_name" name="business_name" value={entrepreneurData.business_name} onChange={handleEntrepreneurChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="industry">Industry *</label>
                <input type="text" id="industry" name="industry" value={entrepreneurData.industry} onChange={handleEntrepreneurChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="password-input">
                  <input type={passwordFieldType} id="password" name="password" value={entrepreneurData.password} onChange={handleEntrepreneurChange} required />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword((prev) => !prev)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password *</label>
                <div className="password-input">
                  <input type={passwordFieldType} id="confirm_password" name="confirm_password" value={entrepreneurData.confirm_password} onChange={handleEntrepreneurChange} required />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword((prev) => !prev)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="company_name">Company Name *</label>
                <input type="text" id="company_name" name="company_name" value={enterpriseData.company_name} onChange={handleEnterpriseChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="contact_person">Contact Person *</label>
                <input type="text" id="contact_person" name="contact_person" value={enterpriseData.contact_person} onChange={handleEnterpriseChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" value={enterpriseData.email} onChange={handleEnterpriseChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone_number">Phone Number</label>
                <input type="tel" id="phone_number" name="phone_number" value={enterpriseData.phone_number} onChange={handleEnterpriseChange} />
              </div>
              <div className="form-group">
                <label htmlFor="industry">Industry *</label>
                <input type="text" id="industry" name="industry" value={enterpriseData.industry} onChange={handleEnterpriseChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="company_size">Company Size *</label>
                <input type="text" id="company_size" name="company_size" value={enterpriseData.company_size} onChange={handleEnterpriseChange} required placeholder="e.g. 1-10, 11-50, 51-200" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="password-input">
                  <input type={passwordFieldType} id="password" name="password" value={enterpriseData.password} onChange={handleEnterpriseChange} required />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword((prev) => !prev)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password *</label>
                <div className="password-input">
                  <input type={passwordFieldType} id="confirm_password" name="confirm_password" value={enterpriseData.confirm_password} onChange={handleEnterpriseChange} required />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword((prev) => !prev)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary btn-xl" disabled={submitting}>
            {submitting ? 'Creating account...' : 'Sign Up'}
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </form>
      </section>
    </div>
  )
}
